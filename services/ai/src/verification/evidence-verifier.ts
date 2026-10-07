import { EvidencePack, EvidencePackItem } from '@amal/types';
import { db } from '@amal/database';

export interface VerificationResult {
  verifiedEvidence: EvidencePackItem[];
  rejectedItems: Array<{ id: string; reason: string }>;
  verifiedClaims: string[];
  unsupportedClaims: string[];
  confidence: number;
}

export class EvidenceVerifier {
  public static async verify(pack: EvidencePack): Promise<VerificationResult> {
    const verifiedEvidence: EvidencePackItem[] = [];
    const rejectedItems: Array<{ id: string; reason: string }> = [];

    for (const item of pack.items) {
      const passage = db.passages.get(item.id);
      if (!passage) {
        rejectedItems.push({ id: item.id, reason: 'PASSAGE_NOT_FOUND' });
        continue;
      }

      const source = db.sources.get(passage.sourceId);
      if (!source || source.verificationStatus !== 'APPROVED') {
        rejectedItems.push({ id: item.id, reason: 'UNAPPROVED_SOURCE' });
        continue;
      }

      if (source.licenseStatus === 'UNKNOWN' || source.licenseStatus === 'EXPIRED') {
        rejectedItems.push({ id: item.id, reason: 'INVALID_LICENSE' });
        continue;
      }

      // Check for user-provided poisoning (Section 52 & 53)
      if (item.sourceType === ('USER_PROVIDED' as any)) {
        rejectedItems.push({ id: item.id, reason: 'CITATION_POISONING_DEFENSE: USER_PROVIDED cannot be authoritative.' });
        continue;
      }

      verifiedEvidence.push(item);
    }

    return {
      verifiedEvidence,
      rejectedItems,
      verifiedClaims: verifiedEvidence.map((e) => `Grounding claim for ${e.reference}`),
      unsupportedClaims: rejectedItems.map((r) => `Unsupported claim with id ${r.id}: ${r.reason}`),
      confidence: verifiedEvidence.length > 0 ? 0.98 : 0.0,
    };
  }
}
