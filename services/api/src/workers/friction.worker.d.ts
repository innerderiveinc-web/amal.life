/**
 * Friction Worker
 * Detects patterns of fatigue or friction and initiates non-punitive adaptations
 */
export declare function processFrictionJob(job: {
    userId: string;
    journeyId?: string;
    frictionSignals: any[];
}): Promise<{
    adaptationRecommended: boolean;
    processedAt: string;
}>;
//# sourceMappingURL=friction.worker.d.ts.map