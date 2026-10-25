import React, { useState, useEffect } from 'react';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import { showAmalToast } from './Toast';
import { useLanguage } from '../context/LanguageContext';
import { DEFAULT_BELOVED_BOOKMARKS, SavedBookmarkItem } from './bookmarks/default-bookmarks-data';
import { BookmarkItemCard } from './bookmarks/BookmarkItemCard';

export type { SavedBookmarkItem } from './bookmarks/default-bookmarks-data';

interface BookmarksQuickDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookmarksQuickDrawer: React.FC<BookmarksQuickDrawerProps> = ({ isOpen, onClose }) => {
  const { t, isUrdu } = useLanguage();
  const [bookmarks, setBookmarks] = useState<SavedBookmarkItem[]>(DEFAULT_BELOVED_BOOKMARKS);
  const [activeCategory, setActiveCategory] = useState<'ALL' | 'DUA' | 'AYAH' | 'ADHKAR'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const { playTrack } = useAudioPlayer();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('amal_saved_bookmarks');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setBookmarks(parsed);
          }
        }
      } catch {
        // Fallback to default
      }
    }
  }, []);

  const handleCopyText = (text: string, title: string) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text);
      showAmalToast(`محفوظ متن کاپی ہوا: ${title}`);
    }
  };

  const handlePlayBookmark = (bm: SavedBookmarkItem) => {
    if (!bm.audioUrl) return;
    playTrack({
      id: bm.id,
      title: bm.titleUrdu,
      subtitle: bm.citation,
      audioUrl: bm.audioUrl,
      reciter: bm.reciter || 'Masnoon Recitation',
      arabicSnippet: bm.arabicText,
    });
  };

  const filteredBookmarks = bookmarks.filter((bm) => {
    const matchesCategory = activeCategory === 'ALL' || bm.category === activeCategory;
    const matchesSearch =
      searchQuery === '' ||
      bm.titleUrdu.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bm.titleEnglish.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bm.arabicText.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        backgroundColor: 'rgba(5, 20, 15, 0.65)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        justifyContent: 'flex-end',
      }}
      onClick={onClose}
    >
      <div
        className="drawer-slide-in"
        style={{
          width: '100%',
          maxWidth: 480,
          height: '100%',
          backgroundColor: '#FFFFFF',
          boxShadow: '-8px 0 32px rgba(0, 0, 0, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid #E2E8F0',
            backgroundColor: '#064E3B',
            color: '#FFFFFF',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 24 }}>⭐</span>
            <div>
              <h3 style={{ fontSize: 17, fontWeight: 800, margin: 0, letterSpacing: -0.2 }}>
                {t('Saved Invocations & Duas', 'محفوظ معمولات و دعائیں')}
              </h3>
              <div style={{ fontSize: 12, color: '#A7F3D0', marginTop: 2 }}>
                {t('Classical Prophetic Duas & Adhkar', 'مسنون دعائیں اور قرآنی معمولات')}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              border: 'none',
              color: '#FFFFFF',
              width: 32,
              height: 32,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: 16,
              fontWeight: 700,
            }}
          >
            ✕
          </button>
        </div>

        {/* Search & Category Pills */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #F1F5F9', backgroundColor: '#F8FAFC' }}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('Search saved duas (e.g. Ayat al-Kursi, Istighfar)...', 'تلاش کریں (مثلاً: آیت الکرسی، استغفار، نیند)...')}
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: 8,
              border: '1px solid #CBD5E1',
              fontSize: 13,
              outline: 'none',
              marginBottom: 12,
              backgroundColor: '#FFFFFF',
            }}
          />

          <div style={{ display: 'flex', gap: 6 }}>
            {(['ALL', 'DUA', 'AYAH', 'ADHKAR'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  border: 'none',
                  borderRadius: 20,
                  padding: '4px 12px',
                  fontSize: 11,
                  fontWeight: 700,
                  cursor: 'pointer',
                  backgroundColor: activeCategory === cat ? '#064E3B' : '#E2E8F0',
                  color: activeCategory === cat ? '#FFFFFF' : '#475569',
                  transition: 'all 0.15s ease',
                }}
              >
                {cat === 'ALL'
                  ? t('All', 'سبھی')
                  : cat === 'DUA'
                  ? t('Duas', 'دعائیں')
                  : cat === 'AYAH'
                  ? t('Ayahs', 'آیات')
                  : t('Adhkar', 'اذکار')}
              </button>
            ))}
          </div>
        </div>

        {/* Bookmarks List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {filteredBookmarks.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: '#94A3B8' }}>
              <div style={{ fontSize: 36, marginBottom: 8 }}>📿</div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{t('No saved duas found', 'کوئی محفوظ دعا نہیں ملی')}</div>
              <div style={{ fontSize: 12, marginTop: 4 }}>{t('Change search filter or add a new bookmark', 'تلاش تبدیل کریں یا نئی دعا شامل کریں')}</div>
            </div>
          ) : (
            filteredBookmarks.map((bm) => (
              <BookmarkItemCard
                key={bm.id}
                bookmark={bm}
                isUrdu={isUrdu}
                onCopyText={handleCopyText}
                onPlayBookmark={handlePlayBookmark}
              />
            ))
          )}
        </div>

        {/* Drawer Footer */}
        <div
          style={{
            padding: '12px 20px',
            borderTop: '1px solid #E2E8F0',
            backgroundColor: '#F8FAFC',
            fontSize: 11,
            color: '#64748B',
            textAlign: 'center',
          }}
        >
          🔒 دعائیں آپ کے براؤزر کے لوکل سٹوریج میں محفوظ رہتی ہیں · Zero Cloud Upload
        </div>
      </div>
    </div>
  );
};
