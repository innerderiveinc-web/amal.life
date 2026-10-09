"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.policy = exports.PolicyEngine = void 0;
class PolicyEngine {
    /**
     * Central Policy Decision Point (PDP) evaluating ABAC, RBAC,
     * Resource Ownership, Purpose Limitation, Family Isolation, and Child Privacy.
     */
    static evaluate(req) {
        const reasonCodes = [];
        const obligations = [];
        const redactedFields = [];
        // 1. Break-Glass Emergency Administrative Access
        if (req.context?.breakGlassActive === true) {
            obligations.push('LOG_CRITICAL_BREAK_GLASS_ACCESS');
            obligations.push('NOTIFY_SECURITY_OPERATIONS');
            return {
                effect: 'ALLOW',
                reasonCodes: ['BREAK_GLASS_AUTHORIZED'],
                obligations,
                auditRequired: true,
            };
        }
        // 2. Family Privacy & Adult Reflection Isolation
        // Invariant: Family membership != Reflection visibility
        if ((req.resourceType === 'REFLECTION' || req.resourceType === 'ADULT_JOURNAL') &&
            req.actorType === 'FAMILY_OWNER') {
            const explicitShare = req.context?.familyShared === true;
            if (!explicitShare) {
                reasonCodes.push('FAMILY_REFLECTION_ISOLATION_ENFORCED');
                return {
                    effect: 'DENY',
                    reasonCodes,
                    auditRequired: true,
                };
            }
        }
        // 3. Minor / Child Mode Gating
        if (req.accountMode === 'CHILD') {
            // Child reflections are private by default; parental access requires explicit permission
            if (req.resourceType === 'REFLECTION' && req.actorId !== req.resourceOwnerId) {
                reasonCodes.push('CHILD_PRIVACY_PROTECTED');
                return {
                    effect: 'DENY',
                    reasonCodes,
                    auditRequired: true,
                };
            }
            // Restrict high-risk external communication and direct scholar private case opening without parent consent
            if (req.action === 'CREATE_SCHOLAR_CASE' && !req.context?.parentalApproval) {
                reasonCodes.push('CHILD_SCHOLAR_WORKFLOW_RESTRICTED');
                return {
                    effect: 'DENY',
                    reasonCodes,
                    auditRequired: true,
                };
            }
        }
        // 4. Customer Support Privacy Minimization
        if (req.actorType === 'SUPPORT_OPERATOR') {
            if (req.resourceType === 'REFLECTION' ||
                req.resourceType === 'AI_CHAT_HISTORY' ||
                req.resourceType === 'SCHOLAR_CASE_NOTES') {
                reasonCodes.push('SUPPORT_AGENT_PRIVACY_BARRIER');
                return {
                    effect: 'DENY',
                    reasonCodes,
                    auditRequired: true,
                };
            }
            // Automatically redact sensitive diagnostic payload
            redactedFields.push('reflectionText', 'scholarNotes', 'privateContext');
        }
        // 5. Purpose Limitation Gating
        // Reflection or private journal context cannot be accessed for external communication or marketing
        if ((req.resourceType === 'REFLECTION' || req.resourceType === 'PERSONAL_CONTEXT') &&
            (req.purpose === 'COMMUNICATION' || req.purpose === 'MARKETING')) {
            if (!req.context?.explicitMarketingConsent) {
                reasonCodes.push('PURPOSE_LIMITATION_VIOLATED');
                return {
                    effect: 'DENY',
                    reasonCodes,
                    auditRequired: true,
                };
            }
        }
        // 6. Resource Ownership & ABAC check for Standard Users
        if (req.actorType === 'USER' && req.resourceOwnerId) {
            const isOwner = req.actorId === req.resourceOwnerId;
            const isExplicitlyShared = req.context?.isSharedWithUser === true;
            if (!isOwner && !isExplicitlyShared) {
                reasonCodes.push('RESOURCE_OWNERSHIP_MISMATCH');
                return {
                    effect: 'DENY',
                    reasonCodes,
                    auditRequired: true,
                };
            }
        }
        // 7. Data Classification Clearance & Automatic Redaction
        if (req.requestedDataClasses && req.requestedDataClasses.length > 0) {
            const hasHighlySensitive = req.requestedDataClasses.includes('HIGHLY_SENSITIVE');
            const isPrivileged = req.actorType === 'ADMIN' ||
                req.actorType === 'SECURITY_OPERATOR' ||
                (req.actorType === 'SCHOLAR' && req.purpose === 'SCHOLAR_REVIEW');
            if (hasHighlySensitive && !isPrivileged && req.actorId !== req.resourceOwnerId) {
                reasonCodes.push('DATA_CLASS_REDACTED');
                redactedFields.push('sensitiveInferences', 'confidentialNotes');
                return {
                    effect: 'REDACT',
                    reasonCodes,
                    redactedFields,
                    auditRequired: true,
                };
            }
        }
        // 8. Authorized
        return {
            effect: 'ALLOW',
            reasonCodes: ['POLICY_AUTHORIZED'],
            obligations,
            redactedFields: redactedFields.length > 0 ? redactedFields : undefined,
            auditRequired: req.requestedDataClasses?.includes('SENSITIVE') ?? false,
        };
    }
    static decide(req) {
        return PolicyEngine.evaluate(req);
    }
    decide(req) {
        return PolicyEngine.evaluate(req);
    }
}
exports.PolicyEngine = PolicyEngine;
exports.policy = new PolicyEngine();
//# sourceMappingURL=policy-engine.js.map