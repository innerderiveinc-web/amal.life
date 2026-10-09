"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributionValidator = void 0;
class AttributionValidator {
    static CONSENSUS_INDICATORS = [
        'all scholars agree',
        'scholars unanimously agree',
        'there is ijma',
        'there is total consensus',
        'every scholar says',
        'unanimous consensus',
        'all four madhhabs agree',
        'complete consensus',
    ];
    /**
     * Validate claims and statements for attribution veracity and false consensus
     */
    static validateAttribution(text, verifiedPassages) {
        const textLower = text.toLowerCase();
        const violations = [];
        // 1. Detect false consensus claims
        let isConsensusClaim = false;
        let consensusVerified = false;
        for (const phrase of this.CONSENSUS_INDICATORS) {
            if (textLower.includes(phrase)) {
                isConsensusClaim = true;
                // Check if backed by verified consensus node
                const hasVerifiedConsensus = verifiedPassages.some((p) => p.isConsensus === true);
                if (!hasVerifiedConsensus) {
                    violations.push(`UNVERIFIED_CONSENSUS_CLAIM: The statement asserts scholarly consensus ("${phrase}") without verified Ijma' evidence.`);
                }
                else {
                    consensusVerified = true;
                }
                break;
            }
        }
        // 2. Detect unverified direct quotes
        const quoteMatches = text.match(/"([^"]{15,})"/g) || [];
        let isDirectQuote = quoteMatches.length > 0;
        let quoteVerified = true;
        if (isDirectQuote && verifiedPassages.length === 0) {
            quoteVerified = false;
            violations.push('UNVERIFIED_DIRECT_QUOTE: Direct quotation found without matching canonical evidence passage.');
        }
        // 3. Prohibit AI claiming personal authority or issuing fatwas
        const fatwaPhrases = ['i declare this halal', 'i declare this haram', 'my ruling is', 'i issue this fatwa'];
        for (const fp of fatwaPhrases) {
            if (textLower.includes(fp)) {
                violations.push(`UNAUTHORIZED_FATWA_STATEMENT: AI cannot issue religious rulings ("${fp}").`);
            }
        }
        return {
            valid: violations.length === 0,
            isConsensusClaim,
            consensusVerified,
            isDirectQuote,
            quoteVerified,
            violations,
        };
    }
}
exports.AttributionValidator = AttributionValidator;
//# sourceMappingURL=attribution-validator.js.map