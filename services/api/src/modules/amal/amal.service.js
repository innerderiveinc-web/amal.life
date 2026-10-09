"use strict";
/**
 * AMAL OS — LAYER 20: AMAL SERVICE (Section 20.21 & 20.22)
 * Manages daily Amal tracking, completions with idempotency,
 * transactional outbox events, and audit logging.
 */
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmalService = void 0;
const common_1 = require("@nestjs/common");
const amal_repository_js_1 = require("./amal.repository.js");
const policy_engine_js_1 = require("../../common/policy/policy.engine.js");
const audit_service_js_1 = require("../../common/audit/audit.service.js");
const pg_client_js_1 = require("../../infrastructure/database/pg.client.js");
const transaction_js_1 = require("../../infrastructure/database/transaction.js");
const outbox_service_js_1 = require("../../infrastructure/outbox/outbox.service.js");
const idempotency_service_js_1 = require("../../common/idempotency/idempotency.service.js");
const amal_error_js_1 = require("../../common/errors/amal-error.js");
const error_codes_js_1 = require("../../common/errors/error-codes.js");
let AmalService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AmalService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            AmalService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        db;
        repo;
        policy;
        audit;
        idempotency;
        constructor(db = new pg_client_js_1.PgClient(), repo = new amal_repository_js_1.PostgresAmalRepository(), policy = new policy_engine_js_1.PolicyEngine(), audit = new audit_service_js_1.AuditService(new pg_client_js_1.PgClient()), idempotency = new idempotency_service_js_1.IdempotencyService(new pg_client_js_1.PgClient())) {
            this.db = db;
            this.repo = repo;
            this.policy = policy;
            this.audit = audit;
            this.idempotency = idempotency;
        }
        async create(actor, input) {
            this.policy.assertAllowed({
                actor: {
                    userId: actor.userId,
                    roles: actor.roles,
                    accountMode: actor.accountMode,
                },
                action: 'AMAL_CREATE',
                purpose: 'PRODUCT',
            });
            const client = await this.db.connect();
            try {
                return await (0, transaction_js_1.withTransaction)(client, async (tx) => {
                    const amal = await this.repo.create({ ...input, userId: actor.userId });
                    await (0, outbox_service_js_1.appendOutboxEvent)(tx, {
                        eventType: 'amal.created',
                        aggregateType: 'amal',
                        aggregateId: amal.id,
                        payload: {
                            userId: actor.userId,
                            amalId: amal.id,
                            title: amal.title,
                        },
                    });
                    await this.audit.record({
                        actorUserId: actor.userId,
                        action: 'AMAL_CREATE',
                        resourceType: 'amal',
                        resourceId: amal.id,
                        purpose: 'PRODUCT',
                        outcome: 'SUCCESS',
                    });
                    return amal;
                });
            }
            finally {
                client.release();
            }
        }
        async findById(userId, amalId) {
            return this.repo.findById(userId, amalId);
        }
        async findToday(userId) {
            return this.repo.findToday(userId);
        }
        /**
         * Completes an Amal with idempotency, transactional outbox append, and audit logging.
         */
        async complete(actor, amalId, input, idempotencyKey) {
            const key = idempotencyKey || `idem_amal_${amalId}_${Date.now()}`;
            // 1. Check idempotency
            const existing = await this.idempotency.get(actor.userId, key);
            if (existing && existing.status === 'COMPLETED' && existing.responseBody) {
                return existing.responseBody;
            }
            const amal = await this.repo.findById(actor.userId, amalId);
            if (!amal) {
                throw new amal_error_js_1.AmalError(error_codes_js_1.ErrorCode.NOT_FOUND, `Amal ${amalId} not found`);
            }
            // 2. Enforce Policy
            this.policy.assertAllowed({
                actor: {
                    userId: actor.userId,
                    roles: actor.roles,
                    accountMode: actor.accountMode,
                },
                action: 'AMAL_COMPLETE',
                resource: {
                    type: 'amal',
                    id: amal.id,
                    ownerUserId: amal.userId,
                },
                purpose: 'PRODUCT',
            });
            const completionType = input.completionType || 'FULL';
            const eventType = completionType === 'PARTIAL' ? 'amal.partial' : 'amal.completed';
            const client = await this.db.connect();
            try {
                const result = await (0, transaction_js_1.withTransaction)(client, async (tx) => {
                    const completion = await this.repo.complete({
                        amalId,
                        userId: actor.userId,
                        completionType,
                        durationMinutes: input.durationMinutes,
                        notes: input.notes,
                        idempotencyKey: key,
                    });
                    await (0, outbox_service_js_1.appendOutboxEvent)(tx, {
                        eventType,
                        aggregateType: 'amal',
                        aggregateId: amalId,
                        payload: {
                            amalId,
                            userId: actor.userId,
                            completionType,
                            durationMinutes: completion.durationMinutes,
                        },
                    });
                    await this.audit.record({
                        actorUserId: actor.userId,
                        action: 'AMAL_COMPLETE',
                        resourceType: 'amal',
                        resourceId: amalId,
                        purpose: 'PRODUCT',
                        outcome: 'SUCCESS',
                        metadata: { completionType, durationMinutes: completion.durationMinutes },
                    });
                    return completion;
                });
                // Save idempotency record
                await this.idempotency.save(actor.userId, key, 200, result);
                return result;
            }
            finally {
                client.release();
            }
        }
    };
    return AmalService = _classThis;
})();
exports.AmalService = AmalService;
//# sourceMappingURL=amal.service.js.map