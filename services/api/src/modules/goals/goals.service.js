"use strict";
/**
 * AMAL OS — LAYER 20: GOALS SERVICE (Section 20.16)
 * Orchestrates goal lifecycle, policy enforcement, transactional outbox append, and audit recording.
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
exports.GoalsService = void 0;
const common_1 = require("@nestjs/common");
const goal_repository_js_1 = require("./goal.repository.js");
const policy_engine_js_1 = require("../../common/policy/policy.engine.js");
const audit_service_js_1 = require("../../common/audit/audit.service.js");
const pg_client_js_1 = require("../../infrastructure/database/pg.client.js");
const transaction_js_1 = require("../../infrastructure/database/transaction.js");
const outbox_service_js_1 = require("../../infrastructure/outbox/outbox.service.js");
const amal_error_js_1 = require("../../common/errors/amal-error.js");
const error_codes_js_1 = require("../../common/errors/error-codes.js");
let GoalsService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var GoalsService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            GoalsService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        db;
        repo;
        policy;
        audit;
        constructor(db = new pg_client_js_1.PgClient(), repo = new goal_repository_js_1.PostgresGoalRepository(), policy = new policy_engine_js_1.PolicyEngine(), audit = new audit_service_js_1.AuditService(new pg_client_js_1.PgClient())) {
            this.db = db;
            this.repo = repo;
            this.policy = policy;
            this.audit = audit;
        }
        async create(actor, input) {
            this.policy.assertAllowed({
                actor: {
                    userId: actor.userId,
                    roles: actor.roles,
                    accountMode: actor.accountMode,
                },
                action: 'GOAL_CREATE',
                purpose: 'PRODUCT',
            });
            const client = await this.db.connect();
            try {
                return await (0, transaction_js_1.withTransaction)(client, async (tx) => {
                    const goal = await this.repo.create({
                        userId: actor.userId,
                        title: input.title.trim(),
                        category: input.category,
                        intent: input.intent,
                        desiredOutcome: input.desiredOutcome,
                    });
                    await (0, outbox_service_js_1.appendOutboxEvent)(tx, {
                        eventType: 'goal.created',
                        aggregateType: 'goal',
                        aggregateId: goal.id,
                        payload: {
                            userId: actor.userId,
                            goalId: goal.id,
                        },
                    });
                    await this.audit.record({
                        actorUserId: actor.userId,
                        action: 'GOAL_CREATE',
                        resourceType: 'goal',
                        resourceId: goal.id,
                        purpose: 'PRODUCT',
                        outcome: 'SUCCESS',
                    });
                    return goal;
                });
            }
            finally {
                client.release();
            }
        }
        async list(userId) {
            return this.repo.findActive(userId);
        }
        async get(actor, goalId) {
            const goal = await this.repo.findById(actor.userId, goalId);
            if (!goal) {
                throw new amal_error_js_1.AmalError(error_codes_js_1.ErrorCode.NOT_FOUND, 'Goal not found.');
            }
            this.policy.assertAllowed({
                actor: {
                    userId: actor.userId,
                    roles: actor.roles,
                    accountMode: actor.accountMode,
                },
                action: 'GOAL_READ',
                resource: {
                    type: 'goal',
                    id: goal.id,
                    ownerUserId: goal.userId,
                },
                purpose: 'PRODUCT',
            });
            return goal;
        }
        async update(actor, goalId, input) {
            const goal = await this.get(actor, goalId);
            const updated = await this.repo.update(actor.userId, goal.id, input);
            await this.audit.record({
                actorUserId: actor.userId,
                action: 'GOAL_UPDATE',
                resourceType: 'goal',
                resourceId: goalId,
                purpose: 'PRODUCT',
                outcome: 'SUCCESS',
            });
            return updated;
        }
        async delete(actor, goalId) {
            const goal = await this.get(actor, goalId);
            await this.repo.archive(actor.userId, goal.id);
            await this.audit.record({
                actorUserId: actor.userId,
                action: 'GOAL_DELETE',
                resourceType: 'goal',
                resourceId: goalId,
                purpose: 'PRODUCT',
                outcome: 'SUCCESS',
            });
            return { archived: true };
        }
    };
    return GoalsService = _classThis;
})();
exports.GoalsService = GoalsService;
//# sourceMappingURL=goals.service.js.map