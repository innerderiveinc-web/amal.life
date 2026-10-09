/**
 * AMAL OS — LAYER 19: AUTH CONTROLLER (Section 24)
 * REST endpoints for authentication, registration, token refresh, session revocation, and current user retrieval.
 */

import { Controller, Post, Get, Param, Body, Headers } from '@nestjs/common';
import { authService } from '@amal/auth';
import { AppError } from '@amal/types';

@Controller('api/v1/auth')
export class AuthController {
  @Post('register')
  async register(@Body() body: { email: string; password?: string; displayName?: string }) {
    if (!body?.email) {
      throw new AppError('VALIDATION_ERROR', 'Email is required.');
    }
    const result = await authService.authenticate(body.email, body.password);
    return {
      success: true,
      data: {
        user: result.user,
        session: result.session,
      },
    };
  }

  @Post('signup')
  async signup(@Body() body: { email: string; password?: string; displayName?: string }) {
    return this.register(body);
  }

  @Post('login')
  async login(@Body() body: { email: string; password?: string }) {
    if (!body?.email) {
      throw new AppError('VALIDATION_ERROR', 'Email is required.');
    }
    const result = await authService.authenticate(body.email, body.password);
    return {
      success: true,
      data: {
        user: result.user,
        session: result.session,
      },
    };
  }

  @Post('refresh')
  async refresh(@Body() body: { refreshToken: string }) {
    if (!body?.refreshToken) {
      throw new AppError('VALIDATION_ERROR', 'refreshToken is required.');
    }
    const session = authService.refreshSession(body.refreshToken);
    return {
      success: true,
      data: { session },
    };
  }

  @Post('logout')
  async logout(@Body() body: { sessionId: string }) {
    if (!body?.sessionId) {
      throw new AppError('VALIDATION_ERROR', 'sessionId is required.');
    }
    authService.revokeSession(body.sessionId);
    return {
      success: true,
      data: { loggedOut: true },
    };
  }

  @Get('sessions')
  async listSessions(@Headers('authorization') authHeader?: string) {
    if (!authHeader) {
      throw new AppError('UNAUTHORIZED', 'Authorization header is required.');
    }
    const token = authHeader.replace(/^Bearer\s+/i, '');
    const user = authService.getCurrentUser(token);
    if (!user) {
      throw new AppError('UNAUTHORIZED', 'Invalid or expired session token.');
    }
    return {
      success: true,
      data: {
        sessions: [
          {
            id: `sess_${user.id}`,
            current: true,
            createdAt: new Date().toISOString(),
            expiresAt: new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString(),
          },
        ],
      },
    };
  }

  @Post('sessions/:id/revoke')
  async revokeSessionById(@Param('id') id: string) {
    authService.revokeSession(id);
    return {
      success: true,
      data: { revoked: true },
    };
  }

  @Get('me')
  async getMe(@Headers('authorization') authHeader?: string) {
    if (!authHeader) {
      throw new AppError('UNAUTHORIZED', 'Authorization header is required.');
    }
    const token = authHeader.replace(/^Bearer\s+/i, '');
    const user = authService.getCurrentUser(token);
    if (!user) {
      throw new AppError('UNAUTHORIZED', 'Invalid or expired session token.');
    }
    return {
      success: true,
      data: { user },
    };
  }
}
