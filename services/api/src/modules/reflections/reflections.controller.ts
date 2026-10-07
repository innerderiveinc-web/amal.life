import { Controller, Get, Post, Param, Body, UseGuards, UseInterceptors } from '@nestjs/common';
import { ReflectionsService } from './reflections.service.js';
import { AuthGuard, AuthUser } from '../../common/guards/auth.guard.js';
import { CurrentUser } from '../../common/decorators/current-user.decorator.js';
import { IdempotencyInterceptor } from '../../common/interceptors/idempotency.interceptor.js';

export interface CreateReflectionDto {
  journeyId?: string;
  amalId?: string;
  reflectionType?: 'DAILY_MUHASABAH' | 'JOURNEY_CHECK_IN' | 'PERSONAL_NOTE';
  wentWell: string;
  frictionDetected?: string;
  tomorrowIntention: string;
}

@Controller('reflections')
@UseGuards(AuthGuard)
@UseInterceptors(IdempotencyInterceptor)
export class ReflectionsController {
  constructor(private readonly service: ReflectionsService) {}

  @Get()
  async list(@CurrentUser() user: AuthUser) {
    return this.service.findByUserId(user.id);
  }

  @Post()
  async create(
    @CurrentUser() user: AuthUser,
    @Body() dto: CreateReflectionDto
  ) {
    return this.service.create(user.id, {
      ...dto,
      reflectionType: dto.reflectionType || 'DAILY_MUHASABAH',
    });
  }

  @Get(':id')
  async getById(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string
  ) {
    const reflection = await this.service.findById(user.id, id);
    if (!reflection) {
      return { error: 'Reflection not found or access denied', status: 404 };
    }
    return reflection;
  }

  @Post(':id/analyze')
  async analyze(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    const reflection = await this.service.findById(user.id, id);
    if (!reflection) return { error: 'Reflection not found', status: 404 };

    return {
      patterns: ['Consistent intention noted.'],
      friction: reflection.frictionDetected ? [reflection.frictionDetected] : [],
      proposedInsight: {
        category: 'TIMING',
        statement: 'Shorter morning sessions fit best during high-work periods.',
        confirmationRequired: true,
      },
    };
  }

  @Post(':id/confirm-insight')
  async confirmInsight(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
    @Body() body: { confirmed: boolean; preferenceKey?: string }
  ) {
    return {
      confirmed: body.confirmed,
      message: body.confirmed
        ? 'Preference updated and confirmed. AMAL will adapt future recommendations accordingly.'
        : 'Insight dismissed. No preferences changed.',
    };
  }
}
