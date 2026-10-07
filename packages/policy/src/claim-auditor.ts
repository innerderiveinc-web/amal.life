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

export class ClaimAuditor {
  /**
   * Audits generated statements against the verified evidence graph.
   * Unsupported Islamic claims are strictly purged or blocked.
   */
  public static auditClaims(
    claims: CandidateClaim[],
    verifiedEvidenceIds: Set<string>
  ): ClaimAuditResult {
    const verifiedClaims: CandidateClaim[] = [];
    const unsupportedClaims: CandidateClaim[] = [];

    for (const claim of claims) {
      if (!claim.isIslamicDoctrinal) {
        // Non-doctrinal practical or conversational statements pass
        verifiedClaims.push(claim);
        continue;
      }

      // Doctrinal claims must possess a verified evidence reference
      if (claim.evidenceRef && verifiedEvidenceIds.has(claim.evidenceRef)) {
        verifiedClaims.push(claim);
      } else {
        unsupportedClaims.push(claim);
      }
    }

    if (unsupportedClaims.length > 0) {
      return {
        passed: false,
        verifiedClaims,
        unsupportedClaims,
        remediationAction: unsupportedClaims.length > 2 ? 'BLOCK' : 'REMOVE_UNSUPPORTED',
      };
    }

    return {
      passed: true,
      verifiedClaims,
      unsupportedClaims: [],
      remediationAction: 'ALLOW',
    };
  }
}
