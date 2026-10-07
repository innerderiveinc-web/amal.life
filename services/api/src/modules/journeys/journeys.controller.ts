import { Controller, Get, Post, Param, Body, UseGuards, UseInterceptors } from '@nestjs/common';
import { JourneysService } from './journeys.service.js';
import { AuthGuard } from '../../common/auth/auth.guard.js';
import { CurrentUser } from '../../common/decorators/current-user.decorator.js';
import { IdempotencyInterceptor } from '../../common/interceptors/idempotency.interceptor.js';
import { JourneyState } from '@amal/types';
import { AuthenticatedUser } from '../../common/auth/auth.types.js';

export interface CreateJourneyDto {
  goalId: string;
  templateId: string;
  templateVersionId: string;
  title: string;
}

@Controller('journeys')
@UseGuards(AuthGuard)
@UseInterceptors(IdempotencyInterceptor)
export class JourneysController {
  constructor(private readonly service: JourneysService) {}

  @Get()
  async list(@CurrentUser() user: AuthenticatedUser) {
    return this.service.findActive(user.userId);
  }

  @Post()
  async create(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: CreateJourneyDto
  ) {
    return this.service.create(user, dto);
  }

  @Get(':id')
  async getById(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') id: string
  ) {
    const journey = await this.service.findById(user.userId, id);
    if (!journey) {
      return { error: 'Journey not found or access denied', status: 404 };
    }
    return journey;
  }

  @Post(':id/start')
  async start(@CurrentUser() user: AuthenticatedUser, @Param('id') id: string) {
    return this.service.start(user, id);
  }

  @Post(':id/pause')
  async pause(@CurrentUser() user: AuthenticatedUser, @Param('id') id: string) {
    return this.service.transition(user, id, JourneyState.PAUSED);
  }

  @Post(':id/resume')
  async resume(@CurrentUser() user: AuthenticatedUser, @Param('id') id: string) {
    return this.service.transition(user, id, JourneyState.ACTIVE);
  }

  @Post(':id/complete')
  async complete(@CurrentUser() user: AuthenticatedUser, @Param('id') id: string) {
    return this.service.transition(user, id, JourneyState.COMPLETED);
  }

  @Get(':id/adaptations')
  async listAdaptations(@CurrentUser() user: AuthenticatedUser, @Param('id') id: string) {
    return [
      {
        id: `adp_${id}`,
        journeyId: id,
        trigger: 'REPEATED_TIME_FRICTION',
        proposedPlan: { durationMinutes: 5, timeSlot: 'after_fajr' },
        reasonCodes: ['TIME_FRICTION', 'LOW_FEASIBILITY'],
        status: 'PREVIEW',
      },
    ];
  }

  @Post(':id/adaptation-preview')
  async previewAdaptation(@CurrentUser() user: AuthenticatedUser, @Param('id') id: string) {
    return {
      currentPlan: '20 minutes evening recitation',
      suggestedPlan: '5 minutes morning recitation after Fajr',
      why: 'Recent morning sessions had 100% completion while evening sessions had repeated time friction.',
      buttons: ['APPLY', 'KEEP_CURRENT', 'EDIT'],
    };
  }

  @Post(':id/adaptation-approve')
  async approveAdaptation(@CurrentUser() user: AuthenticatedUser, @Param('id') id: string) {
    return {
      applied: true,
      journeyId: id,
      newDurationMinutes: 5,
      message: 'Plan simplified to 5 minutes after Fajr. Remember: "The most beloved deed to Allah is the most regular."',
    };
  }

  @Post(':id/adaptation-reject')
  async rejectAdaptation(@CurrentUser() user: AuthenticatedUser, @Param('id') id: string) {
    return {
      applied: false,
      journeyId: id,
      message: 'Kept current plan. No changes made.',
    };
  }
}
