"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresGoalRepository = void 0;
const database_1 = require("@amal/database");
class PostgresGoalRepository {
    async create(input) {
        const id = `goal_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
        const goal = {
            id,
            userId: input.userId,
            title: input.title,
            category: input.category,
            intent: input.intent,
            status: 'ACTIVE',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        database_1.db.goals.set(id, goal);
        return goal;
    }
    /**
     * Enforces user ownership strictly at the query level
     */
    async findById(userId, goalId) {
        const goal = database_1.db.goals.get(goalId);
        if (!goal || goal.userId !== userId) {
            return null;
        }
        return goal;
    }
    async findActive(userId) {
        return Array.from(database_1.db.goals.values()).filter((g) => g.userId === userId && g.status === 'ACTIVE');
    }
    async update(userId, goalId, input) {
        const goal = await this.findById(userId, goalId);
        if (!goal) {
            throw new Error(`Goal ${goalId} not found or ownership mismatch`);
        }
        if (input.title)
            goal.title = input.title;
        if (input.status)
            goal.status = input.status;
        goal.updatedAt = new Date().toISOString();
        database_1.db.goals.set(goalId, goal);
        return goal;
    }
    async archive(userId, goalId) {
        const goal = await this.findById(userId, goalId);
        if (goal) {
            goal.status = 'ARCHIVED';
            goal.updatedAt = new Date().toISOString();
            database_1.db.goals.set(goalId, goal);
        }
    }
}
exports.PostgresGoalRepository = PostgresGoalRepository;
//# sourceMappingURL=goal.repository.js.map