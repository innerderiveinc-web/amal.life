import React from 'react';

export type WisdomCategory = 'QURAN' | 'HADITH' | 'SHAMAIL' | 'TASAWWUF' | 'FIQH' | 'DUA';

interface WisdomCategoryBarProps {
  selectedCategory: WisdomCategory;
  onSelectCategory: (cat: WisdomCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedThemeFilter: string;
  onSelectThemeFilter: (theme: string) => void;
  bookmarkedCount: number;
  isUrdu: boolean;
}

const CATEGORIES: { id: WisdomCategory; labelEn: string; labelUr: string }[] = [
  { id: 'QURAN', labelEn: '📖 Quran Wisdom (42)', labelUr: '📖 قرآنی حکمت (42)' },
  { id: 'HADITH', labelEn: '📜 Hadith Cards (14)', labelUr: '📜 احادیثِ مبارکہ (14)' },
  { id: 'SHAMAIL', labelEn: "🌹 Prophetic Shama'il (12)", labelUr: '🌹 شمائلِ مصطفیٰ ﷺ (12)' },
  { id: 'TASAWWUF', labelEn: '💎 Spiritual Wisdom (12)', labelUr: '💎 تزکیہ و تصوف (12)' },
  { id: 'FIQH', labelEn: '⚖️ Daily Fiqh Guidance (10)', labelUr: '⚖️ احکامِ فقہ (10)' },
  { id: 'DUA', labelEn: '🤲 Prophetic Duas (15)', labelUr: '🤲 ادعیہ و اذکار (15)' },
];

const THEME_FILTERS = [
  { id: 'ALL', label: 'تمام آیات (All 42)' },
  { id: 'BOOKMARKED', label: '⭐ محفوظ' },
  { id: 'IKHLAS', label: '✨ اخلاص و نیت' },
  { id: 'TAWAKKUL', label: '🛡️ توکل و صبر' },
  { id: 'SALAH', label: '🤲 نماز و مناجات' },
  { id: 'AKHLAQ', label: '🌱 اخلاق و حسنِ معاملہ' },
  { id: 'HUQUQ_UL_IBAD', label: '🤝 حقوق العباد' },
  { id: 'TIME_MANAGEMENT', label: '⏳ وقت کی قدر' },
];

export const WisdomCategoryBar: React.FC<WisdomCategoryBarProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  selectedThemeFilter,
  onSelectThemeFilter,
  bookmarkedCount,
  isUrdu,
}) => {
  return (
    <div>
      {/* Category Switcher Tabs */}
      <div
        style={{
          display: 'flex',
          gap: 8,
          overflowX: 'auto',
          paddingBottom: 6,
          marginBottom: 20,
        }}
      >
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                onSelectCategory(cat.id);
                onSelectThemeFilter('ALL');
              }}
              style={{
                padding: '9px 16px',
                borderRadius: 12,
                fontSize: 13,
                fontWeight: 800,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                border: '1.5px solid',
                borderColor: isActive ? '#065F46' : '#E2E8F0',
                backgroundColor: isActive ? '#065F46' : '#FFFFFF',
                color: isActive ? '#FFFFFF' : '#334155',
                boxShadow: isActive ? '0 2px 6px rgba(6,78,59,0.2)' : 'none',
                transition: 'all 0.15s ease',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <span>{isUrdu ? cat.labelUr : cat.labelEn}</span>
            </button>
          );
        })}
      </div>

      {/* Search & Thematic Filter Ribbon */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12,
          marginBottom: 20,
        }}
      >
        {/* Search Box */}
        <div style={{ flex: '1 1 280px', maxWidth: 400 }}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="تلاش فرمائیں (عربی، اردو یا عنوان)..."
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: 10,
              border: '1px solid #CBD5E1',
              fontSize: 13,
              outline: 'none',
              backgroundColor: '#FFFFFF',
            }}
          />
        </div>

        {/* Theme Filters (Only for Quran) */}
        {selectedCategory === 'QURAN' && (
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {THEME_FILTERS.map((theme) => {
              const isActive = selectedThemeFilter === theme.id;
              const displayLabel =
                theme.id === 'BOOKMARKED' ? `${theme.label} (${bookmarkedCount})` : theme.label;
              return (
                <button
                  key={theme.id}
                  onClick={() => onSelectThemeFilter(theme.id)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: 20,
                    fontSize: 12,
                    fontWeight: isActive ? 800 : 600,
                    border: '1px solid',
                    borderColor: isActive ? '#059669' : '#CBD5E1',
                    backgroundColor: isActive ? '#ECFDF5' : '#FFFFFF',
                    color: isActive ? '#065F46' : '#475569',
                    cursor: 'pointer',
                  }}
                >
                  {displayLabel}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
