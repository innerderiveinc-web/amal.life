/**
 * Reflection Worker
 * Processes reflection metadata and aggregates personal growth insights without exposing private text
 */
export declare function processReflectionJob(job: {
    reflectionId: string;
    userId: string;
}): Promise<{
    indexed: boolean;
    processedAt: string;
}>;
//# sourceMappingURL=reflection.worker.d.ts.map