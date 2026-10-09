import { Controller, Post, Get, Param, Body, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '../../common/auth/auth.guard.js';
import { CurrentUser } from '../../common/decorators/current-user.decorator.js';
import { AuthenticatedUser } from '../../common/auth/auth.types.js';
import { AskAiDto, validateAskAiDto } from './dto/ask-ai.dto.js';
import { AiService } from './ai.service.js';

@Controller('ai')
@UseGuards(AuthGuard)
export class AiController {
  constructor(private readonly service: AiService) {}

  @Post('ask')
  async ask(@CurrentUser() user: AuthenticatedUser, @Body() body: any): Promise<any> {
    const validation = validateAskAiDto(body);
    if (!validation.valid) {
      throw new HttpException(
        { success: false, error: { code: 'VALIDATION_ERROR', message: validation.error } },
        HttpStatus.BAD_REQUEST,
      );
    }

    const result = await this.service.ask(body as AskAiDto, user?.userId || 'usr_anonymous');
    return { success: true, data: result };
  }

  @Get('sessions/:id')
  async getSession(@CurrentUser() user: AuthenticatedUser, @Param('id') sessionId: string) {
    return this.service.getSession(sessionId, user?.userId || 'usr_anonymous');
  }

  @Get('sessions/:id/messages')
  async getSessionMessages(@CurrentUser() user: AuthenticatedUser, @Param('id') sessionId: string) {
    return this.service.getSessionMessages(sessionId, user?.userId || 'usr_anonymous');
  }

  public static async handleAsk(body: any, userId: string): Promise<any> {
    const validation = validateAskAiDto(body);
    if (!validation.valid) {
      return { success: false, error: { code: 'VALIDATION_ERROR', message: validation.error } };
    }
    const service = new AiService();
    const result = await service.ask(body as AskAiDto, userId);
    return { success: true, data: result };
  }
}
