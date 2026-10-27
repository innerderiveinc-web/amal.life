import React from 'react';
import { SanctuaryBook, SanctuaryBookChapter } from '../../lib/women-sanctuary-data';

export interface SistersBookIndexViewProps {
  isUrdu: boolean;
  readingBook: SanctuaryBook;
  onBackToAllBooks: () => void;
  onSelectChapter: (chapter: SanctuaryBookChapter) => void;
  onOpenSanad: (
    title: string,
    author: string,
    hash: string,
    era: string,
    descUrdu: string,
    descEnglish: string,
    consensusUrdu: string
  ) => void;
}

export const SistersBookIndexView: React.FC<SistersBookIndexViewProps> = ({
  isUrdu,
  readingBook,
  onBackToAllBooks,
  onSelectChapter,
  onOpenSanad,
}) => {
  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 24,
        border: '1px solid #E5E7EB',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
        }}
      >
        <button
          onClick={onBackToAllBooks}
          style={{
            backgroundColor: '#F3F4F6',
            border: 'none',
            padding: '6px 14px',
            borderRadius: 8,
            cursor: 'pointer',
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          {isUrdu ? '← کتب خانے کی فہرست پر واپس' : '← Back to All Books'}
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {readingBook.pdfUrl && (
            <a
              href={readingBook.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: '#FEF3C7',
                color: '#92400E',
                border: '1px solid #FDE68A',
                padding: '6px 14px',
                borderRadius: 8,
                fontSize: 12,
                fontWeight: 700,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <span>📥</span>
              <span>{isUrdu ? 'مکمل اصل پی ڈی ایف ڈاؤن لوڈ کریں' : 'Download Complete PDF'}</span>
            </a>
          )}
          <button
            onClick={() =>
              onOpenSanad(
                readingBook.titleUrdu,
                readingBook.authorUrdu,
                readingBook.verificationHash,
                readingBook.authorEra,
                readingBook.descriptionUrdu,
                readingBook.descriptionEnglish,
                readingBook.scholarlyConsensusUrdu
              )
            }
            style={{
              backgroundColor: '#ECFDF5',
              color: '#064E3B',
              border: '1px solid #A7F3D0',
              padding: '6px 12px',
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            ✓ {isUrdu ? 'تحقیق و سندِ کتاب' : 'Sanad Certificate'}
          </button>
        </div>
      </div>

      <h2 style={{ fontSize: 24, fontWeight: 800, color: '#064E3B', margin: '4px 0' }}>
        {isUrdu ? readingBook.titleUrdu : readingBook.titleEnglish}
      </h2>
      <div style={{ fontSize: 14, color: '#047857', fontWeight: 600, marginBottom: 6 }}>
        {isUrdu ? readingBook.titleEnglish : readingBook.titleUrdu}
      </div>
      <div style={{ fontSize: 14, color: '#4B5563', marginBottom: 16 }}>
        <strong>{isUrdu ? readingBook.authorUrdu : readingBook.authorEnglish}</strong> • {readingBook.authorEra}
      </div>
      <p style={{ fontSize: 15, color: '#374151', lineHeight: 1.7, marginBottom: 24 }}>
        {isUrdu ? readingBook.descriptionUrdu : readingBook.descriptionEnglish}
      </p>

      <h3
        style={{
          fontSize: 18,
          fontWeight: 700,
          color: '#1F2937',
          borderBottom: '2px solid #E5E7EB',
          paddingBottom: 8,
          marginBottom: 16,
        }}
      >
        {isUrdu ? 'کتاب کے منتخب ابواب و مضامین' : 'Core Included Chapters'}
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {readingBook.coreChapters.map((ch) => (
          <div
            key={ch.chapterId}
            style={{
              border: '1px solid #E5E7EB',
              borderRadius: 12,
              padding: 16,
              backgroundColor: '#F9FAFB',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 16,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
            onClick={() => onSelectChapter(ch)}
          >
            <div>
              <div style={{ fontWeight: 800, fontSize: 16, color: '#064E3B', marginBottom: 4 }}>
                {ch.chapterNumber}. {isUrdu ? ch.titleUrdu : ch.titleEnglish}
              </div>
              <div style={{ fontSize: 12, color: '#059669', marginBottom: 4 }}>
                {isUrdu ? ch.titleEnglish : ch.titleUrdu}
              </div>
              <div style={{ fontSize: 13, color: '#6B7280' }}>
                {isUrdu ? ch.summaryUrdu : ch.summaryEnglish}
              </div>
            </div>
            <button
              style={{
                backgroundColor: '#064E3B',
                color: '#FFFFFF',
                border: 'none',
                padding: '8px 16px',
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 700,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              {isUrdu ? 'مطالعہ کریں' : 'Read Chapter'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
