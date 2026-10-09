"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAskAiDto = validateAskAiDto;
function validateAskAiDto(dto) {
    if (!dto.message || typeof dto.message !== 'string' || dto.message.trim().length === 0) {
        return { valid: false, error: 'Field "message" is required and cannot be empty.' };
    }
    if (dto.message.length > 3000) {
        return { valid: false, error: 'Field "message" exceeds 3000 character maximum budget.' };
    }
    return { valid: true };
}
//# sourceMappingURL=ask-ai.dto.js.map