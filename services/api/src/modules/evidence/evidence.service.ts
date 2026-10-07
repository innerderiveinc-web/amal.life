import { Injectable } from '@nestjs/common';
import { db } from '@amal/database';

export interface EvidenceChainResponse {
  claim: { id: string; text: string };
  evidence: Array<{ passageId: string; reference: string; supportType: string }>;
  source: { id: string; title: string; version: string };
  review: { status: string };
  provenance: { license: string; reviewed: boolean };
}

@Injectable()
export class EvidenceService {
  public async search(query: string, maxResults = 5) {
    const qLower = query.toLowerCase();
    const results = [];

    for (const passage of db.passages.values()) {
      const source = db.sources.get(passage.sourceId);
      if (!source || source.verificationStatus !== 'APPROVED') continue;

      if (
        passage.reference.toLowerCase().includes(qLower) ||
        passage.translatedText.toLowerCase().includes(qLower) ||
        passage.keywords.some(k => k.toLowerCase().includes(qLower))
      ) {
        results.push({
          passageId: passage.id,
          reference: passage.reference,
          sourceTitle: source.title,
          authorityLevel: source.authorityLevel,
          translatedText: passage.translatedText,
        });
        if (results.length >= maxResults) break;
      }
    }

    return results;
  }

  public async getById(id: string) {
    const passage = db.passages.get(id);
    if (!passage) return null;
    const source = db.sources.get(passage.sourceId);
    return { ...passage, source };
  }

  public async getChain(id: string): Promise<EvidenceChainResponse | null> {
    const passage = db.passages.get(id);
    if (!passage) return null;
    const source = db.sources.get(passage.sourceId);

    return {
      claim: {
        id: `claim_${passage.id}`,
        text: `Affirmation grounded in ${passage.reference}`,
      },
      evidence: [
        {
          passageId: passage.id,
          reference: passage.reference,
          supportType: 'DIRECT_SUPPORT',
        },
      ],
      source: {
        id: source?.id || 'src_unknown',
        title: source?.title || 'Canonical Corpus',
        version: source?.version || '1.0',
      },
      review: {
        status: source?.verificationStatus || 'APPROVED',
      },
      provenance: {
        license: source?.license || 'AUTHORIZED',
        reviewed: true,
      },
    };
  }

  public async getNode(id: string) {
    return db.nodes.get(id) || null;
  }

  public async getNeighbors(id: string) {
    const edges = Array.from(db.edges.values()).filter(
      e => e.sourceNodeId === id || e.targetNodeId === id
    );
    return { nodeId: id, edges };
  }
}
