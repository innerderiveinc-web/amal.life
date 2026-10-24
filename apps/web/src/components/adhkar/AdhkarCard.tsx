import React from 'react';
import { DhikrItem } from '../../lib/adhkar-data';
import { UniversalCardPayload } from '../cards/UniversalContentShareModal';

interface AdhkarCardProps {
  item: DhikrItem;
  index: number;
  currentCount: number;
  isCompleted: boolean;
  onTap: () => void;
  onReset: (e: React.MouseEvent) => void;
  onShare: (payload: UniversalCardPayload) => void;
  showTransliteration: boolean;
  showEnglish: boolean;
  isUrdu: boolean;
  activeTab: 'MORNING' | 'EVENING';
  t: (en: string, ur: string) => string;
}

export const AdhkarCard: React.FC<AdhkarCardProps> = ({
  item,
  index,
  currentCount,
  isCompleted,
  onTap,
  onReset,
  onShare,
  showTransliteration,
  showEnglish,
  isUrdu,
  activeTab,
  t,
}) => {
  const progressRatio = Math.min(1, currentCount / item.targetCount);

  return (
    <div
      onClick={onTap}
      style={{
        backgroundColor: isCompleted ? '#F0FDF4' : '#FFFFFF',
        borderRadius: 16,
        border: isCompleted ? '2px solid #34D399' : '1px solid #E2E8F0',
        padding: '24px 28px',
        boxShadow: isCompleted
          ? '0 4px 14px rgba(16,185,129,0.12)'
          : '0 2px 8px rgba(0,0,0,0.03)',
        cursor: 'pointer',
        userSelect: 'none',
        transition: 'all 0.2s ease',
        position: 'relative',
      }}
    >
      {/* Top Badge: Number, Title, Target Count & Tap Ring */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 18,
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
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
              {isUrdu ? item.titleEnglish : item.titleArabic || item.titleUrdu} • {item.sourceHadith}
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
              <circle cx="32" cy="32" r="26" stroke="#E2E8F0" strokeWidth="5" fill="none" />
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
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 900,
                  color: isCompleted ? '#166534' : '#064E3B',
                  lineHeight: 1,
                }}
              >
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
              onClick={onReset}
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
              onShare({
                category: 'DUA',
                categoryLabelUrdu: activeTab === 'MORNING' ? 'اذکارِ صباح' : 'اذکارِ مساء',
                categoryLabelEnglish:
                  activeTab === 'MORNING' ? 'Morning Sunnah Dhikr' : 'Evening Sunnah Dhikr',
                titleUrdu: item.titleUrdu,
                titleEnglish: item.titleEnglish,
                arabicText: item.arabicText,
                primaryTextUrdu: item.translationUrdu,
                secondaryTextEnglish: item.translationEnglish,
                sourceCitation: item.sourceHadith,
                badgeContext: isUrdu
                  ? `${item.targetCount} مرتبہ · فضیلت و برکت`
                  : `${item.targetCount}x · Virtue & Merits`,
              });
            }}
            title={t(
              'Create shareable visual card for this Dua',
              'اس دعا کا خوبصورت کارڈ بنائیں برائے واٹس ایپ و سوشل میڈیا'
            )}
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
        <div
          style={{
            fontSize: 13,
            color: '#475569',
            fontStyle: 'italic',
            marginBottom: 12,
            textAlign: 'center',
            lineHeight: 1.6,
          }}
        >
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
          <strong
            style={{
              color: '#92400E',
              fontSize: 13,
              display: 'block',
              marginBottom: 4,
            }}
          >
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
          <strong
            style={{
              color: '#064E3B',
              fontSize: 13,
              display: 'block',
              marginBottom: 4,
            }}
          >
            English Meaning:
          </strong>
          {item.translationEnglish}
        </div>
      )}

      {/* SECONDARY TRANSLATION */}
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
        <span>{isUrdu ? item.virtueUrdu : item.virtueEnglish || item.virtueUrdu}</span>
      </div>

      {/* Tap Helper Hint */}
      <div
        style={{
          marginTop: 12,
          textAlign: 'center',
          fontSize: 11,
          color: isCompleted ? '#166534' : '#94A3B8',
          fontWeight: 600,
        }}
      >
        {isCompleted
          ? t('✓ Completed (You may continue tapping)', '✓ یہ دعا مکمل ہو چکی ہے (ٹپ جاری رکھ سکتے ہیں)')
          : t(
              `👆 Tap anywhere on card to count (${Math.max(0, item.targetCount - currentCount)} remaining)`,
              `👆 کاؤنٹر بڑھانے کے لیے کارڈ پر کہیں بھی ٹپ کریں (باقی: ${Math.max(0, item.targetCount - currentCount)})`
            )}
      </div>
    </div>
  );
};
