import { ClaimSupportLevel } from '@amal/types';
export interface LedgerClaim {
    claimId: string;
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
export declare class ClaimLedger {
    private static claims;
    private static counter;
    /**
     * Register a verified claim into the immutable ledger
     */
    static registerClaim(data: Omit<LedgerClaim, 'claimId' | 'contentHash' | 'version'>): LedgerClaim;
    static getClaim(claimId: string): LedgerClaim | undefined;
    static getAllClaims(): LedgerClaim[];
    /**
     * Verify if a candidate claim statement is affirmed by an existing verified ledger claim
     */
    static verifyClaimStatement(statement: string): {
        verified: boolean;
        matchedClaim?: LedgerClaim;
        reason?: string;
    };
    /**
     * Seed canonical foundation claims
     */
    static seedDefaults(): void;
}
//# sourceMappingURL=claim-ledger.d.ts.map