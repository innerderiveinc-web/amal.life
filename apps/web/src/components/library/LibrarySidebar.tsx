import React from 'react';
import { CanonicalEditionRecord } from '@amal/evidence';
import { AmalTheme } from '@amal/ui';
import { getBookChapters } from '../../lib/classical-chapters-data';

interface FilterCategory {
  key: string;
  label: string;
}

interface LibrarySidebarProps {
  search: string;
  setSearch: (s: string) => void;
  selectedDiscipline: string;
  setSelectedDiscipline: (d: string) => void;
  filterCategories: FilterCategory[];
  filteredWorks: CanonicalEditionRecord[];
  selectedWork: CanonicalEditionRecord | null;
  onSelectWork: (work: CanonicalEditionRecord) => void;
}

export function LibrarySidebar({
  search,
  setSearch,
  selectedDiscipline,
  setSelectedDiscipline,
  filterCategories,
  filteredWorks,
  selectedWork,
  onSelectWork,
}: LibrarySidebarProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Search & Filter Controls */}
      <section
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 16,
          padding: 20,
          border: `1px solid ${AmalTheme.colors.surface.borderLight}`,
        }}
      >
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by book title (Arabic or English), author, publisher, or muhaqqiq..."
          style={{
            width: '100%',
            padding: '12px 16px',
            fontSize: 14,
            borderRadius: 8,
            border: `1px solid ${AmalTheme.colors.surface.borderLight}`,
            outline: 'none',
            boxSizing: 'border-box',
            marginBottom: 14,
          }}
        />

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {filterCategories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedDiscipline(cat.key)}
              style={{
                padding: '6px 14px',
                borderRadius: 20,
                border: '1px solid #CCC',
                fontSize: 12,
                fontWeight: 600,
                backgroundColor:
                  selectedDiscipline === cat.key ? AmalTheme.colors.primary : '#FFFFFF',
                color: selectedDiscipline === cat.key ? '#FFFFFF' : '#333333',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Book List Panel */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 16,
          padding: 20,
          border: `1px solid ${AmalTheme.colors.surface.borderLight}`,
          maxHeight: 740,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 6,
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 700, color: '#444' }}>
            Showing {filteredWorks.length} Classical Masterworks
          </span>
        </div>

        {filteredWorks.map((work) => {
          const isSelected = selectedWork?.work_id === work.work_id;
          const isWorkQuran =
            work.discipline === 'QURAN' || work.work_id === 'CANON-QUR-001';
          const hasInApp = isWorkQuran || !!getBookChapters(work.work_id);

          return (
            <div
              key={work.work_id}
              onClick={() => onSelectWork(work)}
              style={{
                padding: 14,
                borderRadius: 12,
                backgroundColor: isSelected ? '#F0FDF4' : '#FAFAFA',
                border: isSelected
                  ? `2px solid ${AmalTheme.colors.primary}`
                  : '1px solid #EEEEEE',
                cursor: 'pointer',
                transition: 'all 0.1s ease',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}
              >
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: 10,
                      backgroundColor: '#E2E8F0',
                      color: '#334155',
                    }}
                  >
                    {work.discipline.replace('_', ' ')}
                  </span>
                  <span
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      padding: '2px 6px',
                      borderRadius: 8,
                      backgroundColor: isWorkQuran
                        ? '#DCFCE7'
                        : hasInApp
                        ? '#FEF3C7'
                        : '#E0F2FE',
                      color: isWorkQuran
                        ? '#15803D'
                        : hasInApp
                        ? '#B45309'
                        : '#0369A1',
                    }}
                  >
                    {isWorkQuran
                      ? '114 SURAHS IN-APP'
                      : hasInApp
                      ? 'CORE CURATED CHAPTERS'
                      : 'VERIFIED REPOSITORY'}
                  </span>
                </div>
                <span style={{ fontSize: 11, color: '#888' }}>
                  {work.author_death_hijri > 0
                    ? `${work.author_death_hijri} AH`
                    : 'Revelation'}
                </span>
              </div>

              <div
                style={{
                  fontFamily: 'var(--font-arabic), serif',
                  fontSize: 16,
                  fontWeight: 700,
                  margin: '6px 0 2px',
                  direction: 'rtl',
                  textAlign: 'right',
                  color: '#0F172A',
                }}
              >
                {work.title_arabic}
              </div>

              <div style={{ fontSize: 13, fontWeight: 600, color: '#1E293B' }}>
                {work.title_transliterated}
              </div>

              <div style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>
                {work.author_name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
