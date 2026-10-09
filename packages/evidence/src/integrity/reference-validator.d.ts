export interface ReferenceValidationResult {
    valid: boolean;
    normalizedReference?: string;
    sourceType?: 'QURAN' | 'HADITH' | 'TAFSIR' | 'SCHOLARLY_WORK';
    surahNumber?: number;
    ayahNumber?: number;
    collection?: string;
    hadithNumber?: number;
    error?: string;
}
export declare class ReferenceValidator {
    private static readonly SURAH_AYAH_COUNTS;
    private static readonly CANONICAL_HADITH_COLLECTIONS;
    /**
     * Validate any canonical Islamic reference (Quran, Hadith, Tafsir)
     */
    static validate(rawReference: string): ReferenceValidationResult;
    static validateQuranReference(surah: number, ayah: number): ReferenceValidationResult;
    static validateHadithReference(collectionQuery: string, hadithNumber: number): ReferenceValidationResult;
}
//# sourceMappingURL=reference-validator.d.ts.map