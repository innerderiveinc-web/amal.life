import { Madhhab, PrayerCalculationMethod } from './user.js';

export type PrayerName = 'FAJR' | 'SUNRISE' | 'DHUHR' | 'ASR' | 'MAGHRIB' | 'ISHA';

export interface PrayerSchedule {
  date: string; // YYYY-MM-DD
  timezone: string;
  calculationMethod: PrayerCalculationMethod;
  madhhab: Madhhab;
  times: {
    fajr: string;    // ISO timestamp or HH:mm
    sunrise: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
  };
  nextPrayer: {
    name: PrayerName;
    time: string;
    minutesRemaining: number;
  };
}

export type PrayerCompletionStatus = 'ON_TIME' | 'LATE' | 'MISSED' | 'EXCUSED';

export interface PrayerEvent {
  id: string;
  userId: string;
  prayerName: PrayerName;
  date: string;
  status: PrayerCompletionStatus;
  completedAt?: string | null;
  prayedInCongregation: boolean;
  prayedSunnah: boolean;
  notes?: string | null;
  createdAt: string;
}
