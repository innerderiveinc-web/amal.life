/**
 * AMAL OS — V1.5: PREFERENCE LEARNER & HIERARCHICAL CONFLICT RESOLVER
 * Sections 4–9, 80: Explicit > Confirmed > Strong Behavioral > Weak Behavioral > AI Inference.
 * Strictly prevents silent overwrites and safeguards against data poisoning.
 */

import {
  LearnedPreference,
  PreferenceType,
  PreferenceSourceTier,
  PreferenceState,
} from '@amal/types';

export interface ObservationRecord {
  type: PreferenceType;
  value: any;
  timestamp: string;
  isMatch: boolean;
}

export class PreferenceLearner {
  private static readonly SOURCE_WEIGHTS: Record<PreferenceSourceTier, number> = {
    EXPLICIT_USER_CHOICE: 1.0,
    USER_CONFIRMED: 0.9,
    STRONG_BEHAVIORAL: 0.75,
    WEAK_BEHAVIORAL: 0.5,
    AI_INFERENCE: 0.3,
  };

  /**
   * Calculates mathematically sound confidence from sample count, consistency, and source tier.
   * Avoids one isolated event creating an overfitted preference (Section 7, 80).
   */
  public static calculateConfidence(
    sampleCount: number,
    matches: number,
    contradictions: number,
    tier: PreferenceSourceTier
  ): number {
    if (sampleCount <= 0) return 0;
    const tierWeight = this.SOURCE_WEIGHTS[tier] || 0.3;

    // Consistency ratio with laplacian smoothing
    const consistency = (matches + 1) / (sampleCount + 2);

    // Sample size confidence curve: saturates around 8-10 observations
    const sampleFactor = Math.min(1.0, sampleCount / 8);

    // Penalty for contradictory evidence
    const contradictionPenalty = Math.max(0, 1.0 - (contradictions / sampleCount) * 0.8);

    const rawConfidence = tierWeight * consistency * sampleFactor * contradictionPenalty;
    return Math.min(0.99, Math.max(0.05, Math.round(rawConfidence * 100) / 100));
  }

  /**
   * Applies temporal decay to a preference if no corroborating evidence has been seen recently.
   * Section 8: Decay & freshness.
   */
  public static applyDecay(pref: LearnedPreference, currentDate: Date = new Date()): LearnedPreference {
    if (pref.source === 'EXPLICIT_USER_CHOICE' || pref.source === 'USER_CONFIRMED') {
      // Explicit choices never decay passively (Section 40)
      return pref;
    }

    const lastObs = new Date(pref.lastObservedAt);
    const diffDays = Math.max(0, (currentDate.getTime() - lastObs.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays > 14) {
      // 5% confidence decay per week after 14 days of silence
      const decayFactor = Math.pow(0.95, (diffDays - 14) / 7);
      const updatedConfidence = Math.max(0.1, Math.round(pref.confidence * decayFactor * 100) / 100);

      const isExpired = updatedConfidence < 0.25;
      return {
        ...pref,
        confidence: updatedConfidence,
        status: isExpired ? 'EXPIRED' : pref.status,
      };
    }

    return pref;
  }

  /**
   * Resolves conflicts between an incoming candidate and existing preferences.
   * Section 9: If explicit preference conflicts with observed behavior, NEVER overwrite silently.
   */
  public static resolveConflict(
    existing: LearnedPreference,
    candidate: Partial<LearnedPreference> & { value: any; source: PreferenceSourceTier }
  ): {
    winner: LearnedPreference;
    conflictDetected: boolean;
    userPromptRequired: boolean;
    promptMessage?: string;
  } {
    const existingTierVal = this.SOURCE_WEIGHTS[existing.status === 'DELETED' ? 'AI_INFERENCE' : existing.source];
    const candidateTierVal = this.SOURCE_WEIGHTS[candidate.source];

    // Same value -> reinforce
    if (JSON.stringify(existing.value) === JSON.stringify(candidate.value)) {
      const newSampleCount = existing.sampleCount + 1;
      const newConfidence = this.calculateConfidence(
        newSampleCount,
        existing.sampleCount + 1,
        existing.contradictionCount,
        existing.source
      );
      return {
        winner: {
          ...existing,
          confidence: Math.max(existing.confidence, newConfidence),
          sampleCount: newSampleCount,
          lastObservedAt: new Date().toISOString(),
          status: 'ACTIVE',
        },
        conflictDetected: false,
        userPromptRequired: false,
      };
    }

    // Explicit or Confirmed preference exists and differs from new behavioral candidate
    if (existing.source === 'EXPLICIT_USER_CHOICE' || existing.source === 'USER_CONFIRMED') {
      return {
        winner: {
          ...existing,
          contradictionCount: existing.contradictionCount + 1,
          lastObservedAt: new Date().toISOString(),
        },
        conflictDetected: true,
        userPromptRequired: true,
        promptMessage: `We noticed recent actions seem to fit a ${candidate.value} routine. Keep your current ${existing.value} preference or try ${candidate.value}?`,
      };
    }

    // Candidate has higher tier
    if (candidateTierVal > existingTierVal) {
      return {
        winner: {
          ...existing,
          value: candidate.value,
          source: candidate.source,
          confidence: candidate.confidence || 0.7,
          sampleCount: 1,
          contradictionCount: 0,
          reason: candidate.reason || 'Upgraded by higher priority signal',
          lastObservedAt: new Date().toISOString(),
          status: 'ACTIVE',
        },
        conflictDetected: true,
        userPromptRequired: false,
      };
    }

    // Lower tier candidate cannot overwrite existing
    return {
      winner: {
        ...existing,
        contradictionCount: existing.contradictionCount + 1,
      },
      conflictDetected: true,
      userPromptRequired: false,
    };
  }
}
