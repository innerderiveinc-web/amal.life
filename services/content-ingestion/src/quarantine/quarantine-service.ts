export interface QuarantinedItem {
  itemId: string;
  sourceId: string;
  reason: string;
  quarantinedAt: string;
  status: 'QUARANTINED' | 'RESOLVED';
}

export class QuarantineService {
  private static quarantineMap = new Map<string, QuarantinedItem>();

  public static quarantine(itemId: string, sourceId: string, reason: string): QuarantinedItem {
    const item: QuarantinedItem = {
      itemId,
      sourceId,
      reason,
      quarantinedAt: new Date().toISOString(),
      status: 'QUARANTINED',
    };
    this.quarantineMap.set(itemId, item);
    return item;
  }

  public static isQuarantined(itemId: string): boolean {
    const item = this.quarantineMap.get(itemId);
    return !!item && item.status === 'QUARANTINED';
  }

  public static resolveQuarantine(itemId: string): void {
    const item = this.quarantineMap.get(itemId);
    if (item) {
      item.status = 'RESOLVED';
    }
  }
}
