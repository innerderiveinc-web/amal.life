import { CommunicationsService } from './communications.service.js';
export declare class CommunicationsController {
    private readonly commsService;
    constructor(commsService: CommunicationsService);
    getPreferences(req: any): Promise<{
        success: boolean;
        data: import("@amal/types").CommunicationPreferences;
    }>;
    updatePreferences(req: any, body: any): Promise<{
        success: boolean;
        data: import("@amal/types").CommunicationPreferences;
    }>;
    getConsents(req: any): Promise<{
        success: boolean;
        data: import("@amal/types").ChannelConsent[];
    }>;
    setConsent(req: any, body: any): Promise<{
        success: boolean;
        data: import("@amal/types").ChannelConsent;
    }>;
    getTodayPrayers(req: any): Promise<{
        success: boolean;
        data: import("@amal/types").DailyPrayerSchedule;
    }>;
    updatePrayerSettings(req: any, body: any): Promise<{
        success: boolean;
        data: import("@amal/types").PrayerCalculationProfile;
    }>;
    recordInteraction(req: any, _id: string, body: {
        action: any;
    }): Promise<{
        success: boolean;
        data: import("@amal/types").FatigueMetrics;
    }>;
    internalSend(body: any): Promise<{
        success: boolean;
        data: {
            decision: import("@amal/types").CommunicationDecisionResult;
            dispatch?: import("@amal/types").SendMessageResponse;
        };
    }>;
    handleWebhook(body: any): Promise<{
        success: boolean;
        data: {
            acknowledged: boolean;
        };
    }>;
}
//# sourceMappingURL=communications.controller.d.ts.map