import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Navigation } from '../components/Navigation';
import { AmalApiClient } from '../lib/api';
import { AmalTheme } from '@amal/ui';
import { showAmalToast } from '../components/Toast';
import { useLanguage } from '../context/LanguageContext';

export default function GoalsPage() {
  const { t } = useLanguage();
  const [goals, setGoals] = useState<any[]>([]);
  const [category, setCategory] = useState('SALAH');
  const [title, setTitle] = useState('');
  const [intent, setIntent] = useState('IMPROVE');
  const [outcome, setOutcome] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const categories = [
    { id: 'SALAH', label: t('Prayer (Salah)', 'نماز', 'الصلاة', 'Namaz (Salah)') },
    { id: 'QURAN', label: t('Quran', 'تلاوت قرآن', 'القرآن الكريم', 'Tilawat-e-Quran') },
    { id: 'DUA', label: t('Dua', 'دعا و مناجات', 'الدعاء', 'Dua o Munajat') },
    { id: 'DHIKR', label: t('Dhikr & Tasbih', 'ذکر و تسبیح', 'الذكر والتسبيح', 'Zikr o Tasbeeh') },
    { id: 'CHARACTER', label: t('Character (Akhlaq)', 'حسن اخلاق', 'مكارم الأخلاق', 'Husn-e-Akhlaq') },
    { id: 'PATIENCE', label: t('Patience (Sabr)', 'صبر و تحمل', 'الصبر', 'Sabr o Tahammul') },
    { id: 'ANGER', label: t('Anger Restraint', 'غصے پر ضبط', 'كظم الغيظ', 'Ghusse Par Zabt') },
    { id: 'FAMILY', label: t('Family Ties', 'صلہ رحمی', 'صلة الرحم', 'Silah-e-Rehmi') },
    { id: 'PARENTS', label: t('Parents Respect', 'والدین کی خدمت', 'بر الوالدين', 'Walidain Ki Khidmat') },
    { id: 'TIME', label: t('Time Stewardship', 'وقت کی حفاظت', 'حفظ الوقت', 'Waqt Ki Hifazat') },
    { id: 'KNOWLEDGE', label: t('Seeking Knowledge', 'حصول علم', 'طلب العلم', 'Husool-e-Ilm') },
    { id: 'RAMADAN', label: t('Fasting & Ramadan', 'روزه و رمضان', 'الصيام ورمضان', 'Rozah o Ramadan') },
  ];

  const intents = [
    { id: 'START', label: t('Start fresh habit', 'نئی عادت شروع کریں', 'بدء عادة جديدة', 'Nayi aadat shuru karein') },
    { id: 'RESTART', label: t('Restart lapsed habit', 'دوبارہ شروع کریں', 'استئناف عادة', 'Dobara shuru karein') },
    { id: 'IMPROVE', label: t('Improve consistency', 'مستقل مزاجی بہتر بنائیں', 'تحسين الاستمرارية', 'Mustaqil-mizaji behtar banayein') },
    { id: 'MAINTAIN', label: t('Maintain current state', 'موجودہ حالت برقرار رکھیں', 'الحفاظ على العادة', 'Maujuda haalat barqarar rakhein') },
    { id: 'LEARN', label: t('Learn & deepen', 'سیکھیں اور گہرائی لائیں', 'التعلم والتعمق', 'Seekhein aur samjhein') },
    { id: 'OVERCOME_FRICTION', label: t('Overcome inner friction', 'سستی اور رکاوٹ دور کریں', 'التغلب على الكسل', 'Susti o rukawat door karein') },
  ];

  const loadGoals = async () => {
    const res = await AmalApiClient.getGoals();
    if (res.success && res.data) {
      setGoals(Array.isArray(res.data) ? res.data : [res.data]);
    }
  };

  useEffect(() => {
    loadGoals();
  }, []);

  const handleCreateGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    setLoading(true);
    const res = await AmalApiClient.createGoal(category, title, intent, outcome || title);
    setLoading(false);
    if (res.success) {
      const msg = t('Goal created with Niyyah!', 'نیت کے ساتھ نیا مقصد درج کر لیا گیا!', 'تم تسجيل الهدف بالنية الصالحة!', 'Niyyah ke saath maqsad darj ho gaya!');
      setSuccessMsg(msg);
      showAmalToast(t('Niyyah registered — Barakah added to your journey', 'نیت درج ہو گئی — آپ کے سفر میں برکت شامل فرمائے', 'تم تسجيل النية — بارك الله في خطاك', 'Niyyah darj ho gayi — Safar mein barakah shamil'), 'success');
      setTitle('');
      setOutcome('');
      loadGoals();
    }
  };

  const handleToggleComplete = async (goal: any) => {
    const nextStatus = goal.status === 'COMPLETED' ? 'ACTIVE' : 'COMPLETED';
    await AmalApiClient.updateGoal(goal.id || goal.goalId, { status: nextStatus });
    showAmalToast(
      nextStatus === 'COMPLETED'
        ? t('Alhamdulillah! Goal completed.', 'الحمدللہ! مقصد مکمل ہوا۔', 'الحمد لله! تم إنجاز الهدف بنجاح.', 'Alhamdulillah! Maqsad mukammal hua.')
        : t('Goal reactivated', 'مقصد دوبارہ فعال ہو گیا', 'تمت إعادة تفعيل الهدف', 'Maqsad dobara fa\'al ho gaya'),
      'success'
    );
    loadGoals();
  };

  const handleDeleteGoal = async (id: string) => {
    if (confirm(t('Delete this goal from your active intentions?', 'کیا آپ اس مقصد کو اپنی فہرست سے ہٹانا چاہتے ہیں؟', 'هل تريد حذف هذا الهدف؟', 'Kya aap is maqsad ko hatana chahte hain?'))) {
      await AmalApiClient.deleteGoal(id);
      showAmalToast(t('Intention archived', 'مقصد ہٹا دیا گیا', 'تمت أرشفة النية', 'Maqsad hata diya gaya'), 'info');
      loadGoals();
    }
  };

  return (
    <div style={{ backgroundColor: AmalTheme.colors.surface.backgroundLight, minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <Head>
        <title>{`AMAL OS — ${t('Goals & Baselines', 'اہداف و روحانی مقاصد', 'الأهداف والنيات الصالحة', 'Ahdaf o Maqasid')}`}</title>
        <meta name="description" content="Spiritual Goals, Istiqamah Routine Tracker, and Daily Religious Milestones." />
      </Head>

      <Navigation />

      <main style={{ maxWidth: 880, margin: '0 auto', padding: '0 20px 60px' }}>
        <header style={{ marginBottom: 24 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: AmalTheme.colors.primary, letterSpacing: 1 }}>
            {t('DEEN OBJECTIVES', 'دینی مقاصد', 'مقاصد الدين', 'DEEN OBJECTIVES')}
          </span>
          <h1 style={{ fontSize: 28, fontWeight: 800, margin: '6px 0 0', color: AmalTheme.colors.text.primaryLight }}>
            {t('Your Intentional Goals', 'آپ کے دینی مقاصد و اہداف', 'أهدافك الإيمانية بالنية الصالحة', 'Aap Ke Deeni Ahdaf o Niyyatein')}
          </h1>
          <p style={{ color: AmalTheme.colors.text.secondaryLight, fontSize: 14 }}>
            {t(
              'Goals in AMAL are grounded in personal baseline observations, not spiritual scorecards or moral judgments.',
              'عمل میں اہداف کا مقصد نیت کی درستگی اور مسلسل عمل کی مشق ہے، بغیر کسی دکھاوے یا بوجھ کے۔',
              'الأهداف في عمل مبنية على الملاحظة الذاتية المستمرة والنية الخالصة بعيداً عن المباهاة.',
              'Amal mein ahdaf ka maqsad niyyah ki durustagi aur aahista aahista amal mein pukhtagi hai.'
            )}
          </p>
        </header>

        {/* Goal Creation Form */}
        <section style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 16,
          padding: 24,
          border: `1px solid ${AmalTheme.colors.surface.borderLight}`,
          marginBottom: 32,
        }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 16px' }}>
            {t('Set a New Goal with Niyyah', 'نئی نیت کے ساتھ ہدف مقرر کریں', 'تحديد هدف إيماني جديد بنية خالصة', 'Nayi Niyyah Ke Saath Hadaf Tay Karein')}
          </h2>
          {successMsg && (
            <div style={{ padding: 12, backgroundColor: '#E8F5E9', color: '#2E7D32', borderRadius: 8, marginBottom: 16, fontSize: 14 }}>
              ✓ {successMsg}
            </div>
          )}

          <form onSubmit={handleCreateGoal} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="calc-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 6, color: '#555' }}>
                  {t('Category', 'شعبہ', 'المجال', 'Shoba')}
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #CCC', fontSize: 14 }}
                >
                  {categories.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 6, color: '#555' }}>
                  {t('Intent', 'ارادہ / نیت کا رخ', 'نوع النية', 'Niyyah Ka Rukh')}
                </label>
                <select
                  value={intent}
                  onChange={(e) => setIntent(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #CCC', fontSize: 14 }}
                >
                  {intents.map((i) => <option key={i.id} value={i.id}>{i.label}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 6, color: '#555' }}>
                {t('Goal Title', 'ہدف کا عنوان', 'عنوان الهدف', 'Hadaf Ka Unwan')}
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t('e.g. Consistent Fajr in Congregation or at its time', 'مثلاً: روزانہ فجر کی نماز باجماعت یا وقت پر ادا کرنا', 'مثلاً: المحافظة على صلاة الفجر في وقتها', 'Maslan: Rozana Fajr ki namaz waqt par ada karna')}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #CCC', fontSize: 14 }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 6, color: '#555' }}>
                {t('Desired Outcome (Niyyah)', 'مطلوبہ روحانی مقصد (نیت)', 'الغاية الإيمانية المرجوة (النية)', 'Matlooba Ruhani Maqsad (Niyyah)')}
              </label>
              <input
                type="text"
                value={outcome}
                onChange={(e) => setOutcome(e.target.value)}
                placeholder={t('e.g. Build an unbreakable morning habit rooted in love for Allah', 'مثلاً: اللہ تعالیٰ کی رضا کے لیے صبح کی مستقل عادت بنانا', 'مثلاً: بناء عادة صباحية راسخة محبة لله تعالى', 'Maslan: Allah ki raza ke liye subah ki mustaqil aadat banana')}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #CCC', fontSize: 14 }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                backgroundColor: AmalTheme.colors.primary,
                color: '#FFFFFF',
                border: 'none',
                borderRadius: 8,
                padding: '12px 24px',
                fontWeight: 700,
                cursor: 'pointer',
                alignSelf: 'flex-start',
              }}
            >
              {loading
                ? t('Creating...', 'درج ہو رہا ہے...', 'جارٍ الحفظ...', 'Darj Ho Raha Hai...')
                : t('Create Goal', 'ہدف محفوظ کریں', 'تسجيل الهدف', 'Hadaf Mehfooz Karein')}
            </button>
          </form>
        </section>

        {/* Existing Goals List */}
        <section>
          <h2 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 16px' }}>
            {t('Current Active Goals', 'موجودہ فعال مقاصد', 'الأهداف الإيمانية الجارية', 'Maujuda Fa\'al Ahdaf')}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {goals.length > 0 ? goals.map((g: any) => {
              const isCompleted = g.status === 'COMPLETED';
              return (
                <div key={g.id || g.goalId} style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 12,
                  padding: 16,
                  border: `1px solid ${AmalTheme.colors.surface.borderLight}`,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  opacity: isCompleted ? 0.75 : 1,
                }}>
                  <div style={{ flex: 1, paddingRight: 16 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: AmalTheme.colors.primary, textTransform: 'uppercase' }}>
                      {g.category || 'PRACTICE'} · {g.intent || 'IMPROVE'}
                    </span>
                    <h3 style={{ fontSize: 16, fontWeight: 700, margin: '4px 0', color: '#222', textDecoration: isCompleted ? 'line-through' : 'none' }}>
                      {g.title}
                    </h3>
                    <p style={{ fontSize: 13, color: '#666', margin: 0 }}>
                      {g.desiredOutcome || g.description || t('Continuous practice', 'مسلسل عمل', 'مداومة واستمرار', 'Musalsal amal')}
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <button
                      onClick={() => handleToggleComplete(g)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: 8,
                        backgroundColor: isCompleted ? '#F3F4F6' : '#E8F5E9',
                        color: isCompleted ? '#4B5563' : '#2E7D32',
                        border: 'none',
                        fontWeight: 600,
                        fontSize: 12,
                        cursor: 'pointer',
                      }}
                    >
                      {isCompleted
                        ? t('↩ Re-activate', '↩ دوبارہ فعال کریں', '↩ إعادة تفعيل', '↩ Dobara Fa\'al Karein')
                        : t('✓ Mark Done', '✓ مکمل ہو گیا', '✓ تم الإنجاز', '✓ Mukammal')}
                    </button>
                    <button
                      onClick={() => handleDeleteGoal(g.id || g.goalId)}
                      style={{
                        padding: '6px 8px',
                        borderRadius: 8,
                        backgroundColor: '#FEE2E2',
                        color: '#991B1B',
                        border: 'none',
                        fontSize: 12,
                        cursor: 'pointer',
                      }}
                      title={t('Delete Goal', 'ہدف ہٹائیں', 'حذف الهدف', 'Hadaf Hatayein')}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              );
            }) : (
              <div style={{ backgroundColor: '#FFFFFF', padding: 24, borderRadius: 12, textAlign: 'center', color: '#4B5563' }}>
                {t(
                  'No active goals yet. Create your first goal above to start a structured journey.',
                  'فی الوقت کوئی فعال ہدف نہیں ہے۔ باقاعدہ سفر شروع کرنے کے لیے اوپر نیا ہدف درج فرمائیں۔',
                  'لا توجد أهداف نشطة حالياً. حدد هدفك الأول بالأعلى لبدء مسارك الروحي.',
                  'Filhal koi hadaf nahi hai. Upar naya maqsad darj kar ke safar shuru karein.'
                )}
              </div>
            )}
          </div>
        </section>

        {/* CHANNELIZED SULUK LIFECYCLE BAR */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 12,
          padding: 20,
          border: '1px solid #E5E7EB',
          marginTop: 24,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16,
        }}>
          <div>
            <span style={{ fontSize: 11, fontWeight: 800, color: '#6B21A8', letterSpacing: 1 }}>
              {t('SULUK & HABIT FORMATION', 'سلوک و روحانی نظام', 'مسار السلوك وتكوين العادات', 'Suluk & Aadat Saazi')}
            </span>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#111827', marginTop: 2 }}>
              {t('Turn These Goals Into Practical Habits:', 'ان مقاصد کو عملی عادات میں تبدیل کریں:', 'حوّل هذه النوايا إلى عادات عملية:', 'In Maqasid Ko Amli Aadat Banayein:')}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Link
              href="/journeys"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 14px',
                borderRadius: 8,
                backgroundColor: '#FAF5FF',
                color: '#6B21A8',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: 13,
                border: '1px solid #E9D5FF',
              }}
            >
              <span>{t('🛤️ Start Structured Journey', '🛤️ باقاعدہ سفر سلوک شروع کریں', '🛤️ بدء مسار روحي منتظم', '🛤️ Baqaeda Safar Shuru Karein')}</span>
            </Link>
            <Link
              href="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 14px',
                borderRadius: 8,
                backgroundColor: '#F3F4F6',
                color: '#374151',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: 13,
                border: '1px solid #E5E7EB',
              }}
            >
              <span>{t('⭐ Niyyah Compiler', '⭐ نیت کمپائلر', '⭐ محرر النية الصادقة', '⭐ Niyyah Compiler')}</span>
            </Link>
            <Link
              href="/reflections"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 14px',
                borderRadius: 8,
                backgroundColor: '#F3F4F6',
                color: '#374151',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: 13,
                border: '1px solid #E5E7EB',
              }}
            >
              <span>{t('📝 Evening Muhasabah', '📝 شام کا احتساب', '📝 محاسبة المساء', '📝 Aaj Ka Jaiza (Muhasabah)')}</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}