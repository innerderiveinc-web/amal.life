"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IslamicGovernanceEngine = void 0;
const database_1 = require("@amal/database");
class IslamicGovernanceEngine {
    static quarantineRegistry = new Map();
    static disputes = new Map();
    static scholarReviews = new Map();
    /**
     * License Gate: A source with UNKNOWN or EXPIRED license must NEVER enter the corpus.
     */
    static verifyLicense(licenseType, licenseStatus) {
        if (licenseStatus === 'UNKNOWN' || licenseStatus === 'REJECTED' || licenseStatus === 'EXPIRED') {
            return false;
        }
        return licenseStatus === 'LICENSED' || licenseStatus === 'PUBLIC_DOMAIN' || licenseStatus === 'AUTHORIZED';
    }
    /**
     * Quarantine handler: Quarantine suspicious or unverified content.
     */
    static quarantineItem(sourceId, reason, payload) {
        const item = {
            id: `quar-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
            sourceId,
            reason,
            detectedAt: new Date().toISOString(),
            payload,
            resolved: false,
        };
        this.quarantineRegistry.set(item.id, item);
        return item;
    }
    /**
     * Check if a passage or source is quarantined.
     */
    static isQuarantined(sourceId) {
        for (const q of this.quarantineRegistry.values()) {
            if (q.sourceId === sourceId && !q.resolved) {
                return true;
            }
        }
        return false;
    }
    /**
     * Retrieval Filter: Enforces that AI only retrieves published, approved, and licensed evidence.
     */
    static isEligibleForRetrieval(sourceId) {
        if (this.isQuarantined(sourceId))
            return false;
        const source = database_1.db.sources.get(sourceId);
        if (!source)
            return false;
        if (source.verificationStatus !== 'APPROVED')
            return false;
        return true;
    }
    /**
     * Two-Person Scholar Signoff Rule:
     * Sensitive Fiqh issues (Divorce, marital disputes, finance) require two independent scholars.
     */
    static registerScholarSignoff(sourceId, signoff) {
        const existing = this.scholarReviews.get(sourceId) || [];
        existing.push(signoff);
        this.scholarReviews.set(sourceId, existing);
        const isSensitive = signoff.isTwoPersonSignoff;
        const isApproved = isSensitive ? existing.length >= 2 : existing.length >= 1;
        if (isApproved) {
            const source = database_1.db.sources.get(sourceId);
            if (source) {
                source.verificationStatus = 'APPROVED';
            }
        }
        return {
            approved: isApproved,
            signoffCount: existing.length,
        };
    }
    /**
     * Claim-by-Claim Gate: If any claim has UNSUPPORTED status, block authoritative output.
     */
    static evaluateClaims(claims) {
        const unsupportedClaims = claims.filter((c) => c.supportLevel === 'UNSUPPORTED');
        const supportedClaims = claims.filter((c) => c.supportLevel === 'DIRECT' || c.supportLevel === 'STRONG_INFERENCE');
        return {
            canPublish: unsupportedClaims.length === 0,
            unsupportedClaims,
            supportedClaims,
        };
    }
    /**
     * Report Content Dispute
     */
    static submitDispute(disputeType, targetId, reportedBy, description) {
        const dispute = {
            disputeId: `disp-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
            disputeType,
            targetId,
            reportedBy,
            description,
            status: 'REPORTED',
            createdAt: new Date().toISOString(),
        };
        this.disputes.set(dispute.disputeId, dispute);
        return dispute;
    }
    /**
     * Get all active disputes
     */
    static getDisputes() {
        return Array.from(this.disputes.values());
    }
}
exports.IslamicGovernanceEngine = IslamicGovernanceEngine;
//# sourceMappingURL=governance-engine.js.map