import { AIDataEnvelope, DataClass, DataPurpose } from '@amal/types';
export interface RawContextCandidate {
    id: string;
    userId: string;
    type: 'AMAL_EVENT' | 'JOURNEY_PHASE' | 'REFLECTION' | 'SCHOLAR_CASE' | 'FAMILY_NOTE' | 'SYSTEM_STATE';
    dataClass: DataClass;
    content: string;
}
export declare class ContextFirewallV2 {
    /**
     * Filters and constructs a strictly bounded AIDataEnvelope.
     * Guarantees:
     * 1. No cross-user data leakage.
     * 2. Minimum necessary context per agent role.
     * 3. Redaction of sensitive fields without user consent.
     */
    static constructEnvelope(requestId: string, targetUserId: string, agentName: string, purpose: DataPurpose, candidates: RawContextCandidate[], hasSensitiveConsent?: boolean): {
        envelope: AIDataEnvelope;
        filteredContent: Array<{
            id: string;
            content: string;
        }>;
    };
}
//# sourceMappingURL=context-firewall-v2.d.ts.map