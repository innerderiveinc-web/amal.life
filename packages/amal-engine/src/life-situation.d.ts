export type LifeSituationType = 'WORK_STRESS' | 'TIME_PRESSURE' | 'TRAVEL' | 'RAMADAN' | 'NEW_MUSLIM' | 'FAMILY_COMMITMENTS' | 'STUDY_EXAMS' | 'ROUTINE_DISRUPTION';
export interface ClassifiedSituation {
    type: LifeSituationType;
    confidence: number;
    potentialFrictions: string[];
}
export declare class LifeSituationClassifier {
    static classify(userInput: string): ClassifiedSituation[];
}
//# sourceMappingURL=life-situation.d.ts.map