import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme, SACRED_THEMES, SacredTheme } from '../context/ThemeContext';
import { IslamicStarRosette } from './ui/IslamicArabesqueFrame';
import { showAmalToast } from './Toast';

export interface SacredThemeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SacredThemeModal({ isOpen, onClose }: SacredThemeModalProps) {
  const { t, isUrdu, isArabic } = useLanguage();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSelectTheme = (themeKey: SacredTheme) => {
    setTheme(themeKey);
    const selected = SACRED_THEMES[themeKey];
    showAmalToast(
      isUrdu
        ? `تھیم لاگو: ${selected.nameUrdu}`
        : isArabic
        ? `تم تطبيق المظهر: ${selected.nameArabic}`
        : `Theme Applied: ${selected.nameEnglish}`,
      'success'
    );
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        zIndex: 10002,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 520,
          backgroundColor: '#FFFFFF',
          borderRadius: 18,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.3)',
          border: '1.5px solid rgba(212, 175, 55, 0.4)',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            background: 'linear-gradient(135deg, #064E3B 0%, #065F46 100%)',
            color: '#FFFFFF',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <IslamicStarRosette size={24} color="#D4AF37" />
            <div>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>
                🎨 {t('Sacred Cultural Themes', 'روحانی و ثقافتی تھیمز', 'المظاهر الثقافية الإسلامية', 'Sacred Cultural Themes')}
              </h3>
              <p style={{ margin: '3px 0 0', fontSize: 12, color: '#A7F3D0' }}>
                {t('Choose a palette that brings serenity to your soul', 'وہ رنگ منتخب کریں جو آپ کی روح کو سکون بخشے', 'اختر المظهر البصري الذي يبعث السكينة في روحك', 'Roohani sukoon ke liye theme chunein')}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            style={{
              background: 'none',
              border: 'none',
              color: '#A7F3D0',
              fontSize: 20,
              cursor: 'pointer',
              padding: 4,
            }}
          >
            ✕
          </button>
        </div>

        {/* Themes Grid */}
        <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 12, maxHeight: '65vh', overflowY: 'auto' }}>
          {(Object.keys(SACRED_THEMES) as SacredTheme[]).map((key) => {
            const meta = SACRED_THEMES[key];
            const isSelected = theme === key;

            return (
              <button
                key={key}
                type="button"
                onClick={() => handleSelectTheme(key)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 18px',
                  borderRadius: 12,
                  border: isSelected ? '2px solid #D4AF37' : '1px solid #E2E8F0',
                  backgroundColor: isSelected ? '#FAF8F5' : '#FFFFFF',
                  cursor: 'pointer',
                  textAlign: 'left',
                  boxShadow: isSelected ? '0 4px 16px rgba(212, 175, 55, 0.15)' : 'none',
                  transition: 'all 0.2s ease',
                  width: '100%',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  {/* Color Swatch Pill */}
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 10,
                      backgroundColor: meta.primaryColor,
                      border: `2px solid ${meta.accentGold}`,
                      boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <div
                      style={{
                        width: 14,
                        height: 14,
                        borderRadius: '50%',
                        backgroundColor: meta.accentGold,
                      }}
                    />
                  </div>

                  <div>
                    <div style={{ fontSize: 15, fontWeight: 800, color: '#1E293B', display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span>{meta.nameEnglish}</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: '#065F46' }}>
                        ({isUrdu ? meta.nameUrdu : meta.nameArabic})
                      </span>
                    </div>
                    <div style={{ fontSize: 12, color: '#475569', marginTop: 2 }}>
                      {meta.descriptionEn}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    border: isSelected ? '2px solid #D4AF37' : '2px solid #CBD5E1',
                    backgroundColor: isSelected ? '#D4AF37' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    fontSize: 12,
                    fontWeight: 800,
                    flexShrink: 0,
                  }}
                >
                  {isSelected ? '✓' : ''}
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '14px 24px',
            backgroundColor: '#F8FAFC',
            borderTop: '1px solid #E2E8F0',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '8px 20px',
              backgroundColor: '#064E3B',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            {t('Done', 'مکمل', 'تم', 'Done')}
          </button>
        </div>
      </div>
    </div>
  );
}
