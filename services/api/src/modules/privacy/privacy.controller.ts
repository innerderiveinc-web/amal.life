import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { PrivacyService } from './privacy.service.js';
import { AuthGuard } from '../../common/auth/auth.guard.js';
import { CurrentUser } from '../../common/decorators/current-user.decorator.js';
import { AuthenticatedUser } from '../../common/auth/auth.types.js';

@Controller('privacy')
@UseGuards(AuthGuard)
export class PrivacyController {
  constructor(private readonly service: PrivacyService) {}

  @Post('export')
  async requestExport(@CurrentUser() user: AuthenticatedUser) {
    return this.service.requestExport(user);
  }

  @Post('delete')
  async requestDeletion(
    @CurrentUser() user: AuthenticatedUser,
    @Body() body: { reason?: string }
  ) {
    return this.service.requestDeletion(user, body?.reason);
  }

  @Get(':id')
  async getStatus(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') id: string
  ) {
    return this.service.getStatus(user, id);
  }
}
