/**
 * AMAL OS — Multi-Language Localization & RTL Typography Engine
 * 
 * Supports:
 * - English (en - LTR)
 * - Urdu (ur - RTL with Nastaliq aesthetic)
 * - Arabic (ar - RTL with Classical Naskh aesthetic)
 * 
 * Provides translation dictionaries, font family bindings, text direction management,
 * and pluralization/number formatting.
 */

export type SupportedLanguage = 'en' | 'ur' | 'ar';
export type TextDirection = 'ltr' | 'rtl';

export interface LanguageMeta {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  direction: TextDirection;
  fontFamily: string;
}

export const SUPPORTED_LANGUAGES: Record<SupportedLanguage, LanguageMeta> = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    direction: 'ltr',
    fontFamily: 'Inter, system-ui, sans-serif',
  },
  ur: {
    code: 'ur',
    name: 'Urdu',
    nativeName: 'اردو',
    direction: 'rtl',
    fontFamily: '"Jameel Noori Nastaleeq", "Noto Nastaliq Urdu", "PakType Naskh", serif',
  },
  ar: {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    direction: 'rtl',
    fontFamily: '"Amiri", "Traditional Arabic", "Noto Naskh Arabic", serif',
  },
};

export const UI_TRANSLATIONS: Record<SupportedLanguage, Record<string, string>> = {
  en: {
    // Navigation & Common
    'nav.home': 'Dashboard',
    'nav.ask': 'Ask Scholar AI',
    'nav.library': 'Canonical Library',
    'nav.sirah': 'Prophetic Life Graph',
    'nav.prayer': 'Prayer & Qibla',
    'nav.calculator': 'Zakat & Miras',
    'nav.audio': 'Audio & Recitations',
    'nav.calendar': 'Hijri Calendar',
    'nav.journeys': 'Daily Amal',
    'nav.goals': 'Spiritual Goals',
    'nav.privacy': 'Privacy & Vault',

    // App Header & Taglines
    'app.title': 'AMAL OS',
    'app.subtitle': 'From Niyyah to Amal — Muslim Life Intelligence Platform',
    'app.sawad_azam_badge': '100% Sawad al-A’zam Heritage',
    'app.dual_jurist_badge': 'Two-Scholar Governance (INV_07)',

    // Prayers
    'prayer.fajr': 'Fajr',
    'prayer.sunrise': 'Sunrise',
    'prayer.dhuhr': 'Dhuhr',
    'prayer.asr': 'Asr',
    'prayer.maghrib': 'Maghrib',
    'prayer.isha': 'Isha',
    'prayer.qiyam': 'Tahajjud (Qiyam)',
    'prayer.qibla_bearing': 'Qibla Direction',
    'prayer.next_prayer': 'Next Prayer',
    'prayer.time_remaining': 'Time Remaining',

    // Zakat & Miras
    'zakat.title': 'Zakat Calculator',
    'zakat.calculate': 'Calculate Zakat',
    'zakat.nisab': 'Nisab Threshold',
    'zakat.due': 'Zakat Due (2.5%)',
    'miras.title': 'Miras (Inheritance) Calculator',
    'miras.estate_value': 'Total Estate Value',
    'miras.calculate': 'Distribute Shares',

    // Audio
    'audio.title': 'Recitations & Audiobooks',
    'audio.play': 'Play',
    'audio.pause': 'Pause',
    'audio.quran': 'Holy Quran Recitation',
    'audio.shamail': 'Shama’il al-Muhammadiyyah Audio',

    // Library & Sirah
    'library.title': '76-Book Canonical Heritage Library',
    'library.filter_discipline': 'Filter by Discipline',
    'library.search_placeholder': 'Search by title, author, or discipline...',
    'sirah.title': 'Prophetic Life Graph & Shama’il',
    'sirah.timeline': 'Chronological Prophetic Timeline',
    'sirah.traits': 'Blessed Shama’il Traits',
  },
  ur: {
    // Navigation & Common
    'nav.home': 'ڈیش بورڈ',
    'nav.ask': 'اسکالر اے آئی سے پوچھیں',
    'nav.library': 'کتب خانہ (مستند لائبریری)',
    'nav.sirah': 'سیرت النبی و شمائل گراف',
    'nav.prayer': 'نماز کے اوقات و قبلہ',
    'nav.calculator': 'زکوٰۃ و وراثت کیلکولیٹر',
    'nav.audio': 'تلاوت و آڈیو بکس',
    'nav.calendar': 'ہجری کیلنڈر و مسنون روزے',
    'nav.journeys': 'روزمرہ اعمال',
    'nav.goals': 'روحانی اہداف',
    'nav.privacy': 'محفوظ پرائیویسی والٹ',

    // App Header & Taglines
    'app.title': 'عمل او ایس',
    'app.subtitle': 'نیت سے عمل تک — مستند اسلامی لائف انٹیلی جنس',
    'app.sawad_azam_badge': '۱۰۰٪ سوادِ اعظم اہلسنت والجماعت',
    'app.dual_jurist_badge': 'دو مفتیانِ کرام کی نگرانی (INV_07)',

    // Prayers
    'prayer.fajr': 'فجر',
    'prayer.sunrise': 'طلوعِ آفتاب',
    'prayer.dhuhr': 'ظہر',
    'prayer.asr': 'عصر',
    'prayer.maghrib': 'مغرب',
    'prayer.isha': 'عشاء',
    'prayer.qiyam': 'تہجد (قیام اللیل)',
    'prayer.qibla_bearing': 'سمتِ قبلہ',
    'prayer.next_prayer': 'اگلی نماز',
    'prayer.time_remaining': 'باقی وقت',

    // Zakat & Miras
    'zakat.title': 'زکوٰۃ کیلکولیٹر',
    'zakat.calculate': 'زکوٰۃ کا حساب لگائیں',
    'zakat.nisab': 'نصاب کی مالیت',
    'zakat.due': 'واجب الادا زکوٰۃ (۲.۵٪)',
    'miras.title': 'میراث و شرعی تقسیمِ ترکہ',
    'miras.estate_value': 'کل جائیداد / ترکہ',
    'miras.calculate': 'شرعی حصص تقسیم کریں',

    // Audio
    'audio.title': 'تلاوتِ قرآن و آڈیو بکس',
    'audio.play': 'چلائیں',
    'audio.pause': 'روکیں',
    'audio.quran': 'قرآنِ مجید کی تجوید کے ساتھ تلاوت',
    'audio.shamail': 'شمائلِ محمدیہ آڈیو ابواب',

    // Library & Sirah
    'library.title': '۷۶ مستند کتبِ اسلاف کا کتب خانہ',
    'library.filter_discipline': 'شعبہ علم کے لحاظ سے تلاش',
    'library.search_placeholder': 'کتاب، مصنف یا موضوع تلاش کریں...',
    'sirah.title': 'سیرت النبی ﷺ و شمائلِ مبارکہ',
    'sirah.timeline': 'تاریخی و زمانی سیرت ٹائم لائن',
    'sirah.traits': 'حضور ﷺ کی صفات و اخلاقِ حسنہ',
  },
  ar: {
    // Navigation & Common
    'nav.home': 'لوحة التحكم',
    'nav.ask': 'اسأل الذكاء الشرعي',
    'nav.library': 'المكتبة التراثية المعتمدة',
    'nav.sirah': 'الرسم البياني للسيرة والشمائل',
    'nav.prayer': 'مواقيت الصلاة والقبلة',
    'nav.calculator': 'حاسبة الزكاة والمواريث',
    'nav.audio': 'التلاوات والكتب الصوتية',
    'nav.calendar': 'التقويم الهجري والصيام',
    'nav.journeys': 'الأوراد والأعمال اليومية',
    'nav.goals': 'المقاصد والنيات',
    'nav.privacy': 'خزانة الخصوصية التامة',

    // App Header & Taglines
    'app.title': 'نظام عمل (AMAL OS)',
    'app.subtitle': 'من النية إلى العمل — منظومة الذكاء الحياتي الإسلامي',
    'app.sawad_azam_badge': 'منهج السواد الأعظم وأهل السنة',
    'app.dual_jurist_badge': 'حوكمة الفقيهين المعتمدة (INV_07)',

    // Prayers
    'prayer.fajr': 'الفجر',
    'prayer.sunrise': 'الشروق',
    'prayer.dhuhr': 'الظهر',
    'prayer.asr': 'العصر',
    'prayer.maghrib': 'المغرب',
    'prayer.isha': 'العشاء',
    'prayer.qiyam': 'قيام الليل (التهجد)',
    'prayer.qibla_bearing': 'اتجاه القبلة',
    'prayer.next_prayer': 'الصلاة القادمة',
    'prayer.time_remaining': 'الوقت المتبقي',

    // Zakat & Miras
    'zakat.title': 'حاسبة الزكاة الشرعية',
    'zakat.calculate': 'احسب الزكاة الواجبة',
    'zakat.nisab': 'قيمة النصاب الشرعي',
    'zakat.due': 'الزكاة الواجبة (٢.٥٪)',
    'miras.title': 'حاسبة المواريث والفرائض',
    'miras.estate_value': 'إجمالي قيمة التركة',
    'miras.calculate': 'توزيع السهام والفرائض',

    // Audio
    'audio.title': 'التلاوات والكتب المسموعة',
    'audio.play': 'تشغيل',
    'audio.pause': 'إيقاف',
    'audio.quran': 'تلاوات القرآن الكريم برواية حفص',
    'audio.shamail': 'الشمائل المحمدية للإمام الترمذي',

    // Library & Sirah
    'library.title': 'المكتبة الجامعة لـ ٧٦ أمّاً من أمهات الكتب',
    'library.filter_discipline': 'تصفية حسب الفن العلمي',
    'library.search_placeholder': 'ابحث في العنوان أو المؤلف أو الفن...',
    'sirah.title': 'الرسم البياني للسيرة العطرة والشمائل',
    'sirah.timeline': 'الخط الزمني للسيرة النبوية',
    'sirah.traits': 'الشمائل والأخلاق المحمدية',
  },
};

export class LocalizationEngine {
  private currentLanguage: SupportedLanguage = 'en';

  public setLanguage(lang: SupportedLanguage): void {
    if (SUPPORTED_LANGUAGES[lang]) {
      this.currentLanguage = lang;
    }
  }

  public getLanguage(): SupportedLanguage {
    return this.currentLanguage;
  }

  public getMeta(): LanguageMeta {
    return SUPPORTED_LANGUAGES[this.currentLanguage];
  }

  public t(key: string): string {
    const dict = UI_TRANSLATIONS[this.currentLanguage];
    if (dict && dict[key]) {
      return dict[key];
    }
    // Fallback to English
    return UI_TRANSLATIONS.en[key] || key;
  }
}

export const localizationEngine = new LocalizationEngine();
