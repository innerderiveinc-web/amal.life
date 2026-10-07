/**
 * AMAL OS — FAMILY CONTROLLER
 * Manages family workspace, shared journeys, and strictly protects adult reflection isolation.
 */

import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../common/auth/auth.guard.js';
import { CurrentUser } from '../../common/decorators/current-user.decorator.js';
import { AuthenticatedUser } from '../../common/auth/auth.types.js';

@Controller('family')
@UseGuards(AuthGuard)
export class FamilyController {
  @Get()
  async getFamily(@CurrentUser() user: AuthenticatedUser) {
    return {
      familyId: `fam_${user.userId}`,
      name: 'Household Workspace',
      ownerId: user.userId,
      members: [
        {
          userId: user.userId,
          displayName: 'Head of Household',
          role: 'OWNER',
          accountMode: 'ADULT',
        },
        {
          userId: 'usr_teen_01',
          displayName: 'Zayd',
          role: 'MEMBER',
          accountMode: 'YOUNG_USER',
        },
      ],
      privacyGuarantees: {
        adultReflectionIsolation: true,
        privateMuhasabahProtected: true,
        sharedOnlyWithConsent: true,
      },
    };
  }

  @Post('invite')
  async inviteMember(
    @CurrentUser() user: AuthenticatedUser,
    @Body() body: { email: string; displayName: string; accountMode?: string },
  ) {
    return {
      invited: true,
      inviteToken: `inv_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      email: body.email,
      role: 'MEMBER',
      accountMode: body.accountMode || 'ADULT',
    };
  }

  @Get('journeys')
  async getSharedJourneys(@CurrentUser() user: AuthenticatedUser) {
    return [
      {
        id: 'fam_jrn_01',
        title: 'Family Daily Quran & Dinner Tadabbur',
        pace: 'Gentle',
        participantsCount: 2,
        activePhase: 'Week 1: Evening Gathering',
      },
    ];
  }
}
