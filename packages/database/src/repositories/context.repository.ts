/**
 * AMAL OS — LAYER 19: CONTEXT REPOSITORY (Sections 111, 114)
 */

import { ContextSignalRecord, ContextSignalId, UserId, toContextSignalId } from '@amal/types';
import { InMemoryAmalDatabase } from '../index.js';

export interface ContextRepository {
  createSignal(input: Omit<ContextSignalRecord, 'id' | 'createdAt' | 'updatedAt'>, tx?: InMemoryAmalDatabase): Promise<ContextSignalRecord>;
  findById(id: ContextSignalId, tx?: InMemoryAmalDatabase): Promise<ContextSignalRecord | null>;
  findActiveByUser(userId: UserId, tx?: InMemoryAmalDatabase): Promise<ContextSignalRecord[]>;
  updateStatus(id: ContextSignalId, status: ContextSignalRecord['status'], tx?: InMemoryAmalDatabase): Promise<ContextSignalRecord>;
}

export class InMemoryContextRepository implements ContextRepository {
  private readonly signals = new Map<string, ContextSignalRecord>();

  async createSignal(input: Omit<ContextSignalRecord, 'id' | 'createdAt' | 'updatedAt'>, _tx?: InMemoryAmalDatabase): Promise<ContextSignalRecord> {
    const id = toContextSignalId(`ctx_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`);
    const now = new Date().toISOString();
    const record: ContextSignalRecord = {
      ...input,
      id,
      createdAt: now,
      updatedAt: now,
    };
    this.signals.set(id, record);
    return record;
  }

  async findById(id: ContextSignalId, _tx?: InMemoryAmalDatabase): Promise<ContextSignalRecord | null> {
    return this.signals.get(id) || null;
  }

  async findActiveByUser(userId: UserId, _tx?: InMemoryAmalDatabase): Promise<ContextSignalRecord[]> {
    return Array.from(this.signals.values()).filter((s) => s.userId === userId && s.status === 'ACTIVE');
  }

  async updateStatus(id: ContextSignalId, status: ContextSignalRecord['status'], _tx?: InMemoryAmalDatabase): Promise<ContextSignalRecord> {
    const existing = this.signals.get(id);
    if (!existing) throw new Error(`Context signal ${id} not found.`);
    const updated: ContextSignalRecord = {
      ...existing,
      status,
      updatedAt: new Date().toISOString(),
    };
    this.signals.set(id, updated);
    return updated;
  }
}

export const contextRepository = new InMemoryContextRepository();
