"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsufficientEvidenceHandler = void 0;
class InsufficientEvidenceHandler {
    static FALLBACK_TEMPLATES = {
        NO_VERIFIED_EVIDENCE: "I couldn't verify sufficient evidence from approved canonical Islamic sources to answer this question with certainty.",
        UNCONFIRMED_ATTRIBUTION: 'I could not confirm this attribution from the approved sources.',
        SCHOLARLY_DISAGREEMENT_NO_CONSENSUS: "This question involves scholarly differences, so I don't want to present one position as universally established.",
        MISSING_PROVENANCE: "I don't have a sufficiently verified source with intact provenance for that claim.",
        QUARANTINED_SOURCE: 'The requested source material is currently undergoing scholarly review and is quarantined from production retrieval.',
        UNLICENSED_SOURCE: 'The source material for this topic has not yet completed rights and licensing verification.',
        UNSUPPORTED_CLAIM: 'The proposed claim cannot be verified against our approved Quranic and Hadith records.',
    };
    /**
     * Produce a governed uncertainty response
     */
    static getFallbackResponse(reason, options) {
        const approvedMessage = this.FALLBACK_TEMPLATES[reason] || this.FALLBACK_TEMPLATES.NO_VERIFIED_EVIDENCE;
        return {
            reason,
            approvedMessage,
            requiresScholarEscalation: options?.requiresScholarEscalation ?? false,
        };
    }
}
exports.InsufficientEvidenceHandler = InsufficientEvidenceHandler;
//# sourceMappingURL=insufficient-evidence-handler.js.map