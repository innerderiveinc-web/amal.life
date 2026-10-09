/**
 * Citation Audit Worker
 * Performs async provenance and citation integrity audits across AI responses
 */
export declare function processCitationAuditJob(job: {
    responseId: string;
    claimIds: string[];
}): Promise<{
    verified: boolean;
    issuesFound: number;
    processedAt: string;
}>;
//# sourceMappingURL=citation-audit.worker.d.ts.map