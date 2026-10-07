export type LifeSituationType =
  | 'WORK_STRESS'
  | 'TIME_PRESSURE'
  | 'TRAVEL'
  | 'RAMADAN'
  | 'NEW_MUSLIM'
  | 'FAMILY_COMMITMENTS'
  | 'STUDY_EXAMS'
  | 'ROUTINE_DISRUPTION';

export interface ClassifiedSituation {
  type: LifeSituationType;
  confidence: number;
  potentialFrictions: string[];
}

export class LifeSituationClassifier {
  public static classify(userInput: string): ClassifiedSituation[] {
    const text = userInput.toLowerCase();
    const results: ClassifiedSituation[] = [];

    if (text.includes('work') || text.includes('job') || text.includes('boss') || text.includes('overwhelmed') || text.includes('busy at work')) {
      results.push({
        type: 'WORK_STRESS',
        confidence: 0.92,
        potentialFrictions: ['TIME', 'ENERGY', 'SCHEDULE_CONFLICT'],
      });
    }

    if (text.includes('no time') || text.includes('tight schedule') || text.includes('rushing') || text.includes('long hours')) {
      results.push({
        type: 'TIME_PRESSURE',
        confidence: 0.88,
        potentialFrictions: ['TIME', 'TOO_LONG'],
      });
    }

    if (text.includes('travel') || text.includes('airport') || text.includes('flight') || text.includes('hotel') || text.includes('trip')) {
      results.push({
        type: 'TRAVEL',
        confidence: 0.95,
        potentialFrictions: ['LOCATION', 'ENVIRONMENT', 'SCHEDULE_CONFLICT'],
      });
    }

    if (text.includes('ramadan') || text.includes('fasting') || text.includes('suhoor') || text.includes('iftar')) {
      results.push({
        type: 'RAMADAN',
        confidence: 0.98,
        potentialFrictions: ['ENERGY', 'TOO_EARLY', 'TOO_LATE'],
      });
    }

    if (text.includes('new muslim') || text.includes('revert') || text.includes('recently accepted islam')) {
      results.push({
        type: 'NEW_MUSLIM',
        confidence: 0.96,
        potentialFrictions: ['COMPLEXITY', 'UNCLEAR_NEXT_STEP'],
      });
    }

    return results;
  }
}
