import React, { useState } from 'react';
import Head from 'next/head';
import { Navigation } from '../components/Navigation';
import { offlineResilienceEngine, OfflinePilgrimageRitesPack, OfflineBundleStatus } from '@amal/amal-engine';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import { useLanguage } from '../context/LanguageContext';

export default function HajjUmrahOfflinePage() {
  const { t, language, isUrdu, isRtl } = useLanguage();
  const rites = offlineResilienceEngine.getPilgrimageRites();
  const bundleStatus: OfflineBundleStatus = offlineResilienceEngine.getOfflineBundleStatus();
  const [selectedStage, setSelectedStage] = useState<OfflinePilgrimageRitesPack['stage']>('IHRAM');
  const { playTrack } = useAudioPlayer();

  const activePack = rites.find((r) => r.stage === selectedStage) || rites[0]!;

  const getStageTitle = (stage: string, defaultEn: string, defaultUr: string) => {
    switch (stage) {
      case 'IHRAM':
        return t('Entering Ihram at Miqat', 'میقات سے احرام باندھنا', 'الإحرام من الميقات', 'Miqat Se Ihram Bandhna');
      case 'TAWAF':
        return t('Tawaf around Kaaba', 'خانہ کعبہ کا طواف', 'الطواف حول الكعبة المشرفة', 'Khanah Kaaba Ka Tawaf');
      case 'SAI':
        return t("Sa'i between Safa & Marwah", 'صفا اور مروہ کی سعی', 'السعي بين الصفا والمروة', "Safa o Marwah Ki Sa'i");
      case 'ARAFAT':
        return t('Wuquf at Arafat (9th Dhul Hijjah)', 'میدانِ عرفات میں وقوف (۹ ذوالحجہ)', 'الوقوف بعرفة', 'Maidan-e-Arafat Mein Wuquf');
      case 'MUZDALIFAH':
        return t('Night Stay at Muzdalifah', 'مزدلفہ میں رات گزارنا', 'المبيت بمزدلفة', 'Muzdalifah Mein Shab Guzarna');
      case 'MINA_RAMY':
        return t('Ramy Jamarat & Mina Days', 'رمیِ جمرات و ایامِ منیٰ', 'رمي الجمرات وأيام منى', 'Ramy-e-Jamarat o Ayyam-e-Mina');
      default:
        return t(defaultEn, defaultUr, defaultUr, defaultEn);
    }
  };

  return (
    <div style={{ backgroundColor: '#F8F9FA', minHeight: '100vh', paddingBottom: 80, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <Head>
        <title>{`AMAL OS — ${t('100% Offline Hajj & Umrah Travel Guide', '۱۰۰٪ آف لائن حج و عمرہ رہبر', 'دليل الحج والعمرة دون إنترنت', '100% Offline Hajj o Umrah Safar Guide')}`}</title>
        <meta name="description" content="Interactive Hajj and Umrah Step-by-Step Guide, Sacred Pilgrimage Map, and Authentic Supplications." />
      </Head>
      <Navigation />

      <main style={{ maxWidth: 900, margin: '0 auto', padding: '0 20px' }}>
        {/* Header Banner */}
        <div style={{
          backgroundColor: '#1E3A8A',
          borderRadius: 16,
          padding: '24px 28px',
          color: '#FFFFFF',
          marginBottom: 24,
        }}>
          <span style={{ fontSize: 11, fontWeight: 800, color: '#93C5FD', letterSpacing: 1.5, textTransform: 'uppercase' }}>
            {t('ZERO-NETWORK PILGRIMAGE RESILIENCE', 'بغیر انٹرنیٹ کے مکمل سفری رہنمائی', 'خدمة الحج والعمرة دون اتصال بالشبكة', 'ZERO-NETWORK PILGRIMAGE RESILIENCE')}
          </span>
          <h1 style={{ fontSize: 26, fontWeight: 900, margin: '6px 0 4px' }}>
            {t('Hajj & Umrah 100% Offline Travel Pack', 'حج و عمرہ ۱۰۰٪ آف لائن سفری گائیڈ', 'حقيبة الحج والعمرة الشاملة دون إنترنت', 'Hajj o Umrah 100% Offline Safar Guide')}
          </h1>
          <p style={{ margin: 0, fontSize: 14, color: '#DBEAFE', maxWidth: 640 }}>
            {t(
              'Guaranteed zero-network availability during Tawaf, Sa\'i, Arafat, and international flights. Step-by-step Sunnah rites, authentic Prophetic Duas, and offline solar calculation.',
              'طواف، سعی، عرفات اور دورانِ پرواز انٹرنیٹ کے بغیر مکمل دستیابی۔ مسنون طریقے، دعائیں اور نماز کے اوقات۔',
              'دليل موثق لأعمال الحج والعمرة والأدعية النبوية يعمل بصورة كاملة دون الحاجة لشبكة الإنترنت.',
              'Tawaf, Sa\'i, Arafat aur safar ke dauran baghair internet ke mukammal dastiyabi. Sunnat tareeqah aur Masnoon Dua\'ein.'
            )}
          </p>
        </div>

        {/* Offline Cache Status Card */}
        <div style={{
          backgroundColor: '#EFF6FF',
          border: '1px solid #BFDBFE',
          borderRadius: 12,
          padding: 16,
          marginBottom: 24,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 10,
        }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#1E40AF' }}>
              ✓ {t('LOCAL OFFLINE BUNDLE CACHED', 'مقامی آف لائن ڈیٹا محفوظ ہے', 'تم حفظ الحزمة المحلية دون إنترنت', 'Local Offline Data Mehfooz Hai')} ({bundleStatus.cachedStorageKb} KB)
            </div>
            <div style={{ fontSize: 11, color: '#3B82F6', marginTop: 2 }}>
              {t('Version: ', 'ورژن: ', 'الإصدار: ', 'Version: ')}{bundleStatus.bundleVersion} • {t('Synced: ', 'آخری مطابقت: ', 'تاريخ التحديث: ', 'Synced: ')}{new Date(bundleStatus.lastSyncedTimestamp).toLocaleDateString()}
            </div>
          </div>
          <span style={{ fontSize: 11, backgroundColor: '#DBEAFE', color: '#1E40AF', padding: '4px 10px', borderRadius: 12, fontWeight: 700 }}>
            {t('No Internet Connection Required', 'انٹرنیٹ کنکشن کی ضرورت نہیں', 'يعمل بالكامل دون إنترنت', 'Internet Ki Zaroorat Nahi')}
          </span>
        </div>

        {/* Pilgrimage Stages Navigation */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
          {rites.map((r) => {
            const isSelected = selectedStage === r.stage;
            const stageLabel = getStageTitle(r.stage, r.title, r.titleUrdu);
            return (
              <button
                key={r.stage}
                onClick={() => setSelectedStage(r.stage)}
                style={{
                  padding: '10px 18px',
                  borderRadius: 8,
                  border: 'none',
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: 'pointer',
                  backgroundColor: isSelected ? '#1E3A8A' : '#FFFFFF',
                  color: isSelected ? '#FFFFFF' : '#4B5563',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  transition: 'all 0.15s ease',
                }}
              >
                {stageLabel}
              </button>
            );
          })}
        </div>

        {/* Active Stage Guide Card */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 14,
          padding: 24,
          border: '1px solid #E5E7EB',
          marginBottom: 20,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: '#1E3A8A', margin: 0 }}>
                {getStageTitle(activePack.stage, activePack.title, activePack.titleUrdu)}
              </h2>
              <div style={{ fontSize: 14, color: '#6B7280', marginTop: 2 }}>
                {t('Location: ', 'مقام: ', 'المكان: ', 'Maqam: ')}{activePack.location}
              </div>
            </div>
          </div>

          {/* Essential Sunnah Actions */}
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#111827', marginBottom: 8, textTransform: 'uppercase' }}>
              {t('Essential Sunnah Actions:', 'اہم مسنون اعمال:', 'السنن والواجبات الأساسية:', 'Ahem Sunnat Aamaal:')}
            </div>
            {(activePack?.essentialSunnahActions || []).map((action, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, fontSize: 13, color: '#374151', marginBottom: 6 }}>
                <span style={{ color: '#2563EB', fontWeight: 800 }}>✓</span>
                <span>{action}</span>
              </div>
            ))}
          </div>

          {/* Authentic Duas */}
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#111827', marginBottom: 8, textTransform: 'uppercase' }}>
              {t('Authentic Duas for this Stage:', 'اس مرحلے کی مسنون دعائیں:', 'الأدعية المأثورة لهذه المرحلة:', 'Is Marhale Ki Masnoon Dua\'ein:')}
            </div>
            {(activePack?.authenticDuas || []).map((dua, i) => (
              <div key={i} style={{
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: 10,
                padding: 16,
                marginBottom: 10,
              }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#1E3A8A', marginBottom: 6 }}>
                  {dua.title}
                </div>
                <div style={{ fontSize: 20, fontFamily: 'var(--font-arabic), serif', direction: 'rtl', textAlign: 'right', color: '#0F172A', lineHeight: 1.8, marginBottom: 8 }}>
                  {dua.arabic}
                </div>
                <div style={{
                  fontSize: 13,
                  color: '#475569',
                  fontStyle: 'italic',
                  marginBottom: 4,
                  direction: isRtl ? 'rtl' : 'ltr',
                  textAlign: isRtl ? 'right' : 'left',
                  fontFamily: isUrdu ? 'var(--font-urdu), serif' : 'inherit'
                }}>
                  {dua.urdu}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                  <div style={{ fontSize: 11, color: '#64748B' }}>
                    {t('Source: ', 'ماخذ: ', 'المصدر: ', 'Sanad: ')}{dua.reference}
                  </div>
                  <button
                    onClick={() =>
                      playTrack({
                        id: `hajj-dua-${i}`,
                        title: dua.title,
                        subtitle: `${getStageTitle(activePack.stage, activePack.title, activePack.titleUrdu)} • ${dua.reference}`,
                        audioUrl: dua.audioUrl || 'https://archive.org/download/talbiyat/Talbiya.mp3',
                        reciter: 'Hajj Supplication',
                        arabicSnippet: dua.arabic,
                      })
                    }
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      padding: '4px 10px',
                      borderRadius: 6,
                      backgroundColor: '#EFF6FF',
                      color: '#1E40AF',
                      border: '1px solid #BFDBFE',
                      fontSize: 11,
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    <span>▶</span>
                    <span>{t('Listen Dua Audio', 'دعا سنیں', 'استمع إلى الدعاء', 'Dua Audio Sunein')}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Mistakes to Avoid */}
          <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 10, padding: 14, fontSize: 12, color: '#991B1B' }}>
            <div style={{ fontWeight: 800, marginBottom: 4 }}>
              ⚠️ {t('Common Errors to Avoid:', 'اہم غلطیاں جن سے بچنا ضروری ہے:', 'أخطاء شائعة ينبغي تجنبها:', 'Ahem Ghalatiyan Jin Se Bachna Zaroori Hai:')}
            </div>
            {(activePack?.commonMistakesToAvoid || []).map((err, i) => (
              <div key={i} style={{ marginTop: 2 }}>• {err}</div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
