"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationService = void 0;
const policy_engine_js_1 = require("./policy-engine.js");
class AuthorizationService {
    /**
     * Asserts whether a user or family member can read a reflection.
     * Strictly enforces adult reflection isolation.
     */
    static canReadReflection(user, reflection) {
        const decision = policy_engine_js_1.PolicyEngine.evaluate({
            actorId: user.id,
            actorType: user.role === 'ADMIN' ? 'ADMIN' : user.id === reflection.userId ? 'USER' : 'FAMILY_OWNER',
            action: 'READ',
            resourceType: 'REFLECTION',
            resourceId: reflection.id,
            resourceOwnerId: reflection.userId,
            purpose: 'CORE_SERVICE',
            accountMode: user.accountMode || 'ADULT',
            context: {
                familyShared: reflection.isSharedWithFamily === true,
            },
        });
        return decision.effect === 'ALLOW';
    }
    /**
     * Asserts whether an actor can manage family configuration.
     */
    static canManageFamily(user, familyOwnerId) {
        return user.id === familyOwnerId || user.role === 'ADMIN';
    }
    /**
     * Asserts whether a user can initiate scholar inquiry.
     * Gated for minor/child accounts.
     */
    static canEscalateToScholar(user, parentalApproval = false) {
        if (user.accountMode === 'CHILD' && !parentalApproval) {
            return false;
        }
        return true;
    }
    /**
     * Asserts valid break-glass emergency administrative access.
     * Requires separate approver (Four-Eyes principle).
     */
    static canBreakGlass(admin, justification, approverId) {
        if (admin.role !== 'ADMIN' && admin.role !== 'SECURITY_OPERATOR') {
            return false;
        }
        if (!justification || justification.trim().length < 10) {
            return false;
        }
        // Strict requirement: admin cannot approve their own break-glass request
        if (admin.id === approverId) {
            return false;
        }
        return true;
    }
}
exports.AuthorizationService = AuthorizationService;
//# sourceMappingURL=authorization.js.map