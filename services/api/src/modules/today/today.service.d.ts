/**
 * AMAL OS — LAYER 20: TODAY PLANNER SERVICE (Section 20.25 & 20.26)
 * Generates the deterministic Today plan:
 * Formula: E * G * C * F * P * Cont * S
 * Enforces feasibility threshold >= 0.6, 1 primary action, 0-2 optional actions.
 */
import { TodayResponse } from '@amal/types';
export interface PlanCandidate {
    id: string;
    title: string;
    description: string;
    estimatedMinutes: number;
    evidenceWeight: number;
    goalRelevance: number;
    contextFit: number;
    feasibility: number;
    userPreference: number;
    continuity: number;
    spiritualSeason: number;
    score?: number;
}
export declare class TodayService {
    /**
     * Deterministically calculates candidate ranking:
     * Score = E * G * C * F * P * Cont * S
     */
    calculateScore(c: PlanCandidate): number;
    rankCandidates(candidates: PlanCandidate[]): PlanCandidate[];
    getToday(userId: string): Promise<TodayResponse>;
}
//# sourceMappingURL=today.service.d.ts.map