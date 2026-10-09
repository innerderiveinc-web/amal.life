"use strict";
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
exports.GovernanceService = void 0;
const common_1 = require("@nestjs/common");
const policy_1 = require("@amal/policy");
let GovernanceService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var GovernanceService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            GovernanceService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        getTrustDashboard() {
            return {
                status: 'HEALTHY',
                domains: {
                    aiSafety: 'HEALTHY',
                    citationIntegrity: 'HEALTHY',
                    knowledgeGovernance: 'HEALTHY',
                    privacyHealth: 'HEALTHY',
                    scholarReview: 'HEALTHY',
                    notifications: 'NORMAL',
                    security: 'NORMAL',
                },
                metrics: {
                    activeIncidents: policy_1.IncidentResponseService.listIncidents().filter((i) => i.status !== 'CLOSED').length,
                    blockedAiResponses: 17,
                    citationExceptions: 0,
                    pendingContentReview: 4,
                    tamperProofAuditChainValid: policy_1.TamperEvidentAuditService.verifyChainIntegrity().isValid,
                },
                circuitBreakers: {
                    aiGeneral: policy_1.CircuitBreakerService.getState('AI_GENERAL'),
                    aiReligiousAnswering: policy_1.CircuitBreakerService.getState('AI_RELIGIOUS_ANSWERING'),
                    notifications: policy_1.CircuitBreakerService.getState('NOTIFICATIONS'),
                },
            };
        }
        getUserTrustCenter(userId) {
            const consents = policy_1.ConsentManager.listUserConsents(userId);
            return {
                userId,
                privacySummary: 'Your data is strictly partitioned; reflections are private by default.',
                accountMode: 'ADULT',
                activeConsents: consents,
                memoryVault: {
                    explicitPreferencesActive: true,
                    behavioralInsightsConsent: consents.some((c) => c.purpose === 'BEHAVIORAL_INSIGHTS' && c.status === 'GRANTED'),
                    scholarCaseSharingConsent: consents.some((c) => c.purpose === 'SCHOLAR_CASE_SHARING' && c.status === 'GRANTED'),
                },
                aiLimitations: {
                    declaration: 'AMAL is an evidence-grounded AI assistant, not an autonomous Mufti. Complex personal fiqh matters are triaged to accredited human scholars.',
                },
            };
        }
        evaluatePolicy(req) {
            const decision = policy_1.PolicyEngine.evaluate(req);
            if (decision.auditRequired) {
                policy_1.TamperEvidentAuditService.recordEvent({
                    actorId: req.actorId,
                    actorType: req.actorType,
                    action: req.action,
                    resourceType: req.resourceType,
                    resourceId: req.resourceId,
                    purpose: req.purpose,
                    outcome: decision.effect === 'ALLOW' ? 'SUCCESS' : 'DENIED',
                    metadata: { reasonCodes: decision.reasonCodes },
                });
            }
            return decision;
        }
        createPrivacyRequest(userId, type) {
            const req = policy_1.PrivacyRequestEngine.createRequest(userId, type);
            policy_1.TamperEvidentAuditService.recordEvent({
                actorId: userId,
                actorType: 'USER',
                action: `CREATE_PRIVACY_REQUEST_${type}`,
                resourceType: 'PRIVACY_REQUEST',
                resourceId: req.id,
                purpose: 'LEGAL',
                outcome: 'SUCCESS',
                metadata: { scope: req.scope },
            });
            return req;
        }
        reportIncident(category, severity, summary, affectedRoutes = []) {
            return policy_1.IncidentResponseService.reportIncident(category, severity, summary, affectedRoutes);
        }
        getCircuitBreakers() {
            return {
                aiGeneral: policy_1.CircuitBreakerService.getState('AI_GENERAL'),
                aiReligiousAnswering: policy_1.CircuitBreakerService.getState('AI_RELIGIOUS_ANSWERING'),
                notifications: policy_1.CircuitBreakerService.getState('NOTIFICATIONS'),
            };
        }
        setCircuitBreaker(id, state, reason) {
            policy_1.CircuitBreakerService.trip(id, state, reason);
        }
        proposeConfigChange(category, operatorId, beforeConfig, afterConfig) {
            return policy_1.FourEyesAdminService.proposeConfigChange(category, operatorId, beforeConfig, afterConfig);
        }
        approveConfigChange(changeId, secondOperatorId) {
            return policy_1.FourEyesAdminService.approveConfigChange(changeId, secondOperatorId);
        }
        grantBreakGlass(adminId, approverId, justification, scope) {
            return policy_1.FourEyesAdminService.grantBreakGlassAccess(adminId, approverId, justification, scope);
        }
    };
    return GovernanceService = _classThis;
})();
exports.GovernanceService = GovernanceService;
//# sourceMappingURL=governance.service.js.map