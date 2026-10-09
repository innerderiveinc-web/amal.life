export type ExecutionPhaseStatus = 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED' | 'BLOCKED';
export interface ExecutionMilestone {
    id: string;
    phaseNumber: number;
    phaseCode: string;
    name: string;
    targetDurationWeeks: number;
    status: ExecutionPhaseStatus;
    exitCriteria: string[];
    deliverables: string[];
    completedAt?: string | null;
}
export type SquadName = 'SQUAD_A_CORE_PRODUCT' | 'SQUAD_B_AI_KNOWLEDGE' | 'SQUAD_C_PLATFORM' | 'SQUAD_D_EXPERIENCE';
export interface ExecutionSprint {
    id: string;
    sprintNumber: number;
    sprintName: string;
    squadName: SquadName;
    startDate: string;
    endDate: string;
    qualityBudgetPercent: number;
    committedStories: string[];
    status: 'PLANNED' | 'ACTIVE' | 'COMPLETED' | 'RETROSPECTIVE';
}
export type LaunchGateLevel = 'GATE_1_INTERNAL' | 'GATE_2_ALPHA' | 'GATE_3_BETA' | 'GATE_4_PUBLIC';
export interface LaunchGate {
    id: string;
    gateLevel: LaunchGateLevel;
    gateName: string;
    status: 'PENDING' | 'IN_REVIEW' | 'PASSED' | 'FAILED';
    evaluatedAt?: string | null;
    requiredChecks: string[];
    signoffBy: string[];
}
export interface LaunchKillSwitch {
    id: string;
    switchKey: string;
    switchName: string;
    isActive: boolean;
    activatedBy?: string | null;
    reason?: string | null;
    updatedAt: string;
}
export type BetaStage = 'ALPHA_50' | 'BETA_100' | 'BETA_300' | 'BETA_1000' | 'PUBLIC_SCALE';
export interface BetaCohort {
    id: string;
    cohortName: string;
    targetUsersCount: number;
    currentUsersCount: number;
    stage: BetaStage;
    activationRate: number;
    d30RetentionRate: number;
    status: 'INVITING' | 'ACTIVE' | 'CONCLUDED' | 'PAUSED';
}
export type BetaFeedbackCategory = 'TODAY_FLOW' | 'AMAL_FEASIBILITY' | 'EVIDENCE_TRUST' | 'ADAPTATION_HELPFULNESS' | 'FEELING_JUDGED_OR_SHAMED' | 'AI_CITATION' | 'APP_STABILITY';
export interface BetaFeedbackRecord {
    id: string;
    userId: string;
    cohortId?: string | null;
    feedbackCategory: BetaFeedbackCategory;
    severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    summary: string;
    didHelpIntentionalAction: boolean;
    triageStatus: 'TRIAGED' | 'IN_PROGRESS' | 'RESOLVED' | 'WONT_FIX';
    createdAt: string;
}
export interface ProductDecision {
    id: string;
    decisionCode: string;
    title: string;
    contextReason: string;
    alternativesConsidered: string[];
    evidenceUsed: string;
    decisionOwner: string;
    recordedAt: string;
}
export interface ExecutionHealthSummary {
    currentPhase: string;
    activeSprint: number;
    qualityBudgetAllocated: number;
    passedGatesCount: number;
    totalGatesCount: number;
    killSwitchesArmed: number;
    activeBetaCohort: string;
    totalBetaUsers: number;
    intentionalActionHelpfulRate: number;
}
//# sourceMappingURL=execution.d.ts.map