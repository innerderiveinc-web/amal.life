"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessControl = void 0;
class AccessControl {
    static ROLE_HIERARCHY = {
        USER: 1,
        FAMILY_ADMIN: 2,
        SCHOLAR: 3,
        SCHOLAR_REVIEWER: 4,
        CONTENT_EDITOR: 4,
        CONTENT_REVIEWER: 5,
        ADMIN: 6,
        SUPER_ADMIN: 7,
    };
    /**
     * Check if user role meets minimum required role level
     */
    static hasRole(user, requiredRole) {
        const userLevel = this.ROLE_HIERARCHY[user.role] || 0;
        const requiredLevel = this.ROLE_HIERARCHY[requiredRole] || 0;
        return userLevel >= requiredLevel;
    }
    /**
     * Resource-level authorization: ensure users can only access their own sensitive data
     * unless they hold an administrative or assigned scholar permission.
     */
    static canAccessUserResource(actor, ownerUserId, resourceType) {
        // 1. Owner always has access
        if (actor.id === ownerUserId) {
            return true;
        }
        // 2. Super admin / Admin access only for audit / security reasons
        if (actor.role === 'SUPER_ADMIN' || actor.role === 'ADMIN') {
            // Reflections and private memories remain strictly private even from admins
            if (resourceType === 'REFLECTION' || resourceType === 'MEMORY') {
                return false;
            }
            return true;
        }
        return false;
    }
    /**
     * Scholar case access check: only assigned scholar or scholar reviewer
     */
    static canAccessScholarCase(actor, caseUserId, assignedScholarId) {
        if (actor.id === caseUserId)
            return true;
        if (actor.role === 'SUPER_ADMIN' || actor.role === 'SCHOLAR_REVIEWER')
            return true;
        if (actor.role === 'SCHOLAR' && assignedScholarId && actor.id === assignedScholarId)
            return true;
        return false;
    }
}
exports.AccessControl = AccessControl;
//# sourceMappingURL=rbac.js.map