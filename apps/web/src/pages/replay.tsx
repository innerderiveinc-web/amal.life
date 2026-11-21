import React, { useState, useMemo, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Navigation } from '../components/Navigation';
import { deenReplayEngine, DeenReplayAnnualReport } from '@amal/amal-engine';
import { useLanguage } from '../context/LanguageContext';

export default function DeenReplayPage() {
  const { t } = useLanguage();
  const [selectedQuarter, setSelectedQuarter] = useState<'ALL' | 'Q1' | 'Q2' | 'Q3' | 'Q4'>('ALL');
  const [localMetrics, setLocalMetrics] = useState({
    reflectionsCount: 0,
    tasbihCount: 0,
    bookmarksCount: 0,
    activeGoalsCount: 0,
    hasRealActivity: false,
    latestReflection: '',
    topGoals: [] as string[],
  });

  // Hydrate authentic on-device records on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const rawReflections = localStorage.getItem('amal_reflections');
        const parsedReflections = rawReflections ? JSON.parse(rawReflections) : [];

        const rawBookmarks = localStorage.getItem('amal_saved_bookmarks');
        const parsedBookmarks = rawBookmarks ? JSON.parse(rawBookmarks) : [];

        const rawGoals = localStorage.getItem('amal_goals');
        const parsedGoals = rawGoals ? JSON.parse(rawGoals) : [];

        // Calculate Tasbih Total
        let totalTasbih = 0;
        const rawTasbih = localStorage.getItem('amal_tasbih_counts');
        if (rawTasbih) {
          const parsedTasbih = JSON.parse(rawTasbih);
          if (typeof parsedTasbih === 'object' && parsedTasbih !== null) {
            totalTasbih = Object.values(parsedTasbih).reduce((acc: number, val: any) => acc + (Number(val) || 0), 0);
          }
        }

        const hasRealActivity =
          parsedReflections.length > 0 ||
          totalTasbih > 0 ||
          parsedBookmarks.length > 0 ||
          parsedGoals.length > 0;

        setLocalMetrics({
          reflectionsCount: parsedReflections.length,
          tasbihCount: totalTasbih,
          bookmarksCount: parsedBookmarks.length,
          activeGoalsCount: parsedGoals.length,
          hasRealActivity,
          latestReflection: parsedReflections[0]?.content || '',
          topGoals: parsedGoals.slice(0, 3).map((g: any) => g.title || g.titleEnglish || 'Sunnah Habit'),
        });
      } catch (err) {
        console.warn('Failed to parse authentic local replay records:', err);
      }
    }
  }, []);

  const baseReport: DeenReplayAnnualReport = useMemo(() => {
    return deenReplayEngine.generateAnnualReplay('usr_local_device', 2026);
  }, []);

  // Dynamically tailor the annual report with authentic local records
  const report = useMemo(() => {
    if (!localMetrics.hasRealActivity) return baseReport;

    const modified = { ...baseReport };
    const firstQuarter = modified.quarters[0];
    if (firstQuarter) {
      if (localMetrics.topGoals.length > 0) {
        firstQuarter.primaryNiyyahs = localMetrics.topGoals;
      }
      if (localMetrics.latestReflection) {
        firstQuarter.transformativeReflections = [
          {
            date: '2026-Local-Record',
            excerpt: localMetrics.latestReflection.slice(0, 140) + '...',
            perspectiveShift: 'Authentic on-device Muhasabah logged in your private vault.',
          },
          ...firstQuarter.transformativeReflections,
        ];
      }
    }
    return modified;
  }, [baseReport, localMetrics]);

  const visibleQuarters = useMemo(() => {
    if (selectedQuarter === 'ALL') return report.quarters;
    return report.quarters.filter(q => q.quarter === selectedQuarter);
  }, [selectedQuarter, report]);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F8F9FA', paddingBottom: 60, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <Head>
        <title>{`AMAL OS — ${t('Deen Replay (Longitudinal Reflection)', 'دین ری پلے (سالانہ روحانی احتساب)', 'مراجعة المسار الروحي السنوي', 'Deen Replay (Salana Jaiza)')}`}</title>
        <meta name="description" content="Spiritual Milestones Replay, Istiqamah Progress, and Annual Devotional Reflections." />
      </Head>
      <Navigation />

      <main style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <span style={{ fontSize: 28 }}>🕰️</span>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: '#1B4332', margin: 0 }}>
              {t('Deen Replay', 'دین ری پلے (سالانہ محاسبہ)', 'مراجعة المسار الإيماني', 'Deen Replay (Salana Jaiza)')} ({report.year})
            </h1>
          </div>
          <p style={{ color: '#4B5563', margin: 0, fontSize: 14, lineHeight: 1.6 }}>
            {t(
              'Longitudinal spiritual introspection across your entire year. Zero Iman scores. Zero Taqwa streaks. Zero gamification. Honest Muhasabah between the servant and the Creator.',
              'پورے سال کا گہرا اور مسلسل روحانی جائزہ۔ کوئی مصنوعی اسکور یا اسٹریک نہیں۔ بندے اور رب کے درمیان سچا احتساب۔',
              'محاسبة روحية سنوية شاملة دون مؤشرات وهمية أو تنافس مصطنع. صدق المحاسبة بين العبد وربه.',
              'Poore saal ka gehra aur musalsal jaiza. Zero fake scores, zero gamification. Bande aur Rab ke darmiyan sacha muhasabah.'
            )}
          </p>
        </div>

        {/* Narrative Hero Card */}
        {localMetrics.hasRealActivity ? (
          <div style={{
            backgroundColor: '#064E3B',
            borderRadius: 14,
            padding: '16px 20px',
            marginBottom: 20,
            border: '1.5px solid #34D399',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
          }}>
            <div>
              <span style={{ fontSize: 11, fontWeight: 800, color: '#A7F3D0', textTransform: 'uppercase', letterSpacing: 1 }}>
                ✓ {t('AUTHENTIC ON-DEVICE LOCAL MUHASABAH SYNCED', 'مقامی ڈیوائس کا اصل ڈیٹا فعال ہے', 'سجلات المحاسبة المحلية الحقيقية موثقة', 'Local Device Real Muhasabah Active')}
              </span>
              <div style={{ fontSize: 13, color: '#FFFFFF', marginTop: 4, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <span>🌱 <strong>{localMetrics.reflectionsCount}</strong> {t('Reflections', 'محاسبے', 'خواطر', 'Reflections')}</span>
                <span>📿 <strong>{localMetrics.tasbihCount}</strong> {t('Tasbih Dhikr', 'تسبیحات', 'أذكار', 'Tasbihat')}</span>
                <span>🔖 <strong>{localMetrics.bookmarksCount}</strong> {t('Bookmarks', 'بک مارکس', 'محفوظات', 'Bookmarks')}</span>
                <span>🎯 <strong>{localMetrics.activeGoalsCount}</strong> {t('Active Goals', 'مقاصد', 'أهداف', 'Goals')}</span>
              </div>
            </div>
            <Link
              href="/reflections"
              style={{
                padding: '6px 12px',
                borderRadius: 6,
                backgroundColor: '#ECFDF5',
                color: '#065F46',
                fontWeight: 700,
                fontSize: 12,
                textDecoration: 'none',
              }}
            >
              + {t('Add Today\'s Reflection', 'آج کا محاسبہ درج کریں', 'إضافة خاطرة اليوم', 'Aaj Ka Muhasabah')}
            </Link>
          </div>
        ) : (
          <div style={{
            backgroundColor: '#F8FAFC',
            borderRadius: 12,
            padding: '12px 16px',
            marginBottom: 20,
            border: '1px solid #CBD5E1',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 12.5,
            color: '#475569',
          }}>
            <span>💡 {t('Sample Longitudinal Preview. As you log reflections, tasbih, and goals on your device, this dashboard automatically populates with your authentic annual journey.', 'یہ ایک تعارفی نمونہ ہے۔ جیسے ہی آپ اس ڈیوائس پر محاسبہ اور اذکار درج کریں گے، یہ ڈیش بورڈ خود بخود آپ کے حقیقی ریکارڈ سے بھر جائے گا۔', 'نموذج إرشادي. عند تسجيلك للخواطر والأذكار على هذا الجهاز، سيتم تحديث هذا التقرير تلقائياً بسجلاتك الحقيقية.', 'Sample preview. Jaise hi aap is device par reflections aur azkar log karenge, ye dashboard aapke real data se populate ho jayega.')}</span>
          </div>
        )}

        <div style={{
          backgroundColor: '#1B4332',
          borderRadius: 16,
          padding: 28,
          color: '#FFFFFF',
          marginBottom: 24,
        }}>
          <span style={{ fontSize: 11, fontWeight: 800, color: '#86EFAC', letterSpacing: 1.5, textTransform: 'uppercase' }}>
            {t('ANNUAL SPIRITUAL NARRATIVE', 'سالانہ روحانی خلاصہ و پیشرفت', 'التقرير الروحي السنوي الشامل', 'Salana Ruhani Khulasa')}
          </span>
          <h2 style={{ fontSize: 22, fontWeight: 800, margin: '6px 0 10px', color: '#FFFFFF' }}>
            {report.thematicJourneyTitle}
          </h2>
          <p style={{ fontSize: 14, color: '#D1FAE5', lineHeight: 1.6, margin: 0 }}>
            {report.coreGrowthNarrative}
          </p>
        </div>

        {/* Anchors vs Honest Weaknesses */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20, marginBottom: 24 }}>
          {/* Anchors */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 12, padding: 20, border: '1px solid #86EFAC', borderTop: '4px solid #166534' }}>
            <span style={{ fontSize: 12, fontWeight: 800, color: '#166534', letterSpacing: 0.5 }}>
              {t('ANCHORS THAT ACTUALLY HELD FIRM', 'وہ بنیادیں جو ثابت قدم رہیں', 'المرتكزات الإيمانية الراسخة', 'Pukhta Bunyaadein Jo Qayam Rahein')}
            </span>
            <ul style={{ margin: '10px 0 0', paddingLeft: 18, fontSize: 13, color: '#374151', lineHeight: 1.6 }}>
              {report.spiritualAnchorsDiscovered.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </div>

          {/* Honest Weaknesses */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 12, padding: 20, border: '1px solid #FECACA', borderTop: '4px solid #DC2626' }}>
            <span style={{ fontSize: 12, fontWeight: 800, color: '#991B1B', letterSpacing: 0.5 }}>
              {t('CHRONIC VULNERABILITIES IDENTIFIED', 'وہ کمزوریاں جن پر توجہ ضروری ہے', 'جوانب التقصير والمجاهدة', 'Kamzoriyan Jin Par Tawajjo Zaroori Hai')}
            </span>
            <ul style={{ margin: '10px 0 0', paddingLeft: 18, fontSize: 13, color: '#374151', lineHeight: 1.6 }}>
              {report.honestWeaknessesIdentified.map((w, i) => (
                <li key={i}>{w}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quarter Selector */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
          {(['ALL', 'Q1', 'Q2', 'Q3', 'Q4'] as const).map(q => {
            const label = q === 'ALL'
              ? t('All Quarters', 'تمام سہ ماہی ادوار', 'جميع الفصول', 'Tamam Seh-Mahi')
              : `${t('Quarter', 'سہ ماہی', 'الربع', 'Quarter')} ${q.replace('Q', '')}`;
            return (
              <button
                key={q}
                onClick={() => setSelectedQuarter(q)}
                style={{
                  padding: '8px 16px',
                  borderRadius: 8,
                  fontWeight: 700,
                  fontSize: 13,
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: selectedQuarter === q ? '#1B4332' : '#E5E7EB',
                  color: selectedQuarter === q ? '#FFFFFF' : '#4B5563',
                  transition: 'all 0.15s ease',
                }}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Quarters Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {visibleQuarters.map((q) => (
            <div key={q.quarter} style={{ backgroundColor: '#FFFFFF', borderRadius: 12, padding: 22, border: '1px solid #E5E7EB' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 800, color: '#1B4332' }}>
                  {q.quarter} {q.year} {t('OVERVIEW', 'جائزہ', 'نظرة عامة', 'Jaiza')}
                </span>
                <span style={{ fontSize: 12, color: '#6B7280' }}>
                  {t('Next Step: ', 'اگلا قدم: ', 'الخطوة التالية: ', 'Agla Qadam: ')}{q.nextMilestoneRecommendation}
                </span>
              </div>

              {/* Observed Shift */}
              <div style={{ marginBottom: 12, fontSize: 13, color: '#374151' }}>
                <strong>{t('Key Shift: ', 'نمایاں تبدیلی: ', 'التحول الإيجابي: ', 'Numayan Tabdeeli: ')}</strong> {q.observedShifts.join(' ')}
              </div>

              {/* Chronic Friction & Sustainable Remedy */}
              {q.chronicFrictionPoints.map((f, i) => (
                <div key={i} style={{ backgroundColor: '#FEF3C7', padding: 12, borderRadius: 8, border: '1px solid #FDE68A', marginBottom: 10, fontSize: 12 }}>
                  <div style={{ fontWeight: 700, color: '#92400E' }}>
                    ⚠️ {t('Chronic Friction: ', 'مسلسل رکاوٹ: ', 'العقبة المستمرة: ', 'Musalsal Rukawat: ')}{f.obstacle}
                  </div>
                  <div style={{ color: '#78350F', marginTop: 2 }}>
                    {t('Context: ', 'سیاق: ', 'السياق: ', 'Siyaq: ')}{f.triggerContext}
                  </div>
                  <div style={{ color: '#166534', fontWeight: 700, marginTop: 4 }}>
                    {t('Sustainable Remedy: ', 'پائیدار علاج: ', 'العلاج المستدام: ', 'Paedaar Ilaj: ')}{f.sustainableRemedy}
                  </div>
                </div>
              ))}

              {/* Transformative Reflection */}
              {q.transformativeReflections.map((r, i) => (
                <div key={i} style={{ padding: 10, backgroundColor: '#F0FDF4', borderRadius: 6, fontSize: 12, color: '#166534', fontStyle: 'italic' }}>
                  "{r.excerpt}" — <span style={{ fontWeight: 600 }}>{t('Shift: ', 'فکری تبدیلی: ', 'الأثر: ', 'Fikri Tabdeeli: ')}{r.perspectiveShift}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Closing Spiritual Advice */}
        <div style={{ marginTop: 28, padding: 20, borderRadius: 12, backgroundColor: '#FAF5FF', border: '1px solid #E9D5FF', textAlign: 'center' }}>
          <span style={{ fontSize: 11, fontWeight: 800, color: '#7E22CE', letterSpacing: 1 }}>
            {t('THE CONTINUOUS RETURN (INABAH)', 'مسلسل رجوع الی اللہ (انابت)', 'الإنابة والرجوع المستمر إلى الله', 'Ruju Il-Allah (Inabah)')}
          </span>
          <p style={{ fontSize: 14, color: '#581C87', margin: '8px 0 0', lineHeight: 1.6 }}>
            {report.closingSpiritualAdvice}
          </p>
        </div>
      </main>
    </div>
  );
}