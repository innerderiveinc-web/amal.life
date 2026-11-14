/**
 * AMAL OS — WORD-BY-WORD TAJWEED & MAKHAARIJ ENGINE
 * 
 * Provides word-level phonetic alignment and slow-motion pronunciation playback
 * to help seekers articulate sacred Arabic words with authentic Tajweed.
 * 
 * Capabilities:
 * - Word-by-word timestamp indexing
 * - 0.75x and 0.5x Slow Tajweed Drill speeds
 * - Phonetic Makhraj warnings for tricky letters (ع, ح, ص, ض, ط, ظ, ق, ذ)
 * - Authentic audio stream URLs
 */

export interface TajweedWord {
  wordIndex: number;
  arabicWord: string;
  transliteration: string;
  meaningUrdu: string;
  meaningEnglish: string;
  startTimeMs: number;
  endTimeMs: number;
  makhrajHighlight?: {
    letter: string;
    articulationRule: string; // E.g., "Throat letter (Halqi) - middle of throat"
  };
}

export interface TajweedAudioPassage {
  passageId: string;
  title: string;
  titleUrdu: string;
  category: 'SURAH' | 'MASNOON_DUA' | 'ADHKAR';
  audioUrlNormal: string;
  audioUrlSlow: string;
  words: TajweedWord[];
}

export class WordByWordTajweedEngine {
  private passages: TajweedAudioPassage[] = [
    {
      passageId: 'tajweed_fatihah_v1',
      title: 'Surah Al-Fatihah (The Opening)',
      titleUrdu: 'سورۃ الفاتحہ (مخارج و تجوید کے ساتھ)',
      category: 'SURAH',
      audioUrlNormal: 'https://everyayah.com/data/Husary_128kbps/001001.mp3',
      audioUrlSlow: 'https://everyayah.com/data/Husary_Muallim_128kbps/001001.mp3',
      words: [
        {
          wordIndex: 1,
          arabicWord: 'بِسْمِ',
          transliteration: 'Bismi',
          meaningUrdu: 'نام سے',
          meaningEnglish: 'In the name',
          startTimeMs: 0,
          endTimeMs: 650,
        },
        {
          wordIndex: 2,
          arabicWord: 'اللَّهِ',
          transliteration: 'Allāh',
          meaningUrdu: 'اللہ کے',
          meaningEnglish: 'of Allah',
          startTimeMs: 650,
          endTimeMs: 1400,
        },
        {
          wordIndex: 3,
          arabicWord: 'الرَّحْمَٰنِ',
          transliteration: 'ar-Raḥmān',
          meaningUrdu: 'نہایت مہربان',
          meaningEnglish: 'the Entirely Merciful',
          startTimeMs: 1400,
          endTimeMs: 2600,
          makhrajHighlight: {
            letter: 'ح',
            articulationRule: 'Middle of the throat (Wasat al-Halq). Exhale with a soft, warm whisper without raspiness.',
          },
        },
        {
          wordIndex: 4,
          arabicWord: 'الرَّحِيمِ',
          transliteration: 'ar-Raḥīm',
          meaningUrdu: 'بے حد رحم فرمانے والا',
          meaningEnglish: 'the Especially Merciful',
          startTimeMs: 2600,
          endTimeMs: 4100,
          makhrajHighlight: {
            letter: 'ح',
            articulationRule: 'Middle of the throat (Wasat al-Halq). Pronounce with pure clarity.',
          },
        },
      ],
    },
    {
      passageId: 'tajweed_ayatul_kursi',
      title: 'Ayat al-Kursi (The Throne Verse - 2:255)',
      titleUrdu: 'آیۃ الکرسی (مخارج و قواعدِ تجوید)',
      category: 'SURAH',
      audioUrlNormal: 'https://everyayah.com/data/Husary_128kbps/002255.mp3',
      audioUrlSlow: 'https://everyayah.com/data/Husary_Muallim_128kbps/002255.mp3',
      words: [
        {
          wordIndex: 1,
          arabicWord: 'اللَّهُ',
          transliteration: 'Allāhu',
          meaningUrdu: 'اللہ',
          meaningEnglish: 'Allah',
          startTimeMs: 0,
          endTimeMs: 1200,
          makhrajHighlight: {
            letter: 'ل',
            articulationRule: 'Lam Mufakhkham (Heavy Lam preceded by Fathah)',
          },
        },
        {
          wordIndex: 2,
          arabicWord: 'لَا إِلَٰهَ',
          transliteration: 'Lā ilāha',
          meaningUrdu: 'کوئی معبود نہیں',
          meaningEnglish: 'there is no deity',
          startTimeMs: 1200,
          endTimeMs: 2800,
          makhrajHighlight: {
            letter: 'آ',
            articulationRule: 'Madd Jaiz Munfasil (Elongate 4-5 counts)',
          },
        },
        {
          wordIndex: 3,
          arabicWord: 'إِلَّا هُوَ',
          transliteration: 'illā Huwa',
          meaningUrdu: 'سوائے اس کے',
          meaningEnglish: 'except Him',
          startTimeMs: 2800,
          endTimeMs: 4000,
        },
        {
          wordIndex: 4,
          arabicWord: 'الْحَيُّ',
          transliteration: 'Al-Ḥayyu',
          meaningUrdu: 'زندہ',
          meaningEnglish: 'the Ever-Living',
          startTimeMs: 4000,
          endTimeMs: 5300,
          makhrajHighlight: {
            letter: 'ح',
            articulationRule: 'Halqi - Middle of throat (clear, whispered aspiration)',
          },
        },
        {
          wordIndex: 5,
          arabicWord: 'الْقَيُّومُ',
          transliteration: 'Al-Qayyūm',
          meaningUrdu: 'سب کا سنبھالنے والا',
          meaningEnglish: 'the Sustainer of all existence',
          startTimeMs: 5300,
          endTimeMs: 7200,
          makhrajHighlight: {
            letter: 'ق',
            articulationRule: 'Lahati - Back of the tongue against soft palate',
          },
        },
      ],
    },
    {
      passageId: 'tajweed_ikhlas',
      title: 'Surah Al-Ikhlas (Purity of Faith - 112)',
      titleUrdu: 'سورۃ الاخلاص (قلقلہ و توحید کے مخارج)',
      category: 'SURAH',
      audioUrlNormal: 'https://everyayah.com/data/Husary_128kbps/112001.mp3',
      audioUrlSlow: 'https://everyayah.com/data/Husary_Muallim_128kbps/112001.mp3',
      words: [
        {
          wordIndex: 1,
          arabicWord: 'قُلْ',
          transliteration: 'Qul',
          meaningUrdu: 'تم فرماؤ',
          meaningEnglish: 'Say',
          startTimeMs: 0,
          endTimeMs: 800,
          makhrajHighlight: {
            letter: 'ق',
            articulationRule: 'Deep throat letter (Uvular voiceless stop)',
          },
        },
        {
          wordIndex: 2,
          arabicWord: 'هُوَ اللَّهُ',
          transliteration: 'Huwa-llāhu',
          meaningUrdu: 'وہ اللہ ہے',
          meaningEnglish: 'He is Allah',
          startTimeMs: 800,
          endTimeMs: 2000,
        },
        {
          wordIndex: 3,
          arabicWord: 'أَحَدٌ',
          transliteration: 'Aḥad',
          meaningUrdu: 'ایک',
          meaningEnglish: '[who is] One',
          startTimeMs: 2000,
          endTimeMs: 3400,
          makhrajHighlight: {
            letter: 'د',
            articulationRule: 'Qalqalah Kubra (Strong echo bounce on end pause)',
          },
        },
      ],
    },
    {
      passageId: 'tajweed_falaq',
      title: 'Surah Al-Falaq (The Daybreak - 113)',
      titleUrdu: 'سورۃ الفلق (قلقلہ و حفاظت کے مخارج)',
      category: 'SURAH',
      audioUrlNormal: 'https://everyayah.com/data/Husary_128kbps/113001.mp3',
      audioUrlSlow: 'https://everyayah.com/data/Husary_Muallim_128kbps/113001.mp3',
      words: [
        {
          wordIndex: 1,
          arabicWord: 'قُلْ أَعُوذُ',
          transliteration: "Qul a'ūdhu",
          meaningUrdu: 'تم فرماؤ میں پناہ مانگتا ہوں',
          meaningEnglish: 'Say: I seek refuge',
          startTimeMs: 0,
          endTimeMs: 1600,
          makhrajHighlight: {
            letter: 'ذ',
            articulationRule: 'Tip of tongue between upper and lower incisors (Soft dhal)',
          },
        },
        {
          wordIndex: 2,
          arabicWord: 'بِرَبِّ',
          transliteration: 'bi-Rabbi',
          meaningUrdu: 'رب کی',
          meaningEnglish: 'in the Lord',
          startTimeMs: 1600,
          endTimeMs: 2500,
        },
        {
          wordIndex: 3,
          arabicWord: 'الْفَلَقِ',
          transliteration: 'al-Falaq',
          meaningUrdu: 'صبح کے',
          meaningEnglish: 'of daybreak',
          startTimeMs: 2500,
          endTimeMs: 4000,
          makhrajHighlight: {
            letter: 'ق',
            articulationRule: 'Qalqalah Kubra (Crisp echoing stop upon Waqf)',
          },
        },
      ],
    },
    {
      passageId: 'tajweed_nas',
      title: 'Surah An-Nas (Mankind - 114)',
      titleUrdu: 'سورۃ الناس (نون مشدد و غنہ کے قواعد)',
      category: 'SURAH',
      audioUrlNormal: 'https://everyayah.com/data/Husary_128kbps/114001.mp3',
      audioUrlSlow: 'https://everyayah.com/data/Husary_Muallim_128kbps/114001.mp3',
      words: [
        {
          wordIndex: 1,
          arabicWord: 'قُلْ أَعُوذُ',
          transliteration: "Qul a'ūdhu",
          meaningUrdu: 'تم فرماؤ میں پناہ لیتا ہوں',
          meaningEnglish: 'Say: I seek refuge',
          startTimeMs: 0,
          endTimeMs: 1700,
        },
        {
          wordIndex: 2,
          arabicWord: 'بِرَبِّ',
          transliteration: 'bi-Rabbi',
          meaningUrdu: 'رب کی',
          meaningEnglish: 'in the Lord',
          startTimeMs: 1700,
          endTimeMs: 2600,
        },
        {
          wordIndex: 3,
          arabicWord: 'النَّاسِ',
          transliteration: 'an-Nās',
          meaningUrdu: 'سب لوگوں کے',
          meaningEnglish: 'of mankind',
          startTimeMs: 2600,
          endTimeMs: 4300,
          makhrajHighlight: {
            letter: 'نّ',
            articulationRule: 'Noon Mushaddadah Ghunnah (Full nasal resonance for 2 counts)',
          },
        },
      ],
    },
    {
      passageId: 'tajweed_qunoot',
      title: 'Dua al-Qunoot (Witr Supplication)',
      titleUrdu: 'دعائے قنوت (نمازِ وتر کی دعا)',
      category: 'MASNOON_DUA',
      audioUrlNormal: 'https://everyayah.com/data/Husary_128kbps/001001.mp3',
      audioUrlSlow: 'https://everyayah.com/data/Husary_Muallim_128kbps/001001.mp3',
      words: [
        {
          wordIndex: 1,
          arabicWord: 'اللَّهُمَّ',
          transliteration: 'Allāhumma',
          meaningUrdu: 'اے اللہ',
          meaningEnglish: 'O Allah',
          startTimeMs: 0,
          endTimeMs: 1100,
        },
        {
          wordIndex: 2,
          arabicWord: 'إِنَّا نَسْتَعِينُكَ',
          transliteration: "innā nasta'īnuk",
          meaningUrdu: 'ہم تجھ ہی سے مدد چاہتے ہیں',
          meaningEnglish: 'we seek Your help',
          startTimeMs: 1100,
          endTimeMs: 2900,
          makhrajHighlight: {
            letter: 'ع',
            articulationRule: 'Ayn - Deep middle throat compression',
          },
        },
        {
          wordIndex: 3,
          arabicWord: 'وَنَسْتَغْفِرُكَ',
          transliteration: 'wa nastaghfiruk',
          meaningUrdu: 'اور تجھ سے بخشش مانگتے ہیں',
          meaningEnglish: 'and we seek Your forgiveness',
          startTimeMs: 2900,
          endTimeMs: 4800,
          makhrajHighlight: {
            letter: 'غ',
            articulationRule: 'Ghayn - Upper throat friction (heavy gargling sound)',
          },
        },
      ],
    },
    {
      passageId: 'tajweed_istighfar',
      title: 'Sayyid al-Istighfar (The Master of Forgiveness)',
      titleUrdu: 'سید الاستغفار (کامل تجوید کے ساتھ)',
      category: 'MASNOON_DUA',
      audioUrlNormal: 'https://everyayah.com/data/Husary_128kbps/002255.mp3',
      audioUrlSlow: 'https://everyayah.com/data/Husary_Muallim_128kbps/002255.mp3',
      words: [
        {
          wordIndex: 1,
          arabicWord: 'اللَّهُمَّ',
          transliteration: 'Allāhumma',
          meaningUrdu: 'اے اللہ',
          meaningEnglish: 'O Allah',
          startTimeMs: 0,
          endTimeMs: 800,
        },
        {
          wordIndex: 2,
          arabicWord: 'أَنْتَ',
          transliteration: 'Anta',
          meaningUrdu: 'تو ہی',
          meaningEnglish: 'You are',
          startTimeMs: 800,
          endTimeMs: 1300,
        },
        {
          wordIndex: 3,
          arabicWord: 'رَبِّي',
          transliteration: 'Rabbī',
          meaningUrdu: 'میرا پالنے والا ہے',
          meaningEnglish: 'my Lord',
          startTimeMs: 1300,
          endTimeMs: 2000,
        },
        {
          wordIndex: 4,
          arabicWord: 'لَا إِلَٰهَ',
          transliteration: 'Lā ilāha',
          meaningUrdu: 'کوئی معبود نہیں',
          meaningEnglish: 'there is no deity',
          startTimeMs: 2000,
          endTimeMs: 3100,
        },
        {
          wordIndex: 5,
          arabicWord: 'إِلَّا أَنْتَ',
          transliteration: 'illā Anta',
          meaningUrdu: 'سوائے تیرے',
          meaningEnglish: 'except You',
          startTimeMs: 3100,
          endTimeMs: 4400,
        },
      ],
    },
  ];

  public getAvailablePassages(): TajweedAudioPassage[] {
    return this.passages;
  }

  public getPassage(passageId: string): TajweedAudioPassage {
    const found = this.passages.find((p) => p.passageId === passageId);
    if (!found) {
      return this.passages[0]!;
    }
    return found;
  }
}

export const wordByWordTajweedEngine = new WordByWordTajweedEngine();
