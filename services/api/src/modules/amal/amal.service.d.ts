/**
 * AMAL OS — LAYER 20: AMAL SERVICE (Section 20.21 & 20.22)
 * Manages daily Amal tracking, completions with idempotency,
 * transactional outbox events, and audit logging.
 */
import { PostgresAmalRepository, CreateAmalInput, CompleteAmalInput, AmalCompletionRecord } from './amal.repository.js';
import { PolicyEngine } from '../../common/policy/policy.engine.js';
import { AuditService } from '../../common/audit/audit.service.js';
import { PgClient } from '../../infrastructure/database/pg.client.js';
import { IdempotencyService } from '../../common/idempotency/idempotency.service.js';
import { AuthenticatedUser } from '../../common/auth/auth.types.js';
import { Amal } from '@amal/types';
export declare class AmalService {
    private readonly db;
    private readonly repo;
    private readonly policy;
    private readonly audit;
    private readonly idempotency;
    constructor(db?: PgClient, repo?: PostgresAmalRepository, policy?: PolicyEngine, audit?: AuditService, idempotency?: IdempotencyService);
    create(actor: AuthenticatedUser, input: Omit<CreateAmalInput, 'userId'>): Promise<Amal>;
    findById(userId: string, amalId: string): Promise<Amal | null>;
    findToday(userId: string): Promise<Amal[]>;
    /**
     * Completes an Amal with idempotency, transactional outbox append, and audit logging.
     */
    complete(actor: AuthenticatedUser, amalId: string, input: Omit<CompleteAmalInput, 'userId' | 'amalId' | 'idempotencyKey'>, idempotencyKey?: string): Promise<AmalCompletionRecord>;
}
//# sourceMappingURL=amal.service.d.ts.map