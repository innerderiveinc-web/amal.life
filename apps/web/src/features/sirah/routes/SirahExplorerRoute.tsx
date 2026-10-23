import React, { useState } from 'react';
import {
  PropheticLifePeriod,
  SirahEventRecord,
  ShamailReportRecord,
  SirahReportVariantRecord,
} from '@amal/types';
import { AmalTheme } from '@amal/ui';
import { PropheticTimeline } from '../components/PropheticTimeline';
import { ShamailCard } from '../components/ShamailCard';
import { ReportComparisonView } from '../components/ReportComparisonView';
import { UniversalContentShareModal, UniversalCardPayload } from '../../../components/cards/UniversalContentShareModal';

interface SirahExplorerRouteProps {
  events: SirahEventRecord[];
  shamailReports: ShamailReportRecord[];
  variants: SirahReportVariantRecord[];
}

export const SirahExplorerRoute: React.FC<SirahExplorerRouteProps> = ({
  events,
  shamailReports,
  variants,
}) => {
  const [activeTab, setActiveTab] = useState<'TIMELINE' | 'SHAMAIL' | 'VARIANTS'>('TIMELINE');
  const [selectedPeriod, setSelectedPeriod] = useState<PropheticLifePeriod | undefined>(undefined);
  const [sharePayload, setSharePayload] = useState<UniversalCardPayload | null>(null);

  const periods: PropheticLifePeriod[] = [
    'PRE_PROPHETIC_EARLY_LIFE',
    'MAKKAH_EARLY_DAWAH',
    'MAKKAH_PERSECUTION_BOYCOTT',
    'MAKKAH_YEAR_OF_SORROW_ISRA',
    'THE_HIJRAH_MIGRATION',
    'MADINAH_EARLY_COMMUNITY',
    'MADINAH_EXPEDITIONS_DEFENSE',
    'MADINAH_TREATY_EXPANSION',
    'CONQUEST_AND_DELEGATIONS',
    'FAREWELL_PILGRIMAGE_AND_PASSING',
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header Banner */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 24,
        border: `1px solid ${AmalTheme.colors.surface.borderLight}`,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: 12, fontWeight: 700, color: AmalTheme.colors.primary, letterSpacing: 1 }}>
              AMAL KNOWLEDGE ATLAS
            </span>
            <h1 style={{ fontSize: 26, fontWeight: 800, margin: '6px 0 2px', color: AmalTheme.colors.text.primaryLight }}>
              Prophetic Life Graph & Shama'il
            </h1>
            <p style={{ margin: 0, fontSize: 14, color: '#666' }}>
              Chronologically ordered, evidence-linked, and scholar-governed exploration of the Sirah and Prophetic traits.
            </p>
          </div>
          <span style={{
            fontSize: 12,
            padding: '4px 12px',
            borderRadius: 16,
            backgroundColor: '#E8F5E9',
            color: '#2E7D32',
            fontWeight: 700,
          }}>
            ✓ AUTHENTIC SIRAH CORPUS
          </span>
        </div>

        {/* Tab Buttons */}
        <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
          <button
            onClick={() => setActiveTab('TIMELINE')}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              border: 'none',
              backgroundColor: activeTab === 'TIMELINE' ? AmalTheme.colors.primary : '#F0F0F0',
              color: activeTab === 'TIMELINE' ? '#FFFFFF' : '#333',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Chronological Timeline
          </button>
          <button
            onClick={() => setActiveTab('SHAMAIL')}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              border: 'none',
              backgroundColor: activeTab === 'SHAMAIL' ? AmalTheme.colors.primary : '#F0F0F0',
              color: activeTab === 'SHAMAIL' ? '#FFFFFF' : '#333',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Shama'il al-Muhammadiyyah
          </button>
          <button
            onClick={() => setActiveTab('VARIANTS')}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              border: 'none',
              backgroundColor: activeTab === 'VARIANTS' ? AmalTheme.colors.primary : '#F0F0F0',
              color: activeTab === 'VARIANTS' ? '#FFFFFF' : '#333',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Transmission Variants
          </button>
        </div>
      </div>

      {/* Tab Contents */}
      {activeTab === 'TIMELINE' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Period selector chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            <button
              onClick={() => setSelectedPeriod(undefined)}
              style={{
                padding: '6px 12px',
                borderRadius: 20,
                border: '1px solid #CCC',
                backgroundColor: selectedPeriod === undefined ? '#263238' : '#FFF',
                color: selectedPeriod === undefined ? '#FFF' : '#333',
                fontSize: 12,
                cursor: 'pointer',
              }}
            >
              All Periods
            </button>
            {periods.map((p) => (
              <button
                key={p}
                onClick={() => setSelectedPeriod(p)}
                style={{
                  padding: '6px 12px',
                  borderRadius: 20,
                  border: '1px solid #CCC',
                  backgroundColor: selectedPeriod === p ? '#263238' : '#FFF',
                  color: selectedPeriod === p ? '#FFF' : '#333',
                  fontSize: 12,
                  cursor: 'pointer',
                }}
              >
                {p.replace(/_/g, ' ')}
              </button>
            ))}
          </div>

          <PropheticTimeline events={events} activePeriod={selectedPeriod} />
        </div>
      )}

      {activeTab === 'SHAMAIL' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
          {shamailReports.map((report) => (
            <ShamailCard
              key={report.report_id}
              report={report}
              onShareCard={(rep) => {
                setSharePayload({
                  category: 'SHAMAIL',
                  titleUrdu: 'شمائلِ مصطفیٰ ﷺ',
                  badgeContext: `باب: ${rep.category.replace(/_/g, ' ')}`,
                  arabicText: rep.arabic_matn,
                  primaryTextUrdu: rep.urdu_translation || rep.english_translation,
                  secondaryTextEnglish: rep.urdu_translation ? rep.english_translation : undefined,
                  sourceCitation: `${rep.source_hadith_ref || rep.primary_source_work} (راوی: ${rep.primary_narrator})`,
                  tafseerInsightUrdu: `✨ سیرت و اداب: ${rep.practical_adab_lesson}`,
                });
              }}
            />
          ))}
        </div>
      )}

      {activeTab === 'VARIANTS' && (
        <ReportComparisonView variants={variants} />
      )}

      {/* Sacred Universal Share Modal */}
      {sharePayload && (
        <UniversalContentShareModal
          isOpen={!!sharePayload}
          onClose={() => setSharePayload(null)}
          payload={sharePayload}
        />
      )}
    </div>
  );
};
