export type AmalCompletionSemantic = 'FULL' | 'PARTIAL' | 'MINIMUM' | 'SKIPPED' | 'SNOOZED';

export interface DailyAmalAction {
  amalId: string;
  title: string;
  durationMinutes: number;
  minimumAction: string;
  targetAction: string;
  reasonCodes: string[];
  evidenceIds: string[];
}

export interface DailyPlanOutput {
  date: string;
  primary: DailyAmalAction;
  optional: DailyAmalAction[];
  burden: {
    level: 'LOW' | 'BALANCED' | 'HIGH';
    totalMinutes: number;
  };
}

export class DailyPlannerEngine {
  public static generatePlan(params: {
    userId: string;
    availableMinutes: number;
    activeGoalTitle: string;
    preferredTime?: string;
  }): DailyPlanOutput {
    const today = new Date().toISOString().split('T')[0] ?? '';

    const primary: DailyAmalAction = {
      amalId: 'aml_daily_quran_primary',
      title: 'Calm Quran Recitation & Reflection',
      durationMinutes: Math.min(params.availableMinutes, 10),
      minimumAction: '1 page or 3 ayahs with reflection',
      targetAction: '5 pages with translation',
      reasonCodes: ['GOAL_FIT', 'TIME_FIT', 'JOURNEY_CONTINUITY', 'APPROVED_EVIDENCE'],
      evidenceIds: ['ev_quran_17_78'],
    };

    const optional: DailyAmalAction[] = [];
    if (params.availableMinutes >= 15) {
      optional.push({
        amalId: 'aml_daily_evening_muhasabah',
        title: '3-Minute Evening Muhasabah Reflection',
        durationMinutes: 3,
        minimumAction: 'Answer 1 observation prompt',
        targetAction: 'Full 3-question reflection',
        reasonCodes: ['JOURNEY_CONTINUITY', 'USER_PREFERENCE'],
        evidenceIds: ['ev_hadith_bukhari_39'],
      });
    }

    const totalMinutes = primary.durationMinutes + optional.reduce((acc, o) => acc + o.durationMinutes, 0);

    return {
      date: today,
      primary,
      optional,
      burden: {
        level: totalMinutes <= 15 ? 'LOW' : 'BALANCED',
        totalMinutes,
      },
    };
  }
}
