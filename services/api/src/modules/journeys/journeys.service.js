"use strict";
/**
 * AMAL OS — LAYER 20: JOURNEYS SERVICE (Section 20.20)
 * Orchestrates journey lifecycle with Journey State Machine, policy enforcement,
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
exports.JourneysService = void 0;
const common_1 = require("@nestjs/common");
const journey_repository_js_1 = require("./journey.repository.js");
const journey_engine_1 = require("@amal/journey-engine");
const types_1 = require("@amal/types");
const policy_engine_js_1 = require("../../common/policy/policy.engine.js");
const audit_service_js_1 = require("../../common/audit/audit.service.js");
const pg_client_js_1 = require("../../infrastructure/database/pg.client.js");
const transaction_js_1 = require("../../infrastructure/database/transaction.js");
const outbox_service_js_1 = require("../../infrastructure/outbox/outbox.service.js");
const amal_error_js_1 = require("../../common/errors/amal-error.js");
const error_codes_js_1 = require("../../common/errors/error-codes.js");
let JourneysService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var JourneysService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            JourneysService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        db;
        repo;
        policy;
        audit;
        constructor(db = new pg_client_js_1.PgClient(), repo = new journey_repository_js_1.PostgresJourneyRepository(), policy = new policy_engine_js_1.PolicyEngine(), audit = new audit_service_js_1.AuditService(new pg_client_js_1.PgClient())) {
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
                action: 'JOURNEY_CREATE',
                purpose: 'PRODUCT',
            });
            const client = await this.db.connect();
            try {
                return await (0, transaction_js_1.withTransaction)(client, async (tx) => {
                    const journey = await this.repo.create({ ...input, userId: actor.userId });
                    await (0, outbox_service_js_1.appendOutboxEvent)(tx, {
                        eventType: 'journey.created',
                        aggregateType: 'journey',
                        aggregateId: journey.id,
                        payload: {
                            userId: actor.userId,
                            journeyId: journey.id,
                        },
                    });
                    await this.audit.record({
                        actorUserId: actor.userId,
                        action: 'JOURNEY_CREATE',
                        resourceType: 'journey',
                        resourceId: journey.id,
                        purpose: 'PRODUCT',
                        outcome: 'SUCCESS',
                    });
                    return journey;
                });
            }
            finally {
                client.release();
            }
        }
        async findById(userId, journeyId) {
            return this.repo.findById(userId, journeyId);
        }
        async findActive(userId) {
            return this.repo.findActive(userId);
        }
        async transition(actor, journeyId, targetState) {
            const journey = await this.repo.findById(actor.userId, journeyId);
            if (!journey) {
                throw new amal_error_js_1.AmalError(error_codes_js_1.ErrorCode.NOT_FOUND, `Journey ${journeyId} not found or access denied`);
            }
            this.policy.assertAllowed({
                actor: {
                    userId: actor.userId,
                    roles: actor.roles,
                    accountMode: actor.accountMode,
                },
                action: `JOURNEY_${targetState}`,
                resource: {
                    type: 'journey',
                    id: journey.id,
                    ownerUserId: journey.userId,
                },
                purpose: 'PRODUCT',
            });
            if (!journey_engine_1.JourneyStateMachine.canTransition(journey.state, targetState)) {
                throw new amal_error_js_1.AmalError(error_codes_js_1.ErrorCode.CONFLICT, `Cannot transition journey from ${journey.state} to ${targetState}`);
            }
            const nextState = journey_engine_1.JourneyStateMachine.transition(journey.state, targetState);
            const client = await this.db.connect();
            try {
                return await (0, transaction_js_1.withTransaction)(client, async (tx) => {
                    const updated = await this.repo.updateState(actor.userId, journeyId, nextState);
                    await (0, outbox_service_js_1.appendOutboxEvent)(tx, {
                        eventType: `journey.${targetState.toLowerCase()}`,
                        aggregateType: 'journey',
                        aggregateId: journeyId,
                        payload: {
                            userId: actor.userId,
                            journeyId,
                            from: journey.state,
                            to: nextState,
                        },
                    });
                    await this.audit.record({
                        actorUserId: actor.userId,
                        action: `JOURNEY_${targetState}`,
                        resourceType: 'journey',
                        resourceId: journeyId,
                        purpose: 'PRODUCT',
                        outcome: 'SUCCESS',
                        metadata: { from: journey.state, to: nextState },
                    });
                    return updated;
                });
            }
            finally {
                client.release();
            }
        }
        async start(actor, journeyId) {
            // If discovered, advance through previewed to started or active
            const journey = await this.repo.findById(actor.userId, journeyId);
            if (!journey) {
                throw new amal_error_js_1.AmalError(error_codes_js_1.ErrorCode.NOT_FOUND, `Journey ${journeyId} not found`);
            }
            let targetState = types_1.JourneyState.STARTED;
            if (journey.state === types_1.JourneyState.STARTED) {
                targetState = types_1.JourneyState.ACTIVE;
            }
            else if (journey.state === types_1.JourneyState.DISCOVERED) {
                // previewed first
                await this.transition(actor, journeyId, types_1.JourneyState.PREVIEWED);
            }
            return this.transition(actor, journeyId, targetState);
        }
    };
    return JourneysService = _classThis;
})();
exports.JourneysService = JourneysService;
//# sourceMappingURL=journeys.service.js.map