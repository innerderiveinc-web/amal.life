import { Surah, Ayah, TafsirEntry } from '@amal/types';

export interface QuranProvider {
  getSurahs(): Promise<Surah[]>;
  getSurah(surahNumber: number): Promise<Surah | null>;
  getAyah(surahNumber: number, ayahNumber: number): Promise<Ayah | null>;
  getTafsir(surahNumber: number, ayahNumber: number): Promise<TafsirEntry | null>;
  searchVerses(query: string): Promise<Ayah[]>;
}

export class LocalVettedQuranProvider implements QuranProvider {
  private static readonly SURAHS: Surah[] = [
    {
      number: 1,
      nameArabic: 'الفاتحة',
      nameEnglish: 'Al-Fatihah',
      nameTranslation: 'The Opening',
      revelationType: 'MECCAN',
      numberOfAyahs: 7,
    },
    {
      number: 2,
      nameArabic: 'البقرة',
      nameEnglish: 'Al-Baqarah',
      nameTranslation: 'The Cow',
      revelationType: 'MEDINAN',
      numberOfAyahs: 286,
    },
    {
      number: 17,
      nameArabic: 'الإسراء',
      nameEnglish: 'Al-Isra',
      nameTranslation: 'The Night Journey',
      revelationType: 'MECCAN',
      numberOfAyahs: 111,
    },
    {
      number: 73,
      nameArabic: 'المزمل',
      nameEnglish: 'Al-Muzzammil',
      nameTranslation: 'The Enshrouded One',
      revelationType: 'MECCAN',
      numberOfAyahs: 20,
    },
    {
      number: 112,
      nameArabic: 'الإخلاص',
      nameEnglish: 'Al-Ikhlas',
      nameTranslation: 'The Sincerity',
      revelationType: 'MECCAN',
      numberOfAyahs: 4,
    },
    {
      number: 113,
      nameArabic: 'الفلق',
      nameEnglish: 'Al-Falaq',
      nameTranslation: 'The Daybreak',
      revelationType: 'MECCAN',
      numberOfAyahs: 5,
    },
    {
      number: 114,
      nameArabic: 'الناس',
      nameEnglish: 'An-Nas',
      nameTranslation: 'Mankind',
      revelationType: 'MECCAN',
      numberOfAyahs: 6,
    },
  ];

  private static readonly AYAHS: Ayah[] = [
    {
      surahNumber: 1,
      ayahNumber: 1,
      textArabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
      textTranslation: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.',
      translationAuthor: 'Saheeh International (Vetted)',
      juzNumber: 1,
      pageNumber: 1,
      sajdah: false,
    },
    {
      surahNumber: 1,
      ayahNumber: 2,
      textArabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
      textTranslation: '[All] praise is [due] to Allah, Lord of the worlds.',
      translationAuthor: 'Saheeh International (Vetted)',
      juzNumber: 1,
      pageNumber: 1,
      sajdah: false,
    },
    {
      surahNumber: 2,
      ayahNumber: 286,
      textArabic: 'لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا',
      textTranslation: 'Allah does not burden a soul beyond that it can bear...',
      translationAuthor: 'Saheeh International (Vetted)',
      juzNumber: 3,
      pageNumber: 49,
      sajdah: false,
    },
    {
      surahNumber: 17,
      ayahNumber: 78,
      textArabic: 'أَقِمِ الصَّلَاةَ لِدُلُوكِ الشَّمْسِ إِلَىٰ غَسَقِ اللَّيْلِ وَقُرْآنَ الْفَجْرِ ۖ إِنَّ قُرْآنَ الْفَجْرِ كَانَ مَشْهُودًا',
      textTranslation: 'Establish prayer at the decline of the sun until the darkness of the night and [also] the Quran of dawn. Indeed, the recitation of dawn is ever witnessed.',
      translationAuthor: 'Saheeh International (Vetted)',
      juzNumber: 15,
      pageNumber: 290,
      sajdah: false,
    },
    {
      surahNumber: 73,
      ayahNumber: 4,
      textArabic: 'وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا',
      textTranslation: 'And recite the Qur\'an with measured, rhythmic recitation.',
      translationAuthor: 'Saheeh International (Vetted)',
      juzNumber: 29,
      pageNumber: 574,
      sajdah: false,
    },
  ];

  async getSurahs(): Promise<Surah[]> {
    return LocalVettedQuranProvider.SURAHS;
  }

  async getSurah(surahNumber: number): Promise<Surah | null> {
    return LocalVettedQuranProvider.SURAHS.find((s) => s.number === surahNumber) || null;
  }

  async getAyah(surahNumber: number, ayahNumber: number): Promise<Ayah | null> {
    return (
      LocalVettedQuranProvider.AYAHS.find(
        (a) => a.surahNumber === surahNumber && a.ayahNumber === ayahNumber
      ) || null
    );
  }

  async getTafsir(surahNumber: number, ayahNumber: number): Promise<TafsirEntry | null> {
    if (surahNumber === 17 && ayahNumber === 78) {
      return {
        surahNumber: 17,
        ayahNumber: 78,
        author: 'Ibn Kathir',
        title: 'Tafsir al-Qur\'an al-\'Azim',
        language: 'en',
        text: 'The angels of the night and the angels of the day gather together at the dawn prayer (Fajr), bearing witness to the believer\'s recitation and humble devotion.',
      };
    }
    return null;
  }

  async searchVerses(query: string): Promise<Ayah[]> {
    const qLower = query.toLowerCase();
    return LocalVettedQuranProvider.AYAHS.filter(
      (a) =>
        a.textTranslation.toLowerCase().includes(qLower) ||
        a.textArabic.includes(query)
    );
  }
}

export const quranProvider = new LocalVettedQuranProvider();
