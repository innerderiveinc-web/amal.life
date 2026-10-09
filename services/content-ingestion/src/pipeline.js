"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductionKnowledgeIngestionPipeline = void 0;
const license_service_js_1 = require("./license/license-service.js");
const acquisition_service_js_1 = require("./acquisition/acquisition-service.js");
const normalization_service_js_1 = require("./normalization/normalization-service.js");
const reference_validator_js_1 = require("./validation/reference-validator.js");
const deduplication_service_js_1 = require("./deduplication/deduplication-service.js");
const provenance_service_js_1 = require("./provenance/provenance-service.js");
const graph_builder_js_1 = require("./graph/graph-builder.js");
const quarantine_service_js_1 = require("./quarantine/quarantine-service.js");
const review_service_js_1 = require("./review/review-service.js");
class ProductionKnowledgeIngestionPipeline {
    static async ingest(input) {
        // 1. License Check Gate
        const licenseCheck = license_service_js_1.LicenseService.verifyLicense({
            title: input.title,
            licenseStatus: input.licenseStatus,
        });
        if (!licenseCheck.valid) {
            quarantine_service_js_1.QuarantineService.quarantine(input.sourceId, input.sourceId, licenseCheck.reason);
            return { success: false, quarantined: true, rejectionReason: licenseCheck.reason };
        }
        // 2. Acquisition & SHA-256 Hashes
        const acquisition = acquisition_service_js_1.AcquisitionService.recordAcquisition(Buffer.from(input.rawText), normalization_service_js_1.NormalizationService.normalizeText(input.rawText));
        // 3. Normalization
        const normalizedText = normalization_service_js_1.NormalizationService.normalizeText(input.rawText);
        const normalizedRef = normalization_service_js_1.NormalizationService.normalizeReference(input.reference);
        // 4. Reference Validation
        if (input.sourceType === 'QURAN') {
            const qVal = reference_validator_js_1.ReferenceValidator.validateQuranReference(normalizedRef);
            if (!qVal.valid) {
                quarantine_service_js_1.QuarantineService.quarantine(input.sourceId, input.sourceId, qVal.reason);
                return { success: false, quarantined: true, rejectionReason: qVal.reason };
            }
        }
        // 5. Deduplication & Conflict Check
        const dedup = deduplication_service_js_1.DeduplicationService.check(normalizedRef, normalizedText);
        if (dedup.hasConflict) {
            quarantine_service_js_1.QuarantineService.quarantine(input.sourceId, input.sourceId, dedup.conflictDetails);
            return { success: false, quarantined: true, rejectionReason: dedup.conflictDetails };
        }
        // 6. Provenance Creation
        const provenance = provenance_service_js_1.ProvenanceService.createChain({
            passageId: `pass_${input.sourceId}`,
            sourceId: input.sourceId,
            sourceVersion: input.sourceVersion,
            licenseStatus: input.licenseStatus,
            content: normalizedText,
            reviewerId: 'pending_editor',
        });
        // 7. Graph Nodes Creation
        graph_builder_js_1.KnowledgeGraphBuilder.addNode({
            id: provenance.passageId,
            nodeType: input.sourceType,
            label: `${input.title} (${normalizedRef})`,
            metadata: { contentHash: acquisition.contentHash, fileHash: acquisition.fileHash },
        });
        // 8. Review Queue Registration
        const reviewState = review_service_js_1.ReviewService.initializeReview(input.sourceVersion, input.authorId, !!input.isSensitiveFiqh);
        return {
            success: true,
            provenance,
            reviewState,
            quarantined: false,
        };
    }
}
exports.ProductionKnowledgeIngestionPipeline = ProductionKnowledgeIngestionPipeline;
//# sourceMappingURL=pipeline.js.map