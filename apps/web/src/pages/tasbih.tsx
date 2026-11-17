import React, { useState, useRef, useEffect, useMemo } from 'react';
import Head from 'next/head';
import { Navigation } from '../components/Navigation';
import { MasnoonTasbihEngine, TasbihPreset, TasbihSessionState } from '@amal/amal-engine';
import { AmalTheme } from '@amal/ui';
import { showAmalToast } from '../components/Toast';
import { useLanguage } from '../context/LanguageContext';
import { triggerHaptic } from '../lib/haptics';
import { useWakeLock } from '../hooks/useWakeLock';
import {
  UniversalContentShareModal,
  UniversalCardPayload,
} from '../components/cards/UniversalContentShareModal';

export default function TasbihPage() {
  const { t, isUrdu, isArabic } = useLanguage();
  useWakeLock(true); // Keeps device display active during sacred Tasbih counter sessions
  const presets = MasnoonTasbihEngine.getAllPresets();
  const [selectedPresetId, setSelectedPresetId] = useState<string>(presets[0]?.id || 'subhanallah');
  const [session, setSession] = useState<TasbihSessionState>(
    MasnoonTasbihEngine.reset(presets[0]?.id || 'subhanallah')
  );
  const [selectedTarget, setSelectedTarget] = useState<number | null>(null);
  const [hapticEnabled, setHapticEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isFullscreenTap, setIsFullscreenTap] = useState(false);
  const [sharePayload, setSharePayload] = useState<UniversalCardPayload | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Persistence of Daily and Lifetime Counts
  const todayKey = useMemo(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }, []);

  const [dailyTotal, setDailyTotal] = useState<number>(0);
  const [lifetimeTotal, setLifetimeTotal] = useState<number>(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedDaily = localStorage.getItem(`amal_tasbih_daily_${todayKey}`);
        const savedLife = localStorage.getItem('amal_tasbih_lifetime');
        if (savedDaily) setDailyTotal(parseInt(savedDaily, 10) || 0);
        if (savedLife) setLifetimeTotal(parseInt(savedLife, 10) || 0);
      } catch (_) {}
    }
  }, [todayKey]);

  const activePreset: TasbihPreset | undefined = presets.find(p => p.id === selectedPresetId);
  const target = selectedTarget || (activePreset ? activePreset.targetCount : 33);
  const progressPercent = Math.min(100, (session.currentCount / target) * 100);

  const triggerFeedback = (type: 'TICK' | 'THRESHOLD_REACHED' | 'CYCLE_COMPLETE') => {
    // 1. Tactile Web Haptics Engine
    if (hapticEnabled) {
      if (type === 'CYCLE_COMPLETE') {
        triggerHaptic('success');
      } else if (type === 'THRESHOLD_REACHED') {
        triggerHaptic('medium');
      } else {
        triggerHaptic('light');
      }
    }

    // 2. Gentle Audio Click (Reused singleton Web Audio API synth)
    if (soundEnabled && typeof window !== 'undefined') {
      try {
        const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
        if (AudioCtxClass) {
          if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
            audioCtxRef.current = new AudioCtxClass();
          }
          const ctx = audioCtxRef.current;
          if (ctx.state === 'suspended') {
            ctx.resume().catch(() => {});
          }
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(type === 'CYCLE_COMPLETE' ? 880 : type === 'THRESHOLD_REACHED' ? 660 : 440, ctx.currentTime);
          gain.gain.setValueAtTime(0.08, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + (type === 'CYCLE_COMPLETE' ? 0.25 : 0.08));
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + (type === 'CYCLE_COMPLETE' ? 0.25 : 0.08));
        }
      } catch (_) {}
    }
  };

  const handleTap = () => {
    const nextCount = session.currentCount + 1;
    const nextTotalInSession = session.totalCountsInSession + 1;
    const nextDaily = dailyTotal + 1;
    const nextLife = lifetimeTotal + 1;

    setDailyTotal(nextDaily);
    setLifetimeTotal(nextLife);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(`amal_tasbih_daily_${todayKey}`, String(nextDaily));
        localStorage.setItem('amal_tasbih_lifetime', String(nextLife));
      } catch (_) {}
    }

    const isComplete = nextCount >= target;
    const nextState: TasbihSessionState = {
      presetId: session.presetId,
      currentCount: isComplete ? 0 : nextCount,
      roundsCompleted: isComplete ? session.roundsCompleted + 1 : session.roundsCompleted,
      totalCountsInSession: nextTotalInSession,
      isComplete,
    };

    setSession(nextState);

    let hapticType: 'TICK' | 'THRESHOLD_REACHED' | 'CYCLE_COMPLETE' = 'TICK';
    if (isComplete) {
      hapticType = 'CYCLE_COMPLETE';
    } else if (nextCount === 33 || nextCount === 66 || nextCount === 99 || nextCount === 100) {
      hapticType = 'THRESHOLD_REACHED';
    }

    triggerFeedback(hapticType);

    if (isComplete) {
      showAmalToast(
        t(
          `Masha'Allah! Cycle completed: ${activePreset?.arabicText || 'Done'} (${nextState.roundsCompleted} rounds)`,
          `ماشاء اللہ! ایک دور مکمل ہوا: ${activePreset?.arabicText || 'مکمل'} (${nextState.roundsCompleted} چکر)`,
          `ما شاء الله! اكتملت الدورة: ${activePreset?.arabicText || 'تمت'} (${nextState.roundsCompleted} دورات)`,
          `Masha'Allah! Ek round mukammal hua: ${activePreset?.transliteration || 'Complete'} (${nextState.roundsCompleted} rounds)`
        ),
        'success'
      );
    }
  };

  const handleSelectPreset = (id: string) => {
    triggerHaptic('selection');
    setSelectedPresetId(id);
    setSelectedTarget(null);
    setSession(MasnoonTasbihEngine.reset(id));
  };

  const handleReset = () => {
    triggerHaptic('heavy');
    setSession(MasnoonTasbihEngine.reset(selectedPresetId));
    showAmalToast(
      t('Tasbih counter reset', 'تسبیح کاؤنٹر صفر کر دیا گیا', 'تمت إعادة ضبط المسبحة', 'Tasbih counter reset ho gaya'),
      'info'
    );
  };

  const handleShareZikr = () => {
    if (!activePreset) return;
    setSharePayload({
      category: 'DUA',
      categoryLabelUrdu: 'مسنون تسبیحات و اذکار',
      categoryLabelEnglish: 'Prophetic Tasbih & Remembrance',
      titleArabic: activePreset.arabicText,
      titleUrdu: activePreset.transliteration,
      titleEnglish: activePreset.transliteration,
      arabicText: activePreset.arabicText,
      primaryTextUrdu: `${activePreset.urduTranslation}\n\nفضیلت و برکت: ${activePreset.fadilahUrdu}`,
      secondaryTextEnglish: `${activePreset.englishTranslation} — ${activePreset.fadilahEnglish}`,
      sourceCitation: activePreset.hadithSource,
      badgeContext: `ہدف: ${target} بار`,
    });
  };
  // Keyboard accessibility: Space or Enter to increment, R to reset
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }
      if (e.code === 'Space' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        handleTap();
      } else if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        handleReset();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [session, selectedPresetId, hapticEnabled, soundEnabled, target]);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FDFBF7', paddingBottom: 100 }}>
      <Head>
        <title>{t('Digital Masnoon Tasbih | AMAL OS', 'مسنون تسبیح و ذکر کاؤنٹر | امل او ایس', 'المسبحة الإلكترونية المسنونة | أمل', 'Digital Masnoon Tasbih | AMAL OS')}</title>
        <meta name="description" content="Tactile Digital Tasbih Counter, Daily Masnoon Adhkar, and Sunnah Liturgies." />
      </Head>

      <Navigation />

      <main style={{ maxWidth: 840, margin: '0 auto', padding: '0 20px' }}>
        {/* Header Title */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <span style={{ fontSize: 32 }}>📿</span>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: '#1E293B', margin: '8px 0 4px 0' }}>
            {t(
              'Digital Masnoon Tasbih',
              'مسنون تسبیح و ذکر کاؤنٹر',
              'المسبحة الإلكترونية النبوية',
              'Masnoon Tasbih o Zikr Counter'
            )}
          </h1>
          <p style={{ fontSize: 14, color: '#64748B', margin: 0 }}>
            {t(
              'Digital Masnoon Tasbih with Gentle Haptic Feedback & Authentic Sunnah Adhkar',
              'مسنون تسبیحات و اذکار مع لائیو فیڈبیک اور سنت کے مطابق شمار',
              'تسبيح مسنون مع ردود فعل لمسية لطيفة وأذكار سنية معتمدة',
              'Masnoon Tasbihat o Azkar gentle haptic feedback ke sath'
            )}
          </p>
        </div>

        {/* Preset Selector Chips */}
        <div
          style={{
            display: 'flex',
            gap: 8,
            overflowX: 'auto',
            paddingBottom: 12,
            marginBottom: 24,
            justifyContent: 'flex-start',
          }}
        >
          {presets.map(p => {
            const isSelected = p.id === selectedPresetId;
            return (
              <button
                key={p.id}
                onClick={() => handleSelectPreset(p.id)}
                style={{
                  border: isSelected ? `2px solid ${AmalTheme.colors.primary}` : '1px solid #E2E8F0',
                  borderRadius: 24,
                  padding: '8px 16px',
                  backgroundColor: isSelected ? '#ECFDF5' : '#FFFFFF',
                  color: isSelected ? '#065F46' : '#475569',
                  cursor: 'pointer',
                  fontWeight: 700,
                  fontSize: 13,
                  whiteSpace: 'nowrap',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                }}
              >
                {p.arabicText} ({p.targetCount})
              </button>
            );
          })}
        </div>

        {/* Main Interactive Counter Card */}
        {activePreset && (
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 24,
              border: '1px solid #E2E8F0',
              padding: '36px 24px',
              textAlign: 'center',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* Arabic Text */}
            <div
              style={{
                fontSize: 38,
                fontWeight: 800,
                color: '#1B4332',
                fontFamily: "'Amiri', 'Traditional Arabic', serif",
                marginBottom: 8,
              }}
            >
              {activePreset.arabicText}
            </div>

            {/* Transliteration */}
            <div style={{ fontSize: 16, fontWeight: 600, color: '#0F766E', marginBottom: 6 }}>
              {activePreset.transliteration}
            </div>

            {/* Urdu & English Translations */}
            {isUrdu || isArabic ? (
              <>
                <div style={{ fontSize: 16, color: '#1B4332', marginBottom: 4, fontWeight: 700 }} className="font-urdu">
                  {activePreset.urduTranslation}
                </div>
                <div style={{ fontSize: 12, color: '#64748B', maxWidth: 500, marginBottom: 28 }}>
                  {activePreset.englishTranslation}
                </div>
              </>
            ) : (
              <div style={{ fontSize: 15, color: '#1E293B', marginBottom: 28, fontWeight: 600 }}>
                {activePreset.englishTranslation}
              </div>
            )}

            {/* BIG TAP CIRCLE */}
            <div
              role="button"
              tabIndex={0}
              aria-label={t('Increment Tasbih Count', 'تسبیح شمار کریں', 'زيادة التسبيح', 'Count Tasbih')}
              onClick={handleTap}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                  e.preventDefault();
                  handleTap();
                }
              }}
              style={{
                width: 220,
                height: 220,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #1B4332 0%, #2D6A4F 100%)',
                color: '#FFFFFF',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                userSelect: 'none',
                boxShadow: '0 20px 25px -5px rgba(27, 67, 50, 0.3), 0 8px 10px -6px rgba(27, 67, 50, 0.2)',
                position: 'relative',
                transition: 'transform 0.08s ease',
                outline: 'none',
              }}
              onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.96)')}
              onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
              onTouchStart={e => (e.currentTarget.style.transform = 'scale(0.96)')}
              onTouchEnd={e => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <div style={{ fontSize: 64, fontWeight: 900, lineHeight: 1 }}>
                {session.currentCount}
              </div>
              <div style={{ fontSize: 14, color: '#D8F3DC', marginTop: 4, fontWeight: 600 }}>
                {t(`Target: ${target}`, `ہدف: ${target}`, `الهدف: ${target}`, `Hadaf: ${target}`)}
              </div>
              <div style={{ fontSize: 11, color: '#95D5B2', marginTop: 8 }}>
                {t(
                  'Tap or Press Space to count',
                  'شمار کے لیے چھوئیں یا اسپیس دبائیں',
                  'المس أو اضغط مسافة للعد',
                  'Tap karein ya Space dabayein'
                )}
              </div>
            </div>

            {/* Progress Bar under circle */}
            <div
              style={{
                width: '100%',
                maxWidth: 320,
                height: 6,
                backgroundColor: '#E2E8F0',
                borderRadius: 3,
                marginTop: 28,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${progressPercent}%`,
                  height: '100%',
                  backgroundColor: '#10B981',
                  transition: 'width 0.15s ease',
                }}
              />
            </div>

            {/* Target Count Quick Selector */}
            <div style={{ marginTop: 20, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#64748B' }}>
                {t('Target:', 'ہدف:', 'الهدف:', 'Target:')}
              </span>
              {[33, 100, 313, 1000].map((count) => {
                const isCurrent = target === count;
                return (
                  <button
                    key={count}
                    onClick={() => {
                      triggerHaptic('selection');
                      setSelectedTarget(count);
                    }}
                    style={{
                      padding: '4px 10px',
                      borderRadius: 16,
                      border: isCurrent ? '1.5px solid #065F46' : '1px solid #CBD5E1',
                      backgroundColor: isCurrent ? '#D1FAE5' : '#F8FAFC',
                      color: isCurrent ? '#065F46' : '#475569',
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    {count}x
                  </button>
                );
              })}
            </div>

            {/* Session Stats & Daily Record */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))',
                gap: 12,
                width: '100%',
                maxWidth: 480,
                marginTop: 20,
                padding: '12px 16px',
                backgroundColor: '#F8FAFC',
                borderRadius: 14,
                border: '1px solid #E2E8F0',
                textAlign: 'center',
              }}
            >
              <div>
                <div style={{ fontSize: 10, color: '#64748B' }}>
                  {t('Rounds', 'دور (چکر)', 'الدورات', 'Rounds')}
                </div>
                <div style={{ fontSize: 16, fontWeight: 800, color: '#1E293B' }}>
                  {session.roundsCompleted}
                </div>
              </div>

              <div>
                <div style={{ fontSize: 10, color: '#64748B' }}>
                  {t('Session', 'اس نشست', 'الجلسة', 'Session')}
                </div>
                <div style={{ fontSize: 16, fontWeight: 800, color: AmalTheme.colors.primary }}>
                  {session.totalCountsInSession}
                </div>
              </div>

              <div>
                <div style={{ fontSize: 10, color: '#047857' }}>
                  {t('Today', 'آج کا کل', 'اليوم', 'Aaj Total')}
                </div>
                <div style={{ fontSize: 16, fontWeight: 800, color: '#065F46' }}>
                  {dailyTotal}
                </div>
              </div>

              <div>
                <div style={{ fontSize: 10, color: '#64748B' }}>
                  {t('Lifetime', 'کل ذکر', 'المجموع', 'Lifetime')}
                </div>
                <div style={{ fontSize: 16, fontWeight: 800, color: '#334155' }}>
                  {lifetimeTotal}
                </div>
              </div>
            </div>

            {/* Action Buttons: Fullscreen Tap & Share as Status/Wallpaper */}
            <div style={{ display: 'flex', gap: 10, marginTop: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
              <button
                onClick={() => {
                  triggerHaptic('medium');
                  setIsFullscreenTap(true);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '8px 14px',
                  backgroundColor: '#ECFDF5',
                  border: '1px solid #A7F3D0',
                  borderRadius: 10,
                  fontSize: 12,
                  fontWeight: 700,
                  color: '#065F46',
                  cursor: 'pointer',
                }}
              >
                <span>🖐️</span>
                <span>{t('Tap Anywhere Mode', 'پورے اسکرین پر چھوئیں', 'وضع اللمس الكامل', 'Tap Anywhere Mode')}</span>
              </button>

              <button
                onClick={handleShareZikr}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '8px 14px',
                  backgroundColor: '#FFFBEB',
                  border: '1px solid #FDE68A',
                  borderRadius: 10,
                  fontSize: 12,
                  fontWeight: 700,
                  color: '#92400E',
                  cursor: 'pointer',
                }}
              >
                <span>📸</span>
                <span>{t('Share Wallpaper / Status', 'اسٹیٹس و وال پیپر بنائیں', 'بطاقة / خلفية', 'Wallpaper & Status')}</span>
              </button>

              <button
                onClick={handleReset}
                style={{
                  backgroundColor: '#F1F5F9',
                  border: '1px solid #CBD5E1',
                  borderRadius: 10,
                  padding: '8px 14px',
                  fontSize: 12,
                  fontWeight: 600,
                  color: '#475569',
                  cursor: 'pointer',
                }}
              >
                {t('Reset', 'صفر کریں', 'إعادة ضبط', 'Reset')}
              </button>
            </div>

            {/* Toggles for Haptic & Sound */}
            <div style={{ display: 'flex', gap: 16, marginTop: 16 }}>
              <label style={{ fontSize: 12, color: '#64748B', display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={hapticEnabled}
                  onChange={e => setHapticEnabled(e.target.checked)}
                />
                {t('📳 Haptic on Tap', '📳 لمسی ارتعاش (وائبریشن)', '📳 اهتزاز عند اللمس', '📳 Haptic / Vibration')}
              </label>

              <label style={{ fontSize: 12, color: '#64748B', display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={soundEnabled}
                  onChange={e => setSoundEnabled(e.target.checked)}
                />
                {t('🔊 Audio Click', '🔊 صوتی اثر (آواز)', '🔊 صوت النقر', '🔊 Audio Click')}
              </label>
            </div>

            {/* Hadith & Fadilah Box */}
            <div
              style={{
                marginTop: 28,
                width: '100%',
                backgroundColor: '#ECFDF5',
                borderRadius: 16,
                padding: '18px 20px',
                border: '1px solid #A7F3D0',
                textAlign: 'left',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 18 }}>✨</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: '#065F46' }}>
                  {t(
                    'Virtue & Hadith Reference',
                    'فضیلت و سنتِ نبوی ﷺ',
                    'الفضيلة والحديث الشريف',
                    'Fazilat o Sunnat-e-Nabawi ﷺ'
                  )}
                </span>
                <span
                  style={{
                    marginLeft: 'auto',
                    fontSize: 11,
                    backgroundColor: '#D1FAE5',
                    color: '#065F46',
                    padding: '2px 8px',
                    borderRadius: 12,
                    fontWeight: 700,
                  }}
                >
                  {activePreset.hadithSource}
                </span>
              </div>
              <div style={{ fontSize: 13, color: '#064E3B', lineHeight: 1.6, marginBottom: 4 }}>
                {activePreset.fadilahUrdu}
              </div>
              <div style={{ fontSize: 12, color: '#047857' }}>
                {activePreset.fadilahEnglish}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* FULLSCREEN TAP OVERLAY (Eyes Closed / Walking Mode) */}
      {isFullscreenTap && (
        <div
          onClick={handleTap}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: '#064E3B',
            color: '#FFFFFF',
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '30px 20px',
            userSelect: 'none',
            cursor: 'pointer',
            touchAction: 'manipulation',
          }}
        >
          {/* Top Bar with Exit */}
          <div style={{ width: '100%', maxWidth: 500, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 14, color: '#A7F3D0', fontWeight: 600 }}>
              {activePreset?.transliteration} ({target}x)
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsFullscreenTap(false);
              }}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: 20,
                padding: '6px 14px',
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              ✕ {t('Exit', 'بند کریں', 'خروج', 'Exit')}
            </button>
          </div>

          {/* Central Mega Number & Arabic Text */}
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                fontSize: 34,
                fontWeight: 800,
                color: '#FEF3C7',
                fontFamily: "'Amiri', serif",
                marginBottom: 12,
              }}
            >
              {activePreset?.arabicText}
            </div>
            <div style={{ fontSize: 96, fontWeight: 900, lineHeight: 1, letterSpacing: -2 }}>
              {session.currentCount}
            </div>
            <div style={{ fontSize: 16, color: '#A7F3D0', marginTop: 12, fontWeight: 600 }}>
              {t(`Round ${session.roundsCompleted + 1} · Target ${target}`, `دور ${session.roundsCompleted + 1} · ہدف ${target}`, `الدورة ${session.roundsCompleted + 1}`, `Round ${session.roundsCompleted + 1}`)}
            </div>
          </div>

          {/* Bottom Gentle Instruction */}
          <div style={{ fontSize: 13, color: '#6EE7B7', opacity: 0.85, textAlign: 'center' }}>
            {t('Tap anywhere on the screen to count', 'گنتی کے لیے اسکرین پر کہیں بھی چھوئیں', 'المس أي مكان في الشاشة للعد', 'Screen par kahin bhi tap karein')}
          </div>
        </div>
      )}

      {/* Universal Content Share Modal for Sacred Wallpaper / Status Card */}
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
