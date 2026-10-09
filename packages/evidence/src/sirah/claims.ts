/**
 * AMAL SIRAH CLAIM LEDGER MODULE
 * Factual assertions mapped to immutable evidence passages
 */

import {
  SirahClaimClass,
  SirahConfidenceState,
} from '@amal/types';

export interface SirahClaimObject {
  claimId: string;
  claimText: string;
  claimClass: SirahClaimClass;
  eventIds: string[];
  evidenceIds: string[];
  sourceIds: string[];
  confidenceState: SirahConfidenceState;
  scholarlyStatus: 'ACCEPTED_CANON' | 'DISCUSSED_BY_HISTORIANS' | 'REJECTED_BY_MUHADDITHIN' | 'UNREVIEWED';
  reviewStatus: 'PENDING' | 'APPROVED' | 'DISPUTED';
  reviewer?: string;
  createdAt: string;
  version: string;
}

export class SirahClaimLedger {
  private readonly claims: Map<string, SirahClaimObject> = new Map();

  public registerClaim(claim: SirahClaimObject): void {
    this.claims.set(claim.claimId, claim);
  }

  public getClaim(claimId: string): SirahClaimObject | undefined {
    return this.claims.get(claimId);
  }

  public getClaimsForEvent(eventId: string): SirahClaimObject[] {
    return Array.from(this.claims.values()).filter((c) => c.eventIds.includes(eventId));
  }

  public assertClaimGrounding(claim: SirahClaimObject): boolean {
    // Invariant: Claim must point to at least one evidence object and source
    return claim.evidenceIds.length > 0 && claim.sourceIds.length > 0;
  }
}
