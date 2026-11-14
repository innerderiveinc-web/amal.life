import React, { useState, useEffect } from 'react';
import { CanonicalEditionRecord } from '@amal/evidence';
import { AmalTheme } from '@amal/ui';
import { LibraryBookCard } from './LibraryBookCard';
import { useLanguage } from '../../context/LanguageContext';

interface LibraryGridViewProps {
  works: CanonicalEditionRecord[];
  selectedWork: CanonicalEditionRecord | null;
  onSelectWork: (work: CanonicalEditionRecord) => void;
  onOpenReader: (work: CanonicalEditionRecord) => void;
  pageSize?: number;
}

export const LibraryGridView: React.FC<LibraryGridViewProps> = ({
  works,
  selectedWork,
  onSelectWork,
  onOpenReader,
  pageSize = 12,
}) => {
  const { t } = useLanguage();
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Reset page when works list changes (e.g. on search or discipline change)
  useEffect(() => {
    setCurrentPage(1);
  }, [works.length]);

  const totalPages = Math.ceil(works.length / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const currentWorks = works.slice(startIndex, startIndex + pageSize);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((p) => p - 1);
      window.scrollTo({ top: 350, behavior: 'smooth' });
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((p) => p + 1);
      window.scrollTo({ top: 350, behavior: 'smooth' });
    }
  };

  const handlePageSelect = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 350, behavior: 'smooth' });
  };

  // Generate page numbers window (e.g. 1 2 3 ... 11)
  const renderPaginationButtons = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }

    return pages.map((p, idx) => {
      if (typeof p === 'string') {
        return (
          <span key={`dots-${idx}`} style={{ padding: '6px 8px', color: '#94A3B8', fontSize: 13 }}>
            {p}
          </span>
        );
      }
      const isActive = p === currentPage;
      return (
        <button
          key={p}
          onClick={() => handlePageSelect(p)}
          style={{
            minWidth: 36,
            height: 36,
            borderRadius: 8,
            border: isActive ? `1px solid ${AmalTheme.colors.primary}` : '1px solid #E2E8F0',
            backgroundColor: isActive ? AmalTheme.colors.primary : '#FFFFFF',
            color: isActive ? '#FFFFFF' : '#334155',
            fontWeight: isActive ? 800 : 600,
            fontSize: 13,
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          {p}
        </button>
      );
    });
  };

  if (works.length === 0) {
    return (
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 16,
          padding: '48px 24px',
          textAlign: 'center',
          border: '1px solid #E2E8F0',
        }}
      >
        <div style={{ fontSize: 36, marginBottom: 12 }}>🔍</div>
        <div style={{ fontSize: 16, fontWeight: 700, color: '#0F172A', marginBottom: 4 }}>
          No Masterworks Found
        </div>
        <div style={{ fontSize: 13, color: '#64748B' }}>
          Try clearing search filters or selecting another discipline.
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Top Status & Pagination Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12,
          padding: '12px 18px',
          backgroundColor: '#F8FAFC',
          borderRadius: 12,
          border: '1px solid #E2E8F0',
        }}
      >
        <div style={{ fontSize: 13, fontWeight: 700, color: '#334155' }}>
          {t(
            `Showing ${startIndex + 1}–${Math.min(startIndex + pageSize, works.length)} of ${works.length} Masterworks`,
            `کل ${works.length} کتب میں سے ${startIndex + 1}–${Math.min(startIndex + pageSize, works.length)} ظاہر ہیں`,
            `عرض ${startIndex + 1}–${Math.min(startIndex + pageSize, works.length)} من أصل ${works.length} مصنفاً`,
            `${works.length} kutub mein se ${startIndex + 1}–${Math.min(startIndex + pageSize, works.length)} zahir hain`
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 12, color: '#64748B', fontWeight: 600 }}>
            {t(`Page ${currentPage} of ${totalPages}`, `صفحہ ${currentPage} از ${totalPages}`, `صفحة ${currentPage} من ${totalPages}`, `Safha ${currentPage} az ${totalPages}`)}
          </span>
        </div>
      </div>

      {/* Responsive Book Cards Grid (3 Columns on Desktop, 2 on Tablet, 1 on Mobile) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: 18,
        }}
      >
        {currentWorks.map((work) => (
          <LibraryBookCard
            key={work.work_id}
            work={work}
            isSelected={selectedWork?.work_id === work.work_id}
            onSelectWork={onSelectWork}
            onOpenReader={onOpenReader}
          />
        ))}
      </div>

      {/* Bottom Pagination Controls Bar */}
      {totalPages > 1 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 8,
            padding: '24px 0 12px',
            flexWrap: 'wrap',
          }}
        >
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              border: '1px solid #CBD5E1',
              backgroundColor: currentPage === 1 ? '#F1F5F9' : '#FFFFFF',
              color: currentPage === 1 ? '#94A3B8' : '#1E293B',
              fontSize: 13,
              fontWeight: 700,
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <span>◀</span>
            <span>{t('Previous', 'سابقہ', 'السابق', 'Peechhey')}</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {renderPaginationButtons()}
          </div>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              border: '1px solid #CBD5E1',
              backgroundColor: currentPage === totalPages ? '#F1F5F9' : '#FFFFFF',
              color: currentPage === totalPages ? '#94A3B8' : '#1E293B',
              fontSize: 13,
              fontWeight: 700,
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <span>{t('Next', 'اگلا', 'التالي', 'Aagey')}</span>
            <span>▶</span>
          </button>
        </div>
      )}
    </div>
  );
};
