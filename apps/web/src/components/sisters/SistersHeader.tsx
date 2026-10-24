import React from 'react';

export type SanctuaryTab = 'library' | 'sahabiyyat' | 'fiqh' | 'duas' | 'vault';

interface SistersHeaderProps {
  activeTab: SanctuaryTab;
  onSelectTab: (tab: SanctuaryTab) => void;
  hasPinConfigured: boolean;
  onInstallPWA: () => void;
  onOpenVault: () => void;
  isUrdu: boolean;
  installSuccessMessage: boolean;
}

export function SistersHeader({
  activeTab,
  onSelectTab,
  hasPinConfigured,
  onInstallPWA,
  onOpenVault,
  isUrdu,
  installSuccessMessage,
}: SistersHeaderProps) {
  return (
    <>
      {/* Top Sacred Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #064E3B 0%, #065F46 50%, #831843 100%)',
          color: '#FFFFFF',
          padding: '36px 20px 28px 20px',
          borderBottom: '4px solid #F59E0B',
          boxShadow: '0 10px 25px -5px rgba(6, 78, 59, 0.3)',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 16,
              marginBottom: 16,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  fontSize: 24,
                }}
              >
                🌸
              </span>
              <div>
                <span
                  style={{
                    display: 'inline-block',
                    backgroundColor: 'rgba(245, 158, 11, 0.25)',
                    color: '#FDE68A',
                    padding: '2px 10px',
                    borderRadius: 12,
                    fontSize: 12,
                    fontWeight: 600,
                    border: '1px solid rgba(245, 158, 11, 0.4)',
                    marginBottom: 4,
                  }}
                >
                  {isUrdu ? 'اہل سنت و جماعت کی مستند کتب و اسوہ' : 'Ahl al-Sunnah Classical Canon'}
                </span>
                <h1
                  style={{
                    margin: 0,
                    fontSize: isUrdu ? 28 : 24,
                    fontWeight: 800,
                    letterSpacing: isUrdu ? 0 : '-0.02em',
                    color: '#FFFFFF',
                  }}
                >
                  {isUrdu ? 'گوشۂ خواتین و صحابیات (عمل نساء)' : 'Amal Nisa — The Sisters Sanctuary'}
                </h1>
              </div>
            </div>

            {/* Action Buttons: Standalone PWA & Sovereign PIN */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <button
                onClick={onInstallPWA}
                style={{
                  backgroundColor: '#F59E0B',
                  color: '#1F2937',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: 10,
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
                  transition: 'all 0.2s ease',
                }}
              >
                <span>📲</span>
                <span>{isUrdu ? 'موبائل ایپ انسٹال کریں' : 'Install Standalone App'}</span>
              </button>

              <button
                onClick={onOpenVault}
                style={{
                  backgroundColor: hasPinConfigured ? '#9D174D' : 'rgba(255,255,255,0.18)',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255,255,255,0.3)',
                  padding: '8px 14px',
                  borderRadius: 10,
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <span>{hasPinConfigured ? '🔒' : '🔓'}</span>
                <span>
                  {hasPinConfigured
                    ? isUrdu
                      ? 'نجی پن فعال ہے'
                      : 'PIN Protected'
                    : isUrdu
                    ? 'پن لاک لگائیں'
                    : 'Setup PIN Lock'}
                </span>
              </button>
            </div>
          </div>

          <p
            style={{
              margin: 0,
              fontSize: 14,
              color: '#E0E7FF',
              maxWidth: 800,
              lineHeight: 1.6,
            }}
          >
            {isUrdu
              ? 'خواتینِ اسلام کے لیے ۲۰ مستند کتب، ۱۰ جلیل القدر صحابیات کے نقوشِ حیات، فقہ حنفی اور بہارِ شریعت کے مطابق احکامِ طہارت، اور روزمرہ مسنون دعاؤں کا مکمل آف لائن دائرۃ المعارف۔'
              : 'A comprehensive, sovereign digital sanctuary for Muslim women featuring 20 Classical Sunni Masterworks, biographies of the Sahabiyyat, Hanafi Purity & Fiqh guide, and family prayers.'}
          </p>

          {/* Offline & Authenticity Guarantee Banner */}
          <div
            style={{
              marginTop: 14,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              backgroundColor: 'rgba(0, 0, 0, 0.25)',
              padding: '6px 14px',
              borderRadius: 20,
              fontSize: 12,
              color: '#D1FAE5',
            }}
          >
            <span style={{ color: '#10B981' }}>●</span>
            <span>
              {isUrdu
                ? '۱۰۰٪ آف لائن اور بلا تحریف — جنتی زیور، بہارِ شریعت اور مدارج النبوۃ کی مستند اسناد پر مبنی'
                : '100% Offline & Authenticated — Derived from Jannati Zewar, Bahar-e-Shari\'at, and Madarij-un-Nubuwwah'}
            </span>
          </div>

          {installSuccessMessage && (
            <div
              style={{
                marginTop: 10,
                backgroundColor: 'rgba(16, 185, 129, 0.2)',
                border: '1px solid #10B981',
                padding: '6px 14px',
                borderRadius: 8,
                fontSize: 12,
                color: '#D1FAE5',
              }}
            >
              ✓ {isUrdu ? 'ایپ کامیابی سے انسٹال ہو گئی!' : 'App installed successfully!'}
            </div>
          )}
        </div>
      </div>

      {/* Sticky Tab Bar */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #E5E7EB',
          position: 'sticky',
          top: 0,
          zIndex: 40,
          boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            padding: '0 16px',
            display: 'flex',
            overflowX: 'auto',
            gap: 8,
          }}
        >
          {[
            { id: 'library', icon: '📖', labelUrdu: 'کتب خانہ (۲۰ کتب)', labelEn: 'Classical Library (20 Books)' },
            { id: 'sahabiyyat', icon: '🌸', labelUrdu: 'اسوۂ صحابیات (۱۰ ہستیاں)', labelEn: 'Noble Sahabiyyat (10 Figures)' },
            { id: 'fiqh', icon: '⚖️', labelUrdu: 'احکامِ نسواں و طہارت', labelEn: 'Fiqh & Purity Guide' },
            { id: 'duas', icon: '🤲', labelUrdu: 'مائیں، حمل اور دعائیں', labelEn: 'Motherhood & Family Duas' },
            { id: 'vault', icon: '🔒', labelUrdu: 'میرا نجی گوشہ (ڈائری)', labelEn: 'Private Cycle Vault' },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id as SanctuaryTab)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '14px 18px',
                  border: 'none',
                  borderBottom: isActive ? '3px solid #064E3B' : '3px solid transparent',
                  backgroundColor: 'transparent',
                  color: isActive ? '#064E3B' : '#6B7280',
                  fontWeight: isActive ? 800 : 600,
                  fontSize: 14,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease',
                }}
              >
                <span style={{ fontSize: 16 }}>{tab.icon}</span>
                <span>{isUrdu ? tab.labelUrdu : tab.labelEn}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
