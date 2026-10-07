/**
 * AMAL OS — LAYER 19: AUDIT SERVICE (Sections 60-61, 149)
 * Unified tamper-evident audit logger with automated PII redaction.
 */

import { auditRepository, AuditEventRecord } from '@amal/database';
import { redactSensitiveData } from './redaction.js';

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

export class AuditService {
  async record(input: AuditRecordInput): Promise<AuditEventRecord> {
    const cleanMetadata = input.metadata ? redactSensitiveData(input.metadata) : {};
    return auditRepository.record({
      ...input,
      metadata: cleanMetadata,
    });
  }

  async findByResource(resourceType: string, resourceId: string): Promise<AuditEventRecord[]> {
    return auditRepository.findByResource(resourceType, resourceId);
  }
}

export const audit = new AuditService();
