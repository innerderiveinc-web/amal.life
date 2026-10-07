import { SourcePassage } from '@amal/types';
import { db } from '@amal/database';

export interface VectorMatch {
  passageId: string;
  cosineSimilarity: number;
}

export class VectorSearchEngine {
  /**
   * Computes cosine similarity between two 1536-dimensional embeddings.
   */
  public static cosineSimilarity(a: number[], b: number[]): number {
    if (a.length !== b.length || a.length === 0) return 0;
    let dot = 0;
    let normA = 0;
    let normB = 0;
    for (let i = 0; i < a.length; i++) {
      dot += a[i] * b[i];
      normA += a[i] * a[i];
      normB += b[i] * b[i];
    }
    const denom = Math.sqrt(normA) * Math.sqrt(normB);
    return denom === 0 ? 0 : dot / denom;
  }

  /**
   * Dense semantic vector retrieval over indexed passages
   */
  public static search(queryEmbedding: number[], passages: SourcePassage[] = Array.from(db.passages.values())): VectorMatch[] {
    const matches: VectorMatch[] = [];

    for (const p of passages) {
      if (!p.embedding || p.embedding.length === 0) continue;
      const sim = this.cosineSimilarity(queryEmbedding, p.embedding);
      if (sim > 0.5) {
        matches.push({
          passageId: p.id,
          cosineSimilarity: sim,
        });
      }
    }

    return matches.sort((a, b) => b.cosineSimilarity - a.cosineSimilarity);
  }
}
