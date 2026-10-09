import { InsufficientEvidenceReason, InsufficientEvidenceFallback } from '@amal/types';
export declare class InsufficientEvidenceHandler {
    private static readonly FALLBACK_TEMPLATES;
    /**
     * Produce a governed uncertainty response
     */
    static getFallbackResponse(reason: InsufficientEvidenceReason, options?: {
        requiresScholarEscalation?: boolean;
    }): InsufficientEvidenceFallback;
}
//# sourceMappingURL=insufficient-evidence-handler.d.ts.map