import React from 'react';
import { DhikrItem } from '../../lib/adhkar-data';
import { UniversalCardPayload } from '../cards/UniversalContentShareModal';
import { useLanguage } from '../../context/LanguageContext';

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
  isUrdu?: boolean;
  activeTab: 'MORNING' | 'EVENING';
  t?: (en: string, ur?: string, ar?: string, roman?: string) => string;
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
  activeTab,
}) => {
  const { t, isUrdu, isArabic, isRomanUrdu } = useLanguage();
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
        transition: 'all 0.2s ease',
        userSelect: 'none',
        position: 'relative',
      }}
    >
      {/* Top Bar: Index + Title + Interactive Circular Counter */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              backgroundColor: isCompleted ? '#166534' : '#E2E8F0',
              color: isCompleted ? '#FFFFFF' : '#334155',
              fontSize: 13,
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {index + 1}
          </div>

          <div>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: '#0F172A' }}>
              {isArabic
                ? item.titleArabic || item.titleUrdu || item.titleEnglish
                : isUrdu
                ? item.titleUrdu
                : isRomanUrdu
                ? item.titleEnglish || item.titleUrdu
                : item.titleEnglish}
            </h3>
            <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>
              {(isUrdu || isRomanUrdu) ? item.titleEnglish : (item.titleArabic || item.titleUrdu)} • {item.sourceHadith}
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
            <svg width="64" height="64" style={{ transform: 'rotate(-90deg)' }}>
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="#E2E8F0"
                strokeWidth="4"
                fill="none"
              />
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke={isCompleted ? '#166534' : '#10B981'}
                strokeWidth="5"
                strokeDasharray={176}
                strokeDashoffset={176 * (1 - progressRatio)}
                strokeLinecap="round"
                fill="none"
                style={{ transition: 'stroke-dashoffset 0.15s ease' }}
              />
            </svg>
            <div style={{ position: 'absolute', textAlign: 'center' }}>
              <div
                style={{
                  fontSize: 17,
                  fontWeight: 900,
                  color: isCompleted ? '#166534' : '#0F172A',
                  lineHeight: 1,
                }}
              >
                {currentCount}
              </div>
              <div style={{ fontSize: 10, color: '#64748B', marginTop: 1 }}>
                /{item.targetCount}
              </div>
            </div>
          </div>

          {/* Action Buttons: Reset & Share Card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <button
              type="button"
              onClick={onReset}
              title={t('Reset Counter', 'کاؤنٹر صفر کریں', 'إعادة ضبط العداد', 'Counter zero karein')}
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                border: '1px solid #CBD5E1',
                backgroundColor: '#FFFFFF',
                color: '#64748B',
                fontSize: 13,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              🔄
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onShare({
                  category: 'DUA',
                  titleUrdu: isArabic
                    ? item.titleArabic || item.titleUrdu
                    : isUrdu
                    ? item.titleUrdu
                    : item.titleEnglish,
                  badgeContext: `${t('Adhkar', 'مسنون ذکر', 'ذكر نبوي', 'Masnoon Dhikr')} • ${item.targetCount} ${t('Times', 'مرتبہ', 'مرات', 'Martaba')}`,
                  arabicText: item.arabicText,
                  primaryTextUrdu: item.translationUrdu,
                  secondaryTextEnglish: item.translationEnglish,
                  sourceCitation: `${item.sourceHadith} • ${activeTab === 'MORNING' ? t('Morning Adhkar', 'صبح کے اذکار', 'أذكار الصباح', 'Subh ke Adhkar') : t('Evening Adhkar', 'شام کے اذکار', 'أذكار المساء', 'Shaam ke Adhkar')}`,
                  tafseerInsightUrdu: isUrdu || isArabic ? item.virtueUrdu : (item.virtueEnglish || item.virtueUrdu),
                });
              }}
              title={t('Generate Image Card', 'خوبصورت امیج کارڈ بنائیں', 'إنشاء بطاقة مصورة', 'Image Card Banayein')}
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                border: '1px solid #10B981',
                backgroundColor: '#ECFDF5',
                color: '#065F46',
                fontSize: 13,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              📸
            </button>
          </div>
        </div>
      </div>

      {/* ARABIC TEXT */}
      <div
        dir="rtl"
        style={{
          fontFamily: 'var(--font-arabic), "Amiri", serif',
          fontSize: 24,
          lineHeight: 2.2,
          textAlign: 'right',
          color: '#064E3B',
          marginBottom: 14,
          backgroundColor: '#F8FAFC',
          padding: '16px 20px',
          borderRadius: 12,
          border: '1px solid #E2E8F0',
        }}
      >
        {item.arabicText}
      </div>

      {/* TRANSLITERATION (IF ENABLED) */}
      {showTransliteration && item.transliteration && (
        <div
          style={{
            fontSize: 13,
            color: '#475569',
            fontStyle: 'italic',
            marginBottom: 12,
            padding: '8px 12px',
            backgroundColor: '#FEF9C3',
            borderRadius: 8,
            border: '1px solid #FDE047',
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
            {t('Translation & Meaning:', 'ترجمہ و مفہوم:', 'الترجمة والمعنى:', 'Tarjuma wa Mafhoom:')}
          </strong>
          {item.translationUrdu}
        </div>
      ) : isArabic ? (
        <div
          dir="rtl"
          style={{
            fontSize: 16,
            lineHeight: 2.0,
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
            {t('Meaning & Context:', 'ترجمہ و مفہوم:', 'المعنى والبيان:', 'Tarjuma wa Mafhoom:')}
          </strong>
          {item.translationUrdu || item.translationEnglish}
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
            {t('English Meaning:', 'انگریزی ترجمہ:', 'المعنى بالإنجليزية:', 'English Meaning:')}
          </strong>
          {item.translationEnglish}
        </div>
      )}

      {/* SECONDARY TRANSLATION (EXPANDABLE) */}
      {!isUrdu && showEnglish && item.translationUrdu && (
        <details style={{ marginBottom: 12, fontSize: 12, color: '#64748B' }}>
          <summary style={{ cursor: 'pointer', fontWeight: 600, color: '#92400E' }}>
            {t('Show Urdu Translation', 'اردو ترجمہ دکھائیں', 'عرض الترجمة الأردية', 'Urdu Tarjuma Dikhayein')}
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
          {t('✨ Spiritual Merit & Virtue: ', '✨ فضیلت و برکت: ', '✨ الفضيلة والبركة: ', '✨ Fazilat o Barkat: ')}
        </span>
        <span>{isUrdu || isArabic ? item.virtueUrdu : (item.virtueEnglish || item.virtueUrdu)}</span>
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
          ? t(
              '✓ Completed (You may continue tapping)',
              '✓ یہ دعا مکمل ہو چکی ہے (ٹپ جاری رکھ سکتے ہیں)',
              '✓ اكتمل هذا الذكر المبارك (يمكنك متابعة التكرار)',
              '✓ Yeh dua mukammal ho chuki hai (tap jari rakh sakte hain)'
            )
          : `${t(
              '👆 Tap anywhere on card to count',
              '👆 کاؤنٹر بڑھانے کے لیے کارڈ پر کہیں بھی ٹپ کریں',
              '👆 اضغط في أي مكان على البطاقة للعد',
              '👆 Counter badhane ke liye tap karein'
            )} (${Math.max(0, item.targetCount - currentCount)} ${t('remaining', 'باقی', 'متبقي', 'baqi')})`}
      </div>
    </div>
  );
};
