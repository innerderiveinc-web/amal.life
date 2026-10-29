export interface SmartFiqhItem {
  id: string;
  keywords: string[];
  questionUrdu: string;
  questionEnglish: string;
  hukmType: 'FARZ' | 'WAJIB' | 'SUNNAH' | 'JAIZ' | 'HARAM_MAKRUH' | 'MUFSID';
  hukmUrdu: string;
  hukmEnglish: string;
  summaryUrdu: string;
  summaryEnglish: string;
  canonicalReference: string;
  libraryBookId?: string;
}

export const SMART_FIQH_DATA: SmartFiqhItem[] = [
  {
    id: 'FIQH-SAFAR-001',
    keywords: ['qasr', 'safar', 'travel', 'musafir', 'shorten', 'قصر', 'سفر', 'مسافر'],
    questionUrdu: 'سفر میں قصر نماز کا حکم اور شرعی مسافت کیا ہے؟',
    questionEnglish: 'What is the ruling and distance threshold for shortening prayer (Qasr) during travel?',
    hukmType: 'WAJIB',
    hukmUrdu: 'واجب (4 رکعت فرض کو 2 رکعت پڑھنا واجب ہے)',
    hukmEnglish: 'Wajib (Obligatory to shorten 4-rak’ah Farz to 2 rak’ahs)',
    summaryUrdu: 'جب کوئی شخص 48 شرعی میل (تقریباً 77.4 کلومیٹر) کے ارادے سے اپنی بستی کی حدود سے نکلے، تو ظہر، عصر اور عشاء کی 4 رکعت فرض کو 2 پڑھنا واجب ہے۔ اگر جلدی نہ ہو تو سنتیں پڑھ لے۔',
    summaryEnglish: 'When traveling with intention for at least 48 Shar\'i miles (~77.4 km) beyond city limits, 4-rak\'ah Farz prayers (Dhuhr, Asr, Isha) must be shortened to 2 rak\'ahs. Sunnahs are performed if not in severe rush.',
    canonicalReference: 'الہدایۃ، کتاب الصلاۃ، باب صلاۃ المسافر ۱/۸۰؛ رد المحتار ۲/۱۲۱؛ بہارِ شریعت ۱/۷۴۰',
    libraryBookId: 'CANON-FIQ-HAN-001',
  },
  {
    id: 'FIQH-GHUSL-002',
    keywords: ['ghusl', 'faraiz', 'bath', 'janabat', 'impure', 'غسل', 'فرائض', 'جنابت'],
    questionUrdu: 'غسل کے فرائض کتنے ہیں اور ان کا طریقہ کیا ہے؟',
    questionEnglish: 'What are the obligatory integrals (Fara’id) of Ghusl and their procedure?',
    hukmType: 'FARZ',
    hukmUrdu: '۳ فرائض قطعی ہیں',
    hukmEnglish: '3 Definitive Obligatory Integrals',
    summaryUrdu: 'غسل کے 3 فرائض ہیں: ۱) منہ بھر کر کلی کرنا، ۲) نرم ہڈی تک ناک میں پانی چڑھانا، ۳) سر سے پاؤں تک پورے جسم پر اس طرح پانی بہانا کہ بال برابر جگہ بھی خشک نہ رہے۔',
    summaryEnglish: 'Ghusl has 3 obligatory acts: 1. Rinsing the entire mouth thoroughly (gargling if not fasting), 2. Rinsing soft nostrils up to the nasal bone, 3. Washing the entire body without leaving even a single hair dry.',
    canonicalReference: 'نور الإیضاح ص ۲۸؛ بہارِ شریعت حصہ دوم ۱/۳۱۵؛ الفتاویٰ الہندیۃ ۱/۱۳',
    libraryBookId: 'CANON-FIQ-HAN-001',
  },
  {
    id: 'FIQH-SAHW-003',
    keywords: ['sajdah sahw', 'forget', 'error', 'namaz ghalti', 'سجدہ سہو', 'بھول', 'غلطی'],
    questionUrdu: 'سجدہ سہو کب واجب ہوتا ہے اور اس کی ادائیگی کا طریقہ کیا ہے؟',
    questionEnglish: 'When does Sajdah Sahw become obligatory and how is it executed?',
    hukmType: 'WAJIB',
    hukmUrdu: 'واجب (نماز کی کمی دور کرنے کے لیے)',
    hukmEnglish: 'Wajib (Compensates for inadvertent omission/delay of Wajib acts)',
    summaryUrdu: 'نماز میں بھولے سے کسی واجب کے چھوٹ جانے یا کسی فرض یا واجب کے تاخیر سے ادا ہونے پر سجدہ سہو واجب ہوتا ہے۔ طریقہ: التحیات کے بعد صرف دائیں طرف سلام پھیریں، دو سجدے کریں، پھر التحیات، درود و دعا پڑھ کر دونوں طرف سلام پھیریں۔',
    summaryEnglish: 'Sajdah Sahw is required if a Wajib act is accidentally omitted or delayed, or a Farz is delayed. Method: Recite Tashahhud, turn right salaam only, perform two prostrations, return to seated posture, complete Tashahhud, Durood, Du\'a, and conclude with both salaams.',
    canonicalReference: 'الہدایۃ، باب سجود السہو ۱/۷۵؛ رد المحتار علی الدر المختار ۲/۷۸',
    libraryBookId: 'CANON-FIQ-HAN-001',
  },
  {
    id: 'FIQH-HAIDH-004',
    keywords: ['haidh', 'period', '10 days', 'istihadah', 'discharge', 'حیض', 'استحاضہ', 'دس دن'],
    questionUrdu: 'حیض کی کم از کم اور زیادہ سے زیادہ شرعی مدت کیا ہے؟',
    questionEnglish: 'What are the minimum and maximum Shar’i duration limits of menstruation (Haidh)?',
    hukmType: 'FARZ',
    hukmUrdu: 'شرعی حد مقرر ہے (کم از کم ۳ دن، زیادہ سے زیادہ ۱۰ دن)',
    hukmEnglish: 'Strict Shar’i Threshold (Min 3 days/72 hrs, Max 10 days/240 hrs)',
    summaryUrdu: 'احناف کے نزدیک حیض کی کم سے کم مدت 3 دن اور 3 راتیں (72 گھنٹے) ہے اور زیادہ سے زیادہ 10 دن اور 10 راتیں (240 گھنٹے) ہے۔ 72 گھنٹے سے کم یا 10 دن سے زیادہ کا خون استحاضہ (بیماری) ہے جس میں نماز معاف نہیں ہوتی۔',
    summaryEnglish: 'According to the Hanafi school, minimum Haidh duration is 3 full days/nights (72 hours), and maximum is 10 days/nights (240 hours). Bleeding outside these limits is Istihadah (irregular non-menstrual bleeding), requiring Wudu per prayer without leaving Salah.',
    canonicalReference: 'رد المحتار ۱/۲۸۳؛ بہارِ شریعت ۱/۳۷۱؛ الفتاویٰ الخانیۃ ۱/۳۷',
    libraryBookId: 'CANON-FIQ-HAN-001',
  },
  {
    id: 'FIQH-ZAKAT-005',
    keywords: ['zakat', 'gold', 'nisab', 'sona', 'silver', 'chandi', 'زکوۃ', 'سونا', 'نصاب'],
    questionUrdu: 'سونے اور چاندی پر زکوٰۃ کا نصاب اور شرح کیا ہے؟',
    questionEnglish: 'What is the Nisab threshold and payable rate on Gold, Silver, and Currency?',
    hukmType: 'FARZ',
    hukmUrdu: 'فرضِ قطعی (۲.۵ فیصد سالانہ)',
    hukmEnglish: 'Absolute Farz (2.5% annually upon completing lunar year)',
    summaryUrdu: 'اگر صرف سونا ہو تو نصاب ساڑھے سات تولہ (87.48 گرام) ہے۔ اگر سونا اور چاندی دونوں ہوں یا نقد رقم ہو تو ساڑھے باون تولہ چاندی (612.36 گرام) کی مالیت کے برابر نصاب پر سال پورا ہونے پر کل مالیت کا چالیسواں حصہ (2.5%) دینا فرض ہے۔',
    summaryEnglish: 'For pure gold alone, Nisab is 7.5 Tolas (87.48g). When mixing gold, silver, or cash wealth, the lower silver threshold of 52.5 Tolas (612.36g) applies. 2.5% of net trade/surplus wealth is payable after one full lunar year.',
    canonicalReference: 'الفتاویٰ الہندیۃ ۱/۱۷۸؛ رد المحتار ۲/۲۹۸؛ بہارِ شریعت حصہ پنجم ۱/۸۷۵',
    libraryBookId: 'CANON-FIQ-HAN-001',
  },
  {
    id: 'FIQH-WITR-006',
    keywords: ['witr', 'qunut', 'dua', 'وتر', 'قنوت', 'دعائے قنوت'],
    questionUrdu: 'نمازِ وتر کا شرعی حکم اور دعائے قنوت کا وجوب کیا ہے؟',
    questionEnglish: 'What is the theological status of Salatul Witr and Du’a al-Qunut?',
    hukmType: 'WAJIB',
    hukmUrdu: 'واجبِ مؤکد (فرض کے قریب درجہ)',
    hukmEnglish: 'Wajib al-Mu’akkad (Close in gravity to Farz)',
    summaryUrdu: 'امامِ اعظم ابو حنیفہ رحمۃ اللہ علیہ کے نزدیک وتر واجب ہے۔ اس کی تینوں رکعات اکٹھی پڑھی جاتی ہیں۔ تیسری رکعت میں قراءت کے بعد تکبیر کہہ کر کانوں تک ہاتھ اٹھانا اور دعائے قنوت پڑھنا واجب ہے۔',
    summaryEnglish: 'In the Hanafi madhhab, Witr is Wajib. It comprises 3 connected rak\'ahs. In the 3rd rak\'ah after recitation, raising hands to earlobes with Takbir and reciting Du\'a al-Qunut is strictly Wajib.',
    canonicalReference: 'الہدایۃ ۱/۶۶؛ تبیین الحقائق ۱/۱۷۴؛ درِ مختار ۲/۵',
    libraryBookId: 'CANON-FIQ-HAN-001',
  },
  {
    id: 'FIQH-INJECTION-007',
    keywords: ['injection', 'roza', 'fasting', 'drip', 'glucose', 'انجکشن', 'روزہ', 'ڈرپ'],
    questionUrdu: 'کیا روزے کی حالت میں انجکشن، گلوکوز یا ڈرپ لگوانے سے روزہ ٹوٹتا ہے؟',
    questionEnglish: 'Does receiving a medical injection or IV drip invalidate the fast?',
    hukmType: 'JAIZ',
    hukmUrdu: 'روزہ نہیں ٹوٹتا (مفتیٰ بہٖ قول)',
    hukmEnglish: 'Does not invalidate the fast (Standard Hanafi Fatwa)',
    summaryUrdu: 'گوشت، رگ یا جلد میں انجکشن یا ڈرپ لگوانے سے روزہ فاسد نہیں ہوتا، کیونکہ دوا یا خوراک قدرتی کھلے راستوں (منہ، ناک وغیرہ) سے پیٹ یا دماغ کے اصل جوف تک براہِ راست داخل نہیں ہوتی۔ بلا ضرورت طاقت کا انجکشن لگوانا مکروہِ تنزیہی ہے۔',
    summaryEnglish: 'Intramuscular or intravenous injections and drips do not invalidate the fast according to authoritative contemporary Hanafi consensus, as substances do not penetrate through natural orifices into primary digestive cavities.',
    canonicalReference: 'فتاویٰ رضویہ ۱۰/۵۰۸؛ فتاویٰ دار العلوم دیوبند ۶/۴۰۷؛ جدید فقہی مسائل ۱/۱۹۲',
    libraryBookId: 'CANON-FIQ-HAN-001',
  },
  {
    id: 'FIQH-NAILPOLISH-008',
    keywords: ['nail polish', 'wudu', 'waterproof', 'ناخن پالش', 'وضو', 'طہارت'],
    questionUrdu: 'کیا ناخن پالش کے ساتھ وضو اور غسل ہو جاتا ہے؟',
    questionEnglish: 'Is Wudu and Ghusl valid while wearing conventional nail polish?',
    hukmType: 'MUFSID',
    hukmUrdu: 'وضو اور غسل نہیں ہوتا (پالش اتارنا فرض ہے)',
    hukmEnglish: 'Purification is Invalid (Removing polish is obligatory)',
    summaryUrdu: 'روایتی ناخن پالش ناخنوں پر ایسی غیر مسام دار تہہ (impermeable layer) بنا دیتی ہے جو پانی کو ناخن تک پہنچنے سے روکتی ہے۔ اس کو مکمل اتارے بغیر وضو اور غسل درست نہیں ہوتا۔ وضو کے بعد پالش لگانا جائز ہے جب تک باوضو رہیں۔',
    summaryEnglish: 'Conventional nail lacquer creates an impermeable barrier that prevents water from reaching the keratin nail surface, preventing valid Wudu and Ghusl. It must be completely removed prior to purification.',
    canonicalReference: 'رد المحتار ۱/۱۵۴؛ فتاویٰ رضویہ ۱/۱۱۲؛ بہارِ شریعت ۱/۲۸۸',
    libraryBookId: 'CANON-FIQ-HAN-001',
  },
];
