import React, { useState, useRef, useEffect } from 'react';
import { getAyahWisdomCard, getAyahAudioUrl, getAyahUrduAudioUrl, getSurahTafseerAudioUrl } from '../lib/quran-wisdom-data';
import { showAmalToast } from './Toast';
import { UniversalContentShareModal } from './cards/UniversalContentShareModal';
import { AyahAudioControlsBar } from './wisdom/AyahAudioControlsBar';
import { AyahWisdomTabContent, AyahWisdomTabKey } from './wisdom/AyahWisdomTabContent';

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
  const [wisdomTab, setWisdomTab] = useState<AyahWisdomTabKey>('KHAZAIN');
  const [selectedAudioType, setSelectedAudioType] = useState<'alafasy' | 'husary' | 'minshawi' | 'urdu' | 'tafseer'>('alafasy');
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
      caches
        .open('amal-quran-audio-v1')
        .then((cache) => {
          cache.match(audioSrc).then((res) => {
            setIsCachedOffline(!!res);
          });
        })
        .catch(() => {});
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
        modalAudioRef.current
          .play()
          .then(() => {
            setIsSpeakingTafseer(true);
            showAmalToast(
              tafseerStudioUrl
                ? 'مستند تفسیری آڈیو (صراط الجنان / کنز الایمان) جاری ہے۔'
                : `آیت ${ayahNumber} کا مستند اردو ترجمہ (کنز الایمان) جاری ہے۔`,
              'info'
            );
          })
          .catch((e) => {
            console.warn('Audio play error in modal, trying Ayah Urdu audio:', e);
            const fallback = getAyahUrduAudioUrl(surahNumber, ayahNumber);
            if (modalAudioRef.current) {
              modalAudioRef.current.src = fallback;
              modalAudioRef.current
                .play()
                .then(() => {
                  setIsSpeakingTafseer(true);
                })
                .catch(() => {
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
              📖 AYAH WISDOM &amp; LISTENING CARD
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
          <AyahAudioControlsBar
            audioSrc={audioSrc}
            selectedAudioType={selectedAudioType}
            setSelectedAudioType={setSelectedAudioType}
            playbackSpeed={playbackSpeed}
            setPlaybackSpeed={setPlaybackSpeed}
            isCachedOffline={isCachedOffline}
            isCaching={isCaching}
            handleCacheAudioOffline={handleCacheAudioOffline}
            handleDownloadAudioFile={handleDownloadAudioFile}
            isSpeakingTafseer={isSpeakingTafseer}
            handleToggleSpeakTafseer={handleToggleSpeakTafseer}
            tafseerStudioUrl={tafseerStudioUrl}
            modalAudioRef={modalAudioRef as React.RefObject<HTMLAudioElement>}
          />

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
            {wisdomCard ? wisdomCard.textArabic : fallbackArabic || ''}
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
                  onClick={() => setWisdomTab(tab.key as AyahWisdomTabKey)}
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
          <AyahWisdomTabContent
            wisdomTab={wisdomTab}
            wisdomCard={wisdomCard}
            surahNumber={surahNumber}
            ayahNumber={ayahNumber}
            surahNameTransliterated={surahNameTransliterated}
            fallbackArabic={fallbackArabic}
            fallbackUrdu={fallbackUrdu}
            fallbackEnglish={fallbackEnglish}
          />
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
