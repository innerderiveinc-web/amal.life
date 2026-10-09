/**
 * AMAL OS — LAYER 20: PRIVACY SERVICE (Section 20.27 & 20.28)
 * Manages GDPR/Islamic privacy requests: full data export, account deletion,
 * and immutable privacy request auditing.
 */
import { PgClient } from '../../infrastructure/database/pg.client.js';
import { PolicyEngine } from '../../common/policy/policy.engine.js';
import { AuditService } from '../../common/audit/audit.service.js';
import { AuthenticatedUser } from '../../common/auth/auth.types.js';
export interface PrivacyRequestRecord {
    id: string;
    userId: string;
    requestType: 'DATA_EXPORT' | 'ACCOUNT_DELETION';
    status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
    payload?: any;
    resultUrl?: string;
    createdAt: string;
    completedAt?: string;
}
export declare class PrivacyService {
    private readonly db;
    private readonly policy;
    private readonly audit;
    private static mockRequests;
    constructor(db?: PgClient, policy?: PolicyEngine, audit?: AuditService);
    requestExport(actor: AuthenticatedUser): Promise<PrivacyRequestRecord>;
    requestDeletion(actor: AuthenticatedUser, reason?: string): Promise<PrivacyRequestRecord>;
    getStatus(actor: AuthenticatedUser, requestId: string): Promise<PrivacyRequestRecord>;
}
//# sourceMappingURL=privacy.service.d.ts.map