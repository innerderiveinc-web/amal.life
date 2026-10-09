/**
 * AMAL OS — V1.5: PERSONALIZATION, ADAPTIVE INTELLIGENCE & CONTINUOUS LEARNING TYPES
 * Strictly enforces epistemic separation: User adaptation is never projected into Islamic knowledge.
 */

export type PreferenceType =
  | 'TIMING_PREFERENCE'
  | 'ACTION_SIZE_PREFERENCE'
  | 'REMINDER_STYLE'
  | 'FORMAT_PREFERENCE'
  | 'DIFFICULTY_TOLERANCE'
  | 'DAILY_CAPACITY'
  | 'COMMUNICATION_CHANNEL';

export type PreferenceState =
  | 'ACTIVE'
  | 'PENDING_CONFIRMATION'
  | 'EXPIRED'
  | 'DISMISSED'
  | 'DELETED';

export type PreferenceSourceTier =
  | 'EXPLICIT_USER_CHOICE'     // Tier 1: User explicitly configured (Weight: 1.0)
  | 'USER_CONFIRMED'           // Tier 2: Learned pattern confirmed by user (Weight: 0.9)
  | 'STRONG_BEHAVIORAL'        // Tier 3: Repeated pattern with >= 5 observations (Weight: 0.75)
  | 'WEAK_BEHAVIORAL'          // Tier 4: Initial pattern with 3-4 observations (Weight: 0.5)
  | 'AI_INFERENCE';            // Tier 5: Pure model heuristic (Weight: 0.3)

export interface LearnedPreference {
  preferenceId: string;
  userId: string;
  type: PreferenceType;
  value: any;
  source: PreferenceSourceTier;
  confidence: number;
  firstObservedAt: string;
  lastObservedAt: string;
  expiresAt?: string;
  userConfirmed: boolean;
  userVisible: boolean;
  userEditable: boolean;
  status: PreferenceState;
  reason: string;
  sampleCount: number;
  contradictionCount: number;
}

export interface RecommendationCandidate {
  candidateId: string;
  title: string;
  category: string;
  amalSizeMinutes: number;
  preferredTimeSlot?: string;
  evidenceReference?: string;
  evidenceFit: number;
  goalFit: number;
  contextFit: number;
  feasibility: number;
  preferenceFit: number;
  continuity: number;
  safetyScore: number;
  finalScore: number;
  explanation: {
    goalFitReason: string;
    recentSuccessReason: string;
    availableTimeReason: string;
    preferenceReason: string;
    continuityReason: string;
    evidenceReason?: string;
  };
}

export interface RecommendationFeedbackRecord {
  feedbackId: string;
  userId: string;
  candidateId: string;
  actionTaken: 'ACCEPTED' | 'REJECTED' | 'IGNORED' | 'COMPLETED' | 'PARTIAL' | 'MINIMUM' | 'SKIPPED' | 'SNOOZED';
  feedbackOption?: 'HELPFUL' | 'TOO_HARD' | 'TOO_LONG' | 'WRONG_TIME' | 'NOT_RELEVANT' | 'DONT_SUGGEST';
  createdAt: string;
}

export interface FrictionSignalV2 {
  frictionCode: 'TIME_SCARCITY' | 'COMPLEXITY_OVERLOAD' | 'REMINDER_FATIGUE' | 'ENERGY_DEPLETION' | 'ROUTINE_SHIFT';
  confidence: number;
  observedOccurrences: number;
  firstDetectedAt: string;
  lastDetectedAt: string;
  reversible: boolean;
}

export interface AdaptationIntervention {
  interventionId: string;
  type: 'SIMPLIFY_ACTION' | 'SHORTEN_DURATION' | 'RESCHEDULE_WINDOW' | 'CHANGE_FORMAT' | 'REDUCE_FREQUENCY' | 'PAUSE_JOURNEY';
  proposedChange: Record<string, any>;
  expectedFeasibilityGain: number;
  userPreferenceFit: number;
  reversibilityScore: number;
  riskScore: number;
  rank: number;
  explanation: string;
}

export interface AdaptationOutcomeRecord {
  adaptationId: string;
  journeyId: string;
  userId: string;
  interventionType: string;
  beforeMetrics: {
    completionRate: number;
    skipCount: number;
    sampleDays: number;
  };
  afterMetrics: {
    completionRate: number;
    skipCount: number;
    sampleDays: number;
  };
  timeWindowDays: number;
  confidence: number;
  userFeedback?: string;
  correlationSummary: string; // e.g. "Your completion improved after this adjustment."
  createdAt: string;
}

export interface DailyBurdenReport {
  userId: string;
  date: string;
  totalEstimatedMinutes: number;
  totalActionsCount: number;
  notificationBurdenCount: number;
  cognitiveComplexityScore: number; // 0.0 to 1.0
  overloadWarning: boolean;
  collisionDetected: boolean;
  conflictingGoalIds: string[];
  recommendedResolution?: 'PRIORITIZE' | 'MERGE' | 'PAUSE' | 'REDUCE';
}

export interface PersonalizationSettings {
  userId: string;
  personalizationEnabled: boolean;
  learningFromActivityEnabled: boolean;
  memoryEnabled: boolean;
  adaptiveJourneysEnabled: boolean;
  notificationLearningEnabled: boolean;
  explicitLocks: {
    preferredTimeSlot?: string;
    preferredDays?: string[];
    maxDailyMinutes?: number;
    quietHoursStart?: string;
    quietHoursEnd?: string;
  };
  updatedAt: string;
}

export interface UserInsightItem {
  id: string;
  userId: string;
  observation: string;
  possibleInterpretation: string;
  confidence: number;
  potentialNextStep: string;
  status: 'PROPOSED' | 'CONFIRMED' | 'DISMISSED';
  createdAt: string;
}
