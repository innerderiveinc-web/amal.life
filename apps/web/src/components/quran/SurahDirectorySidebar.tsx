import React from 'react';
import { QuranSurahMeta } from '../../lib/quran-114-directory';
import { useLanguage } from '../../context/LanguageContext';

interface SurahDirectorySidebarProps {
  surahSearchFilter: string;
  setSurahSearchFilter: (s: string) => void;
  revelationFilter: 'ALL' | 'MECCAN' | 'MEDINAN';
  setRevelationFilter: (rf: 'ALL' | 'MECCAN' | 'MEDINAN') => void;
  belovedShortcuts: Array<{ num: number; label: string }>;
  filteredSurahs: QuranSurahMeta[];
  selectedSurahNumber: number;
  onSelectSurah: (num: number) => void;
}

export const SurahDirectorySidebar: React.FC<SurahDirectorySidebarProps> = ({
  surahSearchFilter,
  setSurahSearchFilter,
  revelationFilter,
  setRevelationFilter,
  belovedShortcuts,
  filteredSurahs,
  selectedSurahNumber,
  onSelectSurah,
}) => {
  const { t } = useLanguage();

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        border: '1px solid #E2E8F0',
        padding: 16,
        boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
      }}
    >
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#0F172A', marginBottom: 4 }}>
          {t(
            'Surahs Directory (114 Surahs)',
            'سورتوں کی فہرست (114 سورتیں)',
            'فهرس السور (١١٤ سورة)',
            'Surahon ki Fehrist (114 Surahs)'
          )}
        </div>
        <div style={{ fontSize: 11, color: '#64748B' }}>
          {t(
            'Select any Surah to read, recite, and listen',
            'کسی بھی سورت کو منتخب کر کے تلاوت و ترجمہ سماعت فرمائیں',
            'اختر أي سورة للقراءة والتلاوة والاستماع',
            'Kisi bhi Surah ko muntakhab karke tilawat o tarjuma sunein'
          )}
        </div>
      </div>

      {/* Quick Search */}
      <input
        type="text"
        value={surahSearchFilter}
        onChange={(e) => setSurahSearchFilter(e.target.value)}
        placeholder={t(
          'Search by Surah name or number...',
          'سورت کا نام یا نمبر تلاش کریں...',
          'ابحث باسم السورة أو رقمها...',
          'Surah ka naam ya number talash karein...'
        )}
        aria-label="Search Surahs by name or number"
        style={{
          width: '100%',
          padding: '8px 12px',
          borderRadius: 8,
          border: '1px solid #CBD5E1',
          fontSize: 12,
          marginBottom: 10,
          outline: 'none',
          boxSizing: 'border-box',
        }}
      />

      {/* Filter Pills */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 12 }}>
        {(['ALL', 'MECCAN', 'MEDINAN'] as const).map((rf) => (
          <button
            key={rf}
            onClick={() => setRevelationFilter(rf)}
            style={{
              flex: 1,
              padding: '4px 6px',
              borderRadius: 6,
              fontSize: 10,
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              backgroundColor: revelationFilter === rf ? '#1B4332' : '#F1F5F9',
              color: revelationFilter === rf ? '#FFFFFF' : '#475569',
            }}
          >
            {rf === 'ALL'
              ? t('All (114)', 'سب سورتیں (114)', 'الكل (١١٤)', 'Sab Surahs (114)')
              : rf === 'MECCAN'
                ? t('Meccan (86)', 'مکی (86)', 'مكية (٨٦)', 'Makki (86)')
                : t('Medinan (28)', 'مدنی (28)', 'مدنية (٢٨)', 'Madani (28)')}
          </button>
        ))}
      </div>

      {/* Beloved Shortcuts Carousel */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', marginBottom: 6 }}>
          {t(
            'Popular Surahs',
            'بکثرت پڑھی جانے والی سورتیں',
            'السور الأكثر قراءة',
            'Kasrat se padhi jane wali Suratein'
          )}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {belovedShortcuts.map((sc) => (
            <button
              key={sc.num}
              onClick={() => onSelectSurah(sc.num)}
              style={{
                padding: '3px 8px',
                borderRadius: 6,
                fontSize: 11,
                fontWeight: 600,
                cursor: 'pointer',
                border: selectedSurahNumber === sc.num ? '1px solid #059669' : '1px solid #E2E8F0',
                backgroundColor: selectedSurahNumber === sc.num ? '#ECFDF5' : '#F8FAFC',
                color: selectedSurahNumber === sc.num ? '#065F46' : '#334155',
              }}
            >
              {sc.label}
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable Surah List */}
      <div style={{ maxHeight: '60vh', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 4 }}>
        {filteredSurahs.map((meta) => {
          const isSelected = selectedSurahNumber === meta.number;
          return (
            <button
              key={meta.number}
              onClick={() => onSelectSurah(meta.number)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 10px',
                borderRadius: 8,
                border: isSelected ? '1px solid #86EFAC' : '1px solid transparent',
                backgroundColor: isSelected ? '#F0FDF4' : 'transparent',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'background-color 0.1s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: '50%',
                    backgroundColor: isSelected ? '#166534' : '#F1F5F9',
                    color: isSelected ? '#FFFFFF' : '#475569',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 11,
                    fontWeight: 700,
                  }}
                >
                  {meta.number}
                </span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: isSelected ? '#166534' : '#1E293B' }}>
                    {meta.nameTransliterated}
                  </div>
                  <div style={{ fontSize: 10, color: '#64748B' }}>
                    {meta.ayahsCount} {t('verses', 'آیات', 'آية', 'aayatein')} ·{' '}
                    {meta.revelationType === 'MECCAN'
                      ? t('Meccan', 'مکی', 'مكية', 'Makki')
                      : t('Medinan', 'مدنی', 'مدنية', 'Madani')}
                  </div>
                </div>
              </div>
              <span style={{ fontFamily: 'var(--font-arabic), "Amiri", serif', fontSize: 15, color: '#0F172A' }}>
                {meta.nameArabic}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
