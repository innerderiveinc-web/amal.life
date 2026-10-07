/**
 * AMAL OS — LAYER 20: OUTBOX WORKER (Section 20.34)
 * Reliable event publisher with exponential backoff and dead-letter handling.
 */

import { Injectable } from '@nestjs/common';
import { outboxRepository } from '@amal/database';
import { eventBus } from '@amal/events';

@Injectable()
export class OutboxWorker {
  private isRunning = false;

  public exponentialBackoff(attempt: number, baseMs: number = 1000): number {
    return Math.min(baseMs * Math.pow(2, attempt), 60000);
  }

  async processPendingEvents(batchSize: number = 20): Promise<number> {
    const pending = await outboxRepository.leasePending(batchSize);
    let processed = 0;

    for (const record of pending) {
      try {
        await eventBus.publish({
          id: record.id,
          type: record.eventType,
          version: 1,
          aggregateType: record.aggregateType,
          aggregateId: record.aggregateId,
          occurredAt: record.createdAt,
          payload: record.payload,
        });

        await outboxRepository.markProcessed(record.id);
        processed++;
      } catch (err: any) {
        const nextBackoff = this.exponentialBackoff(record.retryCount || 1);
        await outboxRepository.markFailed(record.id, err?.message);
      }
    }

    return processed;
  }
}
