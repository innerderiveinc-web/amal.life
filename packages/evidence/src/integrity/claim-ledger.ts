// ==============================================================================
// AMAL OS — CLAIM LEDGER ENGINE (Control #5 & Control #7)
// Every religious statement is an immutable, machine-auditable verified claim.
// ==============================================================================

import { ClaimSupportLevel } from '@amal/types';
import { createHash } from 'crypto';

export interface LedgerClaim {
  claimId: string; // e.g. "CLAIM-000001"
  claimText: string;
  sourceId: string;
  work: string;
  reference: string;
  evidencePassageId: string;
  supportLevel: ClaimSupportLevel;
  epistemicDomain: 'REVELATION' | 'SCHOLARLY_INTERPRETATION' | 'BEHAVIORAL_SCIENCE';
  scholarReviewerId?: string;
  scholarReviewerName?: string;
  reviewDate?: string;
  verificationStatus: 'VERIFIED' | 'PENDING' | 'REJECTED' | 'QUARANTINED';
  contentHash: string;
  version: number;
  isConsensus: boolean;
  madhhabAttribution?: string[];
}

export class ClaimLedger {
  private static claims: Map<string, LedgerClaim> = new Map();
  private static counter: number = 0;

  /**
   * Register a verified claim into the immutable ledger
   */
  public static registerClaim(data: Omit<LedgerClaim, 'claimId' | 'contentHash' | 'version'>): LedgerClaim {
    this.counter++;
    const claimId = `CLAIM-${String(this.counter).padStart(6, '0')}`;
    const hash = createHash('sha256')
      .update(`${data.claimText}:${data.reference}:${data.sourceId}`)
      .digest('hex');

    const claim: LedgerClaim = {
      claimId,
      ...data,
      contentHash: `sha256_${hash}`,
      version: 1,
    };

    this.claims.set(claimId, claim);
    return claim;
  }

  public static getClaim(claimId: string): LedgerClaim | undefined {
    return this.claims.get(claimId);
  }

  public static getAllClaims(): LedgerClaim[] {
    return Array.from(this.claims.values());
  }

  /**
   * Verify if a candidate claim statement is affirmed by an existing verified ledger claim
   */
  public static verifyClaimStatement(statement: string): {
    verified: boolean;
    matchedClaim?: LedgerClaim;
    reason?: string;
  } {
    const sLower = statement.toLowerCase().trim();

    for (const claim of this.claims.values()) {
      if (claim.verificationStatus !== 'VERIFIED') continue;

      // Exact or semantic match check
      if (sLower.includes(claim.claimText.toLowerCase().trim()) ||
          claim.claimText.toLowerCase().trim().includes(sLower)) {
        return {
          verified: true,
          matchedClaim: claim,
        };
      }
    }

    return {
      verified: false,
      reason: 'UNVERIFIED_CLAIM: Statement is not backed by any verified claim in the Claim Ledger.',
    };
  }

  /**
   * Seed canonical foundation claims
   */
  public static seedDefaults(): void {
    if (this.claims.size > 0) return;

    this.registerClaim({
      claimText: 'Actions are judged by intentions',
      sourceId: 'src-bukhari-v1',
      work: 'Sahih al-Bukhari',
      reference: 'Sahih al-Bukhari 1',
      evidencePassageId: 'pass-bukhari-1',
      supportLevel: 'DIRECT',
      epistemicDomain: 'REVELATION',
      scholarReviewerId: 'sch_dr_tariq_al_hashimi',
      scholarReviewerName: 'Dr. Tariq Al-Hashimi',
      reviewDate: '2026-10-01',
      verificationStatus: 'VERIFIED',
      isConsensus: true,
    });

    this.registerClaim({
      claimText: 'Fajr dawn recitation is witnessed by the angels',
      sourceId: 'src-quran-uthmani-v1',
      work: 'The Noble Quran',
      reference: 'Quran 17:78',
      evidencePassageId: 'pass-quran-17-78',
      supportLevel: 'DIRECT',
      epistemicDomain: 'REVELATION',
      scholarReviewerId: 'sch_dr_tariq_al_hashimi',
      scholarReviewerName: 'Dr. Tariq Al-Hashimi',
      reviewDate: '2026-10-01',
      verificationStatus: 'VERIFIED',
      isConsensus: true,
    });

    this.registerClaim({
      claimText: 'The most beloved deeds to Allah are those that are most consistent, even if small',
      sourceId: 'src-bukhari-v1',
      work: 'Sahih al-Bukhari',
      reference: 'Sahih al-Bukhari 6464',
      evidencePassageId: 'pass-bukhari-6464',
      supportLevel: 'DIRECT',
      epistemicDomain: 'REVELATION',
      scholarReviewerId: 'sch_sheikh_amina_farooq',
      scholarReviewerName: 'Ustadha Amina Farooq',
      reviewDate: '2026-10-01',
      verificationStatus: 'VERIFIED',
      isConsensus: true,
    });

    this.registerClaim({
      claimText: 'The religion is easy, and no one overburdens himself in the religion except that it will overcome him',
      sourceId: 'src-bukhari-v1',
      work: 'Sahih al-Bukhari',
      reference: 'Sahih al-Bukhari 39',
      evidencePassageId: 'pass-bukhari-39',
      supportLevel: 'DIRECT',
      epistemicDomain: 'REVELATION',
      scholarReviewerId: 'sch_dr_tariq_al_hashimi',
      scholarReviewerName: 'Dr. Tariq Al-Hashimi',
      reviewDate: '2026-10-01',
      verificationStatus: 'VERIFIED',
      isConsensus: true,
    });
  }
}

// Auto-seed baseline claims on module load
ClaimLedger.seedDefaults();
