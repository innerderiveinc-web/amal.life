import React from 'react';
import { ShamailReportRecord } from '@amal/types';
import { AmalTheme } from '@amal/ui';

interface ShamailCardProps {
  report: ShamailReportRecord;
  onShareCard?: (report: ShamailReportRecord) => void;
}

export const ShamailCard: React.FC<ShamailCardProps> = ({ report, onShareCard }) => {
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
          color: '#065F46',
          backgroundColor: '#ECFDF5',
          padding: '3px 10px',
          borderRadius: 12,
          letterSpacing: 0.5,
        }}>
          شمائلِ مصطفیٰ ﷺ · {report.category.replace(/_/g, ' ')}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 12, color: '#64748B' }}>
            راوی: {report.primary_narrator}
          </span>
          {onShareCard && (
            <button
              type="button"
              onClick={() => onShareCard(report)}
              style={{
                padding: '4px 10px',
                borderRadius: 6,
                border: '1px solid #10B981',
                backgroundColor: '#065F46',
                color: '#FFFFFF',
                fontSize: 11,
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}
              title="خوبصورت سوشل میڈیا کارڈ بنائیں"
            >
              <span>📸</span>
              <span>شمائل کارڈ</span>
            </button>
          )}
        </div>
      </div>

      <div style={{
        backgroundColor: '#FAFAFA',
        padding: '14px 16px',
        borderRadius: 10,
        fontFamily: 'Amiri, Traditional Arabic, serif',
        fontSize: 19,
        lineHeight: 1.8,
        color: '#0F172A',
        direction: 'rtl',
        textAlign: 'right',
        fontWeight: 600,
      }}>
        {report.arabic_matn}
      </div>

      {report.urdu_translation && (
        <div
          dir="rtl"
          style={{
            backgroundColor: '#FFFBEB',
            padding: '12px 14px',
            borderRadius: 8,
            borderRight: '3px solid #D97706',
            fontSize: 13,
            lineHeight: 1.7,
            color: '#78350F',
          }}
        >
          <strong style={{ color: '#92400E', display: 'block', fontSize: 11, marginBottom: 2 }}>
            اردو مفہوم:
          </strong>
          {report.urdu_translation}
        </div>
      )}

      <p style={{ margin: 0, fontSize: 13, color: '#475569', lineHeight: 1.6, fontStyle: 'italic' }}>
        <strong>English:</strong> "{report.english_translation}"
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
        <span><strong>مصدر و حوالہ:</strong> {report.source_hadith_ref || report.primary_source_work}</span>
        <span style={{ color: '#065F46', fontWeight: 700 }}>درجہ: {report.hadith_grading}</span>
      </div>

      <div style={{
        backgroundColor: '#F0FDF4',
        borderRadius: 8,
        padding: '10px 12px',
        fontSize: 12,
        color: '#166534',
        lineHeight: 1.5,
      }}>
        <strong>✨ سیرت و اداب کا سبق:</strong> {report.practical_adab_lesson}
      </div>
    </div>
  );
};
