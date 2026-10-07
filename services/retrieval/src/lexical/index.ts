import { SourcePassage } from '@amal/types';
import { db } from '@amal/database';

export interface LexicalMatch {
  passageId: string;
  score: number;
  matchedTokens: string[];
}

export class LexicalSearchEngine {
  public static search(query: string, passages: SourcePassage[] = Array.from(db.passages.values())): LexicalMatch[] {
    const tokens = query.toLowerCase().split(/\s+/).filter(t => t.length > 2);
    if (tokens.length === 0) return [];

    const results: LexicalMatch[] = [];

    for (const p of passages) {
      let score = 0;
      const matchedTokens: string[] = [];
      const textLower = `${p.reference} ${p.translatedText} ${p.keywords.join(' ')}`.toLowerCase();

      for (const token of tokens) {
        if (textLower.includes(token)) {
          matchedTokens.push(token);
          // Boost exact canonical citation matches
          if (p.reference.toLowerCase().includes(token)) {
            score += 10.0;
          } else {
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
