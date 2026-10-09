import { ExecutionPackService } from './execution-pack.service';
import { ExecutionModule, CriticalUserJourney, SprintExecutionPlan, ExecutionPackReadinessReport } from '@amal/types';
export declare class ExecutionPackController {
    private readonly executionPackService;
    constructor(executionPackService: ExecutionPackService);
    getModules(): {
        status: string;
        data: ExecutionModule[];
    };
    getModule(code: string): {
        status: string;
        data: ExecutionModule;
    };
    getCriticalUserJourneys(): {
        status: string;
        data: CriticalUserJourney[];
    };
    getCriticalUserJourney(id: string): {
        status: string;
        data: CriticalUserJourney;
    };
    getSprintPlans(): {
        status: string;
        data: SprintExecutionPlan[];
    };
    getReadinessReport(): {
        status: string;
        data: ExecutionPackReadinessReport;
    };
}
//# sourceMappingURL=execution-pack.controller.d.ts.map