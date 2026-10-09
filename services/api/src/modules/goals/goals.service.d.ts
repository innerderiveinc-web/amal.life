/**
 * AMAL OS — LAYER 20: GOALS SERVICE (Section 20.16)
 * Orchestrates goal lifecycle, policy enforcement, transactional outbox append, and audit recording.
 */
import { PostgresGoalRepository } from './goal.repository.js';
import { PolicyEngine } from '../../common/policy/policy.engine.js';
import { AuditService } from '../../common/audit/audit.service.js';
import { PgClient } from '../../infrastructure/database/pg.client.js';
import { AuthenticatedUser } from '../../common/auth/auth.types.js';
import { CreateGoalDto, UpdateGoalDto } from './dto/create-goal.dto.js';
export declare class GoalsService {
    private readonly db;
    private readonly repo;
    private readonly policy;
    private readonly audit;
    constructor(db?: PgClient, repo?: PostgresGoalRepository, policy?: PolicyEngine, audit?: AuditService);
    create(actor: AuthenticatedUser, input: CreateGoalDto): Promise<Goal>;
    list(userId: string): Promise<Goal[]>;
    get(actor: AuthenticatedUser, goalId: string): Promise<any>;
    update(actor: AuthenticatedUser, goalId: string, input: UpdateGoalDto): Promise<Goal>;
    delete(actor: AuthenticatedUser, goalId: string): Promise<{
        archived: boolean;
    }>;
}
//# sourceMappingURL=goals.service.d.ts.map