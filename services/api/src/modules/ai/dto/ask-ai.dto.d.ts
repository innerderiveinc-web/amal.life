export interface AskAiDto {
    message: string;
    surface: 'ASK_AMAL' | 'TODAY' | 'JOURNEY' | 'REFLECTION' | 'SEARCH' | 'SCHOLAR';
    context_policy?: {
        allow_personalization: boolean;
        allow_memory: boolean;
        allow_journey_context: boolean;
    };
}
export declare function validateAskAiDto(dto: any): {
    valid: boolean;
    error?: string;
};
//# sourceMappingURL=ask-ai.dto.d.ts.map