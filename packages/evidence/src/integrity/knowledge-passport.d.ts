import { VerificationLevel } from '@amal/types';
export interface KnowledgePassportData {
    passportId: string;
    knowledgeType: 'QURAN' | 'HADITH' | 'TAFSIR' | 'SCHOLARLY_OPINION' | 'CONCEPT';
    sourceTitle: string;
    edition: string;
    reference: string;
    originalLanguage: string;
    authorOrTranslator: string;
    licenseId: string;
    provenanceHash: string;
    verificationLevel: VerificationLevel;
    scholarReviewerId: string;
    scholarApproverId: string;
    hasConflict: boolean;
    version: number;
    publishedDate: string;
}
export declare class KnowledgePassport {
    private static passports;
    static issuePassport(data: KnowledgePassportData): KnowledgePassportData;
    static getPassport(passportId: string): KnowledgePassportData | undefined;
    /**
     * Deterministic production eligibility check:
     * Only valid if Level 7, verified provenance, license approved, and zero unhandled conflicts.
     */
    static isProductionEligible(passportId: string): {
        eligible: boolean;
        reason?: string;
    };
}
//# sourceMappingURL=knowledge-passport.d.ts.map