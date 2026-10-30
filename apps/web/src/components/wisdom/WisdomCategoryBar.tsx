import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export type WisdomCategory = 'QURAN' | 'HADITH' | 'SHAMAIL' | 'TASAWWUF' | 'FIQH' | 'DUA';

interface WisdomCategoryBarProps {
  selectedCategory: WisdomCategory;
  onSelectCategory: (cat: WisdomCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedThemeFilter: string;
  onSelectThemeFilter: (theme: string) => void;
  bookmarkedCount: number;
  isUrdu?: boolean;
}

export const WisdomCategoryBar: React.FC<WisdomCategoryBarProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  selectedThemeFilter,
  onSelectThemeFilter,
  bookmarkedCount,
}) => {
  const { t } = useLanguage();

  const categories = [
    {
      id: 'QURAN' as WisdomCategory,
      label: t('📖 Quran Wisdom (42)', '📖 قرآنی حکمت (42)', '📖 حكمة القرآن (٤٢)', '📖 Qurani Hikmat (42)'),
    },
    {
      id: 'HADITH' as WisdomCategory,
      label: t('📜 Hadith Cards (14)', '📜 احادیثِ مبارکہ (14)', '📜 أحاديث نبوية (١٤)', '📜 Hadees Cards (14)'),
    },
    {
      id: 'SHAMAIL' as WisdomCategory,
      label: t("🌹 Prophetic Shama'il (12)", '🌹 شمائلِ مصطفیٰ ﷺ (12)', '🌹 الشمائل المحمدية (١٢)', "🌹 Prophetic Shama'il (12)"),
    },
    {
      id: 'TASAWWUF' as WisdomCategory,
      label: t('💎 Spiritual Wisdom (12)', '💎 تزکیہ و تصوف (12)', '💎 التزكية والتصوف (١٢)', '💎 Tazkiyah o Tasawwuf (12)'),
    },
    {
      id: 'FIQH' as WisdomCategory,
      label: t('⚖️ Daily Fiqh Guidance (10)', '⚖️ احکامِ فقہ (10)', '⚖️ فقه يومي (١٠)', '⚖️ Ahkam-e-Fiqh (10)'),
    },
    {
      id: 'DUA' as WisdomCategory,
      label: t('🤲 Prophetic Duas (15)', '🤲 ادعیہ و اذکار (15)', '🤲 أدعية نبوية (١٥)', '🤲 Masnoon Duas (15)'),
    },
  ];

  const themeFilters = [
    { id: 'ALL', label: t('All (42)', 'تمام آیات (All 42)', 'جميع الآيات (٤٢)', 'Tamam Aayatein (42)') },
    { id: 'BOOKMARKED', label: t('⭐ Saved', '⭐ محفوظ', '⭐ المحفوظة', '⭐ Mehfooz') },
    { id: 'IKHLAS', label: t('✨ Sincerity & Intention', '✨ اخلاص و نیت', '✨ الإخلاص والنية', '✨ Ikhlas o Niyyat') },
    { id: 'TAWAKKUL', label: t('🛡️ Reliance & Patience', '🛡️ توکل و صبر', '🛡️ التوكل والصبر', '🛡️ Tawakkul o Sabr') },
    { id: 'SALAH', label: t('🤲 Prayer & Devotion', '🤲 نماز و مناجات', '🤲 الصلاة والمناجاة', '🤲 Namaz o Munajaat') },
    { id: 'AKHLAQ', label: t('🌱 Character & Dealings', '🌱 اخلاق و حسنِ معاملہ', '🌱 الأخلاق وحسن المعاملة', '🌱 Akhlaq o Husn-e-Muamala') },
    { id: 'HUQUQ_UL_IBAD', label: t("🤝 Human Rights", '🤝 حقوق العباد', '🤝 حقوق العباد', '🤝 Huqooq-ul-Ibaad') },
    { id: 'TIME_MANAGEMENT', label: t('⏳ Value of Time', '⏳ وقت کی قدر', '⏳ قيمة الوقت', '⏳ Waqt ki Qadar') },
  ];

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
        {categories.map((cat) => {
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
              <span>{cat.label}</span>
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
            placeholder={t(
              'Search by Arabic text, title, or topic...',
              'تلاش فرمائیں (عربی، اردو یا عنوان)...',
              'ابحث بالنص العربي أو العنوان أو الموضوع...',
              'Talash karein (Arabic, Urdu ya unwan)...'
            )}
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
            {themeFilters.map((theme) => {
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
