/**
 * AMAL OS — LAYER 19: SESSION SERVICE (Section 23)
 */

import { Session } from './auth.types.js';
import { UserId } from '@amal/types';

export class SessionService {
  private readonly sessions = new Map<string, Session>();
  private readonly tokenToSession = new Map<string, string>();
  private readonly refreshToSession = new Map<string, string>();

  createSession(userId: UserId): Session {
    const id = `sess_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const token = `token_${id}_${Math.random().toString(36).slice(2, 8)}`;
    const refreshToken = `ref_${id}_${Math.random().toString(36).slice(2, 8)}`;
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString();

    const session: Session = {
      id,
      userId,
      token,
      refreshToken,
      expiresAt,
      revoked: false,
      createdAt: now.toISOString(),
    };

    this.sessions.set(id, session);
    this.tokenToSession.set(token, id);
    this.refreshToSession.set(refreshToken, id);

    return session;
  }

  getSessionByToken(token: string): Session | null {
    const id = this.tokenToSession.get(token);
    if (!id) return null;
    const session = this.sessions.get(id);
    if (!session || session.revoked) return null;
    return session;
  }

  refreshSession(refreshToken: string): Session {
    const id = this.refreshToSession.get(refreshToken);
    if (!id) throw new Error('Invalid refresh token.');
    const session = this.sessions.get(id);
    if (!session || session.revoked) throw new Error('Session is revoked or expired.');

    session.revoked = true;
    return this.createSession(session.userId);
  }

  revokeSession(sessionId: string): void {
    const session = this.sessions.get(sessionId);
    if (session) {
      session.revoked = true;
    }
  }
}

export const sessionService = new SessionService();
