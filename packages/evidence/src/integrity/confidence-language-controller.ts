// ==============================================================================
// AMAL OS — CONFIDENCE LANGUAGE CONTROLLER (Control #23 & #29)
// Enforces that response framing is strictly proportional to evidence support level.
// ==============================================================================

import { ClaimSupportLevel } from '@amal/types';

export type FramingMode =
  | 'DIRECT_REVELATION'
  | 'SCHOLARLY_INTERPRETATION'
  | 'SCHOLARLY_PLURALITY'
  | 'GOVERNED_UNCERTAINTY'
  | 'SCHOLAR_ESCALATION';

export interface FramingPolicy {
  supportLevel: ClaimSupportLevel;
  authorizedLeadPhrase: string;
  forbiddenLeadPhrases: string[];
  maxConfidenceLabel: 'DEFINITIVE' | 'QUALIFIED_INTERPRETATION' | 'DIVERGENT' | 'UNVERIFIED';
}

export class ConfidenceLanguageController {
  private static readonly POLICIES: Record<FramingMode, FramingPolicy> = {
    DIRECT_REVELATION: {
      supportLevel: 'DIRECT',
      authorizedLeadPhrase: 'The Holy Quran states:',
      forbiddenLeadPhrases: ['In my personal opinion', 'Scholars might say', 'Probably'],
      maxConfidenceLabel: 'DEFINITIVE',
    },
    SCHOLARLY_INTERPRETATION: {
      supportLevel: 'STRONG_INFERENCE',
      authorizedLeadPhrase: 'Classical scholars and commentators explain that:',
      forbiddenLeadPhrases: ['Allah explicitly commands', 'This is an immutable verse'],
      maxConfidenceLabel: 'QUALIFIED_INTERPRETATION',
    },
    SCHOLARLY_PLURALITY: {
      supportLevel: 'CONTESTED',
      authorizedLeadPhrase: 'Recognized jurists hold differing valid positions on this matter:',
      forbiddenLeadPhrases: ['All scholars unanimously agree', 'There is only one correct answer', 'Islam says'],
      maxConfidenceLabel: 'DIVERGENT',
    },
    GOVERNED_UNCERTAINTY: {
      supportLevel: 'UNSUPPORTED',
      authorizedLeadPhrase: 'I could not verify sufficient evidence from approved canonical sources for this matter.',
      forbiddenLeadPhrases: ['I assume', 'It is likely that', 'Most people believe'],
      maxConfidenceLabel: 'UNVERIFIED',
    },
    SCHOLAR_ESCALATION: {
      supportLevel: 'CONTESTED',
      authorizedLeadPhrase: 'This personalized matter requires direct guidance from a qualified Islamic scholar.',
      forbiddenLeadPhrases: ['Here is your fatwa', 'The final ruling for your life is'],
      maxConfidenceLabel: 'DIVERGENT',
    },
  };

  /**
   * Determine authorized framing based on evidence support level
   */
  public static getFramingPolicy(supportLevel: ClaimSupportLevel, isContested: boolean = false): FramingPolicy {
    if (supportLevel === 'UNSUPPORTED') {
      return this.POLICIES.GOVERNED_UNCERTAINTY;
    }
    if (isContested || supportLevel === 'CONTESTED') {
      return this.POLICIES.SCHOLARLY_PLURALITY;
    }
    if (supportLevel === 'INTERPRETIVE' || supportLevel === 'STRONG_INFERENCE') {
      return this.POLICIES.SCHOLARLY_INTERPRETATION;
    }
    return this.POLICIES.DIRECT_REVELATION;
  }

  /**
   * Validate that candidate output does not violate forbidden certainty framing
   */
  public static validateFraming(text: string, supportLevel: ClaimSupportLevel): {
    valid: boolean;
    violations: string[];
  } {
    const policy = this.getFramingPolicy(supportLevel);
    const violations: string[] = [];
    const textLower = text.toLowerCase();

    for (const forbidden of policy.forbiddenLeadPhrases) {
      if (textLower.includes(forbidden.toLowerCase())) {
        violations.push(
          `CERTAINTY_FRAMING_MISMATCH: Text uses forbidden phrase "${forbidden}" for support level ${supportLevel}.`
        );
      }
    }

    return {
      valid: violations.length === 0,
      violations,
    };
  }
}
