"use strict";
/**
 * AMAL OS — V1.5: GOAL COLLISION ENGINE V2 & DAILY BURDEN COMPUTATION
 * Sections 36–37: Computes daily cognitive and temporal burden to prevent spiritual burnout.
 * Recommends prioritize / merge / pause / reduce — user always decides.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoalCollisionEngineV2 = void 0;
class GoalCollisionEngineV2 {
    /**
     * Calculates comprehensive daily burden and collision risk.
     */
    static evaluateDailyBurden(userId, activeGoals, maxPermittedDailyMinutes = 30) {
        const totalMinutes = activeGoals.reduce((acc, g) => acc + g.estimatedDailyMinutes, 0);
        const actionCount = activeGoals.length;
        const notificationBurden = actionCount * 2; // e.g. prompt + reflection per goal
        // Cognitive complexity: exponential growth with goal count
        const complexityScore = Math.min(1.0, (actionCount * 0.2) + (totalMinutes > 45 ? 0.3 : 0.1));
        // Collision detection: Check if time slots overlap or total time exceeds capacity
        const timeSlotsSet = new Set();
        const conflictingGoals = [];
        for (const g of activeGoals) {
            for (const slot of g.scheduledTimeSlots) {
                if (timeSlotsSet.has(slot)) {
                    conflictingGoals.push(g.id);
                }
                else {
                    timeSlotsSet.add(slot);
                }
            }
        }
        const overloadWarning = totalMinutes > maxPermittedDailyMinutes || actionCount > 4;
        const collisionDetected = conflictingGoals.length > 0 || overloadWarning;
        let recommendedResolution;
        if (collisionDetected) {
            if (actionCount > 3) {
                recommendedResolution = 'PRIORITIZE';
            }
            else if (totalMinutes > maxPermittedDailyMinutes) {
                recommendedResolution = 'REDUCE';
            }
            else {
                recommendedResolution = 'MERGE';
            }
        }
        return {
            userId,
            date: new Date().toISOString().split('T')[0],
            totalEstimatedMinutes: totalMinutes,
            totalActionsCount: actionCount,
            notificationBurdenCount: notificationBurden,
            cognitiveComplexityScore: Math.round(complexityScore * 100) / 100,
            overloadWarning,
            collisionDetected,
            conflictingGoalIds: Array.from(new Set(conflictingGoals)),
            recommendedResolution,
        };
    }
}
exports.GoalCollisionEngineV2 = GoalCollisionEngineV2;
//# sourceMappingURL=goal-collision-v2.js.map