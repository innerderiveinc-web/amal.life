import React from 'react';
import { OnboardingTimeCommitment } from '@amal/amal-engine';
import { AmalTheme } from '@amal/ui';

export interface OnboardingStep3TimeProps {
  title: string;
  subtitle: string;
  backLabel: string;
  finishLabel: string;
  timeCommitment: OnboardingTimeCommitment;
  setTimeCommitment: (t: OnboardingTimeCommitment) => void;
  timeOptions: { id: OnboardingTimeCommitment; title: string; sub: string }[];
  onBack: () => void;
  onFinish: () => void;
}

export const OnboardingStep3Time: React.FC<OnboardingStep3TimeProps> = ({
  title,
  subtitle,
  backLabel,
  finishLabel,
  timeCommitment,
  setTimeCommitment,
  timeOptions,
  onBack,
  onFinish,
}) => {
  return (
    <div>
      <h3 style={{ margin: '0 0 6px 0', fontSize: 22, color: '#1E293B', fontWeight: 800 }}>
        {title}
      </h3>
      <p style={{ margin: '0 0 20px 0', fontSize: 13, color: '#64748B', lineHeight: 1.5 }}>
        {subtitle}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        {timeOptions.map((item) => (
          <div
            key={item.id}
            onClick={() => setTimeCommitment(item.id)}
            style={{
              padding: '14px 18px',
              borderRadius: 12,
              border: timeCommitment === item.id ? `2px solid ${AmalTheme.colors.primary}` : '1px solid #E2E8F0',
              backgroundColor: timeCommitment === item.id ? '#ECFDF5' : '#F8FAFC',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            <div style={{ fontSize: 15, fontWeight: 700, color: '#1E293B' }}>{item.title}</div>
            <div style={{ fontSize: 12, color: '#64748B', marginTop: 3 }}>{item.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        <button
          onClick={onBack}
          style={{
            flex: 1,
            padding: 12,
            borderRadius: 10,
            backgroundColor: '#F1F5F9',
            color: '#475569',
            border: 'none',
            fontWeight: 600,
            fontSize: 14,
            cursor: 'pointer',
          }}
        >
          {backLabel}
        </button>
        <button
          onClick={onFinish}
          style={{
            flex: 2,
            padding: 12,
            borderRadius: 10,
            backgroundColor: AmalTheme.colors.primary,
            color: '#FFFFFF',
            border: 'none',
            fontWeight: 700,
            fontSize: 14,
            cursor: 'pointer',
          }}
        >
          {finishLabel}
        </button>
      </div>
    </div>
  );
};
