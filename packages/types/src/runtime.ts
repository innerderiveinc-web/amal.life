export type RuntimeState =
  | 'RECEIVED'
  | 'CLASSIFYING'
  | 'SAFETY_CHECK'
  | 'CONTEXT_SELECTING'
  | 'RETRIEVING'
  | 'VERIFYING_EVIDENCE'
  | 'REASONING'
  | 'PLANNING'
  | 'COMPOSING'
  | 'CITATION_AUDIT'
  | 'FINAL_SAFETY_CHECK'
  | 'COMPLETED'
  | 'NEEDS_CLARIFICATION'
  | 'EVIDENCE_INSUFFICIENT'
  | 'SCHOLAR_REQUIRED'
  | 'SAFETY_ESCALATION'
  | 'POLICY_BLOCKED'
  | 'TIMEOUT'
  | 'MODEL_FAILURE'
  | 'RETRIEVAL_FAILURE'
  | 'CITATION_FAILURE';

export interface AmalAIRequest {
  requestId: string;
  userId: string;
  sessionId: string;
  message: string;
  locale: string;
  timezone: string;
  surface: 'ASK_AMAL' | 'TODAY' | 'JOURNEY' | 'REFLECTION' | 'SEARCH' | 'SCHOLAR';
  journeyId?: string;
  goalId?: string;
  contextPolicy: {
    allowPersonalization: boolean;
    allowMemory: boolean;
    allowJourneyContext: boolean;
  };
  clientMetadata: {
    platform: string;
    appVersion: string;
  };
}

export type AmalIntentTaxonomy =
  | 'GENERAL_ISLAMIC_KNOWLEDGE'
  | 'QURAN_LOOKUP'
  | 'HADITH_LOOKUP'
  | 'TAFSIR_EXPLANATION'
  | 'DUA_REQUEST'
  | 'DHIKR_REQUEST'
  | 'SALAH_GUIDANCE'
  | 'FASTING_GUIDANCE'
  | 'ZAKAT_GUIDANCE'
  | 'AQEEDAH'
  | 'FIQH_GENERAL'
  | 'FIQH_PERSONALIZED'
  | 'SCHOLARLY_DISAGREEMENT'
  | 'PERSONAL_DEEN_GUIDANCE'
  | 'LIFE_SITUATION'
  | 'AMAL_REQUEST'
  | 'JOURNEY_REQUEST'
  | 'REFLECTION'
  | 'EMOTIONAL_SUPPORT'
  | 'NEW_MUSLIM_SUPPORT'
  | 'FAMILY_GUIDANCE'
  | 'MARRIAGE'
  | 'FINANCE'
  | 'MEDICAL_OR_HEALTH'
  | 'LEGAL'
  | 'CRISIS'
  | 'SCHOLAR_REQUEST'
  | 'OTHER';

export interface IntentContract {
  intent: AmalIntentTaxonomy;
  confidence: number;
  requires_evidence: boolean;
  requires_context: boolean;
  requires_scholar_check: boolean;
  requires_external_domain: boolean;
}

export interface SafetyPolicyObject {
  classification: 'A' | 'B' | 'C' | 'D' | 'E';
  risk_level: 'low' | 'medium' | 'high';
  allowed_modes: ResponseMode[];
  requires_evidence: boolean;
  requires_scholar: boolean;
  personalization_allowed: boolean;
  direct_ruling_allowed: boolean;
  escalation: {
    required: boolean;
    user_consent_required: boolean;
    crisis_intervention?: boolean;
  };
}

export type ResponseMode =
  | 'EDUCATIONAL'
  | 'EVIDENCE_EXPLAINER'
  | 'GENERAL_GUIDANCE'
  | 'PLURALITY'
  | 'PERSONALIZED_GUIDANCE'
  | 'AMAL_RECOMMENDATION'
  | 'JOURNEY_COACHING'
  | 'REFLECTION_SUPPORT'
  | 'SCHOLAR_ESCALATION'
  | 'SAFETY_ESCALATION'
  | 'CLARIFICATION';

export interface AmalTool {
  name: string;
  description: string;
  inputSchema: any;
  outputSchema: any;
  permissions: string[];
  requiresUserConsent: boolean;
  sideEffect: boolean;
  auditLevel: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface RuntimeEvidencePackItem {
  evidence_id: string;
  source_type: 'QURAN' | 'HADITH' | 'TAFSIR' | 'SCHOLARLY_POSITION';
  reference: string;
  passage_id: string;
  text: string;
  version_id: string;
  support_type: 'DIRECT_SUPPORT' | 'CONTEXTUAL' | 'ILLUSTRATIVE';
  verified: boolean;
}

export interface RuntimeEvidencePack {
  query: string;
  evidence: RuntimeEvidencePackItem[];
  scholarly_positions: {
    madhhab: string;
    position: string;
    scholars: string[];
  }[];
  limitations: string[];
  missing_information: string[];
}


export interface ClaimRecord {
  claim_id: string;
  text: string;
  type: 'ISLAMIC_FACT' | 'INTERPRETATION' | 'PERSONAL_GUIDANCE' | 'ACTION_RECOMMENDATION';
  evidence_ids: string[];
  support_level: 'DIRECT' | 'INDIRECT' | 'EXTRAPOLATED' | 'UNSUPPORTED';
  verified: boolean;
}

export interface EvidenceVerifierResult {
  verified_claims: ClaimRecord[];
  unsupported_claims: ClaimRecord[];
  citation_failures: string[];
  confidence: number;
}

export interface FeasibilityBreakdown {
  timeFit: number;
  energyFit: number;
  complexityFit: number;
  environmentFit: number;
  totalScore: number;
}

export type ModelRouterTier = 'FAST' | 'GENERAL' | 'REASONING' | 'SAFETY';

export interface ModelRoutingDecision {
  tier: ModelRouterTier;
  model: string;
  provider: string;
  reasoningBudgetTokens: number;
  temperature: number;
  timeoutMs: number;
}

export interface AgentExecution {
  taskId: string;
  requestId: string;
  agent:
    | 'ORCHESTRATOR'
    | 'INTENT'
    | 'SAFETY'
    | 'CONTEXT'
    | 'RETRIEVAL'
    | 'VERIFIER'
    | 'DEEN'
    | 'AMAL'
    | 'JOURNEY'
    | 'REFLECTION'
    | 'PERSONALIZATION'
    | 'SCHOLAR'
    | 'CITATION';
  input: unknown;
  output: unknown;
  evidenceIds: string[];
  confidence: number;
  policyVersion: string;
  modelVersion?: string;
  status: 'RUNNING' | 'COMPLETE' | 'FAILED' | 'BLOCKED';
}

export interface AIAuditRecord {
  request_id: string;
  trace_id: string;
  intent: AmalIntentTaxonomy;
  safety: {
    class: 'A' | 'B' | 'C' | 'D' | 'E';
    risk_level: 'low' | 'medium' | 'high';
  };
  context: {
    used: string[];
    excluded: string[];
  };
  evidence_snapshot: string;
  agents: string[];
  model: {
    provider: string;
    version: string;
  };
  policy_version: string;
  citation_verified: boolean;
  final_status: 'APPROVED' | 'BLOCKED' | 'ESCALATED' | 'REJECTED';
  cost_usd: number;
  latency_ms: number;
}
