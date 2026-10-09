import { ReminderStyle, PrayerName } from '@amal/types';
export * from './consent-engine.js';
export * from './prayer-context-engine.js';
export * from './fatigue-engine.js';
export * from './collision-engine.js';
export * from './suppression-engine.js';
export * from './re-engagement-engine.js';
export * from './template-engine.js';
export * from './qsura-gateway.js';
export * from './global-kill-switches.js';
export * from './communication-orchestrator.js';
export interface NotificationPayload {
    userId: string;
    category: 'SALAH' | 'AMAL' | 'JOURNEY' | 'REFLECT';
    title: string;
    body: string;
    actionUrl: string;
}
export declare class GentleNotificationEngine {
    /**
     * Generates a respectful, non-shaming prayer reminder
     * Adheres strictly to Section 76: "Never 'You haven't prayed', Prefer 'Asr is approaching'."
     */
    static composePrayerReminder(prayerName: PrayerName, minutesUntil: number, style?: ReminderStyle): {
        title: string;
        body: string;
    };
    /**
     * Generates an encouraging, non-guilt journey nudge
     * Adheres to: "Never 'You broke your streak', Prefer 'Ready to continue?'"
     */
    static composeJourneyNudge(journeyTitle: string, actionTitle: string): {
        title: string;
        body: string;
    };
    /**
     * Generates a peaceful evening reflection invite
     */
    static composeMuhasabahReminder(): {
        title: string;
        body: string;
    };
}
//# sourceMappingURL=index.d.ts.map