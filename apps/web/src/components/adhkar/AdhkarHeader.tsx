import React from 'react';
import Link from 'next/link';
import { AmalTheme } from '@amal/ui';
import { useLanguage } from '../../context/LanguageContext';

interface AdhkarHeaderProps {
  activeTab: 'MORNING' | 'EVENING';
  onTabChange: (tab: 'MORNING' | 'EVENING') => void;
  completedCount: number;
  totalCount: number;
  completionPercentage: number;
  hapticEnabled: boolean;
  onToggleHaptic: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  showTransliteration: boolean;
  onToggleTransliteration: () => void;
  onResetAll: () => void;
  isUrdu?: boolean;
  t?: (en: string, ur?: string, ar?: string, roman?: string) => string;
}

export const AdhkarHeader: React.FC<AdhkarHeaderProps> = ({
  activeTab,
  onTabChange,
  completedCount,
  totalCount,
  completionPercentage,
  hapticEnabled,
  onToggleHaptic,
  soundEnabled,
  onToggleSound,
  showTransliteration,
  onToggleTransliteration,
  onResetAll,
}) => {
  const { t, isUrdu, isArabic } = useLanguage();

  return (
    <>
      {/* Breadcrumb Navigation */}
      <div style={{ padding: '16px 0 12px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <Link
          href="/"
          style={{
            color: AmalTheme.colors.primary,
            textDecoration: 'none',
            fontWeight: 700,
            fontSize: 13,
          }}
        >
          {t('Home', 'صفحۂ اول', 'الرئيسية', 'Ghar / Home')}
        </Link>
        <span style={{ color: '#94A3B8' }}>/</span>
        <span style={{ color: '#0F172A', fontWeight: 800, fontSize: 13 }}>
          {t('Daily Adhkar', 'مسنون اذکار و وظائف', 'الأذكار اليومية', 'Rozana Masnoon Adhkar')}
        </span>
      </div>

      {/* Hero Header */}
      <div
        style={{
          textAlign: 'center',
          padding: '24px 20px 20px',
          borderRadius: 20,
          background: 'linear-gradient(180deg, #F0FDF4 0%, #FFFFFF 100%)',
          border: '1px solid #DCFCE7',
          marginBottom: 20,
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            backgroundColor: '#DCFCE7',
            padding: '4px 14px',
            borderRadius: 20,
            marginBottom: 12,
          }}
        >
          <span style={{ fontSize: 16 }}>🌿</span>
          <span style={{ fontSize: 13, fontWeight: 800, color: '#065F46' }}>
            {t(
              'Authentic Sunnah Adhkar for Protection & Blessing (Al-Hisn al-Hasin & Bahar-e-Shariat)',
              'مستند مسنون معمولات برائے حفظ و برکت (حصنِ حصین و بہارِ شریعت)',
              'أذكار السنة النبوية الصحيحة للحفظ والبركة (الحصن الحصين وبهار شريعت)',
              'Mustanad Masnoon Adhkar baraye Hifz o Barkat (Al-Hisn al-Hasin o Bahar-e-Shariat)'
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
          {t(
            'Morning & Evening Sunnah Adhkar',
            'صبح و شام کے مسنون اذکار و دعائیں',
            'أذكار الصباح والمساء النبوية المشروعة',
            'Subh o Shaam ke Masnoon Adhkar'
          )}
        </h1>
        <div
          dir={isUrdu || isArabic ? 'rtl' : 'ltr'}
          style={{
            fontSize: isUrdu || isArabic ? 18 : 14,
            color: '#065F46',
            fontWeight: 700,
            marginBottom: 10,
          }}
        >
          {t(
            'Prophetic Protection & Daily Remembrances',
            'حفاظتِ نبوی اور یومیہ معمولاتِ ذکر',
            'الحصن النبوي والأذكار اليومية المستجابة',
            'Hifazat-e-Nabawi aur Rozmarrah ke Masnoon Adhkar'
          )}
        </div>
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
            'حضور نبی کریم ﷺ کے ارشادات کے مطابق صبح (بعد نمازِ فجر) اور شام (بعد نمازِ عصر/مغرب) کے مسنون اذکار برائے روحانی حفاظت، مغفرت اور قلبی سکون۔',
            'أدعية وأذكار مأثورة عن النبي ﷺ للصباح (بعد الفجر) والمساء (بعد العصر والمغرب) للحفظ الشامل وطمأنينة القلب.',
            'Huzoor Nabi Kareem ﷺ ke irshadaat ke mutabiq subh (baad Fajr) aur shaam (baad Asr/Maghrib) ke masnoon azkaar baraye ruhani hifazat aur qalbi sukoon.'
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
              <span>{t('Morning Adhkar', 'صبح کے اذکار', 'أذكار الصباح', 'Subh ke Adhkar')}</span>
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
              <span>{t('Evening Adhkar', 'شام کے اذکار', 'أذكار المساء', 'Shaam ke Adhkar')}</span>
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
              {hapticEnabled
                ? t('📳 Haptic On', '📳 وائبریشن آن', '📳 الاهتزاز مفعل', '📳 Haptic On')
                : t('📳 Haptic Off', '📳 وائبریشن آف', '📳 الاهتزاز معطل', '📳 Haptic Off')}
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
              {soundEnabled
                ? t('🔊 Sound On', '🔊 آواز آن', '🔊 الصوت مفعل', '🔊 Sound On')
                : t('🔇 Muted', '🔇 میوٹ', '🔇 كتم الصوت', '🔇 Muted')}
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
              🔤 {t('Transliteration', 'تلفظ', 'النطق اللاتيني', 'Transliteration')}
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
              🔄 {t('Reset', 'ری سیٹ', 'إعادة ضبط', 'Reset')}
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
                `آج کے مکمل اذکار (${activeTab === 'MORNING' ? 'صبح' : 'شام'}): ${completedCount} از ${totalCount} (${completionPercentage}%)`,
                `الأذكار المكتملة (${activeTab === 'MORNING' ? 'الصباح' : 'المساء'}): ${completedCount} من ${totalCount} (${completionPercentage}%)`,
                `Mukammal Adhkar (${activeTab === 'MORNING' ? 'Subh' : 'Shaam'}): ${completedCount} az ${totalCount} (${completionPercentage}%)`
              )}
            </span>
            <span style={{ color: completionPercentage === 100 ? '#166534' : '#64748B' }}>
              {completionPercentage === 100
                ? t(
                    "🎉 Complete! Today's adhkar routine finished",
                    '🎉 مبارک! آج کا پورا معمول مکمل ہو گیا',
                    '🎉 ما شاء الله! اكتمل ورد اليوم بنجاح',
                    '🎉 Mubarak! Aaj ka pura mamool mukammal ho gaya'
                  )
                : t(
                    `${totalCount - completedCount} remaining`,
                    `${totalCount - completedCount} اذکار باقی ہیں`,
                    `بقي ${totalCount - completedCount} أذكار`,
                    `${totalCount - completedCount} adhkar baqi hain`
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
