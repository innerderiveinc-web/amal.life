import React, { useState, useRef, useEffect, memo } from 'react';
import { getAyahWisdomCard, getAyahAudioUrl, getAyahUrduAudioUrl, getAyahUrduAudioFallbackUrl, getSurahTafseerAudioUrl } from '../lib/quran-wisdom-data';
import { showAmalToast } from './Toast';
import { UniversalContentShareModal } from './cards/UniversalContentShareModal';
import { AyahAudioControlsBar } from './wisdom/AyahAudioControlsBar';
import { AyahWisdomTabContent, AyahWisdomTabKey } from './wisdom/AyahWisdomTabContent';
import { useLanguage } from '../context/LanguageContext';
import { triggerHaptic } from '../lib/haptics';

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

const AyahWisdomModalInner: React.FC<AyahWisdomModalProps> = ({
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
  const { t } = useLanguage();
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

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [dragOffsetY, setDragOffsetY] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (touch) {
      setTouchStartY(touch.clientY);
      setIsDragging(true);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartY === null || !isDragging) return;
    const touch = e.touches[0];
    if (touch) {
      const deltaY = touch.clientY - touchStartY;
      if (deltaY > 0) {
        setDragOffsetY(deltaY);
      }
    }
  };

  const handleTouchEnd = () => {
    if (dragOffsetY > 85) {
      triggerHaptic('medium');
      onClose();
    }
    setTouchStartY(null);
    setDragOffsetY(0);
    setIsDragging(false);
  };

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
                ? t(
                    'Authentic Tafseer Audio (Sirat-ul-Jinan / Kanz-ul-Iman) playing.',
                    'مستند تفسیری آڈیو (صراط الجنان / کنز الایمان) جاری ہے۔',
                    'جاري تشغيل التفسير الصوتي المعتمد (صراط الجنان / كنز الإيمان).',
                    'Mustanad Tafseeri Audio (Sirat-ul-Jinan / Kanz-ul-Iman) jari hai.'
                  )
                : t(
                    `Ayah ${ayahNumber} authentic Urdu translation (Kanz-ul-Iman) playing.`,
                    `آیت ${ayahNumber} کا مستند اردو ترجمہ (کنز الایمان) جاری ہے۔`,
                    `جاري تشغيل الترجمة الأردية المعتمدة للآية ${ayahNumber} (كنز الإيمان).`,
                    `Ayah ${ayahNumber} ka mustanad Urdu tarjuma (Kanz-ul-Iman) jari hai.`
                  ),
              'info'
            );
          })
          .catch((e) => {
            console.warn('Audio play error in modal, trying Ayah Urdu audio fallback:', e);
            const fallback = getAyahUrduAudioFallbackUrl(surahNumber, ayahNumber);
            if (modalAudioRef.current) {
              modalAudioRef.current.src = fallback;
              modalAudioRef.current
                .play()
                .then(() => {
                  setIsSpeakingTafseer(true);
                })
                .catch(() => {
                  showAmalToast(
                    t(
                      'Audio loading timed out. Please try again.',
                      'آڈیو لوڈ کرنے میں تاخیر ہوئی۔ دوبارہ کوشش کریں۔',
                      'تأخر تحميل الصوت. يرجى المحاولة مرة أخرى.',
                      'Audio load karne mein takheer hui. Dobara koshish karein.'
                    ),
                    'warning'
                  );
                });
            }
          });
      }
    }
  };

  const handleCacheAudioOffline = async () => {
    if (!audioSrc) return;
    if (typeof window === 'undefined' || !('caches' in window)) {
      showAmalToast(
        t(
          'Offline caching is not supported in your browser.',
          'آپ کے براؤزر میں آف لائن کیشنگ دستیاب نہیں ہے۔',
          'التخزين المؤقت دون اتصال غير مدعوم في متصفحك.',
          'Aap ke browser mein offline caching dastiyab nahi hai.'
        ),
        'warning'
      );
      return;
    }
    setIsCaching(true);
    try {
      const cache = await caches.open('amal-quran-audio-v1');
      await cache.add(audioSrc);
      setIsCachedOffline(true);
      showAmalToast(
        t(
          '✓ Audio successfully saved offline!',
          '✓ آڈیو کامیابی سے آف لائن محفوظ ہو گئی!',
          '✓ تم حفظ الصوت بنجاح للاستماع دون اتصال!',
          '✓ Audio kamyabi se offline mehfooz ho gayi!'
        ),
        'success'
      );
    } catch (e) {
      console.warn('Cache error:', e);
      showAmalToast(
        t(
          'Error saving audio offline.',
          'آف لائن محفوظ کرنے میں خرابی پیش آئی۔',
          'حدث خطأ أثناء الحفظ دون اتصال.',
          'Offline mehfooz karne mein kharabi pesh aayi.'
        ),
        'warning'
      );
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
      showAmalToast(
        t(
          'Audio download started.',
          'آڈیو ڈاؤنلوڈ شروع ہو گئی ہے۔',
          'بدأ تحميل الملف الصوتي.',
          'Audio download shuru ho gayi hai.'
        ),
        'success'
      );
    } catch (e) {
      showAmalToast(
        t(
          'Download error encountered.',
          'ڈاؤنلوڈ میں خرابی پیش آئی۔',
          'حدث خطأ في التحميل.',
          'Download mein kharabi pesh aayi.'
        ),
        'warning'
      );
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
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
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
          transform: dragOffsetY > 0 ? `translateY(${dragOffsetY}px)` : 'none',
          transition: isDragging ? 'none' : 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Mobile Drag Down Pill Handle */}
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            paddingTop: 8,
            paddingBottom: 2,
            backgroundColor: '#F8FAFC',
          }}
        >
          <div
            style={{
              width: 44,
              height: 5,
              borderRadius: 3,
              backgroundColor: '#CBD5E1',
            }}
          />
        </div>

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
              📖 {t('AYAH WISDOM & LISTENING CARD', 'قرآنی حکمت و آڈیو کارڈ', 'بطاقة الحكمة والاستماع', 'AYAH WISDOM & LISTENING CARD')}
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
              title={t('Generate social media image card', 'خوبصورت سوشل میڈیا کارڈ بنائیں', 'إنشاء بطاقة لمواقع التواصل', 'Khubsurat social media card banayein')}
            >
              <span>📸</span>
              <span>{t('Create Card', 'کارڈ بنائیں', 'إنشاء بطاقة', 'Card Banayein')}</span>
            </button>

            <button
              onClick={() => {
                triggerHaptic('light');
                onClose();
              }}
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
              {
                key: 'KHAZAIN',
                label: t("Khaza'in-ul-Irfan (Tafsir)", 'خزائن العرفان (تفسیر)', 'خزائن العرفان (تفسير)', "Khaza'in-ul-Irfan (Tafseer)"),
              },
              {
                key: 'KANZ',
                label: t('Kanz-ul-Iman (Urdu)', 'کنز الایمان (اردو)', 'كنز الإيمان (أردو)', 'Kanz-ul-Iman (Urdu)'),
              },
              {
                key: 'ROMAN_URDU',
                label: t('Roman Urdu (Transliteration & Tarjuma)', 'رومن اردو (تلفظ و ترجمہ)', 'الرومانية (نطق وترجمة)', 'Roman Urdu (Talaffuz o Tarjuma)'),
              },
              {
                key: 'ENGLISH',
                label: t('English Rendering', 'انگریزی ترجمہ', 'الترجمة الإنجليزية', 'English Translation'),
              },
              {
                key: 'IBN_KATHIR',
                label: t('Tafsir Ibn Kathir', 'تفسیر ابن کثیر', 'تفسير ابن كثير', 'Tafseer Ibn Kathir'),
              },
              {
                key: 'REFERENCES',
                label: t('Scholarly References', 'معتمد کتب کے حوالے', 'مراجع الكتب المعتمدة', 'Kutub ke Hawale'),
              },
              {
                key: 'AMAL',
                label: t('Reflection & Practice', 'تدبر و مستحب عمل', 'التدبر والعمل المستحب', 'Tadabbur o Amal'),
              },
            ].map((tab) => {
              const isActive = wisdomTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => {
                    triggerHaptic('selection');
                    setWisdomTab(tab.key as AyahWisdomTabKey);
                  }}
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
            badgeContext: `${t('Ayah', 'آیت مبارکہ', 'الآية الكريمة', 'Ayah')} ${ayahNumber}`,
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

/** Memoized — avoids re-rendering 527-line modal when parent re-renders unrelated state */
export const AyahWisdomModal = memo(AyahWisdomModalInner);
