/**
 * AMAL OS — V1.5: GOAL COLLISION ENGINE V2 & DAILY BURDEN COMPUTATION
 * Sections 36–37: Computes daily cognitive and temporal burden to prevent spiritual burnout.
 * Recommends prioritize / merge / pause / reduce — user always decides.
 */
import { DailyBurdenReport } from '@amal/types';
export interface ActiveGoalContext {
    id: string;
    title: string;
    category: string;
    priority: 'HIGH' | 'MEDIUM' | 'LOW';
    estimatedDailyMinutes: number;
    scheduledTimeSlots: string[];
}
export declare class GoalCollisionEngineV2 {
    /**
     * Calculates comprehensive daily burden and collision risk.
     */
    static evaluateDailyBurden(userId: string, activeGoals: ActiveGoalContext[], maxPermittedDailyMinutes?: number): DailyBurdenReport;
}
//# sourceMappingURL=goal-collision-v2.d.ts.map