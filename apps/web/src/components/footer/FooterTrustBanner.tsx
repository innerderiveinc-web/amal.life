import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export interface FooterTrustBannerProps {
  isUrdu?: boolean;
}

export const FooterTrustBanner: React.FC<FooterTrustBannerProps> = () => {
  const { t } = useLanguage();

  return (
    <div
      style={{
        backgroundColor: '#061710',
        padding: '22px 24px',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ fontSize: 32 }}>🕌</span>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <span
                style={{
                  fontSize: 15,
                  fontWeight: 800,
                  color: '#A7F3D0',
                  letterSpacing: 0.5,
                }}
              >
                {t(
                  'AHL AL-SUNNAH HERITAGE · AL-SAWAD AL-A\'ZAM',
                  'اہلسنت والجماعت (السواد الأعظم) · مستند شرعی ورثہ',
                  'تراث أهل السنة والجماعة · السواد الأعظم المعتمد',
                  'Ahl al-Sunnah Heritage · Al-Sawad al-A\'zam'
                )}
              </span>
              <span
                style={{
                  fontSize: 10,
                  backgroundColor: 'rgba(16, 185, 129, 0.2)',
                  color: '#34D399',
                  padding: '3px 10px',
                  borderRadius: 12,
                  fontWeight: 800,
                  letterSpacing: 0.5,
                  textTransform: 'uppercase',
                  border: '1px solid rgba(52, 211, 153, 0.3)',
                }}
              >
                {t('VERIFIED CANON', 'مستند شرعی منہج', 'منهج شرعي موثق', 'Verified Shar\'i Manhaj')}
              </span>
            </div>
            <p style={{ margin: '4px 0 0', fontSize: 13, color: '#9CA3AF', lineHeight: 1.5 }}>
              {t(
                '100% Authentic Sunni Orthodox Practice · 106 Classical Masterworks across Hanafi, Shafi\'i, Maliki & Hanbali Heritage',
                '100% مستند سنی عقائد و معمولات · فقہ حنفی، شافعی، مالکی و حنبلی کی 106 معتبر کتب کا تحقیقی پلیٹ فارم',
                '١٠٠٪ عقائد وممارسات سنية معتمدة · ١٠٦ أمهات الكتب عبر الفقه الحنفي والشافعي والمالكي والحنبلي',
                '100% Mustanad Sunni Aqaid wa Mamoolat · Fiqh Hanafi, Shafi\'i, Maliki wa Hanbali ki 106 motabar kutub ka tehqeeqi platform'
              )}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 12,
              fontWeight: 700,
              color: '#34D399',
              backgroundColor: 'rgba(6, 78, 59, 0.45)',
              padding: '8px 16px',
              borderRadius: 20,
              border: '1px solid rgba(52, 211, 153, 0.3)',
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: '#10B981',
                display: 'inline-block',
                boxShadow: '0 0 8px #10B981',
              }}
            />
            <span>
              {t(
                'Sadaqah Jariyah Lil-Ummah · Sacred Public Trust',
                'وقف لوجہ اللہ تعالیٰ · صدقہ جاریہ برائے امت',
                'وقف لوجه الله تعالى · صدقة جارية للأمة',
                'Waqf Li-Wajh-illah Ta\'ala · Sadaqah Jariyah'
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
