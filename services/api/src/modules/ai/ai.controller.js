"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiController = void 0;
const ask_ai_dto_js_1 = require("./dto/ask-ai.dto.js");
const ai_service_js_1 = require("./ai.service.js");
class AiController {
    static async handleAsk(body, userId) {
        const validation = (0, ask_ai_dto_js_1.validateAskAiDto)(body);
        if (!validation.valid) {
            return { success: false, error: { code: 'VALIDATION_ERROR', message: validation.error } };
        }
        const result = await ai_service_js_1.AiService.ask(body, userId);
        return { success: true, data: result };
    }
}
exports.AiController = AiController;
//# sourceMappingURL=ai.controller.js.map