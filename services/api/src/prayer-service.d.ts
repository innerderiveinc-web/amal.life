import { PrayerSchedule, PrayerCalculationMethod, Madhhab, PrayerName, PrayerEvent } from '@amal/types';
export declare class PrayerService {
    /**
     * Calculate prayer schedule for a given date, timezone, and calculation method
     */
    static getSchedule(date?: string, timezone?: string, method?: PrayerCalculationMethod, madhhab?: Madhhab): PrayerSchedule;
    /**
     * Log prayer completion
     */
    static recordPrayer(userId: string, prayerName: PrayerName, date: string, prayedInCongregation?: boolean, prayedSunnah?: boolean, notes?: string): Promise<PrayerEvent>;
}
//# sourceMappingURL=prayer-service.d.ts.map