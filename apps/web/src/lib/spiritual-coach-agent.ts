/**
 * AMAL OS — Smart Spiritual Coach (Deterministic Multi-Step Routine & Muhasabah Agent)
 * 
 * 100% On-Device, Privacy-First, Zero-Guilt Autonomous Spiritual Guide.
 * Chains verified micro-actions from handcrafted Prophetic Journeys.
 */

export type SpiritualDayPhase = 'MORNING_INTENT' | 'MIDDAY_CHECK' | 'EVENING_RECONNECT' | 'NIGHT_MUHASABAH';

export interface DailyMuhasabahEntry {
  date: string; // YYYY-MM-DD
  prayersCompleted: {
    fajr: boolean;
    dhuhr: boolean;
    asr: boolean;
    maghrib: boolean;
    isha: boolean;
  };
  characterAudit: {
    avoidedAnger: boolean;
    guardedTongue: boolean;
    forgaveOthers: boolean;
  };
  gratitudeNote: string;
  suggestedAdaptiveStep: string;
}

export interface SpiritualCoachState {
  currentPhase: SpiritualDayPhase;
  activeFocus: string; // e.g. "Fajr Consistency", "Sabr & Patience", "Tongue Discipline"
  currentMicroAction: {
    ur: string;
    en: string;
    source: string;
  };
  consistencyStreakDays: number;
  recentAudit: DailyMuhasabahEntry | null;
}

/**
 * Determine phase of the day based on local clock
 */
export function getCurrentSpiritualPhase(): SpiritualDayPhase {
  const hour = new Date().getHours();
  if (hour >= 4 && hour < 12) return 'MORNING_INTENT';
  if (hour >= 12 && hour < 17) return 'MIDDAY_CHECK';
  if (hour >= 17 && hour < 21) return 'EVENING_RECONNECT';
  return 'NIGHT_MUHASABAH';
}

/**
 * Get intelligent guidance and micro-action based on phase and user history
 */
export function getSmartCoachGuidance(state?: Partial<SpiritualCoachState>): SpiritualCoachState {
  const phase = getCurrentSpiritualPhase();
  const dateStr = new Date().toISOString().split('T')[0]!;

  let savedAudit: DailyMuhasabahEntry | null = null;
  let savedStreak = 0;
  let savedFocus = 'صبر اور نماز میں استقامت (Salah & Patience)';

  if (typeof window !== 'undefined') {
    try {
      const storedAudit = localStorage.getItem(`amal_muhasabah_${dateStr}`);
      if (storedAudit) savedAudit = JSON.parse(storedAudit);

      const storedStreak = localStorage.getItem('amal_spiritual_streak');
      if (storedStreak) savedStreak = parseInt(storedStreak, 10) || 0;

      const storedFocus = localStorage.getItem('amal_spiritual_focus');
      if (storedFocus) savedFocus = storedFocus;
    } catch {}
  }

  let microAction = {
    ur: 'آج کی نمازِ فجر کے بعد ۳ مرتبہ آیۃ الکرسی کی تلاوت فرمائیں اور اللہ پر مکمل توکل کا ارادہ کریں۔',
    en: 'Recite Ayat-ul-Kursi after Fajr and renew sincere reliance upon Allah for all matters today.',
    source: 'جامع الترمذی · حدیث ۲۸۷۹',
  };

  if (phase === 'MIDDAY_CHECK') {
    microAction = {
      ur: 'نمازِ ظہر و عصر کے بعد ۶۰ سیکنڈ کی مسنون تسبیح: ۳۳ مرتبہ سبحان اللہ، ۳۳ مرتبہ الحمد للہ، ۳۴ مرتبہ اللہ اکبر۔',
      en: 'Post-Dhuhr/Asr 60-second Dhikr: SubhanAllah (33x), Alhamdulillah (33x), Allahu Akbar (34x).',
      source: 'صحیح مسلم · حدیث ۵۹۷',
    };
  } else if (phase === 'EVENING_RECONNECT') {
    microAction = {
      ur: 'مغرب کے بعد قرآنِ مجید کے کم از کم ۳ ارشادات کا فہم و تدبر، اور اہلِ خانہ کے ساتھ نرم گفتگو۔',
      en: 'Contemplate at least 3 verses of the Quran and share warmth and gentle words with your family.',
      source: 'کنز الایمان · سورۃ طہ آیت ۱۳۲',
    };
  } else if (phase === 'NIGHT_MUHASABAH') {
    microAction = {
      ur: 'سونے سے قبل ۶۰ سیکنڈ کا پرسکون محاسبہ نفس: سورۃ الملک کی تلاوت اور تمام اہلِ ایمان کو معاف کر کے سونا۔',
      en: '60-second pre-sleep Muhasabah: Recite Surah Al-Mulk, forgive everyone in your heart, and rest in peace.',
      source: 'جامع الترمذی · حدیث ۲۸۹۱',
    };
  }

  return {
    currentPhase: phase,
    activeFocus: savedFocus,
    currentMicroAction: microAction,
    consistencyStreakDays: savedStreak,
    recentAudit: savedAudit,
  };
}

/**
 * Save user's nightly Muhasabah with autonomous adaptive recalibration
 */
export function saveDailyMuhasabah(entry: Omit<DailyMuhasabahEntry, 'suggestedAdaptiveStep'>): DailyMuhasabahEntry {
  // Autonomous adaptive step generation (Zero shame, purely practical adjustments)
  let adaptiveStep = 'ماشاءاللہ! آج کا دن بہترین گزرا۔ کل اسی استقامت کو جاری رکھیں۔';

  if (!entry.prayersCompleted.fajr) {
    adaptiveStep = 'فجر میں دشواری محسوس ہوئی؟ آج رات عشاء کے فوراً بعد ۲۰ منٹ پہلے سونے کا ارادہ فرمائیں اور سرہانے پانی کا گلاس رکھیں۔';
  } else if (!entry.characterAudit.avoidedAnger) {
    adaptiveStep = 'آج غصہ آیا؟ جب بھی غصہ محسوس ہو، فوراً "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ" پڑھیں اور وضو فرما لیں۔';
  } else if (!entry.characterAudit.forgaveOthers) {
    adaptiveStep = 'دل میں کسی کی بات اٹکی ہے؟ سونے سے پہلے دل سے معاف کر دیں، اللہ پاک آپ کے درجات بلند فرمائے گا۔';
  }

  const fullEntry: DailyMuhasabahEntry = {
    ...entry,
    suggestedAdaptiveStep: adaptiveStep,
  };

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(`amal_muhasabah_${entry.date}`, JSON.stringify(fullEntry));

      // Calculate streak if all 5 prayers checked
      const allPrayers = Object.values(entry.prayersCompleted).every(Boolean);
      const currentStreak = parseInt(localStorage.getItem('amal_spiritual_streak') || '0', 10);
      const newStreak = allPrayers ? currentStreak + 1 : Math.max(0, currentStreak);
      localStorage.setItem('amal_spiritual_streak', String(newStreak));
    } catch {}
  }

  return fullEntry;
}
