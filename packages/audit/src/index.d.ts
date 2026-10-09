/**
 * AMAL OS — LAYER 19: AUDIT SERVICE (Sections 60-61, 149)
 * Unified tamper-evident audit logger with automated PII redaction.
 */
import { AuditEventRecord } from '@amal/database';
export * from './redaction.js';
export interface AuditRecordInput {
    actorId?: string;
    action: string;
    resourceType: string;
    resourceId?: string;
    purpose: string;
    outcome: 'SUCCESS' | 'FAILURE' | 'DENIED';
    metadata?: Record<string, any>;
}
export declare class AuditService {
    record(input: AuditRecordInput): Promise<AuditEventRecord>;
    findByResource(resourceType: string, resourceId: string): Promise<AuditEventRecord[]>;
}
export declare const audit: AuditService;
//# sourceMappingURL=index.d.ts.map