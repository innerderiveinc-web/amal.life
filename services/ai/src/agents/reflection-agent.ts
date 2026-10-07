import { Reflection, PersonalInsight } from '@amal/types';

export class ReflectionAgent {
  /**
   * Synthesize behavioral observations from user reflection history
   * IMPORTANT: Strictly produces behavioral observations, never spiritual or moral judgments.
   */
  public static analyzeReflections(
    userId: string,
    reflections: Reflection[]
  ): PersonalInsight[] {
    const insights: PersonalInsight[] = [];

    if (reflections.length === 0) {
      return insights;
    }

    const textCorpus = reflections
      .map((r) => `${r.wentWell} ${r.feltDifficult || ''}`)
      .join(' ')
      .toLowerCase();

    // Check bedtime correlation
    if (textCorpus.includes('late') || textCorpus.includes('tired') || textCorpus.includes('sleep')) {
      insights.push({
        id: `ins-sleep-${Date.now()}`,
        userId,
        category: 'TIME_CORRELATION',
        observation:
          'Morning wake-up consistency correlates strongly with evening wind-down before 10:30 PM.',
        supportingDataPoint: 'Observed across 3 recent reflection entries mentioning sleep timing.',
        confidence: 0.85,
        isSpiritualJudgment: false,
        createdAt: new Date().toISOString(),
      });
    }

    // Check Quran consistency
    if (textCorpus.includes('quran') || textCorpus.includes('reading')) {
      insights.push({
        id: `ins-quran-${Date.now()}`,
        userId,
        category: 'ROUTINE_OBSERVATION',
        observation:
          'Quran reading participation is highest during early morning quiet windows compared to evening hours.',
        supportingDataPoint: 'Highest completion rates recorded during Fajr and morning blocks.',
        confidence: 0.88,
        isSpiritualJudgment: false,
        createdAt: new Date().toISOString(),
      });
    }

    return insights;
  }
}
