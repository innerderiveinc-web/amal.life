export interface ProposedChange {
    id: string;
    category: 'AI_SAFETY_THRESHOLD' | 'DATA_RETENTION_RULE' | 'CONTENT_PUBLICATION' | 'MODEL_ACTIVATION';
    proposedBy: string;
    approvedBy?: string;
    status: 'PENDING_SECOND_APPROVAL' | 'APPROVED' | 'REJECTED';
    beforeConfig: Record<string, unknown>;
    afterConfig: Record<string, unknown>;
    createdAt: string;
}
export interface BreakGlassSession {
    sessionId: string;
    adminId: string;
    approverId: string;
    justification: string;
    scope: string[];
    expiresAt: string;
    active: boolean;
}
export declare class FourEyesAdminService {
    private static proposals;
    private static breakGlassSessions;
    static proposeConfigChange(category: ProposedChange['category'], operatorId: string, beforeConfig: Record<string, unknown>, afterConfig: Record<string, unknown>): ProposedChange;
    static approveConfigChange(changeId: string, secondOperatorId: string): ProposedChange;
    static grantBreakGlassAccess(adminId: string, approverId: string, justification: string, scope: string[], durationMinutes?: number): BreakGlassSession;
    static isBreakGlassActive(sessionId: string): boolean;
}
//# sourceMappingURL=four-eyes-admin.d.ts.map