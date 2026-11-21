import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { Navigation } from '../components/Navigation';
import { familyDeenOsEngine, FamilyCircle } from '@amal/amal-engine';
import { showAmalToast } from '../components/Toast';
import { useLanguage } from '../context/LanguageContext';

const FAMILY_HALAQAH_BLUEPRINTS = [
  {
    id: 'bp_kahf_friday',
    title: 'Friday Surah Al-Kahf & Salawat Circle',
    titleUrdu: 'جمعہ مبارک درود و کہف سرکل',
    titleRoman: 'Juma Mubarak Durood o Kahf Circle',
    category: 'WEEKLY_HALAQAH',
    icon: '🕌',
    description: 'Recite Surah Al-Kahf together, send 100 Salawat upon the Prophet ﷺ, and give family charity on blessed Friday.',
    tasks: [
      'Collective recitation of Surah Al-Kahf',
      '100 Salawat (Durood-e-Ibrahimi) by each member',
      'Friday family charity (Sadaqah box deposit)'
    ]
  },
  {
    id: 'bp_sirah_evening',
    title: 'Prophetic Sirah & Sahaba Story Night',
    titleUrdu: 'سیرت النبی ﷺ و قصصِ صحابہ کی شام',
    titleRoman: 'Seerat-un-Nabi ﷺ o Qasas-e-Sahaba Night',
    category: 'TARBIYAH_CIRCLE',
    icon: '🕊️',
    description: 'Read one short chapter from Seerat-e-Mustafa or Zia-un-Nabi and discuss practical lessons for family life.',
    tasks: [
      'Read 1 Prophetic biography chapter aloud',
      'Family moral discussion & children questions',
      'Collective evening Masnoon Duas'
    ]
  },
  {
    id: 'bp_fajr_habit',
    title: 'Family Fajr Congregation & Morning Adhkar',
    titleUrdu: 'صبح کی نماز باجماعت و مسنون اذکار',
    titleRoman: 'Subah Ki Namaz Ba-Jama\'at o Masnoon Azkar',
    category: 'DAILY_RHYTHM',
    icon: '🌅',
    description: 'Awaken gently for Fajr, pray together in home congregation or send boys to local masjid, read Ayatul Kursi together.',
    tasks: [
      'Gentle family wakeup for Fajr prayer',
      'Pray Fajr in home congregation or local masjid',
      'Recite Ayatul Kursi & 3 Quls together before breakfast'
    ]
  },
];

export default function FamilyPage() {
  const { t, language } = useLanguage();
  const [family, setFamily] = useState<FamilyCircle>(() => {
    return familyDeenOsEngine.getFamilyCircle('fam_demo_1');
  });
  const [newJourneyTitle, setNewJourneyTitle] = useState('');
  const [newJourneyDesc, setNewJourneyDesc] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const isHydrated = useRef(false);

  // Restore on-device Family Circle state from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('amal_family_circle');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed && parsed.familyId && Array.isArray(parsed.members)) {
            setFamily(parsed);
          }
        }
      } catch (err) {
        console.warn('Failed to hydrate family circle from localStorage:', err);
      } finally {
        isHydrated.current = true;
      }
    }
  }, []);

  // Persist Family Circle updates automatically to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined' && isHydrated.current) {
      try {
        localStorage.setItem('amal_family_circle', JSON.stringify(family));
        // Also save active completed tasks tally for Deen Replay integration
        const completedCount = family.sharedJourneys.reduce(
          (acc, j) => acc + j.assignedTasks.filter(t => t.isCompleted).length,
          0
        );
        localStorage.setItem('amal_family_completed_tasks_count', String(completedCount));
      } catch (err) {
        console.warn('Failed to save family circle to localStorage:', err);
      }
    }
  }, [family]);

  const handleActivateBlueprint = (blueprint: typeof FAMILY_HALAQAH_BLUEPRINTS[0]) => {
    const j = familyDeenOsEngine.createSharedJourney('fam_demo_1', {
      title: blueprint.title,
      category: blueprint.category as any,
      description: blueprint.description,
      assignedTasks: blueprint.tasks.map((taskText, idx) => ({
        assignedToMemberId: family.members[idx % family.members.length]?.memberId || 'mem_1',
        taskTitle: taskText,
        isCompleted: false,
      })),
    });
    setFamily(prev => ({ ...prev, sharedJourneys: [j, ...prev.sharedJourneys] }));
    showAmalToast(
      t(
        `✨ Family Circle Started: ${blueprint.title}`,
        `✨ فیملی سرکل شروع ہو گیا: ${blueprint.titleUrdu}`,
        `✨ بدأت الحلقة الأسرية: ${blueprint.title}`,
        `✨ Family Circle shuru ho gaya: ${blueprint.titleRoman || blueprint.title}`
      ),
      'success'
    );
  };

  const handleAddJourney = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJourneyTitle) return;
    const j = familyDeenOsEngine.createSharedJourney('fam_demo_1', {
      title: newJourneyTitle,
      category: 'RAMADAN_ROUTINE',
      description: newJourneyDesc || 'Shared family collective habit.',
      assignedTasks: [
        { assignedToMemberId: 'mem_1', taskTitle: 'Family collective recitation', isCompleted: false },
      ],
    });
    setFamily({ ...family, sharedJourneys: [...family.sharedJourneys, j] });
    setNewJourneyTitle('');
    setNewJourneyDesc('');
    setIsAdding(false);
  };

  const toggleTaskStatus = (journeyId: string, taskIdx: number) => {
    setFamily(prev => {
      const updatedJourneys = prev.sharedJourneys.map(j => {
        if (j.journeyId !== journeyId) return j;
        const updatedTasks = j.assignedTasks.map((t, idx) => {
          if (idx !== taskIdx) return t;
          return { ...t, isCompleted: !t.isCompleted };
        });
        return { ...j, assignedTasks: updatedTasks };
      });
      return { ...prev, sharedJourneys: updatedJourneys };
    });
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F8F9FA', paddingBottom: 60 }}>
      <Head>
        <title>Family Deen OS | AMAL OS</title>
        <meta name="description" content="Family Circles, Collective Sunnah Journeys, Tarbiyah Routines, and Bedtime Stories for Children." />
      </Head>
      <Navigation />

      <main style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <span style={{ fontSize: 28 }}>👨‍👩‍👧‍👦</span>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: '#1B4332', margin: 0 }}>
              {t('Family Deen OS', 'فیملی دین او ایس', 'نظام الدين الأسري', 'Family Deen OS')}
            </h1>
          </div>
          <p style={{ color: '#4B5563', margin: 0, fontSize: 14 }}>
            {t('Collaborative family journeys, Ramadan circles, and children\'s habits — with strict domestic privacy isolation. Personal reflections and Muhasabah remain strictly private and never leak into family views.', 'گھر والوں کے ساتھ مل کر نیکیوں کے سفر، رمضان کے معمولات اور بچوں کی تربیت — مکمل پرائیویسی کے ساتھ۔ ذاتی توبہ اور محاسبہ صرف آپ کے پاس محفوظ رہتا ہے۔', 'مسارات أسرية مشتركة وعادات إيمانية للأطفال مع حماية تامة للخصوصية الشخصية.', 'Family ke sath mil kar nek aamaal, Ramzan circles aur bachon ki tarbiyah — mukammal privacy ke sath.')}
          </p>
        </div>

        {/* Family Banner */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 14,
          padding: 24,
          border: '1px solid #E5E7EB',
          marginBottom: 24,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <span style={{ fontSize: 11, fontWeight: 800, color: '#047857', backgroundColor: '#ECFDF5', padding: '3px 8px', borderRadius: 4 }}>
                {t('VERIFIED FAMILY CIRCLE', 'مصدقہ فیملی سرکل', 'الحلقة الأسرية المعتمدة', 'Verified Family Circle')}
              </span>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: '#111827', margin: '6px 0 2px' }}>
                {family.familyName}
              </h2>
              <p style={{ fontSize: 13, color: '#6B7280', margin: 0 }}>"{family.familyMotto}"</p>
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              {family.members.map(m => (
                <div key={m.memberId} style={{ padding: '6px 12px', borderRadius: 20, backgroundColor: '#F3F4F6', fontSize: 12, fontWeight: 600, color: '#374151' }}>
                  {m.name}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Privacy Invariant Banner */}
        <div style={{
          backgroundColor: '#F0FDF4',
          borderRadius: 10,
          padding: 14,
          border: '1px solid #86EFAC',
          marginBottom: 24,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}>
          <span style={{ fontSize: 20 }}>🛡️</span>
          <div style={{ fontSize: 12, color: '#166534', lineHeight: 1.5 }}>
            <strong>{t('Domestic Privacy Guarantee:', 'گھریلو پرائیویسی کی ضمانت:', 'ضمان الخصوصية الأسرية:', 'Domestic Privacy Guarantee:')}</strong>{' '}
            {t('Personal repentance, private journaling, and individual Muhasabah are kept in your Zero-Knowledge Vault. Family members only see explicitly shared collective circles.', 'ذاتی توبہ، نجی نوٹس اور انفرادی محاسبہ آپ کے ذاتی والٹ میں محفوظ رہتے ہیں اور فیملی کے ساتھ کبھی شیئر نہیں ہوتے۔', 'التوبة الشخصية والمحاسبة الفردية محفوظة في خزينتك الخاصة ولا تظهر لأفراد الأسرة.', 'Zaati tauba, private notes aur muhasabah aapke personal vault me secure rehte hain.')}
          </div>
        </div>

        {/* Pre-Made Weekly Family Halaqah Blueprints (1-Tap Activation) */}
        <div style={{ marginBottom: 26 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div>
              <span style={{ fontSize: 11, fontWeight: 800, color: '#047857', letterSpacing: 0.8, textTransform: 'uppercase' }}>
                {t('READY-TO-USE TARBIYAH', 'تیار شدہ تربیتی معمولات', 'نماذج تربوية جاهزة', 'Ready-to-Use Tarbiyah')}
              </span>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', margin: '2px 0 0' }}>
                {t('Weekly Family Halaqah Blueprints', 'ہفتہ وار فیملی حلقہ کے اسباق', 'حلقات الأسرة الأسبوعية', 'Weekly Family Halaqah Blueprints')}
              </h3>
            </div>
            <span style={{ fontSize: 12, color: '#64748B' }}>
              {t('1-Tap Add to Family', 'ایک کلک میں شامل کریں', 'إضافة بنقرة واحدة', '1-Tap Add to Family')}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12 }}>
            {FAMILY_HALAQAH_BLUEPRINTS.map((bp) => (
              <div
                key={bp.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 12,
                  padding: 16,
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontSize: 24 }}>{bp.icon}</span>
                    <span style={{ fontSize: 10, fontWeight: 800, color: '#065F46', backgroundColor: '#ECFDF5', padding: '2px 8px', borderRadius: 4 }}>
                      {bp.category}
                    </span>
                  </div>
                  <h4 style={{ fontSize: 15, fontWeight: 800, color: '#0F172A', margin: '0 0 4px' }}>
                    {language === 'ur' ? bp.titleUrdu : language === 'roman' ? (bp.titleRoman || bp.title) : bp.title}
                  </h4>
                  {language !== 'ur' && language !== 'roman' && (
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#047857', direction: 'rtl', marginBottom: 6 }}>
                      {bp.titleUrdu}
                    </div>
                  )}
                  <p style={{ fontSize: 12, color: '#475569', margin: '0 0 10px', lineHeight: 1.4 }}>
                    {bp.description}
                  </p>
                </div>

                <button
                  onClick={() => handleActivateBlueprint(bp)}
                  style={{
                    padding: '7px 12px',
                    borderRadius: 8,
                    backgroundColor: '#065F46',
                    color: '#FFFFFF',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: 12,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                    width: '100%',
                    marginTop: 8,
                  }}
                >
                  <span>+</span>
                  <span>{t('1-Tap Add to Family Circle', 'فیملی سرکل میں شامل کریں', 'إضافة للحلقة الأسرية', 'Family Circle me Shamil Karein')}</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Shared Family Journeys */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 style={{ fontSize: 18, fontWeight: 800, color: '#1B4332', margin: 0 }}>
            {t('Shared Family Circles & Journeys', 'مشترکہ فیملی معمولات و سرکلز', 'الحلقات والمسارات الأسرية المشتركة', 'Shared Family Circles & Journeys')}
          </h3>
          <button
            onClick={() => setIsAdding(!isAdding)}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              backgroundColor: '#1B4332',
              color: '#FFFFFF',
              border: 'none',
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            {isAdding
              ? t('✕ Cancel', '✕ منسوخ کریں', '✕ إلغاء', '✕ Cancel')
              : t('+ Add Family Journey', '+ نیا فیملی معمول شامل کریں', '+ إضافة مسار أسري', '+ Naya Family Journey Add Karein')}
          </button>
        </div>

        {isAdding && (
          <form onSubmit={handleAddJourney} style={{ backgroundColor: '#FFFFFF', borderRadius: 12, padding: 20, border: '1px solid #E5E7EB', marginBottom: 20 }}>
            <h4 style={{ margin: '0 0 12px', fontSize: 15, fontWeight: 700 }}>
              {t('New Collective Family Journey', 'نیا اجتماعی خاندانی سفر', 'مسار أسري جماعي جديد', 'New Collective Family Journey')}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <input
                type="text"
                placeholder={t('Journey Title (e.g. Ramadan Suhur & Quran Routine)...', 'سفر کا عنوان (مثلاً رمضان سحری اور قرآن معمول)...', 'عنوان المسار (مثال: سحور رمضان وروتين القرآن)...', 'Journey Title...')}
                value={newJourneyTitle}
                onChange={(e) => setNewJourneyTitle(e.target.value)}
                style={{ padding: 10, borderRadius: 6, border: '1px solid #D1D5DB', fontSize: 14 }}
              />
              <textarea
                rows={2}
                placeholder={t('Description & collective goal...', 'تفصیل اور اجتماعی ہدف...', 'الوصف والهدف الجماعي...', 'Description & collective goal...')}
                value={newJourneyDesc}
                onChange={(e) => setNewJourneyDesc(e.target.value)}
                style={{ padding: 10, borderRadius: 6, border: '1px solid #D1D5DB', fontSize: 14 }}
              />
              <button
                type="submit"
                style={{ padding: '10px 18px', borderRadius: 6, backgroundColor: '#047857', color: '#FFF', border: 'none', fontWeight: 700, fontSize: 13, cursor: 'pointer', alignSelf: 'flex-start' }}
              >
                {t('Create Shared Journey', 'مشترکہ سفر بنائیں', 'إنشاء مسار مشترك', 'Create Shared Journey')}
              </button>
            </div>
          </form>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {family.sharedJourneys.map(j => (
            <div key={j.journeyId} style={{ backgroundColor: '#FFFFFF', borderRadius: 12, padding: 20, border: '1px solid #E5E7EB' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#047857', backgroundColor: '#ECFDF5', padding: '2px 8px', borderRadius: 4 }}>
                  {j.category}
                </span>
                <span style={{ fontSize: 11, color: '#6B7280' }}>
                  {t('Privacy: Opt-in Family Shared', 'پرائیویسی: خاندانی اشتراک', 'الخصوصية: مشاركة عائلية باختيارك', 'Privacy: Opt-in Family Shared')}
                </span>
              </div>
              <h4 style={{ fontSize: 17, fontWeight: 800, color: '#111827', margin: '6px 0 4px' }}>{j.title}</h4>
              <p style={{ fontSize: 13, color: '#4B5563', margin: '0 0 14px' }}>{j.description}</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {j.assignedTasks.map((task, idx) => (
                  <div
                    key={idx}
                    onClick={() => toggleTaskStatus(j.journeyId, idx)}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '10px 14px',
                      borderRadius: 8,
                      backgroundColor: task.isCompleted ? '#F0FDF4' : '#F9FAFB',
                      border: `1px solid ${task.isCompleted ? '#86EFAC' : '#E5E7EB'}`,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: 14 }}>{task.isCompleted ? '✅' : '⏳'}</span>
                      <span style={{
                        fontSize: 13,
                        color: task.isCompleted ? '#166534' : '#111827',
                        fontWeight: 600,
                        textDecoration: task.isCompleted ? 'line-through' : 'none'
                      }}>
                        {task.taskTitle}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 11, color: '#6B7280' }}>
                        {family.members.find(m => m.memberId === task.assignedToMemberId)?.name || 'Member'}
                      </span>
                      <span style={{ fontSize: 11, color: task.isCompleted ? '#166534' : '#9CA3AF', fontWeight: 600 }}>
                        {task.isCompleted
                          ? t('Done', 'مکمل', 'تم', 'Mukammal')
                          : t('Tap to Complete', 'مکمل کرنے کے لیے دبائیں', 'اضغط للاكتمال', 'Mukammal Karein')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* BEDTIME SUNNAH STORIES & TARBIYAH FOR CHILDREN */}
        <div style={{ marginTop: 32 }}>
          {/* Featured Child Seerah Book Spotlight */}
          <div
            style={{
              backgroundColor: '#EFF6FF',
              borderRadius: 14,
              padding: '20px 24px',
              border: '1px solid #BFDBFE',
              marginBottom: 24,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 16,
              boxShadow: '0 2px 8px rgba(30, 64, 175, 0.06)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, maxWidth: 640 }}>
              <span style={{ fontSize: 32 }}>📗</span>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 11, fontWeight: 800, color: '#1E40AF', backgroundColor: '#DBEAFE', padding: '2px 8px', borderRadius: 4 }}>
                    {t('CHILD TARBIYAH CURRICULUM', 'نصابِ تربیتِ اطفال', 'منهج تربية الأطفال', 'Nisab-e-Tarbiyah-e-Atfal')}
                  </span>
                  <span style={{ fontSize: 11, color: '#6B7280' }}>
                    {t('Complete Authentic Edition', 'مکمل مستند ایڈیشن', 'طبعة محققة كاملة', 'Mukammal Mustanad Edition')}
                  </span>
                </div>
                <h4 style={{ fontSize: 18, fontWeight: 800, color: '#1E3A8A', margin: '2px 0 4px' }}>
                  {t(
                    'Hamare Huzoor ﷺ (Inspiring & Accessible Prophetic Sirah for Children)',
                    'ہمارے حضور ﷺ (بچوں کے لیے آسان اور پرتاثیر سیرت النبی ﷺ)',
                    'نبينا ﷺ (سيرة نبوية ميسرة للأطفال)',
                    'Hamare Huzoor ﷺ (Bachon ke liye aasan aur pur-taseer Seerat-un-Nabi ﷺ)'
                  )}
                </h4>
                <p style={{ fontSize: 13, color: '#374151', margin: 0, lineHeight: 1.5 }}>
                  {t(
                    'A renowned authentic classical primer cultivating children\'s reverence, good manners, and deep love for the Prophet ﷺ. Now readable in full inside AMAL OS.',
                    'بچوں کو پیارے نبی ﷺ کی شفقت، آدابِ زندگی اور سچی محبت سکھانے کے لیے مستند تصنیف۔ اب مکمل کتاب ان-ایپ دستیاب ہے۔',
                    'كتاب مبسط ومؤثر لغرس محبة النبي ﷺ والآداب الإسلامية في قلوب الناشئة.',
                    'Bachon ko Pyare Nabi ﷺ ki shafqat, adab-e-zindagi aur sachi muhabbat sikhane ke liye mustanad tasneef. Ab mukammal in-app dastyab hai.'
                  )}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <a
                href="/library?work=CANON-SIRAH-HAMARE-HUZOOR"
                style={{
                  padding: '9px 16px',
                  borderRadius: 8,
                  backgroundColor: '#1E40AF',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  fontSize: 13,
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <span>📖</span>
                <span>{t('Read In-App', 'ان-ایپ مطالعہ کریں', 'قراءة داخل التطبيق', 'In-App Padhein')}</span>
              </a>
              <a
                href="/books/hamare-huzoor-sallallahu-alayhi-wasallam.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '9px 16px',
                  borderRadius: 8,
                  backgroundColor: '#FFFFFF',
                  color: '#1E40AF',
                  border: '1px solid #93C5FD',
                  textDecoration: 'none',
                  fontSize: 13,
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <span>📥</span>
                <span>{t('Download PDF (2 MB)', 'پی ڈی ایف دستاویز ڈاؤن لوڈ کریں (۲ ایم بی)', 'تحميل وثيقة PDF (٢ ميغابايت)', 'PDF Download Karein (2 MB)')}</span>
              </a>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div>
              <span style={{ fontSize: 11, fontWeight: 800, color: '#9D174D', backgroundColor: '#FDF2F8', padding: '3px 8px', borderRadius: 4 }}>
                {t('Child Moral Tarbiyah', 'ماں کی گود و تربیتِ اولاد', 'تربية الأبناء الصالحة', 'Bachon ki Tarbiyah')}
              </span>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: '#111827', margin: '4px 0 2px' }}>
                {t('Bedtime Sunnah Stories & Sleep Adab for Children', 'بچوں کے لیے مسنون کہانیاں اور خواب گاہ کے آداب', 'قصص السنة النبوية قبل النوم وآداب النوم للأطفال', 'Bachon ke liye Bedtime Sunnah Stories')}
              </h3>
              <p style={{ fontSize: 13, color: '#6B7280', margin: 0 }}>
                {t('Authentic historical stories for parents to read at bedtime, cultivating love of the Prophet ﷺ and good character in young hearts.', 'ماؤں اور والدین کے لیے مستند اسلامی واقعات تاکہ رات کو بچوں کو سناتے وقت ان کے دلوں میں عشقِ رسول ﷺ اور اچھے اخلاق کی بنیاد رکھی جا سکے۔', 'قصص نبوية وتاريخية موثقة لغرس محبة النبي ﷺ والأخلاق الحميدة في قلوب الأطفال.', 'Parents ke liye authentic Islamic kisse taake raat ko bachon ke dilon me Ishq-e-Rasool ﷺ aur ache akhlaaq ki bunyaad rakhi ja sake.')}
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {[
              {
                id: 'story-1',
                title: 'چڑیا کے بچوں کا درد اور رحمتِ عالم ﷺ',
                titleEn: 'The Mother Bird and Prophetic Mercy',
                titleRoman: 'Chidiya Ke Bachon Ka Dard Aur Rehmat-e-Aalam ﷺ',
                lesson: 'جانوروں اور پرندوں پر رحم کرنا اور ماں کے دل کا احساس۔',
                lessonRoman: 'Janwaron aur parindon par reham karna aur maa ke dard ka ehsas.',
                reference: 'سنن ابی داؤد، حدیث رقم ۲۶۷۵',
                referenceEn: 'Sunan Abi Dawud #2675',
                content: 'ایک سفر میں صحابہ نے ایک چڑیا کے گھونسلے سے دو چھوٹے بچے اٹھا لیے۔ چڑیا اپنے بچوں کی جدائی میں تڑپ کر حضور ﷺ کے اوپر منڈلانے لگی۔ رحمتِ عالم ﷺ نے فوراً فرمایا: کس نے اس چڑیا کو اس کے بچوں کی وجہ سے تکلیف دی ہے؟ جاؤ فوراً اس کے بچے واپس رکھ آؤ!',
                contentRoman: 'Ek safar mein Sahaba ne ek chidiya ke ghonsle se do chotey bachhey utha liye. Chidiya bachon ki judai mein tadap kar Huzoor ﷺ ke upar mandlane lagi. Rehmat-e-Aalam ﷺ ne foran farmaya: Kis ne is chidiya ko is ke bachon ki wajah se takleef di hai? Jao foran is ke bachon ko wapas rakh aao!',
              },
              {
                id: 'story-2',
                title: 'حضرت انس بن مالک اور نبوی شفقت',
                titleEn: 'Ten Years of Tenderness with Anas',
                titleRoman: 'Hazrat Anas Bin Malik Aur Nabawi Shafqat',
                lesson: 'بچوں کے ساتھ غصے اور ڈانٹ ڈپٹ کے بجائے نرمی اور محبت کا برتاؤ۔',
                lessonRoman: 'Bachon ke sath ghusse aur daant-dapat ke bajaye narmi aur muhabbat ka bartaav.',
                reference: 'صحیح البخاری، حدیث رقم ۶۰۳۸',
                referenceEn: 'Sahih al-Bukhari #6038',
                content: 'حضرت انس بن مالک رضی اللہ عنہ فرماتے ہیں کہ میں نے دس سال تک رسول اللہ ﷺ کی خدمت کی۔ اس تمام عرصے میں حضور ﷺ نے مجھے کبھی "اُف" تک نہ فرمایا، اور نہ کبھی کسی کام پر یہ فرمایا کہ تم نے یہ کیوں کیا یا کیوں نہ کیا!',
                contentRoman: 'Hazrat Anas bin Malik (radiyAllahu anhu) farmate hain ke main ne 10 saal tak Rasoolullah ﷺ ki khidmat ki. Is tamam arsey mein Huzoor ﷺ ne mujhe kabhi "uff" tak na farmaya, aur na kabhi kisi kaam par yeh farmaya ke tum ne yeh kyun kiya ya kyun na kiya!',
              },
              {
                id: 'story-3',
                title: 'کھجور کے تنے کا رونا اور گلے لگانا',
                titleEn: 'The Weeping Palm Trunk in the Mosque',
                titleRoman: 'Khajoor Ke Taney Ka Rona Aur Galey Lagana',
                lesson: 'رسول اللہ ﷺ سے والہانہ محبت اور درود شریف کی برکت۔',
                lessonRoman: 'Rasoolullah ﷺ se walhana muhabbat aur Durood Sharif ki barkat.',
                reference: 'صحیح البخاری، حدیث رقم ۳۵۸۴',
                referenceEn: 'Sahih al-Bukhari #3584',
                content: 'مسجدِ نبوی میں کھجور کا ایک خشک تنا تھا جس سے ٹیک لگا کر حضور ﷺ خطبہ دیتے۔ جب منبر بنا اور حضور ﷺ وہاں تشریف لے گئے، تو وہ سوکھا تنا چھوٹے بچے کی طرح بلک بلک کر رونے لگا۔ سرکار ﷺ منبر سے اترے اور اسے گلے لگایا تو وہ چپ ہوا۔',
                contentRoman: 'Masjid-e-Nabawi mein khajoor ka ek khushk tana tha jis se taik laga kar Huzoor ﷺ khutbah dete. Jab mimbar bana aur Huzoor ﷺ wahan tashreef le gaye, toh woh sookha tana chotey bachhey ki tarah bilak bilak kar roney laga. Sarkar ﷺ mimbar se utrey aur usey galey lagaya toh woh chup hua.',
              },
              {
                id: 'story-4',
                title: 'سوتے وقت فرشتوں کا حفاظتی حصار',
                titleEn: 'Bedtime Guardian Angels & 3 Quls',
                titleRoman: 'Sotey Waqt Farishton Ka Hifazati Hisar',
                lesson: 'سونے سے پہلے تینوں قل پڑھ کر دم کرنا اور آیت الکرسی کا حصار۔',
                lessonRoman: 'Soney se pehle teeno Qul padh kar dam karna aur Ayat-ul-Kursi ka hisar.',
                reference: 'صحیح البخاری، حدیث رقم ۵۰۱۷',
                referenceEn: 'Sahih al-Bukhari #5017',
                content: 'رسول اللہ ﷺ ہر رات سوتے وقت دونوں ہاتھ پھیلا کر سورۃ الاخلاص، سورۃ الفلق اور سورۃ الناس پڑھتے اور ہاتھوں پر پھونک کر سر، چہرے اور پورے جسم پر تین مرتبہ پھیرتے۔ اس سے اللہ تعالیٰ ساری رات شیاطین اور برے خوابوں سے حفاظت فرماتا ہے۔',
                contentRoman: 'Rasoolullah ﷺ har raat sotey waqt dono haath phaila kar Surah al-Ikhlas, Surah al-Falaq aur Surah an-Nas padhte aur haathon par phoonk kar sar, chehre aur poore jism par 3 martaba pherte. Is se Allah Ta\'ala saari raat shayateen aur bure khwabon se hifazat farmata hai.',
              },
            ].map((story) => {
              const displayTitle = language === 'ur' ? story.title : language === 'roman' ? story.titleRoman : story.titleEn;
              const displayContent = language === 'ur' ? story.content : language === 'roman' ? story.contentRoman : story.content;
              const displayLesson = language === 'ur' ? story.lesson : language === 'roman' ? story.lessonRoman : story.lesson;
              const isUrduStory = language === 'ur';

              return (
                <div
                  key={story.id}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 12,
                    padding: 18,
                    border: '1px solid #E5E7EB',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6, flexWrap: 'wrap', gap: 6 }}>
                      <h4 style={{
                        margin: 0,
                        fontSize: isUrduStory ? 17.5 : 15.5,
                        fontWeight: 800,
                        color: '#065F46',
                        direction: isUrduStory ? 'rtl' : 'ltr',
                        textAlign: isUrduStory ? 'right' : 'left',
                        fontFamily: isUrduStory ? 'var(--font-urdu), serif' : 'system-ui, sans-serif',
                        lineHeight: 1.4
                      }}>
                        {displayTitle}
                      </h4>
                      <span style={{ fontSize: 11, color: '#92400E', backgroundColor: '#FEF3C7', padding: '3px 8px', borderRadius: 4, fontWeight: 700, whiteSpace: 'nowrap' }}>
                        {language === 'ur' ? story.reference : story.referenceEn}
                      </span>
                    </div>
                    {language !== 'ur' && language !== 'roman' && (
                      <div style={{ fontSize: 13, color: '#4B5563', fontStyle: 'italic', marginBottom: 10 }}>
                        {story.title}
                      </div>
                    )}
                    <p style={{
                      fontSize: isUrduStory ? 14.5 : 13.5,
                      color: '#1F2937',
                      lineHeight: isUrduStory ? 1.75 : 1.6,
                      marginBottom: 14,
                      direction: isUrduStory ? 'rtl' : 'ltr',
                      textAlign: isUrduStory ? 'right' : 'left',
                      fontFamily: isUrduStory ? 'var(--font-urdu), serif' : 'system-ui, sans-serif'
                    }}>
                      {displayContent}
                    </p>
                  </div>
                  <div style={{
                    backgroundColor: '#F0FDF4',
                    padding: '10px 12px',
                    borderRadius: 8,
                    fontSize: 13,
                    color: '#166534',
                    border: '1px solid #BBF7D0',
                    direction: isUrduStory ? 'rtl' : 'ltr',
                    textAlign: isUrduStory ? 'right' : 'left',
                    lineHeight: 1.5,
                    fontFamily: isUrduStory ? 'var(--font-urdu), serif' : 'system-ui, sans-serif'
                  }}>
                    <strong>{t('Lesson & Moral: ', 'سبق و نصیحت: ', 'الدرس والعبرة: ', 'Sabaq o Nasihat: ')}</strong>{displayLesson}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
