/**
 * Scholar Case Worker
 * Dispatches anonymized Fiqh pastoral cases to available certified resident jurists
 */
export declare function processScholarCaseJob(job: {
    caseId: string;
    category: string;
}): Promise<{
    assigned: boolean;
    processedAt: string;
}>;
//# sourceMappingURL=scholar-case.worker.d.ts.map