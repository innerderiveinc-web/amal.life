/**
 * AMAL OS — LAYER 19: EVENTS MODULE (Sections 55-56)
 * Transactional domain event definitions and in-memory publish-subscribe event bus.
 */
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
};
export class DomainEventBus {
    listeners = new Map();
    subscribe(eventType, handler) {
        const list = this.listeners.get(eventType) || [];
        list.push(handler);
        this.listeners.set(eventType, list);
    }
    async publish(event) {
        const handlers = this.listeners.get(event.type) || [];
        for (const handler of handlers) {
            try {
                await handler(event);
            }
            catch (err) {
                console.error(`[EventBus] Error handling event ${event.type}:`, err);
            }
        }
    }
    createEvent(type, aggregateType, aggregateId, payload, actorId) {
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
//# sourceMappingURL=index.js.map