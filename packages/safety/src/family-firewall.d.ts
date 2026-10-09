export declare class FamilyPrivacyFirewall {
    /**
     * Determine if a user can view another family member's reflection
     */
    static canAccessReflection(requestingUserId: string, targetUserId: string, isTargetChild: boolean, isParentalSupervisionExplicitlyGranted: boolean): {
        allowed: boolean;
        reason: string;
    };
    /**
     * Sanitizes family view: transforms member progress into aggregate-only metrics
     */
    static sanitizeFamilyProgressView(memberActivities: {
        userId: string;
        actionTitle: string;
        isCompleted: boolean;
        reflectionNotes?: string | null;
    }[]): {
        totalActions: number;
        completedCount: number;
        completionRate: number;
        activitiesSummary: {
            actionTitle: string;
            isCompleted: boolean;
        }[];
    };
}
//# sourceMappingURL=family-firewall.d.ts.map