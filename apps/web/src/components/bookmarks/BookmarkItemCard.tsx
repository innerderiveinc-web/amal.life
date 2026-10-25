import React from 'react';
import { SavedBookmarkItem } from './default-bookmarks-data';

export interface BookmarkItemCardProps {
  bookmark: SavedBookmarkItem;
  isUrdu: boolean;
  onCopyText: (text: string, title: string) => void;
  onPlayBookmark: (bm: SavedBookmarkItem) => void;
}

export const BookmarkItemCard: React.FC<BookmarkItemCardProps> = ({
  bookmark: bm,
  isUrdu,
  onCopyText,
  onPlayBookmark,
}) => {
  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        border: '1px solid #E2E8F0',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.02)',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h4 style={{ fontSize: 15, fontWeight: 800, color: '#0F172A', margin: 0, lineHeight: 1.4 }}>
            {isUrdu ? bm.titleUrdu : bm.titleEnglish}
          </h4>
          <span style={{ fontSize: 11, color: '#64748B' }}>
            {isUrdu ? bm.titleEnglish : bm.titleUrdu || ''}
          </span>
        </div>
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            backgroundColor: '#ECFDF5',
            color: '#065F46',
            padding: '2px 8px',
            borderRadius: 12,
            border: '1px solid #A7F3D0',
          }}
        >
          {bm.category}
        </span>
      </div>

      {/* Arabic Matn */}
      <div
        className="font-arabic"
        style={{
          fontSize: 15,
          color: '#064E3B',
          backgroundColor: '#F8FAFC',
          padding: '10px 14px',
          borderRadius: 8,
          border: '1px solid #E2E8F0',
          lineHeight: 1.9,
        }}
      >
        {bm.arabicText}
      </div>

      {/* Urdu Translation */}
      <div style={{ fontSize: 12, color: '#334155', lineHeight: 1.6 }}>
        {bm.translationUrdu}
      </div>

      {/* Citation & Action Controls */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 4,
          paddingTop: 8,
          borderTop: '1px solid #F1F5F9',
        }}
      >
        <span style={{ fontSize: 11, color: '#94A3B8', fontWeight: 600 }}>
          {bm.citation}
        </span>

        <div style={{ display: 'flex', gap: 6 }}>
          <button
            onClick={() => onCopyText(`${bm.arabicText}\n\n${bm.translationUrdu}\n[${bm.citation}]`, bm.titleUrdu)}
            style={{
              background: '#F1F5F9',
              border: 'none',
              borderRadius: 6,
              padding: '4px 8px',
              fontSize: 11,
              fontWeight: 600,
              color: '#475569',
              cursor: 'pointer',
            }}
            title="کاپی کریں"
          >
            📋 کاپی
          </button>

          {bm.audioUrl && (
            <button
              onClick={() => onPlayBookmark(bm)}
              style={{
                backgroundColor: '#064E3B',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: 6,
                padding: '4px 10px',
                fontSize: 11,
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <span>▶</span>
              <span>سنیں</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
