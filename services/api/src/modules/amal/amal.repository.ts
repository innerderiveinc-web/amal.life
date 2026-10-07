import { Amal, AmalType } from '@amal/types';
import { db } from '@amal/database';

export interface CreateAmalInput {
  userId: string;
  journeyId?: string;
  templateId?: string;
  title: string;
  type: AmalType;
  durationMinutes: number;
}

export interface CompleteAmalInput {
  amalId: string;
  userId: string;
  completionType: 'FULL' | 'PARTIAL' | 'MINIMUM' | 'SKIPPED';
  durationMinutes?: number;
  notes?: string;
  idempotencyKey: string;
}

export interface AmalCompletionRecord {
  id: string;
  amalId: string;
  userId: string;
  completionType: string;
  durationMinutes?: number;
  notes?: string;
  completedAt: string;
  idempotencyKey: string;
}

export class PostgresAmalRepository {
  private static completions = new Map<string, AmalCompletionRecord>();

  public async create(input: CreateAmalInput): Promise<Amal> {
    const id = `amal_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const amal: Amal = {
      id,
      userId: input.userId,
      journeyId: input.journeyId,
      title: input.title,
      type: input.type,
      category: 'PERSONAL_GROWTH' as any,
      durationMinutes: input.durationMinutes,
      status: 'ACTIVE',
      completionCount: 0,
      createdAt: new Date().toISOString(),
    };
    db.amals.set(id, amal);
    return amal;
  }

  public async findById(userId: string, amalId: string): Promise<Amal | null> {
    const amal = db.amals.get(amalId);
    if (!amal || amal.userId !== userId) {
      return null;
    }
    return amal;
  }

  public async findToday(userId: string): Promise<Amal[]> {
    return Array.from(db.amals.values()).filter(
      (a) => a.userId === userId && a.status === 'ACTIVE'
    );
  }

  public async complete(input: CompleteAmalInput): Promise<AmalCompletionRecord> {
    // Check idempotency
    for (const record of PostgresAmalRepository.completions.values()) {
      if (record.idempotencyKey === input.idempotencyKey) {
        return record;
      }
    }

    const amal = await this.findById(input.userId, input.amalId);
    if (!amal) {
      throw new Error(`Amal ${input.amalId} not found or ownership mismatch`);
    }

    amal.completionCount = (amal.completionCount || 0) + 1;
    amal.lastCompletedAt = new Date().toISOString();
    db.amals.set(amal.id, amal);

    const recordId = `cmp_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const completion: AmalCompletionRecord = {
      id: recordId,
      amalId: input.amalId,
      userId: input.userId,
      completionType: input.completionType,
      durationMinutes: input.durationMinutes || amal.durationMinutes,
      notes: input.notes,
      completedAt: new Date().toISOString(),
      idempotencyKey: input.idempotencyKey,
    };

    PostgresAmalRepository.completions.set(recordId, completion);
    return completion;
  }
}
