/**
 * Personalization Worker
 * Refines practical context (time capacity, reminder schedules) under strict user consent
 */
export declare function processPersonalizationJob(job: {
    userId: string;
    consentGranted: boolean;
}): Promise<{
    skipped: boolean;
    updated?: undefined;
    processedAt?: undefined;
} | {
    updated: boolean;
    processedAt: string;
    skipped?: undefined;
}>;
//# sourceMappingURL=personalization.worker.d.ts.map