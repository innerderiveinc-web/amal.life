"use strict";
// ==============================================================================
// AMAL OS — CONFIDENCE LANGUAGE CONTROLLER (Control #23 & #29)
// Enforces that response framing is strictly proportional to evidence support level.
// ==============================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfidenceLanguageController = void 0;
class ConfidenceLanguageController {
    static POLICIES = {
        DIRECT_REVELATION: {
            supportLevel: 'DIRECT',
            authorizedLeadPhrase: 'The Holy Quran states:',
            forbiddenLeadPhrases: ['In my personal opinion', 'Scholars might say', 'Probably'],
            maxConfidenceLabel: 'DEFINITIVE',
        },
        SCHOLARLY_INTERPRETATION: {
            supportLevel: 'STRONG_INFERENCE',
            authorizedLeadPhrase: 'Classical scholars and commentators explain that:',
            forbiddenLeadPhrases: ['Allah explicitly commands', 'This is an immutable verse'],
            maxConfidenceLabel: 'QUALIFIED_INTERPRETATION',
        },
        SCHOLARLY_PLURALITY: {
            supportLevel: 'CONTESTED',
            authorizedLeadPhrase: 'Recognized jurists hold differing valid positions on this matter:',
            forbiddenLeadPhrases: ['All scholars unanimously agree', 'There is only one correct answer', 'Islam says'],
            maxConfidenceLabel: 'DIVERGENT',
        },
        GOVERNED_UNCERTAINTY: {
            supportLevel: 'UNSUPPORTED',
            authorizedLeadPhrase: 'I could not verify sufficient evidence from approved canonical sources for this matter.',
            forbiddenLeadPhrases: ['I assume', 'It is likely that', 'Most people believe'],
            maxConfidenceLabel: 'UNVERIFIED',
        },
        SCHOLAR_ESCALATION: {
            supportLevel: 'CONTESTED',
            authorizedLeadPhrase: 'This personalized matter requires direct guidance from a qualified Islamic scholar.',
            forbiddenLeadPhrases: ['Here is your fatwa', 'The final ruling for your life is'],
            maxConfidenceLabel: 'DIVERGENT',
        },
    };
    /**
     * Determine authorized framing based on evidence support level
     */
    static getFramingPolicy(supportLevel, isContested = false) {
        if (supportLevel === 'UNSUPPORTED') {
            return this.POLICIES.GOVERNED_UNCERTAINTY;
        }
        if (isContested || supportLevel === 'CONTESTED') {
            return this.POLICIES.SCHOLARLY_PLURALITY;
        }
        if (supportLevel === 'INTERPRETIVE' || supportLevel === 'STRONG_INFERENCE') {
            return this.POLICIES.SCHOLARLY_INTERPRETATION;
        }
        return this.POLICIES.DIRECT_REVELATION;
    }
    /**
     * Validate that candidate output does not violate forbidden certainty framing
     */
    static validateFraming(text, supportLevel) {
        const policy = this.getFramingPolicy(supportLevel);
        const violations = [];
        const textLower = text.toLowerCase();
        for (const forbidden of policy.forbiddenLeadPhrases) {
            if (textLower.includes(forbidden.toLowerCase())) {
                violations.push(`CERTAINTY_FRAMING_MISMATCH: Text uses forbidden phrase "${forbidden}" for support level ${supportLevel}.`);
            }
        }
        return {
            valid: violations.length === 0,
            violations,
        };
    }
}
exports.ConfidenceLanguageController = ConfidenceLanguageController;
//# sourceMappingURL=confidence-language-controller.js.map