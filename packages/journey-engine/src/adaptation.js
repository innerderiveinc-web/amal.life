"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JourneyAdaptationEngine = void 0;
class JourneyAdaptationEngine {
    /**
     * Section 46 & 71 Adaptation Policy:
     * 1 miss -> no adaptation
     * 2 consecutive misses -> optional check-in
     * 3 misses / 7 days -> adaptation candidate
     * repeated struggle -> user conversation
     * Never punish or shame.
     */
    static evaluate(consecutiveMisses, weeklyMisses, currentMinutes) {
        if (consecutiveMisses >= 3 || weeklyMisses >= 3) {
            return {
                action: 'PROPOSE_SIMPLIFICATION',
                reductionPercentage: 50,
                recommendedDurationMinutes: Math.max(3, Math.round(currentMinutes * 0.5)),
                reassuranceMessage: 'Building consistency is a gradual journey. The Prophet ﷺ taught that the most beloved deeds are those that are consistent, even if small. Let us simplify your plan to fit your schedule comfortably.',
            };
        }
        if (consecutiveMisses === 2) {
            return {
                action: 'CHECK_IN_OFFER',
                reductionPercentage: 0,
                reassuranceMessage: 'Would you like to adjust your preferred time or keep today’s plan light?',
            };
        }
        return {
            action: 'NO_CHANGE',
            reductionPercentage: 0,
        };
    }
}
exports.JourneyAdaptationEngine = JourneyAdaptationEngine;
//# sourceMappingURL=adaptation.js.map