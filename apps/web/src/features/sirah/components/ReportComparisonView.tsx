import React from 'react';
import { SirahReportVariantRecord } from '@amal/types';
import { AmalTheme } from '@amal/ui';

interface ReportComparisonViewProps {
  variants: SirahReportVariantRecord[];
}

export const ReportComparisonView: React.FC<ReportComparisonViewProps> = ({ variants }) => {
  if (variants.length === 0) {
    return (
      <div style={{ padding: 16, backgroundColor: '#FAFAFA', borderRadius: 10, color: '#666', fontSize: 13 }}>
        No historical transmission discrepancies recorded for this event. Established consensus preserved.
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <h4 style={{ fontSize: 15, fontWeight: 700, margin: 0, color: AmalTheme.colors.text.primaryLight }}>
        Classical Transmission Discrepancies & Harmonization ({variants.length})
      </h4>
      {variants.map((v) => (
        <div
          key={v.variant_id}
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 12,
            border: `1px solid ${AmalTheme.colors.surface.borderLight}`,
            padding: 16,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#C2185B' }}>
              DIFFERENCE TYPE: {v.difference_type}
            </span>
            <span style={{
              fontSize: 11,
              padding: '2px 8px',
              borderRadius: 6,
              backgroundColor: '#E0F2F1',
              color: '#00695C',
              fontWeight: 600,
            }}>
              {v.resolution_status.replace(/_/g, ' ')}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 12 }}>
            <div style={{ padding: 12, backgroundColor: '#F9FBE7', borderRadius: 8, fontSize: 13 }}>
              <strong>Report A ({v.report_a.source_title}):</strong>
              <p style={{ margin: '6px 0 0', color: '#33691E' }}>{v.report_a.claim}</p>
              <div style={{ fontSize: 11, color: '#777', marginTop: 4 }}>Citation: {v.report_a.citation}</div>
            </div>
            <div style={{ padding: 12, backgroundColor: '#FFF8E1', borderRadius: 8, fontSize: 13 }}>
              <strong>Report B ({v.report_b.source_title}):</strong>
              <p style={{ margin: '6px 0 0', color: '#F57F17' }}>{v.report_b.claim}</p>
              <div style={{ fontSize: 11, color: '#777', marginTop: 4 }}>Citation: {v.report_b.citation}</div>
            </div>
          </div>

          <div style={{ fontSize: 13, color: '#444', backgroundColor: '#F5F5F5', padding: 10, borderRadius: 8 }}>
            <strong>Scholarly Assessment:</strong> {v.scholarly_assessment}
          </div>
        </div>
      ))}
    </div>
  );
};
