import React from 'react';
import { AmalTheme } from '@amal/ui';
import { GLOBAL_CITIES } from '../../lib/global-locations';

interface SettingsGeneralTabProps {
  appLanguage: 'en' | 'ur' | 'ar';
  setAppLanguage: (lang: 'en' | 'ur' | 'ar') => void;
  setLanguage: (lang: 'en' | 'ur' | 'ar') => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  tahajjudMode: boolean;
  setTahajjudMode: (enabled: boolean) => void;
  highContrast: boolean;
  setHighContrast: (enabled: boolean) => void;
  handleSaveGeneral: () => void;
  t: (en: string, ur: string) => string;
}

export function SettingsGeneralTab({
  appLanguage,
  setAppLanguage,
  setLanguage,
  selectedCity,
  setSelectedCity,
  tahajjudMode,
  setTahajjudMode,
  highContrast,
  setHighContrast,
  handleSaveGeneral,
  t,
}: SettingsGeneralTabProps) {
  return (
    <div>
      <h2 style={{ margin: '0 0 16px', fontSize: 20, fontWeight: 800, color: '#111827' }}>
        General & Interface Configuration
      </h2>
      <p style={{ margin: '0 0 24px', fontSize: 13, color: '#6B7280' }}>
        Manage your display language, night serenity mode, and primary location.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Language */}
        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 6 }}>
            {t('System Language', 'زبان کا انتخاب')}
          </label>
          <select
            value={appLanguage}
            onChange={(e) => {
              const val = e.target.value as ('en' | 'ur' | 'ar');
              setAppLanguage(val);
              setLanguage(val);
            }}
            style={{
              width: '100%',
              maxWidth: 360,
              padding: '10px 12px',
              borderRadius: 8,
              border: '1px solid #D1D5DB',
              fontSize: 14,
              backgroundColor: '#F9FAFB',
            }}
          >
            <option value="en">English (Global Default)</option>
            <option value="ur">اردو (Urdu)</option>
            <option value="ar">العربية (Arabic)</option>
          </select>
        </div>

        {/* Primary Location */}
        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 6 }}>
            {t('Primary Geographic City', 'شہر کا تعین')}
          </label>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            style={{
              width: '100%',
              maxWidth: 360,
              padding: '10px 12px',
              borderRadius: 8,
              border: '1px solid #D1D5DB',
              fontSize: 14,
              backgroundColor: '#F9FAFB',
            }}
          >
            {GLOBAL_CITIES.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name} ({c.country})
              </option>
            ))}
          </select>
        </div>

        {/* Theme Mode Toggles */}
        <div
          style={{
            padding: 16,
            borderRadius: 10,
            backgroundColor: '#F9FAFB',
            border: '1px solid #E5E7EB',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#111827' }}>🌙 Tahajjud OLED Dark Mode</div>
              <div style={{ fontSize: 12, color: '#6B7280' }}>Ultra-deep night serenity theme for prayer and reflection</div>
            </div>
            <input
              type="checkbox"
              checked={tahajjudMode}
              onChange={(e) => setTahajjudMode(e.target.checked)}
              style={{ width: 20, height: 20, cursor: 'pointer', accentColor: AmalTheme.colors.primary }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#111827' }}>👁️ High Contrast Typography</div>
              <div style={{ fontSize: 12, color: '#6B7280' }}>Enhanced contrast for seniors and low-vision accessibility</div>
            </div>
            <input
              type="checkbox"
              checked={highContrast}
              onChange={(e) => setHighContrast(e.target.checked)}
              style={{ width: 20, height: 20, cursor: 'pointer', accentColor: AmalTheme.colors.primary }}
            />
          </div>
        </div>

        <button
          onClick={handleSaveGeneral}
          style={{
            alignSelf: 'flex-start',
            padding: '10px 22px',
            backgroundColor: AmalTheme.colors.primary,
            color: '#FFFFFF',
            border: 'none',
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          Save General Settings
        </button>
      </div>
    </div>
  );
}
