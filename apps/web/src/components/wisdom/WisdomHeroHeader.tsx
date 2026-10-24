import React from 'react';
import Link from 'next/link';
import { AmalTheme } from '@amal/ui';
import { QURAN_WISDOM_COLLECTION } from '../../lib/quran-wisdom-data';

interface WisdomHeroHeaderProps {
  isUrdu: boolean;
  continuousIndex: number | null;
  onToggleContinuous: () => void;
}

export const WisdomHeroHeader: React.FC<WisdomHeroHeaderProps> = ({
  isUrdu,
  continuousIndex,
  onToggleContinuous,
}) => {
  return (
    <>
      {/* Top Breadcrumb & Switcher to Pure Quran */}
      <div
        style={{
          padding: '12px 0 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 10,
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
            Home
          </Link>
          <span>/</span>
          <span style={{ color: '#0F172A', fontWeight: 700 }}>
            {isUrdu ? 'قرآنی حکمت و تدبر' : 'Quran Wisdom & Classical Cards'}
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
            {isUrdu ? 'مکمل قرآنِ کریم (114 سورتیں) ➔' : 'Full Quran Reader (114 Surahs) ➔'}
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
              {isUrdu ? 'قرآنی حکمت، تدبر و عمل' : 'Sacred Knowledge & Wisdom Cards'}
            </h1>
            <p style={{ fontSize: 14, color: '#E2E8F0', lineHeight: 1.6, margin: 0 }}>
              {isUrdu
                ? '۴۲ منتخب قرآنی آیات، مستند احادیث، شمائل اور فقہی معمولات روزمرہ زندگی کے لیے عملی رہنمائی کے ساتھ۔'
                : 'Curated Quranic verses, authentic Ahadith, and classical Sunni guidance with English and Roman transliteration.'}
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
                ? isUrdu
                  ? `جاری ہے (${continuousIndex + 1}/${QURAN_WISDOM_COLLECTION.length})`
                  : `Playing (${continuousIndex + 1}/${QURAN_WISDOM_COLLECTION.length}) — Pause`
                : isUrdu
                  ? 'تمام آیات کی تلاوت سنیں'
                  : 'Play All 42 Verses Consecutively'}
            </span>
          </button>
        </div>
      </header>
    </>
  );
};
