import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { DailyMamool } from '@amal/amal-engine';
import { GLOBAL_CITIES } from '../../lib/global-locations';
import { getSavedLocation, saveUserLocation } from '../../lib/prayer-utils';

export interface PrayerTimeSlotItem {
  key: string;
  labelEn: string;
  labelUr: string;
  time: string;
}

export interface MamoolPrayerAuqatStripProps {
  isUrdu: boolean;
  mamool: DailyMamool;
  targetPrayerNameUrdu: string;
  livePrayerInfo: {
    key: string;
    nameEnglish: string;
    fullNameUrdu: string;
    formattedCountdownUrdu: string;
    formattedCountdownEnglish: string;
  } | null;
  formattedCountdown: {
    urdu: string;
    english: string;
  };
  fullPrayerTimes: {
    fajr: string;
    sunrise: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
  } | null;
}

export const MamoolPrayerAuqatStrip: React.FC<MamoolPrayerAuqatStripProps> = ({
  isUrdu,
  mamool,
  targetPrayerNameUrdu,
  livePrayerInfo,
  formattedCountdown,
  fullPrayerTimes,
}) => {
  const [currentCityName, setCurrentCityName] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loc = getSavedLocation();
      setCurrentCityName(loc.name);
    }
  }, []);

  const handleCitySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cityName = e.target.value;
    const found = GLOBAL_CITIES.find((c) => c.name === cityName);
    if (found) {
      const fullName = `${found.name}, ${found.country}`;
      setCurrentCityName(fullName);
      saveUserLocation({
        lat: found.lat,
        lon: found.lon,
        name: fullName,
        city: found.name,
        country: found.country,
      });
    }
  };
  return (
    <>
      {/* Top Banner: Time Slot & Countdown */}
      <div
        suppressHydrationWarning
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12,
          paddingBottom: 16,
          borderBottom: '1px solid #F1F5F9',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              backgroundColor: '#ECFDF5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 20,
              color: '#065F46',
            }}
          >
            ⚡
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <h2 style={{ fontSize: 17, fontWeight: 800, color: '#0F172A', margin: 0, letterSpacing: -0.2 }}>
                {isUrdu ? 'آج کا معمول و اوقاتِ عبادت' : 'Daily Worship & Prayer Routine'}
              </h2>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: '#047857',
                  backgroundColor: '#E8F5E9',
                  padding: '2px 8px',
                  borderRadius: 20,
                }}
              >
                {isUrdu ? 'روزمرہ معمول' : 'Daily Routine'}
              </span>
            </div>
            <div suppressHydrationWarning style={{ fontSize: 13, color: '#64748B', marginTop: 2 }}>
              {isUrdu ? mamool.currentSlotNameUrdu : mamool.currentSlotNameEnglish}
            </div>
          </div>
        </div>

        {/* Countdown Badge */}
        <div
          suppressHydrationWarning
          style={{
            backgroundColor: '#F0FDF4',
            border: '1px solid #BBF7D0',
            color: '#065F46',
            padding: '7px 16px',
            borderRadius: 30,
            fontSize: 13,
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span style={{ fontSize: 14 }}>⏳</span>
          {isUrdu ? (
            <span dir="rtl" suppressHydrationWarning style={{ fontFamily: 'var(--font-sans), sans-serif' }}>
              <bdi suppressHydrationWarning style={{ fontWeight: 800, color: '#064E3B' }}>{targetPrayerNameUrdu}</bdi> میں تقریباً {formattedCountdown.urdu} باقی ہیں
            </span>
          ) : (
            <span suppressHydrationWarning>
              Next: <strong style={{ color: '#064E3B' }}>{livePrayerInfo?.nameEnglish || mamool.nextPrayerName}</strong> in {formattedCountdown.english}
            </span>
          )}
        </div>
      </div>

      {/* 5-Prayer Full Auqat Strip */}
      {fullPrayerTimes && (
        <div
          suppressHydrationWarning
          style={{
            marginTop: 14,
            padding: '10px 14px',
            backgroundColor: '#F8FAFC',
            borderRadius: 12,
            border: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 8,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 700, color: '#475569' }}>
              <span>🕌</span>
              <span>{isUrdu ? 'پانچوں نمازوں کے اوقات:' : 'Prayer Times:'}</span>
            </div>

            {/* 1-Tap Travel City Selector Dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ fontSize: 12 }}>📍</span>
              <select
                aria-label="Select City for Prayer Times"
                value={GLOBAL_CITIES.find((c) => currentCityName.includes(c.name))?.name || GLOBAL_CITIES[0]?.name}
                onChange={handleCitySelect}
                style={{
                  fontSize: 11.5,
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: 6,
                  border: '1px solid #CBD5E1',
                  backgroundColor: '#FFFFFF',
                  color: '#0F172A',
                  cursor: 'pointer',
                  outline: 'none',
                }}
              >
                {GLOBAL_CITIES.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name} ({c.country})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div suppressHydrationWarning style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
            {[
              { key: 'fajr', labelEn: 'Fajr', labelUr: 'فجر', time: fullPrayerTimes.fajr },
              { key: 'sunrise', labelEn: 'Sunrise', labelUr: 'طلوع', time: fullPrayerTimes.sunrise },
              { key: 'dhuhr', labelEn: 'Dhuhr', labelUr: 'ظہر', time: fullPrayerTimes.dhuhr },
              { key: 'asr', labelEn: 'Asr', labelUr: 'عصر', time: fullPrayerTimes.asr },
              { key: 'maghrib', labelEn: 'Maghrib', labelUr: 'مغرب', time: fullPrayerTimes.maghrib },
              { key: 'isha', labelEn: 'Isha', labelUr: 'عشاء', time: fullPrayerTimes.isha },
            ].map((p) => {
              const isNext = livePrayerInfo?.key === p.key;
              return (
                <div
                  key={p.key}
                  suppressHydrationWarning
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 5,
                    padding: '4px 10px',
                    borderRadius: 8,
                    fontSize: 12,
                    fontWeight: isNext ? 800 : 600,
                    backgroundColor: isNext ? '#ECFDF5' : '#FFFFFF',
                    color: isNext ? '#065F46' : '#334155',
                    border: isNext ? '1.5px solid #10B981' : '1px solid #E2E8F0',
                    boxShadow: isNext ? '0 2px 6px rgba(16, 185, 129, 0.15)' : 'none',
                  }}
                >
                  <span suppressHydrationWarning>{isUrdu ? p.labelUr : p.labelEn}</span>
                  <span suppressHydrationWarning style={{ fontWeight: 800, color: isNext ? '#047857' : '#0F172A' }}>{p.time}</span>
                  {isNext && (
                    <span suppressHydrationWarning style={{ fontSize: 9, backgroundColor: '#059669', color: '#FFF', padding: '1px 5px', borderRadius: 4, fontWeight: 800 }}>
                      {isUrdu ? 'اگلی' : 'NEXT'}
                    </span>
                  )}
                </div>
              );
            })}

            <Link
              href="/adhkar"
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: '#92400E',
                backgroundColor: '#FEF3C7',
                border: '1px solid #FDE68A',
                padding: '3px 8px',
                borderRadius: 6,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
              }}
              title={isUrdu ? 'صبح و شام کے مسنون اذکار' : 'Morning & Evening Sunnah Adhkar'}
            >
              <span>🌅</span>
              <span>{isUrdu ? 'مسنون اذکار' : 'Daily Adhkar'}</span>
            </Link>

            <Link
              href="/prayer"
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: '#059669',
                backgroundColor: '#ECFDF5',
                border: '1px solid #A7F3D0',
                padding: '3px 8px',
                borderRadius: 6,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
              }}
              title={isUrdu ? 'تفصیلات، تہجد کیلکولیٹر و قبلہ کمپاس' : 'Qibla Compass & Full Schedule'}
            >
              <span>🕋</span>
              <span>{isUrdu ? 'تفصیل و قبلہ ➔' : 'Qibla & Times ➔'}</span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
