import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export interface PWAInstallStandardViewProps {
  isInstalling: boolean;
  onInstallClick: () => void;
}

export const PWAInstallStandardView: React.FC<PWAInstallStandardViewProps> = ({
  isInstalling,
  onInstallClick,
}) => {
  const { t } = useLanguage();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, textAlign: 'center' }}>
      <p style={{ margin: 0, fontSize: 14, color: '#374151', lineHeight: 1.6 }}>
        {t(
          'Install AMAL OS on your phone or computer for zero ads, complete privacy, and 100% offline access.',
          'AMAL OS کو اپنے فون یا کمپیوٹر پر بغیر اشتہارات، مکمل رازداری اور انٹرنیٹ کے بغیر استعمال کرنے کے لیے انسٹال کریں۔',
          'قم بتثبيت نظام عمل على هاتفك أو حاسوبك للاستمتاع بتجربة خالية من الإعلانات، وبخصوصية تامة، ودون اتصال بالإنترنت.',
          'AMAL OS ko apne phone ya computer par baghair ads, mukammal razdari aur offline chalane ke liye install karein.'
        )}
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 10,
          margin: '8px 0',
        }}
      >
        <div style={{ padding: '10px 6px', backgroundColor: '#F9FAFB', borderRadius: 8, border: '1px solid #E5E7EB' }}>
          <div style={{ fontSize: 18 }}>⚡</div>
          <div style={{ fontSize: 11, fontWeight: 700, marginTop: 4, color: '#1F2937' }}>
            {t('Offline Ready', 'آف لائن رسائی', 'دون اتصال', 'Offline Dastiyab')}
          </div>
          <div style={{ fontSize: 10, color: '#6B7280' }}>
            {t('Quran & Books without internet', 'بغیر انٹرنیٹ قرآن و کتب', 'القرآن والكتب بلا إنترنت', 'Baghair internet Quran o Kutub')}
          </div>
        </div>
        <div style={{ padding: '10px 6px', backgroundColor: '#F9FAFB', borderRadius: 8, border: '1px solid #E5E7EB' }}>
          <div style={{ fontSize: 18 }}>🔒</div>
          <div style={{ fontSize: 11, fontWeight: 700, marginTop: 4, color: '#1F2937' }}>
            {t('Zero Tracking', 'صفر ٹریکنگ', 'انعدام التتبع', 'Zero Tracking')}
          </div>
          <div style={{ fontSize: 10, color: '#6B7280' }}>
            {t('100% Private & Sovereign', '100% نجی و خود مختار', '١٠٠٪ سيادي وخاص', '100% Niji o Khod-Mukhtar')}
          </div>
        </div>
        <div style={{ padding: '10px 6px', backgroundColor: '#F9FAFB', borderRadius: 8, border: '1px solid #E5E7EB' }}>
          <div style={{ fontSize: 18 }}>🕌</div>
          <div style={{ fontSize: 11, fontWeight: 700, marginTop: 4, color: '#1F2937' }}>
            {t('Complete Life OS', 'مکمل لائف OS', 'نظام حياة شامل', 'Mukammal Life OS')}
          </div>
          <div style={{ fontSize: 10, color: '#6B7280' }}>
            {t('Prayers, Qibla & Awrad', 'اوقات، قبلہ و وظائف', 'أوقات وقبلة وأوراد', 'Auqat, Qibla o Awrad')}
          </div>
        </div>
      </div>

      <button
        onClick={onInstallClick}
        disabled={isInstalling}
        style={{
          padding: '14px 20px',
          backgroundColor: '#064E3B',
          color: '#FFFFFF',
          border: 'none',
          borderRadius: 10,
          fontSize: 15,
          fontWeight: 800,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          boxShadow: '0 4px 12px rgba(6, 78, 59, 0.25)',
          transition: 'background-color 0.15s ease',
        }}
      >
        <span>📲</span>
        <span>
          {isInstalling
            ? t('Installing...', 'انسٹال ہو رہا ہے...', 'جارٍ التثبيت...', 'Install ho raha hai...')
            : t('Install to Home Screen Now', 'ابھی ہوم اسکرین پر انسٹال کریں', 'تثبيت على الشاشة الرئيسية الآن', 'Abhi Home Screen par Install Karein')}
        </span>
      </button>
    </div>
  );
};
