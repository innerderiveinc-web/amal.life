import { PolicyRequest, PolicyDecision } from '@amal/types';
export declare class PolicyEngine {
    /**
     * Central Policy Decision Point (PDP) evaluating ABAC, RBAC,
     * Resource Ownership, Purpose Limitation, Family Isolation, and Child Privacy.
     */
    static evaluate(req: PolicyRequest): PolicyDecision;
    static decide(req: any): any;
    decide(req: any): any;
}
export declare const policy: PolicyEngine;
//# sourceMappingURL=policy-engine.d.ts.map