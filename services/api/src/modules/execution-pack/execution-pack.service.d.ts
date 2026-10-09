import { ExecutionModule, CriticalUserJourney, SprintExecutionPlan, ExecutionPackReadinessReport } from '@amal/types';
export declare class ExecutionPackService {
    private readonly modules;
    private readonly cujs;
    private readonly sprints;
    getModules(): ExecutionModule[];
    getModule(code: string): ExecutionModule | undefined;
    getCriticalUserJourneys(): CriticalUserJourney[];
    getCriticalUserJourney(cujId: string): CriticalUserJourney | undefined;
    getSprintPlans(): SprintExecutionPlan[];
    getReadinessReport(): ExecutionPackReadinessReport;
}
//# sourceMappingURL=execution-pack.service.d.ts.map