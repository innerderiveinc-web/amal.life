/**
 * AMAL OS — LAYER 20: REFLECTIONS SERVICE (Section 20.23)
 * Manages strictly private user reflections with privacy guarantees,
 * policy assertion, transactional outbox append, and audit logging.
 */
import { PostgresReflectionsRepository, CreateReflectionInput } from './reflections.repository.js';
import { PolicyEngine } from '../../common/policy/policy.engine.js';
import { AuditService } from '../../common/audit/audit.service.js';
import { PgClient } from '../../infrastructure/database/pg.client.js';
import { AuthenticatedUser } from '../../common/auth/auth.types.js';
import { Reflection } from '@amal/types';
export declare class ReflectionsService {
    private readonly db;
    private readonly repo;
    private readonly policy;
    private readonly audit;
    constructor(db?: PgClient, repo?: PostgresReflectionsRepository, policy?: PolicyEngine, audit?: AuditService);
    create(actor: AuthenticatedUser, input: Omit<CreateReflectionInput, 'userId'>): Promise<Reflection>;
    findByUserId(actor: AuthenticatedUser): Promise<Reflection[]>;
    findById(actor: AuthenticatedUser, reflectionId: string): Promise<Reflection | null>;
}
//# sourceMappingURL=reflections.service.d.ts.map