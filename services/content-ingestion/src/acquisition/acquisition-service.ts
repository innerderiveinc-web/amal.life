import * as crypto from 'crypto';

export interface AcquisitionResult {
  fileHash: string;
  contentHash: string;
  acquiredAt: string;
}

export class AcquisitionService {
  public static computeSha256(data: string | Buffer): string {
    return crypto.createHash('sha256').update(data).digest('hex');
  }

  public static recordAcquisition(rawBytes: Buffer, normalizedText: string): AcquisitionResult {
    return {
      fileHash: this.computeSha256(rawBytes),
      contentHash: this.computeSha256(normalizedText),
      acquiredAt: new Date().toISOString(),
    };
  }
}
