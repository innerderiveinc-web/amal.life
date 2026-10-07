/**
 * AMAL OS — LAYER 20: PRIVACY SERVICE (Section 20.27 & 20.28)
 * Manages GDPR/Islamic privacy requests: full data export, account deletion,
 * and immutable privacy request auditing.
 */

import { Injectable } from '@nestjs/common';
import { PgClient } from '../../infrastructure/database/pg.client.js';
import { PolicyEngine } from '../../common/policy/policy.engine.js';
import { AuditService } from '../../common/audit/audit.service.js';
import { AuthenticatedUser } from '../../common/auth/auth.types.js';
import { AmalError } from '../../common/errors/amal-error.js';
import { ErrorCode } from '../../common/errors/error-codes.js';

export interface PrivacyRequestRecord {
  id: string;
  userId: string;
  requestType: 'DATA_EXPORT' | 'ACCOUNT_DELETION';
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  payload?: any;
  resultUrl?: string;
  createdAt: string;
  completedAt?: string;
}

@Injectable()
export class PrivacyService {
  private static mockRequests = new Map<string, PrivacyRequestRecord>();

  constructor(
    private readonly db: PgClient = new PgClient(),
    private readonly policy: PolicyEngine = new PolicyEngine(),
    private readonly audit: AuditService = new AuditService(new PgClient()),
  ) {}

  public async requestExport(actor: AuthenticatedUser): Promise<PrivacyRequestRecord> {
    this.policy.assertAllowed({
      actor: {
        userId: actor.userId,
        roles: actor.roles,
        accountMode: actor.accountMode,
      },
      action: 'PRIVACY_EXPORT',
      purpose: 'COMPLIANCE',
    });

    const id = `prv_exp_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const record: PrivacyRequestRecord = {
      id,
      userId: actor.userId,
      requestType: 'DATA_EXPORT',
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    };

    PrivacyService.mockRequests.set(id, record);

    await this.audit.record({
      actorUserId: actor.userId,
      action: 'PRIVACY_EXPORT_REQUEST',
      resourceType: 'privacy_request',
      resourceId: id,
      purpose: 'COMPLIANCE',
      outcome: 'SUCCESS',
    });

    return record;
  }

  public async requestDeletion(actor: AuthenticatedUser, reason?: string): Promise<PrivacyRequestRecord> {
    this.policy.assertAllowed({
      actor: {
        userId: actor.userId,
        roles: actor.roles,
        accountMode: actor.accountMode,
      },
      action: 'PRIVACY_DELETION',
      purpose: 'COMPLIANCE',
    });

    const id = `prv_del_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const record: PrivacyRequestRecord = {
      id,
      userId: actor.userId,
      requestType: 'ACCOUNT_DELETION',
      status: 'PENDING',
      payload: { reason },
      createdAt: new Date().toISOString(),
    };

    PrivacyService.mockRequests.set(id, record);

    await this.audit.record({
      actorUserId: actor.userId,
      action: 'PRIVACY_DELETION_REQUEST',
      resourceType: 'privacy_request',
      resourceId: id,
      purpose: 'COMPLIANCE',
      outcome: 'SUCCESS',
    });

    return record;
  }

  public async getStatus(actor: AuthenticatedUser, requestId: string): Promise<PrivacyRequestRecord> {
    const record = PrivacyService.mockRequests.get(requestId);
    if (!record || record.userId !== actor.userId) {
      throw new AmalError(ErrorCode.NOT_FOUND, `Privacy request ${requestId} not found`);
    }

    return record;
  }
}
