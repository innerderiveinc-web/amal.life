import React, { useState, useEffect, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Navigation } from '../components/Navigation';
import { AmalApiClient } from '../lib/api';
import { AmalTheme } from '@amal/ui';
import { showAmalToast } from '../components/Toast';
import { getAyahWisdomCard, QURAN_WISDOM_COLLECTION } from '../lib/quran-wisdom-data';
import { useLanguage } from '../context/LanguageContext';

export default function ReflectionsPage() {
  const router = useRouter();
  const { t, isUrdu, isArabic, isRomanUrdu } = useLanguage();
  const [reflectionText, setReflectionText] = useState('');
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [reflections, setReflections] = useState<any[]>([]);

  // Daily or Selected Quran Tadabbur Card
  const activePromptCard = useMemo(() => {
    if (router.query.surah && router.query.ayah) {
      const s = parseInt(router.query.surah as string, 10);
      const a = parseInt(router.query.ayah as string, 10);
      const found = getAyahWisdomCard(s, a);
      if (found) return found;
    }
    const day = new Date().getDate();
    return QURAN_WISDOM_COLLECTION[day % QURAN_WISDOM_COLLECTION.length] || QURAN_WISDOM_COLLECTION[0];
  }, [router.query.surah, router.query.ayah]);

  const handleInsertTadabbur = () => {
    if (!activePromptCard) return;
    const template = isRomanUrdu
      ? `[Qurani Tadabbur: ${activePromptCard.surahNameTransliterated} · Ayah ${activePromptCard.ayahNumber}]\nAyah: ${activePromptCard.textArabic}\nTarjuma Kanz-ul-Iman: ${activePromptCard.tarjumaKanzulIman}\n\nTadabbur Point: ${activePromptCard.tadabburPrompt.questionEnglish}\n\nMeri Zaati Niyyah o Ihtisab:\n`
      : isUrdu || isArabic
      ? `[قرآنی تدبر: ${activePromptCard.surahNameUrdu} (${activePromptCard.surahNameTransliterated}) · آیت ${activePromptCard.ayahNumber}]\nآیت: ${activePromptCard.textArabic}\nترجمہ کنز الایمان: ${activePromptCard.tarjumaKanzulIman}\n\nتدبر کا نکتہ: ${activePromptCard.tadabburPrompt.questionUrdu}\n\nمیری ذاتی نیت اور احتساب:\n`
      : `[Quranic Tadabbur: ${activePromptCard.surahNameTransliterated} · Verse ${activePromptCard.ayahNumber}]\nAyah: ${activePromptCard.textArabic}\nKanz-ul-Iman: ${activePromptCard.tarjumaKanzulIman}\n\nReflection Question: ${activePromptCard.tadabburPrompt.questionEnglish}\n\nMy Personal Intention & Accountability:\n`;
    setReflectionText((prev) => (prev ? prev + '\n\n' + template : template));
    showAmalToast(
      t(
        'Quranic reflection prompt added to your journal.',
        'قرآنی تدبر کا نکتہ آپ کے نجی محاسبہ باکس میں شامل کر دیا گیا۔',
        'تمت إضافة نقطة التدبر القرآني إلى مذكرتك.',
        'Qurani tadabbur ka point aapke journal mein darj ho gaya.'
      )
    );
  };

  const loadReflections = async () => {
    const res = await AmalApiClient.getReflections();
    if (res.success && res.data) {
      setReflections(Array.isArray(res.data) ? res.data : [res.data]);
    }
  };

  useEffect(() => {
    loadReflections();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reflectionText.trim()) return;
    setLoading(true);
    const res = await AmalApiClient.submitReflection(reflectionText.trim());
    setLoading(false);
    if (res.success) {
      setSaved(true);
      setReflectionText('');
      showAmalToast(
        t(
          'Alhamdulillah, reflection safely saved in your private vault.',
          'الحمد للہ! آپ کا محاسبہ نجی والٹ میں محفوظ ہو گیا۔',
          'الحمد لله، تم حفظ الخاطرة في خزانتك الخاصة بأمان.',
          'Alhamdulillah, reflection aapke private vault mein save ho gaya.'
        )
      );
      loadReflections();
    }
  };

  const handleDelete = async (id: string) => {
    if (
      confirm(
        t(
          'Delete this reflection permanently from your private vault?',
          'کیا آپ واقعی اس محاسبہ کو ہمیشہ کے لیے ختم کرنا چاہتے ہیں؟',
          'هل تريد حذف هذه الخاطرة نهائياً من خزانتك الخاصة؟',
          'Kya aap is reflection ko permanently delete karna chahte hain?'
        )
      )
    ) {
      await AmalApiClient.deleteReflection(id);
      showAmalToast(
        t(
          'Reflection permanently erased from local records.',
          'محاسبہ مقامی ریکارڈ سے حذف کر دیا گیا۔',
          'تم حذف الخاطرة من السجلات المحلية نهائياً.',
          'Reflection local records se delete ho gaya.'
        ),
        'info'
      );
      loadReflections();
    }
  };

  const handleExportReflections = () => {
    if (!reflections || reflections.length === 0) return;
    try {
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(reflections, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', `amal-reflections-vault-${new Date().toISOString().split('T')[0]}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showAmalToast(
        t(
          'Reflections vault exported successfully.',
          'محاسبات کی نجی فائل کامیابی سے ڈاؤنلوڈ ہو گئی۔',
          'تم تصدير خزانة الخواطر بنجاح.',
          'Reflections vault file download ho gayi.'
        ),
        'success'
      );
    } catch {
      showAmalToast('Failed to export reflections', 'warning');
    }
  };

  return (
    <div style={{ backgroundColor: AmalTheme.colors.surface.backgroundLight, minHeight: '100vh', paddingBottom: 80 }}>
      <Head>
        <title>{t('AMAL OS — Muhasabah (Private Reflection Vault)', 'امل او ایس — شام کا محاسبہ و نجی ڈائری', 'أمل — المحاسبة المسائية والخزانة الفكرية', 'AMAL OS — Evening Muhasabah (Private Reflection)')}</title>
        <meta name="description" content="Sovereign Muhasabah Journal, Private Repentance (Tawbah) Vault, and Contemplative Reflections." />
      </Head>

      <Navigation />

      <main style={{ maxWidth: 880, margin: '0 auto', padding: '0 20px 60px' }}>
        <header style={{ marginBottom: 24 }}>
          <span style={{ fontSize: 12, fontWeight: 800, color: AmalTheme.colors.primary, letterSpacing: 1 }}>
            {t('EVENING MUHASABAH', 'شام کا محاسبہ', 'المحاسبة المسائية', 'EVENING MUHASABAH')}
          </span>
          <h1 style={{ fontSize: 28, fontWeight: 800, margin: '6px 0 4px', color: AmalTheme.colors.text.primaryLight }}>
            {t(
              'Private Reflection Vault',
              'نجی محاسبہ و فکری یادداشتیں',
              'خزانة التأمل والمحاسبة الخاصة',
              'Private Reflection Vault (Aaj ka Jaiza)'
            )}
          </h1>
          <p style={{ color: AmalTheme.colors.text.secondaryLight, fontSize: 14, margin: 0 }}>
            {t(
              'Sayyiduna Umar ibn al-Khattab (RA) said: "Hold yourselves to account before you are held to account."',
              'حضرت عمر بن خطاب رضی اللہ عنہ نے فرمایا: "اپنا محاسبہ کرو اس سے پہلے کہ تمہارا محاسبہ کیا جائے۔"',
              'قال سيدنا عمر بن الخطاب رضي الله عنه: "حاسبوا أنفسكم قبل أن تحاسبوا."',
              'Sayyiduna Umar Farooq (RA) ne farmaya: "Apna hisab lo is se pehle ke tumhara hisab liya jaye."'
            )}
          </p>
        </header>

        {/* Privacy Invariant Alert */}
        <div
          style={{
            backgroundColor: '#FFF8E1',
            border: '1px solid #FFE082',
            borderRadius: 12,
            padding: 16,
            marginBottom: 24,
            fontSize: 13,
            color: '#5D4037',
            lineHeight: 1.5,
          }}
        >
          <strong>{t('Inviolable Privacy Guarantee:', 'حرمتِ پرائیویسی کی ضمانت:', 'ضمانة الخصوصية التامة:', 'Privacy Guarantee:')}</strong>{' '}
          {t(
            'Your reflections are stored locally on your device. AMAL never generates public feeds, never analyzes your personal confessions, and never shares them with anyone.',
            'آپ کی تحریریں صرف آپ کے اپنے فون میں ۱۰۰٪ محفوظ ہیں۔ امل او ایس آپ کے نجی افکار کسی کلاؤڈ یا تیسرے فرد کے ساتھ کبھی شیئر نہیں کرتا۔',
            'خواطرك محفوظة على جهازك بنسبة ١٠٠٪ دون أي مشاركة أو معالجة خارجية.',
            'Aapke reflections sirf aapke device par 100% mehfooz hain. AMAL kisi cloud ya tisre fard ke sath share nahi karta.'
          )}
        </div>

        {/* Featured Quran Tadabbur & Divine Prompt */}
        {activePromptCard && (
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 16,
              border: '1px solid #86EFAC',
              padding: '20px 24px',
              marginBottom: 24,
              boxShadow: '0 4px 15px rgba(22, 101, 52, 0.06)',
              background: 'linear-gradient(to bottom, #F0FDF4 0%, #FFFFFF 100%)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    padding: '3px 10px',
                    borderRadius: 12,
                    backgroundColor: '#166534',
                    color: '#FFFFFF',
                    letterSpacing: '0.04em',
                  }}
                >
                  {t('📖 Quranic Tadabbur', '📖 قرآنی تدبر اور محاسبہ', '📖 التدبر القرآني', '📖 Qurani Tadabbur')}
                </span>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#1E293B' }}>
                  {isUrdu
                    ? `${activePromptCard.surahNameUrdu} (${activePromptCard.surahNameTransliterated}) · آیت ${activePromptCard.ayahNumber}`
                    : `${activePromptCard.surahNameTransliterated} (${activePromptCard.surahNameArabic}) · ${t('Verse', 'آیت', 'آية', 'Ayah')} ${activePromptCard.ayahNumber}`}
                </span>
              </div>

              <Link
                href={`/quran?surah=${activePromptCard.surahNumber}`}
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: '#166534',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                <span>{t('Listen Quran & View Tafsir ➔', 'قرآن سنیں اور تفسیر دیکھیں ➔', 'استماع وقراءة التفسير ➔', 'Tilawat Sunein o Tafseer Dekhein ➔')}</span>
              </Link>
            </div>

            {/* Arabic Matn & Kanz-ul-Iman Tarjuma */}
            <div
              dir="rtl"
              style={{
                fontFamily: 'var(--font-arabic), "Amiri", serif',
                fontSize: 20,
                color: '#0F172A',
                lineHeight: 2.2,
                textAlign: 'right',
                marginBottom: 8,
              }}
            >
              {activePromptCard.textArabic}{' '}
              <span style={{ color: '#059669', fontSize: 16 }}>﴿{activePromptCard.ayahNumber}﴾</span>
            </div>

            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#047857', marginBottom: 2 }}>
                {t('Translation (Kanz-ul-Iman):', 'اردو ترجمہ (کنز الایمان فی ترجمۃ القرآن):', 'الترجمة (كنز الإيمان):', 'Tarjuma (Kanz-ul-Iman):')}
              </div>
              <div dir="rtl" style={{ fontFamily: 'var(--font-urdu), serif', fontSize: 15, color: '#334155', lineHeight: 2.0, textAlign: 'right' }}>
                {activePromptCard.tarjumaKanzulIman}
              </div>
            </div>

            {/* Tadabbur Question Box */}
            <div
              style={{
                backgroundColor: '#FEF3C7',
                borderRadius: 10,
                padding: '12px 16px',
                border: '1px solid #FDE68A',
                marginBottom: 14,
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 800, color: '#92400E', textTransform: 'uppercase', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span>💡</span>
                <span>{t('Daily Tadabbur Reflection Prompt:', 'فکر و تدبر کا نکتہ:', 'نقطة للتأمل والتدبر:', 'Aaj ka Tadabbur Point:')}</span>
              </div>
              {isUrdu ? (
                <div dir="rtl" style={{ fontFamily: 'var(--font-urdu), serif', fontSize: 14, color: '#78350F', lineHeight: 1.9, textAlign: 'right', marginBottom: 4 }}>
                  {activePromptCard.tadabburPrompt.questionUrdu}
                </div>
              ) : isArabic ? (
                <div dir="rtl" style={{ fontFamily: 'var(--font-arabic), "Amiri", serif', fontSize: 15, color: '#78350F', lineHeight: 1.9, textAlign: 'right', marginBottom: 4 }}>
                  {activePromptCard.tadabburPrompt.questionEnglish}
                </div>
              ) : (
                <div style={{ fontSize: 13, color: '#78350F', fontWeight: 600, marginBottom: 4 }}>
                  &ldquo;{activePromptCard.tadabburPrompt.questionEnglish}&rdquo;
                </div>
              )}
            </div>

            {/* Action: Insert into reflection */}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={handleInsertTadabbur}
                style={{
                  padding: '8px 16px',
                  borderRadius: 8,
                  backgroundColor: '#166534',
                  color: '#FFFFFF',
                  fontSize: 12,
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <span>✍️</span>
                <span>
                  {t(
                    'Add this reflection prompt to daily journal',
                    'اس قرآنی سوال کو اپنے محاسبہ نوٹ میں شامل کریں',
                    'إدراج السؤال القرآني في المذكرة',
                    'Yeh sawal apne journal mein shaamil karein'
                  )}
                </span>
              </button>
            </div>
          </div>
        )}

        {saved ? (
          <div
            style={{
              backgroundColor: '#E8F5E9',
              border: '1px solid #C8E6C9',
              borderRadius: 16,
              padding: 24,
              textAlign: 'center',
              color: '#2E7D32',
              marginBottom: 32,
            }}
          >
            <h3 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 8px' }}>
              {t(
                'Alhamdulillah, Reflection Recorded',
                'الحمد للہ! آپ کا محاسبہ محفوظ ہو گیا',
                'الحمد لله، تم تسجيل الخاطرة بنجاح',
                'Alhamdulillah, Reflection Record Ho Gaya'
              )}
            </h3>
            <p style={{ margin: '0 0 16px', fontSize: 14 }}>
              {t(
                'Your reflection has been safely stored in your private vault.',
                'آپ کا محاسبہ آپ کے نجی والٹ میں محفوظ ہو چکا ہے۔',
                'تم حفظ تأملك في الخزانة الخاصة بأمان.',
                'Aapka reflection private vault mein save ho chuka hai.'
              )}
            </p>
            <button
              onClick={() => setSaved(false)}
              style={{
                backgroundColor: AmalTheme.colors.primary,
                color: '#FFF',
                border: 'none',
                borderRadius: 8,
                padding: '10px 20px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {t('Write Another Reflection', 'نیا محاسبہ لکھیں', 'كتابة خاطرة جديدة', 'Naya Reflection Likhein')}
            </button>
          </div>
        ) : (
          <section
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 16,
              padding: 24,
              border: `1px solid ${AmalTheme.colors.surface.borderLight}`,
              marginBottom: 32,
            }}
          >
            <form onSubmit={handleSubmit}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 700, marginBottom: 8, color: '#333' }}>
                {t(
                  'How was your heart today? What went well, and what friction did you experience?',
                  'آج آپ کے دل کی کیا کیفیت رہی؟ کن امور میں خیر نصیب ہوئی اور کہاں نفس سے غفلت ہوئی؟',
                  'كيف كان قلبك اليوم؟ ما الذي وُفقت إليه وما التقصير الذي شعرت به؟',
                  'Aaj aapke dil ki kya kaifiyat rahi? Kahan khair hui aur kahan nafsi susti hui?'
                )}
              </label>
              <textarea
                rows={5}
                value={reflectionText}
                onChange={(e) => setReflectionText(e.target.value)}
                placeholder={t(
                  'e.g. Felt grateful for morning Fajr in congregation. Struggled with staying focused during work hours, need to take a 5-minute break before Dhuhr...',
                  'مثلاً: فجر باجماعت نصیب ہونے پر شکر ادا کیا۔ دفتر میں وقت ضائع ہونے کا احساس ہوا، کل ظہر سے قبل ۵ منٹ کا محاسبہ کرنا ہے...',
                  'مثال: الحمد لله على صلاة الفجر في جماعة. واجهت بعض التشتت في العمل...',
                  'e.g. Fajr ba-jama\'at par shukr ada kiya. Dhuhr ke waqt thoda focus banana hai...'
                )}
                style={{
                  width: '100%',
                  padding: 14,
                  borderRadius: 10,
                  border: '1px solid #DDD',
                  fontSize: 14,
                  lineHeight: 1.6,
                  fontFamily: 'inherit',
                  boxSizing: 'border-box',
                  marginBottom: 16,
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
                <span style={{ fontSize: 12, color: '#888' }}>
                  {t(
                    'Stored with SHA-256 integrity · 100% Private Local Storage',
                    '۱۰۰٪ نجی و محفوظ اسٹوریج · کلاؤڈ پروفائلنگ سے پاک',
                    'تخزين محلي خاص بنسبة ١٠٠٪ · محمي وموثق',
                    '100% Private Local Storage · Zero Cloud Profiling'
                  )}
                </span>
                <button
                  type="submit"
                  disabled={loading || !reflectionText.trim()}
                  style={{
                    backgroundColor: AmalTheme.colors.primary,
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: 8,
                    padding: '12px 24px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  {loading
                    ? t('Saving securely...', 'محفوظ ہو رہا ہے...', 'جاري الحفظ بأمان...', 'Mehfooz ho raha hai...')
                    : t('Save to Private Vault', 'نجی والٹ میں محفوظ کریں', 'حفظ في الخزانة الخاصة', 'Private Vault mein Save Karein')}
                </button>
              </div>
            </form>
          </section>
        )}

        {/* Past Reflections List */}
        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0, color: '#1B4332' }}>
              {t(
                `Your Past Reflections (${reflections.length})`,
                `آپ کے سابقہ محاسبات (${reflections.length})`,
                `خواطرك ومحاسباتك السابقة (${reflections.length})`,
                `Aapke Guzishta Reflections (${reflections.length})`
              )}
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {reflections.length > 0 && (
                <button
                  type="button"
                  onClick={handleExportReflections}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 5,
                    padding: '4px 10px',
                    borderRadius: 6,
                    fontSize: 12,
                    fontWeight: 700,
                    backgroundColor: '#F1F5F9',
                    color: '#0F172A',
                    border: '1px solid #CBD5E1',
                    cursor: 'pointer',
                  }}
                  title={t('Export reflections vault to JSON backup', 'محاسبات کا بیک اپ ڈاؤنلوڈ کریں', 'تصدير نسخة احتياطية من الخواطر', 'Reflections backup download karein')}
                >
                  <span>📥</span>
                  <span>{t('Export Vault (JSON)', 'بیک اپ ڈاؤنلوڈ', 'تصدير الخزانة', 'Export Vault')}</span>
                </button>
              )}
              <span style={{ fontSize: 12, color: '#6B7280' }}>🔒 {t('Local & Encrypted', 'مقامی اور محفوظ', 'محلي ومشفر', 'Local & Encrypted')}</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {reflections.length > 0 ? (
              reflections.map((r: any) => (
                <div
                  key={r.id}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 12,
                    padding: 18,
                    border: `1px solid ${AmalTheme.colors.surface.borderLight}`,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: AmalTheme.colors.primary, textTransform: 'uppercase' }}>
                      {r.type || 'DAILY_MUHASABAH'} • {new Date(r.timestamp).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <button
                      onClick={() => handleDelete(r.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#64748B',
                        fontWeight: 600,
                        fontSize: 12,
                        cursor: 'pointer',
                        padding: '2px 6px',
                        borderRadius: 4,
                      }}
                      title={t('Delete reflection', 'محاسبہ حذف کریں', 'حذف الخاطرة', 'Delete reflection')}
                    >
                      🗑️ {t('Delete', 'حذف کریں', 'حذف', 'Delete')}
                    </button>
                  </div>
                  <p style={{ margin: 0, fontSize: 14, color: '#374151', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                    {r.content}
                  </p>
                </div>
              ))
            ) : (
              <div style={{ backgroundColor: '#FFFFFF', padding: 24, borderRadius: 12, textAlign: 'center', color: '#6B7280', fontSize: 14 }}>
                {t(
                  'No reflections recorded yet. Your private reflections will appear here.',
                  'ابھی تک کوئی محاسبہ درج نہیں ہوا۔ آپ کی نجی تحریریں یہاں ظاہر ہوں گی۔',
                  'لم يتم تسجيل أي خواطر بعد. ستظهر مذكراتك الخاصة هنا.',
                  'Abhi tak koi reflection record nahi hua. Aapke private reflections yahan dikhenge.'
                )}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
