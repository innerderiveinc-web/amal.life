import {
  ProposedAmalAction,
  AmalScoreBreakdown,
  AmalGenerationRequest,
  EvidencePackItem,
} from '@amal/types';

export class AmalPlanner {
  /**
   * Calculate Amal Feasibility and Relevance Score
   */
  public static calculateAmalScore(
    evidenceFit: number,
    contextFit: number,
    feasibility: number,
    userIntent: number,
    safety: number
  ): AmalScoreBreakdown {
    const totalScore = evidenceFit * contextFit * feasibility * userIntent * safety;
    return {
      evidenceFit,
      contextFit,
      feasibility,
      userIntent,
      safety,
      totalScore: Number(totalScore.toFixed(3)),
    };
  }

  /**
   * Plan actionable steps based on user intent and retrieved evidence
   */
  public static planActions(
    intent: string,
    evidenceItems: EvidencePackItem[],
    availableMinutes = 15
  ): ProposedAmalAction[] {
    const actions: ProposedAmalAction[] = [];

    if (intent === 'FAJR_STRUGGLE') {
      actions.push({
        title: 'Establish Evening Wind-Down at Isha',
        description: 'Pray Isha, silence digital devices 45 minutes before sleep, and place phone across the room.',
        estimatedMinutes: 10,
        category: 'WORSHIP',
        evidenceReference: 'Sahih al-Bukhari 568',
        feasibilityScore: 0.95,
      });
      actions.push({
        title: 'Recite Bedtime Protection Adhkar',
        description: 'Recite Ayat al-Kursi and the 3 Quls before sleeping on your right side with sincere Niyyah.',
        estimatedMinutes: 5,
        category: 'HABIT',
        evidenceReference: 'Sahih al-Bukhari 5017',
        feasibilityScore: 0.98,
      });
    } else if (intent === 'QURAN_HABIT') {
      actions.push({
        title: '7 Minutes of Contemplative Quran Recitation',
        description: 'Read 5-10 verses with translation slowly and write down one reflection.',
        estimatedMinutes: 7,
        category: 'KNOWLEDGE',
        evidenceReference: 'Quran 73:4',
        feasibilityScore: 0.96,
      });
    } else if (intent === 'CHARACTER_AND_ANGER') {
      actions.push({
        title: 'The Prophetic 3-Second Pause',
        description: 'When feeling frustration arise, pause for 3 seconds and recite "A\'udhu billahi minash-shaytanir-rajim".',
        estimatedMinutes: 2,
        category: 'CHARACTER',
        evidenceReference: 'Sahih al-Bukhari 6116',
        feasibilityScore: 0.92,
      });
    } else if (intent === 'FAMILY_RELATIONS') {
      actions.push({
        title: 'Call or Visit Parents Today',
        description: 'Reach out to your parents with warmth, inquire about their well-being, and make dua for them.',
        estimatedMinutes: 15,
        category: 'FAMILY',
        evidenceReference: 'Quran 17:23',
        feasibilityScore: 0.94,
      });
    } else {
      // Default general action
      actions.push({
        title: 'Formulate Clear Niyyah (Intention)',
        description: 'Take 2 minutes of quiet contemplation to clarify your sincere intention for today’s deeds.',
        estimatedMinutes: 2,
        category: 'REFLECTION',
        evidenceReference: 'Sahih al-Bukhari 1',
        feasibilityScore: 0.99,
      });
    }

    return actions;
  }
}
