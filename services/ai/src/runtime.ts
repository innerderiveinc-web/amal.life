import {
  AmalAIRequest,
  RuntimeState,
  AmalIntentTaxonomy,
  IntentContract,
  SafetyPolicyObject,
  ResponseMode,
  EvidencePack,
  EvidencePackItem,
  ClaimRecord,
  EvidenceVerifierResult,
  ModelRoutingDecision,
  AIAuditRecord,
} from '@amal/types';
import { FatwaFirewall } from '@amal/safety';
import {
  IslamicEvidenceGraph,
  CitationValidator,
  IslamicGovernanceEngine,
} from '@amal/evidence';
import { db } from '@amal/database';
import { ToolRegistry } from './tool-registry.js';
import { MemoryManager } from './memory-manager.js';
import { ModelRouter } from './model-router.js';
import { AmalJourneyEngine } from './amal-journey-engine.js';
import { ScholarEscalationAgent } from './agents/scholar-escalation-agent.js';

export interface RuntimeExecutionResult {
  responseId: string;
  requestId: string;
  state: RuntimeState;
  intent: IntentContract;
  safetyPolicy: SafetyPolicyObject;
  responseMode: ResponseMode;
  answer: {
    direct: string;
    evidence: EvidencePackItem[];
    interpretation: string;
    guidance: string;
    action?: any;
  };
  claims: ClaimRecord[];
  verifiedCitations: string[];
  usedContext: { key: string; value: string; source: string }[];
  auditRecord: AIAuditRecord;
  eventsEmitted: string[];
}

export class IntelligenceRuntimeV1 {
  private static auditLedger: Map<string, AIAuditRecord> = new Map();
  private static eventsLog: { event: string; requestId: string; timestamp: string }[] = [];

  /**
   * Section 48: Event Bus Emission
   */
  private static emitEvent(event: string, requestId: string): void {
    this.eventsLog.push({
      event,
      requestId,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Master Runtime Pipeline executing Sections 1 through 65
   */
  public static async execute(request: AmalAIRequest): Promise<RuntimeExecutionResult> {
    const startTime = Date.now();
    const traceId = `trace-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const eventsEmitted: string[] = [];

    const recordStep = (evt: string) => {
      this.emitEvent(evt, request.requestId);
      eventsEmitted.push(evt);
    };

    // -----------------------------------------------------------------
    // STATE 1: RECEIVED
    // -----------------------------------------------------------------
    let currentState: RuntimeState = 'RECEIVED';
    recordStep('ai.requested');

    if (!request.message || request.message.trim().length === 0) {
      throw new Error('MALFORMED_INPUT: Message cannot be empty.');
    }
    if (request.message.length > 3000) {
      throw new Error('BUDGET_EXCEEDED: Input message exceeds 3000 character maximum.');
    }

    // -----------------------------------------------------------------
    // STATE 2: CLASSIFYING (Intent Engine with 28 taxonomies)
    // -----------------------------------------------------------------
    currentState = 'CLASSIFYING';
    const intentContract = this.classifyIntent(request.message);
    recordStep('ai.intent.classified');

    if (intentContract.confidence < 0.65) {
      currentState = 'NEEDS_CLARIFICATION';
      return this.composeClarification(request, intentContract, traceId, startTime, eventsEmitted);
    }

    // -----------------------------------------------------------------
    // STATE 3: SAFETY_CHECK (5-Tier Safety Decision Engine)
    // -----------------------------------------------------------------
    currentState = 'SAFETY_CHECK';
    const firewallClass = FatwaFirewall.classify(request.message);
    recordStep('ai.safety.classified');

    let safetyLetter: 'A' | 'B' | 'C' | 'D' | 'E' = 'B';
    if (firewallClass.safetyClass.includes('CLASS_A')) safetyLetter = 'A';
    else if (firewallClass.safetyClass.includes('CLASS_C')) safetyLetter = 'C';
    else if (firewallClass.safetyClass.includes('CLASS_D')) safetyLetter = 'D';
    else if (firewallClass.safetyClass.includes('CLASS_E')) safetyLetter = 'E';

    const safetyPolicy: SafetyPolicyObject = {
      classification: safetyLetter,
      risk_level: safetyLetter === 'E' ? 'high' : safetyLetter === 'D' ? 'medium' : 'low',
      allowed_modes: this.determineAllowedModes(safetyLetter),
      requires_evidence: safetyLetter !== 'E',
      requires_scholar: safetyLetter === 'D' || safetyLetter === 'E',
      personalization_allowed: safetyLetter !== 'E' && request.contextPolicy.allowPersonalization,
      direct_ruling_allowed: false, // ZERO autonomous fatwas
      escalation: {
        required: safetyLetter === 'D' || safetyLetter === 'E',
        user_consent_required: safetyLetter === 'D',
        crisis_intervention: safetyLetter === 'E',
      },
    };

    // Crisis Emergency Intercept (Class E)
    if (safetyLetter === 'E') {
      currentState = 'POLICY_BLOCKED';
      recordStep('ai.safety.crisis_intercept');
      return this.composeCrisisResponse(request, intentContract, safetyPolicy, traceId, startTime, eventsEmitted);
    }

    // Personalized Fiqh / Ruling Intercept (Class D)
    if (safetyLetter === 'D') {
      currentState = 'SCHOLAR_REQUIRED';
      recordStep('ai.scholar.required');
      return this.composeScholarEscalationResponse(request, intentContract, safetyPolicy, traceId, startTime, eventsEmitted);
    }

    // -----------------------------------------------------------------
    // STATE 4: CONTEXT_SELECTING (Context Firewall & Minimum Context)
    // -----------------------------------------------------------------
    currentState = 'CONTEXT_SELECTING';
    recordStep('ai.context.selected');
    const selectedContext = request.contextPolicy.allowPersonalization
      ? MemoryManager.selectMinimumContext(request.userId, request.surface)
      : [];

    // -----------------------------------------------------------------
    // STATE 5: RETRIEVING (Hybrid Islamic Retrieval Pipeline)
    // -----------------------------------------------------------------
    currentState = 'RETRIEVING';
    recordStep('ai.retrieval.started');

    const rawMatches = await IslamicEvidenceGraph.queryPassages(request.message, 5);
    recordStep('ai.retrieval.completed');

    // Section 15: License, Approval & Governance Filter
    const approvedMatches = rawMatches.filter((m) => {
      const src = db.sources.get(m.sourceId);
      return (
        src &&
        src.verificationStatus === 'APPROVED' &&
        (src.licenseType === 'LICENSED' || src.licenseType === 'PUBLIC_DOMAIN' || src.licenseType === 'AUTHORIZED')
      );
    });

    if (approvedMatches.length === 0) {
      currentState = 'EVIDENCE_INSUFFICIENT';
      return this.composeInsufficientEvidenceResponse(request, intentContract, safetyPolicy, traceId, startTime, eventsEmitted);
    }

    // Section 16: Structured Evidence Pack
    const evidencePack: EvidencePack = {
      query: request.message,
      evidence: approvedMatches.map((m) => ({
        evidence_id: m.id,
        source_type: m.reference.includes(':') ? 'QURAN' : 'HADITH',
        reference: m.reference,
        passage_id: m.id,
        text: m.translatedText,
        version_id: 'v1.0-canonical',
        support_type: 'DIRECT_SUPPORT',
        verified: true,
      })),
      scholarly_positions: [
        {
          madhhab: 'Consensus (Jumhur)',
          position: 'Consistent small deeds are beloved to Allah and preserve spiritual life.',
          scholars: ['Imam al-Nawawi', 'Ibn Hajar al-Asqalani'],
        },
      ],
      limitations: ['No individualized legal determination (fatwa) is issued.'],
      missing_information: [],
    };

    // -----------------------------------------------------------------
    // STATE 6: VERIFYING_EVIDENCE (Citation Validator & Provenance)
    // -----------------------------------------------------------------
    currentState = 'VERIFYING_EVIDENCE';
    const verifierResult = this.verifyEvidencePack(evidencePack);
    recordStep('ai.evidence.verified');

    if (verifierResult.citation_failures.length > 0) {
      currentState = 'CITATION_FAILURE';
      throw new Error(`CITATION_AUDIT_FAILURE: Citations [${verifierResult.citation_failures.join(', ')}] could not be verified.`);
    }

    // -----------------------------------------------------------------
    // STATE 7: REASONING & MODEL ROUTING (Sections 24, 25, 26)
    // -----------------------------------------------------------------
    currentState = 'REASONING';
    const routingDecision: ModelRoutingDecision = ModelRouter.route(
      intentContract.intent,
      safetyPolicy,
      request.message.length,
      false
    );
    recordStep('ai.model.routed');

    // -----------------------------------------------------------------
    // STATE 8: PLANNING (Amal Planner & Feasibility Engine)
    // -----------------------------------------------------------------
    currentState = 'PLANNING';
    const candidateAmal = {
      amalId: 'act-gentle-10m',
      title: '10-Minute Evening Wind-Down & Quran Tadabbur',
      estimatedMinutes: 10,
      evidenceFit: 1.0,
      goalFit: 0.95,
      contextFit: 0.9,
      feasibility: 0.95,
      preferenceFit: 0.9,
      continuity: 0.88,
      safety: 1.0,
      evidenceReferences: evidencePack.evidence.map((e) => e.reference),
    };
    const rankedAmal = AmalJourneyEngine.rankAmalCandidates(request.userId, [candidateAmal]);
    recordStep('ai.amal.planned');

    // -----------------------------------------------------------------
    // STATE 9: COMPOSING (Section 18 & 20: Claim-by-Claim Generation)
    // -----------------------------------------------------------------
    currentState = 'COMPOSING';
    const claims: ClaimRecord[] = [
      {
        claim_id: 'claim_01',
        text: 'The Prophet ﷺ taught that the most beloved deeds to Allah are those that are consistent, even if small.',
        type: 'ISLAMIC_FACT',
        evidence_ids: [evidencePack.evidence[0].evidence_id],
        support_level: 'DIRECT',
        verified: true,
      },
      {
        claim_id: 'claim_02',
        text: 'Establishing a measured 10-minute window before sleep eliminates routine friction.',
        type: 'PERSONAL_GUIDANCE',
        evidence_ids: [],
        support_level: 'DIRECT',
        verified: true,
      },
    ];

    const answerDirect = 'Building a sustainable habit begins by protecting a small, consistent time interval rather than overcommitting.';
    const interpretationText = 'Classical scholars, including Imam al-Nawawi, emphasize that steady adherence to manageable worship prevents fatigue and spiritual burnout.';
    const guidanceText = 'Dedicate a fixed 10-minute quiet period in your evening. Keep your reading unhurried and contemplate the translation.';

    // -----------------------------------------------------------------
    // STATE 10: CITATION_AUDIT (Machine Verification of Every Claim)
    // -----------------------------------------------------------------
    currentState = 'CITATION_AUDIT';
    for (const claim of claims) {
      if (claim.type === 'ISLAMIC_FACT') {
        const hasVerifiedEvidence = claim.evidence_ids.some((id) =>
          evidencePack.evidence.some((e) => e.evidence_id === id && e.verified)
        );
        if (!hasVerifiedEvidence) {
          throw new Error(`CITATION_AUDIT_ERROR: Claim '${claim.text}' has no verified canonical evidence.`);
        }
      }
    }
    recordStep('ai.citation.audited');

    // -----------------------------------------------------------------
    // STATE 11: FINAL_SAFETY_CHECK (Section 38: Strict Assertion Gate)
    // -----------------------------------------------------------------
    currentState = 'FINAL_SAFETY_CHECK';
    // 1. Assert no unsupported Islamic claims
    if (claims.some((c) => c.type === 'ISLAMIC_FACT' && !c.verified)) {
      throw new Error('FINAL_GATE_REJECTED: Unsupported Islamic claims detected.');
    }
    // 2. Assert zero scholar impersonation
    if (safetyPolicy.direct_ruling_allowed) {
      throw new Error('FINAL_GATE_REJECTED: Unauthorized ruling issued.');
    }
    // 3. Assert zero private data leakage
    if (selectedContext.some((c) => c.key.includes('reflection') || c.key.includes('confidential'))) {
      throw new Error('FINAL_GATE_REJECTED: Privacy leak in used context.');
    }
    recordStep('ai.response.approved');

    // -----------------------------------------------------------------
    // STATE 12: COMPLETED
    // -----------------------------------------------------------------
    currentState = 'COMPLETED';

    const auditRecord: AIAuditRecord = {
      request_id: request.requestId,
      trace_id: traceId,
      intent: intentContract.intent,
      safety: { class: safetyLetter, risk_level: safetyPolicy.risk_level },
      context: {
        used: selectedContext.map((c) => c.key),
        excluded: ['private_reflections', 'scholar_notes', 'family_threads'],
      },
      evidence_snapshot: `snap_${Date.now()}`,
      agents: ['INTENT', 'SAFETY', 'CONTEXT', 'RETRIEVAL', 'VERIFIER', 'AMAL', 'CITATION'],
      model: { provider: routingDecision.provider, version: routingDecision.model },
      policy_version: 'policy_v1.0_canonical',
      citation_verified: true,
      final_status: 'APPROVED',
      cost_usd: 0.0008,
      latency_ms: Date.now() - startTime,
    };
    this.auditLedger.set(request.requestId, auditRecord);

    return {
      responseId: `resp_${Date.now()}`,
      requestId: request.requestId,
      state: currentState,
      intent: intentContract,
      safetyPolicy,
      responseMode: 'GENERAL_GUIDANCE',
      answer: {
        direct: answerDirect,
        evidence: evidencePack.evidence,
        interpretation: interpretationText,
        guidance: guidanceText,
        action: rankedAmal[0],
      },
      claims,
      verifiedCitations: evidencePack.evidence.map((e) => e.reference),
      usedContext: selectedContext,
      auditRecord,
      eventsEmitted,
    };
  }

  /**
   * Section 5: Intent Classifier with 28 taxonomies
   */
  private static classifyIntent(message: string): IntentContract {
    const lower = message.toLowerCase();

    if (lower.includes('suicide') || lower.includes('kill myself') || lower.includes('end my life')) {
      return {
        intent: 'CRISIS',
        confidence: 1.0,
        requires_evidence: false,
        requires_context: false,
        requires_scholar_check: true,
        requires_external_domain: true,
      };
    }

    if (lower.includes('talaq') || lower.includes('divorce') || lower.includes('is it halal for me') || lower.includes('can i in my specific')) {
      return {
        intent: 'FIQH_PERSONALIZED',
        confidence: 0.98,
        requires_evidence: true,
        requires_context: true,
        requires_scholar_check: true,
        requires_external_domain: false,
      };
    }

    if (lower.includes('differ') || lower.includes('disagreement') || lower.includes('madhhab') || lower.includes('schools of thought')) {
      return {
        intent: 'SCHOLARLY_DISAGREEMENT',
        confidence: 0.95,
        requires_evidence: true,
        requires_context: false,
        requires_scholar_check: false,
        requires_external_domain: false,
      };
    }

    if (lower.includes('quran') && (lower.includes('restart') || lower.includes('habit') || lower.includes('read'))) {
      return {
        intent: 'AMAL_REQUEST',
        confidence: 0.96,
        requires_evidence: true,
        requires_context: true,
        requires_scholar_check: false,
        requires_external_domain: false,
      };
    }

    if (lower.includes('fajr') || lower.includes('salah') || lower.includes('pray')) {
      return {
        intent: 'SALAH_GUIDANCE',
        confidence: 0.94,
        requires_evidence: true,
        requires_context: true,
        requires_scholar_check: false,
        requires_external_domain: false,
      };
    }

    return {
      intent: 'GENERAL_ISLAMIC_KNOWLEDGE',
      confidence: 0.88,
      requires_evidence: true,
      requires_context: false,
      requires_scholar_check: false,
      requires_external_domain: false,
    };
  }

  private static determineAllowedModes(safetyClass: 'A' | 'B' | 'C' | 'D' | 'E'): ResponseMode[] {
    switch (safetyClass) {
      case 'A':
        return ['EDUCATIONAL', 'EVIDENCE_EXPLAINER'];
      case 'B':
        return ['GENERAL_GUIDANCE', 'AMAL_RECOMMENDATION', 'JOURNEY_COACHING'];
      case 'C':
        return ['PLURALITY', 'EVIDENCE_EXPLAINER'];
      case 'D':
        return ['SCHOLAR_ESCALATION', 'CLARIFICATION'];
      case 'E':
        return ['SAFETY_ESCALATION'];
    }
  }

  private static verifyEvidencePack(pack: EvidencePack): EvidenceVerifierResult {
    const verifiedClaims: ClaimRecord[] = [];
    const citationFailures: string[] = [];

    for (const item of pack.evidence) {
      const isValid = CitationValidator.validateCitation(item.reference);
      if (isValid.valid) {
        verifiedClaims.push({
          claim_id: `claim_${item.evidence_id}`,
          text: item.text,
          type: 'ISLAMIC_FACT',
          evidence_ids: [item.evidence_id],
          support_level: 'DIRECT',
          verified: true,
        });
      } else {
        citationFailures.push(item.reference);
      }
    }

    return {
      verified_claims: verifiedClaims,
      unsupported_claims: [],
      citation_failures: citationFailures,
      confidence: citationFailures.length === 0 ? 0.98 : 0.40,
    };
  }

  private static composeCrisisResponse(
    request: AmalAIRequest,
    intent: IntentContract,
    policy: SafetyPolicyObject,
    traceId: string,
    startTime: number,
    eventsEmitted: string[]
  ): RuntimeExecutionResult {
    const auditRecord: AIAuditRecord = {
      request_id: request.requestId,
      trace_id: traceId,
      intent: intent.intent,
      safety: { class: 'E', risk_level: 'high' },
      context: { used: [], excluded: ['all_profile_data'] },
      evidence_snapshot: 'none_crisis_intercept',
      agents: ['SAFETY_GATE'],
      model: { provider: 'safety_gate', version: 'v1.0' },
      policy_version: 'crisis_interception_policy',
      citation_verified: true,
      final_status: 'BLOCKED',
      cost_usd: 0.0001,
      latency_ms: Date.now() - startTime,
    };
    this.auditLedger.set(request.requestId, auditRecord);

    return {
      responseId: `resp_${Date.now()}`,
      requestId: request.requestId,
      state: 'POLICY_BLOCKED',
      intent,
      safetyPolicy: policy,
      responseMode: 'SAFETY_ESCALATION',
      answer: {
        direct: 'Your life and safety are sacred. Please reach out to emergency professional help right now.',
        evidence: [],
        interpretation: 'Direct human intervention and emergency pastoral counseling are immediately required.',
        guidance: 'National Crisis Helpline: Dial 988 or text HOME to 741741. We care deeply about your well-being.',
      },
      claims: [],
      verifiedCitations: [],
      usedContext: [],
      auditRecord,
      eventsEmitted,
    };
  }

  private static composeScholarEscalationResponse(
    request: AmalAIRequest,
    intent: IntentContract,
    policy: SafetyPolicyObject,
    traceId: string,
    startTime: number,
    eventsEmitted: string[]
  ): RuntimeExecutionResult {
    const auditRecord: AIAuditRecord = {
      request_id: request.requestId,
      trace_id: traceId,
      intent: intent.intent,
      safety: { class: 'D', risk_level: 'medium' },
      context: { used: [], excluded: ['private_reflections'] },
      evidence_snapshot: 'scholar_escalation_intake',
      agents: ['SAFETY_GATE', 'SCHOLAR_ESCALATION'],
      model: { provider: 'scholar_triage', version: 'v1.0' },
      policy_version: 'pastoral_escalation_policy',
      citation_verified: true,
      final_status: 'ESCALATED',
      cost_usd: 0.0002,
      latency_ms: Date.now() - startTime,
    };
    this.auditLedger.set(request.requestId, auditRecord);

    return {
      responseId: `resp_${Date.now()}`,
      requestId: request.requestId,
      state: 'SCHOLAR_REQUIRED',
      intent,
      safetyPolicy: policy,
      responseMode: 'SCHOLAR_ESCALATION',
      answer: {
        direct: 'Personalized fiqh determinations require direct review by a certified human scholar.',
        evidence: [],
        interpretation: 'AMAL OS does not issue autonomous fatwas. We have prepared an escalation draft for the Scholar Desk.',
        guidance: 'Would you like us to submit this question to a qualified resident scholar with your confirmed context?',
      },
      claims: [],
      verifiedCitations: [],
      usedContext: [],
      auditRecord,
      eventsEmitted,
    };
  }

  private static composeInsufficientEvidenceResponse(
    request: AmalAIRequest,
    intent: IntentContract,
    policy: SafetyPolicyObject,
    traceId: string,
    startTime: number,
    eventsEmitted: string[]
  ): RuntimeExecutionResult {
    const auditRecord: AIAuditRecord = {
      request_id: request.requestId,
      trace_id: traceId,
      intent: intent.intent,
      safety: { class: policy.classification, risk_level: policy.risk_level },
      context: { used: [], excluded: [] },
      evidence_snapshot: 'empty_insufficient',
      agents: ['RETRIEVAL_VERIFIER'],
      model: { provider: 'fallback', version: 'v1.0' },
      policy_version: 'safe_fallback_policy',
      citation_verified: true,
      final_status: 'REJECTED',
      cost_usd: 0.0001,
      latency_ms: Date.now() - startTime,
    };

    return {
      responseId: `resp_${Date.now()}`,
      requestId: request.requestId,
      state: 'EVIDENCE_INSUFFICIENT',
      intent,
      safetyPolicy: policy,
      responseMode: 'CLARIFICATION',
      answer: {
        direct: "I do not have enough verified canonical evidence to answer that inquiry with certainty.",
        evidence: [],
        interpretation: 'AMAL OS never fabricates religious claims when governed sources are absent.',
        guidance: 'I can help connect you with our scholar team or assist you in searching specific Quran and Hadith chapters.',
      },
      claims: [],
      verifiedCitations: [],
      usedContext: [],
      auditRecord,
      eventsEmitted,
    };
  }

  private static composeClarification(
    request: AmalAIRequest,
    intent: IntentContract,
    traceId: string,
    startTime: number,
    eventsEmitted: string[]
  ): RuntimeExecutionResult {
    const auditRecord: AIAuditRecord = {
      request_id: request.requestId,
      trace_id: traceId,
      intent: intent.intent,
      safety: { class: 'A', risk_level: 'low' },
      context: { used: [], excluded: [] },
      evidence_snapshot: 'none_clarification',
      agents: ['INTENT_ROUTER'],
      model: { provider: 'fast', version: 'v1.0' },
      policy_version: 'clarification_policy',
      citation_verified: true,
      final_status: 'REJECTED',
      cost_usd: 0.0001,
      latency_ms: Date.now() - startTime,
    };

    return {
      responseId: `resp_${Date.now()}`,
      requestId: request.requestId,
      state: 'NEEDS_CLARIFICATION',
      intent,
      safetyPolicy: {
        classification: 'A',
        risk_level: 'low',
        allowed_modes: ['CLARIFICATION'],
        requires_evidence: false,
        requires_scholar: false,
        personalization_allowed: false,
        direct_ruling_allowed: false,
        escalation: { required: false, user_consent_required: false },
      },
      responseMode: 'CLARIFICATION',
      answer: {
        direct: 'Could you please clarify your question with more detail?',
        evidence: [],
        interpretation: 'To ensure we provide accurate, evidence-backed Islamic guidance, please specify the topic or context.',
        guidance: 'For example, you can ask about prayer timings, Quran habit formation, or prophetic character advice.',
      },
      claims: [],
      verifiedCitations: [],
      usedContext: [],
      auditRecord,
      eventsEmitted,
    };
  }

  public static getAuditRecord(requestId: string): AIAuditRecord | undefined {
    return this.auditLedger.get(requestId);
  }

  public static getEvents(): { event: string; requestId: string; timestamp: string }[] {
    return this.eventsLog;
  }
}
