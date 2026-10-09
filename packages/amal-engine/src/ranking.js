"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmalRanking = void 0;
class AmalRanking {
    /**
     * RecommendationScore = EvidenceFit × GoalFit × ContextFit × Feasibility × PreferenceFit × Continuity × Safety
     */
    static calculateScore(candidate) {
        return Number((candidate.evidenceFit *
            candidate.goalFit *
            candidate.contextFit *
            candidate.feasibility *
            candidate.preferenceFit *
            candidate.continuity *
            candidate.safety).toFixed(4));
    }
    static rank(candidates) {
        return candidates
            .map((c) => ({ candidate: c, score: this.calculateScore(c) }))
            .sort((a, b) => b.score - a.score);
    }
}
exports.AmalRanking = AmalRanking;
//# sourceMappingURL=ranking.js.map