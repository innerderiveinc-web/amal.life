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
export declare class OutboxService {
    private static events;
    /**
     * Records an outbox event within the database transaction boundary
     */
    recordEvent(eventType: string, aggregateId: string, payload: Record<string, any>): Promise<OutboxEvent>;
    /**
     * Fetches pending events for worker processing
     */
    getPendingEvents(limit?: number): Promise<OutboxEvent[]>;
    /**
     * Marks event processed after successful dispatch to Redis / BullMQ event bus
     */
    markProcessed(id: string): Promise<void>;
}
//# sourceMappingURL=outbox.service.d.ts.map