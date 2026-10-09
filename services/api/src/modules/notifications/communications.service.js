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
exports.CommunicationsService = void 0;
const common_1 = require("@nestjs/common");
const service_notifications_1 = require("@amal/service-notifications");
let CommunicationsService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var CommunicationsService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            CommunicationsService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        orchestrator;
        qsuraGateway;
        // In-memory repositories for preferences, consents, fatigue, and prayer profiles
        preferencesMap = new Map();
        consentsMap = new Map();
        fatigueMap = new Map();
        prayerProfilesMap = new Map();
        inAppNotifications = new Map();
        constructor() {
            this.qsuraGateway = new service_notifications_1.QsuraGateway();
            this.orchestrator = new service_notifications_1.CommunicationOrchestrator(this.qsuraGateway);
        }
        getPreferences(userId) {
            if (!this.preferencesMap.has(userId)) {
                this.preferencesMap.set(userId, {
                    userId,
                    pressurePreference: 'GENTLE',
                    quietHoursEnabled: true,
                    quietHoursStart: '22:00:00',
                    quietHoursEnd: '07:00:00',
                    timezone: 'Europe/London',
                    maxDailyReminders: 3,
                    digestFrequency: 'NONE',
                    updatedAt: new Date().toISOString(),
                });
            }
            return this.preferencesMap.get(userId);
        }
        updatePreferences(userId, update) {
            const current = this.getPreferences(userId);
            const updated = {
                ...current,
                ...update,
                userId,
                updatedAt: new Date().toISOString(),
            };
            this.preferencesMap.set(userId, updated);
            return updated;
        }
        getConsents(userId) {
            if (!this.consentsMap.has(userId)) {
                const defaultConsents = new Map([
                    ['PUSH', { userId, channel: 'PUSH', transactional: true, reminders: true, journeyUpdates: true, scholarUpdates: true, status: 'OPTED_IN', updatedAt: new Date().toISOString() }],
                    ['WHATSAPP', { userId, channel: 'WHATSAPP', transactional: true, reminders: false, journeyUpdates: false, scholarUpdates: true, status: 'NOT_ASKED', updatedAt: new Date().toISOString() }],
                    ['EMAIL', { userId, channel: 'EMAIL', transactional: true, reminders: false, journeyUpdates: false, scholarUpdates: true, status: 'OPTED_IN', updatedAt: new Date().toISOString() }],
                    ['SMS', { userId, channel: 'SMS', transactional: true, reminders: false, journeyUpdates: false, scholarUpdates: false, status: 'NOT_ASKED', updatedAt: new Date().toISOString() }],
                    ['VOICE', { userId, channel: 'VOICE', transactional: false, reminders: false, journeyUpdates: false, scholarUpdates: false, status: 'NOT_ASKED', updatedAt: new Date().toISOString() }],
                ]);
                this.consentsMap.set(userId, defaultConsents);
            }
            return Array.from(this.consentsMap.get(userId).values());
        }
        setConsent(userId, consent) {
            this.getConsents(userId); // ensure init
            const userMap = this.consentsMap.get(userId);
            const existing = userMap.get(consent.channel) || {
                userId,
                channel: consent.channel,
                transactional: true,
                reminders: false,
                journeyUpdates: false,
                scholarUpdates: true,
                status: 'OPTED_IN',
                updatedAt: new Date().toISOString(),
            };
            const updated = {
                ...existing,
                ...consent,
                userId,
                updatedAt: new Date().toISOString(),
            };
            userMap.set(consent.channel, updated);
            return updated;
        }
        getFatigueMetrics(userId) {
            if (!this.fatigueMap.has(userId)) {
                this.fatigueMap.set(userId, {
                    userId,
                    pushCount24h: 0,
                    whatsappCount24h: 0,
                    smsCount24h: 0,
                    emailCount7d: 0,
                    dismissalRate: 0.0,
                    ignoreRate: 0.0,
                    fatigueScore: 0.0,
                    updatedAt: new Date().toISOString(),
                });
            }
            return this.fatigueMap.get(userId);
        }
        getPrayerProfile(userId) {
            if (!this.prayerProfilesMap.has(userId)) {
                this.prayerProfilesMap.set(userId, {
                    userId,
                    city: 'London',
                    country: 'United Kingdom',
                    timezone: 'Europe/London',
                    calculationMethod: 'MUSLIM_WORLD_LEAGUE',
                    juristicMethod: 'STANDARD',
                    fajrOffsetMinutes: 0,
                    dhuhrOffsetMinutes: 0,
                    asrOffsetMinutes: 0,
                    maghribOffsetMinutes: 0,
                    ishaOffsetMinutes: 0,
                    updatedAt: new Date().toISOString(),
                });
            }
            return this.prayerProfilesMap.get(userId);
        }
        updatePrayerProfile(userId, update) {
            const current = this.getPrayerProfile(userId);
            const updated = {
                ...current,
                ...update,
                userId,
                updatedAt: new Date().toISOString(),
            };
            this.prayerProfilesMap.set(userId, updated);
            return updated;
        }
        getTodayPrayerSchedule(userId) {
            const profile = this.getPrayerProfile(userId);
            return service_notifications_1.PrayerContextEngine.calculateDailySchedule(profile);
        }
        async orchestrateAndSend(payload) {
            const preferences = this.getPreferences(payload.userId);
            const consents = this.getConsents(payload.userId);
            const fatigueMetrics = this.getFatigueMetrics(payload.userId);
            const result = await this.orchestrator.orchestrate({
                userId: payload.userId,
                purpose: payload.purpose,
                priority: payload.priority,
                targetChannel: payload.targetChannel,
                templateSlug: payload.templateSlug,
                customTitle: payload.customTitle,
                customBody: payload.customBody,
                variables: payload.variables,
                userConsents: consents,
                preferences,
                fatigueMetrics,
                lastActiveSessionMinutesAgo: payload.lastActiveSessionMinutesAgo,
                amalCompletedToday: payload.amalCompletedToday,
                isDuplicate: payload.isDuplicate,
                now: payload.now,
            });
            // If sent successfully, track volume in fatigue
            if (result.dispatch && result.dispatch.status === 'SENT') {
                if (result.decision.channel === 'PUSH')
                    fatigueMetrics.pushCount24h += 1;
                if (result.decision.channel === 'WHATSAPP')
                    fatigueMetrics.whatsappCount24h += 1;
                fatigueMetrics.lastNotificationAt = new Date().toISOString();
                fatigueMetrics.fatigueScore = service_notifications_1.FatigueEngine.calculateFatigueScore(fatigueMetrics, preferences);
            }
            return result;
        }
        recordInteraction(userId, action) {
            const metrics = this.getFatigueMetrics(userId);
            const updated = service_notifications_1.FatigueEngine.recordInteraction(metrics, action);
            this.fatigueMap.set(userId, updated);
            return updated;
        }
        async handleWebhook(payload) {
            return this.qsuraGateway.handleWebhook(payload);
        }
    };
    return CommunicationsService = _classThis;
})();
exports.CommunicationsService = CommunicationsService;
//# sourceMappingURL=communications.service.js.map