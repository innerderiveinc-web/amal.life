import React from 'react';
import { SanctuaryBook, SanctuaryBookChapter } from '../../lib/women-sanctuary-data';

export interface SistersChapterReaderViewProps {
  isUrdu: boolean;
  readingBook: SanctuaryBook;
  activeChapter: SanctuaryBookChapter;
  onBackToBookIndex: () => void;
  onGenerateChapterCard: (book: SanctuaryBook, chapter: SanctuaryBookChapter) => void;
  onOpenSanad: (
    title: string,
    author: string,
    hash: string,
    citation: string,
    notesUrdu: string,
    notesEnglish: string,
    consensusUrdu: string
  ) => void;
}

export const SistersChapterReaderView: React.FC<SistersChapterReaderViewProps> = ({
  isUrdu,
  readingBook,
  activeChapter,
  onBackToBookIndex,
  onGenerateChapterCard,
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
          borderBottom: '1px solid #F3F4F6',
          paddingBottom: 12,
        }}
      >
        <button
          onClick={onBackToBookIndex}
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
          {isUrdu ? '← کتاب کی فہرست پر واپس' : '← Back to Book Index'}
        </button>
        <span
          style={{
            backgroundColor: '#ECFDF5',
            color: '#064E3B',
            padding: '4px 10px',
            borderRadius: 8,
            fontSize: 12,
            fontWeight: 700,
          }}
        >
          {isUrdu ? readingBook.titleUrdu : readingBook.titleEnglish}
        </span>
      </div>

      <h2
        style={{
          fontSize: 22,
          fontWeight: 800,
          color: '#064E3B',
          marginBottom: 8,
        }}
      >
        {isUrdu ? activeChapter.titleUrdu : activeChapter.titleEnglish}
      </h2>
      <p
        style={{
          fontSize: 14,
          color: '#6B7280',
          marginBottom: 16,
        }}
      >
        {isUrdu ? activeChapter.titleEnglish : activeChapter.titleUrdu} • {activeChapter.hadithOrFiqhReference}
      </p>

      <div
        style={{
          backgroundColor: '#F9FAFB',
          padding: 16,
          borderRadius: 12,
          border: '1px solid #E5E7EB',
          marginBottom: 20,
        }}
      >
        <div style={{ fontWeight: 700, marginBottom: 6, color: '#374151' }}>
          {isUrdu ? 'اہم ترین نکات (Key Takeaways):' : 'Key Takeaways:'}
        </div>
        <ul style={{ margin: 0, paddingInlineStart: 20, lineHeight: 1.8 }}>
          {activeChapter.keyTakeaways.map((point, idx) => (
            <li key={idx} style={{ color: '#1F2937', fontSize: 14 }}>
              {point}
            </li>
          ))}
        </ul>
      </div>

      <div
        style={{
          fontSize: isUrdu ? 17 : 15,
          lineHeight: 2,
          color: '#111827',
          whiteSpace: 'pre-line',
          padding: '16px 8px',
        }}
      >
        {activeChapter.fullTextUrdu}
      </div>

      <div
        style={{
          marginTop: 24,
          paddingTop: 16,
          borderTop: '1px solid #E5E7EB',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span style={{ fontSize: 12, color: '#6B7280' }}>
          {isUrdu ? 'ماخذ:' : 'Source:'} {activeChapter.hadithOrFiqhReference}
        </span>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => onGenerateChapterCard(readingBook, activeChapter)}
            style={{
              backgroundColor: '#FDF2F8',
              color: '#9D174D',
              border: '1px solid #FBCFE8',
              padding: '6px 12px',
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <span>🎨</span>
            <span>{isUrdu ? 'حکمت کارڈ بنائیں' : 'Create Wisdom Card'}</span>
          </button>

          <button
            onClick={() =>
              onOpenSanad(
                readingBook.titleUrdu,
                readingBook.authorUrdu,
                readingBook.verificationHash,
                activeChapter.hadithOrFiqhReference,
                activeChapter.summaryUrdu,
                activeChapter.summaryEnglish,
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
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <span>✓</span>
            <span>{isUrdu ? 'مستند سند دیکھیں' : 'Verify Sanad'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
