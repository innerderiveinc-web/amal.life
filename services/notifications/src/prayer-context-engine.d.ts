import { CalculationMethod, PrayerCalculationProfile, DailyPrayerSchedule } from '@amal/types';
export interface MethodAngles {
    fajrAngle: number;
    ishaAngle?: number;
    ishaIntervalMinutes?: number;
}
export declare const CALCULATION_METHOD_PARAMS: Record<CalculationMethod, MethodAngles>;
export declare const CITY_COORDINATES: Record<string, {
    lat: number;
    lng: number;
}>;
export declare class PrayerContextEngine {
    /**
     * Calculates the canonical daily prayer schedule for a given date and profile.
     * Utilizes standard solar positioning equations with astronomical twilight angles.
     */
    static calculateDailySchedule(profile: PrayerCalculationProfile, date?: Date): DailyPrayerSchedule;
    private static julianDays;
    private static calculateDeclination;
    private static calculateEquationOfTime;
    private static hourAngle;
    private static asrAltitude;
    private static minutesToDate;
}
//# sourceMappingURL=prayer-context-engine.d.ts.map