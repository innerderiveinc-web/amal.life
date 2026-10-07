import {
  ApiResponse,
  User,
  UserProfile,
  UserPreference,
  Journey,
  Reflection,
} from '@amal/types';
import { db, SEED_JOURNEY_TEMPLATES } from '@amal/database';
import { quranProvider, IslamicEvidenceGraph } from '@amal/evidence';
import { PrivacyCenter } from '@amal/auth';
import { AIOrchestrator, JourneyAgent, ReflectionAgent } from '@amal/service-ai';
import { PrayerService } from './prayer-service.js';

export interface RequestContext {
  userId: string;
  userRole: string;
  ip?: string;
}

export class ApiRouter {
  public static async handle(
    method: string,
    path: string,
    body: any,
    ctx: RequestContext
  ): Promise<ApiResponse<any>> {
    const timestamp = new Date().toISOString();
    const requestId = `req-${Date.now()}`;
    const version = '1.0.0';

    try {
      // -----------------------------------------------------
      // /api/v1/auth
      // -----------------------------------------------------
      if (path === '/api/v1/auth/register' && method === 'POST') {
        const { email, displayName, language, lifeStage, madhhab } = body;
        const userId = `usr-${Date.now()}`;
        const newUser: User = {
          id: userId,
          email,
          role: 'USER',
          status: 'ACTIVE',
          createdAt: timestamp,
          updatedAt: timestamp,
        };
        db.users.set(userId, newUser);

        const newProfile: UserProfile = {
          userId,
          displayName: displayName || 'New Seeker',
          language: language || 'en',
          country: 'IN',
          timezone: 'Asia/Kolkata',
          lifeStage: lifeStage || 'YOUNG_PROFESSIONAL',
          createdAt: timestamp,
          updatedAt: timestamp,
        };
        db.profiles.set(userId, newProfile);

        const newPref: UserPreference = {
          userId,
          madhhab: madhhab || 'GENERAL',
          prayerCalculationMethod: 'MUSLIM_WORLD_LEAGUE',
          reminderStyle: 'CALM',
          notificationPreferences: {
            salah: true,
            amal: true,
            reflection: true,
            journey: true,
            scholar: true,
            family: true,
          },
          contentPreferences: {
            preferredLanguage: 'en',
            showScholarlyDifferences: true,
            primaryGoals: [],
          },
          privacyPreferences: {
            allowAiMemory: true,
            allowBehavioralContext: true,
            allowFamilyProgressShare: false,
            allowAnalytics: false,
          },
          updatedAt: timestamp,
        };
        db.preferences.set(userId, newPref);

        return {
          success: true,
          data: { user: newUser, profile: newProfile, token: `jwt-token-${userId}` },
          metadata: { timestamp, requestId, version },
        };
      }

      // -----------------------------------------------------
      // /api/v1/profile
      // -----------------------------------------------------
      if (path === '/api/v1/profile' && method === 'GET') {
        const profile = db.profiles.get(ctx.userId) || null;
        return { success: true, data: profile, metadata: { timestamp, requestId, version } };
      }

      if (path === '/api/v1/profile' && method === 'PUT') {
        const current = db.profiles.get(ctx.userId);
        if (!current) throw new Error('Profile not found');
        const updated = { ...current, ...body, updatedAt: timestamp };
        db.profiles.set(ctx.userId, updated);
        return { success: true, data: updated, metadata: { timestamp, requestId, version } };
      }

      // -----------------------------------------------------
      // /api/v1/preferences
      // -----------------------------------------------------
      if (path === '/api/v1/preferences' && method === 'GET') {
        const pref = db.preferences.get(ctx.userId) || null;
        return { success: true, data: pref, metadata: { timestamp, requestId, version } };
      }

      if (path === '/api/v1/preferences' && method === 'PUT') {
        const current = db.preferences.get(ctx.userId);
        if (!current) throw new Error('Preferences not found');
        const updated = { ...current, ...body, updatedAt: timestamp };
        db.preferences.set(ctx.userId, updated);
        return { success: true, data: updated, metadata: { timestamp, requestId, version } };
      }

      // -----------------------------------------------------
      // /api/v1/prayers
      // -----------------------------------------------------
      if (path === '/api/v1/prayers' && method === 'GET') {
        const pref = db.preferences.get(ctx.userId);
        const schedule = PrayerService.getSchedule(
          body?.date,
          'Asia/Kolkata',
          pref?.prayerCalculationMethod,
          pref?.madhhab
        );
        return { success: true, data: schedule, metadata: { timestamp, requestId, version } };
      }

      if (path === '/api/v1/prayers/complete' && method === 'POST') {
        const { prayerName, date, inCongregation, sunnah, notes } = body;
        const event = await PrayerService.recordPrayer(
          ctx.userId,
          prayerName,
          date || timestamp.split('T')[0],
          inCongregation,
          sunnah,
          notes
        );
        return { success: true, data: event, metadata: { timestamp, requestId, version } };
      }

      // -----------------------------------------------------
      // /api/v1/quran
      // -----------------------------------------------------
      if (path === '/api/v1/quran/surahs' && method === 'GET') {
        const surahs = await quranProvider.getSurahs();
        return { success: true, data: surahs, metadata: { timestamp, requestId, version } };
      }

      if (path.startsWith('/api/v1/quran/ayah') && method === 'GET') {
        const surah = parseInt(body?.surah || '1', 10);
        const ayah = parseInt(body?.ayah || '1', 10);
        const verse = await quranProvider.getAyah(surah, ayah);
        const tafsir = await quranProvider.getTafsir(surah, ayah);
        return {
          success: true,
          data: { verse, tafsir },
          metadata: { timestamp, requestId, version },
        };
      }

      // -----------------------------------------------------
      // /api/v1/evidence & search
      // -----------------------------------------------------
      if (path === '/api/v1/evidence/sources' && method === 'GET') {
        const sources = Array.from(db.sources.values());
        return { success: true, data: sources, metadata: { timestamp, requestId, version } };
      }

      if (path === '/api/v1/search' && method === 'POST') {
        const { query } = body;
        const results = await IslamicEvidenceGraph.queryPassages(query || '', 5);
        return { success: true, data: results, metadata: { timestamp, requestId, version } };
      }

      // -----------------------------------------------------
      // /api/v1/ai/ask (Ask AMAL Intelligence Loop)
      // -----------------------------------------------------
      if (path === '/api/v1/ai/ask' && method === 'POST') {
        const { question } = body;
        const result = await AIOrchestrator.processQuery({
          userId: ctx.userId,
          query: question,
        });
        return {
          success: true,
          data: result.response,
          metadata: { timestamp, requestId, version },
        };
      }

      // -----------------------------------------------------
      // /api/v1/amal
      // -----------------------------------------------------
      if (path === '/api/v1/amal/today' && method === 'GET') {
        // Return today's primary action
        const activeJourneys = Array.from(db.journeys.values()).filter(
          (j) => j.userId === ctx.userId && j.status === 'ACTIVE'
        );
        const currentJourney = activeJourneys[0] || null;
        let todayAction = null;

        if (currentJourney && currentJourney.days.length > 0) {
          const currentDayObj = currentJourney.days[currentJourney.currentDay - 1];
          if (currentDayObj && currentDayObj.actions.length > 0) {
            todayAction = currentDayObj.actions[0];
          }
        }

        return {
          success: true,
          data: {
            journey: currentJourney,
            action: todayAction,
          },
          metadata: { timestamp, requestId, version },
        };
      }

      // -----------------------------------------------------
      // /api/v1/journeys
      // -----------------------------------------------------
      if (path === '/api/v1/journeys/templates' && method === 'GET') {
        return {
          success: true,
          data: SEED_JOURNEY_TEMPLATES,
          metadata: { timestamp, requestId, version },
        };
      }

      if (path === '/api/v1/journeys/start' && method === 'POST') {
        const { journeyType } = body;
        const journey = JourneyAgent.createJourneyFromTemplate(ctx.userId, journeyType);
        db.journeys.set(journey.id, journey);
        return { success: true, data: journey, metadata: { timestamp, requestId, version } };
      }

      if (path === '/api/v1/journeys' && method === 'GET') {
        const userJourneys = Array.from(db.journeys.values()).filter(
          (j) => j.userId === ctx.userId
        );
        return { success: true, data: userJourneys, metadata: { timestamp, requestId, version } };
      }

      // -----------------------------------------------------
      // /api/v1/reflections
      // -----------------------------------------------------
      if (path === '/api/v1/reflections' && method === 'POST') {
        const { wentWell, feltDifficult, tomorrowIntention, gratitude } = body;
        const ref: Reflection = {
          id: `ref-${Date.now()}`,
          userId: ctx.userId,
          reflectionType: 'DAILY_MUHASABAH',
          wentWell,
          feltDifficult,
          tomorrowIntention,
          gratitude,
          privateToUser: true,
          createdAt: timestamp,
        };
        const currentRefs = db.reflections.get(ctx.userId) || [];
        currentRefs.push(ref);
        db.reflections.set(ctx.userId, currentRefs);

        // Derive behavioral observations
        const insights = ReflectionAgent.analyzeReflections(ctx.userId, currentRefs);

        return {
          success: true,
          data: { reflection: ref, newInsights: insights },
          metadata: { timestamp, requestId, version },
        };
      }

      if (path === '/api/v1/reflections/insights' && method === 'GET') {
        const currentRefs = db.reflections.get(ctx.userId) || [];
        const insights = ReflectionAgent.analyzeReflections(ctx.userId, currentRefs);
        return { success: true, data: insights, metadata: { timestamp, requestId, version } };
      }

      // -----------------------------------------------------
      // /api/v1/scholars & cases
      // -----------------------------------------------------
      if (path === '/api/v1/scholars' && method === 'GET') {
        const scholars = Array.from(db.scholars.values());
        return { success: true, data: scholars, metadata: { timestamp, requestId, version } };
      }

      if (path === '/api/v1/cases' && method === 'GET') {
        const userCases = Array.from(db.scholarCases.values()).filter(
          (c) => c.userId === ctx.userId || ctx.userRole === 'SCHOLAR'
        );
        return { success: true, data: userCases, metadata: { timestamp, requestId, version } };
      }

      // -----------------------------------------------------
      // /api/v1/privacy
      // -----------------------------------------------------
      if (path === '/api/v1/privacy/export' && method === 'GET') {
        const exportData = await PrivacyCenter.exportUserData(ctx.userId);
        return { success: true, data: exportData, metadata: { timestamp, requestId, version } };
      }

      if (path === '/api/v1/privacy/delete-account' && method === 'POST') {
        await PrivacyCenter.deleteUserAccount(ctx.userId);
        return { success: true, data: { deleted: true }, metadata: { timestamp, requestId, version } };
      }

      // -----------------------------------------------------
      // /api/v1/admin
      // -----------------------------------------------------
      if (path === '/api/v1/admin/dashboard' && method === 'GET') {
        return {
          success: true,
          data: {
            totalUsers: db.users.size,
            totalSources: db.sources.size,
            totalPassages: db.passages.size,
            totalJourneys: db.journeys.size,
            totalScholarCases: db.scholarCases.size,
            auditLogsCount: db.auditLogs.length,
          },
          metadata: { timestamp, requestId, version },
        };
      }

      return {
        success: false,
        error: { code: 'NOT_FOUND', message: `Route ${method} ${path} does not exist.` },
        metadata: { timestamp, requestId, version },
      };
    } catch (err: any) {
      return {
        success: false,
        error: { code: 'INTERNAL_ERROR', message: err.message },
        metadata: { timestamp, requestId, version },
      };
    }
  }
}
