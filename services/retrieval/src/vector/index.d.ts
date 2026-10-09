import { SourcePassage } from '@amal/types';
export interface VectorMatch {
    passageId: string;
    cosineSimilarity: number;
}
export declare class VectorSearchEngine {
    /**
     * Computes cosine similarity between two 1536-dimensional embeddings.
     */
    static cosineSimilarity(a: number[], b: number[]): number;
    /**
     * Dense semantic vector retrieval over indexed passages
     */
    static search(queryEmbedding: number[], passages?: SourcePassage[]): VectorMatch[];
}
//# sourceMappingURL=index.d.ts.map