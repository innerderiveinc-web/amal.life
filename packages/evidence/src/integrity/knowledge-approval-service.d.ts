import { VerificationLevel } from '@amal/types';
export interface ApprovalEvaluationResult {
    eligibleForProduction: boolean;
    assignedLevel: VerificationLevel;
    reasons: string[];
}
export declare class KnowledgeApprovalService {
    /**
     * Determine verification level based on review milestones
     */
    static evaluateApprovalLevel(data: {
        sourceIdentified: boolean;
        referenceVerified: boolean;
        provenanceAttributionVerified: boolean;
        licenseApproved: boolean;
        editorialApproved: boolean;
        scholarReviewed: boolean;
        isProductionPublished: boolean;
    }): VerificationLevel;
    /**
     * Enforce production eligibility gate
     */
    static checkProductionEligibility(sourceId: string): ApprovalEvaluationResult;
}
//# sourceMappingURL=knowledge-approval-service.d.ts.map