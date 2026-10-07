import { Controller, Get, Post, Param, Body, UseGuards, UseInterceptors } from '@nestjs/common';
import { JourneysService } from './journeys.service.js';
import { AuthGuard, AuthUser } from '../../common/guards/auth.guard.js';
import { CurrentUser } from '../../common/decorators/current-user.decorator.js';
import { IdempotencyInterceptor } from '../../common/interceptors/idempotency.interceptor.js';
import { JourneyState } from '@amal/types';

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
  async list(@CurrentUser() user: AuthUser) {
    return this.service.findActive(user.id);
  }

  @Post()
  async create(
    @CurrentUser() user: AuthUser,
    @Body() dto: CreateJourneyDto
  ) {
    return this.service.create(user.id, dto);
  }

  @Get(':id')
  async getById(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string
  ) {
    const journey = await this.service.findById(user.id, id);
    if (!journey) {
      return { error: 'Journey not found or access denied', status: 404 };
    }
    return journey;
  }

  @Post(':id/start')
  async start(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.service.transition(user.id, id, JourneyState.ACTIVE);
  }

  @Post(':id/pause')
  async pause(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.service.transition(user.id, id, JourneyState.PAUSED);
  }

  @Post(':id/resume')
  async resume(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.service.transition(user.id, id, JourneyState.ACTIVE);
  }

  @Post(':id/complete')
  async complete(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.service.transition(user.id, id, JourneyState.COMPLETED);
  }
}
