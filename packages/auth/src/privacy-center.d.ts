import { User, UserProfile, UserPreference, UserConsent, UserMemory } from '@amal/types';
export declare class PrivacyCenter {
    /**
     * Export all user data in a portable JSON format (GDPR / Privacy Compliance)
     */
    static exportUserData(userId: string): Promise<{
        user: User | null;
        profile: UserProfile | null;
        preferences: UserPreference | null;
        consents: UserConsent[];
        memories: UserMemory[];
        reflectionsCount: number;
        journeysCount: number;
        exportedAt: string;
    }>;
    /**
     * Permanently delete user data (Right to be Forgotten)
     */
    static deleteUserAccount(userId: string): Promise<boolean>;
    /**
     * Delete specific AI memory item
     */
    static deleteMemoryItem(userId: string, memoryId: string): Promise<boolean>;
    /**
     * Purge all AI memories for user
     */
    static purgeAllMemories(userId: string): Promise<void>;
}
//# sourceMappingURL=privacy-center.d.ts.map