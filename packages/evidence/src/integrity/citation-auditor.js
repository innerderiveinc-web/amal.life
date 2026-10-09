"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CitationAuditor = void 0;
const reference_validator_js_1 = require("./reference-validator.js");
const database_1 = require("@amal/database");
class CitationAuditor {
    /**
     * Audit an AI response for canonical citation validity with 0 tolerated fabrications
     */
    static auditResponse(responseContent) {
        const extractedCitations = [];
        let fabricatedCount = 0;
        let verifiedCount = 0;
        // Regex patterns to capture citations:
        // 1. [Quran 17:78] or [Surah 2:286]
        // 2. [Sahih al-Bukhari 1] or [Muslim 2564]
        // 3. Raw citations in brackets or quotes
        const bracketCitations = responseContent.match(/\[(.*?)\]/g) || [];
        for (const bCit of bracketCitations) {
            const cleanRef = bCit.replace(/[\[\]]/g, '').trim();
            // Skip non-citation bracket tags like [Educational] or [Reflection]
            if (['Educational', 'Reflection', 'Daily Amal', 'Practical'].includes(cleanRef)) {
                continue;
            }
            const val = reference_validator_js_1.ReferenceValidator.validate(cleanRef);
            if (!val.valid) {
                fabricatedCount++;
                extractedCitations.push({
                    rawCitation: cleanRef,
                    isValidFormat: false,
                    sourceExists: false,
                    passageMatched: false,
                    supportLevel: 'UNSUPPORTED',
                    notes: val.error || 'Invalid or fabricated citation format.',
                });
                continue;
            }
            // Check if reference exists in stored approved database
            const norm = val.normalizedReference || cleanRef;
            const foundPassage = Array.from(database_1.db.passages.values()).find((p) => p.reference.toLowerCase().trim() === norm.toLowerCase().trim());
            if (foundPassage) {
                verifiedCount++;
                extractedCitations.push({
                    rawCitation: cleanRef,
                    normalizedReference: norm,
                    isValidFormat: true,
                    sourceExists: true,
                    passageMatched: true,
                    supportLevel: 'DIRECT',
                    matchedPassageId: foundPassage.id,
                    notes: `Verified against canonical stored passage (${foundPassage.reference})`,
                });
            }
            else {
                // Formatted like a citation, but NOT in verified database -> Unverified / Fabricated
                fabricatedCount++;
                extractedCitations.push({
                    rawCitation: cleanRef,
                    normalizedReference: norm,
                    isValidFormat: true,
                    sourceExists: false,
                    passageMatched: false,
                    supportLevel: 'UNSUPPORTED',
                    notes: 'Source or passage does not exist in the approved Islamic database.',
                });
            }
        }
        const total = verifiedCount + fabricatedCount;
        const precision = total === 0 ? 100.0 : (verifiedCount / total) * 100.0;
        const passed = fabricatedCount === 0 && precision >= 99.0;
        let actionTaken = 'PASSED';
        let sanitizedContent = responseContent;
        if (!passed) {
            actionTaken = 'BLOCKED_FABRICATION';
            sanitizedContent =
                "I could not verify sufficient evidence from approved Islamic sources to support this statement. AMAL's Zero-Fabrication policy prohibits delivering unverified citations.";
        }
        return {
            passed,
            totalCitations: total,
            verifiedCitations: verifiedCount,
            fabricatedCitations: fabricatedCount,
            precision,
            extractedCitations,
            sanitizedContent,
            actionTaken,
        };
    }
}
exports.CitationAuditor = CitationAuditor;
//# sourceMappingURL=citation-auditor.js.map