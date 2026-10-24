import React from 'react';
import { AmalTheme } from '@amal/ui';

export type SettingsTab = 'GENERAL' | 'FIQH' | 'SCHOLARSHIP' | 'PRIVACY' | 'READER' | 'SYSTEM';

interface SettingsTabsSidebarProps {
  activeTab: SettingsTab;
  setActiveTab: (tab: SettingsTab) => void;
}

export function SettingsTabsSidebar({ activeTab, setActiveTab }: SettingsTabsSidebarProps) {
  const tabs: { key: SettingsTab; icon: string; label: string }[] = [
    { key: 'GENERAL', icon: '🌐', label: 'General & Interface' },
    { key: 'FIQH', icon: '🕋', label: 'Fiqh & Prayer Auqat' },
    { key: 'SCHOLARSHIP', icon: '📜', label: 'Scholarly Strictness & Verification' },
    { key: 'PRIVACY', icon: '🔒', label: 'Sovereign Vault & Privacy Guard' },
    { key: 'READER', icon: '📖', label: 'Quran & Reader Codex' },
    { key: 'SYSTEM', icon: '🎛️', label: 'System & Diagnostics' },
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
