import { Injectable } from '@nestjs/common';
import {
  CommunicationPreferences,
  ChannelConsent,
  FatigueMetrics,
  PrayerCalculationProfile,
  DailyPrayerSchedule,
  CommunicationDecisionResult,
  SendMessageResponse,
  DeliveryWebhookPayload,
  NotificationInteractionAction,
} from '@amal/types';
import {
  CommunicationOrchestrator,
  ConsentEngine,
  PrayerContextEngine,
  FatigueEngine,
  SuppressionEngine,
  GlobalKillSwitches,
  QsuraGateway,
  TemplateEngine,
} from '@amal/service-notifications';

@Injectable()
export class CommunicationsService {
  private orchestrator: CommunicationOrchestrator;
  private qsuraGateway: QsuraGateway;

  // In-memory repositories for preferences, consents, fatigue, and prayer profiles
  private preferencesMap: Map<string, CommunicationPreferences> = new Map();
  private consentsMap: Map<string, Map<string, ChannelConsent>> = new Map();
  private fatigueMap: Map<string, FatigueMetrics> = new Map();
  private prayerProfilesMap: Map<string, PrayerCalculationProfile> = new Map();
  private inAppNotifications: Map<string, Array<{ id: string; title: string; body: string; read: boolean; createdAt: string }>> = new Map();

  constructor() {
    this.qsuraGateway = new QsuraGateway();
    this.orchestrator = new CommunicationOrchestrator(this.qsuraGateway);
  }

  public getPreferences(userId: string): CommunicationPreferences {
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
    return this.preferencesMap.get(userId)!;
  }

  public updatePreferences(userId: string, update: Partial<CommunicationPreferences>): CommunicationPreferences {
    const current = this.getPreferences(userId);
    const updated: CommunicationPreferences = {
      ...current,
      ...update,
      userId,
      updatedAt: new Date().toISOString(),
    };
    this.preferencesMap.set(userId, updated);
    return updated;
  }

  public getConsents(userId: string): ChannelConsent[] {
    if (!this.consentsMap.has(userId)) {
      const defaultConsents = new Map<string, ChannelConsent>([
        ['PUSH', { userId, channel: 'PUSH', transactional: true, reminders: true, journeyUpdates: true, scholarUpdates: true, status: 'OPTED_IN', updatedAt: new Date().toISOString() }],
        ['WHATSAPP', { userId, channel: 'WHATSAPP', transactional: true, reminders: false, journeyUpdates: false, scholarUpdates: true, status: 'NOT_ASKED', updatedAt: new Date().toISOString() }],
        ['EMAIL', { userId, channel: 'EMAIL', transactional: true, reminders: false, journeyUpdates: false, scholarUpdates: true, status: 'OPTED_IN', updatedAt: new Date().toISOString() }],
        ['SMS', { userId, channel: 'SMS', transactional: true, reminders: false, journeyUpdates: false, scholarUpdates: false, status: 'NOT_ASKED', updatedAt: new Date().toISOString() }],
        ['VOICE', { userId, channel: 'VOICE', transactional: false, reminders: false, journeyUpdates: false, scholarUpdates: false, status: 'NOT_ASKED', updatedAt: new Date().toISOString() }],
      ]);
      this.consentsMap.set(userId, defaultConsents);
    }
    return Array.from(this.consentsMap.get(userId)!.values());
  }

  public setConsent(userId: string, consent: Partial<ChannelConsent> & { channel: any }): ChannelConsent {
    this.getConsents(userId); // ensure init
    const userMap = this.consentsMap.get(userId)!;
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

    const updated: ChannelConsent = {
      ...existing,
      ...consent,
      userId,
      updatedAt: new Date().toISOString(),
    };
    userMap.set(consent.channel, updated);
    return updated;
  }

  public getFatigueMetrics(userId: string): FatigueMetrics {
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
    return this.fatigueMap.get(userId)!;
  }

  public getPrayerProfile(userId: string): PrayerCalculationProfile {
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
    return this.prayerProfilesMap.get(userId)!;
  }

  public updatePrayerProfile(userId: string, update: Partial<PrayerCalculationProfile>): PrayerCalculationProfile {
    const current = this.getPrayerProfile(userId);
    const updated: PrayerCalculationProfile = {
      ...current,
      ...update,
      userId,
      updatedAt: new Date().toISOString(),
    };
    this.prayerProfilesMap.set(userId, updated);
    return updated;
  }

  public getTodayPrayerSchedule(userId: string): DailyPrayerSchedule {
    const profile = this.getPrayerProfile(userId);
    return PrayerContextEngine.calculateDailySchedule(profile);
  }

  public async orchestrateAndSend(payload: {
    userId: string;
    purpose: any;
    priority?: any;
    targetChannel?: any;
    templateSlug?: string;
    customTitle?: string;
    customBody?: string;
    variables?: Record<string, string>;
    lastActiveSessionMinutesAgo?: number;
    amalCompletedToday?: boolean;
    isDuplicate?: boolean;
    now?: Date;
  }): Promise<{ decision: CommunicationDecisionResult; dispatch?: SendMessageResponse }> {
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
      if (result.decision.channel === 'PUSH') fatigueMetrics.pushCount24h += 1;
      if (result.decision.channel === 'WHATSAPP') fatigueMetrics.whatsappCount24h += 1;
      fatigueMetrics.lastNotificationAt = new Date().toISOString();
      fatigueMetrics.fatigueScore = FatigueEngine.calculateFatigueScore(fatigueMetrics, preferences);
    }

    return result;
  }

  public recordInteraction(userId: string, action: NotificationInteractionAction): FatigueMetrics {
    const metrics = this.getFatigueMetrics(userId);
    const updated = FatigueEngine.recordInteraction(metrics, action);
    this.fatigueMap.set(userId, updated);
    return updated;
  }

  public async handleWebhook(payload: DeliveryWebhookPayload): Promise<{ acknowledged: boolean }> {
    return this.qsuraGateway.handleWebhook(payload);
  }
}
