/**
 * AMAL SIRAH & SHAMA'IL KNOWLEDGE FACTORY
 * Sirah Source Repository Interface & Implementation
 */

import { SirahSourceRecord, SirahSourceTier, SirahLifecycleState } from '@amal/types';

export interface ISirahSourceRepository {
  create(source: SirahSourceRecord): Promise<SirahSourceRecord>;
  getById(id: string): Promise<SirahSourceRecord | null>;
  list(filters?: { tier?: SirahSourceTier; status?: SirahLifecycleState }): Promise<SirahSourceRecord[]>;
  updateStatus(id: string, status: SirahLifecycleState): Promise<SirahSourceRecord | null>;
}

export class InMemorySirahSourceRepository implements ISirahSourceRepository {
  private sources: Map<string, SirahSourceRecord> = new Map();

  constructor(initialSources?: SirahSourceRecord[]) {
    if (initialSources) {
      for (const s of initialSources) {
        this.sources.set(s.source_id, s);
      }
    }
  }

  public async create(source: SirahSourceRecord): Promise<SirahSourceRecord> {
    this.sources.set(source.source_id, source);
    return source;
  }

  public async getById(id: string): Promise<SirahSourceRecord | null> {
    return this.sources.get(id) || null;
  }

  public async list(filters?: { tier?: SirahSourceTier; status?: SirahLifecycleState }): Promise<SirahSourceRecord[]> {
    let list = Array.from(this.sources.values());
    if (filters?.tier) {
      list = list.filter((s) => s.source_tier === filters.tier);
    }
    if (filters?.status) {
      list = list.filter((s) => s.lifecycle_state === filters.status);
    }
    return list;
  }

  public async updateStatus(id: string, status: SirahLifecycleState): Promise<SirahSourceRecord | null> {
    const existing = this.sources.get(id);
    if (!existing) return null;
    const updated: SirahSourceRecord = {
      ...existing,
      lifecycle_state: status,
      updated_at: new Date().toISOString(),
    };
    this.sources.set(id, updated);
    return updated;
  }
}
