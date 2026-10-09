/**
 * AMAL OS — V1.5: FEEDBACK PROCESSOR
 * Section 12–13: Processes recommendation feedback without guilt or shame.
 * Rejections and skips are treated as informative feasibility signals, not moral failures.
 */

import { RecommendationFeedbackRecord, LearnedPreference } from '@amal/types';

export class FeedbackProcessor {
  private static feedbackStore = new Map<string, RecommendationFeedbackRecord[]>();

  public static recordFeedback(feedback: RecommendationFeedbackRecord): {
    recorded: boolean;
    suggestedPreferenceAdjustment?: Partial<LearnedPreference>;
  } {
    const list = this.feedbackStore.get(feedback.userId) || [];
    list.push(feedback);
    this.feedbackStore.set(feedback.userId, list);

    // Analyze feedback for actionable adjustments
    if (feedback.feedbackOption === 'TOO_LONG' || feedback.feedbackOption === 'TOO_HARD') {
      return {
        recorded: true,
        suggestedPreferenceAdjustment: {
          type: 'ACTION_SIZE_PREFERENCE',
          value: 3, // Recommend shortening to 3-5 mins
          source: 'WEAK_BEHAVIORAL',
          reason: 'User indicated action was too long/difficult via feedback',
        },
      };
    }

    if (feedback.feedbackOption === 'WRONG_TIME') {
      return {
        recorded: true,
        suggestedPreferenceAdjustment: {
          type: 'TIMING_PREFERENCE',
          value: 'AFTER_FAJR', // Propose alternate morning slot
          source: 'WEAK_BEHAVIORAL',
          reason: 'User indicated time was inconvenient',
        },
      };
    }

    return { recorded: true };
  }

  public static getFeedbackHistory(userId: string): RecommendationFeedbackRecord[] {
    return this.feedbackStore.get(userId) || [];
  }
}
