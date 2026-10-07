/**
 * AMAL OS — LAYER 20: INFRASTRUCTURE MODULE (Section 20.33)
 */

import { Module, Global } from '@nestjs/common';
import { PgClient } from './database/pg.client.js';
import { PolicyEngine } from '../common/policy/policy.engine.js';
import { AuditService } from '../common/audit/audit.service.js';
import { SessionService } from '../common/auth/session.service.js';
import { EventBusService } from './outbox/event-bus.js';
import { OutboxWorker } from './outbox/outbox.worker.js';
import { IdempotencyService } from '../common/idempotency/idempotency.service.js';
import { ConfigService } from './config/config.service.js';

@Global()
@Module({
  providers: [
    PgClient,
    PolicyEngine,
    AuditService,
    SessionService,
    EventBusService,
    OutboxWorker,
    IdempotencyService,
    ConfigService,
  ],
  exports: [
    PgClient,
    PolicyEngine,
    AuditService,
    SessionService,
    EventBusService,
    IdempotencyService,
    ConfigService,
  ],
})
export class InfrastructureModule {}
