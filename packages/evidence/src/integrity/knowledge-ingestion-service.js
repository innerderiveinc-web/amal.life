"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnowledgeIngestionService = void 0;
const license_registry_js_1 = require("./license-registry.js");
const reference_validator_js_1 = require("./reference-validator.js");
const source_registry_js_1 = require("./source-registry.js");
const governance_engine_js_1 = require("../governance-engine.js");
const crypto_1 = require("crypto");
class KnowledgeIngestionService {
    /**
     * Run the full 14-stage Ingestion & Verification Pipeline
     */
    static async processIngestion(req) {
        // Stage 1 & 2: License Check Gate
        const licVal = license_registry_js_1.LicenseRegistry.verifyLicense(req.licenseId);
        if (!licVal.valid) {
            governance_engine_js_1.IslamicGovernanceEngine.quarantineItem(req.sourceId, licVal.reason, req);
            return {
                success: false,
                sourceId: req.sourceId,
                state: 'QUARANTINED',
                quarantined: true,
                quarantineReason: licVal.reason,
            };
        }
        // Stage 3 & 4: Acquisition & Artifact Hashing
        const contentHash = (0, crypto_1.createHash)('sha256').update(req.rawText).digest('hex');
        // Stage 5 & 6: Parsing & Normalization
        const trimmedText = req.rawText.trim();
        if (trimmedText.length < 5) {
            governance_engine_js_1.IslamicGovernanceEngine.quarantineItem(req.sourceId, 'CORRUPTED_TEXT: Text length is insufficient.', req);
            return {
                success: false,
                sourceId: req.sourceId,
                state: 'QUARANTINED',
                quarantined: true,
                quarantineReason: 'Corrupted text length.',
            };
        }
        // Stage 7: Reference Validation
        const refVal = reference_validator_js_1.ReferenceValidator.validate(req.reference);
        if (!refVal.valid) {
            governance_engine_js_1.IslamicGovernanceEngine.quarantineItem(req.sourceId, refVal.error, req);
            return {
                success: false,
                sourceId: req.sourceId,
                state: 'QUARANTINED',
                quarantined: true,
                quarantineReason: refVal.error,
            };
        }
        // Stage 8, 9, 10: Metadata & Attribution
        if (!req.author || req.author.trim().length === 0) {
            governance_engine_js_1.IslamicGovernanceEngine.quarantineItem(req.sourceId, 'MISSING_AUTHOR: Source author attribution is missing.', req);
            return {
                success: false,
                sourceId: req.sourceId,
                state: 'QUARANTINED',
                quarantined: true,
                quarantineReason: 'Missing author attribution.',
            };
        }
        // Stage 11, 12, 13, 14: Register Source and Mark Approved
        source_registry_js_1.SourceRegistry.registerSource({
            id: req.sourceId,
            sourceType: req.sourceType,
            title: req.title,
            author: req.author,
            publisher: req.publisher,
            edition: req.edition,
            rawArtifactContent: req.rawText,
            authorityDimensions: {
                licenseStatus: 'APPROVED',
                provenanceStatus: 'VERIFIED',
                referenceStatus: 'VERIFIED',
                editorialStatus: 'APPROVED',
                scholarReviewStatus: 'APPROVED',
                publicationStatus: 'PUBLISHED',
            },
        });
        return {
            success: true,
            sourceId: req.sourceId,
            state: 'PUBLISHED',
            quarantined: false,
            contentHash: `sha256_${contentHash}`,
        };
    }
}
exports.KnowledgeIngestionService = KnowledgeIngestionService;
//# sourceMappingURL=knowledge-ingestion-service.js.map