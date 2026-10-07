import { Injectable } from '@nestjs/common';
import { TodayResponse, TodayState, TodayAmalAction, TodayPrayerTimeline } from '@amal/types';

@Injectable()
export class TodayService {
  async getToday(userId: string): Promise<TodayResponse> {
    // In production, queries ContextRepository, AmalRepository, JourneyRepository, PrayerService
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

    const primaryAmal: TodayAmalAction = {
      id: 'amal-today-01',
      title: 'Read one page of Quran',
      description: 'Quiet contemplation after Fajr or during your morning window.',
      estimatedMinutes: 5,
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

    const optionalAmal: TodayAmalAction = {
      id: 'amal-today-opt-01',
      title: '2-Minute Bedtime Istighfar',
      description: 'Brief moment of stillness and forgiveness before sleep.',
      estimatedMinutes: 2,
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
    };

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
