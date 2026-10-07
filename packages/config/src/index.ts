export interface FeatureFlags {
  ENABLE_AI: boolean;
  ENABLE_FAMILY: boolean;
  ENABLE_SCHOLAR: boolean;
  ENABLE_NEW_MUSLIM: boolean;
  ENABLE_ADVANCED_JOURNEYS: boolean;
  ENABLE_VOICE: boolean;
}

export const DEFAULT_FEATURE_FLAGS: FeatureFlags = {
  ENABLE_AI: true,
  ENABLE_FAMILY: true,
  ENABLE_SCHOLAR: true,
  ENABLE_NEW_MUSLIM: true,
  ENABLE_ADVANCED_JOURNEYS: true,
  ENABLE_VOICE: false, // Planned for future releases
};

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

export const loadConfig = (): AppConfig => {
  return {
    env: (process.env.NODE_ENV as AppConfig['env']) || 'development',
    port: parseInt(process.env.PORT || '4000', 10),
    databaseUrl:
      process.env.DATABASE_URL ||
      'postgresql://amal_user:amal_password@localhost:5432/amal_db?schema=public',
    redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
    jwtSecret: process.env.JWT_SECRET || 'amal-os-development-secret-key-change-in-prod-masvs-compliant',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
    quranApiBaseUrl: process.env.QURAN_API_BASE_URL || 'https://api.quran.com/api/v4',
    aiGateway: {
      primaryProvider: (process.env.AI_PROVIDER as any) || 'mock',
      apiKey: process.env.AI_API_KEY,
      model: process.env.AI_MODEL || 'gemini-1.5-pro',
      fastModel: process.env.AI_FAST_MODEL || 'gemini-1.5-flash',
      temperature: 0.2, // Low temperature for high deterministic grounding
      maxRetries: 2,
    },
    features: {
      ENABLE_AI: process.env.FEATURE_ENABLE_AI !== 'false',
      ENABLE_FAMILY: process.env.FEATURE_ENABLE_FAMILY !== 'false',
      ENABLE_SCHOLAR: process.env.FEATURE_ENABLE_SCHOLAR !== 'false',
      ENABLE_NEW_MUSLIM: process.env.FEATURE_ENABLE_NEW_MUSLIM !== 'false',
      ENABLE_ADVANCED_JOURNEYS: process.env.FEATURE_ENABLE_ADVANCED_JOURNEYS !== 'false',
      ENABLE_VOICE: process.env.FEATURE_ENABLE_VOICE === 'true',
    },
    rateLimits: {
      publicRequestsPerMinute: 60,
      authenticatedRequestsPerMinute: 300,
      aiQueriesPerMinute: 20,
    },
    monetization: {
      amalPlusMonthlyInr: 199,
      amalPlusAnnualInr: 1499,
      amalFamilyMonthlyInr: 499,
      amalFamilyAnnualInr: 4999,
    },
  };
};

export const config = loadConfig();
