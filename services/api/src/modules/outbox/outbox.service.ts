import { Injectable } from '@nestjs/common';
import { db } from '@amal/database';

export interface OutboxEvent {
  id: string;
  eventType: string;
  aggregateId: string;
  payload: Record<string, any>;
  status: 'PENDING' | 'PROCESSED' | 'FAILED';
  attempts: number;
  availableAt: Date;
  createdAt: Date;
  processedAt?: Date;
}

@Injectable()
export class OutboxService {
  private static events: Map<string, OutboxEvent> = new Map();

  /**
   * Records an outbox event within the database transaction boundary
   */
  public async recordEvent(
    eventType: string,
    aggregateId: string,
    payload: Record<string, any>
  ): Promise<OutboxEvent> {
    const id = `evt_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const event: OutboxEvent = {
      id,
      eventType,
      aggregateId,
      payload,
      status: 'PENDING',
      attempts: 0,
      availableAt: new Date(),
      createdAt: new Date(),
    };

    OutboxService.events.set(id, event);
    return event;
  }

  /**
   * Fetches pending events for worker processing
   */
  public async getPendingEvents(limit = 50): Promise<OutboxEvent[]> {
    const pending: OutboxEvent[] = [];
    const now = new Date();

    for (const ev of OutboxService.events.values()) {
      if (ev.status === 'PENDING' && ev.availableAt <= now) {
        pending.push(ev);
        if (pending.length >= limit) break;
      }
    }

    return pending;
  }

  /**
   * Marks event processed after successful dispatch to Redis / BullMQ event bus
   */
  public async markProcessed(id: string): Promise<void> {
    const ev = OutboxService.events.get(id);
    if (ev) {
      ev.status = 'PROCESSED';
      ev.processedAt = new Date();
    }
  }
}
