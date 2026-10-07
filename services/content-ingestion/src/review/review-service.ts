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

export class ReviewService {
  private static reviews = new Map<string, ReviewState>();

  public static initializeReview(sourceVersionId: string, authorId: string, isSensitiveFiqh: boolean): ReviewState {
    const state: ReviewState = {
      sourceVersionId,
      authorId,
      isSensitiveFiqh,
      finalApproved: false,
    };
    this.reviews.set(sourceVersionId, state);
    return state;
  }

  public static submitReview(action: ReviewAction): ReviewState {
    const state = this.reviews.get(action.sourceVersionId);
    if (!state) {
      throw new Error(`Review state for version ${action.sourceVersionId} not found.`);
    }

    // Author != Reviewer rule
    if (state.authorId === action.reviewerId) {
      throw new Error('AUTHOR_CANNOT_REVIEW: Author cannot review or approve their own submission.');
    }

    if (action.decision === 'APPROVE') {
      if (action.reviewerRole === 'CONTENT_EDITOR') state.editorApproval = true;
      if (action.reviewerRole === 'SCHOLAR_A') state.scholarAApproval = true;
      if (action.reviewerRole === 'SCHOLAR_B') state.scholarBApproval = true;
    }

    // Two-Person Scholar Rule: For sensitive fiqh, requires both Scholar A and Scholar B
    if (state.isSensitiveFiqh) {
      state.finalApproved = !!(state.editorApproval && state.scholarAApproval && state.scholarBApproval);
    } else {
      state.finalApproved = !!(state.editorApproval && state.scholarAApproval);
    }

    return state;
  }
}
