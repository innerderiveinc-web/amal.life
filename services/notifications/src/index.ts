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

export class GentleNotificationEngine {
  /**
   * Generates a respectful, non-shaming prayer reminder
   * Adheres strictly to Section 76: "Never 'You haven't prayed', Prefer 'Asr is approaching'."
   */
  public static composePrayerReminder(
    prayerName: PrayerName,
    minutesUntil: number,
    style: ReminderStyle = 'CALM'
  ): { title: string; body: string } {
    const formattedPrayer = prayerName.charAt(0) + prayerName.slice(1).toLowerCase();

    if (style === 'SILENT') {
      return { title: '', body: '' };
    }

    if (minutesUntil <= 0) {
      return {
        title: `${formattedPrayer} Time Has Arrived`,
        body: 'A quiet pause in your day to reconnect with your Creator.',
      };
    }

    return {
      title: `${formattedPrayer} is Approaching`,
      body: `In approximately ${minutesUntil} minutes. Prepare with ease and calm.`,
    };
  }

  /**
   * Generates an encouraging, non-guilt journey nudge
   * Adheres to: "Never 'You broke your streak', Prefer 'Ready to continue?'"
   */
  public static composeJourneyNudge(
    journeyTitle: string,
    actionTitle: string
  ): { title: string; body: string } {
    return {
      title: 'Ready to continue?',
      body: `Today's small step in ${journeyTitle}: ${actionTitle}.`,
    };
  }

  /**
   * Generates a peaceful evening reflection invite
   */
  public static composeMuhasabahReminder(): { title: string; body: string } {
    return {
      title: 'A Calm Moment of Reflection',
      body: 'Take 2 minutes for your daily Muhasabah: what went well and what felt meaningful today?',
    };
  }
}
