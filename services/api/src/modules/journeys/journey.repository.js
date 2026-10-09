"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresJourneyRepository = void 0;
const types_1 = require("@amal/types");
const database_1 = require("@amal/database");
class PostgresJourneyRepository {
    async create(input) {
        const id = `jrn_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
        const journey = {
            id,
            userId: input.userId,
            goalId: input.goalId,
            templateId: input.templateId,
            title: input.title,
            state: types_1.JourneyState.STARTED,
            currentPhase: 1,
            startedAt: new Date().toISOString(),
            phases: [],
        };
        database_1.db.journeys.set(id, journey);
        return journey;
    }
    async findById(userId, journeyId) {
        const journey = database_1.db.journeys.get(journeyId);
        if (!journey || journey.userId !== userId) {
            return null;
        }
        return journey;
    }
    async findActive(userId) {
        return Array.from(database_1.db.journeys.values()).filter((j) => j.userId === userId && j.state !== types_1.JourneyState.ARCHIVED && j.state !== types_1.JourneyState.ABANDONED);
    }
    async updateState(userId, journeyId, state) {
        const journey = await this.findById(userId, journeyId);
        if (!journey) {
            throw new Error(`Journey ${journeyId} not found or ownership mismatch`);
        }
        journey.state = state;
        if (state === types_1.JourneyState.COMPLETED) {
            journey.completedAt = new Date().toISOString();
        }
        database_1.db.journeys.set(journeyId, journey);
        return journey;
    }
}
exports.PostgresJourneyRepository = PostgresJourneyRepository;
//# sourceMappingURL=journey.repository.js.map