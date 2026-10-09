/**
 * AMAL OS — LAYER 20: POLICY GUARD (Section 20.12)
 * CanActivate guard enforcing PolicyEngine permissions.
 */
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { PolicyEngine } from './policy.engine.js';
export declare class PolicyGuard implements CanActivate {
    private readonly policy;
    constructor(policy: PolicyEngine);
    canActivate(context: ExecutionContext): boolean;
}
//# sourceMappingURL=policy.guard.d.ts.map