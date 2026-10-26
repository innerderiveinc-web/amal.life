/**
 * AMAL OS — Complete In-App Quran Surahs Dataset
 * 
 * Provides authentic Uthmanic Arabic text with full Medina Tashkeel,
 * Urdu translation from KANZ AL-IMAN (کنز الایمان فی ترجمۃ القرآن - امام احمد رضا خان بریلوی قدس سرہ),
 * and English translation (Saheeh International), allowing complete, spiritually reverent in-app reading.
 */

export interface QuranSurahData {
  surahNumber: number;
  nameArabic: string;
  nameTransliterated: string;
  nameUrdu: string;
  nameEnglish: string;
  revelationType: 'MECCAN' | 'MEDINAN';
  ayahsCount: number;
  verses: Array<{
    ayahNumber: number;
    textArabic: string;
    textUrdu: string;
    textEnglish: string;
  }>;
}

export const QURAN_SURAHS_COLLECTION: QuranSurahData[] = [
  // 1. Al-Fatihah
  {
    surahNumber: 1,
    nameArabic: 'الفَاتِحَة',
    nameTransliterated: 'Al-Fatihah',
    nameUrdu: 'سورۃ الفاتحہ',
    nameEnglish: 'The Opening',
    revelationType: 'MECCAN',
    ayahsCount: 7,
    verses: [
      {
        ayahNumber: 1,
        textArabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
        textUrdu: 'اللہ کے نام سے شروع جو بہت مہربان رحمت والا۔',
        textEnglish: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.',
      },
      {
        ayahNumber: 2,
        textArabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
        textUrdu: 'سب خوبیاں اللہ کو جو مالک سارے جہان والوں کا۔',
        textEnglish: '[All] praise is [due] to Allah, Lord of the worlds.',
      },
      {
        ayahNumber: 3,
        textArabic: 'الرَّحْمَٰنِ الرَّحِيمِ',
        textUrdu: 'بہت مہربان رحمت والا۔',
        textEnglish: 'The Entirely Merciful, the Especially Merciful.',
      },
      {
        ayahNumber: 4,
        textArabic: 'مَالِكِ يَوْمِ الدِّينِ',
        textUrdu: 'روزِ جزا کا مالک۔',
        textEnglish: 'Sovereign of the Day of Recompense.',
      },
      {
        ayahNumber: 5,
        textArabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
        textUrdu: 'ہم تجھی کو پوجیں اور تجھی سے مدد چاہیں۔',
        textEnglish: 'It is You we worship and You we ask for help.',
      },
      {
        ayahNumber: 6,
        textArabic: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
        textUrdu: 'ہم کو سیدھا راستہ چلا۔',
        textEnglish: 'Guide us to the straight path.',
      },
      {
        ayahNumber: 7,
        textArabic: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
        textUrdu: 'راستہ ان کا جن پر تو نے احسان کیا، نہ ان کا جن پر غضب ہوا اور نہ بہکے ہوؤں کا۔',
        textEnglish: 'The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.',
      },
    ],
  },

  // 2. Al-Baqarah (Key Essential Portions: Opening, Ayat al-Kursi, Amanar-Rasul)
  {
    surahNumber: 2,
    nameArabic: 'البَقَرَة',
    nameTransliterated: 'Al-Baqarah',
    nameUrdu: 'سورۃ البقرہ (منتخب آیات و آیت الکرسی)',
    nameEnglish: 'The Cow (Key Selections & Ayat al-Kursi)',
    revelationType: 'MEDINAN',
    ayahsCount: 286,
    verses: [
      {
        ayahNumber: 1,
        textArabic: 'الم',
        textUrdu: 'الٓمّٓ (حقیقی معنی اللہ و رسول ہی کو معلوم ہیں)۔',
        textEnglish: 'Alif, Lam, Meem.',
      },
      {
        ayahNumber: 2,
        textArabic: 'ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ',
        textUrdu: 'وہ بلند رتبہ کتاب (قرآن) کوئی شک کی جگہ نہیں، اس میں ہدایت ہے ڈر والوں کو۔',
        textEnglish: 'This is the Book about which there is no doubt, a guidance for those conscious of Allah.',
      },
      {
        ayahNumber: 3,
        textArabic: 'الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ وَيُقِيمُونَ الصَّلَاةَ وَمِمَّا رَزَقْنَاهُمْ يُنفِقُونَ',
        textUrdu: 'وہ جو بے دیکھے ایمان لائیں اور نماز قائم رکھیں اور ہماری دی ہوئی روزی میں سے ہماری راہ میں اٹھائیں۔',
        textEnglish: 'Who believe in the unseen, establish prayer, and spend out of what We have provided for them.',
      },
      {
        ayahNumber: 255,
        textArabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ',
        textUrdu: 'اللہ ہے جس کے سوا کسی کی بندگی نہیں وہ آپ زندہ اور اوروں کا قائم رکھنے والا، اسے نہ اونگھ آئے نہ نیند، اسی کا ہے جو کچھ آسمانوں میں ہے اور جو کچھ زمین میں، وہ کون ہے جو اس کے یہاں سفارش کرے بے اس کے حکم کے، جانتا ہے جو کچھ ان کے آگے ہے اور جو کچھ ان کے پیچھے اور وہ نہیں پاتے اس کے علم میں سے مگر جتنا وہ چاہے، اس کی کرسی میں سمائے ہوئے ہیں آسمان اور زمین اور اسے بھاری نہیں ان کی نگہبانی اور وہی ہے بلند بڑائی والا۔',
        textEnglish: 'Allah - there is no deity except Him, the Ever-Living, the Sustainer of all existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth. Who is it that could intercede with Him except by His permission? He knows what is before them and what will be after them, and they encompass not a thing of His knowledge except for what He wills. His Kursi extends over the heavens and the earth, and their preservation tires Him not. And He is the Most High, the Most Great. (Ayat al-Kursi)',
      },
      {
        ayahNumber: 285,
        textArabic: 'آمَنَ الرَّسُولُ بِمَا أُنزِلَ إِلَيْهِ مِن رَّبِّهِ وَالْمُؤْمِنُونَ ۚ كُلٌّ آمَنَ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ لَا نُفَرِّقُ بَيْنَ أَحَدٍ مِّن رُّسُلِهِ ۚ وَقَالُوا سَمِعْنَا وَأَطَعْنَا ۖ غُفْرَانَكَ رَبَّنَا وَإِلَيْكَ الْمَصِيرُ',
        textUrdu: 'رسول ایمان لایا اس پر جو اس کے رب کے پاس سے اس پر اترا اور مسلمان بھی، سب نے مانا اللہ کو اور اس کے فرشتوں کو اور اس کی کتابوں کو اور اس کے رسولوں کو، یہ کہتے ہوئے کہ ہم اس کے کسی رسول پر ایمان لانے میں فرق نہیں کرتے، اور عرض کی کہ ہم نے سنا اور مانا، تیری معافی ہو اے ہمارے رب! اور تیری ہی طرف پھرنا ہے۔',
        textEnglish: 'The Messenger has believed in what was revealed to him from his Lord, and [so have] the believers. All of them have believed in Allah and His angels and His books and His messengers, [saying], "We make no distinction between any of His messengers." And they say, "We hear and we obey. [We seek] Your forgiveness, our Lord, and to You is the final destination."',
      },
      {
        ayahNumber: 286,
        textArabic: 'لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا ۚ لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا اكْتَسَبَتْ ۗ رَبَّنَا لَا تُؤَاخِذْنَا إِن نَّسِينَا أَوْ أَخْطَأْنَا ۚ رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَا إِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِن قَبْلِنَا ۚ رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِ ۖ وَاعْفُ عَنَّا وَاغْفِرْ لَنَا وَارْحَمْنَا ۚ أَنتَ مَوْلَانَا فَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ',
        textUrdu: 'اللہ کسی جان پر بوجھ نہیں ڈالتا مگر اس کی طاقت بھر، اس کا فائدہ ہے جو اچھا کمایا اور اس کا نقصان ہے جو برائی کمائی، اے ہمارے رب! ہمیں نہ پکڑ اگر ہم بھولیں یا چوکیں، اے ہمارے رب! اور ہم پر بھاری بوجھ نہ رکھ جیسا ہم سے اگلوں پر رکھا تھا، اے ہمارے رب! اور ہم پر وہ بوجھ نہ ڈال جس کی ہمیں سہار نہ ہو، اور ہمیں معاف فرما دے اور بخش دے اور ہم پر مہر (رحم) فرما، تو ہمارا مولیٰ ہے پس کافروں پر ہماری مدد فرما۔',
        textEnglish: 'Allah does not burden a soul beyond that it can bear. It will have [the consequence of] what [good] it has gained, and it will bear [the consequence of] what [evil] it has earned. "Our Lord, do not impose blame upon us if we have forgotten or erred. Our Lord, and lay not upon us a burden like that which You laid upon those before us. Our Lord, and burden us not with that which we have no ability to bear. And pardon us; and forgive us; and have mercy upon us. You are our protector, so give us victory over the disbelieving people."',
      },
    ],
  },

  // 36. Yasin
  {
    surahNumber: 36,
    nameArabic: 'يس',
    nameTransliterated: 'Yasin',
    nameUrdu: 'سورۃ یٰس (قلب القرآن)',
    nameEnglish: 'Ya-Seen (Heart of the Quran)',
    revelationType: 'MECCAN',
    ayahsCount: 83,
    verses: [
      {
        ayahNumber: 1,
        textArabic: 'يس',
        textUrdu: 'یٰسٓ۔',
        textEnglish: 'Ya, Seen.',
      },
      {
        ayahNumber: 2,
        textArabic: 'وَالْقُرْآنِ الْحَكِيمِ',
        textUrdu: 'حکمت والے قرآن کی قسم۔',
        textEnglish: 'By the wise Qur\'an.',
      },
      {
        ayahNumber: 3,
        textArabic: 'إِنَّكَ لَمِنَ الْمُرْسَلِينَ',
        textUrdu: 'بے شک تم رسولوں میں سے ہو۔',
        textEnglish: 'Indeed you, [O Muhammad], are of the messengers,',
      },
      {
        ayahNumber: 4,
        textArabic: 'عَلَىٰ صِرَاطٍ مُّسْتَقِيمٍ',
        textUrdu: 'سیدھی راہ پر۔',
        textEnglish: 'On a straight path.',
      },
      {
        ayahNumber: 5,
        textArabic: 'تَنزِيلَ الْعَزِيزِ الرَّحِيمِ',
        textUrdu: 'اتارا ہوا عزت والے مہربان کا۔',
        textEnglish: '[This is] a revelation of the Exalted in Might, the Merciful,',
      },
    ],
  },

  // 67. Al-Mulk
  {
    surahNumber: 67,
    nameArabic: 'المُلْك',
    nameTransliterated: 'Al-Mulk',
    nameUrdu: 'سورۃ الملک (عذابِ قبر سے نجات)',
    nameEnglish: 'The Sovereignty (Protection from the Grave)',
    revelationType: 'MECCAN',
    ayahsCount: 30,
    verses: [
      {
        ayahNumber: 1,
        textArabic: 'تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ',
        textUrdu: 'بڑی برکت والا ہے وہ جس کے قبضہ میں سارا ملک اور وہ ہر چیز پر قادر ہے۔',
        textEnglish: 'Blessed is He in whose hand is dominion, and He is over all things competent.',
      },
      {
        ayahNumber: 2,
        textArabic: 'الَّذِي خَلَقَ الْمَوْتَ وَالْحَيَاةَ لِيَبْلُوَكُمْ أَيُّكُمْ أَحْسَنُ عَمَلًا ۚ وَهُوَ الْعَزِيزُ الْغَفُورُ',
        textUrdu: 'وہ جس نے موت اور زندگی پیدا کی کہ تمہاری جانچ ہو تم میں کس کا کام زیادہ اچھا ہے اور وہی عزت والا بخشش والا ہے۔',
        textEnglish: '[He] who created death and life to test you [as to] which of you is best in deed - and He is the Exalted in Might, the Forgiving.',
      },
      {
        ayahNumber: 3,
        textArabic: 'الَّذِي خَلَقَ سَبْعَ سَمَاوَاتٍ طِبَاقًا ۖ مَّا تَرَىٰ فِي خَلْقِ الرَّحْمَٰنِ مِن تَفَاوُتٍ ۖ فَارْجِعِ الْبَصَرَ هَلْ تَرَىٰ مِن فُطُورٍ',
        textUrdu: 'جس نے سات آسمان بنائے ایک کے اوپر دوسرا، تو رحمٰن کے بنانے میں کیا فرق دیکھتا ہے تو نگاہ اٹھا کر دیکھ تجھے کوئی رخنہ نظر آتا ہے؟',
        textEnglish: '[And] who created seven heavens in layers. You do not see in the creation of the Most Merciful any inconsistency. So return [your] vision [to the sky]; do you see any breaks?',
      },
      {
        ayahNumber: 4,
        textArabic: 'ثُمَّ ارْجِعِ الْبَصَرَ كَرَّتَيْنِ يَنقَلِبْ إِلَيْكَ الْبَصَرُ خَاسِئًا وَهُوَ حَسِيرٌ',
        textUrdu: 'پھر دوبارہ نگاہ اٹھا تیری طرف نگاہ ناکام پلٹ آئے گی تھکی ہوئی۔',
        textEnglish: 'Then return [your] vision twice again. [Your] vision will return to you humbled while it is fatigued.',
      },
      {
        ayahNumber: 5,
        textArabic: 'وَلَقَدْ زَيَّنَّا السَّمَاءَ الدُّنْيَا بِمَصَابِيحَ وَجَعَلْنَاهَا رُجُومًا لِّلشَّيَاطِينِ ۖ وَأَعْتَدْنَا لَهُمْ عَذَابَ السَّعِيرِ',
        textUrdu: 'اور بے شک ہم نے نیچے کے آسمان کو چراغوں سے آراستہ کیا اور انہیں شیطانوں کے مارنے کا ذریعہ بنایا اور ان کے لیے بھڑکتی آگ کا عذاب تیار کیا۔',
        textEnglish: 'And We have certainly beautified the nearest heaven with stars and have made [from] them what is thrown at the devils and have prepared for them the punishment of the Blaze.',
      },
    ],
  },

  // 112. Al-Ikhlas
  {
    surahNumber: 112,
    nameArabic: 'الإِخْلَاص',
    nameTransliterated: 'Al-Ikhlas',
    nameUrdu: 'سورۃ الاخلاص (توحید خالص)',
    nameEnglish: 'The Sincerity (Tawhid)',
    revelationType: 'MECCAN',
    ayahsCount: 4,
    verses: [
      {
        ayahNumber: 1,
        textArabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ',
        textUrdu: 'تم فرماؤ وہ اللہ ہے وہ ایک ہے۔',
        textEnglish: 'Say, "He is Allah, [who is] One,',
      },
      {
        ayahNumber: 2,
        textArabic: 'اللَّهُ الصَّمَدُ',
        textUrdu: 'اللہ بے نیاز ہے۔',
        textEnglish: 'Allah, the Eternal Refuge.',
      },
      {
        ayahNumber: 3,
        textArabic: 'لَمْ يَلِدْ وَلَمْ يُولَدْ',
        textUrdu: 'نہ اس کی کوئی اولاد اور نہ وہ کسی سے پیدا ہوا۔',
        textEnglish: 'He neither begets nor is born,',
      },
      {
        ayahNumber: 4,
        textArabic: 'وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',
        textUrdu: 'اور نہ اس کے جوڑ کا کوئی۔',
        textEnglish: 'Nor is there to Him any equivalent."',
      },
    ],
  },

  // 113. Al-Falaq
  {
    surahNumber: 113,
    nameArabic: 'الفَلَق',
    nameTransliterated: 'Al-Falaq',
    nameUrdu: 'سورۃ الفلق (پناہ مانگنا)',
    nameEnglish: 'The Daybreak',
    revelationType: 'MECCAN',
    ayahsCount: 5,
    verses: [
      {
        ayahNumber: 1,
        textArabic: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ',
        textUrdu: 'تم فرماؤ میں اس کی پناہ لیتا ہوں جو صبح کا پیدا کرنے والا ہے۔',
        textEnglish: 'Say, "I seek refuge in the Lord of daybreak',
      },
      {
        ayahNumber: 2,
        textArabic: 'مِن شَرِّ مَا خَلَقَ',
        textUrdu: 'اس کی سب مخلوق کے شر سے۔',
        textEnglish: 'From the evil of that which He created',
      },
      {
        ayahNumber: 3,
        textArabic: 'وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ',
        textUrdu: 'اور اندھیری ڈالنے والے کے شر سے جب وہ ڈوبے۔',
        textEnglish: 'And from the evil of darkness when it settles',
      },
      {
        ayahNumber: 4,
        textArabic: 'وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ',
        textUrdu: 'اور ان عورتوں کے شر سے جو گرہوں میں پھونکتی ہیں۔',
        textEnglish: 'And from the evil of the blowers in knots',
      },
      {
        ayahNumber: 5,
        textArabic: 'وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ',
        textUrdu: 'اور حسد والے کے شر سے جب وہ مجھ سے جلے۔',
        textEnglish: 'And from the evil of an envier when he envies."',
      },
    ],
  },

  // 114. An-Nas
  {
    surahNumber: 114,
    nameArabic: 'النَّاس',
    nameTransliterated: 'An-Nas',
    nameUrdu: 'سورۃ الناس (انسانوں کا رب)',
    nameEnglish: 'Mankind',
    revelationType: 'MECCAN',
    ayahsCount: 6,
    verses: [
      {
        ayahNumber: 1,
        textArabic: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ',
        textUrdu: 'تم کہو میں اس کی پناہ میں آیا جو سب لوگوں کا رب۔',
        textEnglish: 'Say, "I seek refuge in the Lord of mankind,',
      },
      {
        ayahNumber: 2,
        textArabic: 'مَلِكِ النَّاسِ',
        textUrdu: 'سب لوگوں کا بادشاہ۔',
        textEnglish: 'The Sovereign of mankind,',
      },
      {
        ayahNumber: 3,
        textArabic: 'إِلَٰهِ النَّاسِ',
        textUrdu: 'سب لوگوں کا خدا۔',
        textEnglish: 'The God of mankind,',
      },
      {
        ayahNumber: 4,
        textArabic: 'مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ',
        textUrdu: 'اس کے شر سے جو دل میں برے خطرے ڈالے اور دبک رہے۔',
        textEnglish: 'From the evil of the retreating whisperer -',
      },
      {
        ayahNumber: 5,
        textArabic: 'الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ',
        textUrdu: 'وہ جو لوگوں کے دلوں میں وسوسے ڈالتے ہیں۔',
        textEnglish: 'Who whispers [evil] into the breasts of mankind -',
      },
      {
        ayahNumber: 6,
        textArabic: 'مِنَ الْجِنَّةِ وَالنَّاسِ',
        textUrdu: 'جن اور آدمی۔',
        textEnglish: 'From among the jinn and mankind."',
      },
    ],
  },
];
