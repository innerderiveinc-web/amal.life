import React from 'react';
import { usePWAInstallPrompt } from './pwa/usePWAInstallPrompt';
import { PWAInstallIOSInstructions } from './pwa/PWAInstallIOSInstructions';
import { PWAInstallStandardView } from './pwa/PWAInstallStandardView';

export interface PWAInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PWAInstallModal: React.FC<PWAInstallModalProps> = ({ isOpen, onClose }) => {
  const { isIOS, isStandalone, isInstalling, handleInstallClick } = usePWAInstallPrompt(isOpen, onClose);

  if (!isOpen) return null;

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
          <p style={{ margin: '4px 0 0', fontSize: 12, color: '#6EE7B7', fontWeight: 700 }}>
            by Qsura India Pvt Ltd
          </p>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: '#A7F3D0' }}>
            Install AMAL OS on your Phone / Home Screen
          </p>
        </div>

        {/* Modal Body */}
        <div style={{ padding: 24 }}>
          {isStandalone ? (
            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>✅</div>
              <h4 style={{ margin: '0 0 6px', fontSize: 16, fontWeight: 700, color: '#065F46' }}>
                ایپ پہلے سے انسٹال ہے
              </h4>
              <p style={{ margin: 0, fontSize: 13, color: '#4B5563', lineHeight: 1.6 }}>
                AMAL OS is already installed as a standalone PWA on your device with full 100% offline access.
              </p>
            </div>
          ) : isIOS ? (
            <PWAInstallIOSInstructions />
          ) : (
            <PWAInstallStandardView
              isInstalling={isInstalling}
              onInstallClick={handleInstallClick}
            />
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
