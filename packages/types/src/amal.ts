export type ActionStatus = 'PENDING' | 'STARTED' | 'COMPLETED' | 'PARTIAL' | 'SKIPPED' | 'SNOOZED' | 'ADAPTED';

export type ActionCategory =
  | 'SALAH'
  | 'QURAN'
  | 'CHARACTER'
  | 'KNOWLEDGE'
  | 'FAMILY'
  | 'TIME_MANAGEMENT'
  | 'DHIKR'
  | 'SADAQAH'
  | 'PATIENCE'
  | 'ANGER'
  | 'PARENTS'
  | 'RAMADAN'
  | 'NEW_MUSLIM'
  | 'REFLECTION';

import type { GoalIntent } from './goal.js';


export type FrictionType =
  | 'FORGETTING'
  | 'TIME'
  | 'ENERGY'
  | 'LOCATION'
  | 'DEVICE'
  | 'COMPLEXITY'
  | 'LOW_MOTIVATION'
  | 'UNCLEAR_NEXT_STEP'
  | 'EMOTIONAL_RESISTANCE'
  | 'SCHEDULE_CONFLICT'
  | 'TOO_LONG'
  | 'TOO_DIFFICULT';

export interface GoalBaseline {
  currentFrequency: string;
  currentDurationMinutes: number;
  confidence: number;
  availableMinutes: number;
  preferredTimeOfDay: 'AFTER_FAJR' | 'MORNING' | 'AFTER_DHUHR' | 'AFTER_ASR' | 'EVENING' | 'BEFORE_BED';
  knownBarriers: FrictionType[];
}

export interface UserGoal {
  id: string;
  userId: string;
  title: string;
  category: ActionCategory;
  intent: GoalIntent;
  desiredOutcome: string;
  timeHorizon: '14_DAYS' | '21_DAYS' | '30_DAYS' | 'CUSTOM';
  baseline: GoalBaseline;
  status: 'ACTIVE' | 'PAUSED' | 'COMPLETED' | 'ARCHIVED';
  createdAt: string;
  updatedAt: string;
}

export interface FrictionSignal {
  id: string;
  userId: string;
  journeyId?: string;
  type: FrictionType;
  confidence: number;
  source: 'USER_SELF_REPORT' | 'COMPLETION_PATTERN' | 'REFLECTION' | 'SCHEDULE';
  userConfirmed: boolean;
  detectedAt: string;
}

export interface AmalCompletionRecord {
  id: string;
  amalId: string;
  userId: string;
  status: 'FULL' | 'PARTIAL' | 'MINIMUM';
  plannedMinutes: number;
  actualMinutes: number;
  completedAt: string;
  selfReported: boolean;
  notes?: string;
}

export interface AmalRecommendationRecord {
  id: string;
  userId: string;
  journeyId?: string;
  amalId: string;
  score: number;
  factors: {
    evidenceFit: number;
    goalFit: number;
    contextFit: number;
    feasibility: number;
    preferenceFit: number;
    continuity: number;
  };
  evidenceIds: string[];
  explanation: string;
  createdAt: string;
}

export interface AmalAction {
  id: string;
  journeyId?: string | null;
  dayNumber?: number | null;
  title: string;
  description: string;
  minimumMinutes?: number;
  targetMinutes: number;
  estimatedMinutes: number;
  category: ActionCategory;
  primaryEvidenceReference: string;
  evidenceSourceId?: string;
  difficulty: 'VERY_EASY' | 'EASY' | 'MODERATE' | 'CHALLENGING';
  status: ActionStatus;
  userApproved: boolean;
  scheduledTime?: string | null;
  completedAt?: string | null;
  reflectionNotes?: string | null;
  createdAt: string;
}

export interface AmalScoreBreakdown {
  evidenceFit: number;   // 0.0 to 1.0: strength of direct Islamic source backing
  contextFit: number;    // 0.0 to 1.0: alignment with user's schedule, work, fatigue
  feasibility: number;   // 0.0 to 1.0: realistic execution probability given friction
  userIntent: number;    // 0.0 to 1.0: relevance to user's stated goal
  safety: number;        // 0.0 to 1.0: passes all safety firewalls
  totalScore: number;    // AMAL_SCORE
}

export interface AmalGenerationRequest {
  userId: string;
  goal: string;
  category: ActionCategory;
  availableMinutesPerDay: number;
  currentObstacle?: string;
  lifeStage?: string;
  preferredPace?: 'VERY_GENTLE' | 'STEADY' | 'INTENSIVE';
}

