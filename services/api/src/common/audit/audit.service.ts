/**
 * AMAL OS — LAYER 20: AUDIT SERVICE (Section 20.13)
 * Records tamper-evident audit logs for sensitive mutations.
 */

import { Injectable } from '@nestjs/common';
import { PgClient } from '../../infrastructure/database/pg.client.js';
import { audit } from '@amal/audit';

export interface AuditInput {
  actorUserId: string;
  action: string;
  resourceType: string;
  resourceId?: string;
  purpose: string;
  outcome: 'SUCCESS' | 'DENIED' | 'ERROR';
  metadata?: Record<string, unknown>;
}

@Injectable()
export class AuditService {
  constructor(private readonly db: PgClient) {}

  async record(input: AuditInput) {
    // Write via package audit system
    await audit.record({
      actorId: input.actorUserId,
      action: input.action,
      resourceType: input.resourceType,
      resourceId: input.resourceId,
      purpose: input.purpose,
      outcome: input.outcome === 'SUCCESS' ? 'SUCCESS' : 'FAILURE',
      metadata: input.metadata,
    });

    // Mirror to PgClient
    await this.db.query(
      `
      INSERT INTO audit_events (
        id,
        actor_id,
        action,
        resource_type,
        resource_id,
        purpose,
        outcome,
        metadata,
        created_at
      )
      VALUES (
        gen_random_uuid(),
        $1,$2,$3,$4,$5,$6,$7,now()
      )
      `,
      [
        input.actorUserId,
        input.action,
        input.resourceType,
        input.resourceId ?? null,
        input.purpose,
        input.outcome,
        JSON.stringify(input.metadata ?? {}),
      ],
    );
  }
}
