/**
 * AMAL SIRAH & SHAMA'IL KNOWLEDGE FACTORY
 * Sirah Provenance Repository Interface & Implementation
 */

export interface SirahProvenanceRecord {
  id: string;
  entity_type: string;
  entity_id: string;
  parent_entity_type?: string;
  parent_entity_id?: string;
  operation: string;
  processor: string;
  processor_version: string;
  input_hash?: string;
  output_hash?: string;
  metadata: Record<string, unknown>;
  created_at: string;
}

export interface ISirahProvenanceRepository {
  record(entry: Omit<SirahProvenanceRecord, 'id' | 'created_at'>): Promise<SirahProvenanceRecord>;
  getChain(entityType: string, entityId: string): Promise<SirahProvenanceRecord[]>;
}

export class InMemorySirahProvenanceRepository implements ISirahProvenanceRepository {
  private entries: SirahProvenanceRecord[] = [];

  public async record(entry: Omit<SirahProvenanceRecord, 'id' | 'created_at'>): Promise<SirahProvenanceRecord> {
    const record: SirahProvenanceRecord = {
      ...entry,
      id: `prov-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      created_at: new Date().toISOString(),
    };
    this.entries.push(record);
    return record;
  }

  public async getChain(entityType: string, entityId: string): Promise<SirahProvenanceRecord[]> {
    return this.entries.filter((e) => e.entity_type === entityType && e.entity_id === entityId);
  }
}
