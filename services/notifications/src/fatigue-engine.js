"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FatigueEngine = void 0;
class FatigueEngine {
    static PRESSURE_MULTIPLIERS = {
        MINIMAL: 2.0, // Very sensitive, quickly throttles
        GENTLE: 1.4, // Default: respectful of user attention
        BALANCED: 1.0, // Standard baseline
    };
    /**
     * Computes the fatigue score according to:
     * FatigueScore = VolumeFactor * DismissalFactor * IgnoreFactor * PressureMultiplier
     */
    static calculateFatigueScore(metrics, preferences) {
        const maxAllowed = Math.max(1, preferences.maxDailyReminders);
        const volumeFactor = Math.min(2.5, metrics.pushCount24h / maxAllowed);
        // Repeated dismissals directly elevate the dismissal factor
        const dismissalFactor = 1.0 + metrics.dismissalRate * 1.5;
        const ignoreFactor = 1.0 + metrics.ignoreRate * 0.8;
        const pressureMultiplier = this.PRESSURE_MULTIPLIERS[preferences.pressurePreference] || 1.4;
        const rawScore = volumeFactor * dismissalFactor * ignoreFactor * pressureMultiplier;
        return Number(rawScore.toFixed(4));
    }
    /**
     * Evaluates if outgoing communication should be suppressed or downgraded.
     * Core rule: Repeated dismissals decrease frequency; NEVER escalate.
     */
    static evaluateFatigue(metrics, preferences) {
        const fatigueScore = this.calculateFatigueScore(metrics, preferences);
        // Rule 1: High dismissal rate threshold (e.g., >= 50% dismissed with >= 2 push in 24h)
        if (metrics.pushCount24h >= 2 && metrics.dismissalRate >= 0.5) {
            return {
                shouldSuppress: true,
                fatigueScore,
                reason: `High dismissal rate (${(metrics.dismissalRate * 100).toFixed(0)}%). Decreasing frequency to protect user peace.`,
                recommendedChannelAction: 'SUPPRESS_ALL_ROUTINE',
            };
        }
        // Rule 2: Max daily reminder limit reached
        if (metrics.pushCount24h >= preferences.maxDailyReminders) {
            return {
                shouldSuppress: true,
                fatigueScore,
                reason: `Daily reminder limit reached (${metrics.pushCount24h}/${preferences.maxDailyReminders}).`,
                recommendedChannelAction: 'DEGRADE_TO_IN_APP',
            };
        }
        // Rule 3: High fatigue score overall threshold (> 1.5)
        if (fatigueScore >= 1.5) {
            return {
                shouldSuppress: true,
                fatigueScore,
                reason: `Fatigue score threshold exceeded (${fatigueScore.toFixed(2)} >= 1.50).`,
                recommendedChannelAction: 'DEGRADE_TO_IN_APP',
            };
        }
        return {
            shouldSuppress: false,
            fatigueScore,
            recommendedChannelAction: 'NORMAL',
        };
    }
    /**
     * Records a user interaction and adjusts dismissal/ignore metrics smoothly
     */
    static recordInteraction(current, action) {
        const updated = { ...current };
        if (action === 'DISMISSED') {
            // Exponential moving average for dismissal
            updated.dismissalRate = Math.min(1.0, updated.dismissalRate * 0.7 + 0.3);
        }
        else if (action === 'OPENED' || action === 'ACTION_COMPLETED') {
            // Successful interaction reduces dismissal and ignore rates
            updated.dismissalRate = Math.max(0.0, updated.dismissalRate * 0.5);
            updated.ignoreRate = Math.max(0.0, updated.ignoreRate * 0.5);
        }
        updated.updatedAt = new Date().toISOString();
        return updated;
    }
}
exports.FatigueEngine = FatigueEngine;
//# sourceMappingURL=fatigue-engine.js.map