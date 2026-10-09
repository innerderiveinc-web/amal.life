/**
 * Daily Plan Worker
 * Generates and updates next daily plan for active user journeys
 */
export declare function processDailyPlanJob(job: {
    userId: string;
    date: string;
}): Promise<{
    success: boolean;
    processedAt: string;
}>;
//# sourceMappingURL=daily-plan.worker.d.ts.map