import { TamperEvidentAuditEvent } from '@amal/types';
export declare class TamperEvidentAuditService {
    private static events;
    private static latestHash;
    static recordEvent(payload: {
        actorId?: string;
        actorType: string;
        action: string;
        resourceType: string;
        resourceId?: string;
        purpose: string;
        outcome: 'SUCCESS' | 'DENIED' | 'ERROR';
        metadata?: Record<string, unknown>;
    }): TamperEvidentAuditEvent;
    /**
     * Validates the cryptographic integrity of the audit hash chain.
     */
    static verifyChainIntegrity(): {
        isValid: boolean;
        brokenAtSequence?: number;
    };
    static getEvents(): TamperEvidentAuditEvent[];
    static clear(): void;
}
//# sourceMappingURL=tamper-evident-audit.d.ts.map