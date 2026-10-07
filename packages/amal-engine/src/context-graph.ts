export type ContextSource =
  | 'USER_EXPLICIT'
  | 'USER_CONFIRMED'
  | 'BEHAVIOR'
  | 'REFLECTION'
  | 'SCHEDULE'
  | 'SYSTEM'
  | 'AI_INFERENCE';

export type ContextSensitivity = 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH';

export interface ContextSignal {
  id: string;
  userId: string;
  type: string;
  value: any;
  source: ContextSource;
  confidence: number;
  sensitivity: ContextSensitivity;
  freshnessAt: Date;
  expiresAt?: Date;
  userVisible: boolean;
  userEditable: boolean;
  inferenceReason?: string;
  status: 'ACTIVE' | 'EXPIRED' | 'REVOKED' | 'SUPERSEDED';
}

export class PersonalContextGraph {
  private signals = new Map<string, ContextSignal>();

  public addSignal(signal: ContextSignal): void {
    this.signals.set(signal.id, signal);
  }

  public getSignalsForUser(userId: string): ContextSignal[] {
    const now = new Date();
    return Array.from(this.signals.values()).filter(
      s => s.userId === userId && s.status === 'ACTIVE' && (!s.expiresAt || s.expiresAt > now)
    );
  }

  /**
   * Resolves conflicting signals applying the non-negotiable priority hierarchy:
   * Explicit User Choice (1.0) > Confirmed Preference (0.95) > Recent Feedback > Behavioral Pattern > AI Inference
   */
  public resolvePreference(userId: string, contextType: string): ContextSignal | null {
    const matching = this.getSignalsForUser(userId).filter(s => s.type === contextType);
    if (matching.length === 0) return null;

    const sourcePriority: Record<ContextSource, number> = {
      USER_EXPLICIT: 5,
      USER_CONFIRMED: 4,
      REFLECTION: 3,
      SCHEDULE: 3,
      BEHAVIOR: 2,
      SYSTEM: 1,
      AI_INFERENCE: 0,
    };

    matching.sort((a, b) => {
      const pDiff = sourcePriority[b.source] - sourcePriority[a.source];
      if (pDiff !== 0) return pDiff;
      return b.freshnessAt.getTime() - a.freshnessAt.getTime();
    });

    return matching[0];
  }

  /**
   * Minimum Necessary Context selector for AI agents
   */
  public selectContextForTask(userId: string, requestedTypes: string[], maxSensitivity: ContextSensitivity = 'MEDIUM'): ContextSignal[] {
    const sensitivityWeight: Record<ContextSensitivity, number> = {
      LOW: 1,
      MEDIUM: 2,
      HIGH: 3,
      VERY_HIGH: 4,
    };

    return this.getSignalsForUser(userId).filter(s => {
      const typeAllowed = requestedTypes.includes(s.type);
      const sensitivityAllowed = sensitivityWeight[s.sensitivity] <= sensitivityWeight[maxSensitivity];
      return typeAllowed && sensitivityAllowed;
    });
  }
}
