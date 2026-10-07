import { SafetyEvaluation } from './safety-engine.js';
import { CitationAuditResult } from '../citation/citation-auditor.js';

export interface FinalSafetyCheckResult {
  passed: boolean;
  sanitizedContent: string;
  rejectionReason?: string;
  auditPassed: boolean;
}

export class FinalSafetyGate {
  public static evaluate(
    content: string,
    safety: SafetyEvaluation,
    citationAudit: CitationAuditResult
  ): FinalSafetyCheckResult {
    // 1. Hard check: Blocked safety classifications
    if (safety.blocked) {
      return {
        passed: false,
        sanitizedContent: safety.blockReason || 'Request blocked by safety firewall.',
        rejectionReason: safety.blockReason,
        auditPassed: false,
      };
    }

    // 2. Hard check: Fabricated citations
    if (citationAudit.fabricatedCitationCount > 0) {
      return {
        passed: false,
        sanitizedContent: 'Response purged due to citation authenticity failure.',
        rejectionReason: 'FABRICATED_CITATION_DETECTED',
        auditPassed: false,
      };
    }

    // 3. Tone & manipulation filter (no religious guilt, shame, broken streak scolding)
    let sanitized = content;
    const forbiddenPhrases = ['weak muslim', 'low iman', 'spiritually failing', 'sinful laziness', 'broken streak'];
    for (const phrase of forbiddenPhrases) {
      if (sanitized.toLowerCase().includes(phrase)) {
        sanitized = sanitized.replace(new RegExp(phrase, 'gi'), 'growing practice');
      }
    }

    return {
      passed: true,
      sanitizedContent: sanitized,
      auditPassed: true,
    };
  }
}
