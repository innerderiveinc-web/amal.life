export type TodayState =
  | 'EMPTY'
  | 'ACTIVE'
  | 'LOW_CAPACITY'
  | 'HIGH_BURDEN'
  | 'RESTART'
  | 'COMPLETED';

export interface WhyThisAmalExplanation {
  goalFit: string;
  timeFit: string;
  journeyFit: string;
  evidenceSummary: string;
  personalization: string;
}

export interface TodayAmalAction {
  id: string;
  title: string;
  description: string;
  estimatedMinutes: number;
  minimum: {
    instruction: string;
    durationMinutes: number;
  };
  target: {
    instruction: string;
    durationMinutes: number;
  };
  whyThisAmal: WhyThisAmalExplanation;
  evidenceReference: string;
  status: 'PENDING' | 'FULL' | 'PARTIAL' | 'SKIPPED' | 'SNOOZED';
}

export interface PrayerTimelineItem {
  name: 'Fajr' | 'Sunrise' | 'Dhuhr' | 'Asr' | 'Maghrib' | 'Isha';
  time: string;
  status: 'COMPLETED' | 'CURRENT' | 'UPCOMING';
}

export interface TodayPrayerTimeline {
  currentPrayer: string;
  nextPrayer: string;
  timeRemaining: string;
  calculationMethod: string;
  schedule: PrayerTimelineItem[];
}

export interface TodayActiveJourney {
  journeyId: string;
  title: string;
  currentDay: number;
  totalDays: number;
  phaseTitle: string;
  progressPercentage: number;
  pace: string;
}

export interface TodayReflectionStatus {
  isCompleted: boolean;
  prompt: string;
  lastReflectionAt?: string;
}

export interface TodayResponse {
  state: TodayState;
  greeting: string;
  hijriDate: string;
  gregorianDate: string;
  prayerTimeline: TodayPrayerTimeline;
  focusGoal?: string;
  primaryAmal: TodayAmalAction;
  optionalAmal?: TodayAmalAction;
  activeJourney?: TodayActiveJourney;
  reflectionStatus: TodayReflectionStatus;
  contextualMessage?: string;
}
