export interface GeneratedInsight {
  id: string;
  category: 'TIMING' | 'DURATION' | 'FRICTION' | 'PREFERENCE' | 'CONSISTENCY';
  statement: string;
  confirmationQuestion: string;
  confidence: number;
  status: 'PROPOSED' | 'CONFIRMED' | 'REJECTED';
}

export class MuhasabahInsightEngine {
  public static extractInsight(params: {
    morningCompletions: number;
    eveningCompletions: number;
    reportedFriction?: string;
  }): GeneratedInsight | null {
    if (params.morningCompletions > params.eveningCompletions * 2 && params.morningCompletions >= 3) {
      return {
        id: `ins_${Date.now()}`,
        category: 'TIMING',
        statement: 'Shorter morning actions are completed significantly more consistently than evening actions.',
        confirmationQuestion: 'AMAL observed that morning sessions fit your schedule best. Would you like to prioritize morning practices?',
        confidence: 0.88,
        status: 'PROPOSED',
      };
    }

    if (params.reportedFriction?.toLowerCase().includes('too long')) {
      return {
        id: `ins_dur_${Date.now()}`,
        category: 'DURATION',
        statement: 'Current session duration creates logistical fatigue on busy workdays.',
        confirmationQuestion: 'Would you prefer keeping future sessions under 10 minutes?',
        confidence: 0.92,
        status: 'PROPOSED',
      };
    }

    return null;
  }
}
