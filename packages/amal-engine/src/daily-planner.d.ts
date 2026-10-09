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
export declare class DailyPlannerEngine {
    static generatePlan(params: {
        userId: string;
        availableMinutes: number;
        activeGoalTitle: string;
        preferredTime?: string;
    }): DailyPlanOutput;
}
//# sourceMappingURL=daily-planner.d.ts.map