/**
 * Evidence Index Worker
 * Updates dense embeddings and recursive graph edges for newly verified canonical passages
 */
export declare function processEvidenceIndexJob(job: {
    passageId: string;
    versionId: string;
}): Promise<{
    indexed: boolean;
    processedAt: string;
}>;
//# sourceMappingURL=evidence-index.worker.d.ts.map