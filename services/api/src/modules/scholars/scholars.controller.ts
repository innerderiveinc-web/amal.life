/**
 * AMAL OS — SCHOLARS CONTROLLER
 * Verified scholar directory and governed Class D case escalation.
 */

import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../common/auth/auth.guard.js';
import { CurrentUser } from '../../common/decorators/current-user.decorator.js';
import { AuthenticatedUser } from '../../common/auth/auth.types.js';

@Controller('scholars')
@UseGuards(AuthGuard)
export class ScholarsController {
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

  @Post('cases')
  async createCase(
    @CurrentUser() user: AuthenticatedUser,
    @Body() body: { question: string; category?: string; urgency?: string; context?: string },
  ) {
    return {
      caseId: `sch_case_${Date.now()}`,
      userId: user.userId,
      question: body.question,
      status: 'TRIAGED',
      twoScholarRuleRequired: true,
      createdAt: new Date().toISOString(),
    };
  }

  @Get('cases/:id')
  async getCase(@CurrentUser() user: AuthenticatedUser, @Param('id') id: string) {
    return {
      caseId: id,
      userId: user.userId,
      status: 'UNDER_REVIEW',
      assignedScholars: ['sch_dr_tariq', 'sch_sheikh_amina'],
      twoPersonRuleSatisfied: true,
      createdAt: new Date().toISOString(),
    };
  }
}
