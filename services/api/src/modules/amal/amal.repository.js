"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresAmalRepository = void 0;
const database_1 = require("@amal/database");
class PostgresAmalRepository {
    static completions = new Map();
    async create(input) {
        const id = `amal_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
        const amal = {
            id,
            userId: input.userId,
            journeyId: input.journeyId,
            title: input.title,
            type: input.type,
            category: 'PERSONAL_GROWTH',
            durationMinutes: input.durationMinutes,
            status: 'ACTIVE',
            completionCount: 0,
            createdAt: new Date().toISOString(),
        };
        database_1.db.amals.set(id, amal);
        return amal;
    }
    async findById(userId, amalId) {
        const amal = database_1.db.amals.get(amalId);
        if (!amal || amal.userId !== userId) {
            return null;
        }
        return amal;
    }
    async findToday(userId) {
        return Array.from(database_1.db.amals.values()).filter((a) => a.userId === userId && a.status === 'ACTIVE');
    }
    async complete(input) {
        // Check idempotency
        for (const record of PostgresAmalRepository.completions.values()) {
            if (record.idempotencyKey === input.idempotencyKey) {
                return record;
            }
        }
        const amal = await this.findById(input.userId, input.amalId);
        if (!amal) {
            throw new Error(`Amal ${input.amalId} not found or ownership mismatch`);
        }
        amal.completionCount = (amal.completionCount || 0) + 1;
        amal.lastCompletedAt = new Date().toISOString();
        database_1.db.amals.set(amal.id, amal);
        const recordId = `cmp_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
        const completion = {
            id: recordId,
            amalId: input.amalId,
            userId: input.userId,
            completionType: input.completionType,
            durationMinutes: input.durationMinutes || amal.durationMinutes,
            notes: input.notes,
            completedAt: new Date().toISOString(),
            idempotencyKey: input.idempotencyKey,
        };
        PostgresAmalRepository.completions.set(recordId, completion);
        return completion;
    }
}
exports.PostgresAmalRepository = PostgresAmalRepository;
//# sourceMappingURL=amal.repository.js.map