import { CommunicationPurpose, CommunicationPriority, SuppressionReasonCode } from '@amal/types';
export interface SuppressionContext {
    userId: string;
    purpose: CommunicationPurpose;
    priority: CommunicationPriority;
    lastActiveSessionMinutesAgo?: number;
    amalCompletedToday?: boolean;
    quietHoursPreferences: {
        enabled: boolean;
        start: string;
        end: string;
        timezone: string;
    };
    now?: Date;
    isDuplicate?: boolean;
    isKillSwitchActive?: boolean;
    fatigueBreached?: boolean;
}
export interface SuppressionDecision {
    shouldSuppress: boolean;
    reasonCode?: SuppressionReasonCode;
    detail?: string;
    canDefer?: boolean;
    deferredUntil?: string;
}
export declare class SuppressionEngine {
    /**
     * Evaluates all core suppression rules. Returns whether the notification must be withheld.
     * Silence is a first-class product feature in AMAL OS.
     */
    static evaluate(context: SuppressionContext): SuppressionDecision;
    private static isInQuietHours;
    private static calculateQuietHoursEndTime;
}
//# sourceMappingURL=suppression-engine.d.ts.map