import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { GovernanceService } from './governance.service.js';
import { AuthGuard } from '../../guards/auth.guard.js';

@Controller('governance')
export class GovernanceController {
  constructor(private readonly govService: GovernanceService) {}

  @Get('trust-dashboard')
  @UseGuards(AuthGuard)
  async getDashboard() {
    return {
      success: true,
      data: this.govService.getTrustDashboard(),
    };
  }

  @Get('user-trust-center')
  @UseGuards(AuthGuard)
  async getUserTrust(@Req() req: any) {
    const userId = req.user?.id || 'usr-sample-01';
    return {
      success: true,
      data: this.govService.getUserTrustCenter(userId),
    };
  }

  @Post('policy/evaluate')
  @UseGuards(AuthGuard)
  async evaluatePolicy(@Body() body: any) {
    return {
      success: true,
      data: this.govService.evaluatePolicy(body),
    };
  }

  @Post('privacy-requests')
  @UseGuards(AuthGuard)
  async createPrivacyRequest(@Req() req: any, @Body() body: { type: any }) {
    const userId = req.user?.id || 'usr-sample-01';
    return {
      success: true,
      data: this.govService.createPrivacyRequest(userId, body.type),
    };
  }

  @Get('circuit-breakers')
  @UseGuards(AuthGuard)
  async getCircuitBreakers() {
    return {
      success: true,
      data: this.govService.getCircuitBreakers(),
    };
  }

  @Post('circuit-breakers/trip')
  @UseGuards(AuthGuard)
  async tripCircuitBreaker(@Body() body: { id: string; state: any; reason: string }) {
    this.govService.setCircuitBreaker(body.id, body.state, body.reason);
    return {
      success: true,
      message: `Breaker ${body.id} set to ${body.state}`,
    };
  }

  @Post('four-eyes/propose')
  @UseGuards(AuthGuard)
  async proposeChange(@Req() req: any, @Body() body: any) {
    const operatorId = req.user?.id || 'admin-op-01';
    return {
      success: true,
      data: this.govService.proposeConfigChange(body.category, operatorId, body.before, body.after),
    };
  }

  @Post('four-eyes/approve')
  @UseGuards(AuthGuard)
  async approveChange(@Req() req: any, @Body() body: { changeId: string }) {
    const secondOperatorId = req.user?.id || 'admin-op-02';
    return {
      success: true,
      data: this.govService.approveConfigChange(body.changeId, secondOperatorId),
    };
  }

  @Post('break-glass')
  @UseGuards(AuthGuard)
  async breakGlass(@Req() req: any, @Body() body: { approverId: string; justification: string; scope: string[] }) {
    const adminId = req.user?.id || 'admin-op-01';
    return {
      success: true,
      data: this.govService.grantBreakGlass(adminId, body.approverId, body.justification, body.scope),
    };
  }
}
