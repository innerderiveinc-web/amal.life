export interface Surah {
  number: number;
  nameArabic: string;
  nameEnglish: string;
  nameTranslation: string;
  revelationType: 'MECCAN' | 'MEDINAN';
  numberOfAyahs: number;
}

export interface Ayah {
  surahNumber: number;
  ayahNumber: number;
  textArabic: string;
  textTranslation: string;
  translationAuthor: string;
  juzNumber: number;
  pageNumber: number;
  sajdah: boolean;
  audioUrl?: string;
}

export interface TafsirEntry {
  surahNumber: number;
  ayahNumber: number;
  author: string;
  title: string;
  text: string;
  language: string;
}

export interface ReadingSession {
  id: string;
  userId: string;
  surahStart: number;
  ayahStart: number;
  surahEnd: number;
  ayahEnd: number;
  durationMinutes: number;
  pagesRead: number;
  notes?: string;
  createdAt: string;
}
