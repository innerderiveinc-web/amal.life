import { useState, useEffect } from 'react';
import { prayerQiblaEngine, PrayerTimesResult } from '@amal/amal-engine';

export function usePrayerTimes(latitude: number = 24.8607, longitude: number = 67.0011) {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimesResult | null>(null);

  useEffect(() => {
    try {
      const times = prayerQiblaEngine.calculatePrayerTimes(
        { latitude, longitude },
        new Date(),
        'HANAFI',
        'KARACHI'
      );
      setPrayerTimes(times);
    } catch {
      setPrayerTimes(null);
    }
  }, [latitude, longitude]);

  return prayerTimes;
}
