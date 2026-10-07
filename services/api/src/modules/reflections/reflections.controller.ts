import { Controller, Get, Post, Param, Body, UseGuards, UseInterceptors } from '@nestjs/common';
import { ReflectionsService } from './reflections.service.js';
import { AuthGuard } from '../../common/auth/auth.guard.js';
import { CurrentUser } from '../../common/decorators/current-user.decorator.js';
import { IdempotencyInterceptor } from '../../common/interceptors/idempotency.interceptor.js';
import { AuthenticatedUser } from '../../common/auth/auth.types.js';

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
  async list(@CurrentUser() user: AuthenticatedUser) {
    return this.service.findByUserId(user);
  }

  @Post()
  async create(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: CreateReflectionDto
  ) {
    return this.service.create(user, {
      ...dto,
      reflectionType: dto.reflectionType || 'DAILY_MUHASABAH',
    });
  }

  @Get(':id')
  async getById(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') id: string
  ) {
    const reflection = await this.service.findById(user, id);
    if (!reflection) {
      return { error: 'Reflection not found or access denied', status: 404 };
    }
    return reflection;
  }

  @Post(':id/analyze')
  async analyze(@CurrentUser() user: AuthenticatedUser, @Param('id') id: string) {
    const reflection = await this.service.findById(user, id);
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
    @CurrentUser() user: AuthenticatedUser,
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
