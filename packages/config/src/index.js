"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.loadConfig = exports.DEFAULT_FEATURE_FLAGS = void 0;
exports.DEFAULT_FEATURE_FLAGS = {
    ENABLE_AI: true,
    ENABLE_FAMILY: true,
    ENABLE_SCHOLAR: true,
    ENABLE_NEW_MUSLIM: true,
    ENABLE_ADVANCED_JOURNEYS: true,
    ENABLE_VOICE: false, // Planned for future releases
};
const loadConfig = () => {
    return {
        env: process.env.NODE_ENV || 'development',
        port: parseInt(process.env.PORT || '4000', 10),
        databaseUrl: process.env.DATABASE_URL ||
            'postgresql://amal_user:amal_password@localhost:5432/amal_db?schema=public',
        redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
        jwtSecret: process.env.JWT_SECRET || 'amal-os-development-secret-key-change-in-prod-masvs-compliant',
        jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
        quranApiBaseUrl: process.env.QURAN_API_BASE_URL || 'https://api.quran.com/api/v4',
        aiGateway: {
            primaryProvider: process.env.AI_PROVIDER || 'mock',
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
exports.loadConfig = loadConfig;
exports.config = (0, exports.loadConfig)();
__exportStar(require("./env.js"), exports);
//# sourceMappingURL=index.js.map