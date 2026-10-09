import { CommunicationChannel, CommunicationPurpose, ChannelConsent } from '@amal/types';
export interface ConsentCheckResult {
    allowed: boolean;
    effectiveChannel: CommunicationChannel;
    reason?: string;
    degradedFrom?: CommunicationChannel;
}
export declare class ConsentEngine {
    /**
     * Verifies explicit consent for a requested channel and purpose.
     * If a channel is unconsented, evaluates whether it can safely degrade down the hierarchy:
     * WHATSAPP -> PUSH -> IN_APP.
     */
    static evaluateConsent(channel: CommunicationChannel, purpose: CommunicationPurpose, userConsents: Map<CommunicationChannel, ChannelConsent> | ChannelConsent[]): ConsentCheckResult;
}
//# sourceMappingURL=consent-engine.d.ts.map