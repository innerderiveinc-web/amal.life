import { UserActivityState } from '@amal/types';
export declare class ReengagementEngine {
    /**
     * Evaluates user activity state based on days since last engagement.
     */
    static categorizeActivity(daysSinceActive: number): UserActivityState;
    /**
     * Generates respectful, zero-guilt re-engagement messages.
     * Strictly enforces:
     * 1. No mention of streaks, broken habits, or religious guilt.
     * 2. No quotes from private reflections or journals.
     */
    static generateReengagementMessage(state: UserActivityState, contextName?: string): {
        title: string;
        body: string;
    };
    /**
     * Asserts that a candidate copy string adheres to the Zero-Guilt invariant.
     * Throws or returns validation result if guilt/shame patterns are detected.
     */
    static validateNonGuiltCopy(text: string): {
        isClean: boolean;
        violations: string[];
    };
}
//# sourceMappingURL=re-engagement-engine.d.ts.map