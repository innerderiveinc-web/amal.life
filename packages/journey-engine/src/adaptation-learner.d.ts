/**
 * AMAL OS — V1.5: ADAPTATION LEARNER & MULTI-FRICTION INTERVENTION RANKER
 * Sections 17–23, 85: Continuous improvement of journey adaptations.
 * Upholds Causal Caution (Section 19): Never claims adaptation caused improvement without proof.
 */
import { FrictionSignalV2, AdaptationIntervention, AdaptationOutcomeRecord } from '@amal/types';
export declare class AdaptationLearner {
    private static outcomesStore;
    /**
     * Ranks candidate interventions for multiple simultaneous friction signals (Section 22–23).
     * Ranks by expected feasibility gain, user preference, reversibility, and risk.
     */
    static rankInterventions(frictions: FrictionSignalV2[], userPreferredDurationMinutes?: number): AdaptationIntervention[];
    /**
     * Records adaptation outcomes and evaluates effectiveness with causal caution (Section 18, 19).
     */
    static recordOutcome(outcome: Omit<AdaptationOutcomeRecord, 'correlationSummary'>): AdaptationOutcomeRecord;
    static getOutcomes(userId: string): AdaptationOutcomeRecord[];
}
//# sourceMappingURL=adaptation-learner.d.ts.map