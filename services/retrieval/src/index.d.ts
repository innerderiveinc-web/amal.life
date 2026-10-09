import { SourcePassage, AuthorityLevel } from '@amal/types';
export interface RetrievalResult {
    passage: SourcePassage;
    authorityLevel: AuthorityLevel;
    sourceTitle: string;
    relevanceScore: number;
}
export declare class HybridRetrievalEngine {
    /**
     * Hybrid retrieval combining exact references, keyword tokens, and authority tier weights
     */
    static search(query: string, maxResults?: number): Promise<RetrievalResult[]>;
}
//# sourceMappingURL=index.d.ts.map