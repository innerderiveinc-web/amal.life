import { VerifiedClaim } from '@amal/types';
export type LicenseStatus = 'LICENSED' | 'PUBLIC_DOMAIN' | 'AUTHORIZED' | 'USER_PROVIDED' | 'RESTRICTED' | 'UNKNOWN' | 'EXPIRED' | 'REJECTED';
export type IngestionState = 'DISCOVERED' | 'LICENSE_CHECK' | 'ACQUIRED' | 'PARSED' | 'NORMALIZED' | 'VALIDATED' | 'EDITOR_REVIEW' | 'SCHOLAR_REVIEW' | 'APPROVED' | 'INDEXED' | 'PUBLISHED' | 'QUARANTINED' | 'REJECTED' | 'ARCHIVED';
export type DisputeType = 'INCORRECT_REFERENCE' | 'INCORRECT_TRANSLATION' | 'WEAK_ATTRIBUTION' | 'MISSING_CONTEXT' | 'SCHOLARLY_DISAGREEMENT' | 'LICENSE_PROBLEM' | 'DUPLICATE' | 'OUTDATED' | 'OTHER';
export interface QuarantinedItem {
    id: string;
    sourceId: string;
    reason: string;
    detectedAt: string;
    payload: any;
    resolved: boolean;
}
export interface ContentDispute {
    disputeId: string;
    disputeType: DisputeType;
    targetId: string;
    reportedBy: string;
    description: string;
    status: 'REPORTED' | 'TRIAGED' | 'IN_SCHOLAR_REVIEW' | 'RESOLVED' | 'REJECTED';
    resolutionNotes?: string;
    createdAt: string;
}
export interface ScholarReviewSignoff {
    reviewId: string;
    sourceId: string;
    reviewerScholarId: string;
    reviewerScholarName: string;
    institution: string;
    decision: 'APPROVED' | 'REJECTED' | 'CONDITIONAL';
    scholarlyNotes: string;
    isTwoPersonSignoff: boolean;
    signedAt: string;
}
export declare class IslamicGovernanceEngine {
    private static quarantineRegistry;
    private static disputes;
    private static scholarReviews;
    /**
     * License Gate: A source with UNKNOWN or EXPIRED license must NEVER enter the corpus.
     */
    static verifyLicense(licenseType: string, licenseStatus: LicenseStatus): boolean;
    /**
     * Quarantine handler: Quarantine suspicious or unverified content.
     */
    static quarantineItem(sourceId: string, reason: string, payload: any): QuarantinedItem;
    /**
     * Check if a passage or source is quarantined.
     */
    static isQuarantined(sourceId: string): boolean;
    /**
     * Retrieval Filter: Enforces that AI only retrieves published, approved, and licensed evidence.
     */
    static isEligibleForRetrieval(sourceId: string): boolean;
    /**
     * Two-Person Scholar Signoff Rule:
     * Sensitive Fiqh issues (Divorce, marital disputes, finance) require two independent scholars.
     */
    static registerScholarSignoff(sourceId: string, signoff: ScholarReviewSignoff): {
        approved: boolean;
        signoffCount: number;
    };
    /**
     * Claim-by-Claim Gate: If any claim has UNSUPPORTED status, block authoritative output.
     */
    static evaluateClaims(claims: VerifiedClaim[]): {
        canPublish: boolean;
        unsupportedClaims: VerifiedClaim[];
        supportedClaims: VerifiedClaim[];
    };
    /**
     * Report Content Dispute
     */
    static submitDispute(disputeType: DisputeType, targetId: string, reportedBy: string, description: string): ContentDispute;
    /**
     * Get all active disputes
     */
    static getDisputes(): ContentDispute[];
}
//# sourceMappingURL=governance-engine.d.ts.map