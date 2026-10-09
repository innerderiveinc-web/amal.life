export interface FeatureFlags {
    ENABLE_AI: boolean;
    ENABLE_FAMILY: boolean;
    ENABLE_SCHOLAR: boolean;
    ENABLE_NEW_MUSLIM: boolean;
    ENABLE_ADVANCED_JOURNEYS: boolean;
    ENABLE_VOICE: boolean;
}
export declare const DEFAULT_FEATURE_FLAGS: FeatureFlags;
export interface AppConfig {
    env: 'development' | 'staging' | 'production' | 'test';
    port: number;
    databaseUrl: string;
    redisUrl: string;
    jwtSecret: string;
    jwtExpiresIn: string;
    quranApiBaseUrl: string;
    aiGateway: {
        primaryProvider: 'gemini' | 'openai' | 'anthropic' | 'mock';
        apiKey?: string;
        model: string;
        fastModel: string;
        temperature: number;
        maxRetries: number;
    };
    features: FeatureFlags;
    rateLimits: {
        publicRequestsPerMinute: number;
        authenticatedRequestsPerMinute: number;
        aiQueriesPerMinute: number;
    };
    monetization: {
        amalPlusMonthlyInr: number;
        amalPlusAnnualInr: number;
        amalFamilyMonthlyInr: number;
        amalFamilyAnnualInr: number;
    };
}
export declare const loadConfig: () => AppConfig;
export declare const config: AppConfig;
export * from './env.js';
//# sourceMappingURL=index.d.ts.map