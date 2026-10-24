import React from 'react';
import { useRouter } from 'next/router';
import { SafetyClassification } from '../../lib/safety';

interface AskScholarEscalationBannerProps {
  safetyResult: SafetyClassification;
  query: string;
  t: (en: string, ur: string) => string;
}

export const AskScholarEscalationBanner: React.FC<AskScholarEscalationBannerProps> = ({
  safetyResult,
  query,
  t,
}) => {
  const router = useRouter();

  return (
    <>
      {/* CLASS D: SCHOLAR ESCALATION BANNER */}
      {safetyResult.requiresScholarEscalation && !safetyResult.requiresCrisisIntervention && (
        <div
          style={{
            backgroundColor: '#FFFBEB',
            border: '1px solid #FDE68A',
            borderRadius: 16,
            padding: 24,
            marginBottom: 24,
            color: '#92400E',
          }}
        >
          <h3 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 8px', color: '#B45309' }}>
            Direct Scholarly Guidance Needed (اہلِ علم سے رجوع)
          </h3>
          <p style={{ fontSize: 14, margin: '0 0 16px', lineHeight: 1.6, color: '#78350F' }}>
            Personal legal matters, marital questions, divorce (talaq), solemn oaths, and binding
            contracts depend intimately upon your specific life context. In our sacred tradition,
            no automated machine or algorithm may issue a binding legal ruling (Fatwa). AMAL
            protects your Deen by preparing a confidential, structured case file for verified, living
            scholars to provide personalized counsel.
          </p>
          <button
            onClick={() => {
              if (typeof window !== 'undefined') {
                localStorage.setItem('amal_pending_situation', query);
              }
              router.push('/decision-room');
            }}
            style={{
              backgroundColor: '#1B4332',
              color: '#FFF',
              border: 'none',
              borderRadius: 8,
              padding: '10px 18px',
              fontWeight: 700,
              fontSize: 13,
              cursor: 'pointer',
            }}
          >
            Open Deen Decision Room &amp; Prepare Scholar Case →
          </button>
        </div>
      )}

      {/* CLASS C: SCHOLARLY DISAGREEMENT / IKHTILAF BANNER */}
      {safetyResult.safetyClass === 'CLASS_C_SCHOLARLY_DISAGREEMENT' && (
        <div
          style={{
            backgroundColor: '#EFF6FF',
            border: '1px solid #BFDBFE',
            borderRadius: 12,
            padding: 16,
            marginBottom: 20,
            fontSize: 13,
            lineHeight: 1.5,
            color: '#1E40AF',
          }}
        >
          <strong>⚖️ {t('Legitimate Scholarly Pluralism:', 'اختلاف ائمہ فقہ رحمت ہے:')}</strong>{' '}
          {t(
            "This topic involves established legal divergence across the recognized Sunni schools (Hanafi, Maliki, Shafi'i, and Hanbali). AMAL presents classical citations transparently without forcing an artificial single ruling.",
            'اس مسئلے میں معتبر سنی فقہی مذاہب (حنفی، شافعی، مالکی، حنبلی) کے مابین دلائل پر مبنی علمی اختلاف موجود ہے۔ امل تمام آراء کو بلا تعصب پیش کرتا ہے۔'
          )}
        </div>
      )}
    </>
  );
};
