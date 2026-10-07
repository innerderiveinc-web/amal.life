import { TamperEvidentAuditEvent } from '@amal/types';
import { createHash } from 'crypto';

export class TamperEvidentAuditService {
  private static events: TamperEvidentAuditEvent[] = [];
  private static latestHash: string = 'GENESIS_HASH_AMAL_OS_V1_INIT';

  public static recordEvent(payload: {
    actorId?: string;
    actorType: string;
    action: string;
    resourceType: string;
    resourceId?: string;
    purpose: string;
    outcome: 'SUCCESS' | 'DENIED' | 'ERROR';
    metadata?: Record<string, unknown>;
  }): TamperEvidentAuditEvent {
    const seq = this.events.length + 1;
    const prevHash = this.latestHash;
    const createdAt = new Date().toISOString();

    const dataToHash = `${seq}:${prevHash}:${payload.actorId || 'anon'}:${payload.action}:${payload.resourceType}:${payload.outcome}:${createdAt}`;
    const eventHash = createHash('sha256').update(dataToHash).digest('hex');

    const event: TamperEvidentAuditEvent = {
      sequenceNumber: seq,
      previousEventHash: prevHash,
      eventHash,
      actorId: payload.actorId,
      actorType: payload.actorType,
      action: payload.action,
      resourceType: payload.resourceType,
      resourceId: payload.resourceId,
      purpose: payload.purpose,
      outcome: payload.outcome,
      metadata: payload.metadata || {},
      createdAt,
    };

    this.events.push(event);
    this.latestHash = eventHash;

    return event;
  }

  /**
   * Validates the cryptographic integrity of the audit hash chain.
   */
  public static verifyChainIntegrity(): { isValid: boolean; brokenAtSequence?: number } {
    let expectedPrevHash = 'GENESIS_HASH_AMAL_OS_V1_INIT';

    for (let i = 0; i < this.events.length; i++) {
      const e = this.events[i];
      if (e.previousEventHash !== expectedPrevHash) {
        return { isValid: false, brokenAtSequence: e.sequenceNumber };
      }

      const dataToHash = `${e.sequenceNumber}:${e.previousEventHash}:${e.actorId || 'anon'}:${e.action}:${e.resourceType}:${e.outcome}:${e.createdAt}`;
      const calculatedHash = createHash('sha256').update(dataToHash).digest('hex');

      if (e.eventHash !== calculatedHash) {
        return { isValid: false, brokenAtSequence: e.sequenceNumber };
      }

      expectedPrevHash = e.eventHash;
    }

    return { isValid: true };
  }

  public static getEvents(): TamperEvidentAuditEvent[] {
    return [...this.events];
  }

  public static clear(): void {
    this.events = [];
    this.latestHash = 'GENESIS_HASH_AMAL_OS_V1_INIT';
  }
}
