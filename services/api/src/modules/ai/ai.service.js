"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiService = void 0;
const service_ai_1 = require("@amal/service-ai");
class AiService {
    static async ask(dto, userId) {
        const request = {
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
        return await service_ai_1.IntelligenceRuntimeV1.execute(request);
    }
}
exports.AiService = AiService;
//# sourceMappingURL=ai.service.js.map