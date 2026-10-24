import React from 'react';
import { LocalMosqueSettings } from '../../lib/prayer-utils';
import { mosqueIqamahSyncEngine } from '@amal/amal-engine';

interface PrayerMosqueJanazahSectionProps {
  mosqueSettings: LocalMosqueSettings;
  prayerTimes: any;
  onOpenMosqueModal: () => void;
  t: (en: string, ur: string) => string;
}

export function PrayerMosqueJanazahSection({
  mosqueSettings,
  prayerTimes,
  onOpenMosqueModal,
  t,
}: PrayerMosqueJanazahSectionProps) {
  const addMins = (timeStr: string, mins: number) => {
    const parts = (timeStr || '00:00').split(':').map(Number);
    const h = parts[0] ?? 0;
    const m = parts[1] ?? 0;
    const total = h * 60 + m + mins;
    const newH = Math.floor(total / 60) % 24;
    const newM = total % 60;
    return `${String(newH).padStart(2, '0')}:${String(newM).padStart(2, '0')}`;
  };

  const mosquePrayerList = [
    {
      prayer: 'Fajr',
      adhanTime: prayerTimes.fajr,
      iqamahTime: addMins(prayerTimes.fajr, mosqueSettings.iqamahOffsets.fajr),
      offset: `+${mosqueSettings.iqamahOffsets.fajr}m`,
    },
    {
      prayer: 'Dhuhr',
      adhanTime: prayerTimes.dhuhr,
      iqamahTime: addMins(prayerTimes.dhuhr, mosqueSettings.iqamahOffsets.dhuhr),
      offset: `+${mosqueSettings.iqamahOffsets.dhuhr}m`,
    },
    {
      prayer: 'Asr',
      adhanTime: prayerTimes.asr,
      iqamahTime: addMins(prayerTimes.asr, mosqueSettings.iqamahOffsets.asr),
      offset: `+${mosqueSettings.iqamahOffsets.asr}m`,
    },
    {
      prayer: 'Maghrib',
      adhanTime: prayerTimes.maghrib,
      iqamahTime: addMins(prayerTimes.maghrib, mosqueSettings.iqamahOffsets.maghrib),
      offset: `+${mosqueSettings.iqamahOffsets.maghrib}m`,
    },
    {
      prayer: 'Isha',
      adhanTime: prayerTimes.isha,
      iqamahTime: addMins(prayerTimes.isha, mosqueSettings.iqamahOffsets.isha),
      offset: `+${mosqueSettings.iqamahOffsets.isha}m`,
    },
    {
      prayer: "Jumu'ah",
      adhanTime: prayerTimes.dhuhr,
      iqamahTime: mosqueSettings.iqamahOffsets.jumuah || '13:30',
      offset: 'Fixed',
    },
  ];

  const syncSchedule = mosqueIqamahSyncEngine.computeSynchronizedSchedule({
    fajr: prayerTimes.fajr,
    dhuhr: prayerTimes.dhuhr,
    asr: prayerTimes.asr,
    maghrib: prayerTimes.maghrib,
    isha: prayerTimes.isha,
  });

  return (
    <div
      style={{
        marginTop: 28,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 24,
      }}
    >
      {/* Mosque Iqamah Schedule */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 12,
          padding: 24,
          border: '1px solid #E5E7EB',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div>
            <span
              style={{
                fontSize: 11,
                fontWeight: 800,
                color: '#15803D',
                letterSpacing: 1,
                textTransform: 'uppercase',
              }}
            >
              CONGREGATIONAL SYNC
            </span>
            <h3 style={{ fontSize: 17, fontWeight: 800, color: '#1B4332', margin: '2px 0 0' }}>
              🕌 {mosqueSettings.name}
            </h3>
          </div>
          <button
            onClick={onOpenMosqueModal}
            style={{
              fontSize: 12,
              backgroundColor: '#ECFDF5',
              color: '#065F46',
              border: '1px solid #A7F3D0',
              padding: '6px 12px',
              borderRadius: 8,
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <span>✏️</span>
            <span>{t('Customize Mosque', 'مسجد کی ترتیبات')}</span>
          </button>
        </div>

        <p style={{ fontSize: 13, color: '#4B5563', margin: '0 0 16px' }}>
          Real-life Jama'at & Iqamah times calibrated to your Mohalla mosque:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {mosquePrayerList.map((item, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 12px',
                borderRadius: 8,
                backgroundColor: '#F9FAFB',
                border: '1px solid #F3F4F6',
                fontSize: 13,
              }}
            >
              <span style={{ fontWeight: 700, color: '#111827' }}>{item.prayer}</span>
              <div style={{ display: 'flex', gap: 14, color: '#4B5563', alignItems: 'center' }}>
                <span style={{ fontSize: 12 }}>
                  Adhan: <strong>{item.adhanTime}</strong>
                </span>
                <span style={{ color: '#047857', fontWeight: 700 }}>
                  Iqamah: <strong>{item.iqamahTime}</strong>
                  <span style={{ fontSize: 10, color: '#6B7280', marginLeft: 4 }}>({item.offset})</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Janazah Announcements */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 12,
          padding: 24,
          border: '1px solid #E5E7EB',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div>
            <span
              style={{
                fontSize: 11,
                fontWeight: 800,
                color: '#92400E',
                letterSpacing: 1,
                textTransform: 'uppercase',
              }}
            >
              FARD KIFAYAH NOTICE
            </span>
            <h3 style={{ fontSize: 17, fontWeight: 800, color: '#92400E', margin: '2px 0 0' }}>
              🕊️ Community Janazah Notices
            </h3>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {syncSchedule.janazahAlerts.map((notice, idx) => (
            <div
              key={idx}
              style={{
                padding: 14,
                borderRadius: 10,
                backgroundColor: '#FFFBEB',
                border: '1px solid #FDE68A',
              }}
            >
              <div style={{ fontWeight: 800, color: '#92400E', fontSize: 14 }}>
                {notice.title}
              </div>
              <div style={{ fontSize: 12, color: '#78350F', marginTop: 4, lineHeight: 1.5 }}>
                📍 <strong>Location:</strong> {notice.details} <br />
                ⏰ <strong>Time:</strong> {notice.time || notice.date}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
