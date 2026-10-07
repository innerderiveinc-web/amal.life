/**
 * AMAL OS — LAYER 20: REFLECTIONS SERVICE (Section 20.23)
 * Manages strictly private user reflections with privacy guarantees,
 * policy assertion, transactional outbox append, and audit logging.
 */

import { Injectable } from '@nestjs/common';
import { PostgresReflectionsRepository, CreateReflectionInput } from './reflections.repository.js';
import { PolicyEngine } from '../../common/policy/policy.engine.js';
import { AuditService } from '../../common/audit/audit.service.js';
import { PgClient } from '../../infrastructure/database/pg.client.js';
import { withTransaction } from '../../infrastructure/database/transaction.js';
import { appendOutboxEvent } from '../../infrastructure/outbox/outbox.service.js';
import { AuthenticatedUser } from '../../common/auth/auth.types.js';
import { Reflection } from '@amal/types';
import { AmalError } from '../../common/errors/amal-error.js';
import { ErrorCode } from '../../common/errors/error-codes.js';

@Injectable()
export class ReflectionsService {
  constructor(
    private readonly db: PgClient = new PgClient(),
    private readonly repo: PostgresReflectionsRepository = new PostgresReflectionsRepository(),
    private readonly policy: PolicyEngine = new PolicyEngine(),
    private readonly audit: AuditService = new AuditService(new PgClient()),
  ) {}

  public async create(actor: AuthenticatedUser, input: Omit<CreateReflectionInput, 'userId'>): Promise<Reflection> {
    // 1. Enforce Policy (Adult reflection is strictly private to owner)
    this.policy.assertAllowed({
      actor: {
        userId: actor.userId,
        roles: actor.roles,
        accountMode: actor.accountMode,
      },
      action: 'REFLECTION_CREATE',
      purpose: 'REFLECTION',
    });

    const client = await this.db.connect();
    try {
      return await withTransaction(client, async (tx) => {
        const reflection = await this.repo.create({ ...input, userId: actor.userId });

        await appendOutboxEvent(tx, {
          eventType: 'reflection.created',
          aggregateType: 'reflection',
          aggregateId: reflection.id,
          payload: {
            userId: actor.userId,
            reflectionId: reflection.id,
            hasFriction: !!reflection.frictionDetected,
          },
        });

        await this.audit.record({
          actorUserId: actor.userId,
          action: 'REFLECTION_CREATE',
          resourceType: 'reflection',
          resourceId: reflection.id,
          purpose: 'REFLECTION',
          outcome: 'SUCCESS',
        });

        return reflection;
      });
    } finally {
      client.release();
    }
  }

  public async findByUserId(actor: AuthenticatedUser): Promise<Reflection[]> {
    this.policy.assertAllowed({
      actor: {
        userId: actor.userId,
        roles: actor.roles,
        accountMode: actor.accountMode,
      },
      action: 'REFLECTION_READ',
      purpose: 'REFLECTION',
    });

    return this.repo.findByUserId(actor.userId);
  }

  public async findById(actor: AuthenticatedUser, reflectionId: string): Promise<Reflection | null> {
    const ref = await this.repo.findById(actor.userId, reflectionId);
    if (!ref) {
      throw new AmalError(ErrorCode.NOT_FOUND, `Reflection ${reflectionId} not found`);
    }

    this.policy.assertAllowed({
      actor: {
        userId: actor.userId,
        roles: actor.roles,
        accountMode: actor.accountMode,
      },
      action: 'REFLECTION_READ',
      resource: {
        type: 'reflection',
        id: ref.id,
        ownerUserId: ref.userId,
      },
      purpose: 'REFLECTION',
    });

    return ref;
  }
}
