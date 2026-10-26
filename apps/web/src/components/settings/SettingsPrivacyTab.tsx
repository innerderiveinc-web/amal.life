import React from 'react';
import { AmalTheme } from '@amal/ui';
import { VaultSecurityMode } from '@amal/amal-engine';

interface SettingsPrivacyTabProps {
  securityMode: VaultSecurityMode;
  setSecurityMode: (mode: VaultSecurityMode) => void;
  pin: string;
  setPin: (pin: string) => void;
  zeroKnowledgeSync: boolean;
  setZeroKnowledgeSync: (val: boolean) => void;
  handleSavePrivacy: () => void;
  handleExportData: () => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleRestoreFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleResetAllData: () => void;
}

export function SettingsPrivacyTab({
  securityMode,
  setSecurityMode,
  pin,
  setPin,
  zeroKnowledgeSync,
  setZeroKnowledgeSync,
  handleSavePrivacy,
  handleExportData,
  fileInputRef,
  handleRestoreFile,
  handleResetAllData,
}: SettingsPrivacyTabProps) {
  return (
    <div>
      <h2 style={{ margin: '0 0 16px', fontSize: 20, fontWeight: 800, color: '#111827' }}>
        Sovereign Vault & Privacy Guard
      </h2>
      <p style={{ margin: '0 0 24px', fontSize: 13, color: '#6B7280' }}>
        Protect your spiritual journals, private reflections, and personal du'as with hardware-backed encryption.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 6 }}>
            Vault Authentication Mode
          </label>
          <select
            value={securityMode}
            onChange={(e) => setSecurityMode(e.target.value as VaultSecurityMode)}
            style={{
              width: '100%',
              maxWidth: 420,
              padding: '10px 12px',
              borderRadius: 8,
              border: '1px solid #D1D5DB',
              fontSize: 14,
              backgroundColor: '#F9FAFB',
            }}
          >
            <option value="FOUR_DIGIT_PIN">4-Digit Sovereign PIN Code</option>
            <option value="BIOMETRIC_FACE_ID">Biometric FaceID / TouchID</option>
            <option value="BIOMETRIC_FINGERPRINT">Biometric Fingerprint Scanner</option>
            <option value="DISABLED">Open Access (Disabled)</option>
          </select>
        </div>

        {securityMode === 'FOUR_DIGIT_PIN' && (
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 6 }}>
              Set 4-Digit Vault PIN
            </label>
            <input
              type="password"
              maxLength={6}
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              style={{
                width: 140,
                padding: '10px 12px',
                borderRadius: 8,
                border: '1px solid #D1D5DB',
                fontSize: 16,
                textAlign: 'center',
                letterSpacing: 4,
                fontWeight: 800,
              }}
            />
          </div>
        )}

        <div
          style={{
            padding: 16,
            borderRadius: 10,
            backgroundColor: '#F9FAFB',
            border: '1px solid #E5E7EB',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#111827' }}>
              🛡️ Zero-Knowledge Client-Side Encryption
            </div>
            <div style={{ fontSize: 12, color: '#6B7280' }}>
              Your reflections and goals are encrypted locally before any network synchronization.
            </div>
          </div>
          <input
            type="checkbox"
            checked={zeroKnowledgeSync}
            onChange={(e) => setZeroKnowledgeSync(e.target.checked)}
            style={{ width: 20, height: 20, cursor: 'pointer', accentColor: AmalTheme.colors.primary }}
          />
        </div>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 10 }}>
          <button
            onClick={handleSavePrivacy}
            style={{
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
            Save Vault Preferences
          </button>

          <button
            onClick={handleExportData}
            style={{
              padding: '10px 18px',
              backgroundColor: '#EFF6FF',
              color: '#1D4ED8',
              border: '1px solid #BFDBFE',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            📦 Export Sovereign Data (JSON)
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleRestoreFile}
            style={{ display: 'none' }}
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            style={{
              padding: '10px 18px',
              backgroundColor: '#ECFDF5',
              color: '#065F46',
              border: '1px solid #A7F3D0',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            📥 Restore Sovereign Data (JSON)
          </button>

          <button
            onClick={handleResetAllData}
            style={{
              padding: '10px 18px',
              backgroundColor: '#FEF2F2',
              color: '#DC2626',
              border: '1px solid #FECACA',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            ⚠️ Wipe All Local Data
          </button>
        </div>
      </div>
    </div>
  );
}
