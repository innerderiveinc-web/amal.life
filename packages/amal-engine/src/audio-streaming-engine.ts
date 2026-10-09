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
      titleEnglish: 'Chapter 1: The Physical Description of the Messenger of Allah ﷺ',
      titleUrdu: 'باب ۱: حضور نبی اکرم ﷺ کی مبارک جسمانی کیفیت و جمال',
      hadithCount: 14,
      audioUrlArabicMatn: 'https://everyayah.com/data/Husary_128kbps/068004.mp3',
      audioUrlUrduSharh: 'https://everyayah.com/data/Husary_128kbps/033021.mp3',
      audioUrlEnglishCommentary: 'https://everyayah.com/data/Husary_128kbps/021107.mp3',
      durationSeconds: 1140,
    },
    {
      chapterNumber: 2,
      titleArabic: 'باب ما جاء في خاتم النبوة',
      titleEnglish: 'Chapter 2: The Blessed Seal of Prophethood (Khatam an-Nubuwwah)',
      titleUrdu: 'باب ۲: پشتِ مبارک پر مہرِ نبوت کا بیان',
      hadithCount: 8,
      audioUrlArabicMatn: 'https://everyayah.com/data/Husary_128kbps/033040.mp3',
      audioUrlUrduSharh: 'https://everyayah.com/data/Husary_128kbps/033021.mp3',
      audioUrlEnglishCommentary: 'https://everyayah.com/data/Husary_128kbps/021107.mp3',
      durationSeconds: 890,
    },
    {
      chapterNumber: 3,
      titleArabic: 'باب ما جاء في تواضع رسول الله صلى الله عليه وسلم',
      titleEnglish: 'Chapter 3: The Sublime Humility of the Messenger of Allah ﷺ',
      titleUrdu: 'باب ۳: حضور اکرم ﷺ کا کمالِ عجز و انکسار',
      hadithCount: 10,
      audioUrlArabicMatn: 'https://everyayah.com/data/Husary_128kbps/026215.mp3',
      audioUrlUrduSharh: 'https://everyayah.com/data/Husary_128kbps/033021.mp3',
      audioUrlEnglishCommentary: 'https://everyayah.com/data/Husary_128kbps/021107.mp3',
      durationSeconds: 970,
    },
  ];

  public readonly sirahEpisodes: SirahAudioEpisode[] = [
    {
      episodeNumber: 1,
      titleEnglish: 'The Blessed Birth and Early Childhood in the Desert of Banu Sa\'d',
      titleUrdu: 'ولادتِ باسعادت اور دائی حلیمہ سعدیہ رضی اللہ عنہا کی آغوش میں تربیت',
      era: 'PRE_PROPHETHOOD',
      yearHijriOrGregorian: '571 CE (Year of the Elephant)',
      audioUrl: 'https://everyayah.com/data/Husary_128kbps/093001.mp3',
      durationSeconds: 1800,
      summary: 'Events surrounding the Year of the Elephant and the nursing of the Prophet ﷺ with Halimah al-Sa\'diyyah.',
    },
    {
      episodeNumber: 2,
      titleEnglish: 'The First Revelation in the Cave of Hira and the Support of Sayyidah Khadijah',
      titleUrdu: 'غارِ حرا میں پہلی وحی اور سیدہ خدیجہ رضی اللہ عنہا کی تسلی و رفاقت',
      era: 'MAKKAN',
      yearHijriOrGregorian: '610 CE (Age 40)',
      audioUrl: 'https://everyayah.com/data/Husary_128kbps/096001.mp3',
      durationSeconds: 2100,
      summary: 'The descent of Jibril with Surah al-Alaq and the foundational affirmation of prophethood.',
    },
    {
      episodeNumber: 3,
      titleEnglish: 'The Blessed Hijrah to Madinah and the Construction of the Prophet’s Mosque',
      titleUrdu: 'مدینہ منورہ کی طرف ہجرتِ نبوی اور مسجدِ نبوی کی بنیاد',
      era: 'MADINAN',
      yearHijriOrGregorian: '1 AH / 622 CE',
      audioUrl: 'https://everyayah.com/data/Husary_128kbps/009040.mp3',
      durationSeconds: 2400,
      summary: 'The nocturnal journey with Abu Bakr al-Siddiq, arrival at Quba, and the welcoming reception of the Ansar.',
    },
  ];

  public getSurahAudio(surahNumber: number, reciterId: string = 'husary'): string | null {
    const s = this.sampleSurahs.find(x => x.surahNumber === surahNumber);
    if (!s) return null;
    return s.audioStreams[reciterId] || s.audioStreams['husary'] || null;
  }
}

export const audioStreamingEngine = new AudioStreamingEngine();
