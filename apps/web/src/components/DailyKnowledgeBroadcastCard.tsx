import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { DailyKnowledgeEngine, DailyKnowledgeBroadcast } from '@amal/amal-engine';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import { AmalTheme } from '@amal/ui';

export const DailyKnowledgeBroadcastCard: React.FC = () => {
  const [broadcast, setBroadcast] = useState<DailyKnowledgeBroadcast | null>(() => DailyKnowledgeEngine.getBroadcast());
  const [activeTab, setActiveTab] = useState<'AYAH' | 'HADITH' | 'DUA' | 'HIKMAT'>('AYAH');
  const [copied, setCopied] = useState(false);
  const { playTrack, isPlaying } = useAudioPlayer();

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
    // Initial fetch
    setBroadcast(DailyKnowledgeEngine.getBroadcast());

    // Auto-update every 60 seconds if slot or day transitions
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
                🕌 جمعۃ المبارک
              </span>
            )}
          </div>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: '#1E293B', margin: '4px 0 0' }}>
            روزانہ نشریۂ نورِ علم و عمل (Daily Deen Stream)
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
          <span>🕒 وقت:</span>
          <strong style={{ color: '#065F46' }}>
            {broadcast.activeTimeSlot === 'FAJR'
              ? 'صبح فجر'
              : broadcast.activeTimeSlot === 'CHASHT'
              ? 'چاشت'
              : broadcast.activeTimeSlot === 'DHUHR'
              ? 'ظہر'
              : broadcast.activeTimeSlot === 'ASR'
              ? 'عصر'
              : broadcast.activeTimeSlot === 'MAGHRIB'
              ? 'مغرب'
              : 'عشاء و رات'}
          </strong>
          <span>• دن {broadcast.dayOfYear}</span>
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
          <span>آیتِ مبارکہ (کنز الایمان)</span>
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
          <span>حدیثِ نبوی ﷺ (نووی و شمائل)</span>
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
          <span>مسنون و ربانی دعا (حصن المسلم)</span>
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
          <span>تزکیہ و حکمت (امام غزالی و سعدی)</span>
        </button>
      </div>

      {/* Tab 1: AYAH */}
      {activeTab === 'AYAH' && (
        <div style={{ animation: 'fadeIn 0.2s ease-in-out' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 12,
            }}
          >
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: '#047857',
                backgroundColor: '#D1FAE5',
                padding: '4px 10px',
                borderRadius: 6,
              }}
            >
              {broadcast.ayah.surahNameUrdu} ({broadcast.ayah.surahNumber}:{broadcast.ayah.ayahNumber}) • {broadcast.ayah.spiritualTheme}
            </span>

            <button
              onClick={() => handleCopy(`${broadcast.ayah.arabicText}\n\n${broadcast.ayah.kanzAlImanUrdu} [کنز الایمان]`)}
              style={{
                background: 'none',
                border: '1px solid #CBD5E1',
                padding: '4px 10px',
                borderRadius: 6,
                fontSize: 12,
                cursor: 'pointer',
                color: '#475569',
              }}
            >
              {copied ? '✅ کاپی ہو گیا' : '📋 متن کاپی کریں'}
            </button>
          </div>

          {/* Arabic Matn */}
          <div
            dir="rtl"
            style={{
              fontFamily: "'Amiri', 'Traditional Arabic', serif",
              fontSize: 24,
              lineHeight: 1.8,
              color: '#064E3B',
              backgroundColor: '#F0FDF4',
              padding: '16px 20px',
              borderRadius: 12,
              border: '1px solid #A7F3D0',
              marginBottom: 14,
              textAlign: 'center',
            }}
          >
            ﴿{broadcast.ayah.arabicText}﴾
          </div>

          {/* Kanz al-Iman Urdu */}
          <div
            dir="rtl"
            style={{
              fontFamily: "'Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', serif",
              fontSize: 18,
              lineHeight: 1.9,
              color: '#1F2937',
              backgroundColor: '#FAFAF9',
              padding: '14px 18px',
              borderRadius: 10,
              border: '1px solid #E7E5E4',
              marginBottom: 12,
            }}
          >
            <span style={{ fontWeight: 800, color: '#047857' }}>ترجمہ کنز الایمان: </span>
            {broadcast.ayah.kanzAlImanUrdu}
          </div>

          {/* English translation */}
          <div style={{ fontSize: 13, color: '#4B5563', fontStyle: 'italic', marginBottom: 16 }}>
            "{broadcast.ayah.englishTranslation}"
          </div>

          {/* Action Footer */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button
              onClick={handlePlayAyah}
              style={{
                backgroundColor: '#059669',
                color: '#FFFFFF',
                border: 'none',
                fontSize: 13,
                fontWeight: 700,
                padding: '8px 16px',
                borderRadius: 8,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                cursor: 'pointer',
              }}
            >
              <span>🎧 تلاوت سنیں (Listen to Recitation)</span>
            </button>

            <Link
              href={`/library?surah=${broadcast.ayah.surahNumber}`}
              style={{
                textDecoration: 'none',
                backgroundColor: '#F0FDF4',
                color: '#065F46',
                border: '1px solid #A7F3D0',
                fontSize: 13,
                fontWeight: 700,
                padding: '8px 16px',
                borderRadius: 8,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <span>📖 مکمل سورۃ {broadcast.ayah.surahNameUrdu} قرآن ریڈر میں کھولیں →</span>
            </Link>
          </div>
        </div>
      )}

      {/* Tab 2: HADITH */}
      {activeTab === 'HADITH' && (
        <div style={{ animation: 'fadeIn 0.2s ease-in-out' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 12,
            }}
          >
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: '#1E40AF',
                backgroundColor: '#DBEAFE',
                padding: '4px 10px',
                borderRadius: 6,
              }}
            >
              {broadcast.hadith.sourceBook} • راوی: {broadcast.hadith.narrator}
            </span>

            <button
              onClick={() => handleCopy(`${broadcast.hadith.arabicMatn}\n\n${broadcast.hadith.urduTranslation}`)}
              style={{
                background: 'none',
                border: '1px solid #CBD5E1',
                padding: '4px 10px',
                borderRadius: 6,
                fontSize: 12,
                cursor: 'pointer',
                color: '#475569',
              }}
            >
              {copied ? '✅ کاپی ہو گیا' : '📋 متن کاپی کریں'}
            </button>
          </div>

          {/* Arabic Matn */}
          <div
            dir="rtl"
            style={{
              fontFamily: "'Amiri', 'Traditional Arabic', serif",
              fontSize: 21,
              lineHeight: 1.8,
              color: '#1E3A8A',
              backgroundColor: '#EFF6FF',
              padding: '16px 20px',
              borderRadius: 12,
              border: '1px solid #BFDBFE',
              marginBottom: 14,
            }}
          >
            «{broadcast.hadith.arabicMatn}»
          </div>

          {/* Urdu Translation */}
          <div
            dir="rtl"
            style={{
              fontFamily: "'Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', serif",
              fontSize: 18,
              lineHeight: 1.9,
              color: '#1F2937',
              backgroundColor: '#FAFAF9',
              padding: '14px 18px',
              borderRadius: 10,
              border: '1px solid #E7E5E4',
              marginBottom: 12,
            }}
          >
            <span style={{ fontWeight: 800, color: '#1E40AF' }}>اردو مفہوم: </span>
            {broadcast.hadith.urduTranslation}
          </div>

          {/* Practical Sunnah Action */}
          <div
            style={{
              backgroundColor: '#FEF3C7',
              border: '1px solid #FDE68A',
              padding: '10px 14px',
              borderRadius: 8,
              fontSize: 13,
              color: '#92400E',
              marginBottom: 16,
            }}
          >
            <strong>🎯 روزمرہ سنت پر عمل: </strong> {broadcast.hadith.sunnahApplication}
          </div>

          {/* Action Footer */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Link
              href="/library?work=CANON-HAD-040"
              style={{
                textDecoration: 'none',
                backgroundColor: '#1E40AF',
                color: '#FFFFFF',
                fontSize: 13,
                fontWeight: 700,
                padding: '8px 16px',
                borderRadius: 8,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <span>📜 اربعین نووی کے تمام ۴۲ اسباق لائبریری میں پڑھیں →</span>
            </Link>
          </div>
        </div>
      )}

      {/* Tab 3: DUA */}
      {activeTab === 'DUA' && (
        <div style={{ animation: 'fadeIn 0.2s ease-in-out' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 12,
            }}
          >
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: '#7C2D12',
                backgroundColor: '#FFEDD5',
                padding: '4px 10px',
                borderRadius: 6,
              }}
            >
              {broadcast.dua.sourceBook} • {broadcast.dua.titleUrdu}
            </span>

            <button
              onClick={() => handleCopy(`${broadcast.dua.arabicText}\n\n${broadcast.dua.urduTranslation}`)}
              style={{
                background: 'none',
                border: '1px solid #CBD5E1',
                padding: '4px 10px',
                borderRadius: 6,
                fontSize: 12,
                cursor: 'pointer',
                color: '#475569',
              }}
            >
              {copied ? '✅ کاپی ہو گیا' : '📋 دعا کاپی کریں'}
            </button>
          </div>

          {/* Arabic Text */}
          <div
            dir="rtl"
            style={{
              fontFamily: "'Amiri', 'Traditional Arabic', serif",
              fontSize: 22,
              lineHeight: 1.8,
              color: '#7C2D12',
              backgroundColor: '#FFF7ED',
              padding: '16px 20px',
              borderRadius: 12,
              border: '1px solid #FED7AA',
              marginBottom: 14,
              textAlign: 'center',
            }}
          >
            «{broadcast.dua.arabicText}»
          </div>

          {/* Urdu Translation */}
          <div
            dir="rtl"
            style={{
              fontFamily: "'Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', serif",
              fontSize: 18,
              lineHeight: 1.9,
              color: '#1F2937',
              backgroundColor: '#FAFAF9',
              padding: '14px 18px',
              borderRadius: 10,
              border: '1px solid #E7E5E4',
              marginBottom: 12,
            }}
          >
            <span style={{ fontWeight: 800, color: '#C2410C' }}>اردو ترجمہ: </span>
            {broadcast.dua.urduTranslation}
          </div>

          {/* Virtue */}
          <div
            style={{
              backgroundColor: '#ECFDF5',
              border: '1px solid #A7F3D0',
              padding: '10px 14px',
              borderRadius: 8,
              fontSize: 13,
              color: '#065F46',
              marginBottom: 16,
            }}
          >
            <strong>✨ فضیلت و برکت: </strong> {broadcast.dua.virtue}
          </div>

          {/* Action Footer */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button
              onClick={handlePlayDua}
              style={{
                backgroundColor: '#C2410C',
                color: '#FFFFFF',
                border: 'none',
                fontSize: 13,
                fontWeight: 700,
                padding: '8px 16px',
                borderRadius: 8,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                cursor: 'pointer',
              }}
            >
              <span>🎧 مسنون دعا سنیں (Listen to Dua)</span>
            </button>

            <Link
              href="/tasbih"
              style={{
                textDecoration: 'none',
                backgroundColor: '#FFF7ED',
                color: '#C2410C',
                border: '1px solid #FED7AA',
                fontSize: 13,
                fontWeight: 700,
                padding: '8px 16px',
                borderRadius: 8,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <span>📿 مسنون تسبیح کاؤنٹر شروع کریں (33 / 100) →</span>
            </Link>
            <Link
              href="/library?work=CANON-DUA-001"
              style={{
                textDecoration: 'none',
                backgroundColor: '#F8FAFC',
                color: '#334155',
                fontSize: 13,
                fontWeight: 700,
                padding: '8px 16px',
                borderRadius: 8,
                border: '1px solid #CBD5E1',
              }}
            >
              تمام ۴۰ ربّنا دعائیں دیکھیں
            </Link>
          </div>
        </div>
      )}

      {/* Tab 4: HIKMAT */}
      {activeTab === 'HIKMAT' && (
        <div style={{ animation: 'fadeIn 0.2s ease-in-out' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 12,
            }}
          >
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: '#5B21B6',
                backgroundColor: '#EDE9FE',
                padding: '4px 10px',
                borderRadius: 6,
              }}
            >
              {broadcast.hikmat.sourceBook} • {broadcast.hikmat.author}
            </span>

            <button
              onClick={() => handleCopy(`${broadcast.hikmat.urduWisdom}\n\nعمل: ${broadcast.hikmat.practicalReflection}`)}
              style={{
                background: 'none',
                border: '1px solid #CBD5E1',
                padding: '4px 10px',
                borderRadius: 6,
                fontSize: 12,
                cursor: 'pointer',
                color: '#475569',
              }}
            >
              {copied ? '✅ کاپی ہو گیا' : '📋 نصیحت کاپی کریں'}
            </button>
          </div>

          {/* Arabic quote if available */}
          {broadcast.hikmat.quoteArabic && (
            <div
              dir="rtl"
              style={{
                fontFamily: "'Amiri', 'Traditional Arabic', serif",
                fontSize: 20,
                lineHeight: 1.8,
                color: '#4C1D95',
                backgroundColor: '#F5F3FF',
                padding: '14px 18px',
                borderRadius: 12,
                border: '1px solid #DDD6FE',
                marginBottom: 14,
                textAlign: 'center',
              }}
            >
              «{broadcast.hikmat.quoteArabic}»
            </div>
          )}

          {/* Urdu Wisdom */}
          <div
            dir="rtl"
            style={{
              fontFamily: "'Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', serif",
              fontSize: 18,
              lineHeight: 1.9,
              color: '#1F2937',
              backgroundColor: '#FAFAF9',
              padding: '14px 18px',
              borderRadius: 10,
              border: '1px solid #E7E5E4',
              marginBottom: 12,
            }}
          >
            <span style={{ fontWeight: 800, color: '#6D28D9' }}>بصیرت و نصیحت: </span>
            {broadcast.hikmat.urduWisdom}
          </div>

          {/* Practical Reflection */}
          <div
            style={{
              backgroundColor: '#F3E8FF',
              border: '1px solid #E9D5FF',
              padding: '10px 14px',
              borderRadius: 8,
              fontSize: 13,
              color: '#581C87',
              marginBottom: 16,
            }}
          >
            <strong>🌱 آج کا عملی محاسبہ: </strong> {broadcast.hikmat.practicalReflection}
          </div>

          {/* Action Footer */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Link
              href="/vault"
              style={{
                textDecoration: 'none',
                backgroundColor: '#5B21B6',
                color: '#FFFFFF',
                fontSize: 13,
                fontWeight: 700,
                padding: '8px 16px',
                borderRadius: 8,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <span>💎 نالج والٹ میں محفوظ کریں →</span>
            </Link>
            <Link
              href="/reflections"
              style={{
                textDecoration: 'none',
                backgroundColor: '#F8FAFC',
                color: '#334155',
                fontSize: 13,
                fontWeight: 700,
                padding: '8px 16px',
                borderRadius: 8,
                border: '1px solid #CBD5E1',
              }}
            >
              شام کا محاسبہ و توبہ
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};
