import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export type SanctuaryTab = 'library' | 'sahabiyyat' | 'fiqh' | 'duas' | 'vault';

interface SistersHeaderProps {
  activeTab: SanctuaryTab;
  onSelectTab: (tab: SanctuaryTab) => void;
  hasPinConfigured: boolean;
  onInstallPWA: () => void;
  onOpenVault: () => void;
  isUrdu?: boolean;
  installSuccessMessage: boolean;
}

export function SistersHeader({
  activeTab,
  onSelectTab,
  hasPinConfigured,
  onInstallPWA,
  onOpenVault,
  installSuccessMessage,
}: SistersHeaderProps) {
  const { isUrdu, isArabic, t } = useLanguage();

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
                  {t(
                    'Ahl al-Sunnah Classical Canon',
                    'اہل سنت و جماعت کی مستند کتب و اسوہ',
                    'المكتبة التراثية المعتمدة لأهل السنة',
                    'Ahl al-Sunnah ki Mustanad Kutub wa Uswah'
                  )}
                </span>
                <h1
                  style={{
                    margin: 0,
                    fontSize: isUrdu || isArabic ? 28 : 24,
                    fontWeight: 800,
                    letterSpacing: isUrdu || isArabic ? 0 : '-0.02em',
                    color: '#FFFFFF',
                  }}
                >
                  {t(
                    'Amal Nisa — The Sisters Sanctuary',
                    'گوشۂ خواتین و صحابیات (عمل نساء)',
                    'واحة المرأة المسلمة والصحابيات (عمل نساء)',
                    'Gosha-e-Khawateen wa Sahabiyyat (Amal Nisa)'
                  )}
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
                <span>
                  {t(
                    'Install Standalone App',
                    'موبائل ایپ انسٹال کریں',
                    'تثبيت التطبيق المستقل',
                    'Mobile App Install Karein'
                  )}
                </span>
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
                    ? t('PIN Protected', 'نجی پن فعال ہے', 'محمي برمز المرور', 'PIN Protected (Fa\'al Hai)')
                    : t('Setup PIN Lock', 'پن لاک لگائیں', 'إعداد رمز المرور', 'PIN Lock Lagayein')}
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
            {t(
              'A comprehensive, sovereign digital sanctuary for Muslim women featuring 20 Classical Sunni Masterworks, biographies of the Sahabiyyat, Hanafi Purity & Fiqh guide, and family prayers.',
              'خواتینِ اسلام کے لیے ۲۰ مستند کتب، ۱۰ جلیل القدر صحابیات کے نقوشِ حیات، فقہ حنفی اور بہارِ شریعت کے مطابق احکامِ طہارت، اور روزمرہ مسنون دعاؤں کا مکمل آف لائن دائرۃ المعارف۔',
              'موسوعة إسلامية شاملة وموثقة للمرأة المسلمة: ٢٠ كتاباً من أمهات الكتب، وسير الصحابيات، وأحكام الطهارة، والأدعية الأسرية.',
              'Khawateen-e-Islam ke liye 20 mustanad kutub, 10 jaleel-ul-qadr Sahabiyyat ke nuqoosh-e-hayat, Fiqh Hanafi aur Bahar-e-Shari\'at ke mutabiq ahkam-e-taharah, aur rozmarrah masnoon duaon ka mukammal offline encyclopedia.'
            )}
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
              {t(
                '100% Offline & Authenticated — Derived from Jannati Zewar, Bahar-e-Shari\'at, and Madarij-un-Nubuwwah',
                '۱۰۰٪ آف لائن اور بلا تحریف — جنتی زیور، بہارِ شریعت اور مدارج النبوۃ کی مستند اسناد پر مبنی',
                '١٠٠٪ دون اتصال وموثق — مستمد من جنة الزيور وبهار شريعت ومدارج النبوة',
                '100% Offline wa Mustanad — Jannati Zewar, Bahar-e-Shari\'at aur Madarij-un-Nubuwwah se makhooz'
              )}
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
              ✓ {t('App installed successfully!', 'ایپ کامیابی سے انسٹال ہو گئی!', 'تم تثبيت التطبيق بنجاح!', 'App kamyabi se install ho gayi!')}
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
            {
              id: 'library',
              icon: '📖',
              label: t('Classical Library (20 Books)', 'کتب خانہ (۲۰ کتب)', 'المكتبة المعتمدة (٢٠ كتاباً)', 'Kutub Khana (20 Kutub)'),
            },
            {
              id: 'sahabiyyat',
              icon: '🌸',
              label: t('Noble Sahabiyyat (10 Figures)', 'اسوۂ صحابیات (۱۰ ہستیاں)', 'أسوة الصحابيات (١٠ شخصيات)', 'Uswah-e-Sahabiyyat (10 Hastiyan)'),
            },
            {
              id: 'fiqh',
              icon: '⚖️',
              label: t('Fiqh & Purity Guide', 'احکامِ نسواں و طہارت', 'أحكام الفقه والطهارة', 'Ahkam-e-Niswan wa Taharah'),
            },
            {
              id: 'duas',
              icon: '🤲',
              label: t('Motherhood & Family Duas', 'مائیں، حمل اور دعائیں', 'أدعية الأمهات والأسرة', 'Maaen, Hamal aur Duayein'),
            },
            {
              id: 'vault',
              icon: '🔒',
              label: t('Private Cycle Vault', 'میرا نجی گوشہ (ڈائری)', 'الخزانة الخاصة بي', 'Mera Niji Gosha (Vault)'),
            },
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
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
