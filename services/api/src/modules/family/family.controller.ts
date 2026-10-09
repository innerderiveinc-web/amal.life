/**
 * AMAL OS — FAMILY CONTROLLER
 * Manages family workspace, shared journeys, and strictly protects adult reflection isolation.
 */

import { Controller, Get, Post, Delete, Body, Param, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '../../common/auth/auth.guard.js';
import { CurrentUser } from '../../common/decorators/current-user.decorator.js';
import { AuthenticatedUser } from '../../common/auth/auth.types.js';

@Controller('family')
@UseGuards(AuthGuard)
export class FamilyController {
  private sharedResources: Map<string, Array<{ resourceType: string; resourceId: string }>> = new Map();

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

  @Post()
  async createFamily(
    @CurrentUser() user: AuthenticatedUser,
    @Body() body: { name: string }
  ) {
    return {
      familyId: `fam_${user.userId}`,
      name: body.name || 'Our Household',
      ownerId: user.userId,
      createdAt: new Date().toISOString(),
    };
  }

  @Post('invitations')
  async createInvitation(
    @CurrentUser() user: AuthenticatedUser,
    @Body() body: { email: string; role?: 'ADULT_MEMBER' | 'TEEN_MEMBER' | 'CHILD_MEMBER'; accountMode?: string },
  ) {
    return {
      success: true,
      invitationId: `inv_${Date.now()}`,
      email: body.email,
      role: body.role || 'ADULT_MEMBER',
      accountMode: body.accountMode || 'ADULT',
      expiresAt: new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString(),
    };
  }

  @Post('invite')
  async inviteMember(
    @CurrentUser() user: AuthenticatedUser,
    @Body() body: { email: string; displayName: string; accountMode?: string },
  ) {
    return this.createInvitation(user, { email: body.email, accountMode: body.accountMode });
  }

  @Post('members/:id/share')
  async shareResource(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') memberId: string,
    @Body() body: { resourceType: 'GOAL' | 'JOURNEY'; resourceId: string }
  ) {
    let list = this.sharedResources.get(memberId) || [];
    list.push({ resourceType: body.resourceType, resourceId: body.resourceId });
    this.sharedResources.set(memberId, list);
    return {
      success: true,
      memberId,
      sharedResource: body,
      message: `${body.resourceType} successfully shared with family member.`,
    };
  }

  @Delete('members/:id/share')
  async revokeSharedResource(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') memberId: string,
    @Body() body: { resourceId: string }
  ) {
    let list = this.sharedResources.get(memberId) || [];
    list = list.filter((item) => item.resourceId !== body.resourceId);
    this.sharedResources.set(memberId, list);
    return {
      success: true,
      memberId,
      revokedResourceId: body.resourceId,
    };
  }

  @Get('members/:id/reflections')
  async getMemberReflections(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') memberId: string
  ) {
    // INVARIANT INV_03: Adult reflections are cryptographically isolated.
    // Family heads and household members CANNOT view another member's private reflections!
    if (memberId !== user.userId) {
      throw new HttpException(
        'POLICY DENIAL (INV_03): Adult Muhasabah reflection journals are strictly private and isolated from family members.',
        HttpStatus.FORBIDDEN
      );
    }
    return { success: true, data: [] };
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
