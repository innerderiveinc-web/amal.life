import * as crypto from 'crypto';

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

export class ProvenanceService {
  public static createChain(params: {
    passageId: string;
    sourceId: string;
    sourceVersion: string;
    licenseStatus: string;
    content: string;
    reviewerId: string;
    scholarId?: string;
  }): ProvenanceEnvelope {
    const contentHash = crypto.createHash('sha256').update(params.content).digest('hex');
    const approvedAt = new Date().toISOString();

    const chainPayload = `${params.passageId}:${params.sourceId}:${params.sourceVersion}:${contentHash}:${params.reviewerId}:${params.scholarId || 'none'}:${approvedAt}`;
    const provenanceChainHash = crypto.createHash('sha256').update(chainPayload).digest('hex');

    return {
      passageId: params.passageId,
      sourceId: params.sourceId,
      sourceVersion: params.sourceVersion,
      licenseStatus: params.licenseStatus,
      contentHash,
      reviewerId: params.reviewerId,
      scholarId: params.scholarId,
      approvedAt,
      provenanceChainHash,
    };
  }
}
