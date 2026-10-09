export interface AmalCandidate {
    amalId: string;
    title: string;
    durationMinutes: number;
    evidenceFit: number;
    goalFit: number;
    contextFit: number;
    feasibility: number;
    preferenceFit: number;
    continuity: number;
    safety: number;
}
export declare class AmalRanking {
    /**
     * RecommendationScore = EvidenceFit × GoalFit × ContextFit × Feasibility × PreferenceFit × Continuity × Safety
     */
    static calculateScore(candidate: AmalCandidate): number;
    static rank(candidates: AmalCandidate[]): {
        candidate: AmalCandidate;
        score: number;
    }[];
}
//# sourceMappingURL=ranking.d.ts.map