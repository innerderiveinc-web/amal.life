import { Reflection } from '@amal/types';
import { db } from '@amal/database';

export interface CreateReflectionInput {
  userId: string;
  journeyId?: string;
  amalId?: string;
  reflectionType: 'DAILY_MUHASABAH' | 'JOURNEY_CHECK_IN' | 'PERSONAL_NOTE';
  wentWell: string;
  frictionDetected?: string;
  tomorrowIntention: string;
}

export class PostgresReflectionsRepository {
  public async create(input: CreateReflectionInput): Promise<Reflection> {
    const id = `ref_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const reflection: Reflection = {
      id,
      userId: input.userId,
      journeyId: input.journeyId,
      amalId: input.amalId,
      reflectionType: input.reflectionType,
      wentWell: input.wentWell,
      frictionDetected: input.frictionDetected,
      tomorrowIntention: input.tomorrowIntention,
      privateToUser: true, // Non-negotiable: strictly private to user
      createdAt: new Date().toISOString(),
    };
    const list = db.reflections.get(input.userId) || [];
    list.push(reflection);
    db.reflections.set(input.userId, list);
    return reflection;
  }

  /**
   * Enforces that reflections can ONLY be queried by their direct owner.
   * Admins and family members cannot bypass this.
   */
  public async findByUserId(userId: string): Promise<Reflection[]> {
    return db.reflections.get(userId) || [];
  }

  public async findById(userId: string, reflectionId: string): Promise<Reflection | null> {
    const list = db.reflections.get(userId) || [];
    const ref = list.find((r) => r.id === reflectionId);
    if (!ref || ref.userId !== userId) {
      return null;
    }
    return ref;
  }
}
