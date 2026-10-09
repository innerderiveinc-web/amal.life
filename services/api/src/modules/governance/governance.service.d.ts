import { PolicyRequest, PolicyDecision, PrivacyRequest, PrivacyRequestType, AIIncident, IncidentCategory, IncidentSeverity, CircuitBreakerState } from '@amal/types';
export declare class GovernanceService {
    getTrustDashboard(): Record<string, unknown>;
    getUserTrustCenter(userId: string): Record<string, unknown>;
    evaluatePolicy(req: PolicyRequest): PolicyDecision;
    createPrivacyRequest(userId: string, type: PrivacyRequestType): PrivacyRequest;
    reportIncident(category: IncidentCategory, severity: IncidentSeverity, summary: string, affectedRoutes?: string[]): AIIncident;
    getCircuitBreakers(): Record<string, CircuitBreakerState>;
    setCircuitBreaker(id: string, state: CircuitBreakerState, reason: string): void;
    proposeConfigChange(category: any, operatorId: string, beforeConfig: Record<string, unknown>, afterConfig: Record<string, unknown>): import("@amal/policy").ProposedChange;
    approveConfigChange(changeId: string, secondOperatorId: string): import("@amal/policy").ProposedChange;
    grantBreakGlass(adminId: string, approverId: string, justification: string, scope: string[]): import("@amal/policy").BreakGlassSession;
}
//# sourceMappingURL=governance.service.d.ts.map