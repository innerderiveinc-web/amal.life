import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export const PWAInstallIOSInstructions: React.FC = () => {
  const { t, isUrdu, isArabic } = useLanguage();

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
        <strong>
          {t(
            'Installation Steps for iPhone / iPad (iOS Safari):',
            'آئی فون اور آئی پیڈ پر انسٹال کرنے کا طریقہ (سفاری):',
            'خطوات التثبيت على أجهزة iPhone و iPad (متصفح سفاري):',
            'iPhone / iPad par install karne ka tariqa (iOS Safari):'
          )}
        </strong>
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
              flexShrink: 0,
            }}
          >
            1
          </div>
          <div style={{ fontSize: 13, color: '#374151' }}>
            {t(
              'Tap the Share button at the bottom of the Safari toolbar (📤).',
              'سفاری براؤزر کے نچلے حصے میں شیئر بٹن (📤) دبائیں۔',
              'اضغط على زر المشاركة (📤) أسفل شريط أدوات متصفح سفاري.',
              'Safari toolbar ke nichle hisse me Share button (📤) dabayein.'
            )}
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
              flexShrink: 0,
            }}
          >
            2
          </div>
          <div style={{ fontSize: 13, color: '#374151' }}>
            {t(
              'Scroll down and tap "Add to Home Screen" (➕).',
              'نیچے اسکرول کر کے "Add to Home Screen" (ہوم اسکرین پر شامل کریں ➕) منتخب کریں۔',
              'مرر للأسفل واختر "إضافة إلى الشاشة الرئيسية" (➕).',
              'Neeche scroll kar ke "Add to Home Screen" (➕) muntakhab karein.'
            )}
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
              flexShrink: 0,
            }}
          >
            3
          </div>
          <div style={{ fontSize: 13, color: '#374151' }}>
            {t(
              'Tap "Add" in the top-right corner. The app will work fully offline!',
              'اوپر دائیں کونے میں "Add" پر کلک کریں۔ ایپ مکمل آف لائن چلے گی!',
              'اضغط على "إضافة" في الزاوية العلوية. سيعمل التطبيق بالكامل دون اتصال!',
              'Top-right me "Add" par click karein. App mukammal offline chalegi!'
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
