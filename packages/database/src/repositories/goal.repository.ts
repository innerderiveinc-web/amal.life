/**
 * AMAL OS — LAYER 19: GOAL REPOSITORY (Section 22 & 114)
 */

import { GoalId, UserId, GoalRecord, CreateGoalRecord, UpdateGoalRecord, toGoalId } from '@amal/types';
import { db, InMemoryAmalDatabase } from '../index.js';

export interface GoalRepository {
  create(input: CreateGoalRecord, tx?: InMemoryAmalDatabase): Promise<GoalRecord>;
  findById(id: GoalId, tx?: InMemoryAmalDatabase): Promise<GoalRecord | null>;
  findByUser(userId: UserId, tx?: InMemoryAmalDatabase): Promise<GoalRecord[]>;
  update(id: GoalId, input: UpdateGoalRecord, tx?: InMemoryAmalDatabase): Promise<GoalRecord>;
}

export class InMemoryGoalRepository implements GoalRepository {
  private readonly goals = new Map<string, GoalRecord>();

  async create(input: CreateGoalRecord, _tx?: InMemoryAmalDatabase): Promise<GoalRecord> {
    const id = toGoalId(`goal_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`);
    const now = new Date().toISOString();
    const record: GoalRecord = {
      id,
      userId: input.userId,
      title: input.title,
      category: input.category,
      intent: input.intent,
      desiredOutcome: input.desiredOutcome,
      timeHorizon: input.timeHorizon,
      status: 'ACTIVE',
      createdAt: now,
      updatedAt: now,
    };
    this.goals.set(id, record);
    return record;
  }

  async findById(id: GoalId, _tx?: InMemoryAmalDatabase): Promise<GoalRecord | null> {
    return this.goals.get(id) || null;
  }

  async findByUser(userId: UserId, _tx?: InMemoryAmalDatabase): Promise<GoalRecord[]> {
    return Array.from(this.goals.values()).filter((g) => g.userId === userId);
  }

  async update(id: GoalId, input: UpdateGoalRecord, _tx?: InMemoryAmalDatabase): Promise<GoalRecord> {
    const existing = this.goals.get(id);
    if (!existing) {
      throw new Error(`Goal with ID ${id} not found.`);
    }
    const updated: GoalRecord = {
      ...existing,
      ...(input.title && { title: input.title }),
      ...(input.category && { category: input.category }),
      ...(input.intent && { intent: input.intent }),
      ...(input.desiredOutcome !== undefined && { desiredOutcome: input.desiredOutcome }),
      ...(input.timeHorizon !== undefined && { timeHorizon: input.timeHorizon }),
      ...(input.status && { status: input.status }),
      updatedAt: new Date().toISOString(),
    };
    this.goals.set(id, updated);
    return updated;
  }
}

export const goalRepository = new InMemoryGoalRepository();
