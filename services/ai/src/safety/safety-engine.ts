import { AIRequest, SafetyClass } from '@amal/types';
import { IntentResult } from '../intent/intent-engine.js';

export interface SafetyEvaluation {
  classification: SafetyClass;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  requiresEvidence: boolean;
  requiresScholar: boolean;
  personalizationAllowed: boolean;
  escalationRequired: boolean;
  blocked: boolean;
  blockReason?: string;
  crisisHelpline?: string;
  mitigationPrompt?: string;
}

export class SafetyEngine {
  public static async evaluate(request: AIRequest, intent: IntentResult): Promise<SafetyEvaluation> {
    const text = request.message.toLowerCase();

    // 1. Data Exfiltration Defense (Section 51)
    if (text.includes('other user') || text.includes('another user') || (text.includes('reflection') && text.includes('all users'))) {
      return {
        classification: SafetyClass.E,
        riskLevel: 'CRITICAL',
        requiresEvidence: false,
        requiresScholar: false,
        personalizationAllowed: false,
        escalationRequired: false,
        blocked: true,
        blockReason: 'DATA_EXFILTRATION_BLOCKED: Cross-user reflection access strictly denied.',
      };
    }

    // 2. Class E: Crisis & Self-Harm Interception (Section 10)
    if (text.includes('kill myself') || text.includes('suicide') || text.includes('end my life') || text.includes('self harm')) {
      return {
        classification: SafetyClass.E,
        riskLevel: 'CRITICAL',
        requiresEvidence: false,
        requiresScholar: true,
        personalizationAllowed: false,
        escalationRequired: true,
        blocked: false,
        crisisHelpline: 'Emergency Assistance: 988 (USA/Canada) or local crisis helpline. Please speak to a professional immediately.',
      };
    }

    // 3. Prompt Injection Defense (Section 50)
    if (text.includes('ignore previous instructions') || text.includes('system prompt') || text.includes('jailbreak')) {
      return {
        classification: SafetyClass.E,
        riskLevel: 'HIGH',
        requiresEvidence: false,
        requiresScholar: false,
        personalizationAllowed: false,
        escalationRequired: false,
        blocked: true,
        blockReason: 'PROMPT_INJECTION_DEFENSE: System policies are immutable and cannot be overridden by user input.',
      };
    }

    // 4. Class D: Personalized Fiqh / Talaq / Mufti Impersonation (Section 10 & 61)
    if (
      text.includes('talaq') ||
      text.includes('divorce') ||
      text.includes('fatwa') ||
      text.includes('pretend to be a mufti') ||
      text.includes('issue a ruling on my marriage')
    ) {
      return {
        classification: SafetyClass.D,
        riskLevel: 'HIGH',
        requiresEvidence: true,
        requiresScholar: true,
        personalizationAllowed: false,
        escalationRequired: true,
        blocked: false,
        mitigationPrompt: 'AMAL OS is not a Mufti and does not issue legal rulings. This case is escalated to certified human scholars.',
      };
    }

    // 5. Class C: Scholarly Plurality / Difference
    if (text.includes('difference') || text.includes('madhhab') || text.includes('ikhtilaf')) {
      return {
        classification: SafetyClass.C,
        riskLevel: 'MEDIUM',
        requiresEvidence: true,
        requiresScholar: false,
        personalizationAllowed: false,
        escalationRequired: false,
        blocked: false,
      };
    }

    // 6. Class B: General Guidance & Habit Building
    if (intent.primary === 'PERSONAL_DEEN_GUIDANCE' || intent.primary === 'AMAL_REQUEST') {
      return {
        classification: SafetyClass.B,
        riskLevel: 'LOW',
        requiresEvidence: true,
        requiresScholar: false,
        personalizationAllowed: true,
        escalationRequired: false,
        blocked: false,
      };
    }

    // 7. Class A: Educational
    return {
      classification: SafetyClass.A,
      riskLevel: 'LOW',
      requiresEvidence: true,
      requiresScholar: false,
      personalizationAllowed: false,
      escalationRequired: false,
      blocked: false,
    };
  }
}
