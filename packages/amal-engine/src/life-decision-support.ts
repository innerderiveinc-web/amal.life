/**
 * AMAL OS — V2.0: LIFE DECISION SUPPORT ENGINE
 * Sections 34–36, 73–74: Helps seekers weigh options, constraints, and trade-offs.
 * STRICT INVARIANT: AI cannot autonomously decide marriage, divorce, religious rulings,
 * investments, medical diagnoses, or legal contracts.
 */

import { LifeDecisionRecord, EpistemicallyLabeledItem, LifeDomain } from '@amal/types';

export class LifeDecisionSupportEngine {
  private static decisionsStore = new Map<string, LifeDecisionRecord[]>();

  private static readonly RESTRICTED_DECISION_DOMAINS = [
    'MARRIAGE_CONTRACT',
    'DIVORCE_VERDICT',
    'LEGAL_LITIGATION',
    'MEDICAL_DIAGNOSIS',
    'FINANCIAL_ARBITRAGE',
  ];

  /**
   * Asserts that the system does not attempt an autonomous binding life ruling.
   */
  public static assertAutonomousDecisionRestricted(domainOrAction: string): void {
    if (this.RESTRICTED_DECISION_DOMAINS.includes(domainOrAction.toUpperCase())) {
      throw new Error(`AUTONOMOUS_DECISION_BLOCKED: AI is strictly prohibited from executing binding decisions in ${domainOrAction}. Expert escalation required.`);
    }
  }

  /**
   * Creates a structured decision evaluation record with transparent trade-offs.
   */
  public static createDecisionDraft(
    userId: string,
    question: string,
    category: LifeDomain,
    options: { title: string; pros: string[]; cons: string[]; tradeOffs: string[]; epistemicNotes?: string }[],
    constraints: string[],
    evidence: EpistemicallyLabeledItem[] = []
  ): LifeDecisionRecord {
    const decisionId = `dec_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;

    // Check if domain requires human escalation (e.g. divorce or legal dispute)
    const requiresEscalation = question.toLowerCase().includes('talaq') || question.toLowerCase().includes('divorce') || question.toLowerCase().includes('lawsuit');

    const record: LifeDecisionRecord = {
      decisionId,
      userId,
      question,
      category,
      options: options.map((opt, idx) => ({
        optionId: `opt_${idx + 1}`,
        ...opt,
      })),
      constraints,
      relevantEvidence: evidence,
      escalatedToExpert: requiresEscalation,
      expertType: requiresEscalation ? 'SCHOLAR' : undefined,
      status: 'DRAFT',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const userDecisions = this.decisionsStore.get(userId) || [];
    userDecisions.push(record);
    this.decisionsStore.set(userId, userDecisions);

    return record;
  }

  /**
   * Records user choice and reflection.
   */
  public static recordUserChoice(
    userId: string,
    decisionId: string,
    chosenOptionId: string,
    reflectionNotes?: string
  ): LifeDecisionRecord {
    const userDecisions = this.decisionsStore.get(userId) || [];
    const dec = userDecisions.find((d) => d.decisionId === decisionId);
    if (!dec) {
      throw new Error(`Decision record ${decisionId} not found.`);
    }

    dec.userChoice = chosenOptionId;
    dec.reflection = reflectionNotes;
    dec.status = 'DECIDED';
    dec.updatedAt = new Date().toISOString();

    return dec;
  }

  public static getDecisions(userId: string): LifeDecisionRecord[] {
    return this.decisionsStore.get(userId) || [];
  }
}
