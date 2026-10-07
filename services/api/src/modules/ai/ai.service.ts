import { IntelligenceRuntimeV1 } from '@amal/service-ai';
import { AmalAIRequest } from '@amal/types';
import { AskAiDto } from './dto/ask-ai.dto.js';

export class AiService {
  public static async ask(dto: AskAiDto, userId: string): Promise<any> {
    const request: AmalAIRequest = {
      requestId: `req_${Date.now()}`,
      userId,
      sessionId: `sess_${Date.now()}`,
      message: dto.message,
      locale: 'en',
      timezone: 'UTC',
      surface: dto.surface || 'ASK_AMAL',
      contextPolicy: {
        allowPersonalization: dto.context_policy?.allow_personalization ?? true,
        allowMemory: dto.context_policy?.allow_memory ?? true,
        allowJourneyContext: dto.context_policy?.allow_journey_context ?? true,
      },
      clientMetadata: {
        platform: 'api',
        appVersion: '1.0.0',
      },
    };

    return await IntelligenceRuntimeV1.execute(request);
  }
}
