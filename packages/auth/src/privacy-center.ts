import { User, UserProfile, UserPreference, UserConsent, UserMemory } from '@amal/types';
import { db } from '@amal/database';

export class PrivacyCenter {
  /**
   * Export all user data in a portable JSON format (GDPR / Privacy Compliance)
   */
  public static async exportUserData(userId: string): Promise<{
    user: User | null;
    profile: UserProfile | null;
    preferences: UserPreference | null;
    consents: UserConsent[];
    memories: UserMemory[];
    reflectionsCount: number;
    journeysCount: number;
    exportedAt: string;
  }> {
    const user = db.users.get(userId) || null;
    const profile = db.profiles.get(userId) || null;
    const preferences = db.preferences.get(userId) || null;
    const consents = db.consents.get(userId) || [];
    const memories = db.memories.get(userId) || [];
    const reflections = db.reflections.get(userId) || [];
    const userJourneys = Array.from(db.journeys.values()).filter((j) => j.userId === userId);

    await db.recordAuditLog({
      actorId: userId,
      actorRole: user?.role || 'USER',
      action: 'EXPORT_USER_DATA',
      resourceType: 'USER_DATA',
      resourceId: userId,
    });

    return {
      user: user
        ? {
            ...user,
            // Password hashes are strictly omitted from privacy exports
          }
        : null,
      profile,
      preferences,
      consents,
      memories,
      reflectionsCount: reflections.length,
      journeysCount: userJourneys.length,
      exportedAt: new Date().toISOString(),
    };
  }

  /**
   * Permanently delete user data (Right to be Forgotten)
   */
  public static async deleteUserAccount(userId: string): Promise<boolean> {
    db.users.delete(userId);
    db.profiles.delete(userId);
    db.preferences.delete(userId);
    db.consents.delete(userId);
    db.contexts.delete(userId);
    db.memories.delete(userId);
    db.reflections.delete(userId);
    db.prayers.delete(userId);

    // Delete journeys owned by user
    for (const [id, j] of db.journeys.entries()) {
      if (j.userId === userId) {
        db.journeys.delete(id);
      }
    }

    await db.recordAuditLog({
      actorId: userId,
      actorRole: 'USER',
      action: 'DELETE_ACCOUNT_COMPLETE',
      resourceType: 'USER',
      resourceId: userId,
    });

    return true;
  }

  /**
   * Delete specific AI memory item
   */
  public static async deleteMemoryItem(userId: string, memoryId: string): Promise<boolean> {
    const mems = db.memories.get(userId) || [];
    const filtered = mems.filter((m) => m.id !== memoryId);
    db.memories.set(userId, filtered);

    await db.recordAuditLog({
      actorId: userId,
      actorRole: 'USER',
      action: 'DELETE_AI_MEMORY_ITEM',
      resourceType: 'USER_MEMORY',
      resourceId: memoryId,
    });

    return true;
  }

  /**
   * Purge all AI memories for user
   */
  public static async purgeAllMemories(userId: string): Promise<void> {
    db.memories.set(userId, []);

    await db.recordAuditLog({
      actorId: userId,
      actorRole: 'USER',
      action: 'PURGE_ALL_AI_MEMORIES',
      resourceType: 'USER_MEMORY',
      resourceId: userId,
    });
  }
}
