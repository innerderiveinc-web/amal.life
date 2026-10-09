import { CommunicationPriority, CommunicationPurpose, CommunicationChannel } from '@amal/types';
export interface CandidateNotification {
    id: string;
    purpose: CommunicationPurpose;
    priority: CommunicationPriority;
    channel: CommunicationChannel;
    title: string;
    body: string;
    scheduledTime: number;
}
export interface CollisionResolution {
    approved: CandidateNotification[];
    deferred: CandidateNotification[];
    suppressed: CandidateNotification[];
    combinedDigest?: {
        channel: CommunicationChannel;
        title: string;
        body: string;
    };
}
export declare class CollisionEngine {
    private static readonly PRIORITY_WEIGHTS;
    /**
     * Resolves temporal collisions within a given window (default: 30 minutes).
     * Prevents overwhelming the user with multiple alerts.
     */
    static resolveCollisions(candidates: CandidateNotification[], windowMinutes?: number): CollisionResolution;
}
//# sourceMappingURL=collision-engine.d.ts.map