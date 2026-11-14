import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export interface AdabHotkeysGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdabHotkeysGuideModal({ isOpen, onClose }: AdabHotkeysGuideModalProps) {
  const { t, isUrdu } = useLanguage();

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const shortcuts = [
    {
      key: '?',
      descEn: 'Open / Close this Adab Hotkeys Cheatsheet',
      descUr: 'اس شارٹ کٹ گائیڈ کو کھولیں / بند کریں',
      descAr: 'فتح أو إغلاق دليل الاختصارات',
    },
    {
      key: '⌘ + K  /  Ctrl + K',
      descEn: 'Open Universal Islamic Search & Mutun Explorer',
      descUr: 'عالمی اسلامی سرچ و متون ایکسپلورر کھولیں',
      descAr: 'فتح البحث الإسلامي الشامل واستكشاف المتون',
    },
    {
      key: 'Space',
      descEn: 'Play / Pause current Quran or audio recitation',
      descUr: 'قرآن کریم کی تلاوت یا آڈیو کو پلے / پاز کریں',
      descAr: 'تشغيل أو إيقاف التلاوة الحالية مؤقتاً',
    },
    {
      key: 'T',
      descEn: 'Tap / Increment digital Masnoon Tasbih counter',
      descUr: 'مسنون ڈیجیٹل تسبیح کاؤنٹر میں ذکر شمار کریں',
      descAr: 'تسجيل تسبيحة في المسبحة الإلكترونية',
    },
    {
      key: 'F',
      descEn: 'Toggle Sacred Fullscreen / Focus Mode',
      descUr: 'فل اسکرین و پرسکون فوکس موڈ فعال کریں',
      descAr: 'تبديل وضع ملء الشاشة والتركيز الهادئ',
    },
    {
      key: 'Esc',
      descEn: 'Close any active modal, dialog, or search drawer',
      descUr: 'کسی بھی کھلی ونڈو یا ڈائیلاگ کو فوری بند کریں',
      descAr: 'إغلاق أي نافذة منبثقة أو لوحة نشطة',
    },
  ];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(4px)',
        zIndex: 9999,
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
          borderRadius: 16,
          width: '100%',
          maxWidth: 540,
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
          overflow: 'hidden',
          border: '1px solid #E2E8F0',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            backgroundColor: '#064E3B',
            color: '#FFFFFF',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>
              ⌨️ {t('Scholar Adab Hotkeys & Shortcuts', 'طالبِ علم و ریسرچر کی بورڈ شارٹ کٹس', 'اختصارات لوحة المفاتيح وآداب الباحث', 'Keyboard Shortcuts & Hotkeys')}
            </h3>
            <p style={{ margin: '4px 0 0', fontSize: 12, color: '#A7F3D0' }}>
              {t('Accelerate your Quran recitation and research workflow', 'تلاوت و تحقیق کو تیز تر بنائیں', 'لتسريع تلاوة القرآن وتسهيل البحث العلمي', 'Tez tareen mutala o tilawat')}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            style={{
              background: 'none',
              border: 'none',
              color: '#A7F3D0',
              fontSize: 22,
              cursor: 'pointer',
              padding: 4,
            }}
          >
            ✕
          </button>
        </div>

        {/* Shortcuts List */}
        <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 12, maxHeight: '60vh', overflowY: 'auto' }}>
          {shortcuts.map((sc, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                borderRadius: 8,
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0',
              }}
            >
              <span style={{ fontSize: 13, color: '#1E293B', fontWeight: 600 }}>
                {isUrdu ? sc.descUr : sc.descEn}
              </span>
              <kbd
                style={{
                  padding: '4px 10px',
                  borderRadius: 6,
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #CBD5E1',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
                  fontSize: 12,
                  fontWeight: 800,
                  color: '#064E3B',
                  fontFamily: 'monospace',
                }}
              >
                {sc.key}
              </kbd>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '12px 24px',
            backgroundColor: '#F1F5F9',
            borderTop: '1px solid #E2E8F0',
            textAlign: 'center',
            fontSize: 12,
            color: '#475569',
          }}
        >
          {t('Press ? anywhere in AMAL OS to reopen this guide.', 'عمل او ایس میں کہیں بھی ? دبا کر یہ گائیڈ دوبارہ دیکھ سکتے ہیں۔', 'اضغط ? في أي وقت لإعادة فتح هذا الدليل.', 'Press ? anywhere to open.')}
        </div>
      </div>
    </div>
  );
}
