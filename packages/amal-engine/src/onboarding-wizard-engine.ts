/**
 * AMAL OS - 30-Second Gentle Onboarding Wizard Engine
 * 
 * Provides a respectful, barrier-free starter experience:
 * Step 1: Madhhab Selection (Hanafi, Shafi'i, Maliki, Hanbali, General)
 * Step 2: Spiritual Focus (Salah, Quran, Akhlaq, Halal Livelihood)
 * Step 3: Realistic Daily Time (5 mins, 15 mins, 30+ mins)
 * 
 * Zero guilt, zero friction, immediate personalized orientation.
 */

export type OnboardingMadhhab = 'HANAFI' | 'SHAFII' | 'MALIKI' | 'HANBALI' | 'GENERAL_UMMAH';
export type OnboardingFocus = 'SALAH_DISCIPLINE' | 'QURAN_TADABBUR' | 'AKHLAQ_CHARACTER' | 'HALAL_LIVELIHOOD';
export type OnboardingTimeCommitment = '5_MINS' | '15_MINS' | '30_PLUS_MINS';

export interface OnboardingChoices {
  madhhab: OnboardingMadhhab;
  focus: OnboardingFocus;
  timeCommitment: OnboardingTimeCommitment;
}

export interface StarterPlan {
  choices: OnboardingChoices;
  orientationTitleUrdu: string;
  orientationTitleEnglish: string;
  recommendedDailyMamoolUrdu: string;
  recommendedDailyMamoolEnglish: string;
  firstSevenDaysJourney: {
    day: number;
    titleUrdu: string;
    titleEnglish: string;
    microAmalUrdu: string;
    microAmalEnglish: string;
  }[];
}

export class OnboardingWizardEngine {
  public static generateStarterPlan(choices: OnboardingChoices): StarterPlan {
    const focusLabels: Record<OnboardingFocus, { ur: string; en: string }> = {
      SALAH_DISCIPLINE: { ur: 'نماز کی پابندی اور خشوع', en: 'Salah Punctuality & Khushu\'' },
      QURAN_TADABBUR: { ur: 'قرآن فہمی اور تلاوت', en: 'Quranic Contemplation & Recitation' },
      AKHLAQ_CHARACTER: { ur: 'حسنِ اخلاق اور گھریلو نرمی', en: 'Noble Character & Family Softness' },
      HALAL_LIVELIHOOD: { ur: 'حلال کمائی اور مالی برکت', en: 'Halal Earnings & Financial Barakah' },
    };

    const madhhabLabels: Record<OnboardingMadhhab, string> = {
      HANAFI: 'فقہِ حنفی (امام ابو حنیفہ رحمہ اللہ)',
      SHAFII: 'فقہِ شافعی (امام شافعی رحمہ اللہ)',
      MALIKI: 'فقہِ مالکی (امام مالک رحمہ اللہ)',
      HANBALI: 'فقہِ حنبلی (امام احمد رحمہ اللہ)',
      GENERAL_UMMAH: 'سوادِ اعظم عمومی رہنمائی',
    };

    const dailyAmalByFocus: Record<OnboardingFocus, { titleUr: string; titleEn: string; deedUr: string; deedEn: string }[]> = {
      SALAH_DISCIPLINE: [
        { titleUr: 'اذان کے جواب کی نیت', titleEn: 'Responding to Adhan', deedUr: 'اذان سن کر خاموشی اختیار کریں اور دل سے جواب دیں۔', deedEn: 'Pause during Adhan and silently repeat after the caller.' },
        { titleUr: 'تکبیرِ اولیٰ کی کوشش', titleEn: 'Takbir al-Ula Intention', deedUr: 'کم از کم ایک باجماعت نماز میں پہلی صف میں پہنچیں۔', deedEn: 'Arrive at the mosque before the opening Takbir.' },
        { titleUr: 'نماز کے بعد تسبیحِ فاطمہ', titleEn: 'Post-Salah Tasbih Fatimah', deedUr: 'فرض کے بعد 33 بار سبحان اللہ، 33 بار الحمد للہ، 34 بار اللہ اکبر۔', deedEn: 'Recite SubhanAllah x33, Alhamdulillah x33, Allahu Akbar x34.' },
        { titleUr: 'آیۃ الکرسی کی حفاظت', titleEn: 'Ayat al-Kursi Shield', deedUr: 'ہر فرض نماز کے سلام کے بعد آیۃ الکرسی کا اہتمام۔', deedEn: 'Recite Ayat al-Kursi after the final salam.' },
        { titleUr: 'سنتِ موکدہ کی پابندی', titleEn: 'Sunnah Mu\'akkadah', deedUr: 'ظہر یا فجر کی سنتوں کو پرسکون طریقے سے ادا کریں۔', deedEn: 'Perform the confirmed sunnah prayers unhurriedly.' },
        { titleUr: 'سجدے میں طویل دعا', titleEn: 'Du\'a in Prostration', deedUr: 'نفل نماز کے آخری سجدے میں اپنے رب سے عافیت مانگیں۔', deedEn: 'Supplicate for well-being during prostration in nafl prayer.' },
        { titleUr: 'شکرانہ کی دو رکعت', titleEn: 'Two Rakah Shukr', deedUr: 'ہفتے کی عبادت کی توفیق پر دو رکعت شکرانہ ادا کریں۔', deedEn: 'Pray two rakahs of gratitude for Allah\'s guidance.' },
      ],
      QURAN_TADABBUR: [
        { titleUr: 'سورۃ الفاتحہ کا ترجمہ و تدبر', titleEn: 'Surah al-Fatihah Contemplation', deedUr: 'اہدنا الصراط المستقیم پر رک کر دلی دعا کریں۔', deedEn: 'Pause at "Guide us to the Straight Path" and plead with sincerity.' },
        { titleUr: 'سورۃ الاخلاص کی تلاوت', titleEn: 'Surah al-Ikhlas x3', deedUr: 'توحید کا اقرار اور ایک تہائی قرآن کا اجر۔', deedEn: 'Recite Surah al-Ikhlas with pure focus on Allah\'s Oneness.' },
        { titleUr: 'سورۃ الملک رات کے وقت', titleEn: 'Nightly Surah al-Mulk', deedUr: 'سونے سے قبل تلاوت سنیں یا خود پڑھیں۔', deedEn: 'Recite or listen to Surah al-Mulk before resting.' },
        { titleUr: 'ایک آیت کا مفہوم سمجھنا', titleEn: 'Contemplating One Ayah', deedUr: 'آج کسی ایک آیت کا اردو ترجمہ اور تفسیر دیکھیں۔', deedEn: 'Read the translation and brief context of one ayah.' },
        { titleUr: 'تجوید کی مشق (ع اور ح)', titleEn: 'Tajweed Pronunciation', deedUr: 'تجوید ٹرینر پر حلق کے حروف کی 3 منٹ مشق کریں۔', deedEn: 'Practice throat letters for 3 mins in Tajweed Trainer.' },
        { titleUr: 'سورۃ الکہف (جمعہ کے روز)', titleEn: 'Friday Surah al-Kahf', deedUr: 'جمعہ کے نور کے لیے پہلی 10 آیات یا مکمل سورہ پڑھیں۔', deedEn: 'Recite the first 10 verses or full Surah on Friday.' },
        { titleUr: 'قرآنی دعا کا ورد', titleEn: 'Quranic Supplication', deedUr: '"ربنا آتنا فی الدنیا حسنۃ" کا کثرت سے ورد کریں۔', deedEn: 'Recite "Rabbana atina fid-dunya hasanah" frequently.' },
      ],
      AKHLAQ_CHARACTER: [
        { titleUr: 'مسکرا کر سلام کرنا', titleEn: 'Greeting with a Warm Smile', deedUr: 'گھر میں داخل ہوتے ہی اہل خانہ کو خندہ پیشانی سے سلام کریں۔', deedEn: 'Enter home with a pleasant smile and clear greeting.' },
        { titleUr: 'غصے کے وقت خاموشی', titleEn: 'Patience During Anger', deedUr: 'جب اشتعال آئے تو اعوذ باللہ پڑھ کر خاموش ہو جائیں۔', deedEn: 'Seek refuge in Allah and maintain silence when provoked.' },
        { titleUr: 'والدین کے آگے نرمی', titleEn: 'Humility with Parents', deedUr: 'ان کے لیے محبت اور احترام سے دعا مانگیں (رب ارحمهما)۔', deedEn: 'Speak gently to parents and pray for their mercy.' },
        { titleUr: 'کسی کی غیبت نہ سننا', titleEn: 'Guarding the Tongue', deedUr: 'محفل میں بات کو نیکی کی طرف موڑ دیں۔', deedEn: 'Steer conversations away from backbiting gently.' },
        { titleUr: 'راستے سے تکلیف دہ چیز ہٹانا', titleEn: 'Removing Harm from the Path', deedUr: 'صدقہ کی نیت سے کوئی رکاوٹ یا کچرا دور کریں۔', deedEn: 'Clear an obstacle or litter with the intention of sadaqah.' },
        { titleUr: 'معافی اور درگزر', titleEn: 'Forgiving an Offense', deedUr: 'کسی ناپسندیدہ بات پر دل کو کینے سے پاک کریں۔', deedEn: 'Pardon a small slight for the pleasure of Allah.' },
        { titleUr: 'پڑوسی کی خیر خواہی', titleEn: 'Benevolence to Neighbors', deedUr: 'کسی پڑوسی یا دوست کی خیریت دریافت کریں۔', deedEn: 'Check in on a neighbor or relative with kindness.' },
      ],
      HALAL_LIVELIHOOD: [
        { titleUr: 'صبح حلال رزق کی نیت', titleEn: 'Intention for Pure Livelihood', deedUr: 'کام شروع کرتے وقت نیت فرمائیں کہ اہل خانہ کے لیے حلال کمائیں گے۔', deedEn: 'Begin your workday with the intention of halal provision.' },
        { titleUr: 'وقت اور امانت کی حفاظت', titleEn: 'Faithfulness in Time & Duty', deedUr: 'اپنے دفتری یا کاروباری اوقات میں پوری دیانت داری برتیں۔', deedEn: 'Honor your work hours with utmost integrity.' },
        { titleUr: 'جھوٹ اور قسم سے پرہیز', titleEn: 'Avoiding Falsehood in Trade', deedUr: 'کاروبار یا سودے بازی میں سچائی کو ترجیح دیں۔', deedEn: 'Speak truthfully in transactions without exaggeration.' },
        { titleUr: 'چھوٹا مخفی صدقہ', titleEn: 'Discreet Daily Sadaqah', deedUr: 'چند سکے کسی ضرورت مند کو خاموشی سے عطا کریں۔', deedEn: 'Give even a small amount of charity secretly.' },
        { titleUr: 'قرض کی نیت اور ادائیگی', titleEn: 'Repaying Debts Promptly', deedUr: 'اگر کسی کا قرض ہے تو اس کی ادائیگی کی فکر اور دعا کریں۔', deedEn: 'Make active effort and du\'a to settle debts promptly.' },
        { titleUr: 'نعمت پر شکر گزاری', titleEn: 'Gratitude for Provision', deedUr: 'جو رزق حاصل ہوا اس پر دل سے الحمد للہ کہیں۔', deedEn: 'Thank Allah sincerely for the sustenance provided.' },
        { titleUr: 'زکوٰۃ اور حق کی فکر', titleEn: 'Reviewing Financial Dues', deedUr: 'اپنے مال کے حساب اور زکوٰۃ کے وجوب پر غور کریں۔', deedEn: 'Review financial obligations and zakatable assets.' },
      ],
    };

    const deeds = dailyAmalByFocus[choices.focus];
    const planDays = deeds.map((d, index) => ({
      day: index + 1,
      titleUrdu: d.titleUr,
      titleEnglish: d.titleEn,
      microAmalUrdu: d.deedUr,
      microAmalEnglish: d.deedEn,
    }));

    return {
      choices,
      orientationTitleUrdu: `خوش آمدید! آپ کا ذاتی دینی مسکن: ${madhhabLabels[choices.madhhab]} کے مطابق`,
      orientationTitleEnglish: `Welcome to AMAL OS: Tailored for ${choices.madhhab} & ${focusLabels[choices.focus].en}`,
      recommendedDailyMamoolUrdu: `آپ کی ترجیح (${focusLabels[choices.focus].ur}) کے مطابق روزانہ ${choices.timeCommitment === '5_MINS' ? '۵ منٹ' : choices.timeCommitment === '15_MINS' ? '۱۵ منٹ' : '۳۰ منٹ'} کا آسان اور باوقار شیڈول مرتب کیا گیا ہے۔`,
      recommendedDailyMamoolEnglish: `Based on your chosen focus, a comfortable ${choices.timeCommitment === '5_MINS' ? '5-minute' : choices.timeCommitment === '15_MINS' ? '15-minute' : '30-minute'} daily plan has been set.`,
      firstSevenDaysJourney: planDays,
    };
  }
}
export const onboardingWizardEngine = new OnboardingWizardEngine();
