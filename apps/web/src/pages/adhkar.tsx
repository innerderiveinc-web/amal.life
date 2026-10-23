import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Navigation } from '../components/Navigation';
import { SUNNAH_ADHKAR_LIST, DhikrItem } from '../lib/adhkar-data';
import { showAmalToast } from '../components/Toast';
import { UniversalContentShareModal, UniversalCardPayload } from '../components/cards/UniversalContentShareModal';
import { useLanguage } from '../context/LanguageContext';

export default function AdhkarPage() {
  const { t, isUrdu } = useLanguage();
  // Determine default mode based on current local time
  const [activeTab, setActiveTab] = useState<'MORNING' | 'EVENING'>(() => {
    if (typeof window !== 'undefined') {
      const hour = new Date().getHours();
      return hour >= 4 && hour < 16 ? 'MORNING' : 'EVENING';
    }
    return 'MORNING';
  });

  const [counts, setCounts] = useState<Record<string, number>>({});
  const [completedIds, setCompletedIds] = useState<Record<string, boolean>>({});
  const [hapticEnabled, setHapticEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showTransliteration, setShowTransliteration] = useState(false);
  const [showEnglish, setShowEnglish] = useState(true);
  const [sharePayload, setSharePayload] = useState<UniversalCardPayload | null>(null);

  // Date key for local daily persistence: YYYY-MM-DD
  const todayKey = useMemo(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }, []);

  // Filter adhkar according to active tab
  const filteredAdhkar = useMemo(() => {
    return SUNNAH_ADHKAR_LIST.filter(
      (item) => item.category === activeTab || item.category === 'BOTH'
    );
  }, [activeTab]);

  // Load saved progress from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedCounts = localStorage.getItem(`amal_adhkar_counts_${todayKey}`);
        const savedCompleted = localStorage.getItem(`amal_adhkar_done_${todayKey}`);
        if (savedCounts) setCounts(JSON.parse(savedCounts));
        if (savedCompleted) setCompletedIds(JSON.parse(savedCompleted));
      } catch (e) {
        console.error(e);
      }
    }
  }, [todayKey]);

  // Save progress whenever counts change
  const saveProgress = useCallback((newCounts: Record<string, number>, newCompleted: Record<string, boolean>) => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(`amal_adhkar_counts_${todayKey}`, JSON.stringify(newCounts));
        localStorage.setItem(`amal_adhkar_done_${todayKey}`, JSON.stringify(newCompleted));
      } catch (e) {
        console.error(e);
      }
    }
  }, [todayKey]);

  // Audio Synth & Haptic Feedback
  const triggerFeedback = useCallback((isComplete: boolean) => {
    // 1. Haptic Vibration
    if (hapticEnabled && typeof window !== 'undefined' && 'vibrate' in navigator) {
      if (isComplete) {
        navigator.vibrate([60, 40, 80, 40, 100]);
      } else {
        navigator.vibrate(25);
      }
    }

    // 2. Audio Click
    if (soundEnabled && typeof window !== 'undefined') {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) {
          const ctx = new AudioCtx();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(isComplete ? 784 : 440, ctx.currentTime);
          gain.gain.setValueAtTime(0.06, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + (isComplete ? 0.22 : 0.06));
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + (isComplete ? 0.22 : 0.06));
        }
      } catch (_) {}
    }
  }, [hapticEnabled, soundEnabled]);

  // Increment Dhikr Count
  const handleTapDhikr = (item: DhikrItem) => {
    const current = counts[item.id] || 0;
    const next = current + 1;
    const isNowDone = next >= item.targetCount;

    const newCounts = { ...counts, [item.id]: next };
    const newCompleted = { ...completedIds, [item.id]: isNowDone };

    setCounts(newCounts);
    setCompletedIds(newCompleted);
    saveProgress(newCounts, newCompleted);
    triggerFeedback(isNowDone);

    if (isNowDone && current < item.targetCount) {
      showAmalToast(`سبحان اللہ! ${item.titleUrdu} مکمل ہو گیا`, 'success');
    }
  };

  // Reset Single Dhikr
  const handleResetSingle = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newCounts = { ...counts, [id]: 0 };
    const newCompleted = { ...completedIds, [id]: false };
    setCounts(newCounts);
    setCompletedIds(newCompleted);
    saveProgress(newCounts, newCompleted);
  };

  // Reset Entire Session
  const handleResetAll = () => {
    if (confirm(t('Reset all adhkar counters for today?', 'کیا آپ آج کے تمام اذکار کا کاؤنٹر دوبارہ صفر کرنا چاہتے ہیں؟'))) {
      setCounts({});
      setCompletedIds({});
      saveProgress({}, {});
      showAmalToast(t('All counters have been reset', 'تمام اذکار دوبارہ ری سیٹ ہو گئے'), 'info');
    }
  };

  // Progress metrics
  const totalInCurrentTab = filteredAdhkar.length;
  const completedInCurrentTab = filteredAdhkar.filter(
    (item) => completedIds[item.id] || (counts[item.id] || 0) >= item.targetCount
  ).length;
  const completionPercentage = totalInCurrentTab > 0 ? Math.round((completedInCurrentTab / totalInCurrentTab) * 100) : 0;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F8FAF9' }}>
      <Head>
        <title>{t('Morning & Evening Sunnah Adhkar | AMAL OS', 'صبح و شام کے مسنون اذکار | امل او ایس')}</title>
        <meta
          name="description"
          content="Authentic Morning and Evening prophetic Adhkar (Hisn al-Hasin, Bahar-e-Shariat, Sahih Hadith) with interactive digital tap ring, virtues, and progress tracking."
        />
      </Head>

      <Navigation />

      <main style={{ maxWidth: 960, margin: '0 auto', padding: '0 20px 80px' }}>
        {/* Header Banner */}
        <div style={{ marginBottom: 24, textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, backgroundColor: '#ECFDF5', padding: '6px 16px', borderRadius: 20, marginBottom: 12, border: '1px solid #A7F3D0' }}>
            <span style={{ fontSize: 16 }}>🌿</span>
            <span style={{ fontSize: 13, fontWeight: 800, color: '#065F46' }}>
              {t('Authentic Sunnah Adhkar for Protection & Blessing (Al-Hisn al-Hasin & Bahar-e-Shariat)', 'مستند مسنون معمولات برائے حفظ و برکت (حصنِ حصین و بہارِ شریعت)')}
            </span>
          </div>

          <h1 style={{ fontSize: 32, fontWeight: 900, color: '#064E3B', margin: '0 0 8px', letterSpacing: -0.5 }}>
            {t('Morning & Evening Sunnah Adhkar', 'صبح و شام کے مسنون اذکار و دعائیں')}
          </h1>
          {isUrdu ? (
            <div dir="rtl" className="font-urdu" style={{ fontSize: 22, color: '#92400E', fontWeight: 700, marginBottom: 10 }}>
              صبح و شام کے مسنون اذکار و دعائیں
            </div>
          ) : (
            <div style={{ fontSize: 14, color: '#065F46', fontWeight: 700, marginBottom: 10 }}>
              Prophetic Protection & Daily Remembrances
            </div>
          )}
          <p style={{ maxWidth: 640, margin: '0 auto', fontSize: 14, color: '#475569', lineHeight: 1.6 }}>
            {t(
              'Prophetic invocations prescribed for the start of the morning (after Fajr) and evening (after Asr/Maghrib) for complete spiritual protection, forgiveness, and peace of heart.',
              'حضور نبی کریم ﷺ کے ارشادات کے مطابق صبح (بعد نمازِ فجر) اور شام (بعد نمازِ عصر/مغرب) کے مسنون اذکار برائے روحانی حفاظت، مغفرت اور قلبی سکون۔'
            )}
          </p>
        </div>

        {/* TIME-OF-DAY TOGGLE & PROGRESS HUB */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 16,
            padding: '20px 24px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
            marginBottom: 24,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 16 }}>
            {/* Morning vs Evening Tab Switcher */}
            <div style={{ display: 'flex', gap: 4, backgroundColor: '#F1F5F9', padding: 4, borderRadius: 12 }}>
              <button
                type="button"
                onClick={() => setActiveTab('MORNING')}
                style={{
                  padding: '10px 20px',
                  borderRadius: 10,
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 14,
                  fontWeight: 800,
                  backgroundColor: activeTab === 'MORNING' ? '#064E3B' : 'transparent',
                  color: activeTab === 'MORNING' ? '#FFFFFF' : '#475569',
                  boxShadow: activeTab === 'MORNING' ? '0 2px 8px rgba(6,78,59,0.25)' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  transition: 'all 0.15s ease',
                }}
              >
                <span>🌅</span>
                <span>{t('Morning Adhkar', 'صبح کے اذکار')}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('EVENING')}
                style={{
                  padding: '10px 20px',
                  borderRadius: 10,
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 14,
                  fontWeight: 800,
                  backgroundColor: activeTab === 'EVENING' ? '#0F172A' : 'transparent',
                  color: activeTab === 'EVENING' ? '#FFFFFF' : '#475569',
                  boxShadow: activeTab === 'EVENING' ? '0 2px 8px rgba(15,23,42,0.3)' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  transition: 'all 0.15s ease',
                }}
              >
                <span>🌙</span>
                <span>{t('Evening Adhkar', 'شام کے اذکار')}</span>
              </button>
            </div>

            {/* Controls Bar: Audio, Haptics, Reset */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => setHapticEnabled(!hapticEnabled)}
                title="Toggle Vibration"
                style={{
                  padding: '6px 12px',
                  borderRadius: 8,
                  border: '1px solid #CBD5E1',
                  backgroundColor: hapticEnabled ? '#ECFDF5' : '#FFFFFF',
                  color: hapticEnabled ? '#065F46' : '#64748B',
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                {hapticEnabled ? '📳 Haptic On' : '📳 Haptic Off'}
              </button>

              <button
                type="button"
                onClick={() => setSoundEnabled(!soundEnabled)}
                title="Toggle Sound"
                style={{
                  padding: '6px 12px',
                  borderRadius: 8,
                  border: '1px solid #CBD5E1',
                  backgroundColor: soundEnabled ? '#ECFDF5' : '#FFFFFF',
                  color: soundEnabled ? '#065F46' : '#64748B',
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                {soundEnabled ? '🔊 Audio On' : '🔇 Muted'}
              </button>

              <button
                type="button"
                onClick={() => setShowTransliteration(!showTransliteration)}
                title="Toggle Roman Transliteration"
                style={{
                  padding: '6px 12px',
                  borderRadius: 8,
                  border: '1px solid #CBD5E1',
                  backgroundColor: showTransliteration ? '#FEF3C7' : '#FFFFFF',
                  color: showTransliteration ? '#92400E' : '#64748B',
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                🔤 Transliteration
              </button>

              <button
                type="button"
                onClick={handleResetAll}
                title="Reset All Counts for Today"
                style={{
                  padding: '6px 12px',
                  borderRadius: 8,
                  border: '1px solid #FCA5A5',
                  backgroundColor: '#FEF2F2',
                  color: '#991B1B',
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                🔄 Reset
              </button>
            </div>
          </div>

          {/* Progress Bar & Summary */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6, fontSize: 13, fontWeight: 700 }}>
              <span style={{ color: '#064E3B' }}>
                {t(
                  `Completed (${activeTab === 'MORNING' ? 'Morning' : 'Evening'}): ${completedInCurrentTab} of ${totalInCurrentTab} (${completionPercentage}%)`,
                  `آج کے مکمل اذکار (${activeTab === 'MORNING' ? 'صبح' : 'شام'}): ${completedInCurrentTab} از ${totalInCurrentTab} (${completionPercentage}%)`
                )}
              </span>
              <span style={{ color: completionPercentage === 100 ? '#166534' : '#64748B' }}>
                {completionPercentage === 100
                  ? t('🎉 Complete! Today\'s adhkar routine finished', '🎉 مبارک! آج کا پورا معمول مکمل ہو گیا')
                  : t(`${totalInCurrentTab - completedInCurrentTab} remaining`, `${totalInCurrentTab - completedInCurrentTab} اذکار باقی ہیں`)}
              </span>
            </div>

            <div style={{ height: 8, width: '100%', backgroundColor: '#E2E8F0', borderRadius: 4, overflow: 'hidden' }}>
              <div
                style={{
                  height: '100%',
                  width: `${completionPercentage}%`,
                  backgroundColor: completionPercentage === 100 ? '#166534' : '#10B981',
                  transition: 'width 0.3s ease',
                }}
              />
            </div>
          </div>
        </div>

        {/* ADHKAR CARDS LIST */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {filteredAdhkar.map((item, index) => {
            const currentCount = counts[item.id] || 0;
            const isCompleted = completedIds[item.id] || currentCount >= item.targetCount;
            const progressRatio = Math.min(1, currentCount / item.targetCount);

            return (
              <div
                key={item.id}
                onClick={() => handleTapDhikr(item)}
                style={{
                  backgroundColor: isCompleted ? '#F0FDF4' : '#FFFFFF',
                  borderRadius: 16,
                  border: isCompleted ? '2px solid #34D399' : '1px solid #E2E8F0',
                  padding: '24px 28px',
                  boxShadow: isCompleted ? '0 4px 14px rgba(16,185,129,0.12)' : '0 2px 8px rgba(0,0,0,0.03)',
                  cursor: 'pointer',
                  userSelect: 'none',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                }}
              >
                {/* Top Badge: Number, Title, Target Count & Tap Ring */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18, flexWrap: 'wrap', gap: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: '50%',
                        backgroundColor: isCompleted ? '#166534' : '#064E3B',
                        color: '#FFFFFF',
                        fontWeight: 800,
                        fontSize: 14,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {index + 1}
                    </div>

                    <div>
                      <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: '#0F172A' }}>
                        {isUrdu ? item.titleUrdu : item.titleEnglish}
                      </h3>
                      <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>
                        {isUrdu ? item.titleEnglish : (item.titleArabic || item.titleUrdu)} • {item.sourceHadith}
                      </div>
                    </div>
                  </div>

                  {/* Interactive Digital Tap Ring */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div
                      style={{
                        position: 'relative',
                        width: 64,
                        height: 64,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {/* Circular SVG Ring */}
                      <svg width="64" height="64" style={{ transform: 'rotate(-90deg)' }}>
                        <circle
                          cx="32"
                          cy="32"
                          r="26"
                          stroke="#E2E8F0"
                          strokeWidth="5"
                          fill="none"
                        />
                        <circle
                          cx="32"
                          cy="32"
                          r="26"
                          stroke={isCompleted ? '#166534' : '#10B981'}
                          strokeWidth="5"
                          strokeDasharray={163.3}
                          strokeDashoffset={163.3 * (1 - progressRatio)}
                          strokeLinecap="round"
                          fill="none"
                          style={{ transition: 'stroke-dashoffset 0.2s ease' }}
                        />
                      </svg>

                      {/* Center Counter */}
                      <div
                        style={{
                          position: 'absolute',
                          textAlign: 'center',
                          pointerEvents: 'none',
                        }}
                      >
                        <div style={{ fontSize: 15, fontWeight: 900, color: isCompleted ? '#166534' : '#064E3B', lineHeight: 1 }}>
                          {currentCount}
                        </div>
                        <div style={{ fontSize: 10, color: '#64748B', fontWeight: 700 }}>
                          /{item.targetCount}
                        </div>
                      </div>
                    </div>

                    {/* Reset Button */}
                    {currentCount > 0 && (
                      <button
                        type="button"
                        onClick={(e) => handleResetSingle(item.id, e)}
                        title="Reset Counter"
                        style={{
                          padding: '4px 8px',
                          borderRadius: 6,
                          border: '1px solid #CBD5E1',
                          backgroundColor: '#FFFFFF',
                          color: '#64748B',
                          fontSize: 11,
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                      >
                        {t('Reset', 'صفر ↺')}
                      </button>
                    )}

                    {/* Share Card Generator Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSharePayload({
                          category: 'DUA',
                          categoryLabelUrdu: activeTab === 'MORNING' ? 'اذکارِ صباح' : 'اذکارِ مساء',
                          categoryLabelEnglish: activeTab === 'MORNING' ? 'Morning Sunnah Dhikr' : 'Evening Sunnah Dhikr',
                          titleUrdu: item.titleUrdu,
                          titleEnglish: item.titleEnglish,
                          arabicText: item.arabicText,
                          primaryTextUrdu: item.translationUrdu,
                          secondaryTextEnglish: item.translationEnglish,
                          sourceCitation: item.sourceHadith,
                          badgeContext: isUrdu ? `${item.targetCount} مرتبہ · فضیلت و برکت` : `${item.targetCount}x · Virtue & Merits`,
                        });
                      }}
                      title={t('Create shareable visual card for this Dua', 'اس دعا کا خوبصورت کارڈ بنائیں برائے واٹس ایپ و سوشل میڈیا')}
                      style={{
                        padding: '4px 10px',
                        borderRadius: 6,
                        border: '1px solid #A7F3D0',
                        backgroundColor: '#ECFDF5',
                        color: '#064E3B',
                        fontSize: 11,
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                      }}
                    >
                      <span>📸</span>
                      <span>{t('Card', 'کارڈ')}</span>
                    </button>
                  </div>
                </div>

                {/* ARABIC TEXT (Centered, Reverent Typography) */}
                <div
                  dir="rtl"
                  style={{
                    fontFamily: 'var(--font-arabic), "Amiri", "Traditional Arabic", serif',
                    fontSize: 26,
                    lineHeight: 2.2,
                    textAlign: 'center',
                    color: '#064E3B',
                    padding: '16px 20px',
                    backgroundColor: isCompleted ? '#ECFDF5' : '#F8FAFC',
                    borderRadius: 12,
                    marginBottom: 16,
                    border: '1px solid',
                    borderColor: isCompleted ? '#A7F3D0' : '#E2E8F0',
                  }}
                >
                  {item.arabicText}
                </div>

                {/* Transliteration */}
                {showTransliteration && (
                  <div style={{ fontSize: 13, color: '#475569', fontStyle: 'italic', marginBottom: 12, textAlign: 'center', lineHeight: 1.6 }}>
                    {item.transliteration}
                  </div>
                )}

                {/* PRIMARY TRANSLATION BOX */}
                {isUrdu ? (
                  <div
                    dir="rtl"
                    className="font-urdu"
                    style={{
                      fontSize: 16,
                      lineHeight: 2.1,
                      textAlign: 'right',
                      color: '#1E293B',
                      marginBottom: 12,
                      backgroundColor: '#FFFBEB',
                      padding: '12px 18px',
                      borderRadius: 10,
                      border: '1px solid #FEF3C7',
                    }}
                  >
                    <strong style={{ color: '#92400E', fontSize: 13, display: 'block', marginBottom: 4 }}>
                      ترجمہ و مفہوم:
                    </strong>
                    {item.translationUrdu}
                  </div>
                ) : (
                  <div
                    style={{
                      fontSize: 14,
                      lineHeight: 1.6,
                      color: '#1E293B',
                      marginBottom: 12,
                      backgroundColor: '#F8FAFC',
                      padding: '12px 18px',
                      borderRadius: 10,
                      border: '1px solid #E2E8F0',
                    }}
                  >
                    <strong style={{ color: '#064E3B', fontSize: 13, display: 'block', marginBottom: 4 }}>
                      English Meaning:
                    </strong>
                    {item.translationEnglish}
                  </div>
                )}

                {/* SECONDARY TRANSLATION (URDU FOR NON-URDU MODE IF DESIRED) */}
                {!isUrdu && showEnglish && item.translationUrdu && (
                  <details style={{ marginBottom: 12, fontSize: 12, color: '#64748B' }}>
                    <summary style={{ cursor: 'pointer', fontWeight: 600, color: '#92400E' }}>
                      Show Urdu Translation (اردو ترجمہ)
                    </summary>
                    <div
                      dir="rtl"
                      className="font-urdu"
                      style={{
                        marginTop: 6,
                        padding: '10px 14px',
                        backgroundColor: '#FFFBEB',
                        borderRadius: 8,
                        color: '#1E293B',
                        lineHeight: 1.9,
                        fontSize: 14,
                      }}
                    >
                      {item.translationUrdu}
                    </div>
                  </details>
                )}

                {/* VIRTUES & SPIRITUAL MERITS */}
                <div
                  style={{
                    padding: '10px 14px',
                    borderRadius: 8,
                    backgroundColor: '#F1F5F9',
                    borderLeft: '4px solid #065F46',
                    fontSize: 12,
                    color: '#334155',
                    lineHeight: 1.6,
                  }}
                >
                  <span style={{ fontWeight: 800, color: '#065F46' }}>
                    {t('✨ Spiritual Merit & Virtue: ', '✨ فضیلت و برکت: ')}
                  </span>
                  <span>{isUrdu ? item.virtueUrdu : (item.virtueEnglish || item.virtueUrdu)}</span>
                </div>

                {/* Tap Helper Hint */}
                <div style={{ marginTop: 12, textAlign: 'center', fontSize: 11, color: isCompleted ? '#166534' : '#94A3B8', fontWeight: 600 }}>
                  {isCompleted
                    ? t('✓ Completed (You may continue tapping)', '✓ یہ دعا مکمل ہو چکی ہے (ٹپ جاری رکھ سکتے ہیں)')
                    : t(`👆 Tap anywhere on card to count (${Math.max(0, item.targetCount - currentCount)} remaining)`, `👆 کاؤنٹر بڑھانے کے لیے کارڈ پر کہیں بھی ٹپ کریں (باقی: ${Math.max(0, item.targetCount - currentCount)})`)}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Sacred Universal Share Modal */}
      {sharePayload && (
        <UniversalContentShareModal
          isOpen={!!sharePayload}
          onClose={() => setSharePayload(null)}
          payload={sharePayload}
        />
      )}
    </div>
  );
}
