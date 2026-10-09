export declare class ReferenceValidator {
    private static surahAyahCounts;
    /**
     * Deterministically validates a Quran reference e.g. "2:255" or "17:78"
     */
    static validateQuranReference(reference: string): {
        valid: boolean;
        reason?: string;
    };
    /**
     * Validates canonical Hadith collection and book references
     */
    static validateHadithReference(collection: string, reference: string): {
        valid: boolean;
        reason?: string;
    };
}
//# sourceMappingURL=reference-validator.d.ts.map