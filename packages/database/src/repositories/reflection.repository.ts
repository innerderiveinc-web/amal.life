/**
 * AMAL OS — LAYER 19: REFLECTION REPOSITORY (Sections 52-54, 110, 114)
 */

import { Reflection, ReflectionId, UserId, toReflectionId } from '@amal/types';
import { db, InMemoryAmalDatabase } from '../index.js';

export interface CreateReflectionRecord {
  userId: UserId;
  date: string;
  feeling?: string;
  helpfulFactors?: string[];
  frictionFactors?: string[];
  freeText?: string;
  privacyLevel?: 'PRIVATE' | 'SHARED';
}

export interface ReflectionRepository {
  create(input: CreateReflectionRecord, tx?: InMemoryAmalDatabase): Promise<Reflection>;
  findById(id: ReflectionId, tx?: InMemoryAmalDatabase): Promise<Reflection | null>;
  findByUserId(userId: UserId, tx?: InMemoryAmalDatabase): Promise<Reflection[]>;
}

export class InMemoryReflectionRepository implements ReflectionRepository {
  async create(input: CreateReflectionRecord, _tx?: InMemoryAmalDatabase): Promise<Reflection> {
    const id = toReflectionId(`refl_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`);
    const reflection: Reflection = {
      id,
      userId: input.userId,
      reflectionType: 'DAILY_MUHASABAH',
      wentWell: input.freeText || input.feeling || 'Reflection recorded',
      date: input.date,
      content: input.freeText || input.feeling || 'Reflection recorded',
      sentiment: input.feeling || 'PEACEFUL',
      tags: [...(input.helpfulFactors || []), ...(input.frictionFactors || [])],
      isPrivate: input.privacyLevel !== 'SHARED', // Default to true (Section 53)
      createdAt: new Date().toISOString(),
    };

    const userReflections = db.reflections.get(input.userId) || [];
    userReflections.push(reflection);
    db.reflections.set(input.userId, userReflections);

    return reflection;
  }

  async findById(id: ReflectionId, _tx?: InMemoryAmalDatabase): Promise<Reflection | null> {
    for (const reflList of db.reflections.values()) {
      const found = reflList.find((r) => r.id === id);
      if (found) return found;
    }
    return null;
  }

  async findByUserId(userId: UserId, _tx?: InMemoryAmalDatabase): Promise<Reflection[]> {
    return db.reflections.get(userId) || [];
  }
}

export const reflectionRepository = new InMemoryReflectionRepository();
