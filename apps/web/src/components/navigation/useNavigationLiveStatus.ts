import { useState, useEffect, useMemo } from 'react';
import { hijriFastingEngine, prayerQiblaEngine } from '@amal/amal-engine';
import {
  getLiveNextPrayer,
  getSavedLocation,
  getSavedMadhhab,
  getSavedMethod,
  getSavedOffsets,
  applyOffsets,
  getSavedHijriOffset,
} from '../../lib/prayer-utils';

export function useNavigationLiveStatus() {
  const [now, setNow] = useState<Date>(() => new Date());
  const [prayerConfigKey, setPrayerConfigKey] = useState(0);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    setNow(new Date());
    const interval = setInterval(() => setNow(new Date()), 60000);
    const handleConfigChange = () => setPrayerConfigKey((k) => k + 1);
    window.addEventListener('amal_prayer_settings_changed', handleConfigChange);

    if (typeof window !== 'undefined') {
      setIsOnline(navigator.onLine);
      const handleOnline = () => setIsOnline(true);
      const handleOffline = () => setIsOnline(false);
      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);
      return () => {
        clearInterval(interval);
        window.removeEventListener('amal_prayer_settings_changed', handleConfigChange);
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      };
    }

    return () => {
      clearInterval(interval);
      window.removeEventListener('amal_prayer_settings_changed', handleConfigChange);
    };
  }, []);

  // Live Hijri date calculation (with user Ru'yat-e-Hilal moon adjustment)
  const hijri = useMemo(() => {
    try {
      const offset = getSavedHijriOffset();
      return hijriFastingEngine.toHijri(now, offset);
    } catch {
      return { day: 26, monthNameEnglish: 'Jumada al-Ula', monthNameUrdu: 'جمادی الاولیٰ', year: 1448 };
    }
  }, [now, prayerConfigKey]);

  // Live Prayer calculation (using saved user location, madhhab, method, and offsets)
  const prayerTimes = useMemo(() => {
    try {
      const loc = getSavedLocation();
      const madhhab = getSavedMadhhab();
      const method = getSavedMethod();
      const offsets = getSavedOffsets();
      const raw = prayerQiblaEngine.calculatePrayerTimes({ latitude: loc.lat, longitude: loc.lon }, now, madhhab, method);
      return applyOffsets(raw, offsets);
    } catch {
      return prayerQiblaEngine.calculatePrayerTimes({ latitude: 28.6139, longitude: 77.2090 }, now, 'HANAFI', 'KARACHI');
    }
  }, [now, prayerConfigKey]);

  const nextPrayer = useMemo(() => {
    try {
      return getLiveNextPrayer(prayerTimes, now);
    } catch {
      return null;
    }
  }, [prayerTimes, now]);

  return {
    now,
    hijri,
    isOnline,
    nextPrayer,
  };
}
