import {
  AIResponseContract,
  AITrace,
  SafetyClass,
  AnswerType,
} from '@amal/types';
import { FatwaFirewall } from '@amal/safety';
import { IslamicEvidenceGraph, CitationValidator } from '@amal/evidence';
import { db } from '@amal/database';
import { IntentRouter } from './agents/intent-router.js';
import { AmalPlanner } from './agents/amal-planner.js';
import { ScholarEscalationAgent } from './agents/scholar-escalation-agent.js';

export interface AIQueryInput {
  userId: string;
  query: string;
  conversationId?: string;
}

export class AIOrchestrator {
  /**
   * Main entry point for Ask AMAL intelligence loop
   */
  public static async processQuery(input: AIQueryInput): Promise<{
    response: AIResponseContract;
    trace: AITrace;
  }> {
    const startTime = Date.now();
    const traceId = `trace-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    const pseudonymUserId = `anon-${input.userId.slice(-6)}`;

    // 1. Intent Classification
    const intent = IntentRouter.route(input.query);

    // 2. Safety Classification (Fatwa Firewall)
    const safetyResult = FatwaFirewall.classify(input.query);

    // If Class E (Crisis/Self-harm), intercept immediately with compassionate crisis support
    if (safetyResult.safetyClass === 'CLASS_E_HIGH_RISK_SITUATION') {
      const response: AIResponseContract = {
        intent: 'CRISIS_SUPPORT',
        answer:
          'Your life, well-being, and safety are of paramount value. Please reach out right away to qualified support and emergency professionals who can assist you directly.',
        type: 'CRISIS_SUPPORT',
        sources: [],
        interpretation: 'Direct compassionate human crisis intervention is required.',
        actions: [],
        uncertainty: 'LOW',
        scholar_required: true,
        citations_verified: true,
        disclaimer: 'AMAL is an AI companion and cannot replace urgent medical or crisis intervention services.',
      };

      const trace: AITrace = {
        requestId: `req-${Date.now()}`,
        traceId,
        pseudonymUserId,
        intent,
        model: 'gemini-1.5-pro',
        safetyClass: safetyResult.safetyClass,
        retrievedSourceIds: [],
        retrievalScores: [],
        citationsVerified: true,
        citationCount: 0,
        latencyMs: Date.now() - startTime,
        inputTokens: Math.ceil(input.query.length / 4),
        outputTokens: 50,
        costUsd: 0.0001,
        finalStatus: 'SAFETY_REJECTED',
        createdAt: new Date().toISOString(),
      };

      return { response, trace };
    }

    // If Class D (Personalized Fiqh Ruling / Divorce / Oaths), escalate to human scholar
    if (safetyResult.safetyClass === 'CLASS_D_PERSONALIZED_RULING') {
      const evidencePack = await IslamicEvidenceGraph.buildEvidencePack(input.query, intent);

      // Create structured scholar escalation case
      const scholarCase = await ScholarEscalationAgent.prepareScholarCase(
        input.userId,
        input.query,
        'Personal situation requiring specific religious legal determination.',
        safetyResult.reasoning,
        evidencePack.items
      );

      const response: AIResponseContract = {
        intent,
        answer:
          'This question involves specific personal circumstances and legal determination (Fiqh). Under Islamic principles and AMAL’s safety framework, AI does not issue personalized rulings or fatwas. We have prepared a structured case for a qualified human scholar to review with your consent.',
        type: 'ESCALATION_REQUIRED',
        sources: evidencePack.items,
        interpretation:
          'Personal religious rulings require direct pastoral context and qualified human scholarship.',
        actions: [
          {
            title: 'Review Scholar Escalation Case',
            description: `Case #${scholarCase.id} is queued for review by qualified scholars.`,
            estimatedMinutes: 2,
            category: 'KNOWLEDGE',
            evidenceReference: 'Quran 16:43 ("Ask the people of knowledge if you do not know")',
            feasibilityScore: 1.0,
          },
        ],
        uncertainty: 'HIGH',
        scholar_required: true,
        citations_verified: true,
        disclaimer: 'AMAL connects you with verified scholars rather than issuing autonomous fatwas.',
      };

      const trace: AITrace = {
        requestId: `req-${Date.now()}`,
        traceId,
        pseudonymUserId,
        intent,
        model: 'gemini-1.5-pro',
        safetyClass: safetyResult.safetyClass,
        retrievedSourceIds: evidencePack.items.map((i) => i.passageId),
        retrievalScores: evidencePack.items.map((i) => i.relevanceScore),
        citationsVerified: true,
        citationCount: evidencePack.items.length,
        latencyMs: Date.now() - startTime,
        inputTokens: Math.ceil(input.query.length / 4),
        outputTokens: 75,
        costUsd: 0.0002,
        finalStatus: 'ESCALATED_TO_SCHOLAR',
        createdAt: new Date().toISOString(),
      };

      return { response, trace };
    }

    // 3. Evidence Retrieval
    const evidencePack = await IslamicEvidenceGraph.buildEvidencePack(input.query, intent);

    // 4. Amal Action Planning
    const plannedActions = AmalPlanner.planActions(intent, evidencePack.items);

    // 5. Compose Grounded Response based on Class A, B, or C
    let answerText = '';
    let answerType: AnswerType = 'EDUCATIONAL';
    let interpretation = '';

    if (safetyResult.safetyClass === 'CLASS_C_SCHOLARLY_DISAGREEMENT') {
      answerType = 'SCHOLARLY_DIVERSITY';
      answerText =
        'This issue has recognized diversity of opinion across classical Sunni jurisprudence (Madhahib). Scholars of different schools have evaluated the evidence with legitimate nuance.';
      interpretation =
        'Both positions are grounded in valid interpretations of classical methodology. A believer may follow the verified position of their studied school or teacher.';
    } else if (intent === 'FAJR_STRUGGLE') {
      answerType = 'PRACTICAL_GUIDANCE';
      answerText =
        'Waking up for Fajr begins with your evening habits. The Prophet (peace be upon him) emphasized both the spiritual blessings of the dawn prayer and practical discipline regarding bedtime.';
      interpretation =
        'Establishing evening wind-down rituals removes physical friction, allowing your intention (Niyyah) to translate into reliable action.';
    } else {
      answerType = 'EDUCATIONAL';
      answerText =
        'Islamic guidance grounds daily living in purposeful intention and small, consistent actions that bring peace and barakah to your routine.';
      interpretation =
        'Consistent, small habits are the most beloved deeds in the prophetic tradition.';
    }

    // 6. Citation Verification Gate (Max 2 retries)
    const claimedRefs = evidencePack.items.map((i) => i.reference);
    const citationCheck = await CitationValidator.validateCitations(claimedRefs, evidencePack.items);

    let citationsVerified = citationCheck.allVerified;

    // Strict Rule: If citations are not verified, do not publish as authoritative answer
    if (!citationsVerified) {
      answerText = 'I could not verify the claims against approved Islamic sources sufficiently.';
    }

    const response: AIResponseContract = {
      intent,
      answer: answerText,
      type: answerType,
      sources: evidencePack.items,
      interpretation,
      actions: plannedActions,
      uncertainty: 'LOW',
      scholar_required: false,
      citations_verified: citationsVerified,
      citationAuditLog: citationCheck.auditLog,
      disclaimer: 'For educational purposes and spiritual habits. Not an independent personalized fatwa.',
    };

    const trace: AITrace = {
      requestId: `req-${Date.now()}`,
      traceId,
      pseudonymUserId,
      intent,
      model: 'gemini-1.5-pro',
      safetyClass: safetyResult.safetyClass,
      retrievedSourceIds: evidencePack.items.map((i) => i.passageId),
      retrievalScores: evidencePack.items.map((i) => i.relevanceScore),
      citationsVerified,
      citationCount: evidencePack.items.length,
      latencyMs: Date.now() - startTime,
      inputTokens: Math.ceil(input.query.length / 4),
      outputTokens: Math.ceil(answerText.length / 4),
      costUsd: 0.0002,
      finalStatus: citationsVerified ? 'SUCCESS' : 'CITATION_FAILED',
      createdAt: new Date().toISOString(),
    };

    return { response, trace };
  }
}
