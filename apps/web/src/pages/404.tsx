import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Navigation } from '../components/Navigation';
import { useLanguage } from '../context/LanguageContext';

export default function Custom404() {
  const { t, language } = useLanguage();

  return (
    <div style={{ backgroundColor: '#F8FAF9', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <Head>
        <title>{`404 — ${t('Page Not Found', 'صفحہ دستیاب نہیں ہے', 'الصفحة غير موجودة', 'Safah Dastyab Nahi Hai')} | AMAL OS`}</title>
      </Head>
      <Navigation />

      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
        <div
          style={{
            maxWidth: 580,
            width: '100%',
            backgroundColor: '#FFFFFF',
            borderRadius: 20,
            padding: '40px 32px',
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
            border: '1px solid #E2E8F0',
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 16 }}>🕋</div>
          
          <div style={{ fontFamily: 'var(--font-arabic), serif', fontSize: 26, color: '#064E3B', marginBottom: 8, fontWeight: 700 }}>
            فَفِرُّوا إِلَى اللَّهِ
          </div>
          <div style={{ fontSize: 13, color: '#059669', fontWeight: 600, marginBottom: 20 }}>
            {t(
              '“So flee to Allah...” (Surah Adh-Dhariyat 51:50)',
              '’’تو اللہ کی طرف دوڑو...‘‘ (سورۃ الذاریات: ۵۰)',
              '﴿فَفِرُّوا إِلَى اللَّهِ﴾ [الذاريات: ٥٠]',
              '“Toh Allah ki taraf daudho...” (Surah Adh-Dhariyat 51:50)'
            )}
          </div>

          <h1 style={{ fontSize: 22, fontWeight: 800, color: '#0F172A', margin: '0 0 10px' }}>
            {t('Page Not Found', 'صفحہ دستیاب نہیں ہے', 'الصفحة غير موجودة', 'Safah Dastyab Nahi Hai')}
          </h1>
          <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.6, margin: '0 0 28px' }}>
            {t(
              'The requested page does not exist or may have been relocated. You can return home or navigate directly to the primary spiritual stations below:',
              'مطلوبہ صفحہ دستیاب نہیں ہے یا اس کا پتہ تبدیل ہو چکا ہے۔ آپ ہوم اسکرین پر واپس جا سکتے ہیں یا درج ذیل اہم شعبہ جات ملاحظہ فرمائیں:',
              'الصفحة المطلوبة غير موجودة أو تم نقلها. يمكنك العودة إلى الصفحة الرئيسية أو تصفح الأقسام التالية:',
              'Matlooba page dastyab nahi hai ya relocate ho chuka hai. Aap Home par wapas ja sakte hain ya zail ke ahem sections par ja sakte hain:'
            )}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 10, marginBottom: 28 }}>
            <Link
              href="/"
              style={{
                padding: '12px',
                borderRadius: 12,
                backgroundColor: '#ECFDF5',
                color: '#065F46',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: 13,
                border: '1px solid #A7F3D0',
              }}
            >
              🏠 {t('Home', 'مرکز (ہوم)', 'الرئيسية', 'Home')}
            </Link>
            <Link
              href="/quran"
              style={{
                padding: '12px',
                borderRadius: 12,
                backgroundColor: '#F0FDF4',
                color: '#166534',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: 13,
                border: '1px solid #BBF7D0',
              }}
            >
              📖 {t('Quran', 'قرآن مجید', 'القرآن الكريم', 'Quran Majeed')}
            </Link>
            <Link
              href="/prayer"
              style={{
                padding: '12px',
                borderRadius: 12,
                backgroundColor: '#EFF6FF',
                color: '#1E40AF',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: 13,
                border: '1px solid #BFDBFE',
              }}
            >
              🕌 {t('Prayer Times', 'اوقاتِ نماز', 'مواقيت الصلاة', 'Auqat-e-Namaz')}
            </Link>
            <Link
              href="/tasbih"
              style={{
                padding: '12px',
                borderRadius: 12,
                backgroundColor: '#FFFBEB',
                color: '#92400E',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: 13,
                border: '1px solid #FDE68A',
              }}
            >
              📿 {t('Tasbih', 'تسبیح', 'المسبحة', 'Tasbih')}
            </Link>
          </div>

          <Link
            href="/"
            style={{
              display: 'inline-block',
              padding: '12px 28px',
              borderRadius: 12,
              backgroundColor: '#064E3B',
              color: '#FFFFFF',
              textDecoration: 'none',
              fontWeight: 800,
              fontSize: 14,
              boxShadow: '0 2px 8px rgba(6, 78, 59, 0.25)',
            }}
          >
            {t('Return to Safety (Home)', 'ہوم پر واپس جائیں', 'العودة إلى الصفحة الرئيسية', 'Wapas Home Par Jayein')}
          </Link>
        </div>
      </main>
    </div>
  );
}