/**
 * AMAL OS — Audio Recitations & Sirah Podcasts / Audiobooks Streaming Engine
 * 
 * Curated registry of verified, high-fidelity public-domain Quran recitations,
 * Shama'il al-Muhammadiyyah audio chapters, and Prophetic Sirah audiobooks.
 */

export interface Reciter {
  id: string;
  nameEnglish: string;
  nameArabic: string;
  style: 'MURATTAL' | 'MUJAWWAD';
  biography: string;
  baseUrl: string; // CDN base URL
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

  public getSurahAudio(surahNumber: number, reciterId: string = 'husary'): string | null {
    const s = this.sampleSurahs.find(x => x.surahNumber === surahNumber);
    if (!s) return null;
    return s.audioStreams[reciterId] || s.audioStreams['husary'] || null;
  }
}

export const audioStreamingEngine = new AudioStreamingEngine();
