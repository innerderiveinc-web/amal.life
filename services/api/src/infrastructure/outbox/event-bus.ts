/**
 * AMAL OS — LAYER 20: EVENT BUS SERVICE (Section 20.1, 20.33)
 */

import { Injectable } from '@nestjs/common';
import { eventBus, DomainEvent } from '@amal/events';

@Injectable()
export class EventBusService {
  async publish<T = any>(event: DomainEvent<T>): Promise<void> {
    await eventBus.publish(event);
  }

  subscribe<T = any>(eventType: string, handler: (event: DomainEvent<T>) => Promise<void> | void): void {
    eventBus.subscribe(eventType, handler);
  }
}
