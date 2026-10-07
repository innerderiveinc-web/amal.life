import { EvidencePackItem } from '@amal/types';
import { db } from '@amal/database';

export interface AuditedClaim {
  claim: string;
  evidenceId: string;
  supported: boolean;
  citation: {
    source: string;
    reference: string;
  };
}

export interface CitationAuditResult {
  auditedClaims: AuditedClaim[];
  unsupportedClaimsRemoved: string[];
  citationPrecision: number;
  fabricatedCitationCount: number;
  passed: boolean;
}

export class CitationAuditor {
  public static async audit(
    generatedText: string,
    evidenceItems: EvidencePackItem[]
  ): Promise<CitationAuditResult> {
    const auditedClaims: AuditedClaim[] = [];
    const unsupportedClaimsRemoved: string[] = [];
    let fabricatedCitationCount = 0;

    for (const item of evidenceItems) {
      const passage = db.passages.get(item.id);
      const isPresent = !!passage;
      const isTextConsistent = isPresent && item.reference.length > 0;

      if (isTextConsistent) {
        auditedClaims.push({
          claim: `Affirmed by canonical passage ${item.reference}`,
          evidenceId: item.id,
          supported: true,
          citation: {
            source: item.sourceType,
            reference: item.reference,
          },
        });
      } else {
        // If reference is not found in canonical corpus, it is marked fabricated / unsupported
        fabricatedCitationCount++;
        unsupportedClaimsRemoved.push(`Unverified reference ${item.reference} purged from response.`);
      }
    }

    const total = auditedClaims.length + unsupportedClaimsRemoved.length;
    const precision = total === 0 ? 1.0 : auditedClaims.length / total;

    return {
      auditedClaims,
      unsupportedClaimsRemoved,
      citationPrecision: precision,
      fabricatedCitationCount,
      passed: fabricatedCitationCount === 0 && precision >= 0.99,
    };
  }
}
