import React from 'react';
import { LifeOsMode, LifeOsModeProfile } from '@amal/amal-engine';

export interface LifeOsModeBarProps {
  currentMode: LifeOsMode;
  modeProfile: LifeOsModeProfile;
  onSwitchMode: (mode: LifeOsMode) => void;
}

export const LifeOsModeBar: React.FC<LifeOsModeBarProps> = ({
  currentMode,
  modeProfile,
  onSwitchMode,
}) => {
  return (
    <>
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 14,
          padding: '12px 18px',
          border: '1px solid #E2E8F0',
          marginBottom: 24,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12,
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.02)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#475569' }}>
            حالتِ زندگی · Life Context:
          </span>
          <div
            style={{
              display: 'flex',
              gap: 4,
              backgroundColor: '#F1F5F9',
              padding: 3,
              borderRadius: 10,
              border: '1px solid #E2E8F0',
            }}
          >
            {(['STANDARD', 'TRAVEL', 'EXAMS_WORK_CRUNCH', 'NEW_PARENT'] as const).map((m) => (
              <button
                key={m}
                onClick={() => onSwitchMode(m)}
                aria-label={`Switch to ${m} mode`}
                style={{
                  padding: '6px 14px',
                  borderRadius: 8,
                  fontSize: 12,
                  fontWeight: currentMode === m ? 700 : 500,
                  cursor: 'pointer',
                  border: 'none',
                  backgroundColor: currentMode === m ? '#FFFFFF' : 'transparent',
                  color: currentMode === m ? '#064E3B' : '#64748B',
                  boxShadow: currentMode === m ? '0 2px 4px rgba(0, 0, 0, 0.06)' : 'none',
                  transition: 'all 0.15s ease',
                }}
              >
                {m === 'STANDARD'
                  ? 'معمول (Daily)'
                  : m === 'TRAVEL'
                  ? '✈️ سفر (Travel)'
                  : m === 'EXAMS_WORK_CRUNCH'
                  ? '📚 امتحانات (Focus)'
                  : '👶 والدینیت (Parent)'}
              </button>
            ))}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 12,
            color: '#047857',
            fontWeight: 700,
            backgroundColor: '#ECFDF5',
            padding: '5px 14px',
            borderRadius: 20,
            border: '1px solid #A7F3D0',
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              backgroundColor: '#10B981',
              display: 'inline-block',
            }}
          />
          <span>
            {modeProfile.modeDisplayNameUrdu} · {modeProfile.modeDisplayName}
          </span>
        </div>
      </div>

      {/* Mode Guidance Alert (If non-standard) */}
      {currentMode !== 'STANDARD' && (
        <div
          style={{
            backgroundColor: '#F0FDF4',
            borderRadius: 12,
            padding: 16,
            border: '1px solid #86EFAC',
            marginBottom: 24,
          }}
        >
          <div style={{ fontWeight: 700, fontSize: 14, color: '#166534', marginBottom: 4 }}>
            Active Life Dispensations &amp; Focus ({modeProfile.modeDisplayName})
          </div>
          <p style={{ margin: '0 0 8px', fontSize: 13, color: '#14532D' }}>
            {modeProfile.activeGuidanceNote}
          </p>
          <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12, color: '#166534', lineHeight: 1.5 }}>
            {modeProfile.rukhasDispensations.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};
