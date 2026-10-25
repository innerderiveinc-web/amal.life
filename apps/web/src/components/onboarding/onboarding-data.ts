import { SupportedLanguage } from '../OnboardingWizardModal';

export const getOnboardingLocalization = (lang: SupportedLanguage, step: number) => ({
  stepLabel: {
    EN: `Step ${step} of 4`,
    UR: `مرحلہ ${step} از ۴`,
    AR: `الخطوة ${step} من ٤`,
  }[lang],
  step1Title: {
    EN: 'Select Your Fiqh Madhhab',
    UR: 'اپنا فقہی مسلک منتخب فرمائیے',
    AR: 'اختر المذهب الفقهي المتبع',
  }[lang],
  step1Subtitle: {
    EN: 'Used for prayer times (Asr shadow ratio), Zakat nisab, and fiqh guidance:',
    UR: 'نماز کے اوقات (عصر کا سایہ)، زکوٰۃ کے نصاب اور فقہی رہنمائی کے لیے:',
    AR: 'لحساب أوقات الصلاة (ظل العصر)، نصاب الزكاة، والأحكام الفقهية:',
  }[lang],
  step2Title: {
    EN: 'What is your primary spiritual focus?',
    UR: 'اس وقت آپ کا بنیادی روحانی ہدف کیا ہے؟',
    AR: 'ما هو هدفك الروحي الأساسي حالياً؟',
  }[lang],
  step2Subtitle: {
    EN: 'Select your primary area to personalize daily recommendations and gentle journeys:',
    UR: 'روزمرہ کے معمولات کو اپنی ترجیح کے مطابق بنانے کے لیے منتخب کریں:',
    AR: 'اختر المجال لتخصيص جدولك اليومي وسلسلة الخطوات الإيمانية:',
  }[lang],
  step3Title: {
    EN: 'How much time can you comfortably dedicate daily?',
    UR: 'روزانہ کتنا وقت آسانی سے نکال سکتے ہیں؟',
    AR: 'كم من الوقت يمكنك تخصيصه يومياً بكل يسر؟',
  }[lang],
  step3Subtitle: {
    EN: 'We build sustainable habits with zero guilt, zero streaks, and zero burnout:',
    UR: 'ہم بغیر کسی دباؤ یا تھکن کے پائیدار معمولات تیار کرتے ہیں:',
    AR: 'نبني عادات إيمانية مستدامة دون إجهاد أو تأنيب ضمير:',
  }[lang],
  backBtn: {
    EN: '← Back',
    UR: 'واپس →',
    AR: 'السابق →',
  }[lang],
  nextToFocus: {
    EN: 'Next: Spiritual Focus →',
    UR: 'اگلا مرحلہ (روحانی ہدف) ←',
    AR: 'التالي: الهدف الروحي ←',
  }[lang],
  nextToTime: {
    EN: 'Next: Daily Time →',
    UR: 'اگلا مرحلہ (روزانہ وقت) ←',
    AR: 'التالي: الوقت اليومي ←',
  }[lang],
  finishBtn: {
    EN: 'Generate My Personalized Deen Path ✨',
    UR: 'میرا دینی مسکن تیار کریں ✨',
    AR: 'إنشاء مساري الإيماني المخصص ✨',
  }[lang],
  enterOsBtn: {
    EN: 'Bismillah — Enter AMAL OS',
    UR: 'بسم اللہ! ڈیش بورڈ پر جائیں',
    AR: 'بسم الله — الدخول إلى نظام عمل',
  }[lang],
});

export const getMadhhabsList = (lang: SupportedLanguage) => [
  {
    id: 'HANAFI' as const,
    title: {
      EN: 'Hanafi (Imam Abu Hanifah)',
      UR: 'فقہِ حنفی (امام اعظم ابو حنیفہ رحمہ اللہ)',
      AR: 'المذهب الحنفي (الإمام أبو حنيفة رحمه الله)',
    }[lang],
    sub: {
      EN: 'Double shadow for Asr; predominant in South Asia, Turkey, Balkans & Central Asia',
      UR: 'عصر مثلین، برصغیر و ترکی میں کثرت',
      AR: 'مثلين للعصر، سائد في شبه القارة، تركيا والبلقان',
    }[lang],
  },
  {
    id: 'SHAFII' as const,
    title: {
      EN: 'Shafi\'i (Imam Muhammad al-Shafi\'i)',
      UR: 'فقہِ شافعی (امام محمد بن ادریس الشافعی رحمہ اللہ)',
      AR: 'المذهب الشافعي (الإمام الشافعي رحمه الله)',
    }[lang],
    sub: {
      EN: 'Single shadow for Asr; predominant in Egypt, Yemen, Malaysia, Indonesia & East Africa',
      UR: 'عصر مثل اول، مصر، یمن، ملیشیا، انڈونیشیا',
      AR: 'مثل واحد للعصر، سائد في مصر واليمن وجنوب شرق آسيا',
    }[lang],
  },
  {
    id: 'MALIKI' as const,
    title: {
      EN: 'Maliki (Imam Malik ibn Anas)',
      UR: 'فقہِ مالکی (امام دار الہجرۃ مالک بن انس رحمہ اللہ)',
      AR: 'المذهب المالكي (الإمام مالك رحمه الله)',
    }[lang],
    sub: {
      EN: 'Practice of the people of Medina; North & West Africa, Sudan and the Maghreb',
      UR: 'عمل اہل مدینہ، شمالی و مغربی افریقہ',
      AR: 'عمل أهل المدينة، سائد في شمال وغرب إفريقيا والخليج',
    }[lang],
  },
  {
    id: 'HANBALI' as const,
    title: {
      EN: 'Hanbali (Imam Ahmad ibn Hanbal)',
      UR: 'فقہِ حنبلی (امام احمد بن حنبل رحمہ اللہ)',
      AR: 'المذهب الحنبلي (الإمام أحمد رحمه الله)',
    }[lang],
    sub: {
      EN: 'Strict Hadith adherence; predominant across the Arabian Peninsula & Gulf',
      UR: 'اتباعِ سنت، خلیج و جزیرہ عرب',
      AR: 'اتباع الأثر والدليل، سائد في شبه الجزيرة العربية',
    }[lang],
  },
  {
    id: 'GENERAL_UMMAH' as const,
    title: {
      EN: 'General Ummah (Sawad al-A\'zam)',
      UR: 'سوادِ اعظم عمومی رہنمائی (General Ummah)',
      AR: 'السواد الأعظم (جمهور الأمة)',
    }[lang],
    sub: {
      EN: 'Consensus rulings agreed upon across all 4 traditional Sunni schools',
      UR: 'چاروں ائمہ کا متفقہ دائرہ',
      AR: 'المسائل المتفق عليها بين أئمة أهل السنة والجماعة',
    }[lang],
  },
];

export const getFocusOptionsList = (lang: SupportedLanguage) => [
  {
    id: 'SALAH_DISCIPLINE' as const,
    icon: '🕌',
    title: {
      EN: 'Salah Discipline & Khushu\'',
      UR: 'نماز کی پابندی و خشوع',
      AR: 'المحافظة على الصلاة والخشوع',
    }[lang],
    desc: {
      EN: 'Prayer punctuality & quiet mosque presence',
      UR: 'بروقت ادائے نماز اور قلبی سکون',
      AR: 'أداء الصلوات في أوقاتها بحضور قلب',
    }[lang],
  },
  {
    id: 'QURAN_TADABBUR' as const,
    icon: '📖',
    title: {
      EN: 'Quran Recitation & Reflection',
      UR: 'قرآن فہمی و تلاوت',
      AR: 'تلاوة القرآن وتدبر آياته',
    }[lang],
    desc: {
      EN: 'Daily recitation, tajweed & contemplation',
      UR: 'روزانہ تلاوت اور تدبرِ آیات',
      AR: 'ورد قرآني يومي وتدبر المعاني',
    }[lang],
  },
  {
    id: 'AKHLAQ_CHARACTER' as const,
    icon: '🌱',
    title: {
      EN: 'Prophetic Akhlaq & Softness',
      UR: 'حسنِ اخلاق و گھریلو نرمی',
      AR: 'حسن الخلق وبر الوالدين',
    }[lang],
    desc: {
      EN: 'Patience, honoring parents & family mercy',
      UR: 'صبر، والدین کی خدمت اور نرم گفتگو',
      AR: 'الصبر، ولين الجانب، وصلة الرحم',
    }[lang],
  },
  {
    id: 'HALAL_LIVELIHOOD' as const,
    icon: '💼',
    title: {
      EN: 'Halal Earnings & Barakah',
      UR: 'حلال کمائی و مالی برکت',
      AR: 'الرزق الحلال والبركة المالية',
    }[lang],
    desc: {
      EN: 'Ethical trade, debt clearance & Zakat',
      UR: 'رزقِ حلال، ادائے قرض اور مال میں برکت',
      AR: 'التجارة الأمينة، قضاء الديون والزكاة',
    }[lang],
  },
];

export const getTimeOptionsList = (lang: SupportedLanguage) => [
  {
    id: '5_MINS' as const,
    title: {
      EN: '5 Minutes / Day (Gentle Start)',
      UR: '۵ منٹ روزانہ (آسان آغاز)',
      AR: '٥ دقائق يومياً (بداية ميسرة)',
    }[lang],
    sub: {
      EN: 'Post-Salah masnoon dhikr and 1 gentle daily micro-amal.',
      UR: 'صرف ۱ چھوٹا عمل اور نماز کے بعد کا مسنون ذکر۔',
      AR: 'أذكار ما بعد الصلاة وعمل إيماني يسير يومياً.',
    }[lang],
  },
  {
    id: '15_MINS' as const,
    title: {
      EN: '15 Minutes / Day (Steady Routine)',
      UR: '۱۵ منٹ روزانہ (مستقل معمول)',
      AR: '١٥ دقيقة يومياً (ورد ثابت)',
    }[lang],
    sub: {
      EN: 'Salah azkar, short Quran portion, and daily heart-felt du\'a.',
      UR: 'نماز کے اذکار، تلاوت کی چھوٹی مقدار اور روزانہ دعا۔',
      AR: 'أذكار الصلوات، تلاوة حزب يومي، ودعاء اليوم.',
    }[lang],
  },
  {
    id: '30_PLUS_MINS' as const,
    title: {
      EN: '30+ Minutes / Day (Deep Seeker)',
      UR: '۳۰+ منٹ روزانہ (طالبِ علم)',
      AR: '٣٠+ دقيقة يومياً (طالب علم)',
    }[lang],
    sub: {
      EN: 'Tajweed practice, Sirah masterclasses, and structured ilm.',
      UR: 'تجوید کی مشق، سیرت النبی ﷺ کا مطالعہ اور علمی سفر۔',
      AR: 'إتقان التجويد، دراسة السيرة، والاستزادة من العلوم الشرعية.',
    }[lang],
  },
];
