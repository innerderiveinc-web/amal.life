import { Controller, Get, Post, Param, Body, Headers, UseGuards, UseInterceptors } from '@nestjs/common';
import { AmalService } from './amal.service.js';
import { AuthGuard, AuthUser } from '../../common/guards/auth.guard.js';
import { CurrentUser } from '../../common/decorators/current-user.decorator.js';
import { IdempotencyInterceptor } from '../../common/interceptors/idempotency.interceptor.js';

export interface CompleteAmalDto {
  completionType: 'FULL' | 'PARTIAL' | 'MINIMUM' | 'SKIPPED';
  durationMinutes?: number;
  notes?: string;
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
      completionType: dto.completionType,
      durationMinutes: dto.durationMinutes,
      notes: dto.notes,
      idempotencyKey: key,
    });
  }
}
