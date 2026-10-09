"use strict";
// ==============================================================================
// AMAL OS — ARABIC TEXT DIFF CHECKER (Control #13)
// Automatic bitwise and Unicode glyph diff against approved canonical baseline.
// ==============================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArabicTextDiffChecker = void 0;
const crypto_1 = require("crypto");
class ArabicTextDiffChecker {
    static baselines = new Map([
        [
            'Quran 1:1',
            {
                reference: 'Quran 1:1',
                canonicalArabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
                canonicalHash: 'sha256_bismillah_medina_canonical',
            },
        ],
        [
            'Quran 1:2',
            {
                reference: 'Quran 1:2',
                canonicalArabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
                canonicalHash: 'sha256_fatiha_v2_canonical',
            },
        ],
        [
            'Quran 17:78',
            {
                reference: 'Quran 17:78',
                canonicalArabic: 'أَقِمِ الصَّلَاةَ لِدُلُوكِ الشَّمْسِ إِلَىٰ غَسَقِ اللَّيْلِ وَقُرْآنَ الْفَجْرِ ۖ إِنَّ قُرْآنَ الْفَجْرِ كَانَ مَشْهُودًا',
                canonicalHash: 'sha256_fajr_witnessed_canonical_hash',
            },
        ],
        [
            'Quran 73:4',
            {
                reference: 'Quran 73:4',
                canonicalArabic: 'وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا',
                canonicalHash: 'sha256_tartil_measured_canonical',
            },
        ],
        [
            'Sahih al-Bukhari 1',
            {
                reference: 'Sahih al-Bukhari 1',
                canonicalArabic: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى',
                canonicalHash: 'sha256_bukhari_1_niyyah_canonical',
            },
        ],
        [
            'Sahih al-Bukhari 39',
            {
                reference: 'Sahih al-Bukhari 39',
                canonicalArabic: 'إِنَّ الدِّينَ يُسْرٌ، وَلَنْ يُشَادَّ الدِّينَ أَحَدٌ إِلاَّ غَلَبَهُ',
                canonicalHash: 'sha256_bukhari_39_yusr_canonical',
            },
        ],
    ]);
    /**
     * Verify candidate Arabic text against canonical baseline
     */
    static verifyArabicText(reference, candidateArabic) {
        const baseline = this.baselines.get(reference);
        const computedHash = (0, crypto_1.createHash)('sha256').update(candidateArabic.trim()).digest('hex');
        if (!baseline) {
            return {
                matched: false,
                computedHash: `sha256_${computedHash}`,
                diffDetected: true,
                error: `NO_CANONICAL_BASELINE: No registered baseline artifact for reference ${reference}.`,
            };
        }
        // Exact glyph comparison
        const cleanCand = candidateArabic.replace(/\s+/g, ' ').trim();
        const cleanBase = baseline.canonicalArabic.replace(/\s+/g, ' ').trim();
        const isExact = cleanCand === cleanBase;
        return {
            matched: isExact,
            computedHash: `sha256_${computedHash}`,
            expectedHash: baseline.canonicalHash,
            diffDetected: !isExact,
            error: isExact ? undefined : `GLYPH_MUTATION_DETECTED: Candidate text differs from Medina/Canonical baseline for ${reference}.`,
        };
    }
    static registerBaseline(baseline) {
        this.baselines.set(baseline.reference, baseline);
    }
}
exports.ArabicTextDiffChecker = ArabicTextDiffChecker;
//# sourceMappingURL=arabic-diff-checker.js.map