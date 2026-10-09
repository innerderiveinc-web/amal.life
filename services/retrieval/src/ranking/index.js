"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReciprocalRankFusionEngine = void 0;
class ReciprocalRankFusionEngine {
    /**
     * Combines lexical and semantic vector ranks using Reciprocal Rank Fusion (RRF)
     * Score = sum(1 / (k + rank_i))
     */
    static fuseRanks(lexicalMatches, vectorMatches, k = 60) {
        const scores = new Map();
        lexicalMatches.forEach((match, index) => {
            const rank = index + 1;
            const current = scores.get(match.passageId) || { score: 0 };
            current.score += 1.0 / (k + rank);
            current.lRank = rank;
            scores.set(match.passageId, current);
        });
        vectorMatches.forEach((match, index) => {
            const rank = index + 1;
            const current = scores.get(match.passageId) || { score: 0 };
            current.score += 1.0 / (k + rank);
            current.vRank = rank;
            scores.set(match.passageId, current);
        });
        const ranked = [];
        for (const [passageId, item] of scores.entries()) {
            ranked.push({
                passageId,
                combinedScore: item.score,
                lexicalRank: item.lRank,
                vectorRank: item.vRank,
            });
        }
        return ranked.sort((a, b) => b.combinedScore - a.combinedScore);
    }
    /**
     * Applies Islamic authority tier weights (Tier 1 Quran > Tier 2 Hadith > Tier 3 Tafsir)
     */
    static applyAuthorityMultiplier(score, tier) {
        switch (tier) {
            case 'TIER_1_QURAN':
                return score * 1.5;
            case 'TIER_2_AUTHENTIC_HADITH':
                return score * 1.3;
            case 'TIER_3_CLASSICAL_TAFSIR':
                return score * 1.1;
            case 'TIER_4_SCHOLARLY_CONSENSUS':
                return score * 1.05;
            default:
                return score * 0.8;
        }
    }
}
exports.ReciprocalRankFusionEngine = ReciprocalRankFusionEngine;
//# sourceMappingURL=index.js.map