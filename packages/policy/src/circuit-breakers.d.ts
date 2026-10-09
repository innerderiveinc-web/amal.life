import { CircuitBreakerState } from '@amal/types';
export declare class CircuitBreakerService {
    private static breakers;
    static getState(breakerId: string): CircuitBreakerState;
    static trip(breakerId: string, newState: CircuitBreakerState, reason: string): void;
    static reset(breakerId: string): void;
    /**
     * Asserts whether a given system operation can proceed under current breaker state.
     */
    static canExecuteAIOperation(operation: 'OPEN_ENDED_CHAT' | 'STATIC_EVIDENCE_LOOKUP' | 'TODAY_DASHBOARD'): boolean;
}
//# sourceMappingURL=circuit-breakers.d.ts.map