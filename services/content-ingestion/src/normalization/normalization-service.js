"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NormalizationService = void 0;
class NormalizationService {
    /**
     * Performs standard Unicode NFC normalization, whitespace trimming, and reference formatting
     * without altering substantive Arabic text.
     */
    static normalizeText(text) {
        return text
            .normalize('NFC')
            .replace(/[\r\n]+/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
    }
    static normalizeReference(ref) {
        return ref.trim().replace(/\s*:\s*/g, ':');
    }
}
exports.NormalizationService = NormalizationService;
//# sourceMappingURL=normalization-service.js.map