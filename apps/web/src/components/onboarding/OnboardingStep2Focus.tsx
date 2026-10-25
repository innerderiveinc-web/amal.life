import React from 'react';
import { OnboardingFocus } from '@amal/amal-engine';
import { AmalTheme } from '@amal/ui';

export interface OnboardingStep2FocusProps {
  title: string;
  subtitle: string;
  backLabel: string;
  nextLabel: string;
  focus: OnboardingFocus;
  setFocus: (f: OnboardingFocus) => void;
  focusOptions: { id: OnboardingFocus; icon: string; title: string; desc: string }[];
  onBack: () => void;
  onNext: () => void;
}

export const OnboardingStep2Focus: React.FC<OnboardingStep2FocusProps> = ({
  title,
  subtitle,
  backLabel,
  nextLabel,
  focus,
  setFocus,
  focusOptions,
  onBack,
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

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12, marginBottom: 24 }}>
        {focusOptions.map((item) => (
          <div
            key={item.id}
            onClick={() => setFocus(item.id)}
            style={{
              padding: 16,
              borderRadius: 12,
              border: focus === item.id ? `2px solid ${AmalTheme.colors.primary}` : '1px solid #E2E8F0',
              backgroundColor: focus === item.id ? '#ECFDF5' : '#F8FAFC',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            <div style={{ fontSize: 26, marginBottom: 8 }}>{item.icon}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#1E293B' }}>{item.title}</div>
            <div style={{ fontSize: 12, color: '#64748B', marginTop: 4, lineHeight: 1.4 }}>{item.desc}</div>
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
          onClick={onNext}
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
          {nextLabel}
        </button>
      </div>
    </div>
  );
};
