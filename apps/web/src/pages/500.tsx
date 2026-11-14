import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Navigation } from '../components/Navigation';
import { useLanguage } from '../context/LanguageContext';

export default function Custom500() {
  const { t } = useLanguage();

  return (
    <div style={{ backgroundColor: '#F8FAF9', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <Head>
        <title>{`500 — ${t('System Resilience Intercept', 'عارضی تکنیکی تعطل', 'خطأ في النظام', 'System Resilience Intercept')} | AMAL OS`}</title>
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
          <div style={{ fontSize: 48, marginBottom: 16 }}>🛡️</div>
          
          <div style={{ fontFamily: 'var(--font-arabic), serif', fontSize: 26, color: '#064E3B', marginBottom: 8, fontWeight: 700 }}>
            حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ
          </div>
          <div style={{ fontSize: 13, color: '#059669', fontWeight: 600, marginBottom: 20 }}>
            {t(
              '“Sufficient for us is Allah, and He is the best Disposer of affairs.” (Al-Imran 3:173)',
              '’’ہمیں اللہ کافی ہے اور کیا ہی اچھا کارساز ہے۔‘‘ (آل عمران: ۱۷۳)',
              '﴿حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ﴾ [آل عمران: ١٧٣]',
              '“Hamein Allah kaafi hai aur kya hi achha karsaaz hai.” (Al-Imran 3:173)'
            )}
          </div>

          <h1 style={{ fontSize: 22, fontWeight: 800, color: '#0F172A', margin: '0 0 10px' }}>
            {t('System Resilience Intercept', 'عارضی تکنیکی تعطل', 'استجابة النظام الاستثنائية', 'Arzi Technical Masala')}
          </h1>
          <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.6, margin: '0 0 28px' }}>
            {t(
              'A temporary system intercept occurred. Your local spiritual data and reflections remain securely stored on your device. Please refresh the page or return to the main dashboard.',
              'عارضی تکنیکی رکاوٹ پیش آئی ہے۔ آپ کا مقامی روحانی ڈیٹا اور ذاتی نوٹس ڈیوائس پر مکمل محفوظ ہیں۔ برائے مہربانی صفحہ ریفریش فرمائیں یا مین ڈیش بورڈ پر واپس تشریف لے جائیں۔',
              'حدث توقف مؤقت. تبقى بياناتك الإيمانية وملاحظاتك محفوظة بأمان على جهازك. يُرجى تحديث الصفحة أو العودة إلى لوحة التحكم.',
              'Arzi technical maslah paish aaya hai. Aap ka data mehfooz hai. Baraye meherbani page reload karein ya dashboard par jayein.'
            )}
          </p>

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
            {t('Reload AMAL OS Dashboard', 'ڈیش بورڈ پر واپس جائیں', 'العودة إلى لوحة التحكم', 'Dashboard Par Wapas Jayein')}
          </Link>
        </div>
      </main>
    </div>
  );
}