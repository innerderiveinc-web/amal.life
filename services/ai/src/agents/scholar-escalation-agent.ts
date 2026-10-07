import { ScholarCase, EvidencePackItem, CaseUrgency } from '@amal/types';
import { db } from '@amal/database';

export class ScholarEscalationAgent {
  /**
   * Structure and prepare a scholar review case
   */
  public static async prepareScholarCase(
    userId: string,
    userQuestion: string,
    sanitizedContext: string,
    detectedIssue: string,
    relevantSources: EvidencePackItem[],
    urgency: CaseUrgency = 'NORMAL'
  ): Promise<ScholarCase> {
    const caseId = `case-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;

    // Pick first available verified scholar
    const availableScholar = Array.from(db.scholars.values()).find(
      (s) => s.availableForCases && s.verificationStatus === 'APPROVED'
    );

    const scholarCase: ScholarCase = {
      id: caseId,
      userId,
      assignedScholarId: availableScholar?.id || null,
      userQuestion,
      sanitizedContext,
      detectedFiqhIssue: detectedIssue,
      relevantSources,
      userConsentGranted: true,
      urgency,
      status: 'PENDING_TRIAGE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    db.scholarCases.set(caseId, scholarCase);

    await db.recordAuditLog({
      actorId: userId,
      actorRole: 'USER',
      action: 'SUBMIT_SCHOLAR_CASE',
      resourceType: 'SCHOLAR_CASE',
      resourceId: caseId,
      metadata: { urgency, detectedIssue },
    });

    return scholarCase;
  }
}
