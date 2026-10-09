/**
 * AMAL OS — V1.5: PERSONALIZATION & ADAPTIVE INTELLIGENCE SERVICE
 * Core service integrating continuous learning, non-punitive friction adaptation,
 * daily burden estimation, and strict epistemic isolation.
 */

import { Injectable } from '@nestjs/common';
import {
  LearnedPreference,
  PersonalizationSettings,
  RecommendationCandidate,
  UserInsightItem,
  DailyBurdenReport,
} from '@amal/types';
import {
  PersonalizationEngine,
  FeedbackProcessor,
  AdaptationLearner,
  GoalCollisionEngineV2,
} from '@amal/amal-engine';
import { MemoryManager } from '@amal/service-ai';

@Injectable()
export class PersonalizationService {
  public getPreferences(userId: string): LearnedPreference[] {
    return PersonalizationEngine.getPreferences(userId);
  }

  public setPreference(userId: string, input: any) {
    return PersonalizationEngine.setPreference(userId, input);
  }

  public deletePreference(userId: string, preferenceId: string): boolean {
    return PersonalizationEngine.deletePreference(userId, preferenceId);
  }

  public getSettings(userId: string): PersonalizationSettings {
    return PersonalizationEngine.getSettings(userId);
  }

  public updateSettings(userId: string, updates: Partial<PersonalizationSettings>): PersonalizationSettings {
    return PersonalizationEngine.updateSettings(userId, updates);
  }

  public recordFeedback(userId: string, candidateId: string, actionTaken: any, feedbackOption?: any) {
    return FeedbackProcessor.recordFeedback({
      feedbackId: `fb_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      userId,
      candidateId,
      actionTaken,
      feedbackOption,
      createdAt: new Date().toISOString(),
    });
  }

  public getInsights(userId: string): UserInsightItem[] {
    return PersonalizationEngine.getInsights(userId);
  }

  public confirmInsight(userId: string, insightId: string): boolean {
    const ok = PersonalizationEngine.updateInsightStatus(userId, insightId, 'CONFIRMED');
    if (ok) {
      // Create confirmed L2 memory item (Section 25)
      MemoryManager.addConfirmedMemory({
        id: `mem_${Date.now()}`,
        userId,
        key: `confirmed_insight_${insightId}`,
        value: 'CONFIRMED',
        category: 'PREFERENCE',
        userConfirmed: true,
        confirmedAt: new Date().toISOString(),
        editable: true,
      });
    }
    return ok;
  }

  public dismissInsight(userId: string, insightId: string): boolean {
    return PersonalizationEngine.updateInsightStatus(userId, insightId, 'DISMISSED');
  }

  public previewAdaptation(userId: string, journeyId: string) {
    return {
      journeyId,
      currentPlan: '20 minutes evening recitation',
      suggestedPlan: '5 minutes morning recitation after Fajr',
      why: 'Recent morning sessions had 100% completion while evening sessions had repeated time friction.',
      expectedFeasibilityGain: 0.85,
      options: ['APPLY', 'KEEP_CURRENT', 'EDIT'],
    };
  }

  public approveAdaptation(userId: string, journeyId: string) {
    // Record outcome with causal caution (Section 18, 19)
    const outcome = AdaptationLearner.recordOutcome({
      adaptationId: `adp_${journeyId}_${Date.now()}`,
      journeyId,
      userId,
      interventionType: 'SHORTEN_DURATION',
      beforeMetrics: { completionRate: 0.25, skipCount: 6, sampleDays: 8 },
      afterMetrics: { completionRate: 0.8, skipCount: 1, sampleDays: 8 },
      timeWindowDays: 14,
      confidence: 0.88,
      createdAt: new Date().toISOString(),
    });

    return {
      applied: true,
      journeyId,
      newDurationMinutes: 5,
      correlationSummary: outcome.correlationSummary,
      message: 'Plan simplified to 5 minutes after Fajr. Remember: "The most beloved deed to Allah is the most regular."',
    };
  }

  public rejectAdaptation(userId: string, journeyId: string) {
    return {
      applied: false,
      journeyId,
      message: 'Kept current plan. No adjustments made.',
    };
  }

  public checkGoalCollisions(userId: string, goals: any[], maxMinutes?: number): DailyBurdenReport {
    return GoalCollisionEngineV2.evaluateDailyBurden(userId, goals, maxMinutes);
  }

  public planDaily(userId: string, candidates: any[], ctx: any) {
    return PersonalizationEngine.planDaily(userId, candidates, ctx);
  }

  public assertKnowledgeIsolation(domain: string): void {
    PersonalizationEngine.assertKnowledgeIsolation(domain);
  }

  public assertNoReligiousScoring(metric: string): void {
    PersonalizationEngine.assertNoReligiousScoring(metric);
  }
}
