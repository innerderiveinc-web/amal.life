import React from 'react';
export interface PrayerItem {
    name: 'Fajr' | 'Sunrise' | 'Dhuhr' | 'Asr' | 'Maghrib' | 'Isha';
    time: string;
    status: 'COMPLETED' | 'CURRENT' | 'UPCOMING';
}
export interface PrayerTimelineProps {
    currentPrayer: string;
    countdown: string;
    calculationMethod?: string;
    prayers: PrayerItem[];
}
export declare const PrayerTimelineCard: React.FC<PrayerTimelineProps>;
//# sourceMappingURL=PrayerTimelineCard.d.ts.map