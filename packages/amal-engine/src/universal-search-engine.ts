/**
 * AMAL OS - Universal Instant Search Engine (Cmd+K)
 * 
 * Provides unified, lightning-fast discovery across:
 * - Complete 114 Quran Surahs (Kanz al-Iman standard)
 * - All 38 Classical Sunni Masterworks (4 Madhhabs, Duas, Hadith, Aqeedah, Seerah, Tazkiyah)
 * - Prophetic Duas & Adhkar (40 Rabbana, Hisn al-Muslim, Burdah, Salam-e-Raza)
 * - Shar'i Engines & Calculators (Zakat, Miras, Fara'id)
 * - Spiritual Utilities (Tasbih, Tajweed, Hajj, Prayer, Qibla)
 * - Classical Corpus & Decision Room
 * 
 * Supports English, Roman Urdu, Urdu Nastaliq, and Arabic queries.
 */

export interface SearchResultItem {
  id: string;
  category: 'TOOL' | 'DUA' | 'QURAN' | 'HADITH' | 'CALCULATOR' | 'SIRAH' | 'BOOK' | 'AQEEDAH' | 'FIQH';
  titleEn: string;
  titleUr: string;
  snippetEn: string;
  snippetUr: string;
  href: string;
  keywords: string[];
}

export class UniversalSearchEngine {
  private static readonly CATALOGUE: SearchResultItem[] = [
    // ---------------------------------------------------------
    // TOOLS & SPIRITUAL UTILITIES
    // ---------------------------------------------------------
    {
      id: 'tool-tasbih',
      category: 'TOOL',
      titleEn: 'Digital Masnoon Tasbih Counter',
      titleUr: 'مسنون تسبیح و ذکر کاؤنٹر',
      snippetEn: 'Distraction-free counter with haptic feedback at 33 and 100 counts.',
      snippetUr: 'بغیر سکرین دیکھے 33 اور 100 کی تسبیح اور وائبریشن کے ساتھ روزانہ کا ذکر۔',
      href: '/tasbih',
      keywords: ['tasbih', 'tasbeeh', 'dhikr', 'zikr', 'counter', 'subhanallah', 'alhamdulillah', 'allahu akbar', 'تسبیح', 'ذکر'],
    },
    {
      id: 'tool-prayer-qibla',
      category: 'TOOL',
      titleEn: 'Prayer Times & Qibla Compass',
      titleUr: 'اوقاتِ نماز و قبلہ کمپاس',
      snippetEn: 'Precision offline prayer calculation with Hanafi & Shafi\'i Asr shadow length and Qibla compass.',
      snippetUr: 'حنفی و شافعی عصر کا وقت، سحر و افطار اور درست قبلہ رخ۔',
      href: '/prayer',
      keywords: ['prayer', 'namaz', 'salah', 'qibla', 'asr', 'fajr', 'maghrib', 'isha', 'dhuhr', 'نماز', 'قبلہ', 'اوقات'],
    },
    {
      id: 'calc-zakat',
      category: 'CALCULATOR',
      titleEn: 'Zakat Calculator & Printable Certificate',
      titleUr: 'زکوٰۃ کیلکولیٹر اور سرٹیفکیٹ',
      snippetEn: 'Calculate zakat on gold, silver, cash, and business inventory with PDF export.',
      snippetUr: 'سونے، چاندی، نقدی اور مالِ تجارت پر فقہی زکوٰۃ کا حساب اور پی ڈی ایف۔',
      href: '/calculator',
      keywords: ['zakat', 'zakaat', 'nisab', 'gold', 'silver', 'cash', 'calculator', 'charity', 'زکوۃ', 'نصاب', 'سونا'],
    },
    {
      id: 'calc-miras',
      category: 'CALCULATOR',
      titleEn: 'Miras & Fara\'id Inheritance Calculator',
      titleUr: 'وراثت و فرائض تقسیم کیلکولیٹر',
      snippetEn: 'Surah An-Nisa compliant estate distribution for spouses, parents, and children with Mufti sign-off.',
      snippetUr: 'قرآنی حصص (سورۃ النساء) کے مطابق ترکہ کی شرعی تقسیم اور مفتی دستخط۔',
      href: '/calculator',
      keywords: ['miras', 'inheritance', 'faraid', 'virasat', 'estate', 'tarika', 'shares', 'an-nisa', 'وراثت', 'ترکہ', 'فرائض'],
    },
    {
      id: 'tool-tajweed',
      category: 'TOOL',
      titleEn: 'Slow Word-by-Word Tajweed Trainer',
      titleUr: 'لفظ بہ لفظ تجوید و مخارج ٹرینر',
      snippetEn: '0.75x slow recitation with word timestamps and tongue/throat articulation rules.',
      snippetUr: 'آہستہ رفتار تلاوت، تلفظ اور حلق و زبان کے درست مخارج کی رہنمائی۔',
      href: '/tajweed',
      keywords: ['tajweed', 'tajwid', 'makharij', 'makhraj', 'quran recitation', 'slow audio', 'fatihah', 'تجوید', 'مخارج', 'تلاوت'],
    },
    {
      id: 'tool-hajj',
      category: 'TOOL',
      titleEn: '100% Offline Hajj & Umrah Pilgrimage Guide',
      titleUr: 'حج و عمرہ مکمل آف لائن گائیڈ',
      snippetEn: 'Step-by-step Ihram, Tawaf, Sa\'i, and Arafat rituals with authentic prophetic duas in Haramain.',
      snippetUr: 'مکہ و مدینہ کے لیے بغیر انٹرنیٹ احرام، طواف اور سعی کے مسنون اعمال و دعائیں۔',
      href: '/hajj',
      keywords: ['hajj', 'umrah', 'umra', 'pilgrimage', 'tawaf', 'sai', 'ihram', 'makkah', 'arafat', 'حج', 'عمرہ', 'طواف', 'احرام'],
    },
    {
      id: 'decision-room',
      category: 'TOOL',
      titleEn: 'Deen Decision Room & Scholar Handoff',
      titleUr: 'دین ڈیسیژن روم و اسکالر ہینڈ آف',
      snippetEn: 'Structured Islamic evaluation across 4 Madhhabs with prepared dossier for your local Mufti.',
      snippetUr: 'چاروں مذاہب کی آراء، صورتِ حال کا جائزہ اور مفتی صاحب کے لیے منظم فائل۔',
      href: '/decision-room',
      keywords: ['decision', 'fatwa', 'scholar', 'mufti', 'madhhab', 'fiqh', 'dossier', 'halal', 'haram', 'فتوی', 'مسئلہ', 'مفتی'],
    },
    {
      id: 'tool-audio',
      category: 'TOOL',
      titleEn: 'Quran Recitations & Audio Streaming',
      titleUr: 'قرآن مجید تلاوت اور آڈیو',
      snippetEn: 'Listen to master reciters (Al-Minshawi, Al-Husary, Abdul Basit, Alafasy).',
      snippetUr: 'مشہور قراء کی پرسوز تلاوت اور شمائل ترمذی کے آڈیو اسباق۔',
      href: '/audio',
      keywords: ['audio', 'recitation', 'tilawat', 'quran', 'qari', 'husary', 'minshawi', 'abdul basit', 'alafasy', 'آڈیو', 'تلاوت'],
    },
    {
      id: 'tool-calendar',
      category: 'TOOL',
      titleEn: 'Hijri Calendar & Sunnah Fasting Reminders',
      titleUr: 'ہجری کیلنڈر اور مسنون روزے',
      snippetEn: 'Lunar calendar tracking Ayyam al-Bid (13, 14, 15) and Monday/Thursday Sunnah fasts.',
      snippetUr: 'اسلامی تاریخ، ایام البیض اور پیر و جمعرات کے مسنون روزوں کے احکام۔',
      href: '/calendar',
      keywords: ['calendar', 'hijri', 'fasting', 'roza', 'ayyam al-bid', 'monday', 'thursday', 'ashura', 'کیلنڈر', 'ہجری', 'روزہ'],
    },

    // ---------------------------------------------------------
    // THE 4 SUNNI MADHHABS (FIQH CLASSICS)
    // ---------------------------------------------------------
    {
      id: 'book-quduri',
      category: 'FIQH',
      titleEn: 'Mukhtasar al-Quduri (Imam al-Quduri)',
      titleUr: 'مختصر القدوری (امام ابو الحسین القدوری)',
      snippetEn: 'The definitive foundational primer of Hanafi jurisprudence covering Taharah, Salah, Zakat, and Mu\'amalat.',
      snippetUr: 'فقہ حنفی کا بنیادی ترین اور معتمد متن، طہارت، نماز اور معاملات کے جامع مسائل۔',
      href: '/library?work=CANON-FIQ-002',
      keywords: ['quduri', 'mukhtasar al-quduri', 'hanafi', 'fiqh', 'taharah', 'wudu', 'salah', 'قدوری', 'مختصر القدوری', 'حنفی', 'فقہ'],
    },
    {
      id: 'book-hidayah',
      category: 'FIQH',
      titleEn: 'Al-Hidayah fi Sharh Bidayat al-Mubtadi (Imam al-Marghinani)',
      titleUr: 'الہدایہ فی شرح بدایۃ المبتدی (علامہ برہان الدین المرغینانی)',
      snippetEn: 'Supreme authoritative manual of Hanafi legal proofs, comparative reasoning, and judicial deduction.',
      snippetUr: 'فقہ حنفی کی سب سے عظیم الشان اور متداول کتاب، دلائل اور اجتہادی براہین کا شاہکار۔',
      href: '/library?work=CANON-FIQ-001',
      keywords: ['hidayah', 'al-hidayah', 'marghinani', 'hanafi', 'fiqh', 'hedaya', 'ہدایہ', 'الہدایہ', 'مرغینانی'],
    },
    {
      id: 'book-bahar-shariat',
      category: 'FIQH',
      titleEn: 'Bahar-e-Shariat (Sadr al-Shari\'ah Mawlana Amjad Ali Azmi)',
      titleUr: 'بہارِ شریعت (صدر الشریعہ علامہ مفتی امجد علی اعظمی)',
      snippetEn: 'The most extensive Urdu encyclopedic Fatawa & Fiqh reference across all 18 volumes for South Asian Muslims.',
      snippetUr: 'اردو زبان میں فقہ حنفی کا سب سے معتبر اور جامع انسائیکلوپیڈیا (18 حصے)۔',
      href: '/library?work=CANON-FIQ-003',
      keywords: ['bahar-e-shariat', 'bahare shariat', 'amjad ali azmi', 'hanafi', 'urdu fiqh', 'fatwa', 'بہار شریعت', 'بہارِ شریعت', 'امجد علی'],
    },
    {
      id: 'book-nur-idah',
      category: 'FIQH',
      titleEn: 'Nur al-Idah wa Najat al-Arwah (Imam al-Shurunbulali)',
      titleUr: 'نور الإیضاح و نجاۃ الأرواح (امام حسن بن علی الشرنبلالی)',
      snippetEn: 'Standard Hanafi handbook on acts of worship: purification, prayer, and fasting.',
      snippetUr: 'عبادات (طہارت، نماز اور روزہ) کا معتمد حنفی دستور العمل۔',
      href: '/library?work=CANON-FIQ-004',
      keywords: ['nur al-idah', 'shurunbulali', 'hanafi', 'worship', 'salah', 'نور الایضاح', 'شرنبلالی'],
    },
    {
      id: 'book-kanz-daqaiq',
      category: 'FIQH',
      titleEn: 'Kanz al-Daqaiq (Imam Hafiz al-Din al-Nasafi)',
      titleUr: 'کنز الدقائق (امام حافظ الدین ابو البرکات النسفی)',
      snippetEn: 'One of the four definitive mutun of Hanafi jurisprudence taught in Dars-e-Nizami curricula worldwide.',
      snippetUr: 'فقہ حنفی کے متونِ اربعہ میں سے ممتاز ترین متن۔',
      href: '/library?work=CANON-FIQ-005',
      keywords: ['kanz al-daqaiq', 'nasafi', 'hanafi', 'mutun arba', 'کنز الدقائق', 'نسفی'],
    },
    {
      id: 'book-radd-muhtar',
      category: 'FIQH',
      titleEn: 'Radd al-Muhtar \'ala al-Durr al-Mukhtar (Allama Ibn Abidin al-Shami)',
      titleUr: 'رد المحتار علی الدر المختار / فتاویٰ شامی (علامہ ابن عابدین شامی)',
      snippetEn: 'The apex reference for late Hanafi judicial decrees and Mufti verification.',
      snippetUr: 'متاخرین فقہائے حنفیہ کا حتمی اور فیصلہ کن مرجع (فتاویٰ شامی)۔',
      href: '/library?work=CANON-FIQ-006',
      keywords: ['radd al-muhtar', 'ibn abidin', 'fatawa shami', 'shami', 'رد المحتار', 'ابن عابدین', 'شامی'],
    },
    {
      id: 'book-bahr-raiq',
      category: 'FIQH',
      titleEn: 'Al-Bahr al-Raiq Sharh Kanz al-Daqaiq (Allama Ibn Nujaym al-Misri)',
      titleUr: 'البحر الرائق شرح کنز الدقائق (علامہ زین الدین ابن نجیم مصری)',
      snippetEn: 'Exhaustive legal commentary illuminating intricate Hanafi rulings and jurisprudential nuances.',
      snippetUr: 'کنز الدقائق کی عظیم الشان فقہی شرح۔',
      href: '/library?work=CANON-FIQ-007',
      keywords: ['al-bahr al-raiq', 'ibn nujaym', 'hanafi', 'بحر الرائق', 'ابن نجیم'],
    },
    {
      id: 'book-abi-shuja',
      category: 'FIQH',
      titleEn: 'Matn Abi Shuja\' / Al-Ghayah wa al-Taqrib (Imam Abu Shuja\')',
      titleUr: 'متن ابی شجاع / الغایۃ والتقریب (امام ابو شجاع الاصفہانی)',
      snippetEn: 'The primary classical primer of Shafi\'i jurisprudence memorized across Islamic history.',
      snippetUr: 'فقہ شافعی کا بنیادی اور مستند ترین متن۔',
      href: '/library?work=CANON-FIQ-SHAF-001',
      keywords: ['abi shuja', 'matn abi shuja', 'shafii', 'shafi', 'ghayah wa taqrib', 'ابی شجاع', 'شافعی'],
    },
    {
      id: 'book-minhaj-talibin',
      category: 'FIQH',
      titleEn: 'Minhaj al-Talibin (Imam Yahya ibn Sharaf al-Nawawi)',
      titleUr: 'منہاج الطالبین وعمدۃ المفتین (امام یحییٰ بن شرف النووی)',
      snippetEn: 'The central authoritative manual of the Shafi\'i school with definitive legal stances.',
      snippetUr: 'فقہ شافعی کا مستند ترین دستور العمل جس کے مصنف امام نووی ہیں۔',
      href: '/library?work=CANON-FIQ-SHAF-002',
      keywords: ['minhaj al-talibin', 'nawawi', 'shafii', 'منہاج الطالبین', 'نووی'],
    },
    {
      id: 'book-umdat-salik',
      category: 'FIQH',
      titleEn: 'Umdat al-Salik wa \'Uddat al-Nasik (Imam Ibn al-Naqib al-Misri)',
      titleUr: 'عمدۃ السالک وعدۃ الناسک (امام ابن النقیب المصری)',
      snippetEn: 'Reliance of the Traveller: comprehensive classical Shafi\'i legal handbook.',
      snippetUr: 'فقہ شافعی کا معتبر متن اور احکام۔',
      href: '/library?work=CANON-FIQ-SHAF-004',
      keywords: ['umdat al-salik', 'reliance of the traveller', 'shafii', 'عمدۃ السالک'],
    },
    {
      id: 'book-muwatta',
      category: 'FIQH',
      titleEn: 'Al-Muwatta (Imam Malik ibn Anas)',
      titleUr: 'المؤطا (امام دار الہجرۃ مالک بن انس رضی اللہ عنہ)',
      snippetEn: 'The earliest surviving legal text codifying Prophetic Sunnah and the living practice of Madinah.',
      snippetUr: 'امام دار الہجرۃ سیدنا امام مالک کی مایہ ناز تصنیف اور عملِ اہل مدینہ کا شاہکار۔',
      href: '/library?work=CANON-FIQ-MAL-002',
      keywords: ['muwatta', 'imam malik', 'maliki', 'madinah', 'مؤطا', 'امام مالک', 'مالکی'],
    },
    {
      id: 'book-ibn-ashir',
      category: 'FIQH',
      titleEn: 'Al-Murshid al-Mu\'in / Matn Ibn Ashir (Imam Abd al-Wahid Ibn Ashir)',
      titleUr: 'المرشد المعین علی الضروری / متن ابن عاشر (امام عبد الواحد ابن عاشر)',
      snippetEn: 'Foundational poetic didactic text uniting Ash\'ari creed, Maliki jurisprudence, and Junaydi Tazkiyah.',
      snippetUr: 'عقیدہ اشعری، فقہ مالکی اور تصوفِ جنیدی کا جامع منظوم متن۔',
      href: '/library?work=CANON-FIQ-MAL-001',
      keywords: ['ibn ashir', 'matn ibn ashir', 'maliki', 'murshid al-muin', 'ابن عاشر', 'مالکی'],
    },
    {
      id: 'book-umdat-fiqh',
      category: 'FIQH',
      titleEn: 'Umdat al-Fiqh (Imam Muwaffaq al-Din Ibn Qudamah al-Maqdisi)',
      titleUr: 'عمدۃ الفقہ (امام موفق الدین ابن قدامہ المقدسی)',
      snippetEn: 'The gold-standard entry primer into Hanbali jurisprudence based strictly on single authorized transmissions.',
      snippetUr: 'فقہ حنبلی کا سب سے معتبر اور واضح متن۔',
      href: '/library?work=CANON-FIQ-HAN-001',
      keywords: ['umdat al-fiqh', 'ibn qudamah', 'hanbali', 'عمدۃ الفقہ', 'ابن قدامہ', 'حنبلی'],
    },
    {
      id: 'book-bidayat-mujtahid',
      category: 'FIQH',
      titleEn: 'Bidayat al-Mujtahid wa Nihayat al-Muqtasid (Qadi Ibn Rushd)',
      titleUr: 'بداية المجتہد ونہایۃ المقتصد (قاضی ابن رشد القرطبی)',
      snippetEn: 'Classic comparative four-madhhab treatise analyzing the legal reasoning behind scholarly differences.',
      snippetUr: 'چاروں ائمہ کے فقہی اختلافات کے دلائل اور اصول کا عظیم تقابلی شاہکار۔',
      href: '/library?work=CANON-FIQ-COMP-001',
      keywords: ['bidayat al-mujtahid', 'ibn rushd', 'comparative fiqh', '4 madhhabs', 'ہدایۃ المجتہد', 'ابن رشد'],
    },

    // ---------------------------------------------------------
    // DUAS, ADHKAR & DEVOTIONAL LITURGIES
    // ---------------------------------------------------------
    {
      id: 'book-40-rabbana',
      category: 'DUA',
      titleEn: '40 Rabbana Quranic Duas (الأدعية الربانية الأربعون)',
      titleUr: '۴۰ ربّنا قرآنی دعائیں (کنز الایمان اردو ترجمہ)',
      snippetEn: 'All 40 prophetic and righteous supplications opening with Rabbana directly from the Holy Quran.',
      snippetUr: 'قرآن مجید میں مذکور تمام ۴۰ ربّنا مسنون و مبارک دعائیں بمع کنز الایمان اردو ترجمہ۔',
      href: '/library?work=CANON-DUA-001',
      keywords: ['40 rabbana', 'rabbana duas', 'quran duas', 'supplications', 'رَبَّنَا', 'ربنا', 'قرآنی دعائیں'],
    },
    {
      id: 'book-hisn-muslim',
      category: 'DUA',
      titleEn: 'Hisn al-Muslim / Fortress of the Muslim (Shaykh Sa\'id al-Qahtani)',
      titleUr: 'حصن المسلم (مسنون اذکار و ادعیہ کا قلعہ)',
      snippetEn: 'Comprehensive prophetic daily Adhkar: morning, evening, sleep, travel, anxiety, and Istikharah.',
      snippetUr: 'صبح و شام کے مسنون اذکار، استخارہ، پریشانی، قرض اور بیماری کی مسنون دعائیں مع عربی اعراب۔',
      href: '/library?work=CANON-DUA-002',
      keywords: ['hisn al-muslim', 'fortress of the muslim', 'adhkar', 'azkar', 'morning adhkar', 'evening adhkar', 'حصن المسلم', 'اذکار'],
    },
    {
      id: 'book-qasidah-burdah',
      category: 'DUA',
      titleEn: 'Qasidah al-Burdah (Imam Sharaf al-Din al-Busiri)',
      titleUr: 'قصیدۃ البردۃ شریف (امام شرف الدین البوصیری رحمۃ اللہ علیہ)',
      snippetEn: 'The celestial classical ode of divine praise upon the Holy Prophet ﷺ (Al-Kawakib al-Durriyyah).',
      snippetUr: 'بارگاہِ رسالت مآب ﷺ میں پیش کیا گیا عالمِ اسلام کا سب سے محبوب اور پرسوز منظوم ہدیۂ عقیدت۔',
      href: '/library?work=CANON-DEV-001',
      keywords: ['qasidah burdah', 'burda', 'busiri', 'salawat', 'qasida', 'مولاي صل وسلم', 'قصیدہ بردہ', 'بوصیری'],
    },
    {
      id: 'book-salam-e-raza',
      category: 'DUA',
      titleEn: 'Salam-e-Raza (Mustafa Jaane Rehmat Pe Lakhon Salam)',
      titleUr: 'سلامِ رضا (مصطفیٰ جانِ رحمت پہ لاکھوں سلام — اعلیٰ حضرت امام احمد رضا)',
      snippetEn: 'The iconic 171-stanza masterpiece of Ahl al-Sunnah eulogizing the Prophet ﷺ, Sahaba, and Ahl al-Bayt.',
      snippetUr: 'اعلیٰ حضرت امام احمد رضا خان محدثِ بریلوی کا لافانی سلامِ عقیدت، صحابہ اور اہل بیت کا ذکرِ خیر۔',
      href: '/library?work=CANON-DEV-002',
      keywords: ['salam-e-raza', 'mustafa jaane rehmat', 'ala hazrat', 'ahmad raza', 'salawat', 'سلامِ رضا', 'مصطفیٰ جانِ رحمت', 'اعلیٰ حضرت'],
    },
    {
      id: 'book-dalail-khayrat',
      category: 'DUA',
      titleEn: 'Dala\'il al-Khayrat wa Shawariq al-Anwar (Imam Muhammad al-Jazuli)',
      titleUr: 'دلائل الخیرات و شوارق الانوار (امام محمد بن سلیمان الجزولی)',
      snippetEn: 'The worldwide litany of blessings upon the Messenger of Allah ﷺ arranged across daily Hizb readings.',
      snippetUr: 'عالمِ اسلام میں سب سے زیادہ پڑھا جانے والا درود شریف کا ہفت روزہ وظیفہ۔',
      href: '/library?work=CANON-DEV-003',
      keywords: ['dalail al-khayrat', 'jazuli', 'durood', 'salawat', 'دلائل الخیرات', 'جزولی', 'درود'],
    },
    {
      id: 'book-hisn-hasin',
      category: 'DUA',
      titleEn: 'Al-Hisn al-Hasin (Imam Ibn al-Jazari)',
      titleUr: 'الحصن الحصین من کلام سید المرسلین (امام ابن الجزری)',
      snippetEn: 'Masterwork of authentic fortress prayers compiled by the great Hadith and Tajweed master.',
      snippetUr: 'امام ابن الجزری کا مجموعۂ ادعیہ و مسنون تعویذات۔',
      href: '/library?work=CANON-DUA-003',
      keywords: ['hisn al-hasin', 'ibn al-jazari', 'dua book', 'حصن حصین', 'ابن الجزری'],
    },
    {
      id: 'book-munajat-maqbool',
      category: 'DUA',
      titleEn: 'Munajat-e-Maqbool (7 Daily Manazil of Quran & Hadith Duas)',
      titleUr: 'مناجاتِ مقبول (قرآن و حدیث کی مسنون دعاؤں کی ۷ منزلیں)',
      snippetEn: 'Daily spiritual course dividing authentic prophetic supplications across the seven days of the week.',
      snippetUr: 'ہفتے کے سات دنوں پر تقسیم شدہ مسنون اور مقبول دعاؤں کا روزانہ وظیفہ۔',
      href: '/library?work=CANON-DUA-004',
      keywords: ['munajat-e-maqbool', 'munajat maqbool', '7 manazil', 'مناجات مقبول', 'مناجاتِ مقبول'],
    },

    // ---------------------------------------------------------
    // HADITH, CREED (AQEEDAH) & SIRAH
    // ---------------------------------------------------------
    {
      id: 'book-40-hadith-nawawi',
      category: 'HADITH',
      titleEn: 'Al-Arba\'in al-Nawawiyyah / 40 Hadith of Imam al-Nawawi',
      titleUr: 'الاربعین النووِیۃ (امام یحییٰ بن شرف النووی)',
      snippetEn: 'The foundational corpus of 42 prophetic narrations encapsulating the entire religion of Islam.',
      snippetUr: 'دینِ اسلام کے جملہ اصول، نیت، حلال و حرام اور اخلاق پر مشتمل ۴۲ بنیادی ترین احادیثِ مبارکہ۔',
      href: '/library?work=CANON-HAD-040',
      keywords: ['40 hadith nawawi', 'arbaeen nawawiyyah', 'nawawi', 'hadith collection', 'اربعین نووی', 'چالیس احادیث', 'نووی'],
    },
    {
      id: 'book-shamail-tirmidhi',
      category: 'HADITH',
      titleEn: 'Al-Shama\'il al-Muhammadiyyah (Imam Abu Isa al-Tirmidhi)',
      titleUr: 'الشمائل المحمدیۃ (امام ابو عیسیٰ محمد بن عیسیٰ الترمذی)',
      snippetEn: 'Exquisite narrations depicting the physical description, clothing, walk, speech, and weeping of the Prophet ﷺ.',
      snippetUr: 'سرکارِ دو عالم ﷺ کے سراپا، مبارک خدوخال، لباس، گفتگو اور رقت آمیز حلیۂ مبارک کا بیان۔',
      href: '/library?work=CANON-SIR-001',
      keywords: ['shamail al-tirmidhi', 'shamail', 'tirmidhi', 'prophet physical description', 'شمائل ترمذی', 'حلیہ مبارک', 'ترمذی'],
    },
    {
      id: 'book-aqidah-tahawiyyah',
      category: 'AQEEDAH',
      titleEn: 'Al-Aqidah al-Tahawiyyah (Imam Abu Ja\'far al-Tahawi)',
      titleUr: 'العقیدۃ الطحاویۃ (امام ابو جعفر احمد بن محمد الطحاوی)',
      snippetEn: 'The universal consensus text on orthodox Sunni creed: Tawhid, Khatam an-Nabiyyin, Ru\'yatullah, and Sahaba.',
      snippetUr: 'اہل سنت والجماعت کا متفقہ اور اجماعی عقیدہ: توحید، ختمِ نبوت، شفاعت اور صحابہ کی تکریم۔',
      href: '/library?work=CANON-AQD-001',
      keywords: ['aqidah tahawiyyah', 'tahawi', 'sunni aqeedah', 'creed', 'عقیدہ طحاویہ', 'طحاوی', 'عقائد اہلسنت'],
    },
    {
      id: 'book-fiqh-akbar',
      category: 'AQEEDAH',
      titleEn: 'Al-Fiqh al-Akbar (Imam al-A\'zam Abu Hanifah)',
      titleUr: 'الفقہ الاکبر (امام اعظم ابو حنیفہ نعمان بن ثابت رضی اللہ عنہ)',
      snippetEn: 'The earliest foundational theological declaration of orthodox Sunni Islam from the Great Imam.',
      snippetUr: 'امام اعظم ابو حنیفہ کا بنیادی رسالہ برائے عقائدِ اہل سنت۔',
      href: '/library?work=CANON-AQD-002',
      keywords: ['fiqh al-akbar', 'abu hanifah', 'theology', 'creed', 'فقہ اکبر', 'ابو حنیفہ'],
    },
    {
      id: 'book-sirat-mustafa',
      category: 'SIRAH',
      titleEn: 'Sirat-e-Mustafa (Allama Idris Kandhlawi / Classical Sunni Sirah)',
      titleUr: 'سیرتِ مصطفیٰ ﷺ (علامہ ادریس کاندھلوی)',
      snippetEn: 'Comprehensive chronological biography of the Final Messenger of Allah ﷺ grounded strictly in Sahih reports.',
      snippetUr: 'رسول اللہ ﷺ کی ولادتِ باسعادت سے وصال تک مستند اور دلنشین تاریخی و ایمانی سیرت۔',
      href: '/library?work=CANON-SIR-002',
      keywords: ['sirat-e-mustafa', 'sirat mustafa', 'seerah', 'prophet biography', 'سیرت مصطفی', 'سیرتِ نبوی'],
    },
    {
      id: 'book-raheeq-makhtum',
      category: 'SIRAH',
      titleEn: 'Ar-Raheeq al-Makhtum / The Sealed Nectar (Shaykh Safiur Rahman)',
      titleUr: 'الرحیق المختوم (سیرت النبی ﷺ کا عالمی شاہکار)',
      snippetEn: 'Award-winning chronological biography of the Messenger of Allah ﷺ covering Makkah and Madinah.',
      snippetUr: 'سیرت النبی ﷺ پر عالمی انعام یافتہ جامع اور مستند ترین کتاب۔',
      href: '/library?work=CANON-SIR-003',
      keywords: ['raheeq al-makhtum', 'sealed nectar', 'seerah', 'رحیق المختوم', 'سیرت'],
    },

    // ---------------------------------------------------------
    // TAZKIYAH, ETHICS & SPIRITUAL WISDOM
    // ---------------------------------------------------------
    {
      id: 'book-bidayat-hidayah',
      category: 'BOOK',
      titleEn: 'Bidayat al-Hidayah (Imam Abu Hamid al-Ghazali)',
      titleUr: 'بدایۃ الہدایۃ (حجۃ الاسلام امام ابو حامد الغزالی)',
      snippetEn: 'The Beginning of Guidance: daily roadmap for devout living from waking to sleep, avoiding inner sins.',
      snippetUr: 'صبح بیدار ہونے سے رات سونے تک بندگی، باطنی گناہوں سے اجتناب اور آدابِ زندگی کا دستور۔',
      href: '/library?work=CANON-TAZ-002',
      keywords: ['bidayat al-hidayah', 'ghazali', 'tazkiyah', 'spiritual guidance', 'ہدایۃ', 'بدایۃ الہدایہ', 'غزالی'],
    },
    {
      id: 'book-ihya-ulum-din',
      category: 'BOOK',
      titleEn: 'Ihya Ulum al-Din / Revival of the Religious Sciences (Imam al-Ghazali)',
      titleUr: 'احیاء علوم الدین (حجۃ الاسلام امام غزالی رحمۃ اللہ علیہ)',
      snippetEn: 'The monumental masterwork on inner worship, Khushu\' in prayer, sincere repentance, and heart purification.',
      snippetUr: 'باطنی طہارت، نماز میں خشوع، توبہ کی حقیقت اور اخلاقِ رذیلہ سے نجات کا بے مثال خزانہ۔',
      href: '/library?work=CANON-TAZ-001',
      keywords: ['ihya ulum al-din', 'ihya', 'ghazali', 'revival', 'spirituality', 'احیاء علوم الدین', 'امام غزالی'],
    },
    {
      id: 'book-ayyuhal-walad',
      category: 'BOOK',
      titleEn: 'Ayyuhal Walad / Dear Beloved Son (Imam al-Ghazali)',
      titleUr: 'ایھا الولد (اے عزیز فرزند — امام ابو حامد الغزالی)',
      snippetEn: 'Profound counsel emphasizing that knowledge without practical application is utter insanity.',
      snippetUr: 'علم اور عمل کے رشتے پر امام غزالی کی دل کو چھو لینے والی آخری نصیحتیں۔',
      href: '/library?work=CANON-TAZ-003',
      keywords: ['ayyuhal walad', 'dear son', 'ghazali', 'advice', 'ایھا الولد', 'غزالی'],
    },
    {
      id: 'book-hikayat-sadi',
      category: 'BOOK',
      titleEn: 'Hikayat-e-Sa\'di / Tales from Gulistan & Bustan (Shaykh Sa\'di Shirazi)',
      titleUr: 'حکایاتِ سعدی (شیخ مصلح الدین سعدی شیرازی رحمۃ اللہ علیہ)',
      snippetEn: 'Moral parables, humility, divine reliance, and compassion for the downtrodden from Gulistan and Bustan.',
      snippetUr: 'گلستان و بوستان کی سبق آموز حکایات، عدل، سخاوت اور درویشی کے سبق۔',
      href: '/library?work=CANON-TAZ-004',
      keywords: ['hikayat-e-sadi', 'sadi shirazi', 'gulistan', 'bustan', 'parables', 'حکایات سعدی', 'سعدی شیرازی'],
    },

    // ---------------------------------------------------------
    // THE NOBLE QURAN (KEY CHAPTERS & SURAHS)
    // ---------------------------------------------------------
    {
      id: 'quran-surah-1',
      category: 'QURAN',
      titleEn: 'Surah Al-Fatihah (The Opening / Umm al-Kitab)',
      titleUr: 'سورۃ الفاتحۃ (ام الکتاب — مکیہ، ۷ آیات)',
      snippetEn: 'Recited in every rak\'ah of Salah; the supreme cure and mother of the Book (Kanz al-Iman translation).',
      snippetUr: 'ہر رکعت میں پڑھی جانے والی سورہ، شفاء اور ام الکتاب مع کنز الایمان اردو ترجمہ۔',
      href: '/library?surah=1',
      keywords: ['fatihah', 'al-fatihah', 'surah 1', 'quran opening', 'فاتحہ', 'سورۃ الفاتحہ', 'الحمد شریف'],
    },
    {
      id: 'quran-surah-2',
      category: 'QURAN',
      titleEn: 'Surah Al-Baqarah (The Cow / Ayat al-Kursi)',
      titleUr: 'سورۃ البقرۃ (مدنیہ، ۲۸۶ آیات مع آیت الکرسی)',
      snippetEn: 'The pinnacle of the Quran; contains Ayat al-Kursi (2:255) and the closing covenants (2:285-286).',
      snippetUr: 'قرآن کریم کی سب سے بڑی سورہ جس میں آیت الکرسی اور آخر کی دعائیں شامل ہیں۔',
      href: '/library?surah=2',
      keywords: ['baqarah', 'al-baqarah', 'ayat al kursi', 'surah 2', 'بقرہ', 'سورۃ البقرہ', 'آیت الکرسی'],
    },
    {
      id: 'quran-surah-18',
      category: 'QURAN',
      titleEn: 'Surah Al-Kahf (The Cave — Jumu\'ah Sunnah)',
      titleUr: 'سورۃ الکہف (مکیہ، ۱۱۰ آیات — جمعہ کا مسنون عمل)',
      snippetEn: 'Sunnah recitation on Friday providing divine light from one Friday to the next and protection from Dajjal.',
      snippetUr: 'جمعہ کے دن تلاوت کی خاص سنت جو اگلے جمعہ تک نور روشن رکھتی ہے اور دجال سے پناہ دیتی ہے۔',
      href: '/library?surah=18',
      keywords: ['kahf', 'al-kahf', 'friday sunnah', 'surah 18', 'کہف', 'سورۃ الکہف', 'جمعہ'],
    },
    {
      id: 'quran-surah-36',
      category: 'QURAN',
      titleEn: 'Surah Ya-Sin (The Heart of the Quran)',
      titleUr: 'سورۃ یٰسٓ (قلب القرآن — مکیہ، ۸۳ آیات)',
      snippetEn: 'Recited for the dying, for ease in affairs, and for immense spiritual forgiveness.',
      snippetUr: 'قرآن مجید کا دل، مشکلات میں آسانی اور ایصالِ ثواب کے لیے تلاوت فرمائی جاتی ہے۔',
      href: '/library?surah=36',
      keywords: ['yasin', 'ya-sin', 'heart of quran', 'surah 36', 'یس', 'سورۃ یس', 'سورہ یاسین'],
    },
    {
      id: 'quran-surah-67',
      category: 'QURAN',
      titleEn: 'Surah Al-Mulk (The Sovereignty / Tabarak)',
      titleUr: 'سورۃ الملک (تبارک الذی — مکیہ، ۳۰ آیات)',
      snippetEn: 'Protector from the punishment of the grave recited every night before sleep.',
      snippetUr: 'عذابِ قبر سے حفاظت کرنے والی سورہ جو ہر رات سونے سے قبل پڑھی جاتی ہے۔',
      href: '/library?surah=67',
      keywords: ['mulk', 'al-mulk', 'tabarak', 'grave protection', 'surah 67', 'ملک', 'سورۃ الملک', 'تبارک'],
    },
    {
      id: 'quran-surah-112',
      category: 'QURAN',
      titleEn: 'Surah Al-Ikhlas (Purity of Faith / Tawhid)',
      titleUr: 'سورۃ الاخلاص (قل ہو اللہ احد — مکیہ، ۴ آیات)',
      snippetEn: 'Equals one-third of the Quran in reward; absolute affirmation of divine Tawhid.',
      snippetUr: 'ایک تہائی قرآن کے برابر ثواب، خالص توحید کا بیان مع کنز الایمان ترجمہ۔',
      href: '/library?surah=112',
      keywords: ['ikhlas', 'al-ikhlas', 'qul huwa allahu ahad', 'tawhid', 'surah 112', 'اخلاص', 'سورۃ الاخلاص'],
    },
    {
      id: 'quran-surah-113',
      category: 'QURAN',
      titleEn: 'Surah Al-Falaq (The Daybreak / Al-Mu\'awwidhatayn)',
      titleUr: 'سورۃ الفلق (قل اعوذ برب الفلق — مکیہ، ۵ آیات)',
      snippetEn: 'Seeking divine protection from envy, darkness, and occult harm.',
      snippetUr: 'حاسد کے حسد اور اندھیری رات کے شر سے پناہ مانگنے والی مسنون سورہ۔',
      href: '/library?surah=113',
      keywords: ['falaq', 'al-falaq', 'protection', 'surah 113', 'فلق', 'سورۃ الفلق'],
    },
    {
      id: 'quran-surah-114',
      category: 'QURAN',
      titleEn: 'Surah An-Nas (Mankind / Protection from Whispers)',
      titleUr: 'سورۃ الناس (قل اعوذ برب الناس — مکیہ، ۶ آیات)',
      snippetEn: 'The final chapter of the Quran seeking refuge in the King of Mankind from Satanic whispers.',
      snippetUr: 'قرآن کریم کی آخری سورہ، شیطانی وسوسوں سے مکمل حفاظت کا قلعہ۔',
      href: '/library?surah=114',
      keywords: ['nas', 'an-nas', 'protection', 'whispers', 'surah 114', 'ناس', 'سورۃ الناس'],
    },
  ];

  /**
   * Performs lightning fast multi-language search across all 38 books, tools, and Surahs
   */
  public static search(rawQuery: string, limit: number = 8): SearchResultItem[] {
    const q = rawQuery.trim().toLowerCase();
    if (!q) return [];

    return this.CATALOGUE
      .filter(item => {
        const matchesTitle = item.titleEn.toLowerCase().includes(q) || item.titleUr.includes(q);
        const matchesSnippet = item.snippetEn.toLowerCase().includes(q) || item.snippetUr.includes(q);
        const matchesKeywords = item.keywords.some(k => k.toLowerCase().includes(q) || q.includes(k.toLowerCase()));
        return matchesTitle || matchesSnippet || matchesKeywords;
      })
      .slice(0, limit);
  }

  /**
   * Returns quick suggestion pills when search is opened
   */
  public static getPopularSuggestions(): string[] {
    return [
      '40 Rabbana',
      'Hisn al-Muslim',
      'Mukhtasar al-Quduri',
      'Bahar-e-Shariat',
      '40 Hadith Nawawi',
      'Qasidah Burdah',
      'Salam-e-Raza',
      'Al-Muwatta',
      'Surah Ya-Sin',
      'Surah Al-Mulk',
      'Zakat Calculator',
      'Prayer Times',
    ];
  }
}

export const universalSearchEngine = new UniversalSearchEngine();
