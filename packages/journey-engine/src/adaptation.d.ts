export type AdaptationAction = 'NO_CHANGE' | 'CHECK_IN_OFFER' | 'PROPOSE_SIMPLIFICATION' | 'PASTORAL_CONVERSATION';
export interface AdaptationEvaluationResult {
    action: AdaptationAction;
    reductionPercentage: number;
    reassuranceMessage?: string;
    recommendedDurationMinutes?: number;
}
export declare class JourneyAdaptationEngine {
    /**
     * Section 46 & 71 Adaptation Policy:
     * 1 miss -> no adaptation
     * 2 consecutive misses -> optional check-in
     * 3 misses / 7 days -> adaptation candidate
     * repeated struggle -> user conversation
     * Never punish or shame.
     */
    static evaluate(consecutiveMisses: number, weeklyMisses: number, currentMinutes: number): AdaptationEvaluationResult;
}
//# sourceMappingURL=adaptation.d.ts.map