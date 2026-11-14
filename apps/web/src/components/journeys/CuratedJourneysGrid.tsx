import React from 'react';
import { AmalTheme } from '@amal/ui';
import { useLanguage } from '../../context/LanguageContext';

export interface JourneyTemplateItem {
  id: string;
  title: string;
  duration: string;
  phases: string;
  description: string;
  urTitle: string;
  urDescription: string;
  arTitle?: string;
  arDescription?: string;
  romanTitle?: string;
  romanDescription?: string;
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
    arTitle: 'رحلة ١٤ يوماً للاستقامة على صلاة الفجر',
    arDescription:
      'خطوات متدرجة ومباركة لتثبيت أداء صلاة الفجر في وقتها وفق هدي النبوة دون إرهاق أو يأس.',
    romanTitle: '14-Roza Fajr Istiqamah Safar',
    romanDescription:
      'Baghair ehsas-e-jurm ya mayoosi ke, Sunnat-e-Nabawi ke mutabiq Fajr ki mustaqil aadat qayam karne ka 14 roza safar.',
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
    arTitle: 'المداومة على الصلوات الخمس والخشوع',
    arDescription:
      'رحلة ٢١ يوماً لتثبيت الصلوات الخمس كركيزة يومية ثابتة مع تعميق الخشوع والطمأنينة.',
    romanTitle: 'Namaz mein Mudawamat aur Khushu',
    romanDescription:
      'Panj-waqta namazon ko rozmarrah zindagi ka hissa banane aur khushu paida karne ka 21 roza safar.',
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
    arTitle: 'الورد القرآني اليومي (صفحة يومياً)',
    arDescription:
      'بناء علاقة وثيقة ومستدامة مع القرآن الكريم من خلال تلاوة وتدبر صفحة واحدة يومياً لمدة ٣٠ يوماً.',
    romanTitle: 'Rozana Quran Tajdeed (1 Safha / Din)',
    romanDescription:
      'Rozana subh ek safha tilawat aur tadabbur ke zariye Quran Majeed se atoot rishta qayam karne ka 30 roza safar.',
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
    arTitle: 'ضبط الغضب والتحلي بالصبر النبوي',
    arDescription:
      'تمارين سلوكية ونبوية عملية عند مواجهة الغضب والانفعال لترسيخ خلق الحلم والصبر.',
    romanTitle: 'Ghusse par Qaboo aur Sunnat-e-Sabr',
    romanDescription:
      'Ishte\'al aur ghosse ke lamhat mein Nabawi Sunnat aur tadabeer par amal karne ka 10 roza amali safar.',
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
    arTitle: 'رحلة ٧ أيام لقيام الليل والتهجد',
    arDescription:
      'تذوق سكينة الأسحار، والمناجاة الخالصة، والقرب الإلهي في جوف الليل.',
    romanTitle: '7-Roza Tahajjud wa Qiyam al-Layl',
    romanDescription:
      'Raat ki khamoshi mein Allah ke huzoor khare hone, munajat aur dil ki taskeen ka 7 roza safar.',
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
    arTitle: 'تطهير القلوب والتوبة (٢١ يوماً)',
    arDescription:
      'جلاء ران القلوب من خلال ملازمة الاستغفار وسيد الاستغفار يومياً لمدة ٢١ يوماً.',
    romanTitle: '21-Roza Taubah wa Istighfar',
    romanDescription:
      'Rozana 100 martaba istighfar aur Sayyid al-Istighfar ke zariye dil ko gunahon ke zang se pak karne ka 21 roza safar.',
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
    arTitle: 'حفظ اللسان والبعد عن الغيبة (١٤ يوماً)',
    arDescription:
      'التخلص من الغيبة واللمز وفضول الكلام والارتقاء إلى أدب المنطق النبوي والقول السديد.',
    romanTitle: '14-Roza Hifazat-e-Zaban wa Insidad-e-Gheebat',
    romanDescription:
      'Gheebat, tanz aur layani baton se zaban ko mehfooz rakh kar zikr aur narm kalami ikhtiyar karne ka 14 roza safar.',
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
    arTitle: 'الشكر النبوي والقناعة (١٤ يوماً)',
    arDescription:
      'التحرر من القلق والاستهلاك، وترسيخ الرضا الداخلي والشكر العميق لنعم الله الظاهرة والباطنة.',
    romanTitle: '14-Roza Shukr-Guzari aur Qana\'at',
    romanDescription:
      'Hasad aur be-chaini se nijat pa kar Rab ki nematon par dili shukr aur qana\'at ikhtiyar karne ka 14 roza safar.',
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
    arTitle: 'اقتفاء أثر الصحابيات وأمهات المؤمنين',
    arDescription:
      'بناء الشخصية الإيمانية بالاقتداء بأمهات المؤمنين: خديجة وعائشة وفاطمة الزهراء والصحابيات الجليلات.',
    romanTitle: '14-Roza Safar-e-Uswah-e-Sahabiyyat',
    romanDescription:
      'Sayyidatina Khadijah, Aisha, aur Fatimah (Razi Allahu Anhunna) ki seerat wa kirdar ko rozmarrah zindagi mein apnane ka 14 roza safar.',
  },
];

interface CuratedJourneysGridProps {
  activeJourneys: any[];
  loading: boolean;
  onStartJourney: (templateId: string, title: string) => void;
  isUrdu?: boolean;
  t?: (en: string, ur: string, ar?: string, roman?: string) => string;
}

export const CuratedJourneysGrid: React.FC<CuratedJourneysGridProps> = ({
  activeJourneys,
  loading,
  onStartJourney,
}) => {
  const { t, isUrdu, isArabic, isRomanUrdu } = useLanguage();

  const getTemplateTitle = (item: JourneyTemplateItem) => {
    if (isArabic) return item.arTitle || item.title;
    if (isUrdu) return item.urTitle;
    if (isRomanUrdu) return item.romanTitle || item.title;
    return item.title;
  };

  const getTemplateDesc = (item: JourneyTemplateItem) => {
    if (isArabic) return item.arDescription || item.description;
    if (isUrdu) return item.urDescription;
    if (isRomanUrdu) return item.romanDescription || item.description;
    return item.description;
  };

  return (
    <section>
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, margin: '0 0 4px', color: '#111827' }}>
          {t('Curated Journey Roadmaps', 'منتخب روحانی اسفار', 'الخرائط والمسارات الروحية المختارة', 'Muntakhab Ruhani Asfar')}
        </h2>
        <p style={{ fontSize: 13, color: '#6B7280', margin: 0 }}>
          {t(
            'Pinned to canonical Sunnah templates. Each journey contains daily steps, authentic Hadith references, and flexible pacing.',
            'مستند سنت نبوی کے رہنما خطوط۔ ہر سفر میں روزمرہ اعمال، احادیث کے حوالہ جات اور نرم رفتار شامل ہے۔',
            'مسارات مستمدة من السنة النبوية الشريفة. كل مسار يشتمل على خطوات يومية وأدلة حديثية معتمدة.',
            'Mustanad Sunnat-e-Nabawi ke rehnuma khutoot. Har safar mein rozmarrah aamaal aur Ahadees ke hawale shamil hain.'
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

          const cardTitle = getTemplateTitle(tItem);
          const cardDesc = getTemplateDesc(tItem);

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
                  {cardTitle}
                </h3>
                <p
                  style={{
                    fontSize: 13,
                    color: '#4B5563',
                    lineHeight: 1.55,
                    margin: '0 0 16px',
                  }}
                >
                  {cardDesc}
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
                <span style={{ fontSize: 12, color: '#64748B', fontWeight: 500 }}>
                  {isAlreadyActive
                    ? t('Currently Active', 'پہلے سے جاری ہے', 'مفعّل حالياً', 'Pehle se jari hai')
                    : t('100% Private (On-Device)', 'مکمل نجی (ڈیوائس پر)', 'خصوصية تامة (على جهازك)', 'Mukammal Niji (Device par)')}
                </span>
                <button
                  disabled={loading}
                  onClick={() => onStartJourney(tItem.id, cardTitle)}
                  style={{
                    backgroundColor: isAlreadyActive ? '#F3F4F6' : AmalTheme.colors.primary,
                    color: isAlreadyActive ? '#6B7280' : '#FFFFFF',
                    border: isAlreadyActive ? '1px solid #E5E7EB' : 'none',
                    borderRadius: 8,
                    padding: '10px 18px',
                    fontWeight: 700,
                    fontSize: 13,
                    cursor: loading ? 'wait' : 'pointer',
                  }}
                >
                  {isAlreadyActive
                    ? t('Continue Journey ➔', 'سفر جاری رکھیں ➔', 'متابعة المسار ➔', 'Safar Jari Rakhein ➔')
                    : t('Embark on Journey', 'سفر شروع کریں', 'بدء المسار المبارك', 'Safar Shuru Karein')}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
