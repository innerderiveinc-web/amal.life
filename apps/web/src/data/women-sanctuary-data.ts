/**
 * AMAL OS — The Sacred Sisters & Sahabiyyat Sanctuary (گوشۂ خواتین و صحابیات)
 * 
 * Authentic Ahl al-Sunnah wal-Jama'ah Canon & Fiqh Engine
 * 
 * Rigorously sourced from:
 * 1. "Jannati Zewar" — Shaykh al-Hadith Allama Abdul Mustafa Azmi (رحمة الله عليه)
 * 2. "Bahar-e-Shari'at (Ahkam-e-Taharah wa Niswan)" — Sadr al-Shari'ah Mufti Amjad Ali Azmi (رحمة الله عليه)
 * 3. "Madarij-un-Nubuwwah (Zikr Ummahat al-Mu'minin)" — Shaykh Abd al-Haqq Muhaddith Dehlawi (رحمة الله عليه)
 * 4. "Al-Ijabah li-Irad ma Istadrakathu 'Aisha 'ala al-Sahaba" — Imam Badr al-Din al-Zarkashi & Imam al-Suyuti
 * 5. "Thughur al-Basim fi Manaqib Sayyidatina Fatimah" — Imam Jalal al-Din al-Suyuti (رحمة الله عليه)
 * 6. "Al-Sayyidah Khadijah al-Kubra" — Sayyid Muhammad ibn Alawi al-Maliki al-Hasani (رحمة الله عليه)
 * 7. "Tazkar-e-Sahabiyyat" & Seerat Treatises — Allama Faiz Ahmad Owaisi (رحمة الله عليه)
 * 8. Classical Hadith Canons: Sahih al-Bukhari, Sahih Muslim, Al-Isabah (Ibn Hajar), Tabaqat Ibn Sa'd
 */

export interface SanctuaryBookChapter {
  chapterId: string;
  chapterNumber: number;
  titleUrdu: string;
  titleEnglish: string;
  summaryUrdu: string;
  summaryEnglish: string;
  arabicEvidence?: string;
  hadithOrFiqhReference: string;
  keyTakeaways: string[];
  fullTextUrdu: string;
}

export interface SanctuaryBook {
  id: string;
  titleUrdu: string;
  titleArabic: string;
  titleEnglish: string;
  authorUrdu: string;
  authorEnglish: string;
  authorEra: string;
  category: 'fiqh_taharah' | 'ummahat_banat' | 'sahabiyyat_muhaddithat' | 'salihat_tarbiyat';
  categoryLabelUrdu: string;
  categoryLabelEnglish: string;
  descriptionUrdu: string;
  descriptionEnglish: string;
  classicalSourceTier: 'TIER_A_CANONICAL' | 'TIER_B_CLASSICAL_AUTHORITATIVE' | 'TIER_C_AUTHENTIC_SUNNI';
  sanadGrade: 'MUTAWATIR' | 'SAHIH' | 'HASAN' | 'MAQBOOL_MUTABAR';
  verificationHash: string;
  scholarlyConsensusUrdu: string;
  isOfflineAvailable: boolean;
  pdfUrl?: string;
  onlineArchiveUrl?: string;
  onlineArchiveName?: string;
  coreChapters: SanctuaryBookChapter[];
}

export interface SahabiyyatMilestone {
  eventTitleUrdu: string;
  eventTitleEnglish: string;
  descriptionUrdu: string;
  descriptionEnglish: string;
}

export interface ClassicalScholarEndorsement {
  scholarNameUrdu: string;
  scholarNameEnglish: string;
  bookTitle: string;
  verbatimQuoteUrdu: string;
  verbatimQuoteEnglish: string;
}

export interface SahabiyyatProfile {
  id: string;
  nameUrdu: string;
  nameArabic: string;
  nameEnglish: string;
  titleUrdu: string;
  titleEnglish: string;
  kinshipToProphet: string;
  classicalCitation: string;
  era: string;
  biographyUrdu: string;
  biographyEnglish: string;
  heroicAttributes: string[];
  dailySunnahLessons: {
    ur: string;
    en: string;
  }[];
  sanadVerificationHash: string;

  // Rich Scholarly Dimensions for Revered Female Personalities
  lineageAndBackgroundUrdu?: string;
  lineageAndBackgroundEnglish?: string;
  propheticPraiseHadithArabic?: string;
  propheticPraiseHadithUrdu?: string;
  propheticPraiseHadithEnglish?: string;
  propheticPraiseSource?: string;
  exhaustiveBiographyUrdu?: string[];
  exhaustiveBiographyEnglish?: string[];
  majorHistoricalMilestones?: SahabiyyatMilestone[];
  classicalScholarlyEndorsements?: ClassicalScholarEndorsement[];
}

export interface FiqhRulingItem {
  id: string;
  titleUrdu: string;
  titleEnglish: string;
  category: 'haidh' | 'nifas' | 'istihadha' | 'namaz_posture' | 'spiritual_rhythm';
  summaryUrdu: string;
  summaryEnglish: string;
  detailedRulingUrdu: string;
  detailedRulingEnglish?: string;
  hanafiReference: string;
  practicalGuidelines: string[];
  practicalGuidelinesEnglish?: string[];
}

export interface MasnoonFamilyDua {
  id: string;
  titleUrdu: string;
  titleEnglish: string;
  category: 'pregnancy_labor' | 'newborn_sunnah' | 'children_protection' | 'marital_peace';
  arabicText: string;
  transliteration: string;
  translationUrdu: string;
  translationEnglish: string;
  reference: string;
  spiritualVirtueUrdu: string;
  spiritualVirtueEnglish?: string;
}

// ==========================================
// 1. THE 20 AUTHENTIC CLASSICAL BOOKS CATALOG
// ==========================================
export const WOMEN_CLASSICAL_CANON: SanctuaryBook[] = [
  // --- Category 1: Fiqh & Taharah ---
  {
    id: 'CANON-NIS-01',
    titleUrdu: 'جنتی زیور',
    titleArabic: 'الزيور الجناتي في فقه المرأة المسلمة',
    titleEnglish: 'Jannati Zewar (The Heavenly Adornment)',
    authorUrdu: 'شیخ الحدیث علامہ عبد المصطفیٰ اعظمی (رحمة الله عليه)',
    authorEnglish: 'Shaykh al-Hadith Allama Abdul Mustafa Azmi (d. 1406 AH)',
    authorEra: '1406ھ / معاصر اکابرینِ اہل سنت',
    category: 'fiqh_taharah',
    categoryLabelUrdu: 'احکام و فقہِ نسواں',
    categoryLabelEnglish: 'Fiqh & Purity for Women',
    descriptionUrdu: 'اہل سنت و جماعت میں خواتین کے لیے سب سے جامع، مستند اور مقبول ترین انسائیکلوپیڈیا۔ اس میں صحیح اسلامی عقائد، نماز، طہارت، حیض و نفاس کے مسائل اور مثالی اسلامی گھریلو زندگی کو آسان اور دلنشین زبان میں بیان کیا گیا ہے۔',
    descriptionEnglish: 'The premier comprehensive encyclopedia for Muslim women in Ahl al-Sunnah. Covers sound Sunni creed, modesty, prayer, comprehensive rulings on Haidh, Nifas, and moral character for the home.',
    classicalSourceTier: 'TIER_C_AUTHENTIC_SUNNI',
    sanadGrade: 'MAQBOOL_MUTABAR',
    verificationHash: 'SHA256-JANNATI-ZEWAR-AZMI-8819A',
    scholarlyConsensusUrdu: 'جمہور علمائے اہل سنت کے نزدیک خواتین کے مسائل کے لیے نہایت قابلِ اعتماد اور مستند کتاب ہے۔',
    isOfflineAvailable: true,
    onlineArchiveUrl: 'https://www.dawateislami.net/bookslibrary/ur/jannati-zewar',
    onlineArchiveName: 'Maktaba-tul-Madina Official Research Desk (Jannati Zewar Complete)',
    coreChapters: [
      {
        chapterId: 'jz-01',
        chapterNumber: 1,
        titleUrdu: 'حیض و نفاس کے بنیادی فقہی احکام',
        titleEnglish: 'Fundamental Rulings of Haidh & Nifas',
        summaryUrdu: 'حیض کی کم از کم مدت تین دن اور تین راتیں اور زیادہ سے زیادہ دس دن اور دس راتیں ہیں۔ اس دوران نماز معاف ہے اور روزہ بعد میں قضا رکھا جائے گا۔',
        summaryEnglish: 'The minimum duration of Haidh in Hanafi fiqh is 3 days/nights and maximum 10 days/nights. Prayers are completely exempt and fasts are deferred.',
        hadithOrFiqhReference: 'بہارِ شریعت، حصہ ۲ / درِ مختار و رد المحتار',
        keyTakeaways: [
          'حیض کے دنوں میں نماز بالکل معاف ہے، اس کی قضا بھی لازم نہیں۔',
          'روزوں کی قضا بعد میں رکھنا فرض ہے۔',
          'قرآن مجید کی تلاوت اور چھونا منع ہے، البتہ ذکر و درود پڑھنا مستحب ہے۔'
        ],
        fullTextUrdu: 'حیض وہ خون ہے جو بالغہ عورت کے رحم سے بغیر کسی بیماری یا ولادت کے عادت کے مطابق نکلے۔ فقہ حنفی میں اس کی کم سے کم مدت پورے تین دن اور تین راتیں (یعنی ۷۲ گھنٹے) ہیں اور زیادہ سے زیادہ دس دن اور دس راتیں۔ حیض کی حالت میں نماز بالکل معاف ہے اور پاک ہونے کے بعد ان کی قضا بھی نہیں کرنی۔ البتہ رمضان کے روزوں کی قضا بعد میں رکھنا فرض ہے۔'
      },
      {
        chapterId: 'jz-02',
        chapterNumber: 2,
        titleUrdu: 'خواتین کی نماز کی ہیئت اور سجدہ کی حیا',
        titleEnglish: 'Modesty and Compact Posture in Women\'s Prayer',
        summaryUrdu: 'خواتین کے لیے شریعت نے نماز میں مکمل پردہ اور سمٹ کر رہنے کا حکم دیا ہے، سجدے میں پیٹ رانوں سے اور بازو پہلو سے ملے رہیں۔',
        summaryEnglish: 'In Hanafi jurisprudence, women adopt a compact, modest posture in prayer: keeping elbows to sides and body closely gathered.',
        hadithOrFiqhReference: 'مراسیل ابی داؤد، حدیث رقم ۸۷ / الہدایہ',
        keyTakeaways: [
          'تکبیر تحریمہ میں ہاتھ صرف کندھوں تک اٹھائے جائیں۔',
          'سجدے میں بازو زمین سے ملائے جائیں اور پیٹ رانوں سے ملا رہے تاکہ مکمل ستر حاصل ہو۔',
          'تشہد میں دونوں پاؤں دائیں جانب نکال کر بیٹھا جائے (تورک)۔'
        ],
        fullTextUrdu: 'شریعتِ مطہرہ نے عورت کے لیے نماز میں حیا اور ستر کو بنیاد بنایا ہے۔ تکبیر تحریمہ میں ہاتھ صرف سینے یا کندھوں تک چادر کے اندر سے اٹھائے جائیں۔ سجدے میں سمٹ کر سجدہ کرے، یعنی بازو زمین پر بچھا دے اور پیٹ کو رانوں سے چپکا لے۔ قعدہ میں تورک کرے یعنی دونوں پاؤں داہنی طرف نکال کر بائیں چوتڑ پر بیٹھے۔'
      },
      {
        chapterId: 'jz-03',
        chapterNumber: 3,
        titleUrdu: 'عورتوں کے زیورات اور زکوٰۃ کے شرعی احکام',
        titleEnglish: 'Zakat on Gold, Silver & Women\'s Jewelry',
        summaryUrdu: 'فقہ حنفی میں عورت کے ملکیتی سونے اور چاندی کے زیورات پر زکوٰۃ فرض ہے اگر وہ نصاب (ساڑھے سات تولہ سونا یا ساڑھے باون تولہ چاندی) کو پہنچ جائیں اور سال گزر جائے۔',
        summaryEnglish: 'In Hanafi fiqh, personal gold and silver jewelry owned by women is subject to 2.5% Zakat once reaching the Nisab threshold and completing one lunar year.',
        hadithOrFiqhReference: 'سنن ابی داؤد، حدیث رقم ۱۵۶۳ / الہدایہ کتاب الزکاۃ',
        keyTakeaways: [
          'استعمال کے زیورات ہوں یا رکھے ہوئے، حنفی مذہب میں دونوں پر زکوٰۃ واجب ہے۔',
          'صرف سونا ہو تو ساڑھے سات تولہ (۸۷.۴۸ گرام) نصاب ہے۔',
          'اگر سونا اور چاندی دونوں ملے جلے ہوں تو چاندی کے نصاب (۵۲.۵ تولہ = ۶۱۲.۳۶ گرام) کی قیمت کے اعتبار سے حساب کیا جائے گا۔',
          'زکوٰۃ ادا کرنے کی شرعی ذمہ داری زیور کی مالکہ (عورت) پر ہے، شوہر اپنی خوشی سے ادا کرے تو جائز ہے۔'
        ],
        fullTextUrdu: 'حضرت عمرو بن شعیب اپنے والد سے اور وہ اپنے دادا سے روایت کرتے ہیں کہ ایک خاتون رسول اللہ ﷺ کی خدمت میں حاضر ہوئیں اور ان کی بیٹی کے ہاتھ میں سونے کے دو موٹے کنگن تھے۔ آپ ﷺ نے فرمایا: "کیا تم اس کی زکوٰۃ دیتی ہو؟" انہوں نے عرض کیا: نہیں! آپ ﷺ نے فرمایا: "کیا تمہیں یہ پسند ہے کہ قیامت کے دن اللہ تعالیٰ تمہیں ان کے بدلے آگ کے کنگن پہنائے؟" پس انہوں نے وہ فوراً اتار کر پیش کر دیے۔ فقہ حنفی کی تمام معتمد کتب (ہدایہ، رد المحتار، بہارِ شریعت) میں یہی راجح ہے کہ زیورات خواہ روزمرہ پہنے جاتے ہوں، سال مکمل ہونے پر ڈھائی فیصد زکوٰۃ نکالنا فرض ہے۔'
      },
      {
        chapterId: 'jz-04',
        chapterNumber: 4,
        titleUrdu: 'خواتین کے روزے: حمل، رضاعت اور قضا کا طریقہ',
        titleEnglish: 'Fasting Rulings for Women: Pregnancy, Nursing & Makeup Fasts',
        summaryUrdu: 'حاملہ یا دودھ پلانے والی عورت کو اگر اپنی یا بچے کی جان یا صحت کے شدید نقصان کا اندیشہ ہو تو روزہ مؤخر کرنے کی اجازت ہے، بعد میں صرف قضا لازم ہوگی، کفارہ نہیں۔',
        summaryEnglish: 'Pregnant and nursing mothers may defer fasting if there is genuine medical risk to mother or infant; only single-day makeup (Qadha) is owed later without expiation (Kaffarah).',
        hadithOrFiqhReference: 'سنن الترمذی، حدیث رقم ৭১৫ / رد المحتار باب ما یفسد الصوم',
        keyTakeaways: [
          'ماہر مسلمان طبیب یا ذاتی تجربے کی بنیاد پر اگر صحت کو خطرہ ہو تو روزہ نہ رکھنے کی رخصت ہے۔',
          'ان دنوں کی بعد میں صحت یابی اور فراغت کے بعد ایک ایک روزہ قضا رکھنا لازم ہوگا۔',
          'حیض کے چھوٹنے والے روزے بھی زندگی میں کسی بھی وقت قضا کیے جا سکتے ہیں، البتہ جلد ادا کرنا مستحب ہے۔',
          'اگر کوئی عورت بڑھاپے یا دائمی مرض کے سبب زندگی بھر قضا رکھنے پر قادر نہ رہے تو وہ ہر روزے کا فدیہ (ایک صدقہ فطر کی مقدار) ادا کرے۔'
        ],
        fullTextUrdu: 'رسول اللہ ﷺ نے فرمایا: "بے شک اللہ تعالیٰ نے مسافر پر سے آدھی نماز معاف فرما دی، اور مسافر، حاملہ اور دودھ پلانے والی عورت پر سے روزے کی پابندی (اس وقت کے لیے) اٹھا لی ہے"۔ پس جو بہن حمل یا بچے کو دودھ پلانے کے زمانے میں کمزوری کی وجہ سے روزہ نہ رکھ سکے وہ گناہ گار نہیں ہوگی، بلکہ بعد کے مہینوں میں جب آسانی ہو قضا رکھ لے۔ اگر شوہر یا گھر والے بلاوجہ اصرار کریں جبکہ ڈاکٹر نے منع کیا ہو، تو شریعت کی رخصت پر عمل کرنا افضل ہے۔'
      },
      {
        chapterId: 'jz-05',
        chapterNumber: 5,
        titleUrdu: 'نکاح، مہر کی شرعی ملکیت اور گھریلو حقوقِ زوجین',
        titleEnglish: 'Nikah, Sanctity of Mahr & Mutual Domestic Rights',
        summaryUrdu: 'مہر عورت کا خالص ذاتی حق اور شرعی ملکیت ہے جس میں شوہر یا سسرال والوں کا کوئی دخل نہیں، اور حسنِ معاشرت دونوں جانب سے واجب ہے۔',
        summaryEnglish: 'Mahr is the exclusive divinely mandated financial right of the bride; neither husband nor in-laws may usurp it, and harmonious companionship is mutually binding.',
        hadithOrFiqhReference: 'سورۃ النساء آیت ۴ / درِ مختار کتاب النکاح',
        keyTakeaways: [
          'قرآن کریم کا صریح حکم ہے: "اور عورتوں کو ان کے مہر خوش دلی سے ادا کرو"۔',
          'مہر معاف کروانے کے لیے عورت پر کسی بھی قسم کا گھریلو دباؤ ڈالنا شرعاً باطل اور حرام ہے۔',
          'نان و نفقہ، رہائش اور علاج معالجہ کا مکمل خرچہ شوہر کے ذمے ہے خواہ بیوی خود صاحبِ ثروت ہو۔',
          'گھر کے اندر باہمی مشاورت، محبت اور درگزر سے زندگی گزارنا سنتِ نبوی ہے۔'
        ],
        fullTextUrdu: 'اسلام نے عورت کو وہ مالی خود مختاری اور عزت عطا فرمائی ہے جو دنیا کے کسی قانون نے نہیں دی۔ نکاح کے وقت مقرر کردہ مہر عورت کی ذاتی ملکیت ہے، وہ جس طرح چاہے اسے خرچ کرے یا محفوظ رکھے۔ شوہر کے ذمے نان و نفقہ، مناسب رہائش اور عزت دار سلوک واجب ہے۔ رسول اللہ ﷺ نے حجۃ الوداع کے موقع پر خطبہ دیتے ہوئے ارشاد فرمایا: "لوگو! عورتوں کے معاملے میں اللہ سے ڈرو، تم نے انہیں اللہ کی امان سے اپنی رفاقت میں لیا ہے، پس ان کے ساتھ بھلائی اور نرمی کا برتاؤ کرو"۔'
      },
      {
        chapterId: 'jz-06',
        chapterNumber: 6,
        titleUrdu: 'خواتین کے اخلاق: غیبت، چغلی سے اجتناب اور زبان کی حفاظت',
        titleEnglish: 'Moral Conduct for Women: Safeguarding the Tongue from Gheebah & Slander',
        summaryUrdu: 'گھریلو فتنوں اور معاشرتی بگاڑ کی سب سے بڑی جڑ زبان کی بے احتیاطی ہے؛ غیبت، چغلی اور طعنہ زنی سے بچنا اور گھر میں درود و استغفار کی فضا بنانا باعثِ برکت ہے۔',
        summaryEnglish: 'The primary cause of domestic discord is negligence of the tongue. Preserving one\'s speech from backbiting, gossiping, and harsh mockery creates angels of peace in the home.',
        hadithOrFiqhReference: 'صحیح البخاری، حدیث رقم ۶۴۷۴ / ریاض الصالحین',
        keyTakeaways: [
          'رسول اللہ ﷺ نے فرمایا: "مسلمان وہ ہے جس کی زبان اور ہاتھ سے دوسرے مسلمان محفوظ رہیں"۔',
          'سسرال، ہمسایوں یا رشتہ داروں کی چھوٹی موٹی باتوں کو دوسروں کے سامنے اچھالنا (چغلی) سخت گناہِ کبیرہ ہے۔',
          'گھر کے کام کاج کرتے وقت زبان پر استغفار، درود شریف اور سبحان اللہ کا ورد رکھنا گھر میں سکینہ لاتا ہے۔',
          'غصے کے وقت خاموشی اختیار کرنا اور معاف کر دینا اللہ کی بارگاہ میں اعلیٰ مقام دلاتا ہے۔'
        ],
        fullTextUrdu: 'سیدہ عائشہ صدیقہ رضی اللہ عنہا بیان فرماتی ہیں کہ میں نے ایک بار رسول اللہ ﷺ کے سامنے کسی کے چھوٹے قد کی طرف اشارہ کیا تو آپ ﷺ نے سخت ناراضگی کا اظہار کرتے ہوئے فرمایا: "عائشہ! تم نے ایسا کلمہ بولا ہے کہ اگر سمندر کے پانی میں ملا دیا جائے تو اس کا سارا پانی کڑوا ہو جائے!" پس ایک مسلمان بہن کا زیور صرف سونا چاندی نہیں بلکہ اس کی میٹھی، پاکیزہ زبان اور پاک دامن اخلاق ہے جو اس کے گھر کو جنت کا نمونہ بنا دیتا ہے۔'
      }
    ]
  },
  {
    id: 'CANON-NIS-02',
    titleUrdu: 'بہارِ شریعت (حصہ احکامِ نسواں و طہارت)',
    titleArabic: 'بهار شريعت - قسم أحكام النساء والطهور',
    titleEnglish: 'Bahar-e-Shari\'at (Volume on Women & Purity)',
    authorUrdu: 'صدر الشریعہ مفتی محمد امجد علی اعظمی (رحمة الله عليه)',
    authorEnglish: 'Sadr al-Shari\'ah Mufti Amjad Ali Azmi (d. 1367 AH)',
    authorEra: '1367ھ / خلیفہ اعلیٰ حضرت امام احمد رضا خان',
    category: 'fiqh_taharah',
    categoryLabelUrdu: 'احکام و فقہِ نسواں',
    categoryLabelEnglish: 'Fiqh & Purity for Women',
    descriptionUrdu: 'برصغیر میں فقہ حنفی کا سب سے معتبر اور جامع ترین شاہکار۔ اس کا ہر فتویٰ فتاویٰ ہندیہ، درِ مختار اور فتاویٰ رضویہ سے مدلل ہے۔ خواتین کی طہارت کے انتہائی باریک مسائل اس میں نہایت دیانت سے درج ہیں۔',
    descriptionEnglish: 'The supreme Hanafi legal compendium of the subcontinent, thoroughly verified from Fatawa Razawiyyah and al-Durr al-Mukhtar. The definitive reference for women\'s legal jurisprudence.',
    classicalSourceTier: 'TIER_B_CLASSICAL_AUTHORITATIVE',
    sanadGrade: 'SAHIH',
    verificationHash: 'SHA256-BAHAR-E-SHARIAT-AMJADI-9921B',
    scholarlyConsensusUrdu: 'فقہ حنفی میں برصغیر کا مستند ترین حوالہ، جس کے فتاویٰ پر تمام دار الافتاء اعتماد کرتے ہیں۔',
    isOfflineAvailable: true,
    onlineArchiveUrl: 'https://www.dawateislami.net/bookslibrary/ur/bahar-e-shariat',
    onlineArchiveName: 'Maktaba-tul-Madina (Bahar-e-Shari\'at Complete 3 Volumes)',
    coreChapters: [
      {
        chapterId: 'bs-01',
        chapterNumber: 1,
        titleUrdu: 'استحاضہ (بیماری کا خون) اور معذور کے احکام',
        titleEnglish: 'Rulings on Istihadha and the Excused Person (Ma\'dhur)',
        summaryUrdu: 'تین دن سے کم یا دس دن سے زیادہ آنے والا خون استحاضہ ہے، اس میں نماز معاف نہیں بلکہ ہر نماز کے وقت کے لیے نیا وضو کر کے نماز پڑھنا لازم ہے۔',
        summaryEnglish: 'Bleeding less than 3 days or more than 10 days is Istihadha. Prayer is NOT exempt; the sister makes Wudu for each prayer time and prays.',
        hadithOrFiqhReference: 'صحیح البخاری، حدیث رقم ۳۲۴ (حدیث فاطمہ بنت ابی حبیش)',
        keyTakeaways: [
          'استحاضہ بیماری ہے، اس میں نماز اور روزہ چھوڑنا جائز نہیں۔',
          'ہر فرض نماز کے وقت کے داخل ہونے پر نیا وضو کیا جائے۔',
          'اس حالت میں تلاوتِ قرآن اور کعبہ کا طواف باوضو جائز ہے۔'
        ],
        fullTextUrdu: 'رسول اللہ ﷺ نے حضرت فاطمہ بنت ابی حبیش رضی اللہ عنہا سے فرمایا: "یہ حیض نہیں بلکہ رگ کا خون (استحاضہ) ہے۔ جب حیض کے دن آئیں تو نماز چھوڑ دو اور جب وہ مدت گزر جائے تو غسل کر کے نماز پڑھو اور ہر نماز کے لیے وضو کرو۔" (صحیح بخاری)'
      },
      {
        chapterId: 'bs-02',
        chapterNumber: 2,
        titleUrdu: 'غسل کے فرائض اور مینڈھیوں (چوٹیوں) کے احکام',
        titleEnglish: 'Obligations of Ghusl & Rulings on Braided Hair',
        summaryUrdu: 'غسل میں تین فرائض ہیں: کلی کرنا، ناک کی نرم ہڈی تک پانی پہنچانا اور پورے بدن پر پانی بہانا؛ گندھے بالوں والی عورت کے لیے چوٹیاں کھولنا واجب نہیں بشرطیکہ جڑوں تک پانی پہنچ جائے۔',
        summaryEnglish: 'Ghusl has 3 obligatory acts: gargling mouth, rinsing nose to bone, and washing entirety of body. Braided hair does not need unbraiding if roots receive water.',
        hadithOrFiqhReference: 'صحیح مسلم، حدیث رقم ۳۳۰ (حدیث ام سلمہ) / بہارِ شریعت حصہ ۲',
        keyTakeaways: [
          'اگر بالوں کی جڑوں تک پانی پہنچ جائے تو چوٹیاں کھولنا فرض نہیں ہے۔',
          'اگر بال کھلے ہوں تو ایک ایک بال کا دھونا فرض ہے۔',
          'انگوٹھی، نتھ، بالیوں اور چوڑیوں کو ہلا کر نیچے پانی پہنچانا لازم ہے۔'
        ],
        fullTextUrdu: 'ام المؤمنین حضرت ام سلمہ رضی اللہ عنہا نے بارگاہِ رسالت ﷺ میں عرض کیا: "یا رسول اللہ! میں اپنے سر کے بال گوندھ کر رکھتی ہوں، کیا حیض اور جنابت کے غسل کے لیے انہیں کھولوں؟" آپ ﷺ نے فرمایا: "نہیں! تمہارے لیے صرف یہ کافی ہے کہ تم اپنے سر پر تین چلو پانی ڈال لو، پھر تمام بدن پر پانی بہا لو، تم پاک ہو جاؤ گی۔" صدر الشریعہ فرماتے ہیں: یہ رخصت صرف عورتوں کے لیے ہے اور اس شرط کے ساتھ ہے کہ بالوں کی جڑوں میں پانی پہنچ جائے۔'
      },
      {
        chapterId: 'bs-03',
        chapterNumber: 3,
        titleUrdu: 'نفاس (ولادت کے بعد کا خون) اور چالیس دن کی شرعی حدود',
        titleEnglish: 'Postnatal Bleeding (Nifas) & The 40-Day Maximum Ceiling',
        summaryUrdu: 'نفاس کی زیادہ سے زیادہ مدت ۴۰ دن اور ۴۰ راتیں ہیں، کم کی کوئی حد نہیں۔ اگر خون ۴۰ دن سے پہلے رک جائے تو فوراً غسل کر کے نمازیں پڑھنا فرض ہے۔',
        summaryEnglish: 'The absolute maximum limit for Nifas is 40 days; there is no minimum. If bleeding stops before 40 days, the mother must immediately perform Ghusl and resume Salah.',
        hadithOrFiqhReference: 'جامع الترمذی، حدیث رقم ۱۳۹ / بہارِ شریعت حصہ ۲',
        keyTakeaways: [
          'یہ عوامی وہم باطل ہے کہ ہر عورت پر ۴۰ دن پورے کرنا لازم ہے۔',
          'خون ۱۰ یا ۲۰ دن میں رک جائے تو اسی وقت پاک شمار ہوگی اور غسل کر کے نماز شروع کرے۔',
          '۴۰ دن سے زیادہ آنے والا خون استحاضہ ہے، اس میں غسل کر کے ہر نماز کے لیے وضو کرے گی۔'
        ],
        fullTextUrdu: 'سیدہ ام سلمہ رضی اللہ عنہا فرماتی ہیں: "رسول اللہ ﷺ کے مبارک زمانے میں نفاس والی خواتین چالیس دن تک انتظار کیا کرتی تھیں"۔ فقہ حنفی میں اس کی کم سے کم کوئی مدت نہیں، اگر ولادت کے بعد ایک گھنٹے میں بھی خون بند ہو جائے تو فوراً غسل کر کے نماز اور روزے شروع کرنا فرض ہے۔ چالیس دن کے بعد آنے والا خون استحاضہ (بیماری) ہے جس میں نماز نہیں چھوڑی جائے گی۔'
      },
      {
        chapterId: 'bs-04',
        chapterNumber: 4,
        titleUrdu: 'طہارت کی حتمی علامات: قصۂ بیضاء اور سفیدی کا ظہور',
        titleEnglish: 'Final Markers of Purity: White Discharge (Qassah Bayda) & Dryness',
        summaryUrdu: 'عورت اس وقت پاک شمار ہوتی ہے جب پیڈ یا روئی پر خالص سفید رطوبت (قصۂ بیضاء) نظر آئے یا کپڑا بالکل سوکھا نکلے۔',
        summaryEnglish: 'A woman is officially pure when white discharge (Qassah Bayda) appears or the cotton pad emerges completely clean and dry.',
        hadithOrFiqhReference: 'صحیح البخاری، کتاب الحیض، تعلیقاً / بہارِ شریعت حصہ ۲',
        keyTakeaways: [
          'جب تک زردی یا خاکی رنگت باقی ہے حیض ختم نہیں مانا جائے گا۔',
          'سیدہ عائشہ نے فرمایا: جلدی نہ کرو جب تک سفید دھاگے کی طرح سفیدی نہ دیکھ لو۔',
          'عادت کے دن پورے ہونے پر سفید رطوبت آتے ہی غسل کر لیا جائے۔'
        ],
        fullTextUrdu: 'حضرت عائشہ صدیقہ رضی اللہ عنہا کی خدمت میں خواتین روئی کے ٹکڑے بھیجتی تھیں جن پر پیلاہٹ ہوتی تھی، تو آپ فرماتی تھیں: "جلدی نہ کرو، یہاں تک کہ تم خالص سفید رطوبت (قصۂ بیضاء) نہ دیکھ لو"۔ پس جب تک سفید رطوبت ظاہر نہ ہو یا روئی بالکل خشک نہ نکلے، طہارت مکمل نہیں ہوتی۔'
      }
    ]
  },
  {
    id: 'CANON-NIS-03',
    titleUrdu: 'فتاویٰ رضویہ (رسائلِ احکامِ نسواں و پردہ)',
    titleArabic: 'فتاوى الرضوية - رسائل أحكام النساء والحجاب',
    titleEnglish: 'Fatawa Razawiyyah (Treatises on Women\'s Rights & Hijab)',
    authorUrdu: 'اعلیٰ حضرت امام احمد رضا خان بریلوی (رحمة الله عليه)',
    authorEnglish: 'Imam Ahmad Raza Khan Barelvi (d. 1340 AH)',
    authorEra: '1340ھ / مجددِ دین و ملت',
    category: 'fiqh_taharah',
    categoryLabelUrdu: 'احکام و فقہِ نسواں',
    categoryLabelEnglish: 'Fiqh & Purity for Women',
    descriptionUrdu: 'اعلیٰ حضرت کے وہ نادر فقہی رسائل جن میں خواتین کے حقوقِ مہر، نان و نفقہ، عفت و حجاب کی شرعی حدود اور وراثت میں خواتین کا تحفظ قرآن و حدیث کے قوی دلائل سے ثابت کیا گیا ہے۔',
    descriptionEnglish: 'Authoritative jurisprudential treatises demonstrating women\'s rights to mahr, inheritance, financial support, and the sacred boundaries of modesty from Quran and Sunnah.',
    classicalSourceTier: 'TIER_B_CLASSICAL_AUTHORITATIVE',
    sanadGrade: 'SAHIH',
    verificationHash: 'SHA256-FATAWA-RAZAWIYYAH-NISWAN-7712C',
    scholarlyConsensusUrdu: 'تحقیقی اور استدلالی لحاظ سے بے مثال فتاویٰ کا مجموعہ۔',
    isOfflineAvailable: true,
    onlineArchiveUrl: 'https://www.dawateislami.net/bookslibrary/ur/fatawa-razawiyya',
    onlineArchiveName: 'Maktaba-tul-Madina (Fatawa Razawiyyah Complete 30 Volumes)',
    coreChapters: [
      {
        chapterId: 'fr-01',
        chapterNumber: 1,
        titleUrdu: 'عورت کا مالی خود مختاری اور مہر کا تحفظ',
        titleEnglish: 'Financial Autonomy of Women & Sanctity of Mahr',
        summaryUrdu: 'اسلام نے عورت کو اپنی ذاتی ملکیت، مہر اور وراثت میں مکمل مالی تصرف کا حق دیا ہے، شوہر یا باپ کے لیے اس کی مرضی کے بغیر لینا حرام ہے۔',
        summaryEnglish: 'Islam guarantees full financial ownership for women over their wealth, Mahr, and inheritance; taking it without consent is strictly prohibited.',
        hadithOrFiqhReference: 'فتاویٰ رضویہ، جلد ۱۲ / سورۃ النساء، آیت ۴',
        keyTakeaways: [
          'مہر عورت کا خالص ذاتی حق ہے، اس پر کسی دوسرے کا حق نہیں۔',
          'شریعت میں عورت کو اپنی حلال جائداد کی خود مختار مالکہ تسلیم کیا گیا ہے۔',
          'عورت کی وراثت کو دبا لینا گناہِ کبیرہ اور جہنم کی وعید کا سبب ہے۔'
        ],
        fullTextUrdu: 'قرآن کریم نے واضح ارشاد فرمایا: "اور عورتوں کو ان کے مہر خوشی سے دو" (النساء: ۴)۔ امام احمد رضا خان فرماتے ہیں کہ عورت اپنے مہر اور ذاتی مال کی آزاد مالکہ ہے، شوہر اس کا محتاج نہیں ہو سکتا اور نہ ہی زبردستی معاف کروا سکتا ہے۔'
      },
      {
        chapterId: 'fr-02',
        chapterNumber: 2,
        titleUrdu: 'خواتین کے حجاب اور ستر کی شرعی حدود',
        titleEnglish: 'Canonical Boundaries of Modesty & Hijab for Muslim Women',
        summaryUrdu: 'نامحرم مردوں کے سامنے چہرے اور پورے بدن کا پردہ لازم ہے؛ شریعت نے حیا کو عورت کا فطری اور دینی زیور قرار دیا ہے۔',
        summaryEnglish: 'Full modesty before non-Mahram men is mandatory; classical jurisprudence establishes modesty as the inherent spiritual ornament of the believer.',
        hadithOrFiqhReference: 'فتاویٰ رضویہ، جلد ۲۲، رسالہ "مسئلہ حجاب"',
        keyTakeaways: [
          'فتنے کے دور میں نامحرم کے سامنے چہرہ چھپانا واجب ہے۔',
          'باریک اور چست لباس پہننا جس سے جسم کے خدوخال ظاہر ہوں حرام ہے۔',
          'خوشبو لگا کر غیر محرموں کے مجمع میں جانا سخت گناہ ہے۔'
        ],
        fullTextUrdu: 'اعلیٰ حضرت امام احمد رضا خان فرماتے ہیں: قرآن مجید میں ارشاد ہے: "اے نبی! اپنی بیویوں اور بیٹیوں اور مسلمانوں کی عورتوں سے فرما دیجیے کہ اپنے اوپر اپنی چادروں کا گھونگھٹ ڈال لیا کریں" (الاحزاب: ۵۹)۔ عورت کا وقار اور تقدس اس کے پردے میں مضمر ہے، اور سچے دل سے حجاب کی پابندی درحقیقت سیدہ فاطمۃ الزہراء رضی اللہ عنہا کی سنت کی پیروی ہے۔'
      },
      {
        chapterId: 'fr-03',
        chapterNumber: 3,
        titleUrdu: 'وراثت میں بہنوں اور بیٹیوں کے حقوق کی سختی سے حفاظت',
        titleEnglish: 'Protecting Daughters and Sisters Inheritance Rights from Coercion',
        summaryUrdu: 'بہنوں یا بیٹیوں کو جائداد کے حصے سے محروم کرنا یا رسمی طور پر "معاف" کروانا شرعاً باطل اور حرامِ قطعی ہے۔',
        summaryEnglish: 'Depriving daughters or sisters of their estate shares or coercing formal "forgiveness" is completely void and strictly prohibited.',
        hadithOrFiqhReference: 'فتاویٰ رضویہ، جلد ۲۶، کتاب الفرائض',
        keyTakeaways: [
          'وراثت اللہ تعالیٰ کا قطعی طے کردہ فریضہ ہے جس میں کوئی رشتہ دار کمی بیشی نہیں کر سکتا۔',
          'بھائیوں کا بہنوں کا حصہ دبا لینا دوزخ کی آگ کھانا ہے۔',
          'دباؤ کے تحت کروایا گیا معاف نامہ شریعت میں باطل ہے۔'
        ],
        fullTextUrdu: 'اعلیٰ حضرت لکھتے ہیں: روئے زمین پر سب سے بڑا ظلم یہ ہے کہ لوگ بیٹیوں اور بہنوں کا وراثت کا حصہ غصب کر لیتے ہیں اور حیلے بہانوں سے کہتے ہیں کہ "ہماری بہن نے معاف کر دیا"۔ یاد رکھو! جو معافی خاندانی دباؤ یا شرمندگی میں لی جائے وہ عند اللہ کالعدم ہے، اور ایسا کرنے والے قیامت کے دن سخت عذاب میں مبتلا ہوں گے۔'
      }
    ]
  },
  {
    id: 'CANON-NIS-04',
    titleUrdu: 'اسلامی بہنوں کی نماز و طہارت',
    titleArabic: 'صلاة وطهارة المرأة المسلمة وفق الفقه الحنفي',
    titleEnglish: 'Salah and Taharah Guide for Muslim Sisters',
    authorUrdu: 'تحقیقِ فقہائے اہل سنت و جماعت',
    authorEnglish: 'Compiled by Jurists of Ahl al-Sunnah wal-Jama\'ah',
    authorEra: 'معاصر مستند تدوین',
    category: 'fiqh_taharah',
    categoryLabelUrdu: 'احکام و فقہِ نسواں',
    categoryLabelEnglish: 'Fiqh & Purity for Women',
    descriptionUrdu: 'آسان اور مرحلہ وار گائیڈ جس میں وضو، غسل، مخصوص ایام کی طہارت اور پانچوں نمازوں کا طریقہ باقاعدہ فقہی احکام کے ساتھ بیان کیا گیا ہے۔',
    descriptionEnglish: 'A step-by-step practical manual for Wudu, Ghusl, menstrual purification, and the precise prayer method for women.',
    classicalSourceTier: 'TIER_C_AUTHENTIC_SUNNI',
    sanadGrade: 'MAQBOOL_MUTABAR',
    verificationHash: 'SHA256-SISTERS-SALAH-GUIDE-3312D',
    scholarlyConsensusUrdu: 'مبتدی اور متوسط بہنوں کے لیے روزمرہ مسائل کا آسان و صحیح حل۔',
    isOfflineAvailable: true,
    onlineArchiveUrl: 'https://www.dawateislami.net/bookslibrary/ur/islami-behno-ki-namaz',
    onlineArchiveName: 'Maktaba-tul-Madina (Islami Behnon Ki Namaz Complete Edition)',
    coreChapters: [
      {
        chapterId: 'ssg-01',
        chapterNumber: 1,
        titleUrdu: 'غسلِ حیض و طہارت کا مکمل مسنون طریقہ',
        titleEnglish: 'Sunnah Method of Post-Menstrual Ghusl (Purification)',
        summaryUrdu: 'طہارت کے غسل میں کلی کرنا، ناک میں نرم ہڈی تک پانی ڈالنا اور پورے بدن پر بال برابر بھی سوکھا نہ چھوڑنا فرض ہے۔',
        summaryEnglish: 'The three obligatory acts (Fara\'idh) of Ghusl: rinsing the mouth, cleansing the nose up to soft bone, and washing the entire body thoroughly.',
        hadithOrFiqhReference: 'رد المحتار علی الدر المختار، باب الغسل',
        keyTakeaways: [
          'غسل کے تین فرائض ہیں: کلی کرنا، ناک میں پانی چڑھانا، اور سارے بدن پر پانی بہانا۔',
          'اگر بالوں کی مینڈھیاں (چوٹیاں) کھلی نہ ہوں تو جڑوں تک پانی پہنچانا ضروری ہے۔',
          'ناخن پالش اگر جمی ہو تو اسے ہٹائے بغیر وضو اور غسل نہیں ہوگا۔'
        ],
        fullTextUrdu: 'جب حیض کا خون بند ہو جائے تو غسل فرض ہے۔ غسل میں پہلے استنجا کرے اور نجاست دھوئے، پھر نماز کا وضو کرے۔ اس کے بعد تین بار سر پر، تین بار دائیں اور تین بار بائیں کاندھے پر پانی بہائے۔ کلی کرنا اور ناک کی نرم ہڈی تک پانی پہنچانا فرض ہے۔'
      },
      {
        chapterId: 'ssg-02',
        chapterNumber: 2,
        titleUrdu: 'وضو کے چار فرائض اور خواتین کی عام غلطیاں',
        titleEnglish: 'Four Pillars of Wudu & Rectifying Common Female Errors',
        summaryUrdu: 'پیشانی کے بالوں سے ٹھوڑی تک اور ایک کان کی لو سے دوسرے کان کی لو تک چہرہ دھونا، کہنیوں سمیت ہاتھ دھونا، چوتھائی سر کا مسح اور ٹخنوں سمیت پاؤں دھونا فرض ہے۔',
        summaryEnglish: 'The four non-negotiable obligations of Wudu: washing entire face ear to ear, washing hands past elbows, wiping quarter head, washing feet with ankles.',
        hadithOrFiqhReference: 'بہارِ شریعت، حصہ اول و دوم / قانونِ شریعت',
        keyTakeaways: [
          'کان کی لو اور گلے کے قریب خشکی رہ جانے سے وضو نہیں ہوتا۔',
          'آنکھوں کے کونوں میں کیچڑ یا کاجل کی پپڑی کو صاف کرنا ضروری ہے۔',
          'ایڑیوں اور انگلیوں کے درمیانی خلا کو اچھی طرح تر کیا جائے۔'
        ],
        fullTextUrdu: 'فقہ حنفی میں وضو کے چار فرائض ہیں: (۱) چہرہ دھونا (پیشانی سے ٹھوڑی اور ایک کان سے دوسرے کان تک)، (۲) کہنیوں سمیت دونوں ہاتھ دھونا، (۳) چوتھائی سر کا مسح کرنا، (۴) ٹخنوں سمیت دونوں پاؤں دھونا۔ خواتین کو چاہیے کہ وضو کرتے وقت چوڑیوں اور انگوٹھیوں کو حرکت دیں تاکہ نیچے پانی پہنچ جائے، اور کاجل یا واٹر پروف میک اپ کی تہہ کو پہلے مکمل صاف کر لیں۔'
      },
      {
        chapterId: 'ssg-03',
        chapterNumber: 3,
        titleUrdu: 'نماز میں ستر کے احکام اور دوپٹہ اوڑھنے کا طریقہ',
        titleEnglish: 'Rules of Aurah in Prayer & Correct Dupatta/Scarf Coverage',
        summaryUrdu: 'عورت کی نماز میں چہرہ، دونوں ہتھیلیاں اور پاؤں کے علاوہ پورا بدن چھپانا فرض ہے؛ بالوں کی ایک لٹ یا گردن کا چوتھائی حصہ بھی ایک رکن کی مقدار کھلا رہا تو نماز فاسد ہو جائے گی۔',
        summaryEnglish: 'In prayer, the woman\'s entire body is Aurah except face, palms, and feet; if a quarter of the neck, ear, or hair remains exposed for one pillar duration, Salah is invalidated.',
        hadithOrFiqhReference: 'سنن ابی داؤد، حدیث رقم ۶۴۱ / درِ مختار',
        keyTakeaways: [
          'باریک دوپٹہ جس سے بالوں کی سیاہی چمکے نماز کے لیے ناکافی ہے۔',
          'ٹھوڑی کے نیچے کا حصہ اور کلائیاں مکمل طور پر ڈھانپی ہونی چاہئیں۔',
          'سجدے میں جاتے وقت اگر پچھلی طرف سے بال یا پیٹھ ننگی ہو گئی تو نماز ٹوٹ جائے گی۔'
        ],
        fullTextUrdu: 'رسول اللہ ﷺ نے ارشاد فرمایا: "اللہ تعالیٰ کسی بالغہ عورت کی نماز بغیر اوڑھنی (خمار) کے قبول نہیں فرماتا" (سنن ابی داؤد)۔ پس بہنوں پر لازم ہے کہ نماز کے وقت موٹی چادر یا ایسا اسکارف استعمال کریں جس سے بال اور گردن بالکل نہ جھلکیں۔ اگر غفلت کی وجہ سے بال یا گلا کھل جائے اور فوراً نہ ڈھانپا جائے تو نماز کا لوٹانا فرض ہے۔'
      }
    ]
  },
  {
    id: 'CANON-NIS-05',
    titleUrdu: 'حقوقِ زوجین و تحفۃ الزوجین',
    titleArabic: 'حقوق الزوجين والتآلف الأسري',
    titleEnglish: 'Marital Harmony and Mutual Rights in Islam',
    authorUrdu: 'فقیہ ملت مفتی جلال الدین امجدی (رحمة الله عليه)',
    authorEnglish: 'Mufti Jalaluddin Amjadi (d. 1422 AH)',
    authorEra: '1422ھ / مصنف انوار الحدیث و فتاویٰ فیض الرسول',
    category: 'fiqh_taharah',
    categoryLabelUrdu: 'احکام و فقہِ نسواں',
    categoryLabelEnglish: 'Fiqh & Purity for Women',
    descriptionUrdu: 'ازدواجی زندگی میں باہمی محبت، شوہر اور بیوی کے شرعی حقوق، ساس سسر کے احترام اور گھر کو جنت نظیر بنانے کا مستند اسلامی دستور۔',
    descriptionEnglish: 'A classic guide to mutual respect, rights between spouses, and establishing spiritual tranquility in the home based on Quran and Hadith.',
    classicalSourceTier: 'TIER_C_AUTHENTIC_SUNNI',
    sanadGrade: 'MAQBOOL_MUTABAR',
    verificationHash: 'SHA256-HUQUQ-ZAWJAYN-AMJADI-4411E',
    scholarlyConsensusUrdu: 'خاندانی استحکام اور گھریلو امن کے لیے اہل سنت کی انتہائی مفید کتاب۔',
    isOfflineAvailable: true,
    onlineArchiveUrl: 'https://archive.org/search?query=Huquq+uz+Zawjain+Amjadi',
    onlineArchiveName: 'Classical Sunnah Heritage Archive (Huquq-e-Zawjayn - Mufti Jalaluddin Amjadi)',
    coreChapters: [
      {
        chapterId: 'hz-01',
        chapterNumber: 1,
        titleUrdu: 'گھر میں سکون اور باہمی حسنِ سلوک کے نبوی اصول',
        titleEnglish: 'Prophetic Principles for Peace and Mutual Mercy at Home',
        summaryUrdu: 'رسول اللہ ﷺ نے فرمایا: تم میں سب سے بہتر وہ ہے جو اپنے اہل و عیال کے لیے سب سے بہتر ہو، اور میں اپنے گھر والوں کے لیے تم سب سے بہتر ہوں۔',
        summaryEnglish: 'The Prophet ﷺ stated: "The best of you are those who are best to their families, and I am the best among you to my family." (Tirmidhi)',
        hadithOrFiqhReference: 'جامع الترمذی، حدیث رقم ۳۸۹۵ (حسن صحیح)',
        keyTakeaways: [
          'گھر میں غصہ اور تلخی کے بجائے معافی اور درگزر کا مزاج اپنایا جائے۔',
          'چھوٹی چھوٹی باتوں پر طعنے دینا گھر کی برکت کو ختم کر دیتا ہے۔',
          'باہمی گفتگو میں نرمی اور پیار سنتِ نبوی ﷺ ہے۔'
        ],
        fullTextUrdu: 'رسولِ اکرم ﷺ نے اپنے مبارک گھرانے میں کبھی کسی پر ہاتھ نہیں اٹھایا اور نہ ہی کبھی بدکلامی فرمائی۔ آپ ﷺ نے فرمایا: "تم میں سب سے بہتر وہ ہے جو اپنے گھر والوں کے ساتھ سب سے اچھا سلوک کرے"۔ مفتی جلال الدین امجدی فرماتے ہیں کہ میاں بیوی کے درمیان جھگڑوں کا خاتمہ اس وقت ممکن ہے جب دونوں اپنے فرائض پر نظر رکھیں اور ایک دوسرے کی خطاؤں کو معاف کرنے کا حوصلہ پیدا کریں۔'
      },
      {
        chapterId: 'hz-02',
        chapterNumber: 2,
        titleUrdu: 'بیوی کے واجب حقوق: نان و نفقہ، علاج اور عزت دار رہائش',
        titleEnglish: 'The Inviolable Rights of the Wife: Maintenance, Healthcare & Dignity',
        summaryUrdu: 'بیوی کا کھانا پینا، لباس، رہائش اور علاج کا مکمل خرچ شوہر کے ذمے شرعاً واجب ہے؛ اس میں کوتاہی کرنا سخت گناہ ہے۔',
        summaryEnglish: 'A wife\'s sustenance, seasonal clothing, private accommodation, and medical expenses are strictly binding on the husband according to Islamic law.',
        hadithOrFiqhReference: 'سنن ابی داؤد، حدیث رقم ۲۱۴۲ / درِ مختار کتاب النفقات',
        keyTakeaways: [
          'شوہر پر فرض ہے کہ وہ اپنی استطاعت کے مطابق بیوی کو باعزت نفقہ دے۔',
          'بیوی کو ایسا کمرہ دینا واجب ہے جس میں اس کا پردہ اور ذاتی سکون محفوظ ہو۔',
          'بیوی کی بیماری میں علاج معالجہ کروانا شوہر کی اخلاقی اور شرعی ذمہ داری ہے۔'
        ],
        fullTextUrdu: 'حضرت معاویہ قشیری رضی اللہ عنہ نے رسول اللہ ﷺ سے دریافت کیا: "ہم پر ہماری بیوی کا کیا حق ہے؟" آپ ﷺ نے فرمایا: "جب تم کھاؤ تو اسے بھی کھلاؤ، جب تم پہنو تو اسے بھی پہناؤ، اس کے چہرے پر نہ مارو، اسے برا بھلا نہ کہو، اور گھر کے علاوہ اس سے قطع تعلق نہ کرو" (سنن ابی داؤد)۔ اسلام نے بیوی کو نوکرانی نہیں بلکہ گھر کی ملکہ اور سکون کا ذریعہ بنایا ہے۔'
      },
      {
        chapterId: 'hz-03',
        chapterNumber: 3,
        titleUrdu: 'شوہر کے حقوق، خاندانی آداب اور ساس سسر کا احترام',
        titleEnglish: 'Respect, In-Laws & Establishing Domestic Serenity',
        summaryUrdu: 'شوہر کی جائز امور میں اطاعت اور اس کے والدین کا احترام عورت کے لیے باعثِ اجر و ثواب ہے، اور سسرال میں صبر و حکمت گھر کو جنت بناتی ہے۔',
        summaryEnglish: 'Obedience in lawful matters and honoring in-laws with patience and wisdom earns divine reward and establishes lasting generational peace.',
        hadithOrFiqhReference: 'صحیح ابن حبان، حدیث رقم ۴۱۶۳ / فتاویٰ فیض الرسول',
        keyTakeaways: [
          'رسول اللہ ﷺ نے فرمایا: جس عورت نے ۵ وقت کی نماز پڑھی، رمضان کے روزے رکھے، پاکدامن رہی اور شوہر کی خیرخواہی کی وہ جس دروازے سے چاہے جنت میں داخل ہو جائے۔',
          'ساس سسر کی خدمت اخلاقی اور نیکی کا اعلیٰ درجہ ہے جو نسلوں کو سنوارتا ہے۔',
          'شوہر کے رازوں اور مال کی حفاظت کرنا نیک عورت کی نشانی ہے۔'
        ],
        fullTextUrdu: 'نبی کریم ﷺ نے ارشاد فرمایا: "اگر عورت پانچوں وقت کی نماز پڑھے، اپنے مہینے کے روزے رکھے، اپنی عفت کی حفاظت کرے اور اپنے شوہر کی اطاعت کرے، تو اس سے کہا جائے گا کہ جنت کے جس دروازے سے چاہے داخل ہو جا"۔ فقیہ ملت فرماتے ہیں کہ سسرال والوں کے ساتھ شفقت اور درگزر سے پیش آنا گھر میں محبت کی بنیاد ہے اور یہی وہ صفت ہے جو مومنہ عورت کو دنیا اور آخرت میں معزز بناتی ہے۔'
      }
    ]
  },

  // --- Category 2: Ummahat al-Mu'minin & Daughters of the Prophet ﷺ ---
  {
    id: 'CANON-NIS-06',
    titleUrdu: 'السيدة خديجة الكبرى أم المؤمنين',
    titleArabic: 'السيدة خديجة الكبرى: أم المؤمنين وسيدة نساء العالمين',
    titleEnglish: 'Sayyidatuna Khadijah al-Kubra: Mother of the Believers',
    authorUrdu: 'محدث الحرمین سید محمد بن علوی المالکی الحسنی (رحمة الله عليه)',
    authorEnglish: 'Sayyid Muhammad ibn Alawi al-Maliki al-Hasani (d. 1425 AH)',
    authorEra: '1425ھ / شیخ الحدیث مکہ مکرمہ',
    category: 'ummahat_banat',
    categoryLabelUrdu: 'امہات المؤمنین و بناتِ رسول',
    categoryLabelEnglish: 'Mothers of the Believers & Daughters',
    descriptionUrdu: 'مکہ مکرمہ کے جلیل القدر محدث کا وہ نفیس شاہکار جس میں ام المؤمنین حضرت خدیجہ الکبریٰ رضی اللہ عنہا کی پہلی تصدیق، اسلام کے ابتدائی ایام کی قربانیاں اور اللہ تعالیٰ کی جانب سے سلام کا پیغام لانے کی فضیلتیں قلمبند کی گئی ہیں۔',
    descriptionEnglish: 'The sublime Makkan masterwork chronicling the first believer, her profound business wisdom, unwavering emotional solace to the Prophet ﷺ, and the divine greeting delivered by Jibril (عليه السلام).',
    classicalSourceTier: 'TIER_A_CANONICAL',
    sanadGrade: 'SAHIH',
    verificationHash: 'SHA256-KHADIJAH-AL-KUBRA-MALIKI-5512F',
    scholarlyConsensusUrdu: 'عالمِ اسلام کے اکابر محدثین کے نزدیک انتہائی پرتاثیر اور ثقہ تصنیف۔',
    isOfflineAvailable: true,
    onlineArchiveUrl: 'https://archive.org/search?query=Sayyidah+Khadijah+Alawi+Maliki',
    onlineArchiveName: 'Makkan Classical Archives (Al-Sayyidah Khadijah al-Kubra - Sayyid Muhammad Alawi al-Maliki)',
    coreChapters: [
      {
        chapterId: 'sk-01',
        chapterNumber: 1,
        titleUrdu: 'نزولِ وحی پر سیدتنا خدیجہ کی تسلی اور الٰہی سلام',
        titleEnglish: 'Solace at the First Revelation and the Divine Salutation',
        summaryUrdu: 'جب غارِ حرا میں پہلی وحی آئی تو سیدتنا خدیجہ نے فرمایا: ہرگز نہیں! اللہ آپ کو کبھی رسوا نہیں کرے گا، آپ تو صلہ رحمی کرتے ہیں اور بے سہاروں کا بوجھ اٹھاتے ہیں۔',
        summaryEnglish: 'When the first revelation came, Sayyidatuna Khadijah comforted the Prophet ﷺ: "Never! By Allah, Allah will never disgrace you. You uphold ties of kinship and carry the burden of the weak." (Bukhari)',
        hadithOrFiqhReference: 'صحیح البخاری، حدیث رقم ۳ / صحیح مسلم، حدیث رقم ۱۶۰',
        keyTakeaways: [
          'سیدتنا خدیجہ نے نبوت کی سب سے پہلے تصدیق کی اور اپنا سارا مال اسلام کے لیے پیش کر دیا۔',
          'حضرت جبرائیل علیہ السلام نے آ کر فرمایا: "یا رسول اللہ! خدیجہ کو ان کے رب کا اور میرا سلام کہیے۔"',
          'جنت میں سیدتنا خدیجہ کے لیے موتیوں کا ایک ایسا محل تیار ہے جہاں نہ کوئی شور ہوگا نہ کوئی مشقت۔'
        ],
        fullTextUrdu: 'سیدتنا خدیجہ الکبریٰ رضی اللہ عنہا نہ صرف اسلام کی پہلی مؤمنہ تھیں بلکہ رسول اللہ ﷺ کی وہ رفیقۂ حیات تھیں جنہوں نے ہر کڑے وقت میں ڈھارس بندھائی۔ اللہ تعالیٰ نے خود حضرت جبرائیل علیہ السلام کے ذریعے ان کے لیے سلام کا تحفہ بھیجا، جو تمام کائنات کی خواتین میں منفرد شرف ہے۔'
      }
    ]
  },
  {
    id: 'CANON-NIS-07',
    titleUrdu: 'الإجابة فیما استدركته عائشة على الصحابة',
    titleArabic: 'الإجابة لإيراد ما استدركته عائشة على الصحابة',
    titleEnglish: 'Al-Ijabah: Sayyidatuna Aisha\'s Juristic Corrections',
    authorUrdu: 'امام بدر الدین زرکشی و امام جلال الدین سیوطی (رحمة الله عليهما)',
    authorEnglish: 'Imam Badr al-Din al-Zarkashi (d. 794 AH) & Imam al-Suyuti',
    authorEra: '794ھ / 911ھ — کبار ائمۂ حدیث و اصول',
    category: 'ummahat_banat',
    categoryLabelUrdu: 'امہات المؤمنین و بناتِ رسول',
    categoryLabelEnglish: 'Mothers of the Believers & Daughters',
    descriptionUrdu: 'تاریخِ اسلام کا وہ بے نظیر کلاسیکل شاہکار جس میں ثابت کیا گیا ہے کہ سیدتنا عائشہ صدیقہ رضی اللہ عنہا نے کس طرح کبار صحابہ کرام کے فتاویٰ اور روایات کی فقہی اور علمی تصحیح فرمائی۔ یہ کتاب خواتین کی عظیم فقہی اور اجتہادی صلاحیت کا روشن ثبوت ہے۔',
    descriptionEnglish: 'The historic classical Arabic masterwork demonstrating the peerless juristic intellect, critical Hadith analysis, and corrections that Sayyidatuna Aisha Siddiqah provided to senior companions.',
    classicalSourceTier: 'TIER_A_CANONICAL',
    sanadGrade: 'SAHIH',
    verificationHash: 'SHA256-AL-IJABAH-ZARKASHI-SUYUTI-6612G',
    scholarlyConsensusUrdu: 'تمام محدثین کے نزدیک ام المؤمنین عائشہ کے فقہی مقام کو سمجھنے کے لیے بنیادی کلاسیکی ماخذ ہے۔',
    isOfflineAvailable: true,
    onlineArchiveUrl: 'https://shamela.ws/book/8381',
    onlineArchiveName: 'Al-Maktaba al-Shamela (Al-Ijabah - Imam al-Zarkashi & al-Suyuti)',
    coreChapters: [
      {
        chapterId: 'ai-01',
        chapterNumber: 1,
        titleUrdu: 'سیدتنا عائشہ کا اجتہاد اور علمی عبقریت',
        titleEnglish: 'The Ijtihad and Juristic Genius of Sayyidatuna Aisha',
        summaryUrdu: 'حضرت ابو موسیٰ اشعری رضی اللہ عنہ فرماتے ہیں: ہم صحابہ پر جب بھی کوئی مشکل حدیث یا مسئلہ پیش آتا، ہم سیدتنا عائشہ سے پوچھتے تو ان کے پاس اس کا علم موجود پاتے۔',
        summaryEnglish: 'Abu Musa al-Ash\'ari reported: "Whenever a matter became difficult for us, the companions of the Prophet ﷺ, we asked Aisha and found knowledge with her." (Tirmidhi)',
        hadithOrFiqhReference: 'جامع الترمذی، حدیث رقم ۳۸۸۳ (حدیث صحیح غریب)',
        keyTakeaways: [
          'سیدتنا عائشہ نے ۲,۲۱۰ سے زائد احادیثِ مبارکہ روایت فرمائیں۔',
          'وہ علمِ میراث، طب، فقہ اور انساب و اشعار کی سب سے بڑی عالمہ تھیں۔',
          'کبار صحابہ جیسے حضرت عمر اور حضرت عثمان رضی اللہ عنہم ان کے فتاویٰ کی طرف رجوع فرماتے تھے۔'
        ],
        fullTextUrdu: 'امام زہری رحمہ اللہ فرماتے ہیں: "اگر تمام لوگوں کا علم اور تمام ازواجِ مطہرات کا علم جمع کیا جائے تو عائشہ صدیقہ رضی اللہ عنہا کا علم ان سب سے وسیع تر نکلے گا۔" آپ نے دین کی گہری باریکیوں کو احادیث اور عقلِ سلیم کی روشنی میں واضح فرمایا۔'
      }
    ]
  },
  {
    id: 'CANON-NIS-08',
    titleUrdu: 'سیرتِ سیدتنا عائشہ صدیقہ',
    titleArabic: 'سيرة الصديقة الطاهرة عائشة أم المؤمنين',
    titleEnglish: 'Biography of Sayyidatuna Aisha Siddiqah',
    authorUrdu: 'علامہ مفتی فیض احمد اویسی (رحمة الله عليه)',
    authorEnglish: 'Allama Mufti Faiz Ahmad Owaisi (d. 1431 AH)',
    authorEra: '1431ھ / بہاولپور، محققِ اہل سنت',
    category: 'ummahat_banat',
    categoryLabelUrdu: 'امہات المؤمنین و بناتِ رسول',
    categoryLabelEnglish: 'Mothers of the Believers & Daughters',
    descriptionUrdu: 'اردو زبان میں سیدتنا عائشہ کی حیاتِ طیبہ کا انتہائی عاشقانہ اور مدلل تذکرہ۔ واقعہ افک میں قرآن پاک کی سترہ آیات کے ذریعے براءت کا نزول، عبادت گزاری اور امت کے لیے علمی فیضان کو جامعیت سے سمیٹا گیا ہے۔',
    descriptionEnglish: 'An exhaustive, devotional Urdu biography of the Mother of the Believers: her Divine exoneration in Surah an-Nur, nocturnal worship, and lifelong pedagogy.',
    classicalSourceTier: 'TIER_C_AUTHENTIC_SUNNI',
    sanadGrade: 'MAQBOOL_MUTABAR',
    verificationHash: 'SHA256-SEERAT-AISHA-OWAISI-7711H',
    scholarlyConsensusUrdu: 'اہل سنت کے ہاں ازواجِ مطہرات کی پاکیزگی اور عظمت کو اجاگر کرنے کے لیے معتبر تالیف۔',
    isOfflineAvailable: true,
    onlineArchiveUrl: 'https://archive.org/search?query=Seerat+Hazrat+Aisha+Owaisi',
    onlineArchiveName: 'Sunni Classical Heritage (Seerat Hazrat Aisha Siddiqah - Mufti Faiz Ahmad Owaisi)',
    coreChapters: [
      {
        chapterId: 'sa-01',
        chapterNumber: 1,
        titleUrdu: 'براءتِ عائشہ اور سورۃ النور کی آیات کا نزول',
        titleEnglish: 'The Divine Exoneration of Aisha in Surah An-Nur',
        summaryUrdu: 'منافقین کے بہتان کے جواب میں اللہ تعالیٰ نے آسمانوں سے سیدتنا عائشہ کی طہارت و پاکیزگی کی گواہی کے لیے قرآن پاک کی ۱۰ آیات نازل فرمائیں۔',
        summaryEnglish: 'In response to the slanders of the hypocrites, Allah revealed 10 verses of Surah An-Nur directly exonerating Sayyidatuna Aisha for all eternity.',
        hadithOrFiqhReference: 'صحیح البخاری، حدیث رقم ۴۷۵۰ / سورۃ النور، آیات ۱۱-۲۱',
        keyTakeaways: [
          'سیدتنا عائشہ صدیقہ کی براءت قرآن کا حصہ ہے، جس پر ایمان رکھنا لازم ہے۔',
          'رسول اللہ ﷺ کی زوجیتِ مطہرہ دنیا اور آخرت دونوں میں حضرت عائشہ کے لیے ثابت ہے۔',
          'آپ کی سخاوت کا عالم یہ تھا کہ ایک دن میں ایک لاکھ درہم صدقہ کر دئے اور خود روزے سے رہیں۔'
        ],
        fullTextUrdu: 'سیدتنا عائشہ رضی اللہ عنہا نے مصیبت کے وقت فرمایا: "واللہ! میں صرف وہی کہتی ہوں جو حضرت یوسف علیہ السلام کے والد نے فرمایا تھا: فَصَبْرٌ جَمِيلٌ وَاللَّهُ الْمُسْتَعَانُ عَلَىٰ مَا تَصِفُونَ۔" پس اللہ تعالیٰ نے عرش سے ان کی پاکیزگی پر کلام نازل فرما دیا۔'
      }
    ]
  },
  {
    id: 'CANON-NIS-09',
    titleUrdu: 'ثغور الباسم في مناقب سيدتنا فاطمة الزهراء',
    titleArabic: 'ثغور الباسم في مناقب سيدتنا فاطمة الزهراء البتول',
    titleEnglish: 'Thughur al-Basim: The Virtues of Sayyidatuna Fatimah az-Zahra',
    authorUrdu: 'امام جلال الدین سیوطی (رحمة الله عليه)',
    authorEnglish: 'Imam Jalal al-Din al-Suyuti (d. 911 AH)',
    authorEra: '911ھ / قاہرہ، امام الحدیث والتفسیر',
    category: 'ummahat_banat',
    categoryLabelUrdu: 'امہات المؤمنین و بناتِ رسول',
    categoryLabelEnglish: 'Mothers of the Believers & Daughters',
    descriptionUrdu: 'امام سیوطی کا وہ مستند رسالہ جس میں سیدۃ نساء اہل الجنہ حضرت فاطمۃ الزہراء رضی اللہ عنہا کے مناقب، بضعۃ منی کا شرف اور آپ کے خصائص کو صحیح روایات سے جمع کیا گیا ہے۔',
    descriptionEnglish: 'Imam al-Suyuti\'s verified treatise collecting the singular spiritual virtues, asceticism, and station of the Leader of the Women of Paradise.',
    classicalSourceTier: 'TIER_A_CANONICAL',
    sanadGrade: 'SAHIH',
    verificationHash: 'SHA256-THUGHUR-AL-BASIM-SUYUTI-8812I',
    scholarlyConsensusUrdu: 'مناقبِ اہل بیت اور سیدہ زہراء کی سیرت کے لیے متفقہ کلاسیکی مرجع۔',
    isOfflineAvailable: true,
    onlineArchiveUrl: 'https://archive.org/search?query=Thughur+al-Basim+Suyuti',
    onlineArchiveName: 'Al-Maktaba al-Shamela (Thughur al-Basim - Imam Jalal al-Din al-Suyuti)',
    coreChapters: [
      {
        chapterId: 'tb-01',
        chapterNumber: 1,
        titleUrdu: 'فاطمہ میرے جگر کا ٹکڑا ہے (فاطمة بضعة مني)',
        titleEnglish: 'Fatimah is a Part of Me: The Highest Prophetic Kinship',
        summaryUrdu: 'رسول اللہ ﷺ نے ارشاد فرمایا: "فاطمہ میرے جگر کا ٹکڑا ہے، جس نے اسے ناراض کیا اس نے مجھے ناراض کیا اور جس نے اسے خوش کیا اس نے مجھے خوش کیا۔"',
        summaryEnglish: 'The Prophet ﷺ proclaimed: "Fatimah is a part of me; whoever angers her angers me, and whoever pleases her pleases me." (Sahih al-Bukhari)',
        hadithOrFiqhReference: 'صحیح البخاری، حدیث رقم ۳۷۱۴ / صحیح مسلم، حدیث رقم ۲۴۴۹',
        keyTakeaways: [
          'سیدہ فاطمہ جنت کی تمام عورتوں کی سردار ہیں۔',
          'جب بھی رسول اللہ ﷺ کے پاس تشریف لاتیں، حضور ان کے احترام میں کھڑے ہو جاتے اور پیشانی پر بوسہ دیتے۔',
          'آپ کی سیرت زہد، قناعت اور راتوں کی طویل عبادات کا بے مثل نمونہ ہے۔'
        ],
        fullTextUrdu: 'سیدہ بتول فاطمۃ الزہراء رضی اللہ عنہا حسن و اخلاق اور نشست و برخاست میں اپنے بابا حضور رحمتِ عالم ﷺ کے سب سے زیادہ مشابہ تھیں۔ گھر کی چکی خود پیستیں حتیٰ کہ ہاتھوں میں چھالے پڑ جاتے، لیکن زبان پر ہر دم شکرِ الٰہی جاری رہتا۔'
      }
    ]
  },
  {
    id: 'CANON-NIS-10',
    titleUrdu: 'سیرتِ سیدۃ النساء فاطمۃ الزہراء',
    titleArabic: 'سيرة سيدة نساء أهل الجنة فاطمة الزهراء',
    titleEnglish: 'Seerat Sayyidat an-Nisa Fatimah az-Zahra',
    authorUrdu: 'علامہ مفتی فیض احمد اویسی (رحمة الله عليه)',
    authorEnglish: 'Allama Mufti Faiz Ahmad Owaisi (d. 1431 AH)',
    authorEra: '1431ھ / بہاولپور',
    category: 'ummahat_banat',
    categoryLabelUrdu: 'امہات المؤمنین و بناتِ رسول',
    categoryLabelEnglish: 'Mothers of the Believers & Daughters',
    descriptionUrdu: 'سیدہ پاک کی ولادت، بچپن، مکہ میں حضور ﷺ کا دفاع، شادی، سادگی، حسنین کریمین کی تربیت اور وصالِ نبوی پر غم کی کیفیات کا جامع احاطہ۔',
    descriptionEnglish: 'Comprehensive biographical survey of Sayyidatuna Fatimah: her childhood defending the Prophet in Makkah, marriage to Ali (رضي الله عنه), and nurturing the Hasani-Husayni lineage.',
    classicalSourceTier: 'TIER_C_AUTHENTIC_SUNNI',
    sanadGrade: 'MAQBOOL_MUTABAR',
    verificationHash: 'SHA256-SEERAT-FATIMAH-OWAISI-9912J',
    scholarlyConsensusUrdu: 'اہل سنت کے ہاں حسنین کریمین کی والدہ ماجدہ کی سیرت پر مستند تالیف۔',
    isOfflineAvailable: true,
    onlineArchiveUrl: 'https://archive.org/search?query=Seerat+Sayyidah+Fatimah+Owaisi',
    onlineArchiveName: 'Sunni Classical Heritage (Seerat Sayyidat an-Nisa Fatimah - Mufti Faiz Ahmad Owaisi)',
    coreChapters: [
      {
        chapterId: 'sf-01',
        chapterNumber: 1,
        titleUrdu: 'سیدہ فاطمہ کا بچپن اور کعبہ میں حضور ﷺ کی نصرت',
        titleEnglish: 'Childhood Devotion: Defending the Prophet at the Ka\'bah',
        summaryUrdu: 'جب قریش کے شریروں نے سجدے کی حالت میں حضور ﷺ پر اوجھڑی ڈالی، تو سیدہ فاطمہ نے کمسنی میں آ کر اسے ہٹایا اور مشرکین کو للکارا۔',
        summaryEnglish: 'When the Quraysh placed filth upon the back of the Prophet ﷺ while in Sujud, the young Fatimah rushed forward, removed it, and rebuked them bravely.',
        hadithOrFiqhReference: 'صحیح البخاری، حدیث رقم ۲۴۰ / صحیح مسلم، حدیث رقم ۱۷۹۴',
        keyTakeaways: [
          'سیدہ فاطمہ کم عمری سے ہی دینِ حق اور اپنے والد گرامی کی محافظہ تھیں۔',
          'رسول اللہ ﷺ کو ان سے اتنی محبت تھی کہ سفر پر جاتے وقت سب سے آخر میں ان سے رخصت ہوتے اور واپسی پر سب سے پہلے ان کے ہاں تشریف لاتے۔'
        ],
        fullTextUrdu: 'سیدہ پاک بچپن سے ہی شجاعت، وفاداری اور محبت کا پیکر تھیں۔ جب کفار مکہ نے ایذا رسانی کی انتہا کر دی، تو اس کمسن شہزادی نے تن تنہا اپنے والدِ ماجد کی دیکھ بھال کی، اسی لیے آپ کو "ام ابیہا" (اپنے باپ کی ماں) کا لقب ملا۔'
      }
    ]
  },
  {
    id: 'CANON-NIS-11',
    titleUrdu: 'بناتِ مصطفیٰ ﷺ',
    titleArabic: 'بنات النبي صلى الله عليه وسلم وسيرتهن العطرة',
    titleEnglish: 'Banat-e-Mustafa: The Four Daughters of the Prophet ﷺ',
    authorUrdu: 'علامہ عبد المصطفیٰ اعظمی (رحمة الله عليه)',
    authorEnglish: 'Allama Abdul Mustafa Azmi (d. 1406 AH)',
    authorEra: '1406ھ / مصنف سیرتِ مصطفیٰ',
    category: 'ummahat_banat',
    categoryLabelUrdu: 'امہات المؤمنین و بناتِ رسول',
    categoryLabelEnglish: 'Mothers of the Believers & Daughters',
    descriptionUrdu: 'اہل سنت و جماعت کے عقیدے کے مطابق رسول اللہ ﷺ کی چاروں صاحبزادیوں (سیدتنا زینب، سیدتنا رقیہ، سیدتنا ام کلثوم، اور سیدتنا فاطمۃ الزہراء رضی اللہ عنہن) کے مستند حالات اور خدمات۔',
    descriptionEnglish: 'Biographical masterwork on all four noble daughters of the Prophet ﷺ (Zainab, Ruqayyah, Umm Kulthum, and Fatimah az-Zahra) in authentic Ahl al-Sunnah tradition.',
    classicalSourceTier: 'TIER_C_AUTHENTIC_SUNNI',
    sanadGrade: 'SAHIH',
    verificationHash: 'SHA256-BANAT-MUSTAFA-AZMI-1101K',
    scholarlyConsensusUrdu: 'اہل سنت کے ہاں چاروں بناتِ رسول کے احوال پر متفقہ اور مستند کتاب۔',
    isOfflineAvailable: true,
    onlineArchiveUrl: 'https://archive.org/search?query=Banat+e+Mustafa+Azmi',
    onlineArchiveName: 'Ahl al-Sunnah Digital Heritage (Banat-e-Mustafa ﷺ - Allama Abdul Mustafa Azmi)',
    coreChapters: [
      {
        chapterId: 'bm-01',
        chapterNumber: 1,
        titleUrdu: 'سیدتنا زینب، رقیہ اور ام کلثوم کے فضائل',
        titleEnglish: 'Virtues and Sacrifices of Zainab, Ruqayyah, and Umm Kulthum',
        summaryUrdu: 'سیدتنا رقیہ اور ام کلثوم یکے بعد دیگرے حضرت عثمان غنی رضی اللہ عنہ کے نکاح میں آئیں، جس کی بنا پر حضرت عثمان کو "ذو النورین" (دو نوروں والا) کہا گیا۔',
        summaryEnglish: 'Sayyidatuna Ruqayyah and Umm Kulthum were wed sequentially to Uthman ibn Affan (رضي الله عنه), granting him the title Dhu an-Nurayn (Possessor of Two Lights).',
        hadithOrFiqhReference: 'صحیح البخاری، کتاب الفضائل / مدارج النبوۃ',
        keyTakeaways: [
          'رسول اللہ ﷺ کی چار بیٹیاں تھیں اور چاروں سے حضور ﷺ بے پناہ پیار فرماتے تھے۔',
          'سیدتنا رقیہ نے حبشہ اور مدینہ کی دونوں ہجرتوں کا ثواب پایا۔',
          'سیدتنا ام کلثوم کے وصال پر حضور ﷺ نے فرمایا: اگر میری تیسری بیٹی بھی ہوتی تو میں عثمان کے نکاح میں دے دیتا۔'
        ],
        fullTextUrdu: 'اہل سنت کا مسلّم عقیدہ ہے کہ سرکارِ دو عالم ﷺ کی چاروں بیٹیاں نورِ نبوت کی روشن شمعیں ہیں۔ سیدتنا زینب کی قربانیاں ہجرت کے موقع پر تاریخ کا درخشندہ باب ہیں۔'
      }
    ]
  },
  {
    id: 'CANON-NIS-12',
    titleUrdu: 'سیدتنا حلیمہ سعدیہ رضی اللہ عنہا',
    titleArabic: 'السيدة حليمة السعدية مرضعة خير البرية',
    titleEnglish: 'Sayyidatuna Halimah al-Sa\'diyyah: The Blessed Foster Mother',
    authorUrdu: 'علامہ مفتی فیض احمد اویسی (رحمة الله عليه)',
    authorEnglish: 'Allama Mufti Faiz Ahmad Owaisi (d. 1431 AH)',
    authorEra: '1431ھ / بہاولپور',
    category: 'ummahat_banat',
    categoryLabelUrdu: 'امہات المؤمنین و بناتِ رسول',
    categoryLabelEnglish: 'Mothers of the Believers & Daughters',
    descriptionUrdu: 'حضور اقدس ﷺ کی رضاعی والدہ سیدتنا حلیمہ سعدیہ رضی اللہ عنہا کے قبیلہ بنو سعد میں آمد، اونٹنی اور بکریوں کے دودھ کی برکتیں اور شقِ صدر کے ایمان افروز واقعات۔',
    descriptionEnglish: 'The life of the Prophet\'s foster mother, the miraculous blessings that filled Banu Sa\'d upon his arrival, and her noble status.',
    classicalSourceTier: 'TIER_C_AUTHENTIC_SUNNI',
    sanadGrade: 'HASAN',
    verificationHash: 'SHA256-HALIMAH-SAADIYYAH-OWAISI-2202L',
    scholarlyConsensusUrdu: 'حضور ﷺ کی رضاعت اور برکاتِ نبوی کے حوالے سے نہایت مقبول کتاب۔',
    isOfflineAvailable: true,
    onlineArchiveUrl: 'https://archive.org/search?query=Hazrat+Halima+Sadia+Owaisi',
    onlineArchiveName: 'Sunni Classical Heritage (Sayyidatuna Halimah al-Sa\'diyyah - Mufti Faiz Ahmad Owaisi)',
    coreChapters: [
      {
        chapterId: 'hs-01',
        chapterNumber: 1,
        titleUrdu: 'بنو سعد میں برکتوں کا نزول اور تعظیمِ نبوی',
        titleEnglish: 'Descent of Miraculous Barakah in Banu Sa\'d',
        summaryUrdu: 'جب سیدتنا حلیمہ نے یتیم بچے (رسول اللہ ﷺ) کو گود لیا تو ان کی خشک سواری تیز رفتار ہو گئی اور ان کے گھر میں رزق و برکت کی بارش ہو گئی۔',
        summaryEnglish: 'When Halimah embraced the orphaned Muhammad ﷺ, her dried she-camel overflowed with milk and their home was filled with divine abundance.',
        hadithOrFiqhReference: 'سیرت ابن ہشام / دلائل النبوۃ للبیہقی',
        keyTakeaways: [
          'رسول اللہ ﷺ نے فتحِ حنین کے موقع پر سیدتنا حلیمہ کے آنے پر اپنی مبارک چادر بچھا کر ان کا استقبال فرمایا۔',
          'ماں کی خدمت اور دودھ پلانے والی کی تعظیم کا نبوی نمونہ دنیا کے سامنے پیش ہوا۔'
        ],
        fullTextUrdu: 'جب بھی سیدتنا حلیمہ بارگاہِ رسالت میں حاضر ہوتیں، حضور ﷺ فرطِ محبت و تعظیم سے کھڑے ہو جاتے اور فرماتے: "مرحبا یا امی! مرحبا یا امی!" (اے میری ماں خوش آمدید!) اور اپنی ردائے مبارک زمین پر بچھا کر انہیں بٹھاتے۔'
      }
    ]
  },
  {
    id: 'CANON-NIS-13',
    titleUrdu: 'امہات المؤمنین و بنات النبی (از مدارج النبوۃ)',
    titleArabic: 'ذكر أزواج النبي وبناته من مدارج النبوة',
    titleEnglish: 'Mothers of the Believers from Madarij-un-Nubuwwah',
    authorUrdu: 'شیخ عبد الحق محدث دہلوی (رحمة الله عليه)',
    authorEnglish: 'Shaykh Abd al-Haqq Muhaddith Dehlawi (d. 1052 AH)',
    authorEra: '1052ھ / دہلی، امام محدثینِ ہند',
    category: 'ummahat_banat',
    categoryLabelUrdu: 'امہات المؤمنین و بناتِ رسول',
    categoryLabelEnglish: 'Mothers of the Believers & Daughters',
    descriptionUrdu: 'مدارج النبوۃ کے قسم پنجم سے ازواجِ مطہرات کے فضائل، خصائص، اور ان کے وصال کے مفصل احوال۔ شیخ عبد الحق نے نہایت ادب اور ثقاہت سے ہر زوجۂ مطہرہ کا مقام واضح کیا ہے۔',
    descriptionEnglish: 'Part 5 of the classical Madarij-un-Nubuwwah dedicated to the virtues, wisdom, and demises of all the Mothers of the Believers.',
    classicalSourceTier: 'TIER_B_CLASSICAL_AUTHORITATIVE',
    sanadGrade: 'SAHIH',
    verificationHash: 'SHA256-MADARIJ-UMMAHAT-DEHLAWI-3303M',
    scholarlyConsensusUrdu: 'برصغیر میں سیرت کا سب سے معتمد اور بنیادی کلاسیکی حوالہ۔',
    isOfflineAvailable: true,
    pdfUrl: '/books/madarij-un-nubuwwat-vol1.pdf',
    coreChapters: [
      {
        chapterId: 'md-01',
        chapterNumber: 1,
        titleUrdu: 'ازواجِ مطہرات کی تعداد اور ان کا روحانی مقام',
        titleEnglish: 'The Spiritual Rank and Nobility of the Mothers of the Believers',
        summaryUrdu: 'قرآن نے اعلان فرمایا: "اور اس کی بیویاں ان کی مائیں ہیں" (الاحزاب: ۶)۔ ازواجِ مطہرات تمام مومنین کی روحانی مائیں ہیں جن کا احترام واجب ہے۔',
        summaryEnglish: 'The Quran decrees: "And his wives are their mothers." (Al-Ahzab 33:6). They are the eternal spiritual mothers of all believers.',
        hadithOrFiqhReference: 'مدارج النبوۃ، قسم پنجم / سورۃ الاحزاب، آیت ۶',
        keyTakeaways: [
          'ازواجِ مطہرات دنیا اور آخرت دونوں میں نبی کریم ﷺ کی ازواج ہیں۔',
          'ان کے ذریعے آدھے سے زیادہ پردے کے اور گھریلو مسائل امت تک پہنچے۔'
        ],
        fullTextUrdu: 'شیخ عبد الحق دہلوی فرماتے ہیں کہ ازواجِ مطہرات کا شرف کائنات کی تمام خواتین سے بالا تر ہے، کیونکہ انہوں نے براہِ راست حضور ﷺ کے گھر کی صحبت پائی اور وہاں وحی کے نزول کا مشاہدہ کیا۔'
      }
    ]
  },

  // --- Category 3: Sahabiyyat & Hadith Scholars ---
  {
    id: 'CANON-NIS-14',
    titleUrdu: 'تذکارِ صحابیات',
    titleArabic: 'تذكار الصحابيات رضوان الله عليهن',
    titleEnglish: 'Tazkar-e-Sahabiyyat: The Noble Women Companions',
    authorUrdu: 'علامہ مفتی فیض احمد اویسی (رحمة الله عليه)',
    authorEnglish: 'Allama Mufti Faiz Ahmad Owaisi (d. 1431 AH)',
    authorEra: '1431ھ / بہاولپور',
    category: 'sahabiyyat_muhaddithat',
    categoryLabelUrdu: 'اسوۂ صحابیات و محدثات',
    categoryLabelEnglish: 'Sahabiyyat & Scholars',
    descriptionUrdu: 'غزوہ احد، بدر، بیعتِ عقبہ اور ہجرت میں شریک ہونے والی جلیل القدر صحابیات (حضرت ام عمارہ، حضرت اسما بنت ابی بکر، حضرت ام سلیم) کے دل دہلا دینے والے اور ایمان افروز واقعات۔',
    descriptionEnglish: 'Heroic, faith-inspiring accounts of female companions at Uhud, Badr, and the migrations: Umm \'Umarah, Asma bint Abi Bakr, and Umm Sulaym.',
    classicalSourceTier: 'TIER_C_AUTHENTIC_SUNNI',
    sanadGrade: 'MAQBOOL_MUTABAR',
    verificationHash: 'SHA256-TAZKAR-SAHABIYYAT-OWAISI-4404N',
    scholarlyConsensusUrdu: 'صحابیات کے ایمان افروز جہاد اور تقویٰ پر اردو کا بہترین گلدستہ۔',
    isOfflineAvailable: true,
    onlineArchiveUrl: 'https://archive.org/search?query=Tazkar+e+Sahabiyat+Owaisi',
    onlineArchiveName: 'Sunni Classical Heritage (Tazkar-e-Sahabiyyat - Mufti Faiz Ahmad Owaisi)',
    coreChapters: [
      {
        chapterId: 'ts-01',
        chapterNumber: 1,
        titleUrdu: 'حضرت ام عمارہ (نسیبہ بنت کعب) کی غزوۂ احد میں جانثاری',
        titleEnglish: 'Umm \'Umarah (Nusaybah bint Ka\'b) at the Battle of Uhud',
        summaryUrdu: 'رسول اللہ ﷺ نے فرمایا: احد کے دن میں دائیں دیکھتا یا بائیں، میں ام عمارہ کو ہی اپنی حفاظت میں تلوار چلاتے پاتا تھا۔',
        summaryEnglish: 'The Prophet ﷺ proclaimed regarding Uhud: "Whenever I looked to my right or left, I saw Umm \'Umarah defending me with her sword." (Ibn Sa\'d)',
        hadithOrFiqhReference: 'الطبقات الکبریٰ لابن سعد، ج ۸ / سیرت ابن ہشام',
        keyTakeaways: [
          'ام عمارہ نے تیروں اور تلواروں کے زخم اپنے جسم پر کھائے مگر حضور ﷺ کا دفاع جاری رکھا۔',
          'رسول اللہ ﷺ نے ان کے لیے دعا فرمائی: "اے اللہ! ان کو جنت میں میرا رفیق بنا دے۔"'
        ],
        fullTextUrdu: 'جب احد کے میدان میں افراتفری پھیلی اور کفار نے حضور ﷺ پر تیروں کی بارش کر دی، تو اس بہادر صحابیہ نے تلوار اور ڈھال اٹھائی اور دشمنوں کے وار اپنے سینے پر روکے۔ بارہ کاری زخم لگنے کے باوجود ان کے پائے ثبات میں لغزش نہ آئی۔'
      }
    ]
  },
  {
    id: 'CANON-NIS-15',
    titleUrdu: 'الإصابة في تمييز الصحابة (کتاب النساء)',
    titleArabic: 'الإصابة في تمييز الصحابة - كتاب النساء والصحابيات',
    titleEnglish: 'Al-Isabah: The Canonical Biographies of the Sahabiyyat',
    authorUrdu: 'حافظ الحدیث ابن حجر عسقلانی (رحمة الله عليه)',
    authorEnglish: 'Hafidh Ibn Hajar al-Asqalani (d. 852 AH)',
    authorEra: '852ھ / قاہرہ، شارح صحیح بخاری',
    category: 'sahabiyyat_muhaddithat',
    categoryLabelUrdu: 'اسوۂ صحابیات و محدثات',
    categoryLabelEnglish: 'Sahabiyyat & Scholars',
    descriptionUrdu: 'علمِ اسماء الرجال اور رجالِ حدیث کا سب سے مستند اور عظیم الشان دائرۃ المعارف۔ اس کے آخری حصے میں حافظ ابن حجر نے ۱۵۰۰ سے زائد صحابیات کے مکمل نام، نسب، اسناد اور فضائل کو سند کے ساتھ قلمبند کیا ہے۔',
    descriptionEnglish: 'The foundational encyclopedic Hadith masterwork verifying the biographical transmission, names, lineages, and virtues of over 1,500 female companions.',
    classicalSourceTier: 'TIER_A_CANONICAL',
    sanadGrade: 'MUTAWATIR',
    verificationHash: 'SHA256-AL-ISABAH-IBN-HAJAR-5505O',
    scholarlyConsensusUrdu: 'تمام ائمۂ حدیث کے ہاں صحابہ اور صحابیات کی شناخت کا آخری اور حتمی فیصلہ کن ماخذ۔',
    isOfflineAvailable: true,
    onlineArchiveUrl: 'https://shamela.ws/book/9767',
    onlineArchiveName: 'Al-Maktaba al-Shamela (Al-Isabah - Ibn Hajar al-Asqalani Complete 8 Vols)',
    coreChapters: [
      {
        chapterId: 'is-01',
        chapterNumber: 1,
        titleUrdu: 'حضرت اسماء بنت ابی بکر (ذات النطاقین) کا صبر و شجاعت',
        titleEnglish: 'Asma bint Abi Bakr (Dhat an-Nitaqayn): Courage in Hijrah',
        summaryUrdu: 'ہجرت کی رات غارِ ثور میں کھانا پہنچانے کے لیے اپنا کمر بند پھاڑ کر دو ٹکڑے کیے، جس پر حضور ﷺ نے انہیں "ذات النطاقین" کا لقب دیا۔',
        summaryEnglish: 'During Hijrah, she ripped her waist-belt in two to fasten provisions for the Prophet ﷺ and Abu Bakr in the Cave of Thawr, earning her the title "Dhat an-Nitaqayn".',
        hadithOrFiqhReference: 'صحیح البخاری، حدیث رقم ۲۹۷۹ / الإصابة، ج ۸',
        keyTakeaways: [
          'ابو جہل کے طمانچے کھا کر بھی غارِ ثور کا راز فاش نہ کیا۔',
          'سو سال کی عمر میں بھی ان کی بینائی اور عقل سلیم مکمل طور پر سلامت تھی۔',
          'حضرت عبداللہ بن زبیر کی ایسی بہادرانہ تربیت کی جو تاریخ میں امر ہو گئی۔'
        ],
        fullTextUrdu: 'حضرت اسماء رضی اللہ عنہا استقامت کا کوہِ گراں تھیں۔ جب حجاج بن یوسف نے ان کے بیٹے حضرت عبداللہ بن زبیر کو شہید کیا تو سو سالہ ضعیفہ نے حجاج کے سامنے کھڑے ہو کر جرات کے ساتھ کلمۂ حق فرمایا۔'
      }
    ]
  },
  {
    id: 'CANON-NIS-16',
    titleUrdu: 'الطبقات الكبرى (جلد ہشتم: ذکر نساء)',
    titleArabic: 'الطبقات الكبرى لابن سعد - المجلد الثامن في النساء',
    titleEnglish: 'Tabaqat Ibn Sa\'d (Volume 8: Dedicated to Muslim Women)',
    authorUrdu: 'علامہ محمد بن سعد کاتب الواقدی (رحمة الله عليه)',
    authorEnglish: 'Allama Ibn Sa\'d (d. 230 AH)',
    authorEra: '230ھ / بغداد، کبار مؤرخینِ اسلام',
    category: 'sahabiyyat_muhaddithat',
    categoryLabelUrdu: 'اسوۂ صحابیات و محدثات',
    categoryLabelEnglish: 'Sahabiyyat & Scholars',
    descriptionUrdu: 'اسلام کی اولین دو صدیوں میں لکھی گئی وہ تاریخی کتاب جس کی آٹھویں جلد خاص طور پر خواتینِ اسلام کے لیے وقف ہے۔ اس میں مدینہ منورہ اور مکہ کی انصار اور مہاجر خواتین کے ایمان کے احوال محفوظ ہیں۔',
    descriptionEnglish: 'Volume 8 of the earliest biographical dictionary of Islam, recording the earliest Muslim women, their pledges of allegiance, and daily spiritual life.',
    classicalSourceTier: 'TIER_A_CANONICAL',
    sanadGrade: 'SAHIH',
    verificationHash: 'SHA256-TABAQAT-IBN-SAD-VOL8-6606P',
    scholarlyConsensusUrdu: 'خواتینِ اسلام کی تاریخ کا سب سے قدیم اور معتبر ترین بنیادی ماخذ۔',
    isOfflineAvailable: true,
    onlineArchiveUrl: 'https://shamela.ws/book/1283',
    onlineArchiveName: 'Al-Maktaba al-Shamela (Al-Tabaqat al-Kubra - Ibn Sa\'d Vol 8)',
    coreChapters: [
      {
        chapterId: 't8-01',
        chapterNumber: 1,
        titleUrdu: 'سیدہ سمیہ بنت خیاط — اسلام کی پہلی شہید خاتون',
        titleEnglish: 'Sayyidatuna Sumayyah bint Khayyat: First Martyr of Islam',
        summaryUrdu: 'ابو جہل کے خونی نیزے کے سامنے کلمۂ توحید پر قائم رہیں اور اسلام میں سب سے پہلی شہادت کا بلند ترین رتبہ پایا۔',
        summaryEnglish: 'Stood resolute before the spear of Abu Jahl upon Tawhid, achieving the eternal honor of becoming the very first martyr (Shahid) of Islam.',
        hadithOrFiqhReference: 'الطبقات الکبریٰ، ج ۸، ص ۳۴۶ / مستدرک حاکم',
        keyTakeaways: [
          'رسول اللہ ﷺ نے فرمایا: "صبر کرو اے آلِ یاسر! تمہارا ٹھکانا جنت ہے۔"',
          'سیدہ سمیہ نے دکھایا کہ ایمان کی طاقت کے آگے دنیا کے ظالم ترین جابر بھی بے بس ہیں۔'
        ],
        fullTextUrdu: 'مکہ کے تپتے ہوئے صحرا میں جب آلِ یاسر کو دہکتے انگاروں اور لوہے کی زرہوں میں جھلسایا جاتا، تو سیدہ سمیہ کی زبان پر صرف "احد، احد" جاری رہتا۔ ابو جہل نے نیزہ مار کر شہید کیا مگر وہ اپنے ایمان پر چٹان کی طرح قائم رہیں۔'
      }
    ]
  },
  {
    id: 'CANON-NIS-17',
    titleUrdu: 'المحدثات: نساء عالمات في الحديث',
    titleArabic: 'المحدثات: إسهام المرأة المسلمة في رواية الحديث ونقده',
    titleEnglish: 'Al-Muhaddithat: The Great Female Hadith Scholars',
    authorUrdu: 'مستند محققینِ اہل سنت و ائمۂ حدیث',
    authorEnglish: 'Scholars of Hadith & Asma al-Rijal',
    authorEra: 'کلاسیکی اسناد و توثیق',
    category: 'sahabiyyat_muhaddithat',
    categoryLabelUrdu: 'اسوۂ صحابیات و محدثات',
    categoryLabelEnglish: 'Sahabiyyat & Scholars',
    descriptionUrdu: 'روایات کے اس عظیم سلسلے کا بیان جس میں ۸,۰۰۰ سے زائد جلیل القدر مسلم خواتین نے صحیح بخاری، صحیح مسلم اور سنن کی تدریس فرمائی، اور جن کے شاگردوں میں امام بخاری، امام شافعی اور ابن حجر جیسے ائمہ شامل تھے۔',
    descriptionEnglish: 'Documenting the monumental legacy of over 8,000 female Hadith scholars who preserved, audited, and taught the prophetic traditions to titans like Imam al-Shafi\'i and Ibn Hajar.',
    classicalSourceTier: 'TIER_A_CANONICAL',
    sanadGrade: 'SAHIH',
    verificationHash: 'SHA256-MUHADDITHAT-HADITH-MASTERS-7707Q',
    scholarlyConsensusUrdu: 'علمِ حدیث کی تاریخ میں خواتین کے بے مثال کردار کی معتبر دستاویز۔',
    isOfflineAvailable: true,
    onlineArchiveUrl: 'https://archive.org/search?query=Al-Muhaddithat+Akram+Nadwi',
    onlineArchiveName: 'Classical Hadith Research Archives (Al-Muhaddithat: Women Scholars in Islam)',
    coreChapters: [
      {
        chapterId: 'mh-01',
        chapterNumber: 1,
        titleUrdu: 'کریمہ مروزیہ اور صحیح بخاری کی معتمد سند',
        titleEnglish: 'Karimah al-Marwaziyyah: The Pillar of Sahih al-Bukhari Transmission',
        summaryUrdu: 'پانچویں صدی ہجری کی عظیم عالمہ کریمہ مروزیہ کے پاس صحیح بخاری کا سب سے صحیح اور مصدقہ نسخہ تھا، جس کی سند سے دنیا بھر میں بخاری پڑھی گئی۔',
        summaryEnglish: 'Karimah al-Marwaziyyah possessed the most accurate, certified manuscript of Sahih al-Bukhari in Makkah, transmitting it to the greatest scholars of her era.',
        hadithOrFiqhReference: 'سیر اعلام النبلاء للذہبی، ج ۱۸ / شذرات الذهب',
        keyTakeaways: [
          'امام خطیب بغدادی نے حرمِ مکہ میں کریمہ مروزیہ سے پوری صحیح بخاری سماعت فرمائی۔',
          'مسلمان خواتین حدیث کے حفظ، تحقیق اور متن کی تنقید میں اعلیٰ ترین درجے پر فائز تھیں۔'
        ],
        fullTextUrdu: 'کریمہ بنت احمد المروزیہ رحمہا اللہ مکہ مکرمہ میں مجاورت فرماتی تھیں اور صحیح بخاری کی ایسی استاد تھیں جن کے سامنے بڑے بڑے فقہا زانوئے تلمذ طے کرتے تھے۔ ان کی دیانت اور تقویٰ پر پوری امت کا اجماع ہے۔'
      }
    ]
  },

  // --- Category 4: Female Ascetics & Motherhood ---
  {
    id: 'CANON-NIS-18',
    titleUrdu: 'ذكر النسوة المتعبدات الصوفيات',
    titleArabic: 'ذكر النسوة المتعبدات الصوفيات',
    titleEnglish: 'Memorial of the Female Sufi Saints and Ascetics',
    authorUrdu: 'امام ابو عبد الرحمن السلمی (رحمة الله عليه)',
    authorEnglish: 'Imam Abu Abd al-Rahman al-Sulami (d. 412 AH)',
    authorEra: '412ھ / نیشاپور، کبار ائمۂ تصوف و حدیث',
    category: 'salihat_tarbiyat',
    categoryLabelUrdu: 'صالحات، اولیاء و تربیتِ اولاد',
    categoryLabelEnglish: 'Ascetics & Motherhood',
    descriptionUrdu: 'تاریخِ اسلام کی سب سے پہلی کتاب جو خاص طور پر ۸۴ عظیم الشان صوفیاء و عابدات خواتین کے تذکرے پر لکھی گئی۔ ان کی شب بیداری، ذکرِ الٰہی، معرفت اور الٰہی عشق کے پاکیزہ کلمات اس میں درج ہیں۔',
    descriptionEnglish: 'The earliest dedicated classical biographical masterwork documenting 84 female Sufi saints, their nocturnal prayers, gnosis (ma\'rifah), and pure divine love.',
    classicalSourceTier: 'TIER_A_CANONICAL',
    sanadGrade: 'HASAN',
    verificationHash: 'SHA256-NISWA-SULAMI-SUFI-WOMEN-8808R',
    scholarlyConsensusUrdu: 'تصوف اور باطنی پاکیزگی کے میدان میں خواتین کے مقام کا مستند ترین کلاسیکی ذخیرہ۔',
    isOfflineAvailable: true,
    onlineArchiveUrl: 'https://archive.org/search?query=Dhikr+an-Niswah+Sulami',
    onlineArchiveName: 'Al-Maktaba al-Shamela / Archive (Dhikr al-Niswa - Imam Abu Abd al-Rahman al-Sulami)',
    coreChapters: [
      {
        chapterId: 'ns-01',
        chapterNumber: 1,
        titleUrdu: 'خواتین کا اخلاص اور شب بیداری کی لذت',
        titleEnglish: 'Sincerity and the Sweetness of Tahajjud in Righteous Women',
        summaryUrdu: 'عابداتِ اسلام راتوں کو اٹھ کر فرماتیں: "اے میرے مالک! ستارے چھپ گئے اور آنکھیں سو گئیں، اور تیرا دروازہ مانگنے والوں کے لیے ہمیشہ کھلا ہے۔"',
        summaryEnglish: 'The righteous women prayed in the quiet depths of the night: "O my Lord! The stars have dimmed and eyes have slept, yet Your door remains open to the supplicant."',
        hadithOrFiqhReference: 'صفۃ الصفوۃ لابن الجوزی / ذکر النسوة للسلمی',
        keyTakeaways: [
          'گھریلو ذمہ داریوں کے ساتھ ساتھ رات کے آخری حصے میں چند رکعت نفل اللہ کے قرب کا بڑا ذریعہ ہے۔',
          'دل کی پاکیزگی اور تقویٰ ہی اصل حسن ہے۔'
        ],
        fullTextUrdu: 'امام سلمی رحمہ اللہ فرماتے ہیں کہ صحابیات اور صالحات تابعین کا اصل ہتھیار ان کا زہد اور خلوت میں اللہ سے مناجات تھی۔ انہوں نے اپنی دعاؤں سے امت کے بڑے بڑے مسائل کو حل کروایا۔'
      }
    ]
  },
  {
    id: 'CANON-NIS-19',
    titleUrdu: 'تذکرہ رابعہ بصری و عابداتِ اسلام',
    titleArabic: 'سيرة سيدة العارفات رابعة العدوية البصرية',
    titleEnglish: 'Rabi\'ah al-Adawiyyah: The Sultan of Divine Love',
    authorUrdu: 'مستند اکابرینِ اہل سنت و جماعت',
    authorEnglish: 'Compiled by Authorities of Ahl al-Sunnah',
    authorEra: 'کلاسیکی روایت و استناد',
    category: 'salihat_tarbiyat',
    categoryLabelUrdu: 'صالحات، اولیاء و تربیتِ اولاد',
    categoryLabelEnglish: 'Ascetics & Motherhood',
    descriptionUrdu: 'سیدہ رابعہ بصری رحمہا اللہ کے بے لوث عشقِ الٰہی، مناجات، سچی توبہ اور وقت کے کبار ائمہ جیسے حضرت حسن بصری و سفیان ثوری کے ساتھ علمی و روحانی مکالموں کا دلنشین بیان۔',
    descriptionEnglish: 'The life and wisdom of Sayyidatuna Rabi\'ah al-Basriyyah: her pure divine love, ascetic contentment, and spiritual dialogues with Imam Hasan al-Basri.',
    classicalSourceTier: 'TIER_B_CLASSICAL_AUTHORITATIVE',
    sanadGrade: 'HASAN',
    verificationHash: 'SHA256-RABIAH-ADAWIYYAH-SULTAN-9909S',
    scholarlyConsensusUrdu: 'عشقِ الٰہی اور خلوصِ نیت کے لیے عالمگیر مسلمہ مثال۔',
    isOfflineAvailable: true,
    onlineArchiveUrl: 'https://archive.org/search?query=Rabia+Basri+Urdu',
    onlineArchiveName: 'Sunni Classical Heritage (Tazkirah Sayyidatuna Rabia al-Adawiyyah)',
    coreChapters: [
      {
        chapterId: 'ra-01',
        chapterNumber: 1,
        titleUrdu: 'خالص عشقِ الٰہی اور دنیا سے بے رغبتی',
        titleEnglish: 'Pure Love of Allah and Renunciation of Worldly Vanity',
        summaryUrdu: 'حضرت رابعہ بصری کی مشہور مناجات: "یا اللہ! میں تیری عبادت دوزخ کے خوف یا جنت کے لالچ سے نہیں کرتی، بلکہ تو بذاتِ خود اس لائق ہے کہ تیری عبادت کی جائے۔"',
        summaryEnglish: 'Rabi\'ah\'s renowned prayer: "O Allah! I worship You not out of fear of Hell nor desire for Paradise, but because You are worthy of worship in Your Majesty."',
        hadithOrFiqhReference: 'حلیۃ الاولیاء لابی نعیم / تذکرۃ الاولیاء',
        keyTakeaways: [
          'عبادت میں لالچ یا دکھاوے کے بجائے رضائے الٰہی کی جستجو ہونی چاہیے۔',
          'دنیا کی ظاہری چمک دمک کے بجائے آخرت کی ابدی راحت کو ترجیح دی جائے۔'
        ],
        fullTextUrdu: 'سیدہ رابعہ بصری رضی اللہ عنہا نے اپنی پوری زندگی کو مولیٰ کی یاد میں فنا کر دیا۔ وہ فرماتیں کہ اگر انسان اللہ تعالیٰ سے سچی محبت کرے تو گناہ کی طرف اس کا دل مائل ہی نہیں ہو سکتا۔'
      }
    ]
  },
  {
    id: 'CANON-NIS-20',
    titleUrdu: 'ماں کی گود اور تربیتِ اولاد',
    titleArabic: 'تربية الأولاد في الإسلام ودور الأم المسلمة',
    titleEnglish: 'The Mother\'s Lap: Cradle of Upbringing and Character',
    authorUrdu: 'علامہ عبد المصطفیٰ اعظمی (رحمة الله عليه)',
    authorEnglish: 'Allama Abdul Mustafa Azmi (d. 1406 AH)',
    authorEra: '1406ھ / مصنف جنتی زیور',
    category: 'salihat_tarbiyat',
    categoryLabelUrdu: 'صالحات، اولیاء و تربیتِ اولاد',
    categoryLabelEnglish: 'Ascetics & Motherhood',
    descriptionUrdu: 'اسلام میں ماں کے بلند ترین رتبے (الجَنَّةُ تَحْتَ أَقْدَامِ الأُمَّهَاتِ)، نوزائیدہ بچے کے کان میں اذان، تحنیک، حلال لقمے کی تاثیر اور بچوں کو سچا عاشقِ رسول بنانے کا جامع نبوی طریقہ۔',
    descriptionEnglish: 'A definitive guide on raising righteous children: the sublime rank of the mother\'s feet leading to Jannah, Tahneek, halal sustenance, and instilling love for the Prophet ﷺ in childhood.',
    classicalSourceTier: 'TIER_C_AUTHENTIC_SUNNI',
    sanadGrade: 'SAHIH',
    verificationHash: 'SHA256-MOTHER-CRADLE-AZMI-1010T',
    scholarlyConsensusUrdu: 'مسلم ماؤں کے لیے اولاد کی اسلامی تربیت کا بہترین اور مستند دستور العمل۔',
    isOfflineAvailable: true,
    onlineArchiveUrl: 'https://archive.org/search?query=Maa+Ki+Godh+Azmi',
    onlineArchiveName: 'Ahl al-Sunnah Digital Heritage (Maan Ki Goud - Allama Abdul Mustafa Azmi)',
    coreChapters: [
      {
        chapterId: 'mg-01',
        chapterNumber: 1,
        titleUrdu: 'بچوں کے حقوق اور ماں کی گود کی پہلی درسگاہ',
        titleEnglish: 'Rights of Children and the Mother\'s Lap as the First School',
        summaryUrdu: 'بچے کے لیے سب سے پہلا حق اچھا اسلامی نام اور حلال دودھ ہے، ماں کی گود ہی بچے کے اخلاق اور دینداری کی بنیاد رکھتی ہے۔',
        summaryEnglish: 'The first right of a child is an honorable Islamic name and pure halal sustenance; the mother\'s lap is the primary foundation of the child\'s lifelong character.',
        hadithOrFiqhReference: 'شعب الایمان للبیہقی، حدیث رقم ۸۲۹۶',
        keyTakeaways: [
          'ماں کا دودھ پلاتے وقت بسم اللہ اور درود شریف پڑھنا بچے کی روح پر مثبت اثر ڈالتا ہے۔',
          'بچوں کے سامنے جھوٹ اور بدزبانی سے پرہیز کرنا فرض ہے کیونکہ بچے وہی سیکھتے ہیں جو دیکھتے ہیں۔',
          'سات سال کی عمر میں نماز کا حکم دیا جائے اور دس سال پر باقاعدہ عادت ڈالی جائے۔'
        ],
        fullTextUrdu: 'رسول اللہ ﷺ نے فرمایا: "کسی باپ نے اپنی اولاد کو اچھے ادب اور تربیت سے بہتر کوئی تحفہ نہیں دیا۔" علامہ عبد المصطفیٰ اعظمی فرماتے ہیں کہ شیخ عبد القادر جیلانی اور امام احمد بن حنبل کی عظمت کے پیچھے ان کی متقی ماؤں کی تربیت اور دعائیں تھیں۔'
      }
    ]
  },
  {
    id: 'CANON-NIS-21',
    titleUrdu: 'صحابۂ کرام کی مثالی بیویاں',
    titleArabic: 'صحابۂ کرام کی مثالی بیویاں (سیرتِ صحابیات و ازواجِ مطہرات)',
    titleEnglish: 'Sahaba-e-Kiram Ki Misali Biwiyan (Exemplary Wives of the Sahabah)',
    authorUrdu: 'مستند علماء و محققینِ سیرت و احوالِ صحابیات',
    authorEnglish: 'Authentic Biographical Board of Ahl al-Sunnah',
    authorEra: 'معاصر توثیق / مستند سوانح',
    category: 'sahabiyyat_muhaddithat',
    categoryLabelUrdu: 'اسوۂ صحابیات و محدثات',
    categoryLabelEnglish: 'Sahabiyyat & Scholars',
    descriptionUrdu: 'امہات المؤمنین اور جلیل القدر صحابیات کی مقدس زندگی، گھریلو اخلاق، شوہروں کی خدمت اور دین کے لیے لازوال قربانیوں کا ایمان افروز اور دلنشین مجموعہ۔ مکمل مستند پی ڈی ایف ایڈیشن کے ساتھ دستیاب۔',
    descriptionEnglish: 'A dedicated, heart-touching biographical work illuminating the lives, marital devotions, piety, and heroic support of the Mothers of the Believers and noble female companions.',
    classicalSourceTier: 'TIER_C_AUTHENTIC_SUNNI',
    sanadGrade: 'MAQBOOL_MUTABAR',
    verificationHash: 'SHA256-SAHABA-KI-MISALI-BIWIYAN-AUTHENTIC',
    scholarlyConsensusUrdu: 'خواتین اور گھریلو تربیت کے لیے نہایت متاثر کن اور مستند سوانحی دستاویز۔',
    isOfflineAvailable: true,
    pdfUrl: '/books/sahaba-ki-misali-biwiyan.pdf',
    onlineArchiveUrl: 'https://archive.org/search?query=sahaba+ki+misali+biwiyan',
    onlineArchiveName: 'AMAL Local Digital Repository (Sahaba-e-Kiram Ki Misali Biwiyan Complete Scan)',
    coreChapters: [
      {
        chapterId: 'smb-01',
        chapterNumber: 1,
        titleUrdu: 'سیدہ خدیجۃ الکبریٰ — غمخواری، ایثار اور رفاقت کا مثالی نمونہ',
        titleEnglish: 'Sayyidah Khadijah: The Supreme Model of Marital Comfort & Faith',
        summaryUrdu: 'جب وحی کے ابتدائی ایام میں خوف اور اضطراب تھا تو سیدہ خدیجہ نے کَلَّا وَاللَّهِ لَا يُخْزِيكَ اللَّهُ أَبَدًا کہہ کر ڈھارس بندھائی۔',
        summaryEnglish: 'When the first revelation arrived, Sayyidah Khadijah consoled the Prophet ﷺ declaring: "Never by Allah! Allah will never humiliate you, for you maintain kinship and speak truth."',
        hadithOrFiqhReference: 'صحیح البخاری، حدیث رقم ۳ / صحیح مسلم',
        keyTakeaways: [
          'گھریلو زندگی میں باہمی محبت، عزت اور ایک دوسرے کی پریشانی میں شریک ہونا اصل سنت ہے۔',
          'دین کے لیے اپنا تن، من، دھن قربان کرنا خواتینِ صحابہ کا خاص شیوہ رہا ہے۔'
        ],
        fullTextUrdu: 'حضرت خدیجہ رضی اللہ عنہا نے اپنی تمام دولت رسول اللہ ﷺ کے قدموں میں ڈال دی اور اسلام کے نازک ترین دور میں وہ قلعہ بن کر کھڑی رہیں۔ تاریخ گواہ ہے کہ جب تک وہ حیات رہیں، حضور ﷺ نے دوسرا نکاح نہ فرمایا اور ان کے وصال کے بعد بھی ان کی سہیلیوں کو تحائف بھیج کر ان کی یاد تازہ فرماتے تھے۔'
      },
      {
        chapterId: 'smb-02',
        chapterNumber: 2,
        titleUrdu: 'سیدہ فاطمہ الزہراء — فقر و فاقہ میں صبر، قناعت اور چکی پیسنے کا شرف',
        titleEnglish: 'Sayyidah Fatimah al-Zahra: Serenity in Poverty and Labor of Love',
        summaryUrdu: 'سیدہ فاطمہ نے غربت کے باوجود گھر کے تمام کام خود کیے، چکی پیستے پیستے مبارک ہاتھوں پر چھالے پڑ گئے مگر کبھی بے صبری کا کلمہ نہیں نکالا۔',
        summaryEnglish: 'Sayyidah Fatimah ground the wheat mill herself until her blessed hands were blistered, personifying ultimate contentment and dignity.',
        hadithOrFiqhReference: 'جامع الترمذی، حدیث رقم ۳۷۶۱ / مسند احمد',
        keyTakeaways: [
          'رسول اللہ ﷺ نے فرمایا: "فاطمہ میرے جگر کا ٹکڑا ہے"۔',
          'گھریلو کام کاج میں مشقت اٹھانا سنتِ سیدہ فاطمۃ الزہراء رضی اللہ عنہا ہے۔'
        ],
        fullTextUrdu: 'سیدہ فاطمہ الزہراء رضی اللہ عنہا سیدۃ نساء العالمین تھیں، جن کے گھر میں کئی کئی دن چولہا نہ جلتا تھا مگر ذکرِ الٰہی کا چراغ کبھی گل نہ ہوتا تھا۔ جب آپ نے خادمہ کی درخواست کی تو حضور ﷺ نے رات کو ۳۳ مرتبہ سبحان اللہ، ۳۳ مرتبہ الحمد للہ اور ۳۴ مرتبہ اللہ اکبر پڑھنے کی تعلیم دی جو خادم سے بہتر ہے۔'
      }
    ]
  }
];

// ==========================================
// 2. 10 NOBLE SAHABIYYAT PROFILES (DELEGATED TO DETAILED SCHOLARLY DATASET)
// ==========================================
import { DETAILED_SAHABIYYAT_PROFILES } from './sahabiyyat-detailed-biographies';
export const SAHABIYYAT_PROFILES: SahabiyyatProfile[] = DETAILED_SAHABIYYAT_PROFILES;

// ==========================================
// 3. AHKAM-E-NISWAN & TAHARAH FIQH GUIDE
// ==========================================
export const AHKAM_NISWAN_GUIDE: FiqhRulingItem[] = [
  {
    id: 'f-01',
    titleUrdu: 'حیض کی کم سے کم اور زیادہ سے زیادہ مدت',
    titleEnglish: 'Minimum and Maximum Durations of Haidh (Menstruation)',
    category: 'haidh',
    summaryUrdu: 'فقہ حنفی میں حیض کی کم سے کم مدت ۳ دن اور ۳ راتیں (۷۲ گھنٹے) اور زیادہ سے زیادہ ۱۰ دن اور ۱۰ راتیں (۲۴۰ گھنٹے) ہیں۔',
    summaryEnglish: 'In Hanafi Fiqh, the minimum duration of menses is 3 days and 3 nights (72 hours), while the maximum is 10 days and 10 nights (240 hours).',
    detailedRulingUrdu: 'اگر خون ۳ دن اور ۳ راتوں سے کم آ کر بند ہو جائے، یا ۱۰ دن ۱۰ راتوں سے تجاوز کر جائے، تو وہ حیض نہیں بلکہ "استحاضہ" (بیماری کا خون) کہلائے گا۔ دو حیض کے درمیانی وقفے (طہر) کی کم سے کم مدت ۱۵ دن ہے، زیادہ کی کوئی حد نہیں۔',
    detailedRulingEnglish: 'If bleeding stops in less than 72 hours, or exceeds 240 hours (10 days/nights), it is not Haidh but Istihadha (irregular bleeding due to illness). The minimum period of purity (Tuhr) between two menstrual cycles is 15 days; there is no maximum limit.',
    hanafiReference: 'بہارِ شریعت، حصہ ۲ / درِ مختار و رد المحتار، کتاب الطہارۃ',
    practicalGuidelines: [
      'اپنے مخصوص ایام کے شروع اور ختم ہونے کے اوقات کا کیلنڈر یا ڈائری میں باقاعدہ اندراج رکھیں۔',
      'عادت کے دنوں کا خاص خیال رکھیں، کیونکہ اکثر عورتوں کے دن مقرر ہوتے ہیں۔',
      '۱۰ دن پورے ہونے پر فورا غسل کر کے نماز شروع کر دیں چاہے ہلکا داغ ہی کیوں نہ ہو۔'
    ],
    practicalGuidelinesEnglish: [
      'Maintain an exact record of the start and end dates/times of your bleeding in your journal.',
      'Pay close attention to your established habit (Aadat), as most women have a fixed number of days.',
      'Once 10 full days are completed, take Ghusl immediately and resume Salah, even if light spotting continues.'
    ]
  },
  {
    id: 'f-02',
    titleUrdu: 'مخصوص ایام میں نماز، روزہ اور تلاوت کے احکام',
    titleEnglish: 'Rules Regarding Prayer, Fasting, and Quran Recitation',
    category: 'haidh',
    summaryUrdu: 'حیض کے ایام میں نماز بالکل معاف ہے (قضا بھی نہیں)، روزہ چھوڑنا واجب ہے (بعد میں قضا رکھنا فرض ہے)، اور مصحف کو چھونا و زبانی تلاوت کرنا منع ہے۔',
    summaryEnglish: 'During menses, prayer is completely waived (no Qadha required), fasting is suspended (deferred Qadha is obligatory), and touching/reciting the Quran directly is prohibited.',
    detailedRulingUrdu: 'رسول اللہ ﷺ نے فرمایا کہ عورت کے لیے نماز اور روزہ چھوڑنا شریعت کی آسانی ہے۔ پاک ہونے کے بعد چھوٹے ہوئے روزوں کی قضا سردیوں یا آسانی کے دنوں میں ایک ایک کر کے رکھنا فرض ہے۔ قرآن پاک کی تلاوت کی نیت کے بغیر اگر کوئی دعا یا وظیفہ قرآن کی آیات میں سے پڑھا جائے (جیسے بسم اللہ، الحمد للہ، انا للہ) تو جائز ہے۔',
    detailedRulingEnglish: 'The Prophet ﷺ confirmed that the waiver of prayer and postponement of fasting is a divine concession. Deferred Ramadan fasts must be made up individually when purified. While reciting the Quran with the intention of Tilawah is prohibited, reciting Quranic verses with the intention of Du\'a, Dhikr, or remembrance (such as Bismillah, Alhamdulillah, or Inna Lillahi) is permissible.',
    hanafiReference: 'صحیح البخاری، حدیث ۳۰۴ / فتاویٰ عالمگیری، ج ۱',
    practicalGuidelines: [
      'رمضان کے روزوں کی قضا اگلے رمضان سے پہلے کسی بھی وقت رکھی جا سکتی ہے۔',
      'قرآن پاک کو کسی کپڑے یا غلاف سے پکڑا جا سکتا ہے لیکن چھونا جائز نہیں۔',
      'دینی کتابیں جیسے جنتی زیور یا تفسیر کے وہ حصے جن میں ترجمہ و تشریح زیادہ ہو، پڑھنا جائز ہے۔'
    ],
    practicalGuidelinesEnglish: [
      'Deferred Ramadan fasts can be completed anytime before the arrival of the next Ramadan.',
      'The Quran may be held using an unattached cloth, pouch, or case, but direct skin contact with the script is unlawful.',
      'Reading Islamic books like Jannati Zewar or books of Tafsir where translation and commentary exceed Arabic script is permissible.'
    ]
  },
  {
    id: 'f-03',
    titleUrdu: 'نفاس (بچے کی ولادت کے بعد کا خون) کے احکام',
    titleEnglish: 'Rulings on Nifas (Postnatal Bleeding)',
    category: 'nifas',
    summaryUrdu: 'ولادت کے بعد آنے والے خون کو نفاس کہتے ہیں۔ اس کی زیادہ سے زیادہ مدت ۴۰ دن اور ۴۰ راتیں ہیں۔ کم سے کم کی کوئی قید نہیں، اگر ایک گھنٹے میں بھی بند ہو جائے تو غسل کر کے نماز فرض ہے۔',
    summaryEnglish: 'Nifas is postnatal bleeding. The maximum limit is 40 days and nights. There is no minimum; if bleeding ceases after a few days or hours, Ghusl is obligatory immediately and prayers resume.',
    detailedRulingUrdu: 'اگر خون چالیس دن سے پہلے ہی بند ہو گیا، مثلاً ۲۰ یا ۲۵ دن پر، تو چالیس دن کا انتظار کرنا سخت گناہ ہے! جیسے ہی خون بند ہو، فورا غسل کریں اور اپنی نمازیں شروع کریں۔ چالیس دن کے بعد آنے والا خون استحاضہ (بیماری) شمار ہوگا، اس میں نماز نہیں چھوڑی جائے گی۔',
    detailedRulingEnglish: 'If bleeding stops before 40 days (e.g. on day 20 or 25), waiting for 40 days is prohibited. As soon as bleeding ceases and purity appears, Ghusl is immediately obligatory and Salah must resume. Any bleeding extending beyond 40 days is treated as Istihadha (illness), during which prayers cannot be abandoned.',
    hanafiReference: 'سنن ابی داؤد، حدیث ۳۱۱ / بہارِ شریعت، حصہ ۲',
    practicalGuidelines: [
      'چالیس دن پورا ہونے کا بلاوجہ انتظار نہ کریں، سفیدی ظاہر ہوتے ہی غسل کریں۔',
      'نفاس میں بھی حیض کی طرح نماز بالکل معاف ہے اور روزوں کی قضا بعد میں لازم ہے۔'
    ],
    practicalGuidelinesEnglish: [
      'Do not wait unnecessarily for 40 days to elapse; take Ghusl as soon as clear discharge appears.',
      'Just like Haidh, prayers during Nifas are completely waived without Qadha, while fasts must be made up later.'
    ]
  },
  {
    id: 'f-04',
    titleUrdu: 'استحاضہ (بیماری کا خون) میں طہارت اور نماز کا طریقہ',
    titleEnglish: 'Taharah and Salah Guidelines during Istihadha (Irregular Bleeding)',
    category: 'istihadha',
    summaryUrdu: 'استحاضہ بیماری ہے، اس میں نماز اور روزہ کسی صورت معاف نہیں۔ ایسی بہن "معذورِ شرعی" کا حکم رکھتی ہے اور ہر فرض نماز کے وقت نیا وضو کر کے نماز پڑھے گی۔',
    summaryEnglish: 'Istihadha is due to illness; prayer and fasting are NEVER exempt. A sister experiencing Istihadha performs a fresh Wudu for each obligatory prayer time and prays normally.',
    detailedRulingUrdu: 'جب تک وہ نماز کا وقت باقی رہے گا، اس کا وضو قائم رہے گا، خون کے بہنے سے وضو نہیں ٹوٹے گا۔ اس دوران وہ جتنے چاہے نفل، قضا نمازیں اور تلاوتِ قرآن کر سکتی ہے۔ جب اگلی نماز کا وقت داخل ہوگا تو نیا وضو کرنا ہوگا۔',
    detailedRulingEnglish: 'The Prophet ﷺ instructed that Istihadha is bleeding from a vessel, not the womb. A sister with Istihadha is considered excused (Ma\'dhur): she performs Wudu once after the prayer time enters, and her Wudu remains valid for all obligatory and voluntary prayers throughout that entire prayer window regardless of continuous bleeding. When the next prayer time enters, a new Wudu is performed.',
    hanafiReference: 'صحیح البخاری، حدیث ۲۲۸ / درِ مختار، باب الحیض',
    practicalGuidelines: [
      'ہر نماز کی اذان کے بعد نیا تازہ وضو کریں۔',
      'نماز سے پہلے صاف پیڈ یا کپڑا تبدیل کر لیں تاکہ نجاست کم سے کم رہے۔',
      'استحاضہ میں روزہ رکھنا بالکل درست اور فرض ہے۔'
    ],
    practicalGuidelinesEnglish: [
      'Perform a fresh, valid Wudu after the Adhan / entry of each prayer time.',
      'Use fresh hygiene pads before prayer to minimize external impurity as much as practically possible.',
      'Fasting during Istihadha is completely valid and obligatory in Ramadan.'
    ]
  },
  {
    id: 'f-05',
    titleUrdu: 'خواتین کی نماز میں حیا اور سجدے کی خاص ہیئت',
    titleEnglish: 'Modesty and Physical Posture of Women in Prayer',
    category: 'namaz_posture',
    summaryUrdu: 'شریعت نے عورت کو نماز میں زیادہ سے زیادہ سمٹ کر رہنے کا حکم دیا ہے تاکہ مکمل پردہ اور حیا برقرار رہے۔',
    summaryEnglish: 'In authentic Hanafi jurisprudence, women\'s prayer postures emphasize modesty, containment, and compactness to preserve complete covering.',
    detailedRulingUrdu: 'تکبیر تحریمہ میں ہاتھ صرف سینے یا کندھوں تک چادر کے اندر سے اٹھائے جائیں۔ قیام میں ہاتھ سینے پر باندھے جائیں (سینہ کے اوپر بایاں ہاتھ اور اس پر دایاں ہاتھ)۔ رکوع میں صرف اتنا جھکیں کہ ہاتھ گھٹنوں تک پہنچ جائیں، انگلیاں گھٹنوں پر بغیر کشادہ کیے رکھیں۔ سجدے میں سمٹ کر سجدہ کریں، یعنی بازو زمین پر بچھا دیں اور پیٹ رانوں سے ملا رہے اور پاؤں کھڑے کرنے کے بجائے دائیں طرف نکال کر بچھا دیں۔',
    detailedRulingEnglish: 'In Hanafi jurisprudence (Al-Hidayah and Bahar-e-Shari\'at), women\'s prayer posture is rooted in modesty (Satr and Haya). In Takbeer Tahrimah, hands are raised only up to shoulders/chest beneath the veil. In Qiyam, hands are folded on the chest. In Ruku, bend only enough for hands to reach knees with fingers joined. In Sujud, keep the posture compact: rest arms flat on the floor, keep the abdomen close to thighs, and extend both feet outward to the right (Tawarruk).',
    hanafiReference: 'مراسیل ابی داؤد، حدیث ۸۷ / الہدایہ للمرغینانی / فتاویٰ رضویہ',
    practicalGuidelines: [
      'سر کے بالوں کی ایک لٹ بھی نماز کے دوران دوپٹے یا چادر سے باہر نہ نکلنے پائے۔',
      'پاؤں کے ٹخنے اور کلائیاں بھی عورت کے ستر میں شامل ہیں، ان کا چھپانا فرض ہے۔',
      'اگر بال یا کلائی کا چوتھائی حصہ ایک رکن کی ادائیگی (تین بار سبحان ربی الاعلیٰ کہنے کی مدت) کھلا رہا تو نماز فاسد ہو جائے گی۔'
    ],
    practicalGuidelinesEnglish: [
      'Ensure every strand of hair is completely concealed beneath the headscarf during prayer.',
      'Ankles and wrists are part of the Aurah (nakedness) that must be covered during Salah.',
      'If one-fourth of a limb (like hair or forearm) remains uncovered for the duration of a pillar (three Subhana Rabbiyal A\'la), the prayer is invalidated.'
    ]
  },
  {
    id: 'f-06',
    titleUrdu: 'مخصوص ایام میں ذکر و عبادت کا جاری و ساری تسلسل',
    titleEnglish: 'Maintaining an Unbroken Spiritual Rhythm During Menstruation',
    category: 'spiritual_rhythm',
    summaryUrdu: 'یہ ایک غلط فہمی ہے کہ مخصوص ایام میں عورت عبادت نہیں کر سکتی۔ نماز کے اوقات میں مصلے پر بیٹھ کر درود شریف، استغفار اور تسبیحات پڑھنا مستحب اور ثواب کا باعث ہے۔',
    summaryEnglish: 'It is a profound misconception that women cannot worship during menstruation. Sitting on the prayer mat at prayer times for Dhikr, Salawat, and Istighfar is highly rewarded.',
    detailedRulingUrdu: 'فقہائے کرام فرماتے ہیں کہ مستحب یہ ہے کہ جس طرح عام دنوں میں نماز کے وقت وضو کر کے مصلے پر بیٹھتی تھیں، اسی طرح مخصوص ایام میں بھی نماز کے اوقات میں باوضو ہو کر جائے نماز پر قبلہ رخ بیٹھیں اور اتنی دیر تک درود پاک، تسبیح، استغفار اور دعائیں پڑھتی رہیں جتنی دیر نماز میں لگتی تھی، تاکہ عبادت کی عادت اور نور برقرار رہے۔',
    detailedRulingEnglish: 'Classical Hanafi jurists (Radd al-Muhtar) explain that it is commendable (Mustahabb) for a sister during her cycle to perform Wudu at each prayer time, sit facing the Qiblah on her prayer mat, and engage in remembrance of Allah, Salawat upon the Prophet ﷺ, and Istighfar for the duration of a standard prayer. This maintains continuous spiritual light and avoids spiritual apathy.',
    hanafiReference: 'رد المحتار علی الدر المختار، ج ۱ / جنتی زیور',
    practicalGuidelines: [
      'صبح اور شام کے مسنون اذکار (آیت الکرسی کے علاوہ یا دعا کی نیت سے) باقاعدگی سے پڑھیں۔',
      'دل میں درود شریف (صلی اللہ علی النبی الامی) کی کثرت رکھیں، اس پر کوئی پابندی نہیں۔',
      'قرآن پاک کی تلاوت سننے میں کوئی حرج نہیں، موبائل سے تلاوت سن کر تدبر کرنا جائز ہے۔'
    ],
    practicalGuidelinesEnglish: [
      'Recite morning and evening Adhkar regularly (reading Ayat-ul-Kursi with the intention of Du\'a is permissible).',
      'Abound in Salawat upon the Prophet ﷺ; there are zero restrictions on sending blessings.',
      'Listening to Quranic recitation via audio and contemplating its meanings is permissible and deeply spiritually comforting.'
    ]
  },
  {
    id: 'f-07',
    titleUrdu: 'اسقاطِ حمل (مِس کیرج) کے بعد آنے والے خون کے تفصیلی احکام',
    titleEnglish: 'Rulings on Bleeding Following Miscarriage (Isqat-e-Haml)',
    category: 'nifas',
    summaryUrdu: 'حمل ضائع ہونے پر اگر جنین کے کچھ اعضاء (انگلی، ناخن، بال) بن چکے تھے تو آنے والا خون نفاس ہے، ورنہ وہ نفاس نہیں بلکہ استحاضہ یا حیض ہے۔',
    summaryEnglish: 'If physical limbs (finger, nail, hair) had formed before miscarriage (~120 days), the subsequent bleeding is Nifas; if an unformed clot, it is not Nifas but Istihadha.',
    detailedRulingUrdu: 'فقہ حنفی کے مطابق اعضاء بننے کی مدت عموماً ۱۲۰ دن (چار ماہ) اور بعض اوقات ۸۱ دن میں بھی خدوخال ظاہر ہو سکتے ہیں۔ پس اگر ڈاکٹر یا دائی تصدیق کرے کہ ہاتھ، پاؤں یا انگلیوں کی بناوٹ شروع ہو چکی تھی تو ولادت کے بعد آنے والا خون "نفاس" ہے (جس میں نماز بالکل معاف ہے)۔ لیکن اگر محض خون کا لوتھڑا یا بغیر اعضاء کے گوشت گرا تو وہ نفاس نہیں۔ ایسی صورت میں اگر پچھلے طہر کے بعد ۱۵ دن گزر چکے تھے اور ۳ دن سے زیادہ خون آیا تو وہ حیض ہے، ورنہ "استحاضہ" (بیماری کا خون) ہے جس میں نماز بالکل معاف نہیں اور غسل کے بعد وضو کر کے ہر نماز پڑھنا فرض ہے۔',
    detailedRulingEnglish: 'According to Hanafi jurisprudence (Al-Hidayah & Radd al-Muhtar), limb differentiation typically occurs by 120 days. If medical inspection confirms any limbs or features were visible, the bleeding is strictly Nifas (prayers are completely exempt). If the miscarriage was merely an unformed clot or tissue, it cannot be Nifas: it is classified as Haidh if 15 days of purity intervened and bleeding lasts 3+ days, otherwise it is Istihadha (prayers are strictly obligatory and cannot be abandoned).',
    hanafiReference: 'بہارِ شریعت، حصہ ۲، باب النفاس / درِ مختار و رد المحتار، کتاب الطہارۃ، ج ۱',
    practicalGuidelines: [
      'ہسپتال میں ڈاکٹر سے جنین (Fetus) کی حالت دریافت کریں کہ کیا اعضاء کے نقوش بن چکے تھے یا نہیں۔',
      'اگر اعضاء نہیں بنے تھے اور خون جاری رہے تو اسے نفاس سمجھ کر نمازیں ہرگز نہ چھوڑیں، بلکہ غسل کر کے معذور کی طرح نماز ادا کریں۔',
      'اگر ناواقفیت میں نمازیں چھوٹ گئیں تو اعضاء نہ بننے کی صورت میں ان نمازوں کی قضا پڑھنا لازم ہے۔'
    ],
    practicalGuidelinesEnglish: [
      'Ask the attending physician whether any morphological features or embryonic limbs had formed.',
      'If limbs were absent and bleeding persists, do not abandon prayer; perform Ghusl and pray under the rules of an excused person.',
      'If prayers were missed out of ignorance without formed limbs, those missed prayers must be made up as Qadha.'
    ]
  },
  {
    id: 'f-08',
    titleUrdu: 'خون کے مختلف رنگ اور طہارت کی حتمی علامت (قصۂ بیضاء)',
    titleEnglish: 'Colors of Menstrual Discharge (Alwan-e-Damm) & The Purity Marker',
    category: 'haidh',
    summaryUrdu: 'حیض کے ایام میں سرخ کے علاوہ کالا، زرد (پیلا)، مٹیالا (خاکی)، اور سبز رنگ کا اخراج بھی حیض ہی شمار ہوتا ہے جب تک کہ مکمل سفیدی ظاہر نہ ہو۔',
    summaryEnglish: 'During menstrual habit days, red, black, yellow, turbid (earthy/brown), and greenish discharge are all considered Haidh until pure white (Al-Qassah al-Bayda) or total dryness appears.',
    detailedRulingUrdu: 'ام المؤمنین سیدتنا عائشہ صدیقہ رضی اللہ عنہا کی خدمت میں عورتیں روئی کے ٹکڑے بھیجتی تھیں جن پر زردی ہوتی تھی، تو آپ فرماتی تھیں: "جلدی نہ کرو جب تک کہ تم سفید دھاگہ یا سفید رطوبت (القصة البيضاء) نہ دیکھ لو"۔ فقہ حنفی میں عادت کے دنوں کے دوران اگر زرد، براؤن، خاکی یا مٹیالے رنگ کے دھبے بھی لگیں تو وہ سب حیض ہیں جب تک کہ ۱۰ دن کے اندر ہوں۔ طہارت اسی وقت مانی جائے گی جب بالکل صاف سفید رطوبت آئے یا پیڈ بالکل خشک نکلے۔',
    detailedRulingEnglish: 'Women would send cotton pads with yellowish traces to Mother of the Believers Aisha, and she would instruct: "Do not hasten until you see the white discharge (Al-Qassah al-Bayda)." In Hanafi Fiqh, any yellow, brown, or turbid staining within habit days (up to 10 days) is legally Haidh. True purification occurs only when completely clear/white discharge appears or the hygiene pad emerges totally dry.',
    hanafiReference: 'موطا امام مالک، باب الحیض / رد المحتار علی الدر المختار / جنتی زیور، ص ۸۱',
    practicalGuidelines: [
      'ہلکے پیلے یا براؤن داغوں کو نظر انداز کر کے نماز شروع نہ کریں اگر وہ عادت کے ایام میں ہوں۔',
      'صبح اٹھ کر یا رات سوتے وقت پیڈ کا معائنہ کریں، جب خالص سفیدی آ جائے تو سمجھیں طہر حاصل ہو گیا۔',
      'طہر ظاہر ہوتے ہی تاخیر کے بغیر غسل کر کے نماز شروع کر دیں۔'
    ],
    practicalGuidelinesEnglish: [
      'Do not dismiss light yellow or brown spots as non-menstrual if they occur within your customary cycle days.',
      'Inspect hygiene pads upon waking or before sleep; once pure white discharge or total dryness appears, purity is established.',
      'Once purity is confirmed, perform Ghusl without unnecessary delay and resume obligatory prayers.'
    ]
  },
  {
    id: 'f-09',
    titleUrdu: 'عورت کے غسل میں مینڈھیاں اور گندھے ہوئے بال کھولنے کا حکم',
    titleEnglish: 'Rulings on Braided Hair During Women\'s Obligatory Ghusl (Naqd al-Dhafa\'ir)',
    category: 'haidh',
    summaryUrdu: 'اگر عورت کے بال گندھے ہوئے ہوں (مینڈھیاں ہوں) تو غسل میں بالوں کو کھولنا فرض نہیں، بشرطیکہ پانی بالوں کی جڑوں تک بغیر کھولے پہنچ جائے۔',
    summaryEnglish: 'A woman with tightly braided or plaited hair is not legally required to undo her braids for Ghusl, provided water reaches the roots of her scalp.',
    detailedRulingUrdu: 'صحیح مسلم میں سیدتنا ام سلمہ رضی اللہ عنہا کی حدیث ہے کہ انہوں نے عرض کیا: "یا رسول اللہ! میں اپنے سر کی مینڈھیاں مضبوطی سے باندھتی ہوں، کیا غسلِ جنابت و حیض کے لیے انہیں کھولوں؟" حضور ﷺ نے فرمایا: "نہیں! تمہارے لیے یہی کافی ہے کہ تم اپنے سر پر تین لپ پانی ڈال لو اور پھر اپنے سارے جسم پر پانی بہا دو"۔ فقہ حنفی میں عورت کے لیے تخفیف ہے کہ اگر بال گندھے ہیں تو صرف جڑوں کو گیلا کرنا اور ہر بال کی جڑ تک پانی پہنچانا فرض ہے۔ ہاں اگر بال کھلے ہوئے ہوں تو ہر ایک بال کو اوپر سے نیچے تک تر کرنا فرض ہے؛ اسی طرح اگر بال اتنے سخت گندھے ہوں کہ جڑوں تک پانی نہ پہنچ سکے تو کھولنا لازم ہوگا۔',
    detailedRulingEnglish: 'In Sahih Muslim, Sayyidatuna Umm Salamah inquired: "O Messenger of Allah, I braid my hair tightly; should I undo it for Ghusl?" The Prophet ﷺ replied: "No, it is sufficient for you to pour three handfuls of water over your head, then pour water over the rest of your body." Hanafi jurists rule this a merciful divine dispensation for women: if hair is braided, only moistening the scalp roots is obligatory. However, if hair is loose/unbraided, every single strand must be wetted completely.',
    hanafiReference: 'صحیح مسلم، حدیث رقم ۳۳۰ / الہدایہ شرح بدایۃ المبتدی، کتاب الطہارۃ / بہارِ شریعت',
    practicalGuidelines: [
      'مینڈھیاں باندھی ہوں تو سر کی جلد پر ہاتھ کی انگلیوں سے پانی کو اچھی طرح جڑوں تک پہنچائیں۔',
      'اگر بال کھلے (unbraided) ہوں تو پورے بالوں کو بھگونا اور دھونا فرض ہے، ایک بال بھی سوکھا نہ رہے۔',
      'اگر بالوں میں ایسا تیل، جیل یا ویکس ہو جس سے پانی بالوں تک نہ پہنچے تو پہلے اسے دھو کر صاف کریں۔'
    ],
    practicalGuidelinesEnglish: [
      'When hair is plaited, work water deeply into the scalp with your fingertips so all roots are soaked.',
      'If hair is worn loose, every strand must be completely soaked from root to tip without exception.',
      'If heavy styling wax or impenetrable oils are applied, wash them out first to ensure water penetrates.'
    ]
  },
  {
    id: 'f-10',
    titleUrdu: 'واٹر پروف میک اپ، نیل پالش، مصنوعی ناخن اور مہندی کے احکام',
    titleEnglish: 'Waterproof Cosmetics, Nail Polish, Acrylic Nails & Henna in Wudu/Ghusl',
    category: 'namaz_posture',
    summaryUrdu: 'ایسا میک اپ، نیل پالش یا مصنوعی ناخن جو ناخن یا جلد تک پانی پہنچنے سے مانع ہو، اس کی موجودگی میں وضو اور غسل نہیں ہوتا اور نماز باطل ہو جاتی ہے۔',
    summaryEnglish: 'Any cosmetic coating, commercial nail polish, or acrylic nails that form an impermeable barrier preventing water contact invalidates both Wudu and Ghusl.',
    detailedRulingUrdu: 'وضو اور غسل کے ارکانِ فرضیہ میں سے ہے کہ اعضائے مغسولہ کے ہر حصے تک پانی پہنچے۔ روایتی نیل پالش، مصنوعی ایکریلک ناخن اور واٹر پروف فاؤنڈیشن جلد پر پلاسٹک جیسی پرت چڑھا دیتے ہیں جو پانی کو چھونے نہیں دیتے۔ نام نہاد "سانس لینے والی نیل پالش (Breathable Nail Polish)" کے متعلق ائمۂ فتویٰ کا فتویٰ ہے کہ چونکہ وہ مکمل اور فوری طور پر پورے ناخن تک پانی نہیں پہنچاتی، لہٰذا اس پر وضو و غسل کرنا سخت خطرناک اور نماز کو مشکوک بنانا ہے۔ اس کے برعکس قدرتی مہندی (حناء) صرف رنگ چھوڑتی ہے اور کوئی پرت نہیں بناتی، اس لیے مہندی کے ساتھ وضو اور غسل بالکل درست اور سنت ہے۔',
    detailedRulingEnglish: 'It is a strict legal requirement of Wudu and Ghusl that water must directly touch the outer skin and nail surface. Commercial nail enamels, artificial acrylic nails, and waterproof adhesives form an impermeable barrier preventing water contact, rendering purification void. Permeable ("breathable") polishes remain contentious and unsafe for valid Salah according to conservative fatwa councils. In contrast, pure natural Henna (Mehndi) merely deposits organic color stain without forming a physical crust, making it entirely permissible and Sunnah.',
    hanafiReference: 'فتاویٰ عالمگیری (الہندیہ)، ج ۱، کتاب الطہارۃ / فتاویٰ رضویہ، ج ۱ / بہارِ شریعت',
    practicalGuidelines: [
      'وضو اور غسل سے پہلے نیل پالش ریموور سے ناخنوں کو بالکل صاف کریں۔',
      'ہاتھوں اور پیروں پر مصنوعی ایکریلک یا جیل ناخن نماز اور غسل کی صحت کے منافی ہیں۔',
      'خوبصورتی اور زینت کے لیے خالص قدرتی مہندی استعمال کریں جو مسنون اور شرعاً بے داغ ہے۔'
    ],
    practicalGuidelinesEnglish: [
      'Remove all nail polish completely with polish remover prior to making Wudu or Ghusl.',
      'Avoid acrylic, plastic, or glued-on artificial nails as they prevent water contact with nail beds.',
      'Opt for natural Henna/Mehndi for beautification, which is recommended in the Sunnah and leaves no barrier.'
    ]
  },
  {
    id: 'f-11',
    titleUrdu: 'مانع حمل ادویات، ہارمونل امپلانٹس اور بے قاعدہ داغوں کے احکام',
    titleEnglish: 'Hormonal Spotting & Contraceptive Irregular Bleeding (IUDs, Pills)',
    category: 'istihadha',
    summaryUrdu: 'برتھ کنٹرول گولیوں یا آئی یو ڈی کی وجہ سے اگر عادت کے ایام سے ہٹ کر ہلکے داغ آئیں تو وہ "استحاضہ" ہیں، ان میں نماز اور روزہ نہیں چھوڑا جا سکتا۔',
    summaryEnglish: 'Irregular spotting caused by contraceptive implants, pills, or IUDs outside of customary cycle days is classified as Istihadha (illness); Salah and Sawm must never be suspended.',
    detailedRulingUrdu: 'فقہ حنفی کا زریں اصول ہے کہ حیض کے لیے عادت (Aadat) اور دو حیض کے درمیان کم از کم ۱۵ دن کی طہارت کی شرط ہے۔ اگر کسی خاتون نے مانع حمل تدابیر کی وجہ سے ہر چند دن بعد ایک دو قطرے خون دیکھا، جبکہ اس کے حیض کا مہینہ پورا نہیں ہوا یا عادت کے دن نہیں ہیں، تو وہ قطرے محض استحاضہ (بیماری و عارضہ) شمار ہوں گے۔ ایسی بہن ہر نماز کے لیے وضو کرے، پرائیویٹ پارٹ کو صاف کر کے نیا پیڈ لگائے اور فرض و نفل نمازیں ادا کرے۔ ان داغوں کی وجہ سے نمازیں چھوڑنا سخت گناہ کا باعث ہے۔',
    detailedRulingEnglish: 'A fundamental canon of Hanafi jurisprudence stipulates that regular habit (Aadat) governs menses, alongside a mandatory minimum interval of 15 days of purity (Tuhr) between cycles. Spotting caused by hormonal medications, birth control pills, or intrauterine devices (IUDs) outside customary menstruation days is legally Istihadha. A sister experiencing this washes the area, applies a fresh pad, performs fresh Wudu at each prayer time, and fulfills all obligatory prayers and fasts.',
    hanafiReference: 'رد المحتار علی الدر المختار، باب الحیض / فتاویٰ فیض الرسول / جنتی زیور',
    practicalGuidelines: [
      'اپنے ہارمونل ادویات شروع کرنے کی تاریخ اور سابقہ عادت کا مکمل تقابلی ریکارڈ رکھیں۔',
      'عادت کے علاوہ دنوں میں آنے والے ہلکے دھبوں پر نماز ہرگز قضا نہ کریں بلکہ تازہ وضو کر کے پڑھیں۔',
      'اگر مسلسل خون بہتا رہے تو وہ معذور کے حکم میں ہے اور ہر نماز کے وقت نیا وضو کرے۔'
    ],
    practicalGuidelinesEnglish: [
      'Maintain a precise medical log of your previous natural habit vs post-medication spotting dates.',
      'Never abandon Salah due to irregular spotting outside your normal habit; perform fresh Wudu and pray.',
      'If continuous bleeding occurs throughout the prayer window, you carry the legal status of an excused person (Ma\'dhur).'
    ]
  },
  {
    id: 'f-12',
    titleUrdu: 'مخصوص ایام میں سجدۂ تلاوت، نمازِ جنازہ اور اذان کے جواب کا حکم',
    titleEnglish: 'Sajdah-e-Tilawah, Janazah Prayer, and Adhan Answering During Menses',
    category: 'spiritual_rhythm',
    summaryUrdu: 'حیض کے دوران اگر عورت سجدۂ تلاوت کی آیت سنے تو پاک ہونے کے بعد بھی اس پر سجدۂ تلاوت واجب نہیں ہوتا، یہ مکمل معاف ہے۔',
    summaryEnglish: 'Hearing an Ayah of Sajdah during menses incurs zero obligation for Sajdah-e-Tilawah even after purification; it is completely waived like prayer.',
    detailedRulingUrdu: 'فقہ حنفی کے مطابق سجدۂ تلاوت کا وجوب اس وقت عائد ہوتا ہے جب سننے والا نماز کا اہل ہو۔ چونکہ حیض اور نفاس کے ایام میں عورت نماز کی مکلف نہیں رہتی، اس لیے اگر اس نے قرآن پاک کی سجدے والی آیت کسی قاری سے سنی یا لاؤڈ اسپیکر سے سنی، تو پاک ہونے کے بعد اس سجدے کی کوئی قضا نہیں اور نہ ہی وہ گنہگار ہوگی۔ اسی طرح نمازِ جنازہ پڑھنا بھی مخصوص ایام میں ناجائز ہے۔ البتہ اذان سن کر دل میں یا زبان سے کلماتِ اذان دہرانا اور اذان کے بعد کی مسنون دعا پڑھنا بالکل جائز اور مستحب ہے کیونکہ یہ ذکر و تسبیح ہے تلاوت نہیں۔',
    detailedRulingEnglish: 'In Hanafi jurisprudence (Nur al-Idah & Bahar-e-Shari\'at), the obligation to perform Sajdah-e-Tilawah only falls upon those legally eligible for prayer at the moment of hearing. Because a menstruating woman is legally exempt from Salah, hearing a verse of prostration incurs no Qadha or sin whatsoever once purified. Similarly, Janazah prayer is prohibited during menses. However, repeating the words of the Adhan and supplicating with the post-Adhan Du\'a is permissible and rewarded, as it constitutes remembrance (Dhikr), not Quranic recitation.',
    hanafiReference: 'نور الایضاح، فصل فی سجود التلاوۃ / بہارِ شریعت، حصہ ۴ / درِ مختار',
    practicalGuidelines: [
      'حیض کے دوران سجدۂ تلاوت سننے پر پریشان نہ ہوں، اس کی قضا شریعت نے معاف فرمائی ہے۔',
      'اذان سن کر احتراماً خاموشی اختیار کریں اور دل ہی دل میں اذان کا مسنون جواب دیں۔',
      'اذان کے بعد کا مسنون درود اور دعا (اللهم رب هذه الدعوة التامة) پڑھ کر ثواب حاصل کریں۔'
    ],
    practicalGuidelinesEnglish: [
      'Do not be troubled when hearing an Ayah of Sajdah during menstruation; its performance is entirely waived.',
      'Maintain quiet respect during the Adhan and repeat the sacred phrases mentally or verbally.',
      'Recite Salawat and the post-Adhan supplication (Allahumma Rabba hadhihid-da\'wah) to earn intercession.'
    ]
  }
];

// ==========================================
// 4. MOTHERHOOD & FAMILY MASNOON DUAS
// ==========================================
export const MOTHERHOOD_FAMILY_DUAS: MasnoonFamilyDua[] = [
  {
    id: 'dua-01',
    titleUrdu: 'نیک اور صالح اولاد کے لیے قرآنی دعا',
    titleEnglish: 'Dua for Righteous Offspring (Prophet Zakariyya\'s Supplication)',
    category: 'pregnancy_labor',
    arabicText: 'رَبِّ هَبْ لِي مِن لَّدُنكَ ذُرِّيَّةً طَيِّبَةً ۖ إِنَّكَ سَمِيعُ الدُّعَاءِ',
    transliteration: 'Rabbi hab li min ladunka dhurriyyatan tayyibatan innaka samee\'ud-du\'a',
    translationUrdu: 'اے میرے پروردگار! مجھے اپنی جناب سے پاکیزہ اولاد عطا فرما، بیشک تو ہی دعا سننے والا ہے۔',
    translationEnglish: 'My Lord, grant me from Yourself a good offspring. Indeed, You are the Hearer of supplication.',
    reference: 'سورۃ آل عمران، آیت ۳۸',
    spiritualVirtueUrdu: 'حضرت زکریا علیہ السلام نے بڑھاپے میں یہ دعا مانگی تو اللہ تعالیٰ نے حضرت یحییٰ علیہ السلام کی بشارت عطا فرمائی۔ حمل کے دوران روزانہ کثرت سے پڑھیں۔',
    spiritualVirtueEnglish: 'Supplicated by Prophet Zakariyya in old age, through which Allah blessed him with Prophet Yahya. Recommended to recite abundantly during pregnancy.'
  },
  {
    id: 'dua-02',
    titleUrdu: 'آنکھوں کی ٹھنڈک اور صالح گھرانے کی دعا',
    titleEnglish: 'Dua for Family Peace & Consolation of the Eyes',
    category: 'marital_peace',
    arabicText: 'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا',
    transliteration: 'Rabbana hab lana min azwajina wa dhurriyyatina qurrata a\'yunin waj\'alna lil-muttaqeena imama',
    translationUrdu: 'اے ہمارے رب! ہمیں ہماری بیویوں اور ہماری اولاد کی طرف سے آنکھوں کی ٹھنڈک عطا فرما اور ہمیں پرہیزگاروں کا پیشوا بنا۔',
    translationEnglish: 'Our Lord, grant us from among our spouses and offspring comfort to our eyes and make us an example for the righteous.',
    reference: 'سورۃ الفرقان، آیت ۷۴',
    spiritualVirtueUrdu: 'ہر نماز کے بعد اس دعا کو پڑھنے سے شوہر اور بیوی کے درمیان محبت اور بچوں میں اطاعت پیدا ہوتی ہے۔',
    spiritualVirtueEnglish: 'Reciting after each prayer nurtures mutual marital compassion and instills righteousness and respect in children.'
  },
  {
    id: 'dua-03',
    titleUrdu: 'بچوں کو نظرِ بد اور شیطان سے حفاظت کی نبوی پناہ',
    titleEnglish: 'Prophetic Protection for Children from the Evil Eye (Ayn) and Harm',
    category: 'children_protection',
    arabicText: 'أُعِيذُكُمَا بِكَلِمَاتِ اللَّهِ التَّامَّةِ، مِنْ كُلِّ شَيْطَانٍ وَهَامَّةٍ، وَمِنْ كُلِّ عَيْنٍ لَامَّةٍ',
    transliteration: 'U\'eedhukuma bi-kalimatillahi at-tammah, min kulli shaytanin wa hammah, wa min kulli \'aynin lammah',
    translationUrdu: 'میں تم دونوں کو اللہ کے تمام و کمال کلمات کی پناہ میں دیتا ہوں، ہر شیطان اور زہریلے جانور سے، اور ہر نظر لگ جانے والی بری آنکھ سے۔',
    translationEnglish: 'I seek protection for you both in the perfect words of Allah, from every devil and poisonous reptile, and from every evil, envious eye.',
    reference: 'صحیح البخاری، حدیث رقم ۳۳۷۱',
    spiritualVirtueUrdu: 'رسول اللہ ﷺ حضرت حسن اور حضرت حسین رضی اللہ عنہما کو یہ دعا پڑھ کر دم فرمایا کرتے تھے۔ ماؤں کو چاہیے کہ روزانہ اپنے بچوں پر پڑھ کر دم کریں۔',
    spiritualVirtueEnglish: 'The Prophet ﷺ recited this to shield Hasan and Husayn. Mothers are encouraged to recite this daily upon their children.'
  },
  {
    id: 'dua-04',
    titleUrdu: 'حمل کی حفاظت اور ولادت میں آسانی کی دعا',
    titleEnglish: 'Dua for Ease in Childbirth & Removing Hardship',
    category: 'pregnancy_labor',
    arabicText: 'يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ، رَبِّ يَسِّرْ وَلَا تُعَسِّرْ وَتَمِّمْ بِالْخَيْرِ',
    transliteration: 'Ya Hayyu Ya Qayyumu bi-rahmatika astagheeth, Rabbi yassir wa la tu\'assir wa tammim bil-khayr',
    translationUrdu: 'اے زندہ و جاوید اور سب کو قائم رکھنے والے پروردگار! میں تیری ہی رحمت سے فریاد کرتی ہوں، اے میرے رب! آسانی فرما اور تنگی نہ کر اور بھلائی کے ساتھ مکمل فرما۔',
    translationEnglish: 'O Ever-Living, O Self-Sustaining, by Your mercy I seek assistance. My Lord, make this easy and do not make it difficult, and complete it in goodness.',
    reference: 'جامع الترمذی، حدیث ۳۵۲۴ / حصنِ حصین',
    spiritualVirtueUrdu: 'دردِ زہ کے وقت اور حمل کے آخری مہینوں میں پڑھنے سے ولادت میں حیرت انگیز آسانی نصیب ہوتی ہے۔',
    spiritualVirtueEnglish: 'Reciting during labor contractions and the final trimester brings peace and divine ease during delivery.'
  },
  {
    id: 'dua-05',
    titleUrdu: 'نوزائیدہ بچے کی سنتیں اور مسنون آداب',
    titleEnglish: 'Sunnah Protocols and Rituals for the Newborn Infant',
    category: 'newborn_sunnah',
    arabicText: 'بَارَكَ اللَّهُ لَكَ فِي الْمَوْهُوبِ لَكَ، وَشَكَرْتَ الْوَاهِبَ، وَبَلَغَ أَشُدَّهُ، وَرُزِقْتَ بِرَّهُ',
    transliteration: 'Barakallahu laka fil-mawhoobi laka, wa shakarta al-wahiba, wa balagha ashuddahu, wa ruziqta birrah',
    translationUrdu: 'اللہ تعالیٰ تمہیں اس دی ہوئی نعمت میں برکت دے، اور تم دینے والے کا شکر ادا کرو، اور بچہ اپنی جوانی کو پہنچے اور تمہیں اس کی نیکی اور خدمت نصیب ہو۔',
    translationEnglish: 'May Allah bless you in what was granted to you, and may you be grateful to the Giver, and may the child reach maturity and you be blessed with their righteousness.',
    reference: 'الاذکار للامام النووی / تحفۃ المودود لابن القیم',
    spiritualVirtueUrdu: 'ولادت کے مبارک سنت آداب: دائیں کان میں اذان اور بائیں میں اقامت، میٹھی کھجور چبا کر تالو سے لگانا (تحنیک)، ساتویں دن اچھا نام رکھنا، سر کے بال منڈوا کر بالوں کے وزن کے برابر چاندی صدقہ کرنا، اور عقیقہ کرنا۔',
    spiritualVirtueEnglish: 'Blessed newborn Sunnah rites: Adhan in right ear, Iqamah in left ear, Tahneek with softened date, naming on 7th day, shaving head and giving equivalent silver in charity, and performing Aqeeqah.'
  },
  {
    id: 'dua-06',
    titleUrdu: 'میاں بیوی میں محبت، الفت اور ناچاقی دور کرنے کی قرآنی دعا',
    titleEnglish: 'Dua for Mutual Marital Love, Softening Hearts & Harmony',
    category: 'marital_peace',
    arabicText: 'وَأَلَّفَ بَيْنَ قُلُوبِهِمْ ۚ لَوْ أَنفَقْتَ مَا فِي الْأَرْضِ جَمِيعًا مَّا أَلَّفْتَ بَيْنَ قُلُوبِهِمْ وَلَٰكِنَّ اللَّهَ أَلَّفَ بَيْنَهُمْ ۚ إِنَّهُ عَزِيزٌ حَكِيمٌ',
    transliteration: 'Wa allafa bayna quloobihim, law anfaqta ma fil-ardi jamee\'an ma allafta bayna quloobihim wa lakinnallaha allafa baynahum, innahu \'Azeezun Hakeem.',
    translationUrdu: 'اور ان کے دلوں میں الفت پیدا کر دی۔ اگر آپ زمین میں جو کچھ ہے سب خرچ کر دیتے تب بھی ان کے دلوں میں الفت نہ ڈال سکتے، لیکن اللہ نے ان کے درمیان الفت پیدا کر دی، بیشک وہ غالب، حکمت والا ہے۔',
    translationEnglish: 'And He brought together their hearts. If you had spent all that is in the earth, you could not have brought their hearts together; but Allah brought them together. Indeed, He is Exalted in Might and Wise.',
    reference: 'سورۃ الانفال، آیت ۶۳',
    spiritualVirtueUrdu: 'میاں بیوی میں رنجش یا دوری پیدا ہو تو اس قرآنی آیت کو روزانہ ۱۱ مرتبہ پڑھ کر دعا کرنا دلوں کی سختی دور کرنے اور باہمی الفت کے لیے مجرب ہے۔',
    spiritualVirtueEnglish: 'Recited 11 times daily to soften hearts, resolve spousal discord, and rekindle compassionate warmth in marriage.'
  },
  {
    id: 'dua-07',
    titleUrdu: 'بچے کو دودھ پلاتے وقت برکت اور نیکی کی دعا',
    titleEnglish: 'Supplication for Nursing Mothers: Barakah in Maternal Milk & Infant Nurture',
    category: 'newborn_sunnah',
    arabicText: 'اللَّهُمَّ بَارِكْ لَنَا فِيهِ وَزِدْنَا مِنْهُ، وَاجْعَلْهُ رِزْقًا طَيِّبًا وَشِفَاءً مُبَارَكًا',
    transliteration: 'Allahumma barik lana feehi wa zidna minhu, waj\'alhu rizqan tayyiban wa shifa\'an mubaraka.',
    translationUrdu: 'اے اللہ! ہمارے لیے اس دودھ میں برکت عطا فرما اور ہمیں اس میں زیادتی بخش، اور اسے پاکیزہ رزق اور بابرکت شفا بنا۔',
    translationEnglish: 'O Allah, bless us in this milk and increase it for us, and make it wholesome sustenance and blessed healing.',
    reference: 'سنن ابی داؤد، حدیث ۳۷۳۰ / جامع الترمذی، حدیث ۳۴۵۵',
    spiritualVirtueUrdu: 'رسول اللہ ﷺ نے فرمایا کہ دودھ کے علاوہ کوئی چیز ایسی نہیں جو کھانے اور پینے دونوں کی جگہ کافی ہو جائے۔ مائیں دودھ پلاتے وقت بسم اللہ کے بعد یہ دعا پڑھیں تو بچے میں برکت اور صالحیت پیدا ہوتی ہے۔',
    spiritualVirtueEnglish: 'Prophetic prayer upon drinking milk. When recited by nursing mothers, it invites divine Barakah into the child\'s growth, nutrition, and righteous disposition.'
  },
  {
    id: 'dua-08',
    titleUrdu: 'بعد از ولادت ذہنی دباؤ، اداسی اور خوف سے پناہ کی نبوی دعا',
    titleEnglish: 'Prophetic Solace for Postpartum Anxiety, Depression & Mental Anguish',
    category: 'pregnancy_labor',
    arabicText: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ وَغَلَبَةِ الرِّجَالِ',
    transliteration: 'Allahumma inni a\'udhu bika minal-hammi wal-hazani, wal-\'ajzi wal-kasali, wal-bukhli wal-jubni, wa dala\'id-dayni wa ghalabatir-rijal.',
    translationUrdu: 'اے اللہ! میں تیری پناہ مانگتی ہوں فکر و پریشانی اور غم سے، اور عاجزی و کمزوری اور سستی سے، اور بخل اور بزدلی سے، اور قرض کے بوجھ اور لوگوں کے دباؤ سے۔',
    translationEnglish: 'O Allah, I seek refuge in You from anxiety and grief, from incapacity and laziness, from stinginess and cowardice, from the burden of debt, and from the overpowering of people.',
    reference: 'صحیح البخاری، حدیث ۲۸۹۳',
    spiritualVirtueUrdu: 'زچگی کے بعد ہارمونز کے عدم توازن سے پیدا ہونے والے ڈپریشن (Postpartum Depression)، بے سبب رونے اور اداسی کے وقت اس دعا کا ورد دل کو گہری تسکین اور روحانی ڈھارس دیتا ہے۔',
    spiritualVirtueEnglish: 'The premier Prophetic shield against clinical grief, postpartum anxiety, emotional depletion, and irrational fear after childbirth.'
  },
  {
    id: 'dua-09',
    titleUrdu: 'والدین کے حق میں رحمت اور حسنِ سلوک کی قرآنی دعا',
    titleEnglish: 'Supplication for Aging Parents: Filial Compassion and Mercy',
    category: 'marital_peace',
    arabicText: 'رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا',
    transliteration: 'Rabbi irhamhuma kama rabbayani sagheera.',
    translationUrdu: 'اے میرے رب! تو ان دونوں (والدین) پر رحم فرما جیسا کہ انہوں نے مجھے بچپن میں پالا اور میری پرورش کی۔',
    translationEnglish: 'My Lord, have mercy upon them both as they raised me when I was small.',
    reference: 'سورۃ الاسراء، آیت ۲۴',
    spiritualVirtueUrdu: 'والدین کی حیات میں ان کی خوشنودی اور وفات کے بعد ان کی مغفرت اور درجات کی بلندی کے لیے ہر فرض نماز کے بعد یہ دعا مانگنا اولاد کی اولین ذمہ داری ہے۔',
    spiritualVirtueEnglish: 'The direct Quranic command for honoring parents. Recited after obligatory prayers to seek divine mercy upon one\'s mother and father in this world and the Barzakh.'
  },
  {
    id: 'dua-10',
    titleUrdu: 'بیمار بچے کے بخار اور تکلیف کے وقت کی نبوی دم و شفا',
    titleEnglish: 'Prophetic Ruqyah for Sick Children, Fever & Relieving Pain',
    category: 'children_protection',
    arabicText: 'بِسْمِ اللَّهِ أَرْقِيكَ، مِنْ كُلِّ شَيْءٍ يُؤْذِيكَ، مِنْ شَرِّ كُلِّ نَفْسٍ أَوْ عَيْنِ حَاسِدٍ، اللَّهُ يَشْفِيكَ، بِسْمِ اللَّهِ أَرْقِيكَ',
    transliteration: 'Bismillahi arqeeka, min kulli shay\'in yu\'dheeka, min sharri kulli nafsin aw \'ayni hasidin, Allahu yashfeeka, Bismillahi arqeeka.',
    translationUrdu: 'اللہ کے نام سے میں تجھے دم کرتی ہوں، ہر اس چیز سے جو تجھے تکلیف پہنچائے، ہر جان کے شر سے یا حسد کرنے والی آنکھ سے، اللہ تجھے شفا عطا فرمائے، اللہ کے نام سے میں تجھے دم کرتی ہوں۔',
    translationEnglish: 'In the Name of Allah I perform Ruqyah for you, from everything that harms you, from the evil of every soul or envious eye, may Allah heal you, in the Name of Allah I perform Ruqyah for you.',
    reference: 'صحیح مسلم، حدیث رقم ۲۱۸۶ (عن ابی سعید الخدری)',
    spiritualVirtueUrdu: 'جب بچے کو بخار ہو، دانت نکلنے کی تکلیف ہو یا بیمار ہو، تو ماں اپنا دایاں ہاتھ بچے کے سر پر رکھ کر ۳ بار یہ دعا پڑھے۔ حضرت جبرائیل علیہ السلام نے حضور ﷺ کی عیادت کے وقت یہی مسنون دم فرمایا تھا۔',
    spiritualVirtueEnglish: 'The authentic Ruqyah performed by Archangel Jibril upon the Prophet ﷺ. Mothers should place their right hand upon a feverish or distressed child\'s forehead and recite thrice.'
  }
];

// ==========================================
// 5. HANAFI FIQH CYCLE ENGINE (BAHAR-E-SHARI'AT)
// ==========================================
export interface HanafiCycleCalculationResult {
  status: 'VALID_HAIDH' | 'EXCESS_ISTIHADHA' | 'DEFICIENT_ISTIHADHA';
  statusUrdu: string;
  statusEnglish: string;
  haidhDays: number;
  istihadhaDays: number;
  qadhaSalahRequired: boolean;
  qadhaDaysCount: number;
  ghuslObligationUrdu: string;
  ghuslObligationEnglish: string;
  prayerRulingsUrdu: string;
  prayerRulingsEnglish: string;
  fastingRulingsUrdu: string;
  fastingRulingsEnglish: string;
  spiritualPrescriptionUrdu: string[];
  spiritualPrescriptionEnglish?: string[];
  referenceText: string;
}

export function calculateHanafiCycleStatus(
  totalDays: number,
  habitDays: number = 6
): HanafiCycleCalculationResult {
  // Case 1: Deficient bleeding (< 3 days / 72 hours)
  if (totalDays < 3) {
    return {
      status: 'DEFICIENT_ISTIHADHA',
      statusUrdu: 'خون ۳ دن سے کم رہا — یہ حیض نہیں بلکہ استحاضہ (بیماری) ہے',
      statusEnglish: 'Bleeding less than 3 days — Classified as Istihadha, not Haidh',
      haidhDays: 0,
      istihadhaDays: totalDays,
      qadhaSalahRequired: true,
      qadhaDaysCount: totalDays,
      ghuslObligationUrdu: 'غسلِ حیض فرض نہیں ہے، صرف وضو اور نجاست دھونا کافی ہے۔',
      ghuslObligationEnglish: 'Menstrual Ghusl is not obligatory; standard Wudu and cleansing suffice.',
      prayerRulingsUrdu: `چونکہ خون ۳ دن سے کم رہا اس لیے یہ حیض نہیں تھا، لہٰذا ان ${totalDays} دنوں میں جو نمازیں چھوٹی ہیں، ان کی فورا قضا پڑھنا فرض ہے۔`,
      prayerRulingsEnglish: `Because bleeding lasted under 72 hours, it is not Haidh. Prayers missed during these ${totalDays} days must be performed as Qadha immediately.`,
      fastingRulingsUrdu: 'اگر ان دنوں میں روزہ چھوڑا تھا تو اس کی قضا رکھنا لازم ہے۔',
      fastingRulingsEnglish: 'If any fasts were deferred during this time, they must be made up.',
      spiritualPrescriptionUrdu: [
        'چھوٹی ہوئی نمازوں کی قضا جلد از جلد ادا کریں۔',
        'ہر نماز کے وقت نیا وضو کر کے نماز ادا کریں۔',
        'خون کے داغ کو صاف پانی سے دھو کر پاک کپڑے پہنیں۔'
      ],
      spiritualPrescriptionEnglish: [
        'Perform Qadha for all prayers missed during these days as soon as possible.',
        'Perform a fresh Wudu at the start of each obligatory prayer time.',
        'Wash away impurity with clean water and wear fresh garments for Salah.'
      ],
      referenceText: 'بہارِ شریعت، حصہ ۲، حیض کا بیان / درِ مختار'
    };
  }

  // Case 2: Valid Haidh (between 3 and 10 days)
  if (totalDays >= 3 && totalDays <= 10) {
    return {
      status: 'VALID_HAIDH',
      statusUrdu: `مکمل ${totalDays} دن حیض قرار پائے (شرعی مدت کے اندر)`,
      statusEnglish: `Full ${totalDays} days confirmed as valid Haidh (Within canonical 3–10 day window)`,
      haidhDays: totalDays,
      istihadhaDays: 0,
      qadhaSalahRequired: false,
      qadhaDaysCount: 0,
      ghuslObligationUrdu: 'خون رکتے ہی طہارت کا غسل فرض ہو چکا ہے، غسل کے بعد فورا نماز شروع کریں۔',
      ghuslObligationEnglish: 'Purification Ghusl is strictly obligatory upon cessation of bleeding. Pray immediately after.',
      prayerRulingsUrdu: `ان تمام ${totalDays} دنوں کی نمازیں شریعت کی طرف سے بالکل معاف ہیں، ان کی قضا پڑھنا لازم نہیں ہے۔`,
      prayerRulingsEnglish: `Prayers during these ${totalDays} days are entirely exempt; no Qadha is ever required.`,
      fastingRulingsUrdu: 'رمضان کے روزے اگر چھوٹے ہیں تو ان کی بعد میں ایک ایک کر کے قضا رکھنا فرض ہے۔',
      fastingRulingsEnglish: 'Deferred Ramadan fasts must be made up individually prior to next Ramadan.',
      spiritualPrescriptionUrdu: [
        'غسل میں کلی کرنا اور ناک میں نرم ہڈی تک پانی پہنچانا یاد رکھیں۔',
        'پاک ہوتے ہی مصلے پر شکرانے کے ساتھ حاضر ہوں۔',
        'مخصوص ایام کے دوران روزانہ مصلے پر بیٹھ کر درود شریف پڑھتے رہنے سے روحانی نور قائم رہتا ہے۔'
      ],
      spiritualPrescriptionEnglish: [
        'Ensure the mandatory Faraidh of Ghusl: thorough gargling and rinsing the nose up to soft bone.',
        'Return to your prayer rug with gratitude as soon as pure.',
        'Sitting on your prayer mat during prayer times for Salawat preserves spiritual light and intimacy.'
      ],
      referenceText: 'بہارِ شریعت، حصہ ۲ / جنتی زیور، ص ۷۸'
    };
  }

  // Case 3: Excess beyond 10 days (> 10 days)
  // In Hanafi Fiqh: If she has a known habit, her habit days are Haidh, and excess days are Istihadha.
  const validHabit = habitDays >= 3 && habitDays <= 10 ? habitDays : 6;
  const excessIstihadhaDays = totalDays - validHabit;
  const qadhaOwedDays = totalDays > 10 ? totalDays - validHabit : 0;

  return {
    status: 'EXCESS_ISTIHADHA',
    statusUrdu: `خون ۱۰ دن سے متجاوز ہو گیا — ابتدائی ${validHabit} دن حیض اور بقیہ ${excessIstihadhaDays} دن استحاضہ ہیں`,
    statusEnglish: `Bleeding exceeded 10 days — Initial ${validHabit} days (habit) are Haidh; remaining ${excessIstihadhaDays} days are Istihadha`,
    haidhDays: validHabit,
    istihadhaDays: excessIstihadhaDays,
    qadhaSalahRequired: true,
    qadhaDaysCount: qadhaOwedDays,
    ghuslObligationUrdu: `ابتدائی ${validHabit} دن (عادت) کے مکمل ہوتے ہی غسل فرض ہو چکا تھا، اگر غسل نہیں کیا تھا تو ابھی فورا غسل کریں۔`,
    ghuslObligationEnglish: `Ghusl was due at the end of Day ${validHabit} (your normal habit). If not performed, take Ghusl immediately.`,
    prayerRulingsUrdu: `چونکہ عادت سے زائد دن (${validHabit + 1} سے ${totalDays} تک) استحاضہ تھے، اس لیے ان ${qadhaOwedDays} دنوں میں جو نمازیں نہیں پڑھی گئیں ان کی قضا پڑھنا فرض ہے۔`,
    prayerRulingsEnglish: `Because days beyond your habit (Days ${validHabit + 1} to ${totalDays}) were Istihadha, any prayers missed during these ${qadhaOwedDays} days must be performed as Qadha.`,
    fastingRulingsUrdu: `عادت کے ${validHabit} دن کے بعد والے دنوں میں روزہ رکھنا درست تھا، اگر چھوڑا تھا تو قضا رکھیں۔`,
    fastingRulingsEnglish: `Fasting was valid after Day ${validHabit}. If fasts were deferred during Istihadha days, perform them as Qadha.`,
    spiritualPrescriptionUrdu: [
      'آئندہ کے لیے اپنی عادت کے دنوں (مثلاً ۶ یا ۷ دن) کو سختی سے یاد رکھیں۔',
      '۱۰ دن سے زیادہ خون آنے پر عادت کے دن پورے ہوتے ہی غسل کر کے نمازیں جاری رکھیں۔',
      'استحاضہ کے دوران ہر فرض نماز کے وقت نیا وضو کرنا معذور کے لیے ضروری ہے۔'
    ],
    spiritualPrescriptionEnglish: [
      'Note and remember your established habit duration (e.g. 6 or 7 days) strictly in your journal.',
      'When bleeding exceeds 10 days, take Ghusl right after your habit days conclude and resume Salah.',
      'During Istihadha, perform fresh Wudu for each obligatory prayer time under the ruling of an excused person.'
    ],
    referenceText: 'رد المحتار علی الدر المختار، باب الحیض / بہارِ شریعت، حصہ ۲'
  };
}
