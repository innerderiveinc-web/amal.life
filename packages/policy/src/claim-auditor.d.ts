export interface CandidateClaim {
    id: string;
    statement: string;
    evidenceRef?: string;
    isIslamicDoctrinal: boolean;
}
export interface ClaimAuditResult {
    passed: boolean;
    verifiedClaims: CandidateClaim[];
    unsupportedClaims: CandidateClaim[];
    remediationAction: 'ALLOW' | 'REMOVE_UNSUPPORTED' | 'BLOCK';
}
export declare class ClaimAuditor {
    /**
     * Audits generated statements against the verified evidence graph.
     * Unsupported Islamic claims are strictly purged or blocked.
     */
    static auditClaims(claims: CandidateClaim[], verifiedEvidenceIds: Set<string>): ClaimAuditResult;
}
//# sourceMappingURL=claim-auditor.d.ts.map