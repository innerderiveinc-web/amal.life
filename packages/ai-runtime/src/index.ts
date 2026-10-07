import {
  AmalAIRequest,
  RuntimeState,
  IntentContract,
  SafetyPolicyObject,
  EvidencePack,
  ClaimRecord,
  AIAuditRecord,
} from '@amal/types';
import { FatwaFirewall } from '@amal/safety';
import { IslamicEvidenceGraph, CitationValidator } from '@amal/evidence';

export class AiRuntimeEngine {
  public static async process(request: AmalAIRequest): Promise<{
    status: RuntimeState;
    intent: string;
    safetyClass: string;
    evidenceCount: number;
    claimsVerified: boolean;
    citationsVerified: boolean;
  }> {
    if (!request.message || request.message.trim().length === 0) {
      throw new Error('MALFORMED_INPUT: Message cannot be empty.');
    }

    const safety = FatwaFirewall.classify(request.message);
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

    const matches = await IslamicEvidenceGraph.queryPassages(request.message, 3);
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

    const citationsOk = matches.every((m) => CitationValidator.validateCitation(m.reference).valid);
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
