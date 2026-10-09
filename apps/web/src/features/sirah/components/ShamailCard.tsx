import React from 'react';
import { ShamailReportRecord } from '@amal/types';
import { AmalTheme } from '@amal/ui';

interface ShamailCardProps {
  report: ShamailReportRecord;
}

export const ShamailCard: React.FC<ShamailCardProps> = ({ report }) => {
  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      borderRadius: 14,
      padding: 20,
      border: `1px solid ${AmalTheme.colors.surface.borderLight}`,
      boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{
          fontSize: 11,
          fontWeight: 700,
          color: '#5E35B1',
          backgroundColor: '#EDE7F6',
          padding: '3px 10px',
          borderRadius: 12,
          letterSpacing: 0.5,
        }}>
          SHAMA'IL · {report.category.replace(/_/g, ' ')}
        </span>
        <span style={{ fontSize: 12, color: '#777' }}>
          Narrated by {report.primary_narrator}
        </span>
      </div>

      <div style={{
        backgroundColor: '#FAFAFA',
        padding: '14px 16px',
        borderRadius: 10,
        fontFamily: 'Amiri, Traditional Arabic, serif',
        fontSize: 18,
        lineHeight: 1.8,
        color: '#1A237E',
        direction: 'rtl',
        textAlign: 'right',
      }}>
        {report.arabic_matn}
      </div>

      <p style={{ margin: 0, fontSize: 14, color: '#333', lineHeight: 1.6, fontStyle: 'italic' }}>
        "{report.english_translation}"
      </p>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: '1px solid #F0F0F0',
        paddingTop: 10,
        fontSize: 12,
        color: '#666',
      }}>
        <span><strong>Source:</strong> {report.primary_source_work}</span>
        <span style={{ color: '#2E7D32', fontWeight: 600 }}>Grading: {report.hadith_grading}</span>
      </div>

      <div style={{
        backgroundColor: '#E8F5E9',
        borderRadius: 8,
        padding: '10px 12px',
        fontSize: 13,
        color: '#1B5E20',
      }}>
        <strong>Spiritual Adab:</strong> {report.practical_adab_lesson}
      </div>
    </div>
  );
};
