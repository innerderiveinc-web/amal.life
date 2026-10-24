import React from 'react';
import { AmalTheme } from '@amal/ui';

interface JourneysHeaderProps {
  t: (en: string, ur: string) => string;
  statusMsg: string | null;
  onClearStatus: () => void;
}

export const JourneysHeader: React.FC<JourneysHeaderProps> = ({
  t,
  statusMsg,
  onClearStatus,
}) => {
  return (
    <>
      <header style={{ marginBottom: 28, paddingTop: 12 }}>
        <span
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: AmalTheme.colors.primary,
            letterSpacing: 1,
          }}
        >
          {t('JOURNEY ENGINE (SULUK)', 'سلوک اور اسفار')}
        </span>
        <h1
          style={{
            fontSize: 30,
            fontWeight: 800,
            margin: '6px 0 0',
            color: AmalTheme.colors.text.primaryLight,
          }}
        >
          {t('Structured Spiritual Journeys', 'منظم روحانی اسفار')}
        </h1>
        <p
          style={{
            color: AmalTheme.colors.text.secondaryLight,
            fontSize: 14,
            marginTop: 4,
            lineHeight: 1.5,
          }}
        >
          {t(
            'Evidence-backed, day-by-day micro-actions. If life causes friction, reset with a fresh Niyyah—there is zero shame, only gentle continuity.',
            'نبوی سنت پر مبنی روزمرہ اعمال۔ کسی رکاوٹ کی صورت میں بغیر احساس ندامت نئی نیت کے ساتھ دوبارہ آغاز کریں؛ یہاں شرمندگی نہیں بلکہ رحمت اور استقامت ہے۔'
          )}
        </p>
      </header>

      {statusMsg && (
        <div
          style={{
            padding: '12px 16px',
            backgroundColor: '#E8F5E9',
            color: '#1B5E20',
            borderRadius: 10,
            marginBottom: 24,
            fontSize: 14,
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span>✓ {statusMsg}</span>
          <button
            onClick={onClearStatus}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: 16,
              color: '#1B5E20',
            }}
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
};
