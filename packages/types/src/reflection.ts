export type ReflectionType =
  | 'DAILY_MUHASABAH'
  | 'WEEKLY_INSIGHT'
  | 'JOURNEY_CHECKPOINT'
  | 'JOURNEY_CHECK_IN'
  | 'PERSONAL_NOTE'
  | 'FREE_FORM';

export interface Reflection {
  id: string;
  userId: string;
  journeyId?: string | null;
  dayNumber?: number | null;
  reflectionType: ReflectionType;
  wentWell: string;
  feltDifficult?: string | null;
  frictionDetected?: string | null;
  tomorrowIntention?: string | null;
  gratitude?: string | null;
  amalId?: string | null;
  privateToUser?: boolean;
  date?: string;
  content?: string;
  sentiment?: string;
  tags?: string[];
  isPrivate?: boolean;
  createdAt: string;
}


export interface PersonalInsight {
  id: string;
  userId: string;
  category: 'ROUTINE_OBSERVATION' | 'TIME_CORRELATION' | 'ENERGY_PATTERN';
  observation: string; // e.g. "Quran consistency is highest on weekend mornings"
  supportingDataPoint: string;
  confidence: number;
  isSpiritualJudgment: false; // Must strictly NEVER be a spiritual/moral judgment
  createdAt: string;
}
