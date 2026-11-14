import React from 'react';
import { AmalTheme } from '@amal/ui';
import { useLanguage } from '../../context/LanguageContext';

export type SettingsTab = 'GENERAL' | 'FIQH' | 'SCHOLARSHIP' | 'PRIVACY' | 'READER' | 'SYSTEM';

interface SettingsTabsSidebarProps {
  activeTab: SettingsTab;
  setActiveTab: (tab: SettingsTab) => void;
}

export function SettingsTabsSidebar({ activeTab, setActiveTab }: SettingsTabsSidebarProps) {
  const { t } = useLanguage();
  const tabs: { key: SettingsTab; icon: string; label: string }[] = [
    { key: 'GENERAL', icon: '🌐', label: t('General & Interface', 'عمومی ترتیبات', 'الإعدادات العامة والواجهة', 'General & Interface') },
    { key: 'FIQH', icon: '🕋', label: t('Fiqh & Prayer Auqat', 'فقہی احکام و اوقات', 'الفقه ومواقيت الصلاة', 'Fiqh & Namaz ke Auqat') },
    { key: 'SCHOLARSHIP', icon: '📜', label: t('Scholarly Strictness & Verification', 'تحقیقی و علمی اصول', 'التدقيق العلمي والمعايير', 'Scholarly Strictness') },
    { key: 'PRIVACY', icon: '🔒', label: t('Sovereign Vault & Privacy Guard', 'محفوظ والٹ و پرائیویسی', 'الخزينة والخصوصية', 'Personal Vault & Privacy') },
    { key: 'READER', icon: '📖', label: t('Quran & Reader Codex', 'قرآن و مطالعہ کوڈیکس', 'المصحف وإعدادات القراءة', 'Quran & Reader Codex') },
    { key: 'SYSTEM', icon: '🎛️', label: t('System & Diagnostics', 'سسٹم و ڈائیگنوسٹکس', 'النظام والتشخيص', 'System & Diagnostics') },
  ];

  return (
    <div
      className="settings-tabs-container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        padding: 12,
        border: `1px solid ${AmalTheme.colors.surface.borderLight}`,
        height: 'fit-content',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      }}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '12px 14px',
              borderRadius: 8,
              border: 'none',
              textAlign: 'left',
              fontSize: 14,
              fontWeight: 700,
              cursor: 'pointer',
              backgroundColor: isActive ? '#F0FDF4' : 'transparent',
              color: isActive ? AmalTheme.colors.primary : '#374151',
              borderLeft: isActive ? `4px solid ${AmalTheme.colors.primary}` : '4px solid transparent',
              transition: 'all 0.15s ease',
            }}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
