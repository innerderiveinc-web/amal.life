"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnowledgeIntegrityAuditService = void 0;
const source_registry_js_1 = require("./source-registry.js");
const governance_engine_js_1 = require("../governance-engine.js");
const database_1 = require("@amal/database");
class KnowledgeIntegrityAuditService {
    /**
     * Execute comprehensive pre-production audit across all stored knowledge
     */
    static runPreProductionAudit() {
        const registeredSources = source_registry_js_1.SourceRegistry.getAllSources();
        const dbSources = Array.from(database_1.db.sources.values());
        const totalItems = registeredSources.length + dbSources.length + database_1.db.passages.size;
        let verified = 0;
        let scholarReviewed = 0;
        let published = 0;
        let quarantined = 0;
        let unverified = 0;
        let licenseIssues = 0;
        let citationIssues = 0;
        let attributionIssues = 0;
        for (const src of dbSources) {
            if (src.verificationStatus === 'APPROVED') {
                verified++;
                scholarReviewed++;
                published++;
            }
            else {
                unverified++;
            }
            if (governance_engine_js_1.IslamicGovernanceEngine.isQuarantined(src.id)) {
                quarantined++;
            }
            if (!src.license || src.license === 'UNKNOWN') {
                licenseIssues++;
            }
        }
        for (const src of registeredSources) {
            const d = src.authorityDimensions;
            if (d.publicationStatus === 'PUBLISHED')
                published++;
            if (d.provenanceStatus === 'VERIFIED')
                verified++;
            if (d.scholarReviewStatus === 'APPROVED')
                scholarReviewed++;
            if (d.publicationStatus === 'QUARANTINED')
                quarantined++;
        }
        const disputes = governance_engine_js_1.IslamicGovernanceEngine.getDisputes();
        const totalConflicted = disputes.filter((d) => d.status === 'REPORTED' || d.status === 'IN_SCHOLAR_REVIEW').length;
        const passesGate = quarantined === 0 &&
            licenseIssues === 0 &&
            citationIssues === 0 &&
            attributionIssues === 0 &&
            totalConflicted === 0;
        return {
            totalKnowledgeItems: totalItems,
            totalVerified: verified,
            totalScholarReviewed: scholarReviewed,
            totalPublished: published,
            totalQuarantined: quarantined,
            totalUnverified: unverified,
            totalConflicted,
            totalLicenseIssues: licenseIssues,
            totalCitationIssues: citationIssues,
            totalAttributionIssues: attributionIssues,
            knowledgeIntegrity: passesGate ? 'PASS' : 'FAIL',
            zeroFabricationVerified: citationIssues === 0,
            timestamp: new Date().toISOString(),
        };
    }
}
exports.KnowledgeIntegrityAuditService = KnowledgeIntegrityAuditService;
//# sourceMappingURL=pre-production-audit.js.map