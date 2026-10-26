/**
 * AMAL OS — USERS CONTROLLER
 * Manages seeker profile, preferences, and locale settings.
 */

import { Controller, Get, Post, Patch, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../common/auth/auth.guard.js';
import { CurrentUser } from '../../common/decorators/current-user.decorator.js';
import { AuthenticatedUser } from '../../common/auth/auth.types.js';
import { db } from '@amal/database';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  @Get('sync')
  async getSyncState(@CurrentUser() user: AuthenticatedUser) {
    const state = db.userSyncState.get(user.userId) || { version: 0, data: {}, syncedAt: null };
    return { success: true, data: state };
  }

  @Post('sync')
  async pushSyncState(
    @CurrentUser() user: AuthenticatedUser,
    @Body() body: any,
  ) {
    const timestamp = new Date().toISOString();
    const previous = db.userSyncState.get(user.userId) || { version: 0, data: {}, syncedAt: timestamp };
    const updated = {
      version: (previous.version || 0) + 1,
      data: {
        ...previous.data,
        ...body,
        updatedAt: timestamp,
      },
      syncedAt: timestamp,
      userId: user.userId,
    };
    db.userSyncState.set(user.userId, updated);
    return {
      success: true,
      data: {
        syncedAt: updated.syncedAt,
        version: updated.version,
        recordsSynced: Object.keys(body || {}).length,
      },
    };
  }

  @Get('me')
  async getProfile(@CurrentUser() user: AuthenticatedUser) {
    const profile = db.profiles.get(user.userId);
    return {
      userId: user.userId,
      email: user.roles?.includes('ADMIN') ? 'admin@amal.local' : 'seeker@amal.local',
      profile: profile || {
        displayName: 'Seeker',
        language: 'en',
        timezone: 'Asia/Kolkata',
      },
    };
  }

  @Patch('me')
  async updateProfile(
    @CurrentUser() user: AuthenticatedUser,
    @Body() body: any,
  ) {
    const existing = db.profiles.get(user.userId) || {
      userId: user.userId,
      displayName: 'Seeker',
      language: 'en',
      country: 'IN',
      timezone: 'Asia/Kolkata',
      lifeStage: 'YOUNG_PROFESSIONAL',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updated = { ...existing, ...body, updatedAt: new Date().toISOString() };
    db.profiles.set(user.userId, updated);
    return updated;
  }

  @Get('me/preferences')
  async getPreferences(@CurrentUser() user: AuthenticatedUser) {
    const prefs = db.preferences.get(user.userId);
    return prefs || {
      userId: user.userId,
      prayerCalculationMethod: 'MWL',
      asrJuristicMethod: 'STANDARD',
      madhhab: 'Hanafi',
      dailyTimeBudgetMinutes: 15,
      notificationIntensity: 'CALM',
    };
  }

  @Patch('me/preferences')
  async updatePreferences(
    @CurrentUser() user: AuthenticatedUser,
    @Body() body: any,
  ) {
    const existing = db.preferences.get(user.userId) || {
      userId: user.userId,
      prayerCalculationMethod: 'MWL',
      asrJuristicMethod: 'STANDARD',
      madhhab: 'Hanafi',
      dailyTimeBudgetMinutes: 15,
      notificationIntensity: 'CALM',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updated = { ...existing, ...body, updatedAt: new Date().toISOString() };
    db.preferences.set(user.userId, updated);
    return updated;
  }
}
