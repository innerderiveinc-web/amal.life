"use strict";
// ==============================================================================
// AMAL OS — DANGEROUS PHRASE DETECTOR & CONSENSUS INTERCEPTOR (Control #11 & #22)
// High-stakes religious phrases require maximum evidence thresholds.
// ==============================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.DangerousPhraseDetector = void 0;
const claim_ledger_js_1 = require("./claim-ledger.js");
class DangerousPhraseDetector {
    static HIGH_STAKES_PATTERNS = [
        { pattern: /\ballah says\b/i, phraseName: 'Allah says', category: 'DIVINE_ATTRIBUTION' },
        { pattern: /\bthe prophet said\b/i, phraseName: 'the Prophet said', category: 'PROPHETIC_ATTRIBUTION' },
        { pattern: /\bthe messenger of allah said\b/i, phraseName: 'the Messenger of Allah said', category: 'PROPHETIC_ATTRIBUTION' },
        { pattern: /\bauthentic hadith\b/i, phraseName: 'authentic hadith', category: 'PROPHETIC_ATTRIBUTION' },
        { pattern: /\ball scholars agree\b/i, phraseName: 'all scholars agree', category: 'CONSENSUS_CLAIM' },
        { pattern: /\bscholars unanimously agree\b/i, phraseName: 'scholars unanimously agree', category: 'CONSENSUS_CLAIM' },
        { pattern: /\bthere is ijma\b/i, phraseName: 'there is ijma', category: 'CONSENSUS_CLAIM' },
        { pattern: /\bunanimous consensus\b/i, phraseName: 'unanimous consensus', category: 'CONSENSUS_CLAIM' },
        { pattern: /\bit is haram\b/i, phraseName: 'it is haram', category: 'NORMATIVE_RULING' },
        { pattern: /\bit is wajib\b/i, phraseName: 'it is wajib', category: 'NORMATIVE_RULING' },
        { pattern: /\bislam clearly says\b/i, phraseName: 'Islam clearly says', category: 'NORMATIVE_RULING' },
    ];
    /**
     * Scan text for dangerous phrases and enforce strict claim backing
     */
    static scan(text) {
        const matches = [];
        const blockedPhrases = [];
        const textLower = text.toLowerCase();
        for (const item of this.HIGH_STAKES_PATTERNS) {
            const match = item.pattern.exec(textLower);
            if (match) {
                // Check if the surrounding context is verified in ClaimLedger
                const ledgerCheck = claim_ledger_js_1.ClaimLedger.verifyClaimStatement(text);
                let requiredAction = 'ALLOW';
                let reason = 'Backed by verified Claim Ledger.';
                if (!ledgerCheck.verified) {
                    requiredAction = 'BLOCK';
                    reason = `High-stakes phrase "${item.phraseName}" used without matching verified Claim Ledger record.`;
                    blockedPhrases.push(item.phraseName);
                }
                else if (item.category === 'CONSENSUS_CLAIM' && !ledgerCheck.matchedClaim?.isConsensus) {
                    requiredAction = 'BLOCK';
                    reason = `Consensus claimed ("${item.phraseName}") but claim ledger does not record verified Ijma'.`;
                    blockedPhrases.push(item.phraseName);
                }
                matches.push({
                    phrase: item.phraseName,
                    category: item.category,
                    startIndex: match.index,
                    isBackedByLedger: ledgerCheck.verified,
                    requiredAction,
                    reason,
                });
            }
        }
        return {
            safe: blockedPhrases.length === 0,
            matches,
            blockedPhrases,
        };
    }
}
exports.DangerousPhraseDetector = DangerousPhraseDetector;
//# sourceMappingURL=dangerous-phrase-detector.js.map