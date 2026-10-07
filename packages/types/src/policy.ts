/**
 * AMAL OS — LAYER 19: POLICY PDP DOMAIN TYPES (Sections 27-28)
 */

export type PolicyEffect = 'ALLOW' | 'DENY';

export interface PolicyRequest {
  actorId: string;
  action: string;
  resourceType: string;
  resourceId?: string;
  purpose?: string;
  environment?: Record<string, any>;
}

export interface PolicyDecision {
  effect: PolicyEffect;
  reason?: string;
  evaluatedAt: string;
}
