import React from 'react';
import { AmalTheme } from '@amal/ui';

export interface JourneyTemplateItem {
  id: string;
  title: string;
  duration: string;
  phases: string;
  description: string;
  urTitle: string;
  urDescription: string;
}

export const JOURNEY_ROADMAP_TEMPLATES: JourneyTemplateItem[] = [
  {
    id: 'tmpl-fajr-14d',
    title: '14-Day Fajr Recovery',
    duration: '14 Days',
    phases: '3 Phases (Foundation, Anchoring, Sustainability)',
    description:
      'Gentle, evidence-backed progression to establish consistent Fajr prayer without guilt or burnout.',
    urTitle: '14 روزہ فجر استقامت',
    urDescription:
      'بغیر احساس جرم یا مایوسی کے، سنت نبوی کے مطابق فجر کی مستقل عادت قائم کرنے کا 14 روزہ سفر۔',
  },
  {
    id: 'tmpl-salah-consistency',
    title: 'Salah Consistency & Presence',
    duration: '21 Days',
    phases: '3 Phases (Timeliness, Khushu, Retention)',
    description:
      'Anchor the five daily prayers into your daily schedule with gentle friction adaptation.',
    urTitle: 'نماز میں مداومت اور خشوع',
    urDescription:
      'پنجوقتہ نمازوں کو روزمرہ زندگی کا اٹوٹ حصہ بنانے اور خشوع پیدا کرنے کا 21 روزہ سفر۔',
  },
  {
    id: 'tmpl-quran-restart',
    title: 'Quran Daily Restart (1 Page / Day)',
    duration: '30 Days',
    phases: '2 Phases (Recitation Rhythm, Contemplation)',
    description:
      'Build an unbroken daily Quran relationship starting with just a single page each morning.',
    urTitle: 'روزانہ قرآن تجدید (1 صفحہ / دن)',
    urDescription:
      'روزانہ صبح ایک صفحہ تلاوت اور تدبر کے ذریعے قرآن مجید سے اٹوٹ رشتہ قائم کرنے کا 30 روزہ سفر۔',
  },
  {
    id: 'tmpl-anger-patience',
    title: 'Anger Management & Prophetic Sabr',
    duration: '10 Days',
    phases: '2 Phases (Trigger Awareness, Reaction Delay)',
    description:
      'Practical prophetic behavioral exercises when confronting anger and frustration.',
    urTitle: 'غصے پر قابو اور سنت صبر',
    urDescription:
      'اشتعال اور غصے کے لمحات میں نبوی سنت اور تدابیر پر عمل کرنے کا 10 روزہ عملی سفر۔',
  },
  {
    id: 'tmpl-tahajjud-7d',
    title: '7-Day Tahajjud & Night Vigil',
    duration: '7 Days',
    phases: '2 Phases (Ignition, Intimacy with Allah)',
    description:
      'Experience the profound peace, secret du’as, and divine closeness of Qiyam al-Layl.',
    urTitle: '7 روزہ تہجد اور قیام اللیل',
    urDescription:
      'رات کی خاموشی میں اللہ کے حضور کھڑے ہونے، مناجات اور دل کی تسکین کا 7 روزہ سفر۔',
  },
  {
    id: 'tmpl-istighfar-21d',
    title: '21-Day Heart Cleansing & Tawbah',
    duration: '21 Days',
    phases: '3 Phases (Unburdening, Sayyid al-Istighfar, Renewal)',
    description:
      'Cleanse the spiritual rust from the heart with 100 daily istighfar and Sayyid al-Istighfar.',
    urTitle: '21 روزہ توبہ و استغفار',
    urDescription:
      'روزانہ 100 مرتبہ استغفار اور سید الاستغفار کے ذریعے دل کو گناہوں کے زنگ سے پاک کرنے کا 21 روزہ سفر۔',
  },
  {
    id: 'tmpl-tongue-discipline-14d',
    title: '14-Day Guarding the Tongue',
    duration: '14 Days',
    phases: '2 Phases (Awareness & Silence, Noble Speech)',
    description:
      'Eliminate backbiting (gheebah), sarcasm, and careless gossip through prophetic speech discipline.',
    urTitle: '14 روزہ حفاظتِ زبان و انسدادِ غیبت',
    urDescription:
      'غیبت، طنز اور لایعنی باتوں سے زبان کو محفوظ رکھ کر ذکر اور نرم کلامی اختیار کرنے کا 14 روزہ سفر۔',
  },
  {
    id: 'tmpl-gratitude-14d',
    title: '14-Day Prophetic Shukr & Contentment',
    duration: '14 Days',
    phases: '2 Phases (Hidden Favors, Contentment in Action)',
    description:
      'Break free from consumerist anxiety and cultivate deep, joyful contentment (Qana\'ah) with Allah’s decree.',
    urTitle: '14 روزہ شکر گزاری اور قناعت',
    urDescription:
      'حسد اور بے چینی سے نجات پا کر رب کی نعمتوں پر دلی شکر اور قناعت اختیار کرنے کا 14 روزہ سفر۔',
  },
  {
    id: 'tmpl-sahabiyyat-14d',
    title: '14-Day Walking with the Sahabiyyat',
    duration: '14 Days',
    phases: '3 Phases (Empathy & Solace, Courage & Intellect, Legacy & Service)',
    description:
      'Daily character-building inspired by the Mothers of the Believers: Khadijah, Aisha, Fatimah, and the heroic Sahabiyyat.',
    urTitle: '14 روزہ سفرِ اسوۂ صحابیات',
    urDescription:
      'سیدتنا خدیجہ، عائشہ، اور فاطمہ رضی اللہ عنہن کی سیرت و کردار کو اپنی روزمرہ زندگی میں اپنانے کا 14 روزہ باوقار روحانی سفر۔',
  },
];

interface CuratedJourneysGridProps {
  activeJourneys: any[];
  loading: boolean;
  onStartJourney: (templateId: string, title: string) => void;
  isUrdu: boolean;
  t: (en: string, ur: string) => string;
}

export const CuratedJourneysGrid: React.FC<CuratedJourneysGridProps> = ({
  activeJourneys,
  loading,
  onStartJourney,
  isUrdu,
  t,
}) => {
  return (
    <section>
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, margin: '0 0 4px', color: '#111827' }}>
          {t('Curated Journey Roadmaps', 'منتخب روحانی اسفار')}
        </h2>
        <p style={{ fontSize: 13, color: '#6B7280', margin: 0 }}>
          {t(
            'Pinned to canonical Sunnah templates. Each journey contains daily steps, authentic Hadith references, and flexible pacing.',
            'مستند سنت نبوی کے رہنما خطوط۔ ہر سفر میں روزمرہ اعمال، احادیث کے حوالہ جات اور نرم رفتار شامل ہے۔'
          )}
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
          gap: 18,
        }}
      >
        {JOURNEY_ROADMAP_TEMPLATES.map((tItem) => {
          const isAlreadyActive = activeJourneys.some(
            (j) => (j.templateId || '') === tItem.id && j.state === 'ACTIVE'
          );

          return (
            <div
              key={tItem.id}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 16,
                padding: 22,
                border: `1px solid ${AmalTheme.colors.surface.borderLight}`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 8,
                  }}
                >
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: AmalTheme.colors.primary,
                      backgroundColor: '#E8F5E9',
                      padding: '3px 8px',
                      borderRadius: 6,
                    }}
                  >
                    {tItem.duration}
                  </span>
                  <span style={{ fontSize: 11, color: '#6B7280', fontWeight: 600 }}>
                    {tItem.phases}
                  </span>
                </div>
                <h3
                  style={{
                    fontSize: 18,
                    fontWeight: 800,
                    margin: '6px 0 8px',
                    color: '#111827',
                  }}
                >
                  {isUrdu ? tItem.urTitle : tItem.title}
                </h3>
                <p
                  style={{
                    fontSize: 13,
                    color: '#4B5563',
                    lineHeight: 1.55,
                    margin: '0 0 16px',
                  }}
                >
                  {isUrdu ? tItem.urDescription : tItem.description}
                </p>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: 12,
                  borderTop: '1px solid #F3F4F6',
                }}
              >
                <span style={{ fontSize: 12, color: '#9CA3AF' }}>
                  {isAlreadyActive
                    ? t('Currently Active', 'پہلے سے جاری ہے')
                    : t('100% Private (On-Device)', 'مکمل نجی (ڈیوائس پر)')}
                </span>
                <button
                  disabled={loading}
                  onClick={() =>
                    onStartJourney(tItem.id, isUrdu ? tItem.urTitle : tItem.title)
                  }
                  style={{
                    backgroundColor: isAlreadyActive ? '#F3F4F6' : AmalTheme.colors.primary,
                    color: isAlreadyActive ? '#6B7280' : '#FFFFFF',
                    border: isAlreadyActive ? '1px solid #E5E7EB' : 'none',
                    borderRadius: 8,
                    padding: '10px 18px',
                    fontWeight: 700,
                    fontSize: 13,
                    cursor: loading ? 'wait' : 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {isAlreadyActive
                    ? t('Start Again', 'دوبارہ شروع کریں')
                    : t('Start Journey', 'سفر شروع کریں')}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
