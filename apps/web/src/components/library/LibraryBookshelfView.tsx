import React, { useState } from 'react';
import { CanonicalEditionRecord } from '@amal/evidence';
import { AmalTheme } from '@amal/ui';
import { LibraryBookCard } from './LibraryBookCard';
import { useLanguage } from '../../context/LanguageContext';

interface LibraryBookshelfViewProps {
  works: CanonicalEditionRecord[];
  selectedWork: CanonicalEditionRecord | null;
  onSelectWork: (work: CanonicalEditionRecord) => void;
  onOpenReader: (work: CanonicalEditionRecord) => void;
  onFilterDiscipline: (discKey: string) => void;
}

interface ShelfCategory {
  id: string;
  disciplineKey: string;
  icon: string;
  titleArabic: string;
  titleEnglish: string;
  description: string;
  matchDisciplines: string[];
}

const SHELVES: ShelfCategory[] = [
  {
    id: 'hadith',
    disciplineKey: 'HADITH',
    icon: '📜',
    titleArabic: 'علوم الحديث الشريف والصحاح والمسانيد وشروحها',
    titleEnglish: 'Hadith & Canonical Shurooh (The 6 Books, Muwatta & Musnad)',
    description: 'The Sahihayn of Bukhari & Muslim, the Four Sunan, Muwatta Malik, Musnad Ahmad, and classical Hanafi commentaries.',
    matchDisciplines: ['HADITH'],
  },
  {
    id: 'fiqh',
    disciplineKey: 'HANAFI',
    icon: '⚖️',
    titleArabic: 'الفقه الإسلامي المقارن والمذاهب الأربعة',
    titleEnglish: 'The Four Sunnah Madhhabs of Islamic Jurisprudence',
    description: 'Foundational mutun and fatwa encyclopedias of Hanafi, Maliki, Shafi\'i, and Hanbali fiqh.',
    matchDisciplines: ['HANAFI_FIQH', 'MALIKI_FIQH', 'SHAFII_FIQH', 'HANBALI_FIQH'],
  },
  {
    id: 'tafsir',
    disciplineKey: 'TAFSIR',
    icon: '📖',
    titleArabic: 'التفسير وعلوم التنزيل القرآني',
    titleEnglish: 'Tafsir & Exegesis of the Holy Quran',
    description: 'Classical masterworks of Quranic tafsir from Tabari, Ibn Kathir, Qurtubi, to Kanz-ul-Iman and Khaza\'in-ul-Irfan.',
    matchDisciplines: ['TAFSIR', 'QURAN'],
  },
  {
    id: 'sirah',
    disciplineKey: 'SIRAH',
    icon: '✨',
    titleArabic: 'السيرة النبوية العطرة والشمائل المحمدية',
    titleEnglish: 'Prophetic Biography (Sirah) & The Shama\'il',
    description: 'Exhaustive accounts of the Life and Blessed Attributes of the Messenger of Allah ﷺ from Ibn Hisham, Qadi Iyad, and Tirmidhi.',
    matchDisciplines: ['SIRAH', 'SHAMAIL'],
  },
  {
    id: 'tazkiyah',
    disciplineKey: 'TAZKIYAH',
    icon: '🕊️',
    titleArabic: 'التزكية والتصوف والأدب الروحي وعلاج القلوب',
    titleEnglish: 'Tazkiyah, Purification of the Heart & Spiritual Heritage',
    description: 'Spiritual masterworks from Imam al-Ghazali (Ihya, Minhaj), Ghaus al-Azam Shaykh Abdul Qadir Jilani, and Qushayri.',
    matchDisciplines: ['TAZKIYAH', 'SPIRITUAL_HERITAGE'],
  },
  {
    id: 'methodology',
    disciplineKey: 'USUL',
    icon: '🏛️',
    titleArabic: 'أصول الفقه ومصطلح الحديث والقواعد الفقهية',
    titleEnglish: 'Usul al-Fiqh, Legal Maxims & Mustalah al-Hadith',
    description: 'Methodological masterworks from Imam al-Shafi\'i, Imam al-Ghazali, Ibn al-Salah, Ibn Hajar, and Al-Sakhawi.',
    matchDisciplines: ['USUL_AL_FIQH', 'MUSTALAH_AL_HADITH'],
  },
  {
    id: 'aqeedah_devotion',
    disciplineKey: 'AQEEDAH',
    icon: '💎',
    titleArabic: 'العقيدة السنية والأدعية النبوية والأوراد المأثورة',
    titleEnglish: 'Sunni Creed (Aqeedah), Daily Liturgies & Awrad',
    description: 'Tahawiyyah, Fiqh al-Akbar, the 40 Rabbana Duas, Hisn al-Muslim, Dala\'il al-Khayrat, and Qasidah al-Burdah.',
    matchDisciplines: ['AQEEDAH', 'DUA'],
  },
  {
    id: 'history',
    disciplineKey: 'HISTORY',
    icon: '🏺',
    titleArabic: 'التاريخ الإسلامي والتراجم وطبقات العلماء',
    titleEnglish: 'Islamic History, Annals & Biographical Tabaqat',
    description: 'Chronicles and scholarly biographies from Ibn Kathir (Al-Bidayah wan-Nihayah) and Imam al-Dhahabi (Siyar A\'lam al-Nubala).',
    matchDisciplines: ['ISLAMIC_HISTORY'],
  },
  {
    id: 'sisters',
    disciplineKey: 'SISTERS',
    icon: '🌸',
    titleArabic: 'گوشۂ خواتین، فقہِ نسواں، امہات المؤمنین و صحابیات',
    titleEnglish: 'Women\'s Classical Canon: Fiqh, Purity, Mothers of the Believers & Sahabiyyat',
    description: 'Foundational texts on female jurisprudence (Jannati Zewar, Bahar-e-Shariat Ahkam-un-Nisa, Fatawa Razawiyyah) and authoritative biographies of the Sahabiyyat.',
    matchDisciplines: [],
  },
];

export const LibraryBookshelfView: React.FC<LibraryBookshelfViewProps> = ({
  works,
  selectedWork,
  onSelectWork,
  onOpenReader,
  onFilterDiscipline,
}) => {
  const { t } = useLanguage();
  // Track which shelves have been expanded to show all items
  const [expandedShelves, setExpandedShelves] = useState<Record<string, boolean>>({});

  const toggleShelfExpand = (shelfId: string) => {
    setExpandedShelves((prev) => ({
      ...prev,
      [shelfId]: !prev[shelfId],
    }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
      {SHELVES.map((shelf) => {
        const shelfWorks = works.filter((w) => {
          if (shelf.id === 'sisters') {
            return w.work_id.startsWith('CANON-NIS-') || w.work_id.includes('SAHABIYYAT');
          }
          if (shelf.id === 'aqeedah_devotion') {
            return shelf.matchDisciplines.includes(w.discipline) || w.work_id.includes('DUA') || w.work_id.includes('DEV');
          }
          return shelf.matchDisciplines.includes(w.discipline);
        });

        if (shelfWorks.length === 0) return null;

        const isExpanded = !!expandedShelves[shelf.id];
        // Show 3 by default on initial view, show all if expanded
        const displayedWorks = isExpanded ? shelfWorks : shelfWorks.slice(0, 3);
        const hasMore = shelfWorks.length > 3;

        return (
          <section
            key={shelf.id}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 18,
              border: '1px solid #E2E8F0',
              padding: '24px 28px',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.03)',
            }}
          >
            {/* Shelf Header Banner */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: 16,
                paddingBottom: 18,
                borderBottom: '2px solid #F1F5F9',
                marginBottom: 20,
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                  <span style={{ fontSize: 24 }}>{shelf.icon}</span>
                  <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0F172A', margin: 0 }}>
                    {shelf.titleEnglish}
                  </h2>
                  <span
                    style={{
                      fontSize: 11.5,
                      fontWeight: 700,
                      backgroundColor: '#E8F5E9',
                      color: AmalTheme.colors.primary,
                      padding: '3px 10px',
                      borderRadius: 12,
                    }}
                  >
                    {shelfWorks.length} Volumes
                  </span>
                </div>

                <div
                  style={{
                    fontFamily: 'var(--font-arabic), serif',
                    fontSize: 17,
                    fontWeight: 700,
                    color: AmalTheme.colors.primary,
                    direction: 'rtl',
                    textAlign: 'left',
                    margin: '2px 0 6px',
                  }}
                >
                  {shelf.titleArabic}
                </div>

                <p style={{ fontSize: 13, color: '#64748B', margin: 0, maxWidth: 680 }}>
                  {shelf.description}
                </p>
              </div>

              {/* Shelf Controls */}
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <button
                  onClick={() => onFilterDiscipline(shelf.disciplineKey)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 8,
                    backgroundColor: '#F8FAFC',
                    color: '#334155',
                    border: '1px solid #CBD5E1',
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    transition: 'all 0.15s ease',
                  }}
                >
                  <span>{t('Filter this Science', 'اس فن کو فلٹر کریں', 'تصفية هذا الفن', 'Is Funn Ko Filter Karein')}</span>
                  <span>➔</span>
                </button>
              </div>
            </div>

            {/* Books Shelf Rack Grid (3 columns) */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: 18,
              }}
            >
              {displayedWorks.map((work) => (
                <LibraryBookCard
                  key={work.work_id}
                  work={work}
                  isSelected={selectedWork?.work_id === work.work_id}
                  onSelectWork={onSelectWork}
                  onOpenReader={onOpenReader}
                />
              ))}
            </div>

            {/* Shelf Expander Button (Eliminates Endless Scrolling) */}
            {hasMore && (
              <div style={{ marginTop: 20, textAlign: 'center' }}>
                <button
                  onClick={() => toggleShelfExpand(shelf.id)}
                  style={{
                    padding: '10px 24px',
                    borderRadius: 10,
                    backgroundColor: isExpanded ? '#F1F5F9' : '#F0FDF4',
                    color: isExpanded ? '#475569' : AmalTheme.colors.primary,
                    border: isExpanded ? '1px solid #CBD5E1' : `1px solid #86EFAC`,
                    fontWeight: 700,
                    fontSize: 13,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    transition: 'all 0.15s ease',
                  }}
                >
                  <span>
                    {isExpanded
                      ? t('▲ Collapse Shelf', '▲ مختصر کریں', '▲ طي الرف', '▲ Mukhtasar Karein')
                      : t(
                          `▼ View all ${shelfWorks.length} Books in this Shelf (+${shelfWorks.length - 3} more)`,
                          `▼ اس فن کی تمام ${shelfWorks.length} کتب ملاحظہ فرمائیں (+${shelfWorks.length - 3} مزید)`,
                          `▼ عرض جميع الكتب (${shelfWorks.length})`,
                          `▼ Tamam ${shelfWorks.length} Kutub Dekhein (+${shelfWorks.length - 3} mazeed)`
                        )}
                  </span>
                </button>
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
};
