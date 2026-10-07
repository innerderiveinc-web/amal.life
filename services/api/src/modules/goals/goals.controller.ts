import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, UseInterceptors } from '@nestjs/common';
import { GoalsService } from './goals.service.js';
import { AuthGuard, AuthUser } from '../../common/guards/auth.guard.js';
import { CurrentUser } from '../../common/decorators/current-user.decorator.js';
import { IdempotencyInterceptor } from '../../common/interceptors/idempotency.interceptor.js';
import { GoalCategory, GoalIntent } from '@amal/types';

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
  status?: string;
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
    return this.service.create(user.id, dto);
  }

  @Get()
  async list(@CurrentUser() user: AuthUser) {
    return this.service.findActive(user.id);
  }

  @Get(':id')
  async getById(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string
  ) {
    const goal = await this.service.findById(user.id, id);
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
    return this.service.update(user.id, id, dto);
  }

  @Delete(':id')
  async archive(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string
  ) {
    await this.service.archive(user.id, id);
    return { success: true };
  }
}
