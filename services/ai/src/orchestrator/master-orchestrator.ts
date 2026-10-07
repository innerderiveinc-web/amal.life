import { AIRequest, AIResponse, EvidencePackItem } from '@amal/types';
import { IntentEngine } from '../intent/intent-engine.js';
import { SafetyEngine } from '../safety/safety-engine.js';
import { ContextFirewall } from '../context/context-firewall.js';
import { MemorySelector } from '../memory/memory-selector.js';
import { EvidenceVerifier } from '../verification/evidence-verifier.js';
import { DeenExplanationAgent } from '../agents/deen/deen-explanation-agent.js';
import { AmalPlannerAgent } from '../agents/amal/amal-planner-agent.js';
import { CitationAuditor } from '../citation/citation-auditor.js';
import { FinalSafetyGate } from '../safety/final-safety-gate.js';
import { ResponseComposer } from '../runtime/response-composer.js';
import { db } from '@amal/database';

export class MasterOrchestrator {
  private static deenAgent = new DeenExplanationAgent();
  private static amalAgent = new AmalPlannerAgent();

  public static async execute(request: AIRequest): Promise<AIResponse> {
    // 1. Intent Classification
    const intent = await IntentEngine.classify(request);

    // 2. Safety Engine Pre-Evaluation
    const safety = await SafetyEngine.evaluate(request, intent);
    if (safety.blocked) {
      return {
        responseId: `resp_blocked_${Date.now()}`,
        status: 'BLOCKED',
        intent: { type: intent.primary, confidence: intent.confidence },
        safety: { class: safety.classification, risk: safety.riskLevel },
        content: safety.blockReason || 'Request blocked by safety firewall.',
        citations: [],
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
            id: p.id,
            sourceType: source.authorityLevel === 'TIER_1_QURAN' ? 'QURAN' : 'HADITH',
            reference: p.reference,
            text: p.translatedText,
            relevanceScore: 0.95,
          });
          if (evidenceItems.length >= 3) break;
        }
      }
    }

    const verification = await EvidenceVerifier.verify({
      query: request.message,
      items: evidenceItems,
      missingInformation: [],
      limitations: [],
    });

    // 5. Domain Delegation (Deen & Amal Planning)
    const deenResult = await this.deenAgent.execute({
      message: request.message,
      evidence: verification.verifiedEvidence,
    });

    const amalResult = await this.amalAgent.execute({
      userId: request.userId,
      goalCategory: 'QURAN',
      availableMinutes: 10,
    });

    // 6. Response Composition (4 Epistemic Categories)
    const rawResponse = ResponseComposer.compose({
      requestMessage: request.message,
      intent,
      safety,
      evidenceItems: verification.verifiedEvidence,
      amalRecommendation: amalResult.data.primaryAction,
      practicalNotes: ['Keep the session brief to protect against burnout.'],
    });

    // 7. Citation Audit & Final Safety Gate
    const citationAudit = await CitationAuditor.audit(rawResponse.content, verification.verifiedEvidence);
    const finalGate = FinalSafetyGate.evaluate(rawResponse.content, safety, citationAudit);

    if (!finalGate.passed) {
      return {
        ...rawResponse,
        status: 'BLOCKED',
        content: finalGate.sanitizedContent,
      };
    }

    return {
      ...rawResponse,
      content: finalGate.sanitizedContent,
      audit: {
        citationVerified: citationAudit.passed,
        safetyVerified: true,
      },
    };
  }
}
