/**
 * AMAL OS — V1.5: RECOMMENDATION OPTIMIZER
 * Implements governed multi-factor recommendation ranking (Section 14).
 * Score = EvidenceFit × GoalFit × ContextFit × Feasibility × PreferenceFit × Continuity × Safety
 * Never compromises safety or verified evidence standards.
 */

import { RecommendationCandidate, LearnedPreference, PersonalizationSettings } from '@amal/types';

export interface OptimizationContext {
  availableMinutes: number;
  currentGoalTitle: string;
  preferredTimeSlot?: string;
  activePreferences: LearnedPreference[];
  settings?: PersonalizationSettings;
  recentSuccessRate: number;
}

export class RecommendationOptimizer {
  /**
   * Ranks candidates based on governed formula with full explainability.
   */
  public static rankCandidates(
    candidates: Omit<RecommendationCandidate, 'finalScore' | 'explanation'>[],
    ctx: OptimizationContext
  ): RecommendationCandidate[] {
    const isPersonalizationActive = ctx.settings?.personalizationEnabled !== false;

    const evaluated: RecommendationCandidate[] = candidates.map((cand) => {
      // 1. Safety Gate: Absolute invariant. Zero tolerance for un-safe candidates.
      if (cand.safetyScore < 1.0) {
        return {
          ...cand,
          finalScore: 0,
          explanation: {
            goalFitReason: 'Blocked by safety policy',
            recentSuccessReason: '',
            availableTimeReason: '',
            preferenceReason: '',
            continuityReason: '',
          },
        };
      }

      // 2. Feasibility adjustment against available minutes
      let feasibility = cand.feasibility;
      if (cand.amalSizeMinutes > ctx.availableMinutes) {
        feasibility = Math.max(0.1, feasibility * (ctx.availableMinutes / cand.amalSizeMinutes));
      }

      // 3. Preference fit calculation
      let preferenceFit = cand.preferenceFit;
      let matchedPrefReason = 'Fits standard daily pacing';

      if (isPersonalizationActive) {
        const timePref = ctx.activePreferences.find((p) => p.type === 'TIMING_PREFERENCE' && p.status === 'ACTIVE');
        if (timePref && cand.preferredTimeSlot) {
          if (timePref.value === cand.preferredTimeSlot) {
            preferenceFit = Math.min(1.0, preferenceFit * 1.25);
            matchedPrefReason = `Aligns with your ${timePref.value.toLowerCase().replace('_', ' ')} preference`;
          }
        }

        const sizePref = ctx.activePreferences.find((p) => p.type === 'ACTION_SIZE_PREFERENCE' && p.status === 'ACTIVE');
        if (sizePref) {
          if (cand.amalSizeMinutes <= sizePref.value) {
            preferenceFit = Math.min(1.0, preferenceFit * 1.15);
          } else {
            preferenceFit = Math.max(0.2, preferenceFit * 0.7);
          }
        }
      }

      // 4. Governed Product Multiplication Formula (Section 14)
      const rawScore =
        cand.evidenceFit *
        cand.goalFit *
        cand.contextFit *
        feasibility *
        preferenceFit *
        cand.continuity *
        cand.safetyScore;

      const finalScore = Math.round(rawScore * 1000) / 1000;

      const explanation = {
        goalFitReason: `Directly advances your goal: "${ctx.currentGoalTitle}"`,
        recentSuccessReason: `Built for steady continuity (${Math.round(ctx.recentSuccessRate * 100)}% recent consistency)`,
        availableTimeReason: `Requires ${cand.amalSizeMinutes}m (fits your ${ctx.availableMinutes}m window)`,
        preferenceReason: matchedPrefReason,
        continuityReason: 'Logical next step in your current journey phase',
        evidenceReason: cand.evidenceReference ? `Grounded in canonical evidence [${cand.evidenceReference}]` : undefined,
      };

      return {
        ...cand,
        feasibility,
        preferenceFit,
        finalScore,
        explanation,
      };
    });

    return evaluated.sort((a, b) => b.finalScore - a.finalScore);
  }
}
