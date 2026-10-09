import { Injectable } from '@nestjs/common';
import { IntelligenceRuntimeV1 } from '@amal/service-ai';
import { AmalAIRequest } from '@amal/types';
import { AskAiDto } from './dto/ask-ai.dto.js';

@Injectable()
export class AiService {
  private sessions: Map<string, { id: string; userId: string; messages: any[]; createdAt: string }> = new Map();

  public async ask(dto: AskAiDto, userId: string): Promise<any> {
    const sessionId = dto.session_id || `sess_${Date.now()}`;
    const request: AmalAIRequest = {
      requestId: `req_${Date.now()}`,
      userId,
      sessionId,
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

    const result = await IntelligenceRuntimeV1.execute(request);

    // Track session memory
    let session = this.sessions.get(sessionId);
    if (!session) {
      session = { id: sessionId, userId, messages: [], createdAt: new Date().toISOString() };
      this.sessions.set(sessionId, session);
    }
    session.messages.push({
      role: 'user',
      content: dto.message,
      timestamp: new Date().toISOString(),
    });
    session.messages.push({
      role: 'assistant',
      content: result.answer?.direct || 'No direct answer',
      citations: result.verifiedCitations || [],
      timestamp: new Date().toISOString(),
    });

    return result;
  }

  public async getSession(sessionId: string, userId: string) {
    const session = this.sessions.get(sessionId);
    if (!session || session.userId !== userId) {
      return { id: sessionId, userId, messages: [], createdAt: new Date().toISOString() };
    }
    return session;
  }

  public async getSessionMessages(sessionId: string, userId: string) {
    const session = await this.getSession(sessionId, userId);
    return session.messages;
  }
}
