import React, { useState, useEffect, useMemo } from 'react';
import { DailyMamoolEngine, DailyMamool, prayerQiblaEngine } from '@amal/amal-engine';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import { useLanguage } from '../context/LanguageContext';
import { getLiveNextPrayer, getSavedLocation, formatCountdown } from '../lib/prayer-utils';
import { MamoolPrayerAuqatStrip } from './mamool/MamoolPrayerAuqatStrip';
import { MamoolThreeEssentialsGrid } from './mamool/MamoolThreeEssentialsGrid';

const PRAYER_NAMES_URDU: Record<string, string> = {
  Fajr: 'نمازِ فجر',
  Dhuhr: 'نمازِ ظہر',
  Asr: 'نمازِ عصر',
  Maghrib: 'نمازِ مغرب',
  Isha: 'نمازِ عشاء',
  Sunrise: 'طلوعِ آفتاب',
};

type MamoolSlotType = 'AUTO' | 'FAJR' | 'CHASHT' | 'DHUHR' | 'ASR' | 'MAGHRIB' | 'ISHA_NIGHT' | 'JUMUAH';

interface SlotTabDef {
  id: MamoolSlotType;
  labelUrdu: string;
  labelEnglish: string;
  icon: string;
}

const PRAYER_SLOTS: SlotTabDef[] = [
  { id: 'AUTO', labelUrdu: 'لائیو وقت', labelEnglish: 'Live Auto', icon: '🟢' },
  { id: 'FAJR', labelUrdu: 'فجر و اشراق', labelEnglish: 'Fajr', icon: '🌅' },
  { id: 'CHASHT', labelUrdu: 'چاشت', labelEnglish: 'Chasht', icon: '☀️' },
  { id: 'DHUHR', labelUrdu: 'ظہر', labelEnglish: 'Dhuhr', icon: '☀️' },
  { id: 'ASR', labelUrdu: 'عصر', labelEnglish: 'Asr', icon: '🌤️' },
  { id: 'MAGHRIB', labelUrdu: 'مغرب', labelEnglish: 'Maghrib', icon: '🌇' },
  { id: 'ISHA_NIGHT', labelUrdu: 'عشاء و رات', labelEnglish: 'Isha', icon: '🌙' },
  { id: 'JUMUAH', labelUrdu: 'جمعۃ المبارک', labelEnglish: 'Jumu\'ah', icon: '🕌' },
];

export const DailyMamoolBar: React.FC = () => {
  const [selectedSlot, setSelectedSlot] = useState<MamoolSlotType>('AUTO');
  const [microAmalDone, setMicroAmalDone] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { playTrack } = useAudioPlayer();
  const { isUrdu } = useLanguage();
  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
      const todayKey = `amal_micro_done_${new Date().toISOString().split('T')[0]}`;
      setMicroAmalDone(localStorage.getItem(todayKey) === 'true');
    }
  }, []);

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

  // Compute active mamool based on user selection or auto live hour
  const mamool = useMemo<DailyMamool>(() => {
    if (selectedSlot === 'AUTO') {
      return DailyMamoolEngine.getMamool(now.getHours());
    }
    return DailyMamoolEngine.getMamool(now.getHours(), selectedSlot);
  }, [selectedSlot, now]);

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
      id: `dua-${mamool.currentSlotNameEnglish}-${mamool.featuredDua.source}`,
      title: isUrdu ? mamool.featuredDua.titleUrdu : mamool.featuredDua.titleEnglish,
      subtitle: `${mamool.featuredDua.source} • ${isUrdu ? mamool.featuredDua.translationUrdu : mamool.featuredDua.translationEnglish}`,
      audioUrl: mamool.featuredDua.audioUrl,
      reciter: 'Qari Mahmood Khalil Al-Husary',
      arabicSnippet: mamool.featuredDua.arabicText,
      lang: 'ar',
    });
  };

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
      {/* Prayer Times Strip */}
      <MamoolPrayerAuqatStrip
        isUrdu={isUrdu}
        mamool={mamool}
        targetPrayerNameUrdu={targetPrayerNameUrdu}
        livePrayerInfo={livePrayerInfo}
        formattedCountdown={formattedCountdown}
        fullPrayerTimes={fullPrayerTimes}
      />

      {/* Interactive Prayer Slot / Window Selector */}
      <div style={{ marginTop: 16, marginBottom: 4 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, flexWrap: 'wrap', gap: 6 }}>
          <span style={{ fontSize: 11, fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: 0.8 }}>
            {isUrdu ? 'وقت کا انتخاب فرمائیں (تمام اوقات کے اعمال و دعائیں دیکھیں):' : 'Select Prayer Slot (Preview All Hours):'}
          </span>
          {selectedSlot !== 'AUTO' && (
            <button
              onClick={() => setSelectedSlot('AUTO')}
              style={{
                fontSize: 11,
                color: '#059669',
                backgroundColor: '#ECFDF5',
                border: '1px solid #A7F3D0',
                padding: '2px 8px',
                borderRadius: 6,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              {isUrdu ? '↺ واپس لائیو وقت پر جائیں' : '↺ Reset to Live Auto'}
            </button>
          )}
        </div>

        <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 6 }}>
          {PRAYER_SLOTS.map((s) => {
            const isSelected = selectedSlot === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setSelectedSlot(s.id)}
                style={{
                  padding: '6px 12px',
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: isSelected ? 800 : 600,
                  backgroundColor: isSelected ? '#1B4332' : '#F1F5F9',
                  color: isSelected ? '#FFFFFF' : '#334155',
                  border: isSelected ? '1px solid #1B4332' : '1px solid #E2E8F0',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                  transition: 'all 0.15s ease-in-out',
                }}
              >
                <span>{s.icon}</span>
                <span>{isUrdu ? s.labelUrdu : s.labelEnglish}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3 Essentials Grid (Waqt Ka Amal, 1-Min Micro-Amal, Daily Invocation) */}
      <MamoolThreeEssentialsGrid
        isUrdu={isUrdu}
        mamool={mamool}
        microAmalDone={microAmalDone}
        onToggleMicroAmal={toggleMicroAmal}
        onPlayDua={handlePlayDua}
      />
    </section>
  );
};
