import { prayerQiblaEngine, PrayerTimeResult } from '@amal/amal-engine';

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
  }
  return { lat: 28.6139, lon: 77.2090, name: 'Delhi / New Delhi, India' };
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
