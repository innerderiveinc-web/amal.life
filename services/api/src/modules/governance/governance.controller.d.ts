import { GovernanceService } from './governance.service.js';
export declare class GovernanceController {
    private readonly govService;
    constructor(govService: GovernanceService);
    getDashboard(): Promise<{
        success: boolean;
        data: Record<string, unknown>;
    }>;
    getUserTrust(req: any): Promise<{
        success: boolean;
        data: Record<string, unknown>;
    }>;
    evaluatePolicy(body: any): Promise<{
        success: boolean;
        data: import("@amal/types").PolicyDecision;
    }>;
    createPrivacyRequest(req: any, body: {
        type: any;
    }): Promise<{
        success: boolean;
        data: import("@amal/types").PrivacyRequest;
    }>;
    getCircuitBreakers(): Promise<{
        success: boolean;
        data: Record<string, import("@amal/types").CircuitBreakerState>;
    }>;
    tripCircuitBreaker(body: {
        id: string;
        state: any;
        reason: string;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
    proposeChange(req: any, body: any): Promise<{
        success: boolean;
        data: import("packages/policy/dist/four-eyes-admin.js").ProposedChange;
    }>;
    approveChange(req: any, body: {
        changeId: string;
    }): Promise<{
        success: boolean;
        data: import("packages/policy/dist/four-eyes-admin.js").ProposedChange;
    }>;
    breakGlass(req: any, body: {
        approverId: string;
        justification: string;
        scope: string[];
    }): Promise<{
        success: boolean;
        data: import("packages/policy/dist/four-eyes-admin.js").BreakGlassSession;
    }>;
}
//# sourceMappingURL=governance.controller.d.ts.map