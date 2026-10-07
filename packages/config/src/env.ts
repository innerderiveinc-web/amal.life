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

export function validateEnv(env: Record<string, string | undefined> = process.env): EnvSchema {
  const nodeEnv = (env.NODE_ENV || 'development') as EnvSchema['NODE_ENV'];
  const appEnv = (env.APP_ENV || 'local') as EnvSchema['APP_ENV'];
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
