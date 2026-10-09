import { CitationReference, EvidencePackItem } from '@amal/types';
export declare class CitationValidator {
    /**
     * Validate that cited references actually exist in the approved database
     * and that claims have direct provenance.
     */
    static validateCitations(claimedReferences: string[], providedSources: EvidencePackItem[]): Promise<{
        allVerified: boolean;
        auditLog: CitationReference[];
    }>;
}
//# sourceMappingURL=citation-validator.d.ts.map