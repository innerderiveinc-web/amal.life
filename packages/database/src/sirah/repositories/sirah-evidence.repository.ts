/**
 * AMAL SIRAH & SHAMA'IL KNOWLEDGE FACTORY
 * Sirah Evidence Repository Interface & Implementation
 */

import { SirahEventEvidenceItem } from '@amal/types';

export interface ISirahEvidenceRepository {
  add(eventId: string, evidence: SirahEventEvidenceItem): Promise<SirahEventEvidenceItem>;
  listByEvent(eventId: string): Promise<SirahEventEvidenceItem[]>;
  getById(evidenceId: string): Promise<SirahEventEvidenceItem | null>;
}

export class InMemorySirahEvidenceRepository implements ISirahEvidenceRepository {
  private evidenceByEvent: Map<string, SirahEventEvidenceItem[]> = new Map();

  public async add(eventId: string, evidence: SirahEventEvidenceItem): Promise<SirahEventEvidenceItem> {
    const list = this.evidenceByEvent.get(eventId) || [];
    list.push(evidence);
    this.evidenceByEvent.set(eventId, list);
    return evidence;
  }

  public async listByEvent(eventId: string): Promise<SirahEventEvidenceItem[]> {
    return this.evidenceByEvent.get(eventId) || [];
  }

  public async getById(evidenceId: string): Promise<SirahEventEvidenceItem | null> {
    for (const list of this.evidenceByEvent.values()) {
      const found = list.find((e) => e.evidence_id === evidenceId);
      if (found) return found;
    }
    return null;
  }
}
