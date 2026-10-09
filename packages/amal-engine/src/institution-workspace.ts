/**
 * AMAL OS V3.0 — Institution OS Workspace Engine
 * Mosque, Islamic School, and Community Program management with aggregate-only analytics and content boundary guards.
 */

import { InstitutionAggregateAnalytics, EcosystemInstitutionProgram } from '@amal/types';

export class InstitutionWorkspaceEngine {
  private programs: Map<string, EcosystemInstitutionProgram> = new Map();
  private enrollments: Map<string, Set<string>> = new Map(); // programId -> Set<userId>
  private completions: Map<string, Set<string>> = new Map(); // programId -> Set<userId>

  constructor() {
    this.seedPrograms();
  }

  private seedPrograms(): void {
    const p1: EcosystemInstitutionProgram = {
      programId: 'prog_ramadan_intensive_2026',
      institutionTenantId: 'tnt_mosque_central',
      title: 'Community Ramadan Quran & Tafsir Intensive',
      domain: 'RAMADAN',
      description: 'Daily community tracking of Juz reflection and collective Iftar coordination.',
      contentClassification: 'INSTITUTIONAL_CONTENT',
      enrolledUserIds: ['usr_seeker_101', 'usr_parent_head'],
      status: 'ACTIVE',
      createdAt: new Date().toISOString()
    };

    const p2: EcosystemInstitutionProgram = {
      programId: 'prog_youth_seerah_andalus',
      institutionTenantId: 'tnt_school_andalus',
      title: 'Youth Seerah & Akhlaq Foundation',
      domain: 'CHARACTER',
      description: 'Weekly interactive modules on the noble character of Prophet Muhammad (ﷺ).',
      contentClassification: 'INSTITUTIONAL_CONTENT',
      enrolledUserIds: ['usr_child_teen'],
      status: 'ACTIVE',
      createdAt: new Date().toISOString()
    };

    this.programs.set(p1.programId, p1);
    this.programs.set(p2.programId, p2);

    this.enrollments.set(p1.programId, new Set(p1.enrolledUserIds));
    this.enrollments.set(p2.programId, new Set(p2.enrolledUserIds));

    this.completions.set(p1.programId, new Set(['usr_seeker_101']));
    this.completions.set(p2.programId, new Set());
  }

  public createProgram(params: {
    institutionTenantId: string;
    title: string;
    domain: string;
    description: string;
  }): EcosystemInstitutionProgram {
    const programId = `prog_${Date.now()}`;
    const program: EcosystemInstitutionProgram = {
      programId,
      institutionTenantId: params.institutionTenantId,
      title: params.title,
      domain: params.domain,
      description: params.description,
      contentClassification: 'INSTITUTIONAL_CONTENT', // Section 23: NEVER automatic ISLAMIC_AUTHORITY
      enrolledUserIds: [],
      status: 'ACTIVE',
      createdAt: new Date().toISOString()
    };
    this.programs.set(programId, program);
    this.enrollments.set(programId, new Set());
    this.completions.set(programId, new Set());
    return program;
  }

  public enrollUser(programId: string, userId: string): void {
    const p = this.programs.get(programId);
    if (!p) throw new Error(`PROGRAM_NOT_FOUND: Program ${programId} does not exist.`);
    const set = this.enrollments.get(programId) || new Set();
    set.add(userId);
    this.enrollments.set(programId, set);
    p.enrolledUserIds = Array.from(set);
  }

  public recordCompletion(programId: string, userId: string): void {
    const p = this.programs.get(programId);
    if (!p) throw new Error(`PROGRAM_NOT_FOUND: Program ${programId} does not exist.`);
    const set = this.completions.get(programId) || new Set();
    set.add(userId);
    this.completions.set(programId, set);
  }

  public getAggregateAnalytics(institutionTenantId: string, programId: string): InstitutionAggregateAnalytics {
    const p = this.programs.get(programId);
    if (!p || p.institutionTenantId !== institutionTenantId) {
      throw new Error(`PROGRAM_NOT_FOUND: Program ${programId} does not belong to institution ${institutionTenantId}.`);
    }

    const enrolled = this.enrollments.get(programId)?.size || 0;
    const completed = this.completions.get(programId)?.size || 0;
    const rate = enrolled > 0 ? Number((completed / enrolled).toFixed(2)) : 0;

    return {
      institutionTenantId,
      programId,
      enrolledCount: enrolled,
      completedCount: completed,
      aggregateCompletionRate: rate,
      individualReligiousTrackingDisabled: true
    };
  }

  public assertInstitutionPrivacyBoundary(requestorRole: string, targetResource: string): void {
    // Section 24: Institution admins cannot access private reflections, AI conversations, or memory
    const prohibited = [
      'PRIVATE_REFLECTION',
      'PRIVATE_AI_CONVERSATION',
      'PERSONAL_LIFE_GRAPH',
      'INDIVIDUAL_PIETY_SCORE'
    ];

    if (prohibited.includes(targetResource)) {
      throw new Error(
        `INSTITUTION_PRIVACY_VIOLATION: Institution role ${requestorRole} cannot access individual ${targetResource}. Only aggregate program analytics are permitted.`
      );
    }
  }

  public assertContentEpistemicBoundary(contentClassification: string): void {
    // Section 23: Institution-created content must NOT automatically become ISLAMIC_AUTHORITY
    if (contentClassification === 'ISLAMIC_AUTHORITY') {
      throw new Error(
        'EPISTEMIC_AUTHORITY_VIOLATION: Institution material cannot self-classify as canonical ISLAMIC_AUTHORITY without Two-Scholar Governance Council certification.'
      );
    }
  }
}
