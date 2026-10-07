export type UserIntent =
  | 'PRAYER_QUESTION'
  | 'FAJR_STRUGGLE'
  | 'QURAN_HABIT'
  | 'CHARACTER_AND_ANGER'
  | 'FAMILY_RELATIONS'
  | 'TIME_MANAGEMENT'
  | 'GENERAL_LEARNING'
  | 'PERSONALIZED_FIQH'
  | 'CRISIS_EMERGENCY';

export class IntentRouter {
  public static route(userQuery: string): UserIntent {
    const q = userQuery.toLowerCase();

    if (/\b(fajr|wake up|missed fajr|sleep through fajr)\b/i.test(q)) {
      return 'FAJR_STRUGGLE';
    }
    if (/\b(quran|recit|surah|ayah|khatam|memoriz)\b/i.test(q)) {
      return 'QURAN_HABIT';
    }
    if (/\b(anger|angry|temper|patience|sabr|irritat)\b/i.test(q)) {
      return 'CHARACTER_AND_ANGER';
    }
    if (/\b(parent|mother|father|wife|husband|marriage|children|family)\b/i.test(q)) {
      return 'FAMILY_RELATIONS';
    }
    if (/\b(time|busy|work|routine|distract|procrastinat|screen)\b/i.test(q)) {
      return 'TIME_MANAGEMENT';
    }
    if (/\b(salah|prayer|wudu|dhuhr|asr|maghrib|isha)\b/i.test(q)) {
      return 'PRAYER_QUESTION';
    }
    if (/\b(divorce|talaq|oath|kaffarah|annulment|is my marriage)\b/i.test(q)) {
      return 'PERSONALIZED_FIQH';
    }
    if (/\b(suicide|kill myself|end my life|abuse|beat)\b/i.test(q)) {
      return 'CRISIS_EMERGENCY';
    }

    return 'GENERAL_LEARNING';
  }
}
