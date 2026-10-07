/**
 * AMAL OS — LAYER 20: JOURNEYS SERVICE (Section 20.20)
 * Orchestrates journey lifecycle with Journey State Machine, policy enforcement,
 * transactional outbox events, and audit logging.
 */

import { Injectable } from '@nestjs/common';
import { PostgresJourneyRepository, CreateJourneyInput } from './journey.repository.js';
import { JourneyStateMachine } from '@amal/journey-engine';
import { Journey, JourneyState } from '@amal/types';
import { PolicyEngine } from '../../common/policy/policy.engine.js';
import { AuditService } from '../../common/audit/audit.service.js';
import { PgClient } from '../../infrastructure/database/pg.client.js';
import { withTransaction } from '../../infrastructure/database/transaction.js';
import { appendOutboxEvent } from '../../infrastructure/outbox/outbox.service.js';
import { AuthenticatedUser } from '../../common/auth/auth.types.js';
import { AmalError } from '../../common/errors/amal-error.js';
import { ErrorCode } from '../../common/errors/error-codes.js';

@Injectable()
export class JourneysService {
  constructor(
    private readonly db: PgClient = new PgClient(),
    private readonly repo: PostgresJourneyRepository = new PostgresJourneyRepository(),
    private readonly policy: PolicyEngine = new PolicyEngine(),
    private readonly audit: AuditService = new AuditService(new PgClient()),
  ) {}

  public async create(actor: AuthenticatedUser, input: Omit<CreateJourneyInput, 'userId'>): Promise<Journey> {
    this.policy.assertAllowed({
      actor: {
        userId: actor.userId,
        roles: actor.roles,
        accountMode: actor.accountMode,
      },
      action: 'JOURNEY_CREATE',
      purpose: 'PRODUCT',
    });

    const client = await this.db.connect();
    try {
      return await withTransaction(client, async (tx) => {
        const journey = await this.repo.create({ ...input, userId: actor.userId });

        await appendOutboxEvent(tx, {
          eventType: 'journey.created',
          aggregateType: 'journey',
          aggregateId: journey.id,
          payload: {
            userId: actor.userId,
            journeyId: journey.id,
          },
        });

        await this.audit.record({
          actorUserId: actor.userId,
          action: 'JOURNEY_CREATE',
          resourceType: 'journey',
          resourceId: journey.id,
          purpose: 'PRODUCT',
          outcome: 'SUCCESS',
        });

        return journey;
      });
    } finally {
      client.release();
    }
  }

  public async findById(userId: string, journeyId: string): Promise<Journey | null> {
    return this.repo.findById(userId, journeyId);
  }

  public async findActive(userId: string): Promise<Journey[]> {
    return this.repo.findActive(userId);
  }

  public async transition(actor: AuthenticatedUser, journeyId: string, targetState: JourneyState): Promise<Journey> {
    const journey = await this.repo.findById(actor.userId, journeyId);
    if (!journey) {
      throw new AmalError(ErrorCode.NOT_FOUND, `Journey ${journeyId} not found or access denied`);
    }

    this.policy.assertAllowed({
      actor: {
        userId: actor.userId,
        roles: actor.roles,
        accountMode: actor.accountMode,
      },
      action: `JOURNEY_${targetState}`,
      resource: {
        type: 'journey',
        id: journey.id,
        ownerUserId: journey.userId,
      },
      purpose: 'PRODUCT',
    });

    if (!JourneyStateMachine.canTransition(journey.state, targetState)) {
      throw new AmalError(
        ErrorCode.CONFLICT,
        `Cannot transition journey from ${journey.state} to ${targetState}`
      );
    }

    const nextState = JourneyStateMachine.transition(journey.state, targetState);

    const client = await this.db.connect();
    try {
      return await withTransaction(client, async (tx) => {
        const updated = await this.repo.updateState(actor.userId, journeyId, nextState);

        await appendOutboxEvent(tx, {
          eventType: `journey.${targetState.toLowerCase()}`,
          aggregateType: 'journey',
          aggregateId: journeyId,
          payload: {
            userId: actor.userId,
            journeyId,
            from: journey.state,
            to: nextState,
          },
        });

        await this.audit.record({
          actorUserId: actor.userId,
          action: `JOURNEY_${targetState}`,
          resourceType: 'journey',
          resourceId: journeyId,
          purpose: 'PRODUCT',
          outcome: 'SUCCESS',
          metadata: { from: journey.state, to: nextState },
        });

        return updated;
      });
    } finally {
      client.release();
    }
  }

  public async start(actor: AuthenticatedUser, journeyId: string): Promise<Journey> {
    // If discovered, advance through previewed to started or active
    const journey = await this.repo.findById(actor.userId, journeyId);
    if (!journey) {
      throw new AmalError(ErrorCode.NOT_FOUND, `Journey ${journeyId} not found`);
    }

    let targetState = JourneyState.STARTED;
    if (journey.state === JourneyState.STARTED) {
      targetState = JourneyState.ACTIVE;
    } else if (journey.state === JourneyState.DISCOVERED) {
      // previewed first
      await this.transition(actor, journeyId, JourneyState.PREVIEWED);
    }

    return this.transition(actor, journeyId, targetState);
  }
}
