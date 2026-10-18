import { prayerQiblaEngine, PrayerTimeResult, MadhhabAsr, CalculationMethod } from '@amal/amal-engine';
import { GLOBAL_CITIES, GlobalCity } from './global-locations';

export interface NextPrayerInfo {
  key: 'fajr' | 'sunrise' | 'dhuhr' | 'asr' | 'maghrib' | 'isha';
  nameEnglish: string;
  nameUrdu: string;
  fullNameUrdu: string;
  time: string;
  minutesLeft: number;
  hours: number;
  minutes: number;
  formattedCountdownUrdu: string;
  formattedCountdownEnglish: string;
}

export function parseTimeToMinutes(timeStr: string): number {
  if (!timeStr || !timeStr.includes(':')) return 0;
  const [h, m] = timeStr.split(':').map(Number);
  return (h || 0) * 60 + (m || 0);
}

export function formatCountdown(minutesLeft: number): { urdu: string; english: string } {
  if (minutesLeft <= 0) {
    return {
      urdu: 'وقت ہو چکا ہے',
      english: 'Now',
    };
  }

  const hours = Math.floor(minutesLeft / 60);
  const mins = minutesLeft % 60;

  let urdu = '';
  let english = '';

  if (hours > 0 && mins > 0) {
    const hourLabel = hours === 1 ? 'گھنٹہ' : 'گھنٹے';
    urdu = `${hours} ${hourLabel} ${mins} منٹ`;
    english = `${hours}h ${mins}m left`;
  } else if (hours > 0 && mins === 0) {
    const hourLabel = hours === 1 ? 'گھنٹہ' : 'گھنٹے';
    urdu = `${hours} ${hourLabel}`;
    english = `${hours}h left`;
  } else {
    urdu = `${mins} منٹ`;
    english = `${mins}m left`;
  }

  return { urdu, english };
}

/**
 * Intelligent automatic timezone to city mapper
 * Guarantees zero-friction accurate prayer times for user's country on first visit
 */
export function detectDefaultCityFromTimezone(): GlobalCity {
  if (typeof Intl === 'undefined') return GLOBAL_CITIES[0]!;
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (tz.includes('Kolkata') || tz.includes('Calcutta')) {
      return GLOBAL_CITIES.find((c) => c.name.includes('Delhi')) || GLOBAL_CITIES[0]!;
    }
    if (tz.includes('Karachi')) {
      return GLOBAL_CITIES.find((c) => c.name === 'Karachi') || GLOBAL_CITIES[0]!;
    }
    if (tz.includes('Dhaka')) {
      return GLOBAL_CITIES.find((c) => c.name === 'Dhaka') || GLOBAL_CITIES[0]!;
    }
    if (tz.includes('Dubai') || tz.includes('Muscat')) {
      return GLOBAL_CITIES.find((c) => c.name.includes('Dubai')) || GLOBAL_CITIES[0]!;
    }
    if (tz.includes('Riyadh')) {
      return GLOBAL_CITIES.find((c) => c.name.includes('Makkah') || c.name.includes('Riyadh')) || GLOBAL_CITIES[0]!;
    }
    if (tz.includes('London')) {
      return GLOBAL_CITIES.find((c) => c.name.includes('London')) || GLOBAL_CITIES[0]!;
    }
    if (tz.includes('New_York')) {
      return GLOBAL_CITIES.find((c) => c.name.includes('New York')) || GLOBAL_CITIES[0]!;
    }
    if (tz.includes('Chicago')) {
      return GLOBAL_CITIES.find((c) => c.name.includes('Chicago')) || GLOBAL_CITIES[0]!;
    }
    if (tz.includes('Toronto')) {
      return GLOBAL_CITIES.find((c) => c.name.includes('Toronto')) || GLOBAL_CITIES[0]!;
    }
    if (tz.includes('Istanbul')) {
      return GLOBAL_CITIES.find((c) => c.name.includes('Istanbul')) || GLOBAL_CITIES[0]!;
    }
    if (tz.includes('Cairo')) {
      return GLOBAL_CITIES.find((c) => c.name.includes('Cairo')) || GLOBAL_CITIES[0]!;
    }
  } catch (_) {}
  return GLOBAL_CITIES[0]!;
}

export function getSavedLocation(): { lat: number; lon: number; name: string } {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('amal_user_location');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.lat && parsed.lon) {
          return { lat: parsed.lat, lon: parsed.lon, name: parsed.name || 'Your Location' };
        }
      }
    } catch (_) {}

    // First-visit auto fallback based on system timezone
    const autoCity = detectDefaultCityFromTimezone();
    return { lat: autoCity.lat, lon: autoCity.lon, name: `${autoCity.name}, ${autoCity.country}` };
  }
  return { lat: 28.6139, lon: 77.2090, name: 'Delhi / New Delhi, India' };
}

export function saveUserLocation(loc: { lat: number; lon: number; name?: string; city?: string; country?: string }): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('amal_user_location', JSON.stringify({
      lat: loc.lat,
      lon: loc.lon,
      name: loc.name || (loc.city ? `${loc.city}, ${loc.country || ''}` : 'Your Location'),
    }));
    window.dispatchEvent(new Event('amal_prayer_settings_changed'));
  }
}

export function getSavedMadhhab(): MadhhabAsr {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('amal_user_madhhab');
    if (saved === 'HANAFI' || saved === 'STANDARD_JUMHUR') return saved;
  }
  return 'HANAFI';
}

export function saveUserMadhhab(madhhab: MadhhabAsr): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('amal_user_madhhab', madhhab);
    window.dispatchEvent(new Event('amal_prayer_settings_changed'));
  }
}

export function getSavedMethod(): CalculationMethod {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('amal_user_method');
    if (saved) return saved as CalculationMethod;
  }
  return 'KARACHI';
}

export function saveUserMethod(method: CalculationMethod): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('amal_user_method', method);
    window.dispatchEvent(new Event('amal_prayer_settings_changed'));
  }
}

export function getSavedOffsets(): Record<string, number> {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('amal_user_prayer_offsets');
      if (saved) return JSON.parse(saved);
    } catch (_) {}
  }
  return { fajr: 0, dhuhr: 0, asr: 0, maghrib: 0, isha: 0 };
}

export function saveUserOffsets(offsets: Record<string, number>): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('amal_user_prayer_offsets', JSON.stringify(offsets));
    window.dispatchEvent(new Event('amal_prayer_settings_changed'));
  }
}

export function saveUserHijriOffset(offset: number): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('amal_user_hijri_offset', offset.toString());
    window.dispatchEvent(new Event('amal_prayer_settings_changed'));
  }
}

export function applyOffsets(times: PrayerTimeResult, offsets: Record<string, number>): PrayerTimeResult {
  const adjust = (timeStr: string, deltaMins: number) => {
    if (!deltaMins) return timeStr;
    const mins = parseTimeToMinutes(timeStr) + deltaMins;
    const normalized = (mins % (24 * 60) + (24 * 60)) % (24 * 60);
    const h = Math.floor(normalized / 60);
    const m = normalized % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  };

  return {
    ...times,
    fajr: adjust(times.fajr, offsets.fajr || 0),
    dhuhr: adjust(times.dhuhr, offsets.dhuhr || 0),
    asr: adjust(times.asr, offsets.asr || 0),
    maghrib: adjust(times.maghrib, offsets.maghrib || 0),
    isha: adjust(times.isha, offsets.isha || 0),
  };
}

export interface MakroohTimesInfo {
  sunrise: { start: string; end: string; labelUrdu: string; labelEnglish: string };
  zawal: { start: string; end: string; labelUrdu: string; labelEnglish: string };
  sunset: { start: string; end: string; labelUrdu: string; labelEnglish: string };
}

export function calculateMakroohTimes(sunriseStr: string, dhuhrStr: string, maghribStr: string): MakroohTimesInfo {
  const addMins = (timeStr: string, delta: number) => {
    const total = parseTimeToMinutes(timeStr) + delta;
    const normalized = (total % (24 * 60) + (24 * 60)) % (24 * 60);
    const h = Math.floor(normalized / 60);
    const m = normalized % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  };

  return {
    sunrise: {
      start: sunriseStr,
      end: addMins(sunriseStr, 15),
      labelUrdu: 'طلوعِ آفتاب تا اشراق (۱۵ منٹ — نماز مکروہِ تحریمی ہے)',
      labelEnglish: 'Sunrise Window (First ~15 min post-sunrise — Prohibited for Salah)',
    },
    zawal: {
      start: addMins(dhuhrStr, -10),
      end: dhuhrStr,
      labelUrdu: 'نصف النہار / زوال (ظہر سے ۱۰ منٹ قبل — نماز مکروہ ہے)',
      labelEnglish: 'Zawal Window (~10 min before Dhuhr — Prohibited for Salah)',
    },
    sunset: {
      start: addMins(maghribStr, -15),
      end: maghribStr,
      labelUrdu: 'غروبِ آفتاب (مغرب سے ۱۵ منٹ قبل — قضا یا نفل مکروہ ہے)',
      labelEnglish: 'Sunset Window (~15 min prior to Maghrib — Prohibited except today\'s Asr)',
    },
  };
}

export function getLiveNextPrayer(
  prayerTimes: PrayerTimeResult,
  now: Date = new Date()
): NextPrayerInfo {
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const fajrMinutes = parseTimeToMinutes(prayerTimes.fajr);
  const sunriseMinutes = parseTimeToMinutes(prayerTimes.sunrise);
  const dhuhrMinutes = parseTimeToMinutes(prayerTimes.dhuhr);
  const asrMinutes = parseTimeToMinutes(prayerTimes.asr);
  const maghribMinutes = parseTimeToMinutes(prayerTimes.maghrib);
  const ishaMinutes = parseTimeToMinutes(prayerTimes.isha);

  const isFriday = now.getDay() === 5;

  let key: NextPrayerInfo['key'] = 'fajr';
  let nameEnglish = 'Fajr';
  let nameUrdu = 'فجر';
  let fullNameUrdu = 'نمازِ فجر';
  let time = prayerTimes.fajr;
  let minutesLeft = 0;

  if (currentMinutes < fajrMinutes) {
    // Before Fajr (Night / Tahajjud time)
    key = 'fajr';
    nameEnglish = 'Fajr';
    nameUrdu = 'فجر';
    fullNameUrdu = 'نمازِ فجر';
    time = prayerTimes.fajr;
    minutesLeft = fajrMinutes - currentMinutes;
  } else if (currentMinutes < sunriseMinutes) {
    // Between Fajr and Sunrise
    key = 'sunrise';
    nameEnglish = 'Sunrise / Ishraq';
    nameUrdu = 'طلوعِ آفتاب و اشراق';
    fullNameUrdu = 'طلوعِ آفتاب و اشراق';
    time = prayerTimes.sunrise;
    minutesLeft = sunriseMinutes - currentMinutes;
  } else if (currentMinutes < dhuhrMinutes) {
    // Morning (Chasht) until Dhuhr
    key = 'dhuhr';
    nameEnglish = isFriday ? "Jumu'ah" : 'Dhuhr';
    nameUrdu = isFriday ? 'جمعہ' : 'ظہر';
    fullNameUrdu = isFriday ? 'نمازِ جمعہ' : 'نمازِ ظہر';
    time = prayerTimes.dhuhr;
    minutesLeft = dhuhrMinutes - currentMinutes;
  } else if (currentMinutes < asrMinutes) {
    // Afternoon until Asr
    key = 'asr';
    nameEnglish = 'Asr';
    nameUrdu = 'عصر';
    fullNameUrdu = 'نمازِ عصر';
    time = prayerTimes.asr;
    minutesLeft = asrMinutes - currentMinutes;
  } else if (currentMinutes < maghribMinutes) {
    // Late afternoon until Maghrib
    key = 'maghrib';
    nameEnglish = 'Maghrib';
    nameUrdu = 'مغرب';
    fullNameUrdu = 'نمازِ مغرب';
    time = prayerTimes.maghrib;
    minutesLeft = maghribMinutes - currentMinutes;
  } else if (currentMinutes < ishaMinutes) {
    // Evening until Isha
    key = 'isha';
    nameEnglish = 'Isha';
    nameUrdu = 'عشاء';
    fullNameUrdu = 'نمازِ عشاء';
    time = prayerTimes.isha;
    minutesLeft = ishaMinutes - currentMinutes;
  } else {
    // Night after Isha: Next prayer is tomorrow's Fajr
    key = 'fajr';
    nameEnglish = 'Fajr';
    nameUrdu = 'فجر';
    fullNameUrdu = 'نمازِ فجر';
    time = prayerTimes.fajr;
    minutesLeft = (1440 - currentMinutes) + fajrMinutes;
  }

  const hours = Math.floor(minutesLeft / 60);
  const minutes = minutesLeft % 60;
  const { urdu, english } = formatCountdown(minutesLeft);

  return {
    key,
    nameEnglish,
    nameUrdu,
    fullNameUrdu,
    time,
    minutesLeft,
    hours,
    minutes,
    formattedCountdownUrdu: urdu,
    formattedCountdownEnglish: english,
  };
}

export function getSavedHijriOffset(): number {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('amal_user_hijri_offset');
    if (saved !== null) {
      const parsed = parseInt(saved, 10);
      if (!isNaN(parsed)) return parsed;
    }
  }
  return 0;
}

export function setSavedHijriOffset(offset: number): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('amal_user_hijri_offset', offset.toString());
    window.dispatchEvent(new Event('amal_prayer_settings_changed'));
  }
}

export interface LocalMosqueSettings {
  name: string;
  iqamahOffsets: {
    fajr: number;
    dhuhr: number;
    asr: number;
    maghrib: number;
    isha: number;
    jumuah: string;
  };
}

export function getSavedMosqueSettings(): LocalMosqueSettings {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('amal_user_mosque_settings');
      if (saved) return JSON.parse(saved);
    } catch (_) {}
  }
  return {
    name: 'Mohalla Jamia Masjid',
    iqamahOffsets: {
      fajr: 25,
      dhuhr: 30,
      asr: 20,
      maghrib: 7,
      isha: 30,
      jumuah: '13:30',
    },
  };
}

export function saveMosqueSettings(settings: LocalMosqueSettings): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('amal_user_mosque_settings', JSON.stringify(settings));
    window.dispatchEvent(new Event('amal_prayer_settings_changed'));
  }
}

