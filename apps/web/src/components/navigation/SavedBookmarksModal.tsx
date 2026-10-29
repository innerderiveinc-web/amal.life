import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';
import {
  BookmarkRecord,
  getSavedBookmarks,
  removeBookmark,
  ReadingHistoryItem,
  getReadingHistory,
} from '../../lib/bookmarks-store';
import { showAmalToast } from '../Toast';

interface SavedBookmarksModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectBookmark?: (bookmark: BookmarkRecord) => void;
}

export function SavedBookmarksModal({
  isOpen,
  onClose,
  onSelectBookmark,
}: SavedBookmarksModalProps) {
  const { isUrdu } = useLanguage();
  const [activeTab, setActiveTab] = useState<'bookmarks' | 'history'>('bookmarks');
  const [bookmarks, setBookmarks] = useState<BookmarkRecord[]>([]);
  const [history, setHistory] = useState<ReadingHistoryItem[]>([]);

  useEffect(() => {
    if (isOpen) {
      setBookmarks(getSavedBookmarks());
      setHistory(getReadingHistory());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleRemove = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    removeBookmark(id);
    setBookmarks(getSavedBookmarks());
    showAmalToast(isUrdu ? 'بک مارک ہٹا دیا گیا' : 'Bookmark removed', 'info');
  };

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'library':
        return { label: isUrdu ? 'کتب خانہ' : 'Library Book', bg: '#EFF6FF', color: '#1E40AF' };
      case 'quran':
        return { label: isUrdu ? 'قرآنِ مجید' : 'Quran Surah', bg: '#ECFDF5', color: '#065F46' };
      case 'sahabiyyat':
        return { label: isUrdu ? 'صحابیات' : 'Sahabiyyat', bg: '#FDF2F8', color: '#9D174D' };
      case 'fiqh':
        return { label: isUrdu ? 'احکامِ فقہ' : 'Fiqh Ruling', bg: '#FEF3C7', color: '#92400E' };
      default:
        return { label: isUrdu ? 'دعا و اذکار' : 'Dua', bg: '#F3F4F6', color: '#374151' };
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(4px)',
        zIndex: 10005,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '92%',
          maxWidth: 680,
          maxHeight: '85vh',
          backgroundColor: '#FFFFFF',
          borderRadius: 20,
          boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid #E2E8F0',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid #F1F5F9',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 24 }}>🔖</span>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 800, margin: 0, color: '#0F172A' }}>
                {isUrdu ? 'محفوظ شدہ اسباق و مطالعہ کی تاریخ' : 'Saved Bookmarks & Reading History'}
              </h3>
              <span style={{ fontSize: 12, color: '#64748B' }}>
                {isUrdu ? 'کسی بھی وقت دوبارہ مطالعہ وہیں سے شروع کریں' : 'Jump directly back to where you left off'}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              backgroundColor: '#F1F5F9',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: 14,
              color: '#475569',
            }}
          >
            ✕
          </button>
        </div>

        {/* Tab Toggle */}
        <div
          style={{
            display: 'flex',
            gap: 8,
            padding: '12px 24px',
            backgroundColor: '#F8FAFC',
            borderBottom: '1px solid #E2E8F0',
          }}
        >
          <button
            onClick={() => setActiveTab('bookmarks')}
            style={{
              padding: '7px 16px',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              backgroundColor: activeTab === 'bookmarks' ? '#1B4332' : 'transparent',
              color: activeTab === 'bookmarks' ? '#FFFFFF' : '#475569',
            }}
          >
            🔖 {isUrdu ? `محفوظ شدہ (${bookmarks.length})` : `Bookmarks (${bookmarks.length})`}
          </button>

          <button
            onClick={() => setActiveTab('history')}
            style={{
              padding: '7px 16px',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              backgroundColor: activeTab === 'history' ? '#1B4332' : 'transparent',
              color: activeTab === 'history' ? '#FFFFFF' : '#475569',
            }}
          >
            🕒 {isUrdu ? `حالیہ مطالعہ (${history.length})` : `Recent History (${history.length})`}
          </button>
        </div>

        {/* Body Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '18px 24px' }}>
          {activeTab === 'bookmarks' ? (
            bookmarks.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '50px 20px', color: '#94A3B8' }}>
                <div style={{ fontSize: 44, marginBottom: 12 }}>🔖</div>
                <h4 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 6px', color: '#475569' }}>
                  {isUrdu ? 'کوئی محفوظ شدہ نشان نہیں ملا' : 'No Bookmarks Saved Yet'}
                </h4>
                <p style={{ fontSize: 13, margin: 0 }}>
                  {isUrdu
                    ? 'مطالعہ کے دوران کسی بھی کتاب، سورۃ یا صحابیہ کے صفحے پر 🔖 کے نشان پر کلک کریں تاکہ وہ یہاں محفوظ ہو جائے۔'
                    : 'While reading any book chapter, Quran surah, or Sahabiyyah biography, tap the 🔖 Bookmark icon to save it here.'}
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {bookmarks.map((b) => {
                  const badge = getCategoryBadge(b.category);
                  return (
                    <div
                      key={b.id}
                      onClick={() => {
                        if (onSelectBookmark) {
                          onSelectBookmark(b);
                          onClose();
                        }
                      }}
                      style={{
                        padding: 14,
                        borderRadius: 12,
                        border: '1px solid #E2E8F0',
                        backgroundColor: '#FFFFFF',
                        cursor: onSelectBookmark ? 'pointer' : 'default',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 12,
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                          <span
                            style={{
                              fontSize: 10,
                              fontWeight: 800,
                              padding: '2px 8px',
                              borderRadius: 6,
                              backgroundColor: badge.bg,
                              color: badge.color,
                            }}
                          >
                            {badge.label}
                          </span>
                          <span style={{ fontSize: 11, color: '#94A3B8' }}>
                            {new Date(b.dateSaved).toLocaleDateString()}
                          </span>
                        </div>

                        <div style={{ fontSize: 14, fontWeight: 800, color: '#0F172A', marginBottom: 2 }}>
                          {isUrdu ? b.titleUrdu : b.titleEnglish}
                        </div>

                        {b.sourceOrAuthor && (
                          <div style={{ fontSize: 12, color: '#64748B' }}>
                            {b.sourceOrAuthor}
                          </div>
                        )}

                        {b.excerpt && (
                          <div
                            style={{
                              fontSize: 12,
                              color: '#475569',
                              marginTop: 6,
                              fontStyle: 'italic',
                              lineHeight: 1.4,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            "{b.excerpt}"
                          </div>
                        )}
                      </div>

                      <button
                        onClick={(e) => handleRemove(e, b.id)}
                        title={isUrdu ? 'بک مارک ہٹائیں' : 'Remove Bookmark'}
                        style={{
                          backgroundColor: '#FEE2E2',
                          color: '#DC2626',
                          border: 'none',
                          borderRadius: 8,
                          padding: '6px 10px',
                          cursor: 'pointer',
                          fontSize: 12,
                          fontWeight: 700,
                        }}
                      >
                        🗑️
                      </button>
                    </div>
                  );
                })}
              </div>
            )
          ) : history.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '50px 20px', color: '#94A3B8' }}>
              <div style={{ fontSize: 44, marginBottom: 12 }}>🕒</div>
              <h4 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 6px', color: '#475569' }}>
                {isUrdu ? 'مطالعہ کی کوئی تاریخ نہیں' : 'No Reading History Recorded'}
              </h4>
              <p style={{ fontSize: 13, margin: 0 }}>
                {isUrdu
                  ? 'جب آپ کتب یا صحابیات کا مطالعہ فرمائیں گے تو آپ کے آخری کھولے گئے مضامین خود بخود یہاں درج ہو جائیں گے۔'
                  : 'As you read books, chapters, and biographies, your recently opened modules will automatically appear here.'}
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {history.map((h) => (
                <Link
                  key={h.id}
                  href={h.routeUrl}
                  onClick={onClose}
                  style={{
                    padding: 14,
                    borderRadius: 12,
                    border: '1px solid #E2E8F0',
                    backgroundColor: '#FFFFFF',
                    textDecoration: 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 12,
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 800,
                          padding: '2px 8px',
                          borderRadius: 6,
                          backgroundColor: '#F1F5F9',
                          color: '#475569',
                        }}
                      >
                        {h.categoryLabel}
                      </span>
                      <span style={{ fontSize: 11, color: '#94A3B8' }}>
                        {new Date(h.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    <div style={{ fontSize: 14, fontWeight: 800, color: '#0F172A' }}>
                      {isUrdu ? h.titleUrdu : h.titleEnglish}
                    </div>
                  </div>

                  <span style={{ fontSize: 18, color: '#10B981' }}>➔</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
