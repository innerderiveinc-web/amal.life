export interface QueuedAction {
    id: string;
    type: 'AMAL_COMPLETION' | 'REFLECTION_SAVE' | 'PRAYER_LOG' | 'JOURNEY_ADAPTATION';
    payload: Record<string, any>;
    timestamp: string;
    status: 'PENDING' | 'SYNCED' | 'FAILED';
    retryCount: number;
}
export declare class OfflineSyncService {
    private static queue;
    private static isOnline;
    static setOnlineStatus(online: boolean): void;
    static getOnlineStatus(): boolean;
    static enqueueAction(type: QueuedAction['type'], payload: Record<string, any>): QueuedAction;
    static getPendingCount(): number;
    static getQueue(): QueuedAction[];
    static flushQueue(): Promise<{
        synced: number;
        failed: number;
    }>;
    static clearQueue(): void;
}
//# sourceMappingURL=offline-sync.d.ts.map