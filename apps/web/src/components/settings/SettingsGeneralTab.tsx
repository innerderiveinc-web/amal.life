import React from 'react';
import { AmalTheme } from '@amal/ui';
import { GLOBAL_CITIES } from '../../lib/global-locations';
import { useTheme, SACRED_THEMES, SacredTheme } from '../../context/ThemeContext';

interface SettingsGeneralTabProps {
  appLanguage: 'en' | 'ur' | 'ar' | 'roman';
  setAppLanguage: (lang: 'en' | 'ur' | 'ar' | 'roman') => void;
  setLanguage: (lang: 'en' | 'ur' | 'ar' | 'roman') => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  tahajjudMode: boolean;
  setTahajjudMode: (enabled: boolean) => void;
  highContrast: boolean;
  setHighContrast: (enabled: boolean) => void;
  handleSaveGeneral: () => void;
  t: (en: string, ur?: string, ar?: string, roman?: string) => string;
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
  const { theme, setTheme } = useTheme();
  return (
    <div>
      <h2 style={{ margin: '0 0 16px', fontSize: 20, fontWeight: 800, color: '#111827' }}>
        {t('General & Interface Configuration', 'عمومی ترتیبات و انٹرفیس', 'إعدادات الواجهة العامة', 'General & Interface Configuration')}
      </h2>
      <p style={{ margin: '0 0 24px', fontSize: 13, color: '#6B7280' }}>
        {t('Manage your display language, night serenity mode, and primary location.', 'زبان، نائٹ موڈ اور اپنے بنیادی شہر کا انتخاب کریں۔', 'إدارة لغة العرض، الوضع الليلي، والموقع الجغرافي.', 'Zaban, dark mode aur apna shehar select karein.')}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* System Language */}
        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 6 }}>
            {t('System Language', 'زبان کا انتخاب', 'لغة النظام', 'System Language')}
          </label>
          <select
            value={appLanguage}
            onChange={(e) => {
              const val = e.target.value as ('en' | 'ur' | 'ar' | 'roman');
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
            <option value="en">{t('English (Global Default)', 'انگریزی (عالمی طے شدہ)', 'الإنجليزية (الافتراضي عالمياً)', 'English (Global Default)')}</option>
            <option value="ur">اردو (Urdu)</option>
            <option value="ar">العربية (Arabic)</option>
            <option value="roman">{t('Roman Urdu', 'رومن اردو', 'الرومانية الأردية', 'Roman Urdu')}</option>
          </select>
        </div>

        {/* Sacred Islamic Aesthetics */}
        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 8 }}>
            {t('Sacred Islamic Aesthetic & Visual Theme', 'اسلامی ثقافتی و روایتی تھیمز', 'المظهر والسمات الجمالية الإسلامية', 'Sacred Islamic Visual Theme')}
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
            {(Object.keys(SACRED_THEMES) as SacredTheme[]).map((key) => {
              const meta = SACRED_THEMES[key];
              const isSelected = theme === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setTheme(key)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    padding: 12,
                    borderRadius: 10,
                    border: isSelected ? '2px solid #D4AF37' : '1px solid #E5E7EB',
                    backgroundColor: isSelected ? 'rgba(212, 175, 55, 0.08)' : '#FFFFFF',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.15s ease',
                    boxShadow: isSelected ? '0 0 10px rgba(212, 175, 55, 0.25)' : 'none',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', marginBottom: 6 }}>
                    <span
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: '50%',
                        backgroundColor: meta.primaryColor,
                        border: `2px solid ${meta.accentGold}`,
                        display: 'inline-block',
                        flexShrink: 0,
                      }}
                    />
                    <strong style={{ fontSize: 13, color: isSelected ? '#111827' : '#374151', flex: 1 }}>
                      {appLanguage === 'ur' ? meta.nameUrdu : appLanguage === 'ar' ? meta.nameArabic : meta.nameEnglish}
                    </strong>
                    {isSelected && <span style={{ color: '#D4AF37', fontSize: 12, fontWeight: 800 }}>✓</span>}
                  </div>
                  <span style={{ fontSize: 11, color: '#6B7280', lineHeight: 1.3 }}>
                    {meta.descriptionEn}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Primary Location */}
        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 6 }}>
            {t('Primary Geographic City', 'شہر کا تعین', 'المدينة الرئيسية', 'Primary City')}
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
              <div style={{ fontSize: 14, fontWeight: 700, color: '#111827' }}>
                {t('🌙 Tahajjud OLED Dark Mode', '🌙 تہجد گہرا شبینہ موڈ', '🌙 وضع التهجد الليلي فائق السواد', '🌙 Tahajjud OLED Dark Mode')}
              </div>
              <div style={{ fontSize: 12, color: '#6B7280' }}>
                {t('Ultra-deep night serenity theme for prayer and reflection', 'رات کی عبادات اور غور و فکر کے لیے ڈارک موڈ', 'الوضع الليلي الهادئ للعبادة والتأمل', 'Night time ibadat aur reflection ke liye serene dark mode')}
              </div>
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
              <div style={{ fontSize: 14, fontWeight: 700, color: '#111827' }}>
                {t('👁️ High Contrast Typography', '👁️ واضح ترین تحریر (ہائی کنٹراسٹ)', '👁️ تباين عالي للنصوص', '👁️ High Contrast Typography')}
              </div>
              <div style={{ fontSize: 12, color: '#6B7280' }}>
                {t('Enhanced contrast for seniors and low-vision accessibility', 'بزرگوں اور کمزور بینائی والے صارفین کے لیے واضح ترین فونٹ', 'تحسين الرؤية لكبار السن وضعاف البصر', 'Behtar visibility aur asani se padhne ke liye high contrast')}
              </div>
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
          {t('Save General Settings', 'ترتیبات محفوظ کریں', 'حفظ الإعدادات العامة', 'Save General Settings')}
        </button>
      </div>
    </div>
  );
}
