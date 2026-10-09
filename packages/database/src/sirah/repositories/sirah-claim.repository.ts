/**
 * AMAL SIRAH & SHAMA'IL KNOWLEDGE FACTORY
 * Sirah Claim Ledger Repository Interface & Implementation
 */

import { SirahClaimRecord, SirahConfidenceState } from '@amal/types';

export interface ISirahClaimRepository {
  create(claim: SirahClaimRecord): Promise<SirahClaimRecord>;
  getById(id: string): Promise<SirahClaimRecord | null>;
  listByEvent(eventId: string): Promise<SirahClaimRecord[]>;
  updateConfidence(id: string, state: SirahConfidenceState): Promise<SirahClaimRecord | null>;
}

export class InMemorySirahClaimRepository implements ISirahClaimRepository {
  private claims: Map<string, SirahClaimRecord> = new Map();

  public async create(claim: SirahClaimRecord): Promise<SirahClaimRecord> {
    this.claims.set(claim.claim_id, claim);
    return claim;
  }

  public async getById(id: string): Promise<SirahClaimRecord | null> {
    return this.claims.get(id) || null;
  }

  public async listByEvent(eventId: string): Promise<SirahClaimRecord[]> {
    return Array.from(this.claims.values()).filter((c) => c.event_ids.includes(eventId));
  }

  public async updateConfidence(id: string, state: SirahConfidenceState): Promise<SirahClaimRecord | null> {
    const existing = this.claims.get(id);
    if (!existing) return null;
    const updated: SirahClaimRecord = {
      ...existing,
      confidence_state: state,
    };
    this.claims.set(id, updated);
    return updated;
  }
}
