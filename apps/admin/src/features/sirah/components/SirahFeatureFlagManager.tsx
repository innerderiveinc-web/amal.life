import React, { useState } from 'react';
import { SirahFeatureFlags } from '@amal/types';
import { AmalTheme } from '@amal/ui';

interface SirahFeatureFlagManagerProps {
  initialFlags?: SirahFeatureFlags;
  onSaveFlags?: (flags: SirahFeatureFlags) => void;
}

export const SirahFeatureFlagManager: React.FC<SirahFeatureFlagManagerProps> = ({
  initialFlags,
  onSaveFlags,
}) => {
  const [flags, setFlags] = useState<SirahFeatureFlags>(initialFlags || {
    SIRAH_ENABLED: true,
    SIRAH_INGESTION_ENABLED: true,
    SIRAH_RETRIEVAL_ENABLED: true,
    SIRAH_AI_ENABLED: true,
    SIRAH_AMAL_MAPPING_ENABLED: true,
    SIRAH_TIMELINE_EXPLORER_ENABLED: true,
    SIRAH_SHAMAIL_EXPLORER_ENABLED: true,
    SIRAH_VARIANT_DIFF_ENABLED: true,
    SIRAH_SCHOLAR_WORKFLOW_ENABLED: true,
    SIRAH_AUDIT_LOGGING_STRICT: true,
  });

  const toggleFlag = (key: keyof SirahFeatureFlags) => {
    const updated = { ...flags, [key]: !flags[key] };
    setFlags(updated);
    onSaveFlags?.(updated);
  };

  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      borderRadius: 14,
      padding: 24,
      border: `1px solid ${AmalTheme.colors.surface.borderLight}`,
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>
            Sirah & Shama'il Feature Flags & Kill-Switches
          </h3>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: '#666' }}>
            Instant platform-level toggles conforming to Section 55 Feature Flag Specification.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
        {Object.entries(flags).map(([key, enabled]) => (
          <div
            key={key}
            style={{
              padding: 14,
              borderRadius: 10,
              backgroundColor: '#FAFAFA',
              border: '1px solid #EEE',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#333' }}>{key}</div>
              <div style={{ fontSize: 11, color: enabled ? '#2E7D32' : '#C62828' }}>
                {enabled ? 'Active / Operational' : 'Disabled / Intercepted'}
              </div>
            </div>
            <button
              onClick={() => toggleFlag(key as keyof SirahFeatureFlags)}
              style={{
                padding: '6px 14px',
                borderRadius: 8,
                border: 'none',
                backgroundColor: enabled ? '#2E7D32' : '#C62828',
                color: '#FFF',
                fontWeight: 700,
                fontSize: 12,
                cursor: 'pointer',
              }}
            >
              {enabled ? 'ENABLED' : 'DISABLED'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
