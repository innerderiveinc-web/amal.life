/**
 * AMAL OS — LAYER 20: AMAL SERVICE (Section 20.21 & 20.22)
 * Manages daily Amal tracking, completions with idempotency,
 * transactional outbox events, and audit logging.
 */

import { Injectable } from '@nestjs/common';
import { PostgresAmalRepository, CreateAmalInput, CompleteAmalInput, AmalCompletionRecord } from './amal.repository.js';
import { PolicyEngine } from '../../common/policy/policy.engine.js';
import { AuditService } from '../../common/audit/audit.service.js';
import { PgClient } from '../../infrastructure/database/pg.client.js';
import { withTransaction } from '../../infrastructure/database/transaction.js';
import { appendOutboxEvent } from '../../infrastructure/outbox/outbox.service.js';
import { IdempotencyService } from '../../common/idempotency/idempotency.service.js';
import { AuthenticatedUser } from '../../common/auth/auth.types.js';
import { Amal } from '@amal/types';
import { AmalError } from '../../common/errors/amal-error.js';
import { ErrorCode } from '../../common/errors/error-codes.js';

@Injectable()
export class AmalService {
  constructor(
    private readonly db: PgClient = new PgClient(),
    private readonly repo: PostgresAmalRepository = new PostgresAmalRepository(),
    private readonly policy: PolicyEngine = new PolicyEngine(),
    private readonly audit: AuditService = new AuditService(new PgClient()),
    private readonly idempotency: IdempotencyService = new IdempotencyService(new PgClient()),
  ) {}

  public async create(actor: AuthenticatedUser, input: Omit<CreateAmalInput, 'userId'>): Promise<Amal> {
    this.policy.assertAllowed({
      actor: {
        userId: actor.userId,
        roles: actor.roles,
        accountMode: actor.accountMode,
      },
      action: 'AMAL_CREATE',
      purpose: 'PRODUCT',
    });

    const client = await this.db.connect();
    try {
      return await withTransaction(client, async (tx) => {
        const amal = await this.repo.create({ ...input, userId: actor.userId });

        await appendOutboxEvent(tx, {
          eventType: 'amal.created',
          aggregateType: 'amal',
          aggregateId: amal.id,
          payload: {
            userId: actor.userId,
            amalId: amal.id,
            title: amal.title,
          },
        });

        await this.audit.record({
          actorUserId: actor.userId,
          action: 'AMAL_CREATE',
          resourceType: 'amal',
          resourceId: amal.id,
          purpose: 'PRODUCT',
          outcome: 'SUCCESS',
        });

        return amal;
      });
    } finally {
      client.release();
    }
  }

  public async findById(userId: string, amalId: string): Promise<Amal | null> {
    return this.repo.findById(userId, amalId);
  }

  public async findToday(userId: string): Promise<Amal[]> {
    return this.repo.findToday(userId);
  }

  /**
   * Completes an Amal with idempotency, transactional outbox append, and audit logging.
   */
  public async complete(
    actor: AuthenticatedUser,
    amalId: string,
    input: Omit<CompleteAmalInput, 'userId' | 'amalId' | 'idempotencyKey'>,
    idempotencyKey?: string,
  ): Promise<AmalCompletionRecord> {
    const key = idempotencyKey || `idem_amal_${amalId}_${Date.now()}`;

    // 1. Check idempotency
    const existing = await this.idempotency.get(actor.userId, key);
    if (existing && existing.status === 'COMPLETED' && existing.responseBody) {
      return existing.responseBody as AmalCompletionRecord;
    }

    const amal = await this.repo.findById(actor.userId, amalId);
    if (!amal) {
      throw new AmalError(ErrorCode.NOT_FOUND, `Amal ${amalId} not found`);
    }

    // 2. Enforce Policy
    this.policy.assertAllowed({
      actor: {
        userId: actor.userId,
        roles: actor.roles,
        accountMode: actor.accountMode,
      },
      action: 'AMAL_COMPLETE',
      resource: {
        type: 'amal',
        id: amal.id,
        ownerUserId: amal.userId,
      },
      purpose: 'PRODUCT',
    });

    const completionType = input.completionType || 'FULL';
    const eventType = completionType === 'PARTIAL' ? 'amal.partial' : 'amal.completed';

    const client = await this.db.connect();
    try {
      const result = await withTransaction(client, async (tx) => {
        const completion = await this.repo.complete({
          amalId,
          userId: actor.userId,
          completionType,
          durationMinutes: input.durationMinutes,
          notes: input.notes,
          idempotencyKey: key,
        });

        await appendOutboxEvent(tx, {
          eventType,
          aggregateType: 'amal',
          aggregateId: amalId,
          payload: {
            amalId,
            userId: actor.userId,
            completionType,
            durationMinutes: completion.durationMinutes,
          },
        });

        await this.audit.record({
          actorUserId: actor.userId,
          action: 'AMAL_COMPLETE',
          resourceType: 'amal',
          resourceId: amalId,
          purpose: 'PRODUCT',
          outcome: 'SUCCESS',
          metadata: { completionType, durationMinutes: completion.durationMinutes },
        });

        return completion;
      });

      // Save idempotency record
      await this.idempotency.save(actor.userId, key, 200, result);
      return result;
    } finally {
      client.release();
    }
  }
}
