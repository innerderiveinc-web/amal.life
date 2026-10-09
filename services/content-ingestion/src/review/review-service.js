"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewService = void 0;
class ReviewService {
    static reviews = new Map();
    static initializeReview(sourceVersionId, authorId, isSensitiveFiqh) {
        const state = {
            sourceVersionId,
            authorId,
            isSensitiveFiqh,
            finalApproved: false,
        };
        this.reviews.set(sourceVersionId, state);
        return state;
    }
    static submitReview(action) {
        const state = this.reviews.get(action.sourceVersionId);
        if (!state) {
            throw new Error(`Review state for version ${action.sourceVersionId} not found.`);
        }
        // Author != Reviewer rule
        if (state.authorId === action.reviewerId) {
            throw new Error('AUTHOR_CANNOT_REVIEW: Author cannot review or approve their own submission.');
        }
        if (action.decision === 'APPROVE') {
            if (action.reviewerRole === 'CONTENT_EDITOR')
                state.editorApproval = true;
            if (action.reviewerRole === 'SCHOLAR_A')
                state.scholarAApproval = true;
            if (action.reviewerRole === 'SCHOLAR_B')
                state.scholarBApproval = true;
        }
        // Two-Person Scholar Rule: For sensitive fiqh, requires both Scholar A and Scholar B
        if (state.isSensitiveFiqh) {
            state.finalApproved = !!(state.editorApproval && state.scholarAApproval && state.scholarBApproval);
        }
        else {
            state.finalApproved = !!(state.editorApproval && state.scholarAApproval);
        }
        return state;
    }
}
exports.ReviewService = ReviewService;
//# sourceMappingURL=review-service.js.map