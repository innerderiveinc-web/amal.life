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
export declare const Events: {
    readonly GoalCreated: "goal.created.v1";
    readonly JourneyStarted: "journey.started.v1";
    readonly AmalCompleted: "amal.completed.v1";
    readonly ReflectionCreated: "reflection.created.v1";
    readonly InsightConfirmed: "insight.confirmed.v1";
    readonly FrictionDetected: "friction.detected.v1";
    readonly JourneyPaused: "journey.paused.v1";
    readonly JourneyResumed: "journey.resumed.v1";
    readonly JourneyCompleted: "journey.completed.v1";
    readonly AmalRecommended: "amal.recommended.v1";
    readonly AmalStarted: "amal.started.v1";
    readonly AmalPartial: "amal.partial.v1";
    readonly AmalSkipped: "amal.skipped.v1";
};
export type EventCallback<T = any> = (event: DomainEvent<T>) => Promise<void> | void;
export declare class DomainEventBus {
    private readonly listeners;
    subscribe<T = any>(eventType: string, handler: EventCallback<T>): void;
    publish<T = any>(event: DomainEvent<T>): Promise<void>;
    createEvent<T>(type: string, aggregateType: string, aggregateId: string, payload: T, actorId?: string): DomainEvent<T>;
}
export declare const eventBus: DomainEventBus;
//# sourceMappingURL=index.d.ts.map