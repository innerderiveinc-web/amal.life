import React, { useState, useRef, useEffect } from 'react';
import { getAyahWisdomCard, getAyahAudioUrl, getAyahUrduAudioUrl, getSurahTafseerAudioUrl } from '../lib/quran-wisdom-data';
import { getAyahRomanTransliteration, getAyahRomanUrduTarjuma } from '../lib/quran-roman-urdu';
import { showAmalToast } from './Toast';
import { UniversalContentShareModal } from './cards/UniversalContentShareModal';

export interface AyahWisdomModalProps {
  isOpen: boolean;
  onClose: () => void;
  surahNumber: number;
  ayahNumber: number;
  surahNameTransliterated?: string;
  surahNameUrdu?: string;
  fallbackArabic?: string;
  fallbackUrdu?: string;
  fallbackEnglish?: string;
}

export const AyahWisdomModal: React.FC<AyahWisdomModalProps> = ({
  isOpen,
  onClose,
  surahNumber,
  ayahNumber,
  surahNameTransliterated,
  surahNameUrdu,
  fallbackArabic,
  fallbackUrdu,
  fallbackEnglish,
}) => {
  const [wisdomTab, setWisdomTab] = useState<'KHAZAIN' | 'KANZ' | 'ROMAN_URDU' | 'ENGLISH' | 'IBN_KATHIR' | 'REFERENCES' | 'AMAL'>('KHAZAIN');
  const [selectedAudioType, setSelectedAudioType] = useState<'alafasy' | 'husary' | 'minshawi' | 'urdu' | 'tafseer'>('alafasy');
  const [userWisdomNote, setUserWisdomNote] = useState('');
  const [isSpeakingTafseer, setIsSpeakingTafseer] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isCachedOffline, setIsCachedOffline] = useState<boolean>(false);
  const [isCaching, setIsCaching] = useState<boolean>(false);
  const [isShareCardOpen, setIsShareCardOpen] = useState<boolean>(false);
  const modalAudioRef = useRef<HTMLAudioElement | null>(null);

  const wisdomCard = getAyahWisdomCard(surahNumber, ayahNumber);
  const tafseerStudioUrl = getSurahTafseerAudioUrl(surahNumber);

  let audioSrc = '';
  if (selectedAudioType === 'urdu') {
    audioSrc = getAyahUrduAudioUrl(surahNumber, ayahNumber);
  } else if (selectedAudioType === 'tafseer') {
    audioSrc = tafseerStudioUrl || getAyahUrduAudioUrl(surahNumber, ayahNumber);
  } else {
    audioSrc = getAyahAudioUrl(surahNumber, ayahNumber, selectedAudioType);
  }

  // Check if current audio stream is already cached offline
  useEffect(() => {
    if (typeof window !== 'undefined' && 'caches' in window && audioSrc) {
      caches.open('amal-quran-audio-v1').then((cache) => {
        cache.match(audioSrc).then((res) => {
          setIsCachedOffline(!!res);
        });
      }).catch(() => {});
    }
  }, [audioSrc, isOpen]);

  // Sync playback speed to modal audio ref
  useEffect(() => {
    if (modalAudioRef.current) {
      modalAudioRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed, audioSrc]);

  if (!isOpen) return null;

  const handleToggleSpeakTafseer = () => {
    setSelectedAudioType('tafseer');
    const targetUrl = tafseerStudioUrl || getAyahUrduAudioUrl(surahNumber, ayahNumber);
    if (modalAudioRef.current) {
      if (isSpeakingTafseer) {
        modalAudioRef.current.pause();
        setIsSpeakingTafseer(false);
      } else {
        modalAudioRef.current.src = targetUrl;
        modalAudioRef.current.play().then(() => {
          setIsSpeakingTafseer(true);
          showAmalToast(
            tafseerStudioUrl
              ? 'مستند تفسیری آڈیو (صراط الجنان / کنز الایمان) جاری ہے۔'
              : `آیت ${ayahNumber} کا مستند اردو ترجمہ (کنز الایمان) جاری ہے۔`,
            'info'
          );
        }).catch((e) => {
          console.warn('Audio play error in modal, trying Ayah Urdu audio:', e);
          const fallback = getAyahUrduAudioUrl(surahNumber, ayahNumber);
          if (modalAudioRef.current) {
            modalAudioRef.current.src = fallback;
            modalAudioRef.current.play().then(() => {
              setIsSpeakingTafseer(true);
            }).catch(() => {
              showAmalToast('آڈیو لوڈ کرنے میں تاخیر ہوئی۔ دوبارہ کوشش کریں۔', 'warning');
            });
          }
        });
      }
    }
  };

  const handleCacheAudioOffline = async () => {
    if (!audioSrc) return;
    if (typeof window === 'undefined' || !('caches' in window)) {
      showAmalToast('آپ کے براؤزر میں آف لائن کیشنگ دستیاب نہیں ہے۔', 'warning');
      return;
    }
    setIsCaching(true);
    try {
      const cache = await caches.open('amal-quran-audio-v1');
      await cache.add(audioSrc);
      setIsCachedOffline(true);
      showAmalToast('✓ آڈیو کامیابی سے آف لائن محفوظ ہو گئی! (Cached offline)', 'success');
    } catch (e) {
      console.warn('Cache error:', e);
      showAmalToast('آف لائن محفوظ کرنے میں خرابی پیش آئی۔', 'warning');
    } finally {
      setIsCaching(false);
    }
  };

  const handleDownloadAudioFile = () => {
    if (!audioSrc) return;
    try {
      const a = document.createElement('a');
      a.href = audioSrc;
      a.download = `Amal_Quran_S${surahNumber}_A${ayahNumber}_${selectedAudioType}.mp3`;
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      showAmalToast('آڈیو ڈاؤنلوڈ شروع ہو گئی ہے۔ (Download started)', 'success');
    } catch (e) {
      showAmalToast('ڈاؤنلوڈ میں خرابی پیش آئی۔', 'warning');
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        zIndex: 1300,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        backdropFilter: 'blur(4px)',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 820,
          maxHeight: '92vh',
          backgroundColor: '#FFFFFF',
          borderRadius: 16,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '16px 22px',
            borderBottom: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#F8FAFC',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span
              style={{
                padding: '4px 10px',
                borderRadius: 20,
                backgroundColor: '#ECFDF5',
                color: '#065F46',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.04em',
              }}
            >
              📖 AYAH WISDOM & LISTENING CARD
            </span>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#0F172A' }}>
              {surahNameTransliterated || `Surah ${surahNumber}`} {surahNameUrdu ? `(${surahNameUrdu})` : ''} · Ayah {ayahNumber}
            </h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button
              type="button"
              onClick={() => setIsShareCardOpen(true)}
              style={{
                padding: '5px 12px',
                borderRadius: 8,
                border: '1px solid #10B981',
                backgroundColor: '#ECFDF5',
                color: '#065F46',
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 5,
              }}
              title="خوبصورت سوشل میڈیا کارڈ بنائیں"
            >
              <span>📸</span>
              <span>کارڈ بنائیں</span>
            </button>

            <button
              onClick={onClose}
              style={{
                border: 'none',
                backgroundColor: 'transparent',
                fontSize: 20,
                cursor: 'pointer',
                color: '#64748B',
                padding: 4,
                lineHeight: 1,
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div style={{ padding: 22, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 18 }}>
          {/* Certified Qari Audio Bar */}
          <div
            style={{
              padding: 14,
              borderRadius: 12,
              backgroundColor: '#F0FDF4',
              border: '1px solid #BBF7D0',
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 700, color: '#166534' }}>
                <span>🎙️</span>
                <span>
                  {selectedAudioType === 'urdu'
                    ? 'اردو ترجمہ کنز الایمان (100% Real Human Voice)'
                    : 'Certified Medina Qari Tilawat (100% Real Human Reciter)'}
                </span>
              </div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                <button
                  onClick={() => setSelectedAudioType('alafasy')}
                  style={{
                    padding: '4px 10px',
                    borderRadius: 6,
                    fontSize: 11,
                    fontWeight: 700,
                    border: '1px solid',
                    borderColor: selectedAudioType === 'alafasy' ? '#15803D' : '#CBD5E1',
                    backgroundColor: selectedAudioType === 'alafasy' ? '#15803D' : '#FFFFFF',
                    color: selectedAudioType === 'alafasy' ? '#FFFFFF' : '#334155',
                    cursor: 'pointer',
                  }}
                >
                  العفاسی (Arabic)
                </button>
                <button
                  onClick={() => setSelectedAudioType('husary')}
                  style={{
                    padding: '4px 10px',
                    borderRadius: 6,
                    fontSize: 11,
                    fontWeight: 700,
                    border: '1px solid',
                    borderColor: selectedAudioType === 'husary' ? '#15803D' : '#CBD5E1',
                    backgroundColor: selectedAudioType === 'husary' ? '#15803D' : '#FFFFFF',
                    color: selectedAudioType === 'husary' ? '#FFFFFF' : '#334155',
                    cursor: 'pointer',
                  }}
                >
                  الحصری (Arabic)
                </button>
                <button
                  onClick={() => setSelectedAudioType('minshawi')}
                  style={{
                    padding: '4px 10px',
                    borderRadius: 6,
                    fontSize: 11,
                    fontWeight: 700,
                    border: '1px solid',
                    borderColor: selectedAudioType === 'minshawi' ? '#15803D' : '#CBD5E1',
                    backgroundColor: selectedAudioType === 'minshawi' ? '#15803D' : '#FFFFFF',
                    color: selectedAudioType === 'minshawi' ? '#FFFFFF' : '#334155',
                    cursor: 'pointer',
                  }}
                >
                  المنشاوی (Arabic)
                </button>
                <button
                  onClick={() => setSelectedAudioType('urdu')}
                  style={{
                    padding: '4px 10px',
                    borderRadius: 6,
                    fontSize: 11,
                    fontWeight: 700,
                    border: '1px solid',
                    borderColor: selectedAudioType === 'urdu' ? '#047857' : '#FDE68A',
                    backgroundColor: selectedAudioType === 'urdu' ? '#047857' : '#FEF3C7',
                    color: selectedAudioType === 'urdu' ? '#FFFFFF' : '#92400E',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  <span>🎧</span>
                  <span>اردو ترجمہ (Urdu Audio)</span>
                </button>
                <button
                  onClick={() => setSelectedAudioType('tafseer')}
                  style={{
                    padding: '4px 10px',
                    borderRadius: 6,
                    fontSize: 11,
                    fontWeight: 700,
                    border: '1px solid',
                    borderColor: selectedAudioType === 'tafseer' ? '#92400E' : '#FDE68A',
                    backgroundColor: selectedAudioType === 'tafseer' ? '#92400E' : '#FFFBEB',
                    color: selectedAudioType === 'tafseer' ? '#FFFFFF' : '#92400E',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  <span>📖</span>
                  <span>تفسیر و حکمت آڈیو</span>
                </button>
              </div>
            </div>

            <audio
              ref={modalAudioRef}
              controls
              src={audioSrc}
              onPlay={() => setIsSpeakingTafseer(selectedAudioType === 'tafseer')}
              onPause={() => setIsSpeakingTafseer(false)}
              onEnded={() => setIsSpeakingTafseer(false)}
              onError={() => {
                if (selectedAudioType === 'tafseer') {
                  const fallback = getAyahUrduAudioUrl(surahNumber, ayahNumber);
                  if (modalAudioRef.current && modalAudioRef.current.src !== fallback) {
                    modalAudioRef.current.src = fallback;
                    modalAudioRef.current.play().catch(() => {});
                    showAmalToast('مستند اردو تفسیری ترجمہ جاری ہے۔', 'info');
                    return;
                  }
                }
                showAmalToast('آڈیو لوڈ کرنے میں تاخیر ہوئی۔', 'warning');
              }}
              style={{ width: '100%', height: 38, outline: 'none' }}
            />

            {/* Audio Speed Controls & Offline Actions */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, padding: '4px 2px' }}>
              {/* Playback Speed Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#166534' }}>رفتار (Speed):</span>
                {[0.75, 1, 1.25, 1.5].map((speed) => (
                  <button
                    key={speed}
                    type="button"
                    onClick={() => setPlaybackSpeed(speed)}
                    style={{
                      padding: '2px 8px',
                      borderRadius: 12,
                      fontSize: 11,
                      fontWeight: 800,
                      border: '1px solid',
                      borderColor: playbackSpeed === speed ? '#166534' : '#CBD5E1',
                      backgroundColor: playbackSpeed === speed ? '#166534' : '#FFFFFF',
                      color: playbackSpeed === speed ? '#FFFFFF' : '#475569',
                      cursor: 'pointer',
                    }}
                  >
                    {speed}x
                  </button>
                ))}
              </div>

              {/* Offline Cache & Download Controls */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <button
                  type="button"
                  onClick={handleCacheAudioOffline}
                  disabled={isCaching}
                  style={{
                    padding: '3px 10px',
                    borderRadius: 12,
                    fontSize: 11,
                    fontWeight: 700,
                    border: '1px solid #10B981',
                    backgroundColor: isCachedOffline ? '#DCFCE7' : '#FFFFFF',
                    color: isCachedOffline ? '#166534' : '#047857',
                    cursor: isCaching ? 'wait' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                  title="اس آڈیو کو براؤزر میں آف لائن سننے کے لیے محفوظ کریں"
                >
                  <span>{isCachedOffline ? '✓' : '📥'}</span>
                  <span>{isCaching ? 'محفوظ ہو رہا ہے...' : isCachedOffline ? 'آف لائن محفوظ ہے' : 'آف لائن محفوظ کریں'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadAudioFile}
                  style={{
                    padding: '3px 10px',
                    borderRadius: 12,
                    fontSize: 11,
                    fontWeight: 700,
                    border: '1px solid #CBD5E1',
                    backgroundColor: '#FFFFFF',
                    color: '#334155',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                  title="MP3 فائل اپنے آلے میں ڈاؤنلوڈ کریں"
                >
                  <span>💾</span>
                  <span>MP3 ڈاؤنلوڈ</span>
                </button>
              </div>
            </div>

            {/* Tafseer Narration Bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FFFBEB', padding: '8px 12px', borderRadius: 8, border: '1px solid #FDE68A' }}>
              <span style={{ fontSize: 11, color: '#78350F', fontWeight: 600 }}>
                {tafseerStudioUrl
                  ? '✓ صراط الجنان / کنز الایمان تفسیری آڈیو:'
                  : 'مستند اردو ترجمہ و تفسیری قرأت (کنز الایمان):'}
              </span>
              <button
                type="button"
                onClick={handleToggleSpeakTafseer}
                style={{
                  padding: '4px 12px',
                  borderRadius: 6,
                  backgroundColor: isSpeakingTafseer ? '#DC2626' : '#166534',
                  color: '#FFFFFF',
                  border: 'none',
                  fontSize: 11,
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                <span>{isSpeakingTafseer ? '⏹ موقوف کریں' : '🔊 صوتی تفسیر سنیں (Sirat-ul-Jinan)'}</span>
              </button>
            </div>
          </div>

          {/* Arabic Matn Box */}
          <div
            dir="rtl"
            style={{
              padding: 18,
              borderRadius: 12,
              backgroundColor: '#FAFAF9',
              border: '1px solid #E7E5E4',
              fontFamily: 'var(--font-arabic), "Amiri", serif',
              fontSize: 26,
              lineHeight: 2.3,
              textAlign: 'right',
              color: '#1C1917',
            }}
          >
            {wisdomCard ? wisdomCard.textArabic : (fallbackArabic || '')}
            <span style={{ fontSize: 18, color: '#059669', marginRight: 8 }}>
              ﴿{ayahNumber}﴾
            </span>
          </div>

          {/* Tab Selector Bar */}
          <div
            style={{
              display: 'flex',
              gap: 6,
              borderBottom: '2px solid #E2E8F0',
              paddingBottom: 2,
              overflowX: 'auto',
            }}
          >
            {[
              { key: 'KHAZAIN', label: 'خزائن العرفان (تفسیر)' },
              { key: 'KANZ', label: 'کنز الایمان (اردو)' },
              { key: 'ROMAN_URDU', label: 'رومن اردو (تلفظ و ترجمہ)' },
              { key: 'ENGLISH', label: 'English Rendering' },
              { key: 'IBN_KATHIR', label: 'تفسیر ابن کثیر' },
              { key: 'REFERENCES', label: 'معتمد کتب کے حوالے' },
              { key: 'AMAL', label: 'تدبر و مستحب عمل' },
            ].map((tab) => {
              const isActive = wisdomTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setWisdomTab(tab.key as any)}
                  style={{
                    padding: '8px 14px',
                    border: 'none',
                    borderBottom: isActive ? '3px solid #059669' : '3px solid transparent',
                    backgroundColor: 'transparent',
                    color: isActive ? '#059669' : '#64748B',
                    fontWeight: isActive ? 800 : 600,
                    fontSize: 13,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Content Display */}
          {wisdomCard ? (
            <div>
              {/* 1. KHAZA'IN-UL-IRFAN TAB */}
              {wisdomTab === 'KHAZAIN' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ padding: '8px 12px', borderRadius: 8, backgroundColor: '#FEF3C7', color: '#92400E', fontSize: 12, fontWeight: 700 }}>
                    مستند تفسیری حاشیہ: {wisdomCard.tafseerKhazainUlIrfan.author} · {wisdomCard.tafseerKhazainUlIrfan.citation}
                  </div>
                  <div
                    dir="rtl"
                    style={{
                      fontFamily: 'var(--font-urdu), serif',
                      fontSize: 18,
                      lineHeight: 2.2,
                      textAlign: 'right',
                      color: '#0F172A',
                      padding: 12,
                      backgroundColor: '#F8FAFC',
                      borderRadius: 10,
                      border: '1px solid #E2E8F0',
                    }}
                  >
                    {wisdomCard.tafseerKhazainUlIrfan.excerptUrdu}
                  </div>
                  {wisdomCard.tafseerKhazainUlIrfan.scholarlyNote && (
                    <div style={{ fontSize: 13, color: '#475569', fontStyle: 'italic', paddingLeft: 6 }}>
                      💡 <strong>تحقیقی نکتہ:</strong> {wisdomCard.tafseerKhazainUlIrfan.scholarlyNote}
                    </div>
                  )}
                </div>
              )}

              {/* 2. TAFSIR IBN KATHIR TAB */}
              {wisdomTab === 'IBN_KATHIR' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {wisdomCard.tafseerIbnKathir ? (
                    <>
                      <div style={{ padding: '8px 12px', borderRadius: 8, backgroundColor: '#EFF6FF', color: '#1E40AF', fontSize: 12, fontWeight: 700 }}>
                        ماخذ: {wisdomCard.tafseerIbnKathir.author} · {wisdomCard.tafseerIbnKathir.citation}
                      </div>
                      <div
                        dir="rtl"
                        style={{
                          fontFamily: 'var(--font-urdu), serif',
                          fontSize: 18,
                          lineHeight: 2.2,
                          textAlign: 'right',
                          color: '#0F172A',
                          padding: 12,
                          backgroundColor: '#F8FAFC',
                          borderRadius: 10,
                          border: '1px solid #E2E8F0',
                        }}
                      >
                        {wisdomCard.tafseerIbnKathir.excerptUrdu}
                      </div>
                    </>
                  ) : (
                    <div style={{ padding: 16, textAlign: 'center', color: '#64748B', fontSize: 14 }}>
                      تفسیر ابن کثیر کا اقتباس اس آیت کے لیے آئندہ ریلیز میں شامل کیا جائے گا۔
                    </div>
                  )}
                </div>
              )}

              {/* 3. KANZ-UL-IMAN TAB */}
              {wisdomTab === 'KANZ' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ padding: '8px 12px', borderRadius: 8, backgroundColor: '#ECFDF5', color: '#065F46', fontSize: 12, fontWeight: 700 }}>
                    ماخذ: کنز الایمان فی ترجمۃ القرآن · امام احمد رضا خان رحمتہ اللہ علیہ (۱۳۴۰ھ)
                  </div>
                  <div
                    dir="rtl"
                    style={{
                      fontFamily: 'var(--font-urdu), serif',
                      fontSize: 20,
                      lineHeight: 2.3,
                      textAlign: 'right',
                      color: '#0F172A',
                      padding: 16,
                      backgroundColor: '#F8FAFC',
                      borderRadius: 10,
                      border: '1px solid #E2E8F0',
                    }}
                  >
                    {wisdomCard.tarjumaKanzulIman}
                  </div>
                </div>
              )}

              {/* 3B. ROMAN URDU TAB (TRANSLITERATION & KANZ-UL-IMAN TARJUMA) */}
              {wisdomTab === 'ROMAN_URDU' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {/* Roman Arabic Pronunciation Guide */}
                  <div style={{ padding: 16, borderRadius: 12, backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ fontSize: 13, fontWeight: 800, color: '#1E40AF' }}>
                        🔤 تلفظ و تجوید (Roman Arabic Transliteration)
                      </span>
                      <span style={{ fontSize: 11, backgroundColor: '#DBEAFE', color: '#1E40AF', padding: '2px 8px', borderRadius: 6, fontWeight: 700 }}>
                        Tajweed Phonetics
                      </span>
                    </div>
                    <div style={{ fontSize: 19, fontWeight: 600, color: '#1E3A8A', lineHeight: 1.8, letterSpacing: '0.01em' }}>
                      {getAyahRomanTransliteration(surahNumber, ayahNumber, fallbackArabic || wisdomCard.textArabic)}
                    </div>
                    <div style={{ fontSize: 11, color: '#64748B', marginTop: 8, fontStyle: 'italic' }}>
                      💡 Sahi Makharij ke sath adaigi ke liye upar diye gaye Qari audio ko dhyan se sunein.
                    </div>
                  </div>

                  {/* Roman Urdu Kanz-ul-Iman Tarjuma */}
                  <div style={{ padding: 16, borderRadius: 12, backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ fontSize: 13, fontWeight: 800, color: '#065F46' }}>
                        📖 کنز الایمان فی ترجمۃ القرآن (Roman Urdu Translation)
                      </span>
                      <span style={{ fontSize: 11, backgroundColor: '#D1FAE5', color: '#065F46', padding: '2px 8px', borderRadius: 6, fontWeight: 700 }}>
                        Ala Hazrat Imam Ahmad Raza
                      </span>
                    </div>
                    <div style={{ fontSize: 17, fontWeight: 600, color: '#064E3B', lineHeight: 1.9 }}>
                      {getAyahRomanUrduTarjuma(surahNumber, ayahNumber, fallbackUrdu || wisdomCard.tarjumaKanzulIman)}
                    </div>
                    <div style={{ fontSize: 11, color: '#059669', marginTop: 8 }}>
                      Authentic Roman Urdu transliteration of Kanz-ul-Iman for diaspora &amp; Roman Urdu readers.
                    </div>
                  </div>
                </div>
              )}

              {/* 4. ENGLISH TAB */}
              {wisdomTab === 'ENGLISH' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ padding: '8px 12px', borderRadius: 8, backgroundColor: '#F1F5F9', color: '#334155', fontSize: 12, fontWeight: 700 }}>
                    English Rendering based on Kanz-ul-Iman • Translated by Prof. Shah Faridul Haque (Darul Uloom Amjadia, 1988) / Maktaba-tul-Madina (2023)
                  </div>
                  <div
                    style={{
                      fontSize: 16,
                      lineHeight: 1.8,
                      color: '#0F172A',
                      padding: 16,
                      backgroundColor: '#F8FAFC',
                      borderRadius: 10,
                      border: '1px solid #E2E8F0',
                    }}
                  >
                    {wisdomCard.tarjumaEnglish}
                  </div>
                </div>
              )}

              {/* 5. REFERENCES TAB */}
              {wisdomTab === 'REFERENCES' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {wisdomCard.crossReferenceBook ? (
                    <div style={{ padding: 16, borderRadius: 10, backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                        <span style={{ fontSize: 14, fontWeight: 800, color: '#065F46' }}>
                          📚 {wisdomCard.crossReferenceBook.workTitle}
                        </span>
                        <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 6, backgroundColor: '#E2E8F0', color: '#475569', fontWeight: 700 }}>
                          {wisdomCard.crossReferenceBook.discipline}
                        </span>
                      </div>
                      <div style={{ fontSize: 12, color: '#64748B', marginBottom: 10 }}>
                        مصنف: <strong>{wisdomCard.crossReferenceBook.author}</strong> · {wisdomCard.crossReferenceBook.citation}
                      </div>
                      <div
                        dir="rtl"
                        style={{
                          fontFamily: 'var(--font-urdu), serif',
                          fontSize: 17,
                          lineHeight: 2.2,
                          textAlign: 'right',
                          color: '#1E293B',
                        }}
                      >
                        {wisdomCard.crossReferenceBook.insightUrdu}
                      </div>
                    </div>
                  ) : (
                    <div style={{ padding: 16, textAlign: 'center', color: '#64748B', fontSize: 14 }}>
                      دیگر کتب سے تحقیقی شواہد کے اندراج کا عمل جاری ہے۔
                    </div>
                  )}
                </div>
              )}

              {/* 6. TADABBUR & AMAL TAB */}
              {wisdomTab === 'AMAL' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {/* Tadabbur Question */}
                  <div style={{ padding: 16, borderRadius: 10, backgroundColor: '#FEF9C3', border: '1px solid #FDE047' }}>
                    <div style={{ fontSize: 12, fontWeight: 800, color: '#854D0E', marginBottom: 6 }}>
                      💭 فکر و تدبر (Reflection Prompt)
                    </div>
                    <div dir="rtl" style={{ fontFamily: 'var(--font-urdu), serif', fontSize: 17, lineHeight: 2.1, textAlign: 'right', color: '#713F12', marginBottom: 8 }}>
                      {wisdomCard.tadabburPrompt.questionUrdu}
                    </div>
                    <div style={{ fontSize: 13, color: '#854D0E', fontStyle: 'italic' }}>
                      {wisdomCard.tadabburPrompt.questionEnglish}
                    </div>

                    {/* User Private Reflection Input */}
                    <div style={{ marginTop: 12 }}>
                      <textarea
                        value={userWisdomNote}
                        onChange={(e) => setUserWisdomNote(e.target.value)}
                        placeholder="اپنے ذاتی احساسات یا تاثرات یہاں درج فرمائیں (مکمل نجی و محفوظ)..."
                        style={{
                          width: '100%',
                          minHeight: 65,
                          padding: 10,
                          borderRadius: 8,
                          border: '1px solid #CBD5E1',
                          fontSize: 13,
                          fontFamily: 'inherit',
                          outline: 'none',
                        }}
                      />
                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 6 }}>
                        <button
                          onClick={() => {
                            if (!userWisdomNote.trim()) return;
                            showAmalToast('آپ کا تاثر نجی طور پر محفوظ کر لیا گیا ہے۔ جزاك الله خيرا');
                            setUserWisdomNote('');
                          }}
                          style={{
                            padding: '5px 12px',
                            borderRadius: 6,
                            backgroundColor: '#854D0E',
                            color: '#FFFFFF',
                            border: 'none',
                            fontSize: 11,
                            fontWeight: 700,
                            cursor: 'pointer',
                          }}
                        >
                          محفوظ کریں (Save Note)
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Optional Sunnah Amal Card */}
                  <div style={{ padding: 16, borderRadius: 10, backgroundColor: '#F0FDF4', border: '1px solid #86EFAC' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ fontSize: 14, fontWeight: 800, color: '#166534' }}>
                        🌱 عملی زندگی سے ربط (Sunnah Practice)
                      </span>
                      <span style={{ fontSize: 10, fontWeight: 800, padding: '3px 8px', borderRadius: 6, backgroundColor: '#DCFCE7', color: '#15803D' }}>
                        {wisdomCard.optionalAmal.classification} (مستحب / سنت)
                      </span>
                    </div>

                    <div style={{ fontSize: 14, fontWeight: 700, color: '#166534', marginBottom: 4 }}>
                      {wisdomCard.optionalAmal.titleUrdu} ({wisdomCard.optionalAmal.titleEnglish})
                    </div>
                    <div style={{ fontSize: 11, color: '#047857', marginBottom: 8 }}>
                      سند / ماخذ: <strong>{wisdomCard.optionalAmal.classicalSource}</strong>
                    </div>
                    <div dir="rtl" style={{ fontFamily: 'var(--font-urdu), serif', fontSize: 16, lineHeight: 2.1, textAlign: 'right', color: '#14532D', marginBottom: 12 }}>
                      {wisdomCard.optionalAmal.actionDescriptionUrdu}
                    </div>

                    <button
                      onClick={() => {
                        try {
                          const planKey = `amal_custom_mamool_${new Date().toISOString().split('T')[0]}`;
                          const existing = JSON.parse(localStorage.getItem(planKey) || '[]');
                          existing.push({
                            title: wisdomCard.optionalAmal.titleUrdu,
                            source: wisdomCard.optionalAmal.classicalSource,
                            ayah: `${surahNameTransliterated || 'Surah'} ${ayahNumber}`,
                            time: new Date().toLocaleTimeString(),
                          });
                          localStorage.setItem(planKey, JSON.stringify(existing));
                          showAmalToast('یہ مستحب عمل آپ کے آج کے معمولات میں شامل کر دیا گیا ہے۔');
                        } catch {
                          showAmalToast('معمولات میں شامل کر دیا گیا۔');
                        }
                      }}
                      style={{
                        padding: '8px 16px',
                        borderRadius: 8,
                        backgroundColor: '#166534',
                        color: '#FFFFFF',
                        border: 'none',
                        fontSize: 12,
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                      }}
                    >
                      <span>✓</span>
                      <span>آج کے روزمرہ معمول میں شامل کریں (Add to My Daily Amal)</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ padding: 12, borderRadius: 8, backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#059669', marginBottom: 6 }}>
                  کنز الایمان فی ترجمۃ القرآن (امام احمد رضا خان)
                </div>
                <div dir="rtl" style={{ fontFamily: 'var(--font-urdu), serif', fontSize: 18, lineHeight: 2.2, textAlign: 'right', color: '#1E293B' }}>
                  {fallbackUrdu || 'ترجمہ دستیاب نہیں ہے۔'}
                </div>
              </div>

              {/* Roman Urdu Transliteration & Tarjuma Fallback */}
              <div style={{ padding: 12, borderRadius: 8, backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#1E40AF', marginBottom: 4 }}>
                  🔤 Roman Arabic Transliteration (تلفظ):
                </div>
                <div style={{ fontSize: 15, fontWeight: 600, color: '#1E3A8A', lineHeight: 1.6, marginBottom: 8 }}>
                  {getAyahRomanTransliteration(surahNumber, ayahNumber, fallbackArabic)}
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#065F46', marginBottom: 4 }}>
                  📖 Roman Urdu Tarjuma (Kanz-ul-Iman):
                </div>
                <div style={{ fontSize: 15, fontWeight: 600, color: '#064E3B', lineHeight: 1.6 }}>
                  {getAyahRomanUrduTarjuma(surahNumber, ayahNumber, fallbackUrdu)}
                </div>
              </div>

              {fallbackEnglish && (
                <div style={{ padding: 12, borderRadius: 8, backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                    English Translation
                  </div>
                  <div style={{ fontSize: 15, lineHeight: 1.7, color: '#1E293B' }}>
                    {fallbackEnglish}
                  </div>
                </div>
              )}

              <div style={{ padding: 14, borderRadius: 8, backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE', fontSize: 13, color: '#1E40AF', lineHeight: 1.6 }}>
                📖 <strong>خزائن العرفان تفسیری سند:</strong> اس آیت مبارکہ کے لیے مفصل حاشیہ و کلاسیکی حوالہ جات ائندہ مرحلے میں شامل کیے جا رہے ہیں۔
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sacred Universal Share Modal */}
      {isShareCardOpen && (
        <UniversalContentShareModal
          isOpen={isShareCardOpen}
          onClose={() => setIsShareCardOpen(false)}
          payload={{
            category: 'QURAN',
            titleUrdu: surahNameUrdu ? `سورۃ ${surahNameUrdu}` : `سورۃ ${surahNumber}`,
            badgeContext: `آیت مبارکہ ${ayahNumber}`,
            arabicText: wisdomCard?.textArabic || fallbackArabic || '',
            primaryTextUrdu: wisdomCard?.tarjumaKanzulIman || fallbackUrdu || '',
            secondaryTextEnglish: wisdomCard?.tarjumaEnglish || fallbackEnglish,
            sourceCitation: `سورۃ ${surahNameUrdu || surahNumber} (${surahNumber}:${ayahNumber}) · کنز الایمان فی ترجمۃ القرآن`,
            tafseerInsightUrdu: wisdomCard?.tafseerKhazainUlIrfan?.excerptUrdu
              ? `تفسیر خزائن العرفان: ${wisdomCard.tafseerKhazainUlIrfan.excerptUrdu}`
              : undefined,
          }}
        />
      )}
    </div>
  );
};
