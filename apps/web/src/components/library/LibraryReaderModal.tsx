import React from 'react';
import { CanonicalEditionRecord } from '@amal/evidence';
import { getBookChapters, getVerifiedSourceUrl } from '../../lib/classical-chapters-data';
import { ALL_114_SURAHS, QuranSurahMeta } from '../../lib/quran-114-directory';
import { QuranSurahData } from '../../lib/quran-surahs-data';
import { UniversalCardPayload } from '../cards/UniversalContentShareModal';

interface LibraryReaderModalProps {
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
  surahSearchFilter,
  setSurahSearchFilter,
  filteredSurahList,
  belovedSurahShortcuts,
  currentSurah,
  isLoadingSurah,
  surahFetchError,
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
          maxWidth: 900,
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
          <div>
            {/* Quick Surah Shortcuts */}
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
              {belovedSurahShortcuts.map((s) => (
                <button
                  key={s.num}
                  onClick={() => onSelectSurah(s.num)}
                  style={{
                    padding: '4px 8px',
                    borderRadius: 6,
                    border: 'none',
                    fontSize: 11,
                    fontWeight: 700,
                    cursor: 'pointer',
                    backgroundColor:
                      selectedSurahNumber === s.num
                        ? '#065F46'
                        : readerTheme === 'DARK'
                        ? '#0F172A'
                        : '#E2E8F0',
                    color: selectedSurahNumber === s.num ? '#FFFFFF' : '#334155',
                  }}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* Surah Dropdown Picker */}
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 14 }}>
              <select
                value={selectedSurahNumber}
                onChange={(e) => onSelectSurah(Number(e.target.value))}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  borderRadius: 8,
                  border: `1px solid ${readerTheme === 'DARK' ? '#475569' : '#CBD5E1'}`,
                  backgroundColor: readerTheme === 'DARK' ? '#0F172A' : '#FFFFFF',
                  color: readerTheme === 'DARK' ? '#F8FAFC' : '#0F172A',
                  fontSize: 13,
                  fontWeight: 700,
                }}
              >
                {ALL_114_SURAHS.map((s) => (
                  <option key={s.number} value={s.number}>
                    {s.number}. {s.nameArabic} ({s.nameTransliterated} · {s.ayahsCount} Ayahs)
                  </option>
                ))}
              </select>
            </div>

            {isLoadingSurah && (
              <div style={{ textAlign: 'center', padding: 40, color: '#059669', fontSize: 13 }}>
                Downloading Surah text from CDN...
              </div>
            )}

            {!isLoadingSurah && currentSurah && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                  maxHeight: 440,
                  overflowY: 'auto',
                  paddingRight: 6,
                }}
              >
                {currentSurah.verses.map((v) => (
                  <div
                    key={v.ayahNumber}
                    style={{
                      padding: 16,
                      borderRadius: 12,
                      backgroundColor: readerTheme === 'DARK' ? '#0F172A' : '#F9FAFB',
                      border: `1px solid ${
                        readerTheme === 'DARK' ? '#334155' : '#E5E7EB'
                      }`,
                    }}
                  >
                    <div
                      dir="rtl"
                      style={{
                        fontFamily: 'var(--font-arabic), "Amiri", serif',
                        fontSize: fontSize + 6,
                        lineHeight: 2.2,
                        textAlign: 'right',
                        color: readerTheme === 'DARK' ? '#F8FAFC' : '#111827',
                        marginBottom: 10,
                      }}
                    >
                      {v.textArabic}{' '}
                      <span
                        style={{
                          fontSize: fontSize - 2,
                          color: '#059669',
                          marginRight: 6,
                        }}
                      >
                        ﴿{v.ayahNumber}﴾
                      </span>
                    </div>

                    {v.textUrdu && (
                      <div
                        dir="rtl"
                        style={{
                          fontFamily: 'var(--font-urdu), serif',
                          fontSize: fontSize,
                          lineHeight: 2.1,
                          textAlign: 'right',
                          color: readerTheme === 'DARK' ? '#CBD5E1' : '#1E293B',
                          marginBottom: 8,
                          borderTop: `1px dashed ${
                            readerTheme === 'DARK' ? '#334155' : '#E2E8F0'
                          }`,
                          paddingTop: 8,
                        }}
                      >
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 700,
                            color: '#059669',
                            marginLeft: 8,
                            display: 'inline-block',
                          }}
                        >
                          [کنز الایمان]:
                        </span>{' '}
                        {v.textUrdu}
                      </div>
                    )}

                    {v.textEnglish && (
                      <div
                        style={{
                          fontSize: fontSize - 4,
                          lineHeight: 1.6,
                          color: readerTheme === 'DARK' ? '#94A3B8' : '#475569',
                        }}
                      >
                        {v.textEnglish}
                      </div>
                    )}

                    {/* Ayah Action Bar */}
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 12,
                        paddingTop: 10,
                        borderTop: `1px solid ${
                          readerTheme === 'DARK' ? '#1E293B' : '#E2E8F0'
                        }`,
                      }}
                    >
                      <span style={{ fontSize: 11, color: '#64748B', fontWeight: 600 }}>
                        {currentSurah.nameTransliterated} · {v.ayahNumber}
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <button
                          type="button"
                          onClick={() => {
                            onSharePayload({
                              category: 'QURAN',
                              titleUrdu: currentSurah.nameUrdu,
                              badgeContext: `آیت مبارکہ ${v.ayahNumber}`,
                              arabicText: v.textArabic,
                              primaryTextUrdu: v.textUrdu,
                              secondaryTextEnglish: v.textEnglish,
                              sourceCitation: `${currentSurah.nameUrdu} (${currentSurah.surahNumber}:${v.ayahNumber}) · کنز الایمان`,
                            });
                          }}
                          style={{
                            padding: '6px 12px',
                            borderRadius: 8,
                            backgroundColor: '#F0FDF4',
                            color: '#166534',
                            border: '1px solid #86EFAC',
                            fontSize: 12,
                            fontWeight: 700,
                            cursor: 'pointer',
                          }}
                        >
                          📸 کارڈ
                        </button>
                        <button
                          onClick={() =>
                            onOpenWisdomModal(currentSurah.surahNumber, v.ayahNumber)
                          }
                          style={{
                            padding: '6px 14px',
                            borderRadius: 8,
                            backgroundColor: '#ECFDF5',
                            color: '#047857',
                            border: '1px solid #A7F3D0',
                            fontSize: 12,
                            fontWeight: 700,
                            cursor: 'pointer',
                          }}
                        >
                          📖 حکمت کارڈ
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Classical Chapters Reader */
          <div>
            {bookChaptersData && currentChapter ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {/* Chapters Switcher */}
                <div
                  style={{
                    display: 'flex',
                    gap: 8,
                    overflowX: 'auto',
                    paddingBottom: 8,
                    borderBottom: `1px solid ${
                      readerTheme === 'DARK' ? '#334155' : '#E5E7EB'
                    }`,
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
                        currentChapter.urduTranslation.split('\n')[0] ||
                        currentChapter.urduTranslation;
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
                      backgroundColor: '#065F46',
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
                    border: `1px solid ${
                      readerTheme === 'DARK' ? '#334155' : '#E5E7EB'
                    }`,
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
                    border: `1px solid ${
                      readerTheme === 'DARK' ? '#334155' : '#E5E7EB'
                    }`,
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
            ) : (
              <div
                style={{
                  padding: '36px 20px',
                  textAlign: 'center',
                  backgroundColor: readerTheme === 'DARK' ? '#0F172A' : '#F8FAFC',
                  borderRadius: 12,
                  border: `1px solid ${
                    readerTheme === 'DARK' ? '#334155' : '#E2E8F0'
                  }`,
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
            )}
          </div>
        )}
      </div>
    </div>
  );
}
