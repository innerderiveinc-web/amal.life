import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { PlatformService } from './platform.service.js';
import { AuthGuard } from '../../guards/auth.guard.js';

@Controller('internal/platform')
export class PlatformController {
  constructor(private readonly platformService: PlatformService) {}

  @Get('health')
  getHealth() {
    return this.platformService.getAggregatedHealth();
  }

  @Get('slos')
  @UseGuards(AuthGuard)
  getSLOs() {
    return {
      success: true,
      data: this.platformService.getSLODefinitions(),
    };
  }

  @Post('canary/advance')
  @UseGuards(AuthGuard)
  advanceCanary(@Body() body: { serviceId: string; versionTag: string }) {
    return {
      success: true,
      data: this.platformService.advanceCanary(body.serviceId, body.versionTag),
    };
  }

  @Post('canary/rollback')
  @UseGuards(AuthGuard)
  rollbackCanary(@Body() body: { serviceId: string; reason: string }) {
    return {
      success: true,
      data: this.platformService.rollbackCanary(body.serviceId, body.reason),
    };
  }

  @Post('reconcile/outbox')
  @UseGuards(AuthGuard)
  reconcileOutbox() {
    return {
      success: true,
      data: this.platformService.reconcileOutbox(),
    };
  }

  @Post('synthetic/run')
  runSynthetic() {
    return {
      success: true,
      data: this.platformService.runSyntheticMonitoring(),
    };
  }
}
