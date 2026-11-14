import React, { useState, useEffect } from 'react';
import {
  ReaderModeEngine,
  ReaderPreferences,
  FontSizeLevel,
  ArabicScriptType,
  VisualThemeMode,
} from '@amal/amal-engine';
import { AmalTheme } from '@amal/ui';
import { useLanguage } from '../context/LanguageContext';

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
  const { t } = useLanguage();
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

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const updatePreference = (partial: Partial<ReaderPreferences>) => {
    const next = { ...prefs, ...partial };
    setPrefs(next);
    if (typeof window !== 'undefined') {
      localStorage.setItem('amal_reader_prefs', JSON.stringify(next));
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
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        zIndex: 10001,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '92%',
          maxWidth: 480,
          backgroundColor: '#FFFFFF',
          borderRadius: 16,
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)',
          padding: 24,
          border: '1px solid #E2E8F0',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div>
            <h3 style={{ margin: 0, fontSize: 18, color: '#1E293B', fontWeight: 800 }}>
              👓 {t('Quranic Typography & Comfort Mode', 'قرآنی مطالعہ و فونٹ سیٹنگز', 'إعدادات الخط والقراءة المريحة', 'Quran Typography o Font Settings')}
            </h3>
            <span style={{ fontSize: 12, color: '#64748B' }}>
              {t(
                'Senior & Quran Reading Comfort Mode',
                'بزرگوں اور قارئین کے لیے پرسکون مطالعہ',
                'وضع القراءة المريح لكبار السن والدارسين',
                'Reading Comfort Mode for Elders'
              )}
            </span>
          </div>
          <button
            onClick={onClose}
            style={{
              background: '#F1F5F9',
              border: 'none',
              borderRadius: '50%',
              width: 32,
              height: 32,
              fontSize: 16,
              cursor: 'pointer',
              color: '#64748B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label="Close Reader Settings Modal"
          >
            ✕
          </button>
        </div>

        {/* Font Size */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 13, fontWeight: 700, color: '#334155', display: 'block', marginBottom: 8 }}>
            {t(
              'Font Size for Reading Comfort:',
              'حجمِ خط (فونٹ سائز برائے سہولتِ مطالعہ):',
              'حجم الخط لراحة القراءة:',
              'Font Size (Mutala ki sahoolat):'
            )}
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            {(
              [
                {
                  level: 'NORMAL',
                  label: t('Standard (100%)', 'عام (۱۰۰٪)', 'معتاد (١٠٠٪)', 'Standard (100%)'),
                  sub: t('Default', 'معمول', 'افتراضي', 'Default'),
                },
                {
                  level: 'LARGE',
                  label: t('Large (125%)', 'بڑا (۱۲۵٪)', 'كبير (١٢٥٪)', 'Bada (125%)'),
                  sub: t('Comfort', 'پرسکون', 'مريح', 'Comfort'),
                },
                {
                  level: 'EXTRA_LARGE',
                  label: t('Extra Large (150%)', 'بہت بڑا (۱۵۰٪)', 'كبير جداً (١٥٠٪)', 'Bohat Bada (150%)'),
                  sub: t('Seniors', 'بزرگوں کے لیے', 'لكبار السن', 'Buzurgon ke liye'),
                },
              ] as const
            ).map((item) => (
              <button
                key={item.level}
                onClick={() => updatePreference({ fontSizeLevel: item.level as FontSizeLevel })}
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
          <label style={{ fontSize: 13, fontWeight: 700, color: '#334155', display: 'block', marginBottom: 8 }}>
            {t(
              'Arabic Quran Typography:',
              'رسم الخط (قرآنِ مجید کی طباعت کا انداز):',
              'رسم المصحف الشريف:',
              'Arabic Quran Script:'
            )}
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            {(
              [
                {
                  type: 'INDO_PAK',
                  label: t('Indo-Pak', 'پاک و ہند', 'الهند والباكستان', 'Indo-Pak'),
                  sample: t('Nastaleeq', 'نستعلیق', 'نستعليق', 'Nastaleeq'),
                },
                {
                  type: 'UTHMANI',
                  label: t('Uthmani / Madani', 'عثمانی / مدنی', 'الرسم العثماني', 'Uthmani / Madani'),
                  sample: t('Hafs', 'حفص', 'حفص', 'Hafs'),
                },
                {
                  type: 'STANDARD_NASKH',
                  label: t('Standard Naskh', 'معیاری نسخ', 'النسخ المعياري', 'Standard Naskh'),
                  sample: 'Naskh',
                },
              ] as const
            ).map((item) => (
              <button
                key={item.type}
                onClick={() => updatePreference({ scriptType: item.type as ArabicScriptType })}
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
          <label style={{ fontSize: 13, fontWeight: 700, color: '#334155', display: 'block', marginBottom: 8 }}>
            {t(
              'Visual Reading Comfort Theme:',
              'بصری سکون (تھیم کا انتخاب):',
              'المظهر البصري المريح للقراءة:',
              'Visual Comfort Theme:'
            )}
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            {(
              [
                {
                  mode: 'DAY',
                  label: t('Clean Day', 'دن (سفید)', 'النهاري', 'Clean Day'),
                  bg: '#FFFFFF',
                  border: '#CBD5E1',
                  text: '#0F172A',
                },
                {
                  mode: 'SEPIA',
                  label: t('Sepia Book', 'سیپیا (قدیم کتاب)', 'ورقي دافئ', 'Sepia Book'),
                  bg: '#F4ECD8',
                  border: '#E2D5BA',
                  text: '#3A2E1E',
                },
                {
                  mode: 'NIGHT',
                  label: t('OLED Night', 'شب (ڈارک موڈ)', 'الليلي', 'OLED Night'),
                  bg: '#0F172A',
                  border: '#334155',
                  text: '#F8FAFC',
                },
              ] as const
            ).map((item) => (
              <button
                key={item.mode}
                onClick={() => updatePreference({ themeMode: item.mode as VisualThemeMode })}
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
          {t('Apply Settings', 'ترتیبات لاگو کریں', 'تطبيق الإعدادات', 'Settings Apply Karein')}
        </button>
      </div>
    </div>
  );
};
