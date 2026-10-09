import { ExecutionMilestone, ExecutionSprint, LaunchGate, LaunchKillSwitch, BetaCohort, BetaFeedbackRecord, ProductDecision, ExecutionHealthSummary, SquadName } from '@amal/types';
export declare class ExecutionService {
    private milestones;
    private sprints;
    private gates;
    private killSwitches;
    private cohorts;
    private feedbackRecords;
    private decisions;
    constructor();
    private seedExecutionBlueprint;
    getMilestones(): ExecutionMilestone[];
    getMilestone(phaseCode: string): ExecutionMilestone | undefined;
    updateMilestoneStatus(phaseCode: string, status: 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED' | 'BLOCKED'): ExecutionMilestone;
    getActiveSprint(): ExecutionSprint | undefined;
    createSprint(data: {
        sprintNumber: number;
        sprintName: string;
        squadName: SquadName;
        startDate: string;
        endDate: string;
        qualityBudgetPercent?: number;
        committedStories: string[];
    }): ExecutionSprint;
    getLaunchGates(): LaunchGate[];
    evaluateGate(gateLevel: string, passed: boolean, signoff: string): LaunchGate;
    getKillSwitches(): LaunchKillSwitch[];
    toggleKillSwitch(switchKey: string, active: boolean, reason?: string, actorId?: string): LaunchKillSwitch;
    getBetaCohorts(): BetaCohort[];
    recordBetaFeedback(data: {
        userId: string;
        cohortId?: string;
        feedbackCategory: 'TODAY_FLOW' | 'AMAL_FEASIBILITY' | 'EVIDENCE_TRUST' | 'ADAPTATION_HELPFULNESS' | 'FEELING_JUDGED_OR_SHAMED' | 'AI_CITATION' | 'APP_STABILITY';
        severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
        summary: string;
        didHelpIntentionalAction: boolean;
    }): BetaFeedbackRecord;
    logProductDecision(data: {
        decisionCode: string;
        title: string;
        contextReason: string;
        alternativesConsidered: string[];
        evidenceUsed: string;
        decisionOwner: string;
    }): ProductDecision;
    getDecisions(): ProductDecision[];
    getExecutionHealth(): ExecutionHealthSummary;
}
//# sourceMappingURL=execution.service.d.ts.map