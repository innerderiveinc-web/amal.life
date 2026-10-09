export interface QuarantinedItem {
    itemId: string;
    sourceId: string;
    reason: string;
    quarantinedAt: string;
    status: 'QUARANTINED' | 'RESOLVED';
}
export declare class QuarantineService {
    private static quarantineMap;
    static quarantine(itemId: string, sourceId: string, reason: string): QuarantinedItem;
    static isQuarantined(itemId: string): boolean;
    static resolveQuarantine(itemId: string): void;
}
//# sourceMappingURL=quarantine-service.d.ts.map