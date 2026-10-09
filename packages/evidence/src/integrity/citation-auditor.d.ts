import { ClaimSupportLevel } from '@amal/types';
export interface ExtractedCitation {
    rawCitation: string;
    normalizedReference?: string;
    isValidFormat: boolean;
    sourceExists: boolean;
    passageMatched: boolean;
    supportLevel: ClaimSupportLevel;
    matchedPassageId?: string;
    notes?: string;
}
export interface ZeroFabricationAuditResult {
    passed: boolean;
    totalCitations: number;
    verifiedCitations: number;
    fabricatedCitations: number;
    precision: number;
    extractedCitations: ExtractedCitation[];
    sanitizedContent: string;
    actionTaken: 'PASSED' | 'QUALIFIED' | 'BLOCKED_FABRICATION';
}
export declare class CitationAuditor {
    /**
     * Audit an AI response for canonical citation validity with 0 tolerated fabrications
     */
    static auditResponse(responseContent: string): ZeroFabricationAuditResult;
}
//# sourceMappingURL=citation-auditor.d.ts.map