import { Controller, Get, Post, Param, Body, Headers, UseGuards, UseInterceptors } from '@nestjs/common';
import { AmalService } from './amal.service.js';
import { AuthGuard, AuthUser } from '../../common/guards/auth.guard.js';
import { CurrentUser } from '../../common/decorators/current-user.decorator.js';
import { IdempotencyInterceptor } from '../../common/interceptors/idempotency.interceptor.js';

export interface CompleteAmalDto {
  completionType?: 'FULL' | 'PARTIAL' | 'MINIMUM' | 'SKIPPED';
  durationMinutes?: number;
  notes?: string;
  feedback?: string;
}

@Controller('amal')
@UseGuards(AuthGuard)
@UseInterceptors(IdempotencyInterceptor)
export class AmalController {
  constructor(private readonly service: AmalService) {}

  @Get('today')
  async getToday(@CurrentUser() user: AuthUser) {
    return this.service.findToday(user.id);
  }

  @Post('recommend')
  async recommend(@CurrentUser() user: AuthUser, @Body() body: { goalId?: string; availableMinutes?: number }) {
    const list = await this.service.findToday(user.id);
    return {
      date: new Date().toISOString().split('T')[0],
      primary: list[0] || null,
      optional: list.slice(1, 3),
      reasonCodes: ['GOAL_FIT', 'TIME_FIT', 'JOURNEY_CONTINUITY'],
    };
  }

  @Post(':id/start')
  async start(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return { status: 'STARTED', amalId: id, startedAt: new Date().toISOString() };
  }

  @Post(':id/complete')
  async complete(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
    @Body() dto: CompleteAmalDto,
    @Headers('idempotency-key') idempotencyKey?: string
  ) {
    const key = idempotencyKey || `auto_${id}_${Date.now()}`;
    return this.service.complete({
      amalId: id,
      userId: user.id,
      completionType: dto.completionType || 'FULL',
      durationMinutes: dto.durationMinutes,
      notes: dto.notes,
      idempotencyKey: key,
    });
  }

  @Post(':id/partial')
  async partial(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
    @Body() dto: CompleteAmalDto,
    @Headers('idempotency-key') idempotencyKey?: string
  ) {
    const key = idempotencyKey || `auto_part_${id}_${Date.now()}`;
    return this.service.complete({
      amalId: id,
      userId: user.id,
      completionType: 'PARTIAL',
      durationMinutes: dto.durationMinutes || 5,
      notes: dto.notes || 'Completed minimum meaningful practice.',
      idempotencyKey: key,
    });
  }

  @Post(':id/skip')
  async skip(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
    @Body() dto: { reason?: string },
    @Headers('idempotency-key') idempotencyKey?: string
  ) {
    const key = idempotencyKey || `auto_skip_${id}_${Date.now()}`;
    return this.service.complete({
      amalId: id,
      userId: user.id,
      completionType: 'SKIPPED',
      durationMinutes: 0,
      notes: dto.reason || 'Skipped for today without moral guilt.',
      idempotencyKey: key,
    });
  }

  @Post(':id/snooze')
  async snooze(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
    @Body() dto: { snoozeMinutes?: number }
  ) {
    return {
      status: 'SNOOZED',
      amalId: id,
      snoozedUntil: new Date(Date.now() + (dto.snoozeMinutes || 30) * 60000).toISOString(),
    };
  }

  @Post(':id/feedback')
  async feedback(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
    @Body() dto: { rating: string; frictionType?: string }
  ) {
    return {
      recorded: true,
      amalId: id,
      rating: dto.rating,
      frictionType: dto.frictionType,
    };
  }
}
