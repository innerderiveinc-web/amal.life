/**
 * AMAL OS — LAYER 19: AUTH SERVICE (Section 23)
 */

import { User, UserId, AppError, toUserId } from '@amal/types';
import { identityProvider } from './identity.js';
import { sessionService } from './session.service.js';
import { AuthResult, Session } from './auth.types.js';
import { db } from '@amal/database';

export class AuthService {
  async authenticate(email: string, password?: string): Promise<AuthResult> {
    if (!email) {
      throw new AppError('VALIDATION_ERROR', 'Email is required.');
    }
    const user = await identityProvider.verifyCredentials(email, password);
    if (!user) {
      throw new AppError('UNAUTHORIZED', 'Invalid credentials.');
    }
    const session = sessionService.createSession(toUserId(user.id));
    return { user, session };
  }

  createSession(userId: UserId): Session {
    return sessionService.createSession(userId);
  }

  refreshSession(refreshToken: string): Session {
    return sessionService.refreshSession(refreshToken);
  }

  revokeSession(sessionId: string): void {
    sessionService.revokeSession(sessionId);
  }

  getCurrentUser(token: string): User | null {
    const session = sessionService.getSessionByToken(token);
    if (!session) return null;
    return db.users.get(session.userId) || null;
  }
}

export const authService = new AuthService();
