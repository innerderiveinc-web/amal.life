import { AIRequest } from '@amal/types';
import { IntentResult } from '../intent/intent-engine.js';
import { SafetyEvaluation } from '../safety/safety-engine.js';

export interface MemoryItem {
  type: 'PREFERENCE' | 'LOGISTICAL_CONSTRAINT' | 'EXPERIENCE';
  key: string;
  value: any;
  confidence: number;
  source: 'USER_CONFIRMED' | 'OBSERVED_PATTERN' | 'AI_INFERRED';
  sensitivity: 'LOW' | 'NORMAL' | 'HIGH';
}

export class MemorySelector {
  private static userMemories = new Map<string, MemoryItem[]>();

  public static async select(
    request: AIRequest,
    intent: IntentResult,
    safety: SafetyEvaluation
  ): Promise<MemoryItem[]> {
    if (!request.contextPolicy?.allowMemory || !safety.personalizationAllowed) {
      return [];
    }

    const memories = this.userMemories.get(request.userId) || [
      {
        type: 'PREFERENCE',
        key: 'preferred_quran_duration',
        value: 10,
        confidence: 0.95,
        source: 'USER_CONFIRMED',
        sensitivity: 'LOW',
      },
      {
        type: 'LOGISTICAL_CONSTRAINT',
        key: 'preferred_time_window',
        value: 'after_fajr',
        confidence: 0.90,
        source: 'USER_CONFIRMED',
        sensitivity: 'LOW',
      },
    ];

    // Priority: USER_CONFIRMED > OBSERVED_PATTERN > AI_INFERRED
    return memories.filter((m) => m.sensitivity !== 'HIGH');
  }

  public static storeMemory(userId: string, item: MemoryItem): void {
    const list = this.userMemories.get(userId) || [];
    list.push(item);
    this.userMemories.set(userId, list);
  }
}
