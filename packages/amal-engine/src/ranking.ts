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

export class AmalRanking {
  /**
   * RecommendationScore = EvidenceFit × GoalFit × ContextFit × Feasibility × PreferenceFit × Continuity × Safety
   */
  public static calculateScore(candidate: AmalCandidate): number {
    return Number(
      (
        candidate.evidenceFit *
        candidate.goalFit *
        candidate.contextFit *
        candidate.feasibility *
        candidate.preferenceFit *
        candidate.continuity *
        candidate.safety
      ).toFixed(4)
    );
  }

  public static rank(candidates: AmalCandidate[]): { candidate: AmalCandidate; score: number }[] {
    return candidates
      .map((c) => ({ candidate: c, score: this.calculateScore(c) }))
      .sort((a, b) => b.score - a.score);
  }
}
