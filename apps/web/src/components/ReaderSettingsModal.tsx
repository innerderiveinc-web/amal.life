import React, { useState, useEffect } from 'react';
import {
  ReaderModeEngine,
  ReaderPreferences,
  FontSizeLevel,
  ArabicScriptType,
  VisualThemeMode,
} from '@amal/amal-engine';
import { AmalTheme } from '@amal/ui';

interface ReaderSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPreferencesChange?: (prefs: ReaderPreferences) => void;
}

export const ReaderSettingsModal: React.FC<ReaderSettingsModalProps> = ({
  isOpen,
  onClose,
  onPreferencesChange,
}) => {
  const [prefs, setPrefs] = useState<ReaderPreferences>(ReaderModeEngine.getDefaultPreferences());

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('amal_reader_prefs');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setPrefs(parsed);
        } catch (_) {}
      }
    }
  }, []);

  const updatePreference = (partial: Partial<ReaderPreferences>) => {
    const next = { ...prefs, ...partial };
    setPrefs(next);
    if (typeof window !== 'undefined') {
      localStorage.setItem('amal_reader_prefs', JSON.stringify(next));
      // Apply theme class or attributes to document root if relevant
      if (next.themeMode === 'SEPIA') {
        document.body.style.backgroundColor = '#F4ECD8';
        document.body.style.color = '#3A2E1E';
      } else if (next.themeMode === 'NIGHT') {
        document.body.style.backgroundColor = '#0F172A';
        document.body.style.color = '#F3F4F6';
      } else {
        document.body.style.backgroundColor = '#FAFAFA';
        document.body.style.color = '#111827';
      }
    }
    onPreferencesChange?.(next);
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.6)',
        backdropFilter: 'blur(3px)',
        zIndex: 10001,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '90%',
          maxWidth: 480,
          backgroundColor: '#FFFFFF',
          borderRadius: 16,
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
          padding: 24,
          border: '1px solid #E2E8F0',
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div>
            <h3 style={{ margin: 0, fontSize: 18, color: '#1E293B', fontWeight: 700 }}>
              👓 قرآنی مطالعہ و فونٹ سیٹنگز
            </h3>
            <span style={{ fontSize: 12, color: '#64748B' }}>
              Senior & Quran Reading Comfort Mode
            </span>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: 18,
              cursor: 'pointer',
              color: '#94A3B8',
            }}
          >
            ✕
          </button>
        </div>

        {/* Font Size */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: '#334155', display: 'block', marginBottom: 8 }}>
            حجمِ خط (Font Size for Elders & Reading Comfort):
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            {(
              [
                { level: 'NORMAL', label: 'عام (100%)', sub: 'Standard' },
                { level: 'LARGE', label: 'بڑا (125%)', sub: 'Comfort' },
                { level: 'EXTRA_LARGE', label: 'بہت بڑا (150%)', sub: 'Seniors' },
              ] as const
            ).map(item => (
              <button
                key={item.level}
                onClick={() => updatePreference({ fontSizeLevel: item.level })}
                style={{
                  padding: '10px 8px',
                  borderRadius: 8,
                  border: prefs.fontSizeLevel === item.level ? `2px solid ${AmalTheme.colors.primary}` : '1px solid #E2E8F0',
                  backgroundColor: prefs.fontSizeLevel === item.level ? '#E8F5E9' : '#F8FAFC',
                  color: prefs.fontSizeLevel === item.level ? '#1B4332' : '#475569',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: 13,
                  textAlign: 'center',
                }}
              >
                <div>{item.label}</div>
                <div style={{ fontSize: 10, color: '#64748B', fontWeight: 400 }}>{item.sub}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Arabic Typography / Script */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: '#334155', display: 'block', marginBottom: 8 }}>
            رسم الخط (Arabic Quran Typography):
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            {(
              [
                { type: 'INDO_PAK', label: 'پاک و ہند', sample: 'نستعلیق' },
                { type: 'UTHMANI', label: 'عثمانی / مدنی', sample: 'حفص' },
                { type: 'STANDARD_NASKH', label: 'معیاری نسخ', sample: 'Naskh' },
              ] as const
            ).map(item => (
              <button
                key={item.type}
                onClick={() => updatePreference({ scriptType: item.type })}
                style={{
                  padding: '10px 8px',
                  borderRadius: 8,
                  border: prefs.scriptType === item.type ? `2px solid ${AmalTheme.colors.primary}` : '1px solid #E2E8F0',
                  backgroundColor: prefs.scriptType === item.type ? '#E8F5E9' : '#F8FAFC',
                  color: prefs.scriptType === item.type ? '#1B4332' : '#475569',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: 13,
                  textAlign: 'center',
                }}
              >
                <div>{item.label}</div>
                <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>{item.sample}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Visual Reading Theme */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: '#334155', display: 'block', marginBottom: 8 }}>
            بصری سکون (Visual Comfort Theme):
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            {(
              [
                { mode: 'DAY', label: 'دن (White)', bg: '#FFFFFF', border: '#CBD5E1', text: '#0F172A' },
                { mode: 'SEPIA', label: 'سیپیا (Sepia)', bg: '#F4ECD8', border: '#E2D5BA', text: '#3A2E1E' },
                { mode: 'NIGHT', label: 'شب (OLED Dark)', bg: '#0F172A', border: '#334155', text: '#F8FAFC' },
              ] as const
            ).map(item => (
              <button
                key={item.mode}
                onClick={() => updatePreference({ themeMode: item.mode })}
                style={{
                  padding: '10px 8px',
                  borderRadius: 8,
                  border: prefs.themeMode === item.mode ? `2px solid ${AmalTheme.colors.primary}` : `1px solid ${item.border}`,
                  backgroundColor: item.bg,
                  color: item.text,
                  cursor: 'pointer',
                  fontWeight: 700,
                  fontSize: 12,
                  textAlign: 'center',
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={onClose}
          style={{
            width: '100%',
            padding: 12,
            borderRadius: 8,
            backgroundColor: AmalTheme.colors.primary,
            color: '#FFFFFF',
            border: 'none',
            fontWeight: 700,
            cursor: 'pointer',
            fontSize: 14,
          }}
        >
          محفوظ کریں (Apply Settings)
        </button>
      </div>
    </div>
  );
};
