import { FatigueMetrics, CommunicationPreferences, NotificationInteractionAction } from '@amal/types';
export interface FatigueEvaluationResult {
    shouldSuppress: boolean;
    fatigueScore: number;
    reason?: string;
    recommendedChannelAction?: 'NORMAL' | 'DEGRADE_TO_IN_APP' | 'SUPPRESS_ALL_ROUTINE';
}
export declare class FatigueEngine {
    private static readonly PRESSURE_MULTIPLIERS;
    /**
     * Computes the fatigue score according to:
     * FatigueScore = VolumeFactor * DismissalFactor * IgnoreFactor * PressureMultiplier
     */
    static calculateFatigueScore(metrics: FatigueMetrics, preferences: CommunicationPreferences): number;
    /**
     * Evaluates if outgoing communication should be suppressed or downgraded.
     * Core rule: Repeated dismissals decrease frequency; NEVER escalate.
     */
    static evaluateFatigue(metrics: FatigueMetrics, preferences: CommunicationPreferences): FatigueEvaluationResult;
    /**
     * Records a user interaction and adjusts dismissal/ignore metrics smoothly
     */
    static recordInteraction(current: FatigueMetrics, action: NotificationInteractionAction): FatigueMetrics;
}
//# sourceMappingURL=fatigue-engine.d.ts.map