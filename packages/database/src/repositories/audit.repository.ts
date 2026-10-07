/**
 * AMAL OS — LAYER 19: AUDIT REPOSITORY (Sections 60-61, 113, 114)
 */

import { InMemoryAmalDatabase, db } from '../index.js';

export interface AuditEventRecord {
  id: string;
  actorId?: string;
  action: string;
  resourceType: string;
  resourceId?: string;
  purpose: string;
  outcome: 'SUCCESS' | 'FAILURE' | 'DENIED';
  metadata?: Record<string, any>;
  createdAt: string;
}

export interface AuditRepository {
  record(event: Omit<AuditEventRecord, 'id' | 'createdAt'>, tx?: InMemoryAmalDatabase): Promise<AuditEventRecord>;
  findByResource(resourceType: string, resourceId: string, tx?: InMemoryAmalDatabase): Promise<AuditEventRecord[]>;
}

export class InMemoryAuditRepository implements AuditRepository {
  private readonly events: AuditEventRecord[] = [];

  async record(event: Omit<AuditEventRecord, 'id' | 'createdAt'>, _tx?: InMemoryAmalDatabase): Promise<AuditEventRecord> {
    const id = `aud_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    const record: AuditEventRecord = {
      ...event,
      id,
      createdAt: new Date().toISOString(),
    };
    this.events.push(record);
    // Also mirror to global in-memory database audit log
    db.auditLogs.push({
      id,
      timestamp: record.createdAt,
      actorId: event.actorId || 'system',
      action: event.action,
      resource: `${event.resourceType}:${event.resourceId || 'global'}`,
      details: event.purpose,
      status: event.outcome === 'SUCCESS' ? 'SUCCESS' : 'FAILURE',
    });
    return record;
  }

  async findByResource(resourceType: string, resourceId: string, _tx?: InMemoryAmalDatabase): Promise<AuditEventRecord[]> {
    return this.events.filter((e) => e.resourceType === resourceType && e.resourceId === resourceId);
  }
}

export const auditRepository = new InMemoryAuditRepository();
