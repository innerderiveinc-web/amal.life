"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresReflectionsRepository = void 0;
const database_1 = require("@amal/database");
class PostgresReflectionsRepository {
    async create(input) {
        const id = `ref_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
        const reflection = {
            id,
            userId: input.userId,
            journeyId: input.journeyId,
            amalId: input.amalId,
            wentWell: input.wentWell,
            frictionDetected: input.frictionDetected,
            tomorrowIntention: input.tomorrowIntention,
            privateToUser: true, // Non-negotiable: strictly private to user
            createdAt: new Date().toISOString(),
        };
        database_1.db.reflections.set(id, reflection);
        return reflection;
    }
    /**
     * Enforces that reflections can ONLY be queried by their direct owner.
     * Admins and family members cannot bypass this.
     */
    async findByUserId(userId) {
        return Array.from(database_1.db.reflections.values()).filter((r) => r.userId === userId);
    }
    async findById(userId, reflectionId) {
        const ref = database_1.db.reflections.get(reflectionId);
        if (!ref || ref.userId !== userId) {
            return null;
        }
        return ref;
    }
}
exports.PostgresReflectionsRepository = PostgresReflectionsRepository;
//# sourceMappingURL=reflections.repository.js.map