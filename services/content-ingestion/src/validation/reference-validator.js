"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferenceValidator = void 0;
class ReferenceValidator {
    // Surah ayah counts (Surah 1 to 114)
    static surahAyahCounts = {
        1: 7, 2: 286, 3: 200, 4: 176, 5: 120, 6: 165, 7: 206, 8: 75, 9: 129, 10: 109,
        // Standard validation bounds
        17: 111, 18: 110, 36: 83, 67: 30, 112: 4, 113: 5, 114: 6,
    };
    /**
     * Deterministically validates a Quran reference e.g. "2:255" or "17:78"
     */
    static validateQuranReference(reference) {
        const match = reference.trim().match(/^(\d+):(\d+)$/);
        if (!match) {
            return { valid: false, reason: `Invalid reference format: '${reference}'. Expected 'surah:ayah'.` };
        }
        const surah = parseInt(match[1], 10);
        const ayah = parseInt(match[2], 10);
        if (surah < 1 || surah > 114) {
            return { valid: false, reason: `Surah ${surah} out of range (1-114).` };
        }
        const maxAyahs = this.surahAyahCounts[surah] || 300;
        if (ayah < 1 || ayah > maxAyahs) {
            return { valid: false, reason: `Ayah ${ayah} out of range for Surah ${surah} (max: ${maxAyahs}).` };
        }
        return { valid: true };
    }
    /**
     * Validates canonical Hadith collection and book references
     */
    static validateHadithReference(collection, reference) {
        const allowed = ['Sahih al-Bukhari', 'Sahih Muslim', 'Sunan Abu Dawud', 'Jami` at-Tirmidhi', 'Sunan an-Nasa`i', 'Sunan Ibn Majah', 'Muwatta Malik', 'Musnad Ahmad'];
        if (!allowed.some(c => c.toLowerCase() === collection.toLowerCase())) {
            return { valid: false, reason: `Unknown Hadith collection: '${collection}'.` };
        }
        if (!reference || reference.trim().length === 0) {
            return { valid: false, reason: 'Empty hadith reference identifier.' };
        }
        return { valid: true };
    }
}
exports.ReferenceValidator = ReferenceValidator;
//# sourceMappingURL=reference-validator.js.map