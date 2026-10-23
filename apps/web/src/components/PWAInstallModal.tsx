import React, { useState, useEffect } from 'react';
import { AmalTheme } from '@amal/ui';
import { showAmalToast } from './Toast';

export interface PWAInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PWAInstallModal: React.FC<PWAInstallModalProps> = ({ isOpen, onClose }) => {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [canPrompt, setCanPrompt] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Detect standalone PWA mode
    const checkStandalone = () => {
      const isWindowStandalone = window.matchMedia('(display-mode: standalone)').matches;
      const isNavStandalone = (window.navigator as any).standalone === true;
      setIsStandalone(isWindowStandalone || isNavStandalone);
    };

    checkStandalone();

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    // Check if deferredPrompt is present
    const updatePromptStatus = () => {
      setCanPrompt(Boolean((window as any).deferredPrompt));
    };

    updatePromptStatus();

    window.addEventListener('amal-pwa-installable', updatePromptStatus);
    window.addEventListener('amal-pwa-installed', () => {
      setIsStandalone(true);
      setCanPrompt(false);
    });

    return () => {
      window.removeEventListener('amal-pwa-installable', updatePromptStatus);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    const promptEvent = (window as any).deferredPrompt;
    if (promptEvent) {
      setIsInstalling(true);
      try {
        await promptEvent.prompt();
        const choiceResult = await promptEvent.userChoice;
        if (choiceResult.outcome === 'accepted') {
          showAmalToast('AMAL OS کامیابی سے آپ کی ہوم اسکرین پر شامل ہو گیا ہے!', 'success');
          (window as any).deferredPrompt = null;
          setCanPrompt(false);
          setIsStandalone(true);
          onClose();
        } else {
          showAmalToast('انسٹالیشن منسوخ کر دی گئی۔', 'info');
        }
      } catch (err) {
        showAmalToast('براؤزر میں انسٹال کرنے کے لیے براؤزر مینیو استعمال کریں۔', 'info');
      } finally {
        setIsInstalling(false);
      }
    } else if (isIOS) {
      // iOS has no programmatic prompt, keep modal open to show instructions
    } else {
      showAmalToast('براؤزر کے مینیو میں جا کر "Add to Home Screen" یا "Install AMAL OS" منتخب کریں۔', 'info');
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(6px)',
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
          maxWidth: 480,
          width: '100%',
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          animation: 'fadeIn 0.2s ease-out',
          border: '1px solid rgba(0, 0, 0, 0.08)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          style={{
            background: 'linear-gradient(135deg, #064E3B 0%, #043327 100%)',
            color: '#FFFFFF',
            padding: '24px 24px 20px',
            position: 'relative',
            textAlign: 'center',
          }}
        >
          <button
            onClick={onClose}
            aria-label="Close dialog"
            style={{
              position: 'absolute',
              top: 14,
              right: 14,
              background: 'rgba(255,255,255,0.15)',
              border: 'none',
              color: '#FFFFFF',
              width: 30,
              height: 30,
              borderRadius: '50%',
              fontSize: 14,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ✕
          </button>

          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              backgroundColor: '#1B4332',
              margin: '0 auto 12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 32,
              boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
              border: '2px solid rgba(255,255,255,0.2)',
            }}
          >
            🌙
          </div>

          <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800 }}>AMAL OS — انسٹال کریں</h3>
          <p style={{ margin: '6px 0 0', fontSize: 13, color: '#A7F3D0' }}>
            Install AMAL OS on your Phone / Home Screen
          </p>
        </div>

        {/* Modal Body */}
        <div style={{ padding: 24 }}>
          {isStandalone ? (
            <div
              style={{
                textAlign: 'center',
                padding: '16px 0',
              }}
            >
              <div style={{ fontSize: 40, marginBottom: 12 }}>✅</div>
              <h4 style={{ margin: '0 0 6px', fontSize: 16, fontWeight: 700, color: '#065F46' }}>
                ایپ پہلے سے انسٹال ہے
              </h4>
              <p style={{ margin: 0, fontSize: 13, color: '#4B5563', lineHeight: 1.6 }}>
                AMAL OS is already installed as a standalone PWA on your device with full 100% offline access.
              </p>
            </div>
          ) : isIOS ? (
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
          ) : (
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
                onClick={handleInstallClick}
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
          )}

          <div
            style={{
              marginTop: 20,
              paddingTop: 16,
              borderTop: '1px solid #F3F4F6',
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <button
              onClick={onClose}
              style={{
                padding: '8px 18px',
                backgroundColor: '#F3F4F6',
                color: '#4B5563',
                border: '1px solid #D1D5DB',
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              بند کریں (Close)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
