import React from 'react';
import { AzaanSettings, AzaanSoundType } from '../../lib/azaan-audio';

interface PrayerAzaanBarProps {
  azaanSettings: AzaanSettings;
  isPlayingAzaan: boolean;
  handleSoundTypeChange: (type: AzaanSoundType) => void;
  handleTestPlayAzaan: () => void;
  handleToggleAzaan: () => void;
  handleRequestBrowserNotification: () => void;
  t: (en: string, ur: string) => string;
}

export function PrayerAzaanBar({
  azaanSettings,
  isPlayingAzaan,
  handleSoundTypeChange,
  handleTestPlayAzaan,
  handleToggleAzaan,
  handleRequestBrowserNotification,
  t,
}: PrayerAzaanBarProps) {
  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: '16px 20px',
        border: '1px solid #E5E7EB',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 16,
        marginBottom: 20,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 26 }}>📢</span>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontWeight: 800, color: '#1B4332', fontSize: 15 }}>
              {t('Azaan Audio & Prayer Alerts', 'اذان آڈیو و الرٹس')}
            </span>
            <span
              style={{
                fontSize: 10,
                fontWeight: 800,
                padding: '2px 8px',
                borderRadius: 10,
                backgroundColor: azaanSettings.enabled ? '#DCFCE7' : '#F1F5F9',
                color: azaanSettings.enabled ? '#166534' : '#64748B',
              }}
            >
              {azaanSettings.enabled ? 'ACTIVE 🔊' : 'MUTED 🔇'}
            </span>
          </div>
          <div style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>
            Web Audio synthesizer generates sacred Bayati melodic call when each Salah enters.
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        <select
          value={azaanSettings.soundType}
          onChange={(e) => handleSoundTypeChange(e.target.value as AzaanSoundType)}
          style={{
            padding: '8px 12px',
            borderRadius: 8,
            border: '1px solid #D1D5DB',
            fontSize: 13,
            backgroundColor: '#F9FAFB',
            fontWeight: 600,
          }}
        >
          <option value="BAYATI_CALL">{t('Maqam Bayati Sacred Call', 'مقام بیاتی اذان')}</option>
          <option value="MECCA_TONE">Haram Makkah Reverberant Tone</option>
          <option value="TAKBEER_CHIME">Gentle 3-Tone Takbeer Chime</option>
        </select>

        <button
          onClick={handleTestPlayAzaan}
          disabled={isPlayingAzaan}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '8px 14px',
            borderRadius: 8,
            backgroundColor: '#ECFDF5',
            color: '#047857',
            border: '1px solid #A7F3D0',
            fontWeight: 700,
            fontSize: 13,
            cursor: 'pointer',
          }}
        >
          <span>{isPlayingAzaan ? '⏳' : '▶'}</span>
          <span>{isPlayingAzaan ? 'Playing...' : 'Test Sound'}</span>
        </button>

        <button
          onClick={handleToggleAzaan}
          style={{
            padding: '8px 14px',
            borderRadius: 8,
            backgroundColor: azaanSettings.enabled ? '#FEF2F2' : '#F0FDF4',
            color: azaanSettings.enabled ? '#B91C1C' : '#15803D',
            border: azaanSettings.enabled ? '1px solid #FECACA' : '1px solid #BBF7D0',
            fontWeight: 700,
            fontSize: 13,
            cursor: 'pointer',
          }}
        >
          {azaanSettings.enabled ? 'Mute' : 'Enable Audio'}
        </button>

        <button
          onClick={handleRequestBrowserNotification}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '8px 14px',
            borderRadius: 8,
            backgroundColor: '#1B4332',
            color: '#FFFFFF',
            border: 'none',
            fontWeight: 700,
            fontSize: 13,
            cursor: 'pointer',
          }}
        >
          <span>🔔</span>
          <span>Push Alerts</span>
        </button>
      </div>
    </div>
  );
}
