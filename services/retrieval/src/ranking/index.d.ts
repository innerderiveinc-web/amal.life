import { AuthorityLevel } from '@amal/types';
import { LexicalMatch } from '../lexical/index.js';
import { VectorMatch } from '../vector/index.js';
export interface RankedRetrievalItem {
    passageId: string;
    combinedScore: number;
    lexicalRank?: number;
    vectorRank?: number;
}
export declare class ReciprocalRankFusionEngine {
    /**
     * Combines lexical and semantic vector ranks using Reciprocal Rank Fusion (RRF)
     * Score = sum(1 / (k + rank_i))
     */
    static fuseRanks(lexicalMatches: LexicalMatch[], vectorMatches: VectorMatch[], k?: number): RankedRetrievalItem[];
    /**
     * Applies Islamic authority tier weights (Tier 1 Quran > Tier 2 Hadith > Tier 3 Tafsir)
     */
    static applyAuthorityMultiplier(score: number, tier: AuthorityLevel): number;
}
//# sourceMappingURL=index.d.ts.map