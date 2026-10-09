export declare class BurdenGuard {
    /**
     * Calculates total active daily burden across goals & active journeys.
     * Caps active daily commitment at 30 minutes to safeguard against spiritual fatigue.
     */
    static calculateBurden(actions: {
        durationMinutes: number;
    }[]): {
        totalMinutes: number;
        burdenLevel: 'LIGHT' | 'BALANCED' | 'HEAVY';
        isOverloaded: boolean;
    };
}
//# sourceMappingURL=burden-guard.d.ts.map