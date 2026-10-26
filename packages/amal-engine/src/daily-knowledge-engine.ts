/**
 * AMAL OS — Automated Daily Knowledge Broadcast Engine
 * 
 * Provides automated, time-aware, and date-deterministic daily spiritual broadcasts
 * grounded strictly in the authentic classical knowledge base:
 * 1. Daily Ayah (with authentic Arabic Uthmani text & verbatim Kanz al-Iman translation)
 * 2. Daily Hadith (from Al-Arba'in al-Nawawiyyah & Al-Shama'il al-Muhammadiyyah)
 * 3. Daily Dua (from 40 Rabbana Duas & Hisn al-Muslim, time-aware)
 * 4. Daily Hikmat & Tazkiyah (from Bidayat al-Hidayah, Ihya Ulum al-Din, & Hikayat-e-Sa'di)
 * 
 * Complies 100% with Ahl al-Sunnah wal-Jama'ah (Sawad al-A'zam) standards.
 */

export interface DailyAyah {
  surahNumber: number;
  surahNameArabic: string;
  surahNameEnglish: string;
  surahNameUrdu: string;
  ayahNumber: number;
  arabicText: string;
  kanzAlImanUrdu: string;
  englishTranslation: string;
  spiritualTheme: string;
}

export interface DailyHadith {
  sourceBook: string;
  hadithNumber: number | string;
  narrator: string;
  arabicMatn: string;
  urduTranslation: string;
  englishTranslation: string;
  sunnahApplication: string;
}

export interface DailyDua {
  sourceBook: string;
  titleArabic: string;
  titleUrdu: string;
  titleEnglish: string;
  arabicText: string;
  urduTranslation: string;
  englishTranslation: string;
  timeSlot: 'MORNING' | 'EVENING' | 'NIGHT' | 'FRIDAY' | 'GENERAL';
  virtue: string;
  audioUrl?: string;
}

export interface DailyHikmat {
  sourceBook: string;
  author: string;
  titleUrdu: string;
  titleEnglish: string;
  quoteArabic?: string;
  urduWisdom: string;
  englishWisdom: string;
  practicalReflection: string;
}

export interface DailyKnowledgeBroadcast {
  dateIso: string;
  dayOfYear: number;
  isFriday: boolean;
  activeTimeSlot: 'FAJR' | 'CHASHT' | 'DHUHR' | 'ASR' | 'MAGHRIB' | 'ISHA_NIGHT';
  ayah: DailyAyah;
  hadith: DailyHadith;
  dua: DailyDua;
  hikmat: DailyHikmat;
}

export class DailyKnowledgeEngine {
  private static readonly AYAHS_CORPUS: DailyAyah[] = [
    {
      surahNumber: 2,
      surahNameArabic: 'البقرة',
      surahNameEnglish: 'Al-Baqarah',
      surahNameUrdu: 'البقرۃ',
      ayahNumber: 152,
      arabicText: 'فَاذْكُرُونِي أَذْكُرْكُمْ وَاشْكُرُوا لِي وَلَا تَكْفُرُونِ',
      kanzAlImanUrdu: 'تو میری یاد کرو میں تمہارا چرچا کروں گا اور میرا حق مانو اور میری ناشکری نہ کرو۔',
      englishTranslation: 'So remember Me; I will remember you. And be grateful to Me and do not deny Me.',
      spiritualTheme: 'Dhikrullah & Gratitude (ذکرِ الٰہی اور شکر گزاری)',
    },
    {
      surahNumber: 94,
      surahNameArabic: 'الشرح',
      surahNameEnglish: 'Ash-Sharh',
      surahNameUrdu: 'الم نشرح',
      ayahNumber: 6,
      arabicText: 'إِنَّ مَعَ الْعُسْرِ يُسْرًا',
      kanzAlImanUrdu: 'بے شک دشواری کے ساتھ آسانی ہے۔',
      englishTranslation: 'Indeed, with hardship comes ease.',
      spiritualTheme: 'Patience & Divine Solace (صبر اور آسانی کی خوشخبری)',
    },
    {
      surahNumber: 3,
      surahNameArabic: 'آل عمران',
      surahNameEnglish: 'Ali \'Imran',
      surahNameUrdu: 'آلِ عمران',
      ayahNumber: 159,
      arabicText: 'فَإِذَا عَزَمْتَ فَتَوَكَّلْ عَلَى اللَّهِ ۚ إِنَّ اللَّهَ يُحِبُّ الْمُتَوَكِّلِينَ',
      kanzAlImanUrdu: 'پھر جب کسی بات کا عزم فرما لو تو اللہ پر بھروسا رکھو، بے شک اللہ توکل کرنے والوں کو دوست رکھتا ہے۔',
      englishTranslation: 'And when you have decided, then rely upon Allah. Indeed, Allah loves those who rely upon Him.',
      spiritualTheme: 'Tawakkul & Action (توکل علی اللہ اور استقامت)',
    },
    {
      surahNumber: 39,
      surahNameArabic: 'الزمر',
      surahNameEnglish: 'Az-Zumar',
      surahNameUrdu: 'الزمر',
      ayahNumber: 53,
      arabicText: 'قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَىٰ أَنفُسِهِمْ لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ ۚ إِنَّ اللَّهَ يَغْفِرُ الذُّنُوبَ جَمِيعًا ۚ إِنَّهُ هُوَ الْغَفُورُ الرَّحِيمُ',
      kanzAlImanUrdu: 'تم فرماؤ اے میرے وہ بندو جنہوں نے اپنی جانوں پر زیادتی کی! اللہ کی رحمت سے ناامید نہ ہو، بے شک اللہ سب گناہ بخش دیتا ہے، بے شک وہی بخشنے والا مہربان ہے۔',
      englishTranslation: 'Say: O My servants who have transgressed against themselves, do not despair of the mercy of Allah. Indeed, Allah forgives all sins. Indeed, He is the Forgiving, the Merciful.',
      spiritualTheme: 'Divine Mercy & Repentance (وسعتِ رحمتِ الٰہی اور توبہ)',
    },
    {
      surahNumber: 13,
      surahNameArabic: 'الرعد',
      surahNameEnglish: 'Ar-Ra\'d',
      surahNameUrdu: 'الرعد',
      ayahNumber: 28,
      arabicText: 'الَّذِينَ آمَنُوا وَتَطْمَئِنُّ قُلُوبُهُم بِذِكْرِ اللَّهِ ۗ أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ',
      kanzAlImanUrdu: 'وہ جو ایمان لائے اور ان کے دل اللہ کی یاد سے چین پاتے ہیں، سن لو! اللہ کی یاد ہی میں دلوں کا چین ہے۔',
      englishTranslation: 'Those who believe and whose hearts find rest in the remembrance of Allah. Unquestionably, by the remembrance of Allah hearts are assured.',
      spiritualTheme: 'Heart Stillness & Sakinah (اطمینانِ قلب اور ذکر)',
    },
    {
      surahNumber: 65,
      surahNameArabic: 'الطلاق',
      surahNameEnglish: 'At-Talaq',
      surahNameUrdu: 'الطلاق',
      ayahNumber: 3,
      arabicText: 'وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ ۚ وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ',
      kanzAlImanUrdu: 'اور اسے وہاں سے روزی دے گا جہاں اس کا گمان نہ ہو، اور جو اللہ پر بھروسا کرے تو وہ اسے کافی ہے۔',
      englishTranslation: 'And will provide for him from where he does not expect. And whoever relies upon Allah - then He is sufficient for him.',
      spiritualTheme: 'Sustenance & Trust in Providence (رزقِ حلال اور کفایتِ الٰہی)',
    },
    {
      surahNumber: 18,
      surahNameArabic: 'الكهف',
      surahNameEnglish: 'Al-Kahf',
      surahNameUrdu: 'الکہف',
      ayahNumber: 46,
      arabicText: 'الْمَالُ وَالْبَنُونَ زِينَةُ الْحَيَاةِ الدُّنْيَا ۖ وَالْبَاقِيَاتُ الصَّالِحَاتُ خَيْرٌ عِندَ رَبِّكَ ثَوَابًا وَخَيْرٌ أَمَلًا',
      kanzAlImanUrdu: 'مال اور بیٹے یہ تو جیتی دنیا کا سنگھار ہیں، اور باقی رہنے والی نیک باتیں تمہارے رب کے یہاں ثواب میں بہتر اور امید میں سب سے اچھی ہیں۔',
      englishTranslation: 'Wealth and children are but adornment of worldly life. But the enduring good deeds are better with your Lord for reward and better for hope.',
      spiritualTheme: 'Enduring Good Deeds (باقیاتِ صالحات اور حقیقی سرمایہ)',
    },
    {
      surahNumber: 2,
      surahNameArabic: 'البقرة',
      surahNameEnglish: 'Al-Baqarah',
      surahNameUrdu: 'البقرۃ',
      ayahNumber: 186,
      arabicText: 'وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ ۖ أُجِيبُ دَعْوَةَ الدَّاعِ إِذَا دَعَانِ',
      kanzAlImanUrdu: 'اور اے محبوب! جب تم سے میرے بندے مجھے پوچھیں تو میں نزدیک ہوں، دعا قبول کرتا ہوں پکارنے والے کی جب مجھے پکارے۔',
      englishTranslation: 'And when My servants ask you concerning Me, indeed I am near. I respond to the invocation of the supplicant when he calls upon Me.',
      spiritualTheme: 'Closeness to Allah in Dua (قربِ الٰہی اور قبولیتِ دعا)',
    },
  ];

  private static readonly HADITH_CORPUS: DailyHadith[] = [
    {
      sourceBook: 'Al-Arba\'in al-Nawawiyyah (Hadith 1)',
      hadithNumber: 1,
      narrator: 'Amir al-Mu\'minin Sayyiduna Umar ibn al-Khattab (رضي الله عنه)',
      arabicMatn: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى، فَمَنْ كَانَتْ هِجْرَتُهُ إِلَى اللَّهِ وَرَسُولِهِ فَهِجْرَتُهُ إِلَى اللَّهِ وَرَسُولِهِ.',
      urduTranslation: 'اعمال کا دار و مدار صرف نیتوں پر ہے، اور ہر انسان کے لیے وہی ہے جس کی اس نے نیت کی، پس جس کی ہجرت اللہ اور اس کے رسول کی رضا کے لیے ہو اس کی ہجرت اللہ اور اس کے رسول کے لیے ہے۔',
      englishTranslation: 'Actions are according to intentions, and everyone will have what was intended. Whoever migrated for Allah and His Messenger, his migration is for Allah and His Messenger.',
      sunnahApplication: 'Purify intentions before every step, prayer, interaction, and daily habit.',
    },
    {
      sourceBook: 'Al-Arba\'in al-Nawawiyyah (Hadith 6)',
      hadithNumber: 6,
      narrator: 'Sayyiduna Nu\'man ibn Bashir (رضي الله عنه)',
      arabicMatn: 'إِنَّ الْحَلالَ بَيِّنٌ وَإِنَّ الْحَرَامَ بَيِّنٌ، وَبَيْنَهُمَا أُمُورٌ مُشْتَبِهَاتٌ... أَلا وَإِنَّ فِي الْجَسَدِ مُضْغَةً إِذَا صَلَحَتْ صَلَحَ الْجَسَدُ كُلُّهُ، وَإِذَا فَسَدَتْ فَسَدَ الْجَسَدُ كُلُّهُ، أَلا وَهِيَ الْقَلْبُ.',
      urduTranslation: 'حلال بھی واضح ہے اور حرام بھی واضح ہے، اور ان کے درمیان کچھ مشتبہ چیزیں ہیں... خبردار! جسم کے اندر ایک لوتھڑا ہے، اگر وہ درست ہو جائے تو سارا جسم درست ہو جاتا ہے، اور اگر وہ بگڑ جائے تو پورا جسم بگڑ جاتا ہے، سن لو! وہ دل ہے۔',
      englishTranslation: 'The halal is clear and the haram is clear, and between them are ambiguous matters... There is in the body a piece of flesh: if it is sound, the whole body is sound; if corrupted, the whole body is corrupted. Indeed, it is the heart.',
      sunnahApplication: 'Guard your heart from doubts and keep food, speech, and transactions strictly halal.',
    },
    {
      sourceBook: 'Al-Shama\'il al-Muhammadiyyah (Chapter 1)',
      hadithNumber: 'Shama\'il-1',
      narrator: 'Sayyiduna Ali al-Murtada (كرم الله وجهه الكريم)',
      arabicMatn: 'أَجْوَدُ النَّاسِ صَدْرًا، وَأَصْدَقُ النَّاسِ لَهْجَةً، وَأَلْيَنُهُمْ عَرِيكَةً، وَأَكْرَمُهُمْ عِشْرَةً، مَنْ رَآهُ بَدِيهَةً هَابَهُ، وَمَنْ خَالَطَهُ مَعْرِفَةً أَحَبَّهُ.',
      urduTranslation: 'رسول اللہ ﷺ تمام انسانوں میں سب سے زیادہ کشادہ دل، گفتگو میں سب سے زیادہ سچے، مزاج میں سب سے زیادہ نرم، اور میل جول میں سب سے زیادہ بااخلاق اور کریم تھے۔',
      englishTranslation: 'The Messenger of Allah ﷺ was the most generous in heart, the most truthful in speech, the gentlest in demeanor, and the noblest in companionship.',
      sunnahApplication: 'Emulate the blessed character of the Prophet ﷺ in family, work, and social interactions.',
    },
    {
      sourceBook: 'Al-Arba\'in al-Nawawiyyah (Hadith 13)',
      hadithNumber: 13,
      narrator: 'Sayyiduna Anas ibn Malik (رضي الله عنه)',
      arabicMatn: 'لا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ.',
      urduTranslation: 'تم میں سے کوئی شخص اس وقت تک کامل مومن نہیں ہو سکتا جب تک وہ اپنے بھائی کے لیے وہی پسند نہ کرے جو اپنی ذات کے لیے پسند کرتا ہے۔',
      englishTranslation: 'None of you truly believes until he loves for his brother what he loves for himself.',
      sunnahApplication: 'Wish well for others, remove malice and jealousy, and celebrate others\' success.',
    },
    {
      sourceBook: 'Al-Arba\'in al-Nawawiyyah (Hadith 18)',
      hadithNumber: 18,
      narrator: 'Sayyiduna Abu Dharr & Mu\'adh ibn Jabal (رضي الله عنهما)',
      arabicMatn: 'اتَّقِ اللَّهَ حَيْثُمَا كُنْتَ، وَأَتْبِعِ السَّيِّئَةَ الْحَسَنَةَ تَمْحُهَا، وَخَالِقِ النَّاسَ بِخُلُقٍ حَسَنٍ.',
      urduTranslation: 'تم جہاں کہیں بھی ہو اللہ سے ڈرو، اور برائی کے فوراً بعد نیکی کرو وہ اس برائی کو مٹا دے گی، اور لوگوں کے ساتھ اچھے اخلاق سے پیش آؤ۔',
      englishTranslation: 'Fear Allah wherever you may be; follow up a bad deed with a good deed and it will wipe it out; and interact with people with good character.',
      sunnahApplication: 'When an error occurs, perform instant Tawbah and follow with Sadaqah or Dhikr.',
    },
    {
      sourceBook: 'Al-Arba\'in al-Nawawiyyah (Hadith 19)',
      hadithNumber: 19,
      narrator: 'Sayyiduna Abdullah ibn Abbas (رضي الله عنهما)',
      arabicMatn: 'احْفَظِ اللَّهَ يَحْفَظْكَ، احْفَظِ اللَّهَ تَجِدْهُ تُجَاهَكَ، إِذَا سَأَلْتَ فَاسْأَلِ اللَّهَ، وَإِذَا اسْتَعَنْتَ فَاسْتَعِنْ بِاللَّهِ.',
      urduTranslation: 'اللہ کے احکام کی حفاظت کرو وہ تمہاری حفاظت فرمائے گا، اللہ کے حقوق یاد رکھو تم اسے اپنے سامنے پاؤ گے، جب مانگو تو اللہ سے مانگو، اور جب مدد چاہو تو اللہ سے مدد طلب کرو۔',
      englishTranslation: 'Guard the commandments of Allah and He will guard you. Guard His rights and you will find Him before you. When you ask, ask Allah; and when you seek aid, seek aid from Allah.',
      sunnahApplication: 'Preserve your Fard prayers, modesty, and covenants to abide under Divine protection.',
    },
  ];

  private static readonly DUAS_CORPUS: DailyDua[] = [
    {
      sourceBook: '40 Rabbana Duas (Surah Al-Baqarah 2:201)',
      titleArabic: 'دعاء جامع لخير الدنيا والآخرة',
      titleUrdu: 'دنیا و آخرت کی تمام بھلائیوں کی جامع دعا',
      titleEnglish: 'Comprehensive Dua for Dunya and Akhirah',
      arabicText: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
      urduTranslation: 'اے ہمارے رب! ہمیں دنیا میں بھی بھلائی عطا فرما اور آخرت میں بھی بھلائی عطا فرما اور ہمیں دوزخ کے عذاب سے بچا۔',
      englishTranslation: 'Our Lord, give us in this world that which is good and in the Hereafter that which is good, and save us from the torment of the Fire.',
      timeSlot: 'GENERAL',
      virtue: 'Recited abundantly in Tawaf, Tashahhud, and daily supplication; covers all physical and spiritual needs.',
      audioUrl: 'https://everyayah.com/data/Husary_128kbps/002201.mp3',
    },
    {
      sourceBook: '40 Rabbana Duas (Surah Ibrahim 14:41)',
      titleArabic: 'دعاء المغفرة والوالدين والمؤمنين',
      titleUrdu: 'صبح کی قرآنی دعائے مغفرت و والدین',
      titleEnglish: 'Quranic Morning Du\'a for Forgiveness & Parents',
      arabicText: 'رَبَّنَا اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ',
      urduTranslation: 'اے ہمارے رب! مجھے اور میرے والدین کو اور تمام ایمان والوں کو بخش دے جس دن حساب قائم ہوگا۔',
      englishTranslation: 'Our Lord, forgive me and my parents and the believers the Day the account is established.',
      timeSlot: 'MORNING',
      virtue: 'Hazrat Ibrahim\'s (AS) blessed supplication securing forgiveness for one\'s parents and the entire Ummah.',
      audioUrl: 'https://everyayah.com/data/Husary_128kbps/014041.mp3',
    },
    {
      sourceBook: '40 Rabbana Duas (Surah Ali \'Imran 3:8)',
      titleArabic: 'دعاء الثبات وحفظ الهداية',
      titleUrdu: 'دل کے جمائو اور ہدایت پر استقامت کی دعا',
      titleEnglish: 'Dua for Steadfastness in Faith',
      arabicText: 'رَبَّنَا لا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِن لَّدُنكَ رَحْمَةً ۚ إِنَّكَ أَنتَ الْوَهَّابُ',
      urduTranslation: 'اے ہمارے رب! ہمارے دل ٹیڑھے نہ کر بعد اس کے کہ تو نے ہمیں ہدایت دی، اور ہمیں اپنے پاس سے رحمت عطا فرما، بے شک تو ہی بڑا عطا فرمانے والا ہے۔',
      englishTranslation: 'Our Lord, let not our hearts deviate after You have guided us, and grant us from Yourself mercy. Indeed, You are the Bestower.',
      timeSlot: 'GENERAL',
      virtue: 'Protects the heart from spiritual doubts, hypocrisy, and deviation from the straight path.',
      audioUrl: 'https://everyayah.com/data/Husary_128kbps/003008.mp3',
    },
    {
      sourceBook: 'Holy Quran (Surah Al-Baqarah 2:255)',
      titleArabic: 'آية الكرسي — الحفظ والأمان التام',
      titleUrdu: 'شام کی جامع قرآنی حفاظت (آیۃ الکرسی)',
      titleEnglish: 'Evening Protection & Grandeur (Ayat al-Kursi)',
      arabicText: 'اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ',
      urduTranslation: 'اللہ! اس کے سوا کوئی عبادت کے لائق نہیں، وہ خود زندہ اور سب کو قائم رکھنے والا ہے، اسے نہ اونگھ آتی ہے نہ نیند۔',
      englishTranslation: 'Allah! There is no deity except Him, the Ever-Living, the Sustainer of all existence. Neither drowsiness overtakes Him nor sleep.',
      timeSlot: 'EVENING',
      virtue: 'Whoever recites it in the evening remains under Divine guardianship through the night (Sahih al-Bukhari 2311).',
      audioUrl: 'https://everyayah.com/data/Husary_128kbps/002255.mp3',
    },
    {
      sourceBook: 'Salam-e-Raza & Dala\'il al-Khayrat',
      titleArabic: 'الصلاة والسلام على شفيع المذنبين ﷺ',
      titleUrdu: 'بارگاہِ رسالت ﷺ میں سلام و درود',
      titleEnglish: 'Salawat & Salam upon the Messenger of Allah ﷺ',
      arabicText: 'إِنَّ اللَّهَ وَمَلَائِكَتَهُ يُصَلُّونَ عَلَى النَّبِيِّ ۚ يَا أَيُّهَا الَّذِينَ آمَنُوا صَلُّوا عَلَيْهِ وَسَلِّمُوا تَسْلِيمًا',
      urduTranslation: 'بیشک اللہ اور اس کے فرشتے نبی پر درود بھیجتے ہیں۔ اے ایمان والو! تم بھی ان پر درود و سلام بھیجو۔',
      englishTranslation: 'Indeed, Allah and His angels confer blessings upon the Prophet. O you who have believed, ask [Allah to confer] blessing upon him and ask [Allah to grant him] peace.',
      timeSlot: 'FRIDAY',
      virtue: 'Whoever sends one blessing upon the Prophet ﷺ, Allah sends ten blessings upon him (Sahih Muslim). Special on Jumu\'ah.',
      audioUrl: 'https://everyayah.com/data/Husary_128kbps/033056.mp3',
    },
  ];

  private static readonly HIKMAT_CORPUS: DailyHikmat[] = [
    {
      sourceBook: 'Bidayat al-Hidayah (Imam al-Ghazali)',
      author: 'Hujjat al-Islam Imam Abu Hamid al-Ghazali (Rahimahullah)',
      titleUrdu: 'وقت کی قیمت اور عمر کا سرمایہ',
      titleEnglish: 'The Value of Time & Human Breath',
      quoteArabic: 'اعْلَمْ أَنَّ أَوْقَاتَكَ عُمْرُكَ، وَعُمْرُكَ رَأْسُ مَالِكَ، فِي تِجَارَتِكَ إِلَى اللَّهِ تَعَالَى.',
      urduWisdom: 'جان لو کہ تمہارے اوقات ہی تمہاری عمر ہیں، اور تمہاری عمر ہی تمہارا اصل سرمایہ ہے جس کے ذریعے تم اللہ تعالیٰ کی بارگاہ میں آخرت کی تجارت کرتے ہو۔ ہر سانس ایک انمول موتی ہے جس کا کوئی بدل نہیں۔',
      englishWisdom: 'Know that your moments are your lifespan, and your lifespan is your primary capital in your trade with Allah Almighty. Every breath is an irreplaceable jewel.',
      practicalReflection: 'Identify one 15-minute gap of mindless scrolling today and replace it with conscious Dhikr or quiet reading.',
    },
    {
      sourceBook: 'Ihya Ulum al-Din (Kitab Asrar al-Salah)',
      author: 'Imam Abu Hamid al-Ghazali (Rahimahullah)',
      titleUrdu: 'نماز میں حضورِ قلب کی چھ شرائط',
      titleEnglish: 'Presence of Heart in Prayer (Hudhur al-Qalb)',
      quoteArabic: 'لَيْسَ لَكَ مِنْ صَلَاتِكَ إِلَّا مَا عَقَلْتَ مِنْهَا.',
      urduWisdom: 'تمہاری نماز میں سے تمہارے لیے صرف وہی حصہ لکھا جاتا ہے جس میں تمہارا دل حاضر اور متوجہ رہا ہو۔ اللہ کے سامنے اس طرح کھڑے ہو جیسے یہ تمہاری زندگی کی آخری الوداعی نماز ہو۔',
      englishWisdom: 'You attain nothing from your prayer except that portion during which your heart was truly conscious and present. Stand before Allah as if it is your farewell prayer.',
      practicalReflection: 'Before saying Takbir Tahrimah, pause 3 seconds to recall Who you are about to address.',
    },
    {
      sourceBook: 'Hikayat-e-Sa\'di (Gulistan & Bustan)',
      author: 'Shaykh Muslih al-Din Sa\'di Shirazi (Rahimahullah)',
      titleUrdu: 'سخاوت اور خلقِ خدا کی خدمت',
      titleEnglish: 'Generosity & Service to Creation',
      quoteArabic: 'عِبَادَتْ بِجُزْ خِدْمَتِ خَلْق نِيسْت',
      urduWisdom: 'عبادت صرف تسبیح و مصلے کا نام نہیں، بلکہ اللہ کی مخلوق کی خدمت اور کسی پریشان حال کے دل کو تسکین دینا بھی سب سے بڑی عبادت ہے۔ جس نے کسی کے آنسو پونچھے اس نے اللہ کی رحمت پا لی۔',
      englishWisdom: 'True worship is not merely counting beads on a mat; serving Allah’s creation and comforting an anguished heart is among the supreme forms of worship.',
      practicalReflection: 'Do one unseen favor today for a family member, neighbor, or coworker without expecting acknowledgment.',
    },
    {
      sourceBook: 'Ayyuhal Walad (Dear Beloved Son)',
      author: 'Imam Abu Hamid al-Ghazali (Rahimahullah)',
      titleUrdu: 'علم بغیر عمل کے وبال ہے',
      titleEnglish: 'Knowledge Without Action is Futile',
      quoteArabic: 'الْعِلْمُ بِلَا عَمَلٍ جُنُونٌ، وَالْعَمَلُ بِغَيْرِ عِلْمٍ لَا يَكُونُ.',
      urduWisdom: 'اے بیٹے! علم بغیر عمل کے دیوانگی ہے، اور عمل بغیر علم کے درست نہیں ہو سکتا۔ اگر تم سو کتابیں بھی پڑھ لو لیکن ان پر عمل نہ کرو تو وہ تمہیں کوئی فائدہ نہیں پہنچائیں گی۔',
      englishWisdom: 'O son! Knowledge without action is madness, and action without knowledge cannot exist. If you read a hundred books but do not act upon them, they will not avail you.',
      practicalReflection: 'Pick one sunnah or habit you know is virtuous and practice it consistently today.',
    },
  ];

  /**
   * Generates the day-of-year index (1-366)
   */
  public static getDayOfYear(date: Date = new Date()): number {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  }

  /**
   * Generates the automated daily knowledge broadcast
   */
  public static getBroadcast(
    date: Date = new Date(),
    slotOverride?: 'FAJR' | 'CHASHT' | 'DHUHR' | 'ASR' | 'MAGHRIB' | 'ISHA_NIGHT'
  ): DailyKnowledgeBroadcast {
    const dayOfYear = this.getDayOfYear(date);
    const currentHour = date.getHours();
    const isFriday = date.getDay() === 5;

    let activeTimeSlot: 'FAJR' | 'CHASHT' | 'DHUHR' | 'ASR' | 'MAGHRIB' | 'ISHA_NIGHT';
    if (slotOverride) {
      activeTimeSlot = slotOverride;
    } else if (currentHour >= 4 && currentHour < 7) {
      activeTimeSlot = 'FAJR';
    } else if (currentHour >= 7 && currentHour < 12) {
      activeTimeSlot = 'CHASHT';
    } else if (currentHour >= 12 && currentHour < 16) {
      activeTimeSlot = 'DHUHR';
    } else if (currentHour >= 16 && currentHour < 18) {
      activeTimeSlot = 'ASR';
    } else if (currentHour >= 18 && currentHour < 20) {
      activeTimeSlot = 'MAGHRIB';
    } else {
      activeTimeSlot = 'ISHA_NIGHT';
    }

    // Rotating Ayah
    const ayahIndex = dayOfYear % this.AYAHS_CORPUS.length;
    const ayah = this.AYAHS_CORPUS[ayahIndex]!;

    // Rotating Hadith
    const hadithIndex = dayOfYear % this.HADITH_CORPUS.length;
    const hadith = this.HADITH_CORPUS[hadithIndex]!;

    // Time-aware / Friday-aware Dua
    let dua: DailyDua;
    if (isFriday && (activeTimeSlot === 'CHASHT' || activeTimeSlot === 'DHUHR' || activeTimeSlot === 'ASR')) {
      dua = this.DUAS_CORPUS.find(d => d.timeSlot === 'FRIDAY') || this.DUAS_CORPUS[0]!;
    } else if (activeTimeSlot === 'FAJR' || activeTimeSlot === 'CHASHT') {
      dua = this.DUAS_CORPUS.find(d => d.timeSlot === 'MORNING') || this.DUAS_CORPUS[0]!;
    } else if (activeTimeSlot === 'ASR' || activeTimeSlot === 'MAGHRIB') {
      dua = this.DUAS_CORPUS.find(d => d.timeSlot === 'EVENING') || this.DUAS_CORPUS[0]!;
    } else {
      const generalDuas = this.DUAS_CORPUS.filter(d => d.timeSlot === 'GENERAL');
      dua = generalDuas[dayOfYear % generalDuas.length] || this.DUAS_CORPUS[0]!;
    }

    // Rotating Hikmat
    const hikmatIndex = dayOfYear % this.HIKMAT_CORPUS.length;
    const hikmat = this.HIKMAT_CORPUS[hikmatIndex]!;

    return {
      dateIso: date.toISOString().split('T')[0]!,
      dayOfYear,
      isFriday,
      activeTimeSlot,
      ayah,
      hadith,
      dua,
      hikmat,
    };
  }
}

export const dailyKnowledgeEngine = new DailyKnowledgeEngine();
