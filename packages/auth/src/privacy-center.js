"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrivacyCenter = void 0;
const database_1 = require("@amal/database");
class PrivacyCenter {
    /**
     * Export all user data in a portable JSON format (GDPR / Privacy Compliance)
     */
    static async exportUserData(userId) {
        const user = database_1.db.users.get(userId) || null;
        const profile = database_1.db.profiles.get(userId) || null;
        const preferences = database_1.db.preferences.get(userId) || null;
        const consents = database_1.db.consents.get(userId) || [];
        const memories = database_1.db.memories.get(userId) || [];
        const reflections = database_1.db.reflections.get(userId) || [];
        const userJourneys = Array.from(database_1.db.journeys.values()).filter((j) => j.userId === userId);
        await database_1.db.recordAuditLog({
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
    static async deleteUserAccount(userId) {
        database_1.db.users.delete(userId);
        database_1.db.profiles.delete(userId);
        database_1.db.preferences.delete(userId);
        database_1.db.consents.delete(userId);
        database_1.db.contexts.delete(userId);
        database_1.db.memories.delete(userId);
        database_1.db.reflections.delete(userId);
        database_1.db.prayers.delete(userId);
        // Delete journeys owned by user
        for (const [id, j] of database_1.db.journeys.entries()) {
            if (j.userId === userId) {
                database_1.db.journeys.delete(id);
            }
        }
        await database_1.db.recordAuditLog({
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
    static async deleteMemoryItem(userId, memoryId) {
        const mems = database_1.db.memories.get(userId) || [];
        const filtered = mems.filter((m) => m.id !== memoryId);
        database_1.db.memories.set(userId, filtered);
        await database_1.db.recordAuditLog({
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
    static async purgeAllMemories(userId) {
        database_1.db.memories.set(userId, []);
        await database_1.db.recordAuditLog({
            actorId: userId,
            actorRole: 'USER',
            action: 'PURGE_ALL_AI_MEMORIES',
            resourceType: 'USER_MEMORY',
            resourceId: userId,
        });
    }
}
exports.PrivacyCenter = PrivacyCenter;
//# sourceMappingURL=privacy-center.js.map