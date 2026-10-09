export interface ParsedAyah {
    surahNumber: number;
    ayahNumber: number;
    arabicText: string;
    sourceReference: string;
}
export declare class QuranParser {
    static parseAyah(surah: number, ayah: number, arabicText: string): ParsedAyah;
}
//# sourceMappingURL=quran-parser.d.ts.map