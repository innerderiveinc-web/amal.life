export interface AcquisitionResult {
    fileHash: string;
    contentHash: string;
    acquiredAt: string;
}
export declare class AcquisitionService {
    static computeSha256(data: string | Buffer): string;
    static recordAcquisition(rawBytes: Buffer, normalizedText: string): AcquisitionResult;
}
//# sourceMappingURL=acquisition-service.d.ts.map