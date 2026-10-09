/**
 * AMAL OS — LAYER 20: GOALS SERVICE (Section 20.16)
 * Orchestrates goal lifecycle, policy enforcement, transactional outbox append, and audit recording.
 */

import { Injectable } from '@nestjs/common';
import { PostgresGoalRepository } from './goal.repository.js';
import { PolicyEngine } from '../../common/policy/policy.engine.js';
import { AuditService } from '../../common/audit/audit.service.js';
import { PgClient } from '../../infrastructure/database/pg.client.js';
import { withTransaction } from '../../infrastructure/database/transaction.js';
import { appendOutboxEvent } from '../../infrastructure/outbox/outbox.service.js';
import { AuthenticatedUser } from '../../common/auth/auth.types.js';
import { CreateGoalDto, UpdateGoalDto } from './dto/create-goal.dto.js';
import { AmalError } from '../../common/errors/amal-error.js';
import { ErrorCode } from '../../common/errors/error-codes.js';

@Injectable()
export class GoalsService {
  constructor(
    private readonly db: PgClient = new PgClient(),
    private readonly repo: PostgresGoalRepository = new PostgresGoalRepository(),
    private readonly policy: PolicyEngine = new PolicyEngine(),
    private readonly audit: AuditService = new AuditService(new PgClient()),
  ) {}

  async create(actor: AuthenticatedUser, input: CreateGoalDto) {
    this.policy.assertAllowed({
      actor: {
        userId: actor.userId,
        roles: actor.roles,
        accountMode: actor.accountMode,
      },
      action: 'GOAL_CREATE',
      purpose: 'PRODUCT',
    });

    const client = await this.db.connect();

    try {
      return await withTransaction(client, async (tx) => {
        const goal = await this.repo.create(
          {
            userId: actor.userId,
            title: input.title.trim(),
            category: input.category,
            intent: input.intent,
            desiredOutcome: input.desiredOutcome,
          },
        );

        await appendOutboxEvent(tx, {
          eventType: 'goal.created',
          aggregateType: 'goal',
          aggregateId: goal.id,
          payload: {
            userId: actor.userId,
            goalId: goal.id,
          },
        });

        await this.audit.record({
          actorUserId: actor.userId,
          action: 'GOAL_CREATE',
          resourceType: 'goal',
          resourceId: goal.id,
          purpose: 'PRODUCT',
          outcome: 'SUCCESS',
        });

        return goal;
      });
    } finally {
      client.release();
    }
  }

  async list(userId: string) {
    return this.repo.findActive(userId);
  }

  async get(actor: AuthenticatedUser, goalId: string) {
    const goal = await this.repo.findById(actor.userId, goalId);
    if (!goal) {
      throw new AmalError(ErrorCode.NOT_FOUND, 'Goal not found.');
    }
    this.policy.assertAllowed({
      actor: {
        userId: actor.userId,
        roles: actor.roles,
        accountMode: actor.accountMode,
      },
      action: 'GOAL_READ',
      resource: {
        type: 'goal',
        id: goal.id,
        ownerUserId: goal.userId,
      },
      purpose: 'PRODUCT',
    });
    return goal;
  }

  async update(actor: AuthenticatedUser, goalId: string, input: UpdateGoalDto) {
    const goal = await this.get(actor, goalId);
    const updated = await this.repo.update(actor.userId, goal.id, input);

    await this.audit.record({
      actorUserId: actor.userId,
      action: 'GOAL_UPDATE',
      resourceType: 'goal',
      resourceId: goalId,
      purpose: 'PRODUCT',
      outcome: 'SUCCESS',
    });

    return updated;
  }

  async delete(actor: AuthenticatedUser, goalId: string) {
    const goal = await this.get(actor, goalId);
    await this.repo.archive(actor.userId, goal.id);

    await this.audit.record({
      actorUserId: actor.userId,
      action: 'GOAL_DELETE',
      resourceType: 'goal',
      resourceId: goalId,
      purpose: 'PRODUCT',
      outcome: 'SUCCESS',
    });

    return { archived: true };
  }

  private static readonly baselines = new Map<string, any>();

  async setBaseline(actor: AuthenticatedUser, goalId: string, baselineDto: any) {
    const goal = await this.get(actor, goalId);
    const record = {
      goalId: goal.id,
      userId: actor.userId,
      currentFrequency: baselineDto.currentFrequency ?? 1,
      currentDurationMinutes: baselineDto.currentDurationMinutes ?? 15,
      availableTimeMinutes: baselineDto.availableTimeMinutes ?? 20,
      preferredTime: baselineDto.preferredTime ?? 'MORNING',
      previousAttempts: baselineDto.previousAttempts ?? 0,
      knownBarriers: baselineDto.knownBarriers ?? [],
      confidence: baselineDto.confidence ?? 0.8,
      preferredFormat: baselineDto.preferredFormat ?? 'PRACTICAL_ACTION',
      capturedAt: new Date().toISOString(),
    };
    GoalsService.baselines.set(goalId, record);

    await this.audit.record({
      actorUserId: actor.userId,
      action: 'GOAL_BASELINE_SET',
      resourceType: 'goal_baseline',
      resourceId: goalId,
      purpose: 'PRODUCT',
      outcome: 'SUCCESS',
    });

    return record;
  }

  async getBaseline(actor: AuthenticatedUser, goalId: string) {
    await this.get(actor, goalId);
    return (
      GoalsService.baselines.get(goalId) || {
        goalId,
        userId: actor.userId,
        currentFrequency: 1,
        currentDurationMinutes: 15,
        availableTimeMinutes: 20,
        preferredTime: 'MORNING',
        previousAttempts: 0,
        knownBarriers: [],
        confidence: 0.8,
        preferredFormat: 'PRACTICAL_ACTION',
        capturedAt: new Date().toISOString(),
      }
    );
  }
}
