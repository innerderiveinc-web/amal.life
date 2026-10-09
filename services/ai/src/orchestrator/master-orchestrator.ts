import {
  AIRequest,
  AIResponse,
  EvidencePackItem,
} from '@amal/types';
import { IntentEngine } from '../intent/intent-engine.js';
import { SafetyEngine } from '../safety/safety-engine.js';
import { ContextFirewall } from '../context/context-firewall.js';
import { MemorySelector } from '../memory/memory-selector.js';
import { EvidenceVerifier } from '../verification/evidence-verifier.js';
import { AmalPlanner } from '../agents/amal-planner.js';
import { ResponseComposer } from '../runtime/response-composer.js';
import { CitationAuditor } from '../citation/citation-auditor.js';
import { FinalSafetyGate } from '../safety/final-safety-gate.js';
import { db } from '@amal/database';

export class MasterOrchestrator {
  public async process(request: AIRequest): Promise<AIResponse> {
    // 1. Intent Classification
    const intent = await IntentEngine.classify(request);

    // 2. Safety Engine Pre-Evaluation
    const safety = await SafetyEngine.evaluate(request, intent);
    if (safety.blocked) {
      return {
        responseId: `resp_blocked_${Date.now()}`,
        status: 'BLOCKED',
        intent: {
          intent: intent.primary as any,
          confidence: intent.confidence,
          requiresEvidence: false,
          requiresContext: false,
          requiresScholar: false,
          clarificationRequired: false,
        },
        safety: {
          classification: safety.classification as any,
          riskLevel: safety.riskLevel,
          allowedModes: [],
          requiresEvidence: false,
          requiresScholar: false,
          personalizationAllowed: false,
          escalationRequired: false,
          blocked: true,
          reasons: [safety.blockReason || 'Request blocked by safety firewall.'],
        },
        answer: {
          evidence: [],
          interpretation: [],
          personalGuidance: [],
          actions: [],
        },
        citations: [],
        personalization: { usedContextIds: [], confidence: 0 },
        audit: { citationVerified: false, safetyVerified: true },
      };
    }

    // 3. Minimum Necessary Context & Memory Selection
    const context = await ContextFirewall.select(request, intent, safety);
    const memory = await MemorySelector.select(request, intent, safety);

    // 4. Islamic Evidence Retrieval & Verification
    const evidenceItems: EvidencePackItem[] = [];
    if (intent.requiresEvidence) {
      for (const p of db.passages.values()) {
        const source = db.sources.get(p.sourceId);
        if (source && source.verificationStatus === 'APPROVED') {
          evidenceItems.push({
            passageId: p.id,
            sourceTitle: source.title,
            authorityLevel: source.authorityLevel,
            reference: p.reference,
            translation: p.translatedText,
            relevanceScore: 0.95,
          });
          if (evidenceItems.length >= 3) break;
        }
      }
    }

    const verification = await EvidenceVerifier.verify({
      query: request.message,
      normalizedIntent: intent.primary,
      items: evidenceItems,
      scholarlyDifferences: [],
      allowedClaims: [],
      prohibitedClaims: [],
      requiresScholarEscalation: false,
    });

    // 5. Amal Planning
    const plannedActions = AmalPlanner.planActions(intent.primary, verification.verifiedEvidence, 15);
    const primaryAmal = plannedActions[0];
    const recAction = primaryAmal
      ? ({
          amal: { title: primaryAmal.title, durationMinutes: primaryAmal.estimatedMinutes },
          rationale: primaryAmal.description,
        } as any)
      : undefined;

    // 6. Response Composition (4 Epistemic Categories)
    const rawResponse = ResponseComposer.compose({
      requestMessage: request.message,
      intent,
      safety,
      evidenceItems: verification.verifiedEvidence,
      amalRecommendation: recAction,
      practicalNotes: ['Keep the session brief to protect against burnout.'],
    });

    // 7. Citation Audit & Final Safety Gate
    const textContent = rawResponse.answer.evidence.map((e) => e.content).join('\n');
    const citationAudit = await CitationAuditor.audit(textContent, verification.verifiedEvidence);
    const finalGate = FinalSafetyGate.evaluate(textContent, safety, citationAudit);

    if (!finalGate.passed) {
      return {
        ...rawResponse,
        status: 'BLOCKED',
      };
    }

    return {
      ...rawResponse,
      audit: {
        citationVerified: citationAudit.auditPassed,
        safetyVerified: true,
      },
    };
  }
}
