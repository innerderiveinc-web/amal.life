import { Surah, Ayah, TafsirEntry } from '@amal/types';
export interface QuranProvider {
    getSurahs(): Promise<Surah[]>;
    getSurah(surahNumber: number): Promise<Surah | null>;
    getAyah(surahNumber: number, ayahNumber: number): Promise<Ayah | null>;
    getTafsir(surahNumber: number, ayahNumber: number): Promise<TafsirEntry | null>;
    searchVerses(query: string): Promise<Ayah[]>;
}
export declare class LocalVettedQuranProvider implements QuranProvider {
    private static readonly SURAHS;
    private static readonly AYAHS;
    getSurahs(): Promise<Surah[]>;
    getSurah(surahNumber: number): Promise<Surah | null>;
    getAyah(surahNumber: number, ayahNumber: number): Promise<Ayah | null>;
    getTafsir(surahNumber: number, ayahNumber: number): Promise<TafsirEntry | null>;
    searchVerses(query: string): Promise<Ayah[]>;
}
export declare const quranProvider: LocalVettedQuranProvider;
//# sourceMappingURL=quran-provider.d.ts.map