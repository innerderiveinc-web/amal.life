/**
 * AMAL OS — LAYER 20: JOURNEYS SERVICE (Section 20.20)
 * Orchestrates journey lifecycle with Journey State Machine, policy enforcement,
 * transactional outbox events, and audit logging.
 */
import { PostgresJourneyRepository, CreateJourneyInput } from './journey.repository.js';
import { Journey, JourneyState } from '@amal/types';
import { PolicyEngine } from '../../common/policy/policy.engine.js';
import { AuditService } from '../../common/audit/audit.service.js';
import { PgClient } from '../../infrastructure/database/pg.client.js';
import { AuthenticatedUser } from '../../common/auth/auth.types.js';
export declare class JourneysService {
    private readonly db;
    private readonly repo;
    private readonly policy;
    private readonly audit;
    constructor(db?: PgClient, repo?: PostgresJourneyRepository, policy?: PolicyEngine, audit?: AuditService);
    create(actor: AuthenticatedUser, input: Omit<CreateJourneyInput, 'userId'>): Promise<Journey>;
    findById(userId: string, journeyId: string): Promise<Journey | null>;
    findActive(userId: string): Promise<Journey[]>;
    transition(actor: AuthenticatedUser, journeyId: string, targetState: JourneyState): Promise<Journey>;
    start(actor: AuthenticatedUser, journeyId: string): Promise<Journey>;
}
//# sourceMappingURL=journeys.service.d.ts.map