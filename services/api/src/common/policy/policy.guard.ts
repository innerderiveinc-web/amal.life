/**
 * AMAL OS — LAYER 20: POLICY GUARD (Section 20.12)
 * CanActivate guard enforcing PolicyEngine permissions.
 */

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { PolicyEngine } from './policy.engine.js';

@Injectable()
export class PolicyGuard implements CanActivate {
  constructor(private readonly policy: PolicyEngine) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user) return true; // Handled by AuthGuard

    this.policy.assertAllowed({
      actor: {
        userId: user.userId,
        roles: user.roles,
        accountMode: user.accountMode,
      },
      action: `${request.method}:${request.route?.path || request.url}`,
      purpose: 'PRODUCT',
    });

    return true;
  }
}
