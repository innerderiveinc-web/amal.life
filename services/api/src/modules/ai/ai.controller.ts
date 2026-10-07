import { AskAiDto, validateAskAiDto } from './dto/ask-ai.dto.js';
import { AiService } from './ai.service.js';

export class AiController {
  public static async handleAsk(body: any, userId: string): Promise<any> {
    const validation = validateAskAiDto(body);
    if (!validation.valid) {
      return { success: false, error: { code: 'VALIDATION_ERROR', message: validation.error } };
    }

    const result = await AiService.ask(body as AskAiDto, userId);
    return { success: true, data: result };
  }
}
