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
      const passageId = (item as any).id || item.passageId;
      const passage = db.passages.get(passageId);
      if (!passage) {
        rejectedItems.push({ id: passageId, reason: 'PASSAGE_NOT_FOUND' });
        continue;
      }

      const source = db.sources.get(passage.sourceId);
      if (!source || source.verificationStatus !== 'APPROVED') {
        rejectedItems.push({ id: passageId, reason: 'UNAPPROVED_SOURCE' });
        continue;
      }

      const license = (source as any).licenseStatus || source.license;
      if (license === 'UNKNOWN' || license === 'EXPIRED') {
        rejectedItems.push({ id: passageId, reason: 'INVALID_LICENSE' });
        continue;
      }

      // Check for user-provided poisoning
      const srcType = (item as any).sourceType || item.authorityLevel;
      if (srcType === 'USER_PROVIDED') {
        rejectedItems.push({ id: passageId, reason: 'CITATION_POISONING_DEFENSE: USER_PROVIDED cannot be authoritative.' });
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
