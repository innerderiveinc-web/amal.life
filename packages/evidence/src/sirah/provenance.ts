/**
 * AMAL SIRAH PROVENANCE MODULE
 * Cryptographic tracing: Claim -> Evidence -> Passage -> Artifact -> Source
 */

import * as crypto from 'crypto';

export interface SirahProvenanceRecord {
  provenanceId: string;
  entityType: 'CLAIM' | 'EVENT' | 'REPORT' | 'PASSAGE';
  entityId: string;
  sourceId: string;
  editionId?: string;
  artifactId?: string;
  passageId?: string;
  sha256Hash: string;
  verifiedByScholarId?: string;
  timestamp: string;
}

export class SirahProvenanceAuditor {
  private readonly records: Map<string, SirahProvenanceRecord> = new Map();

  public recordProvenance(params: Omit<SirahProvenanceRecord, 'provenanceId' | 'sha256Hash' | 'timestamp'>): SirahProvenanceRecord {
    const rawPayload = `${params.entityType}:${params.entityId}:${params.sourceId}:${params.editionId || ''}:${params.passageId || ''}`;
    const sha256Hash = crypto.createHash('sha256').update(rawPayload).digest('hex');

    const record: SirahProvenanceRecord = {
      provenanceId: `PRV-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      ...params,
      sha256Hash,
      timestamp: new Date().toISOString(),
    };

    this.records.set(record.provenanceId, record);
    return record;
  }

  public getProvenanceForEntity(entityId: string): SirahProvenanceRecord[] {
    return Array.from(this.records.values()).filter((r) => r.entityId === entityId);
  }

  public verifyLineageIntegrity(record: SirahProvenanceRecord): boolean {
    const rawPayload = `${record.entityType}:${record.entityId}:${record.sourceId}:${record.editionId || ''}:${record.passageId || ''}`;
    const calculatedHash = crypto.createHash('sha256').update(rawPayload).digest('hex');
    return calculatedHash === record.sha256Hash;
  }
}
