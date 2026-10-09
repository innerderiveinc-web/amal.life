export interface ProvenanceEnvelope {
    passageId: string;
    sourceId: string;
    sourceVersion: string;
    licenseStatus: string;
    contentHash: string;
    reviewerId: string;
    scholarId?: string;
    approvedAt: string;
    provenanceChainHash: string;
}
export declare class ProvenanceService {
    static createChain(params: {
        passageId: string;
        sourceId: string;
        sourceVersion: string;
        licenseStatus: string;
        content: string;
        reviewerId: string;
        scholarId?: string;
    }): ProvenanceEnvelope;
}
//# sourceMappingURL=provenance-service.d.ts.map