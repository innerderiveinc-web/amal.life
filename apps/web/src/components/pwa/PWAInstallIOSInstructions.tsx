import React from 'react';

export const PWAInstallIOSInstructions: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div
        style={{
          padding: 14,
          backgroundColor: '#F0FDF4',
          borderRadius: 10,
          border: '1px solid #BBF7D0',
          fontSize: 13,
          color: '#166534',
          lineHeight: 1.6,
        }}
      >
        <strong>آئی فون / آئی پیڈ پر انسٹال کرنے کا طریقہ (iOS Safari):</strong>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              backgroundColor: '#E5E7EB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              color: '#1F2937',
            }}
          >
            1
          </div>
          <div style={{ fontSize: 13, color: '#374151' }}>
            سفاری براؤزر کے نچلے حصے میں <strong>Share بٹن</strong> (
            <span style={{ fontSize: 16 }}>⎙</span> / <span style={{ fontSize: 15 }}>📤</span>) دبائیں۔
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              backgroundColor: '#E5E7EB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              color: '#1F2937',
            }}
          >
            2
          </div>
          <div style={{ fontSize: 13, color: '#374151' }}>
            نیچے اسکرول کر کے <strong>"Add to Home Screen"</strong> (ہوم اسکرین پر شامل کریں ➕) منتخب کریں۔
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              backgroundColor: '#E5E7EB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              color: '#1F2937',
            }}
          >
            3
          </div>
          <div style={{ fontSize: 13, color: '#374151' }}>
            اوپر دائیں کونے میں <strong>"Add"</strong> پر کلک کریں۔ ایپ بغیر انٹرنیٹ چلے گی۔
          </div>
        </div>
      </div>
    </div>
  );
};
