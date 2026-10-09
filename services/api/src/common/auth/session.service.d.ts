/**
 * AMAL OS — LAYER 20: SESSION SERVICE (Section 20.11)
 * Secure session manager storing SHA-256 hashed refresh tokens.
 */
import { PgClient } from '../../infrastructure/database/pg.client.js';
export interface SessionRecord {
    id: string;
    userId: string;
    refreshTokenHash: string;
    deviceId?: string;
    userAgent?: string;
    ipHash?: string;
    expiresAt: string;
    revokedAt?: string;
    createdAt: string;
    lastSeenAt: string;
}
export declare class SessionService {
    private readonly db;
    private readonly inMemorySessions;
    constructor(db?: PgClient);
    create(userId: string, metadata?: {
        deviceId?: string;
        userAgent?: string;
        ipHash?: string;
    }): Promise<{
        sessionId: `${string}-${string}-${string}-${string}-${string}`;
        refreshToken: string;
    }>;
    createSession(userId: string, metadata?: any): Promise<{
        sessionId: `${string}-${string}-${string}-${string}-${string}`;
        refreshToken: string;
    }>;
    refreshSession(sessionId: string, refreshToken: string): Promise<{
        sessionId: `${string}-${string}-${string}-${string}-${string}`;
        refreshToken: string;
    }>;
    revoke(sessionId: string): Promise<void>;
    findActive(sessionId: string): Promise<SessionRecord | null>;
}
//# sourceMappingURL=session.service.d.ts.map