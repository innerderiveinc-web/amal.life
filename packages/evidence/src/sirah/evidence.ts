/**
 * AMAL SIRAH EVIDENCE MODULE
 * Epistemic boundary: SIRAH != SHAMA'IL != HADITH != QURAN != TAZKIYAH
 */

import {
  SirahSourceTier,
  SirahConfidenceState,
} from '@amal/types';

export type SirahEvidenceCategory =
  | 'QURAN'
  | 'HADITH'
  | 'SIRAH'
  | 'SHAMAIL'
  | 'HISTORICAL'
  | 'SCHOLARLY'
  | 'ACADEMIC';

export interface SirahEvidenceObject {
  evidenceId: string;
  type: SirahEvidenceCategory;
  sourceId: string;
  editionId?: string;
  passageId?: string;
  reference: string;
  relevance: number; // 0.0 to 1.0
  directness: 'DIRECT_HISTORICAL_RECORD' | 'INDIRECT_CORROBORATION' | 'CONTEXTUAL_BACKGROUND' | 'THEOLOGICAL_COMMENTARY';
  confidenceState: SirahConfidenceState;
  scholarlyAssessment?: string;
  reviewStatus: 'PENDING' | 'APPROVED' | 'DISPUTED';
}

export class SirahEvidenceManager {
  private readonly evidenceRegistry: Map<string, SirahEvidenceObject> = new Map();

  public registerEvidence(evidence: SirahEvidenceObject): void {
    this.evidenceRegistry.set(evidence.evidenceId, evidence);
  }

  public getEvidence(evidenceId: string): SirahEvidenceObject | undefined {
    return this.evidenceRegistry.get(evidenceId);
  }

  public getEvidenceForEvent(eventId: string, candidateEvidence: SirahEvidenceObject[]): SirahEvidenceObject[] {
    return candidateEvidence.filter((e) => e.reviewStatus === 'APPROVED');
  }

  public validateTierConsistency(tier: SirahSourceTier, category: SirahEvidenceCategory): boolean {
    if (category === 'QURAN' && tier !== 'TIER_A_PRIMARY_REVELATION') return false;
    if (category === 'HADITH' && tier !== 'TIER_A_PRIMARY_REVELATION') return false;
    return true;
  }
}
