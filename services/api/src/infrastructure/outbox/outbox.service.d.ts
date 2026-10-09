/**
 * AMAL OS — LAYER 20: OUTBOX SERVICE (Section 20.14)
 * Transactional atomic event append ensuring zero event-loss.
 */
export interface OutboxEvent {
    eventType: string;
    aggregateType: string;
    aggregateId: string;
    payload: Record<string, unknown>;
}
export declare function appendOutboxEvent(tx: any, event: OutboxEvent): Promise<void>;
//# sourceMappingURL=outbox.service.d.ts.map