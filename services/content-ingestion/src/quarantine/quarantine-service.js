"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuarantineService = void 0;
class QuarantineService {
    static quarantineMap = new Map();
    static quarantine(itemId, sourceId, reason) {
        const item = {
            itemId,
            sourceId,
            reason,
            quarantinedAt: new Date().toISOString(),
            status: 'QUARANTINED',
        };
        this.quarantineMap.set(itemId, item);
        return item;
    }
    static isQuarantined(itemId) {
        const item = this.quarantineMap.get(itemId);
        return !!item && item.status === 'QUARANTINED';
    }
    static resolveQuarantine(itemId) {
        const item = this.quarantineMap.get(itemId);
        if (item) {
            item.status = 'RESOLVED';
        }
    }
}
exports.QuarantineService = QuarantineService;
//# sourceMappingURL=quarantine-service.js.map