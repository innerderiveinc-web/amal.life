/**
 * AMAL OS — LAYER 19: USER OWNERSHIP & PRIVATE RESOURCE GUARDS (Sections 184-185)
 * Strict boundary assertions preventing cross-tenant and inter-family privacy leaks.
 */

import { AppError } from '@amal/types';

export function assertOwner(actorId: string, resourceOwnerId: string): void {
  if (actorId !== resourceOwnerId) {
    throw new AppError('FORBIDDEN', 'Access denied: Actor is not the owner of this resource.');
  }
}

export interface PrivateResourceAccessParams {
  actorId: string;
  resourceOwnerId: string;
  permission?: string;
  isFamilyHead?: boolean;
}

export function assertPrivateResourceAccess(params: PrivateResourceAccessParams): void {
  // Family head relationship alone MUST NOT satisfy private adult reflection access (Section 185)
  if (params.actorId !== params.resourceOwnerId) {
    throw new AppError(
      'FORBIDDEN',
      'Access denied: Private spiritual reflections are strictly isolated and cannot be viewed by other users or family heads.'
    );
  }
}
