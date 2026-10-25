import React, { useState, useEffect } from 'react';
import { DailyKnowledgeEngine, DailyKnowledgeBroadcast } from '@amal/amal-engine';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import { useLanguage } from '../context/LanguageContext';
import { BroadcastAyahTab } from './broadcast/BroadcastAyahTab';
import { BroadcastHadithTab } from './broadcast/BroadcastHadithTab';
import { BroadcastDuaTab } from './broadcast/BroadcastDuaTab';
import { BroadcastHikmatTab } from './broadcast/BroadcastHikmatTab';

export const DailyKnowledgeBroadcastCard: React.FC = () => {
  const { t } = useLanguage();
  const [broadcast, setBroadcast] = useState<DailyKnowledgeBroadcast | null>(() =>
    DailyKnowledgeEngine.getBroadcast()
  );
  const [activeTab, setActiveTab] = useState<'AYAH' | 'HADITH' | 'DUA' | 'HIKMAT'>('AYAH');
  const [copied, setCopied] = useState(false);
  const { playTrack } = useAudioPlayer();

  const handlePlayAyah = () => {
    if (!broadcast) return;
    const surahPad = String(broadcast.ayah.surahNumber).padStart(3, '0');
    const ayahPad = String(broadcast.ayah.ayahNumber).padStart(3, '0');
    const audioUrl = `https://everyayah.com/data/Husary_128kbps/${surahPad}${ayahPad}.mp3`;
    playTrack({
      id: `ayah-${broadcast.ayah.surahNumber}-${broadcast.ayah.ayahNumber}`,
      title: `${broadcast.ayah.surahNameUrdu} (${broadcast.ayah.surahNumber}:${broadcast.ayah.ayahNumber})`,
      subtitle: broadcast.ayah.spiritualTheme,
      audioUrl,
      reciter: 'Shaykh Mahmoud Khalil Al-Husary',
      arabicSnippet: broadcast.ayah.arabicText,
    });
  };

  const handlePlayDua = () => {
    if (!broadcast) return;
    const duaAudioUrl = 'https://everyayah.com/data/Husary_128kbps/002201.mp3';
    playTrack({
      id: `dua-${broadcast.dua.titleEnglish}`,
      title: broadcast.dua.titleUrdu,
      subtitle: broadcast.dua.titleEnglish,
      audioUrl: duaAudioUrl,
      reciter: 'Masnoon Supplication',
      arabicSnippet: broadcast.dua.arabicText,
    });
  };

  useEffect(() => {
    setBroadcast(DailyKnowledgeEngine.getBroadcast());
    const interval = setInterval(() => {
      setBroadcast(DailyKnowledgeEngine.getBroadcast());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!broadcast) return null;

  const handleCopy = (text: string) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        border: '1px solid #E2E8F0',
        padding: '24px 28px',
        marginBottom: 24,
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
      }}
    >
      {/* Top Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12,
          marginBottom: 18,
          borderBottom: '1px solid #F1F5F9',
          paddingBottom: 14,
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 22 }}>✨</span>
            <span
              style={{
                fontSize: 11,
                fontWeight: 800,
                color: '#059669',
                letterSpacing: 1.2,
                textTransform: 'uppercase',
              }}
            >
              AUTOMATED CLASSICAL KNOWLEDGE BROADCAST
            </span>
            {broadcast.isFriday && (
              <span
                style={{
                  fontSize: 11,
                  backgroundColor: '#DCFCE7',
                  color: '#166534',
                  padding: '2px 8px',
                  borderRadius: 12,
                  fontWeight: 700,
                }}
              >
                {t('🕌 Blessed Friday', '🕌 جمعۃ المبارک')}
              </span>
            )}
          </div>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: '#1E293B', margin: '4px 0 0' }}>
            {t('Daily Deen Knowledge Stream', 'روزانہ نشریۂ نورِ علم و عمل')}
          </h2>
        </div>

        {/* Slot Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            backgroundColor: '#F8FAFC',
            padding: '6px 12px',
            borderRadius: 8,
            border: '1px solid #E2E8F0',
            fontSize: 12,
            color: '#475569',
          }}
        >
          <span>{t('🕒 Window:', '🕒 وقت:')}</span>
          <strong style={{ color: '#065F46' }}>
            {broadcast.activeTimeSlot === 'FAJR'
              ? t('Fajr / Dawn', 'صبح فجر')
              : broadcast.activeTimeSlot === 'CHASHT'
              ? t('Chasht / Forenoon', 'چاشت')
              : broadcast.activeTimeSlot === 'DHUHR'
              ? t('Dhuhr / Midday', 'ظہر')
              : broadcast.activeTimeSlot === 'ASR'
              ? t('Asr / Afternoon', 'عصر')
              : broadcast.activeTimeSlot === 'MAGHRIB'
              ? t('Maghrib / Sunset', 'مغرب')
              : t('Isha & Night', 'عشاء و رات')}
          </strong>
          <span>• {t(`Day ${broadcast.dayOfYear}`, `دن ${broadcast.dayOfYear}`)}</span>
        </div>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: 'flex',
          gap: 8,
          marginBottom: 20,
          flexWrap: 'wrap',
          borderBottom: '1px solid #E2E8F0',
          paddingBottom: 10,
        }}
      >
        <button
          onClick={() => setActiveTab('AYAH')}
          style={{
            padding: '8px 16px',
            borderRadius: 8,
            border: activeTab === 'AYAH' ? '2px solid #059669' : '1px solid #E2E8F0',
            backgroundColor: activeTab === 'AYAH' ? '#ECFDF5' : '#F8FAFC',
            color: activeTab === 'AYAH' ? '#065F46' : '#64748B',
            fontWeight: 700,
            fontSize: 13,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <span>📖</span>
          <span>{t('Quranic Verse', 'آیتِ مبارکہ (کنز الایمان)')}</span>
        </button>

        <button
          onClick={() => setActiveTab('HADITH')}
          style={{
            padding: '8px 16px',
            borderRadius: 8,
            border: activeTab === 'HADITH' ? '2px solid #059669' : '1px solid #E2E8F0',
            backgroundColor: activeTab === 'HADITH' ? '#ECFDF5' : '#F8FAFC',
            color: activeTab === 'HADITH' ? '#065F46' : '#64748B',
            fontWeight: 700,
            fontSize: 13,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <span>📜</span>
          <span>{t('Prophetic Hadith', 'حدیثِ نبوی ﷺ (نووی و شمائل)')}</span>
        </button>

        <button
          onClick={() => setActiveTab('DUA')}
          style={{
            padding: '8px 16px',
            borderRadius: 8,
            border: activeTab === 'DUA' ? '2px solid #059669' : '1px solid #E2E8F0',
            backgroundColor: activeTab === 'DUA' ? '#ECFDF5' : '#F8FAFC',
            color: activeTab === 'DUA' ? '#065F46' : '#64748B',
            fontWeight: 700,
            fontSize: 13,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <span>🤲</span>
          <span>{t('Prophetic Dua', 'مسنون و ربانی دعا (حصن المسلم)')}</span>
        </button>

        <button
          onClick={() => setActiveTab('HIKMAT')}
          style={{
            padding: '8px 16px',
            borderRadius: 8,
            border: activeTab === 'HIKMAT' ? '2px solid #059669' : '1px solid #E2E8F0',
            backgroundColor: activeTab === 'HIKMAT' ? '#ECFDF5' : '#F8FAFC',
            color: activeTab === 'HIKMAT' ? '#065F46' : '#64748B',
            fontWeight: 700,
            fontSize: 13,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <span>💎</span>
          <span>{t('Spiritual Wisdom', 'تزکیہ و حکمت (امام غزالی و سعدی)')}</span>
        </button>
      </div>

      {/* Tab 1: AYAH */}
      {activeTab === 'AYAH' && (
        <BroadcastAyahTab
          ayah={broadcast.ayah}
          copied={copied}
          onCopy={handleCopy}
          onPlayAyah={handlePlayAyah}
        />
      )}

      {/* Tab 2: HADITH */}
      {activeTab === 'HADITH' && (
        <BroadcastHadithTab
          hadith={broadcast.hadith}
          copied={copied}
          onCopy={handleCopy}
        />
      )}

      {/* Tab 3: DUA */}
      {activeTab === 'DUA' && (
        <BroadcastDuaTab
          dua={broadcast.dua}
          copied={copied}
          onCopy={handleCopy}
          onPlayDua={handlePlayDua}
        />
      )}

      {/* Tab 4: HIKMAT */}
      {activeTab === 'HIKMAT' && (
        <BroadcastHikmatTab
          hikmat={broadcast.hikmat}
          copied={copied}
          onCopy={handleCopy}
        />
      )}
    </section>
  );
};
