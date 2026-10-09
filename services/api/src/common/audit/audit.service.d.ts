/**
 * AMAL OS — LAYER 20: AUDIT SERVICE (Section 20.13)
 * Records tamper-evident audit logs for sensitive mutations.
 */
import { PgClient } from '../../infrastructure/database/pg.client.js';
export interface AuditInput {
    actorUserId: string;
    action: string;
    resourceType: string;
    resourceId?: string;
    purpose: string;
    outcome: 'SUCCESS' | 'DENIED' | 'ERROR';
    metadata?: Record<string, unknown>;
}
export declare class AuditService {
    private readonly db;
    constructor(db: PgClient);
    record(input: AuditInput): Promise<void>;
}
//# sourceMappingURL=audit.service.d.ts.map