/**
 * AMAL OS — LOCAL MOSQUE IQAMAH & COMMUNITY SYNC ENGINE
 * 
 * Synchronizes real-life congregational prayer (Iqamah / Jamat) schedules
 * with astronomical Adhan calculation times, and provides community Janazah
 * announcements.
 */

export interface MosqueProfile {
  mosqueId: string;
  name: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  iqamahOffsetsMinutes: {
    fajr: number;    // E.g., +25 minutes after Adhan
    dhuhr: number;   // E.g., +30 minutes
    asr: number;     // E.g., +20 minutes
    maghrib: number; // E.g., +7 minutes
    isha: number;    // E.g., +30 minutes
  };
  jumuahSchedule: {
    firstKhutbah: string;
    firstPrayer: string;
    secondKhutbah?: string;
    secondPrayer?: string;
  };
  communityAnnouncements: Array<{
    announcementId: string;
    type: 'JANAZAH' | 'SPECIAL_DARS' | 'CHARITY_DRIVE';
    title: string;
    details: string;
    date: string;
    time?: string;
  }>;
}

export interface MosqueActiveSchedule {
  mosqueName: string;
  city: string;
  fajr: { adhan: string; iqamah: string };
  dhuhr: { adhan: string; iqamah: string };
  asr: { adhan: string; iqamah: string };
  maghrib: { adhan: string; iqamah: string };
  isha: { adhan: string; iqamah: string };
  jumuah: { khutbah: string; prayer: string };
  janazahAlerts: MosqueProfile['communityAnnouncements'];
}

export class MosqueIqamahSyncEngine {
  private mosques = new Map<string, MosqueProfile>();

  constructor() {
    this.mosques.set('msq_central_1', {
      mosqueId: 'msq_central_1',
      name: 'Markazi Jamia Masjid & Dar al-Ulum',
      city: 'Karachi',
      country: 'Pakistan',
      latitude: 24.8607,
      longitude: 67.0011,
      iqamahOffsetsMinutes: {
        fajr: 25,
        dhuhr: 35,
        asr: 20,
        maghrib: 7,
        isha: 30,
      },
      jumuahSchedule: {
        firstKhutbah: '13:00',
        firstPrayer: '13:30',
        secondKhutbah: '14:00',
        secondPrayer: '14:25',
      },
      communityAnnouncements: [
        {
          announcementId: 'jnz_1',
          type: 'JANAZAH',
          title: 'Janazah Announcement: Haji Muhammad Siddiq (Rahimahullah)',
          details: 'Janazah prayer will be held after Asr prayer at the main courtyard. Please recite Fatihah and pray for Maghfirah.',
          date: 'Today',
          time: 'Post-Asr (17:30)',
        },
      ],
    });
  }

  public getMosque(mosqueId: string = 'msq_central_1'): MosqueProfile {
    return this.mosques.get(mosqueId) || this.mosques.get('msq_central_1')!;
  }

  /**
   * Computes synchronized Adhan vs Mosque Iqamah times
   */
  public computeSynchronizedSchedule(
    adhanTimes: { fajr: string; dhuhr: string; asr: string; maghrib: string; isha: string },
    mosqueId: string = 'msq_central_1'
  ): MosqueActiveSchedule {
    const msq = this.getMosque(mosqueId);

    const addMinutes = (timeStr: string, minsToAdd: number): string => {
      const parts = timeStr.split(':').map(Number);
      const h = parts[0] ?? 0;
      const m = parts[1] ?? 0;
      const totalMins = h * 60 + m + minsToAdd;
      const newH = Math.floor(totalMins / 60) % 24;
      const newM = totalMins % 60;
      return `${String(newH).padStart(2, '0')}:${String(newM).padStart(2, '0')}`;
    };

    return {
      mosqueName: msq.name,
      city: msq.city,
      fajr: { adhan: adhanTimes.fajr, iqamah: addMinutes(adhanTimes.fajr, msq.iqamahOffsetsMinutes.fajr) },
      dhuhr: { adhan: adhanTimes.dhuhr, iqamah: addMinutes(adhanTimes.dhuhr, msq.iqamahOffsetsMinutes.dhuhr) },
      asr: { adhan: adhanTimes.asr, iqamah: addMinutes(adhanTimes.asr, msq.iqamahOffsetsMinutes.asr) },
      maghrib: { adhan: adhanTimes.maghrib, iqamah: addMinutes(adhanTimes.maghrib, msq.iqamahOffsetsMinutes.maghrib) },
      isha: { adhan: adhanTimes.isha, iqamah: addMinutes(adhanTimes.isha, msq.iqamahOffsetsMinutes.isha) },
      jumuah: {
        khutbah: msq.jumuahSchedule.firstKhutbah,
        prayer: msq.jumuahSchedule.firstPrayer,
      },
      janazahAlerts: msq.communityAnnouncements.filter((a) => a.type === 'JANAZAH'),
    };
  }
}

export const mosqueIqamahSyncEngine = new MosqueIqamahSyncEngine();
