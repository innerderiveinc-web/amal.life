export declare class FamilyIsolationGuard {
    /**
     * Enforces zero leakage of adult personal reflections and private AI queries to family members.
     */
    static canAccessResource(requestingUserId: string, ownerUserId: string, resourceType: 'SHARED_CHALLENGE' | 'PUBLIC_MILESTONE' | 'PRIVATE_REFLECTION' | 'AI_CHAT'): boolean;
}
//# sourceMappingURL=isolation.d.ts.map