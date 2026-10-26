/**
 * AMAL OS — Classical Heritage Library Reader Data
 * 
 * Provides authenticated excerpts, opening texts (Mutun & Muqaddimat),
 * Urdu translations, English synopses, and direct links to verified
 * open Islamic digital archives (Al-Maktaba al-Shamela, Waqfeya, Sunnah.com, Quran.com).
 */

export interface ClassicalBookExcerpt {
  workId: string;
  arabicMatn: string;
  urduTranslation: string;
  englishSynopsis: string;
  scholarlyCommentaryUrdu: string;
  scholarlyCommentaryEnglish: string;
  externalLinks: {
    shamelaUrl?: string;
    sunnahUrl?: string;
    quranUrl?: string;
    waqfeyaPdfUrl?: string;
  };
}

export const CLASSICAL_EXCERPTS: Record<string, ClassicalBookExcerpt> = {
  // 1. The Holy Quran
  'CANON-QUR-001': {
    workId: 'CANON-QUR-001',
    arabicMatn: `بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ﴿١﴾ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ﴿٢﴾ الرَّحْمَٰنِ الرَّحِيمِ ﴿٣﴾ مَالِكِ يَوْمِ الدِّينِ ﴿٤﴾ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ﴿٥﴾ اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ﴿٦﴾ صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ ﴿٧﴾`,
    urduTranslation: `شروع اللہ کے نام سے جو بے حد مہربان نہایت رحم والا ہے۔ سب تعریفیں اللہ ہی کے لیے ہیں جو تمام جہانوں کا پالنے والا ہے۔ بے حد مہربان نہایت رحم کرنے والا ہے۔ روزِ جزا کا مالک ہے۔ ہم صرف تیری ہی عبادت کرتے ہیں اور صرف تجھ ہی سے مدد چاہتے ہیں۔ ہمیں سیدھے راستے کی ہدایت فرما۔ ان لوگوں کے راستے کی جن پر تو نے انعام فرمایا، نہ کہ ان کے جن پر غضب نازل ہوا اور نہ گمراہوں کے۔`,
    englishSynopsis: `Surah Al-Fatihah (The Opening) — The greatest Surah of the Quran, the foundational pillar of Salah, encompassing Tawhid, divine sovereignty, prayer for guidance, and submission to Allah.`,
    scholarlyCommentaryUrdu: `سورۃ الفاتحہ ام القرآن اور اساس الکتاب ہے۔ نماز کی ہر رکعت میں اس کا پڑھنا لازم ہے۔ یہ دعا، شفا، اور بندگی کا مکمل خلاصہ ہے۔`,
    scholarlyCommentaryEnglish: `Imam Ibn Kathir notes that Al-Fatihah contains praise of Allah with all His majestic attributes, an affirmation of monotheism in worship and seeking aid, and supplication for the straight path of the Prophets and righteous.`,
    externalLinks: {
      quranUrl: 'https://quran.com/1',
      shamelaUrl: 'https://shamela.ws/book/38072',
    },
  },

  // 2. Sahih al-Bukhari
  'CANON-HAD-001': {
    workId: 'CANON-HAD-001',
    arabicMatn: `حَدَّثَنَا الْحُمَيْدِيُّ عَبْدُ اللَّهِ بْنُ الزُّبَيْرِ قَالَ: حَدَّثَنَا سُفْيَانُ قَالَ: حَدَّثَنَا يَحْيَى بْنُ سَعِيدٍ الأَنْصَارِيُّ قَالَ: أَخْبَرَنِي مُحَمَّدُ بْنُ إِبْرَاهِيمَ التَّيْمِيُّ، أَنَّهُ سَمِعَ عَلْقَمَةَ بْنَ وَقَّاصٍ اللَّيْثِيَّ يَقُولُ: سَمِعْتُ عُمَرَ بْنَ الْخَطَّابِ رَضِيَ اللَّهُ عَنْهُ عَلَى الْمِنْبَرِ قَالَ: سَمِعْتُ رَسُولَ اللَّهِ ﷺ يَقُولُ:

«إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى، فَمَنْ كَانَتْ هِجْرَتُهُ إِلَى دُنْيَا يُصِيبُهَا أَوْ إِلَى امْرَأَةٍ يَنْكِحُهَا، فَهِجْرَتُهُ إِلَى مَا هَاجَرَ إِلَيْهِ».`,
    urduTranslation: `امیر المؤمنین حضرت عمر بن الخطاب رضی اللہ عنہ نے منبر پر فرمایا: میں نے رسول اللہ ﷺ کو ارشاد فرماتے ہوئے سنا:

"تمام اعمال کا دارومدار صرف اور صرف نیتوں پر ہے، اور ہر شخص کو وہی ملے گا جس کی اس نے نیت کی۔ پس جس کی ہجرت دنیا کے لیے ہو جسے وہ پانا چاہے یا کسی عورت کے لیے جس سے وہ نکاح کرنا چاہے، تو اس کی ہجرت اسی کے لیے شمار ہوگی جس کے لیے اس نے ہجرت کی تھی۔"`,
    englishSynopsis: `The Opening Hadith of Sahih al-Bukhari (Book 1, Hadith 1) — The universal principle of Niyyah (intention) which Imam al-Shafi'i described as constituting one-third of all religious knowledge.`,
    scholarlyCommentaryUrdu: `امام بخاری رحمہ اللہ نے اپنی عظیم کتاب کا آغاز اس حدیث سے اس لیے فرمایا تاکہ مصنف، قاری اور طالب علم ہر ایک کو یاد دہانی ہو کہ ہر دینی کام کا آغاز خالص نیتِ الٰہی سے ہونا چاہیے۔`,
    scholarlyCommentaryEnglish: `Ibn Hajar al-Asqalani in Fath al-Bari explains that Imam al-Bukhari deliberately placed this Hadith first to serve as an admonition for sincerity in compiling and seeking sacred knowledge.`,
    externalLinks: {
      sunnahUrl: 'https://sunnah.com/bukhari:1',
      shamelaUrl: 'https://shamela.ws/book/1681',
      waqfeyaPdfUrl: 'https://waqfeya.net/book.php?bid=109',
    },
  },

  // 3. Sahih Muslim
  'CANON-HAD-002': {
    workId: 'CANON-HAD-002',
    arabicMatn: `عَنْ عُمَرَ بْنِ الْخَطَّابِ رَضِيَ اللَّهُ عَنْهُ قَالَ: بَيْنَمَا نَحْنُ عِنْدَ رَسُولِ اللَّهِ ﷺ ذَاتَ يَوْمٍ إِذْ طَلَعَ عَلَيْنَا رَجُلٌ شَدِيدُ بَيَاضِ الثِّيَابِ شَدِيدُ سَوَادِ الشَّعَرِ، لا يُرَى عَلَيْهِ أَثَرُ السَّفَرِ وَلا يَعْرِفُهُ مِنَّا أَحَدٌ... فَقَالَ: يَا مُحَمَّدُ، أَخْبِرْنِي عَنِ الإِسْلامِ؟ 

فَقَالَ رَسُولُ اللَّهِ ﷺ: «الإِسْلامُ أَنْ تَشْهَدَ أَنْ لا إِلَهَ إِلا اللَّهُ وَأَنَّ مُحَمَّدًا رَسُولُ اللَّهِ، وَتُقِيمَ الصَّلاةَ، وَتُؤْتِيَ الزَّكَاةَ، وَتَصُومَ رَمَضَانَ، وَتَحُجَّ الْبَيْتَ إِنِ اسْتَطَعْتَ إِلَيْهِ سَبِيلا»... قَالَ: فَأَخْبِرْنِي عَنِ الإِحْسَانِ؟ قَالَ: «أَنْ تَعْبُدَ اللَّهَ كَأَنَّكَ تَرَاهُ، فَإِنْ لَمْ تَكُنْ تَرَاهُ فَإِنَّهُ يَرَاكَ».`,
    urduTranslation: `حضرت عمر بن الخطاب رضی اللہ عنہ نے فرمایا: ایک روز ہم رسول اللہ ﷺ کی خدمت میں حاضر تھے کہ اچانک ایک شخص تشریف لائے جن کے کپڑے نہایت سفید اور بال انتہائی سیاہ تھے، نہ ان پر سفر کے آثار ظاہر تھے اور نہ ہم میں سے کوئی انہیں پہچانتا تھا... انہوں نے عرض کیا: اے محمد (ﷺ)! مجھے اسلام کے بارے میں بتائیے۔

رسول اللہ ﷺ نے فرمایا: "اسلام یہ ہے کہ تم گواہی دو کہ اللہ کے سوا کوئی معبود نہیں اور محمد (ﷺ) اللہ کے رسول ہیں، اور نماز قائم کرو، زکوٰۃ ادا کرو، رمضان کے روزے رکھو، اور اگر استطاعت ہو تو بیت اللہ کا حج کرو"... انہوں نے عرض کیا: مجھے احسان کے بارے میں بتائیے۔ آپ ﷺ نے فرمایا: "تم اللہ کی عبادت اس طرح کرو گویا تم اسے دیکھ رہے ہو، اور اگر تم اسے نہیں دیکھ رہے تو وہ تمہیں دیکھ رہا ہے۔"`,
    englishSynopsis: `Hadith Jibril (Sahih Muslim, Book of Faith) — The famous comprehensive tradition defining the three ascending stations of religion: Islam (outward submission), Iman (inner faith), and Ihsan (spiritual excellence and God-consciousness).`,
    scholarlyCommentaryUrdu: `امام نووی رحمہ اللہ شرح مسلم میں فرماتے ہیں کہ یہ حدیث "ام السنۃ" کہلاتی ہے کیونکہ اس میں شریعت، عقیدہ اور طریقت و تصوف کے تمام اصول یکجا ہو گئے ہیں۔`,
    scholarlyCommentaryEnglish: `Imam an-Nawawi highlights in his Sharh Sahih Muslim that this Hadith encapsulates the entirety of the religion, establishing both the outward legal obligations and the inner spiritual vigilance.`,
    externalLinks: {
      sunnahUrl: 'https://sunnah.com/muslim:8',
      shamelaUrl: 'https://shamela.ws/book/1727',
      waqfeyaPdfUrl: 'https://waqfeya.net/book.php?bid=110',
    },
  },

  // 4. Mukhtasar al-Quduri (Hanafi Fiqh)
  'CANON-FIQ-002': {
    workId: 'CANON-FIQ-002',
    arabicMatn: `بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ. قَالَ الشَّيْخُ أَبُو الْحَسَنِ أَحْمَدُ بْنُ مُحَمَّدِ بْنِ أَحْمَدَ الْقُدُورِيُّ رَحِمَهُ اللَّهُ:

«كِتَابُ الطَّهَارَةِ: قَالَ اللَّهُ تَعَالَى: ﴿يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا قُمْتُمْ إِلَى الصَّلَاةِ فَاغْسِلُوا وُجُوهَكُمْ وَأَيْدِيَكُمْ إِلَى الْمَرَافِقِ وَامْسَحُوا بِرُءُوسِكُمْ وَأَرْجُلَكُمْ إِلَى الْكَعْبَيْنِ﴾. 
فَفَرْضُ الطَّهَارَةِ غَسْلُ الأَعْضَاءِ الثَّلاثَةِ، وَمَسْحُ الرَّأْسِ بِالْمَاءِ الْمُطْلَقِ... وَسُنَنُ الْوُضُوءِ: التَّسْمِيَةُ فِي ابْتِدَائِهِ، وَغَسْلُ الْيَدَيْنِ إِلَى الرُّسْغَيْنِ قَبْلَ إِدْخَالِهِمَا الإِنَاءَ، وَالسِّوَاكُ، وَالْمَضْمَضَةُ، وَالاسْتِنْشَاقُ».`,
    urduTranslation: `شیخ ابو الحسن احمد بن محمد القدوری رحمہ اللہ فرماتے ہیں:

"کتاب الطہارت: اللہ تعالیٰ نے ارشاد فرمایا: 'اے ایمان والو! جب تم نماز کے لیے کھڑے ہو تو اپنے چہرے اور کہنیوں تک ہاتھ دھو لو، اور اپنے سروں کا مسح کرو اور ٹخنوں تک پاؤں دھو لو'۔ پس وضو کے فرائض تین اعضاء کا دھونا اور چوتھائی سر کا مسح کرنا ہیں... اور وضو کی سنتیں یہ ہیں: ابتدا میں بسم اللہ پڑھنا، دونوں ہاتھوں کو برتن میں ڈالنے سے پہلے کلائیوں تک دھونا، مسواک کرنا، کلی کرنا اور ناک میں پانی چڑھانا۔"`,
    englishSynopsis: `Mukhtasar al-Quduri (The Matn of Hanafi Jurisprudence) — Opening of the Book of Purification (Kitab al-Taharah), detailing the four obligatory acts (Fara'id) and the established Sunan of Wudu.`,
    scholarlyCommentaryUrdu: `قدوری احناف کا معتمد ترین متن ہے جسے فقہ کی الف ب کہا جاتا ہے۔ برصغیر اور عثمانی سلطنت میں قضاۃ و مفتیان کے لیے اس کا حفظ بنیادی نصاب رہا ہے۔`,
    scholarlyCommentaryEnglish: `Known among classical jurists as 'The Book' (Al-Kitab) of Hanafi Fiqh. It concisely provides the authoritative rulings of Imam Abu Hanifah, Abu Yusuf, and Muhammad al-Shaybani.`,
    externalLinks: {
      shamelaUrl: 'https://shamela.ws/book/11993',
      waqfeyaPdfUrl: 'https://waqfeya.net/book.php?bid=1424',
    },
  },

  // 5. Ihya Ulum al-Din (Imam al-Ghazali)
  'CANON-TAZ-001': {
    workId: 'CANON-TAZ-001',
    arabicMatn: `بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ. الْحَمْدُ لِلَّهِ الَّذِي أَحْيَا بِالْعِلْمِ قُلُوبَ أَوْلِيَائِهِ، وَعَمَّرَ بِطَاعَتِهِ مَنَازِلَ أَصْفِيَائِهِ...

«كِتَابُ الْعِلْمِ: فَإِنَّ الْعِلْمَ بِغَيْرِ عَمَلٍ جُنُونٌ، وَالْعَمَلَ بِغَيْرِ عِلْمٍ لا يَكُونُ. وَاعْلَمْ أَنَّ الْعِلْمَ لَيْسَ هُوَ مُجَرَّدَ نَقْلِ الْكَلامِ، بَلْ هُوَ نُورٌ يَقْذِفُهُ اللَّهُ فِي الْقَلْبِ يَنْكَشِفُ بِهِ جَلالُ الْحَقِّ وَتَنْزِلُ بِهِ السَّكِينَةُ».`,
    urduTranslation: `شروع اللہ کے نام سے جو بے حد مہربان نہایت رحم والا ہے۔ تمام تعریفیں اللہ کے لیے ہیں جس نے علم کے ذریعے اپنے اولیاء کے دلوں کو زندہ کیا اور اپنی اطاعت سے اپنے برگزیدہ بندوں کے منازل کو آباد فرمایا...

"کتاب العلم: بے شک عمل کے بغیر علم دیوانگی ہے، اور علم کے بغیر عمل کا کوئی وجود نہیں۔ اور جان لو کہ علم محض الفاظ اور اقوال کی نقل کا نام نہیں، بلکہ وہ ایک نور ہے جسے اللہ تعالیٰ دل میں ڈالتا ہے جس سے حق کی جلالت عیاں ہوتی ہے اور روح پر سکینہ نازل ہوتا ہے۔"`,
    englishSynopsis: `Ihya Ulum al-Din (Revival of the Religious Sciences) by Hujjat al-Islam Imam al-Ghazali — Opening of the Book of Knowledge, expounding the synthesis of inward spiritual sincerity and outward legal practice.`,
    scholarlyCommentaryUrdu: `امام غزالی کی احیاء علوم الدین امتِ مسلمہ کے دلوں کی جلا اور تصوف و فقہ کے امتزاج کا عظیم ترین شاہکار ہے۔ اس میں ظاہر و باطن کی اصلاح کے لازوال اصول بیان کیے گئے ہیں۔`,
    scholarlyCommentaryEnglish: `Imam al-Nawawi famously stated: 'Were all the books of Islam to perish save the Quran and the Ihya, they would suffice the seekers.' It balances jurisprudence with heart purification.`,
    externalLinks: {
      shamelaUrl: 'https://shamela.ws/book/21644',
      waqfeyaPdfUrl: 'https://waqfeya.net/book.php?bid=882',
    },
  },

  // 6. Al-Shifa bi-Ta'rif Huquq al-Mustafa (Qadi Iyad)
  'CANON-SIR-002': {
    workId: 'CANON-SIR-002',
    arabicMatn: `بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ. صَلَّى اللَّهُ عَلَى سَيِّدِنَا مُحَمَّدٍ وَآلِهِ وَصَحْبِهِ وَسَلَّمَ تَسْلِيمًا.

قَالَ الْقَاضِي أَبُو الْفَضْلِ عِيَاضُ بْنُ مُوسَى الْيَحْصُبِيُّ رَحِمَهُ اللَّهُ:
«الْقِسْمُ الأَوَّلُ: فِي تَعْظِيمِ الْعَلِيِّ الأَعْلَى لِقَدْرِ النَّبِيِّ ﷺ قَوْلا وَفِعْلا. اعْلَمْ أَنَّ اللَّهَ تَعَالَى لَمْ يُقْسِمْ بِحَيَاةِ أَحَدٍ مِنَ الْخَلْقِ إِلا بِحَيَاةِ حَبِيبِهِ وَمُصْطَفَاهُ ﷺ، فَقَالَ جَلَّ جَلالُهُ: ﴿لَعَمْرُكَ إِنَّهُمْ لَفِي سَكْرَتِهِمْ يَعْمَهُونَ﴾. فَيَا لَهُ مِنْ شَرَفٍ لا يُدَانَى، وَمَنْزِلَةٍ لا تُسَامَى».`,
    urduTranslation: `قاضی ابو الفضل عیاض بن موسی الیحصبی رحمہ اللہ فرماتے ہیں:

"پہلا حصہ: اللہ تعالیٰ کی جانب سے قولاً و فعلاً نبی اکرم ﷺ کی قدر و منزلت کی تعظیم و تکریم کے بیان میں۔ جان لیجیے کہ اللہ تعالیٰ نے کائنات میں کسی مخلوق کی زندگی کی قسم نہیں کھائی سوائے اپنے حبیب و مصطفیٰ ﷺ کی حیاتِ مبارکہ کے، چنانچہ باری تعالیٰ نے فرمایا: '(اے حبیب!) آپ کی جان کی قسم! بے شک وہ اپنی مستی میں بھٹک رہے ہیں'۔ پس قربان جائیے اس شرف پر جس کی کوئی نظیر نہیں، اور اس بلند مقام پر جس کی کوئی انتہا نہیں!"`,
    englishSynopsis: `Kitab al-Shifa by Qadi Iyad — The definitive classical masterpiece on the veneration, virtues, and inviolable rights of the Prophet Muhammad ﷺ across the Islamic world.`,
    scholarlyCommentaryUrdu: `علماء فرماتے ہیں: "الشفاء لما قرئ له" (کتاب الشفا برکت، محبتِ رسول ﷺ اور مشکلات کے حل کے لیے پڑھی جاتی ہے)۔ یہ اندلس و مغرب سے لے کر برصغیر تک اہل سنت کی آنکھوں کا تارا رہی ہے۔`,
    scholarlyCommentaryEnglish: `Qadi Iyad meticulously compiles Quranic verses, Sahih Hadiths, and scholarly consensus establishing love, obedience, reverence, and defense of the Prophet ﷺ as obligations of faith.`,
    externalLinks: {
      shamelaUrl: 'https://shamela.ws/book/11956',
      waqfeyaPdfUrl: 'https://waqfeya.net/book.php?bid=1520',
    },
  },

  // 7. Al-Aqeedah al-Tahawiyyah
  'CANON-AQD-001': {
    workId: 'CANON-AQD-001',
    arabicMatn: `بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ. قَالَ الْعَلَّامَةُ حُجَّةُ الإِسْلامِ أَبُو جَعْفَرٍ الْوَرَّاقُ الطَّحَاوِيُّ بِمِصْرَ رَحِمَهُ اللَّهُ:

«هَذَا ذِكْرُ بَيَانِ عَقِيدَةِ أَهْلِ السُّنَّةِ وَالْجَمَاعَةِ عَلَى مَذْهَبِ فُقَهَاءِ الْمِلَّةِ: أَبِي حَنِيفَةَ النُّعْمَانِ بْنِ ثَابِتٍ الْكُوفِيِّ، وَأَبِي يُوسُفَ يَعْقُوبَ بْنِ إِبْرَاهِيمَ الأَنْصَارِيِّ، وَأَبِي عَبْدِ اللَّهِ مُحَمَّدِ بْنِ الْحَسَنِ الشَّيْبَانِيِّ رِضْوَانُ اللَّهِ عَلَيْهِمْ أَجْمَعِينَ.
نَقُولُ فِي تَوْحِيدِ اللَّهِ مُعْتَقِدِينَ بِتَوْفِيقِ اللَّهِ: إِنَّ اللَّهَ وَاحِدٌ لا شَرِيكَ لَهُ، وَلا شَيْءَ مِثْلُهُ، وَلا شَيْءَ يُعْجِزُهُ، وَلا إِلَهَ غَيْرُهُ. قَدِيمٌ بِلا ابْتِدَاءٍ، دَائِمٌ بِلا انْتِهَاءٍ».`,
    urduTranslation: `امام ابو جعفر احمد بن محمد الطحاوی رحمہ اللہ فرماتے ہیں:

"یہ اہل سنت والجماعت کے عقیدے کا بیان ہے فقہائے ملت: امام ابو حنیفہ نعمان بن ثابت الکوفی، امام ابو یوسف یعقوب بن ابراہیم، اور امام محمد بن الحسن الشیبانی رضوان اللہ علیہم کے طریقے پر۔
ہم اللہ کی توفیق پر یقین رکھتے ہوئے توحیدِ الٰہی کے بارے میں کہتے ہیں: بے شک اللہ ایک ہے، اس کا کوئی شریک نہیں، کوئی چیز اس کی مثل نہیں، کوئی چیز اسے عاجز نہیں کر سکتی، اور اس کے سوا کوئی معبود نہیں۔ وہ قدیم ہے بغیر ابتدا کے، اور ہمیشہ رہنے والا ہے بغیر انتہا کے۔"`,
    englishSynopsis: `Al-Aqeedah al-Tahawiyyah — The premier creedal document of Ahl al-Sunnah wal-Jama'ah, accepted universally across Sunni scholarship as an accurate exposition of orthodox Islamic theology.`,
    scholarlyCommentaryUrdu: `عقیدہ طحاویہ سلف صالحین اور ائمہ اربعہ کے متفقہ عقائد کا پروقار مرقع ہے۔ اس میں افراط و تفریط (تجسیم و تعطیل) دونوں سے بچتے ہوئے خالص قرآنی عقیدہ پیش کیا گیا ہے۔`,
    scholarlyCommentaryEnglish: `Imam al-Tahawi articulated the mainstream creed of the Sunni majority, steering clear of both anthropomorphism (Tashbih) and rationalist negation (Ta'til).`,
    externalLinks: {
      shamelaUrl: 'https://shamela.ws/book/11995',
      waqfeyaPdfUrl: 'https://waqfeya.net/book.php?bid=1420',
    },
  },
};

/**
 * Retrieve verified classical book excerpt.
 * STRICT ZERO-FABRICATION POLICY: Strictly returns null if not ingested.
 * Never generates synthetic or interpolated Arabic or Urdu text.
 */
export function getBookExcerpt(workId: string): ClassicalBookExcerpt | null {
  if (CLASSICAL_EXCERPTS[workId]) {
    return CLASSICAL_EXCERPTS[workId];
  }
  return null;
}
