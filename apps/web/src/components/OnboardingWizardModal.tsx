import React, { useState } from 'react';
import {
  OnboardingWizardEngine,
  OnboardingMadhhab,
  OnboardingFocus,
  OnboardingTimeCommitment,
  StarterPlan,
} from '@amal/amal-engine';
import { AmalTheme } from '@amal/ui';
import {
  getOnboardingLocalization,
  getMadhhabsList,
  getFocusOptionsList,
  getTimeOptionsList,
} from './onboarding/onboarding-data';
import { OnboardingStep1Madhhab } from './onboarding/OnboardingStep1Madhhab';
import { OnboardingStep2Focus } from './onboarding/OnboardingStep2Focus';
import { OnboardingStep3Time } from './onboarding/OnboardingStep3Time';
import { OnboardingStep4Result } from './onboarding/OnboardingStep4Result';

export interface OnboardingWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: (plan: StarterPlan) => void;
}

export type SupportedLanguage = 'EN' | 'UR' | 'AR';

export const OnboardingWizardModal: React.FC<OnboardingWizardModalProps> = ({
  isOpen,
  onClose,
  onComplete,
}) => {
  const [lang, setLang] = useState<SupportedLanguage>('EN');
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [madhhab, setMadhhab] = useState<OnboardingMadhhab>('HANAFI');
  const [focus, setFocus] = useState<OnboardingFocus>('SALAH_DISCIPLINE');
  const [timeCommitment, setTimeCommitment] = useState<OnboardingTimeCommitment>('15_MINS');
  const [generatedPlan, setGeneratedPlan] = useState<StarterPlan | null>(null);

  if (!isOpen) return null;

  const handleLanguageChange = (newLang: SupportedLanguage) => {
    setLang(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('amal_app_language', newLang);
    }
  };

  const handleFinish = () => {
    const plan = OnboardingWizardEngine.generateStarterPlan({ madhhab, focus, timeCommitment });
    setGeneratedPlan(plan);
    setStep(4);
    if (typeof window !== 'undefined') {
      localStorage.setItem('amal_user_profile', JSON.stringify({ madhhab, focus, timeCommitment, lang }));
      localStorage.setItem('amal_onboarding_done', 'true');
    }
    onComplete?.(plan);
  };

  const isRTL = lang === 'UR' || lang === 'AR';
  const t = getOnboardingLocalization(lang, step);
  const madhhabs = getMadhhabsList(lang);
  const focusOptions = getFocusOptionsList(lang);
  const timeOptions = getTimeOptionsList(lang);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(6px)',
        zIndex: 10002,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: isRTL ? (lang === 'UR' ? 'var(--font-urdu), serif' : 'var(--font-arabic), serif') : 'var(--font-sans), sans-serif',
      }}
      onClick={onClose}
    >
      <div
        dir={isRTL ? 'rtl' : 'ltr'}
        style={{
          width: '94%',
          maxWidth: 620,
          backgroundColor: '#FFFFFF',
          borderRadius: 20,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          padding: '28px 32px',
          border: '1px solid #E2E8F0',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header: Step Indicator, Language Selector & Close Button */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: AmalTheme.colors.primary }}>
            {t.stepLabel}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {/* 3-Language Instant Switcher Pills */}
            <div
              style={{
                display: 'flex',
                backgroundColor: '#F1F5F9',
                borderRadius: 20,
                padding: '2px 4px',
                border: '1px solid #E2E8F0',
              }}
            >
              {(['EN', 'UR', 'AR'] as SupportedLanguage[]).map((l) => (
                <button
                  key={l}
                  onClick={() => handleLanguageChange(l)}
                  style={{
                    border: 'none',
                    background: lang === l ? '#1B4332' : 'transparent',
                    color: lang === l ? '#FFFFFF' : '#475569',
                    borderRadius: 16,
                    padding: '4px 10px',
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {l === 'EN' ? '🇬🇧 English' : l === 'UR' ? '🇵🇰 اردو' : '🇸🇦 العربية'}
                </button>
              ))}
            </div>

            <button
              onClick={onClose}
              style={{
                background: 'transparent',
                border: 'none',
                fontSize: 18,
                cursor: 'pointer',
                color: '#94A3B8',
                padding: '4px 8px',
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* STEP 1: Madhhab Selection */}
        {step === 1 && (
          <OnboardingStep1Madhhab
            title={t.step1Title}
            subtitle={t.step1Subtitle}
            nextLabel={t.nextToFocus}
            madhhab={madhhab}
            setMadhhab={setMadhhab}
            madhhabs={madhhabs}
            onNext={() => setStep(2)}
          />
        )}

        {/* STEP 2: Spiritual Focus */}
        {step === 2 && (
          <OnboardingStep2Focus
            title={t.step2Title}
            subtitle={t.step2Subtitle}
            backLabel={t.backBtn}
            nextLabel={t.nextToTime}
            focus={focus}
            setFocus={setFocus}
            focusOptions={focusOptions}
            onBack={() => setStep(1)}
            onNext={() => setStep(3)}
          />
        )}

        {/* STEP 3: Time Commitment */}
        {step === 3 && (
          <OnboardingStep3Time
            title={t.step3Title}
            subtitle={t.step3Subtitle}
            backLabel={t.backBtn}
            finishLabel={t.finishBtn}
            timeCommitment={timeCommitment}
            setTimeCommitment={setTimeCommitment}
            timeOptions={timeOptions}
            onBack={() => setStep(2)}
            onFinish={handleFinish}
          />
        )}

        {/* STEP 4: Success Summary */}
        {step === 4 && generatedPlan && (
          <OnboardingStep4Result
            lang={lang}
            generatedPlan={generatedPlan}
            enterOsLabel={t.enterOsBtn}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  );
};
