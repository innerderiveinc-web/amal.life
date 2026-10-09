export interface IngestionRequest {
    sourceId: string;
    sourceType: string;
    title: string;
    author: string;
    publisher?: string;
    edition?: string;
    licenseId: string;
    reference: string;
    rawText: string;
    isSensitiveFiqh?: boolean;
}
export interface IngestionResult {
    success: boolean;
    sourceId: string;
    state: string;
    quarantined: boolean;
    quarantineReason?: string;
    contentHash?: string;
}
export declare class KnowledgeIngestionService {
    /**
     * Run the full 14-stage Ingestion & Verification Pipeline
     */
    static processIngestion(req: IngestionRequest): Promise<IngestionResult>;
}
//# sourceMappingURL=knowledge-ingestion-service.d.ts.map