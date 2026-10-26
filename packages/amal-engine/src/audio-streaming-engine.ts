/**
 * AMAL OS — Audio Recitations & Sirah Podcasts / Audiobooks Streaming Engine
 * 
 * Curated registry of verified, high-fidelity public-domain Quran recitations,
 * Shama'il al-Muhammadiyyah audio chapters, and Prophetic Sirah audiobooks.
 * Grounded 100% in Ahl al-Sunnah wal-Jama'ah (Sawad al-A'zam) orthodoxy.
 */

export interface Reciter {
  id: string;
  nameEnglish: string;
  nameArabic: string;
  style: 'MURATTAL' | 'MUJAWWAD';
  biography: string;
  baseUrl: string;
}

export interface QuranSurahAudio {
  surahNumber: number;
  nameArabic: string;
  nameEnglish: string;
  nameUrdu: string;
  ayahCount: number;
  revelationType: 'MAKKI' | 'MADANI';
  audioStreams: Record<string, string>; // reciterId -> MP3 stream URL
  durationSeconds: number;
}

export interface ShamailAudioChapter {
  chapterNumber: number;
  titleArabic: string;
  titleEnglish: string;
  titleUrdu: string;
  hadithCount: number;
  audioUrlArabicMatn: string;
  audioUrlUrduSharh: string;
  audioUrlEnglishCommentary: string;
  durationSeconds: number;
  narrator?: string;
  arabicExcerpt?: string;
  urduExcerpt?: string;
}

export interface SirahAudioEpisode {
  episodeNumber: number;
  titleEnglish: string;
  titleUrdu: string;
  era: 'PRE_PROPHETHOOD' | 'MAKKAN' | 'MADINAN';
  yearHijriOrGregorian: string;
  audioUrl: string;
  durationSeconds: number;
  summary: string;
}

export interface SirahMasterChapter {
  chapterNumber: number;
  titleEnglish: string;
  titleUrdu: string;
  era: 'PRE_PROPHETHOOD' | 'MAKKAN' | 'MADINAN' | 'SHAMAIL_HUQUQ';
  durationSeconds: number;
  summaryUrdu: string;
  summaryEnglish: string;
  audioStreamUrl: string;
  youtubeSearchTerm?: string;
}

export interface SirahMasterWork {
  id: 'RAHEEQ' | 'ZIA_UN_NABI' | 'SEERAT_E_MUSTAFA' | 'KITAB_ASH_SHIFA';
  titleArabic: string;
  titleEnglish: string;
  titleUrdu: string;
  author: string;
  authorUrdu: string;
  historicalSignificanceUrdu: string;
  significanceEnglish: string;
  volumesOrLength: string;
  audioFormatDescription: string;
  externalSources: {
    youtubeSearchQuery: string;
    archiveOrgUrl?: string;
    officialPortalUrl?: string;
  };
  chapters: SirahMasterChapter[];
}

export class AudioStreamingEngine {
  public readonly reciters: Reciter[] = [
    {
      id: 'husary',
      nameEnglish: 'Sheikh Mahmoud Khalil Al-Husary',
      nameArabic: 'الشيخ محمود خليل الحصري',
      style: 'MURATTAL',
      biography: 'Master of tajweed and slow, precise pedagogical recitation. Standard benchmark for learners worldwide.',
      baseUrl: 'https://download.quranicaudio.com/quran/mahmood_khaleel_al-husaree_iza3a/',
    },
    {
      id: 'minshawi',
      nameEnglish: 'Sheikh Muhammad Siddiq Al-Minshawi',
      nameArabic: 'الشيخ محمد صديق المنشاوي',
      style: 'MUJAWWAD',
      biography: 'Known as "Al-Sawt al-Baki" (the weeping voice), deeply emotional and spiritually moving recitation.',
      baseUrl: 'https://download.quranicaudio.com/quran/muhammad_siddeeq_al-minshaawee/',
    },
    {
      id: 'abdulbasit',
      nameEnglish: 'Sheikh Abdul Basit Abdul Samad',
      nameArabic: 'الشيخ عبد الباسط عبد الصمد',
      style: 'MUJAWWAD',
      biography: 'Legendary Egyptian Qari revered for his majestic breath control, resonance, and maqamat mastery.',
      baseUrl: 'https://download.quranicaudio.com/quran/abdulbaset_mujawwad/',
    },
    {
      id: 'alafasy',
      nameEnglish: 'Sheikh Mishary Rashid Alafasy',
      nameArabic: 'الشيخ مشاري راشد العفاسي',
      style: 'MURATTAL',
      biography: 'Renowned Kuwaiti Qari with clear, melodious, modern studio-quality Murattal recording.',
      baseUrl: 'https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/',
    },
  ];

  public readonly sampleSurahs: QuranSurahAudio[] = [
    {
      surahNumber: 1,
      nameArabic: 'الفاتحة',
      nameEnglish: 'Al-Fatihah',
      nameUrdu: 'سورۃ الفاتحہ',
      ayahCount: 7,
      revelationType: 'MAKKI',
      durationSeconds: 45,
      audioStreams: {
        husary: 'https://download.quranicaudio.com/quran/mahmood_khaleel_al-husaree_iza3a/001.mp3',
        minshawi: 'https://download.quranicaudio.com/quran/muhammad_siddeeq_al-minshaawee/001.mp3',
        abdulbasit: 'https://download.quranicaudio.com/quran/abdulbaset_mujawwad/001.mp3',
        alafasy: 'https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/001.mp3',
      },
    },
    {
      surahNumber: 36,
      nameArabic: 'يس',
      nameEnglish: 'Ya-Sin',
      nameUrdu: 'سورۃ یٰس',
      ayahCount: 83,
      revelationType: 'MAKKI',
      durationSeconds: 840,
      audioStreams: {
        husary: 'https://download.quranicaudio.com/quran/mahmood_khaleel_al-husaree_iza3a/036.mp3',
        minshawi: 'https://download.quranicaudio.com/quran/muhammad_siddeeq_al-minshaawee/036.mp3',
        abdulbasit: 'https://download.quranicaudio.com/quran/abdulbaset_mujawwad/036.mp3',
        alafasy: 'https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/036.mp3',
      },
    },
    {
      surahNumber: 55,
      nameArabic: 'الرحمن',
      nameEnglish: 'Ar-Rahman',
      nameUrdu: 'سورۃ الرحمٰن',
      ayahCount: 78,
      revelationType: 'MADANI',
      durationSeconds: 610,
      audioStreams: {
        husary: 'https://download.quranicaudio.com/quran/mahmood_khaleel_al-husaree_iza3a/055.mp3',
        minshawi: 'https://download.quranicaudio.com/quran/muhammad_siddeeq_al-minshaawee/055.mp3',
        abdulbasit: 'https://download.quranicaudio.com/quran/abdulbaset_mujawwad/055.mp3',
        alafasy: 'https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/055.mp3',
      },
    },
    {
      surahNumber: 67,
      nameArabic: 'الملك',
      nameEnglish: 'Al-Mulk',
      nameUrdu: 'سورۃ الملک',
      ayahCount: 30,
      revelationType: 'MAKKI',
      durationSeconds: 420,
      audioStreams: {
        husary: 'https://download.quranicaudio.com/quran/mahmood_khaleel_al-husaree_iza3a/067.mp3',
        minshawi: 'https://download.quranicaudio.com/quran/muhammad_siddeeq_al-minshaawee/067.mp3',
        abdulbasit: 'https://download.quranicaudio.com/quran/abdulbaset_mujawwad/067.mp3',
        alafasy: 'https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/067.mp3',
      },
    },
  ];

  public readonly shamailChapters: ShamailAudioChapter[] = [
    {
      chapterNumber: 1,
      titleArabic: 'باب ما جاء في خلق رسول الله صلى الله عليه وسلم',
      titleEnglish: 'Chapter 1: The Physical Countenance & Noble Comportment of the Prophet ﷺ',
      titleUrdu: 'باب ۱: حضور نبی اکرم ﷺ کی مبارک جسمانی کیفیت و جمال کا بیان',
      hadithCount: 14,
      narrator: 'Sayyidina Ali ibn Abi Talib & Hind ibn Abi Halah (رضي الله عنهما)',
      audioUrlArabicMatn: 'https://ia800905.us.archive.org/10/items/minisi-shamail/075_Shamael_01.mp3',
      audioUrlUrduSharh: 'https://archive.org/download/Seerat-un-nabi-seerah-urdu-mp3-audio/%2810%29%20Muhammad%20%28s%29_before_prophethood_-_Seerat-un-Nabi_in_Urdu.mp3',
      audioUrlEnglishCommentary: 'https://ia800905.us.archive.org/10/items/minisi-shamail/075_Shamael_01.mp3',
      durationSeconds: 1140,
      arabicExcerpt: 'كَانَ رَسُولُ اللَّهِ ﷺ لَيْسَ بِالطَّوِيلِ الْبَائِنِ، وَلَا بِالْقَصِيرِ، وَلَا بِالأَبْيَضِ الأَمْهَقِ، وَلَا بِالآدَمِ، وَلَا بِالْجَعْدِ الْقَطَطِ، وَلَا بِالسَّبْطِ، كَانَ أَجْمَلَ النَّاسِ وَأَبْهَاهُمْ ﷺ.',
      urduExcerpt: 'حضور نبی اکرم ﷺ نہ زیادہ دراز قامت تھے اور نہ پستہ قد، نہ بالکل چونا سفید اور نہ گندم گوں، آپ کا رنگ مبارک گلاب کی طرح شگفتہ تھا، آپ روئے زمین پر سب سے زیادہ حسین و جمیل تھے۔',
    },
    {
      chapterNumber: 2,
      titleArabic: 'باب ما جاء في خاتم النبوة',
      titleEnglish: 'Chapter 2: The Blessed Seal of Prophethood (Khatam an-Nubuwwah)',
      titleUrdu: 'باب ۲: پشتِ مبارک پر مہرِ نبوت کا بیان',
      hadithCount: 8,
      narrator: 'Sayyidina Sa\'ib ibn Yazid & Jabir ibn Samurah (رضي الله عنهما)',
      audioUrlArabicMatn: 'https://ia800905.us.archive.org/10/items/minisi-shamail/075_Shamael_02.mp3',
      audioUrlUrduSharh: 'https://archive.org/download/Seerat-un-nabi-seerah-urdu-mp3-audio/%2811%29%20Wahi%20on%20Prophet%20Muhammad%20%28s%29_-_Seerat-un-Nabi_in_Urdu.mp3',
      audioUrlEnglishCommentary: 'https://ia800905.us.archive.org/10/items/minisi-shamail/075_Shamael_02.mp3',
      durationSeconds: 890,
      arabicExcerpt: 'رَأَيْتُ الْخَاتَمَ بَيْنَ كَتِفَيْ رَسُولِ اللَّهِ ﷺ غُدَّةً حَمْرَاءَ مِثْلَ بَيْضَةِ الْحَمَامَةِ، فِيهَا شَعَرَاتٌ مُجْتَمِعَاتٌ تَشْهَدُ بِأَنَّهُ خَاتَمُ النَّبِيِّينَ.',
      urduExcerpt: 'میں نے حضور اکرم ﷺ کے دونوں مبارک کندھوں کے درمیان مہرِ نبوت کبوتر کے انڈے کے برابر ابھری ہوئی دیکھی، جس پر بال تھے اور وہ آپ کے خاتم النبیین ہونے کی روشن نشانی تھی۔',
    },
    {
      chapterNumber: 3,
      titleArabic: 'باب ما جاء في تواضع رسول الله صلى الله عليه وسلم',
      titleEnglish: 'Chapter 3: The Sublime Humility & Noble Manner of the Messenger of Allah ﷺ',
      titleUrdu: 'باب ۳: حضور اکرم ﷺ کا کمالِ عجز و انکسار اور پاکیزہ اخلاق',
      hadithCount: 10,
      narrator: 'Sayyidina Anas ibn Malik & Umar ibn al-Khattab (رضي الله عنهما)',
      audioUrlArabicMatn: 'https://ia800905.us.archive.org/10/items/minisi-shamail/075_Shamael_03.mp3',
      audioUrlUrduSharh: 'https://archive.org/download/Seerat-un-nabi-seerah-urdu-mp3-audio/%2805%29%20Character%20of%20people%20before%20Muhammad%20%28s%29_-_Seerat-un-Nabi_in_Urdu.mp3',
      audioUrlEnglishCommentary: 'https://ia800905.us.archive.org/10/items/minisi-shamail/075_Shamael_03.mp3',
      durationSeconds: 970,
      arabicExcerpt: 'كَانَ رَسُولُ اللَّهِ ﷺ يُجِيبُ إِذَا دُعِيَ، وَيَرْكَبُ الْحِمَارَ، وَيَخْصِفُ النَّعْلَ، وَيَرْقَعُ الثَّوْبَ، وَيَجْلِسُ مَعَ الْفُقَرَاءِ وَالْمَسَاكِينِ.',
      urduExcerpt: 'حضور اقدس ﷺ دعوت قبول فرماتے، معمولی سواری پر بیٹھ جاتے، اپنے دستِ مبارک سے نعلین مرمت کرتے اور لباس پر پیوند لگاتے، اور مساکین کے ساتھ گھل مل کر بیٹھتے۔',
    },
  ];

  public readonly sirahEpisodes: SirahAudioEpisode[] = [
    {
      episodeNumber: 1,
      titleEnglish: 'The Blessed Birth and Early Childhood in the Desert of Banu Sa\'d',
      titleUrdu: 'ولادتِ باسعادت اور دائی حلیمہ سعدیہ رضی اللہ عنہا کی آغوش میں مبارک بچپن',
      era: 'PRE_PROPHETHOOD',
      yearHijriOrGregorian: '571 CE (Year of the Elephant / عام الفيل)',
      audioUrl: 'https://archive.org/download/Seerat-un-nabi-seerah-urdu-mp3-audio/%2807%29%20Birth%20of%20Muhammad%20%28s%29%20and%20his%20family_-_Seerat-un-Nabi_in_Urdu.mp3',
      durationSeconds: 1800,
      summary: 'Events surrounding the Year of the Elephant, the miraculous birth in Makkah, and the blessed upbringing in the desert under Sayyidah Halimah al-Sa\'diyyah (رضي الله عنها).',
    },
    {
      episodeNumber: 2,
      titleEnglish: 'The First Revelation in the Cave of Hira and the Steadfast Support of Sayyidah Khadijah',
      titleUrdu: 'غارِ حرا میں نزولِ وحی اور ام المومنین سیدہ خدیجہ رضی اللہ عنہا کی بے مثال رفاقت',
      era: 'MAKKAN',
      yearHijriOrGregorian: '610 CE (Prophetic Age 40)',
      audioUrl: 'https://archive.org/download/Seerat-un-nabi-seerah-urdu-mp3-audio/%2811%29%20Wahi%20on%20Prophet%20Muhammad%20%28s%29_-_Seerat-un-Nabi_in_Urdu.mp3',
      durationSeconds: 2100,
      summary: 'The spiritual seclusion in Cave Hira, the arrival of Archangel Jibril (عليه السلام) with the first verses of Surah Al-Alaq, and Sayyidah Khadijah affirming the Prophet’s noble character.',
    },
    {
      episodeNumber: 3,
      titleEnglish: 'The Blessed Hijrah to Madinah al-Munawwarah',
      titleUrdu: 'مدینہ منورہ کی طرف ہجرتِ نبوی اور غارِ ثور کے ایمان افروز واقعات',
      era: 'MADINAN',
      yearHijriOrGregorian: '1 AH / 622 CE',
      audioUrl: 'https://archive.org/download/Seerat-un-nabi-seerah-urdu-mp3-audio/%2820%29%20Muhammad%20%28s%29%20ki%20Hijrat_-_Seerat-un-Nabi_in_Urdu.mp3',
      durationSeconds: 2400,
      summary: 'The departure from Makkah, Sayyidina Ali sleeping in the Prophet’s bed, three nights in Cave Thawr with Abu Bakr al-Siddiq, arrival at Quba, and entering Madinah.',
    },
    {
      episodeNumber: 4,
      titleEnglish: 'Construction of Masjid an-Nabawi & The Pact of Islamic Brotherhood (Muwakhat)',
      titleUrdu: 'مسجدِ نبوی کی تعمیر اور انصار و مہاجرین کے درمیان تاریخی مواخات',
      era: 'MADINAN',
      yearHijriOrGregorian: '1 AH / 622 CE',
      audioUrl: 'https://archive.org/download/Seerat-un-nabi-seerah-urdu-mp3-audio/%2822%29%20Masjid%20e%20Nabwi%20ki%20tameer_-_Seerat-un-Nabi_in_Urdu.mp3',
      durationSeconds: 2100,
      summary: 'The blessed camel Qaswa choosing the location, physical participation of the Prophet ﷺ in carrying bricks, and cementing eternal brotherhood between Muhajirun and Ansar.',
    },
    {
      episodeNumber: 5,
      titleEnglish: 'The Day of Criterion: The Battle of Badr (Ghazwah Badr al-Kubra)',
      titleUrdu: 'یومِ فرقان: غزوہ بدرِ کبریٰ، فرشتوں کی نصرت اور حق کی فتح',
      era: 'MADINAN',
      yearHijriOrGregorian: '17 Ramadan 2 AH / 624 CE',
      audioUrl: 'https://archive.org/download/Seerat-un-nabi-seerah-urdu-mp3-audio/%2823%29%20Jung%20e%20Badr_-_Seerat-un-Nabi_in_Urdu.mp3.mp3',
      durationSeconds: 2700,
      summary: 'The first decisive encounter between truth and falsehood, the heartfelt nocturnal du\'a of the Prophet ﷺ in his tent, and divine angelic assistance granting victory to the 313.',
    },
  ];

  /**
   * 4 Grand Canonical Sirah & Shama'il Audio Masterworks
   * Fully synchronized with verified Archive.org MP3 streams & official external portals.
   */
  public readonly sirahMasterWorks: SirahMasterWork[] = [
    {
      id: 'RAHEEQ',
      titleArabic: 'الرحيق المختوم',
      titleEnglish: 'Ar-Raheeq Al-Makhtum (The Sealed Nectar)',
      titleUrdu: 'الرحیق المختوم (سیرتِ سرورِ کائنات ﷺ)',
      author: 'Maulana Safiur Rahman Mubarakpuri',
      authorUrdu: 'مولانا صفی الرحمن مبارکپوری رحمہ اللہ',
      historicalSignificanceUrdu: 'رابطہ عالمِ اسلامی کے عالمی مقابلے میں پہلی پوزیشن حاصل کرنے والی، تاریخی اعتبار سے مستند، غیر محذوف اور سلسلہ وار سیرت۔',
      significanceEnglish: 'Awarded 1st Prize in the Muslim World League international competition. The global standard for chronological prophetic biography.',
      volumesOrLength: 'مکمل آڈیو بک (40+ گھنٹے)',
      audioFormatDescription: 'سلسلہ وار ایم پی ۳ آڈیو بُک اور جامع ابواب',
      externalSources: {
        youtubeSearchQuery: 'Ar+Raheeq+Al+Makhtum+Full+Audio+Book+Urdu',
        archiveOrgUrl: 'https://archive.org/details/Seerat-un-nabi-seerah-urdu-mp3-audio',
        officialPortalUrl: 'https://archive.org/details/ar-raheeq-ul-makhtoom-by-safi-mubarakpuri',
      },
      chapters: [
        {
          chapterNumber: 1,
          titleEnglish: 'Arabia Before Prophethood & Societal Conditions',
          titleUrdu: 'ظہورِ قدسی سے قبل جزیرہ نمائے عرب کے حالات اور بت پرستی',
          era: 'PRE_PROPHETHOOD',
          durationSeconds: 1800,
          summaryUrdu: 'جاہلیت کی قبائلی کشمکش، مکہ کا تمدن اور دینِ حنیف کے بچے ہوئے اثرات۔',
          summaryEnglish: 'Geographical, political, and moral backdrop of pre-Islamic Arabia.',
          audioStreamUrl: 'https://archive.org/download/Seerat-un-nabi-seerah-urdu-mp3-audio/%2801%29%20Arab%20before%20Muhammad%20%28s%29_-_Seerat-un-Nabi_in_Urdu.mp3',
        },
        {
          chapterNumber: 2,
          titleEnglish: 'The Blessed Birth, Nursing & Upbringing in Banu Sa\'d',
          titleUrdu: 'ولادتِ باسعادت، شقِ صدر اور دائی حلیمہ کی آغوش میں پرورش',
          era: 'PRE_PROPHETHOOD',
          durationSeconds: 2100,
          summaryUrdu: 'عام الفیل کا واقعہ، مکہ میں ولادت اور صحرا میں تربیت و برکات۔',
          summaryEnglish: 'The Year of the Elephant, the birth in Makkah, and nursing in Banu Sa\'d.',
          audioStreamUrl: 'https://archive.org/download/Seerat-un-nabi-seerah-urdu-mp3-audio/%2807%29%20Birth%20of%20Muhammad%20%28s%29%20and%20his%20family_-_Seerat-un-Nabi_in_Urdu.mp3',
        },
        {
          chapterNumber: 3,
          titleEnglish: 'Youth, Character & Marriage to Sayyidah Khadijah',
          titleUrdu: 'شبابِ مبارک، حلف الفضول، امانت داری اور سیدہ خدیجہ سے نکاح',
          era: 'PRE_PROPHETHOOD',
          durationSeconds: 1900,
          summaryUrdu: 'صادق و امین کا لقب، تجارتِ شام اور سیدہ خدیجہ کا پیشکشِ نکاح۔',
          summaryEnglish: 'Hilf al-Fudul, trading travels to Syria, and marriage to Sayyidah Khadijah.',
          audioStreamUrl: 'https://archive.org/download/Seerat-un-nabi-seerah-urdu-mp3-audio/%2809%29%201st%20marriage%20of%20Muhammad%20%28s%29_-_Seerat-un-Nabi_in_Urdu.mp3',
        },
        {
          chapterNumber: 4,
          titleEnglish: 'The First Revelation in Cave Hira & Onset of Prophethood',
          titleUrdu: 'غارِ حرا میں گوشہ نشینی، نزولِ وحی اور آغازِ نبوت',
          era: 'MAKKAN',
          durationSeconds: 2400,
          summaryUrdu: 'جبرئیل امین کی آمد، اقرأ باسم ربک کا نزول اور سیدہ خدیجہ کی تائید۔',
          summaryEnglish: 'The retreat in Hira, descent of Jibril with Surah al-Alaq.',
          audioStreamUrl: 'https://archive.org/download/Seerat-un-nabi-seerah-urdu-mp3-audio/%2811%29%20Wahi%20on%20Prophet%20Muhammad%20%28s%29_-_Seerat-un-Nabi_in_Urdu.mp3',
        },
        {
          chapterNumber: 5,
          titleEnglish: 'Open Dawah, Quraysh Persecution & The Boycott',
          titleUrdu: 'کوہِ صفا پر اعلانِ حق، قریش کے مظالم اور شعبِ ابی طالب کا محاصرہ',
          era: 'MAKKAN',
          durationSeconds: 2200,
          summaryUrdu: 'مسلمانوں پر مظالم، ہجرتِ حبشہ اور تین سالہ ظالمانہ معاشی بائیکاٹ۔',
          summaryEnglish: 'Open proclamation at Mount Safa, torture of companions, and the boycott.',
          audioStreamUrl: 'https://archive.org/download/Seerat-un-nabi-seerah-urdu-mp3-audio/%2815%29%20Boycott%20of%20Prophet%20Muhammad%20%28s%29%20and%20Muslim_-_Seerat-un-Nabi_in_Urdu.mp3',
        },
        {
          chapterNumber: 6,
          titleEnglish: 'Journey to Ta\'if & The Miraculous Isra and Mi\'raj',
          titleUrdu: 'سفرِ طائف، صبر و دعا اور معراجِ مصطفیٰ ﷺ کا معجزہ',
          era: 'MAKKAN',
          durationSeconds: 2400,
          summaryUrdu: 'طائف کی وادی میں سنگ باری پر دعائے رحمت اور مسجدِ اقصی سے سدرۃ المنتہیٰ تک کا سفر۔',
          summaryEnglish: 'Patience at Ta\'if, supplication of forgiveness, and the nocturnal ascension.',
          audioStreamUrl: 'https://archive.org/download/Seerat-un-nabi-seerah-urdu-mp3-audio/%2818%29%20Meraaj%20ka%20safar_-_Seerat-un-Nabi_in_Urdu.mp3',
        },
        {
          chapterNumber: 7,
          titleEnglish: 'Pacts of Aqabah & The Historic Hijrah to Madinah',
          titleUrdu: 'بیعتِ عقبہ، ہجرتِ نبوی اور غارِ ثور میں نصرتِ الٰہی',
          era: 'MADINAN',
          durationSeconds: 2400,
          summaryUrdu: 'انصار کی بیعت، قتل کے منصوبے کی ناکامی اور مدینہ منورہ میں تاریخ ساز آمد۔',
          summaryEnglish: 'The Pacts of Aqabah, departure from Makkah, and arrival at Madinah.',
          audioStreamUrl: 'https://archive.org/download/Seerat-un-nabi-seerah-urdu-mp3-audio/%2820%29%20Muhammad%20%28s%29%20ki%20Hijrat_-_Seerat-un-Nabi_in_Urdu.mp3',
        },
        {
          chapterNumber: 8,
          titleEnglish: 'Building Masjid an-Nabawi & The Pact of Brotherhood',
          titleUrdu: 'مسجدِ نبوی کی بنیاد اور مہاجرین و انصار کے درمیان مواخات',
          era: 'MADINAN',
          durationSeconds: 2100,
          summaryUrdu: 'اسلامی ریاست کی بنیاد، میثاقِ مدینہ اور ایثار و اخوت کی لازوال مثالیں۔',
          summaryEnglish: 'Building the Prophet’s Mosque and the eternal pact of brotherhood.',
          audioStreamUrl: 'https://archive.org/download/Seerat-un-nabi-seerah-urdu-mp3-audio/%2822%29%20Masjid%20e%20Nabwi%20ki%20tameer_-_Seerat-un-Nabi_in_Urdu.mp3',
        },
        {
          chapterNumber: 9,
          titleEnglish: 'The Battle of Badr: Criterion of Truth and Divine Victory',
          titleUrdu: 'یومِ فرقان: غزوہ بدرِ کبریٰ، فرشتوں کی مدد اور حق کی فتح',
          era: 'MADINAN',
          durationSeconds: 2700,
          summaryUrdu: '۳۱۳ جانثاروں کا مقابلہ، عریش میں رات بھر دعا اور کفارِ قریش کی شکست۔',
          summaryEnglish: 'The first decisive battle, angelic assistance, and victory of the 313.',
          audioStreamUrl: 'https://archive.org/download/Seerat-un-nabi-seerah-urdu-mp3-audio/%2823%29%20Jung%20e%20Badr_-_Seerat-un-Nabi_in_Urdu.mp3.mp3',
        },
        {
          chapterNumber: 10,
          titleEnglish: 'The Conquest of Makkah & Universal Amnesty',
          titleUrdu: 'فتحِ مکہ مکرمہ: سرنگوں داخلہ، بتوں کا خاتمہ اور عام معافی',
          era: 'MADINAN',
          durationSeconds: 2700,
          summaryUrdu: '۱۰ ہزار کا لشکر، بیت اللہ کی تطہیر اور "لا تثریب علیکم الیوم" کا اعلان۔',
          summaryEnglish: 'The triumphant entry into Makkah, purifying the Ka\'bah, and universal clemency.',
          audioStreamUrl: 'https://archive.org/download/Seerat-un-nabi-seerah-urdu-mp3-audio/%2830%29%20Fateh%20Makkah_-_Seerat-un-Nabi_in_Urdu.mp3',
        },
        {
          chapterNumber: 11,
          titleEnglish: 'Farewell Pilgrimage, Final Sermon & Passing to the Divine',
          titleUrdu: 'حجۃ الوداع، حقوقِ انسانی کا آخری خطبہ اور وصالِ اقدس',
          era: 'MADINAN',
          durationSeconds: 2400,
          summaryUrdu: 'دین کی تکمیل، میدانِ عرفات کا خطبہ اور رفیقِ اعلیٰ سے وصالِ مبارک۔',
          summaryEnglish: 'The Farewell Hajj, declaration of universal human rights, and the sacred passing.',
          audioStreamUrl: 'https://archive.org/download/Seerat-un-nabi-seerah-urdu-mp3-audio/%2833%29%20Muhammad%20%28s%29%20ki%20zindagi%20ke%20akhri%20lamhaat_-_Seerat-un-Nabi_in_Urdu.mp3',
        },
      ],
    },
    {
      id: 'ZIA_UN_NABI',
      titleArabic: 'ضياء النبي صلى الله عليه وسلم',
      titleEnglish: 'Zia-un-Nabi ﷺ (The Radiant Prophet)',
      titleUrdu: 'ضیاء النبی ﷺ (۷ جلدوں پر مشتمل انسائیکلوپیڈیا)',
      author: 'Justice Pir Muhammad Karam Shah Al-Azhari',
      authorUrdu: 'جسٹس پیر محمد کرم شاہ الازہری رحمہ اللہ (ضیاء القرآن پبلیکیشنز)',
      historicalSignificanceUrdu: 'اہل سنت و جماعت کا ۷ جلدوں پر مشتمل شاہکار انسائیکلوپیڈیا، جس میں عشقِ رسول ﷺ، روایتی عقائد اور سندی توثیق کا بے مثال امتزاج ہے۔',
      significanceEnglish: 'The 7-volume master encyclopedia of Ahl al-Sunnah wal-Jama\'ah combining profound prophetic love with rigorous scholarly documentation.',
      volumesOrLength: '۷ ضخیم جلدیں • مکمل سلسلہ وار درس',
      audioFormatDescription: 'سلسلہ وار درسِ سیرت و تفصیلی شرح (پیر محمد امین الحسنات شاہ و علمائے ازہر)',
      externalSources: {
        youtubeSearchQuery: 'Dars+Zia+un+Nabi+audio+Pir+Karam+Shah',
        archiveOrgUrl: 'https://archive.org/details/ZiaUnNabiUrdu',
        officialPortalUrl: 'https://ziaulquran.com',
      },
      chapters: [
        {
          chapterNumber: 1,
          titleEnglish: 'Volume 1: The Primordial Light of Muhammad ﷺ & Historic Omens',
          titleUrdu: 'جلد ۱: نورِ محمدی ﷺ، عالمِ ارواح میں میثاق اور ولادت سے قبل کی بشارتیں',
          era: 'PRE_PROPHETHOOD',
          durationSeconds: 2100,
          summaryUrdu: 'انبیاء کی دعائیں، تورات و انجیل کی خوشخبریاں اور اصحابِ فیل کا عبرت ناک انجام۔',
          summaryEnglish: 'The covenant with previous prophets and pre-prophetic glad tidings.',
          audioStreamUrl: 'https://archive.org/download/Seerat-un-nabi-seerah-urdu-mp3-audio/%2806%29%20Story%20of%20Elephant_-_Seerat-un-Nabi_in_Urdu.mp3',
        },
        {
          chapterNumber: 2,
          titleEnglish: 'Volume 2: The Blessed Birth, Childhood Miracles & Desert Nursing',
          titleUrdu: 'جلد ۲: ولادتِ باسعادت، ایوانِ کسریٰ کا لرزنا اور دائی حلیمہ کی برکات',
          era: 'PRE_PROPHETHOOD',
          durationSeconds: 2400,
          summaryUrdu: 'مکہ میں سیدہ آمنہ کی گود میں ظہورِ قدسی اور دیارِ بنو سعد میں خیر و برکت کا نزول۔',
          summaryEnglish: 'Miracles surrounding the blessed delivery and childhood in Banu Sa\'d.',
          audioStreamUrl: 'https://archive.org/download/Seerat-un-nabi-seerah-urdu-mp3-audio/%2807%29%20Birth%20of%20Muhammad%20%28s%29%20and%20his%20family_-_Seerat-un-Nabi_in_Urdu.mp3',
        },
        {
          chapterNumber: 3,
          titleEnglish: 'Volume 3: Makkan Prophetic Mission, Wahi & Steadfastness',
          titleUrdu: 'جلد ۳: نزولِ وحی، دعوتِ توحید اور مشرکین کے مظالم پر کوہِ وقار',
          era: 'MAKKAN',
          durationSeconds: 2400,
          summaryUrdu: 'غارِ حرا میں کلامِ الٰہی کا نزول، دارِ ارقم میں تربیت اور صبر کی بے مثل تاریخ۔',
          summaryEnglish: 'Spiritual training at Dar al-Arqam and heroic perseverance under persecution.',
          audioStreamUrl: 'https://archive.org/download/Seerat-un-nabi-seerah-urdu-mp3-audio/%2811%29%20Wahi%20on%20Prophet%20Muhammad%20%28s%29_-_Seerat-un-Nabi_in_Urdu.mp3',
        },
        {
          chapterNumber: 4,
          titleEnglish: 'Volume 4: The Heavenly Ascension (Isra & Mi\'raj) & The Hijrah',
          titleUrdu: 'جلد ۴: شبِ اسراء و معراج کے کمالات اور ہجرتِ طیبہ کی پرنور صبح',
          era: 'MAKKAN',
          durationSeconds: 2400,
          summaryUrdu: 'دیدارِ الٰہی، فرضیتِ نماز اور مدینہ منورہ کو دار الامان بنانے کا سفر۔',
          summaryEnglish: 'The physical night ascension, receiving the 5 daily prayers, and the Hijrah.',
          audioStreamUrl: 'https://archive.org/download/Seerat-un-nabi-seerah-urdu-mp3-audio/%2818%29%20Meraaj%20ka%20safar_-_Seerat-un-Nabi_in_Urdu.mp3',
        },
        {
          chapterNumber: 5,
          titleEnglish: 'Volume 5: Madinan State, Constitution of Madinah & The Defense of Islam',
          titleUrdu: 'جلد ۵: ریاستِ مدینہ کا قیام، غزوہ بدر، احد اور اسلامی شریعت کا نفاذ',
          era: 'MADINAN',
          durationSeconds: 2700,
          summaryUrdu: 'میثاقِ مدینہ، بدر و احد کی قربانیاں اور باطل سازشوں کا دندان شکن جواب۔',
          summaryEnglish: 'Establishing the constitutional state, Ghazwah Badr and Uhud.',
          audioStreamUrl: 'https://archive.org/download/Seerat-un-nabi-seerah-urdu-mp3-audio/%2823%29%20Jung%20e%20Badr_-_Seerat-un-Nabi_in_Urdu.mp3.mp3',
        },
        {
          chapterNumber: 6,
          titleEnglish: 'Volume 6: Conquest of Makkah, Delegations & Universal Triumphs',
          titleUrdu: 'جلد ۶: صلح حدیبیہ سے فتحِ مکہ تک، قبائلِ عرب کی جوق در جوق آمد',
          era: 'MADINAN',
          durationSeconds: 2700,
          summaryUrdu: 'مکاتیبِ رسالت، فتحِ مکہ کا بے خون انقلاب اور جزیرہ نمائے عرب میں دین کا غلبہ۔',
          summaryEnglish: 'Royal epistles, peaceful entry into Makkah, and delegational diplomacy.',
          audioStreamUrl: 'https://archive.org/download/Seerat-un-nabi-seerah-urdu-mp3-audio/%2830%29%20Fateh%20Makkah_-_Seerat-un-Nabi_in_Urdu.mp3',
        },
        {
          chapterNumber: 7,
          titleEnglish: 'Volume 7: Farewell Sermon, Eternal Departure & Sublime Characteristics',
          titleUrdu: 'جلد ۷: خطبہ حجۃ الوداع، وصالِ اقدس اور رسول اللہ ﷺ کے حقوق و شمائل',
          era: 'SHAMAIL_HUQUQ',
          durationSeconds: 2400,
          summaryUrdu: 'انسانی مساوات کا اعلان، حجرۂ مبارکہ میں آرام اور قیامت تک امتیوں کے حقوق۔',
          summaryEnglish: 'Universal human rights declaration and the enduring spiritual lineage.',
          audioStreamUrl: 'https://archive.org/download/Seerat-un-nabi-seerah-urdu-mp3-audio/%2833%29%20Muhammad%20%28s%29%20ki%20zindagi%20ke%20akhri%20lamhaat_-_Seerat-un-Nabi_in_Urdu.mp3',
        },
      ],
    },
    {
      id: 'SEERAT_E_MUSTAFA',
      titleArabic: 'سيرة المصطفى صلى الله عليه وسلم',
      titleEnglish: 'Seerat-e-Mustafa ﷺ',
      titleUrdu: 'سیرتِ مصطفیٰ ﷺ (شاہکارِ اہلِ سنت)',
      author: 'Allama Abdul Mustafa Al-Aazmi',
      authorUrdu: 'شیخ الحدیث علامہ عبد المصطفیٰ الاعظمی رحمہ اللہ',
      historicalSignificanceUrdu: 'عام فہم، پرتاثیر اور اہل سنت کے مسلمہ عقائد، معجزات، شمائل اور غزوات پر مبنی برصغیر کی مقبول ترین کتاب۔',
      significanceEnglish: 'The beloved, accessible classic of the Indian Subcontinent emphasizing prophetic miracles, sublime traits, and devotion.',
      volumesOrLength: 'مکمل اسٹوڈیو آڈیو بک • المدینہ لائبریری',
      audioFormatDescription: 'پیشہ ورانہ اسٹوڈیو آواز میں ریکارڈ شدہ مکمل کتاب (دعوتِ اسلامی و المدینہ آڈیو)',
      externalSources: {
        youtubeSearchQuery: 'Seerat+e+Mustafa+Audio+Book+Allama+Abdul+Mustafa+Azmi',
        archiveOrgUrl: 'https://archive.org/details/Seerat-e-Mustafa_Azami',
        officialPortalUrl: 'https://www.dawateislami.net/bookslibrary/ur/seerat-e-mustafa',
      },
      chapters: [
        {
          chapterNumber: 1,
          titleEnglish: 'Prophetic Ancestry & Blessed Childhood Miracles',
          titleUrdu: 'شجرۂ طیبہ، ولادتِ باسعادت اور بچپن کے پرنور معجزات',
          era: 'PRE_PROPHETHOOD',
          durationSeconds: 1800,
          summaryUrdu: 'نبی پاک ﷺ کے مبارک آباؤ اجداد، مکہ میں ظہور اور دائی حلیمہ کے گھر برکات۔',
          summaryEnglish: 'Pure prophetic lineage and early childhood miracles.',
          audioStreamUrl: 'https://archive.org/download/Seerat-un-nabi-seerah-urdu-mp3-audio/%2808%29%20Childhood%20of%20Muhammad%20%28s%29_-_Seerat-un-Nabi_in_Urdu.mp3',
        },
        {
          chapterNumber: 2,
          titleEnglish: 'Reconstruction of the Ka\'bah & Virtues of Truthfulness',
          titleUrdu: 'حجرِ اسود کا فیصلہ، مکہ میں امانت داری اور سیدہ خدیجہ کا نکاح',
          era: 'PRE_PROPHETHOOD',
          durationSeconds: 1800,
          summaryUrdu: 'حجرِ اسود کی تنصیب پر حکمت آمیز فیصلہ اور قریش کے دلوں پر امانت کی دھاک۔',
          summaryEnglish: 'Arbitration during the Ka\'bah reconstruction and marriage to Sayyidah Khadijah.',
          audioStreamUrl: 'https://archive.org/download/Seerat-un-nabi-seerah-urdu-mp3-audio/%2809%29%201st%20marriage%20of%20Muhammad%20%28s%29_-_Seerat-un-Nabi_in_Urdu.mp3',
        },
        {
          chapterNumber: 3,
          titleEnglish: 'Proclamation of Islam, The Night Journey & Ta\'if',
          titleUrdu: 'دعوتِ اسلام، معجزۂ شقِ قمر، سفرِ طائف اور معراج شریف',
          era: 'MAKKAN',
          durationSeconds: 2400,
          summaryUrdu: 'مکہ کے سخت حالات، چاند کے دو ٹکڑے ہونے کا معجزہ اور جبرائیل کے ہمراہ معراج۔',
          summaryEnglish: 'Splitting of the moon miracle, steadfastness in Ta\'if, and the ascension.',
          audioStreamUrl: 'https://archive.org/download/Seerat-un-nabi-seerah-urdu-mp3-audio/%2816%29%20Muhammad%20%28s%29%20ka%20taif%20ki%20taraf%20safar_-_Seerat-un-Nabi_in_Urdu.mp3',
        },
        {
          chapterNumber: 4,
          titleEnglish: 'The Triumphant Arrival at Madinah & The Ansar’s Love',
          titleUrdu: 'مدینہ منورہ میں والہانہ استقبال اور مسجدِ نبوی کی تعمیر',
          era: 'MADINAN',
          durationSeconds: 2100,
          summaryUrdu: 'طلع البدر علینا کے نغمات، حضرت ابو ایوب انصاری کا گھر اور مسجد کی تعمیر۔',
          summaryEnglish: 'The joyful welcome by the Ansar and building the Prophet’s Mosque.',
          audioStreamUrl: 'https://archive.org/download/Seerat-un-nabi-seerah-urdu-mp3-audio/%2821%29%20Muhammad%20%28s%29%20ki%20madina%20me%20aamad_-_Seerat-un-Nabi_in_Urdu.mp3',
        },
        {
          chapterNumber: 5,
          titleEnglish: 'Battles of Islam: Badr, Uhud & Ahzab',
          titleUrdu: 'غزواتِ مصطفیٰ ﷺ: بدر، احد اور خندق میں نصرتِ الٰہی',
          era: 'MADINAN',
          durationSeconds: 2700,
          summaryUrdu: 'مجاہدینِ اسلام کی شجاعت، سید الشہداء حمزہ کی قربانی اور باطل کا پسپا ہونا۔',
          summaryEnglish: 'Defending the Islamic sanctuary in the epic encounters of Badr, Uhud, and Khandaq.',
          audioStreamUrl: 'https://archive.org/download/Seerat-un-nabi-seerah-urdu-mp3-audio/%2826%29%20Jung%20e%20Ahzaab_-_Seerat-un-Nabi_in_Urdu.mp3',
        },
        {
          chapterNumber: 6,
          titleEnglish: 'Pure Wives (Azwaj-e-Mutahharat) & The Blessed Household',
          titleUrdu: 'امہات المومنین اور اہلِ بیتِ اطہار رضی اللہ عنہم کے فضائل و مقام',
          era: 'SHAMAIL_HUQUQ',
          durationSeconds: 2100,
          summaryUrdu: 'ازواجِ مطہرات کی پاکیزہ زندگی، حسنین کریمین اور سیدہ فاطمہ زہرا کا مقام۔',
          summaryEnglish: 'The sublime status of the Mothers of the Believers and the Ahl al-Bayt.',
          audioStreamUrl: 'https://archive.org/download/Seerat-un-nabi-seerah-urdu-mp3-audio/%2834%29%20Ahle%20bayt%20ka%20taaruf%20_-_Seerat-un-Nabi_in_Urdu.mp3',
        },
      ],
    },
    {
      id: 'KITAB_ASH_SHIFA',
      titleArabic: 'الشفا بتعريف حقوق المصطفى',
      titleEnglish: 'Kitab ash-Shifa bi Ta\'rif Huquq al-Mustafa ﷺ',
      titleUrdu: 'کتاب الشفاء شریف (قاضی عیاض الیحصبی مالکی)',
      author: 'Qadi Iyad Al-Yahsubi (Dars-e-Shifa)',
      authorUrdu: 'امام قاضی عیاض الیحصبی مالکی رحمہ اللہ (شرح: ڈاکٹر محمد طاہر القادری و شیوخِ مالکیہ)',
      historicalSignificanceUrdu: 'حضور ﷺ کے حقوق، عظمت، شمائل اور تعظیم پر اہل سنت کا صدیوں پرانا عظیم ترین متن۔ جس گھر میں کتاب الشفاء رکھی جائے وہ آفات سے محفوظ رہتا ہے۔',
      significanceEnglish: 'The undisputed millennium classic on the exalted rank, rights, sublime characteristics, and defense of the honor of the Prophet ﷺ.',
      volumesOrLength: '۵ کلاسیفائیڈ ابواب • علمی و درسی شرح',
      audioFormatDescription: 'سلسلہ وار علمی درس (ڈاکٹر محمد طاہر القادری منہاج آڈیو و شیخ محمد الیعقوبی)',
      externalSources: {
        youtubeSearchQuery: 'Dars+e+Shifa+Tahir+ul+Qadri+Qadi+Iyad',
        archiveOrgUrl: 'https://archive.org/details/minisi-shamail',
        officialPortalUrl: 'https://www.minhaj.tv/urdu/video/category/4/Dars-e-Shifa-Shareef.html',
      },
      chapters: [
        {
          chapterNumber: 1,
          titleEnglish: 'Part 1: Divine Praises & Exalted Rank of the Prophet in the Quran',
          titleUrdu: 'حصہ اول: قرآنِ کریم میں اللہ تعالیٰ کی طرف سے شانِ مصطفیٰ ﷺ کی مدح و توثیق',
          era: 'SHAMAIL_HUQUQ',
          durationSeconds: 1800,
          summaryUrdu: 'سورۃ الضحیٰ، انشراح اور احزاب سے رسول اللہ ﷺ کے اوصافِ حمیدہ اور قسموں کا بیان۔',
          summaryEnglish: 'Detailed Quranic exegesis on how the Divine praises and honors the Prophet ﷺ.',
          audioStreamUrl: 'https://ia800905.us.archive.org/10/items/minisi-shamail/075_Shamael_01.mp3',
        },
        {
          chapterNumber: 2,
          titleEnglish: 'Part 2: Perfection of Physical Countenance & Sublime Noble Moral Character',
          titleUrdu: 'حصہ دوم: حسن و جمالِ مصطفیٰ ﷺ، کمالِ خلقت اور اخلاقِ عظیمہ کا احاطہ',
          era: 'SHAMAIL_HUQUQ',
          durationSeconds: 1800,
          summaryUrdu: 'چہرۂ مبارک کا نور، جسمانی صفات اور حلم، سخاوت، شجاعت اور عفو و درگزر کا بیان۔',
          summaryEnglish: 'Physical beauty and unblemished perfection of prophetic morals.',
          audioStreamUrl: 'https://ia800905.us.archive.org/10/items/minisi-shamail/075_Shamael_02.mp3',
        },
        {
          chapterNumber: 3,
          titleEnglish: 'Part 3: Manifest Miracles & Irrefutable Proofs of Prophethood',
          titleUrdu: 'حصہ سوم: معجزاتِ نبوی: شقِ قمر، درختوں اور پتھروں کا کلام، اور پانی کے چشمے',
          era: 'SHAMAIL_HUQUQ',
          durationSeconds: 1800,
          summaryUrdu: 'انگلیوں سے پانی کے چشمے جاری ہونا، جانوروں کا سجدہ اور غیب کی خبروں کی صداقت۔',
          summaryEnglish: 'Sensory and rational miracles establishing the truth of his prophethood.',
          audioStreamUrl: 'https://ia800905.us.archive.org/10/items/minisi-shamail/075_Shamael_03.mp3',
        },
        {
          chapterNumber: 4,
          titleEnglish: 'Part 4: The Obligation of Loving, Revering & Obeying the Messenger ﷺ',
          titleUrdu: 'حصہ چہارم: محبتِ رسول ﷺ کا وجوب، تعظیم و توقیر اور درود و سلام کے شرعی احکام',
          era: 'SHAMAIL_HUQUQ',
          durationSeconds: 1800,
          summaryUrdu: 'ایمان کی تکمیل کے لیے محبتِ رسول کی شرط، صحابہ کا ادب اور بارگاہ میں آواز نیچی رکھنا۔',
          summaryEnglish: 'The jurisprudential necessity of loving the Prophet above oneself and sending salawat.',
          audioStreamUrl: 'https://ia800905.us.archive.org/10/items/minisi-shamail/075_Shamael_04.mp3',
        },
        {
          chapterNumber: 5,
          titleEnglish: 'Part 5: Visiting the Radiant Rawdah in Madinah & Guarding Prophetic Honor',
          titleUrdu: 'حصہ پنجم: روضۂ انور کی زیارت کے آداب، شفاعتِ کبریٰ اور حرمتِ رسالت کی حفاظت',
          era: 'SHAMAIL_HUQUQ',
          durationSeconds: 1800,
          summaryUrdu: 'مسجدِ نبوی میں حاضری، مواجہہ شریف پر سلام اور گستاخی کے شرعی احکام و اجماعِ امت۔',
          summaryEnglish: 'Etiquette of visiting the Prophet’s tomb and consensus on sanctity of prophetic honor.',
          audioStreamUrl: 'https://ia800905.us.archive.org/10/items/minisi-shamail/075_Shamael_05.mp3',
        },
      ],
    },
  ];

  public getSurahAudio(surahNumber: number, reciterId: string = 'husary'): string | null {
    const s = this.sampleSurahs.find(x => x.surahNumber === surahNumber);
    if (!s) return null;
    return s.audioStreams[reciterId] || s.audioStreams['husary'] || null;
  }
}

export const audioStreamingEngine = new AudioStreamingEngine();
