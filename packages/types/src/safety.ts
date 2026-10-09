import { EvidencePackItem } from './evidence.js';

export type SafetyClass =
  | 'CLASS_A_GENERAL_EDUCATIONAL'
  | 'CLASS_B_GENERAL_GUIDANCE'
  | 'CLASS_C_SCHOLARLY_DISAGREEMENT'
  | 'CLASS_D_PERSONALIZED_RULING'
  | 'CLASS_E_HIGH_RISK_SITUATION'
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E';

export const SafetyClass = {
  A: 'A',
  B: 'B',
  C: 'C',
  D: 'D',
  E: 'E',
  CLASS_A_GENERAL_EDUCATIONAL: 'CLASS_A_GENERAL_EDUCATIONAL',
  CLASS_B_GENERAL_GUIDANCE: 'CLASS_B_GENERAL_GUIDANCE',
  CLASS_C_SCHOLARLY_DISAGREEMENT: 'CLASS_C_SCHOLARLY_DISAGREEMENT',
  CLASS_D_PERSONALIZED_RULING: 'CLASS_D_PERSONALIZED_RULING',
  CLASS_E_HIGH_RISK_SITUATION: 'CLASS_E_HIGH_RISK_SITUATION',
} as const;

export interface SafetyClassificationResult {
  safetyClass: SafetyClass;
  confidence: number;
  reasoning: string;
  detectedTriggers: string[];
  requiresScholarEscalation: boolean;
  requiresCrisisIntervention: boolean;
  crisisHelplines?: { name: string; contact: string }[];
}

export type AnswerType =
  | 'EDUCATIONAL'
  | 'PRACTICAL_GUIDANCE'
  | 'SCHOLARLY_DIVERSITY'
  | 'ESCALATION_REQUIRED'
  | 'CRISIS_SUPPORT';

export interface CitationReference {
  passageId: string;
  sourceReference: string; // e.g. "Quran 2:286"
  quotedText?: string;
  verificationPassed: boolean;
  notes?: string;
}

export interface ProposedAmalAction {
  title: string;
  description: string;
  estimatedMinutes: number;
  category: 'WORSHIP' | 'CHARACTER' | 'HABIT' | 'REFLECTION' | 'KNOWLEDGE' | 'FAMILY';
  evidenceReference: string;
  feasibilityScore: number;
}

export interface AIResponseContract {
  intent: string;
  answer: string;
  type: AnswerType;
  sources: EvidencePackItem[];
  interpretation: string;
  actions: ProposedAmalAction[];
  uncertainty: 'LOW' | 'MEDIUM' | 'HIGH';
  scholar_required: boolean;
  citations_verified: boolean;
  citationAuditLog?: CitationReference[];
  disclaimer: string;
}

export interface RedTeamTestCase {
  id: string;
  category:
    | 'FATWA_ROLEPLAY'
    | 'FABRICATED_HADITH'
    | 'FABRICATED_CITATION'
    | 'PROMPT_INJECTION'
    | 'SECTARIAN_PROVOCATION'
    | 'FAMILY_PRIVACY_LEAK'
    | 'EMERGENCY_OVERRIDE'
    | 'PERSONAL_DIVORCE_RULING';
  prompt: string;
  expectedClass: SafetyClass;
  expectedScholarRequired: boolean;
  mustRejectClaims: string[];
}
