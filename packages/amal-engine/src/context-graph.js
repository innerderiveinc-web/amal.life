"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonalContextGraph = void 0;
class PersonalContextGraph {
    signals = new Map();
    addSignal(signal) {
        this.signals.set(signal.id, signal);
    }
    getSignalsForUser(userId) {
        const now = new Date();
        return Array.from(this.signals.values()).filter(s => s.userId === userId && s.status === 'ACTIVE' && (!s.expiresAt || s.expiresAt > now));
    }
    /**
     * Resolves conflicting signals applying the non-negotiable priority hierarchy:
     * Explicit User Choice (1.0) > Confirmed Preference (0.95) > Recent Feedback > Behavioral Pattern > AI Inference
     */
    resolvePreference(userId, contextType) {
        const matching = this.getSignalsForUser(userId).filter(s => s.type === contextType);
        if (matching.length === 0)
            return null;
        const sourcePriority = {
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
            if (pDiff !== 0)
                return pDiff;
            return b.freshnessAt.getTime() - a.freshnessAt.getTime();
        });
        return matching[0] ?? null;
    }
    /**
     * Minimum Necessary Context selector for AI agents
     */
    selectContextForTask(userId, requestedTypes, maxSensitivity = 'MEDIUM') {
        const sensitivityWeight = {
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
exports.PersonalContextGraph = PersonalContextGraph;
//# sourceMappingURL=context-graph.js.map