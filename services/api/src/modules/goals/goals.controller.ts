import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, UseInterceptors } from '@nestjs/common';
import { GoalsService } from './goals.service.js';
import { AuthGuard, AuthUser } from '../../common/guards/auth.guard.js';
import { CurrentUser } from '../../common/decorators/current-user.decorator.js';
import { IdempotencyInterceptor } from '../../common/interceptors/idempotency.interceptor.js';
import { GoalCategory, GoalIntent, GoalStatus } from '@amal/types';

export interface CreateGoalDto {
  title: string;
  category: GoalCategory;
  intent: GoalIntent;
  desiredOutcome?: string;
  priority?: number;
}

export interface UpdateGoalDto {
  title?: string;
  desiredOutcome?: string;
  priority?: number;
  status?: GoalStatus;
}

import { AuthenticatedUser } from '../../common/auth/auth.types.js';

function toActor(user: AuthUser): AuthenticatedUser {
  return {
    userId: user.id,
    sessionId: `sess_${user.id}`,
    accountMode: 'ADULT',
    roles: (user.roles as Array<'USER' | 'FAMILY_OWNER' | 'SCHOLAR' | 'ADMIN'>) || ['USER'],
  };
}

@Controller('goals')
@UseGuards(AuthGuard)
@UseInterceptors(IdempotencyInterceptor)
export class GoalsController {
  constructor(private readonly service: GoalsService) {}

  @Post()
  async create(
    @CurrentUser() user: AuthUser,
    @Body() dto: CreateGoalDto
  ) {
    return this.service.create(toActor(user), dto);
  }

  @Get()
  async list(@CurrentUser() user: AuthUser) {
    return this.service.list(user.id);
  }

  @Get(':id')
  async getById(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string
  ) {
    const goal = await this.service.get(toActor(user), id);
    if (!goal) {
      return { error: 'Goal not found or access denied', status: 404 };
    }
    return goal;
  }

  @Patch(':id')
  async update(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
    @Body() dto: UpdateGoalDto
  ) {
    return this.service.update(toActor(user), id, dto);
  }

  @Delete(':id')
  async archive(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string
  ) {
    await this.service.delete(toActor(user), id);
    return { success: true };
  }

  @Post(':id/baseline')
  async setBaseline(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
    @Body() dto: any
  ) {
    return this.service.setBaseline(toActor(user), id, dto);
  }

  @Get(':id/baseline')
  async getBaseline(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string
  ) {
    return this.service.getBaseline(toActor(user), id);
  }
}
