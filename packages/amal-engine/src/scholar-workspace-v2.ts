/**
 * AMAL OS V3.0 — Scholar OS & Professional Workspace Engine V2
 * Triage, routing, SLA tracking, Two-Scholar Rule, Disagreement Plurality, and Knowledge Governance.
 */

import {
  ScholarAppealV2,
  ScholarCaseStatus,
  ScholarCaseV2,
  ScholarDisagreementIssue,
  ScholarExpertiseGraph,
  ScholarKnowledgeProposal,
  ScholarProfileV2
} from '@amal/types';

export class ScholarWorkspaceEngineV2 {
  private scholars: Map<string, ScholarProfileV2> = new Map();
  private expertiseGraphs: Map<string, ScholarExpertiseGraph> = new Map();
  private cases: Map<string, ScholarCaseV2> = new Map();
  private disagreements: Map<string, ScholarDisagreementIssue> = new Map();
  private appeals: Map<string, ScholarAppealV2> = new Map();
  private knowledgeProposals: Map<string, ScholarKnowledgeProposal> = new Map();

  constructor() {
    this.seedScholars();
    this.seedDisagreements();
  }

  private seedScholars(): void {
    const s1: ScholarProfileV2 = {
      scholarId: 'sch_mufti_tariq',
      name: 'Mufti Tariq Al-Azhari',
      credentials: ['Al-Azhar University, Faculty of Shariah & Law', 'Ijazah in Usul al-Fiqh'],
      jurisprudentialScope: ['Hanafi', 'General Fiqh', 'Islamic Commercial Law'],
      languages: ['ar', 'en', 'ur'],
      verified: true,
      twoPersonReviewCertified: true,
      ratingHiddenByPolicy: true
    };

    const s2: ScholarProfileV2 = {
      scholarId: 'sch_dr_maryam',
      name: 'Dr. Maryam Al-Dimashqi',
      credentials: ['PhD in Hadith Studies, Islamic University of Madinah', 'Ijazah in Sahih al-Bukhari & Muslim'],
      jurisprudentialScope: ['Shafi\'i', 'Hadith Verification', 'Family & Personal Status Fiqh'],
      languages: ['ar', 'en'],
      verified: true,
      twoPersonReviewCertified: true,
      ratingHiddenByPolicy: true
    };

    this.scholars.set(s1.scholarId, s1);
    this.scholars.set(s2.scholarId, s2);

    this.expertiseGraphs.set(s1.scholarId, {
      scholarId: s1.scholarId,
      expertiseAreas: ['COMMERCIAL_LAW', 'ZAKAT', 'TRANSACTIONS'],
      approvedReviewPermissions: ['PRIMARY_AUTHOR', 'SECONDARY_REVIEWER'],
      languageCodes: ['ar', 'en', 'ur'],
      jurisprudentialScope: ['Hanafi', 'General Fiqh']
    });

    this.expertiseGraphs.set(s2.scholarId, {
      scholarId: s2.scholarId,
      expertiseAreas: ['HADITH_AUTHENTICATION', 'FAMILY_FIQH', 'FASTING_RULES'],
      approvedReviewPermissions: ['PRIMARY_AUTHOR', 'SECONDARY_REVIEWER'],
      languageCodes: ['ar', 'en'],
      jurisprudentialScope: ['Shafi\'i', 'General Fiqh']
    });
  }

  private seedDisagreements(): void {
    const issue: ScholarDisagreementIssue = {
      issueId: 'iss_zakat_retirement_401k',
      topic: 'Zakat liability on tax-deferred retirement accounts (401k/IRA)',
      positions: [
        {
          scholarId: 'sch_mufti_tariq',
          positionName: 'Net Accessible Wealth Principle',
          legalSchool: 'Contemporary Hanafi Resolution',
          evidenceIds: ['QURAN_9_103', 'BUKHARI_1400'],
          conditions: ['Deduct early withdrawal tax and penalty prior to computing 2.5%']
        },
        {
          scholarId: 'sch_dr_maryam',
          positionName: 'Underlying Asset Allocation Method',
          legalSchool: 'Contemporary Majority Resolution (AAOIFI)',
          evidenceIds: ['QURAN_2_267', 'MUSLIM_979'],
          conditions: ['Calculate Zakat solely upon zakatable assets (cash, equities) held inside the portfolio']
        }
      ],
      consensusReached: false,
      guidanceNote: 'Valid scholarly diversity exists across reputable contemporary juristic academies. Seekers may follow their trusted local mufti without condemnation.'
    };
    this.disagreements.set(issue.issueId, issue);
  }

  public getScholarProfile(scholarId: string): ScholarProfileV2 | undefined {
    return this.scholars.get(scholarId);
  }

  public createCase(params: {
    userId: string;
    tenantId: string;
    category: string;
    urgency?: 'ROUTINE' | 'ELEVATED' | 'CRITICAL';
    userQuestion: string;
    evidenceRefIds?: string[];
  }): ScholarCaseV2 {
    const caseId = `case_v2_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const scholarCase: ScholarCaseV2 = {
      caseId,
      userId: params.userId,
      tenantId: params.tenantId,
      category: params.category,
      urgency: params.urgency || 'ROUTINE',
      status: 'QUEUED',
      evidenceRefIds: params.evidenceRefIds || [],
      userQuestion: params.userQuestion,
      slaTargetHours: params.urgency === 'CRITICAL' ? 12 : params.urgency === 'ELEVATED' ? 24 : 48,
      createdAt: new Date().toISOString()
    };
    this.cases.set(caseId, scholarCase);
    return scholarCase;
  }

  public assignCase(caseId: string, primaryScholarId: string, secondaryScholarId?: string): ScholarCaseV2 {
    const c = this.cases.get(caseId);
    if (!c) throw new Error(`CASE_NOT_FOUND: Case ${caseId} does not exist.`);

    if (secondaryScholarId && primaryScholarId === secondaryScholarId) {
      throw new Error('INV_07_VIOLATION: Primary author and secondary reviewer must be distinct jurists (Two-Scholar Rule).');
    }

    c.assignedScholarId = primaryScholarId;
    c.secondaryScholarId = secondaryScholarId;
    c.status = 'ASSIGNED';
    c.firstReviewedAt = new Date().toISOString();
    return c;
  }

  public submitResponseWithTwoScholarRule(params: {
    caseId: string;
    primaryScholarId: string;
    secondaryScholarId: string;
    responseContent: string;
  }): ScholarCaseV2 {
    const c = this.cases.get(params.caseId);
    if (!c) throw new Error(`CASE_NOT_FOUND: Case ${params.caseId} does not exist.`);

    if (params.primaryScholarId === params.secondaryScholarId) {
      throw new Error('INV_07_VIOLATION: Single scholar cannot self-concur. Two distinct accredited jurists are required.');
    }

    const s1 = this.scholars.get(params.primaryScholarId);
    const s2 = this.scholars.get(params.secondaryScholarId);
    if (!s1 || !s2 || !s1.verified || !s2.verified) {
      throw new Error('UNACCREDITED_SCHOLAR: Both jurists must be verified and certified on the AMAL Scholar Platform.');
    }

    c.assignedScholarId = params.primaryScholarId;
    c.secondaryScholarId = params.secondaryScholarId;
    c.scholarResponse = params.responseContent;
    c.status = 'RESPONDED';
    c.respondedAt = new Date().toISOString();
    return c;
  }

  public getDisagreementIssue(issueId: string): ScholarDisagreementIssue | undefined {
    return this.disagreements.get(issueId);
  }

  public submitAppeal(params: {
    caseId: string;
    userId: string;
    reason: string;
    newSecondaryScholarId: string;
  }): ScholarAppealV2 {
    const c = this.cases.get(params.caseId);
    if (!c) throw new Error(`CASE_NOT_FOUND: Case ${params.caseId} does not exist.`);
    if (c.userId !== params.userId) {
      throw new Error('PERMISSION_DENIED: Seeker can only appeal their own case.');
    }

    const appealId = `appeal_${Date.now()}`;
    const appeal: ScholarAppealV2 = {
      appealId,
      caseId: params.caseId,
      userId: params.userId,
      reason: params.reason,
      secondaryScholarId: params.newSecondaryScholarId,
      status: 'SUBMITTED'
    };
    this.appeals.set(appealId, appeal);
    c.status = 'APPEALED';
    return appeal;
  }

  public submitKnowledgeProposal(params: {
    scholarId: string;
    proposalType: 'SOURCE' | 'CLAIM' | 'INTERPRETATION' | 'CORRECTION';
    content: Record<string, unknown>;
  }): ScholarKnowledgeProposal {
    const s = this.scholars.get(params.scholarId);
    if (!s || !s.verified) {
      throw new Error('UNAUTHORIZED_PROPOSAL: Only verified scholars can submit proposals to the Knowledge Governance Council.');
    }

    const proposalId = `prop_${Date.now()}`;
    // Section 13 Invariant: Scholar Submission != Automatically Published Knowledge
    const proposal: ScholarKnowledgeProposal = {
      proposalId,
      scholarId: params.scholarId,
      proposalType: params.proposalType,
      content: params.content,
      governanceStatus: 'IN_GOVERNANCE', // Staged into governance pipeline, not auto-published
      submittedAt: new Date().toISOString()
    };
    this.knowledgeProposals.set(proposalId, proposal);
    return proposal;
  }

  public getKnowledgeProposal(proposalId: string): ScholarKnowledgeProposal | undefined {
    return this.knowledgeProposals.get(proposalId);
  }
}
