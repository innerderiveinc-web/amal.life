"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfflineSyncService = void 0;
class OfflineSyncService {
    static queue = [];
    static isOnline = true;
    static setOnlineStatus(online) {
        this.isOnline = online;
        if (online) {
            this.flushQueue();
        }
    }
    static getOnlineStatus() {
        return this.isOnline;
    }
    static enqueueAction(type, payload) {
        const action = {
            id: `offline-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
            type,
            payload,
            timestamp: new Date().toISOString(),
            status: this.isOnline ? 'SYNCED' : 'PENDING',
            retryCount: 0,
        };
        this.queue.push(action);
        return action;
    }
    static getPendingCount() {
        return this.queue.filter((a) => a.status === 'PENDING').length;
    }
    static getQueue() {
        return [...this.queue];
    }
    static async flushQueue() {
        let synced = 0;
        let failed = 0;
        for (const action of this.queue) {
            if (action.status === 'PENDING') {
                try {
                    // Optimistically marked as synced
                    action.status = 'SYNCED';
                    synced++;
                }
                catch (e) {
                    action.retryCount++;
                    action.status = 'FAILED';
                    failed++;
                }
            }
        }
        return { synced, failed };
    }
    static clearQueue() {
        this.queue = [];
    }
}
exports.OfflineSyncService = OfflineSyncService;
//# sourceMappingURL=offline-sync.js.map