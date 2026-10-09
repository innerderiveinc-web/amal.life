/**
 * AMAL OS — LAYER 19: JOURNEY REPOSITORY (Section 106, 114)
 */

import { Journey, JourneyId, UserId, GoalId, toJourneyId } from '@amal/types';
import { db, InMemoryAmalDatabase } from '../index.js';

export interface JourneyRepository {
  create(input: Partial<Journey> & { userId: UserId; templateVersionId?: string }, tx?: InMemoryAmalDatabase): Promise<Journey>;
  findById(id: JourneyId, tx?: InMemoryAmalDatabase): Promise<Journey | null>;
  findByUserId(userId: UserId, tx?: InMemoryAmalDatabase): Promise<Journey[]>;
  update(id: JourneyId, input: Partial<Journey>, tx?: InMemoryAmalDatabase): Promise<Journey>;
}

export class InMemoryJourneyRepository implements JourneyRepository {
  async create(input: Partial<Journey> & { userId: UserId; templateVersionId?: string }, _tx?: InMemoryAmalDatabase): Promise<Journey> {
    const id = (input.id as JourneyId) || toJourneyId(`jrn_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`);
    const now = new Date().toISOString();
    const journey: Journey = {
      id,
      title: 'Journey',
      goal: 'Personal Worship Consistency',
      journeyType: 'CUSTOM' as any,
      description: 'Spiritual Journey',
      status: 'ACTIVE' as any,
      durationDays: 30,
      totalDays: 30,
      currentDay: 1,
      progress: 0,
      approvedByUser: true,
      baselineDifficulty: 'MODERATE',
      startDate: now,
      days: [],
      createdAt: now,
      updatedAt: now,
      currentMilestone: 'Phase 1: Foundation',
      ...input,
    };
    db.journeys.set(id, journey);
    return journey;
  }

  async findById(id: JourneyId, _tx?: InMemoryAmalDatabase): Promise<Journey | null> {
    return db.journeys.get(id) || null;
  }

  async findByUserId(userId: UserId, _tx?: InMemoryAmalDatabase): Promise<Journey[]> {
    return Array.from(db.journeys.values()).filter((j) => j.userId === userId);
  }

  async update(id: JourneyId, input: Partial<Journey>, _tx?: InMemoryAmalDatabase): Promise<Journey> {
    const existing = db.journeys.get(id);
    if (!existing) throw new Error(`Journey ${id} not found.`);
    const updated = { ...existing, ...input };
    db.journeys.set(id, updated);
    return updated;
  }
}

export const journeyRepository = new InMemoryJourneyRepository();
