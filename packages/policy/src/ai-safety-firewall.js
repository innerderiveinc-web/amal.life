"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AISafetyFirewall = void 0;
class AISafetyFirewall {
    /**
     * Scans input text across 5 Trust Zones and enforces:
     * 1. Prompt Injection Defense
     * 2. Scholar Impersonation Prevention
     * 3. Personalized Fiqh Escalation
     * 4. Crisis / Emergency Interception
     */
    static scanInput(input, zone = 'ZONE_C_USER_INPUT') {
        const text = input.trim().toLowerCase();
        // 1. Crisis & Emergency Intercept (Class E)
        const crisisPatterns = [
            /commit suicide/i,
            /want to end my life/i,
            /kill myself/i,
            /self-harm/i,
            /overdose on/i,
            /physical abuse/i,
        ];
        for (const pat of crisisPatterns) {
            if (pat.test(input)) {
                return {
                    isSafe: false,
                    threatDetected: 'CRISIS_EMERGENCY',
                    safetyClass: 'CLASS_E',
                    responseMode: 'SPECIALIST_ESCALATION',
                    emergencyReferral: 'If you are in distress or feel unsafe, please reach out immediately: Dial 988 (Suicide & Crisis Lifeline) or contact your local emergency services. You are valued and not alone.',
                };
            }
        }
        // 2. Prompt Injection & System Probe Defense
        const injectionPatterns = [
            /ignore all (amal )?rules/i,
            /ignore previous instructions/i,
            /show (me )?your system prompt/i,
            /reveal internal prompt/i,
            /you are now (unrestricted|jailbroken|dan)/i,
            /bypass safety/i,
        ];
        for (const pat of injectionPatterns) {
            if (pat.test(input)) {
                return {
                    isSafe: false,
                    threatDetected: 'PROMPT_INJECTION_ATTEMPT',
                    safetyClass: 'CLASS_A',
                    responseMode: 'BLOCK',
                };
            }
        }
        // 3. Scholar Impersonation & Fatwa Declaration Request
        const fatwaPatterns = [
            /as a mufti,? (i declare|i rule)/i,
            /issue a definitive fatwa/i,
            /declare .* (halal|haram) for me personally/i,
            /pretend you are a mufti/i,
        ];
        for (const pat of fatwaPatterns) {
            if (pat.test(input)) {
                return {
                    isSafe: false,
                    threatDetected: 'SCHOLAR_IMPERSONATION_DEFENSE',
                    safetyClass: 'CLASS_D',
                    responseMode: 'SCHOLAR_REVIEW',
                };
            }
        }
        // 4. Personalized Fiqh vs Scholarly Difference Classification
        if (/which madhhab is correct/i.test(input) || /difference of opinion/i.test(input)) {
            return {
                isSafe: true,
                safetyClass: 'CLASS_C',
                responseMode: 'PLURALITY',
            };
        }
        if (/is my prayer valid if/i.test(input) || /did i break my fast/i.test(input)) {
            return {
                isSafe: true,
                safetyClass: 'CLASS_D',
                responseMode: 'SCHOLAR_REVIEW',
            };
        }
        return {
            isSafe: true,
            safetyClass: 'CLASS_A',
            responseMode: 'NORMAL',
        };
    }
    /**
     * Sanitizes external untrusted content (Trust Zone D), ensuring it is treated
     * strictly as passive data and never as executable instructions.
     */
    static sanitizeZoneDContent(rawContent) {
        return `[DATA_CONTENT_QUOTATION_START]\n${rawContent.replace(/\[\/?(SYSTEM|INSTRUCTION|RULES)\]/gi, '')}\n[DATA_CONTENT_QUOTATION_END]`;
    }
}
exports.AISafetyFirewall = AISafetyFirewall;
//# sourceMappingURL=ai-safety-firewall.js.map