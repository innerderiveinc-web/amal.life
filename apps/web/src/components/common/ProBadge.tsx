import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

export interface ProBadgeProps {
  label?: string;
  featureName?: string;
  variant?: 'pill' | 'sparkle' | 'minimal';
  showNoticeOnClick?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

export const ProBadge: React.FC<ProBadgeProps> = ({
  label,
  featureName,
  variant = 'pill',
  showNoticeOnClick = true,
  style,
  className = '',
}) => {
  const { t } = useLanguage();
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (showNoticeOnClick) {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('amal-open-waqf'));
      }
    }
  };

  const badgeText = label || t('PRO', 'پرو', 'برو', 'PRO');

  return (
    <span
      className={`amal-pro-badge-wrapper ${className}`}
      style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', ...style }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <button
        type="button"
        onClick={handleClick}
        aria-label={`${featureName || 'Feature'} - ${badgeText}: Complimentary access active`}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4,
          padding: variant === 'minimal' ? '1px 6px' : '2px 8px',
          borderRadius: 12,
          fontSize: 10,
          fontWeight: 800,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          border: '1px solid rgba(212, 175, 55, 0.4)',
          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.16) 0%, rgba(217, 119, 6, 0.22) 100%)',
          color: '#B45309',
          cursor: 'pointer',
          transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
          boxShadow: '0 1px 3px rgba(217, 119, 6, 0.12)',
        }}
        title={t(
          'Amal Pro Capability · Currently 100% complimentary to build your daily habit. Click to view or support the Waqf.',
          'امل پرو فیچر · روزمرہ معمول بنانے کے لیے مکمل فعال اور مفت۔ وقف کی معلومات کے لیے کلک کریں۔',
          'ميزة أمل برو · متاحة مجاناً لبناء عادتك التعبدية. انقر للاطلاع على الوقف.',
          'Amal Pro Feature · Daily mamool ke liye abhi 100% muft aur unlocked hai.'
        )}
      >
        <span style={{ fontSize: 9 }}>✨</span>
        <span>{badgeText}</span>
      </button>

      {/* Floating Gentle Info Popover on Hover */}
      {showTooltip && (
        <span
          role="tooltip"
          style={{
            position: 'absolute',
            bottom: 'calc(100% + 6px)',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#0F172A',
            color: '#F8FAFC',
            padding: '6px 10px',
            borderRadius: 8,
            fontSize: 11,
            fontWeight: 600,
            whiteSpace: 'nowrap',
            zIndex: 9999,
            boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <span style={{ color: '#FCD34D' }}>🤲</span>
          <span>
            {t(
              'Unlocked · Complimentary during habit-building',
              'فعال · روزمرہ عادت بننے تک بالکل مفت',
              'متاح مجاناً للمساعدة في بناء العادة',
              'Unlocked · Habit building ke doran muft hai'
            )}
          </span>
        </span>
      )}
    </span>
  );
};
