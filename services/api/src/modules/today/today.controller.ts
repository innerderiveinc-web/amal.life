import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { TodayService } from './today.service';
import { TodayResponse } from '@amal/types';
import { AuthGuard } from '../../common/guards/auth.guard.js';

@Controller('today')
@UseGuards(AuthGuard)
export class TodayController {
  constructor(private readonly todayService: TodayService) {}

  @Get()
  async getToday(@Req() req: any): Promise<TodayResponse> {
    const userId = req.user?.id || 'usr-sample-01';
    return this.todayService.getToday(userId);
  }
}
