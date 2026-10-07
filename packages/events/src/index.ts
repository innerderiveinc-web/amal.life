/**
 * AMAL OS — LAYER 19: EVENTS MODULE (Sections 55-56)
 * Transactional domain event definitions and in-memory publish-subscribe event bus.
 */

export interface DomainEvent<T = any> {
  id: string;
  type: string;
  version: number;
  aggregateType: string;
  aggregateId: string;
  actorId?: string;
  occurredAt: string;
  correlationId?: string;
  payload: T;
}

export const Events = {
  GoalCreated: 'goal.created.v1',
  JourneyStarted: 'journey.started.v1',
  AmalCompleted: 'amal.completed.v1',
  ReflectionCreated: 'reflection.created.v1',
  InsightConfirmed: 'insight.confirmed.v1',
  FrictionDetected: 'friction.detected.v1',
  JourneyPaused: 'journey.paused.v1',
  JourneyResumed: 'journey.resumed.v1',
  JourneyCompleted: 'journey.completed.v1',
  AmalRecommended: 'amal.recommended.v1',
  AmalStarted: 'amal.started.v1',
  AmalPartial: 'amal.partial.v1',
  AmalSkipped: 'amal.skipped.v1',
} as const;

export type EventCallback<T = any> = (event: DomainEvent<T>) => Promise<void> | void;

export class DomainEventBus {
  private readonly listeners = new Map<string, EventCallback[]>();

  public subscribe<T = any>(eventType: string, handler: EventCallback<T>): void {
    const list = this.listeners.get(eventType) || [];
    list.push(handler);
    this.listeners.set(eventType, list);
  }

  public async publish<T = any>(event: DomainEvent<T>): Promise<void> {
    const handlers = this.listeners.get(event.type) || [];
    for (const handler of handlers) {
      try {
        await handler(event);
      } catch (err) {
        console.error(`[EventBus] Error handling event ${event.type}:`, err);
      }
    }
  }

  public createEvent<T>(
    type: string,
    aggregateType: string,
    aggregateId: string,
    payload: T,
    actorId?: string
  ): DomainEvent<T> {
    return {
      id: `evt_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      type,
      version: 1,
      aggregateType,
      aggregateId,
      actorId,
      occurredAt: new Date().toISOString(),
      payload,
    };
  }
}

export const eventBus = new DomainEventBus();
