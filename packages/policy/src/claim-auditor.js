"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClaimAuditor = void 0;
class ClaimAuditor {
    /**
     * Audits generated statements against the verified evidence graph.
     * Unsupported Islamic claims are strictly purged or blocked.
     */
    static auditClaims(claims, verifiedEvidenceIds) {
        const verifiedClaims = [];
        const unsupportedClaims = [];
        for (const claim of claims) {
            if (!claim.isIslamicDoctrinal) {
                // Non-doctrinal practical or conversational statements pass
                verifiedClaims.push(claim);
                continue;
            }
            // Doctrinal claims must possess a verified evidence reference
            if (claim.evidenceRef && verifiedEvidenceIds.has(claim.evidenceRef)) {
                verifiedClaims.push(claim);
            }
            else {
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
exports.ClaimAuditor = ClaimAuditor;
//# sourceMappingURL=claim-auditor.js.map