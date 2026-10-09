/**
 * Cleanup Worker
 * Performs data retention pruning, expired token purges, and ephemeral context rotation
 */
export declare function processCleanupJob(job: {
    retentionDays: number;
}): Promise<{
    purgedCount: number;
    processedAt: string;
}>;
//# sourceMappingURL=cleanup.worker.d.ts.map