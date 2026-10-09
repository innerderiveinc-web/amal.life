"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecutionPackService = void 0;
const common_1 = require("@nestjs/common");
let ExecutionPackService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ExecutionPackService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ExecutionPackService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        modules = [
            // P0 Modules (Core Faith & Trust Platform)
            { id: 'mod_01', moduleCode: 'MOD_01_WORKSPACE', moduleName: 'Workspace & Monorepo Tooling', packagePath: '/', sprintNumber: 1, priority: 'P0', status: 'VERIFIED', fileCount: 8, testCount: 4, leadSquad: 'SQUAD_C_PLATFORM', dependencies: [] },
            { id: 'mod_02', moduleCode: 'MOD_02_TYPES', moduleName: 'Shared Domain Types', packagePath: 'packages/types', sprintNumber: 1, priority: 'P0', status: 'VERIFIED', fileCount: 16, testCount: 8, leadSquad: 'SQUAD_C_PLATFORM', dependencies: [] },
            { id: 'mod_03', moduleCode: 'MOD_03_CONFIG', moduleName: 'Runtime Configuration & Secrets', packagePath: 'packages/config', sprintNumber: 1, priority: 'P0', status: 'VERIFIED', fileCount: 6, testCount: 4, leadSquad: 'SQUAD_C_PLATFORM', dependencies: ['MOD_02_TYPES'] },
            { id: 'mod_04', moduleCode: 'MOD_04_DATABASE', moduleName: 'Database Repositories & Migrations', packagePath: 'packages/database', sprintNumber: 1, priority: 'P0', status: 'VERIFIED', fileCount: 18, testCount: 12, leadSquad: 'SQUAD_C_PLATFORM', dependencies: ['MOD_02_TYPES', 'MOD_03_CONFIG'] },
            { id: 'mod_05', moduleCode: 'MOD_05_AUTH', moduleName: 'Authentication & Session Guards', packagePath: 'packages/auth', sprintNumber: 1, priority: 'P0', status: 'VERIFIED', fileCount: 10, testCount: 8, leadSquad: 'SQUAD_C_PLATFORM', dependencies: ['MOD_02_TYPES', 'MOD_04_DATABASE'] },
            { id: 'mod_06', moduleCode: 'MOD_06_POLICY', moduleName: 'Policy Decision Point (PDP)', packagePath: 'packages/policy', sprintNumber: 2, priority: 'P0', status: 'VERIFIED', fileCount: 12, testCount: 10, leadSquad: 'SQUAD_C_PLATFORM', dependencies: ['MOD_02_TYPES'] },
            { id: 'mod_07', moduleCode: 'MOD_07_CONSENT', moduleName: 'Consent Tracking & Proof Hashes', packagePath: 'packages/consent', sprintNumber: 2, priority: 'P0', status: 'VERIFIED', fileCount: 6, testCount: 6, leadSquad: 'SQUAD_C_PLATFORM', dependencies: ['MOD_06_POLICY'] },
            { id: 'mod_08', moduleCode: 'MOD_08_PRIVACY', moduleName: 'Privacy Vault & Context Firewall', packagePath: 'packages/privacy', sprintNumber: 2, priority: 'P0', status: 'VERIFIED', fileCount: 10, testCount: 8, leadSquad: 'SQUAD_C_PLATFORM', dependencies: ['MOD_06_POLICY', 'MOD_07_CONSENT'] },
            { id: 'mod_09', moduleCode: 'MOD_09_GOALS', moduleName: 'Goals & Baseline Service', packagePath: 'services/api/src/modules/goals', sprintNumber: 2, priority: 'P0', status: 'VERIFIED', fileCount: 6, testCount: 6, leadSquad: 'SQUAD_A_CORE_PRODUCT', dependencies: ['MOD_04_DATABASE', 'MOD_06_POLICY'] },
            { id: 'mod_10', moduleCode: 'MOD_10_CONTEXT', moduleName: 'Personal Context Intelligence', packagePath: 'services/api/src/modules/context', sprintNumber: 2, priority: 'P0', status: 'VERIFIED', fileCount: 8, testCount: 6, leadSquad: 'SQUAD_A_CORE_PRODUCT', dependencies: ['MOD_08_PRIVACY'] },
            { id: 'mod_11', moduleCode: 'MOD_11_LIFE_SITUATIONS', moduleName: 'Life Situation Classification', packagePath: 'services/api/src/modules/life-situations', sprintNumber: 2, priority: 'P0', status: 'VERIFIED', fileCount: 5, testCount: 4, leadSquad: 'SQUAD_A_CORE_PRODUCT', dependencies: ['MOD_10_CONTEXT'] },
            { id: 'mod_12', moduleCode: 'MOD_12_JOURNEYS', moduleName: 'Journey State Machine & Engine', packagePath: 'packages/journey-engine', sprintNumber: 3, priority: 'P0', status: 'VERIFIED', fileCount: 10, testCount: 10, leadSquad: 'SQUAD_A_CORE_PRODUCT', dependencies: ['MOD_09_GOALS'] },
            { id: 'mod_13', moduleCode: 'MOD_13_AMAL_ENGINE', moduleName: 'Feasibility Scoring & Ranking', packagePath: 'packages/amal-engine', sprintNumber: 3, priority: 'P0', status: 'VERIFIED', fileCount: 12, testCount: 12, leadSquad: 'SQUAD_A_CORE_PRODUCT', dependencies: ['MOD_12_JOURNEYS'] },
            { id: 'mod_14', moduleCode: 'MOD_14_TODAY', moduleName: 'Today OS Daily Planner API', packagePath: 'services/api/src/modules/today', sprintNumber: 3, priority: 'P0', status: 'VERIFIED', fileCount: 6, testCount: 8, leadSquad: 'SQUAD_A_CORE_PRODUCT', dependencies: ['MOD_13_AMAL_ENGINE'] },
            { id: 'mod_15', moduleCode: 'MOD_15_REFLECTION', moduleName: 'Non-Moral Muhasabah Reflection', packagePath: 'packages/reflection-engine', sprintNumber: 4, priority: 'P0', status: 'VERIFIED', fileCount: 8, testCount: 8, leadSquad: 'SQUAD_A_CORE_PRODUCT', dependencies: ['MOD_08_PRIVACY'] },
            { id: 'mod_16', moduleCode: 'MOD_16_EVIDENCE', moduleName: 'Islamic Evidence Graph Package', packagePath: 'packages/evidence', sprintNumber: 5, priority: 'P0', status: 'VERIFIED', fileCount: 10, testCount: 10, leadSquad: 'SQUAD_B_AI_KNOWLEDGE', dependencies: ['MOD_04_DATABASE'] },
            { id: 'mod_17', moduleCode: 'MOD_17_QURAN', moduleName: 'Medina Quran Canonical Service', packagePath: 'services/api/src/modules/quran', sprintNumber: 5, priority: 'P0', status: 'VERIFIED', fileCount: 6, testCount: 6, leadSquad: 'SQUAD_B_AI_KNOWLEDGE', dependencies: ['MOD_16_EVIDENCE'] },
            { id: 'mod_18', moduleCode: 'MOD_18_HADITH', moduleName: 'Hadith Entries & Gradings Service', packagePath: 'services/api/src/modules/hadith', sprintNumber: 5, priority: 'P0', status: 'VERIFIED', fileCount: 6, testCount: 6, leadSquad: 'SQUAD_B_AI_KNOWLEDGE', dependencies: ['MOD_16_EVIDENCE'] },
            { id: 'mod_19', moduleCode: 'MOD_19_TAFSIR', moduleName: 'Tafsir Works & Passages Service', packagePath: 'services/api/src/modules/tafsir', sprintNumber: 5, priority: 'P0', status: 'VERIFIED', fileCount: 5, testCount: 4, leadSquad: 'SQUAD_B_AI_KNOWLEDGE', dependencies: ['MOD_17_QURAN'] },
            { id: 'mod_20', moduleCode: 'MOD_20_FIQH', moduleName: 'Fiqh Issues & Plurality Service', packagePath: 'services/api/src/modules/fiqh', sprintNumber: 5, priority: 'P0', status: 'VERIFIED', fileCount: 6, testCount: 6, leadSquad: 'SQUAD_B_AI_KNOWLEDGE', dependencies: ['MOD_16_EVIDENCE'] },
            { id: 'mod_21', moduleCode: 'MOD_21_RETRIEVAL', moduleName: 'Hybrid Search & Retrieval Engine', packagePath: 'services/retrieval', sprintNumber: 5, priority: 'P0', status: 'VERIFIED', fileCount: 10, testCount: 8, leadSquad: 'SQUAD_B_AI_KNOWLEDGE', dependencies: ['MOD_16_EVIDENCE'] },
            { id: 'mod_22', moduleCode: 'MOD_22_INGESTION', moduleName: '11-Step Content Ingestion Pipeline', packagePath: 'services/content-ingestion', sprintNumber: 5, priority: 'P0', status: 'VERIFIED', fileCount: 14, testCount: 10, leadSquad: 'SQUAD_B_AI_KNOWLEDGE', dependencies: ['MOD_16_EVIDENCE'] },
            { id: 'mod_23', moduleCode: 'MOD_23_AI_RUNTIME', moduleName: '13-Stage AI Master Orchestrator', packagePath: 'services/ai', sprintNumber: 6, priority: 'P0', status: 'VERIFIED', fileCount: 22, testCount: 16, leadSquad: 'SQUAD_B_AI_KNOWLEDGE', dependencies: ['MOD_06_POLICY', 'MOD_21_RETRIEVAL'] },
            { id: 'mod_24', moduleCode: 'MOD_24_MODEL_GATEWAY', moduleName: 'Model Router & Cost Controller', packagePath: 'packages/ai-runtime', sprintNumber: 6, priority: 'P0', status: 'VERIFIED', fileCount: 8, testCount: 6, leadSquad: 'SQUAD_B_AI_KNOWLEDGE', dependencies: [] },
            { id: 'mod_25', moduleCode: 'MOD_25_SAFETY', moduleName: 'Fatwa Safety Firewall (Classes A-E)', packagePath: 'packages/safety', sprintNumber: 6, priority: 'P0', status: 'VERIFIED', fileCount: 10, testCount: 10, leadSquad: 'SQUAD_B_AI_KNOWLEDGE', dependencies: ['MOD_06_POLICY'] },
            { id: 'mod_26', moduleCode: 'MOD_26_CITATION', moduleName: 'Zero-Fabrication Citation Auditor', packagePath: 'packages/evidence', sprintNumber: 6, priority: 'P0', status: 'VERIFIED', fileCount: 6, testCount: 8, leadSquad: 'SQUAD_B_AI_KNOWLEDGE', dependencies: ['MOD_16_EVIDENCE'] },
            { id: 'mod_27', moduleCode: 'MOD_27_SCHOLAR', moduleName: 'Scholar Desk & 2-Person Triage', packagePath: 'packages/scholar', sprintNumber: 7, priority: 'P0', status: 'VERIFIED', fileCount: 10, testCount: 8, leadSquad: 'SQUAD_B_AI_KNOWLEDGE', dependencies: ['MOD_25_SAFETY'] },
            // P1 Modules (Ecosystem, Experience, Operations)
            { id: 'mod_28', moduleCode: 'MOD_28_FAMILY', moduleName: 'Family Hub & Adult Isolation Vault', packagePath: 'packages/family', sprintNumber: 7, priority: 'P1', status: 'VERIFIED', fileCount: 8, testCount: 8, leadSquad: 'SQUAD_A_CORE_PRODUCT', dependencies: ['MOD_08_PRIVACY'] },
            { id: 'mod_29', moduleCode: 'MOD_29_COMMUNICATION', moduleName: 'Adaptive Notification Engine', packagePath: 'services/notifications', sprintNumber: 8, priority: 'P1', status: 'VERIFIED', fileCount: 14, testCount: 12, leadSquad: 'SQUAD_D_EXPERIENCE', dependencies: ['MOD_07_CONSENT'] },
            { id: 'mod_30', moduleCode: 'MOD_30_BILLING', moduleName: 'Ethical Billing & Entitlement Engine', packagePath: 'services/api/src/modules/billing', sprintNumber: 8, priority: 'P1', status: 'VERIFIED', fileCount: 12, testCount: 10, leadSquad: 'SQUAD_A_CORE_PRODUCT', dependencies: ['MOD_06_POLICY'] },
            { id: 'mod_31', moduleCode: 'MOD_31_ADMIN', moduleName: 'Four-Eyes Admin Management App', packagePath: 'apps/admin', sprintNumber: 9, priority: 'P1', status: 'VERIFIED', fileCount: 10, testCount: 6, leadSquad: 'SQUAD_C_PLATFORM', dependencies: ['MOD_06_POLICY'] },
            { id: 'mod_32', moduleCode: 'MOD_32_WEB', moduleName: 'Next.js Desktop Web Application', packagePath: 'apps/web', sprintNumber: 3, priority: 'P1', status: 'VERIFIED', fileCount: 20, testCount: 8, leadSquad: 'SQUAD_D_EXPERIENCE', dependencies: ['MOD_14_TODAY'] },
            { id: 'mod_33', moduleCode: 'MOD_33_MOBILE', moduleName: 'Expo Mobile Client (24 screens)', packagePath: 'apps/mobile', sprintNumber: 3, priority: 'P1', status: 'VERIFIED', fileCount: 30, testCount: 14, leadSquad: 'SQUAD_D_EXPERIENCE', dependencies: ['MOD_14_TODAY'] },
            { id: 'mod_34', moduleCode: 'MOD_34_UI_TOKENS', moduleName: 'Calm Forest Emerald Design System', packagePath: 'packages/ui', sprintNumber: 3, priority: 'P1', status: 'VERIFIED', fileCount: 16, testCount: 6, leadSquad: 'SQUAD_D_EXPERIENCE', dependencies: [] },
            { id: 'mod_35', moduleCode: 'MOD_35_EVENTS', moduleName: 'Transactional Outbox & Event Bus', packagePath: 'packages/events', sprintNumber: 1, priority: 'P1', status: 'VERIFIED', fileCount: 8, testCount: 8, leadSquad: 'SQUAD_C_PLATFORM', dependencies: ['MOD_04_DATABASE'] },
            { id: 'mod_36', moduleCode: 'MOD_36_AUDIT', moduleName: 'Tamper-Evident SHA-256 Audit Log', packagePath: 'packages/audit', sprintNumber: 2, priority: 'P1', status: 'VERIFIED', fileCount: 6, testCount: 6, leadSquad: 'SQUAD_C_PLATFORM', dependencies: ['MOD_04_DATABASE'] },
            { id: 'mod_37', moduleCode: 'MOD_37_ANALYTICS', moduleName: 'Privacy-Preserving Product Analytics', packagePath: 'packages/analytics', sprintNumber: 8, priority: 'P1', status: 'VERIFIED', fileCount: 6, testCount: 4, leadSquad: 'SQUAD_C_PLATFORM', dependencies: ['MOD_08_PRIVACY'] },
            { id: 'mod_38', moduleCode: 'MOD_38_PERSONALIZATION', moduleName: 'Deterministic Preference Weighting', packagePath: 'packages/personalization', sprintNumber: 4, priority: 'P1', status: 'VERIFIED', fileCount: 8, testCount: 8, leadSquad: 'SQUAD_A_CORE_PRODUCT', dependencies: ['MOD_10_CONTEXT'] },
            { id: 'mod_39', moduleCode: 'MOD_39_PRAYER', moduleName: 'Multi-Method Astronomical Twilight', packagePath: 'services/api/src/modules/prayers', sprintNumber: 8, priority: 'P1', status: 'VERIFIED', fileCount: 6, testCount: 8, leadSquad: 'SQUAD_D_EXPERIENCE', dependencies: [] },
            { id: 'mod_40', moduleCode: 'MOD_40_SEED_DATA', moduleName: 'Synthetic Demo Data & Golden Fixtures', packagePath: 'knowledge/seed', sprintNumber: 1, priority: 'P1', status: 'VERIFIED', fileCount: 12, testCount: 4, leadSquad: 'SQUAD_B_AI_KNOWLEDGE', dependencies: [] },
            { id: 'mod_41', moduleCode: 'MOD_41_BENCHMARKS', moduleName: 'Gold Benchmarks (Citations, Safety)', packagePath: 'benchmarks', sprintNumber: 10, priority: 'P1', status: 'VERIFIED', fileCount: 12, testCount: 12, leadSquad: 'SQUAD_B_AI_KNOWLEDGE', dependencies: ['MOD_23_AI_RUNTIME'] },
            { id: 'mod_42', moduleCode: 'MOD_42_E2E_TESTS', moduleName: 'Playwright & Python E2E Suites', packagePath: 'tests/e2e', sprintNumber: 10, priority: 'P1', status: 'VERIFIED', fileCount: 14, testCount: 14, leadSquad: 'SQUAD_C_PLATFORM', dependencies: [] },
            { id: 'mod_43', moduleCode: 'MOD_43_SECURITY_TESTS', moduleName: 'OWASP MASVS & Injection Defenses', packagePath: 'tests/security', sprintNumber: 10, priority: 'P1', status: 'VERIFIED', fileCount: 10, testCount: 10, leadSquad: 'SQUAD_C_PLATFORM', dependencies: [] },
            { id: 'mod_44', moduleCode: 'MOD_44_PRIVACY_TESTS', moduleName: 'GDPR & Adult Reflection Barrier Tests', packagePath: 'tests/privacy', sprintNumber: 10, priority: 'P1', status: 'VERIFIED', fileCount: 8, testCount: 8, leadSquad: 'SQUAD_C_PLATFORM', dependencies: [] },
            { id: 'mod_45', moduleCode: 'MOD_45_AI_TESTS', moduleName: 'Red-Team Adversarial & Plurality Tests', packagePath: 'tests/ai', sprintNumber: 10, priority: 'P1', status: 'VERIFIED', fileCount: 10, testCount: 10, leadSquad: 'SQUAD_B_AI_KNOWLEDGE', dependencies: [] },
            { id: 'mod_46', moduleCode: 'MOD_46_COMMS_TESTS', moduleName: 'Fatigue & Quiet Hours Suppression Tests', packagePath: 'tests/communication', sprintNumber: 10, priority: 'P1', status: 'VERIFIED', fileCount: 8, testCount: 8, leadSquad: 'SQUAD_D_EXPERIENCE', dependencies: [] },
            { id: 'mod_47', moduleCode: 'MOD_47_BILLING_TESTS', moduleName: 'Double-Entry Ledger & Paywall Tests', packagePath: 'tests/billing', sprintNumber: 10, priority: 'P1', status: 'VERIFIED', fileCount: 8, testCount: 8, leadSquad: 'SQUAD_A_CORE_PRODUCT', dependencies: [] },
            { id: 'mod_48', moduleCode: 'MOD_48_INFRASTRUCTURE', moduleName: 'Terraform, K8s & Docker Stack', packagePath: 'infrastructure', sprintNumber: 9, priority: 'P1', status: 'VERIFIED', fileCount: 24, testCount: 8, leadSquad: 'SQUAD_C_PLATFORM', dependencies: [] },
            { id: 'mod_49', moduleCode: 'MOD_49_CI_CD', moduleName: 'GitHub Actions Release Pipeline', packagePath: '.github/workflows', sprintNumber: 9, priority: 'P1', status: 'VERIFIED', fileCount: 6, testCount: 4, leadSquad: 'SQUAD_C_PLATFORM', dependencies: [] },
            { id: 'mod_50', moduleCode: 'MOD_50_DEPLOYMENT', moduleName: 'Progressive Canary & Disaster Recovery', packagePath: 'docs/runbooks', sprintNumber: 9, priority: 'P1', status: 'VERIFIED', fileCount: 16, testCount: 8, leadSquad: 'SQUAD_C_PLATFORM', dependencies: [] },
            { id: 'mod_53', moduleCode: 'MOD_53_OBSERVABILITY', moduleName: 'OpenTelemetry & Reliability Dashboards', packagePath: 'infrastructure/monitoring', sprintNumber: 9, priority: 'P1', status: 'VERIFIED', fileCount: 10, testCount: 4, leadSquad: 'SQUAD_C_PLATFORM', dependencies: [] },
            { id: 'mod_54', moduleCode: 'MOD_54_INCIDENTS', moduleName: 'Automated Incident Response & Breakers', packagePath: 'services/api/src/modules/incidents', sprintNumber: 9, priority: 'P1', status: 'VERIFIED', fileCount: 6, testCount: 6, leadSquad: 'SQUAD_C_PLATFORM', dependencies: [] },
            { id: 'mod_55', moduleCode: 'MOD_55_FEATURE_FLAGS', moduleName: 'Environment-Aware Feature Flags', packagePath: 'packages/config', sprintNumber: 1, priority: 'P1', status: 'VERIFIED', fileCount: 4, testCount: 4, leadSquad: 'SQUAD_C_PLATFORM', dependencies: [] },
        ];
        cujs = [
            {
                cujId: 'CUJ_01_ONBOARDING_CORE_LOOP',
                title: 'Flawless Signup to Reflection Loop',
                category: 'CORE_PRODUCT',
                sequenceSteps: ['Signup', 'Onboarding', 'Restart Quran', 'Journey', 'Today', '5-min Amal', 'Complete Minimum', 'Reflection', 'Return Tomorrow'],
                verificationStatus: 'VERIFIED',
                acceptanceCriteria: 'User can state intent, select 1 primary amal, complete minimum, and reflect privately with zero spiritual shame.',
            },
            {
                cujId: 'CUJ_02_GROUNDED_QUESTION_ANSWER',
                title: 'Grounded Question Answering (Patience)',
                category: 'AI_KNOWLEDGE',
                sequenceSteps: ['Ask patience inquiry', 'Intent classified', 'Evidence retrieved', 'Answer generated', 'Citation audited', 'Source verified'],
                verificationStatus: 'VERIFIED',
                acceptanceCriteria: 'Answer grounded strictly in authentic Medina Quran/Bukhari with epistemic separation and zero hallucinations.',
            },
            {
                cujId: 'CUJ_03_PERSONALIZED_FIQH_ESCALATION',
                title: 'Personalized Fiqh Safety Escalation',
                category: 'SAFETY_SCHOLAR',
                sequenceSteps: ['Ask complex fiqh', 'Safety Class D triggered', 'Evidence surfaced', 'Ikhtilaf plurality preserved', 'Scholar consent modal', 'Scholar case created'],
                verificationStatus: 'VERIFIED',
                acceptanceCriteria: 'AI strictly refuses autonomous fatwa and prepares structured case for two verified human jurists.',
            },
            {
                cujId: 'CUJ_04_FRICTION_ADAPTATION',
                title: 'Repeated Friction & Paced Adaptation',
                category: 'AMAL_JOURNEY',
                sequenceSteps: ['3 consecutive misses', 'Time friction detected', 'Adaptation proposed (15m to 5m)', 'User preview & approval', 'New sustainable plan'],
                verificationStatus: 'VERIFIED',
                acceptanceCriteria: 'System reduces burden without guilt scoring, broken streak penalties, or shame notifications.',
            },
            {
                cujId: 'CUJ_05_FAMILY_REFLECTION_ISOLATION',
                title: 'Family Challenge with Reflection Vault',
                category: 'PRIVACY_FAMILY',
                sequenceSteps: ['Family invite', 'Join household', 'Shared Quran challenge', 'Member completes amal', 'Adult reflection remains cryptographically isolated'],
                verificationStatus: 'VERIFIED',
                acceptanceCriteria: 'Household leader sees aggregate progress; adult member private reflections return DENY.',
            },
            {
                cujId: 'CUJ_06_ETHICAL_BILLING_UPGRADE',
                title: 'Plus Checkout & Core Faith Retention',
                category: 'BILLING_COMMERCE',
                sequenceSteps: ['Plus checkout', 'Payment intent', 'Webhook verified', 'Subscription active', 'Entitlement unlocked', 'Cancel preserves core Quran/prayers'],
                verificationStatus: 'VERIFIED',
                acceptanceCriteria: 'Core faith essentials remain unconditionally free; premium upgrades gate only advanced features.',
            },
            {
                cujId: 'CUJ_07_FATIGUE_THROTTLED_NOTIFICATION',
                title: 'Prayer Context & Fatigue Throttling',
                category: 'COMMUNICATIONS',
                sequenceSteps: ['Push reminder candidate', 'Consent verified', 'Fatigue checked (<0.5 dismissal)', 'Quiet hours checked', 'Send calm push', 'Delivery ack'],
                verificationStatus: 'VERIFIED',
                acceptanceCriteria: 'Silence treated as first-class feature; repeated dismissals reduce frequency and never escalate.',
            },
            {
                cujId: 'CUJ_08_REJECTED_INSIGHT_FORGETTING',
                title: 'User Insight Rejection & Memory Isolation',
                category: 'PRIVACY_AI',
                sequenceSteps: ['Private reflection saved', 'AI proposes insight candidate', 'User taps Reject', 'Candidate marked REJECTED', 'Never durably personalized'],
                verificationStatus: 'VERIFIED',
                acceptanceCriteria: 'Unconfirmed or rejected AI inferences never pollute the durable personalization graph.',
            },
            {
                cujId: 'CUJ_09_NOTIFICATION_REVOCATION_CASCADE',
                title: 'Consent Revocation & Job Cascade',
                category: 'DATA_RIGHTS',
                sequenceSteps: ['User revokes push consent', 'Consent status REVOKED', 'Proof hash recorded', 'All pending BullMQ notification jobs cancelled', 'Future send blocked'],
                verificationStatus: 'VERIFIED',
                acceptanceCriteria: 'Instant cancellation of all outbound queues upon permission withdrawal.',
            },
            {
                cujId: 'CUJ_10_GDPR_ACCOUNT_ERASURE',
                title: 'Full Right-to-be-Forgotten Account Erasure',
                category: 'DATA_RIGHTS',
                sequenceSteps: ['Account deletion requested', 'Identity verified', 'Dependency cascade analyzed', 'User, profile, reflections erased', 'Audit proof retained'],
                verificationStatus: 'VERIFIED',
                acceptanceCriteria: 'Complete cryptographic and physical wipe of personal data within statutory compliance.',
            },
        ];
        sprints = [
            { sprintNumber: 1, sprintName: 'Sprint 1: Foundation, Workspace & Database', releaseMilestone: 'V0.1', sprintGoal: 'Establish monorepo, database migrations, auth and session models.', targetModuleCodes: ['MOD_01_WORKSPACE', 'MOD_02_TYPES', 'MOD_03_CONFIG', 'MOD_04_DATABASE', 'MOD_05_AUTH', 'MOD_35_EVENTS', 'MOD_55_FEATURE_FLAGS'], qualityBudgetPercent: 25, status: 'COMPLETED' },
            { sprintNumber: 2, sprintName: 'Sprint 2: Policy PDP, Privacy & Goals', releaseMilestone: 'V0.1', sprintGoal: 'Implement policy engine, consent tracking, privacy vault and goal baselines.', targetModuleCodes: ['MOD_06_POLICY', 'MOD_07_CONSENT', 'MOD_08_PRIVACY', 'MOD_09_GOALS', 'MOD_10_CONTEXT', 'MOD_11_LIFE_SITUATIONS', 'MOD_36_AUDIT'], qualityBudgetPercent: 25, status: 'COMPLETED' },
            { sprintNumber: 3, sprintName: 'Sprint 3: Core Amal Loop & Today OS', releaseMilestone: 'V0.1', sprintGoal: 'Deliver deterministic journey state machine, feasibility scoring, and canonical Today API.', targetModuleCodes: ['MOD_12_JOURNEYS', 'MOD_13_AMAL_ENGINE', 'MOD_14_TODAY', 'MOD_32_WEB', 'MOD_33_MOBILE', 'MOD_34_UI_TOKENS'], qualityBudgetPercent: 20, status: 'COMPLETED' },
            { sprintNumber: 4, sprintName: 'Sprint 4: Reflection, Muhasabah & Adaptation', releaseMilestone: 'V0.1', sprintGoal: 'Implement shame-free reflection, friction extraction, and journey adaptation.', targetModuleCodes: ['MOD_15_REFLECTION', 'MOD_38_PERSONALIZATION'], qualityBudgetPercent: 25, status: 'COMPLETED' },
            { sprintNumber: 5, sprintName: 'Sprint 5: Islamic Evidence Graph & Retrieval', releaseMilestone: 'V0.5', sprintGoal: 'Publish Medina Mushaf immutable corpus, Hadith gradings, and hybrid vector/graph retrieval.', targetModuleCodes: ['MOD_16_EVIDENCE', 'MOD_17_QURAN', 'MOD_18_HADITH', 'MOD_19_TAFSIR', 'MOD_20_FIQH', 'MOD_21_RETRIEVAL', 'MOD_22_INGESTION'], qualityBudgetPercent: 20, status: 'COMPLETED' },
            { sprintNumber: 6, sprintName: 'Sprint 6: Governed AI Runtime & Safety Firewall', releaseMilestone: 'V0.5', sprintGoal: 'Deliver 13-stage orchestrator, 5-tier fatwa firewall, and zero-fabrication citation auditor.', targetModuleCodes: ['MOD_23_AI_RUNTIME', 'MOD_24_MODEL_GATEWAY', 'MOD_25_SAFETY', 'MOD_26_CITATION'], qualityBudgetPercent: 25, status: 'COMPLETED' },
            { sprintNumber: 7, sprintName: 'Sprint 7: Pastoral Scholar Desk & Family Hub', releaseMilestone: 'V0.8', sprintGoal: 'Enable resident scholar review desk and family challenges with strict adult reflection isolation.', targetModuleCodes: ['MOD_27_SCHOLAR', 'MOD_28_FAMILY'], qualityBudgetPercent: 25, status: 'COMPLETED' },
            { sprintNumber: 8, sprintName: 'Sprint 8: Adaptive Communications & Ethical Billing', releaseMilestone: 'V1.0', sprintGoal: 'Deploy prayer twilight engine, fatigue throttling, Plus subscriptions and double-entry ledger.', targetModuleCodes: ['MOD_29_COMMUNICATION', 'MOD_30_BILLING', 'MOD_37_ANALYTICS', 'MOD_39_PRAYER'], qualityBudgetPercent: 20, status: 'COMPLETED' },
            { sprintNumber: 9, sprintName: 'Sprint 9: Production Platform, SRE & Runbooks', releaseMilestone: 'V1.0', sprintGoal: 'Implement multi-AZ K8s, automated canary progression, OpenTelemetry, and disaster recovery.', targetModuleCodes: ['MOD_31_ADMIN', 'MOD_48_INFRASTRUCTURE', 'MOD_49_CI_CD', 'MOD_50_DEPLOYMENT', 'MOD_53_OBSERVABILITY', 'MOD_54_INCIDENTS'], qualityBudgetPercent: 30, status: 'COMPLETED' },
            { sprintNumber: 10, sprintName: 'Sprint 10: Master Verification, Benchmarks & Launch', releaseMilestone: 'V1.0', sprintGoal: 'Verify all 10 CUJs, living citation benchmarks, red-team attacks, and release-blocking gates.', targetModuleCodes: ['MOD_41_BENCHMARKS', 'MOD_42_E2E_TESTS', 'MOD_43_SECURITY_TESTS', 'MOD_44_PRIVACY_TESTS', 'MOD_45_AI_TESTS', 'MOD_46_COMMS_TESTS', 'MOD_47_BILLING_TESTS'], qualityBudgetPercent: 35, status: 'COMPLETED' },
        ];
        getModules() {
            return this.modules;
        }
        getModule(code) {
            return this.modules.find((m) => m.moduleCode === code);
        }
        getCriticalUserJourneys() {
            return this.cujs;
        }
        getCriticalUserJourney(cujId) {
            return this.cujs.find((c) => c.cujId === cujId);
        }
        getSprintPlans() {
            return this.sprints;
        }
        getReadinessReport() {
            const p0Modules = this.modules.filter((m) => m.priority === 'P0');
            const verifiedModules = this.modules.filter((m) => m.status === 'VERIFIED');
            const verifiedCujs = this.cujs.filter((c) => c.verificationStatus === 'VERIFIED');
            return {
                totalModules: this.modules.length,
                p0ModulesCount: p0Modules.length,
                verifiedModulesCount: verifiedModules.length,
                cujsCount: this.cujs.length,
                cujsVerifiedCount: verifiedCujs.length,
                overallReady: verifiedModules.length === this.modules.length && verifiedCujs.length === this.cujs.length,
                generatedAt: new Date().toISOString(),
            };
        }
    };
    return ExecutionPackService = _classThis;
})();
exports.ExecutionPackService = ExecutionPackService;
//# sourceMappingURL=execution-pack.service.js.map