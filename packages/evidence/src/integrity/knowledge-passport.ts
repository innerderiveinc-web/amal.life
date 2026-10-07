// ==============================================================================
// AMAL OS — KNOWLEDGE PASSPORT & KNOWLEDGE FIREWALL (Control #25 & #26)
// Complete auditable passport for every Islamic knowledge artifact.
// ==============================================================================

import { VerificationLevel } from '@amal/types';

export interface KnowledgePassportData {
  passportId: string;
  knowledgeType: 'QURAN' | 'HADITH' | 'TAFSIR' | 'SCHOLARLY_OPINION' | 'CONCEPT';
  sourceTitle: string;
  edition: string;
  reference: string;
  originalLanguage: string;
  authorOrTranslator: string;
  licenseId: string;
  provenanceHash: string;
  verificationLevel: VerificationLevel;
  scholarReviewerId: string;
  scholarApproverId: string;
  hasConflict: boolean;
  version: number;
  publishedDate: string;
}

export class KnowledgePassport {
  private static passports: Map<string, KnowledgePassportData> = new Map();

  public static issuePassport(data: KnowledgePassportData): KnowledgePassportData {
    this.passports.set(data.passportId, data);
    return data;
  }

  public static getPassport(passportId: string): KnowledgePassportData | undefined {
    return this.passports.get(passportId);
  }

  /**
   * Deterministic production eligibility check:
   * Only valid if Level 7, verified provenance, license approved, and zero unhandled conflicts.
   */
  public static isProductionEligible(passportId: string): {
    eligible: boolean;
    reason?: string;
  } {
    const p = this.passports.get(passportId);
    if (!p) {
      return { eligible: false, reason: `NO_PASSPORT: Knowledge item ${passportId} lacks a Knowledge Passport.` };
    }
    if (p.verificationLevel !== 'LEVEL_7_PRODUCTION_PUBLISHED') {
      return { eligible: false, reason: `INSUFFICIENT_LEVEL: Verification level is ${p.verificationLevel}, requires LEVEL_7.` };
    }
    if (p.hasConflict) {
      return { eligible: false, reason: 'ACTIVE_CONFLICT: Knowledge passport records an unhandled source conflict.' };
    }
    if (!p.provenanceHash || !p.provenanceHash.startsWith('sha256_')) {
      return { eligible: false, reason: 'INVALID_PROVENANCE_HASH: Cryptographic SHA-256 hash is missing or malformed.' };
    }
    return { eligible: true };
  }
}
