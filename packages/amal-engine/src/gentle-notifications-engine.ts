/**
 * AMAL OS - "Rahmat, Not Nagging" Smart Gentle Notification Engine
 * 
 * Strict Adab & Dignity Invariant (INV_GENTLE_01):
 * - Absolutely zero guilt-tripping ("You haven't opened the app!", "You broke your streak!").
 * - Zero gamification panic.
 * - Only peaceful, respectful, and timed pastoral reminders (Rafiq).
 */

export type NotificationMode = 'SILENT' | 'MODERATE' | 'ACTIVE';

export interface GentleNotificationPreferences {
  mode: NotificationMode;
  allowPrayerAlerts: boolean;
  allowFridaySalawat: boolean;
  allowSunnahFasting: boolean;
  allowNightMulk: boolean;
  allowDailyMicroAmal: boolean;
}

export interface ScheduledGentleNotification {
  id: string;
  triggerTime: string;
  category: 'PRAYER' | 'FRIDAY_SALAWAT' | 'SUNNAH_FASTING' | 'NIGHT_MULK' | 'MICRO_AMAL';
  titleUrdu: string;
  titleEnglish: string;
  messageUrdu: string;
  messageEnglish: string;
  actionUrl: string;
}

export class GentleNotificationsEngine {
  private static readonly GUILT_WORDS = [
    'missed', 'streak', 'lost', 'failed', 'broken', 'shame',
    'warning', 'punishment', 'خسارہ', 'ضائع', 'توڑ دیا', 'وارننگ',
  ];

  /**
   * Validates that notification text conforms to the Non-Guilt Invariant (INV_GENTLE_01)
   */
  public static validateNotificationCopy(text: string): boolean {
    const lower = text.toLowerCase();
    return !this.GUILT_WORDS.some(word => lower.includes(word));
  }

  /**
   * Generates a peaceful, adab-grounded notification schedule
   */
  public static getSchedule(
    prefs: GentleNotificationPreferences = {
      mode: 'MODERATE',
      allowPrayerAlerts: true,
      allowFridaySalawat: true,
      allowSunnahFasting: true,
      allowNightMulk: true,
      allowDailyMicroAmal: true,
    }
  ): ScheduledGentleNotification[] {
    const list: ScheduledGentleNotification[] = [];

    if (prefs.mode === 'SILENT') {
      if (prefs.allowPrayerAlerts) {
        list.push({
          id: 'prayer-fajr',
          triggerTime: '05:43',
          category: 'PRAYER',
          titleUrdu: 'نمازِ فجر کا وقت',
          titleEnglish: 'Fajr Prayer Time',
          messageUrdu: 'الصلاة خير من النوم — اللہ کے حضور حاضری کا پرنور وقت۔',
          messageEnglish: 'Prayer is better than sleep — blessed dawn prayer time.',
          actionUrl: '/prayer',
        });
      }
      return list;
    }

    // Moderate & Active schedules
    if (prefs.allowPrayerAlerts) {
      list.push(
        {
          id: 'prayer-dhuhr',
          triggerTime: '12:51',
          category: 'PRAYER',
          titleUrdu: 'نمازِ ظہر کا وقت',
          titleEnglish: 'Dhuhr Prayer Time',
          messageUrdu: 'دن کے ہنگاموں میں سے چند لمحے اپنے خالق کے شکرانے کے لیے۔',
          messageEnglish: 'A peaceful pause in the midday to connect with your Creator.',
          actionUrl: '/prayer',
        },
        {
          id: 'prayer-maghrib',
          triggerTime: '18:45',
          category: 'PRAYER',
          titleUrdu: 'نمازِ مغرب اور افطار کا وقت',
          titleEnglish: 'Maghrib Prayer Time',
          messageUrdu: 'غروبِ آفتاب کے ساتھ اپنے رب کی تسبیح اور شکر کا وقت۔',
          messageEnglish: 'Sunset reminder to give thanks and turn to Allah.',
          actionUrl: '/prayer',
        }
      );
    }

    if (prefs.allowFridaySalawat) {
      list.push({
        id: 'fri-salawat',
        triggerTime: '09:00 (Friday)',
        category: 'FRIDAY_SALAWAT',
        titleUrdu: 'جمعۃ المبارک اور درود شریف',
        titleEnglish: 'Blessed Friday & Salawat',
        messageUrdu: 'جمعہ کے روز نبیِ کریم ﷺ پر کثرت سے درود شریف بھیجنا باعثِ رحمت ہے۔',
        messageEnglish: 'Sending abundant blessings upon the Prophet ﷺ on this blessed day.',
        actionUrl: '/audio',
      });
    }

    if (prefs.allowDailyMicroAmal && prefs.mode === 'ACTIVE') {
      list.push({
        id: 'micro-amal-afternoon',
        triggerTime: '16:30',
        category: 'MICRO_AMAL',
        titleUrdu: 'آج کا مسنون عمل (۱ منٹ)',
        titleEnglish: 'Today\'s 1-Minute Micro-Amal',
        messageUrdu: 'کسی مسلمان بھائی کو مسکرا کر دیکھیں یا والدین کے لیے دل سے دعا فرمائیں۔',
        messageEnglish: 'A small intentional act: send a silent prayer for your parents.',
        actionUrl: '/',
      });
    }

    if (prefs.allowNightMulk) {
      list.push({
        id: 'night-mulk',
        triggerTime: '22:00',
        category: 'NIGHT_MULK',
        titleUrdu: 'رات کا مسنون معمول (سورۃ الملک)',
        titleEnglish: 'Night Sunnah: Surah al-Mulk',
        messageUrdu: 'سونے سے قبل عذابِ قبر سے ڈھال بننے والی مبارک سورت کی تلاوت۔',
        messageEnglish: 'Reciting Surah al-Mulk before sleep as an armor of protection.',
        actionUrl: '/audio',
      });
    }

    return list;
  }
}
export const gentleNotificationsEngine = new GentleNotificationsEngine();
