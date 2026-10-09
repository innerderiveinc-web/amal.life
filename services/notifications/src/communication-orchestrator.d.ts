import { CommunicationChannel, CommunicationPurpose, CommunicationPriority, CommunicationPreferences, ChannelConsent, FatigueMetrics, CommunicationDecisionResult, SendMessageResponse } from '@amal/types';
import { QsuraGateway } from './qsura-gateway.js';
export interface OrchestrationRequest {
    userId: string;
    purpose: CommunicationPurpose;
    priority?: CommunicationPriority;
    targetChannel?: CommunicationChannel;
    templateSlug?: string;
    customTitle?: string;
    customBody?: string;
    variables?: Record<string, string>;
    userConsents: ChannelConsent[];
    preferences: CommunicationPreferences;
    fatigueMetrics: FatigueMetrics;
    lastActiveSessionMinutesAgo?: number;
    amalCompletedToday?: boolean;
    isDuplicate?: boolean;
    destination?: string;
    now?: Date;
}
export declare class CommunicationOrchestrator {
    private gateway;
    constructor(gateway?: QsuraGateway);
    getGateway(): QsuraGateway;
    /**
     * Main pipeline that decides:
     * WHAT -> WHY -> WHEN -> WHERE -> WHETHER TO SEND -> AUDIT TRAIL
     */
    orchestrate(req: OrchestrationRequest): Promise<{
        decision: CommunicationDecisionResult;
        dispatch?: SendMessageResponse;
    }>;
}
//# sourceMappingURL=communication-orchestrator.d.ts.map