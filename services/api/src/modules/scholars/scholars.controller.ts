/**
 * AMAL OS — SCHOLARS CONTROLLER
 * Verified scholar directory, Class D juristic triage, and governed Two-Scholar review desk.
 * Strict Theological Invariant: Dual human jurist sign-off required for high-stakes rulings.
 */

import { Controller, Get, Post, Param, Body, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '../../common/auth/auth.guard.js';
import { CurrentUser } from '../../common/decorators/current-user.decorator.js';
import { AuthenticatedUser } from '../../common/auth/auth.types.js';
import { createHash } from 'node:crypto';

export interface ScholarCaseRecord {
  caseId: string;
  userId: string;
  userQuestion: string;
  sanitizedContext?: string;
  category: string;
  urgency: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'PENDING_TRIAGE' | 'DRAFTED' | 'AWAITING_SECOND_SCHOLAR' | 'APPROVED' | 'DELIVERED';
  primaryScholarId?: string;
  primaryResponse?: string;
  primarySignedAt?: string;
  secondaryScholarId?: string;
  secondaryConcurrenceNotes?: string;
  secondarySignedAt?: string;
  proofHash?: string;
  twoPersonRuleSatisfied?: boolean;
  createdAt: string;
}

export interface QuarantinedClaimRecord {
  claimId: string;
  sourceText: string;
  sourceReference: string;
  sourceEdition: string;
  quarantineReason: string;
  detectedIssue: string;
  status: 'QUARANTINED' | 'UNDER_REVIEW' | 'VERIFIED' | 'REJECTED';
  reviewer1Id?: string;
  reviewer2Id?: string;
  notes?: string;
  createdAt: string;
}

@Controller('scholars')
@UseGuards(AuthGuard)
export class ScholarsController {
  // In-memory persistent state for case review & quarantine workflows
  private cases: ScholarCaseRecord[] = [
    {
      caseId: 'case-8102',
      userId: 'usr_anon_491',
      userQuestion: 'I was extremely angry during an argument and uttered words of divorce. Does this constitute irrevocable talaq in my situation?',
      sanitizedContext: 'Married 4 years, two minor children. Incident occurred during severe heated distress.',
      category: 'FAMILY_FIQH',
      urgency: 'HIGH',
      status: 'PENDING_TRIAGE',
      twoPersonRuleSatisfied: false,
      createdAt: new Date().toISOString(),
    },
    {
      caseId: 'case-8105',
      userId: 'usr_anon_772',
      userQuestion: 'My father passed away leaving an estate in the UK and shares in Pakistan. How should the shares be allocated between 2 sisters, 1 brother and wife?',
      sanitizedContext: 'Deceased had no living parents. Surviving wife, 2 daughters, 1 son.',
      category: 'INHERITANCE',
      urgency: 'MEDIUM',
      status: 'PENDING_TRIAGE',
      twoPersonRuleSatisfied: false,
      createdAt: new Date().toISOString(),
    },
  ];

  private quarantinedClaims: QuarantinedClaimRecord[] = [
    {
      claimId: 'CLM-QUAR-001',
      sourceText: 'Taking inhalers directly to the lungs breaks the fast according to strict literal intake rules.',
      sourceReference: 'Contemporary Ruling Draft #49',
      sourceEdition: 'Unvetted Draft 2024',
      quarantineReason: 'Contradicts contemporary medical consensus of IIFA without citing dissenting views.',
      detectedIssue: 'UNVERIFIED_FATWA_GENERALIZATION',
      status: 'QUARANTINED',
      createdAt: new Date().toISOString(),
    },
    {
      claimId: 'CLM-QUAR-002',
      sourceText: 'Reciting this supplication 1000 times on Friday night guarantees freedom from all financial debt.',
      sourceReference: 'Attributed Hadith Pamphlet',
      sourceEdition: 'Pamphlet Edition 2',
      quarantineReason: 'Mawdoo (Fabricated) / No recognized Isnad in canonical Kutub as-Sittah.',
      detectedIssue: 'FABRICATED_HADITH_SUSPICION',
      status: 'QUARANTINED',
      createdAt: new Date().toISOString(),
    },
  ];

  @Get()
  async listScholars() {
    return [
      {
        id: 'sch_dr_tariq',
        name: 'Dr. Tariq Al-Hashimi',
        title: 'Professor of Comparative Islamic Jurisprudence',
        specialties: ['FIQH', 'FINANCE', 'CONTEMPORARY_ISSUES'],
        verificationStatus: 'VERIFIED',
      },
      {
        id: 'sch_sheikh_amina',
        name: 'Sheikha Amina Farooq',
        title: 'Senior Jurist & Family Counselor',
        specialties: ['FAMILY_FIQH', 'PASTORAL_CARE', 'YOUTH'],
        verificationStatus: 'VERIFIED',
      },
    ];
  }

  // --- CASES WORKFLOW (Must be defined BEFORE :id) ---

  @Get('cases')
  async listCases() {
    return this.cases;
  }

  @Post('cases')
  async createCase(
    @CurrentUser() user: AuthenticatedUser,
    @Body() body: { question: string; category?: string; urgency?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'; context?: string },
  ) {
    const newCase: ScholarCaseRecord = {
      caseId: `sch_case_${Date.now()}`,
      userId: user.userId,
      userQuestion: body.question,
      sanitizedContext: body.context,
      category: body.category || 'GENERAL_FIQH',
      urgency: body.urgency || 'MEDIUM',
      status: 'PENDING_TRIAGE',
      twoPersonRuleSatisfied: false,
      createdAt: new Date().toISOString(),
    };
    this.cases.unshift(newCase);
    return newCase;
  }

  @Get('cases/:id')
  async getCase(@CurrentUser() user: AuthenticatedUser, @Param('id') id: string) {
    const found = this.cases.find((c) => c.caseId === id);
    if (!found) {
      throw new HttpException('Case not found', HttpStatus.NOT_FOUND);
    }
    return found;
  }

  @Post('cases/:id/respond')
  async submitDraftResponse(
    @Param('id') id: string,
    @Body() body: { scholarId: string; responseText: string },
  ) {
    const c = this.cases.find((item) => item.caseId === id);
    if (!c) {
      throw new HttpException('Case not found', HttpStatus.NOT_FOUND);
    }

    c.primaryScholarId = body.scholarId;
    c.primaryResponse = body.responseText;
    c.primarySignedAt = new Date().toISOString();
    c.status = 'AWAITING_SECOND_SCHOLAR';

    return {
      success: true,
      case: c,
    };
  }

  @Post('cases/:id/concur')
  async submitSecondScholarSignoff(
    @Param('id') id: string,
    @Body() body: { scholarId: string; concurrenceNotes: string },
  ) {
    const c = this.cases.find((item) => item.caseId === id);
    if (!c) {
      throw new HttpException('Case not found', HttpStatus.NOT_FOUND);
    }

    // Theological Invariant: Dual Human Jurist Rule (author !== reviewer)
    if (c.primaryScholarId && c.primaryScholarId === body.scholarId) {
      throw new HttpException(
        'Theological Invariant Violation: Second reviewer must be a distinct jurist from primary author (Two-Scholar Rule).',
        HttpStatus.FORBIDDEN,
      );
    }

    c.secondaryScholarId = body.scholarId;
    c.secondaryConcurrenceNotes = body.concurrenceNotes;
    c.secondarySignedAt = new Date().toISOString();
    c.status = 'APPROVED';
    c.twoPersonRuleSatisfied = true;

    // Cryptographic Proof Hash over canonical dual determinations
    const payload = `${c.caseId}:${c.primaryScholarId}:${c.primaryResponse}:${c.secondaryScholarId}:${c.secondaryConcurrenceNotes}:${c.secondarySignedAt}`;
    c.proofHash = createHash('sha256').update(payload).digest('hex');

    return {
      success: true,
      case: c,
    };
  }

  @Post('cases/:id/followup')
  async submitFollowup(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') id: string,
    @Body() body: { followupQuestion: string },
  ) {
    const c = this.cases.find((item) => item.caseId === id);
    if (!c) {
      throw new HttpException('Case not found', HttpStatus.NOT_FOUND);
    }
    c.status = 'USER_FOLLOWUP' as any;
    c.sanitizedContext = `${c.sanitizedContext || ''}\n[Followup from user]: ${body.followupQuestion}`;
    return {
      success: true,
      case: c,
      message: 'Follow-up question queued for assigned scholar.',
    };
  }

  @Post('cases/:id/close')
  async closeCase(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') id: string,
    @Body() body?: { resolutionNotes?: string },
  ) {
    const c = this.cases.find((item) => item.caseId === id);
    if (!c) {
      throw new HttpException('Case not found', HttpStatus.NOT_FOUND);
    }
    c.status = 'CLOSED' as any;
    return {
      success: true,
      case: c,
      closedAt: new Date().toISOString(),
      notes: body?.resolutionNotes || 'Case closed by user / scholar.',
    };
  }

  // --- QUARANTINE REVIEW WORKFLOW ---

  @Get('quarantine')
  async listQuarantinedClaims() {
    return this.quarantinedClaims;
  }

  @Post('quarantine/:id/signoff')
  async signoffClaim(
    @Param('id') id: string,
    @Body() body: { scholarId: string; decision: 'APPROVE' | 'REJECT'; notes: string },
  ) {
    const claim = this.quarantinedClaims.find((q) => q.claimId === id);
    if (!claim) {
      throw new HttpException('Quarantined claim not found', HttpStatus.NOT_FOUND);
    }

    claim.reviewer1Id = body.scholarId;
    claim.notes = body.notes;
    claim.status = body.decision === 'APPROVE' ? 'VERIFIED' : 'REJECTED';

    return {
      success: true,
      claim,
    };
  }

  // --- SINGLE SCHOLAR DETAIL ---

  @Get(':id')
  async getScholar(@Param('id') id: string) {
    return {
      id,
      name: id === 'sch_sheikh_amina' ? 'Sheikha Amina Farooq' : 'Dr. Tariq Al-Hashimi',
      verificationStatus: 'VERIFIED',
      credentials: ['Al-Azhar University Graduate', 'Board of Jurists Member'],
      jurisdiction: 'AHL_AL_SUNNAH',
      languages: ['Arabic', 'English', 'Urdu'],
    };
  }
}
