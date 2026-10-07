import { LicenseService, LicenseStatus } from './license/license-service.js';
import { AcquisitionService } from './acquisition/acquisition-service.js';
import { NormalizationService } from './normalization/normalization-service.js';
import { ReferenceValidator } from './validation/reference-validator.js';
import { DeduplicationService } from './deduplication/deduplication-service.js';
import { ProvenanceService, ProvenanceEnvelope } from './provenance/provenance-service.js';
import { KnowledgeGraphBuilder } from './graph/graph-builder.js';
import { QuarantineService } from './quarantine/quarantine-service.js';
import { ReviewService, ReviewState } from './review/review-service.js';

export interface IngestionInput {
  sourceId: string;
  sourceVersion: string;
  title: string;
  author: string;
  licenseStatus: LicenseStatus;
  rawText: string;
  reference: string;
  sourceType: 'QURAN' | 'HADITH' | 'TAFSIR' | 'SCHOLARLY_WORK';
  authorId: string;
  isSensitiveFiqh?: boolean;
}

export interface IngestionPipelineOutput {
  success: boolean;
  provenance?: ProvenanceEnvelope;
  reviewState?: ReviewState;
  quarantined?: boolean;
  rejectionReason?: string;
}

export class ProductionKnowledgeIngestionPipeline {
  public static async ingest(input: IngestionInput): Promise<IngestionPipelineOutput> {
    // 1. License Check Gate
    const licenseCheck = LicenseService.verifyLicense({
      title: input.title,
      licenseStatus: input.licenseStatus,
    });
    if (!licenseCheck.valid) {
      QuarantineService.quarantine(input.sourceId, input.sourceId, licenseCheck.reason!);
      return { success: false, quarantined: true, rejectionReason: licenseCheck.reason };
    }

    // 2. Acquisition & SHA-256 Hashes
    const acquisition = AcquisitionService.recordAcquisition(
      Buffer.from(input.rawText),
      NormalizationService.normalizeText(input.rawText)
    );

    // 3. Normalization
    const normalizedText = NormalizationService.normalizeText(input.rawText);
    const normalizedRef = NormalizationService.normalizeReference(input.reference);

    // 4. Reference Validation
    if (input.sourceType === 'QURAN') {
      const qVal = ReferenceValidator.validateQuranReference(normalizedRef);
      if (!qVal.valid) {
        QuarantineService.quarantine(input.sourceId, input.sourceId, qVal.reason!);
        return { success: false, quarantined: true, rejectionReason: qVal.reason };
      }
    }

    // 5. Deduplication & Conflict Check
    const dedup = DeduplicationService.check(normalizedRef, normalizedText);
    if (dedup.hasConflict) {
      QuarantineService.quarantine(input.sourceId, input.sourceId, dedup.conflictDetails!);
      return { success: false, quarantined: true, rejectionReason: dedup.conflictDetails };
    }

    // 6. Provenance Creation
    const provenance = ProvenanceService.createChain({
      passageId: `pass_${input.sourceId}`,
      sourceId: input.sourceId,
      sourceVersion: input.sourceVersion,
      licenseStatus: input.licenseStatus,
      content: normalizedText,
      reviewerId: 'pending_editor',
    });

    // 7. Graph Nodes Creation
    KnowledgeGraphBuilder.addNode({
      id: provenance.passageId,
      nodeType: input.sourceType,
      label: `${input.title} (${normalizedRef})`,
      metadata: { contentHash: acquisition.contentHash, fileHash: acquisition.fileHash },
    });

    // 8. Review Queue Registration
    const reviewState = ReviewService.initializeReview(
      input.sourceVersion,
      input.authorId,
      !!input.isSensitiveFiqh
    );

    return {
      success: true,
      provenance,
      reviewState,
      quarantined: false,
    };
  }
}
