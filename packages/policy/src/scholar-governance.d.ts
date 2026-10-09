import { ScholarProfile } from '@amal/types';
export interface DualReviewRequest {
    resourceId: string;
    primaryScholarId: string;
    secondaryScholarId: string;
    primaryVerdict: 'APPROVE' | 'REJECT';
    secondaryVerdict: 'APPROVE' | 'REJECT';
    pluralityNotes?: string;
}
export interface DualReviewResult {
    outcome: 'APPROVED' | 'DISPUTE_PRESERVED' | 'REJECTED';
    isPluralityPreserved: boolean;
    notes: string;
}
export declare class ScholarGovernanceService {
    private static scholars;
    static getScholar(scholarId: string): ScholarProfile | undefined;
    static isVerified(scholarId: string): boolean;
    /**
     * Evaluates a Dual-Scholar Review for high-risk knowledge items.
     * Invariant: If qualified scholars disagree, plurality is preserved rather than forcing false consensus.
     */
    static evaluateDualReview(req: DualReviewRequest): DualReviewResult;
    /**
     * Progresses a content approval state through governed lifecycle stages.
     */
    static transitionContentState(currentState: string, action: 'VALIDATE' | 'REVIEW_EDITOR' | 'REVIEW_SCHOLAR' | 'PUBLISH' | 'QUARANTINE'): string;
}
//# sourceMappingURL=scholar-governance.d.ts.map