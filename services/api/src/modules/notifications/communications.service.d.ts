import { CommunicationPreferences, ChannelConsent, FatigueMetrics, PrayerCalculationProfile, DailyPrayerSchedule, CommunicationDecisionResult, SendMessageResponse, DeliveryWebhookPayload, NotificationInteractionAction } from '@amal/types';
export declare class CommunicationsService {
    private orchestrator;
    private qsuraGateway;
    private preferencesMap;
    private consentsMap;
    private fatigueMap;
    private prayerProfilesMap;
    private inAppNotifications;
    constructor();
    getPreferences(userId: string): CommunicationPreferences;
    updatePreferences(userId: string, update: Partial<CommunicationPreferences>): CommunicationPreferences;
    getConsents(userId: string): ChannelConsent[];
    setConsent(userId: string, consent: Partial<ChannelConsent> & {
        channel: any;
    }): ChannelConsent;
    getFatigueMetrics(userId: string): FatigueMetrics;
    getPrayerProfile(userId: string): PrayerCalculationProfile;
    updatePrayerProfile(userId: string, update: Partial<PrayerCalculationProfile>): PrayerCalculationProfile;
    getTodayPrayerSchedule(userId: string): DailyPrayerSchedule;
    orchestrateAndSend(payload: {
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
    }): Promise<{
        decision: CommunicationDecisionResult;
        dispatch?: SendMessageResponse;
    }>;
    recordInteraction(userId: string, action: NotificationInteractionAction): FatigueMetrics;
    handleWebhook(payload: DeliveryWebhookPayload): Promise<{
        acknowledged: boolean;
    }>;
}
//# sourceMappingURL=communications.service.d.ts.map