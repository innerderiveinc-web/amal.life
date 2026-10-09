"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LexicalSearchEngine = void 0;
const database_1 = require("@amal/database");
class LexicalSearchEngine {
    static search(query, passages = Array.from(database_1.db.passages.values())) {
        const tokens = query.toLowerCase().split(/\s+/).filter(t => t.length > 2);
        if (tokens.length === 0)
            return [];
        const results = [];
        for (const p of passages) {
            let score = 0;
            const matchedTokens = [];
            const textLower = `${p.reference} ${p.translatedText} ${p.keywords.join(' ')}`.toLowerCase();
            for (const token of tokens) {
                if (textLower.includes(token)) {
                    matchedTokens.push(token);
                    // Boost exact canonical citation matches
                    if (p.reference.toLowerCase().includes(token)) {
                        score += 10.0;
                    }
                    else {
                        score += 2.0;
                    }
                }
            }
            if (score > 0) {
                results.push({
                    passageId: p.id,
                    score,
                    matchedTokens,
                });
            }
        }
        return results.sort((a, b) => b.score - a.score);
    }
}
exports.LexicalSearchEngine = LexicalSearchEngine;
//# sourceMappingURL=index.js.map