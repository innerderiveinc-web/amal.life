import { TrustZone } from '@amal/types';
export interface SafetyScanResult {
    isSafe: boolean;
    threatDetected?: string;
    safetyClass: 'CLASS_A' | 'CLASS_B' | 'CLASS_C' | 'CLASS_D' | 'CLASS_E';
    responseMode: 'NORMAL' | 'GUIDANCE' | 'PLURALITY' | 'SCHOLAR_REVIEW' | 'SPECIALIST_ESCALATION' | 'BLOCK';
    emergencyReferral?: string;
}
export declare class AISafetyFirewall {
    /**
     * Scans input text across 5 Trust Zones and enforces:
     * 1. Prompt Injection Defense
     * 2. Scholar Impersonation Prevention
     * 3. Personalized Fiqh Escalation
     * 4. Crisis / Emergency Interception
     */
    static scanInput(input: string, zone?: TrustZone): SafetyScanResult;
    /**
     * Sanitizes external untrusted content (Trust Zone D), ensuring it is treated
     * strictly as passive data and never as executable instructions.
     */
    static sanitizeZoneDContent(rawContent: string): string;
}
//# sourceMappingURL=ai-safety-firewall.d.ts.map