export interface ReviewAction {
    sourceVersionId: string;
    reviewerId: string;
    reviewerRole: 'CONTENT_EDITOR' | 'SCHOLAR_A' | 'SCHOLAR_B' | 'SUPER_ADMIN';
    decision: 'APPROVE' | 'REJECT' | 'REQUEST_CHANGES' | 'QUARANTINE';
    comments?: string;
}
export interface ReviewState {
    sourceVersionId: string;
    authorId: string;
    editorApproval?: boolean;
    scholarAApproval?: boolean;
    scholarBApproval?: boolean;
    isSensitiveFiqh: boolean;
    finalApproved: boolean;
}
export declare class ReviewService {
    private static reviews;
    static initializeReview(sourceVersionId: string, authorId: string, isSensitiveFiqh: boolean): ReviewState;
    static submitReview(action: ReviewAction): ReviewState;
}
//# sourceMappingURL=review-service.d.ts.map