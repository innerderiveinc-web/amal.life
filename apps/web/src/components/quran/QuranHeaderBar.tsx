import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AmalTheme } from '@amal/ui';

export type QuranHubTab = 'READER' | 'AUDIO' | 'TAJWEED' | 'WISDOM';

interface QuranHeaderBarProps {
  lastReadPosition: {
    surahNumber: number;
    ayahNumber: number;
    surahNameArabic?: string;
    surahNameUrdu?: string;
    surahNameTransliterated?: string;
    viewMode: 'SCROLL' | 'FOCUS';
    timestamp: number;
  } | null;
  onResumeLastRead: () => void;
  activeHubTab: QuranHubTab;
  onSelectHubTab: (tab: QuranHubTab) => void;
  isUrdu: boolean;
  t: (en: string, ur: string) => string;
}

export const QuranHeaderBar: React.FC<QuranHeaderBarProps> = ({
  lastReadPosition,
  onResumeLastRead,
  activeHubTab,
  onSelectHubTab,
  isUrdu,
  t,
}) => {
  const router = useRouter();

  const tabs = [
    {
      id: 'READER' as QuranHubTab,
      icon: '📖',
      labelUrdu: 'تلاوت و تفاسیر (۱۱۴ سورتیں)',
      labelEn: 'Recitation & Tafsir (114 Surahs)',
    },
    {
      id: 'AUDIO' as QuranHubTab,
      icon: '🎧',
      labelUrdu: 'قراء کرام و آڈیو اسٹریمنگ',
      labelEn: 'Master Reciters Stream',
    },
    {
      id: 'TAJWEED' as QuranHubTab,
      icon: '🎙️',
      labelUrdu: 'تجوید و مخارج مشق',
      labelEn: 'Tajweed & Makharij Trainer',
    },
    {
      id: 'WISDOM' as QuranHubTab,
      icon: '✨',
      labelUrdu: 'قرآنی حکمت کارڈز',
      labelEn: 'Ayah Wisdom Cards',
    },
  ];

  return (
    <>
      {/* Noble Header & Scholarly Credentials Bar */}
      <div
        style={{
          padding: '16px 0 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12,
          borderBottom: '1px solid #E2E8F0',
          marginBottom: 20,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Link
            href="/"
            style={{
              color: AmalTheme.colors.primary,
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: 13,
            }}
          >
            Home
          </Link>
          <span style={{ color: '#94A3B8' }}>/</span>
          <span style={{ color: '#0F172A', fontWeight: 800, fontSize: 16 }}>
            {t('The Holy Quran', 'القرآن الکریم')}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          {lastReadPosition && (
            <button
              onClick={onResumeLastRead}
              style={{
                fontSize: 11,
                padding: '4px 10px',
                borderRadius: 8,
                backgroundColor: '#ECFDF5',
                color: '#065F46',
                fontWeight: 800,
                border: '1px solid #A7F3D0',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
                transition: 'all 0.15s ease',
              }}
              title={t('Resume last recitation', 'آخری تلاوت یا سنے گئے مقام پر فوری جائیں')}
            >
              <span>🔖</span>
              <span>
                {t(
                  `Last Read: ${lastReadPosition.surahNameTransliterated} (${lastReadPosition.ayahNumber})`,
                  `آخری مقام: ${lastReadPosition.surahNameUrdu || lastReadPosition.surahNameTransliterated} (${lastReadPosition.ayahNumber})`
                )}
              </span>
            </button>
          )}
          <span
            style={{
              fontSize: 11,
              padding: '4px 10px',
              borderRadius: 8,
              backgroundColor: '#DCFCE7',
              color: '#166534',
              fontWeight: 800,
              border: '1px solid #BBF7D0',
            }}
          >
            {t('✓ Uthmanic Medina Script', '✓ مصحف مدینہ منورہ')}
          </span>
          <span
            style={{
              fontSize: 11,
              padding: '4px 10px',
              borderRadius: 8,
              backgroundColor: '#FEF3C7',
              color: '#92400E',
              fontWeight: 800,
              border: '1px solid #FDE68A',
            }}
          >
            {t('Translation: Kanz-ul-Iman', 'ترجمہ: کنز الایمان فی ترجمۃ القرآن')}
          </span>
          <span
            style={{
              fontSize: 11,
              padding: '4px 10px',
              borderRadius: 8,
              backgroundColor: '#EFF6FF',
              color: '#1E40AF',
              fontWeight: 800,
              border: '1px solid #BFDBFE',
            }}
          >
            {t("Tafsir: Khaza'in-ul-Irfan", 'تفسیر: خزائن العرفان')}
          </span>
          <Link
            href="/wisdom"
            style={{
              fontSize: 11,
              padding: '4px 12px',
              borderRadius: 8,
              backgroundColor: '#065F46',
              color: '#FFFFFF',
              fontWeight: 700,
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 5,
            }}
            title={t('Open 42 Curated Quranic Wisdom Cards', '۴۲ منتخب قرآنی حکمت کارڈز کھولیں')}
          >
            <span>✨</span>
            <span>{t('Wisdom Cards', 'حکمت کارڈز')}</span>
          </Link>
        </div>
      </div>

      {/* UNIFIED QURAN HUB SUITE TABS */}
      <div
        style={{
          display: 'flex',
          gap: 8,
          overflowX: 'auto',
          marginBottom: 20,
          padding: 4,
          backgroundColor: '#FFFFFF',
          borderRadius: 12,
          border: '1px solid #E2E8F0',
        }}
      >
        {tabs.map((tab) => {
          const isActive = activeHubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                if (tab.id === 'WISDOM') {
                  router.push('/wisdom');
                } else {
                  onSelectHubTab(tab.id);
                  router.push(`/quran?tab=${tab.id.toLowerCase()}`, undefined, { shallow: true });
                }
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '9px 16px',
                borderRadius: 8,
                border: 'none',
                backgroundColor: isActive ? '#065F46' : 'transparent',
                color: isActive ? '#FFFFFF' : '#475569',
                fontWeight: isActive ? 800 : 600,
                fontSize: 13,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease',
              }}
            >
              <span>{tab.icon}</span>
              <span>{isUrdu ? tab.labelUrdu : tab.labelEn}</span>
            </button>
          );
        })}
      </div>
    </>
  );
};
