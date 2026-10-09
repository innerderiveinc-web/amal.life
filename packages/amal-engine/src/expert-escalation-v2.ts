/**
 * AMAL OS — V2.0: EXPERT ESCALATION FRAMEWORK V2
 * Sections 37–39, 75–76: Governs verified external human experts beyond scholars.
 * Strict authority separation: A finance expert is not a scholar; a counselor is not a mufti.
 */

import {
  ExpertProfile,
  ExpertConsultationCase,
  LifeDomain,
} from '@amal/types';

export class ExpertEscalationFrameworkV2 {
  private static registeredExperts = new Map<string, ExpertProfile>();
  private static consultationCases = new Map<string, ExpertConsultationCase>();

  static {
    // Seed verified expert profiles
    this.registerExpert({
      expertId: 'exp_scholar_hanafi_01',
      fullName: 'Shaykh Dr. Farooq Al-Azhari',
      expertType: 'SCHOLAR',
      credentials: ['PhD in Usul al-Fiqh (Al-Azhar)', 'Ijazah in Hadith Canon'],
      accreditationBody: 'International Islamic Fiqh Academy',
      verified: true,
      activeCasesCount: 2,
    });

    this.registerExpert({
      expertId: 'exp_finance_shariah_01',
      fullName: 'Tariq Al-Mansoor, CFA, CSAA',
      expertType: 'FINANCE_EXPERT',
      credentials: ['Certified Shariah Advisor and Auditor (AAOIFI)', 'Chartered Financial Analyst'],
      accreditationBody: 'AAOIFI Accounting and Auditing Organization',
      verified: true,
      activeCasesCount: 1,
    });

    this.registerExpert({
      expertId: 'exp_family_counselor_01',
      fullName: 'Dr. Amina Siddiqui, LMFT',
      expertType: 'COUNSELOR',
      credentials: ['Licensed Marriage and Family Therapist', 'Certified Islamic Pastoral Counselor'],
      accreditationBody: 'Association of Muslim Family Therapists',
      verified: true,
      activeCasesCount: 0,
    });
  }

  public static registerExpert(expert: ExpertProfile): void {
    this.registeredExperts.set(expert.expertId, expert);
  }

  public static getExpert(expertId: string): ExpertProfile | undefined {
    return this.registeredExperts.get(expertId);
  }

  public static listExperts(type?: string): ExpertProfile[] {
    const all = Array.from(this.registeredExperts.values());
    if (type) {
      return all.filter((e) => e.expertType.toUpperCase() === type.toUpperCase());
    }
    return all;
  }

  /**
   * Asserts authority scope: Prevents cross-domain overreach.
   */
  public static assertExpertAuthorityScope(expertType: string, requestedAction: string): void {
    if (expertType === 'FINANCE_EXPERT' && requestedAction.toUpperCase().includes('FATWA')) {
      throw new Error('EXPERT_AUTHORITY_VIOLATION: Finance experts are not authorized to issue religious fatwas.');
    }
    if (expertType === 'COUNSELOR' && requestedAction.toUpperCase().includes('CANONICAL_GRADING')) {
      throw new Error('EXPERT_AUTHORITY_VIOLATION: Counselors cannot certify Hadith canonical authenticity.');
    }
  }

  /**
   * Submits a new consultation case with minimized context.
   */
  public static submitCase(
    userId: string,
    expertType: 'SCHOLAR' | 'FINANCE_EXPERT' | 'LEGAL_EXPERT',
    domain: LifeDomain,
    question: string,
    anonymizedContext: Record<string, any>
  ): ExpertConsultationCase {
    const caseId = `case_${expertType.toLowerCase()}_${Date.now()}`;
    const newCase: ExpertConsultationCase = {
      caseId,
      userId,
      expertType,
      domain,
      question,
      anonymizedContext,
      status: 'SUBMITTED',
      createdAt: new Date().toISOString(),
    };

    this.consultationCases.set(caseId, newCase);
    return newCase;
  }

  public static getCase(caseId: string): ExpertConsultationCase | undefined {
    return this.consultationCases.get(caseId);
  }
}
