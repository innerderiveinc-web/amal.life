import { SourcePassage, EvidencePackItem, AuthorityLevel } from '@amal/types';
import { db } from '@amal/database';

export interface RetrievalResult {
  passage: SourcePassage;
  authorityLevel: AuthorityLevel;
  sourceTitle: string;
  relevanceScore: number;
}

export class HybridRetrievalEngine {
  /**
   * Hybrid retrieval combining exact references, keyword tokens, and authority tier weights
   */
  public static async search(query: string, maxResults = 5): Promise<RetrievalResult[]> {
    const qLower = query.toLowerCase();
    const tokens = qLower.split(/\s+/).filter((t) => t.length > 2);

    const candidates: RetrievalResult[] = [];

    for (const passage of db.passages.values()) {
      const source = db.sources.get(passage.sourceId);
      if (!source || source.verificationStatus !== 'APPROVED') {
        continue; // Only approved sources pass the retrieval gate
      }

      // Production Quarantine Gate: Quarantined content never leaks to retrieval
      if (passage.sourceId.includes('quar') || source.verificationStatus === 'REJECTED') {
        continue;
      }

      let score = 0;

      // 1. Exact canonical reference match
      if (passage.reference.toLowerCase().includes(qLower)) {
        score += 25;
      }

      // 2. Keyword relevance
      for (const kw of passage.keywords) {
        if (tokens.some((token) => kw.toLowerCase().includes(token))) {
          score += 5;
        }
      }

      // 3. Authority tier weighting (Tier 1 Quran > Tier 2 Hadith > Tier 3 Tafsir)
      if (source.authorityLevel === 'TIER_1_QURAN') score += 4;
      else if (source.authorityLevel === 'TIER_2_AUTHENTIC_HADITH') score += 3;
      else if (source.authorityLevel === 'TIER_3_CLASSICAL_TAFSIR') score += 2;

      // 4. Passage text token match
      for (const token of tokens) {
        if (passage.translatedText.toLowerCase().includes(token)) {
          score += 2;
        }
      }

      if (score > 0) {
        candidates.push({
          passage,
          authorityLevel: source.authorityLevel,
          sourceTitle: source.title,
          relevanceScore: Math.min(score / 35, 1.0),
        });
      }
    }

    candidates.sort((a, b) => b.relevanceScore - a.relevanceScore);
    return candidates.slice(0, maxResults);
  }
}
