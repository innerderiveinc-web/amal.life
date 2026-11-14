import React from 'react';
import { CanonicalEditionRecord } from '@amal/evidence';
import { AmalTheme } from '@amal/ui';
import { getBookChapters, getVerifiedSourceUrl, getLocalPdfForWork } from '../../lib/classical-chapters-data';
import { IslamicStarRosette } from '../ui/IslamicArabesqueFrame';
import { useLanguage } from '../../context/LanguageContext';

interface LibraryBookCardProps {
  work: CanonicalEditionRecord;
  isSelected?: boolean;
  onSelectWork: (work: CanonicalEditionRecord) => void;
  onOpenReader: (work: CanonicalEditionRecord) => void;
}

export const LibraryBookCard: React.FC<LibraryBookCardProps> = ({
  work,
  isSelected = false,
  onSelectWork,
  onOpenReader,
}) => {
  const { t, isUrdu, isArabic } = useLanguage();
  const isQuran = work.discipline === 'QURAN' || work.work_id === 'CANON-QUR-001';
  const hasInAppChapters = !isQuran && !!getBookChapters(work.work_id);
  const localPdf = getLocalPdfForWork(work.work_id);
  const source = getVerifiedSourceUrl(work.work_id, work.discipline);

  const getDisciplineColor = (disc: string) => {
    switch (disc) {
      case 'QURAN':
      case 'TAFSIR':
        return { bg: '#DCFCE7', text: '#15803D', border: '#86EFAC' };
      case 'HADITH':
      case 'MUSTALAH_AL_HADITH':
        return { bg: '#EFF6FF', text: '#1D4ED8', border: '#93C5FD' };
      case 'HANAFI_FIQH':
      case 'MALIKI_FIQH':
      case 'SHAFII_FIQH':
      case 'HANBALI_FIQH':
        return { bg: '#FEF3C7', text: '#B45309', border: '#FDE68A' };
      case 'SIRAH':
      case 'SHAMAIL':
        return { bg: '#FDF2F8', text: '#BE185D', border: '#FBCFE8' };
      case 'TAZKIYAH':
      case 'SPIRITUAL_HERITAGE':
        return { bg: '#F5F3FF', text: '#6D28D9', border: '#DDD6FE' };
      default:
        return { bg: '#F1F5F9', text: '#475569', border: '#CBD5E1' };
    }
  };

  const discColor = getDisciplineColor(work.discipline);

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        border: isSelected
          ? `2px solid ${AmalTheme.colors.primary}`
          : '1px solid #E2E8F0',
        borderLeft: isSelected
          ? `4px solid ${AmalTheme.colors.primary}`
          : `3.5px solid ${discColor.border}`,
        padding: '18px 20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: isSelected
          ? '0 6px 18px rgba(16, 185, 129, 0.12)'
          : '0 2px 6px rgba(0, 0, 0, 0.03)',
        transition: 'all 0.15s ease',
        position: 'relative',
      }}
    >
      {/* Top Header: Discipline Badge & Death Year */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, gap: 8 }}>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                padding: '3px 8px',
                borderRadius: 8,
                backgroundColor: discColor.bg,
                color: discColor.text,
                border: `1px solid ${discColor.border}`,
                letterSpacing: 0.3,
              }}
            >
              {work.discipline.replace(/_/g, ' ')}
            </span>

            {isQuran ? (
              <span style={{ fontSize: 10.5, fontWeight: 700, padding: '2px 7px', borderRadius: 6, backgroundColor: '#DCFCE7', color: '#166534' }}>
                {t('114 SURAHS', '۱۱۴ سورتیں', '١١٤ سورة', '114 SURAHS')}
              </span>
            ) : hasInAppChapters ? (
              <span style={{ fontSize: 10.5, fontWeight: 700, padding: '2px 7px', borderRadius: 6, backgroundColor: '#FEF3C7', color: '#92400E' }}>
                {t('IN-APP READER', 'اندرونی ریڈر', 'قراءة داخلية', 'IN-APP READER')}
              </span>
            ) : localPdf ? (
              <span style={{ fontSize: 10.5, fontWeight: 700, padding: '2px 7px', borderRadius: 6, backgroundColor: '#FDF2F8', color: '#9D174D' }}>
                {t('BUNDLED PDF', 'اصل نسخہ PDF', 'نسخة PDF', 'BUNDLED PDF')}
              </span>
            ) : null}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 11.5, color: '#64748B', fontWeight: 600 }}>
              {work.author_death_hijri > 0 ? (isUrdu || isArabic ? `${work.author_death_hijri}ھ` : `${work.author_death_hijri} AH`) : t('Divine', 'وحیِ الٰہی', 'وحي', 'Divine')}
            </span>
            <IslamicStarRosette size={14} color={discColor.border} />
          </div>
        </div>

        {/* Arabic Title */}
        <div
          style={{
            fontFamily: 'var(--font-arabic), serif',
            fontSize: 20,
            fontWeight: 800,
            direction: 'rtl',
            textAlign: 'right',
            color: '#0F172A',
            lineHeight: 1.45,
            marginBottom: 6,
          }}
        >
          {work.title_arabic}
        </div>

        {/* Transliterated English Title */}
        <div
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: '#1E293B',
            lineHeight: 1.35,
            marginBottom: 4,
          }}
        >
          {work.title_transliterated}
        </div>

        {/* Author Name */}
        <div
          style={{
            fontSize: 12.5,
            color: '#475569',
            marginBottom: 8,
          }}
        >
          {work.author_name}
        </div>

        {/* Publisher & Volume Metadata */}
        <div style={{ fontSize: 11.5, color: '#64748B', display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
          {work.volume_count > 1 && (
            <span style={{ backgroundColor: '#F1F5F9', padding: '2px 6px', borderRadius: 4, fontWeight: 600 }}>
              {work.volume_count} Volumes
            </span>
          )}
          {work.critical_editor_muhaqqiq && (
            <span style={{ color: '#047857', fontWeight: 500 }}>
              Tahqiq: {work.critical_editor_muhaqqiq}
            </span>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', paddingTop: 10, borderTop: '1px solid #F1F5F9' }}>
        {(isQuran || hasInAppChapters) ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenReader(work);
            }}
            style={{
              flex: 1,
              padding: '8px 12px',
              borderRadius: 8,
              backgroundColor: AmalTheme.colors.primary,
              color: '#FFFFFF',
              border: 'none',
              fontSize: 12.5,
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              transition: 'all 0.15s ease',
            }}
          >
            <span>📖</span>
            <span>{t('Open Reader', 'مطالعہ کریں', 'فتح القارئ', 'Mutala\'ah Karein')}</span>
          </button>
        ) : localPdf ? (
          <a
            href={localPdf.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{
              flex: 1,
              padding: '8px 12px',
              borderRadius: 8,
              backgroundColor: '#9D174D',
              color: '#FFFFFF',
              textDecoration: 'none',
              fontSize: 12.5,
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
            }}
          >
            <span>📄</span>
            <span>{t(`Read PDF (${localPdf.fileSizeBytes})`, `پی ڈی ایف (${localPdf.fileSizeBytes})`, `قراءة PDF (${localPdf.fileSizeBytes})`, `Read PDF (${localPdf.fileSizeBytes})`)}</span>
          </a>
        ) : (
          <a
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{
              flex: 1,
              padding: '8px 12px',
              borderRadius: 8,
              backgroundColor: '#F8FAFC',
              color: '#0F172A',
              border: '1px solid #CBD5E1',
              textDecoration: 'none',
              fontSize: 12,
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
            }}
          >
            <span>🌐</span>
            <span>{t('Shamela Archives', 'الشاملہ نسخہ', 'المكتبة الشاملة', 'Shamela Archives')}</span>
          </a>
        )}

        {/* View Sanad & Details Button */}
        <button
          onClick={() => onSelectWork(work)}
          title={t('Inspect Critical Sanad & Provenance', 'سند و تحقیقِ نسخہ دیکھیں', 'معاينة السند والتحقيق', 'Sanad o Tehqeeq Dekhein')}
          style={{
            padding: '8px 12px',
            borderRadius: 8,
            backgroundColor: isSelected ? '#E2E8F0' : '#F1F5F9',
            color: '#334155',
            border: 'none',
            fontSize: 12,
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <span>📜</span>
          <span>{t('Sanad', 'سند', 'السند', 'Sanad')}</span>
        </button>
      </div>
    </div>
  );
};
