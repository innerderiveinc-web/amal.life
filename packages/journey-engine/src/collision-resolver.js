"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JourneyCollisionEngine = void 0;
class JourneyCollisionEngine {
    static detectAndResolve(activeJourneys, availableMinutes) {
        const totalRequested = activeJourneys.reduce((sum, j) => sum + j.requestedDailyMinutes, 0);
        if (totalRequested > availableMinutes) {
            const surplus = totalRequested - availableMinutes;
            return {
                hasCollision: true,
                totalRequestedMinutes: totalRequested,
                availableMinutes,
                surplusMinutes: surplus,
                message: `Your active journeys currently ask for ${totalRequested} minutes, which exceeds your planned capacity (${availableMinutes} mins). Would you like to simplify or adjust one?`,
                proposedOptions: ['SIMPLIFY', 'RESCHEDULE', 'PAUSE', 'KEEP'],
            };
        }
        return {
            hasCollision: false,
            totalRequestedMinutes: totalRequested,
            availableMinutes,
            surplusMinutes: 0,
        };
    }
}
exports.JourneyCollisionEngine = JourneyCollisionEngine;
//# sourceMappingURL=collision-resolver.js.map