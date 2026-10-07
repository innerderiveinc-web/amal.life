import { CircuitBreakerState } from '@amal/types';

export class CircuitBreakerService {
  private static breakers: Map<string, { state: CircuitBreakerState; reason?: string; trippedAt?: string }> = new Map([
    ['AI_GENERAL', { state: 'NORMAL' }],
    ['AI_RELIGIOUS_ANSWERING', { state: 'NORMAL' }],
    ['NOTIFICATIONS', { state: 'NORMAL' }],
  ]);

  public static getState(breakerId: string): CircuitBreakerState {
    return this.breakers.get(breakerId)?.state || 'NORMAL';
  }

  public static trip(breakerId: string, newState: CircuitBreakerState, reason: string): void {
    this.breakers.set(breakerId, {
      state: newState,
      reason,
      trippedAt: new Date().toISOString(),
    });
  }

  public static reset(breakerId: string): void {
    this.breakers.set(breakerId, { state: 'NORMAL' });
  }

  /**
   * Asserts whether a given system operation can proceed under current breaker state.
   */
  public static canExecuteAIOperation(operation: 'OPEN_ENDED_CHAT' | 'STATIC_EVIDENCE_LOOKUP' | 'TODAY_DASHBOARD'): boolean {
    const generalState = this.getState('AI_GENERAL');
    const religiousState = this.getState('AI_RELIGIOUS_ANSWERING');

    if (generalState === 'OFF' || religiousState === 'OFF') {
      // In full OFF, only static non-AI functions survive
      return operation === 'TODAY_DASHBOARD' || operation === 'STATIC_EVIDENCE_LOOKUP';
    }

    if (generalState === 'DEGRADED' || religiousState === 'DEGRADED') {
      // In DEGRADED mode, open-ended conversational generation is halted, but approved static evidence and Today dashboard work
      return operation !== 'OPEN_ENDED_CHAT';
    }

    return true;
  }
}
