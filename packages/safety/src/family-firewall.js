"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FamilyPrivacyFirewall = void 0;
class FamilyPrivacyFirewall {
    /**
     * Determine if a user can view another family member's reflection
     */
    static canAccessReflection(requestingUserId, targetUserId, isTargetChild, isParentalSupervisionExplicitlyGranted) {
        // 1. A user can always view their own reflection
        if (requestingUserId === targetUserId) {
            return { allowed: true, reason: 'User owns this reflection.' };
        }
        // 2. Adult reflections are strictly private and NEVER accessible by other members
        if (!isTargetChild) {
            return {
                allowed: false,
                reason: 'Adult family members have absolute private reflection boundaries. Reflections are never shared across adults.',
            };
        }
        // 3. For children under parental supervision, only allowed if explicitly configured
        if (isTargetChild && isParentalSupervisionExplicitlyGranted) {
            return {
                allowed: true,
                reason: 'Parental supervision granted for minor child.',
            };
        }
        return {
            allowed: false,
            reason: 'Child reflections remain private unless explicitly configured under family parental consent.',
        };
    }
    /**
     * Sanitizes family view: transforms member progress into aggregate-only metrics
     */
    static sanitizeFamilyProgressView(memberActivities) {
        const total = memberActivities.length;
        const completed = memberActivities.filter((a) => a.isCompleted).length;
        return {
            totalActions: total,
            completedCount: completed,
            completionRate: total > 0 ? completed / total : 0,
            // Notice: reflectionNotes is completely redacted from the family circle feed
            activitiesSummary: memberActivities.map((a) => ({
                actionTitle: a.actionTitle,
                isCompleted: a.isCompleted,
            })),
        };
    }
}
exports.FamilyPrivacyFirewall = FamilyPrivacyFirewall;
//# sourceMappingURL=family-firewall.js.map