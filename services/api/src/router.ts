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
} from '@amal/types';
import { db, SEED_JOURNEY_TEMPLATES } from '@amal/database';
import { quranProvider, IslamicEvidenceGraph, CitationValidator } from '@amal/evidence';
import { PrivacyCenter } from '@amal/auth';
import { FatwaFirewall } from '@amal/safety';
import {
  AIOrchestrator,
  JourneyAgent,
  ReflectionAgent,
  IntentRouter,
  AmalPlanner,
  ScholarEscalationAgent,
} from '@amal/service-ai';
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
    const requestId = `req_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    const version = '1.0.0';

    try {
      // -----------------------------------------------------
      // 1. AUTH DOMAIN
      // -----------------------------------------------------
      if (path === '/api/v1/auth/register' && method === 'POST') {
        const { email, display_name } = body;
        if (!email) throw new Error('Email is required.');

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

        return {
          success: true,
          data: {
            user_id: userId,
            session_id: `sess_${Date.now()}`,
            access_token: `token_${userId}`,
            refresh_token: `refresh_${userId}`,
            expires_in: 3600,
          },
          metadata: { timestamp, request_id: requestId, version },
        };
      }

      if (path === '/api/v1/auth/login' && method === 'POST') {
        const { email } = body;
        const user = Array.from(db.users.values()).find((u) => u.email === email);
        const userId = user ? user.id : 'usr-default-ahmad';
        return {
          success: true,
          data: {
            user_id: userId,
            session_id: `sess_${Date.now()}`,
            access_token: `token_${userId}`,
            refresh_token: `refresh_${userId}`,
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

      if (path === '/api/v1/auth/passkey/register' && method === 'POST') {
        return {
          success: true,
          data: { challenge: `chal_${Date.now()}`, rp: { name: 'AMAL OS', id: 'amal.os' } },
          metadata: { timestamp, request_id: requestId, version },
        };
      }

      if (path === '/api/v1/auth/passkey/authenticate' && method === 'POST') {
        return {
          success: true,
          data: { verified: true, access_token: `token_${ctx.userId}`, expires_in: 3600 },
          metadata: { timestamp, request_id: requestId, version },
        };
      }

      // -----------------------------------------------------
      // 2. ONBOARDING API
      // -----------------------------------------------------
      if (path === '/api/v1/onboarding' && method === 'POST') {
        const { intent, life_stage, focus_areas, daily_available_minutes, notification_preference } = body;

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
        if (!src) {
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

      if (path.includes('/chain') && method === 'GET') {
        const chain: EvidenceChainNode[] = [
          { step: 1, node_type: 'USER_QUESTION', title: 'User Inquiry', explanation: 'How to remain consistent and handle routine friction' },
          { step: 2, node_type: 'ISLAMIC_CONCEPT', title: 'Niyyah & Sabr', explanation: 'Actions are grounded in sincere intention, accompanied by patient consistency.' },
          { step: 3, node_type: 'QURAN_AYAH', title: 'Surah al-Isra', reference: 'Quran 17:78', explanation: 'Dawn prayer is accompanied and witnessed by angels.' },
          { step: 4, node_type: 'TAFSIR', title: 'Tafsir Ibn Kathir', explanation: 'The angels of the day and night gather at Fajr recitation.' },
          { step: 5, node_type: 'SCHOLARLY_INTERPRETATION', title: 'Prophetic Ease (Yusr)', reference: 'Sahih al-Bukhari 39', explanation: 'Religion is ease; small habits are preserved without burnout.' },
          { step: 6, node_type: 'PRACTICAL_GUIDANCE', title: 'Amal Action', explanation: 'Evening wind-down 45 minutes prior to sleep.' },
        ];

        return {
          success: true,
          data: {
            evidence_id: path.split('/')[4] || 'ev_001',
            chain,
          },
          metadata: { timestamp, request_id: requestId, version },
        };
      }

      // -----------------------------------------------------
      // 5. ASK AMAL INTELLIGENCE ENDPOINT
      // -----------------------------------------------------
      if (path === '/api/v1/ai/ask' && method === 'POST') {
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
          confidence: 0.92,
          citations_verified: aiResult.response.citations_verified,
        };

        return {
          success: true,
          data: resp,
          metadata: { timestamp, request_id: requestId, version },
        };
      }

      // -----------------------------------------------------
      // 6. AMAL GENERATION & COMPLETION
      // -----------------------------------------------------
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
        const { completion_type, actual_duration_minutes } = body;

        return {
          success: true,
          data: {
            amal_id: amalId,
            status: completion_type || 'completed',
            actual_duration_minutes: actual_duration_minutes || 10,
            recorded_at: timestamp,
          },
          metadata: { timestamp, request_id: requestId, version },
        };
      }

      // -----------------------------------------------------
      // 7. JOURNEYS
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
      if (path === '/api/v1/reflections' && method === 'POST') {
        const { type, answers, went_well, felt_difficult } = body;
        const answerText = answers && answers.length > 0 ? answers[0].answer : went_well || 'Alhamdulillah';

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
        const scholars = Array.from(db.scholars.values());
        return { success: true, data: scholars, metadata: { timestamp, request_id: requestId, version } };
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
