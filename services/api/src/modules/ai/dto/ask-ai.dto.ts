export interface AskAiDto {
  message: string;
  surface: 'ASK_AMAL' | 'TODAY' | 'JOURNEY' | 'REFLECTION' | 'SEARCH' | 'SCHOLAR';
  context_policy?: {
    allow_personalization: boolean;
    allow_memory: boolean;
    allow_journey_context: boolean;
  };
}

export function validateAskAiDto(dto: any): { valid: boolean; error?: string } {
  if (!dto.message || typeof dto.message !== 'string' || dto.message.trim().length === 0) {
    return { valid: false, error: 'Field "message" is required and cannot be empty.' };
  }
  if (dto.message.length > 3000) {
    return { valid: false, error: 'Field "message" exceeds 3000 character maximum budget.' };
  }
  return { valid: true };
}
