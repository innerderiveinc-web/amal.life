"use strict";
/**
 * AMAL OS — LAYER 19: FAIL-FAST ENVIRONMENT VALIDATOR (Sections 19-20)
 * Validates critical runtime configuration on application startup.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEnv = validateEnv;
function validateEnv(env = process.env) {
    const nodeEnv = (env.NODE_ENV || 'development');
    const appEnv = (env.APP_ENV || 'local');
    const port = parseInt(env.PORT || '4000', 10);
    const databaseUrl = env.DATABASE_URL || 'postgresql://amal_user:amal_password@localhost:5432/amal_db?schema=public';
    const redisUrl = env.REDIS_URL || 'redis://localhost:6379';
    const jwtSecret = env.JWT_SECRET || 'amal-os-development-secret-key-change-in-prod-masvs-compliant';
    // Fail-fast rule in production: no fallback credentials permitted
    if (nodeEnv === 'production' || appEnv === 'production') {
        if (!env.DATABASE_URL) {
            throw new Error('[FATAL] DATABASE_URL must be explicitly configured in production.');
        }
        if (!env.JWT_SECRET || env.JWT_SECRET.includes('development-secret')) {
            throw new Error('[FATAL] Secure JWT_SECRET must be explicitly provided in production.');
        }
        if (!env.REDIS_URL) {
            throw new Error('[FATAL] REDIS_URL must be explicitly configured in production.');
        }
    }
    return {
        NODE_ENV: nodeEnv,
        APP_ENV: appEnv,
        DATABASE_URL: databaseUrl,
        REDIS_URL: redisUrl,
        PORT: port,
        JWT_SECRET: jwtSecret,
    };
}
//# sourceMappingURL=env.js.map