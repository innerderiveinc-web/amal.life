export interface ApiErrorPayload {
    code: string;
    message: string;
    request_id: string;
    retryable: boolean;
    details?: unknown;
}
export interface ApiResponse<T = unknown> {
    success: boolean;
    data?: T;
    error?: ApiErrorPayload;
    metadata?: {
        timestamp: string;
        request_id: string;
        version: string;
    };
}
export interface PaginatedResult<T> {
    items: T[];
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
}
export interface RegisterDto {
    email: string;
    password?: string;
    display_name: string;
}
export interface LoginDto {
    email: string;
    password?: string;
}
export interface AuthResponseDto {
    user_id: string;
    session_id: string;
    access_token: string;
    refresh_token: string;
    expires_in: number;
}
export interface OnboardingDto {
    intent: string;
    life_stage: 'student' | 'professional' | 'parent' | 'married' | 'entrepreneur' | 'new_muslim' | 'other';
    focus_areas: string[];
    daily_available_minutes: number;
    notification_preference: 'calm' | 'minimal' | 'none';
}
export interface ContextItemDto {
    key: string;
    value: string;
    confidence: number;
    category?: string;
    source?: string;
    visibility?: string;
    editable?: boolean;
}
export interface UserContextResponseDto {
    explicit: ContextItemDto[];
    behavioral: ContextItemDto[];
    derived: ContextItemDto[];
}
export interface EvidenceSearchDto {
    query: string;
    language?: string;
    topic?: string;
    include?: ('quran' | 'hadith' | 'tafsir')[];
}
export interface EvidenceSearchResultItem {
    source_id: string;
    source_type: string;
    reference: string;
    relevance: number;
    authority: string;
    verification_status: string;
    arabic_text?: string | null;
    translation: string;
}
export interface EvidenceChainNode {
    step: number;
    node_type: 'USER_QUESTION' | 'ISLAMIC_CONCEPT' | 'QURAN_AYAH' | 'TAFSIR' | 'SCHOLARLY_INTERPRETATION' | 'PRACTICAL_GUIDANCE';
    title: string;
    reference?: string;
    explanation: string;
    source_id?: string;
}
export interface AskAmalRequestDto {
    message: string;
    conversation_id?: string;
    context_mode?: 'personalized' | 'minimal';
}
export interface AskAmalResponseDto {
    response_id: string;
    intent: {
        type: string;
        confidence: number;
    };
    safety: {
        class: 'A' | 'B' | 'C' | 'D' | 'E';
        scholar_required: boolean;
        crisis_intercept?: boolean;
    };
    answer: {
        summary: string;
        explanation: string;
    };
    evidence: {
        source_id: string;
        reference: string;
    }[];
    actions: {
        type: string;
        title: string;
        duration_minutes: number;
        evidence_reference?: string;
    }[];
    journey: {
        recommended: boolean;
        journey_type?: string;
        journey_title?: string;
    };
    confidence: number;
    citations_verified: boolean;
    scholar_case_id?: string;
}
export interface AmalGenerateDto {
    goal: string;
    duration_days: number;
    daily_minutes: number;
    difficulty?: 'beginner' | 'moderate' | 'steady';
}
export interface CompleteAmalDto {
    completion_type: 'completed' | 'skipped' | 'adapted';
    actual_duration_minutes: number;
    reflection_notes?: string;
}
export type ReportType = 'INCORRECT_CITATION' | 'INCORRECT_TRANSLATION' | 'MISLEADING' | 'MISSING_SCHOLARLY_VIEW' | 'OFFENSIVE' | 'SAFETY_CONCERN' | 'OTHER';
export interface SubmitReportDto {
    type: ReportType;
    target_id: string;
    details: string;
}
//# sourceMappingURL=api.d.ts.map