import {
  IslamicSource,
  SourcePassage,
  EvidenceEdge,
  EvidencePack,
  EvidencePackItem,
  AuthorityLevel,
  EntityType,
} from '@amal/types';
import { db } from '@amal/database';

export class IslamicEvidenceGraph {
  /**
   * Hybrid search: find passages matching keywords or reference queries
   */
  public static async queryPassages(query: string, limit = 5): Promise<SourcePassage[]> {
    const qLower = query.toLowerCase();
    const tokens = qLower.split(/\s+/).filter((t) => t.length > 2);

    const matches: { passage: SourcePassage; score: number }[] = [];

    for (const passage of db.passages.values()) {
      let score = 0;

      // Exact reference match gets highest score
      if (passage.reference.toLowerCase().includes(qLower)) {
        score += 10;
      }

      // Keyword match
      for (const kw of passage.keywords) {
        if (tokens.some((token) => kw.toLowerCase().includes(token))) {
          score += 3;
        }
      }

      // Text match
      if (passage.translatedText.toLowerCase().includes(qLower)) {
        score += 2;
      } else {
        for (const token of tokens) {
          if (passage.translatedText.toLowerCase().includes(token)) {
            score += 1;
          }
        }
      }

      if (score > 0) {
        matches.push({ passage, score });
      }
    }

    matches.sort((a, b) => b.score - a.score);
    return matches.slice(0, limit).map((m) => m.passage);
  }

  /**
   * Build structured Evidence Pack for the LLM
   */
  public static async buildEvidencePack(
    query: string,
    normalizedIntent: string
  ): Promise<EvidencePack> {
    const rawPassages = await this.queryPassages(query, 4);

    const items: EvidencePackItem[] = rawPassages.map((p) => {
      const source = db.sources.get(p.sourceId);
      return {
        passageId: p.id,
        sourceTitle: source?.title || 'Islamic Source',
        reference: p.reference,
        authorityLevel: source?.authorityLevel || 'TIER_5_EDITORIAL',
        arabicText: p.arabicText,
        translation: p.translatedText,
        grading: p.grading,
        relevanceScore: 0.95,
        scholarlyContext: p.contextSummary || undefined,
      };
    });

    return {
      query,
      normalizedIntent,
      items,
      scholarlyDifferences: [],
      allowedClaims: items.map((i) => `Supported by ${i.reference}`),
      prohibitedClaims: ['No unverified fatwa', 'No unsubstantiated Hadith claims'],
      requiresScholarEscalation: false,
    };
  }

  /**
   * Traverse graph edges for a given passage to find related concepts and actions
   */
  public static async getRelatedEntities(passageId: string): Promise<EvidenceEdge[]> {
    const edges: EvidenceEdge[] = [];
    for (const edge of db.edges.values()) {
      if (edge.fromEntityId === passageId || edge.toEntityId === passageId) {
        edges.push(edge);
      }
    }
    return edges;
  }
}
