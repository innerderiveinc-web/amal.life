import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { triggerHaptic } from '../lib/haptics';

export const PWAUpdateBanner: React.FC = () => {
  const { t } = useLanguage();
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);
  const [showBanner, setShowBanner] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;

    // Check existing registration
    navigator.serviceWorker.getRegistration().then((reg) => {
      if (!reg) return;

      if (reg.waiting) {
        setWaitingWorker(reg.waiting);
        setShowBanner(true);
      }

      reg.addEventListener('updatefound', () => {
        const newWorker = reg.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              setWaitingWorker(newWorker);
              setShowBanner(true);
            }
          });
        }
      });
    });

    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!refreshing) {
        refreshing = true;
        window.location.reload();
      }
    });
  }, []);

  const handleUpdate = () => {
    triggerHaptic('success');
    if (waitingWorker) {
      waitingWorker.postMessage({ type: 'SKIP_WAITING' });
    } else {
      window.location.reload();
    }
  };

  if (!showBanner) return null;

  return (
    <div
      role="alert"
      aria-live="polite"
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 9999,
        maxWidth: 420,
        width: 'calc(100vw - 32px)',
        backgroundColor: '#064E3B',
        color: '#FFFFFF',
        borderRadius: 14,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
        border: '1px solid #10B981',
        padding: '14px 18px',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        animation: 'slideUp 0.3s ease-out',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 20 }}>✨</span>
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 800, color: '#FDE68A' }}>
              {t('AMAL OS Update Available', 'نیا ورژن تیار ہے!', 'تحديث جديد متوفر', 'Naya Version Tayyar Hai!')}
            </div>
            <div style={{ fontSize: 11.5, color: '#D1FAE5', marginTop: 2, lineHeight: 1.4 }}>
              {t(
                'Fresh features & layout enhancements are ready to install.',
                'بہترین کارکردگی اور نئے فیچرز کے لیے ابھی ریفریش کریں۔',
                'الميزات والتحديثات الجديدة جاهزة للتحميل.',
                'Behtareen karkardagi aur naye features ke liye abhi refresh karein.'
              )}
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowBanner(false)}
          aria-label="Dismiss update notification"
          style={{
            background: 'none',
            border: 'none',
            color: '#A7F3D0',
            fontSize: 16,
            cursor: 'pointer',
            padding: 4,
          }}
        >
          ✕
        </button>
      </div>

      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 2 }}>
        <button
          onClick={() => setShowBanner(false)}
          style={{
            padding: '6px 12px',
            borderRadius: 8,
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backgroundColor: 'transparent',
            color: '#E5E7EB',
            fontSize: 12,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          {t('Later', 'بعد میں', 'لاحقاً', 'Baad mein')}
        </button>

        <button
          onClick={handleUpdate}
          style={{
            padding: '6px 16px',
            borderRadius: 8,
            border: 'none',
            backgroundColor: '#10B981',
            color: '#FFFFFF',
            fontSize: 12,
            fontWeight: 800,
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(16, 185, 129, 0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <span>↻</span>
          <span>{t('Update Now', 'ابھی اپڈیٹ کریں', 'تحديث الآن', 'Abhi Update Karein')}</span>
        </button>
      </div>
    </div>
  );
};
