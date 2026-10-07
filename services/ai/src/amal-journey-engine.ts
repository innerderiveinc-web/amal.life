import {
  UserGoal,
  GoalBaseline,
  FrictionSignal,
  FrictionType,
  AmalCompletionRecord,
  AmalRecommendationRecord,
  ProposedAmalAction,
  AmalScoreBreakdown,
  Journey,
  JourneyAdaptationProposal,
  JourneyHealthState,
} from '@amal/types';
import { db } from '@amal/database';

export class AmalJourneyEngine {
  private static userGoals: Map<string, UserGoal[]> = new Map();
  private static frictionSignals: Map<string, FrictionSignal[]> = new Map();
  private static completions: Map<string, AmalCompletionRecord[]> = new Map();
  private static recommendations: Map<string, AmalRecommendationRecord[]> = new Map();

  /**
   * 1. Goal & Baseline Formulation (Non-judgmental)
   */
  public static createGoal(
    userId: string,
    title: string,
    category: any,
    intent: any,
    desiredOutcome: string,
    baseline: GoalBaseline,
    timeHorizon: '14_DAYS' | '21_DAYS' | '30_DAYS' = '14_DAYS'
  ): UserGoal {
    const goal: UserGoal = {
      id: `goal-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      userId,
      title,
      category,
      intent,
      desiredOutcome,
      timeHorizon,
      baseline,
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const existing = this.userGoals.get(userId) || [];
    existing.push(goal);
    this.userGoals.set(userId, existing);
    return goal;
  }

  /**
   * 2. Amal Recommendation Ranking Algorithm:
   * RecommendationScore = EvidenceFit × GoalFit × ContextFit × Feasibility × PreferenceFit × Continuity × Safety
   */
  public static rankAmalCandidates(
    userId: string,
    candidates: {
      amalId: string;
      title: string;
      estimatedMinutes: number;
      evidenceFit: number;
      goalFit: number;
      contextFit: number;
      feasibility: number;
      preferenceFit: number;
      continuity: number;
      safety: number;
      evidenceReferences: string[];
    }[]
  ): AmalRecommendationRecord[] {
    const results: AmalRecommendationRecord[] = [];

    for (const c of candidates) {
      const score = Number(
        (
          c.evidenceFit *
          c.goalFit *
          c.contextFit *
          c.feasibility *
          c.preferenceFit *
          c.continuity *
          c.safety
        ).toFixed(4)
      );

      const rec: AmalRecommendationRecord = {
        id: `rec-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        userId,
        amalId: c.amalId,
        score,
        factors: {
          evidenceFit: c.evidenceFit,
          goalFit: c.goalFit,
          contextFit: c.contextFit,
          feasibility: c.feasibility,
          preferenceFit: c.preferenceFit,
          continuity: c.continuity,
        },
        evidenceIds: c.evidenceReferences,
        explanation: `Matches your current goal, fits your available ${c.estimatedMinutes}m time window, and is grounded in verified sources.`,
        createdAt: new Date().toISOString(),
      };

      results.push(rec);
    }

    results.sort((a, b) => b.score - a.score);
    const existingRecs = this.recommendations.get(userId) || [];
    existingRecs.push(...results);
    this.recommendations.set(userId, existingRecs);

    return results;
  }

  /**
   * 3. Friction Signal Detection (Self-report, completion patterns)
   */
  public static recordFrictionSignal(
    userId: string,
    type: FrictionType,
    source: 'USER_SELF_REPORT' | 'COMPLETION_PATTERN' | 'REFLECTION' | 'SCHEDULE',
    confidence = 0.85,
    journeyId?: string
  ): FrictionSignal {
    const signal: FrictionSignal = {
      id: `fric-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      userId,
      journeyId,
      type,
      confidence,
      source,
      userConfirmed: source === 'USER_SELF_REPORT',
      detectedAt: new Date().toISOString(),
    };

    const existing = this.frictionSignals.get(userId) || [];
    existing.push(signal);
    this.frictionSignals.set(userId, existing);
    return signal;
  }

  /**
   * 4. Multi-Level Completion Recording (FULL, PARTIAL, MINIMUM)
   * Strictly no failure/shame vocabulary.
   */
  public static recordCompletion(
    userId: string,
    amalId: string,
    plannedMinutes: number,
    actualMinutes: number,
    notes?: string
  ): AmalCompletionRecord {
    let status: 'FULL' | 'PARTIAL' | 'MINIMUM' = 'FULL';
    if (actualMinutes < plannedMinutes && actualMinutes >= 3) {
      status = 'PARTIAL';
    } else if (actualMinutes < 3) {
      status = 'MINIMUM';
    }

    const completion: AmalCompletionRecord = {
      id: `cmp-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      userId,
      amalId,
      status,
      plannedMinutes,
      actualMinutes,
      completedAt: new Date().toISOString(),
      selfReported: true,
      notes,
    };

    const existing = this.completions.get(userId) || [];
    existing.push(completion);
    this.completions.set(userId, existing);
    return completion;
  }

  /**
   * 5. Adaptive Journey Heuristics:
   * Proposes sustainable adaptations when friction signals accumulate.
   * Never auto-punishes or lowers religious standing.
   */
  public static evaluateJourneyHealthAndAdapt(
    journey: Journey,
    recentCompletions: AmalCompletionRecord[],
    recentFriction: FrictionSignal[]
  ): {
    healthState: JourneyHealthState;
    adaptationProposal: JourneyAdaptationProposal | null;
  } {
    const hasTimeFriction = recentFriction.some((f) => f.type === 'TIME' || f.type === 'TOO_LONG');
    const partialCount = recentCompletions.filter((c) => c.status === 'PARTIAL' || c.status === 'MINIMUM').length;

    if (hasTimeFriction || partialCount >= 2) {
      const proposal: JourneyAdaptationProposal = {
        journeyId: journey.id,
        reason: 'USER_REPORTED_OVERWHELM',
        currentDifficulty: journey.baselineDifficulty,
        proposedDifficulty: 'VERY_EASY',
        reductionPercentage: 50,
        recommendedChanges: [
          'Reduce daily target from 15 minutes to 5 minutes minimum.',
          'Focus on single primary micro-habit rather than multi-step tasks.',
          'Keep evening wind-down simple without additional study sessions.',
        ],
        reassuranceMessage: 'Islam is built upon ease and consistency. A sustainable 5-minute action is far more beloved than sporadic exhaustion.',
        newConfiguration: {
          targetDurationMinutes: 5,
          minimumMinutes: 3,
        },
      };

      return {
        healthState: 'NEEDS_ADJUSTMENT',
        adaptationProposal: proposal,
      };
    }

    return {
      healthState: 'ON_TRACK',
      adaptationProposal: null,
    };
  }

  /**
   * 6. Goal Collision & Daily Burden Safeguard:
   * Prevents daily burnout by limiting active burden.
   */
  public static calculateDailyBurden(
    activeActions: { durationMinutes: number; complexityScore: number }[]
  ): { totalMinutes: number; burdenLevel: 'LIGHT' | 'BALANCED' | 'HEAVY'; exceedsRecommended: boolean } {
    const totalMinutes = activeActions.reduce((sum, a) => sum + a.durationMinutes, 0);

    let burdenLevel: 'LIGHT' | 'BALANCED' | 'HEAVY' = 'LIGHT';
    if (totalMinutes > 30) burdenLevel = 'HEAVY';
    else if (totalMinutes > 15) burdenLevel = 'BALANCED';

    return {
      totalMinutes,
      burdenLevel,
      exceedsRecommended: totalMinutes > 30,
    };
  }
}
