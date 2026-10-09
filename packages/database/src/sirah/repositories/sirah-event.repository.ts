/**
 * AMAL SIRAH & SHAMA'IL KNOWLEDGE FACTORY
 * Sirah Event Repository Interface & Implementation
 */

import { SirahEventRecord, PropheticLifePeriod } from '@amal/types';

export interface ISirahEventRepository {
  create(event: SirahEventRecord): Promise<SirahEventRecord>;
  getById(id: string): Promise<SirahEventRecord | null>;
  list(period?: PropheticLifePeriod): Promise<SirahEventRecord[]>;
  update(id: string, patch: Partial<SirahEventRecord>): Promise<SirahEventRecord | null>;
}

export class InMemorySirahEventRepository implements ISirahEventRepository {
  private events: Map<string, SirahEventRecord> = new Map();

  constructor(initialEvents?: SirahEventRecord[]) {
    if (initialEvents) {
      for (const e of initialEvents) {
        this.events.set(e.event_id, e);
      }
    }
  }

  public async create(event: SirahEventRecord): Promise<SirahEventRecord> {
    this.events.set(event.event_id, event);
    return event;
  }

  public async getById(id: string): Promise<SirahEventRecord | null> {
    return this.events.get(id) || null;
  }

  public async list(period?: PropheticLifePeriod): Promise<SirahEventRecord[]> {
    let list = Array.from(this.events.values());
    if (period) {
      list = list.filter((e) => e.life_period === period);
    }
    return list;
  }

  public async update(id: string, patch: Partial<SirahEventRecord>): Promise<SirahEventRecord | null> {
    const existing = this.events.get(id);
    if (!existing) return null;
    const updated: SirahEventRecord = {
      ...existing,
      ...patch,
    };
    this.events.set(id, updated);
    return updated;
  }
}
