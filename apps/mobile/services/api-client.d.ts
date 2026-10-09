import { TodayResponse } from '@amal/types';
export interface AmalCompletionPayload {
    amalId: string;
    outcome: 'FULL' | 'PARTIAL' | 'MINIMUM' | 'SKIPPED' | 'SNOOZED';
    completedDurationMinutes?: number;
    frictionReason?: string;
    idempotencyKey?: string;
}
export declare class AmalApiClient {
    private baseUrl;
    constructor(baseUrl?: string);
    getToday(): Promise<TodayResponse>;
    completeAmal(payload: AmalCompletionPayload): Promise<{
        success: boolean;
        eventId: string;
    }>;
    saveReflection(data: {
        wentWell: string;
        feltDifficult: string;
        tomorrow: string;
    }): Promise<{
        success: boolean;
    }>;
}
export declare const amalApi: AmalApiClient;
//# sourceMappingURL=api-client.d.ts.map