"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiRuntimeEngine = void 0;
const safety_1 = require("@amal/safety");
const evidence_1 = require("@amal/evidence");
class AiRuntimeEngine {
    static async process(request) {
        if (!request.message || request.message.trim().length === 0) {
            throw new Error('MALFORMED_INPUT: Message cannot be empty.');
        }
        const safety = safety_1.FatwaFirewall.classify(request.message);
        if (safety.requiresCrisisIntervention) {
            return {
                status: 'POLICY_BLOCKED',
                intent: 'CRISIS',
                safetyClass: 'E',
                evidenceCount: 0,
                claimsVerified: true,
                citationsVerified: true,
            };
        }
        if (safety.requiresScholarEscalation) {
            return {
                status: 'SCHOLAR_REQUIRED',
                intent: 'FIQH_PERSONALIZED',
                safetyClass: 'D',
                evidenceCount: 0,
                claimsVerified: true,
                citationsVerified: true,
            };
        }
        const matches = await evidence_1.IslamicEvidenceGraph.queryPassages(request.message, 3);
        if (matches.length === 0) {
            return {
                status: 'EVIDENCE_INSUFFICIENT',
                intent: 'INSUFFICIENT_EVIDENCE',
                safetyClass: 'B',
                evidenceCount: 0,
                claimsVerified: false,
                citationsVerified: false,
            };
        }
        const citationsOk = matches.every((m) => evidence_1.CitationValidator.validateCitation(m.reference).valid);
        if (!citationsOk) {
            return {
                status: 'CITATION_FAILURE',
                intent: 'CITATION_VERIFICATION_FAILED',
                safetyClass: 'B',
                evidenceCount: matches.length,
                claimsVerified: false,
                citationsVerified: false,
            };
        }
        return {
            status: 'COMPLETED',
            intent: 'GENERAL_GUIDANCE',
            safetyClass: 'B',
            evidenceCount: matches.length,
            claimsVerified: true,
            citationsVerified: true,
        };
    }
}
exports.AiRuntimeEngine = AiRuntimeEngine;
//# sourceMappingURL=index.js.map