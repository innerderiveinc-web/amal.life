"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FamilyIsolationGuard = void 0;
class FamilyIsolationGuard {
    /**
     * Enforces zero leakage of adult personal reflections and private AI queries to family members.
     */
    static canAccessResource(requestingUserId, ownerUserId, resourceType) {
        if (requestingUserId === ownerUserId)
            return true;
        // Strict boundary: Reflections and AI chats are strictly isolated to the resource owner
        if (resourceType === 'PRIVATE_REFLECTION' || resourceType === 'AI_CHAT') {
            return false;
        }
        return true;
    }
}
exports.FamilyIsolationGuard = FamilyIsolationGuard;
//# sourceMappingURL=isolation.js.map