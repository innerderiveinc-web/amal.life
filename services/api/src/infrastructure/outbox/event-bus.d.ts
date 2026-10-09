/**
 * AMAL OS — LAYER 20: EVENT BUS SERVICE (Section 20.1, 20.33)
 */
import { DomainEvent } from '@amal/events';
export declare class EventBusService {
    publish<T = any>(event: DomainEvent<T>): Promise<void>;
    subscribe<T = any>(eventType: string, handler: (event: DomainEvent<T>) => Promise<void> | void): void;
}
//# sourceMappingURL=event-bus.d.ts.map