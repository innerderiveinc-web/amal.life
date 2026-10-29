/**
 * AMAL OS — Canonical Masterworks Scholarly Exegesis & Topical Outlines Dataset
 * 
 * Traditional theological appraisals, author biographies, historical significance,
 * and canonical chapter indexes for foundational works in the Islamic sciences.
 * 
 * Governed according to the scholarly consensus of Ahl al-Sunnah wal-Jama'ah (Sawad al-A'zam).
 */

export interface CanonicalBookScholarlyProfile {
  workId: string;
  titleArabic: string;
  titleTransliterated: string;
  authorNameUrdu: string;
  authorNameEnglish: string;
  authorEra: string;
  madhhabOrOrientation: string;
  significanceUrdu: string;
  significanceEnglish: string;
  authorBioUrdu: string;
  authorBioEnglish: string;
  studyMethodologyUrdu: string;
  studyMethodologyEnglish: string;
  topicalIndex: {
    sectionNumber: number;
    titleUrdu: string;
    titleArabic: string;
    titleEnglish: string;
    coreThemes: string;
  }[];
}

export const CANONICAL_BOOK_PROFILES: Record<string, CanonicalBookScholarlyProfile> = {
  // ==========================================
  // 1. SAHIH AL-BUKHARI (صحیح البخاری)
  // ==========================================
  'CANON-HAD-001': {
    workId: 'CANON-HAD-001',
    titleArabic: 'الجامع المسند الصحيح المختصر من أمور رسول الله ﷺ وسننه وأيامه',
    titleTransliterated: 'Sahih al-Bukhari',
    authorNameUrdu: 'امیر المؤمنین فی الحدیث امام محمد بن اسماعیل بخاری (رحمة الله عليه)',
    authorNameEnglish: 'Imam Muhammad ibn Isma\'il al-Bukhari (194–256 AH)',
    authorEra: '256ھ / قرونِ اولیٰ (بخارا و نیشاپور)',
    madhhabOrOrientation: 'محدث مطلق / امامِ اہلِ سنت',
    significanceUrdu: 'قرآنِ مجید کے بعد روئے زمین پر اصح ترین کتاب۔ امام بخاری نے ۱۶ سال کے طویل سفر اور ۶ لاکھ احادیث میں سے سخت ترین شرائط پر اس کا انتخاب فرمایا۔ ہر حدیث لکھنے سے قبل غسل کر کے دو رکعت نفل استخارہ ادا فرمایا۔',
    significanceEnglish: 'The most authentic book on earth after the Holy Quran by universal scholarly consensus. Distilled over 16 years from 600,000 narrations under the most rigorous conditions of narrator integrity (Adalah) and uninterrupted contiguity (Ittisal).',
    authorBioUrdu: '۱۹۴ھ میں بخارا میں پیدا ہوئے۔ بچپن ہی میں یتیم ہوئے، بصارت چلی گئی تھی مگر والدہ کی دعاؤں سے لوٹ آئی۔ غیر معمولی قوتِ حافظہ کے مالک تھے، سفرِ حجاز، بصرہ، کوفہ، بغداد اور مصر کر کے احادیثِ رسول کو محفوظ کیا۔ ۲۵۶ھ میں خرتنگ (سمرقند) میں وصال پایا۔',
    authorBioEnglish: 'Born in Bukhara in 194 AH. Endowed with extraordinary photographic memory and piety. Traveled the known Islamic world collecting Hadiths. Passed away in Khartank near Samarkand in 256 AH.',
    studyMethodologyUrdu: 'امام بخاری کا فقہ ان کے تراجم الابواب (ابواب کے عنوانات) میں ظاہر ہوتا ہے۔ حدیث کی صحت کے لیے راوی اور مروی عنہ کی باقاعدہ معاصرانہ ملاقات (ثبوتِ لقاء) کی شرط لگاتے ہیں۔',
    studyMethodologyEnglish: 'Imam al-Bukhari\'s legal deductions are encoded in his chapter headings (Tarajim al-Abwab). He mandates proven physical meeting between contiguous narrators for Sahih grading.',
    topicalIndex: [
      { sectionNumber: 1, titleArabic: 'كتاب بدء الوحي', titleUrdu: 'کتاب بدء الوحی', titleEnglish: 'Book of Revelation', coreThemes: 'نیت کا اخلاص، نزولِ وحی کی کیفیات، غارِ حرا کا واقعہ' },
      { sectionNumber: 2, titleArabic: 'كتاب الإيمان', titleUrdu: 'کتاب الایمان', titleEnglish: 'Book of Faith', coreThemes: 'ارکانِ اسلام، حیا کی شاخیں، گناہوں سے ایمان کی حفاظت' },
      { sectionNumber: 3, titleArabic: 'كتاب العلم', titleUrdu: 'کتاب العلم', titleEnglish: 'Book of Knowledge', coreThemes: 'طلبِ علم کی فضیلت، علماء کی ذمہ داریاں، حفظ و کتابت' },
      { sectionNumber: 4, titleArabic: 'كتاب الوضوء والغسل', titleUrdu: 'کتاب الطہارۃ والوضوء', titleEnglish: 'Book of Purity & Ablution', coreThemes: 'ارکانِ وضو، فرائضِ غسل، طہارت کے آداب' },
      { sectionNumber: 5, titleArabic: 'كتاب الصلاة والمواقيت', titleUrdu: 'کتاب الصلاۃ', titleEnglish: 'Book of Prayer', coreThemes: 'اوقاتِ نماز، ہیئتِ رکوع و سجود، امامت و جماعت' },
      { sectionNumber: 6, titleArabic: 'كتاب الزكاة والصوم', titleUrdu: 'کتاب الزکوٰۃ والصوم', titleEnglish: 'Book of Zakat & Fasting', coreThemes: 'نصاب، صدقۂ فطر، رمضان کے روزے اور اعتکاف' },
      { sectionNumber: 7, titleArabic: 'كتاب الحج والجهاد', titleUrdu: 'کتاب الحج والجہاد', titleEnglish: 'Book of Hajj & Defense', coreThemes: 'مناسکِ حج، طواف، احرام اور دفاعِ دین' },
      { sectionNumber: 8, titleArabic: 'كتاب النكاح والطلاق', titleUrdu: 'کتاب النکاح والطلاق', titleEnglish: 'Book of Marriage & Divorce', coreThemes: 'مہر، زوجین کے حقوق، نفقہ، طلاق و عدت' },
      { sectionNumber: 9, titleArabic: 'كتاب الرقاق والفتن', titleUrdu: 'کتاب الرقاق', titleEnglish: 'Book of Heart-Softening Traditions', coreThemes: 'زہد، توبہ، موت کی یاد، قیامت کی نشانیاں' },
      { sectionNumber: 10, titleArabic: 'كتاب التوحيد والاعتصام', titleUrdu: 'کتاب التوحید', titleEnglish: 'Book of Divine Unity & Sunnah', coreThemes: 'عقیدۂ توحید، سنت کی اتباع، بدعت سے اجتناب' },
    ]
  },

  // ==========================================
  // 2. SAHIH MUSLIM (صحیح مسلم)
  // ==========================================
  'CANON-HAD-002': {
    workId: 'CANON-HAD-002',
    titleArabic: 'المسند الصحيح المختصر بنقل العدل عن العدل إلى رسول الله ﷺ',
    titleTransliterated: 'Sahih Muslim',
    authorNameUrdu: 'امام الحدیث ابو الحسین مسلم بن الحجاج القشیری النیسابوری (رحمة الله عليه)',
    authorNameEnglish: 'Imam Muslim ibn al-Hajjaj al-Naysaburi (204–261 AH)',
    authorEra: '261ھ / نیشاپور خراسان',
    madhhabOrOrientation: 'محدثِ کبیر / جامعِ احادیثِ احکام',
    significanceUrdu: 'صحیح بخاری کے ساتھ مل کر "صحیحین" کا متفقہ مدار بناتی ہے۔ اس کی بے مثال خصوصیت یہ ہے کہ امام مسلم ایک ہی حدیث کے تمام طرق، الفاظ اور اسانید کو ایک ہی باب کے نیچے جمع فرما دیتے ہیں جس سے طرقِ حدیث اور علل کا موازنہ آسان ہو جاتا ہے۔',
    significanceEnglish: 'The twin pillar of authentic Hadith scholarship alongside Bukhari. Renowned for its unparalleled editorial organization, grouping all variants, narrators, and parallel paths (Turuq) under single thematic nodes without scattering.',
    authorBioUrdu: '۲۰۴ھ میں نیشاپور میں ولادت ہوئی۔ امام بخاری، امام احمد بن حنبل اور اسحاق بن راہویہ کے شاگردِ رشید ہیں۔ زہد و ورع کے پیکر تھے اور کپڑے کی دیانت دارانہ تجارت کرتے تھے۔ ۲۶۱ھ میں نیشاپور میں وصال فرمایا۔',
    authorBioEnglish: 'Born in Nishapur in 204 AH. Prime student of Imam al-Bukhari and Ahmad ibn Hanbal. Known for scrupulous ethical trading and peerless piety. Passed away in 261 AH.',
    studyMethodologyUrdu: 'کتاب کے آغاز میں امام مسلم کا لکھا ہوا "مقدمۂ صحیح مسلم" اصولِ حدیث، راویوں کے طبقات اور اسناد کی پرکھ کا سب سے پہلا باقاعدہ دستور تسلیم کیا جاتا ہے۔',
    studyMethodologyEnglish: 'The celebrated Muqaddimah of Sahih Muslim serves as the earliest foundational treatise on the epistemic tiers of Hadith transmission and critical narrator assessment.',
    topicalIndex: [
      { sectionNumber: 1, titleArabic: 'مقدمة الإمام مسلم', titleUrdu: 'مقدمۂ مسلم فی اصول الحدیث', titleEnglish: 'Muqaddimah on Hadith Sciences', coreThemes: 'راویوں کے طبقات، ضعیف راویوں سے اجتناب، اسناد کی اہمیت' },
      { sectionNumber: 2, titleArabic: 'كتاب الإيمان والإسلام', titleUrdu: 'کتاب الایمان', titleEnglish: 'Book of Faith', coreThemes: 'حدیثِ جبریل، ارکانِ اسلام، شفاعتِ کبریٰ' },
      { sectionNumber: 3, titleArabic: 'كتاب الطهارة والحيض', titleUrdu: 'کتاب الطہارۃ والحیض', titleEnglish: 'Book of Purity & Menstruation', coreThemes: 'وضو، غسل، حیض و استحاضہ کے احکام' },
      { sectionNumber: 4, titleArabic: 'كتاب الصلاة والمساجد', titleUrdu: 'کتاب الصلاۃ', titleEnglish: 'Book of Prayer', coreThemes: 'نماز کے ارکان، قراءت، تشہد اور مساجد کے آداب' },
      { sectionNumber: 5, titleArabic: 'كتاب الفضائل والشمائل', titleUrdu: 'کتاب الفضائل', titleEnglish: 'Book of Prophetic Virtues', coreThemes: 'شانِ رسالت، اخلاقِ نبوی، معجزات اور برکات' },
      { sectionNumber: 6, titleArabic: 'كتاب فضائل الصحابة', titleUrdu: 'کتاب فضائلِ صحابہ و اہلِ بیت', titleEnglish: 'Virtues of Companions & Ahl al-Bayt', coreThemes: 'خلفائے راشدین، سیدہ خدیجہ، عائشہ، فاطمہ اور حسنین' },
    ]
  },

  // ==========================================
  // 3. AL-HIDAYAH (الہدایہ شرح بدایۃ المبتدی)
  // ==========================================
  'CANON-FIQ-001': {
    workId: 'CANON-FIQ-001',
    titleArabic: 'الهداية في شرح بداية المبتدي',
    titleTransliterated: 'Al-Hidayah fi Sharh Bidayat al-Mubtadi',
    authorNameUrdu: 'شیخ الاسلام برہان الدین علی بن ابی بکر المرغینانی الحنفی (رحمة الله عليه)',
    authorNameEnglish: 'Imam Burhan al-Din al-Marghinani al-Hanafi (511–593 AH)',
    authorEra: '593ھ / مرغینان (فرغانہ / ازبکستان)',
    madhhabOrOrientation: 'فقہ حنفی (متن و دلیل کا عظیم ترین شاہکار)',
    significanceUrdu: 'فقہ حنفی کا سب سے بلند پایہ اور معتبر ترین متن جس کے بارے میں ائمہ نے فرمایا: "الہدایۃ کالقرآن نسخت ما قبلھا من کتب الفروع" (ہدایہ نے فقہی کتابوں میں وہ مقام حاصل کیا جس نے پچھلی کتابوں کو بے نیاز کر دیا)۔ امام مرغینانی نے ۱۳ سال مسلسل روزے کی حالت میں اسے تصنیف فرمایا۔',
    significanceEnglish: 'The supreme legal compendium of the Hanafi school. Studied for over eight centuries across the Muslim world. Integrates Imam Abu Hanifah\'s legal dictums with rigorous Quranic and Hadith proofs.',
    authorBioUrdu: '۵۱۱ھ میں پیدا ہوئے۔ مرغینان اور سمرقند کے کبار فقہاء اور ائمہ سے علم حاصل کیا۔ زہد، تقویٰ اور فقہی اجتہاد میں یکتائے روزگار تھے۔ ۵۹۳ھ میں وصال پایا۔',
    authorBioEnglish: 'Born in Marghinan (modern Uzbekistan) in 511 AH. Master jurist and Mujtahid of the Central Asian Hanafi tradition. Authored Al-Hidayah over 13 continuous years. Passed away in 593 AH.',
    studyMethodologyUrdu: 'طریقۂ استدلال یہ ہے کہ پہلے مسئلہ بیان کرتے ہیں، پھر ائمۂ ثلاثہ (شافعی، مالک، احمد) کا اختلاف اور دلائل نقل کرتے ہیں، اور پھر نہایت شاندار طریقے سے حنفی مسلک کا قرآن و حدیث سے راجح ہونا ثابت کرتے ہیں۔',
    studyMethodologyEnglish: 'Employs comparative legal dialectics: presents the disputed issue, articulates the counter-positions of Imam al-Shafi\'i and Imam Malik, and concludes with decisive textual proofs substantiating the Hanafi ruling.',
    topicalIndex: [
      { sectionNumber: 1, titleArabic: 'كتاب الطهارات', titleUrdu: 'کتاب الطہارۃ', titleEnglish: 'Book of Purification', coreThemes: 'وضو، غسل، پانی کے احکام، حیض و نفاس و استحاضہ' },
      { sectionNumber: 2, titleArabic: 'كتاب الصلاة', titleUrdu: 'کتاب الصلاۃ', titleEnglish: 'Book of Prayer', coreThemes: 'شروطِ صلاۃ، اوقات، امامت، نمازِ وتر و عیدین' },
      { sectionNumber: 3, titleArabic: 'كتاب الزكاة', titleUrdu: 'کتاب الزکوٰۃ', titleEnglish: 'Book of Zakat', coreThemes: 'سونے، چاندی، مالِ تجارت اور مویشیوں کا نصاب' },
      { sectionNumber: 4, titleArabic: 'كتاب الصوم والاعتكاف', titleUrdu: 'کتاب الصوم', titleEnglish: 'Book of Fasting', coreThemes: 'رؤیتِ ہلال، مفسدات و مکروہاتِ روزہ، کفارہ' },
      { sectionNumber: 5, titleArabic: 'كتاب النكاح والرضاع', titleUrdu: 'کتاب النکاح', titleEnglish: 'Book of Marriage & Custody', coreThemes: 'کفاءت، ولایت، مہر، رضاعت کے احکام' },
      { sectionNumber: 6, titleArabic: 'كتاب البيوع والمعاملات', titleUrdu: 'کتاب البیوع', titleEnglish: 'Book of Commercial Contracts', coreThemes: 'خرید و فروخت کے شروط، سود (ربا) کی حرمت، شرکت' },
      { sectionNumber: 7, titleArabic: 'كتاب الفرائض والمواريث', titleUrdu: 'کتاب الفرائض', titleEnglish: 'Book of Inheritance Shares', coreThemes: 'ذوی الفروض، عصبات، حجب، رد اور عول کے قوانین' },
    ]
  },

  // ==========================================
  // 4. RADD AL-MUHTAR / FATAWA SHAMI (رد المحتار علی الدر المختار)
  // ==========================================
  'CANON-FIQ-002': {
    workId: 'CANON-FIQ-002',
    titleArabic: 'رد المحتار على الدر المختار شرح تنوير الأبصار (فتاوى الشامي)',
    titleTransliterated: 'Radd al-Muhtar \'ala al-Durr al-Mukhtar (Fatawa Shami)',
    authorNameUrdu: 'خاتمۃ المحققین علامہ سید محمد امین ابن عابدین شامی (رحمة الله عليه)',
    authorNameEnglish: 'Allama Sayyid Muhammad Amin Ibn Abidin al-Shami (1198–1252 AH)',
    authorEra: '1252ھ / دمشق شام',
    madhhabOrOrientation: 'فقہ حنفی میں فتوے کا آخری اور حتمی فیصلہ کن مرجع',
    significanceUrdu: 'متاخرین علمائے احناف کے نزدیک فتویٰ کا مدار ابن عابدین شامی کی تحقیق پر ہے۔ جب بھی کتبِ فقہ میں اختلاف ہو تو علامہ شامی کا فیصلہ قولِ فیصل مانا جاتا ہے۔ دورِ حاضر کے تمام دار الافتاء (جامعہ ازہر، دار العلوم دیوبند، جامعہ نظامیہ، جامعہ رضویہ) اسی پر فتویٰ جاری کرتے ہیں۔',
    significanceEnglish: 'The ultimate final authority for legal decree (Fatwa) in the late Hanafi tradition. Whenever classical Hanafi opinions diverge, Ibn Abidin\'s verification in Radd al-Muhtar serves as the conclusive adjudicator across global Islamic academies.',
    authorBioUrdu: '۱۱۹۸ھ میں دمشق کے حسینی سادات میں پیدا ہوئے۔ حفظِ قرآن کے بعد شوافع اور احناف کے کبار اساتذہ سے فیض پایا۔ تقویٰ کا یہ عالم تھا کہ روزانہ قرآن پاک کا ایک ختم فرماتے تھے۔ ۱۲۵۲ھ میں دمشق میں وصال ہوا۔',
    authorBioEnglish: 'Born in Damascus in 1198 AH from the noble Prophetic lineage. Mastered both Shafi\'i and Hanafi canons. Completed daily recitation of the Quran throughout his scholarly life. Passed away in Damascus in 1252 AH.',
    studyMethodologyUrdu: 'علامہ شامی ہر مسئلے کی اصل ظاہر الروایہ سے تلاش کرتے ہیں، پھر عرف (معاشرتی تقاضوں) اور ضرورتِ زمانہ کی روشنی میں مدلل ترین فتویٰ کا انتخاب فرماتے ہیں۔',
    studyMethodologyEnglish: 'Methodology combines strict allegiance to Zahir al-Riwayah with deep accommodation of contemporary customary practice (Urf) and public necessity (Darurah).',
    topicalIndex: [
      { sectionNumber: 1, titleArabic: 'مقدمة في مصطلحات الفقه والفتوى', titleUrdu: 'مقدمۂ فتاویٰ شامی', titleEnglish: 'Prologue on Fatwa Hermeneutics', coreThemes: 'اصحابِ فتاویٰ کے طبقات، ضعیف قول پر فتویٰ کی ممانعت' },
      { sectionNumber: 2, titleArabic: 'كتاب الطهارة وباب الحيض', titleUrdu: 'کتاب الطہارۃ وباب الحیض', titleEnglish: 'Purity & Women\'s Haidh', coreThemes: 'خواتین کے ایامِ عادت، استحاضہ کے باریک مسائل' },
      { sectionNumber: 3, titleArabic: 'كتاب الصلاة والأوقات', titleUrdu: 'کتاب الصلاۃ', titleEnglish: 'Prayer Rulings & Anomalies', coreThemes: 'قضا نمازوں کی ترتیب، سجدۂ سہو، نمازِ معذور' },
      { sectionNumber: 4, titleArabic: 'كتاب النكاح والطلاق والعدة', titleUrdu: 'کتاب النکاح والطلاق', titleEnglish: 'Matrimony & Dissolution', coreThemes: 'عقدِ نکاح کے ارکان، حقوقِ زوجین، عدت کے نفقات' },
      { sectionNumber: 5, titleArabic: 'كتاب الوقف والوصايا', titleUrdu: 'کتاب الوقف والوصایا', titleEnglish: 'Endowments & Bequests', coreThemes: 'مساجد و مدارس کے اوقاف، تہائی مال کی وصیت' },
    ]
  },

  // ==========================================
  // 5. TAFSIR IBN KATHIR (تفسیر ابن کثیر)
  // ==========================================
  'CANON-TAF-001': {
    workId: 'CANON-TAF-001',
    titleArabic: 'تفسير القرآن العظيم (تفسير ابن كثير)',
    titleTransliterated: 'Tafsir al-Qur\'an al-Azim (Tafsir Ibn Kathir)',
    authorNameUrdu: 'عماد الدین ابو الفداء اسماعیل بن عمر ابن کثیر القرشی الدمشقی (رحمة الله عليه)',
    authorNameEnglish: 'Hafidh Imad al-Din Ismail Ibn Kathir (701–774 AH)',
    authorEra: '774ھ / دمشق و بصرہ',
    madhhabOrOrientation: 'تفسیر بالماثور کا سرخیل شاہکار',
    significanceUrdu: 'تفسیر بالماثور (روایت و حدیث کے ذریعے قرآن کی تفسیر) میں سب سے جامع اور مستند ترین کتاب۔ قرآن کی تفسیر قرآن سے، پھر احادیثِ صحیحہ سے، اور پھر آثارِ صحابہ سے کرنے کا بہترین منہج پیش کرتی ہے۔',
    significanceEnglish: 'The undisputed masterwork of Tafsir bi\'l-Ma\'thur (traditional narration-based exegesis). Interprets the Quran first by the Quran itself, then by verified Sunnah, and then by consensus of the Sahabah.',
    authorBioUrdu: '۷۰۱ھ میں بصرہ کے قریب پیدا ہوئے۔ دمشق میں تعلیم پائی۔ علامہ ابن تیمیہ، علامہ مزی اور علامہ ذہبی کے معاصر اور شاگرد تھے۔ ۷۷۴ھ میں دمشق میں وصال فرمایا۔',
    authorBioEnglish: 'Born in 701 AH. Renowned historian, traditionist, and Quran commentator of Damascus. Author of Al-Bidayah wa al-Nihayah. Passed away in Damascus in 774 AH.',
    studyMethodologyUrdu: 'اسرائیلیات (غیر معتبر تاریخی کہانیوں) کو پرکھتے ہیں اور ان پر سخت تنقید فرما کر قرآن و حدیث کے صحیح ذخیرے پر قاری کا اعتماد قائم کرتے ہیں۔',
    studyMethodologyEnglish: 'Carefully critiques and purges fabricated Judeo-Christian legendary lore (Isra\'iliyyat), restricting deductions strictly to authentic Prophetic transmissions.',
    topicalIndex: [
      { sectionNumber: 1, titleArabic: 'مقدمة في أصول التفسير', titleUrdu: 'مقدمۂ اصولِ تفسیر', titleEnglish: 'Exegetical Foundations', coreThemes: 'تفسیر القرآن بالقرآن، بہترین تفسیری مناہج' },
      { sectionNumber: 2, titleArabic: 'تفسير سورة الفاتحة والبقرة', titleUrdu: 'تفسیر سورۂ فاتحہ و بقرہ', titleEnglish: 'Al-Fatihah & Al-Baqarah', coreThemes: 'ام الکتاب، احکامِ نماز، روزہ، قصاص، حج، سود' },
      { sectionNumber: 3, titleArabic: 'تفسير سور النساء والمائدة', titleUrdu: 'تفسیر سورۂ نساء و مائدہ', titleEnglish: 'An-Nisa & Al-Ma\'idah', coreThemes: 'یتامٰی و خواتین کے حقوق، حلال و حرام کھانے' },
      { sectionNumber: 4, titleArabic: 'تفسير جزء عم والقصار', titleUrdu: 'تفسیر جزء عم', titleEnglish: 'Juz Amma Exegesis', coreThemes: 'آخرت کا بیان، علاماتِ قیامت، توحید و اخلاص' },
    ]
  },

  // ==========================================
  // 6. AL-SHIFA (الشفاء بتعریف حقوق المصطفیٰ)
  // ==========================================
  'CANON-SIR-001': {
    workId: 'CANON-SIR-001',
    titleArabic: 'الشفا بتعريف حقوق المصطفى ﷺ',
    titleTransliterated: 'Al-Shifa bi-Ta\'rif Huquq al-Mustafa ﷺ',
    authorNameUrdu: 'قاضی ابو الفضل عیاض بن موسیٰ الیحصبی السبتی المالکی (رحمة الله عليه)',
    authorNameEnglish: 'Qadi Iyad ibn Musa al-Yahsubi (476–544 AH)',
    authorEra: '544ھ / سبتہ و اندلس (مراکش)',
    madhhabOrOrientation: 'سیرت و تعظیمِ مصطفیٰ ﷺ کا عالمگیر دستور',
    significanceUrdu: 'امتِ مسلمہ میں رسول اللہ ﷺ کے حقوق، تعظیم، محبت اور ختمِ نبوت کے دفاع پر لکھی گئی سب سے عظیم کتاب۔ علمائے امت کا فرمان ہے: "لولا الشفا لما عُرِف المصطفى" (اگر کتاب الشفاء نہ ہوتی تو امت کماحقہ اپنے نبی کی تعظیم و حقوق کو نہ پہچان پاتی)۔ مراکش اور حرمین میں وبائی امراض اور آفات کے وقت اس کی تلاوت سے شفا مانگی جاتی تھی۔',
    significanceEnglish: 'The universal masterpiece on the veneration, sacred rights, and supreme station of the Prophet Muhammad ﷺ. Scholars across centuries held that no other work so comprehensively safeguards the honor, sanctity, and love of the Messenger of Allah.',
    authorBioUrdu: '۴۷۶ھ میں مراکش کے شہر سبتہ میں پیدا ہوئے۔ قرطبہ میں کبار ائمہ سے علم حاصل کیا۔ سبتہ اور غرناطہ کے چیف جسٹس (قاضی القضاۃ) رہے۔ ۵۴۴ھ میں مراکش میں وصال فرمایا۔',
    authorBioEnglish: 'Born in Ceuta (Morocco) in 476 AH. Chief Judge (Qadi) of Ceuta and Granada. Grand Maliki jurist, Muhaddith, and defender of the Sunnah. Passed away in 544 AH.',
    studyMethodologyUrdu: 'قرآن کریم کی ان آیات کو یکجا کرتے ہیں جن میں اللہ تعالیٰ نے اپنے حبیب ﷺ کی مدح، قسم، اور تعظیم فرمائی ہے، اور پھر گستاخیِ رسول کے شرعی حکم کو مدلل فرماتے ہیں۔',
    studyMethodologyEnglish: 'Systematically collects every Quranic Ayah celebrating the Prophet\'s honor and proves the mandatory duty of revering, defending, and obeying him above all creation.',
    topicalIndex: [
      { sectionNumber: 1, titleArabic: 'القسم الأول: تعظيم الله تعالى لقدر النبي ﷺ', titleUrdu: 'حصہ اول: اللہ تعالیٰ کا نبی ﷺ کی تعظیم فرمانا', titleEnglish: 'Part 1: Divine Praise of the Prophet', coreThemes: 'اخلاقِ حسنہ، حُسنِ صورت و سیرت، معجزاتِ قاہرہ' },
      { sectionNumber: 2, titleArabic: 'القسم الثاني: حقوق النبي ﷺ على العباد', titleUrdu: 'حصہ دوم: نبی ﷺ کے حقوق امت پر', titleEnglish: 'Part 2: Rights of the Prophet upon Mankind', coreThemes: 'ایمان، محبت، اطاعت، نصرت اور کثرتِ درود و سلام' },
      { sectionNumber: 3, titleArabic: 'القسم الثالث: عصمة الأنبياء عليهم السلام', titleUrdu: 'حصہ سوم: عصمتِ انبیاء علیہم السلام', titleEnglish: 'Part 3: Infallibility of the Prophets', coreThemes: 'گناہوں اور نقائص سے پاکیزگی، تبلیغ میں صداقت' },
      { sectionNumber: 4, titleArabic: 'القسم الرابع: حكم من سب النبي ﷺ', titleUrdu: 'حصہ چہارم: شانِ رسالت میں گستاخی کا حکم', titleEnglish: 'Part 4: Protection of Prophetic Sanctity', coreThemes: 'توہینِ رسالت کی شرعی سزا، تعظیم کی حفاظت' },
    ]
  },

  // ==========================================
  // 7. AL-AQEEDAH AL-TAHAWIYYAH (العقیدۃ الطحاویۃ)
  // ==========================================
  'CANON-AQD-001': {
    workId: 'CANON-AQD-001',
    titleArabic: 'متن العقيدة الطحاوية (بيان عقيدة أهل السنة والجماعة)',
    titleTransliterated: 'Al-Aqeedah al-Tahawiyyah',
    authorNameUrdu: 'امام الحدیث والفقہ ابو جعفر احمد بن محمد الطحاوی الحنفی (رحمة الله عليه)',
    authorNameEnglish: 'Imam Abu Ja\'far Ahmad ibn Muhammad al-Tahawi (239–321 AH)',
    authorEra: '321ھ / مصر (قاہرہ)',
    madhhabOrOrientation: 'عقائدِ اہل السنت والجماعت کا متفقہ متن',
    significanceUrdu: 'تمام مکاتبِ فکر (احناف، شوافع، مالکیہ، حنابلہ) کا متفقہ غیر متنازعہ عقائد نامہ، جو امام اعظم ابو حنیفہ، امام ابو یوسف اور امام محمد کے عقیدے پر مبنی ہے۔ اس میں بغیر فلسفیانہ پیچیدگیوں کے صحابہ کرام والا خالص اسلامی عقیدہ بیان کیا گیا ہے۔',
    significanceEnglish: 'The universally acclaimed classical manifesto of Sunni Islamic Creed. Transmits the foundational orthodox beliefs of Imam Abu Hanifah and his companions, free of heretical innovations (Bid\'ah) and philosophical dialectics.',
    authorBioUrdu: '۲۳۹ھ میں مصر کے قصبے طحا میں پیدا ہوئے۔ ابتدا میں امام شافعی کے شاگرد اور اپنے ماموں امام مزنی سے فقہ پڑھی، بعد ازاں فقہ حنفی اختیار کیا۔ ۳۲۱ھ میں قاہرہ میں وصال فرمایا۔',
    authorBioEnglish: 'Born in Taha (Egypt) in 239 AH. Grand nephew of the prominent Shafi\'i jurist al-Muzani before becoming the foremost Hanafi Hadith master of Egypt. Passed away in 321 AH.',
    studyMethodologyUrdu: 'مسائلِ توحید، صفاتِ باری تعالیٰ (تنزیہ)، ختمِ نبوت، شفاعت، حوضِ کوثر، عذابِ قبر، معراج، اور صحابہ کرام کی اجتماعی عدالت کو جامع اور نپے تلے جملوں میں قلمبند فرمایا ہے۔',
    studyMethodologyEnglish: 'Constructs concise theological aphorisms safeguarding Divine Transcendence (Tanzih), Finality of Prophethood (Khatm al-Nubuwwah), the Ascension (Mi\'raj), the Grave trials, and companion honor.',
    topicalIndex: [
      { sectionNumber: 1, titleArabic: 'التوحيد وتنزيه الله تعالى', titleUrdu: 'توحید اور صفاتِ الٰہیہ میں تنزیہ', titleEnglish: 'Tawhid & Divine Transcendence', coreThemes: 'اللہ ایک ہے، بے نیاز ہے، اس کی کوئی شبیہ نہیں' },
      { sectionNumber: 2, titleArabic: 'نبوة سيدنا محمد ﷺ وخاتم الرسل', titleUrdu: 'نبوتِ مصطفیٰ ﷺ اور ختمِ نبوت', titleEnglish: 'Prophethood & Finality', coreThemes: 'رسول اللہ ﷺ خاتم النبیین اور سید الاولین ہیں' },
      { sectionNumber: 3, titleArabic: 'القرآن كلام الله غير مخلوق', titleUrdu: 'قرآن کلامِ الٰہی ہے غیر مخلوق', titleEnglish: 'The Quran as Uncreated Word', coreThemes: 'کلامِ باری تعالیٰ کی صفتی ابدیت' },
      { sectionNumber: 4, titleArabic: 'المعراج والشفاعة والحوض', titleUrdu: 'معراج، شفاعت اور حوضِ کوثر', titleEnglish: 'The Ascension & Intercession', coreThemes: 'جسمانی معراج، شفاعتِ کبریٰ، حوض و میزان' },
      { sectionNumber: 5, titleArabic: 'عدالة الصحابة وأهل البيت', titleUrdu: 'محبتِ صحابہ و احترامِ اہلِ بیت', titleEnglish: 'Veneration of Sahabah & Ahl al-Bayt', coreThemes: 'خلفائے راشدین کی ترتیب، تمام صحابہ سے محبت فرض ہے' },
    ]
  },

  // ==========================================
  // 8. IHYA ULUM AL-DIN (احیاء علوم الدین)
  // ==========================================
  'CANON-TAZ-001': {
    workId: 'CANON-TAZ-001',
    titleArabic: 'إحياء علوم الدين',
    titleTransliterated: 'Ihya \'Ulum al-Din (Revival of Religious Sciences)',
    authorNameUrdu: 'حجۃ الاسلام امام ابو حامد محمد بن محمد الغزالی الطوسی (رحمة الله عليه)',
    authorNameEnglish: 'Hujjat al-Islam Imam Abu Hamid Muhammad al-Ghazali (450–505 AH)',
    authorEra: '505ھ / طوس و بغداد و نیشاپور',
    madhhabOrOrientation: 'تزکیۂ نفس، تصوف اور اخلاقیاتِ شریعت',
    significanceUrdu: 'اسلامی تاریخ میں ظاہری فقہ اور باطنی اخلاص کو یکجا کرنے والی سب سے مشہور کتاب۔ امام نووی فرماتے ہیں: "کاد الاحیاء ان یکون قرآنا" (قریب تھا کہ احیاء علوم الدین اپنی جامعیت کی بنا پر قرآن کے بعد سب سے زیادہ پڑھی جانے والی کتاب بن جاتی)۔',
    significanceEnglish: 'The monumental magnum opus harmonizing external Islamic jurisprudence with internal spiritual sincerity (Ihsan). Restores spiritual life to formal outward observance and provides surgical remedies for spiritual diseases of the heart.',
    authorBioUrdu: '۴۵۰ھ میں طوس (ایران) میں ولادت ہوئی۔ بغداد کی جامعہ نظامیہ کے سربراہ بنے۔ دنیاوی شہرت چھوڑ کر ۱۰ سال گوشہ نشینی و سلوک اختیار کیا، بیت المقدس اور دمشق میں خلوت اختیار کی اور احیاء لکھی۔ ۵۰۵ھ میں طوس میں وصال فرمایا۔',
    authorBioEnglish: 'Born in Tus in 450 AH. Renowned professor of the Nizamiyyah in Baghdad. Renounced worldly fame for a decade of spiritual seclusion in Damascus and Jerusalem, authoring the Ihya. Passed away in 505 AH.',
    studyMethodologyUrdu: 'کتاب کو چار مساوی حصوں (عبادات، عادات، مہلکات، منجیات) میں تقسیم فرمایا ہے، جس میں ہر نیکی کا طریقہ اور دل کے گناہوں (ریا، حسد، غصہ، کبر) کا علاج طبیبانہ انداز میں بیان کیا ہے۔',
    studyMethodologyEnglish: 'Architected in four grand quarters (Acts of Worship, Social Customs, Destructive Vices of the Heart, and Saving Virtues). Treats inner spiritual maladies with clinical analytical precision.',
    topicalIndex: [
      { sectionNumber: 1, titleArabic: 'ربع العبادات', titleUrdu: 'ربع العبادات (نماز، زکوٰۃ، روزہ کے باطنی اسرار)', titleEnglish: 'Quarter 1: Inward Secrets of Worship', coreThemes: 'علم، طہارت کے درجات، خشوع فی الصلاۃ' },
      { sectionNumber: 2, titleArabic: 'ربع العادات', titleUrdu: 'ربع العادات (کھانے، نکاح، روزگار کے آداب)', titleEnglish: 'Quarter 2: Ethics of Daily Living', coreThemes: 'حلال کمائی، ازدواجی حقوق، صحبت و دوستی' },
      { sectionNumber: 3, titleArabic: 'ربع المهلكات', titleUrdu: 'ربع المہلکات (دل کو ہلاک کرنے والے گناہ)', titleEnglish: 'Quarter 3: Destructive Vices', coreThemes: 'عجب، کبر، حسد، ریاکاری، غصہ اور حرص' },
      { sectionNumber: 4, titleArabic: 'ربع المنجيات', titleUrdu: 'ربع المنجیات (نجات دلانے والے اخلاق)', titleEnglish: 'Quarter 4: Saving Virtues', coreThemes: 'توبہ، صبر و شکر، خوف و رجاء، زہد، اخلاص و محبت' },
    ]
  }
};

/**
 * Lookup helper to retrieve the scholarly profile for any canonical work ID.
 */
export function getCanonicalBookProfile(workId: string): CanonicalBookScholarlyProfile | null {
  return CANONICAL_BOOK_PROFILES[workId] || null;
}
