"use strict";
/**
 * AMAL OS — V1.5: ADAPTATION LEARNER & MULTI-FRICTION INTERVENTION RANKER
 * Sections 17–23, 85: Continuous improvement of journey adaptations.
 * Upholds Causal Caution (Section 19): Never claims adaptation caused improvement without proof.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdaptationLearner = void 0;
class AdaptationLearner {
    static outcomesStore = new Map();
    /**
     * Ranks candidate interventions for multiple simultaneous friction signals (Section 22–23).
     * Ranks by expected feasibility gain, user preference, reversibility, and risk.
     */
    static rankInterventions(frictions, userPreferredDurationMinutes = 5) {
        const candidates = [];
        const hasTimeScarcity = frictions.some((f) => f.frictionCode === 'TIME_SCARCITY');
        const hasComplexity = frictions.some((f) => f.frictionCode === 'COMPLEXITY_OVERLOAD');
        const hasReminderFatigue = frictions.some((f) => f.frictionCode === 'REMINDER_FATIGUE');
        if (hasTimeScarcity) {
            candidates.push({
                interventionId: `intv_shorten_${Date.now()}`,
                type: 'SHORTEN_DURATION',
                proposedChange: { durationMinutes: Math.min(3, userPreferredDurationMinutes) },
                expectedFeasibilityGain: 0.85,
                userPreferenceFit: 0.9,
                reversibilityScore: 1.0,
                riskScore: 0.05,
                rank: 1,
                explanation: 'Reduce target duration to 3 minutes to relieve time pressure while preserving daily consistency.',
            });
            candidates.push({
                interventionId: `intv_reschedule_${Date.now()}`,
                type: 'RESCHEDULE_WINDOW',
                proposedChange: { timeSlot: 'AFTER_FAJR' },
                expectedFeasibilityGain: 0.75,
                userPreferenceFit: 0.8,
                reversibilityScore: 1.0,
                riskScore: 0.1,
                rank: 2,
                explanation: 'Shift to early morning after Fajr before daily work commitments begin.',
            });
        }
        if (hasComplexity) {
            candidates.push({
                interventionId: `intv_simplify_${Date.now()}`,
                type: 'SIMPLIFY_ACTION',
                proposedChange: { minimumViableAmalOnly: true },
                expectedFeasibilityGain: 0.8,
                userPreferenceFit: 0.85,
                reversibilityScore: 1.0,
                riskScore: 0.05,
                rank: 3,
                explanation: 'Focus solely on the core minimum viable Amal without supplementary steps.',
            });
        }
        if (hasReminderFatigue) {
            candidates.push({
                interventionId: `intv_reduce_freq_${Date.now()}`,
                type: 'REDUCE_FREQUENCY',
                proposedChange: { muteRemindersDays: 3 },
                expectedFeasibilityGain: 0.7,
                userPreferenceFit: 0.95,
                reversibilityScore: 1.0,
                riskScore: 0.1,
                rank: 4,
                explanation: 'Pause proactive push notifications for 3 days to allow unpressured personal pace.',
            });
        }
        // Sort by weighted composite score: feasibility * preference * reversibility / (1 + risk)
        return candidates
            .sort((a, b) => {
            const scoreA = (a.expectedFeasibilityGain * a.userPreferenceFit * a.reversibilityScore) / (1 + a.riskScore);
            const scoreB = (b.expectedFeasibilityGain * b.userPreferenceFit * b.reversibilityScore) / (1 + b.riskScore);
            return scoreB - scoreA;
        })
            .map((item, idx) => ({ ...item, rank: idx + 1 }));
    }
    /**
     * Records adaptation outcomes and evaluates effectiveness with causal caution (Section 18, 19).
     */
    static recordOutcome(outcome) {
        const { beforeMetrics, afterMetrics } = outcome;
        const diff = afterMetrics.completionRate - beforeMetrics.completionRate;
        // Causal Caution (Section 19): Distinguish correlation from absolute causation
        let correlationSummary = '';
        if (diff > 0.15) {
            correlationSummary = `Your completion improved after this adjustment (from ${Math.round(beforeMetrics.completionRate * 100)}% to ${Math.round(afterMetrics.completionRate * 100)}%).`;
        }
        else if (diff < -0.1) {
            correlationSummary = `Completion rate decreased following this change. Re-evaluating next steps.`;
        }
        else {
            correlationSummary = `Completion rate remained steady following this adjustment.`;
        }
        const fullRecord = {
            ...outcome,
            correlationSummary,
        };
        const userList = this.outcomesStore.get(outcome.userId) || [];
        userList.push(fullRecord);
        this.outcomesStore.set(outcome.userId, userList);
        return fullRecord;
    }
    static getOutcomes(userId) {
        return this.outcomesStore.get(userId) || [];
    }
}
exports.AdaptationLearner = AdaptationLearner;
//# sourceMappingURL=adaptation-learner.js.map