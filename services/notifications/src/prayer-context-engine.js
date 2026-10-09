"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrayerContextEngine = exports.CITY_COORDINATES = exports.CALCULATION_METHOD_PARAMS = void 0;
exports.CALCULATION_METHOD_PARAMS = {
    MUSLIM_WORLD_LEAGUE: { fajrAngle: 18.0, ishaAngle: 17.0 },
    ISNA: { fajrAngle: 15.0, ishaAngle: 15.0 },
    KARACHI: { fajrAngle: 18.0, ishaAngle: 18.0 },
    UMM_AL_QURA: { fajrAngle: 18.5, ishaIntervalMinutes: 90 },
    EGYPTIAN: { fajrAngle: 19.5, ishaAngle: 17.5 },
};
// Known approximate coordinates for major cities to preserve location privacy without GPS
exports.CITY_COORDINATES = {
    london: { lat: 51.5074, lng: -0.1278 },
    mecca: { lat: 21.4225, lng: 39.8262 },
    medina: { lat: 24.5247, lng: 39.5692 },
    cairo: { lat: 30.0444, lng: 31.2357 },
    karachi: { lat: 24.8607, lng: 67.0011 },
    dubai: { lat: 25.2048, lng: 55.2708 },
    istanbul: { lat: 41.0082, lng: 28.9784 },
    newyork: { lat: 40.7128, lng: -74.006 },
    toronto: { lat: 43.6532, lng: -79.3832 },
    kualalumpur: { lat: 3.139, lng: 101.6869 },
    jakarta: { lat: -6.2088, lng: 106.8456 },
};
class PrayerContextEngine {
    /**
     * Calculates the canonical daily prayer schedule for a given date and profile.
     * Utilizes standard solar positioning equations with astronomical twilight angles.
     */
    static calculateDailySchedule(profile, date = new Date()) {
        const cityKey = profile.city.toLowerCase().replace(/[^a-z]/g, '');
        const coords = exports.CITY_COORDINATES[cityKey] || { lat: 51.5074, lng: -0.1278 }; // default London
        const dateStr = date.toISOString().split('T')[0];
        const year = date.getUTCFullYear();
        const month = date.getUTCMonth() + 1;
        const day = date.getUTCDate();
        // Astronomical calculations
        const d = this.julianDays(year, month, day);
        const solarDeclination = this.calculateDeclination(d);
        const eqOfTime = this.calculateEquationOfTime(d);
        // Solar noon (Dhuhr)
        const solarNoonMinutes = 12 * 60 - eqOfTime * 4 - coords.lng * 4;
        const methodParams = exports.CALCULATION_METHOD_PARAMS[profile.calculationMethod] || exports.CALCULATION_METHOD_PARAMS.MUSLIM_WORLD_LEAGUE;
        // Fajr
        const fajrMinutes = solarNoonMinutes - this.hourAngle(coords.lat, solarDeclination, -methodParams.fajrAngle) * 4;
        // Sunrise (-0.833 degrees refraction)
        const sunriseMinutes = solarNoonMinutes - this.hourAngle(coords.lat, solarDeclination, -0.833) * 4;
        // Asr (Standard shadow factor = 1, Hanafi = 2)
        const shadowFactor = profile.juristicMethod === 'HANAFI' ? 2 : 1;
        const asrAltitude = this.asrAltitude(coords.lat, solarDeclination, shadowFactor);
        const asrMinutes = solarNoonMinutes + this.hourAngle(coords.lat, solarDeclination, asrAltitude) * 4;
        // Sunset / Maghrib (-0.833 degrees refraction)
        const maghribMinutes = solarNoonMinutes + this.hourAngle(coords.lat, solarDeclination, -0.833) * 4;
        // Isha
        let ishaMinutes;
        if (methodParams.ishaIntervalMinutes) {
            ishaMinutes = maghribMinutes + methodParams.ishaIntervalMinutes;
        }
        else {
            ishaMinutes = solarNoonMinutes + this.hourAngle(coords.lat, solarDeclination, -(methodParams.ishaAngle || 17.0)) * 4;
        }
        // Apply custom user offsets
        const fajrTime = this.minutesToDate(date, fajrMinutes + profile.fajrOffsetMinutes);
        const sunriseTime = this.minutesToDate(date, sunriseMinutes);
        const dhuhrTime = this.minutesToDate(date, solarNoonMinutes + profile.dhuhrOffsetMinutes);
        const asrTime = this.minutesToDate(date, asrMinutes + profile.asrOffsetMinutes);
        const maghribTime = this.minutesToDate(date, maghribMinutes + profile.maghribOffsetMinutes);
        const ishaTime = this.minutesToDate(date, ishaMinutes + profile.ishaOffsetMinutes);
        // Determine current prayer & window status
        const now = date.getTime();
        const prayers = [
            { name: 'Fajr', time: fajrTime.getTime() },
            { name: 'Sunrise', time: sunriseTime.getTime() },
            { name: 'Dhuhr', time: dhuhrTime.getTime() },
            { name: 'Asr', time: asrTime.getTime() },
            { name: 'Maghrib', time: maghribTime.getTime() },
            { name: 'Isha', time: ishaTime.getTime() },
        ];
        let currentPrayer = 'Isha';
        let nextPrayer = 'Fajr';
        let nextPrayerTime = fajrTime.getTime() + 24 * 60 * 60 * 1000;
        for (let i = 0; i < prayers.length; i++) {
            if (now >= prayers[i].time) {
                currentPrayer = prayers[i].name;
                if (i < prayers.length - 1) {
                    nextPrayer = prayers[i + 1].name;
                    nextPrayerTime = prayers[i + 1].time;
                }
                else {
                    nextPrayer = 'Fajr';
                    nextPrayerTime = fajrTime.getTime() + 24 * 60 * 60 * 1000;
                }
            }
            else if (i === 0 && now < prayers[0].time) {
                currentPrayer = 'Isha';
                nextPrayer = 'Fajr';
                nextPrayerTime = prayers[0].time;
                break;
            }
        }
        const minutesToNext = Math.max(0, Math.round((nextPrayerTime - now) / 60000));
        let windowStatus = 'PRAYER_WINDOW_OPEN';
        if (minutesToNext <= 20) {
            windowStatus = 'NEAR_END';
        }
        else if (minutesToNext <= 35) {
            windowStatus = 'BEFORE_PRAYER';
        }
        return {
            userId: profile.userId,
            date: dateStr,
            fajr: fajrTime.toISOString(),
            sunrise: sunriseTime.toISOString(),
            dhuhr: dhuhrTime.toISOString(),
            asr: asrTime.toISOString(),
            maghrib: maghribTime.toISOString(),
            isha: ishaTime.toISOString(),
            currentPrayer,
            nextPrayer,
            windowStatus,
            minutesToNextPrayer: minutesToNext,
        };
    }
    static julianDays(year, month, day) {
        if (month <= 2) {
            year -= 1;
            month += 12;
        }
        const a = Math.floor(year / 100);
        const b = 2 - a + Math.floor(a / 4);
        return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + b - 1524.5 - 2451545.0;
    }
    static calculateDeclination(d) {
        const L = (280.466 + 0.9856474 * d) % 360;
        const g = (357.528 + 0.9856003 * d) % 360;
        const rad = Math.PI / 180;
        const lambda = L + 1.915 * Math.sin(g * rad) + 0.02 * Math.sin(2 * g * rad);
        const epsilon = 23.44 - 0.0000004 * d;
        return Math.asin(Math.sin(epsilon * rad) * Math.sin(lambda * rad)) / rad;
    }
    static calculateEquationOfTime(d) {
        const q = (280.459 + 0.98564736 * d) % 360;
        const g = (357.529 + 0.98560028 * d) % 360;
        const rad = Math.PI / 180;
        const e = 1.915 * Math.sin(g * rad) + 0.02 * Math.sin(2 * g * rad);
        const lambda = q + e;
        const y = Math.tan((23.439 / 2) * rad) ** 2;
        return (y * Math.sin(2 * lambda * rad) - 2 * 0.0167 * Math.sin(g * rad)) * 4;
    }
    static hourAngle(lat, dec, alt) {
        const rad = Math.PI / 180;
        const cosHA = (Math.sin(alt * rad) - Math.sin(lat * rad) * Math.sin(dec * rad)) / (Math.cos(lat * rad) * Math.cos(dec * rad));
        const clamped = Math.max(-1, Math.min(1, cosHA));
        return (Math.acos(clamped) / rad) / 15;
    }
    static asrAltitude(lat, dec, shadowFactor) {
        const rad = Math.PI / 180;
        const phiMinusDelta = Math.abs(lat - dec);
        const noonAltitude = 90 - phiMinusDelta;
        const cotNoon = 1 / Math.tan(noonAltitude * rad);
        const cotAsr = shadowFactor + cotNoon;
        return Math.atan(1 / cotAsr) / rad;
    }
    static minutesToDate(baseDate, minutes) {
        const d = new Date(baseDate);
        const totalMinutes = ((minutes % 1440) + 1440) % 1440;
        const hours = Math.floor(totalMinutes / 60);
        const mins = Math.floor(totalMinutes % 60);
        d.setUTCHours(hours, mins, 0, 0);
        return d;
    }
}
exports.PrayerContextEngine = PrayerContextEngine;
//# sourceMappingURL=prayer-context-engine.js.map