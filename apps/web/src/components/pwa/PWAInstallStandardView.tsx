import React from 'react';

export interface PWAInstallStandardViewProps {
  isInstalling: boolean;
  onInstallClick: () => void;
}

export const PWAInstallStandardView: React.FC<PWAInstallStandardViewProps> = ({
  isInstalling,
  onInstallClick,
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, textAlign: 'center' }}>
      <p style={{ margin: 0, fontSize: 14, color: '#374151', lineHeight: 1.6 }}>
        AMAL OS کو اپنے فون یا کمپیوٹر پر بغیر اشتہارات، مکمل رازداری اور انٹرنیٹ کے بغیر (100% Offline) استعمال کرنے کے لیے انسٹال کریں۔
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
          <div style={{ fontSize: 11, fontWeight: 700, marginTop: 4, color: '#1F2937' }}>آف لائن رسائی</div>
          <div style={{ fontSize: 10, color: '#6B7280' }}>بغیر انٹرنیٹ قرآن و کتب</div>
        </div>
        <div style={{ padding: '10px 6px', backgroundColor: '#F9FAFB', borderRadius: 8, border: '1px solid #E5E7EB' }}>
          <div style={{ fontSize: 18 }}>🔒</div>
          <div style={{ fontSize: 11, fontWeight: 700, marginTop: 4, color: '#1F2937' }}>صفر ٹریکنگ</div>
          <div style={{ fontSize: 10, color: '#6B7280' }}>100% نجی و خود مختار</div>
        </div>
        <div style={{ padding: '10px 6px', backgroundColor: '#F9FAFB', borderRadius: 8, border: '1px solid #E5E7EB' }}>
          <div style={{ fontSize: 18 }}>🕌</div>
          <div style={{ fontSize: 11, fontWeight: 700, marginTop: 4, color: '#1F2937' }}>مکمل لائف OS</div>
          <div style={{ fontSize: 10, color: '#6B7280' }}>اوقات، قبلہ و وظائف</div>
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
        <span>{isInstalling ? 'انسٹال ہو رہا ہے...' : 'ابھی ہوم اسکرین پر انسٹال کریں (Install Now)'}</span>
      </button>
    </div>
  );
};
