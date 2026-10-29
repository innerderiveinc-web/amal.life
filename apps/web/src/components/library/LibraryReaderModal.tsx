import React from 'react';
import { CanonicalEditionRecord } from '@amal/evidence';
import { getBookChapters, getVerifiedSourceUrl } from '../../lib/classical-chapters-data';
import { QuranSurahMeta } from '../../lib/quran-114-directory';
import { QuranSurahData } from '../../lib/quran-surahs-data';
import { UniversalCardPayload } from '../cards/UniversalContentShareModal';
import { saveBookmark, isBookmarked, recordReadingHistory } from '../../lib/bookmarks-store';
import { showAmalToast } from '../Toast';
import { LibraryQuranReaderView } from './LibraryQuranReaderView';
import { LibraryClassicalBookReaderView } from './LibraryClassicalBookReaderView';

export interface LibraryReaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedWork: CanonicalEditionRecord | null;
  readerTheme: 'CLEAN' | 'SEPIA' | 'DARK';
  setReaderTheme: (theme: 'CLEAN' | 'SEPIA' | 'DARK') => void;
  fontSize: number;
  setFontSize: React.Dispatch<React.SetStateAction<number>>;
  selectedChapterIndex: number;
  setSelectedChapterIndex: (idx: number) => void;
  selectedSurahNumber: number;
  onSelectSurah: (num: number) => void;
  surahSearchFilter: string;
  setSurahSearchFilter: (s: string) => void;
  filteredSurahList: QuranSurahMeta[];
  belovedSurahShortcuts: { num: number; label: string }[];
  currentSurah: QuranSurahData;
  isLoadingSurah: boolean;
  surahFetchError: string | null;
  onSharePayload: (payload: UniversalCardPayload) => void;
  onOpenWisdomModal: (surahNum: number, ayahNum: number) => void;
}

export function LibraryReaderModal({
  isOpen,
  onClose,
  selectedWork,
  readerTheme,
  setReaderTheme,
  fontSize,
  setFontSize,
  selectedChapterIndex,
  setSelectedChapterIndex,
  selectedSurahNumber,
  onSelectSurah,
  belovedSurahShortcuts,
  currentSurah,
  isLoadingSurah,
  onSharePayload,
  onOpenWisdomModal,
}: LibraryReaderModalProps) {
  if (!isOpen || !selectedWork) return null;

  const isQuran =
    selectedWork.discipline === 'QURAN' || selectedWork.work_id === 'CANON-QUR-001';
  const bookChaptersData = getBookChapters(selectedWork.work_id);
  const verifiedSource = getVerifiedSourceUrl(selectedWork.work_id);
  const currentChapter =
    bookChaptersData?.chapters[selectedChapterIndex] || bookChaptersData?.chapters[0];

  const [bookmarked, setBookmarked] = React.useState(false);

  React.useEffect(() => {
    if (isOpen && selectedWork) {
      const bId = isQuran
        ? `quran_${selectedSurahNumber}`
        : `lib_${selectedWork.work_id}_${selectedChapterIndex}`;
      setBookmarked(isBookmarked(bId));

      recordReadingHistory({
        id: isQuran ? `quran_${selectedSurahNumber}` : selectedWork.work_id,
        titleUrdu: isQuran ? `سورۃ ${currentSurah.nameArabic}` : selectedWork.title_arabic,
        titleEnglish: isQuran ? `Surah ${currentSurah.nameTransliterated}` : selectedWork.title_transliterated,
        categoryLabel: isQuran ? 'Quran' : selectedWork.discipline.replace('_', ' '),
        routeUrl: isQuran ? `/library?surah=${selectedSurahNumber}` : `/library?work=${selectedWork.work_id}`,
      });
    }
  }, [isOpen, selectedWork, selectedChapterIndex, selectedSurahNumber, isQuran]);

  const handleToggleBookmark = () => {
    if (!selectedWork) return;
    const bId = isQuran
      ? `quran_${selectedSurahNumber}`
      : `lib_${selectedWork.work_id}_${selectedChapterIndex}`;

    const nowSaved = saveBookmark({
      id: bId,
      category: isQuran ? 'quran' : 'library',
      titleArabic: isQuran ? currentSurah.nameArabic : selectedWork.title_arabic,
      titleUrdu: isQuran
        ? `سورۃ ${currentSurah.nameUrdu || currentSurah.nameArabic}`
        : (currentChapter?.chapterTitleUrdu || selectedWork.title_arabic),
      titleEnglish: isQuran
        ? `Surah ${currentSurah.nameTransliterated}`
        : (currentChapter?.chapterTitleEnglish || selectedWork.title_transliterated),
      sourceOrAuthor: isQuran ? 'The Noble Quran' : selectedWork.author_name,
      targetId: isQuran ? String(selectedSurahNumber) : selectedWork.work_id,
      secondaryIndex: isQuran ? undefined : selectedChapterIndex,
      excerpt: isQuran ? currentSurah.verses[0]?.textUrdu : currentChapter?.englishSynopsis,
    });

    setBookmarked(nowSaved);
    showAmalToast(
      nowSaved
        ? '🔖 سبق کو محفوظ کر لیا گیا (Bookmarked for later)'
        : 'نشان ہٹا دیا گیا (Bookmark removed)',
      nowSaved ? 'success' : 'info'
    );
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.85)',
        backdropFilter: 'blur(6px)',
        zIndex: 10003,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '95%',
          maxWidth: 1040,
          backgroundColor:
            readerTheme === 'SEPIA'
              ? '#FBF0D9'
              : readerTheme === 'DARK'
              ? '#1E293B'
              : '#FFFFFF',
          color: readerTheme === 'DARK' ? '#F8FAFC' : '#1E293B',
          borderRadius: 20,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
          padding: '24px 28px',
          border: `1px solid ${readerTheme === 'DARK' ? '#334155' : '#E2E8F0'}`,
          maxHeight: '94vh',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          transition: 'background-color 0.2s ease',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Reader Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            borderBottom: `1px solid ${
              readerTheme === 'DARK' ? '#334155' : '#E5E7EB'
            }`,
            paddingBottom: 14,
            flexWrap: 'wrap',
            gap: 10,
          }}
        >
          <div>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: '#10B981',
                letterSpacing: 1,
                textTransform: 'uppercase',
              }}
            >
              {isQuran
                ? 'SACRED REVELATION · THE NOBLE QURAN (ALL 114 SURAHS)'
                : `CLASSICAL HERITAGE · ${selectedWork.discipline.replace('_', ' ')}`}
            </span>
            <h2 style={{ fontSize: 22, fontWeight: 800, margin: '4px 0 2px' }}>
              {selectedWork.title_transliterated} ({selectedWork.title_arabic})
            </h2>
            <div
              style={{
                fontSize: 13,
                color: readerTheme === 'DARK' ? '#94A3B8' : '#64748B',
              }}
            >
              {selectedWork.author_name}
            </div>
          </div>

          {/* Controls: Theme & Font Size */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {/* Theme selector */}
            <div
              style={{
                display: 'flex',
                backgroundColor: readerTheme === 'DARK' ? '#0F172A' : '#F1F5F9',
                borderRadius: 8,
                padding: 2,
              }}
            >
              {(['CLEAN', 'SEPIA', 'DARK'] as const).map((theme) => (
                <button
                  key={theme}
                  onClick={() => setReaderTheme(theme)}
                  style={{
                    border: 'none',
                    background:
                      readerTheme === theme
                        ? theme === 'DARK'
                          ? '#334155'
                          : '#FFFFFF'
                        : 'transparent',
                    color:
                      readerTheme === 'DARK' && readerTheme === theme
                        ? '#FFFFFF'
                        : '#475569',
                    padding: '4px 8px',
                    borderRadius: 6,
                    fontSize: 11,
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  {theme === 'CLEAN' ? 'Light' : theme === 'SEPIA' ? 'Sepia' : 'Dark'}
                </button>
              ))}
            </div>

            {/* Font size buttons */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                backgroundColor: readerTheme === 'DARK' ? '#0F172A' : '#F1F5F9',
                borderRadius: 8,
                padding: '2px 6px',
              }}
            >
              <button
                onClick={() => setFontSize((s) => Math.max(14, s - 2))}
                style={{
                  border: 'none',
                  background: 'none',
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: 'pointer',
                  color: readerTheme === 'DARK' ? '#F8FAFC' : '#1E293B',
                }}
              >
                A-
              </button>
              <span style={{ fontSize: 11, color: '#888' }}>{fontSize}px</span>
              <button
                onClick={() => setFontSize((s) => Math.min(32, s + 2))}
                style={{
                  border: 'none',
                  background: 'none',
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: 'pointer',
                  color: readerTheme === 'DARK' ? '#F8FAFC' : '#1E293B',
                }}
              >
                A+
              </button>
            </div>

            {/* Bookmark button */}
            <button
              onClick={handleToggleBookmark}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                border: 'none',
                background: bookmarked
                  ? '#065F46'
                  : readerTheme === 'DARK'
                  ? '#334155'
                  : '#E2E8F0',
                color: bookmarked ? '#FFFFFF' : readerTheme === 'DARK' ? '#F8FAFC' : '#1E293B',
                padding: '5px 10px',
                borderRadius: 8,
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: 12,
                transition: 'all 0.15s ease',
              }}
              title={bookmarked ? 'Remove Bookmark' : 'Save Bookmark'}
            >
              <span>{bookmarked ? '🔖' : '📑'}</span>
              <span>{bookmarked ? 'Saved' : 'Bookmark'}</span>
            </button>

            <button
              onClick={onClose}
              style={{
                border: 'none',
                background: readerTheme === 'DARK' ? '#334155' : '#E2E8F0',
                color: readerTheme === 'DARK' ? '#FFF' : '#333',
                width: 28,
                height: 28,
                borderRadius: '50%',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: 14,
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Reader Content Body */}
        {isQuran ? (
          <LibraryQuranReaderView
            readerTheme={readerTheme}
            fontSize={fontSize}
            selectedSurahNumber={selectedSurahNumber}
            onSelectSurah={onSelectSurah}
            belovedSurahShortcuts={belovedSurahShortcuts}
            currentSurah={currentSurah}
            isLoadingSurah={isLoadingSurah}
            onSharePayload={onSharePayload}
            onOpenWisdomModal={onOpenWisdomModal}
          />
        ) : (
          <LibraryClassicalBookReaderView
            selectedWork={selectedWork}
            bookChaptersData={bookChaptersData}
            currentChapter={currentChapter}
            selectedChapterIndex={selectedChapterIndex}
            setSelectedChapterIndex={setSelectedChapterIndex}
            readerTheme={readerTheme}
            fontSize={fontSize}
            verifiedSource={verifiedSource}
            onSharePayload={onSharePayload}
          />
        )}
      </div>
    </div>
  );
}
