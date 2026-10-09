/**
 * AMAL OS — Precision Prayer Times & Qibla Compass Engine
 * 
 * Implements deterministic astronomical algorithms for solar coordinates,
 * Qibla azimuth, and Madhhab-compliant prayer times (Hanafi Mislayn vs Shafi'i/Maliki/Hanbali Misl al-Awwal).
 * 
 * Epistemic Integrity: Pure mathematical astronomy aligned with classical Fiqh definitions:
 * - Fajr: Subh Sadiq (true dawn)
 * - Shuruq: Solar disk upper limb sunrise
 * - Dhuhr: Zawal (sun passing meridian with safety buffer)
 * - Asr: Shadow reaching 1x (Jumhur) or 2x (Hanafi) + meridian shadow
 * - Maghrib: Complete sunset (Ghurub)
 * - Isha: Disappearance of red twilight (Shafaq al-Ahmar) / white twilight (Shafaq al-Abyad)
 */

export type MadhhabAsr = 'HANAFI' | 'STANDARD_JUMHUR'; // Standard = Shafi'i, Maliki, Hanbali

export type CalculationMethod = 
  | 'KARACHI'       // University of Islamic Sciences, Karachi (Fajr 18°, Isha 18°)
  | 'MWL'           // Muslim World League (Fajr 18°, Isha 17°)
  | 'UMM_AL_QURA'   // Umm al-Qura, Makkah (Fajr 18.5°, Isha 90 min after Maghrib)
  | 'EGYPTIAN'      // Egyptian General Authority of Survey (Fajr 19.5°, Isha 17.5°)
  | 'ISNA'          // Islamic Society of North America (Fajr 15°, Isha 15°)
  | 'TEHRAN';       // Institute of Geophysics, Tehran

export interface CalculationParameters {
  fajrAngle: number;
  ishaAngle?: number;
  ishaIntervalMinutes?: number; // E.g., 90 min for Umm al-Qura
}

export const CALCULATION_METHODS: Record<CalculationMethod, CalculationParameters> = {
  KARACHI: { fajrAngle: 18.0, ishaAngle: 18.0 },
  MWL: { fajrAngle: 18.0, ishaAngle: 17.0 },
  UMM_AL_QURA: { fajrAngle: 18.5, ishaIntervalMinutes: 90 },
  EGYPTIAN: { fajrAngle: 19.5, ishaAngle: 17.5 },
  ISNA: { fajrAngle: 15.0, ishaAngle: 15.0 },
  TEHRAN: { fajrAngle: 17.7, ishaAngle: 14.0 },
};

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface PrayerTimeResult {
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  midnight: string;
  qiyamThird: string;
  asrMadhhab: MadhhabAsr;
  method: CalculationMethod;
  date: string;
  timezoneOffset: number;
  rawTimes: {
    fajr: Date;
    sunrise: Date;
    dhuhr: Date;
    asr: Date;
    maghrib: Date;
    isha: Date;
  };
}

export interface QiblaResult {
  bearingDegrees: number; // 0° = North, 90° = East, etc.
  compassDirection: string;
  distanceKm: number;
  coordinates: Coordinates;
}

const KAABA_COORDINATES: Coordinates = {
  latitude: 21.4225,
  longitude: 39.8262,
};

const RAD = Math.PI / 180;
const DEG = 180 / Math.PI;

function sinD(deg: number): number {
  return Math.sin(deg * RAD);
}

function cosD(deg: number): number {
  return Math.cos(deg * RAD);
}

function tanD(deg: number): number {
  return Math.tan(deg * RAD);
}

function asinD(x: number): number {
  return Math.asin(x) * DEG;
}

function acosD(x: number): number {
  return Math.acos(x) * DEG;
}

function atan2D(y: number, x: number): number {
  return Math.atan2(y, x) * DEG;
}

function normalizeHours(h: number): number {
  h = h - 24 * Math.floor(h / 24);
  return h < 0 ? h + 24 : h;
}

function normalizeDegrees(d: number): number {
  d = d - 360 * Math.floor(d / 360);
  return d < 0 ? d + 360 : d;
}

/**
 * Calculates solar position parameters (declination & equation of time)
 */
function getSolarCoordinates(julianDay: number) {
  const d = julianDay - 2451545.0;
  const g = normalizeDegrees(357.529 + 0.98560028 * d);
  const q = normalizeDegrees(280.459 + 0.98564736 * d);
  const l = normalizeDegrees(q + 1.915 * sinD(g) + 0.020 * sinD(2 * g));
  const e = 23.439 - 0.00000036 * d;
  const ra = atan2D(cosD(e) * sinD(l), cosD(l)) / 15.0;
  const declination = asinD(sinD(e) * sinD(l));
  const eqOfTime = (q / 15.0) - normalizeHours(ra);
  return { declination, eqOfTime: eqOfTime * 60 }; // eqOfTime in minutes
}

function getJulianDay(date: Date): number {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  return day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
}

function hoursToTimeString(hours: number): string {
  const h = Math.floor(normalizeHours(hours));
  const m = Math.floor((normalizeHours(hours) - h) * 60);
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}

function dateFromHours(baseDate: Date, hours: number, tzOffsetMinutes: number): Date {
  const d = new Date(baseDate);
  d.setHours(0, 0, 0, 0);
  const totalMinutes = Math.round(hours * 60) - tzOffsetMinutes;
  return new Date(d.getTime() + totalMinutes * 60000);
}

export class PrayerQiblaEngine {
  /**
   * Calculates high-precision Qibla bearing from any coordinate on Earth
   */
  public calculateQibla(coords: Coordinates): QiblaResult {
    const lat1 = coords.latitude * RAD;
    const lat2 = KAABA_COORDINATES.latitude * RAD;
    const deltaLon = (KAABA_COORDINATES.longitude - coords.longitude) * RAD;

    const y = Math.sin(deltaLon);
    const x = Math.cos(lat1) * Math.tan(lat2) - Math.sin(lat1) * Math.cos(deltaLon);

    let bearing = Math.atan2(y, x) * DEG;
    bearing = normalizeDegrees(bearing);

    // Haversine formula for distance
    const R = 6371; // Earth radius in km
    const dLat = (KAABA_COORDINATES.latitude - coords.latitude) * RAD;
    const dLon = deltaLon;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1) * Math.cos(lat2) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distanceKm = Math.round(R * c);

    // Compass Direction (16-wind)
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(bearing / 22.5) % 16;
    const compassDirection = directions[index] ?? 'N';

    return {
      bearingDegrees: Math.round(bearing * 10) / 10,
      compassDirection,
      distanceKm,
      coordinates: coords,
    };
  }

  /**
   * Calculates astronomical prayer times with Madhhab-specific Asr and calculation method
   */
  public calculatePrayerTimes(
    coords: Coordinates,
    date: Date = new Date(),
    asrMadhhab: MadhhabAsr = 'HANAFI',
    method: CalculationMethod = 'KARACHI'
  ): PrayerTimeResult {
    const tzOffsetMinutes = -date.getTimezoneOffset(); // in minutes
    const tzHours = tzOffsetMinutes / 60;
    const jd = getJulianDay(date);
    const solar = getSolarCoordinates(jd);

    // Dhuhr (Solar noon + 2-minute ihtiyat / safety margin)
    const dhuhrHours = 12 + tzHours - (coords.longitude / 15.0) - (solar.eqOfTime / 60) + (2 / 60);

    const calcHourAngle = (altitude: number): number => {
      const cosHA = (sinD(altitude) - sinD(coords.latitude) * sinD(solar.declination)) /
                    (cosD(coords.latitude) * cosD(solar.declination));
      if (cosHA > 1) return 0; // Sun never rises
      if (cosHA < -1) return 180; // Sun never sets
      return acosD(cosHA) / 15.0;
    };

    // Sunrise & Sunset (geometric altitude -0.8333° for solar refraction and semi-diameter)
    const sunHalfDay = calcHourAngle(-0.8333);
    const sunriseHours = dhuhrHours - sunHalfDay;
    const sunsetHours = dhuhrHours + sunHalfDay;

    // Fajr
    const params = CALCULATION_METHODS[method];
    const fajrHA = calcHourAngle(-params.fajrAngle);
    const fajrHours = dhuhrHours - fajrHA;

    // Asr (Shadow length: Hanafi = 2x, Jumhur = 1x)
    const shadowFactor = asrMadhhab === 'HANAFI' ? 2 : 1;
    const noonShadow = Math.abs(tanD(coords.latitude - solar.declination));
    const asrAltitude = atan2D(1, shadowFactor + noonShadow);
    const asrHA = calcHourAngle(asrAltitude);
    const asrHours = dhuhrHours + asrHA;

    // Maghrib = Sunset + 2-minute ihtiyat
    const maghribHours = sunsetHours + (2 / 60);

    // Isha
    let ishaHours: number;
    if (params.ishaIntervalMinutes) {
      ishaHours = maghribHours + (params.ishaIntervalMinutes / 60);
    } else {
      const ishaAngle = params.ishaAngle || 18.0;
      const ishaHA = calcHourAngle(-ishaAngle);
      ishaHours = dhuhrHours + ishaHA;
    }

    // Islamic Midnight (Midpoint between Maghrib and Fajr of next morning)
    const nextFajrHours = fajrHours + 24;
    const nightDuration = nextFajrHours - maghribHours;
    const midnightHours = normalizeHours(maghribHours + nightDuration / 2);

    // Last Third of Night (Best time for Tahajjud / Qiyam al-Layl)
    const qiyamThirdHours = normalizeHours(maghribHours + (2 * nightDuration / 3));

    return {
      fajr: hoursToTimeString(fajrHours),
      sunrise: hoursToTimeString(sunriseHours),
      dhuhr: hoursToTimeString(dhuhrHours),
      asr: hoursToTimeString(asrHours),
      maghrib: hoursToTimeString(maghribHours),
      isha: hoursToTimeString(ishaHours),
      midnight: hoursToTimeString(midnightHours),
      qiyamThird: hoursToTimeString(qiyamThirdHours),
      asrMadhhab,
      method,
      date: date.toISOString().split('T')[0] ?? '',
      timezoneOffset: tzOffsetMinutes,
      rawTimes: {
        fajr: dateFromHours(date, fajrHours, tzOffsetMinutes),
        sunrise: dateFromHours(date, sunriseHours, tzOffsetMinutes),
        dhuhr: dateFromHours(date, dhuhrHours, tzOffsetMinutes),
        asr: dateFromHours(date, asrHours, tzOffsetMinutes),
        maghrib: dateFromHours(date, maghribHours, tzOffsetMinutes),
        isha: dateFromHours(date, ishaHours, tzOffsetMinutes),
      },
    };
  }
}

export const prayerQiblaEngine = new PrayerQiblaEngine();
