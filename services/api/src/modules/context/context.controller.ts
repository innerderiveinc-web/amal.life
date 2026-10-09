import { Controller, Get, Post, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ContextService } from './context.service.js';
import { AuthGuard } from '../../common/auth/auth.guard.js';
import { CurrentUser } from '../../common/decorators/current-user.decorator.js';
import { AuthenticatedUser } from '../../common/auth/auth.types.js';

@Controller('context')
@UseGuards(AuthGuard)
export class ContextController {
  constructor(private readonly service: ContextService) {}

  @Get()
  async getContext(@CurrentUser() user: AuthenticatedUser) {
    return this.service.getContext(user);
  }

  @Post()
  async updateSignal(
    @CurrentUser() user: AuthenticatedUser,
    @Body() body: { key: string; value: any; source?: any; confidence?: number }
  ) {
    return this.service.updateContextSignal(user, body.key, body.value, body.source, body.confidence);
  }

  @Delete(':id')
  async deleteSignal(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') id: string
  ) {
    return this.service.deleteContextSignal(user, id);
  }
}
