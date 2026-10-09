/**
 * AMAL OS — LAYER 19: GOAL DOMAIN TYPES (Section 13)
 */

import { GoalId, UserId } from './id.js';

export type GoalCategory =
  | "QURAN"
  | "SALAH"
  | "DUA"
  | "DHIKR"
  | "CHARACTER"
  | "PATIENCE"
  | "ANGER"
  | "FAMILY"
  | "PARENTS"
  | "TIME"
  | "KNOWLEDGE"
  | "RAMADAN"
  | "NEW_MUSLIM"
  | "PERSONAL_GROWTH"
  | "REFLECTION";

export type GoalIntent =
  | "START"
  | "RESTART"
  | "IMPROVE"
  | "MAINTAIN"
  | "LEARN"
  | "UNDERSTAND"
  | "PREPARE"
  | "OVERCOME_FRICTION";

export type GoalStatus = 'ACTIVE' | 'PAUSED' | 'ARCHIVED' | 'COMPLETED';

export interface GoalRecord {
  id: GoalId;
  userId: UserId;
  title: string;
  category: GoalCategory;
  intent: GoalIntent;
  desiredOutcome?: string;
  timeHorizon?: string;
  status: GoalStatus;
  createdAt: string;
  updatedAt: string;
}

export type Goal = GoalRecord;

export interface GoalBaselineRecord {
  id: string;
  goalId: GoalId;
  currentFrequency?: number;
  currentDurationMinutes?: number;
  availableTimeMinutes?: number;
  preferredTime?: string;
  previousAttempts?: number;
  knownBarriers?: string[];
  confidence?: number;
  capturedAt: string;
}

export interface CreateGoalRecord {
  userId: UserId;
  title: string;
  category: GoalCategory;
  intent: GoalIntent;
  desiredOutcome?: string;
  timeHorizon?: string;
}

export interface UpdateGoalRecord {
  title?: string;
  category?: GoalCategory;
  intent?: GoalIntent;
  desiredOutcome?: string;
  timeHorizon?: string;
  status?: GoalStatus;
}
