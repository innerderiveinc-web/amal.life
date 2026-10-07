/**
 * AMAL OS — LAYER 20: SESSION SERVICE (Section 20.11)
 * Secure session manager storing SHA-256 hashed refresh tokens.
 */

import { Injectable } from '@nestjs/common';
import { createHash, randomBytes, randomUUID } from 'crypto';
import { PgClient } from '../../infrastructure/database/pg.client.js';

function hash(value: string): string {
  return createHash('sha256').update(value).digest('hex');
}

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

@Injectable()
export class SessionService {
  private readonly inMemorySessions = new Map<string, SessionRecord>();

  constructor(private readonly db: PgClient = new PgClient()) {}

  async create(
    userId: string,
    metadata: {
      deviceId?: string;
      userAgent?: string;
      ipHash?: string;
    } = {},
  ) {
    const sessionId = randomUUID();
    const refreshToken = randomBytes(48).toString('base64url');
    const refreshTokenHash = hash(refreshToken);
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString();

    const record: SessionRecord = {
      id: sessionId,
      userId,
      refreshTokenHash,
      deviceId: metadata.deviceId,
      userAgent: metadata.userAgent,
      ipHash: metadata.ipHash,
      expiresAt,
      createdAt: now.toISOString(),
      lastSeenAt: now.toISOString(),
    };

    this.inMemorySessions.set(sessionId, record);

    await this.db.query(
      `
      INSERT INTO auth_sessions (
        id,
        user_id,
        refresh_token_hash,
        device_id,
        user_agent,
        ip_hash,
        expires_at
      )
      VALUES ($1,$2,$3,$4,$5,$6,now() + interval '30 days')
      `,
      [
        sessionId,
        userId,
        refreshTokenHash,
        metadata.deviceId ?? null,
        metadata.userAgent ?? null,
        metadata.ipHash ?? null,
      ],
    );

    return {
      sessionId,
      refreshToken,
    };
  }

  async createSession(userId: string, metadata: any = {}) {
    return this.create(userId, metadata);
  }

  async refreshSession(sessionId: string, refreshToken: string) {
    const session = await this.findActive(sessionId);
    if (!session || session.refreshTokenHash !== hash(refreshToken)) {
      throw new Error('Invalid refresh token');
    }
    await this.revoke(sessionId);
    return this.create(session.userId);
  }

  async revoke(sessionId: string) {
    const session = this.inMemorySessions.get(sessionId);
    if (session) {
      session.revokedAt = new Date().toISOString();
    }
    await this.db.query(
      `
      UPDATE auth_sessions
      SET revoked_at = now()
      WHERE id = $1
      `,
      [sessionId],
    );
  }

  async findActive(sessionId: string): Promise<SessionRecord | null> {
    const session = this.inMemorySessions.get(sessionId);
    if (session && !session.revokedAt) return session;
    return null;
  }
}
