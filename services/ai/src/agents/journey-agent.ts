import { Journey, JourneyType, JourneyAdaptationProposal } from '@amal/types';
import { SEED_JOURNEY_TEMPLATES } from '@amal/database';

export class JourneyAgent {
  /**
   * Instantiate a new journey from verified canonical templates
   */
  public static createJourneyFromTemplate(
    userId: string,
    journeyType: JourneyType
  ): Journey {
    const template =
      SEED_JOURNEY_TEMPLATES.find((t) => t.journeyType === journeyType) ||
      SEED_JOURNEY_TEMPLATES[0];

    const journeyId = `jrn-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;

    return {
      id: journeyId,
      userId,
      journeyType: template.journeyType,
      title: template.title,
      goal: template.goal,
      description: template.description,
      durationDays: template.durationDays,
      currentDay: 1,
      status: 'ACTIVE',
      approvedByUser: true,
      baselineDifficulty: template.baselineDifficulty,
      startDate: new Date().toISOString(),
      days: template.days.map((d) => ({
        id: `day-${journeyId}-${d.dayNumber}`,
        journeyId,
        dayNumber: d.dayNumber,
        title: d.title,
        learningPrompt: d.learningPrompt,
        reflectionPrompt: d.reflectionPrompt,
        isCompleted: false,
        evidencePassages: [],
        actions: d.actions.map((a, idx) => ({
          id: `act-${journeyId}-${d.dayNumber}-${idx}`,
          journeyId,
          dayNumber: d.dayNumber,
          title: a.title,
          description: a.description,
          estimatedMinutes: a.estimatedMinutes,
          category: a.category,
          primaryEvidenceReference: a.primaryEvidenceReference,
          difficulty: a.difficulty,
          status: 'PENDING',
          userApproved: true,
          createdAt: new Date().toISOString(),
        })),
      })),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  /**
   * Adaptive journey algorithm: if user skips or struggles, reduce friction without shame
   */
  public static proposeAdaptation(
    journey: Journey,
    consecutiveSkips: number
  ): JourneyAdaptationProposal | null {
    if (consecutiveSkips < 2) {
      return null;
    }

    return {
      journeyId: journey.id,
      reason: 'CONSECUTIVE_SKIPS',
      currentDifficulty: journey.baselineDifficulty,
      proposedDifficulty: 'VERY_EASY',
      reductionPercentage: 50,
      recommendedChanges: [
        'Reduce daily commitment time from 15 mins to 5 mins.',
        'Split the morning routine into single isolated micro-habits.',
        'Remove secondary reflection prompts temporarily.',
      ],
      reassuranceMessage:
        'Building consistency is a gradual journey. The Prophet (pbuh) taught that the most beloved deeds are those that are consistent, even if small. Let us simplify your plan to fit your current schedule comfortably.',
    };
  }
}
