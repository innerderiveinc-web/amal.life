"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HadithParser = void 0;
const reference_validator_js_1 = require("../../validation/reference-validator.js");
class HadithParser {
    static parseHadith(input) {
        const validation = reference_validator_js_1.ReferenceValidator.validateHadithReference(input.collection, input.reference);
        if (!validation.valid) {
            throw new Error(`Hadith parsing error: ${validation.reason}`);
        }
        return {
            collection: input.collection.trim(),
            book: input.book.trim(),
            chapter: input.chapter?.trim(),
            reference: input.reference.trim(),
            arabicText: input.arabicText?.trim(),
            translation: input.translation?.trim(),
            grading: input.grading || 'SAHIH',
            metadata: input.metadata || {},
        };
    }
}
exports.HadithParser = HadithParser;
//# sourceMappingURL=hadith-parser.js.map