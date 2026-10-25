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

export const DailyMamoolBar: React.FC = () => {
  const [mamool, setMamool] = useState<DailyMamool | null>(() => DailyMamoolEngine.getMamool());
  const [microAmalDone, setMicroAmalDone] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { playTrack } = useAudioPlayer();
  const { isUrdu } = useLanguage();
  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    setIsMounted(true);
    const data = DailyMamoolEngine.getMamool();
    setMamool(data);

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
      title: isUrdu ? mamool.featuredDua.titleUrdu : mamool.featuredDua.titleEnglish,
      subtitle: isUrdu ? mamool.featuredDua.titleEnglish : mamool.featuredDua.translationEnglish,
      audioUrl: mamool.featuredDua.audioUrl,
      reciter: 'Masnoon Supplication',
      arabicSnippet: mamool.featuredDua.arabicText,
    });
  };

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
      <MamoolPrayerAuqatStrip
        isUrdu={isUrdu}
        mamool={mamool}
        targetPrayerNameUrdu={targetPrayerNameUrdu}
        livePrayerInfo={livePrayerInfo}
        formattedCountdown={formattedCountdown}
        fullPrayerTimes={fullPrayerTimes}
      />

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
