import { VerifiedScholarRecord, ScholarReviewSignoff } from '@amal/types';
export declare class ScholarReviewService {
    private static scholars;
    private static reviews;
    static getScholar(id: string): VerifiedScholarRecord | undefined;
    static getAllScholars(): VerifiedScholarRecord[];
    /**
     * Register a scholar signoff, enforcing the Two-Person Rule for sensitive content
     */
    static recordSignoff(sourceId: string, signoff: ScholarReviewSignoff): {
        approved: boolean;
        signoffsCount: number;
        requiresSecondReviewer: boolean;
        error?: string;
    };
    static getSignoffs(sourceId: string): ScholarReviewSignoff[];
}
//# sourceMappingURL=scholar-review-service.d.ts.map