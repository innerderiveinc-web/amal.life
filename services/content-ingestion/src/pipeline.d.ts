import { LicenseStatus } from './license/license-service.js';
import { ProvenanceEnvelope } from './provenance/provenance-service.js';
import { ReviewState } from './review/review-service.js';
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
export declare class ProductionKnowledgeIngestionPipeline {
    static ingest(input: IngestionInput): Promise<IngestionPipelineOutput>;
}
//# sourceMappingURL=pipeline.d.ts.map