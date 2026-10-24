import React, { useState, useMemo } from 'react';
import {
  WOMEN_CLASSICAL_CANON,
  SanctuaryBook,
  SanctuaryBookChapter,
} from '../../lib/women-sanctuary-data';
import { UniversalCardPayload } from '../cards/UniversalContentShareModal';

interface SistersLibraryTabProps {
  isUrdu: boolean;
  onOpenSanad: (
    title: string,
    author: string,
    hash: string,
    citation: string,
    notesUrdu: string,
    notesEnglish: string,
    consensusUrdu: string
  ) => void;
  onGenerateChapterCard: (book: SanctuaryBook, chapter: SanctuaryBookChapter) => void;
}

export function SistersLibraryTab({
  isUrdu,
  onOpenSanad,
  onGenerateChapterCard,
}: SistersLibraryTabProps) {
  const [selectedBookCategory, setSelectedBookCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [readingBook, setReadingBook] = useState<SanctuaryBook | null>(null);
  const [activeChapter, setActiveChapter] = useState<SanctuaryBookChapter | null>(null);

  // Filtered Books
  const filteredBooks = useMemo(() => {
    return WOMEN_CLASSICAL_CANON.filter((book) => {
      const matchesCategory =
        selectedBookCategory === 'all' || book.category === selectedBookCategory;
      const q = searchQuery.toLowerCase();
      const matchesQuery =
        !searchQuery ||
        book.titleUrdu.includes(searchQuery) ||
        book.titleEnglish.toLowerCase().includes(q) ||
        book.authorUrdu.includes(searchQuery) ||
        book.authorEnglish.toLowerCase().includes(q) ||
        book.descriptionUrdu.includes(searchQuery) ||
        book.descriptionEnglish.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [selectedBookCategory, searchQuery]);

  return (
    <div>
      {/* If reading a specific chapter */}
      {readingBook && activeChapter ? (
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
              onClick={() => setActiveChapter(null)}
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
      ) : readingBook ? (
        /* Chapters index of a selected book */
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
              onClick={() => setReadingBook(null)}
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
                onClick={() => setActiveChapter(ch)}
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
      ) : (
        /* All 20 Books Grid */
        <div>
          {/* Search & Category Filter */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 14,
              padding: 16,
              border: '1px solid #E5E7EB',
              marginBottom: 20,
              display: 'flex',
              flexWrap: 'wrap',
              gap: 12,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            {/* Category Filter Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {[
                { id: 'all', labelUrdu: 'تمام کتب (۲۰)', labelEn: 'All 20 Books' },
                { id: 'fiqh_taharah', labelUrdu: 'احکام و فقہِ نسواں (۵)', labelEn: 'Fiqh & Purity (5)' },
                { id: 'ummahat_banat', labelUrdu: 'امہات و بناتِ رسول (۸)', labelEn: 'Mothers & Daughters (8)' },
                { id: 'sahabiyyat_muhaddithat', labelUrdu: 'اسوۂ صحابیات (۴)', labelEn: 'Sahabiyyat & Scholars (4)' },
                { id: 'salihat_tarbiyat', labelUrdu: 'صالحات و تربیت (۳)', labelEn: 'Ascetics & Motherhood (3)' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedBookCategory(cat.id)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: 20,
                    border:
                      selectedBookCategory === cat.id
                        ? '1px solid #064E3B'
                        : '1px solid #E5E7EB',
                    backgroundColor:
                      selectedBookCategory === cat.id ? '#064E3B' : '#F9FAFB',
                    color: selectedBookCategory === cat.id ? '#FFFFFF' : '#374151',
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {isUrdu ? cat.labelUrdu : cat.labelEn}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <input
              type="text"
              placeholder={isUrdu ? 'کتاب یا مصنف کا نام تلاش کریں...' : 'Search books or authors...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                padding: '8px 14px',
                borderRadius: 10,
                border: '1px solid #D1D5DB',
                fontSize: 13,
                minWidth: 220,
              }}
            />
          </div>

          {/* Books Cards Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: 16,
            }}
          >
            {filteredBooks.map((book) => (
              <div
                key={book.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 14,
                  padding: 20,
                  border: '1px solid #E5E7EB',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: 8,
                    }}
                  >
                    <span
                      style={{
                        backgroundColor: '#FEF3C7',
                        color: '#92400E',
                        padding: '2px 8px',
                        borderRadius: 6,
                        fontSize: 11,
                        fontWeight: 700,
                      }}
                    >
                      {isUrdu ? book.categoryLabelUrdu : book.categoryLabelEnglish}
                    </span>
                    <span
                      style={{
                        backgroundColor: '#ECFDF5',
                        color: '#064E3B',
                        padding: '2px 8px',
                        borderRadius: 6,
                        fontSize: 11,
                        fontWeight: 600,
                      }}
                    >
                      {book.sanadGrade}
                    </span>
                  </div>

                  <h3
                    style={{
                      margin: '4px 0',
                      fontSize: 19,
                      fontWeight: 800,
                      color: '#064E3B',
                    }}
                  >
                    {isUrdu ? book.titleUrdu : book.titleEnglish}
                  </h3>
                  <div
                    style={{
                      fontSize: 12,
                      color: '#059669',
                      fontWeight: 600,
                      marginBottom: 4,
                    }}
                  >
                    {isUrdu ? book.titleEnglish : book.titleUrdu}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: '#4B5563',
                      fontWeight: 600,
                      marginBottom: 8,
                    }}
                  >
                    {isUrdu ? book.authorUrdu : book.authorEnglish} ({book.authorEra})
                  </div>
                  <p
                    style={{
                      fontSize: 13,
                      color: '#6B7280',
                      lineHeight: 1.6,
                      marginBottom: 16,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {isUrdu ? book.descriptionUrdu : book.descriptionEnglish}
                  </p>
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderTop: '1px solid #F3F4F6',
                    paddingTop: 12,
                  }}
                >
                  <button
                    onClick={() =>
                      onOpenSanad(
                        book.titleUrdu,
                        book.authorUrdu,
                        book.verificationHash,
                        book.authorEra,
                        book.descriptionUrdu,
                        book.descriptionEnglish,
                        book.scholarlyConsensusUrdu
                      )
                    }
                    style={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: '#059669',
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    <span>✓</span>
                    <span>{isUrdu ? 'مستند سند' : 'Sanad'}</span>
                  </button>

                  <button
                    onClick={() => {
                      setReadingBook(book);
                      if (book.coreChapters.length === 1 && book.coreChapters[0]) {
                        setActiveChapter(book.coreChapters[0]);
                      }
                    }}
                    style={{
                      backgroundColor: '#064E3B',
                      color: '#FFFFFF',
                      border: 'none',
                      padding: '6px 14px',
                      borderRadius: 8,
                      fontSize: 13,
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    {isUrdu ? 'مطالعہ کریں' : 'Read Book'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
