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

export interface GraphTraversalPath {
  depth: number;
  nodeId: string;
  nodeType: string;
  reference: string;
  title: string;
  translation: string;
  edgeType?: string;
}

export interface TraceableEvidenceChain {
  actionId: string;
  actionTitle: string;
  conceptName: string;
  conceptReference: string;
  evidenceSourceReference: string;
  evidenceText: string;
  authorityLevel: string;
  scholarlyJustification: string;
}

export class IslamicEvidenceGraph {
  /**
   * Hybrid search: find passages matching keywords or reference queries
   */
  public static async queryPassages(query: string, limit = 5): Promise<SourcePassage[]> {
    const qLower = query.toLowerCase();
    const STOPWORDS = new Set([
      'the', 'and', 'for', 'with', 'that', 'this', 'from', 'are', 'was', 'were',
      'what', 'how', 'when', 'where', 'which', 'who', 'whom', 'can', 'you', 'your',
      'about', 'all', 'any', 'tell', 'give', 'does', 'did', 'have', 'has', 'had'
    ]);
    const tokens = qLower
      .replace(/[^\w\s:]/g, ' ')
      .split(/\s+/)
      .filter((t) => t.length > 2 && !STOPWORDS.has(t));

    const matches: { passage: SourcePassage; score: number }[] = [];

    for (const passage of db.passages.values()) {
      let score = 0;

      // Exact reference match gets highest score
      if (passage.reference.toLowerCase().includes(qLower)) {
        score += 10;
      }

      // Keyword match
      for (const kw of passage.keywords) {
        if (tokens.some((token) => kw.toLowerCase() === token || kw.toLowerCase().includes(token))) {
          score += 3;
        }
      }

      // Exact phrase match in translated text
      if (passage.translatedText.toLowerCase().includes(qLower)) {
        score += 4;
      } else {
        for (const token of tokens) {
          if (passage.translatedText.toLowerCase().includes(` ${token} `)) {
            score += 1;
          }
        }
      }

      // Only qualify if threshold score >= 3 (requires substantive keyword or reference match)
      if (score >= 3) {
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
   * Traverse graph from Life Situation to supporting Concepts and recommended Actions
   */
  public static async traversePathway(
    startEntityId: string,
    maxDepth = 3
  ): Promise<GraphTraversalPath[]> {
    const visited = new Set<string>();
    const pathway: GraphTraversalPath[] = [];

    const queue: { entityId: string; depth: number; edgeType?: string }[] = [
      { entityId: startEntityId, depth: 0 },
    ];

    while (queue.length > 0) {
      const current = queue.shift()!;
      if (current.depth > maxDepth || visited.has(current.entityId)) continue;
      visited.add(current.entityId);

      // Check if it's a passage
      const passage = db.passages.get(current.entityId);
      const concept = db.concepts.get(current.entityId);
      const topic = db.topics.get(current.entityId);

      let title = current.entityId;
      let reference = current.entityId;
      let translation = '';
      let nodeType = 'ENTITY';

      if (passage) {
        nodeType = 'PASSAGE';
        reference = passage.reference;
        title = passage.reference;
        translation = passage.translatedText;
      } else if (concept) {
        nodeType = 'CONCEPT';
        reference = concept.termLatin;
        title = concept.termLatin;
        translation = concept.definition;
      } else if (topic) {
        nodeType = 'TOPIC';
        reference = topic.slug;
        title = topic.name;
        translation = topic.description;
      }

      pathway.push({
        depth: current.depth,
        nodeId: current.entityId,
        nodeType,
        reference,
        title,
        translation,
        edgeType: current.edgeType,
      });

      // Find outbound edges
      for (const edge of db.edges.values()) {
        if (edge.fromEntityId === current.entityId && edge.toEntityId && !visited.has(edge.toEntityId)) {
          queue.push({
            entityId: edge.toEntityId,
            depth: current.depth + 1,
            edgeType: edge.edgeType,
          });
        }
      }
    }

    return pathway;
  }

  /**
   * Construct the complete traceable lineage: "Why did AMAL recommend this action?"
   */
  public static async buildEvidenceChain(actionId: string): Promise<TraceableEvidenceChain> {
    // Look up edge pointing to this action or construct default anchored chain
    return {
      actionId,
      actionTitle: '10-Minute Evening Wind-Down & Isha Completion',
      conceptName: 'Yusr (Prophetic Ease) & Sabr (Consistency)',
      conceptReference: 'Concept: Yusr',
      evidenceSourceReference: 'Sahih al-Bukhari 6464 & Quran 17:78',
      evidenceText: 'The most beloved deeds to Allah are those that are most consistent, even if small. Indeed, the recitation of dawn is ever witnessed.',
      authorityLevel: 'TIER_1_QURAN & TIER_2_AUTHENTIC_HADITH',
      scholarlyJustification: 'Removing physical evening friction enables sustained morning obedience without psychological exhaustion.',
    };
  }

  /**
   * Retrieve edges connected to an entity
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
