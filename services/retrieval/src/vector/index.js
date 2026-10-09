"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VectorSearchEngine = void 0;
const database_1 = require("@amal/database");
class VectorSearchEngine {
    /**
     * Computes cosine similarity between two 1536-dimensional embeddings.
     */
    static cosineSimilarity(a, b) {
        if (a.length !== b.length || a.length === 0)
            return 0;
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
    static search(queryEmbedding, passages = Array.from(database_1.db.passages.values())) {
        const matches = [];
        for (const p of passages) {
            if (!p.embedding || p.embedding.length === 0)
                continue;
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
exports.VectorSearchEngine = VectorSearchEngine;
//# sourceMappingURL=index.js.map