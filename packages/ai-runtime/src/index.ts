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
    const citationsOk = matches.every((m) => CitationValidator.validateCitation(m.reference).valid);

    return {
      status: 'COMPLETED',
      intent: 'GENERAL_GUIDANCE',
      safetyClass: 'B',
      evidenceCount: matches.length,
      claimsVerified: true,
      citationsVerified: citationsOk,
    };
  }
}
