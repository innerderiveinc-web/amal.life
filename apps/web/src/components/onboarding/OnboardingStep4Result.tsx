import React from 'react';
import { StarterPlan } from '@amal/amal-engine';
import { AmalTheme } from '@amal/ui';

export type SupportedLanguage = 'EN' | 'UR' | 'AR';

export interface OnboardingStep4ResultProps {
  lang: SupportedLanguage;
  generatedPlan: StarterPlan;
  enterOsLabel: string;
  onClose: () => void;
}

export const OnboardingStep4Result: React.FC<OnboardingStep4ResultProps> = ({
  lang,
  generatedPlan,
  enterOsLabel,
  onClose,
}) => {
  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <span style={{ fontSize: 44 }}>✨</span>
        <h3 style={{ margin: '8px 0 4px 0', fontSize: 22, color: '#1E293B', fontWeight: 800 }}>
          {lang === 'EN'
            ? 'Mabrook! Your Spiritual Sanctuary is Ready'
            : lang === 'UR'
            ? 'مبارک ہو! آپ کا ذاتی دینی مسکن تیار ہے'
            : 'مبارك! مسارك الإيماني المخصص جاهز الآن'}
        </h3>
        <p style={{ margin: 0, fontSize: 13, color: '#059669', fontWeight: 600 }}>
          {generatedPlan.orientationTitleEnglish}
        </p>
      </div>

      <div
        style={{
          backgroundColor: '#F8FAFC',
          borderRadius: 12,
          padding: 18,
          border: '1px solid #E2E8F0',
          marginBottom: 20,
        }}
      >
        <div style={{ fontSize: 13, color: '#334155', lineHeight: 1.6, marginBottom: 12 }}>
          {lang === 'EN' ? generatedPlan.orientationTitleEnglish : generatedPlan.recommendedDailyMamoolUrdu}
        </div>

        <div style={{ fontSize: 13, fontWeight: 700, color: '#0F766E', marginBottom: 8 }}>
          {lang === 'EN'
            ? 'First 7 Days Gentle Sunnah Plan:'
            : lang === 'UR'
            ? 'پہلے ۷ دن کا آسان مسنون شیڈول:'
            : 'خطة الأيام السبعة الأولى من السنة:'}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxHeight: 160, overflowY: 'auto' }}>
          {generatedPlan.firstSevenDaysJourney.map((d) => (
            <div key={d.day} style={{ fontSize: 12, color: '#475569', display: 'flex', gap: 6 }}>
              <span style={{ fontWeight: 700, color: AmalTheme.colors.primary }}>
                {lang === 'EN' ? `Day ${d.day}:` : lang === 'UR' ? `دن ${d.day}:` : `اليوم ${d.day}:`}
              </span>
              <span>
                {d.titleUrdu} — {d.microAmalUrdu}
              </span>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={onClose}
        style={{
          width: '100%',
          padding: 14,
          borderRadius: 10,
          backgroundColor: AmalTheme.colors.primary,
          color: '#FFFFFF',
          border: 'none',
          fontWeight: 700,
          fontSize: 15,
          cursor: 'pointer',
        }}
      >
        {enterOsLabel}
      </button>
    </div>
  );
};
