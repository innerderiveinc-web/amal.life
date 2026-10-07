export type SupportedLanguage = 'en' | 'ur' | 'ar' | 'hi';

export interface TranslationDictionary {
  welcome: string;
  tagline: string;
  subGreeting: string;
  nextPrayer: string;
  todayAmal: string;
  activeJourney: string;
  calmMuhasabah: string;
  askAmal: string;
  askSubtitle: string;
  learnTab: string;
  amalTab: string;
  meTab: string;
  todayTab: string;
  offlineNotice: string;
  privacyAssured: string;
  scholarEscalationTitle: string;
  scholarEscalationDesc: string;
  citationsVerified: string;
  propheticEaseQuote: string;
  markDone: string;
  markPartial: string;
  snooze: string;
  skip: string;
}

export const Translations: Record<SupportedLanguage, TranslationDictionary> = {
  en: {
    welcome: 'Welcome to AMAL',
    tagline: 'From Niyyah to Amal',
    subGreeting: 'A calm operating system for your Muslim life.',
    nextPrayer: 'NEXT PRAYER',
    todayAmal: "TODAY'S AMAL",
    activeJourney: 'ACTIVE JOURNEY',
    calmMuhasabah: 'CALM MUHASABAH',
    askAmal: 'Ask AMAL',
    askSubtitle: 'Grounded in verified Islamic sources · No autonomous fatwas',
    learnTab: 'Learn',
    amalTab: 'Amal',
    meTab: 'Me',
    todayTab: 'Today',
    offlineNotice: 'Offline Mode: Your reflections and actions are saved locally and will sync seamlessly.',
    privacyAssured: 'Saved privately in your personal vault. Isolated from family & external prompts.',
    scholarEscalationTitle: 'Scholar Review Required',
    scholarEscalationDesc: 'This question involves personal legal rulings (Fiqh). AI does not issue independent fatwas. A structured case has been prepared for qualified scholar review.',
    citationsVerified: '✓ Citations Verified by Knowledge Graph',
    propheticEaseQuote: 'Indeed, this religion is easy, and no one overburdens himself except that it will overcome him. (Sahih al-Bukhari 39)',
    markDone: 'Mark as Done',
    markPartial: 'Completed in Part',
    snooze: 'Snooze for Later',
    skip: 'Gently Skip',
  },
  ur: {
    welcome: 'عمل میں خوش آمدید',
    tagline: 'نیت سے عمل تک',
    subGreeting: 'آپ کی اسلامی زندگی کا پرسکون نظام۔',
    nextPrayer: 'اگلی نماز',
    todayAmal: 'آج کا عمل',
    activeJourney: 'جاری سفر',
    calmMuhasabah: 'پرسکون محاسبہ',
    askAmal: 'عمل سے پوچھیں',
    askSubtitle: 'مصدقہ اسلامی مآخذ پر مبنی · خود مختار فتویٰ کے بغیر',
    learnTab: 'علم',
    amalTab: 'عمل',
    meTab: 'میری پروفائل',
    todayTab: 'آج',
    offlineNotice: 'آف لائن موڈ: آپ کے اعمال اور عکاسی مقامی طور پر محفوظ ہیں اور بعد میں مطابقت پذیر ہو جائیں گے۔',
    privacyAssured: 'آپ کی ذاتی والٹ میں محفوظ۔ خاندانی یا بیرونی پرامپٹس سے مکمل الگ۔',
    scholarEscalationTitle: 'علمائے کرام سے رجوع درکار ہے',
    scholarEscalationDesc: 'یہ معاملہ ذاتی فقہی نوعیت کا ہے۔ اے آئی خود مختار فتویٰ جاری نہیں کرتا۔ یہ سوال مستند علماء کے لیے تیار کیا گیا ہے۔',
    citationsVerified: '✓ مصدقہ اسلامی حوالہ جات',
    propheticEaseQuote: 'بیشک یہ دین آسان ہے، اور جو کوئی اس میں سختی برتے گا، دین اس پر غالب آ جائے گا۔ (صحیح بخاری ۳۹)',
    markDone: 'مکمل ہوا',
    markPartial: 'جزوی تکمیل',
    snooze: 'بعد کے لیے موخر',
    skip: 'آج چھوڑ دیں',
  },
  ar: {
    welcome: 'مرحبًا بك في عَمَل',
    tagline: 'من النية إلى العمل',
    subGreeting: 'نظام تشغيل هادئ لحياتك الإسلامية.',
    nextPrayer: 'الصلاة القادمة',
    todayAmal: 'عمل اليوم',
    activeJourney: 'الرحلة النشطة',
    calmMuhasabah: 'محاسبة النفس الهادئة',
    askAmal: 'اسأل عَمَل',
    askSubtitle: 'مستند إلى مصادر إسلامية موثوقة · دون فتاوى تلقائية',
    learnTab: 'تعلّم',
    amalTab: 'عَمَل',
    meTab: 'حسابي',
    todayTab: 'اليوم',
    offlineNotice: 'وضع عدم الاتصال: يتم حفظ تأملاتك وأعمالك محليًا وستتم مزامنتها لاحقًا.',
    privacyAssured: 'محفوظ بخصوصية تامة في خزينتك الشخصية.',
    scholarEscalationTitle: 'يتطلب مراجعة العالم',
    scholarEscalationDesc: 'تتطلب هذه المسألة حكمًا فقهيًا خاصًا. الذكاء الاصطناعي لا يصدر فتاوى مستقلة، وتم تجهيز السؤال للمراجعة الشرعية.',
    citationsVerified: '✓ تم التحقق من المراجع الشرعية',
    propheticEaseQuote: 'إن هذا الدين يسر ولن يشاد الدين أحد إلا غلبه (صحيح البخاري ٣٩)',
    markDone: 'تم الإنجاز',
    markPartial: 'إنجاز جزئي',
    snooze: 'تأجيل لوقت لاحق',
    skip: 'تخطي برفق',
  },
  hi: {
    welcome: 'अमल में आपका स्वागत है',
    tagline: 'निय्यत से अमल तक',
    subGreeting: 'आपके इस्लामी जीवन का एक शांत ऑपरेटिंग सिस्टम।',
    nextPrayer: 'अगली नमाज़',
    todayAmal: 'आज का अमल',
    activeJourney: 'सक्रिय यात्रा',
    calmMuhasabah: 'शांत मुहासिबा',
    askAmal: 'अमल से पूछें',
    askSubtitle: 'सत्यापित इस्लामी स्रोतों पर आधारित · बिना फतवे के',
    learnTab: 'ज्ञान',
    amalTab: 'अमल',
    meTab: 'प्रोफ़ाइल',
    todayTab: 'आज',
    offlineNotice: 'ऑफ़लाइन मोड: आपके विचार और अमल सुरक्षित हैं और ऑनलाइन होने पर सिंक हो जाएंगे।',
    privacyAssured: 'आपकी निजी तिजोरी में पूरी तरह सुरक्षित।',
    scholarEscalationTitle: 'आलिम की समीक्षा आवश्यक',
    scholarEscalationDesc: 'यह मामला व्यक्तिगत फ़िक़्ह से जुड़ा है। एआई सीधे फ़तवे जारी नहीं करता। यह सवाल योग्य विद्वान के लिए तैयार किया गया है।',
    citationsVerified: '✓ सत्यापित इस्लामी संदर्भ',
    propheticEaseQuote: 'बेशक यह दीन आसान है, और जो कोई इसमें सख़्ती करेगा, दीन उस पर ग़ालिब आ जाएगा। (सहीह बुख़ारी 39)',
    markDone: 'पूरा किया',
    markPartial: 'आंशिक रूप से पूरा',
    snooze: 'बाद के लिए स्थगित',
    skip: 'शांत भाव से छोड़ें',
  },
};

export function isRTL(lang: SupportedLanguage): boolean {
  return lang === 'ar' || lang === 'ur';
}

export function t(lang: SupportedLanguage, key: keyof TranslationDictionary): string {
  const dict = Translations[lang] || Translations.en;
  return dict[key] || Translations.en[key];
}
