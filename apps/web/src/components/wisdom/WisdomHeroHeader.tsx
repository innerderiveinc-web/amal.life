import React from 'react';
import Link from 'next/link';
import { AmalTheme } from '@amal/ui';
import { QURAN_WISDOM_COLLECTION } from '../../lib/quran-wisdom-data';
import { useLanguage } from '../../context/LanguageContext';

interface WisdomHeroHeaderProps {
  continuousIndex: number | null;
  onToggleContinuous: () => void;
  isUrdu?: boolean;
}

export const WisdomHeroHeader: React.FC<WisdomHeroHeaderProps> = ({
  continuousIndex,
  onToggleContinuous,
}) => {
  const { t } = useLanguage();

  return (
    <>
      {/* Top Breadcrumb & Quran Full Reader Quick Link */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 0 12px',
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#666' }}>
          <Link
            href="/"
            style={{
              color: AmalTheme.colors.primary,
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            {t('Home', 'صفحۂ اول', 'الرئيسية', 'Ghar / Home')}
          </Link>
          <span>/</span>
          <span style={{ color: '#0F172A', fontWeight: 700 }}>
            {t(
              'Quran Wisdom & Classical Cards',
              'قرآنی حکمت و تدبر',
              'الحكمة القرآنية والبطاقات الكلاسيكية',
              'Qurani Hikmat o Tadabbur Cards'
            )}
          </span>
        </div>

        <Link
          href="/quran"
          style={{
            padding: '6px 14px',
            borderRadius: 8,
            backgroundColor: '#ECFDF5',
            border: '1px solid #86EFAC',
            color: '#065F46',
            textDecoration: 'none',
            fontSize: 12,
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <span>📖</span>
          <span>
            {t(
              'Full Quran Reader (114 Surahs) ➔',
              'مکمل قرآنِ کریم (114 سورتیں) ➔',
              'المصحف الكامل (١١٤ سورة) ➔',
              'Mukammal Quran (114 Surahs) ➔'
            )}
          </span>
        </Link>
      </div>

      {/* Serene Hero Header */}
      <header
        style={{
          background: 'linear-gradient(135deg, #0F291E 0%, #1B4332 60%, #2D6A4F 100%)',
          borderRadius: 20,
          padding: '28px 32px',
          color: '#FFFFFF',
          marginBottom: 24,
          boxShadow: '0 10px 25px -5px rgba(15, 41, 30, 0.25)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <div style={{ maxWidth: 680 }}>
            <div style={{ fontSize: 16, color: '#86EFAC', fontWeight: 700, marginBottom: 4 }}>
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </div>
            <h1 style={{ fontSize: 28, fontWeight: 900, margin: '4px 0 8px' }}>
              {t(
                'Sacred Knowledge & Wisdom Cards',
                'قرآنی حکمت، تدبر و عمل',
                'بطاقات المعرفة الشرعية والحكمة القرآنية',
                'Qurani Hikmat, Tadabbur o Amal'
              )}
            </h1>
            <p style={{ fontSize: 14, color: '#E2E8F0', lineHeight: 1.6, margin: 0 }}>
              {t(
                'Curated Quranic verses, authentic Ahadith, and classical Sunni guidance with English and Roman transliteration.',
                '۴۲ منتخب قرآنی آیات، مستند احادیث، شمائل اور فقہی معمولات روزمرہ زندگی کے لیے عملی رہنمائی کے ساتھ۔',
                'آيات قرآنية مختارة، وأحاديث صحيحة، وتوجيهات سنية موثقة مع النطق اللاتيني والترجمة.',
                '42 muntakhab Qurani aayatein, mustanad ahadeeth, shamail aur fiqhi mamoolat amli rehnumai ke sath.'
              )}
            </p>
          </div>

          {/* Play All Continuous Button */}
          <button
            type="button"
            onClick={onToggleContinuous}
            style={{
              padding: '10px 18px',
              borderRadius: 12,
              backgroundColor: continuousIndex !== null ? '#DC2626' : '#F59E0B',
              color: '#FFFFFF',
              border: 'none',
              fontWeight: 800,
              fontSize: 13,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
            }}
          >
            <span>{continuousIndex !== null ? '⏹' : '🎧'}</span>
            <span>
              {continuousIndex !== null
                ? t(
                    `Playing (${continuousIndex + 1}/${QURAN_WISDOM_COLLECTION.length}) — Pause`,
                    `جاری ہے (${continuousIndex + 1}/${QURAN_WISDOM_COLLECTION.length})`,
                    `جاري التشغيل (${continuousIndex + 1}/${QURAN_WISDOM_COLLECTION.length})`,
                    `Jari hai (${continuousIndex + 1}/${QURAN_WISDOM_COLLECTION.length})`
                  )
                : t(
                    'Play All 42 Verses Consecutively',
                    'تمام آیات کی تلاوت سنیں',
                    'استمع لتلاوة جميع الـ ٤٢ آية بالتتابع',
                    'Tamam aayaton ki tilawat sunein'
                  )}
            </span>
          </button>
        </div>
      </header>
    </>
  );
};
