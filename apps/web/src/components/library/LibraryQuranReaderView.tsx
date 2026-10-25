import React from 'react';
import { ALL_114_SURAHS, QuranSurahMeta } from '../../lib/quran-114-directory';
import { QuranSurahData } from '../../lib/quran-surahs-data';
import { UniversalCardPayload } from '../cards/UniversalContentShareModal';

export interface LibraryQuranReaderViewProps {
  readerTheme: 'CLEAN' | 'SEPIA' | 'DARK';
  fontSize: number;
  selectedSurahNumber: number;
  onSelectSurah: (num: number) => void;
  belovedSurahShortcuts: { num: number; label: string }[];
  currentSurah: QuranSurahData;
  isLoadingSurah: boolean;
  onSharePayload: (payload: UniversalCardPayload) => void;
  onOpenWisdomModal: (surahNum: number, ayahNum: number) => void;
}

export const LibraryQuranReaderView: React.FC<LibraryQuranReaderViewProps> = ({
  readerTheme,
  fontSize,
  selectedSurahNumber,
  onSelectSurah,
  belovedSurahShortcuts,
  currentSurah,
  isLoadingSurah,
  onSharePayload,
  onOpenWisdomModal,
}) => {
  return (
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
                border: `1px solid ${readerTheme === 'DARK' ? '#334155' : '#E5E7EB'}`,
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
                    onClick={() => onOpenWisdomModal(currentSurah.surahNumber, v.ayahNumber)}
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
  );
};
