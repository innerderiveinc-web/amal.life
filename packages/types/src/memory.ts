export type MemoryLevel = 'L0_SESSION' | 'L1_JOURNEY' | 'L2_CONFIRMED' | 'L3_DERIVED';

export interface L0SessionMemory {
  sessionId: string;
  userId: string;
  currentQuestion: string;
  activeContextTokens: number;
  reasoningContext: string;
  createdAt: string;
}

export interface L1JourneyMemory {
  journeyId: string;
  userId: string;
  goalTitle: string;
  currentDay: number;
  completedAmalIds: string[];
  activeFrictionCodes: string[];
  recentAdaptations: string[];
  reflectionSnippets: string[];
  updatedAt: string;
}

export interface L2ConfirmedPersonalMemory {
  id: string;
  userId: string;
  key: string;
  value: string;
  category: 'PREFERENCE' | 'SCHEDULE' | 'LANGUAGE' | 'LEARNING_STYLE' | 'MADHHAB';
  userConfirmed: true;
  confirmedAt: string;
  editable: true;
}

export interface L3DerivedInsight {
  id: string;
  userId: string;
  statement: string;
  confidence: number;
  sourceEvents: string[];
  userConfirmed: boolean;
  category: 'COMPLETION_TENDENCY' | 'BURDEN_TOLERANCE' | 'ROUTINE_TIMING';
  inferredAt: string;
}

export interface MemoryCandidate {
  id: string;
  userId: string;
  type: 'PREFERENCE_CANDIDATE' | 'INSIGHT_CANDIDATE' | 'ROUTINE_CANDIDATE';
  statement: string;
  confidence: number;
  sourceEvents: string[];
  requiresConfirmation: boolean;
  status: 'PENDING' | 'CONFIRMED' | 'REJECTED';
  createdAt: string;
}

export interface MemoryConfirmationAction {
  candidateId: string;
  userId: string;
  decision: 'CONFIRM' | 'REJECT';
  timestamp: string;
}
