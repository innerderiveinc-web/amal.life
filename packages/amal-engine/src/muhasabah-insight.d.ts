export interface GeneratedInsight {
    id: string;
    category: 'TIMING' | 'DURATION' | 'FRICTION' | 'PREFERENCE' | 'CONSISTENCY';
    statement: string;
    confirmationQuestion: string;
    confidence: number;
    status: 'PROPOSED' | 'CONFIRMED' | 'REJECTED';
}
export declare class MuhasabahInsightEngine {
    static extractInsight(params: {
        morningCompletions: number;
        eveningCompletions: number;
        reportedFriction?: string;
    }): GeneratedInsight | null;
}
//# sourceMappingURL=muhasabah-insight.d.ts.map