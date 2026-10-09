/**
 * AMAL OS — LAYER 19: FAIL-FAST ENVIRONMENT VALIDATOR (Sections 19-20)
 * Validates critical runtime configuration on application startup.
 */
export interface EnvSchema {
    NODE_ENV: 'development' | 'test' | 'staging' | 'production';
    APP_ENV: 'local' | 'staging' | 'production';
    DATABASE_URL: string;
    REDIS_URL: string;
    PORT: number;
    JWT_SECRET: string;
}
export declare function validateEnv(env?: Record<string, string | undefined>): EnvSchema;
//# sourceMappingURL=env.d.ts.map