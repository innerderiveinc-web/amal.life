import React from 'react';
import { CanonicalEditionRecord } from '@amal/evidence';
import { AmalTheme } from '@amal/ui';
import { getBookChapters, getVerifiedSourceUrl, getLocalPdfForWork } from '../../lib/classical-chapters-data';
import { showAmalToast } from '../Toast';

interface LibraryWorkDetailProps {
  selectedWork: CanonicalEditionRecord | null;
  onOpenReader: () => void;
}

export function LibraryWorkDetail({
  selectedWork,
  onOpenReader,
}: LibraryWorkDetailProps) {
  if (!selectedWork) {
    return (
      <div style={{ textAlign: 'center', padding: 60, color: '#888' }}>
        Select a work from the canonical library to view manuscript credentials and read chapters.
      </div>
    );
  }

  const isQuran =
    selectedWork.discipline === 'QURAN' || selectedWork.work_id === 'CANON-QUR-001';
  const hasSelectedInAppChapters = isQuran || !!getBookChapters(selectedWork.work_id);
  const verifiedSource = getVerifiedSourceUrl(selectedWork.work_id);
  const localPdf = getLocalPdfForWork(selectedWork.work_id);

  return (
    <div
      id="library-detail-panel"
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 26,
        border: `1px solid ${AmalTheme.colors.surface.borderLight}`,
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
      }}
    >
      <div>
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            padding: '3px 10px',
            borderRadius: 12,
            backgroundColor: isQuran
              ? '#E8F5E9'
              : hasSelectedInAppChapters
              ? '#FEF3C7'
              : '#E0F2FE',
            color: isQuran
              ? '#2E7D32'
              : hasSelectedInAppChapters
              ? '#92400E'
              : '#0369A1',
          }}
        >
          {isQuran
            ? 'COMPLETE 114 SURAHS · VERIFIED UTHMANIC MUSHAF'
            : hasSelectedInAppChapters
            ? 'AUTHENTIC CORE CHAPTERS · VERIFIED SCHOLARLY MANUSCRIPT'
            : `VERIFIED DIGITAL REPOSITORY · ${selectedWork.volume_count} VOLUME(S)`}
        </span>
        <h2
          style={{
            fontFamily: 'var(--font-arabic), serif',
            fontSize: 26,
            fontWeight: 800,
            margin: '12px 0 4px',
            direction: 'rtl',
            textAlign: 'right',
            color: AmalTheme.colors.primary,
          }}
        >
          {selectedWork.title_arabic}
        </h2>
        <h3 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 6px', color: '#0F172A' }}>
          {selectedWork.title_transliterated}
        </h3>
        <div style={{ fontSize: 14, color: '#475569' }}>
          Author: <strong>{selectedWork.author_name}</strong> (
          {selectedWork.author_death_hijri > 0
            ? `d. ${selectedWork.author_death_hijri} AH`
            : 'Revelation'}
          )
        </div>
      </div>

      {/* PRIMARY ACTION BUTTONS: READ IN-APP */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button
          onClick={onOpenReader}
          style={{
            width: '100%',
            padding: '14px 20px',
            borderRadius: 10,
            backgroundColor: '#1B4332',
            color: '#FFFFFF',
            border: 'none',
            fontWeight: 700,
            fontSize: 15,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            boxShadow: '0 4px 6px -1px rgba(27, 67, 50, 0.2)',
          }}
        >
          <span>📖</span>
          <span>
            {isQuran
              ? 'Read All 114 Surahs In-App (قرآنِ مجید کی مکمل ۱۱۴ سورتیں پڑھیں)'
              : hasSelectedInAppChapters
              ? `Read Selected Chapters In-App (مطالعہ شروع کریں — ${selectedWork.title_transliterated})`
              : `View Manuscript Credentials & Source (علمی اسناد و ماخذ — ${selectedWork.title_transliterated})`}
          </span>
        </button>

        {localPdf && (
          <a
            href={localPdf.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              width: '100%',
              padding: '12px 18px',
              borderRadius: 10,
              backgroundColor: '#FEF3C7',
              color: '#92400E',
              border: '1px solid #FDE68A',
              fontWeight: 700,
              fontSize: 14,
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              boxShadow: '0 2px 4px rgba(180, 83, 9, 0.08)',
              transition: 'background-color 0.15s ease',
              boxSizing: 'border-box',
            }}
          >
            <span>📥</span>
            <span>
              Download / Read Full Official PDF ({localPdf.fileSizeBytes}) · مکمل پی ڈی ایف
            </span>
          </a>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {isQuran ? (
            <a
              href="https://quran.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '10px 14px',
                borderRadius: 8,
                backgroundColor: '#F8FAFC',
                color: '#1E293B',
                border: '1px solid #CBD5E1',
                fontSize: 12,
                fontWeight: 600,
                textAlign: 'center',
                textDecoration: 'none',
              }}
            >
              Quran.com Audio & Reciters ↗
            </a>
          ) : (
            <a
              href={verifiedSource.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '10px 14px',
                borderRadius: 8,
                backgroundColor: '#F0FDF4',
                color: '#166534',
                border: '1px solid #86EFAC',
                fontSize: 12,
                fontWeight: 700,
                textAlign: 'center',
                textDecoration: 'none',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
              title={verifiedSource.name}
            >
              🏛️ {verifiedSource.name} ↗
            </a>
          )}

          <button
            onClick={() => {
              navigator.clipboard?.writeText(selectedWork.provenance_sha256);
              showAmalToast('Manuscript SHA-256 Hash copied to clipboard', 'success');
            }}
            style={{
              padding: '10px 14px',
              borderRadius: 8,
              backgroundColor: '#F8FAFC',
              color: '#1E293B',
              border: '1px solid #CBD5E1',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Copy Manuscript SHA-256 Hash
          </button>
        </div>
      </div>

      {/* Provenance Metadata Table */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 12,
          backgroundColor: '#F8FAFC',
          padding: 16,
          borderRadius: 10,
          fontSize: 13,
          border: '1px solid #E2E8F0',
        }}
      >
        <div>
          <span style={{ color: '#64748B', display: 'block', fontSize: 11 }}>CANONICAL PUBLISHER</span>
          <span style={{ fontWeight: 600, color: '#0F172A' }}>{selectedWork.edition_publisher}</span>
        </div>
        <div>
          <span style={{ color: '#64748B', display: 'block', fontSize: 11 }}>VOLUMES / EXTENT</span>
          <span style={{ fontWeight: 600, color: '#0F172A' }}>{selectedWork.volume_count} Volume(s)</span>
        </div>
        <div>
          <span style={{ color: '#64748B', display: 'block', fontSize: 11 }}>CRITICAL EDITOR (MUHAQQIQ)</span>
          <span style={{ fontWeight: 600, color: '#0F172A' }}>{selectedWork.critical_editor_muhaqqiq}</span>
        </div>
        <div>
          <span style={{ color: '#64748B', display: 'block', fontSize: 11 }}>SCHOLARLY AUTHORITY LEVEL</span>
          <span style={{ fontWeight: 600, color: '#059669' }}>{selectedWork.scholarly_authority_level}</span>
        </div>
      </div>

      {/* Scope & Authenticity Explanation */}
      <div
        style={{
          padding: 14,
          borderRadius: 10,
          backgroundColor: '#FEF3C7',
          border: '1px solid #FDE68A',
          fontSize: 12,
          lineHeight: 1.6,
          color: '#92400E',
        }}
      >
        <div style={{ fontWeight: 700, marginBottom: 2 }}>
          علمی دیانت داری و مستند ذخیرہ (Theological Authenticity &amp; Classical Protocol):
        </div>
        {isQuran ? (
          <span>
            قرآن پاک کے تمام ۱۱۴ سورتوں کا عثمانی متن، اردو اور انگریزی ترجمہ بغیر کسی حذف و اضافے کے ایپ میں براہِ راست پڑھا جا سکتا ہے۔
          </span>
        ) : (
          <span>
            اس کلاسیکی کتاب کے منتخب اور اساسی ابواب روزمرہ مطالعہ، خشوع اور اخلاقی رہنمائی کے لیے ایپ میں شامل کیے گئے ہیں۔ مکمل ۷،۵۶۳ احادیث یا ضخیم جلدوں کی تحقیق کے لیے سرکاری مکمل ذخیرہ اوپر والے بٹن سے دیکھا جا سکتا ہے۔
          </span>
        )}
      </div>
    </div>
  );
}
