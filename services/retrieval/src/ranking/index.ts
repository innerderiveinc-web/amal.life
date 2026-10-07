import { AuthorityLevel } from '@amal/types';
import { LexicalMatch } from '../lexical/index.js';
import { VectorMatch } from '../vector/index.js';

export interface RankedRetrievalItem {
  passageId: string;
  combinedScore: number;
  lexicalRank?: number;
  vectorRank?: number;
}

export class ReciprocalRankFusionEngine {
  /**
   * Combines lexical and semantic vector ranks using Reciprocal Rank Fusion (RRF)
   * Score = sum(1 / (k + rank_i))
   */
  public static fuseRanks(
    lexicalMatches: LexicalMatch[],
    vectorMatches: VectorMatch[],
    k: number = 60
  ): RankedRetrievalItem[] {
    const scores = new Map<string, { score: number; lRank?: number; vRank?: number }>();

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

    const ranked: RankedRetrievalItem[] = [];
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
  public static applyAuthorityMultiplier(score: number, tier: AuthorityLevel): number {
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
