/**
 * AMAL OS — LAYER 20: TODAY PLANNER SERVICE (Section 20.25 & 20.26)
 * Generates the deterministic Today plan:
 * Formula: E * G * C * F * P * Cont * S
 * Enforces feasibility threshold >= 0.6, 1 primary action, 0-2 optional actions.
 */

import { Injectable } from '@nestjs/common';
import {
  TodayResponse,
  TodayState,
  TodayAmalAction,
  TodayPrayerTimeline,
} from '@amal/types';

export interface PlanCandidate {
  id: string;
  title: string;
  description: string;
  estimatedMinutes: number;
  evidenceWeight: number; // E
  goalRelevance: number;  // G
  contextFit: number;     // C
  feasibility: number;    // F (must be >= 0.6)
  userPreference: number; // P
  continuity: number;     // Cont
  spiritualSeason: number;// S
  score?: number;
}

@Injectable()
export class TodayService {
  /**
   * Deterministically calculates candidate ranking:
   * Score = E * G * C * F * P * Cont * S
   */
  public calculateScore(c: PlanCandidate): number {
    if (c.feasibility < 0.6) {
      return 0; // Filtered out below feasibility threshold
    }
    return (
      c.evidenceWeight *
      c.goalRelevance *
      c.contextFit *
      c.feasibility *
      c.userPreference *
      c.continuity *
      c.spiritualSeason
    );
  }

  public rankCandidates(candidates: PlanCandidate[]): PlanCandidate[] {
    return candidates
      .map((c) => ({ ...c, score: this.calculateScore(c) }))
      .filter((c) => (c.score || 0) > 0)
      .sort((a, b) => (b.score || 0) - (a.score || 0));
  }

  async getToday(userId: string): Promise<TodayResponse> {
    const state: TodayState = 'ACTIVE';

    const prayerTimeline: TodayPrayerTimeline = {
      currentPrayer: 'Asr',
      nextPrayer: 'Asr',
      timeRemaining: 'in 42 min',
      calculationMethod: 'Muslim World League · Standard Asr',
      schedule: [
        { name: 'Fajr', time: '5:12 AM', status: 'COMPLETED' },
        { name: 'Sunrise', time: '6:34 AM', status: 'COMPLETED' },
        { name: 'Dhuhr', time: '12:45 PM', status: 'COMPLETED' },
        { name: 'Asr', time: '4:15 PM', status: 'CURRENT' },
        { name: 'Maghrib', time: '6:58 PM', status: 'UPCOMING' },
        { name: 'Isha', time: '8:24 PM', status: 'UPCOMING' },
      ],
    };

    const candidates: PlanCandidate[] = [
      {
        id: 'amal-today-01',
        title: 'Read one page of Quran',
        description: 'Quiet contemplation after Fajr or during your morning window.',
        estimatedMinutes: 5,
        evidenceWeight: 1.0,
        goalRelevance: 0.95,
        contextFit: 0.9,
        feasibility: 0.9,
        userPreference: 0.9,
        continuity: 0.85,
        spiritualSeason: 1.0,
      },
      {
        id: 'amal-today-opt-01',
        title: '2-Minute Bedtime Istighfar',
        description: 'Brief moment of stillness and forgiveness before sleep.',
        estimatedMinutes: 2,
        evidenceWeight: 0.95,
        goalRelevance: 0.85,
        contextFit: 0.9,
        feasibility: 0.95,
        userPreference: 0.85,
        continuity: 0.8,
        spiritualSeason: 1.0,
      },
      {
        id: 'amal-today-opt-02',
        title: 'Midday gratitude reflection',
        description: 'Pause for 1 minute at Dhuhr to name 3 specific blessings.',
        estimatedMinutes: 1,
        evidenceWeight: 0.9,
        goalRelevance: 0.8,
        contextFit: 0.8,
        feasibility: 0.85,
        userPreference: 0.8,
        continuity: 0.75,
        spiritualSeason: 0.9,
      },
      {
        id: 'amal-today-unfeasible',
        title: '1-Hour Intensive Reading',
        description: 'Unfeasible during busy workday.',
        estimatedMinutes: 60,
        evidenceWeight: 1.0,
        goalRelevance: 0.9,
        contextFit: 0.3,
        feasibility: 0.4, // < 0.6 => discarded!
        userPreference: 0.5,
        continuity: 0.5,
        spiritualSeason: 1.0,
      },
    ];

    const ranked = this.rankCandidates(candidates);
    const primaryCandidate = ranked[0];
    const optionalCandidates = ranked.slice(1, 3); // 0 to 2 optional

    const primaryAmal: TodayAmalAction = {
      id: primaryCandidate ? primaryCandidate.id : 'amal-today-01',
      title: primaryCandidate ? primaryCandidate.title : 'Read one page of Quran',
      description: primaryCandidate ? primaryCandidate.description : 'Quiet contemplation.',
      estimatedMinutes: primaryCandidate ? primaryCandidate.estimatedMinutes : 5,
      minimum: {
        instruction: 'Read 1 page with reflection',
        durationMinutes: 5,
      },
      target: {
        instruction: 'Read 5 pages with reflection',
        durationMinutes: 15,
      },
      whyThisAmal: {
        goalFit: 'You chose to restart your Quran routine.',
        timeFit: 'You currently have around 10 minutes available.',
        journeyFit: 'This is the minimum consistent action in Phase 1 (Restart).',
        evidenceSummary: 'Directly supported by Quran 17:78 ("recitation at dawn is witnessed").',
        personalization: 'Aligned with your stated preference for short, quiet morning habits.',
      },
      evidenceReference: 'Quran 17:78 & Sahih al-Bukhari 6464',
      status: 'PENDING',
    };

    const optionalAmal: TodayAmalAction | undefined = optionalCandidates[0]
      ? {
          id: optionalCandidates[0].id,
          title: optionalCandidates[0].title,
          description: optionalCandidates[0].description,
          estimatedMinutes: optionalCandidates[0].estimatedMinutes,
          minimum: {
            instruction: '33x Astaghfirullah quietly',
            durationMinutes: 2,
          },
          target: {
            instruction: 'Sayyid al-Istighfar with meaning',
            durationMinutes: 3,
          },
          whyThisAmal: {
            goalFit: 'Daily presence and spiritual peace.',
            timeFit: 'Takes under 2 minutes.',
            journeyFit: 'Optional evening anchor.',
            evidenceSummary: 'Sahih al-Bukhari 6306',
            personalization: 'Requested gentle evening options.',
          },
          evidenceReference: 'Sahih al-Bukhari 6306',
          status: 'PENDING',
        }
      : undefined;

    return {
      state,
      greeting: 'Good morning',
      hijriDate: '14 Shawwal 1447',
      gregorianDate: 'Wednesday, 7 Oct',
      prayerTimeline,
      focusGoal: 'Quran Restart',
      primaryAmal,
      optionalAmal,
      activeJourney: {
        journeyId: 'journey-quran-restart',
        title: '30-Day Quran Restart',
        currentDay: 4,
        totalDays: 30,
        phaseTitle: 'Phase 1: Restart Gently',
        progressPercentage: 13,
        pace: 'Very Easy',
      },
      reflectionStatus: {
        isCompleted: false,
        prompt: 'What is one small blessing you noticed in your routine today?',
      },
      contextualMessage: 'Restarting gently: every consistent small step is beloved to Allah.',
    };
  }
}
