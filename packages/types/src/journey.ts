import { AmalAction } from './amal.js';
import { EvidencePackItem } from './evidence.js';

export type JourneyType =
  | 'FAJR_RECOVERY'
  | 'SALAH_CONSISTENCY'
  | 'QURAN_RESTART'
  | 'DAILY_QURAN_HABIT'
  | 'ANGER_AND_PATIENCE'
  | 'TIME_AND_DEEN'
  | 'NEW_MUSLIM_FIRST_30_DAYS'
  | 'RAMADAN_PREPARATION'
  | 'CUSTOM';

export type JourneyStatus = 'DRAFT' | 'ACTIVE' | 'PAUSED' | 'COMPLETED' | 'ADAPTED';

export interface JourneyDay {
  id: string;
  journeyId: string;
  dayNumber: number;
  title: string;
  learningPrompt: string;
  actions: AmalAction[];
  evidencePassages: EvidencePackItem[];
  reflectionPrompt: string;
  isCompleted: boolean;
}
export interface JourneyPhase {
  id: string;
  journeyId: string;
  sequence: number;
  title: string;
  objective: string;
  durationDays: number;
  minimumActionMinutes: number;
  targetActionMinutes: number;
}

export type JourneyHealthState =
  | 'ON_TRACK'
  | 'NEEDS_ADJUSTMENT'
  | 'PAUSED'
  | 'LOW_ACTIVITY'
  | 'COMPLETED';

export interface Journey {
  id: string;
  userId: string;
  journeyType: JourneyType;
  title: string;
  goal: string;
  description: string;
  durationDays: number;
  currentDay: number;
  currentPhaseSequence?: number;
  phases?: JourneyPhase[];
  status: JourneyStatus;
  healthState?: JourneyHealthState;
  approvedByUser: boolean;
  baselineDifficulty: string;
  startDate: string;
  endDate?: string | null;
  days: JourneyDay[];
  createdAt: string;
  updatedAt: string;
}

export interface JourneyAdaptationProposal {
  journeyId: string;
  reason: 'CONSECUTIVE_SKIPS' | 'USER_REPORTED_OVERWHELM' | 'SCHEDULE_CHANGE' | 'BURDEN_COLLISION';
  currentDifficulty: string;
  proposedDifficulty: string;
  reductionPercentage: number;
  recommendedChanges: string[];
  reassuranceMessage: string;
  newConfiguration?: any;
}

