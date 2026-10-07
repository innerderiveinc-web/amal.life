/**
 * AMAL OS — LAYER 19: AMAL & COMPLETION REPOSITORY (Sections 107-110, 114)
 */

import { AmalId, UserId, toAmalId } from '@amal/types';
import { InMemoryAmalDatabase } from '../index.js';

export interface AmalTemplateRecord {
  id: string;
  type: string;
  title: string;
  description: string;
  minimumAction?: string;
  targetAction?: string;
  durationMinutes?: number;
  safetyClass: string;
  reviewStatus: string;
}

export interface UserAmalRecord {
  id: AmalId;
  userId: UserId;
  journeyId?: string;
  amalTemplateId: string;
  scheduledFor: string;
  status: 'RECOMMENDED' | 'STARTED' | 'COMPLETED' | 'PARTIAL' | 'SKIPPED';
  completedOutcome?: 'FULL' | 'PARTIAL' | 'MINIMUM';
  completedAt?: string;
  idempotencyKey?: string;
}

export interface AmalRepository {
  createTemplate(template: AmalTemplateRecord, tx?: InMemoryAmalDatabase): Promise<AmalTemplateRecord>;
  findTemplateById(id: string, tx?: InMemoryAmalDatabase): Promise<AmalTemplateRecord | null>;
  createUserAmal(input: Omit<UserAmalRecord, 'id'>, tx?: InMemoryAmalDatabase): Promise<UserAmalRecord>;
  findUserAmalById(id: AmalId, tx?: InMemoryAmalDatabase): Promise<UserAmalRecord | null>;
  findUserAmalsByUser(userId: UserId, date?: string, tx?: InMemoryAmalDatabase): Promise<UserAmalRecord[]>;
  recordCompletion(id: AmalId, outcome: 'FULL' | 'PARTIAL' | 'MINIMUM', idempotencyKey: string, tx?: InMemoryAmalDatabase): Promise<UserAmalRecord>;
}

export class InMemoryAmalRepository implements AmalRepository {
  private readonly templates = new Map<string, AmalTemplateRecord>();
  private readonly userAmals = new Map<string, UserAmalRecord>();
  private readonly idempotencyKeys = new Map<string, UserAmalRecord>();

  async createTemplate(template: AmalTemplateRecord, _tx?: InMemoryAmalDatabase): Promise<AmalTemplateRecord> {
    this.templates.set(template.id, template);
    return template;
  }

  async findTemplateById(id: string, _tx?: InMemoryAmalDatabase): Promise<AmalTemplateRecord | null> {
    return this.templates.get(id) || null;
  }

  async createUserAmal(input: Omit<UserAmalRecord, 'id'>, _tx?: InMemoryAmalDatabase): Promise<UserAmalRecord> {
    const id = toAmalId(`uamal_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`);
    const record: UserAmalRecord = { ...input, id };
    this.userAmals.set(id, record);
    return record;
  }

  async findUserAmalById(id: AmalId, _tx?: InMemoryAmalDatabase): Promise<UserAmalRecord | null> {
    return this.userAmals.get(id) || null;
  }

  async findUserAmalsByUser(userId: UserId, date?: string, _tx?: InMemoryAmalDatabase): Promise<UserAmalRecord[]> {
    return Array.from(this.userAmals.values()).filter((a) => {
      if (a.userId !== userId) return false;
      if (date && a.scheduledFor !== date) return false;
      return true;
    });
  }

  async recordCompletion(id: AmalId, outcome: 'FULL' | 'PARTIAL' | 'MINIMUM', idempotencyKey: string, _tx?: InMemoryAmalDatabase): Promise<UserAmalRecord> {
    // Check idempotency (Section 121: same key returns original result)
    const existingKey = this.idempotencyKeys.get(idempotencyKey);
    if (existingKey) {
      return existingKey;
    }

    const existing = this.userAmals.get(id);
    if (!existing) {
      throw new Error(`User Amal ${id} not found.`);
    }

    const updated: UserAmalRecord = {
      ...existing,
      status: 'COMPLETED',
      completedOutcome: outcome,
      completedAt: new Date().toISOString(),
      idempotencyKey,
    };

    this.userAmals.set(id, updated);
    this.idempotencyKeys.set(idempotencyKey, updated);
    return updated;
  }
}

export const amalRepository = new InMemoryAmalRepository();
