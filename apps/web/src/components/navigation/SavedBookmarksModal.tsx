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
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'bookmarks' | 'history'>('bookmarks');
  const [bookmarks, setBookmarks] = useState<BookmarkRecord[]>([]);
  const [history, setHistory] = useState<ReadingHistoryItem[]>([]);

  useEffect(() => {
    if (isOpen) {
      setBookmarks(getSavedBookmarks());
      setHistory(getReadingHistory());
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleRemove = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    removeBookmark(id);
    setBookmarks(getSavedBookmarks());
    showAmalToast(t('Bookmark removed', 'بک مارک ہٹا دیا گیا', 'تمت إزالة الإشارة المرجعية', 'Bookmark hata diya gaya'), 'info');
  };

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'library':
        return { label: t('Library Book', 'کتب خانہ', 'كتب المكتبة', 'Kutub Khana'), bg: '#EFF6FF', color: '#1E40AF' };
      case 'quran':
        return { label: t('Quran Surah', 'قرآنِ مجید', 'سور القرآن', 'Quran Majeed'), bg: '#ECFDF5', color: '#065F46' };
      case 'sahabiyyat':
        return { label: t('Sahabiyyat', 'صحابیات', 'الصحابيات رضي الله عنهن', 'Sahabiyyat'), bg: '#FDF2F8', color: '#9D174D' };
      case 'fiqh':
        return { label: t('Fiqh Ruling', 'احکامِ فقہ', 'الأحكام الفقهية', 'Ahkam-e-Fiqh'), bg: '#FEF3C7', color: '#92400E' };
      default:
        return { label: t('Dua', 'دعا و اذکار', 'الأدعية والأذكار', 'Dua o Azkaar'), bg: '#F3F4F6', color: '#374151' };
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
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
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
                {t('Saved Bookmarks & Reading History', 'محفوظ شدہ اسباق و مطالعہ کی تاریخ', 'المفضلات المحفوظة وسجل القراءة', 'Mahfooz Shuda Asbaaq o Tareekh-e-Mutala\'ah')}
              </h3>
              <span style={{ fontSize: 12, color: '#64748B' }}>
                {t('Jump directly back to where you left off', 'کسی بھی وقت دوبارہ مطالعہ وہیں سے شروع کریں', 'تابع القراءة مباشرة من حيث توقفت', 'Kisi bhi waqt dobara mutala\'ah wahin se shuru karein')}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
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
            🔖 {t(`Bookmarks (${bookmarks.length})`, `محفوظ شدہ (${bookmarks.length})`, `المفضلات (${bookmarks.length})`, `Bookmarks (${bookmarks.length})`)}
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
            🕒 {t(`Recent History (${history.length})`, `حالیہ مطالعہ (${history.length})`, `سجل القراءة (${history.length})`, `Haliya Mutala'ah (${history.length})`)}
          </button>
        </div>

        {/* Body Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '18px 24px' }}>
          {activeTab === 'bookmarks' ? (
            bookmarks.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '50px 20px', color: '#94A3B8' }}>
                <div style={{ fontSize: 44, marginBottom: 12 }}>🔖</div>
                <h4 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 6px', color: '#475569' }}>
                  {t('No Bookmarks Saved Yet', 'کوئی محفوظ شدہ نشان نہیں ملا', 'لا توجد مفضلات محفوظة بعد', 'Koi mahfooz shuda nishan nahi mila')}
                </h4>
                <p style={{ fontSize: 13, margin: 0 }}>
                  {t(
                    'While reading any book chapter, Quran surah, or Sahabiyyah biography, tap the 🔖 Bookmark icon to save it here.',
                    'مطالعہ کے دوران کسی بھی کتاب، سورۃ یا صحابیہ کے صفحے پر 🔖 کے نشان پر کلک کریں تاکہ وہ یہاں محفوظ ہو جائے۔',
                    'أثناء قراءة أي باب أو سورة أو ترجمة، انقر على أيقونة الإشارة المرجعية 🔖 لحفظها هنا.',
                    'Mutala\'ah ke dauran kisi bhi kitab, surah ya sahabiyyah ke safhe par 🔖 par click karein.'
                  )}
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
                          {language === 'ar' ? (b.titleArabic || b.titleUrdu || b.titleEnglish) : language === 'ur' ? b.titleUrdu : language === 'roman' ? (b.titleEnglish || b.titleUrdu) : b.titleEnglish}
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
                        title={t('Remove Bookmark', 'بک مارک ہٹائیں', 'إزالة الإشارة', 'Bookmark Hatayein')}
                        style={{
                          backgroundColor: '#FEE2E2',
                          color: '#B91C1C',
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
                {t('No Reading History Recorded', 'مطالعہ کی کوئی تاریخ نہیں', 'لا يوجد سجل قراءة حتى الآن', 'Mutala\'ah ki koi tareekh nahi')}
              </h4>
              <p style={{ fontSize: 13, margin: 0 }}>
                {t(
                  'As you read books, chapters, and biographies, your recently opened modules will automatically appear here.',
                  'جب آپ کتب یا صحابیات کا مطالعہ فرمائیں گے تو آپ کے آخری کھولے گئے مضامین خود بخود یہاں درج ہو جائیں گے۔',
                  'عند تصفحك للكتب والأبواب والتراجم ستظهر هنا تلقائياً.',
                  'Jab aap kutub ya sahabiyyat ka mutala\'ah farmayein ge to aakhri kholey gaye mazameen yahan darj ho jayein ge.'
                )}
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
                      {language === 'ar' || language === 'ur' ? h.titleUrdu : h.titleEnglish}
                    </div>
                  </div>

                  <span style={{ fontSize: 18, color: '#047857' }}>➔</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
