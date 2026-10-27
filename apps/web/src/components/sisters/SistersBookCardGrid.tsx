import React from 'react';
import { SanctuaryBook } from '../../lib/women-sanctuary-data';

export interface SistersBookCardGridProps {
  isUrdu: boolean;
  filteredBooks: SanctuaryBook[];
  selectedBookCategory: string;
  searchQuery: string;
  setSelectedBookCategory: (cat: string) => void;
  setSearchQuery: (query: string) => void;
  onSelectBook: (book: SanctuaryBook) => void;
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

export const SistersBookCardGrid: React.FC<SistersBookCardGridProps> = ({
  isUrdu,
  filteredBooks,
  selectedBookCategory,
  searchQuery,
  setSelectedBookCategory,
  setSearchQuery,
  onSelectBook,
  onOpenSanad,
}) => {
  return (
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
            { id: 'all', labelUrdu: 'تمام کتب (۲۱)', labelEn: 'All 21 Books' },
            { id: 'fiqh_taharah', labelUrdu: 'احکام و فقہِ نسواں (۵)', labelEn: 'Fiqh & Purity (5)' },
            { id: 'ummahat_banat', labelUrdu: 'امہات و بناتِ رسول (۸)', labelEn: 'Mothers & Daughters (8)' },
            { id: 'sahabiyyat_muhaddithat', labelUrdu: 'اسوۂ صحابیات (۵)', labelEn: 'Sahabiyyat & Scholars (5)' },
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

              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                {book.pdfUrl && (
                  <a
                    href={book.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      backgroundColor: '#FEF3C7',
                      color: '#92400E',
                      border: '1px solid #FDE68A',
                      padding: '6px 10px',
                      borderRadius: 8,
                      fontSize: 12,
                      fontWeight: 700,
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                    }}
                    title={isUrdu ? 'مکمل پی ڈی ایف ڈاؤن لوڈ کریں' : 'Download Complete PDF'}
                  >
                    <span>📥</span>
                    <span>PDF</span>
                  </a>
                )}

                <button
                  onClick={() => onSelectBook(book)}
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
          </div>
        ))}
      </div>
    </div>
  );
};
