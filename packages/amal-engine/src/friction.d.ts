export type FrictionType = 'FORGETTING' | 'TIME' | 'ENERGY' | 'LOCATION' | 'DEVICE' | 'COMPLEXITY' | 'LOW_MOTIVATION' | 'UNCLEAR_NEXT_STEP' | 'EMOTIONAL_RESISTANCE' | 'SCHEDULE_CONFLICT' | 'TOO_LONG' | 'TOO_DIFFICULT' | 'TOO_EARLY' | 'TOO_LATE' | 'ENVIRONMENT';
export interface FrictionAnalysis {
    type: FrictionType;
    confidence: number;
    adaptationRecommended: boolean;
    suggestedAction?: 'SIMPLIFY' | 'SHORTEN' | 'RESCHEDULE' | 'PAUSE' | 'ASK_USER';
    propheticMessage: string;
}
export declare class FrictionEngine {
    static evaluateFrictionSignals(params: {
        consecutiveMisses: number;
        reflectionReason?: string;
        actionDurationMinutes?: number;
        scheduledTime?: string;
    }): FrictionAnalysis;
}
//# sourceMappingURL=friction.d.ts.map