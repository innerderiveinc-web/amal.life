import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { DailyMamoolEngine, DailyMamool, prayerQiblaEngine } from '@amal/amal-engine';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import { AmalTheme } from '@amal/ui';
import { getLiveNextPrayer, getSavedLocation, formatCountdown } from '../lib/prayer-utils';

const PRAYER_NAMES_URDU: Record<string, string> = {
  Fajr: 'نمازِ فجر',
  Dhuhr: 'نمازِ ظہر',
  Asr: 'نمازِ عصر',
  Maghrib: 'نمازِ مغرب',
  Isha: 'نمازِ عشاء',
  Sunrise: 'طلوعِ آفتاب',
};

export const DailyMamoolBar: React.FC = () => {
  const [mamool, setMamool] = useState<DailyMamool | null>(() => DailyMamoolEngine.getMamool());
  const [microAmalDone, setMicroAmalDone] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { playTrack } = useAudioPlayer();

  useEffect(() => {
    setIsMounted(true);
    const data = DailyMamoolEngine.getMamool();
    setMamool(data);

    if (typeof window !== 'undefined') {
      const todayKey = `amal_micro_done_${new Date().toISOString().split('T')[0]}`;
      setMicroAmalDone(localStorage.getItem(todayKey) === 'true');
    }
  }, []);

  const toggleMicroAmal = () => {
    const next = !microAmalDone;
    setMicroAmalDone(next);
    if (typeof window !== 'undefined') {
      const todayKey = `amal_micro_done_${new Date().toISOString().split('T')[0]}`;
      localStorage.setItem(todayKey, next ? 'true' : 'false');
    }
  };

  const handlePlayDua = () => {
    if (!mamool) return;
    playTrack({
      id: `dua-${mamool.nextPrayerName}`,
      title: mamool.featuredDua.titleUrdu,
      subtitle: mamool.featuredDua.titleEnglish,
      audioUrl: mamool.featuredDua.audioUrl,
      reciter: 'Masnoon Supplication',
      arabicSnippet: mamool.featuredDua.arabicText,
    });
  };

  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    setNow(new Date());
    const interval = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const fullPrayerTimes = useMemo(() => {
    try {
      const loc = getSavedLocation();
      return prayerQiblaEngine.calculatePrayerTimes({ latitude: loc.lat, longitude: loc.lon }, now, 'HANAFI', 'KARACHI');
    } catch {
      return null;
    }
  }, [now]);

  const livePrayerInfo = useMemo(() => {
    if (!fullPrayerTimes) return null;
    try {
      return getLiveNextPrayer(fullPrayerTimes, now);
    } catch {
      return null;
    }
  }, [fullPrayerTimes, now]);

  if (!mamool) return null;

  const fallbackPrayerUrdu = PRAYER_NAMES_URDU[mamool.nextPrayerName] || mamool.nextPrayerName;
  const targetPrayerNameUrdu = livePrayerInfo?.fullNameUrdu || fallbackPrayerUrdu;
  const formattedCountdown = livePrayerInfo
    ? { urdu: livePrayerInfo.formattedCountdownUrdu, english: livePrayerInfo.formattedCountdownEnglish }
    : formatCountdown(mamool.minutesToNextPrayer);

  return (
    <section
      suppressHydrationWarning
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        border: '1px solid rgba(226, 232, 240, 0.85)',
        padding: '22px 26px',
        marginBottom: 24,
        boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.04), 0 2px 6px -1px rgba(0, 0, 0, 0.02)',
      }}
    >
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
                آج کا معمول و اوقاتِ عبادت
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
                Daily Routine
              </span>
            </div>
            <div suppressHydrationWarning style={{ fontSize: 13, color: '#64748B', marginTop: 2 }}>
              {mamool.currentSlotNameUrdu} · {mamool.currentSlotNameEnglish}
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
          <span dir="rtl" suppressHydrationWarning style={{ fontFamily: 'var(--font-sans), sans-serif' }}>
            <bdi suppressHydrationWarning style={{ fontWeight: 800, color: '#064E3B' }}>{targetPrayerNameUrdu}</bdi> میں تقریباً {formattedCountdown.urdu} باقی ہیں
          </span>
          <span
            suppressHydrationWarning
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: '#047857',
              borderLeft: '1px solid #86EFAC',
              paddingLeft: 8,
              marginLeft: 2,
            }}
          >
            {formattedCountdown.english}
          </span>
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 700, color: '#475569' }}>
            <span>🕌</span>
            <span>پانچوں نمازوں کے اوقات (Daily Auqat-e-Namaz):</span>
          </div>

          <div suppressHydrationWarning style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
            {[
              { key: 'fajr', label: 'فجر (Fajr)', time: fullPrayerTimes.fajr },
              { key: 'sunrise', label: 'طلوع (Sunrise)', time: fullPrayerTimes.sunrise },
              { key: 'dhuhr', label: 'ظہر (Dhuhr)', time: fullPrayerTimes.dhuhr },
              { key: 'asr', label: 'عصر (Asr)', time: fullPrayerTimes.asr },
              { key: 'maghrib', label: 'مغرب (Maghrib)', time: fullPrayerTimes.maghrib },
              { key: 'isha', label: 'عشاء (Isha)', time: fullPrayerTimes.isha },
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
                  <span suppressHydrationWarning>{p.label}</span>
                  <span suppressHydrationWarning style={{ fontWeight: 800, color: isNext ? '#047857' : '#0F172A' }}>{p.time}</span>
                  {isNext && (
                    <span suppressHydrationWarning style={{ fontSize: 9, backgroundColor: '#059669', color: '#FFF', padding: '1px 5px', borderRadius: 4, fontWeight: 800 }}>
                      اگلی
                    </span>
                  )}
                </div>
              );
            })}

            <Link
              href="/prayer"
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: '#059669',
                textDecoration: 'none',
                marginLeft: 4,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 2,
              }}
            >
              تفصیل و قبلہ ➔
            </Link>
          </div>
        </div>
      )}

      {/* Grid of 3 Essentials: Waqt Ka Amal | 1-Min Micro-Amal | 1-Tap Dua */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 16,
          marginTop: 18,
        }}
      >
        {/* 1. Waqt Ka Masnoon Amal */}
        <div
          className="amal-card-hover"
          style={{
            backgroundColor: '#F8FAFC',
            borderRadius: 14,
            padding: '16px 18px',
            border: '1px solid #E2E8F0',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 8 }}>
              <span style={{ fontSize: 16 }}>📖</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#0284C7', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                مسنون عمل · Sunnah of the Hour
              </span>
            </div>
            <div style={{ fontSize: 15, fontWeight: 800, color: '#0F172A', marginBottom: 6, lineHeight: 1.4 }}>
              {mamool.masnoonAmal.titleUrdu}
            </div>
            <div style={{ fontSize: 13, color: '#475569', lineHeight: 1.6 }}>
              {mamool.masnoonAmal.descriptionUrdu}
            </div>
          </div>
          <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 12, paddingTop: 8, borderTop: '1px solid #EDF2F7', fontWeight: 600 }}>
            سند: {mamool.masnoonAmal.primarySource}
          </div>
        </div>

        {/* 2. 1-Minute Micro-Amal */}
        <div
          className="amal-card-hover"
          style={{
            backgroundColor: microAmalDone ? '#F0FDF4' : '#F8FAFC',
            borderRadius: 14,
            padding: '16px 18px',
            border: microAmalDone ? '1px solid #86EFAC' : '1px solid #E2E8F0',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            transition: 'all 0.25s ease',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <span style={{ fontSize: 16 }}>🌱</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#16A34A', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  ۱ منٹ کا عمل · Micro-Amal
                </span>
              </div>
              <button
                onClick={toggleMicroAmal}
                style={{
                  backgroundColor: microAmalDone ? '#16A34A' : '#E2E8F0',
                  color: microAmalDone ? '#FFFFFF' : '#334155',
                  border: 'none',
                  borderRadius: 20,
                  padding: '4px 12px',
                  fontSize: 11,
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: microAmalDone ? '0 2px 5px rgba(22, 163, 74, 0.3)' : 'none',
                }}
              >
                {microAmalDone ? '✓ مکمل ہوا' : 'مکمل کریں'}
              </button>
            </div>
            <div style={{ fontSize: 15, fontWeight: 800, color: '#0F172A', marginBottom: 6, lineHeight: 1.4 }}>
              {mamool.microAmalOfTheDay.titleUrdu}
            </div>
            <div style={{ fontSize: 13, color: '#475569', lineHeight: 1.6 }}>
              {mamool.microAmalOfTheDay.actionUrdu}
            </div>
          </div>
          <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 12, paddingTop: 8, borderTop: '1px solid #EDF2F7', fontWeight: 600 }}>
            اجر: {mamool.microAmalOfTheDay.hadithProof}
          </div>
        </div>

        {/* 3. 1-Tap Masnoon Audio Du'a */}
        <div
          className="amal-card-hover"
          style={{
            backgroundColor: '#F8FAFC',
            borderRadius: 14,
            padding: '16px 18px',
            border: '1px solid #E2E8F0',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 8 }}>
              <span style={{ fontSize: 16 }}>🤲</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#7C3AED', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                مسنون دعا · Daily Invocations
              </span>
            </div>
            <div style={{ fontSize: 15, fontWeight: 800, color: '#0F172A', marginBottom: 6 }}>
              {mamool.featuredDua.titleUrdu}
            </div>
            <div
              className="font-arabic"
              style={{
                fontSize: 14,
                color: '#064E3B',
                marginBottom: 8,
                backgroundColor: '#F1F5F9',
                padding: '8px 12px',
                borderRadius: 8,
                border: '1px solid #E2E8F0',
                lineHeight: 1.8,
              }}
            >
              {mamool.featuredDua.arabicText.slice(0, 70)}...
            </div>
          </div>

          <button
            onClick={handlePlayDua}
            style={{
              backgroundColor: '#064E3B',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: 10,
              padding: '9px 14px',
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              boxShadow: '0 2px 6px rgba(6, 78, 59, 0.2)',
            }}
          >
            <span>▶</span>
            <span>دعا کی تلاوت سنیں · Listen</span>
          </button>
        </div>
      </div>
    </section>
  );
};
