import React from 'react';
import { CanonicalEditionRecord } from '@amal/evidence';
import { ClassicalBookWithChapters, ClassicalChapter } from '../../lib/classical-chapters-data';
import { UniversalCardPayload } from '../cards/UniversalContentShareModal';

export interface LibraryClassicalBookReaderViewProps {
  selectedWork: CanonicalEditionRecord;
  bookChaptersData: ClassicalBookWithChapters | null;
  currentChapter?: ClassicalChapter;
  selectedChapterIndex: number;
  setSelectedChapterIndex: (idx: number) => void;
  readerTheme: 'CLEAN' | 'SEPIA' | 'DARK';
  fontSize: number;
  verifiedSource: { name: string; url: string };
  onSharePayload: (payload: UniversalCardPayload) => void;
}

export const LibraryClassicalBookReaderView: React.FC<LibraryClassicalBookReaderViewProps> = ({
  selectedWork,
  bookChaptersData,
  currentChapter,
  selectedChapterIndex,
  setSelectedChapterIndex,
  readerTheme,
  fontSize,
  verifiedSource,
  onSharePayload,
}) => {
  if (!bookChaptersData || !currentChapter) {
    return (
      <div
        style={{
          padding: '36px 20px',
          textAlign: 'center',
          backgroundColor: readerTheme === 'DARK' ? '#0F172A' : '#F8FAFC',
          borderRadius: 12,
          border: `1px solid ${readerTheme === 'DARK' ? '#334155' : '#E2E8F0'}`,
        }}
      >
        <div style={{ fontSize: 40, marginBottom: 12 }}>📜</div>
        <h3 style={{ fontSize: 17, fontWeight: 800, margin: '0 0 8px' }}>
          کیٹلاگ ریکارڈ محفوظ ہے — ڈیجیٹل متن تصدیق کے مرحلے میں ہے
        </h3>
        <p style={{ fontSize: 13, color: '#6B7280', maxWidth: 540, margin: '0 auto 16px' }}>
          اس تصنیف مبارک کا علمی اسناد محفوظ ہے۔ مصدقہ اصل ماخذ دیکھنے کے لیے درج ذیل لنک پر کلک کریں۔
        </p>
        <a
          href={verifiedSource.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '12px 22px',
            borderRadius: 10,
            backgroundColor: '#1B4332',
            color: '#FFFFFF',
            fontSize: 13,
            fontWeight: 700,
            textDecoration: 'none',
          }}
        >
          🏛️ تصدیق شدہ اصل ماخذ کھولیں ({verifiedSource.name}) ↗
        </a>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Chapters Switcher */}
      <div
        style={{
          display: 'flex',
          gap: 8,
          overflowX: 'auto',
          paddingBottom: 8,
          borderBottom: `1px solid ${readerTheme === 'DARK' ? '#334155' : '#E5E7EB'}`,
        }}
      >
        {bookChaptersData.chapters.map((chap, idx) => (
          <button
            key={chap.chapterId}
            onClick={() => setSelectedChapterIndex(idx)}
            style={{
              padding: '8px 14px',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
              border: 'none',
              backgroundColor:
                selectedChapterIndex === idx
                  ? '#1B4332'
                  : readerTheme === 'DARK'
                  ? '#0F172A'
                  : '#F1F5F9',
              color:
                selectedChapterIndex === idx
                  ? '#FFFFFF'
                  : readerTheme === 'DARK'
                  ? '#CBD5E1'
                  : '#334155',
              whiteSpace: 'nowrap',
            }}
          >
            {chap.chapterTitleArabic}
          </button>
        ))}
      </div>

      {/* Chapter Title Badge */}
      <div
        style={{
          backgroundColor: readerTheme === 'DARK' ? '#0F172A' : '#ECFDF5',
          padding: '12px 16px',
          borderRadius: 10,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <div style={{ fontWeight: 800, fontSize: 16, color: '#065F46' }}>
            {currentChapter.chapterTitleUrdu}
          </div>
          <div style={{ fontSize: 12, color: '#4B5563', marginTop: 2 }}>
            {currentChapter.chapterTitleEnglish}
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            const firstArabicLine =
              currentChapter.arabicMatn.split('\n')[0] || currentChapter.arabicMatn;
            const firstUrduLine =
              currentChapter.urduTranslation.split('\n')[0] || currentChapter.urduTranslation;
            onSharePayload({
              category: 'HADITH',
              titleUrdu: currentChapter.chapterTitleUrdu,
              badgeContext: selectedWork.title_transliterated,
              arabicText: firstArabicLine.slice(0, 320),
              primaryTextUrdu: firstUrduLine.slice(0, 360),
              secondaryTextEnglish: currentChapter.englishSynopsis?.slice(0, 240),
              sourceCitation: `${selectedWork.title_arabic} · ${currentChapter.chapterTitleUrdu}`,
            });
          }}
          style={{
            padding: '6px 14px',
            borderRadius: 8,
            border: '1px solid #10B981',
            backgroundColor: '#064E3B',
            color: '#FFFFFF',
            fontSize: 12,
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          📸 کارڈ بنائیں
        </button>
      </div>

      {/* Arabic Matn Box */}
      <div
        style={{
          padding: 18,
          borderRadius: 12,
          backgroundColor: readerTheme === 'DARK' ? '#0F172A' : '#F9FAFB',
          border: `1px solid ${readerTheme === 'DARK' ? '#334155' : '#E5E7EB'}`,
        }}
      >
        <div
          dir="rtl"
          style={{
            fontFamily: 'var(--font-arabic), "Amiri", serif',
            fontSize: fontSize + 4,
            lineHeight: 2.2,
            textAlign: 'right',
            whiteSpace: 'pre-line',
            color: readerTheme === 'DARK' ? '#F8FAFC' : '#0F172A',
          }}
        >
          {currentChapter.arabicMatn}
        </div>
      </div>

      {/* Urdu Translation Box */}
      <div
        style={{
          padding: 18,
          borderRadius: 12,
          backgroundColor: readerTheme === 'DARK' ? '#0F172A' : '#F9FAFB',
          border: `1px solid ${readerTheme === 'DARK' ? '#334155' : '#E5E7EB'}`,
        }}
      >
        <div
          dir="rtl"
          style={{
            fontFamily: 'var(--font-urdu), serif',
            fontSize: fontSize + 1,
            lineHeight: 2.2,
            textAlign: 'right',
            whiteSpace: 'pre-line',
            color: readerTheme === 'DARK' ? '#CBD5E1' : '#1E293B',
          }}
        >
          {currentChapter.urduTranslation}
        </div>
      </div>
    </div>
  );
};
