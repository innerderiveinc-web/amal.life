"use strict";
/**
 * AMAL OS — LAYER 20: PRIVACY SERVICE (Section 20.27 & 20.28)
 * Manages GDPR/Islamic privacy requests: full data export, account deletion,
 * and immutable privacy request auditing.
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
exports.PrivacyService = void 0;
const common_1 = require("@nestjs/common");
const pg_client_js_1 = require("../../infrastructure/database/pg.client.js");
const policy_engine_js_1 = require("../../common/policy/policy.engine.js");
const audit_service_js_1 = require("../../common/audit/audit.service.js");
const amal_error_js_1 = require("../../common/errors/amal-error.js");
const error_codes_js_1 = require("../../common/errors/error-codes.js");
let PrivacyService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var PrivacyService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            PrivacyService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        db;
        policy;
        audit;
        static mockRequests = new Map();
        constructor(db = new pg_client_js_1.PgClient(), policy = new policy_engine_js_1.PolicyEngine(), audit = new audit_service_js_1.AuditService(new pg_client_js_1.PgClient())) {
            this.db = db;
            this.policy = policy;
            this.audit = audit;
        }
        async requestExport(actor) {
            this.policy.assertAllowed({
                actor: {
                    userId: actor.userId,
                    roles: actor.roles,
                    accountMode: actor.accountMode,
                },
                action: 'PRIVACY_EXPORT',
                purpose: 'COMPLIANCE',
            });
            const id = `prv_exp_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
            const record = {
                id,
                userId: actor.userId,
                requestType: 'DATA_EXPORT',
                status: 'PENDING',
                createdAt: new Date().toISOString(),
            };
            PrivacyService.mockRequests.set(id, record);
            await this.audit.record({
                actorUserId: actor.userId,
                action: 'PRIVACY_EXPORT_REQUEST',
                resourceType: 'privacy_request',
                resourceId: id,
                purpose: 'COMPLIANCE',
                outcome: 'SUCCESS',
            });
            return record;
        }
        async requestDeletion(actor, reason) {
            this.policy.assertAllowed({
                actor: {
                    userId: actor.userId,
                    roles: actor.roles,
                    accountMode: actor.accountMode,
                },
                action: 'PRIVACY_DELETION',
                purpose: 'COMPLIANCE',
            });
            const id = `prv_del_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
            const record = {
                id,
                userId: actor.userId,
                requestType: 'ACCOUNT_DELETION',
                status: 'PENDING',
                payload: { reason },
                createdAt: new Date().toISOString(),
            };
            PrivacyService.mockRequests.set(id, record);
            await this.audit.record({
                actorUserId: actor.userId,
                action: 'PRIVACY_DELETION_REQUEST',
                resourceType: 'privacy_request',
                resourceId: id,
                purpose: 'COMPLIANCE',
                outcome: 'SUCCESS',
            });
            return record;
        }
        async getStatus(actor, requestId) {
            const record = PrivacyService.mockRequests.get(requestId);
            if (!record || record.userId !== actor.userId) {
                throw new amal_error_js_1.AmalError(error_codes_js_1.ErrorCode.NOT_FOUND, `Privacy request ${requestId} not found`);
            }
            return record;
        }
        static {
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return PrivacyService = _classThis;
})();
exports.PrivacyService = PrivacyService;
//# sourceMappingURL=privacy.service.js.map