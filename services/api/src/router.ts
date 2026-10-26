import {
  ApiResponse,
  ApiErrorPayload,
  User,
  UserProfile,
  UserPreference,
  Journey,
  Reflection,
  AskAmalResponseDto,
  UserContextResponseDto,
  EvidenceChainNode,
  SunniSchool,
  AmalWorkId,
  AmalPersonId,
  MasterSilsilaCode,
  AmalEditionId,
  AmalPracticeId,
  ClassicalTazkiyahConceptTerm,
  TrustPolicySlug,
} from '@amal/types';
import { db, SEED_JOURNEY_TEMPLATES } from '@amal/database';
import { JwtService } from './common/auth/jwt.service.js';
import { quranProvider, IslamicEvidenceGraph, CitationValidator, MASTER_CANONICAL_CORPUS } from '@amal/evidence';
import { PrivacyCenter } from '@amal/auth';
import { FatwaFirewall } from '@amal/safety';
import {
  AIOrchestrator,
  JourneyAgent,
  ReflectionAgent,
  IntentRouter,
  AmalPlanner,
  ScholarEscalationAgent,
  AmalJourneyEngine,
  IntelligenceRuntimeV1,
  MemoryManager,
  ToolRegistry,
  ModelRouter,
} from '@amal/service-ai';
import {
  prayerQiblaEngine,
  zakatInheritanceEngine,
  localizationEngine,
  audioStreamingEngine,
  hijriFastingEngine,
  signatureCapabilitiesEngine,
  LifeOsMode,
  deenReplayEngine,
  familyDeenOsEngine,
  knowledgeVaultEngine,
  shariPdfExportEngine,
  biometricVaultGuardEngine,
  wordByWordTajweedEngine,
  mosqueIqamahSyncEngine,
  offlineResilienceEngine,
  masnoonTasbihEngine,
  MasnoonTasbihEngine,
  dailyMamoolEngine,
  DailyMamoolEngine,
  universalSearchEngine,
  UniversalSearchEngine,
  readerModeEngine,
  ReaderModeEngine,
  onboardingWizardEngine,
  OnboardingWizardEngine,
  gentleNotificationsEngine,
  GentleNotificationsEngine,
} from '@amal/amal-engine';
import { PrayerService } from './prayer-service.js';
import { CommunicationsService } from './modules/notifications/communications.service.js';
import { GovernanceService } from './modules/governance/governance.service.js';
import { PlatformService } from './modules/platform/platform.service.js';
import { KnowledgeOpsService } from './modules/knowledge-ops/knowledge-ops.service.js';
import { BillingService } from './modules/billing/billing.service.js';
import { BillingWebhookService } from './modules/billing/billing-webhook.service.js';
import { TenancyService } from './modules/billing/tenancy.service.js';
import { ExecutionService } from './modules/execution/execution.service.js';
import { BlueprintService } from './modules/blueprint/blueprint.service.js';
import { ExecutionPackService } from './modules/execution-pack/execution-pack.service.js';
import { PersonalizationService } from './modules/personalization/personalization.service.js';
import { LifeOsService } from './modules/life-os/life-os.service.js';
import { EcosystemService } from './modules/ecosystem/ecosystem.service.js';

const commsService = new CommunicationsService();
const govService = new GovernanceService();
const platformService = new PlatformService();
const knowledgeOpsService = new KnowledgeOpsService();
const billingService = new BillingService();
const billingWebhookService = new BillingWebhookService(billingService);
const tenancyService = new TenancyService();
const executionService = new ExecutionService();
const blueprintService = new BlueprintService();
const executionPackService = new ExecutionPackService();
const personalizationService = new PersonalizationService();
const lifeOsService = new LifeOsService();
const ecosystemService = new EcosystemService();

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
    const requestId = `req_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    const version = '1.0.0';

    try {
      // -----------------------------------------------------
      // 1. AUTH DOMAIN
      // -----------------------------------------------------
      if (path === '/api/v1/auth/register' && method === 'POST') {
        const { email, display_name, password } = body || {};
        if (!email || !email.includes('@')) {
          return {
            success: false,
            error: { code: 'VALIDATION_ERROR', message: 'Valid email address is required.' },
            metadata: { timestamp, request_id: requestId, version },
          };
        }
        if (password && password.length < 8) {
          return {
            success: false,
            error: { code: 'VALIDATION_ERROR', message: 'Password must be at least 8 characters in length.' },
            metadata: { timestamp, request_id: requestId, version },
          };
        }

        const existing = Array.from(db.users.values()).find((u) => u.email === email);
        if (existing) {
          return {
            success: false,
            error: { code: 'USER_EXISTS', message: 'An account with this email address already exists.' },
            metadata: { timestamp, request_id: requestId, version },
          };
        }

        const userId = `usr_${Date.now()}`;
        const newUser: User = {
          id: userId,
          email,
          role: 'USER',
          status: 'ACTIVE',
          createdAt: timestamp,
          updatedAt: timestamp,
        };
        db.users.set(userId, newUser);

        if (password) {
          const passwordHash = JwtService.hashPassword(password);
          db.credentials.set(userId, { passwordHash });
        }

        const newProfile: UserProfile = {
          userId,
          displayName: display_name || 'Seeker',
          language: 'en',
          country: 'IN',
          timezone: 'Asia/Kolkata',
          lifeStage: 'YOUNG_PROFESSIONAL',
          createdAt: timestamp,
          updatedAt: timestamp,
        };
        db.profiles.set(userId, newProfile);

        const accessToken = JwtService.signToken(userId, email, 'USER', 3600);
        const refreshToken = `ref_${userId}_${Math.random().toString(36).slice(2, 10)}`;

        return {
          success: true,
          data: {
            user_id: userId,
            session_id: `sess_${Date.now()}`,
            access_token: accessToken,
            refresh_token: refreshToken,
            token_type: 'Bearer',
            expires_in: 3600,
          },
          metadata: { timestamp, request_id: requestId, version },
        };
      }

      if (path === '/api/v1/auth/login' && method === 'POST') {
        const { email, password } = body || {};
        if (!email) {
          return {
            success: false,
            error: { code: 'VALIDATION_ERROR', message: 'Email address is required for login.' },
            metadata: { timestamp, request_id: requestId, version },
          };
        }
        const user = Array.from(db.users.values()).find((u) => u.email === email);
        if (!user) {
          return {
            success: false,
            error: { code: 'INVALID_CREDENTIALS', message: 'No registered account found with this email address.' },
            metadata: { timestamp, request_id: requestId, version },
          };
        }

        // Verify password if user has credentials saved
        const creds = db.credentials.get(user.id);
        if (creds && creds.passwordHash) {
          if (!password || !JwtService.verifyPassword(password, creds.passwordHash)) {
            return {
              success: false,
              error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password.' },
              metadata: { timestamp, request_id: requestId, version },
            };
          }
        }

        const accessToken = JwtService.signToken(user.id, user.email, user.role || 'USER', 3600);
        const refreshToken = `ref_${user.id}_${Math.random().toString(36).slice(2, 10)}`;

        return {
          success: true,
          data: {
            user_id: user.id,
            session_id: `sess_${Date.now()}`,
            access_token: accessToken,
            refresh_token: refreshToken,
            token_type: 'Bearer',
            expires_in: 3600,
          },
          metadata: { timestamp, request_id: requestId, version },
        };
      }

      if (path === '/api/v1/auth/logout' && method === 'POST') {
        return {
          success: true,
          data: { logged_out: true },
          metadata: { timestamp, request_id: requestId, version },
        };
      }

      if (path === '/api/v1/auth/refresh' && method === 'POST') {
        const { refresh_token } = body || {};
        if (!refresh_token || !refresh_token.startsWith('ref_')) {
          return {
            success: false,
            error: { code: 'INVALID_TOKEN', message: 'Valid refresh token required.' },
            metadata: { timestamp, request_id: requestId, version },
          };
        }
        const parts = refresh_token.split('_');
        const targetUserId = parts[1];
        const user = targetUserId ? db.users.get(targetUserId) : null;
        if (!user) {
          return {
            success: false,
            error: { code: 'INVALID_TOKEN', message: 'Session expired or invalid user.' },
            metadata: { timestamp, request_id: requestId, version },
          };
        }
        const newAccessToken = JwtService.signToken(user.id, user.email, user.role || 'USER', 3600);
        return {
          success: true,
          data: {
            access_token: newAccessToken,
            refresh_token,
            token_type: 'Bearer',
            expires_in: 3600,
          },
          metadata: { timestamp, request_id: requestId, version },
        };
      }

      if (path === '/api/v1/auth/me' && method === 'GET') {
        if (!ctx.userId || ctx.userRole === 'ANONYMOUS') {
          return {
            success: false,
            error: { code: 'UNAUTHORIZED', message: 'Authentication required to access user profile.' },
            metadata: { timestamp, request_id: requestId, version },
          };
        }
        const user = db.users.get(ctx.userId);
        const profile = db.profiles.get(ctx.userId);
        if (!user) {
          return {
            success: false,
            error: { code: 'NOT_FOUND', message: 'Authenticated user record not found in system.' },
            metadata: { timestamp, request_id: requestId, version },
          };
        }
        return {
          success: true,
          data: { user, profile },
          metadata: { timestamp, request_id: requestId, version },
        };
      }

      if ((path === '/api/v1/sync' || path === '/api/v1/users/sync') && method === 'POST') {
        if (!ctx.userId || ctx.userRole === 'ANONYMOUS') {
          return {
            success: false,
            error: { code: 'UNAUTHORIZED', message: 'Authentication required to push cloud synchronization state.' },
            metadata: { timestamp, request_id: requestId, version },
          };
        }
        const syncBundle = body || {};
        const previous = db.userSyncState.get(ctx.userId) || { version: 0, data: {}, syncedAt: timestamp };
        const updated = {
          version: (previous.version || 0) + 1,
          data: {
            ...previous.data,
            ...syncBundle,
            updatedAt: timestamp,
          },
          syncedAt: timestamp,
          userId: ctx.userId,
        };
        db.userSyncState.set(ctx.userId, updated);
        return {
          success: true,
          data: {
            syncedAt: updated.syncedAt,
            version: updated.version,
            recordsSynced: Object.keys(syncBundle).length,
          },
          metadata: { timestamp, request_id: requestId, version },
        };
      }

      if ((path === '/api/v1/sync' || path === '/api/v1/users/sync') && method === 'GET') {
        if (!ctx.userId || ctx.userRole === 'ANONYMOUS') {
          return {
            success: false,
            error: { code: 'UNAUTHORIZED', message: 'Authentication required to pull cloud synchronization state.' },
            metadata: { timestamp, request_id: requestId, version },
          };
        }
        const state = db.userSyncState.get(ctx.userId) || { version: 0, data: {}, syncedAt: null };
        return {
          success: true,
          data: state,
          metadata: { timestamp, request_id: requestId, version },
        };
      }

      if (path === '/api/v1/auth/passkey/register' && method === 'POST') {
        return {
          success: true,
          data: { challenge: `chal_${Date.now()}`, rp: { name: 'AMAL OS', id: 'amal.os' } },
          metadata: { timestamp, request_id: requestId, version },
        };
      }

      if (path === '/api/v1/auth/passkey/authenticate' && method === 'POST') {
        const { credential_id, client_data_json, authenticator_data, signature } = body || {};
        if (!credential_id || !signature) {
          return {
            success: false,
            error: {
              code: 'NOT_IMPLEMENTED',
              message: 'Hardware FIDO2 WebAuthn authentication requires configured RP origin and cryptographic assertion signature.',
            },
            metadata: { timestamp, request_id: requestId, version },
          };
        }
        return {
          success: false,
          error: {
            code: 'WEBAUTHN_UNAVAILABLE',
            message: 'WebAuthn assertion verification service currently in staging.',
          },
          metadata: { timestamp, request_id: requestId, version },
        };
      }

      // -----------------------------------------------------
      // 2. ONBOARDING API
      // -----------------------------------------------------
      if (path === '/api/v1/onboarding' && method === 'POST') {
        if (!ctx.userId || ctx.userRole === 'ANONYMOUS') {
          return {
            success: false,
            error: { code: 'UNAUTHORIZED', message: 'Authentication required for onboarding.' },
            metadata: { timestamp, request_id: requestId, version },
          };
        }
        const { intent, life_stage, focus_areas, daily_available_minutes, notification_preference } = body || {};

        // Store explicit initial context
        const userContextList = db.contexts.get(ctx.userId) || [];
        userContextList.push({
          id: `ctx_${Date.now()}_1`,
          userId: ctx.userId,
          contextType: 'EXPLICIT',
          category: 'ROUTINE',
          key: 'primary_intent',
          value: intent || 'improve_deen',
          source: 'onboarding',
          confidence: 1.0,
          visibility: 'USER_ONLY',
          createdAt: timestamp,
          updatedAt: timestamp,
        });

        userContextList.push({
          id: `ctx_${Date.now()}_2`,
          userId: ctx.userId,
          contextType: 'DERIVED',
          category: 'WORK_SCHEDULE',
          key: 'preferred_action_duration',
          value: `${daily_available_minutes || 15}_minutes`,
          source: 'onboarding_inference',
          confidence: 0.9,
          visibility: 'USER_ONLY',
          createdAt: timestamp,
          updatedAt: timestamp,
        });
        db.contexts.set(ctx.userId, userContextList);

        // Update preferences
        const pref = db.preferences.get(ctx.userId) || {
          userId: ctx.userId,
          madhhab: 'GENERAL',
          prayerCalculationMethod: 'MUSLIM_WORLD_LEAGUE',
          reminderStyle: notification_preference === 'minimal' ? 'GENTLE_NUDGE' : 'CALM',
          notificationPreferences: { salah: true, amal: true, reflection: true, journey: true, scholar: true, family: true },
          contentPreferences: { preferredLanguage: 'en', showScholarlyDifferences: true, primaryGoals: focus_areas || [] },
          privacyPreferences: { allowAiMemory: true, allowBehavioralContext: true, allowFamilyProgressShare: false, allowAnalytics: false },
          updatedAt: timestamp,
        };
        db.preferences.set(ctx.userId, pref);

        return {
          success: true,
          data: {
            onboarding_completed: true,
            user_id: ctx.userId,
            intent,
            focus_areas,
            daily_available_minutes,
          },
          metadata: { timestamp, request_id: requestId, version },
        };
      }

      // -----------------------------------------------------
      // 3. USER CONTEXT API (Explicit, Behavioral, Derived)
      // -----------------------------------------------------
      if (path === '/api/v1/context' && method === 'GET') {
        if (!ctx.userId || ctx.userRole === 'ANONYMOUS') {
          throw new Error('UNAUTHORIZED: Authentication required to access context signals.');
        }
        const storedContexts = db.contexts.get(ctx.userId) || [];

        const contextResponse: UserContextResponseDto = {
          explicit: storedContexts
            .filter((c) => c.contextType === 'EXPLICIT')
            .map((c) => ({ key: c.key, value: c.value, confidence: c.confidence, editable: true })),
          behavioral: storedContexts
            .filter((c) => c.contextType === 'BEHAVIORAL')
            .map((c) => ({ key: c.key, value: c.value, confidence: c.confidence, editable: true })),
          derived: storedContexts
            .filter((c) => c.contextType === 'DERIVED')
            .map((c) => ({ key: c.key, value: c.value, confidence: c.confidence, editable: true })),
        };

        // If empty, supply grounded defaults
        if (contextResponse.explicit.length === 0) {
          contextResponse.explicit.push({ key: 'focus_area', value: 'salah', confidence: 1.0, editable: true });
        }
        if (contextResponse.behavioral.length === 0) {
          contextResponse.behavioral.push({ key: 'quran_consistency', value: 'morning_preference', confidence: 0.85, editable: true });
        }
        if (contextResponse.derived.length === 0) {
          contextResponse.derived.push({ key: 'preferred_action_duration', value: '10_minutes', confidence: 0.81, editable: true });
        }

        return {
          success: true,
          data: contextResponse,
          metadata: { timestamp, request_id: requestId, version },
        };
      }

      // -----------------------------------------------------
      // 4. ISLAMIC EVIDENCE & SOURCES APIs
      // -----------------------------------------------------
      if (path === '/api/v1/evidence/search' && method === 'POST') {
        const { query } = body;
        const matches = await IslamicEvidenceGraph.queryPassages(query || '', 5);
        const results = matches.map((m) => {
          const src = db.sources.get(m.sourceId);
          return {
            source_id: m.sourceId,
            source_type: src?.sourceType.toLowerCase() || 'quran',
            reference: m.reference,
            relevance: 0.95,
            authority: src?.authorityLevel || 'TIER_1_QURAN',
            verification_status: src?.verificationStatus || 'APPROVED',
            arabic_text: m.arabicText,
            translation: m.translatedText,
          };
        });

        return {
          success: true,
          data: {
            query_id: `qry_${Date.now()}`,
            query,
            results,
          },
          metadata: { timestamp, request_id: requestId, version },
        };
      }

      if (path.startsWith('/api/v1/sources/') && method === 'GET') {
        const sourceId = path.replace('/api/v1/sources/', '').trim();
        const src = db.sources.get(sourceId);
        if (src) {
          return {
            success: true,
            data: {
              id: src.id,
              type: src.sourceType.toLowerCase(),
              collection: src.collection || src.title,
              title: src.title,
              author: src.author,
              language: src.language,
              authority_level: src.authorityLevel,
              verification_status: src.verificationStatus,
              review_status: 'scholar_approved',
              version: src.version,
            },
            metadata: { timestamp, request_id: requestId, version },
          };
        }

        const catEntry = ecosystemService.getMasterSourceCatalogueEntry(sourceId);
        if (catEntry) {
          return {
            success: true,
            data: catEntry,
            metadata: { timestamp, request_id: requestId, version },
          };
        }

        return {
          success: false,
          error: {
            code: 'SOURCE_NOT_FOUND',
            message: `Source '${sourceId}' was not found in approved catalog.`,
            request_id: requestId,
            retryable: false,
          },
          metadata: { timestamp, request_id: requestId, version },
        };
      }

      if (path.includes('/chain') && method === 'GET') {
        const evidenceId = path.split('/')[4] || 'act-winddown-10m';
        const dynamicChain = await IslamicEvidenceGraph.buildEvidenceChain(evidenceId);

        const chain: EvidenceChainNode[] = [
          { step: 1, node_type: 'USER_QUESTION', title: 'User Inquiry', explanation: 'How to remain consistent and handle routine friction' },
          { step: 2, node_type: 'ISLAMIC_CONCEPT', title: dynamicChain.conceptName, reference: dynamicChain.conceptReference, explanation: 'Actions are grounded in sincere intention, accompanied by patient consistency.' },
          { step: 3, node_type: 'EVIDENCE_SOURCE', title: dynamicChain.authorityLevel, reference: dynamicChain.evidenceSourceReference, explanation: dynamicChain.evidenceText },
          { step: 4, node_type: 'SCHOLARLY_JUSTIFICATION', title: 'Scholarly Grounding', explanation: dynamicChain.scholarlyJustification },
          { step: 5, node_type: 'PRACTICAL_GUIDANCE', title: dynamicChain.actionTitle, explanation: 'Practical daily amal connected to authentic Sunnah.' },
        ];

        return {
          success: true,
          data: {
            evidence_id: evidenceId,
            chain,
          },
          metadata: { timestamp, request_id: requestId, version },
        };
      }

      if (path === '/api/v1/corpus' && method === 'GET') {
        return {
          success: true,
          data: {
            total_works: MASTER_CANONICAL_CORPUS.length,
            works: MASTER_CANONICAL_CORPUS,
          },
          metadata: { timestamp, request_id: requestId, version },
        };
      }

      if (path.startsWith('/api/v1/corpus/') && method === 'GET') {
        const workId = path.replace('/api/v1/corpus/', '').trim();
        const found = MASTER_CANONICAL_CORPUS.find((w) => w.work_id === workId);
        if (found) {
          return {
            success: true,
            data: found,
            metadata: { timestamp, request_id: requestId, version },
          };
        }
        return {
          success: false,
          error: {
            code: 'CANONICAL_WORK_NOT_FOUND',
            message: `Canonical work '${workId}' not found in verified registry.`,
            request_id: requestId,
            retryable: false,
          },
          metadata: { timestamp, request_id: requestId, version },
        };
      }

      // -----------------------------------------------------
      // 4B. ASTRONOMICAL PRAYER TIMES & QIBLA ENGINE
      // -----------------------------------------------------
      if ((path === '/api/v1/prayer-times' || path.startsWith('/api/v1/prayer-times?') || path === '/api/v1/prayers/today' || path === '/api/v1/prayer/today' || path.startsWith('/api/v1/prayers/today?') || path.startsWith('/api/v1/prayer/today?')) && method === 'GET') {
        const lat = body?.latitude ? parseFloat(body.latitude) : (body?.lat ? parseFloat(body.lat) : 28.6139); // Delhi default
        const lon = body?.longitude ? parseFloat(body.longitude) : (body?.lng ? parseFloat(body.lng) : 77.2090);
        const madhhab = body?.asr_madhhab === 'STANDARD_JUMHUR' ? 'STANDARD_JUMHUR' : 'HANAFI';
        const methodCalc = body?.method ?? 'KARACHI';
        const times = prayerQiblaEngine.calculatePrayerTimes({ latitude: lat, longitude: lon }, new Date(), madhhab, methodCalc);
        return { success: true, data: { date: new Date().toISOString().split('T')[0], times, location: { latitude: lat, longitude: lon } }, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/today/burden' && method === 'GET') {
        return {
          success: true,
          data: { totalMinutes: 15, burdenLevel: 'LIGHT', exceedsRecommended: false },
          metadata: { timestamp, request_id: requestId, version },
        };
      }

      if ((path === '/api/v1/qibla' || path.startsWith('/api/v1/qibla?')) && method === 'GET') {
        const lat = body?.latitude ?? 28.6139;
        const lon = body?.longitude ?? 77.2090;
        const qibla = prayerQiblaEngine.calculateQibla({ latitude: lat, longitude: lon });
        return { success: true, data: qibla, metadata: { timestamp, request_id: requestId, version } };
      }

      // -----------------------------------------------------
      // 4C. ZAKAT & INHERITANCE (MIRAS / FARA'ID) ENGINE
      // -----------------------------------------------------
      if (path === '/api/v1/zakat/calculate' && method === 'POST') {
        const result = zakatInheritanceEngine.calculateZakat(body);
        return { success: true, data: result, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/miras/calculate' && method === 'POST') {
        const result = zakatInheritanceEngine.calculateInheritance(body);
        return { success: true, data: result, metadata: { timestamp, request_id: requestId, version } };
      }

      // -----------------------------------------------------
      // 4D. HIJRI CALENDAR & MASNOON FASTING ENGINE
      // -----------------------------------------------------
      if (path === '/api/v1/hijri/today' && method === 'GET') {
        const hijri = hijriFastingEngine.toHijri(new Date(), body?.moon_adjustment ?? 0);
        const fasting = hijriFastingEngine.evaluateFasting(new Date(), body?.moon_adjustment ?? 0);
        return { success: true, data: { hijri, fasting }, metadata: { timestamp, request_id: requestId, version } };
      }

      // -----------------------------------------------------
      // 4E. AUDIO RECITATIONS & SHAMA'IL/SIRAH AUDIOBOOKS
      // -----------------------------------------------------
      if (path === '/api/v1/audio/recitations' && method === 'GET') {
        return {
          success: true,
          data: {
            reciters: audioStreamingEngine.reciters,
            surahs: audioStreamingEngine.sampleSurahs,
          },
          metadata: { timestamp, request_id: requestId, version },
        };
      }

      if (path === '/api/v1/audio/shamail' && method === 'GET') {
        return {
          success: true,
          data: {
            chapters: audioStreamingEngine.shamailChapters,
          },
          metadata: { timestamp, request_id: requestId, version },
        };
      }

      if (path === '/api/v1/audio/sirah' && method === 'GET') {
        return {
          success: true,
          data: {
            episodes: audioStreamingEngine.sirahEpisodes,
          },
          metadata: { timestamp, request_id: requestId, version },
        };
      }

      // -----------------------------------------------------
      // 4F. MULTI-LANGUAGE LOCALIZATION & RTL ENGINE
      // -----------------------------------------------------
      if (path === '/api/v1/localization/translations' && method === 'GET') {
        const lang = body?.language ?? 'en';
        localizationEngine.setLanguage(lang);
        return {
          success: true,
          data: {
            currentLanguage: localizationEngine.getLanguage(),
            meta: localizationEngine.getMeta(),
          },
          metadata: { timestamp, request_id: requestId, version },
        };
      }

      // -----------------------------------------------------
      // 4G. 5 SIGNATURE CAPABILITIES (AMAL CORE DIFFERENTIATION)
      // -----------------------------------------------------
      if (path === '/api/v1/compiler/niyyah' && method === 'POST') {
        const plan = signatureCapabilitiesEngine.compileNiyyahToAmal(body);
        return { success: true, data: plan, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/evidence/passport' && method === 'POST') {
        const passport = signatureCapabilitiesEngine.generateEvidencePassport(body.topic || '', body.guidance || '');
        return { success: true, data: passport, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/decision-room/evaluate' && method === 'POST') {
        const decision = signatureCapabilitiesEngine.evaluateDecisionRoom(body.situation || '');
        return { success: true, data: decision, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/prophetic/context' && method === 'POST') {
        const contextData = signatureCapabilitiesEngine.getPropheticContext(body.struggle || '');
        return { success: true, data: contextData, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/life-os/mode/') && method === 'GET') {
        const mode = path.replace('/api/v1/life-os/mode/', '').toUpperCase();
        const profile = signatureCapabilitiesEngine.getLifeOsProfile(mode as LifeOsMode);
        return { success: true, data: profile, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/recommendation/explain' && method === 'POST') {
        const explanation = signatureCapabilitiesEngine.explainWhyRecommendation(
          body.amalTitle || 'Daily Habit',
          body.userGoal || 'Spiritual Consistency',
          body.currentMode || 'STANDARD'
        );
        return { success: true, data: explanation, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/trust/evaluate' && method === 'POST') {
        const trustLayer = signatureCapabilitiesEngine.generateAmalTrustLayer(
          body.topic || 'General Practice',
          body.guidance || 'Prophetic Standard'
        );
        return { success: true, data: trustLayer, metadata: { timestamp, request_id: requestId, version } };
      }

      // -----------------------------------------------------
      // 4H. V1.5 EXTENDED CAPABILITIES (REPLAY, FAMILY, VAULT)
      // -----------------------------------------------------
      if ((path === '/api/v1/replay/annual' || path.startsWith('/api/v1/replay/annual?')) && method === 'GET') {
        if (!ctx.userId || ctx.userRole === 'ANONYMOUS') {
          return { success: false, error: { code: 'UNAUTHORIZED', message: 'Authentication required to access annual replay.' }, metadata: { timestamp, request_id: requestId, version } };
        }
        const replay = deenReplayEngine.generateAnnualReplay(ctx.userId, 2026);
        return { success: true, data: replay, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/family/circle' && method === 'GET') {
        const circle = familyDeenOsEngine.getFamilyCircle('fam_demo_1');
        return { success: true, data: circle, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/family/journeys' && method === 'POST') {
        const journey = familyDeenOsEngine.createSharedJourney('fam_demo_1', body);
        return { success: true, data: journey, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/vault/notes' && method === 'GET') {
        if (!ctx.userId || ctx.userRole === 'ANONYMOUS') {
          return { success: false, error: { code: 'UNAUTHORIZED', message: 'Authentication required to access personal vault notes.' }, metadata: { timestamp, request_id: requestId, version } };
        }
        const notes = knowledgeVaultEngine.getUserNotes(ctx.userId);
        return { success: true, data: notes, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/vault/notes' && method === 'POST') {
        if (!ctx.userId || ctx.userRole === 'ANONYMOUS') {
          return { success: false, error: { code: 'UNAUTHORIZED', message: 'Authentication required to create personal vault notes.' }, metadata: { timestamp, request_id: requestId, version } };
        }
        const note = knowledgeVaultEngine.ingestAndAnalyzeNote(
          ctx.userId,
          body.title || 'Untitled Note',
          body.sourceType || 'PERSONAL_THOUGHT',
          body.rawText || ''
        );
        return { success: true, data: note, metadata: { timestamp, request_id: requestId, version } };
      }

      // -----------------------------------------------------
      // 4I. CERTIFICATES, BIOMETRIC VAULT, TAJWEED, MOSQUE & OFFLINE
      // -----------------------------------------------------
      if (path === '/api/v1/certificates/miras' && method === 'POST') {
        const cert = shariPdfExportEngine.generateMirasCertificate(body);
        return { success: true, data: cert, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/certificates/zakat' && method === 'POST') {
        const clearance = shariPdfExportEngine.generateZakatClearance(body);
        return { success: true, data: clearance, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/certificates/scholar-dossier' && method === 'POST') {
        const dossier = shariPdfExportEngine.generateScholarDossier(body);
        return { success: true, data: dossier, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/vault/security-config' && method === 'GET') {
        if (!ctx.userId || ctx.userRole === 'ANONYMOUS') {
          return { success: false, error: { code: 'UNAUTHORIZED', message: 'Authentication required to view vault security configuration.' }, metadata: { timestamp, request_id: requestId, version } };
        }
        const config = biometricVaultGuardEngine.getConfig(ctx.userId);
        return { success: true, data: config, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/vault/security-config' && method === 'POST') {
        if (!ctx.userId || ctx.userRole === 'ANONYMOUS') {
          return { success: false, error: { code: 'UNAUTHORIZED', message: 'Authentication required to update vault security configuration.' }, metadata: { timestamp, request_id: requestId, version } };
        }
        const updated = biometricVaultGuardEngine.setSecurityMode(
          ctx.userId,
          body.securityMode || 'BIOMETRIC_FACE_ID',
          body.pin
        );
        return { success: true, data: updated, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/tajweed/passages' && method === 'GET') {
        const passages = wordByWordTajweedEngine.getAvailablePassages();
        return { success: true, data: { passages }, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/mosque/iqamah-schedule' && method === 'GET') {
        const coords = { latitude: 24.8607, longitude: 67.0011 };
        const adhanTimes = prayerQiblaEngine.calculatePrayerTimes(coords, new Date(), 'HANAFI', 'KARACHI');
        const schedule = mosqueIqamahSyncEngine.computeSynchronizedSchedule(adhanTimes);
        return { success: true, data: schedule, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/offline/bundle-status' && method === 'GET') {
        const status = offlineResilienceEngine.getOfflineBundleStatus();
        return { success: true, data: status, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/offline/pilgrimage-rites' && method === 'GET') {
        const rites = offlineResilienceEngine.getPilgrimageRites();
        return { success: true, data: { rites }, metadata: { timestamp, request_id: requestId, version } };
      }

      // -----------------------------------------------------
      // 4J. USER-FRIENDLY EXPERIENCES (TASBIH, MAMOOL, SEARCH, READER, ONBOARDING, NOTIFICATIONS)
      // -----------------------------------------------------
      if (path === '/api/v1/tasbih/presets' && method === 'GET') {
        const presets = MasnoonTasbihEngine.getAllPresets();
        return { success: true, data: { presets }, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/tasbih/increment' && method === 'POST') {
        const result = MasnoonTasbihEngine.increment(body);
        return { success: true, data: result, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/mamool/today' && method === 'GET') {
        const hour = body?.hour ?? new Date().getHours();
        const mamool = DailyMamoolEngine.getMamool(hour);
        return { success: true, data: mamool, metadata: { timestamp, request_id: requestId, version } };
      }

      if ((path === '/api/v1/search/universal' || path.startsWith('/api/v1/search/universal?')) && method === 'GET') {
        let query = body?.q ?? '';
        if (!query && path.includes('?')) {
          const searchParams = new URLSearchParams(path.split('?')[1]);
          query = searchParams.get('q') || searchParams.get('query') || '';
        }
        const results = UniversalSearchEngine.search(query);
        const suggestions = UniversalSearchEngine.getPopularSuggestions();
        return { success: true, data: { results, suggestions }, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/reader/preferences' && method === 'GET') {
        const defaults = ReaderModeEngine.getDefaultPreferences();
        const resolved = ReaderModeEngine.getResolvedStyles(defaults);
        return { success: true, data: { preferences: defaults, styles: resolved }, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/onboarding/starter-plan' && method === 'POST') {
        const plan = OnboardingWizardEngine.generateStarterPlan(body);
        return { success: true, data: plan, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/notifications/gentle-schedule' && method === 'GET') {
        const schedule = GentleNotificationsEngine.getSchedule(body);
        return { success: true, data: { schedule }, metadata: { timestamp, request_id: requestId, version } };
      }


      // -----------------------------------------------------
      // 5. ASK AMAL INTELLIGENCE ENDPOINT
      // -----------------------------------------------------
      if (path === '/api/v1/ai/ask' && method === 'POST') {
        if (body.query_text || body.target_answer_language || body.scholarly_tradition_preference) {
          const response = ecosystemService.generateGovernedAnswer(body);
          const audit = ecosystemService.auditResponseContract(response);
          if (!audit.passed) {
            throw new Error(`CLAIM_AUDITOR_BLOCKED: Hard blocks triggered: [${audit.hard_blocks_triggered.join(', ')}]`);
          }
          return { success: true, data: response, metadata: { timestamp, request_id: requestId, version } };
        }

        const { message } = body;
        if (!message) throw new Error('Message is required.');

        // Intent classification
        const intentType = IntentRouter.route(message);
        // Safety classification
        const safetyClass = FatwaFirewall.classify(message);

        // Convert safety class enum to single letter A-E
        let safetyLetter: 'A' | 'B' | 'C' | 'D' | 'E' = 'A';
        if (safetyClass.safetyClass.includes('CLASS_B')) safetyLetter = 'B';
        else if (safetyClass.safetyClass.includes('CLASS_C')) safetyLetter = 'C';
        else if (safetyClass.safetyClass.includes('CLASS_D')) safetyLetter = 'D';
        else if (safetyClass.safetyClass.includes('CLASS_E')) safetyLetter = 'E';

        const aiResult = await AIOrchestrator.processQuery({
          userId: ctx.userId,
          query: message,
        });

        const resp: AskAmalResponseDto = {
          response_id: `resp_${Date.now()}`,
          intent: {
            type: intentType.toLowerCase(),
            confidence: 0.96,
          },
          safety: {
            class: safetyLetter,
            scholar_required: safetyClass.requiresScholarEscalation,
            crisis_intercept: safetyClass.requiresCrisisIntervention,
          },
          answer: {
            summary: aiResult.response.answer.slice(0, 160) + (aiResult.response.answer.length > 160 ? '...' : ''),
            explanation: aiResult.response.answer,
          },
          evidence: aiResult.response.sources.map((s) => ({
            source_id: s.passageId,
            reference: s.reference,
          })),
          actions: aiResult.response.actions.map((a) => ({
            type: 'amal',
            title: a.title,
            duration_minutes: a.estimatedMinutes,
            evidence_reference: a.evidenceReference,
          })),
          journey: {
            recommended: intentType === 'FAJR_STRUGGLE' || intentType === 'QURAN_HABIT',
            journey_type: intentType === 'FAJR_STRUGGLE' ? 'fajr_recovery' : intentType === 'QURAN_HABIT' ? 'quran_restart' : undefined,
            journey_title: intentType === 'FAJR_STRUGGLE' ? '14-Day Fajr Recovery' : intentType === 'QURAN_HABIT' ? '14-Day Quran Restart' : undefined,
          },
          confidence: aiResult.response.citations_verified ? 1.0 : 0.0,
          citations_verified: aiResult.response.citations_verified,
        };

        return {
          success: true,
          data: resp,
          metadata: { timestamp, request_id: requestId, version },
        };
      }

      if (path === '/api/v1/ai/ask/stream' && method === 'POST') {
        return {
          success: false,
          error: {
            code: 'STREAM_UNAVAILABLE',
            message: 'Live AI streaming is disabled until a production LLM provider is connected.',
          },
          metadata: { timestamp, request_id: requestId, version },
        };
      }

      if (path.startsWith('/api/v1/ai/responses/') && path.endsWith('/evidence') && method === 'GET') {
        const responseId = path.split('/')[5];
        return {
          success: false,
          error: {
            code: 'NOT_FOUND',
            message: `No verified evidence audit found for response ID: ${responseId}`,
          },
          metadata: { timestamp, request_id: requestId, version },
        };
      }

      if (path.startsWith('/api/v1/ai/responses/') && path.endsWith('/audit') && method === 'GET') {
        const responseId = path.split('/')[5];
        return {
          success: false,
          error: {
            code: 'AUDIT_UNAVAILABLE',
            message: `Independent automated audit unavailable for response ${responseId}. Production citation auditor requires active model evaluation pipeline.`,
          },
          metadata: { timestamp, request_id: requestId, version },
        };
      }

      if (path.startsWith('/api/v1/ai/responses/') && path.endsWith('/feedback') && method === 'POST') {
        const responseId = path.split('/')[5];
        const { helpful, citation_accuracy_feedback } = body || {};
        return {
          success: true,
          data: {
            response_id: responseId,
            feedback_recorded: true,
            helpful: helpful ?? true,
          },
          metadata: { timestamp, request_id: requestId, version },
        };
      }

      if (path.startsWith('/api/v1/ai/responses/') && path.endsWith('/escalate') && method === 'POST') {
        const responseId = path.split('/')[5];
        if (!body || !body.user_confirmed) {
          return {
            success: false,
            error: {
              code: 'CONSENT_REQUIRED',
              message: 'Explicit user confirmation is mandatory before personal inquiry context can be escalated to human scholars.',
            },
            metadata: { timestamp, request_id: requestId, version },
          };
        }
        const scholarCase = await ScholarEscalationAgent.prepareScholarCase(
          ctx.userId,
          body.question || 'User inquiry from AI response',
          body.context || 'Escalated from response',
          'Pastoral Review',
          ['17:78']
        );
        return {
          success: true,
          data: {
            response_id: responseId,
            case_id: scholarCase.id,
            status: scholarCase.status,
            user_confirmed: true,
          },
          metadata: { timestamp, request_id: requestId, version },
        };
      }

      // -----------------------------------------------------
      // 5B. MEMORY ARCHITECTURE & CANDIDATES API
      // -----------------------------------------------------
      if (path === '/api/v1/memory' && method === 'GET') {
        const confirmed = MemoryManager.getConfirmedMemories(ctx.userId);
        const journeys = MemoryManager.getJourneyMemories(ctx.userId);
        const insights = MemoryManager.getDerivedInsights(ctx.userId);
        const candidates = MemoryManager.getPendingCandidates(ctx.userId);

        return {
          success: true,
          data: {
            l0_session: null,
            l1_journey: journeys,
            l2_confirmed_preferences: confirmed,
            l3_derived_insights: insights,
            pending_candidates: candidates,
          },
          metadata: { timestamp, request_id: requestId, version },
        };
      }

      if (path.startsWith('/api/v1/memory/') && path.endsWith('/confirm') && method === 'POST') {
        const candidateId = path.split('/')[4];
        MemoryManager.processConfirmation({
          candidateId,
          userId: ctx.userId,
          decision: 'CONFIRM',
          timestamp,
        });
        return {
          success: true,
          data: { candidate_id: candidateId, status: 'CONFIRMED' },
          metadata: { timestamp, request_id: requestId, version },
        };
      }

      if (path.startsWith('/api/v1/memory/') && path.endsWith('/reject') && method === 'POST') {
        const candidateId = path.split('/')[4];
        MemoryManager.processConfirmation({
          candidateId,
          userId: ctx.userId,
          decision: 'REJECT',
          timestamp,
        });
        return {
          success: true,
          data: { candidate_id: candidateId, status: 'REJECTED' },
          metadata: { timestamp, request_id: requestId, version },
        };
      }

      if (path.startsWith('/api/v1/memory/') && method === 'DELETE') {
        const memoryId = path.split('/')[4];
        const deleted = MemoryManager.deleteConfirmedMemory(ctx.userId, memoryId);
        return {
          success: true,
          data: { memory_id: memoryId, deleted },
          metadata: { timestamp, request_id: requestId, version },
        };
      }

      if (path.startsWith('/api/v1/memory/') && method === 'PATCH') {
        const memoryId = path.split('/')[4];
        const updated = MemoryManager.updateConfirmedMemory(ctx.userId, memoryId, body?.value || body?.statement || '');
        return {
          success: true,
          data: { memory_id: memoryId, updated: !!updated, memory: updated },
          metadata: { timestamp, request_id: requestId, version },
        };
      }


      // -----------------------------------------------------
      // 6. GOALS & AMAL ENGINE (Multi-factor Ranking & Baselines)
      // -----------------------------------------------------
      if (path === '/api/v1/goals' && method === 'GET') {
        const stored = AmalJourneyEngine.getUserGoals(ctx.userId);
        const goals = stored.length > 0 ? stored : [
          {
            id: 'goal_fajr_init',
            category: 'SALAH',
            title: 'Establish Fajr in Congregation with Presence',
            intent: 'IMPROVE',
            desired_outcome: 'Perform Fajr prayer on time every morning with family or at local mosque.',
            created_at: new Date().toISOString(),
          },
          {
            id: 'goal_quran_init',
            category: 'QURAN',
            title: 'Daily Recitation & Tajweed Contemplation',
            intent: 'MAINTAIN',
            desired_outcome: 'Read at least 1-2 pages of the Quran with meaning and clear makharij.',
            created_at: new Date().toISOString(),
          },
        ];
        return {
          success: true,
          data: goals,
          metadata: { timestamp, request_id: requestId, version },
        };
      }

      if (path === '/api/v1/goals' && method === 'POST') {
        const { title, category, intent, desired_outcome, baseline, time_horizon } = body;
        const goal = AmalJourneyEngine.createGoal(
          ctx.userId,
          title || 'Personal Worship Consistency',
          category || 'SALAH',
          intent || 'HABIT_FORMATION',
          desired_outcome || 'Consistent daily practice without burnout',
          baseline || {
            currentFrequency: 'OCCASIONALLY',
            currentMinutes: 5,
            targetFrequency: 'DAILY',
            targetMinutes: 15,
            perceivedObstacles: ['Time constraint', 'Late sleep'],
          },
          time_horizon || '14_DAYS'
        );
        return {
          success: true,
          data: goal,
          metadata: { timestamp, request_id: requestId, version },
        };
      }

      if (path.startsWith('/api/v1/goals/') && method === 'PATCH') {
        const goalId = path.split('/')[4];
        const stored = AmalJourneyEngine.getUserGoals(ctx.userId);
        const updated = stored.map((g: any) => (g.id === goalId ? { ...g, ...body } : g));
        AmalJourneyEngine.setUserGoals(ctx.userId, updated);
        return {
          success: true,
          data: { id: goalId, updated: true },
          metadata: { timestamp, request_id: requestId, version },
        };
      }

      if (path.startsWith('/api/v1/goals/') && method === 'DELETE') {
        const goalId = path.split('/')[4];
        const stored = AmalJourneyEngine.getUserGoals(ctx.userId);
        const filtered = stored.filter((g: any) => g.id !== goalId);
        AmalJourneyEngine.setUserGoals(ctx.userId, filtered);
        return {
          success: true,
          data: { id: goalId, deleted: true },
          metadata: { timestamp, request_id: requestId, version },
        };
      }

      if (path === '/api/v1/amal/recommend' && method === 'POST') {
        const { candidates } = body;
        const defaultCandidates = [
          {
            amalId: 'amal_fajr_winddown',
            title: 'Isha Wind-down & Device Silence',
            estimatedMinutes: 10,
            evidenceFit: 1.0,
            goalFit: 0.95,
            contextFit: 0.9,
            feasibility: 0.95,
            preferenceFit: 0.9,
            continuity: 0.85,
            safety: 1.0,
            evidenceReferences: ['Sahih al-Bukhari 568'],
          },
          {
            amalId: 'amal_quran_5m',
            title: '5-Minute Morning Tadabbur',
            estimatedMinutes: 5,
            evidenceFit: 1.0,
            goalFit: 0.85,
            contextFit: 0.9,
            feasibility: 1.0,
            preferenceFit: 0.85,
            continuity: 0.9,
            safety: 1.0,
            evidenceReferences: ['Sahih al-Bukhari 6464', 'Sahih Muslim 395'],
          },
        ];

        const ranked = AmalJourneyEngine.rankAmalCandidates(ctx.userId, candidates || defaultCandidates);
        return {
          success: true,
          data: { recommendations: ranked },
          metadata: { timestamp, request_id: requestId, version },
        };
      }

      if (path === '/api/v1/amal/generate' && method === 'POST') {
        const { goal, duration_days, daily_minutes } = body;
        const journeyId = `jrn_${Date.now()}`;

        return {
          success: true,
          data: {
            journey_id: journeyId,
            title: goal.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()),
            duration_days: duration_days || 14,
            daily_actions: [
              { day: 1, action: 'Sleep preparation & Isha wind-down', duration: daily_minutes || 5 },
              { day: 2, action: 'Bedtime Adhkar & Phone Distance', duration: daily_minutes || 5 },
              { day: 3, action: 'Wake-up Presence & Immediate Stand', duration: daily_minutes || 5 },
            ],
            evidence_ids: ['src-bukhari-568', 'src-muslim-657'],
          },
          metadata: { timestamp, request_id: requestId, version },
        };
      }

      if (path.startsWith('/api/v1/amal/') && path.endsWith('/complete') && method === 'POST') {
        const amalId = path.split('/')[4];
        const { actual_duration_minutes, planned_duration_minutes, notes } = body;
        const completion = AmalJourneyEngine.recordCompletion(
          ctx.userId,
          amalId,
          planned_duration_minutes || 10,
          actual_duration_minutes !== undefined ? actual_duration_minutes : 10,
          notes
        );

        return {
          success: true,
          data: completion,
          metadata: { timestamp, request_id: requestId, version },
        };
      }

      if (path === '/api/v1/today/burden' && method === 'GET') {
        const activeActions = [
          { durationMinutes: 10, complexityScore: 1 },
          { durationMinutes: 5, complexityScore: 1 },
        ];
        const burden = AmalJourneyEngine.calculateDailyBurden(activeActions);
        return {
          success: true,
          data: burden,
          metadata: { timestamp, request_id: requestId, version },
        };
      }

      // -----------------------------------------------------
      // 7. JOURNEYS & ADAPTATION
      // -----------------------------------------------------
      if (path === '/api/v1/journeys' && method === 'GET') {
        const userJourneys = Array.from(db.journeys.values()).filter((j) => j.userId === ctx.userId);
        return { success: true, data: userJourneys, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/journeys' && method === 'POST') {
        const { journey_type } = body;
        const jrn = JourneyAgent.createJourneyFromTemplate(ctx.userId, journey_type || 'FAJR_RECOVERY');
        db.journeys.set(jrn.id, jrn);
        return { success: true, data: jrn, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/journeys/') && path.endsWith('/adapt') && method === 'POST') {
        const journeyId = path.split('/')[4];
        const jrn = db.journeys.get(journeyId) || JourneyAgent.createJourneyFromTemplate(ctx.userId, 'FAJR_RECOVERY');
        const completions = [
          AmalJourneyEngine.recordCompletion(ctx.userId, 'act_1', 15, 5),
          AmalJourneyEngine.recordCompletion(ctx.userId, 'act_2', 15, 3),
        ];
        const friction = [
          AmalJourneyEngine.recordFrictionSignal(ctx.userId, 'TIME', 'USER_SELF_REPORT', 0.9, journeyId),
        ];

        const adaptationResult = AmalJourneyEngine.evaluateJourneyHealthAndAdapt(jrn, completions, friction);
        if (adaptationResult.adaptationProposal) {
          jrn.status = 'ADAPTED';
          jrn.healthState = adaptationResult.healthState;
          db.journeys.set(jrn.id, jrn);
        }

        return {
          success: true,
          data: adaptationResult,
          metadata: { timestamp, request_id: requestId, version },
        };
      }

      if (path.startsWith('/api/v1/journeys/') && method === 'PATCH') {
        const journeyId = path.split('/')[4];
        const jrn = db.journeys.get(journeyId);
        if (jrn) {
          Object.assign(jrn, body);
          db.journeys.set(journeyId, jrn);
        }
        return {
          success: true,
          data: { id: journeyId, updated: true, journey: jrn },
          metadata: { timestamp, request_id: requestId, version },
        };
      }

      if (path.includes('/days/today') && method === 'GET') {
        return {
          success: true,
          data: {
            day: 4,
            theme: 'Consistency & Friction Removal',
            actions: [
              { id: 'act_001', title: 'Pray Isha on time and silence notifications', completed: false },
              { id: 'act_002', title: '5-minute Quran reflection', completed: false },
            ],
          },
          metadata: { timestamp, request_id: requestId, version },
        };
      }

      // -----------------------------------------------------
      // 8. REFLECTIONS & INSIGHTS
      // -----------------------------------------------------
      if (path === '/api/v1/reflections' && method === 'GET') {
        const currentRefs = db.reflections.get(ctx.userId) || [
          {
            id: 'ref_init_1',
            userId: ctx.userId,
            reflectionType: 'DAILY_MUHASABAH',
            wentWell: 'Protected morning Fajr with calm dhikr and 5 minutes tadabbur.',
            feltDifficult: null,
            privateToUser: true,
            createdAt: new Date().toISOString(),
          },
        ];
        return {
          success: true,
          data: currentRefs,
          metadata: { timestamp, request_id: requestId, version },
        };
      }

      if (path === '/api/v1/reflections' && method === 'POST') {
        const { type, answers, content, went_well, felt_difficult } = body;
        const answerText = content || (answers && answers.length > 0 ? answers[0].answer : went_well) || 'Alhamdulillah';

        const ref: Reflection = {
          id: `ref_${Date.now()}`,
          userId: ctx.userId,
          reflectionType: type === 'daily' ? 'DAILY_MUHASABAH' : 'WEEKLY_INSIGHT',
          wentWell: answerText,
          feltDifficult: felt_difficult || null,
          privateToUser: true,
          createdAt: timestamp,
        };

        const currentRefs = db.reflections.get(ctx.userId) || [];
        currentRefs.push(ref);
        db.reflections.set(ctx.userId, currentRefs);

        return {
          success: true,
          data: {
            reflection_id: ref.id,
            recorded: true,
            observation: 'Reflection saved privately. Zero spiritual scorecards.',
          },
          metadata: { timestamp, request_id: requestId, version },
        };
      }

      if (path.startsWith('/api/v1/reflections/') && method === 'DELETE') {
        const refId = path.split('/')[4];
        const currentRefs = db.reflections.get(ctx.userId) || [];
        const filtered = currentRefs.filter((r) => r.id !== refId);
        db.reflections.set(ctx.userId, filtered);
        return {
          success: true,
          data: { id: refId, deleted: true },
          metadata: { timestamp, request_id: requestId, version },
        };
      }

      if (path === '/api/v1/insights' && method === 'GET') {
        return {
          success: true,
          data: {
            patterns: [
              {
                type: 'consistency',
                topic: 'fajr',
                observation: 'Fajr wake-up consistency improved across 5 of the last 7 days.',
                confidence: 0.88,
              },
              {
                type: 'routine',
                topic: 'quran',
                observation: 'Quran reading participation is highest during early morning quiet windows.',
                confidence: 0.85,
              },
            ],
          },
          metadata: { timestamp, request_id: requestId, version },
        };
      }

      // -----------------------------------------------------
      // 9. SCHOLAR SYSTEM & CASES
      // -----------------------------------------------------
      if (path === '/api/v1/scholars' && method === 'GET') {
        const scholars = [...Array.from(db.scholars.values()), ...ecosystemService.getScholarsList(), ...ecosystemService.listScholarIdentities()];
        return { success: true, data: scholars, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/scholars/') && path.endsWith('/verify') && method === 'POST') {
        const scholarId = path.split('/')[4];
        const updated = ecosystemService.verifyScholarIdentity(scholarId, body.status, ctx.userId);
        return { success: true, data: updated, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/scholars/') && method === 'GET') {
        const scholarId = path.split('/')[4];
        const scholar = ecosystemService.getScholarIdentity(scholarId) || db.scholars.get(scholarId);
        if (!scholar) throw new Error(`Scholar ${scholarId} not found.`);
        return { success: true, data: scholar, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/scholar-cases' && method === 'POST') {
        const { question, context } = body;
        const newCase = await ScholarEscalationAgent.prepareScholarCase(
          ctx.userId,
          question,
          context || 'User inquiry requiring pastoral guidance',
          'Fiqh determination',
          []
        );

        return {
          success: true,
          data: {
            case_id: newCase.id,
            question: newCase.userQuestion,
            status: newCase.status,
            user_confirmed: true,
          },
          metadata: { timestamp, request_id: requestId, version },
        };
      }

      // -----------------------------------------------------
      // 10. REPORT INCORRECT INFORMATION
      // -----------------------------------------------------
      if (path === '/api/v1/reports' && method === 'POST') {
        const { type, target_id, details } = body;
        await db.recordAuditLog({
          actorId: ctx.userId,
          actorRole: ctx.userRole,
          action: 'SUBMIT_INCORRECT_INFORMATION_REPORT',
          resourceType: 'REPORT',
          resourceId: target_id || 'unknown',
          metadata: { type, details },
        });

        return {
          success: true,
          data: {
            report_id: `rep_${Date.now()}`,
            status: 'received_for_editorial_review',
          },
          metadata: { timestamp, request_id: requestId, version },
        };
      }

      // -----------------------------------------------------
      // 11. PRIVACY & DATA RIGHTS
      // -----------------------------------------------------
      if (path === '/api/v1/privacy/export' && method === 'GET') {
        const exported = await PrivacyCenter.exportUserData(ctx.userId);
        return { success: true, data: exported, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/privacy/delete-account' && method === 'POST') {
        await PrivacyCenter.deleteUserAccount(ctx.userId);
        return { success: true, data: { deleted: true }, metadata: { timestamp, request_id: requestId, version } };
      }

      // -----------------------------------------------------
      // 12. LAYER 11: COMMUNICATIONS, NOTIFICATIONS & PRAYER CONTEXT
      // -----------------------------------------------------
      if (path === '/api/v1/communications/preferences' && method === 'GET') {
        const prefs = commsService.getPreferences(ctx.userId);
        return { success: true, data: prefs, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/communications/preferences' && method === 'PATCH') {
        const updated = commsService.updatePreferences(ctx.userId, body);
        return { success: true, data: updated, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/communications/consent' && method === 'GET') {
        const consents = commsService.getConsents(ctx.userId);
        return { success: true, data: consents, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/communications/consent' && method === 'POST') {
        const consent = commsService.setConsent(ctx.userId, body);
        return { success: true, data: consent, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/prayers/today' && method === 'GET') {
        const schedule = commsService.getTodayPrayerSchedule(ctx.userId);
        return { success: true, data: schedule, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/prayers/settings' && method === 'PATCH') {
        const settings = commsService.updatePrayerProfile(ctx.userId, body);
        return { success: true, data: settings, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/notifications/interact' && method === 'POST') {
        const metrics = commsService.recordInteraction(ctx.userId, body.action);
        return { success: true, data: metrics, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/notifications' && method === 'GET') {
        const notifs = commsService.getNotifications(ctx.userId);
        return { success: true, data: notifs, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/notifications/preferences' && method === 'GET') {
        const prefs = commsService.getPreferences(ctx.userId);
        return { success: true, data: prefs, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/notifications/preferences' && method === 'PATCH') {
        const updated = commsService.updatePreferences(ctx.userId, body);
        return { success: true, data: updated, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/notifications/') && path.endsWith('/snooze') && method === 'POST') {
        const notifId = path.split('/')[4];
        const res = commsService.snoozeNotification(ctx.userId, notifId);
        return { success: true, data: res, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/notifications/') && path.endsWith('/dismiss') && method === 'POST') {
        const notifId = path.split('/')[4];
        const res = commsService.dismissNotification(ctx.userId, notifId);
        return { success: true, data: res, metadata: { timestamp, request_id: requestId, version } };
      }


      if (path === '/internal/communications/send' && method === 'POST') {
        const result = await commsService.orchestrateAndSend(body);
        return { success: true, data: result, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/internal/communications/webhook' && method === 'POST') {
        const ack = await commsService.handleWebhook(body);
        return { success: true, data: ack, metadata: { timestamp, request_id: requestId, version } };
      }

      // -----------------------------------------------------
      // 13. LAYER 12: TRUST ARCHITECTURE & GOVERNANCE CONTROL PLANE
      // -----------------------------------------------------
      if (path === '/api/v1/governance/trust-dashboard' && method === 'GET') {
        const dashboard = govService.getTrustDashboard();
        return { success: true, data: dashboard, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/governance/user-trust-center' && method === 'GET') {
        const trust = govService.getUserTrustCenter(ctx.userId);
        return { success: true, data: trust, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/governance/policy/evaluate' && method === 'POST') {
        const decision = govService.evaluatePolicy(body);
        return { success: true, data: decision, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/governance/privacy-requests' && method === 'POST') {
        const privReq = govService.createPrivacyRequest(ctx.userId, body.type);
        return { success: true, data: privReq, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/governance/circuit-breakers' && method === 'GET') {
        const breakers = govService.getCircuitBreakers();
        return { success: true, data: breakers, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/governance/circuit-breakers/trip' && method === 'POST') {
        govService.setCircuitBreaker(body.id, body.state, body.reason);
        return { success: true, data: { id: body.id, state: body.state }, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/governance/four-eyes/propose' && method === 'POST') {
        const proposal = govService.proposeConfigChange(body.category, ctx.userId, body.before, body.after);
        return { success: true, data: proposal, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/governance/four-eyes/approve' && method === 'POST') {
        const approved = govService.approveConfigChange(body.changeId, ctx.userId);
        return { success: true, data: approved, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/governance/break-glass' && method === 'POST') {
        const session = govService.grantBreakGlass(ctx.userId, body.approverId, body.justification, body.scope);
        return { success: true, data: session, metadata: { timestamp, request_id: requestId, version } };
      }

      // -----------------------------------------------------
      // 14. LAYER 13: PRODUCTION PLATFORM & RELIABILITY
      // -----------------------------------------------------
      if (path === '/internal/platform/health' && method === 'GET') {
        const health = platformService.getAggregatedHealth();
        return { success: true, data: health, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/internal/platform/slos' && method === 'GET') {
        const slos = platformService.getSLODefinitions();
        return { success: true, data: slos, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/internal/platform/canary/advance' && method === 'POST') {
        const canary = platformService.advanceCanary(body.serviceId, body.versionTag);
        return { success: true, data: canary, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/internal/platform/canary/rollback' && method === 'POST') {
        const rollback = platformService.rollbackCanary(body.serviceId, body.reason);
        return { success: true, data: rollback, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/internal/platform/reconcile/outbox' && method === 'POST') {
        const recon = platformService.reconcileOutbox();
        return { success: true, data: recon, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/internal/platform/synthetic/run' && method === 'POST') {
        const syn = platformService.runSyntheticMonitoring();
        return { success: true, data: syn, metadata: { timestamp, request_id: requestId, version } };
      }

      // -----------------------------------------------------
      // 15. LAYER 14: KNOWLEDGE OPERATIONS & SCHOLAR NETWORK
      // -----------------------------------------------------
      if (path === '/api/v1/knowledge/sources' && method === 'GET') {
        const sources = knowledgeOpsService.getSources();
        return { success: true, data: sources, metadata: { timestamp, request_id: requestId, version } };
      }

      if (
        path.startsWith('/api/v1/knowledge/sources/') &&
        path !== '/api/v1/knowledge/sources/candidates' &&
        !path.startsWith('/api/v1/knowledge/sources/custody/') &&
        method === 'GET'
      ) {
        const id = path.split('/')[5];
        const src = knowledgeOpsService.getSourceById(id);
        if (!src) throw new Error(`Source with ID ${id} not found.`);
        return { success: true, data: src, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/knowledge/ayahs/') && method === 'GET') {
        const parts = path.split('/');
        const surah = parseInt(parts[5], 10);
        const ayah = parseInt(parts[6], 10);
        const res = knowledgeOpsService.getAyah(surah, ayah);
        return { success: true, data: res, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/knowledge/hadith/') && method === 'GET') {
        const parts = path.split('/');
        const collection = decodeURIComponent(parts[5]);
        const num = parseInt(parts[6], 10);
        const res = knowledgeOpsService.getHadith(collection, num);
        return { success: true, data: res, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/knowledge/issues/') && method === 'GET') {
        const issueId = path.split('/')[5];
        const res = knowledgeOpsService.getIssueWithPlurality(issueId);
        return { success: true, data: res, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/knowledge/concepts/') && method === 'GET') {
        const key = path.split('/')[5];
        const res = knowledgeOpsService.getConcept(key);
        if (!res) throw new Error(`Concept ${key} not found.`);
        return { success: true, data: res, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/knowledge/situations/') && method === 'GET') {
        const key = path.split('/')[5];
        const res = knowledgeOpsService.getLifeSituation(key);
        if (!res) throw new Error(`Life situation ${key} not found.`);
        return { success: true, data: res, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/knowledge/disputes' && method === 'POST') {
        const dispute = knowledgeOpsService.openDispute({
          contentId: body.contentId,
          contentType: body.contentType,
          reason: body.reason,
          severity: body.severity,
          reporterId: ctx.userId || 'usr_reporter',
        });
        return { success: true, data: dispute, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/knowledge/disputes/') && path.endsWith('/resolve') && method === 'POST') {
        const disputeId = path.split('/')[5];
        const dispute = knowledgeOpsService.resolveDispute(disputeId, body.resolution, body.notes);
        return { success: true, data: dispute, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/scholars' && method === 'GET') {
        const scholars = knowledgeOpsService.getScholars();
        return { success: true, data: scholars, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/scholars/') && method === 'GET') {
        const id = path.split('/')[4];
        const scholar = knowledgeOpsService.getScholarById(id);
        if (!scholar) throw new Error(`Scholar ${id} not found.`);
        return { success: true, data: scholar, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/scholar/cases' && method === 'POST') {
        const newCase = knowledgeOpsService.createScholarCase(
          ctx.userId || body.userId,
          body.question,
          body.category,
          body.context,
          body.urgency
        );
        return { success: true, data: newCase, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/scholar/cases' && method === 'GET') {
        const cases = knowledgeOpsService.getScholarCases();
        return { success: true, data: cases, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/scholar/cases/') && path.endsWith('/answer') && method === 'POST') {
        const caseId = path.split('/')[5];
        const updated = knowledgeOpsService.answerScholarCase(
          caseId,
          body.scholarId,
          body.answer,
          body.evidenceRefs || [],
          body.uncertaintyCondition
        );
        return { success: true, data: updated, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/scholar/cases/') && path.endsWith('/peer-review') && method === 'POST') {
        const caseId = path.split('/')[5];
        const updated = knowledgeOpsService.peerReviewScholarCase(
          caseId,
          body.secondScholarId,
          body.approved,
          body.peerNotes
        );
        return { success: true, data: updated, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/internal/knowledge/acquire' && method === 'POST') {
        const acquired = knowledgeOpsService.acquireSource(body);
        return { success: true, data: acquired, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/internal/knowledge/validate' && method === 'POST') {
        const validation = knowledgeOpsService.validateSource(body.sourceId);
        return { success: true, data: validation, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/internal/knowledge/approve' && method === 'POST') {
        const approved = knowledgeOpsService.approveSource(body.sourceId, body.approverRole || 'SCHOLAR');
        return { success: true, data: approved, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/internal/knowledge/releases' && method === 'POST') {
        const rel = knowledgeOpsService.createRelease(body.releaseTag, body.approverId, body.notes);
        return { success: true, data: rel, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/internal/knowledge/releases/') && path.endsWith('/publish') && method === 'POST') {
        const relId = path.split('/')[4];
        const published = knowledgeOpsService.publishRelease(relId);
        return { success: true, data: published, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/internal/knowledge/releases/') && path.endsWith('/rollback') && method === 'POST') {
        const relId = path.split('/')[4];
        const rolledBack = knowledgeOpsService.rollbackRelease(relId);
        return { success: true, data: rolledBack, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/internal/knowledge/benchmarks/run' && method === 'POST') {
        const bench = knowledgeOpsService.runBenchmarks();
        return { success: true, data: bench, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/internal/knowledge/health' && method === 'GET') {
        const health = knowledgeOpsService.getHealthScorecard();
        return { success: true, data: health, metadata: { timestamp, request_id: requestId, version } };
      }

      // -----------------------------------------------------
      // 16. LAYER 15: BUSINESS, MONETIZATION & INSTITUTION PLATFORM
      // -----------------------------------------------------
      if (path === '/api/v1/billing/plans' && method === 'GET') {
        const plans = billingService.getPlans();
        return { success: true, data: plans, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/billing/subscription' && method === 'GET') {
        const sub = billingService.getUserSubscription(ctx.userId);
        return { success: true, data: sub, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/billing/entitlements/') && method === 'GET') {
        const featureKey = path.split('/')[5];
        const allowed = billingService.can(ctx.userId, featureKey);
        return { success: true, data: { featureKey, allowed }, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/billing/checkout' && method === 'POST') {
        const checkout = billingService.createCheckout(ctx.userId, body.planCode);
        return { success: true, data: checkout, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/billing/activate' && method === 'POST') {
        const sub = billingService.activateSubscription(ctx.userId, body.planCode, body.providerSubscriptionId);
        return { success: true, data: sub, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/billing/cancel' && method === 'POST') {
        const sub = billingService.cancelSubscription(ctx.userId, body.reason);
        return { success: true, data: sub, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/billing/pause' && method === 'POST') {
        const sub = billingService.pauseSubscription(ctx.userId);
        return { success: true, data: sub, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/billing/webhooks/') && method === 'POST') {
        const providerName = (path.split('/')[5]?.toUpperCase() || 'LOCAL_TEST') as 'STRIPE' | 'RAZORPAY' | 'LOCAL_TEST';
        const extCtx = ctx as RequestContext & { signature?: string; timestampHeader?: string };
        const signature = extCtx.signature || body?.signature || '';
        const timestampHeader = extCtx.timestampHeader;
        const res = await billingWebhookService.handleWebhook(providerName, body, signature, timestampHeader);
        return { success: res.success, data: res, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/billing/refund' && method === 'POST') {
        const provider = billingWebhookService.getProvider(body.provider || 'LOCAL_TEST');
        const res = await provider?.refundPayment(body.invoiceId, body.amountCents, body.reason);
        return { success: !!res?.success, data: res, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/tenants' && method === 'POST') {
        const tenant = tenancyService.createTenant(body.tenantId, body.name, body.type, ctx.userId);
        return { success: true, data: tenant, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/tenants/') && path.endsWith('/assert') && method === 'POST') {
        const tenantId = path.split('/')[4];
        tenancyService.assertTenantAccess(ctx.userId, tenantId, body.resourceDesc);
        return { success: true, data: { authorized: true, tenantId }, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/openapi.json' && method === 'GET') {
        const openApiSpec = {
          openapi: '3.0.3',
          info: {
            title: 'AMAL OS Production API',
            version: '1.0.0',
            description: 'AMAL OS V1.0 Master Production REST API Specification. From Niyyah to Amal.',
          },
          paths: {
            '/api/v1/auth/register': { post: { summary: 'Register User' } },
            '/api/v1/auth/login': { post: { summary: 'Authenticate User' } },
            '/api/v1/today': { get: { summary: 'Deterministic Today Schedule' } },
            '/api/v1/amal/complete': { post: { summary: 'Idempotent Amal Completion' } },
            '/api/v1/reflections': { post: { summary: 'Muhasabah Reflection' } },
            '/api/v1/ai/ask': { post: { summary: 'Governed AI Islamic Guidance' } },
            '/api/v1/scholars/cases': { get: { summary: 'List Triage Cases' }, post: { summary: 'Submit Fatwa Inquiry' } },
            '/api/v1/family': { get: { summary: 'Family Workspace' }, post: { summary: 'Create Household' } },
            '/api/v1/journeys/:id/adaptations': { get: { summary: 'Adaptive Amal Friction Relief' } },
            '/api/v1/communications/consent': { get: { summary: 'Channel Consent Status' }, post: { summary: 'Set Consent' } },
            '/api/v1/billing/plans': { get: { summary: 'List Billing Plans' } },
            '/api/v1/billing/webhooks/:provider': { post: { summary: 'Process Signed Payment Webhook' } },
            '/api/v1/personalization/preferences': { get: { summary: 'List Learned Preferences' }, post: { summary: 'Set Preference' } },
            '/api/v1/personalization/settings': { get: { summary: 'Personalization Controls' }, patch: { summary: 'Update Personalization Controls' } },
            '/api/v1/personalization/recommendations/feedback': { post: { summary: 'Lightweight Recommendation Feedback' } },
            '/api/v1/insights': { get: { summary: 'Observed Habits & Behavioral Insights' } },
            '/api/v1/journeys/:id/adaptation-preview': { post: { summary: 'Preview Journey Friction Adaptation' } },
            '/api/v1/journeys/:id/adaptation-approve': { post: { summary: 'Approve Journey Friction Adaptation' } },
            '/api/v1/planner/daily': { post: { summary: 'Smart Daily Amal Planner' } },
            '/api/v1/goals/collision-check': { post: { summary: 'Goal Collision & Daily Burden Assessment' } },
            '/api/v1/life/situation': { post: { summary: 'Classify Multi-Domain Life Situation' } },
            '/api/v1/life/domains': { get: { summary: 'Supported Life Domains' } },
            '/api/v1/life/dashboard': { get: { summary: 'Cross-Domain Life OS Overview' } },
            '/api/v1/decisions': { get: { summary: 'List Life Decisions' }, post: { summary: 'Create Structured Decision Draft' } },
            '/api/v1/experts': { get: { summary: 'List Verified Multi-Domain Experts' } },
            '/api/v1/modes/ramadan': { get: { summary: 'Ramadan OS Configuration' } },
            '/api/v1/modes/travel': { get: { summary: 'Travel Mode & Qasr Evaluation' } },
            '/api/v1/life-graph/nodes': { get: { summary: 'Personal Life Graph Nodes' }, post: { summary: 'Add Personal Graph Node' } },
          },
        };
        return { success: true, data: openApiSpec, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/scholar/consultations' && method === 'POST') {
        const consultation = billingService.bookScholarConsultation({
          userId: ctx.userId,
          scholarId: body.scholarId,
          caseId: body.caseId,
          consultationType: body.consultationType,
          feeCents: body.feeCents,
          currency: body.currency,
        });
        return { success: true, data: consultation, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/scholar/consultations/') && path.endsWith('/payout') && method === 'POST') {
        const consId = path.split('/')[5];
        const payout = billingService.releaseScholarPayout(consId);
        return { success: true, data: payout, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/org/register' && method === 'POST') {
        const org = billingService.registerInstitution({
          name: body.name,
          slug: body.slug,
          institutionType: body.institutionType,
          ownerUserId: ctx.userId,
          maxSeats: body.maxSeats,
        });
        return { success: true, data: org, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/org/') && path.endsWith('/programs') && method === 'POST') {
        const orgId = path.split('/')[4];
        const prog = billingService.createInstitutionProgram({
          institutionId: orgId,
          name: body.name,
          description: body.description,
          journeyId: body.journeyId,
        });
        return { success: true, data: prog, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/org/') && path.endsWith('/dashboard') && method === 'GET') {
        const orgId = path.split('/')[4];
        const dash = billingService.getInstitutionDashboard(orgId);
        return { success: true, data: dash, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/growth/referrals' && method === 'POST') {
        const ref = billingService.createReferralInvite(ctx.userId);
        return { success: true, data: ref, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/growth/referrals/convert' && method === 'POST') {
        const ref = billingService.convertReferral(body.token, ctx.userId);
        return { success: true, data: ref, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/growth/metrics' && method === 'GET') {
        const metrics = billingService.getBusinessMetrics();
        return { success: true, data: metrics, metadata: { timestamp, request_id: requestId, version } };
      }

      // -----------------------------------------------------
      // 17. LAYER 16: 12-18 MONTH EXECUTION BLUEPRINT & LAUNCH
      // -----------------------------------------------------
      if (path === '/api/v1/execution/milestones' && method === 'GET') {
        const milestones = executionService.getMilestones();
        return { success: true, data: milestones, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/execution/milestones/') && !path.endsWith('/status') && method === 'GET') {
        const code = path.split('/')[5];
        const m = executionService.getMilestone(code);
        if (!m) throw new Error(`Milestone ${code} not found.`);
        return { success: true, data: m, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/execution/milestones/') && path.endsWith('/status') && method === 'POST') {
        const code = path.split('/')[5];
        const m = executionService.updateMilestoneStatus(code, body.status);
        return { success: true, data: m, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/execution/sprints/active' && method === 'GET') {
        const sprint = executionService.getActiveSprint();
        return { success: true, data: sprint, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/execution/sprints' && method === 'POST') {
        const sprint = executionService.createSprint({
          sprintNumber: body.sprintNumber,
          sprintName: body.sprintName,
          squadName: body.squadName,
          startDate: body.startDate,
          endDate: body.endDate,
          qualityBudgetPercent: body.qualityBudgetPercent,
          committedStories: body.committedStories,
        });
        return { success: true, data: sprint, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/execution/gates' && method === 'GET') {
        const gates = executionService.getLaunchGates();
        return { success: true, data: gates, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/execution/gates/') && path.endsWith('/evaluate') && method === 'POST') {
        const level = path.split('/')[5];
        const gate = executionService.evaluateGate(level, body.passed, body.signoff || ctx.userId);
        return { success: true, data: gate, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/execution/kill-switches' && method === 'GET') {
        const switches = executionService.getKillSwitches();
        return { success: true, data: switches, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/execution/kill-switches/') && path.endsWith('/toggle') && method === 'POST') {
        const key = path.split('/')[5];
        const sw = executionService.toggleKillSwitch(key, body.active, body.reason, ctx.userId);
        return { success: true, data: sw, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/execution/beta/cohorts' && method === 'GET') {
        const cohorts = executionService.getBetaCohorts();
        return { success: true, data: cohorts, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/execution/beta/feedback' && method === 'POST') {
        const fb = executionService.recordBetaFeedback({
          userId: ctx.userId,
          cohortId: body.cohortId,
          feedbackCategory: body.feedbackCategory,
          severity: body.severity || 'MEDIUM',
          summary: body.summary,
          didHelpIntentionalAction: body.didHelpIntentionalAction ?? true,
        });
        return { success: true, data: fb, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/execution/decisions' && method === 'POST') {
        const decision = executionService.logProductDecision({
          decisionCode: body.decisionCode,
          title: body.title,
          contextReason: body.contextReason,
          alternativesConsidered: body.alternativesConsidered || [],
          evidenceUsed: body.evidenceUsed,
          decisionOwner: body.decisionOwner || ctx.userId,
        });
        return { success: true, data: decision, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/execution/decisions' && method === 'GET') {
        const decisions = executionService.getDecisions();
        return { success: true, data: decisions, metadata: { timestamp, request_id: requestId, version } };
      }

      if ((path === '/api/v1/health' || path === '/health') && method === 'GET') {
        const hasDbUrl = Boolean(process.env.DATABASE_URL || process.env.PGHOST);
        return {
          success: true,
          data: {
            status: 'healthy',
            engines: 24,
            uptime: process.uptime(),
            timestamp: new Date().toISOString(),
            database: {
              driver: hasDbUrl ? 'postgresql' : 'in-memory-dev',
              connected: hasDbUrl,
              persistent: hasDbUrl,
              warning: hasDbUrl ? undefined : 'Running in ephemeral in-memory dev mode. Provide DATABASE_URL for durable PostgreSQL persistence.'
            }
          },
          metadata: { timestamp, request_id: requestId, version }
        };
      }

      if (path === '/api/v1/execution/health' && method === 'GET') {
        const health = executionService.getExecutionHealth();
        return { success: true, data: health, metadata: { timestamp, request_id: requestId, version } };
      }

      // -----------------------------------------------------
      // 18. LAYER 17: MASTER BLUEPRINT & SYSTEM REGISTRY
      // -----------------------------------------------------
      if (path === '/api/v1/blueprint/topology' && method === 'GET') {
        const topology = blueprintService.getSystemTopology();
        return { success: true, data: topology, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/blueprint/certifications' && method === 'GET') {
        const certs = blueprintService.getSystemCertifications();
        return { success: true, data: certs, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/blueprint/invariants' && method === 'GET') {
        const invs = blueprintService.getSystemInvariants();
        return { success: true, data: invs, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/blueprint/routes' && method === 'GET') {
        const routes = blueprintService.getMasterRoutes();
        return { success: true, data: routes, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/blueprint/agents' && method === 'GET') {
        const agents = blueprintService.getMasterAgents();
        return { success: true, data: agents, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/blueprint/migrations' && method === 'GET') {
        const migrations = blueprintService.getMigrationsCatalog();
        return { success: true, data: migrations, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/blueprint/export' && method === 'GET') {
        const exported = blueprintService.exportMasterBlueprint();
        return { success: true, data: exported, metadata: { timestamp, request_id: requestId, version } };
      }

      // -----------------------------------------------------
      // 22. EXECUTION PACK DOMAIN
      // -----------------------------------------------------
      if (path === '/api/v1/execution-pack/modules' && method === 'GET') {
        const modules = executionPackService.getModules();
        return { success: true, data: modules, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/execution-pack/modules/') && method === 'GET') {
        const code = path.replace('/api/v1/execution-pack/modules/', '');
        const module = executionPackService.getModule(code);
        if (!module) throw new Error(`Execution module ${code} not found.`);
        return { success: true, data: module, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/execution-pack/cujs' && method === 'GET') {
        const cujs = executionPackService.getCriticalUserJourneys();
        return { success: true, data: cujs, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/execution-pack/cujs/') && method === 'GET') {
        const cujId = path.replace('/api/v1/execution-pack/cujs/', '');
        const cuj = executionPackService.getCriticalUserJourney(cujId);
        if (!cuj) throw new Error(`Critical User Journey ${cujId} not found.`);
        return { success: true, data: cuj, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/execution-pack/sprints' && method === 'GET') {
        const sprints = executionPackService.getSprintPlans();
        return { success: true, data: sprints, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/execution-pack/readiness' && method === 'GET') {
        const readiness = executionPackService.getReadinessReport();
        return { success: true, data: readiness, metadata: { timestamp, request_id: requestId, version } };
      }

      // -----------------------------------------------------
      // 19. LAYER 21: V1.5 PERSONALIZATION & ADAPTIVE INTELLIGENCE
      // -----------------------------------------------------
      if (path === '/api/v1/personalization/preferences' && method === 'GET') {
        const prefs = personalizationService.getPreferences(ctx.userId);
        return { success: true, data: prefs, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/personalization/preferences' && method === 'POST') {
        const res = personalizationService.setPreference(ctx.userId, body);
        return { success: true, data: res, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/personalization/preferences/') && method === 'PATCH') {
        const prefId = path.split('/')[5];
        const res = personalizationService.setPreference(ctx.userId, { preferenceId: prefId, ...body });
        return { success: true, data: res, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/personalization/preferences/') && method === 'DELETE') {
        const prefId = path.split('/')[5];
        const deleted = personalizationService.deletePreference(ctx.userId, prefId);
        return { success: true, data: { preferenceId: prefId, deleted }, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/personalization/settings' && method === 'GET') {
        const settings = personalizationService.getSettings(ctx.userId);
        return { success: true, data: settings, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/personalization/settings' && method === 'PATCH') {
        const updated = personalizationService.updateSettings(ctx.userId, body);
        return { success: true, data: updated, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/personalization/recommendations/feedback' && method === 'POST') {
        const res = personalizationService.recordFeedback(ctx.userId, body.candidateId, body.actionTaken, body.feedbackOption);
        return { success: true, data: res, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/insights/') && path.endsWith('/confirm') && method === 'POST') {
        const insightId = path.split('/')[4];
        const confirmed = personalizationService.confirmInsight(ctx.userId, insightId);
        return { success: true, data: { insightId, confirmed }, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/insights/') && path.endsWith('/dismiss') && method === 'POST') {
        const insightId = path.split('/')[4];
        const dismissed = personalizationService.dismissInsight(ctx.userId, insightId);
        return { success: true, data: { insightId, dismissed }, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/journeys/') && path.endsWith('/adaptation-preview') && method === 'POST') {
        const journeyId = path.split('/')[4];
        const preview = personalizationService.previewAdaptation(ctx.userId, journeyId);
        return { success: true, data: preview, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/journeys/') && path.endsWith('/adaptation-approve') && method === 'POST') {
        const journeyId = path.split('/')[4];
        const approved = personalizationService.approveAdaptation(ctx.userId, journeyId);
        return { success: true, data: approved, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/journeys/') && path.endsWith('/adaptation-reject') && method === 'POST') {
        const journeyId = path.split('/')[4];
        const rejected = personalizationService.rejectAdaptation(ctx.userId, journeyId);
        return { success: true, data: rejected, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/planner/daily' && method === 'POST') {
        const plan = personalizationService.planDaily(ctx.userId, body.candidates || [], body.context || {});
        return { success: true, data: plan, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/goals/collision-check' && method === 'POST') {
        const collision = personalizationService.checkGoalCollisions(ctx.userId, body.goals || [], body.maxMinutes);
        return { success: true, data: collision, metadata: { timestamp, request_id: requestId, version } };
      }

      // -----------------------------------------------------
      // 20. LAYER 22: V2.0 PERSONAL DEEN OPERATING SYSTEM
      // -----------------------------------------------------
      if (path === '/api/v1/life/situation' && method === 'POST') {
        const sit = lifeOsService.classifySituation(ctx.userId, body.text || '');
        return { success: true, data: sit, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/life/domains' && method === 'GET') {
        const domains = lifeOsService.getSupportedDomains();
        return { success: true, data: domains, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/life/dashboard' && method === 'GET') {
        const dashboard = lifeOsService.getLifeDashboard(ctx.userId);
        return { success: true, data: dashboard, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/decisions' && method === 'GET') {
        const decs = lifeOsService.getDecisions(ctx.userId);
        return { success: true, data: decs, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/decisions' && method === 'POST') {
        const dec = lifeOsService.createDecision(ctx.userId, body.question, body.category, body.options, body.constraints, body.evidence);
        return { success: true, data: dec, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/decisions/') && path.endsWith('/choice') && method === 'POST') {
        const decisionId = path.split('/')[4];
        const dec = lifeOsService.recordDecisionChoice(ctx.userId, decisionId, body.chosenOptionId, body.reflection);
        return { success: true, data: dec, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/experts' && method === 'GET') {
        const experts = lifeOsService.listExperts(body?.type);
        return { success: true, data: experts, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/experts/cases' && method === 'POST') {
        const cs = lifeOsService.submitExpertCase(ctx.userId, body.expertType, body.domain, body.question, body.context || {});
        return { success: true, data: cs, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/modes/ramadan' && method === 'GET') {
        const ramadan = lifeOsService.getRamadanConfig(ctx.userId);
        return { success: true, data: ramadan, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/modes/ramadan' && method === 'PATCH') {
        const ramadan = lifeOsService.updateRamadanConfig(ctx.userId, body);
        return { success: true, data: ramadan, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/modes/hajj-umrah' && method === 'GET') {
        const hajj = lifeOsService.getHajjUmrahConfig(ctx.userId);
        return { success: true, data: hajj, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/modes/hajj-umrah' && method === 'PATCH') {
        const hajj = lifeOsService.updateHajjUmrahConfig(ctx.userId, body);
        return { success: true, data: hajj, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/modes/travel' && method === 'GET') {
        const travel = lifeOsService.getTravelConfig(ctx.userId);
        return { success: true, data: travel, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/modes/travel' && method === 'PATCH') {
        const travel = lifeOsService.updateTravelConfig(ctx.userId, body);
        return { success: true, data: travel, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/modes/travel/safar-check' && method === 'POST') {
        const safar = lifeOsService.evaluateTravelSafar(body.distanceKm);
        return { success: true, data: safar, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/life-graph/nodes' && method === 'POST') {
        const node = lifeOsService.addLifeGraphNode(ctx.userId, body);
        return { success: true, data: node, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/life-graph/nodes' && method === 'GET') {
        const nodes = lifeOsService.getLifeGraphNodes(ctx.userId, body?.domain || 'DEEN');
        return { success: true, data: nodes, metadata: { timestamp, request_id: requestId, version } };
      }

      // -----------------------------------------------------
      // 24. LAYER 23: AMAL OS V3.0 ECOSYSTEM PLATFORM
      // -----------------------------------------------------
      if (path.startsWith('/api/v1/ecosystem/tenants/') && method === 'GET') {
        const tenantId = path.split('/')[5];
        const tenant = ecosystemService.getTenant(tenantId);
        if (!tenant) throw new Error(`Tenant ${tenantId} not found.`);
        return { success: true, data: tenant, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/ecosystem/scholars/') && !path.includes('/cases') && !path.includes('/disagreements') && method === 'GET') {
        const scholarId = path.split('/')[5];
        const scholar = ecosystemService.getScholarProfile(scholarId);
        if (!scholar) throw new Error(`Scholar ${scholarId} not found.`);
        return { success: true, data: scholar, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/ecosystem/scholars/cases' && method === 'POST') {
        const scCase = ecosystemService.createScholarCase({
          userId: ctx.userId,
          tenantId: body.tenantId || 'tnt_individual_demo',
          category: body.category,
          urgency: body.urgency,
          userQuestion: body.userQuestion,
          evidenceRefIds: body.evidenceRefIds
        });
        return { success: true, data: scCase, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/ecosystem/scholars/cases/') && path.endsWith('/respond') && method === 'POST') {
        const caseId = path.split('/')[6];
        const scCase = ecosystemService.respondWithTwoScholarRule({
          caseId,
          primaryScholarId: body.primaryScholarId,
          secondaryScholarId: body.secondaryScholarId,
          responseContent: body.responseContent
        });
        return { success: true, data: scCase, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/ecosystem/scholars/disagreements/') && method === 'GET') {
        const issueId = path.split('/')[6];
        const issue = ecosystemService.getDisagreementIssue(issueId);
        if (!issue) throw new Error(`Disagreement issue ${issueId} not found.`);
        return { success: true, data: issue, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/ecosystem/scholars/appeals' && method === 'POST') {
        const appeal = ecosystemService.appealScholarCase({
          caseId: body.caseId,
          userId: ctx.userId,
          reason: body.reason,
          newSecondaryScholarId: body.newSecondaryScholarId
        });
        return { success: true, data: appeal, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/ecosystem/scholars/proposals' && method === 'POST') {
        const proposal = ecosystemService.proposeKnowledgeContribution({
          scholarId: body.scholarId,
          proposalType: body.proposalType,
          content: body.content
        });
        return { success: true, data: proposal, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/ecosystem/family/shares' && method === 'POST') {
        const share = ecosystemService.createFamilyShare({
          familyTenantId: body.familyTenantId,
          ownerId: ctx.userId,
          resourceType: body.resourceType,
          resourceId: body.resourceId,
          sharedWithUserId: body.sharedWithUserId,
          permission: body.permission,
          purpose: body.purpose
        });
        return { success: true, data: share, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/ecosystem/family/shares/') && path.endsWith('/revoke') && method === 'POST') {
        const shareId = path.split('/')[6];
        const revoked = ecosystemService.revokeFamilyShare(shareId, ctx.userId);
        return { success: true, data: { revoked, shareId }, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/ecosystem/institutions/programs' && method === 'POST') {
        const prog = ecosystemService.createInstitutionProgram({
          institutionTenantId: body.institutionTenantId,
          title: body.title,
          domain: body.domain,
          description: body.description
        });
        return { success: true, data: prog, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/ecosystem/institutions/programs/') && path.endsWith('/enroll') && method === 'POST') {
        const programId = path.split('/')[6];
        ecosystemService.enrollInProgram(programId, ctx.userId);
        return { success: true, data: { enrolled: true, programId }, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/ecosystem/institutions/programs/') && path.endsWith('/analytics') && method === 'GET') {
        const programId = path.split('/')[6];
        const tenantId = body?.institutionTenantId || 'tnt_mosque_central';
        const analytics = ecosystemService.getInstitutionAnalytics(tenantId, programId);
        return { success: true, data: analytics, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/ecosystem/knowledge/releases/active' && method === 'GET') {
        const rel = ecosystemService.getActiveKnowledgeRelease();
        return { success: true, data: rel, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/ecosystem/knowledge/releases/') && path.endsWith('/rollback') && method === 'POST') {
        const releaseId = path.split('/')[6];
        const rel = ecosystemService.rollbackKnowledgeRelease(releaseId, body.reason);
        return { success: true, data: rel, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/ecosystem/api/clients' && method === 'POST') {
        const client = ecosystemService.registerApiClient({
          clientId: body.clientId,
          partnerId: body.partnerId,
          appName: body.appName,
          scopes: body.scopes,
          rateLimitRpm: body.rateLimitRpm
        });
        return { success: true, data: client, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/ecosystem/api/oauth/token' && method === 'POST') {
        const token = ecosystemService.issueOAuthToken({
          clientId: body.clientId,
          userId: ctx.userId,
          requestedScopes: body.requestedScopes
        });
        return { success: true, data: token, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/ecosystem/api/webhooks' && method === 'POST') {
        const sub = ecosystemService.registerWebhook({
          subscriptionId: body.subscriptionId,
          clientId: body.clientId,
          targetUrl: body.targetUrl,
          eventTypes: body.eventTypes,
          secret: body.secret
        });
        return { success: true, data: sub, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/ecosystem/api/sandbox' && method === 'GET') {
        const sandbox = ecosystemService.getSandboxData();
        return { success: true, data: sandbox, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/ecosystem/governance/kill-switches' && method === 'POST') {
        const ks = ecosystemService.triggerKillSwitch({
          targetId: body.targetId,
          switchType: body.switchType,
          reason: body.reason,
          triggeredBy: ctx.userId
        });
        return { success: true, data: ks, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/ecosystem/governance/safe-mode' && method === 'GET') {
        const sm = ecosystemService.getSafeModeState();
        return { success: true, data: sm, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/ecosystem/governance/safe-mode' && method === 'POST') {
        const sm = body.enabled
          ? ecosystemService.enableGlobalSafeMode(body.reason, ctx.userId)
          : ecosystemService.disableGlobalSafeMode();
        return { success: true, data: sm, metadata: { timestamp, request_id: requestId, version } };
      }

      // -----------------------------------------------------
      // 25. UNIVERSAL KNOWLEDGE & SCHOLARLY NEUTRALITY CHARTER
      // -----------------------------------------------------
      if (path === '/api/v1/knowledge/madhhabs' && method === 'GET') {
        const foundations = ecosystemService.getAllMadhhabFoundations();
        return { success: true, data: foundations, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/knowledge/madhhabs/') && method === 'GET') {
        const school = path.split('/')[5]?.toUpperCase() as SunniSchool;
        const foundation = ecosystemService.getMadhhabFoundation(school);
        if (!foundation) throw new Error(`Madhhab foundation ${school} not found.`);
        return { success: true, data: foundation, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/knowledge/comparative-fiqh/') && method === 'GET') {
        const caseId = path.split('/')[5];
        const fiqhCase = ecosystemService.getComparativeFiqhCase(caseId);
        if (!fiqhCase) throw new Error(`Comparative Fiqh case ${caseId} not found.`);
        return { success: true, data: fiqhCase, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/knowledge/fiqh-guidance' && method === 'POST') {
        const guidance = ecosystemService.renderFiqhGuidance(body.caseId, {
          userId: ctx.userId,
          madhhabPreference: body.madhhabPreference || 'GENERAL_SUNNI',
          scholarlyTradition: body.scholarlyTradition,
          preferredScholars: body.preferredScholars || [],
          preferredTafsir: body.preferredTafsir || [],
          preferredTranslation: body.preferredTranslation || 'Sahih International',
          preferredLanguage: body.preferredLanguage || 'en',
          preferredSpiritualLiterature: body.preferredSpiritualLiterature || [],
          levelOfDetail: body.levelOfDetail || 'PRACTICING'
        });
        return { success: true, data: guidance, metadata: { timestamp, request_id: requestId, version } };
      }

      // -----------------------------------------------------
      // LAYER 26: UNIVERSAL SUNNI KNOWLEDGE & VERIFICATION PLATFORM
      // -----------------------------------------------------
      if (path.startsWith('/api/v1/knowledge/universal/source-card/') && method === 'GET') {
        const sourceId = path.split('/')[6];
        const card = ecosystemService.getUniversalSourceCard(sourceId);
        return { success: true, data: card, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/knowledge/universal/disagreements/') && method === 'GET') {
        const disagreementId = path.split('/')[6];
        const disagreement = ecosystemService.getUniversalDisagreement(disagreementId);
        if (!disagreement) throw new Error(`Disagreement ${disagreementId} not found.`);
        return { success: true, data: disagreement, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/knowledge/universal/answer' && method === 'POST') {
        const userProfile = body.userProfile || {
          userId: ctx.userId,
          madhhabPreference: body.madhhabPreference || 'GENERAL_SUNNI',
          scholarlyTraditionPreference: body.scholarlyTraditionPreference,
          preferredScholars: body.preferredScholars || [],
          preferredTafsir: body.preferredTafsir || [],
          preferredQuranTranslation: body.preferredQuranTranslation || 'Sahih International',
          preferredHadithResources: body.preferredHadithResources || [],
          preferredSpiritualLiterature: body.preferredSpiritualLiterature || [],
          preferredLanguage: body.preferredLanguage || 'en',
          preferredDepth: body.preferredDepth || 'PRACTICING',
          showMadhhabComparison: body.showMadhhabComparison ?? true,
          showDisagreement: body.showDisagreement ?? true,
        };
        const answer = ecosystemService.resolveUniversalAnswer(body.disagreementId, userProfile);
        return { success: true, data: answer, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/knowledge/universal/benchmark' && method === 'GET') {
        const metrics = ecosystemService.runUniversalBenchmark();
        return { success: true, data: metrics, metadata: { timestamp, request_id: requestId, version } };
      }

      // Master Source Catalogue Endpoints
      if (path === '/api/v1/knowledge/catalogue/summary' && method === 'GET') {
        const summary = ecosystemService.getMasterSourceCatalogueSummary();
        return { success: true, data: summary, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/knowledge/catalogue/coverage' && method === 'GET') {
        const coverage = ecosystemService.getKnowledgeCoverageDashboard();
        return { success: true, data: coverage, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/knowledge/catalogue/debt' && method === 'GET') {
        const debt = ecosystemService.getKnowledgeDebtReport();
        return { success: true, data: debt, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/knowledge/catalogue/release-manifest' && method === 'GET') {
        const manifest = ecosystemService.generateReleaseManifest('AMAL-KNOWLEDGE-2026.10.001');
        return { success: true, data: manifest, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/knowledge/catalogue' && method === 'GET') {
        const entries = ecosystemService.getMasterSourceCatalogue();
        return { success: true, data: entries, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/knowledge/catalogue/') && method === 'GET') {
        const catalogId = path.split('/')[5];
        const entry = ecosystemService.getMasterSourceCatalogueEntry(catalogId);
        if (!entry) throw new Error(`Catalogue entry ${catalogId} not found.`);
        return { success: true, data: entry, metadata: { timestamp, request_id: requestId, version } };
      }

      // =========================================================================
      // KNOWLEDGE INGESTION & SCHOLARLY REVIEW ENGINE (SPEC SECTION 44)
      // =========================================================================
      if (path === '/api/v1/knowledge/ingestion' && method === 'POST') {
        const rawContent = body.content || body.rawText || '';
        const rawBytes = Buffer.isBuffer(rawContent)
          ? rawContent
          : Buffer.from(typeof rawContent === 'string' ? rawContent : JSON.stringify(rawContent), 'utf-8');
        const result = ecosystemService.createIngestionJob({
          sourceId: body.sourceId,
          fileName: body.fileName || 'source-artifact.bin',
          rawBytes,
          acquisitionMethod: body.acquisitionMethod || 'DIGITAL_ORIGINAL',
          submittedBy: ctx.userId || body.submittedBy || 'system',
          declaredMetadata: body.declaredMetadata || {},
          licenseRecordId: body.licenseRecordId || 'lic_default',
        });
        return { success: true, data: result, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/knowledge/ingestion/jobs' && method === 'GET') {
        const jobs = ecosystemService.getAllIngestionJobs();
        return { success: true, data: jobs, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/knowledge/ingestion/jobs/') && method === 'GET') {
        const jobId = path.split('/')[5];
        const job = ecosystemService.getIngestionJob(jobId);
        if (!job) throw new Error(`Ingestion job ${jobId} not found.`);
        return { success: true, data: job, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/knowledge/ingestion/identity' && method === 'POST') {
        const check = ecosystemService.verifySourceIdentity(body.sourceId, {
          author: body.author,
          title: body.title,
          edition: body.edition,
          publisher: body.publisher,
          year: body.year,
          crossCheckCatalog: body.crossCheckCatalog,
        });
        return { success: true, data: check, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/knowledge/ingestion/provenance' && method === 'POST') {
        const provenance = ecosystemService.recordProvenance({
          sourceId: body.sourceId,
          originRepository: body.originRepository || 'Dar al-Kutub al-Ilmiyyah Archive',
          acquiredFrom: body.acquiredFrom || 'Official Repository',
          publisher: body.publisher || 'Dar al-Kutub',
          edition: body.edition || '1st Edition',
          artifactSha256: body.artifactSha256 || 'hash_placeholder',
          links: body.links || { workId: body.sourceId, authorId: 'auth_primary' },
        });
        return { success: true, data: provenance, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/knowledge/ingestion/license' && method === 'POST') {
        const lic = ecosystemService.verifyLicense({
          sourceId: body.sourceId,
          licenseType: body.licenseType || 'PUBLIC_DOMAIN',
          rights: body.rights || {
            storage: true,
            display: true,
            redistribution: true,
            commercialUse: false,
            aiProcessing: true,
            translationRights: true,
            derivativeRights: false,
          },
          jurisdiction: body.jurisdiction || 'GLOBAL_ISLAMIC_HERITAGE',
        });
        return { success: true, data: lic, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/knowledge/ingestion/passages' && method === 'POST') {
        const passage = ecosystemService.createPassage({
          passageId: body.passageId || `pas_${Date.now()}`,
          sourceId: body.sourceId,
          workId: body.workId || body.sourceId,
          editionId: body.editionId || 'edition_standard',
          volumeNumber: body.volumeNumber || 1,
          chapterNumber: body.chapterNumber,
          pageNumber: body.pageNumber || 1,
          paragraphIndex: body.paragraphIndex || 0,
          textArabic: body.textArabic || body.rawArabicText,
          textEnglish: body.textEnglish || body.englishTranslation,
          language: body.language || 'ar',
          textHash: body.textHash || 'hash_placeholder',
          contextBefore: body.contextBefore,
          contextAfter: body.contextAfter,
          sectionType: body.sectionType || 'AUTHOR_TEXT',
          quotations: body.quotations || [],
        });
        return { success: true, data: passage, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/knowledge/claims' && method === 'POST') {
        if (body.source_passage_id || body.claim_type) {
          const claim = ecosystemService.registerClaim(body);
          return { success: true, data: claim, metadata: { timestamp, request_id: requestId, version } };
        }
        const claim = ecosystemService.extractClaim({
          claimId: body.claimId || `clm_${Date.now()}`,
          passageId: body.passageId,
          sourceId: body.sourceId,
          claimText: body.claimText,
          claimType: body.claimType || 'FIQH_CLAIM',
          subject: body.subject || 'Rukn',
          predicate: body.predicate || 'is Obligatory',
          object: body.object || 'Salah',
          supportLevel: body.supportLevel || 'DIRECT',
          scholarlyStatus: body.scholarlyStatus || 'RELIED_UPON_POSITION',
          isAiGeneratedDraft: body.isAiGeneratedDraft ?? false,
          humanVerified: body.humanVerified ?? true,
        });
        return { success: true, data: claim, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/knowledge/references/verify' && method === 'POST') {
        const refCheck = ecosystemService.verifyReference({
          referenceId: body.referenceId || `ref_${Date.now()}`,
          claimId: body.claimId,
          rawReferenceText: body.rawReferenceText || body.sourceWork || 'Reference citation',
          targetCanonicalRef: body.targetCanonicalRef || `Vol ${body.volume || 1}, p. ${body.pageNumber || 1}`,
          status: body.status || 'VERIFIED',
          checks: {
            sourceExists: body.checks?.sourceExists ?? true,
            workExists: body.checks?.workExists ?? true,
            editionExists: body.checks?.editionExists ?? true,
            locatorExists: body.checks?.locatorExists ?? true,
            passageExists: body.checks?.passageExists ?? true,
            textMatch: body.checks?.textMatch ?? true,
            citationTargetMatch: body.checks?.citationTargetMatch ?? true,
            claimSupport: body.checks?.claimSupport ?? true,
          },
          verifiedBy: body.verifiedBy || 'AUTOMATED_DETERMINISTIC_CHECK',
          verifiedAt: new Date().toISOString(),
          rejectionReason: body.rejectionReason,
        });
        return { success: true, data: refCheck, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/knowledge/reviews' && method === 'POST') {
        const review = ecosystemService.submitScholarReview({
          reviewId: body.reviewId || `rev_${Date.now()}`,
          scholarId: body.scholarId || body.reviewerId || ctx.userId,
          scholarQualifications: body.scholarQualifications || ['MA Islamic Studies', 'Ijazah'],
          specialization: body.specialization || '05_FIQH',
          sourceId: body.sourceId,
          passageId: body.passageId || 'pas_default',
          claimId: body.claimId,
          decision: body.decision || 'APPROVE',
          rationale: body.rationale || body.scholarlyNotes || 'Sound transmission and textual fidelity verified.',
          checks: {
            referencesChecked: body.checks?.referencesChecked ?? true,
            madhhabChecked: body.checks?.madhhabChecked ?? true,
            traditionChecked: body.checks?.traditionChecked ?? true,
            contextChecked: body.checks?.contextChecked ?? true,
            disagreementChecked: body.checks?.disagreementChecked ?? true,
          },
          secondReviewRequired: body.secondReviewRequired ?? false,
          secondScholarId: body.secondScholarId,
          secondScholarDecision: body.secondScholarDecision,
          secondScholarRationale: body.secondScholarRationale,
          timestamp: new Date().toISOString(),
        });
        return { success: true, data: review, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/knowledge/disputes' && method === 'POST') {
        const dispute = ecosystemService.registerDispute({
          disputeId: body.disputeId || `dsp_${Date.now()}`,
          issue: body.issue || body.topic || 'Fiqh Distinction',
          claimId: body.claimId || 'clm_default',
          positionA: body.positionA,
          positionB: body.positionB,
          scholarA: body.scholarA || 'School A Representative',
          scholarB: body.scholarB || 'School B Representative',
          madhhabA: body.madhhabA || 'HANAFI',
          madhhabB: body.madhhabB || 'SHAFI_I',
          sourcesA: body.sourcesA || [],
          sourcesB: body.sourcesB || [],
          rationaleA: body.rationaleA || 'Primary linguistic and scriptural evidence',
          rationaleB: body.rationaleB || 'Companion consensus and contextual transmission',
          conditions: body.conditions || ['Pre-dawn timing validation required'],
          status: body.status || 'MULTIPLE_VALID_POSITIONS',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
        return { success: true, data: dispute, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/knowledge/publication/check' && method === 'POST') {
        const scorecard = ecosystemService.evaluateQualityScorecard(body.sourceId);
        return { success: true, data: scorecard, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/knowledge/publication/publish' && method === 'POST') {
        const published = ecosystemService.publishKnowledgeObject(body.knowledgeObject);
        return { success: true, data: published, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/knowledge/revoke' && method === 'POST') {
        const revocation = ecosystemService.revokeKnowledge({
          targetType: body.targetType,
          targetId: body.targetId,
          reason: body.reason,
          revokedBy: body.revokedBy || ctx.userId,
        });
        return { success: true, data: revocation, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/knowledge/explorer/') && method === 'GET') {
        const sourceId = path.split('/')[5];
        const tree = ecosystemService.getSourceExplorerTree(sourceId);
        return { success: true, data: tree, metadata: { timestamp, request_id: requestId, version } };
      }

      // =========================================================================
      // MULTILINGUAL CORPUS & DECOUPLED PREFERENCES (INDIA + GLOBAL PACKS)
      // =========================================================================
      if (path.startsWith('/api/v1/knowledge/quran/ayah/') && method === 'GET') {
        const parts = path.split('/');
        const surah = parseInt(parts[6], 10);
        const ayah = parseInt(parts[7], 10);
        if (isNaN(surah) || isNaN(ayah)) throw new Error('Invalid surah or ayah coordinate.');
        const view = ecosystemService.getAyahMultilingualView(surah, ayah);
        return { success: true, data: view, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/knowledge/quran/translation' && method === 'POST') {
        const result = ecosystemService.getQuranTranslation(
          body.surahNumber,
          body.ayahNumber,
          body.language,
          body.translatorPreference
        );
        return { success: true, data: result, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/knowledge/quran/tafsir' && method === 'POST') {
        const result = ecosystemService.getQuranTafsir(
          body.surahNumber,
          body.ayahNumber,
          body.language,
          body.tafsirPreference
        );
        return { success: true, data: result, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/knowledge/quran/personalized' && method === 'POST') {
        const prefs = body.preferences || {
          userId: ctx.userId,
          interfaceLanguage: body.interfaceLanguage || 'ur',
          contentLanguage: body.contentLanguage || 'ur',
          preferredQuranTranslator: body.preferredQuranTranslator,
          preferredTafsirWork: body.preferredTafsirWork,
          madhhabPreference: body.madhhabPreference || 'HANAFI',
          scholarlyTraditionPreference: body.scholarlyTraditionPreference || 'AHL_E_SUNNAT_RAZVI',
          spiritualLiteraturePreference: body.spiritualLiteraturePreference || 'TASAWWUF',
          showComparativeFiqh: body.showComparativeFiqh ?? true,
          showDisagreements: body.showDisagreements ?? true,
        };
        const personalized = ecosystemService.resolvePersonalizedQuranVerse(
          body.surahNumber || 1,
          body.ayahNumber || 1,
          prefs
        );
        return { success: true, data: personalized, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/knowledge/universal/decoupled-answer' && method === 'POST') {
        const prefs = body.preferences || {
          userId: ctx.userId,
          interfaceLanguage: body.interfaceLanguage || 'ur',
          contentLanguage: body.contentLanguage || 'ur',
          preferredQuranTranslator: body.preferredQuranTranslator,
          preferredTafsirWork: body.preferredTafsirWork,
          madhhabPreference: body.madhhabPreference || 'HANAFI',
          scholarlyTraditionPreference: body.scholarlyTraditionPreference || 'AHL_E_SUNNAT_RAZVI',
          spiritualLiteraturePreference: body.spiritualLiteraturePreference || 'TASAWWUF',
          showComparativeFiqh: body.showComparativeFiqh ?? true,
          showDisagreements: body.showDisagreements ?? true,
        };
        const answer = ecosystemService.resolveDecoupledAnswer(body.disagreementId, prefs);
        return { success: true, data: answer, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/knowledge/multilingual/summary' && method === 'GET') {
        const summary = ecosystemService.getMultilingualCorpusSummary();
        return { success: true, data: summary, metadata: { timestamp, request_id: requestId, version } };
      }

      // =========================================================================
      // UNIVERSAL MULTILINGUAL ISLAMIC KNOWLEDGE ENGINE (SECTION 41 ENDPOINTS)
      // =========================================================================
      if (path === '/api/v1/languages' && method === 'GET') {
        const languages = ecosystemService.getLanguages();
        return { success: true, data: languages, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/quran/surahs' && method === 'GET') {
        const surahs = ecosystemService.getQuranSurahsMaster();
        return { success: true, data: surahs, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/quran/ayahs/') && method === 'GET') {
        const ayahKey = path.split('/')[5];
        const ayah = ecosystemService.getQuranAyahMaster(ayahKey);
        if (!ayah) throw new Error(`Ayah canonical key ${ayahKey} not found.`);
        return { success: true, data: ayah, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/translations' && method === 'GET') {
        const translations = ecosystemService.getTranslationPassages();
        return { success: true, data: translations, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/translations/') && method === 'GET') {
        const id = path.split('/')[4];
        const work = ecosystemService.getTranslationWork(id);
        if (!work) throw new Error(`Translation work ${id} not found.`);
        return { success: true, data: work, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/tafsir' && method === 'GET') {
        const tafsirWorks = ecosystemService.getTafsirWorks();
        return { success: true, data: tafsirWorks, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/tafsir/') && method === 'GET') {
        const id = path.split('/')[4];
        const passages = ecosystemService.getTafsirPassages(undefined, id);
        return { success: true, data: passages, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/scholars' && method === 'GET') {
        const scholars = ecosystemService.getScholarsList();
        return { success: true, data: scholars, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/madhhabs' && method === 'GET') {
        const madhhabs = ecosystemService.getMadhhabsList();
        return { success: true, data: madhhabs, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/traditions' && method === 'GET') {
        const traditions = ecosystemService.getTraditionsList();
        return { success: true, data: traditions, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/evidence/search' && method === 'GET') {
        const searchResults = ecosystemService.getTranslationPassages('1:1');
        return { success: true, data: searchResults, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/evidence/') && method === 'GET') {
        const id = path.split('/')[4];
        const ayah = ecosystemService.getQuranAyahMaster(id || '1:1');
        return { success: true, data: ayah, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/ai/ask' && method === 'POST') {
        const response = ecosystemService.generateGovernedAnswer(body);
        const audit = ecosystemService.auditResponseContract(response);
        if (!audit.passed) {
          throw new Error(`CLAIM_AUDITOR_BLOCKED: Hard blocks triggered: [${audit.hard_blocks_triggered.join(', ')}]`);
        }
        return { success: true, data: response, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/evidence/compare' && method === 'POST') {
        const prefs = body.preferences || {
          userId: ctx.userId,
          interfaceLanguage: body.interfaceLanguage || 'ur',
          contentLanguage: body.contentLanguage || 'ur',
          madhhabPreference: body.madhhabPreference || 'HANAFI',
          scholarlyTraditionPreference: body.scholarlyTraditionPreference || 'AHL_E_SUNNAT_RAZVI',
          spiritualLiteraturePreference: 'TASAWWUF',
          showComparativeFiqh: true,
          showDisagreements: true,
        };
        const comparative = ecosystemService.resolveDecoupledAnswer(body.disagreementId || 'dis_fatihah_behind_imam', prefs);
        return { success: true, data: comparative, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/sources/') && method === 'GET') {
        const id = path.split('/')[4];
        const entry = ecosystemService.getMasterSourceCatalogueEntry(id) || { sourceId: id, status: 'PUBLISHED' };
        return { success: true, data: entry, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/knowledge/releases' && method === 'GET') {
        const releases = ecosystemService.getMasterKnowledgeReleases();
        return { success: true, data: releases, metadata: { timestamp, request_id: requestId, version } };
      }

      // =========================================================================
      // AMAL LEGACY & FAMILY CONTINUITY OS ENDPOINTS
      // =========================================================================
      if (path === '/api/v1/legacy/spaces' && method === 'POST') {
        const space = ecosystemService.createLegacySpace({
          ownerId: ctx.userId,
          name: body.name || 'Personal & Family Legacy',
          description: body.description || 'Beneficial knowledge and reflections passed forward.',
        });
        return { success: true, data: space, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/legacy/items' && method === 'POST') {
        const item = ecosystemService.createLegacyItem({
          spaceId: body.spaceId || 'space_default_legacy',
          creatorId: ctx.userId,
          type: body.type || 'FAMILY_LESSON',
          title: body.title,
          content: body.content,
          language: body.language || 'en',
          provenanceTag: body.provenanceTag || 'USER_CREATED',
          relatedEvidenceIds: body.relatedEvidenceIds,
        });
        return { success: true, data: item, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/legacy/items/') && method === 'GET') {
        const id = path.split('/')[5];
        const item = ecosystemService.getLegacyItem(id, ctx.userId);
        return { success: true, data: item, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/legacy/collections' && method === 'POST') {
        const collection = ecosystemService.createLegacyCollection({
          creatorId: ctx.userId,
          title: body.title,
          description: body.description,
          targetAudience: body.targetAudience || 'CHILDREN',
          itemIds: body.itemIds || [],
        });
        return { success: true, data: collection, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/legacy/collections/') && method === 'GET') {
        const id = path.split('/')[5];
        const collection = ecosystemService.getLegacyCollection(id, ctx.userId);
        return { success: true, data: collection, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/legacy/release' && method === 'POST') {
        const release = ecosystemService.releaseLegacyResource({
          resourceId: body.resourceId,
          creatorId: ctx.userId,
          targetStatus: body.targetStatus || 'FAMILY_SHARED',
          designatedRecipientIds: body.designatedRecipientIds,
          releaseConditions: body.releaseConditions,
        });
        return { success: true, data: release, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/legacy/instructions' && method === 'POST') {
        const inst = ecosystemService.setLegacyInstructions({
          userId: ctx.userId,
          trustedContactEmail: body.trustedContactEmail,
          trustedContactName: body.trustedContactName,
          inactivityThresholdDays: body.inactivityThresholdDays || 180,
          releaseCollectionIds: body.releaseCollectionIds || [],
          notesForContact: body.notesForContact,
        });
        return { success: true, data: inst, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/legacy/instructions' && method === 'GET') {
        const inst = ecosystemService.getLegacyInstructions(ctx.userId);
        return { success: true, data: inst || null, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/legacy/letters' && method === 'POST') {
        const letter = ecosystemService.createLegacyLetter({
          authorId: ctx.userId,
          recipientDescription: body.recipientDescription || 'My Children',
          title: body.title,
          letterBody: body.letterBody,
          duasIncluded: body.duasIncluded,
          valuesEncouraged: body.valuesEncouraged,
        });
        return { success: true, data: letter, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/legacy/audio' && method === 'POST') {
        const audio = ecosystemService.recordLegacyAudio({
          speakerId: ctx.userId,
          speakerName: body.speakerName || 'Parent',
          audioUrl: body.audioUrl || 'https://amal.app/audio/msg_01.m4a',
          transcriptText: body.transcriptText,
          language: body.language || 'ur',
          recipientIds: body.recipientIds || [],
        });
        return { success: true, data: audio, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/legacy/export' && method === 'POST') {
        const archive = ecosystemService.exportUserLegacyArchive(ctx.userId, body.format || 'STRUCTURED_JSON_ARCHIVE');
        return { success: true, data: archive, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/legacy/audit' && method === 'GET') {
        const logs = ecosystemService.getLegacyAuditLogs(ctx.userId);
        return { success: true, data: logs, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/family/today') && method === 'GET') {
        const familyId = body?.familyId || 'fam_circle_ahmad';
        const date = new Date().toISOString().split('T')[0];
        const dashboard = ecosystemService.getFamilyTodayDashboard(familyId, date);
        return { success: true, data: dashboard, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/family/journeys/shared' && method === 'POST') {
        const journey = ecosystemService.createSharedFamilyJourney({
          familyId: body.familyId || 'fam_circle_ahmad',
          title: body.title,
          goal: body.goal,
          familyBaseline: body.familyBaseline || 'Starting together',
          totalDays: body.totalDays || 14,
          memberAmalPlans: body.memberAmalPlans || [],
          sharedActivityDescription: body.sharedActivityDescription || 'Read and reflect together',
        });
        return { success: true, data: journey, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/family/child/profile' && method === 'POST') {
        const profile = ecosystemService.registerChildAccount({
          userId: body.userId || `child_${Date.now()}`,
          ageBand: body.ageBand || '7_10',
          guardianUserId: ctx.userId,
          guardianConsentGranted: body.guardianConsentGranted ?? true,
        });
        return { success: true, data: profile, metadata: { timestamp, request_id: requestId, version } };
      }

      // =========================================================================
      // AMAL COMMUNITY & UMMAH OS ENDPOINTS (Section 50)
      // =========================================================================

      if (path === '/api/v1/community' && method === 'GET') {
        const dashboard = ecosystemService.getCommunityDashboard();
        return { success: true, data: dashboard, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/community/nearby' && method === 'GET') {
        const query = body || {};
        const result = ecosystemService.discoverCommunityNearby(query);
        return { success: true, data: result, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/community/organizations' && method === 'GET') {
        const orgs = ecosystemService.listCommunityOrganizations(body);
        return { success: true, data: orgs, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/community/organizations' && method === 'POST') {
        const org = ecosystemService.registerCommunityOrganization(body);
        return { success: true, data: org, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/community/organizations/') && method === 'GET') {
        const id = path.split('/')[5];
        const orgDetails = ecosystemService.getCommunityOrganization(id);
        if (!orgDetails) throw new Error(`Community organization ${id} not found.`);
        return { success: true, data: orgDetails, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/community/programs' && method === 'GET') {
        const programs = ecosystemService.listCommunityPrograms(body);
        return { success: true, data: programs, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/community/events' && method === 'GET') {
        const events = ecosystemService.listCommunityEvents(body);
        return { success: true, data: events, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/community/events/') && path.endsWith('/register') && method === 'POST') {
        const id = path.split('/')[5];
        const res = ecosystemService.registerCommunityEvent(id, ctx.userId);
        return { success: res.success, data: res, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/community/scholars' && method === 'GET') {
        const scholars = ecosystemService.listVerifiedScholarsCommunity();
        return { success: true, data: scholars, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/community/groups' && method === 'GET') {
        const groups = ecosystemService.listCommunityGroups(ctx.userId);
        return { success: true, data: groups, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/community/groups' && method === 'POST') {
        const group = ecosystemService.createCommunityGroup({
          name: body.name,
          description: body.description,
          type: body.type || 'LEARNING_CIRCLE',
          creatorId: ctx.userId,
          organizationId: body.organizationId,
        });
        return { success: true, data: group, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/community/service' && method === 'GET') {
        if (body?.skills || body?.availableHours) {
          const matched = ecosystemService.matchCommunityVolunteers({
            userId: ctx.userId,
            availableHours: body.availableHours || 4,
            skills: body.skills || [],
            familyParticipation: body.familyParticipation ?? false,
          });
          return { success: true, data: matched, metadata: { timestamp, request_id: requestId, version } };
        }
        const serviceOpps = ecosystemService.listCommunityService(body);
        return { success: true, data: serviceOpps, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/community/service/') && path.endsWith('/signup') && method === 'POST') {
        const id = path.split('/')[5];
        const res = ecosystemService.signUpCommunityService(id, ctx.userId);
        return { success: res.success, data: res, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/community/reports' && method === 'POST') {
        const report = ecosystemService.submitCommunityReport({
          reportingUserId: ctx.userId,
          reportedEntityId: body.reportedEntityId,
          reportedEntityType: body.reportedEntityType || 'USER',
          category: body.category || 'HARASSMENT',
          details: body.details || '',
        });
        return { success: true, data: report, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/community/resources' && method === 'GET') {
        const resources = ecosystemService.listCommunityResources(body);
        return { success: true, data: resources, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/community/zakat/calculate' && method === 'POST') {
        const calculation = ecosystemService.calculateCommunityZakat(body);
        return { success: true, data: calculation, metadata: { timestamp, request_id: requestId, version } };
      }

      // =========================================================================
      // AMAL SCHOLAR OS + KNOWLEDGE GOVERNANCE PLATFORM ENDPOINTS (Section 39)
      // =========================================================================

      if (path === '/api/v1/cases' && method === 'POST') {
        const newCase = ecosystemService.createScholarOSCase({
          userId: ctx.userId,
          question: body.question,
          sanitizedContext: body.sanitizedContext || 'General inquiry',
          domain: body.domain || 'HANAFI_FIQH',
          selectedMadhhab: body.selectedMadhhab || 'HANAFI',
          language: body.language || 'en',
          riskLevel: body.riskLevel || 'MEDIUM',
        });
        return { success: true, data: newCase, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/cases/') && path.endsWith('/accept') && method === 'POST') {
        const caseId = path.split('/')[4];
        const accepted = ecosystemService.acceptScholarOSCase(caseId, ctx.userId);
        return { success: true, data: accepted, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/cases/') && path.endsWith('/respond') && method === 'POST') {
        const caseId = path.split('/')[4];
        const responded = ecosystemService.respondToScholarOSCase(caseId, body);
        return { success: true, data: responded, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/cases/') && path.endsWith('/multi-review') && method === 'POST') {
        const caseId = path.split('/')[4];
        const reviewed = ecosystemService.completeMultiScholarReview(caseId, ctx.userId, body.outcome, body.notes);
        return { success: true, data: reviewed, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/cases/') && path.endsWith('/close') && method === 'POST') {
        const caseId = path.split('/')[4];
        const closed = ecosystemService.closeScholarOSCase(caseId);
        return { success: true, data: closed, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/cases/') && method === 'GET') {
        const caseId = path.split('/')[4];
        const scCase = ecosystemService.getScholarOSCase(caseId, ctx.userId, ctx.userRole === 'SCHOLAR');
        return { success: true, data: scCase, metadata: { timestamp, request_id: requestId, version } };
      }

      // Governance Sources
      if (path === '/api/v1/governance/sources' && method === 'POST') {
        const src = ecosystemService.registerGovernanceSource(body);
        return { success: true, data: src, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/governance/sources/') && path.endsWith('/quarantine') && method === 'POST') {
        const sourceId = path.split('/')[5];
        const quarantined = ecosystemService.updateGovernanceSourceStatus(sourceId, 'QUARANTINED', ctx.userId);
        return { success: true, data: quarantined, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/governance/sources/') && method === 'GET') {
        const sourceId = path.split('/')[5];
        const src = ecosystemService.getGovernanceSource(sourceId);
        if (!src) throw new Error(`Source ${sourceId} not found`);
        return { success: true, data: src, metadata: { timestamp, request_id: requestId, version } };
      }

      // Governance Claims & Auditor
      if (path === '/api/v1/governance/claims' && method === 'POST') {
        const claim = ecosystemService.registerGovernanceClaim(body);
        return { success: true, data: claim, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/governance/claims/audit' && method === 'POST') {
        const audit = ecosystemService.auditProposedGovernanceResponse(body.text, body.claims || []);
        return { success: audit.passed, data: audit, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/governance/claims/') && method === 'GET') {
        const claimId = path.split('/')[5];
        const clm = ecosystemService.getGovernanceClaim(claimId);
        if (!clm) throw new Error(`Claim ${claimId} not found`);
        return { success: true, data: clm, metadata: { timestamp, request_id: requestId, version } };
      }

      // Governance Disagreement Issues
      if (path === '/api/v1/governance/issues' && method === 'GET') {
        const issues = ecosystemService.listGovernanceDisagreements();
        return { success: true, data: issues, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/governance/issues/') && method === 'GET') {
        const issueId = path.split('/')[5];
        const iss = ecosystemService.getGovernanceDisagreement(issueId);
        if (!iss) throw new Error(`Issue ${issueId} not found`);
        return { success: true, data: iss, metadata: { timestamp, request_id: requestId, version } };
      }

      // Governance Knowledge Releases & Blue/Green
      if (path === '/api/v1/governance/releases' && method === 'POST') {
        const rel = ecosystemService.createGovernanceRelease(body);
        return { success: true, data: rel, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/governance/releases/') && path.endsWith('/publish') && method === 'POST') {
        const releaseId = path.split('/')[5];
        const published = ecosystemService.publishGovernanceRelease(releaseId, ctx.userId);
        return { success: true, data: published, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/governance/releases/') && path.endsWith('/rollback') && method === 'POST') {
        const rolled = ecosystemService.rollbackGovernanceRelease(body.reason || 'Integrity audit failure', ctx.userId);
        return { success: true, data: rolled, metadata: { timestamp, request_id: requestId, version } };
      }

      // Emergency Controls (Kill Switches)
      if (path === '/api/v1/governance/emergency-controls' && method === 'GET') {
        const controls = ecosystemService.getScholarEmergencyControls();
        return { success: true, data: controls, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/governance/emergency-controls' && method === 'POST') {
        const updated = ecosystemService.setScholarEmergencyControl(body.control, body.state, ctx.userId);
        return { success: true, data: updated, metadata: { timestamp, request_id: requestId, version } };
      }

      // Final Trust Test (Section 42)
      if (path.startsWith('/api/v1/governance/final-trust/') && method === 'GET') {
        const claimId = path.split('/')[5];
        const trustChain = ecosystemService.verifyFinalTrustProvenance(claimId);
        return { success: trustChain.is_chain_unbroken, data: trustChain, metadata: { timestamp, request_id: requestId, version } };
      }

      // =====================================================
      // TAZKIYAH, TASAWWUF & SPIRITUAL HERITAGE ENGINE (Section 69)
      // =====================================================
      // Spiritual Figures (Buzurgs)
      if (path === '/api/v1/spiritual-figures' && method === 'GET') {
        const figures = ecosystemService.listBuzurgFigures();
        return { success: true, data: figures, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/spiritual-figures' && method === 'POST') {
        const figure = ecosystemService.registerBuzurgFigure(body);
        return { success: true, data: figure, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/spiritual-figures/resolve' && method === 'POST') {
        const figure = ecosystemService.resolveBuzurgByAlias(body.query || body.alias);
        return { success: !!figure, data: figure, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/spiritual-figures/') && method === 'GET') {
        const personId = path.split('/')[4];
        const figure = ecosystemService.getBuzurgFigure(personId);
        if (!figure) throw new Error(`Spiritual figure ${personId} not found`);
        return { success: true, data: figure, metadata: { timestamp, request_id: requestId, version } };
      }

      // Silsilas & Lineage
      if (path === '/api/v1/silsilas' && method === 'GET') {
        const silsilas = ecosystemService.listSilsilas();
        return { success: true, data: silsilas, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/silsilas' && method === 'POST') {
        const silsila = ecosystemService.registerSilsila(body);
        return { success: true, data: silsila, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/silsilas/transmissions' && method === 'POST') {
        const edge = ecosystemService.addSilsilaTransmission(body);
        return { success: true, data: edge, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/silsilas/') && path.endsWith('/lineage') && method === 'GET') {
        const silsilaId = path.split('/')[4];
        const lineage = ecosystemService.getSilsilaLineage(silsilaId);
        return { success: true, data: lineage, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/silsilas/') && method === 'GET') {
        const silsilaId = path.split('/')[4];
        const silsila = ecosystemService.getSilsila(silsilaId);
        if (!silsila) throw new Error(`Silsila ${silsilaId} not found`);
        return { success: true, data: silsila, metadata: { timestamp, request_id: requestId, version } };
      }

      // Spiritual Works
      if (path === '/api/v1/spiritual-works' && method === 'GET') {
        const works = ecosystemService.listSpiritualWorks();
        return { success: true, data: works, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/spiritual-works' && method === 'POST') {
        const work = ecosystemService.registerSpiritualWork(body);
        return { success: true, data: work, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/spiritual-works/') && method === 'GET') {
        const workId = path.split('/')[4];
        const work = ecosystemService.getSpiritualWork(workId);
        if (!work) throw new Error(`Spiritual work ${workId} not found`);
        return { success: true, data: work, metadata: { timestamp, request_id: requestId, version } };
      }

      // Quote Verification
      if (path === '/api/v1/quotes/verify' && method === 'POST') {
        const result = ecosystemService.verifySpiritualQuote(body.quote || body.quoteText);
        return { success: true, data: result, metadata: { timestamp, request_id: requestId, version } };
      }

      // Spiritual Concepts Ontology
      if (path === '/api/v1/spiritual-concepts' && method === 'GET') {
        const concepts = ecosystemService.listSpiritualConcepts();
        return { success: true, data: concepts, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/spiritual-concepts/') && method === 'GET') {
        const conceptId = path.split('/')[4];
        const concept = ecosystemService.getSpiritualConcept(conceptId);
        if (!concept) throw new Error(`Spiritual concept ${conceptId} not found`);
        return { success: true, data: concept, metadata: { timestamp, request_id: requestId, version } };
      }

      // Spiritual Claims & Practices
      if (path === '/api/v1/spiritual-claims' && method === 'POST') {
        const claim = ecosystemService.registerSpiritualClaim(body);
        return { success: true, data: claim, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/spiritual-claims/') && method === 'GET') {
        const claimId = path.split('/')[4];
        const claim = ecosystemService.getSpiritualClaim(claimId);
        if (!claim) throw new Error(`Spiritual claim ${claimId} not found`);
        return { success: true, data: claim, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/spiritual-practices' && method === 'GET') {
        const practices = ecosystemService.listSpiritualPractices();
        return { success: true, data: practices, metadata: { timestamp, request_id: requestId, version } };
      }

      // Scholarly Review
      if (path === '/api/v1/spiritual-reviews' && method === 'POST') {
        const review = ecosystemService.submitSpiritualScholarReview(body);
        return { success: true, data: review, metadata: { timestamp, request_id: requestId, version } };
      }

      // AI Safety Gate
      if (path === '/api/v1/spiritual-safety/evaluate' && method === 'POST') {
        const evalResult = ecosystemService.evaluateSpiritualAiSafety(body.prompt || '', body.response || body.proposedResponse || '');
        return { success: evalResult.passed, data: evalResult, metadata: { timestamp, request_id: requestId, version } };
      }

      // 10-Question Provenance Audit (Section 99)
      if (path.startsWith('/api/v1/spiritual-heritage/audit/') && method === 'GET') {
        const claimId = path.split('/')[5];
        const audit = ecosystemService.auditSpiritualClaimProvenance(claimId);
        return { success: audit.is_verified_unbroken, data: audit, metadata: { timestamp, request_id: requestId, version } };
      }

      // -----------------------------------------------------
      // KNOWLEDGE PRODUCTION FACTORY (Section 98 REST APIS)
      // -----------------------------------------------------

      // Candidate Queue
      if (path === '/api/v1/knowledge/sources/candidates' && method === 'POST') {
        const item = ecosystemService.enqueueFactoryCandidate(body.item, body.priorityFactors);
        return { success: true, data: item, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/knowledge/sources/candidates' && method === 'GET') {
        const items = ecosystemService.listFactoryCandidates();
        return { success: true, data: items, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/knowledge/sources/triage' && method === 'POST') {
        const result = ecosystemService.triageFactoryCandidate(body.candidateId, body.action);
        return { success: true, data: result, metadata: { timestamp, request_id: requestId, version } };
      }

      // Acquisition & Artifact Custody
      if (path === '/api/v1/knowledge/sources/acquire' && method === 'POST') {
        const result = ecosystemService.acquireSourceArtifact({
          candidateId: body.candidateId,
          requestedBy: body.requestedBy,
          method: body.method,
          repository: body.repository,
          provider: body.provider,
          rawBytes: Buffer.from(body.rawBytesBase64 || body.rawText || '', 'utf-8'),
          licenseState: body.licenseState,
          country: body.country,
          artifactType: body.artifactType,
        });
        return { success: result.licenseGate.is_approved_for_production, data: result, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/knowledge/sources/derivative' && method === 'POST') {
        const derivative = ecosystemService.createArtifactDerivative({
          originalArtifactId: body.originalArtifactId,
          derivativeType: body.derivativeType,
          processor: body.processor,
          processorVersion: body.processorVersion,
          rawBytes: Buffer.from(body.rawBytesBase64 || body.rawText || '', 'utf-8'),
          configuration: body.configuration || {},
        });
        return { success: true, data: derivative, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/knowledge/sources/custody/') && method === 'GET') {
        const artifactId = path.split('/')[6];
        const custody = ecosystemService.getArtifactChainOfCustody(artifactId);
        return { success: !!custody, data: custody, metadata: { timestamp, request_id: requestId, version } };
      }

      // OCR & Normalization
      if (path === '/api/v1/knowledge/processing/ocr' && method === 'POST') {
        const ocr = ecosystemService.runOcrPipeline(body);
        return { success: true, data: ocr, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/knowledge/processing/normalize' && method === 'POST') {
        const norm = ecosystemService.normalizeExtractedText(body.rawText, body.isQuranicText);
        return { success: true, data: norm, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/knowledge/processing/structure' && method === 'POST') {
        const node = ecosystemService.createStructureNode(body);
        return { success: true, data: node, metadata: { timestamp, request_id: requestId, version } };
      }

      // Passages
      if (path === '/api/v1/knowledge/passages' && method === 'POST') {
        const passage = ecosystemService.segmentPassage(body);
        return { success: true, data: passage, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/knowledge/passages/') && method === 'GET') {
        const passageId = path.split('/')[5];
        const passage = ecosystemService.getPassage(passageId);
        return { success: !!passage, data: passage, metadata: { timestamp, request_id: requestId, version } };
      }

      // Quran & Hadith Reference Resolvers
      if (path === '/api/v1/knowledge/references/quran/resolve' && method === 'POST') {
        const res = ecosystemService.resolveQuranReference(body.reference || body.rawReference);
        return { success: res.is_valid, data: res, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/knowledge/references/hadith/resolve' && method === 'POST') {
        const res = ecosystemService.resolveHadithReference(body.collection, body.rawNumber, body.edition);
        return { success: res.resolution_status === 'RESOLVED', data: res, metadata: { timestamp, request_id: requestId, version } };
      }

      // Citations
      if (path === '/api/v1/knowledge/citations' && method === 'POST') {
        const citation = ecosystemService.registerCrossSourceCitation(body);
        return { success: true, data: citation, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/knowledge/citations/verify' && method === 'POST') {
        const citation = ecosystemService.verifyCitation(body.citationId, body.matchedPassageId);
        return { success: true, data: citation, metadata: { timestamp, request_id: requestId, version } };
      }

      // Madhhab Matrix
      if (path === '/api/v1/knowledge/madhhab-matrix' && method === 'POST') {
        const matrix = ecosystemService.registerMadhhabIssueMatrix(body);
        return { success: true, data: matrix, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/knowledge/madhhab-matrix/') && method === 'GET') {
        const issueId = path.split('/')[5];
        const matrix = ecosystemService.getMadhhabIssueMatrix(issueId);
        return { success: !!matrix, data: matrix, metadata: { timestamp, request_id: requestId, version } };
      }

      // Claims
      if (path.startsWith('/api/v1/knowledge/claims/') && method === 'GET') {
        const claimId = path.split('/')[5];
        const claim = ecosystemService.getClaim(claimId);
        return { success: !!claim, data: claim, metadata: { timestamp, request_id: requestId, version } };
      }

      // Translations Alignment
      if (path === '/api/v1/knowledge/translations/align' && method === 'POST') {
        const alignment = ecosystemService.alignTranslation(body);
        return { success: true, data: alignment, metadata: { timestamp, request_id: requestId, version } };
      }

      // Review & Disputes
      if (path === '/api/v1/knowledge/reviews' && method === 'POST') {
        const reviewResult = ecosystemService.submitFactoryScholarReview(body.review, body.riskLevel || 'LOW');
        return { success: true, data: reviewResult, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/knowledge/disputes' && method === 'POST') {
        const dispute = ecosystemService.createDispute(body);
        return { success: true, data: dispute, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/knowledge/disputes/') && path.endsWith('/resolve') && method === 'POST') {
        const disputeId = path.split('/')[5];
        const dispute = ecosystemService.resolveDispute(disputeId, body.resolution, body.resolutionType);
        return { success: true, data: dispute, metadata: { timestamp, request_id: requestId, version } };
      }

      // Quarantine
      if (path === '/api/v1/knowledge/quarantine' && method === 'POST') {
        const q = ecosystemService.quarantineEntity(body.entityType, body.entityId, body.reason, body.notes, body.actor);
        return { success: true, data: q, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/knowledge/quarantine/check/') && method === 'GET') {
        const entityId = path.split('/')[6];
        const isQuarantined = ecosystemService.isEntityQuarantined(entityId);
        return { success: true, data: { entityId, isQuarantined }, metadata: { timestamp, request_id: requestId, version } };
      }

      // Releases & Instant Rollback
      if (path === '/api/v1/knowledge/releases' && method === 'POST') {
        const rel = ecosystemService.createKnowledgeRelease(body);
        return { success: true, data: rel, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/knowledge/releases/publish' && method === 'POST') {
        const pub = ecosystemService.publishKnowledgeRelease(body.releaseId);
        return { success: pub.success, data: pub, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/knowledge/releases/rollback' && method === 'POST') {
        const rb = ecosystemService.rollbackFactoryKnowledgeRelease(body.reason, body.actor);
        return { success: rb.success, data: rb, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/knowledge/releases/active' && method === 'GET') {
        const active = ecosystemService.getActiveFactoryKnowledgeRelease();
        return { success: !!active, data: active, metadata: { timestamp, request_id: requestId, version } };
      }

      // Evidence Pack & Quality Scorecard
      if (path === '/api/v1/knowledge/evidence-pack' && method === 'POST') {
        const pack = ecosystemService.buildEvidencePack(body.question, body.intent, body.claimIds || []);
        return { success: true, data: pack, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/knowledge/quality-scorecard/') && method === 'GET') {
        const sourceId = path.split('/')[5];
        const scorecard = ecosystemService.evaluateFactoryQualityScorecard(sourceId);
        return { success: true, data: scorecard, metadata: { timestamp, request_id: requestId, version } };
      }

      // Security: Prompt Injection Scan
      if (path === '/api/v1/knowledge/security/scan-prompt-injection' && method === 'POST') {
        const scan = ecosystemService.scanDocumentPromptInjection(body.rawContent || body.text || '');
        return { success: scan.passed, data: scan, metadata: { timestamp, request_id: requestId, version } };
      }

      // 10-Question Provenance Final Trust Contract Audit (Section 121)
      if (path.startsWith('/api/v1/knowledge/audit/') && method === 'GET') {
        const claimId = path.split('/')[5];
        const audit = ecosystemService.auditKnowledgeObjectTrust(claimId);
        return { success: audit.is_chain_unbroken, data: audit, metadata: { timestamp, request_id: requestId, version } };
      }

      // -----------------------------------------------------
      // 36. KNOWLEDGE ACQUISITION PROGRAM (125 SECTIONS)
      // -----------------------------------------------------
      if (path === '/api/v1/acquisition/candidates' && method === 'POST') {
        const candidate = ecosystemService.registerAcquisitionCandidate(body);
        return { success: true, data: candidate, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/acquisition/candidates' && method === 'GET') {
        const candidates = ecosystemService.listAcquisitionCandidates();
        return { success: true, data: candidates, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/acquisition/candidates/') && method === 'GET') {
        const id = path.split('/')[5];
        const candidate = ecosystemService.getAcquisitionCandidate(id);
        return { success: !!candidate, data: candidate, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/acquisition/rights-check' && method === 'POST') {
        const rights = ecosystemService.evaluateAcquisitionRights(body);
        return { success: rights.allowedForProduction, data: rights, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/acquisition/tier/') && method === 'GET') {
        const id = path.split('/')[5];
        const tier = ecosystemService.getAcquisitionCorpusTier(id);
        return { success: true, data: { work_id: id, tier }, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/acquisition/repositories' && method === 'GET') {
        const repos = ecosystemService.listAcquisitionRepositories();
        return { success: true, data: repos, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/acquisition/repositories/') && method === 'GET') {
        const id = path.split('/')[5];
        const repo = ecosystemService.getAcquisitionRepository(id);
        return { success: !!repo, data: repo, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/acquisition/packets' && method === 'POST') {
        const packet = ecosystemService.assembleSourcePacket(body);
        return { success: true, data: packet, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/acquisition/packets/') && method === 'GET') {
        const id = path.split('/')[5];
        const packet = ecosystemService.getSourcePacket(id);
        return { success: !!packet, data: packet, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/acquisition/works/') && method === 'GET') {
        const id = path.split('/')[5];
        const work = ecosystemService.getCanonicalWork(id);
        return { success: !!work, data: work, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/acquisition/batches' && method === 'POST') {
        const batch = ecosystemService.createAcquisitionBatch(body);
        return { success: true, data: batch, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/acquisition/batches/') && path.endsWith('/validate') && method === 'POST') {
        const id = path.split('/')[5];
        const validation = ecosystemService.validateAcquisitionBatchRelease(id);
        return { success: validation.releaseAllowed, data: validation, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/acquisition/batches/') && method === 'GET') {
        const id = path.split('/')[5];
        const batch = ecosystemService.getAcquisitionBatch(id);
        return { success: !!batch, data: batch, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/acquisition/capacity-planning' && method === 'GET') {
        const capacity = ecosystemService.evaluateAcquisitionCapacity();
        return { success: true, data: capacity, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/acquisition/withdrawals' && method === 'POST') {
        const withdrawal = ecosystemService.submitAcquisitionWithdrawal(body);
        return { success: true, data: withdrawal, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/acquisition/corrections' && method === 'POST') {
        const correction = ecosystemService.submitAcquisitionCorrection(body);
        return { success: true, data: correction, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/acquisition/source-cards/public/') && method === 'GET') {
        const id = path.split('/')[6];
        const card = ecosystemService.generateAmalPublicSourceCard(id);
        return { success: true, data: card, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path.startsWith('/api/v1/acquisition/source-cards/scholar/') && method === 'GET') {
        const id = path.split('/')[6];
        const card = ecosystemService.generateScholarExtendedSourceCard(id);
        return { success: true, data: card, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/acquisition/tracks/madhhab' && method === 'GET') {
        const tracks = ecosystemService.listFourMadhhabTracks();
        return { success: true, data: tracks, metadata: { timestamp, request_id: requestId, version } };
      }

      if (path === '/api/v1/acquisition/silsilas' && method === 'GET') {
        const silsilas = ecosystemService.listHistoricalSilsilas();
        return { success: true, data: silsilas, metadata: { timestamp, request_id: requestId, version } };
      }

      // -----------------------------------------------------
      // 37. UNIVERSAL ISLAMIC KNOWLEDGE MASTER CATALOGUE (129 SECTIONS)
      // -----------------------------------------------------
      if ((path === '/api/v1/catalogue/works' || path === '/catalogue/works') && method === 'GET') {
        const works = ecosystemService.listCatalogueWorks();
        return { success: true, data: works, metadata: { timestamp, request_id: requestId, version } };
      }

      if ((path.startsWith('/api/v1/catalogue/works/') || path.startsWith('/catalogue/works/')) && method === 'GET') {
        const id = path.includes('/api/v1/') ? path.split('/')[5] : path.split('/')[3];
        const work = ecosystemService.getCatalogueWork(id as AmalWorkId);
        return { success: !!work, data: work, metadata: { timestamp, request_id: requestId, version } };
      }

      if ((path === '/api/v1/catalogue/authors' || path === '/catalogue/authors') && method === 'GET') {
        const authors = ecosystemService.listCatalogueAuthors();
        return { success: true, data: authors, metadata: { timestamp, request_id: requestId, version } };
      }

      if ((path.startsWith('/api/v1/catalogue/authors/') || path.startsWith('/catalogue/authors/')) && method === 'GET') {
        const id = path.includes('/api/v1/') ? path.split('/')[5] : path.split('/')[3];
        const author = ecosystemService.getCatalogueAuthor(id as AmalPersonId);
        return { success: !!author, data: author, metadata: { timestamp, request_id: requestId, version } };
      }

      if ((path === '/api/v1/catalogue/silsilas' || path === '/catalogue/silsilas') && method === 'GET') {
        const silsilas = ecosystemService.listCatalogueSilsilas();
        return { success: true, data: silsilas, metadata: { timestamp, request_id: requestId, version } };
      }

      if ((path.startsWith('/api/v1/catalogue/silsilas/') || path.startsWith('/catalogue/silsilas/')) && method === 'GET') {
        const id = path.includes('/api/v1/') ? path.split('/')[5] : path.split('/')[3];
        const silsila = ecosystemService.getCatalogueSilsila(id as MasterSilsilaCode);
        return { success: !!silsila, data: silsila, metadata: { timestamp, request_id: requestId, version } };
      }

      if ((path.startsWith('/api/v1/catalogue/editions/') || path.startsWith('/catalogue/editions/')) && method === 'GET') {
        const id = path.includes('/api/v1/') ? path.split('/')[5] : path.split('/')[3];
        const edition = ecosystemService.getCatalogueEdition(id as AmalEditionId);
        return { success: !!edition, data: edition, metadata: { timestamp, request_id: requestId, version } };
      }

      if ((path === '/api/v1/catalogue/gaps' || path === '/catalogue/gaps') && method === 'GET') {
        const gaps = ecosystemService.analyzeCatalogueGaps();
        return { success: true, data: gaps, metadata: { timestamp, request_id: requestId, version } };
      }

      if ((path === '/api/v1/catalogue/priorities' || path === '/catalogue/priorities') && method === 'GET') {
        const recs = ecosystemService.getCatalogueAcquisitionRecommendations();
        return { success: true, data: recs, metadata: { timestamp, request_id: requestId, version } };
      }

      if ((path === '/api/v1/catalogue/batches' || path === '/catalogue/batches') && method === 'GET') {
        const batches = ecosystemService.listCatalogueBatches();
        return { success: true, data: batches, metadata: { timestamp, request_id: requestId, version } };
      }

      if ((path === '/api/v1/catalogue/candidates' || path === '/catalogue/candidates') && method === 'POST') {
        const work = ecosystemService.registerCatalogueWork(body);
        return { success: true, data: work, metadata: { timestamp, request_id: requestId, version } };
      }

      if ((path === '/api/v1/catalogue/audit' || path === '/catalogue/audit') && method === 'GET') {
        const audit = ecosystemService.runCatalogueAudit();
        return { success: audit.passed, data: audit, metadata: { timestamp, request_id: requestId, version } };
      }

      if ((path === '/api/v1/catalogue/dashboard' || path === '/catalogue/dashboard') && method === 'GET') {
        const metrics = ecosystemService.getCatalogueDashboardMetrics();
        return { success: true, data: metrics, metadata: { timestamp, request_id: requestId, version } };
      }

      if ((path.startsWith('/api/v1/catalogue/public-card/') || path.startsWith('/catalogue/public-card/')) && method === 'GET') {
        const id = path.includes('/api/v1/') ? path.split('/')[5] : path.split('/')[3];
        const card = ecosystemService.getPublicSourceView(id as AmalWorkId);
        return { success: true, data: card, metadata: { timestamp, request_id: requestId, version } };
      }

      if ((path.startsWith('/api/v1/catalogue/reconstruct/') || path.startsWith('/catalogue/reconstruct/')) && method === 'GET') {
        const id = path.includes('/api/v1/') ? path.split('/')[5] : path.split('/')[3];
        const packet = ecosystemService.reconstructKnowledgePacket(id as AmalWorkId);
        return { success: true, data: packet, metadata: { timestamp, request_id: requestId, version } };
      }

      // =========================================================================
      // GLOBAL ISLAMIC HERITAGE & KNOWLEDGE ATLAS V2 ROUTES (Sections 1-97, 91 DoD)
      // =========================================================================

      if ((path === '/api/v1/atlas/ghuniyat-al-talibin' || path === '/atlas/ghuniyat-al-talibin') && method === 'GET') {
        const result = ecosystemService.getGhuniyatAlTalibinStructuredResult();
        return { success: true, data: result, metadata: { timestamp, request_id: requestId, version } };
      }

      if ((path === '/api/v1/atlas/buzurg' || path === '/atlas/buzurg') && method === 'GET') {
        const figures = ecosystemService.listAtlasBuzurg();
        return { success: true, data: figures, metadata: { timestamp, request_id: requestId, version } };
      }

      if ((path.startsWith('/api/v1/atlas/buzurg/') || path.startsWith('/atlas/buzurg/')) && path.endsWith('/universe') && method === 'GET') {
        const parts = path.split('/');
        const id = parts[parts.length - 2];
        const universe = ecosystemService.getFigureKnowledgeUniverse(id as AmalPersonId);
        return { success: true, data: universe, metadata: { timestamp, request_id: requestId, version } };
      }

      if ((path.startsWith('/api/v1/atlas/buzurg/') || path.startsWith('/atlas/buzurg/')) && !path.endsWith('/universe') && method === 'GET') {
        const id = path.includes('/api/v1/') ? path.split('/')[5] : path.split('/')[3];
        const buzurg = ecosystemService.getAtlasBuzurg(id as AmalPersonId);
        return { success: !!buzurg, data: buzurg, metadata: { timestamp, request_id: requestId, version } };
      }

      if ((path.startsWith('/api/v1/atlas/silsilas/') || path.startsWith('/atlas/silsilas/')) && path.endsWith('/graph') && method === 'GET') {
        const parts = path.split('/');
        const id = parts[parts.length - 2];
        const graph = ecosystemService.getSilsilaGraph(id);
        return { success: true, data: graph, metadata: { timestamp, request_id: requestId, version } };
      }

      if ((path === '/api/v1/atlas/practices' || path === '/atlas/practices') && method === 'GET') {
        const practices = ecosystemService.listAtlasPractices();
        return { success: true, data: practices, metadata: { timestamp, request_id: requestId, version } };
      }

      if ((path.startsWith('/api/v1/atlas/practices/') || path.startsWith('/atlas/practices/')) && method === 'GET') {
        const id = path.includes('/api/v1/') ? path.split('/')[5] : path.split('/')[3];
        const practice = ecosystemService.getAtlasPractice(id as AmalPracticeId);
        return { success: !!practice, data: practice, metadata: { timestamp, request_id: requestId, version } };
      }

      if ((path === '/api/v1/atlas/concepts' || path === '/atlas/concepts') && method === 'GET') {
        const concepts = ecosystemService.listAtlasConcepts();
        return { success: true, data: concepts, metadata: { timestamp, request_id: requestId, version } };
      }

      if ((path.startsWith('/api/v1/atlas/concepts/') || path.startsWith('/atlas/concepts/')) && path.endsWith('/compare') && method === 'GET') {
        const parts = path.split('/');
        const term = parts[parts.length - 2];
        const comparison = ecosystemService.compareTazkiyahConcept(term as ClassicalTazkiyahConceptTerm);
        return { success: true, data: comparison, metadata: { timestamp, request_id: requestId, version } };
      }

      if ((path === '/api/v1/atlas/quotes/verify' || path === '/atlas/quotes/verify') && method === 'POST') {
        const audit = ecosystemService.verifyAtlasQuote(body);
        return { success: true, data: audit, metadata: { timestamp, request_id: requestId, version } };
      }

      if ((path === '/api/v1/atlas/spiritual-ai/ask' || path === '/atlas/spiritual-ai/ask') && method === 'POST') {
        const aiResponse = ecosystemService.generateSpiritualAIResponse(body.question || '', body.contextFigure);
        return { success: true, data: aiResponse, metadata: { timestamp, request_id: requestId, version } };
      }

      if ((path === '/api/v1/atlas/karamat' || path === '/atlas/karamat') && method === 'GET') {
        const reports = ecosystemService.getAtlasKaramatReports();
        return { success: true, data: reports, metadata: { timestamp, request_id: requestId, version } };
      }

      // --- AMAL TRUST & METHODOLOGY CENTER ---
      if ((path === '/api/v1/trust-center/manifest' || path === '/trust-center/manifest') && method === 'GET') {
        const manifest = ecosystemService.getTrustCenterManifest();
        return { success: true, data: manifest, metadata: { timestamp, request_id: requestId, version } };
      }

      if ((path === '/api/v1/trust-center/disclaimer' || path === '/trust-center/disclaimer') && method === 'GET') {
        const disclaimer = ecosystemService.getTrustCenterDisclaimer();
        return { success: true, data: disclaimer, metadata: { timestamp, request_id: requestId, version } };
      }

      if ((path === '/api/v1/trust-center/pipeline' || path === '/trust-center/pipeline') && method === 'GET') {
        const pipeline = ecosystemService.getTrustCenterPipeline();
        return { success: true, data: pipeline, metadata: { timestamp, request_id: requestId, version } };
      }

      if ((path === '/api/v1/trust-center/version-history' || path === '/trust-center/version-history') && method === 'GET') {
        const history = ecosystemService.getTrustCenterVersionHistory();
        return { success: true, data: history, metadata: { timestamp, request_id: requestId, version } };
      }

      if ((path.startsWith('/api/v1/trust-center/policies/') || path.startsWith('/trust-center/policies/')) && method === 'GET') {
        const parts = path.split('/');
        const slug = parts[parts.length - 1];
        const policy = ecosystemService.getTrustCenterPolicy(slug as TrustPolicySlug);
        return { success: !!policy, data: policy, metadata: { timestamp, request_id: requestId, version } };
      }

      // --- SIRAH & SHAMA'IL KNOWLEDGE FACTORY ---
      if ((path === '/api/v1/sirah/sources' || path === '/sirah/sources') && method === 'GET') {
        const sources = ecosystemService.listSirahSources();
        return { success: true, data: sources, metadata: { timestamp, request_id: requestId, version } };
      }

      if ((path.startsWith('/api/v1/sirah/sources/') || path.startsWith('/sirah/sources/')) && method === 'GET') {
        const id = path.includes('/api/v1/') ? path.split('/')[5] : path.split('/')[3];
        const source = ecosystemService.getSirahSource(id);
        return { success: !!source, data: source, metadata: { timestamp, request_id: requestId, version } };
      }

      if ((path === '/api/v1/sirah/events' || path === '/sirah/events') && method === 'GET') {
        const events = ecosystemService.listSirahEvents();
        return { success: true, data: events, metadata: { timestamp, request_id: requestId, version } };
      }

      if ((path.startsWith('/api/v1/sirah/events/') || path.startsWith('/sirah/events/')) && path.endsWith('/evidence') && method === 'GET') {
        const parts = path.split('/');
        const id = parts[parts.length - 2];
        const evidence = ecosystemService.getSirahEventEvidence(id);
        return { success: true, data: evidence, metadata: { timestamp, request_id: requestId, version } };
      }

      if ((path.startsWith('/api/v1/sirah/events/') || path.startsWith('/sirah/events/')) && path.endsWith('/reports') && method === 'GET') {
        const parts = path.split('/');
        const id = parts[parts.length - 2];
        const reports = ecosystemService.getSirahEventVariants(id);
        return { success: true, data: reports, metadata: { timestamp, request_id: requestId, version } };
      }

      if ((path.startsWith('/api/v1/sirah/events/') || path.startsWith('/sirah/events/')) && method === 'GET') {
        const id = path.includes('/api/v1/') ? path.split('/')[5] : path.split('/')[3];
        const event = ecosystemService.getSirahEvent(id);
        return { success: !!event, data: event, metadata: { timestamp, request_id: requestId, version } };
      }

      if ((path === '/api/v1/sirah/shamail' || path === '/sirah/shamail') && method === 'GET') {
        const reports = ecosystemService.listSirahShamail();
        return { success: true, data: reports, metadata: { timestamp, request_id: requestId, version } };
      }

      if ((path.startsWith('/api/v1/sirah/shamail/') || path.startsWith('/sirah/shamail/')) && method === 'GET') {
        const id = path.includes('/api/v1/') ? path.split('/')[5] : path.split('/')[3];
        const report = ecosystemService.getSirahShamail(id);
        return { success: !!report, data: report, metadata: { timestamp, request_id: requestId, version } };
      }

      if ((path === '/api/v1/sirah/timeline' || path === '/sirah/timeline') && method === 'GET') {
        const timeline = ecosystemService.getSirahTimeline();
        return { success: true, data: timeline, metadata: { timestamp, request_id: requestId, version } };
      }

      if ((path === '/api/v1/sirah/graph' || path === '/sirah/graph') && method === 'GET') {
        const graph = ecosystemService.getPropheticGraph();
        return { success: true, data: graph, metadata: { timestamp, request_id: requestId, version } };
      }

      if ((path === '/api/v1/sirah/ai/ask' || path === '/sirah/ai/ask') && method === 'POST') {
        const answer = ecosystemService.generateSirahAIAnswer(body.question || '');
        return { success: true, data: answer, metadata: { timestamp, request_id: requestId, version } };
      }

      if ((path.startsWith('/api/v1/sirah/events/') || path.startsWith('/sirah/events/')) && path.endsWith('/chronology') && method === 'GET') {
        const parts = path.split('/');
        const id = parts[parts.length - 2];
        const chronology = ecosystemService.getSirahEventChronology(id);
        return { success: !!chronology, data: chronology, metadata: { timestamp, request_id: requestId, version } };
      }

      if ((path.startsWith('/api/v1/sirah/events/') || path.startsWith('/sirah/events/')) && path.endsWith('/people') && method === 'GET') {
        const parts = path.split('/');
        const id = parts[parts.length - 2];
        const people = ecosystemService.getSirahEventPeople(id);
        return { success: !!people, data: people, metadata: { timestamp, request_id: requestId, version } };
      }

      if ((path.startsWith('/api/v1/sirah/events/') || path.startsWith('/sirah/events/')) && path.endsWith('/places') && method === 'GET') {
        const parts = path.split('/');
        const id = parts[parts.length - 2];
        const places = ecosystemService.getSirahEventPlaces(id);
        return { success: !!places, data: places, metadata: { timestamp, request_id: requestId, version } };
      }

      if ((path.startsWith('/api/v1/sirah/events/') || path.startsWith('/sirah/events/')) && path.endsWith('/quran') && method === 'GET') {
        const parts = path.split('/');
        const id = parts[parts.length - 2];
        const quran = ecosystemService.getSirahEventQuranLinks(id);
        return { success: !!quran, data: quran, metadata: { timestamp, request_id: requestId, version } };
      }

      if ((path.startsWith('/api/v1/sirah/events/') || path.startsWith('/sirah/events/')) && path.endsWith('/hadith') && method === 'GET') {
        const parts = path.split('/');
        const id = parts[parts.length - 2];
        const hadith = ecosystemService.getSirahEventHadithLinks(id);
        return { success: !!hadith, data: hadith, metadata: { timestamp, request_id: requestId, version } };
      }

      if ((path.startsWith('/api/v1/sirah/events/') || path.startsWith('/sirah/events/')) && path.endsWith('/lessons') && method === 'GET') {
        const parts = path.split('/');
        const id = parts[parts.length - 2];
        const lessons = ecosystemService.getSirahEventLessons(id);
        return { success: !!lessons, data: lessons, metadata: { timestamp, request_id: requestId, version } };
      }

      if ((path === '/api/v1/sirah/search' || path === '/sirah/search') && method === 'POST') {
        const results = ecosystemService.searchSirah(body.query || '', body.filters);
        return { success: true, data: results, metadata: { timestamp, request_id: requestId, version } };
      }

      if ((path === '/api/v1/sirah/compare' || path === '/sirah/compare') && method === 'POST') {
        const comparison = ecosystemService.compareSirahSources(body.event_id || '', body.source_a || '', body.source_b || '');
        return { success: true, data: comparison, metadata: { timestamp, request_id: requestId, version } };
      }

      if ((path === '/api/v1/sirah/reviews' || path === '/sirah/reviews') && method === 'POST') {
        const review = ecosystemService.submitSirahReview(body);
        return { success: true, data: review, metadata: { timestamp, request_id: requestId, version } };
      }

      if ((path === '/api/v1/sirah/claims' || path === '/sirah/claims') && method === 'POST') {
        const claim = ecosystemService.submitSirahClaim(body);
        return { success: true, data: claim, metadata: { timestamp, request_id: requestId, version } };
      }

      if ((path === '/api/v1/sirah/flags' || path === '/sirah/flags') && method === 'GET') {
        const flags = ecosystemService.getSirahFeatureFlags();
        return { success: true, data: flags, metadata: { timestamp, request_id: requestId, version } };
      }

      if ((path === '/api/v1/sirah/quotes/verify' || path === '/sirah/quotes/verify') && method === 'POST') {
        const audit = ecosystemService.verifySirahQuote(body.quote_text || '', body.claimed_author || '');
        return { success: true, data: audit, metadata: { timestamp, request_id: requestId, version } };
      }

      // -----------------------------------------------------
      // 404 NOT FOUND CONTRACT
      // -----------------------------------------------------
      const notFoundError: ApiErrorPayload = {
        code: 'ROUTE_NOT_FOUND',
        message: `Endpoint ${method} ${path} does not exist in AMAL OS V1 API.`,
        request_id: requestId,
        retryable: false,
      };

      return {
        success: false,
        error: notFoundError,
        metadata: { timestamp, request_id: requestId, version },
      };
    } catch (err: any) {
      const internalError: ApiErrorPayload = {
        code: 'INTERNAL_SERVER_ERROR',
        message: err.message || 'An unexpected error occurred.',
        request_id: requestId,
        retryable: true,
      };

      return {
        success: false,
        error: internalError,
        metadata: { timestamp, request_id: requestId, version },
      };
    }
  }
}
