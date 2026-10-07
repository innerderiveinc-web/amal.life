export interface QueuedAction {
  id: string;
  type: 'AMAL_COMPLETION' | 'REFLECTION_SAVE' | 'PRAYER_LOG' | 'JOURNEY_ADAPTATION';
  payload: Record<string, any>;
  timestamp: string;
  status: 'PENDING' | 'SYNCED' | 'FAILED';
  retryCount: number;
}

export class OfflineSyncService {
  private static queue: QueuedAction[] = [];
  private static isOnline: boolean = true;

  public static setOnlineStatus(online: boolean) {
    this.isOnline = online;
    if (online) {
      this.flushQueue();
    }
  }

  public static getOnlineStatus(): boolean {
    return this.isOnline;
  }

  public static enqueueAction(type: QueuedAction['type'], payload: Record<string, any>): QueuedAction {
    const action: QueuedAction = {
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

  public static getPendingCount(): number {
    return this.queue.filter((a) => a.status === 'PENDING').length;
  }

  public static getQueue(): QueuedAction[] {
    return [...this.queue];
  }

  public static async flushQueue(): Promise<{ synced: number; failed: number }> {
    let synced = 0;
    let failed = 0;

    for (const action of this.queue) {
      if (action.status === 'PENDING') {
        try {
          // Optimistically marked as synced
          action.status = 'SYNCED';
          synced++;
        } catch (e) {
          action.retryCount++;
          action.status = 'FAILED';
          failed++;
        }
      }
    }

    return { synced, failed };
  }

  public static clearQueue(): void {
    this.queue = [];
  }
}
