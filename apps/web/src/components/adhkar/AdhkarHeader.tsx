import React from 'react';

interface AdhkarHeaderProps {
  activeTab: 'MORNING' | 'EVENING';
  onTabChange: (tab: 'MORNING' | 'EVENING') => void;
  hapticEnabled: boolean;
  onToggleHaptic: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  showTransliteration: boolean;
  onToggleTransliteration: () => void;
  onResetAll: () => void;
  completedCount: number;
  totalCount: number;
  completionPercentage: number;
  isUrdu: boolean;
  t: (en: string, ur: string) => string;
}

export const AdhkarHeader: React.FC<AdhkarHeaderProps> = ({
  activeTab,
  onTabChange,
  hapticEnabled,
  onToggleHaptic,
  soundEnabled,
  onToggleSound,
  showTransliteration,
  onToggleTransliteration,
  onResetAll,
  completedCount,
  totalCount,
  completionPercentage,
  isUrdu,
  t,
}) => {
  return (
    <>
      {/* Header Banner */}
      <div style={{ marginBottom: 24, textAlign: 'center' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            backgroundColor: '#ECFDF5',
            padding: '6px 16px',
            borderRadius: 20,
            marginBottom: 12,
            border: '1px solid #A7F3D0',
          }}
        >
          <span style={{ fontSize: 16 }}>🌿</span>
          <span style={{ fontSize: 13, fontWeight: 800, color: '#065F46' }}>
            {t(
              'Authentic Sunnah Adhkar for Protection & Blessing (Al-Hisn al-Hasin & Bahar-e-Shariat)',
              'مستند مسنون معمولات برائے حفظ و برکت (حصنِ حصین و بہارِ شریعت)'
            )}
          </span>
        </div>

        <h1
          style={{
            fontSize: 32,
            fontWeight: 900,
            color: '#064E3B',
            margin: '0 0 8px',
            letterSpacing: -0.5,
          }}
        >
          {t('Morning & Evening Sunnah Adhkar', 'صبح و شام کے مسنون اذکار و دعائیں')}
        </h1>
        {isUrdu ? (
          <div
            dir="rtl"
            className="font-urdu"
            style={{ fontSize: 22, color: '#92400E', fontWeight: 700, marginBottom: 10 }}
          >
            صبح و شام کے مسنون اذکار و دعائیں
          </div>
        ) : (
          <div style={{ fontSize: 14, color: '#065F46', fontWeight: 700, marginBottom: 10 }}>
            Prophetic Protection & Daily Remembrances
          </div>
        )}
        <p
          style={{
            maxWidth: 640,
            margin: '0 auto',
            fontSize: 14,
            color: '#475569',
            lineHeight: 1.6,
          }}
        >
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
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 16,
            marginBottom: 16,
          }}
        >
          {/* Morning vs Evening Tab Switcher */}
          <div
            style={{
              display: 'flex',
              gap: 4,
              backgroundColor: '#F1F5F9',
              padding: 4,
              borderRadius: 12,
            }}
          >
            <button
              type="button"
              onClick={() => onTabChange('MORNING')}
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
              onClick={() => onTabChange('EVENING')}
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
              onClick={onToggleHaptic}
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
              onClick={onToggleSound}
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
              onClick={onToggleTransliteration}
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
              onClick={onResetAll}
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
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 6,
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            <span style={{ color: '#064E3B' }}>
              {t(
                `Completed (${activeTab === 'MORNING' ? 'Morning' : 'Evening'}): ${completedCount} of ${totalCount} (${completionPercentage}%)`,
                `آج کے مکمل اذکار (${activeTab === 'MORNING' ? 'صبح' : 'شام'}): ${completedCount} از ${totalCount} (${completionPercentage}%)`
              )}
            </span>
            <span style={{ color: completionPercentage === 100 ? '#166534' : '#64748B' }}>
              {completionPercentage === 100
                ? t(
                    "🎉 Complete! Today's adhkar routine finished",
                    '🎉 مبارک! آج کا پورا معمول مکمل ہو گیا'
                  )
                : t(
                    `${totalCount - completedCount} remaining`,
                    `${totalCount - completedCount} اذکار باقی ہیں`
                  )}
            </span>
          </div>

          <div
            style={{
              height: 8,
              width: '100%',
              backgroundColor: '#E2E8F0',
              borderRadius: 4,
              overflow: 'hidden',
            }}
          >
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
    </>
  );
};
