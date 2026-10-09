import React, { useState } from 'react';
import Head from 'next/head';
import { Navigation } from '../components/Navigation';
import { MasnoonTasbihEngine, TasbihPreset, TasbihSessionState } from '@amal/amal-engine';
import { AmalTheme } from '@amal/ui';
import { showAmalToast } from '../components/Toast';

export default function TasbihPage() {
  const presets = MasnoonTasbihEngine.getAllPresets();
  const [selectedPresetId, setSelectedPresetId] = useState<string>(presets[0]?.id || 'subhanallah');
  const [session, setSession] = useState<TasbihSessionState>(
    MasnoonTasbihEngine.reset(presets[0]?.id || 'subhanallah')
  );
  const [hapticEnabled, setHapticEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const activePreset: TasbihPreset | undefined = presets.find(p => p.id === selectedPresetId);

  const triggerFeedback = (type: 'TICK' | 'THRESHOLD_REACHED' | 'CYCLE_COMPLETE') => {
    // 1. Haptic Vibration
    if (hapticEnabled && typeof window !== 'undefined' && 'vibrate' in navigator) {
      if (type === 'CYCLE_COMPLETE') {
        navigator.vibrate([80, 50, 80, 50, 100]);
      } else if (type === 'THRESHOLD_REACHED') {
        navigator.vibrate([60, 40, 60]);
      } else {
        navigator.vibrate(30);
      }
    }

    // 2. Gentle Audio Click (Web Audio API synth)
    if (soundEnabled && typeof window !== 'undefined') {
      try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContext) {
          const ctx = new AudioContext();
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
    const { nextState, hapticType } = MasnoonTasbihEngine.increment(session);
    setSession(nextState);
    triggerFeedback(hapticType === 'NONE' ? 'TICK' : hapticType);
    if (hapticType === 'CYCLE_COMPLETE') {
      showAmalToast(`Masha'Allah! Cycle completed: ${activePreset?.arabicText || 'ختم ہوا'} (${nextState.roundsCompleted} rounds)`, 'success');
    }
  };

  const handleSelectPreset = (id: string) => {
    setSelectedPresetId(id);
    setSession(MasnoonTasbihEngine.reset(id));
  };

  const handleReset = () => {
    setSession(MasnoonTasbihEngine.reset(selectedPresetId));
    showAmalToast('Tasbih counter reset', 'info');
    if (hapticEnabled && typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(50);
    }
  };

  const target = activePreset ? activePreset.targetCount : 33;
  const progressPercent = Math.min(100, (session.currentCount / target) * 100);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F8FAFC', paddingBottom: 100 }}>
      <Head>
        <title>AMAL OS - Digital Masnoon Tasbih | مسنون تسبیح و ذکر</title>
      </Head>

      <Navigation />

      <main style={{ maxWidth: 840, margin: '0 auto', padding: '0 20px' }}>
        {/* Header Title */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <span style={{ fontSize: 32 }}>📿</span>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: '#1E293B', margin: '8px 0 4px 0' }}>
            مسنون تسبیح و ذکر کاؤنٹر
          </h1>
          <p style={{ fontSize: 14, color: '#64748B', margin: 0 }}>
            Digital Masnoon Tasbih with Gentle Haptic Feedback &amp; Authentic Sunnah Azkar
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
            <div style={{ fontSize: 15, color: '#334155', marginBottom: 4, fontWeight: 500 }}>
              {activePreset.urduTranslation}
            </div>
            <div style={{ fontSize: 12, color: '#64748B', maxWidth: 500, marginBottom: 28 }}>
              {activePreset.englishTranslation}
            </div>

            {/* BIG TAP CIRCLE */}
            <div
              onClick={handleTap}
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
                ہدف: {target} (Target)
              </div>
              <div style={{ fontSize: 11, color: '#95D5B2', marginTop: 8 }}>
                کلک کریں یا اسکرین چھوئیں (TAP)
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

            {/* Session Stats & Reset */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                maxWidth: 420,
                marginTop: 24,
                padding: '12px 16px',
                backgroundColor: '#F8FAFC',
                borderRadius: 12,
                border: '1px solid #E2E8F0',
              }}
            >
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: 11, color: '#64748B' }}>دور / مکمل چکر (Rounds):</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: '#1E293B' }}>
                  {session.roundsCompleted}
                </div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: '#64748B' }}>اس نشست کی کل گنتی (Total):</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: AmalTheme.colors.primary }}>
                  {session.totalCountsInSession}
                </div>
              </div>

              <button
                onClick={handleReset}
                style={{
                  backgroundColor: '#F1F5F9',
                  border: '1px solid #CBD5E1',
                  borderRadius: 8,
                  padding: '6px 12px',
                  fontSize: 12,
                  fontWeight: 600,
                  color: '#475569',
                  cursor: 'pointer',
                }}
              >
                صفر کریں (Reset)
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
                📳 وائبریشن (Haptic on Tap)
              </label>

              <label style={{ fontSize: 12, color: '#64748B', display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={soundEnabled}
                  onChange={e => setSoundEnabled(e.target.checked)}
                />
                🔊 آواز (Audio Click)
              </label>
            </div>

            {/* Hadith & Fadilah Box */}
            <div
              style={{
                marginTop: 32,
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
                  فضیلت و سنت نبوی ﷺ (Virtue &amp; Hadith Reference)
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
    </div>
  );
}
