import React, { useState } from 'react';
import {
  OnboardingWizardEngine,
  OnboardingMadhhab,
  OnboardingFocus,
  OnboardingTimeCommitment,
  StarterPlan,
} from '@amal/amal-engine';
import { AmalTheme } from '@amal/ui';

interface OnboardingWizardModalProps {
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

  // Localized Strings Dictionary
  const t = {
    stepLabel: {
      EN: `Step ${step} of 4`,
      UR: `مرحلہ ${step} از ۴`,
      AR: `الخطوة ${step} من ٤`,
    }[lang],
    step1Title: {
      EN: 'Select Your Fiqh Madhhab',
      UR: 'اپنا فقہی مسلک منتخب فرمائیے',
      AR: 'اختر المذهب الفقهي المتبع',
    }[lang],
    step1Subtitle: {
      EN: 'Used for prayer times (Asr shadow ratio), Zakat nisab, and fiqh guidance:',
      UR: 'نماز کے اوقات (عصر کا سایہ)، زکوٰۃ کے نصاب اور فقہی رہنمائی کے لیے:',
      AR: 'لحساب أوقات الصلاة (ظل العصر)، نصاب الزكاة، والأحكام الفقهية:',
    }[lang],
    step2Title: {
      EN: 'What is your primary spiritual focus?',
      UR: 'اس وقت آپ کا بنیادی روحانی ہدف کیا ہے؟',
      AR: 'ما هو هدفك الروحي الأساسي حالياً؟',
    }[lang],
    step2Subtitle: {
      EN: 'Select your primary area to personalize daily recommendations and gentle journeys:',
      UR: 'روزمرہ کے معمولات کو اپنی ترجیح کے مطابق بنانے کے لیے منتخب کریں:',
      AR: 'اختر المجال لتخصيص جدولك اليومي وسلسلة الخطوات الإيمانية:',
    }[lang],
    step3Title: {
      EN: 'How much time can you comfortably dedicate daily?',
      UR: 'روزانہ کتنا وقت آسانی سے نکال سکتے ہیں؟',
      AR: 'كم من الوقت يمكنك تخصيصه يومياً بكل يسر؟',
    }[lang],
    step3Subtitle: {
      EN: 'We build sustainable habits with zero guilt, zero streaks, and zero burnout:',
      UR: 'ہم بغیر کسی دباؤ یا تھکن کے پائیدار معمولات تیار کرتے ہیں:',
      AR: 'نبني عادات إيمانية مستدامة دون إجهاد أو تأنيب ضمير:',
    }[lang],
    backBtn: {
      EN: '← Back',
      UR: 'واپس →',
      AR: 'السابق →',
    }[lang],
    nextToFocus: {
      EN: 'Next: Spiritual Focus →',
      UR: 'اگلا مرحلہ (روحانی ہدف) ←',
      AR: 'التالي: الهدف الروحي ←',
    }[lang],
    nextToTime: {
      EN: 'Next: Daily Time →',
      UR: 'اگلا مرحلہ (روزانہ وقت) ←',
      AR: 'التالي: الوقت اليومي ←',
    }[lang],
    finishBtn: {
      EN: 'Generate My Personalized Deen Path ✨',
      UR: 'میرا دینی مسکن تیار کریں ✨',
      AR: 'إنشاء مساري الإيماني المخصص ✨',
    }[lang],
    enterOsBtn: {
      EN: 'Bismillah — Enter AMAL OS',
      UR: 'بسم اللہ! ڈیش بورڈ پر جائیں',
      AR: 'بسم الله — الدخول إلى نظام عمل',
    }[lang],
  };

  const madhhabs = [
    {
      id: 'HANAFI',
      title: {
        EN: 'Hanafi (Imam Abu Hanifah)',
        UR: 'فقہِ حنفی (امام اعظم ابو حنیفہ رحمہ اللہ)',
        AR: 'المذهب الحنفي (الإمام أبو حنيفة رحمه الله)',
      }[lang],
      sub: {
        EN: 'Double shadow for Asr; predominant in South Asia, Turkey, Balkans & Central Asia',
        UR: 'عصر مثلین، برصغیر و ترکی میں کثرت',
        AR: 'مثلين للعصر، سائد في شبه القارة، تركيا والبلقان',
      }[lang],
    },
    {
      id: 'SHAFII',
      title: {
        EN: 'Shafi\'i (Imam Muhammad al-Shafi\'i)',
        UR: 'فقہِ شافعی (امام محمد بن ادریس الشافعی رحمہ اللہ)',
        AR: 'المذهب الشافعي (الإمام الشافعي رحمه الله)',
      }[lang],
      sub: {
        EN: 'Single shadow for Asr; predominant in Egypt, Yemen, Malaysia, Indonesia & East Africa',
        UR: 'عصر مثل اول، مصر، یمن، ملیشیا، انڈونیشیا',
        AR: 'مثل واحد للعصر، سائد في مصر واليمن وجنوب شرق آسيا',
      }[lang],
    },
    {
      id: 'MALIKI',
      title: {
        EN: 'Maliki (Imam Malik ibn Anas)',
        UR: 'فقہِ مالکی (امام دار الہجرۃ مالک بن انس رحمہ اللہ)',
        AR: 'المذهب المالكي (الإمام مالك رحمه الله)',
      }[lang],
      sub: {
        EN: 'Practice of the people of Medina; North & West Africa, Sudan and the Maghreb',
        UR: 'عمل اہل مدینہ، شمالی و مغربی افریقہ',
        AR: 'عمل أهل المدينة، سائد في شمال وغرب إفريقيا والخليج',
      }[lang],
    },
    {
      id: 'HANBALI',
      title: {
        EN: 'Hanbali (Imam Ahmad ibn Hanbal)',
        UR: 'فقہِ حنبلی (امام احمد بن حنبل رحمہ اللہ)',
        AR: 'المذهب الحنبلي (الإمام أحمد رحمه الله)',
      }[lang],
      sub: {
        EN: 'Strict Hadith adherence; predominant across the Arabian Peninsula & Gulf',
        UR: 'اتباعِ سنت، خلیج و جزیرہ عرب',
        AR: 'اتباع الأثر والدليل، سائد في شبه الجزيرة العربية',
      }[lang],
    },
    {
      id: 'GENERAL_UMMAH',
      title: {
        EN: 'General Ummah (Sawad al-A\'zam)',
        UR: 'سوادِ اعظم عمومی رہنمائی (General Ummah)',
        AR: 'السواد الأعظم (جمهور الأمة)',
      }[lang],
      sub: {
        EN: 'Consensus rulings agreed upon across all 4 traditional Sunni schools',
        UR: 'چاروں ائمہ کا متفقہ دائرہ',
        AR: 'المسائل المتفق عليها بين أئمة أهل السنة والجماعة',
      }[lang],
    },
  ];

  const focusOptions = [
    {
      id: 'SALAH_DISCIPLINE',
      icon: '🕌',
      title: {
        EN: 'Salah Discipline & Khushu\'',
        UR: 'نماز کی پابندی و خشوع',
        AR: 'المحافظة على الصلاة والخشوع',
      }[lang],
      desc: {
        EN: 'Prayer punctuality & quiet mosque presence',
        UR: 'بروقت ادائے نماز اور قلبی سکون',
        AR: 'أداء الصلوات في أوقاتها بحضور قلب',
      }[lang],
    },
    {
      id: 'QURAN_TADABBUR',
      icon: '📖',
      title: {
        EN: 'Quran Recitation & Reflection',
        UR: 'قرآن فہمی و تلاوت',
        AR: 'تلاوة القرآن وتدبر آياته',
      }[lang],
      desc: {
        EN: 'Daily recitation, tajweed & contemplation',
        UR: 'روزانہ تلاوت اور تدبرِ آیات',
        AR: 'ورد قرآني يومي وتدبر المعاني',
      }[lang],
    },
    {
      id: 'AKHLAQ_CHARACTER',
      icon: '🌱',
      title: {
        EN: 'Prophetic Akhlaq & Softness',
        UR: 'حسنِ اخلاق و گھریلو نرمی',
        AR: 'حسن الخلق وبر الوالدين',
      }[lang],
      desc: {
        EN: 'Patience, honoring parents & family mercy',
        UR: 'صبر، والدین کی خدمت اور نرم گفتگو',
        AR: 'الصبر، ولين الجانب، وصلة الرحم',
      }[lang],
    },
    {
      id: 'HALAL_LIVELIHOOD',
      icon: '💼',
      title: {
        EN: 'Halal Earnings & Barakah',
        UR: 'حلال کمائی و مالی برکت',
        AR: 'الرزق الحلال والبركة المالية',
      }[lang],
      desc: {
        EN: 'Ethical trade, debt clearance & Zakat',
        UR: 'رزقِ حلال، ادائے قرض اور مال میں برکت',
        AR: 'التجارة الأمينة، قضاء الديون والزكاة',
      }[lang],
    },
  ];

  const timeOptions = [
    {
      id: '5_MINS',
      title: {
        EN: '5 Minutes / Day (Gentle Start)',
        UR: '۵ منٹ روزانہ (آسان آغاز)',
        AR: '٥ دقائق يومياً (بداية ميسرة)',
      }[lang],
      sub: {
        EN: 'Post-Salah masnoon dhikr and 1 gentle daily micro-amal.',
        UR: 'صرف ۱ چھوٹا عمل اور نماز کے بعد کا مسنون ذکر۔',
        AR: 'أذكار ما بعد الصلاة وعمل إيماني يسير يومياً.',
      }[lang],
    },
    {
      id: '15_MINS',
      title: {
        EN: '15 Minutes / Day (Steady Routine)',
        UR: '۱۵ منٹ روزانہ (مستقل معمول)',
        AR: '١٥ دقيقة يومياً (ورد ثابت)',
      }[lang],
      sub: {
        EN: 'Salah azkar, short Quran portion, and daily heart-felt du\'a.',
        UR: 'نماز کے اذکار، تلاوت کی چھوٹی مقدار اور روزانہ دعا۔',
        AR: 'أذكار الصلوات، تلاوة حزب يومي، ودعاء اليوم.',
      }[lang],
    },
    {
      id: '30_PLUS_MINS',
      title: {
        EN: '30+ Minutes / Day (Deep Seeker)',
        UR: '۳۰+ منٹ روزانہ (طالبِ علم)',
        AR: '٣٠+ دقيقة يومياً (طالب علم)',
      }[lang],
      sub: {
        EN: 'Tajweed practice, Sirah masterclasses, and structured ilm.',
        UR: 'تجوید کی مشق، سیرت النبی ﷺ کا مطالعہ اور علمی سفر۔',
        AR: 'إتقان التجويد، دراسة السيرة، والاستزادة من العلوم الشرعية.',
      }[lang],
    },
  ];

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
        onClick={e => e.stopPropagation()}
      >
        {/* Top Header: Step Indicator, Language Selector & Close Button */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: AmalTheme.colors.primary }}>
            {t.stepLabel}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {/* 3-Language Instant Switcher Pills */}
            <div style={{
              display: 'flex',
              backgroundColor: '#F1F5F9',
              borderRadius: 20,
              padding: '2px 4px',
              border: '1px solid #E2E8F0',
            }}>
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
          <div>
            <h3 style={{ margin: '0 0 6px 0', fontSize: 22, color: '#1E293B', fontWeight: 800 }}>
              {t.step1Title}
            </h3>
            <p style={{ margin: '0 0 20px 0', fontSize: 13, color: '#64748B', lineHeight: 1.5 }}>
              {t.step1Subtitle}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
              {madhhabs.map(item => (
                <div
                  key={item.id}
                  onClick={() => setMadhhab(item.id as OnboardingMadhhab)}
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
              onClick={() => setStep(2)}
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
              {t.nextToFocus}
            </button>
          </div>
        )}

        {/* STEP 2: Spiritual Focus */}
        {step === 2 && (
          <div>
            <h3 style={{ margin: '0 0 6px 0', fontSize: 22, color: '#1E293B', fontWeight: 800 }}>
              {t.step2Title}
            </h3>
            <p style={{ margin: '0 0 20px 0', fontSize: 13, color: '#64748B', lineHeight: 1.5 }}>
              {t.step2Subtitle}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12, marginBottom: 24 }}>
              {focusOptions.map(item => (
                <div
                  key={item.id}
                  onClick={() => setFocus(item.id as OnboardingFocus)}
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
                onClick={() => setStep(1)}
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
                {t.backBtn}
              </button>
              <button
                onClick={() => setStep(3)}
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
                {t.nextToTime}
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Time Commitment */}
        {step === 3 && (
          <div>
            <h3 style={{ margin: '0 0 6px 0', fontSize: 22, color: '#1E293B', fontWeight: 800 }}>
              {t.step3Title}
            </h3>
            <p style={{ margin: '0 0 20px 0', fontSize: 13, color: '#64748B', lineHeight: 1.5 }}>
              {t.step3Subtitle}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
              {timeOptions.map(item => (
                <div
                  key={item.id}
                  onClick={() => setTimeCommitment(item.id as OnboardingTimeCommitment)}
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
                onClick={() => setStep(2)}
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
                {t.backBtn}
              </button>
              <button
                onClick={handleFinish}
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
                {t.finishBtn}
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Success Summary */}
        {step === 4 && generatedPlan && (
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
                {lang === 'EN' ? 'First 7 Days Gentle Sunnah Plan:' : lang === 'UR' ? 'پہلے ۷ دن کا آسان مسنون شیڈول:' : 'خطة الأيام السبعة الأولى من السنة:'}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxHeight: 160, overflowY: 'auto' }}>
                {generatedPlan.firstSevenDaysJourney.map(d => (
                  <div key={d.day} style={{ fontSize: 12, color: '#475569', display: 'flex', gap: 6 }}>
                    <span style={{ fontWeight: 700, color: AmalTheme.colors.primary }}>
                      {lang === 'EN' ? `Day ${d.day}:` : lang === 'UR' ? `دن ${d.day}:` : `اليوم ${d.day}:`}
                    </span>
                    <span>{d.titleUrdu} — {d.microAmalUrdu}</span>
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
              {t.enterOsBtn}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
