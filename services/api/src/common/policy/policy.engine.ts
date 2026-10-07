/**
 * AMAL OS — LAYER 20: POLICY ENGINE (Section 20.12)
 * Central authorization decision point for application services.
 */

import { Injectable } from '@nestjs/common';
import { AmalError } from '../errors/amal-error.js';
import { ErrorCode } from '../errors/error-codes.js';
import { PolicyRequest } from './policy.types.js';

@Injectable()
export class PolicyEngine {
  assertAllowed(input: PolicyRequest): void {
    const { actor, action, resource, purpose } = input;

    if (!actor?.userId) {
      throw new AmalError(
        ErrorCode.UNAUTHORIZED,
        'Authentication required.',
      );
    }

    if (
      resource?.ownerUserId &&
      resource.ownerUserId !== actor.userId &&
      !actor.roles.includes('ADMIN')
    ) {
      throw new AmalError(
        ErrorCode.FORBIDDEN,
        'You are not allowed to access this resource.',
      );
    }

    if (
      purpose === 'ADMIN' &&
      !actor.roles.includes('ADMIN')
    ) {
      throw new AmalError(
        ErrorCode.FORBIDDEN,
        'Administrative access required.',
      );
    }

    if (
      actor.accountMode === 'CHILD' &&
      action.startsWith('FAMILY_ADMIN:')
    ) {
      throw new AmalError(
        ErrorCode.POLICY_DENIED,
        'This action is not available in child mode.',
      );
    }
  }
}
