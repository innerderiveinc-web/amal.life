"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BurdenGuard = void 0;
class BurdenGuard {
    /**
     * Calculates total active daily burden across goals & active journeys.
     * Caps active daily commitment at 30 minutes to safeguard against spiritual fatigue.
     */
    static calculateBurden(actions) {
        const totalMinutes = actions.reduce((sum, a) => sum + a.durationMinutes, 0);
        let burdenLevel = 'LIGHT';
        if (totalMinutes > 30)
            burdenLevel = 'HEAVY';
        else if (totalMinutes > 15)
            burdenLevel = 'BALANCED';
        return {
            totalMinutes,
            burdenLevel,
            isOverloaded: totalMinutes > 30,
        };
    }
}
exports.BurdenGuard = BurdenGuard;
//# sourceMappingURL=burden-guard.js.map