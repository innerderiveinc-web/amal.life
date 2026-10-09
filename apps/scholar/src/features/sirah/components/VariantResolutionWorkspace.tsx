import React from 'react';
import { SirahReportVariantRecord, ReportResolutionStatus } from '@amal/types';
import { AmalTheme } from '@amal/ui';

interface VariantResolutionWorkspaceProps {
  variant: SirahReportVariantRecord;
  onUpdateResolution?: (variantId: string, status: ReportResolutionStatus, note: string) => void;
}

export const VariantResolutionWorkspace: React.FC<VariantResolutionWorkspaceProps> = ({
  variant,
  onUpdateResolution,
}) => {
  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      borderRadius: 14,
      padding: 24,
      border: `1px solid ${AmalTheme.colors.surface.borderLight}`,
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>
          Variant Resolution Workspace: {variant.variant_id}
        </h3>
        <span style={{
          fontSize: 12,
          padding: '4px 10px',
          borderRadius: 8,
          backgroundColor: '#EDE7F6',
          color: '#5E35B1',
          fontWeight: 700,
        }}>
          {variant.difference_type}
        </span>
      </div>

      <p style={{ margin: 0, fontSize: 13, color: '#666' }}>
        {variant.difference_summary}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={{ padding: 14, backgroundColor: '#FAFAFA', borderRadius: 10, border: '1px solid #EEE' }}>
          <h4 style={{ margin: '0 0 8px', fontSize: 14, color: '#333' }}>Report Alpha</h4>
          <div style={{ fontSize: 13, fontWeight: 600 }}>{variant.report_a.source_title}</div>
          <div style={{ fontSize: 12, color: '#777', marginBottom: 8 }}>Narrator: {variant.report_a.narrator_or_author}</div>
          <p style={{ margin: 0, fontSize: 13, color: '#444' }}>"{variant.report_a.claim}"</p>
        </div>

        <div style={{ padding: 14, backgroundColor: '#FAFAFA', borderRadius: 10, border: '1px solid #EEE' }}>
          <h4 style={{ margin: '0 0 8px', fontSize: 14, color: '#333' }}>Report Beta</h4>
          <div style={{ fontSize: 13, fontWeight: 600 }}>{variant.report_b.source_title}</div>
          <div style={{ fontSize: 12, color: '#777', marginBottom: 8 }}>Narrator: {variant.report_b.narrator_or_author}</div>
          <p style={{ margin: 0, fontSize: 13, color: '#444' }}>"{variant.report_b.claim}"</p>
        </div>
      </div>

      <div style={{ backgroundColor: '#F5F5F5', padding: 14, borderRadius: 10 }}>
        <strong style={{ fontSize: 13 }}>Current Scholarly Resolution:</strong>
        <div style={{ fontSize: 13, color: '#333', marginTop: 4 }}>
          Status: <strong>{variant.resolution_status}</strong>
        </div>
        <div style={{ fontSize: 13, color: '#555', marginTop: 4 }}>
          {variant.scholarly_assessment}
        </div>
      </div>
    </div>
  );
};
