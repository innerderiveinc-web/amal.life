/**
 * AMAL OS — LAYER 20: OUTBOX WORKER (Section 20.34)
 * Reliable event publisher with exponential backoff and dead-letter handling.
 */
export declare class OutboxWorker {
    private isRunning;
    exponentialBackoff(attempt: number, baseMs?: number): number;
    processPendingEvents(batchSize?: number): Promise<number>;
}
//# sourceMappingURL=outbox.worker.d.ts.map