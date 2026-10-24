import React from 'react';
import { MultiFiqhPrecisionReport } from '../../lib/prayer-precision-engine';
import { useLanguage } from '../../context/LanguageContext';

export interface MultiFiqhPrecisionModalProps {
  report: MultiFiqhPrecisionReport | null;
  isOpen: boolean;
  onClose: () => void;
}

export const MultiFiqhPrecisionModal: React.FC<MultiFiqhPrecisionModalProps> = ({
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
          maxWidth: 640,
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
                🔭
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800 }}>
                  {t('Astronomical & Multi-Fiqh Precision Engine', 'فلکیاتی و فقہی تقابلی تحقیق')}
                </h3>
                <span style={{ fontSize: 11, color: '#A7F3D0' }}>
                  {report.city} · Lat: {report.latitude.toFixed(2)}°, Long: {report.longitude.toFixed(2)}°
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
        <div style={{ padding: '20px 24px', maxHeight: '72vh', overflowY: 'auto' }}>
          {/* Asr Hanafi vs Jumhoor Comparison Pill */}
          <div
            style={{
              padding: '14px 18px',
              borderRadius: 12,
              backgroundColor: '#ECFDF5',
              border: '1.5px solid #10B981',
              marginBottom: 18,
            }}
          >
            <div style={{ fontSize: 12, fontWeight: 800, color: '#065F46', marginBottom: 4 }}>
              ⚖️ {t('Asr Shadow Jurisprudence (حنابلہ، شافعیہ، مالکیہ بمقابلہ احناف):', 'عصر مثلِ اول بمقابلہ مثلِ ثانی:')}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, fontSize: 13 }}>
              <div>
                <span style={{ color: '#4B5563' }}>{t('Jumhoor / Shafi\'i (Misl-e-Awwal):', 'جمہور / شافعی (مثلِ اول):')} </span>
                <strong style={{ color: '#064E3B' }}>{report.authorities[0]?.asrShafiTime}</strong>
              </div>
              <div>
                <span style={{ color: '#4B5563' }}>{t('Hanafi (Misl-e-Saani):', 'حنفی (مثلِ ثانی):')} </span>
                <strong style={{ color: '#064E3B' }}>{report.authorities[0]?.asrHanafiTime}</strong>
              </div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  backgroundColor: '#047857',
                  color: '#FFFFFF',
                  padding: '2px 8px',
                  borderRadius: 12,
                }}
              >
                +{report.asrDeltaMinutes} {t('minutes difference', 'منٹ کا فرق')}
              </div>
            </div>
          </div>

          {/* Multi-Authority Comparison Table */}
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#1F2937', marginBottom: 8 }}>
              {t('Multi-Authority Consensus Matrix:', '۵ عالمی فقہی و فلکیاتی اداروں کا موازنہ:')}
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', fontSize: 12, borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '2px solid #E2E8F0' }}>
                    <th style={{ padding: '8px 10px', color: '#475569' }}>{t('Authority', 'ادارہ')}</th>
                    <th style={{ padding: '8px 8px', color: '#065F46' }}>{t('Fajr', 'فجر')}</th>
                    <th style={{ padding: '8px 8px', color: '#065F46' }}>{t('Sunrise', 'طلوع')}</th>
                    <th style={{ padding: '8px 8px', color: '#065F46' }}>{t('Maghrib', 'مغرب')}</th>
                    <th style={{ padding: '8px 8px', color: '#065F46' }}>{t('Isha', 'عشاء')}</th>
                  </tr>
                </thead>
                <tbody>
                  {report.authorities.map((auth, idx) => (
                    <tr
                      key={auth.authorityKey}
                      style={{
                        borderBottom: '1px solid #E2E8F0',
                        backgroundColor: idx === 0 ? '#F0FDF4' : 'transparent',
                      }}
                    >
                      <td style={{ padding: '8px 10px', fontWeight: idx === 0 ? 800 : 600 }}>
                        {isUrdu ? auth.authorityNameUrdu : auth.authorityNameEnglish}
                        {idx === 0 && <span style={{ color: '#047857', fontSize: 10, display: 'block' }}>★ Default</span>}
                      </td>
                      <td style={{ padding: '8px 8px', fontWeight: 700 }}>{auth.fajrTime}</td>
                      <td style={{ padding: '8px 8px', color: '#6B7280' }}>{auth.sunriseTime}</td>
                      <td style={{ padding: '8px 8px', fontWeight: 700 }}>{auth.maghribTime}</td>
                      <td style={{ padding: '8px 8px', fontWeight: 700 }}>{auth.ishaTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* High Latitude Notice */}
          <div
            style={{
              padding: '12px 14px',
              borderRadius: 10,
              backgroundColor: report.highLatitude.isHighLatitude ? '#FEF3C7' : '#F8FAFC',
              border: '1px solid',
              borderColor: report.highLatitude.isHighLatitude ? '#FCD34D' : '#E2E8F0',
              marginBottom: 16,
              fontSize: 12,
              color: report.highLatitude.isHighLatitude ? '#92400E' : '#475569',
            }}
          >
            <strong>🌐 {t('Geographical Altitude Check:', 'جغرافیائی خطہ و شفق کی حالت:')} </strong>
            <span>{isUrdu ? report.highLatitude.explanationUrdu : report.highLatitude.explanationEnglish}</span>
          </div>

          {/* Scholarly Ihtiyat Notes */}
          <div style={{ fontSize: 11, color: '#6B7280', lineHeight: 1.5, borderTop: '1px solid #E5E7EB', paddingTop: 12 }}>
            <strong>💡 {t('Local Mosque Discrepancies:', 'مقامی مسجد کے وقت میں فرق کی وجہ:')} </strong>
            <span>{isUrdu ? report.scholarlyIhtiyatNotes.ur : report.scholarlyIhtiyatNotes.en}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
