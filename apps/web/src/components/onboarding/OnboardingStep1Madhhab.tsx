import React from 'react';
import { OnboardingMadhhab } from '@amal/amal-engine';
import { AmalTheme } from '@amal/ui';

export interface OnboardingStep1MadhhabProps {
  title: string;
  subtitle: string;
  nextLabel: string;
  madhhab: OnboardingMadhhab;
  setMadhhab: (m: OnboardingMadhhab) => void;
  madhhabs: { id: OnboardingMadhhab; title: string; sub: string }[];
  onNext: () => void;
}

export const OnboardingStep1Madhhab: React.FC<OnboardingStep1MadhhabProps> = ({
  title,
  subtitle,
  nextLabel,
  madhhab,
  setMadhhab,
  madhhabs,
  onNext,
}) => {
  return (
    <div>
      <h3 style={{ margin: '0 0 6px 0', fontSize: 22, color: '#1E293B', fontWeight: 800 }}>
        {title}
      </h3>
      <p style={{ margin: '0 0 20px 0', fontSize: 13, color: '#64748B', lineHeight: 1.5 }}>
        {subtitle}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
        {madhhabs.map((item) => (
          <div
            key={item.id}
            onClick={() => setMadhhab(item.id)}
            style={{
              padding: '12px 16px',
              borderRadius: 12,
              border: madhhab === item.id ? `2px solid ${AmalTheme.colors.primary}` : '1px solid #E2E8F0',
              backgroundColor: madhhab === item.id ? '#ECFDF5' : '#F8FAFC',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            <div style={{ fontSize: 15, fontWeight: 700, color: '#1E293B' }}>{item.title}</div>
            <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>{item.sub}</div>
          </div>
        ))}
      </div>

      <button
        onClick={onNext}
        style={{
          width: '100%',
          padding: 13,
          borderRadius: 10,
          backgroundColor: AmalTheme.colors.primary,
          color: '#FFFFFF',
          border: 'none',
          fontWeight: 700,
          fontSize: 14,
          cursor: 'pointer',
        }}
      >
        {nextLabel}
      </button>
    </div>
  );
};
