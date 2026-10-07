import {
  AIIntent,
  SafetyClass,
  AmalType,
  JourneyState,
} from './enums/index.js';

export interface ContextPolicy {
  allowPersonalization: boolean;
  allowMemory: boolean;
  allowJourneyContext: boolean;
  allowBehavioralContext?: boolean;
}

export interface AIRequest {
  requestId: string;
  userId: string;
  sessionId: string;
  message: string;
  locale: string;
  timezone: string;
  surface: 'ASK_AMAL' | 'TODAY' | 'JOURNEY' | 'REFLECTION' | 'SEARCH' | 'SCHOLAR';
  contextPolicy: ContextPolicy;
  journeyId?: string;
  goalId?: string;
}

export interface IntentResult {
  intent: AIIntent;
  confidence: number;
  requiresEvidence: boolean;
  requiresContext: boolean;
  requiresScholar: boolean;
  clarificationRequired: boolean;
}

export interface SafetyResult {
  classification: SafetyClass;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  allowedModes: string[];
  requiresEvidence: boolean;
  requiresScholar: boolean;
  personalizationAllowed: boolean;
  escalationRequired: boolean;
  blocked: boolean;
  reasons: string[];
}

export interface ContextItem {
  id: string;
  type: 'EXPLICIT' | 'CONFIRMED' | 'BEHAVIORAL' | 'DERIVED';
  key: string;
  value: unknown;
  confidence: number;
  userConfirmed: boolean;
  sensitivity: 'NORMAL' | 'PRIVATE' | 'SENSITIVE';
  expiresAt?: Date;
}

export interface EvidenceItem {
  evidenceId: string;
  sourceId: string;
  sourceVersionId: string;
  passageId: string;
  sourceType: string;
  reference?: string;
  text: string;
  supportType:
    | 'DIRECT_SUPPORT'
    | 'GENERAL_SUPPORT'
    | 'QUALIFICATION'
    | 'CONTEXT'
    | 'COUNTER_ARGUMENT'
    | 'INTERPRETATION'
    | 'DERIVATION';
  verified: boolean;
  provenance: {
    licenseValid: boolean;
    reviewApproved: boolean;
    published: boolean;
  };
}

export interface ScholarlyPosition {
  id: string;
  issueId: string;
  scholarId?: string;
  madhhabId?: string;
  position: string;
  conditions?: string[];
  evidenceIds: string[];
  status: 'APPROVED' | 'CONTESTED';
}

export interface EvidencePack {
  query: string;
  evidence: EvidenceItem[];
  scholarlyPositions: ScholarlyPosition[];
  missingInformation: string[];
  limitations: string[];
}

export interface ActionDefinition {
  instruction: string;
  durationMinutes?: number;
  frequency?: string;
  conditions?: string[];
}

export interface Amal {
  id: string;
  type: AmalType;
  title: string;
  description: string;
  minimumAction: ActionDefinition;
  targetAction?: ActionDefinition;
  durationMinutes?: number;
  frequency?: string;
  evidenceIds: string[];
  governanceStatus: 'APPROVED' | 'DRAFT';
}

export interface AmalRecommendation {
  amalId: string;
  score: number;
  factors: {
    evidenceFit: number;
    goalFit: number;
    contextFit: number;
    feasibility: number;
    preferenceFit: number;
    continuity: number;
    safety: number;
  };
  reasonCodes: string[];
  evidenceIds: string[];
}

export interface Journey {
  id: string;
  goalId: string;
  title: string;
  state: JourneyState;
  templateId: string;
  templateVersionId: string;
  currentPhase: number;
  startedAt?: Date;
  completedAt?: Date;
}

export interface AgentResult<T> {
  taskId: string;
  agent:
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
  status: 'COMPLETE' | 'FAILED' | 'BLOCKED';
  output: T;
  evidenceIds: string[];
  confidence: number;
  modelVersion?: string;
  policyVersion: string;
}

export interface AnswerSection {
  title?: string;
  content: string;
  evidenceId?: string;
}

export interface AnswerAction {
  title: string;
  durationMinutes: number;
  evidenceReference?: string;
}

export interface Citation {
  reference: string;
  verified: boolean;
  sourceType: string;
}

export interface AIResponse {
  responseId: string;
  status: 'COMPLETED' | 'BLOCKED' | 'ESCALATED' | 'INSUFFICIENT_EVIDENCE';
  intent: IntentResult;
  safety: SafetyResult;
  answer: {
    evidence: AnswerSection[];
    interpretation: AnswerSection[];
    personalGuidance: AnswerSection[];
    actions: AnswerAction[];
  };
  citations: Citation[];
  personalization: {
    usedContextIds: string[];
    confidence: number;
  };
  journey?: {
    recommended: boolean;
    journeyId?: string;
  };
  audit: {
    citationVerified: boolean;
    safetyVerified: boolean;
  };
}

export interface DomainEvent<T = unknown> {
  id: string;
  type: string;
  aggregateId: string;
  userId?: string;
  payload: T;
  occurredAt: Date;
  version: number;
}
