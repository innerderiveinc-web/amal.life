import React, { useState, useEffect, useRef } from 'react';
import { DailyKnowledgeEngine, DailyKnowledgeBroadcast } from '@amal/amal-engine';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import { useLanguage } from '../context/LanguageContext';
import { BroadcastAyahTab } from './broadcast/BroadcastAyahTab';
import { BroadcastHadithTab } from './broadcast/BroadcastHadithTab';
import { BroadcastDuaTab } from './broadcast/BroadcastDuaTab';
import { BroadcastHikmatTab } from './broadcast/BroadcastHikmatTab';
import {
  UniversalContentShareModal,
  UniversalCardPayload,
} from './cards/UniversalContentShareModal';

type KnowledgeTabType = 'AYAH' | 'HADITH' | 'DUA' | 'HIKMAT';
type SlotFilterType = 'AUTO' | 'FAJR' | 'CHASHT' | 'DHUHR' | 'ASR' | 'MAGHRIB' | 'ISHA_NIGHT';

const CAROUSEL_SLIDES: KnowledgeTabType[] = ['AYAH', 'HADITH', 'DUA', 'HIKMAT'];

export const DailyKnowledgeBroadcastCard: React.FC = () => {
  const { t, isUrdu } = useLanguage();
  const [selectedSlotOverride, setSelectedSlotOverride] = useState<SlotFilterType>('AUTO');
  const [broadcast, setBroadcast] = useState<DailyKnowledgeBroadcast | null>(() =>
    DailyKnowledgeEngine.getBroadcast()
  );
  const [activeTab, setActiveTab] = useState<KnowledgeTabType>('AYAH');
  const [copied, setCopied] = useState(false);
  const [isAutoPlayActive, setIsAutoPlayActive] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [sharePayload, setSharePayload] = useState<UniversalCardPayload | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const { playTrack } = useAudioPlayer();

  // Refresh broadcast when time advances or slot changes
  useEffect(() => {
    const slotArg = selectedSlotOverride === 'AUTO' ? undefined : selectedSlotOverride;
    setBroadcast(DailyKnowledgeEngine.getBroadcast(new Date(), slotArg));
  }, [selectedSlotOverride]);

  useEffect(() => {
    const interval = setInterval(() => {
      const slotArg = selectedSlotOverride === 'AUTO' ? undefined : selectedSlotOverride;
      setBroadcast(DailyKnowledgeEngine.getBroadcast(new Date(), slotArg));
    }, 60000);
    return () => clearInterval(interval);
  }, [selectedSlotOverride]);

  // Smooth Auto-Play Carousel (8 seconds per slide, paused on hover or manual pause)
  useEffect(() => {
    if (!isAutoPlayActive || isHovered) return;
    const timer = setInterval(() => {
      setActiveTab((prev) => {
        const nextIndex = (CAROUSEL_SLIDES.indexOf(prev) + 1) % CAROUSEL_SLIDES.length;
        return CAROUSEL_SLIDES[nextIndex]!;
      });
    }, 8000);
    return () => clearInterval(timer);
  }, [isAutoPlayActive, isHovered]);

  const handlePrevSlide = () => {
    setActiveTab((prev) => {
      const currIndex = CAROUSEL_SLIDES.indexOf(prev);
      const prevIndex = (currIndex - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length;
      return CAROUSEL_SLIDES[prevIndex]!;
    });
  };

  const handleNextSlide = () => {
    setActiveTab((prev) => {
      const currIndex = CAROUSEL_SLIDES.indexOf(prev);
      const nextIndex = (currIndex + 1) % CAROUSEL_SLIDES.length;
      return CAROUSEL_SLIDES[nextIndex]!;
    });
  };

  if (!broadcast) return null;

  const handlePlayAyah = () => {
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
      lang: 'ar',
    });
  };

  const handlePlayDua = () => {
    const audioUrl = broadcast.dua.audioUrl || '';
    playTrack({
      id: `dua-${broadcast.dua.titleEnglish}`,
      title: broadcast.dua.titleUrdu,
      subtitle: `${broadcast.dua.sourceBook} • ${broadcast.dua.titleEnglish}`,
      audioUrl: audioUrl,
      reciter: audioUrl ? 'Shaykh Mahmoud Khalil Al-Husary' : 'Authentic Masnoon Voice',
      arabicSnippet: broadcast.dua.arabicText,
      lang: 'ar',
    });
  };

  const handleCopy = (text: string) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Social Media Card Handlers
  const handleMakeAyahCard = () => {
    setSharePayload({
      category: 'QURAN',
      categoryLabelUrdu: 'قرآنِ کریم (کنز الایمان)',
      categoryLabelEnglish: 'The Holy Quran',
      titleUrdu: `${broadcast.ayah.surahNameUrdu} (${broadcast.ayah.surahNumber}:${broadcast.ayah.ayahNumber})`,
      titleEnglish: `${broadcast.ayah.surahNameEnglish} ${broadcast.ayah.surahNumber}:${broadcast.ayah.ayahNumber}`,
      arabicText: broadcast.ayah.arabicText,
      primaryTextUrdu: broadcast.ayah.kanzAlImanUrdu,
      secondaryTextEnglish: broadcast.ayah.englishTranslation,
      sourceCitation: `سورۃ ${broadcast.ayah.surahNameUrdu} • ترجمہ کنز الایمان`,
      badgeContext: broadcast.ayah.spiritualTheme,
    });
    setIsShareModalOpen(true);
  };

  const handleMakeHadithCard = () => {
    setSharePayload({
      category: 'HADITH',
      categoryLabelUrdu: 'حدیثِ مصطفیٰ ﷺ',
      categoryLabelEnglish: 'Prophetic Hadith',
      titleUrdu: `اربعین نووی • حدیث ${broadcast.hadith.hadithNumber}`,
      titleEnglish: `40 Hadith Nawawi • Hadith ${broadcast.hadith.hadithNumber}`,
      arabicText: broadcast.hadith.arabicMatn,
      primaryTextUrdu: broadcast.hadith.urduTranslation,
      secondaryTextEnglish: broadcast.hadith.englishTranslation,
      sourceCitation: `${broadcast.hadith.sourceBook} • راوی: ${broadcast.hadith.narrator}`,
      badgeContext: `سنت پر عمل: ${broadcast.hadith.sunnahApplication}`,
    });
    setIsShareModalOpen(true);
  };

  const handleMakeDuaCard = () => {
    setSharePayload({
      category: 'DUA',
      categoryLabelUrdu: 'مسنون و قرآنی دعا',
      categoryLabelEnglish: 'Prophetic Dua',
      titleUrdu: broadcast.dua.titleUrdu,
      titleEnglish: broadcast.dua.titleEnglish,
      arabicText: broadcast.dua.arabicText,
      primaryTextUrdu: broadcast.dua.urduTranslation,
      secondaryTextEnglish: broadcast.dua.englishTranslation,
      sourceCitation: broadcast.dua.sourceBook,
      badgeContext: `فضیلت: ${broadcast.dua.virtue}`,
    });
    setIsShareModalOpen(true);
  };

  const handleMakeHikmatCard = () => {
    setSharePayload({
      category: 'TASAWWUF',
      categoryLabelUrdu: 'تزکیہ و حکمت',
      categoryLabelEnglish: 'Spiritual Wisdom',
      titleUrdu: broadcast.hikmat.titleUrdu,
      titleEnglish: broadcast.hikmat.titleEnglish,
      arabicText: broadcast.hikmat.quoteArabic,
      primaryTextUrdu: broadcast.hikmat.urduWisdom,
      secondaryTextEnglish: broadcast.hikmat.englishWisdom,
      sourceCitation: `${broadcast.hikmat.author} — ${broadcast.hikmat.sourceBook}`,
      badgeContext: `عملی محاسبہ: ${broadcast.hikmat.practicalReflection}`,
    });
    setIsShareModalOpen(true);
  };

  const currentSlideNumber = CAROUSEL_SLIDES.indexOf(activeTab) + 1;

  return (
    <section
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        border: '1px solid #E2E8F0',
        padding: '24px 28px',
        marginBottom: 24,
        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.04)',
        position: 'relative',
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
          marginBottom: 16,
          borderBottom: '1px solid #F1F5F9',
          paddingBottom: 14,
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
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
          <h2 style={{ fontSize: 21, fontWeight: 800, color: '#1E293B', margin: '4px 0 0' }}>
            {t('Daily Deen Knowledge Stream', 'روزانہ نشریۂ نورِ علم و عمل')}
          </h2>
        </div>

        {/* Carousel Progress Controls & AutoPlay Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            onClick={() => setIsAutoPlayActive(!isAutoPlayActive)}
            style={{
              padding: '4px 10px',
              borderRadius: 6,
              fontSize: 11,
              fontWeight: 700,
              backgroundColor: isAutoPlayActive ? '#ECFDF5' : '#F1F5F9',
              color: isAutoPlayActive ? '#065F46' : '#64748B',
              border: isAutoPlayActive ? '1px solid #A7F3D0' : '1px solid #E2E8F0',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
            title={isAutoPlayActive ? 'Pause Carousel Auto-Advance' : 'Resume Carousel Auto-Advance'}
          >
            <span>{isAutoPlayActive ? '🔄' : '⏸'}</span>
            <span>{isAutoPlayActive ? (isUrdu ? 'آٹو ایڈوانس آن' : 'Auto 8s') : (isUrdu ? 'روکا ہوا' : 'Paused')}</span>
          </button>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              backgroundColor: '#F8FAFC',
              padding: '3px 8px',
              borderRadius: 8,
              border: '1px solid #E2E8F0',
            }}
          >
            <button
              onClick={handlePrevSlide}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: 14,
                padding: '2px 6px',
                color: '#334155',
                fontWeight: 800,
              }}
              title="Previous Slide"
            >
              ◀
            </button>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#475569', minWidth: 42, textAlign: 'center' }}>
              {currentSlideNumber} / 4
            </span>
            <button
              onClick={handleNextSlide}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: 14,
                padding: '2px 6px',
                color: '#334155',
                fontWeight: 800,
              }}
              title="Next Slide"
            >
              ▶
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Prayer Window Filter Selector */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16, overflowX: 'auto', paddingBottom: 4 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: '#64748B', whiteSpace: 'nowrap' }}>
          {isUrdu ? 'وقت کا انتخاب:' : 'Window:'}
        </span>
        {[
          { id: 'AUTO' as const, labelUrdu: 'لائیو وقت', labelEng: 'Live Auto' },
          { id: 'FAJR' as const, labelUrdu: 'فجر', labelEng: 'Fajr' },
          { id: 'CHASHT' as const, labelUrdu: 'چاشت', labelEng: 'Chasht' },
          { id: 'DHUHR' as const, labelUrdu: 'ظہر', labelEng: 'Dhuhr' },
          { id: 'ASR' as const, labelUrdu: 'عصر', labelEng: 'Asr' },
          { id: 'MAGHRIB' as const, labelUrdu: 'مغرب', labelEng: 'Maghrib' },
          { id: 'ISHA_NIGHT' as const, labelUrdu: 'عشاء', labelEng: 'Isha' },
        ].map((w) => {
          const isSelected = selectedSlotOverride === w.id;
          return (
            <button
              key={w.id}
              onClick={() => setSelectedSlotOverride(w.id)}
              style={{
                padding: '3px 9px',
                borderRadius: 14,
                fontSize: 11,
                fontWeight: isSelected ? 800 : 600,
                backgroundColor: isSelected ? '#059669' : '#F1F5F9',
                color: isSelected ? '#FFFFFF' : '#475569',
                border: isSelected ? '1px solid #059669' : '1px solid #E2E8F0',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              {isUrdu ? w.labelUrdu : w.labelEng}
            </button>
          );
        })}
        <span style={{ fontSize: 11, color: '#94A3B8', whiteSpace: 'nowrap', marginLeft: 4 }}>
          • {t(`Day ${broadcast.dayOfYear}`, `دن ${broadcast.dayOfYear}`)}
        </span>
      </div>

      {/* Tab Selectors (With Carousel Indicator Dots) */}
      <div
        style={{
          display: 'flex',
          gap: 8,
          marginBottom: 18,
          flexWrap: 'wrap',
          borderBottom: '1px solid #E2E8F0',
          paddingBottom: 10,
        }}
      >
        <button
          onClick={() => setActiveTab('AYAH')}
          style={{
            padding: '8px 14px',
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
            padding: '8px 14px',
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
          <span>{t('Prophetic Hadith', 'حدیثِ نبوی ﷺ')}</span>
        </button>

        <button
          onClick={() => setActiveTab('DUA')}
          style={{
            padding: '8px 14px',
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
          <span>{t('Prophetic Dua', 'مسنون دعا')}</span>
        </button>

        <button
          onClick={() => setActiveTab('HIKMAT')}
          style={{
            padding: '8px 14px',
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
          <span>{t('Spiritual Wisdom', 'تزکیہ و حکمت')}</span>
        </button>
      </div>

      {/* Carousel Active Slide Rendering */}
      <div>
        {activeTab === 'AYAH' && (
          <BroadcastAyahTab
            ayah={broadcast.ayah}
            copied={copied}
            onCopy={handleCopy}
            onPlayAyah={handlePlayAyah}
            onMakeCard={handleMakeAyahCard}
          />
        )}

        {activeTab === 'HADITH' && (
          <BroadcastHadithTab
            hadith={broadcast.hadith}
            copied={copied}
            onCopy={handleCopy}
            onMakeCard={handleMakeHadithCard}
          />
        )}

        {activeTab === 'DUA' && (
          <BroadcastDuaTab
            dua={broadcast.dua}
            copied={copied}
            onCopy={handleCopy}
            onPlayDua={handlePlayDua}
            onMakeCard={handleMakeDuaCard}
          />
        )}

        {activeTab === 'HIKMAT' && (
          <BroadcastHikmatTab
            hikmat={broadcast.hikmat}
            copied={copied}
            onCopy={handleCopy}
            onMakeCard={handleMakeHikmatCard}
          />
        )}
      </div>

      {/* Carousel Dot Indicators */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, marginTop: 16 }}>
        {CAROUSEL_SLIDES.map((slide, idx) => (
          <span
            key={slide}
            onClick={() => setActiveTab(slide)}
            style={{
              width: activeTab === slide ? 22 : 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: activeTab === slide ? '#059669' : '#CBD5E1',
              cursor: 'pointer',
              transition: 'all 0.25s ease-in-out',
              display: 'inline-block',
            }}
            title={`Slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Universal Content Social Card Generator Modal */}
      <UniversalContentShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        payload={sharePayload}
      />
    </section>
  );
};
