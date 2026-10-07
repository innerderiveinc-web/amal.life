import { Controller, Get, Post, Patch, Body, Param, Req, UseGuards } from '@nestjs/common';
import { CommunicationsService } from './communications.service.js';
import { AuthGuard } from '../../guards/auth.guard.js';

@Controller()
export class CommunicationsController {
  constructor(private readonly commsService: CommunicationsService) {}

  @Get('communications/preferences')
  @UseGuards(AuthGuard)
  async getPreferences(@Req() req: any) {
    const userId = req.user?.id || 'usr-sample-01';
    return {
      success: true,
      data: this.commsService.getPreferences(userId),
    };
  }

  @Patch('communications/preferences')
  @UseGuards(AuthGuard)
  async updatePreferences(@Req() req: any, @Body() body: any) {
    const userId = req.user?.id || 'usr-sample-01';
    return {
      success: true,
      data: this.commsService.updatePreferences(userId, body),
    };
  }

  @Get('communications/consent')
  @UseGuards(AuthGuard)
  async getConsents(@Req() req: any) {
    const userId = req.user?.id || 'usr-sample-01';
    return {
      success: true,
      data: this.commsService.getConsents(userId),
    };
  }

  @Post('communications/consent')
  @UseGuards(AuthGuard)
  async setConsent(@Req() req: any, @Body() body: any) {
    const userId = req.user?.id || 'usr-sample-01';
    return {
      success: true,
      data: this.commsService.setConsent(userId, body),
    };
  }

  @Get('prayers/today')
  @UseGuards(AuthGuard)
  async getTodayPrayers(@Req() req: any) {
    const userId = req.user?.id || 'usr-sample-01';
    return {
      success: true,
      data: this.commsService.getTodayPrayerSchedule(userId),
    };
  }

  @Patch('prayers/settings')
  @UseGuards(AuthGuard)
  async updatePrayerSettings(@Req() req: any, @Body() body: any) {
    const userId = req.user?.id || 'usr-sample-01';
    return {
      success: true,
      data: this.commsService.updatePrayerProfile(userId, body),
    };
  }

  @Post('notifications/:id/interact')
  @UseGuards(AuthGuard)
  async recordInteraction(@Req() req: any, @Param('id') _id: string, @Body() body: { action: any }) {
    const userId = req.user?.id || 'usr-sample-01';
    return {
      success: true,
      data: this.commsService.recordInteraction(userId, body.action),
    };
  }

  @Post('internal/communications/send')
  async internalSend(@Body() body: any) {
    const result = await this.commsService.orchestrateAndSend(body);
    return {
      success: true,
      data: result,
    };
  }

  @Post('internal/communications/webhook')
  async handleWebhook(@Body() body: any) {
    const result = await this.commsService.handleWebhook(body);
    return {
      success: true,
      data: result,
    };
  }
}
