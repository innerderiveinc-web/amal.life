/**
 * AMAL OS — LAYER 19: GOAL BASELINE REPOSITORY (Section 104, 114)
 */

import { GoalBaselineRecord, GoalId } from '@amal/types';
import { InMemoryAmalDatabase } from '../index.js';

export interface BaselineRepository {
  create(input: Omit<GoalBaselineRecord, 'id' | 'capturedAt'>, tx?: InMemoryAmalDatabase): Promise<GoalBaselineRecord>;
  findByGoalId(goalId: GoalId, tx?: InMemoryAmalDatabase): Promise<GoalBaselineRecord | null>;
}

export class InMemoryBaselineRepository implements BaselineRepository {
  private readonly baselines = new Map<string, GoalBaselineRecord>();

  async create(input: Omit<GoalBaselineRecord, 'id' | 'capturedAt'>, _tx?: InMemoryAmalDatabase): Promise<GoalBaselineRecord> {
    const id = `base_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    const record: GoalBaselineRecord = {
      ...input,
      id,
      capturedAt: new Date().toISOString(),
    };
    this.baselines.set(record.goalId, record);
    return record;
  }

  async findByGoalId(goalId: GoalId, _tx?: InMemoryAmalDatabase): Promise<GoalBaselineRecord | null> {
    return this.baselines.get(goalId) || null;
  }
}

export const baselineRepository = new InMemoryBaselineRepository();
