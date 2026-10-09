"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuranParser = void 0;
const reference_validator_js_1 = require("../../validation/reference-validator.js");
class QuranParser {
    static parseAyah(surah, ayah, arabicText) {
        const ref = `${surah}:${ayah}`;
        const validation = reference_validator_js_1.ReferenceValidator.validateQuranReference(ref);
        if (!validation.valid) {
            throw new Error(`Quran parsing error: ${validation.reason}`);
        }
        return {
            surahNumber: surah,
            ayahNumber: ayah,
            arabicText: arabicText.trim(),
            sourceReference: ref,
        };
    }
}
exports.QuranParser = QuranParser;
//# sourceMappingURL=quran-parser.js.map