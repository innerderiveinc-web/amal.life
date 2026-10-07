export type ActionStatus = 'PENDING' | 'COMPLETED' | 'SKIPPED' | 'ADAPTED';

export type ActionCategory =
  | 'SALAH'
  | 'QURAN'
  | 'CHARACTER'
  | 'KNOWLEDGE'
  | 'FAMILY'
  | 'TIME_MANAGEMENT'
  | 'DHIKR'
  | 'SADAQAH';

export interface AmalAction {
  id: string;
  journeyId?: string | null;
  dayNumber?: number | null;
  title: string;
  description: string;
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
