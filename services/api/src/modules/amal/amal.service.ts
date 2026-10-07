import { Injectable } from '@nestjs/common';
import { PostgresAmalRepository, CreateAmalInput, CompleteAmalInput, AmalCompletionRecord } from './amal.repository.js';
import { OutboxService } from '../outbox/outbox.service.js';
import { Amal } from '@amal/types';

@Injectable()
export class AmalService {
  private repo = new PostgresAmalRepository();
  private outbox = new OutboxService();

  public async create(userId: string, input: Omit<CreateAmalInput, 'userId'>): Promise<Amal> {
    return this.repo.create({ ...input, userId });
  }

  public async findById(userId: string, amalId: string): Promise<Amal | null> {
    return this.repo.findById(userId, amalId);
  }

  public async findToday(userId: string): Promise<Amal[]> {
    return this.repo.findToday(userId);
  }

  /**
   * Completes an Amal, stores completion with idempotency, and records outbox event
   */
  public async complete(input: CompleteAmalInput): Promise<AmalCompletionRecord> {
    const completion = await this.repo.complete(input);

    // Record outbox event for async processing (journey updater, friction analysis)
    await this.outbox.recordEvent('amal.completed', completion.id, {
      amalId: input.amalId,
      userId: input.userId,
      completionType: input.completionType,
      durationMinutes: completion.durationMinutes,
    });

    return completion;
  }
}
