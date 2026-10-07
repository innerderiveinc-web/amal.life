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
  AmalJourneyEngine,
  IntelligenceRuntimeV1,
  MemoryManager,
  ToolRegistry,
  ModelRouter,
} from '@amal/service-ai';
import { PrayerService } from './prayer-service.js';
import { CommunicationsService } from './modules/notifications/communications.service.js';
import { GovernanceService } from './modules/governance/governance.service.js';
import { PlatformService } from './modules/platform/platform.service.js';
import { KnowledgeOpsService } from './modules/knowledge-ops/knowledge-ops.service.js';
import { BillingService } from './modules/billing/billing.service.js';

const commsService = new CommunicationsService();
const govService = new GovernanceService();
const platformService = new PlatformService();
const knowledgeOpsService = new KnowledgeOpsService();
const billingService = new BillingService();

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

      if (path === '/api/v1/ai/ask/stream' && method === 'POST') {
        const { message } = body;
        return {
          success: true,
          data: {
            stream_id: `stream_${Date.now()}`,
            chunks: [
              { sequence: 1, type: 'INTENT_CLASSIFIED', content: 'Grounded Islamic Inquiry' },
              { sequence: 2, type: 'EVIDENCE_RETRIEVED', content: 'Quran 17:78, Sahih Muslim 657' },
              { sequence: 3, type: 'AMAL_PROPOSED', content: '10-Minute Evening Wind-Down' },
            ],
            status: 'STREAM_COMPLETED',
          },
          metadata: { timestamp, request_id: requestId, version },
        };
      }

      if (path.startsWith('/api/v1/ai/responses/') && path.endsWith('/evidence') && method === 'GET') {
        const responseId = path.split('/')[5];
        return {
          success: true,
          data: {
            response_id: responseId,
            evidence: [
              { source_type: 'QURAN', reference: '17:78', verification_status: 'APPROVED' },
              { source_type: 'HADITH', reference: 'Sahih Muslim 657', verification_status: 'APPROVED' },
            ],
            scholarly_positions: ['Consensus of scholars on preserving consistency over exhaustion.'],
          },
          metadata: { timestamp, request_id: requestId, version },
        };
      }

      if (path.startsWith('/api/v1/ai/responses/') && path.endsWith('/audit') && method === 'GET') {
        const responseId = path.split('/')[5];
        return {
          success: true,
          data: {
            response_id: responseId,
            trace_id: `trace_${responseId}`,
            citations_verified: true,
            claims_audited_count: 2,
            unsupported_claims_count: 0,
            privacy_isolation_passed: true,
            final_status: 'APPROVED',
          },
          metadata: { timestamp, request_id: requestId, version },
        };
      }

      if (path.startsWith('/api/v1/ai/responses/') && path.endsWith('/feedback') && method === 'POST') {
        const responseId = path.split('/')[5];
        const { helpful, citation_accuracy_feedback } = body;
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

      // -----------------------------------------------------
      // 6. GOALS & AMAL ENGINE (Multi-factor Ranking & Baselines)
      // -----------------------------------------------------
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

      if (path.startsWith('/api/v1/knowledge/sources/') && method === 'GET') {
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
