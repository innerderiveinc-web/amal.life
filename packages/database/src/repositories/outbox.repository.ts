/**
 * AMAL OS — LAYER 19: OUTBOX REPOSITORY (Sections 57-59, 112, 114)
 */

import { InMemoryAmalDatabase } from '../index.js';

export interface OutboxRecord {
  id: string;
  eventType: string;
  aggregateType: string;
  aggregateId: string;
  payload: any;
  attempts: number;
  status: 'PENDING' | 'PROCESSING' | 'PROCESSED' | 'FAILED';
  availableAt: string;
  processedAt?: string;
  createdAt: string;
}

export interface OutboxRepository {
  insert(event: { type: string; aggregateType?: string; aggregateId: string; payload: any }, tx?: InMemoryAmalDatabase): Promise<OutboxRecord>;
  leasePending(limit?: number, tx?: InMemoryAmalDatabase): Promise<OutboxRecord[]>;
  markProcessed(id: string, tx?: InMemoryAmalDatabase): Promise<void>;
  markFailed(id: string, error?: string, tx?: InMemoryAmalDatabase): Promise<void>;
}

export class InMemoryOutboxRepository implements OutboxRepository {
  private readonly events = new Map<string, OutboxRecord>();

  async insert(event: { type: string; aggregateType?: string; aggregateId: string; payload: any }, _tx?: InMemoryAmalDatabase): Promise<OutboxRecord> {
    const id = `outbox_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    const now = new Date().toISOString();
    const record: OutboxRecord = {
      id,
      eventType: event.type,
      aggregateType: event.aggregateType || 'DEFAULT',
      aggregateId: event.aggregateId,
      payload: event.payload,
      attempts: 0,
      status: 'PENDING',
      availableAt: now,
      createdAt: now,
    };
    this.events.set(id, record);
    return record;
  }

  async leasePending(limit: number = 10, _tx?: InMemoryAmalDatabase): Promise<OutboxRecord[]> {
    const pending = Array.from(this.events.values())
      .filter((e) => e.status === 'PENDING')
      .slice(0, limit);
    for (const e of pending) {
      e.status = 'PROCESSING';
      e.attempts += 1;
    }
    return pending;
  }

  async markProcessed(id: string, _tx?: InMemoryAmalDatabase): Promise<void> {
    const record = this.events.get(id);
    if (record) {
      record.status = 'PROCESSED';
      record.processedAt = new Date().toISOString();
    }
  }

  async markFailed(id: string, _error?: string, _tx?: InMemoryAmalDatabase): Promise<void> {
    const record = this.events.get(id);
    if (record) {
      record.status = record.attempts >= 5 ? 'FAILED' : 'PENDING';
    }
  }
}

export const outboxRepository = new InMemoryOutboxRepository();
