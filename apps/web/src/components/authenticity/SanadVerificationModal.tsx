import React from 'react';
import { SanadVerificationReport } from '../../lib/authenticity-pipeline';
import { useLanguage } from '../../context/LanguageContext';

export interface SanadVerificationModalProps {
  report: SanadVerificationReport | null;
  isOpen: boolean;
  onClose: () => void;
}

export const SanadVerificationModal: React.FC<SanadVerificationModalProps> = ({
  report,
  isOpen,
  onClose,
}) => {
  const { t, isUrdu } = useLanguage();

  if (!isOpen || !report) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(6, 78, 59, 0.65)',
        backdropFilter: 'blur(6px)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 20,
          maxWidth: 520,
          width: '100%',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          overflow: 'hidden',
          border: '2px solid #10B981',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            background: 'linear-gradient(135deg, #064E3B 0%, #0F291E 100%)',
            color: '#FFFFFF',
            padding: '20px 24px',
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  backgroundColor: '#10B981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 18,
                }}
              >
                ✓
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800 }}>
                  {t('Sanad & Authenticity Certificate', 'سند و حوالہ تصدیقی سرٹیفکیٹ')}
                </h3>
                <span style={{ fontSize: 11, color: '#A7F3D0' }}>
                  {t('Verified by AMAL Deeni Verification Pipeline', 'امل دینی تفتیش و تخریج انجن سے تصدیق شدہ')}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              style={{
                width: 30,
                height: 30,
                borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.15)',
                color: '#FFFFFF',
                border: 'none',
                cursor: 'pointer',
                fontSize: 14,
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Body Content */}
        <div style={{ padding: '24px 24px', maxHeight: '70vh', overflowY: 'auto' }}>
          {/* Certificate Badge Card */}
          <div
            style={{
              padding: '14px 18px',
              borderRadius: 12,
              backgroundColor: '#ECFDF5',
              border: '1.5px solid #10B981',
              marginBottom: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, color: '#065F46', textTransform: 'uppercase' }}>
                {t('Authenticity Grading', 'صحتِ حدیث و معتبریت')}
              </div>
              <div style={{ fontSize: 15, fontWeight: 800, color: '#047857', marginTop: 2 }}>
                {isUrdu ? report.gradingUrdu : report.gradingEnglish}
              </div>
            </div>
            <div
              style={{
                fontSize: 11,
                fontFamily: 'monospace',
                backgroundColor: '#FFFFFF',
                padding: '4px 8px',
                borderRadius: 6,
                border: '1px solid #A7F3D0',
                color: '#065F46',
                fontWeight: 700,
              }}
            >
              {report.verificationHash}
            </div>
          </div>

          {/* Details Table */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, fontSize: 13 }}>
            <div>
              <span style={{ fontWeight: 700, color: '#6B7280', display: 'block', fontSize: 11 }}>
                {t('Source Corpus', 'کتاب / ماخذ:')}
              </span>
              <span style={{ fontWeight: 800, color: '#1F2937', fontSize: 14 }}>
                {isUrdu ? report.sourceNameUrdu : report.sourceNameEnglish} ({report.sourceNameArabic})
              </span>
            </div>

            <div>
              <span style={{ fontWeight: 700, color: '#6B7280', display: 'block', fontSize: 11 }}>
                {t('Citation Reference', 'تخریج و حوالہ:')}
              </span>
              <span style={{ fontWeight: 700, color: '#1F2937' }}>
                {report.citationReference}
              </span>
            </div>

            {report.primaryNarrator && (
              <div>
                <span style={{ fontWeight: 700, color: '#6B7280', display: 'block', fontSize: 11 }}>
                  {t('Primary Narrator / Rawi', 'راویِ حدیث (صحابیِ رسول):')}
                </span>
                <span style={{ fontWeight: 700, color: '#065F46' }}>
                  {report.primaryNarrator}
                </span>
              </div>
            )}

            <div>
              <span style={{ fontWeight: 700, color: '#6B7280', display: 'block', fontSize: 11 }}>
                {t('Sanad & Takhrij Audit Notes', 'تحقیقی و اسنادی نوٹ:')}
              </span>
              <p style={{ margin: '4px 0 0 0', color: '#374151', lineHeight: 1.5 }}>
                {isUrdu ? report.verificationAuditNotes.ur : report.verificationAuditNotes.en}
              </p>
            </div>

            <div>
              <span style={{ fontWeight: 700, color: '#6B7280', display: 'block', fontSize: 11 }}>
                {t('Scholarly Consensus', 'جمہور اہل علم کا موقف:')}
              </span>
              <p style={{ margin: '4px 0 0 0', color: '#374151', lineHeight: 1.5 }}>
                {isUrdu ? report.scholarlyConsensus.ur : report.scholarlyConsensus.en}
              </p>
            </div>
          </div>

          {/* Guarantee Footer */}
          <div
            style={{
              marginTop: 20,
              padding: '12px 14px',
              borderRadius: 10,
              backgroundColor: '#F8FAFC',
              border: '1px solid #E2E8F0',
              fontSize: 11,
              color: '#64748B',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span>🛡️</span>
            <span>
              {t(
                '100% Guaranteed: No AI-generated or unverified content enters AMAL OS databases.',
                '۱۰۰٪ ضمانت: امل او ایس میں کوئی بھی من گھڑت یا غیر مصدقہ روایت شامل نہیں کی جاتی۔'
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
