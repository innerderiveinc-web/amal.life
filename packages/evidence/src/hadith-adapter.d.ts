import { HadithGrading } from '@amal/types';
export interface IngestHadithInput {
    collection: string;
    bookNumber?: number;
    chapterNumber?: number;
    hadithNumber: number;
    reference: string;
    arabicText?: string;
    translatedText: string;
    grading: HadithGrading;
    narratorChain?: string[];
    license: string;
    sourceOriginUrl: string;
}
export declare class HadithGovernanceAdapter {
    /**
     * Validate hadith ingestion payload according to Amal governance criteria
     */
    static validateHadithPayload(input: IngestHadithInput): {
        valid: boolean;
        errors: string[];
    };
}
//# sourceMappingURL=hadith-adapter.d.ts.map