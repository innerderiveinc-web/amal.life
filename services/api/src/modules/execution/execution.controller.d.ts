import { ExecutionService } from './execution.service.js';
export declare class ExecutionController {
    private readonly service;
    constructor(service: ExecutionService);
    getMilestones(): import("@amal/types").ExecutionMilestone[];
    getMilestone(phaseCode: string): import("@amal/types").ExecutionMilestone | undefined;
    updateMilestone(phaseCode: string, body: any): import("@amal/types").ExecutionMilestone;
    getActiveSprint(): import("@amal/types").ExecutionSprint | undefined;
    createSprint(body: any): import("@amal/types").ExecutionSprint;
    getLaunchGates(): import("@amal/types").LaunchGate[];
    evaluateGate(gateLevel: string, body: any): import("@amal/types").LaunchGate;
    getKillSwitches(): import("@amal/types").LaunchKillSwitch[];
    toggleKillSwitch(switchKey: string, body: any): import("@amal/types").LaunchKillSwitch;
    getBetaCohorts(): import("@amal/types").BetaCohort[];
    recordFeedback(body: any): import("@amal/types").BetaFeedbackRecord;
    logDecision(body: any): import("@amal/types").ProductDecision;
    getDecisions(): import("@amal/types").ProductDecision[];
    getExecutionHealth(): import("@amal/types").ExecutionHealthSummary;
}
//# sourceMappingURL=execution.controller.d.ts.map