/**
 * AMAL OS — V1.5: MASTER PERSONALIZATION ENGINE
 * Orchestrates adaptive intelligence while maintaining strict epistemic and moral boundaries:
 * 1. Personalization data is isolated from Islamic Knowledge (Section 56, 93).
 * 2. Absolute ban on religious/piety scoring or moral comparison (Section 34, 35).
 * 3. User explicit controls override all learned inferences (Section 4, 65, 66).
 */

import {
  LearnedPreference,
  PersonalizationSettings,
  RecommendationCandidate,
  UserInsightItem,
  DailyBurdenReport,
} from '@amal/types';
import { PreferenceLearner } from './preference-learner.js';
import { PatternDetector, ActionLogEntry } from './pattern-detector.js';
import { RecommendationOptimizer, OptimizationContext } from './recommendation-optimizer.js';
import { FeedbackProcessor } from './feedback-processor.js';
import { GoalCollisionEngineV2, ActiveGoalContext } from './goal-collision-v2.js';
import { AdaptationLearner } from './adaptation-learner.js';

export class PersonalizationEngine {
  private static userPreferences = new Map<string, Map<string, LearnedPreference>>();
  private static userSettings = new Map<string, PersonalizationSettings>();
  private static userInsights = new Map<string, UserInsightItem[]>();

  /**
   * INVARIANT GUARD: Verifies that personalization is strictly isolated from Islamic Knowledge (Section 56).
   * Personalization data must NEVER mutate Quran, Hadith, or scholarly rulings.
   */
  public static assertKnowledgeIsolation(targetDomain: string): void {
    const forbiddenDomains = ['QURAN_TEXT', 'HADITH_CANON', 'HADITH_GRADING', 'FIQH_DOCTRINE', 'SCHOLAR_AUTHORITY'];
    if (forbiddenDomains.includes(targetDomain.toUpperCase())) {
      throw new Error(`KNOWLEDGE_ISOLATION_VIOLATION: Personalization engine is strictly prohibited from altering ${targetDomain}.`);
    }
  }

  /**
   * INVARIANT GUARD: Verifies that behavioral data is never used for religious ranking (Section 34, 35).
   * Bans calculation of "piety score", "iman score", or moral comparisons.
   */
  public static assertNoReligiousScoring(metricName: string): void {
    const forbiddenMetrics = ['PIETY_SCORE', 'IMAN_SCORE', 'RELIGIOUS_RANK', 'TAQWA_INDEX', 'SPIRITUAL_LEADERBOARD'];
    if (forbiddenMetrics.includes(metricName.toUpperCase())) {
      throw new Error(`RELIGIOUS_SCORING_VIOLATION: Calculation of ${metricName} is strictly forbidden by AMAL OS ethics.`);
    }
  }

  /**
   * Retrieves or initializes user personalization settings (Section 66).
   */
  public static getSettings(userId: string): PersonalizationSettings {
    const existing = this.userSettings.get(userId);
    if (existing) return existing;

    const defaultSettings: PersonalizationSettings = {
      userId,
      personalizationEnabled: true,
      learningFromActivityEnabled: true,
      memoryEnabled: true,
      adaptiveJourneysEnabled: true,
      notificationLearningEnabled: true,
      explicitLocks: {},
      updatedAt: new Date().toISOString(),
    };
    this.userSettings.set(userId, defaultSettings);
    return defaultSettings;
  }

  public static updateSettings(userId: string, updates: Partial<PersonalizationSettings>): PersonalizationSettings {
    const current = this.getSettings(userId);
    const updated: PersonalizationSettings = {
      ...current,
      ...updates,
      explicitLocks: { ...current.explicitLocks, ...updates.explicitLocks },
      updatedAt: new Date().toISOString(),
    };
    this.userSettings.set(userId, updated);
    return updated;
  }

  /**
   * Retrieves active preferences for a user, applying decay to unconfirmed behavioral signals.
   */
  public static getPreferences(userId: string): LearnedPreference[] {
    const userMap = this.userPreferences.get(userId);
    if (!userMap) return [];

    const now = new Date();
    const result: LearnedPreference[] = [];
    for (const [id, pref] of userMap.entries()) {
      if (pref.status === 'DELETED') continue;
      const decayed = PreferenceLearner.applyDecay(pref, now);
      userMap.set(id, decayed);
      result.push(decayed);
    }
    return result;
  }

  /**
   * Sets or updates a preference with conflict resolution and hierarchical weighting.
   */
  public static setPreference(userId: string, input: Partial<LearnedPreference> & { type: any; value: any; source: any }): {
    preference: LearnedPreference;
    conflictDetected: boolean;
    userPromptRequired: boolean;
    promptMessage?: string;
  } {
    let userMap = this.userPreferences.get(userId);
    if (!userMap) {
      userMap = new Map();
      this.userPreferences.set(userId, userMap);
    }

    const prefId = input.preferenceId || `pref_${input.type}_${userId}`;
    const existing = userMap.get(prefId);

    if (existing) {
      const resolution = PreferenceLearner.resolveConflict(existing, input as any);
      userMap.set(prefId, resolution.winner);
      return {
        preference: resolution.winner,
        conflictDetected: resolution.conflictDetected,
        userPromptRequired: resolution.userPromptRequired,
        promptMessage: resolution.promptMessage,
      };
    }

    const confidence = input.confidence || (input.source === 'EXPLICIT_USER_CHOICE' ? 1.0 : 0.6);
    const newPref: LearnedPreference = {
      preferenceId: prefId,
      userId,
      type: input.type,
      value: input.value,
      source: input.source,
      confidence,
      firstObservedAt: new Date().toISOString(),
      lastObservedAt: new Date().toISOString(),
      userConfirmed: input.source === 'EXPLICIT_USER_CHOICE' || input.source === 'USER_CONFIRMED',
      userVisible: true,
      userEditable: true,
      status: 'ACTIVE',
      reason: input.reason || 'Observed activity pattern',
      sampleCount: 1,
      contradictionCount: 0,
    };
    userMap.set(prefId, newPref);
    return {
      preference: newPref,
      conflictDetected: false,
      userPromptRequired: false,
    };
  }

  public static deletePreference(userId: string, preferenceId: string): boolean {
    const userMap = this.userPreferences.get(userId);
    if (!userMap || !userMap.has(preferenceId)) return false;
    const pref = userMap.get(preferenceId)!;
    pref.status = 'DELETED';
    userMap.set(preferenceId, pref);
    return true;
  }

  /**
   * Smart Daily Planner (Section 38): Selects 1 Primary Amal and 0-2 Optional Amals.
   */
  public static planDaily(
    userId: string,
    candidates: Omit<RecommendationCandidate, 'finalScore' | 'explanation'>[],
    ctx: Omit<OptimizationContext, 'activePreferences' | 'settings'>
  ): {
    primaryAmal: RecommendationCandidate;
    optionalAmals: RecommendationCandidate[];
    burdenReport: DailyBurdenReport;
  } {
    const settings = this.getSettings(userId);
    const preferences = this.getPreferences(userId);

    const fullCtx: OptimizationContext = {
      ...ctx,
      activePreferences: preferences,
      settings,
    };

    const ranked = RecommendationOptimizer.rankCandidates(candidates, fullCtx);

    const primaryAmal = ranked[0] || {
      candidateId: 'amal_default_fallback',
      title: 'Read one page of Quran',
      category: 'QURAN',
      amalSizeMinutes: 5,
      evidenceFit: 1.0,
      goalFit: 1.0,
      contextFit: 1.0,
      feasibility: 1.0,
      preferenceFit: 1.0,
      continuity: 1.0,
      safetyScore: 1.0,
      finalScore: 1.0,
      explanation: {
        goalFitReason: 'Default baseline spiritual nourishment',
        recentSuccessReason: 'Core practice',
        availableTimeReason: '5 minutes',
        preferenceReason: 'Universal baseline',
        continuityReason: 'Daily connection',
      },
    };

    const optionalAmals = ranked.slice(1, 3);

    // Compute burden
    const activeGoalsMock: ActiveGoalContext[] = [
      {
        id: 'goal_main',
        title: ctx.currentGoalTitle,
        category: 'HABIT',
        priority: 'HIGH',
        estimatedDailyMinutes: primaryAmal.amalSizeMinutes,
        scheduledTimeSlots: primaryAmal.preferredTimeSlot ? [primaryAmal.preferredTimeSlot] : ['AFTER_FAJR'],
      },
    ];

    const burdenReport = GoalCollisionEngineV2.evaluateDailyBurden(
      userId,
      activeGoalsMock,
      settings.explicitLocks?.maxDailyMinutes || 30
    );

    return {
      primaryAmal,
      optionalAmals,
      burdenReport,
    };
  }

  /**
   * Retrieves stored insights for user.
   */
  public static getInsights(userId: string): UserInsightItem[] {
    return this.userInsights.get(userId) || [];
  }

  public static addInsight(userId: string, insight: UserInsightItem): void {
    const list = this.userInsights.get(userId) || [];
    list.push(insight);
    this.userInsights.set(userId, list);
  }

  public static updateInsightStatus(userId: string, insightId: string, status: 'CONFIRMED' | 'DISMISSED'): boolean {
    const list = this.userInsights.get(userId) || [];
    const found = list.find((i) => i.id === insightId);
    if (!found) return false;
    found.status = status;
    return true;
  }
}

// Export sub-components
export { PreferenceLearner } from './preference-learner.js';
export { PatternDetector } from './pattern-detector.js';
export { RecommendationOptimizer } from './recommendation-optimizer.js';
export { FeedbackProcessor } from './feedback-processor.js';
export { GoalCollisionEngineV2 } from './goal-collision-v2.js';
export { AdaptationLearner } from './adaptation-learner.js';
