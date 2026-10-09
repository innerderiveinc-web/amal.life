export interface ParsedHadith {
    collection: string;
    book: string;
    chapter?: string;
    reference: string;
    arabicText?: string;
    translation?: string;
    grading: string;
    metadata: Record<string, unknown>;
}
export declare class HadithParser {
    static parseHadith(input: {
        collection: string;
        book: string;
        chapter?: string;
        reference: string;
        arabicText?: string;
        translation?: string;
        grading?: string;
        metadata?: Record<string, unknown>;
    }): ParsedHadith;
}
//# sourceMappingURL=hadith-parser.d.ts.map