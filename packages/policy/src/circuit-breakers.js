"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CircuitBreakerService = void 0;
class CircuitBreakerService {
    static breakers = new Map([
        ['AI_GENERAL', { state: 'NORMAL' }],
        ['AI_RELIGIOUS_ANSWERING', { state: 'NORMAL' }],
        ['NOTIFICATIONS', { state: 'NORMAL' }],
    ]);
    static getState(breakerId) {
        return this.breakers.get(breakerId)?.state || 'NORMAL';
    }
    static trip(breakerId, newState, reason) {
        this.breakers.set(breakerId, {
            state: newState,
            reason,
            trippedAt: new Date().toISOString(),
        });
    }
    static reset(breakerId) {
        this.breakers.set(breakerId, { state: 'NORMAL' });
    }
    /**
     * Asserts whether a given system operation can proceed under current breaker state.
     */
    static canExecuteAIOperation(operation) {
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
exports.CircuitBreakerService = CircuitBreakerService;
//# sourceMappingURL=circuit-breakers.js.map