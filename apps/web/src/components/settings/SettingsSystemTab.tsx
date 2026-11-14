import React from 'react';
import { exportSovereignBackup, restoreSovereignBackup } from '../../lib/sovereign-backup';
import { showAmalToast } from '../Toast';

interface SettingsSystemTabProps {
  apiHealth: 'checking' | 'online' | 'offline';
  storageUsage: string;
  cachingProgress: { active: boolean; current: number; total: number } | null;
  handlePrecacheAllQuran: () => void;
  handleClearCache: () => void;
  t: (en: string, ur?: string, ar?: string, roman?: string) => string;
}

export function SettingsSystemTab({
  apiHealth,
  storageUsage,
  cachingProgress,
  handlePrecacheAllQuran,
  handleClearCache,
  t,
}: SettingsSystemTabProps) {
  return (
    <div>
      <h2 style={{ margin: '0 0 16px', fontSize: 20, fontWeight: 800, color: '#111827' }}>
        {t('Platform Diagnostics & System Status', 'سسٹم اسٹیٹس و ڈائیگنوسٹکس', 'تشخيص النظام وحالة المنصة', 'Platform Diagnostics & System Status')}
      </h2>
      <p style={{ margin: '0 0 24px', fontSize: 13, color: '#6B7280' }}>
        {t('Live runtime health, sovereign storage status, and engine version telemetry.', 'لائیو سسٹم ہیلتھ، اسٹوریج اور ایپ کا ورژن۔', 'حالة النظام الحية، مساحة التخزين، ومعلومات الإصدار.', 'Live runtime health, local storage aur app version.')}
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 16,
          marginBottom: 24,
        }}
      >
        <div style={{ padding: 16, borderRadius: 10, backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>
            {t('Backend API Gateway', 'بیک اینڈ اے پی آئی', 'بوابة API', 'Backend API Gateway')}
          </div>
          <div style={{ fontSize: 18, fontWeight: 800, color: apiHealth === 'online' ? '#059669' : '#D97706', marginTop: 4 }}>
            {apiHealth === 'online' ? '🟢 Online (200 OK)' : '🟡 Local Sovereign Fallback (Offline Mode)'}
          </div>
        </div>

        <div style={{ padding: 16, borderRadius: 10, backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>
            {t('Service Worker Cache', 'سروس ورکر کیش', 'ذاكرة التخزين المؤقت', 'Service Worker Cache')}
          </div>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#059669', marginTop: 4 }}>
            ⚡ 100% Offline PWA Ready
          </div>
        </div>

        <div style={{ padding: 16, borderRadius: 10, backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>
            {t('Sovereign Storage Footprint', 'استعمال شدہ اسٹوریج', 'حجم التخزين المستخدم', 'Used Storage Footprint')}
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#111827', marginTop: 4 }}>
            {storageUsage}
          </div>
        </div>

        <div style={{ padding: 16, borderRadius: 10, backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>
            {t('AMAL OS Engine Version', 'امل او ایس انجن ورژن', 'إصدار محرك أمل', 'AMAL OS Engine Version')}
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#111827', marginTop: 4 }}>
            V1.0.0 (Release 2026.10) · by Qsura India Pvt Ltd
          </div>
        </div>
      </div>

      {/* Progressive Web App & Offline Corpus Controls */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #D1D5DB',
          borderRadius: 12,
          padding: 20,
          marginBottom: 24,
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        }}
      >
        <h3 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 800, color: '#111827', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>📲</span>
          <span>{t('PWA Installation & Offline Corpus Sentinel', 'ہوم اسکرین انسٹالیشن و مکمل آف لائن قرآن', 'تثبيت التطبيق والمصحف الكامل أوفلاين', 'PWA Installation & Offline Access')}</span>
        </h3>
        <p style={{ margin: '0 0 16px', fontSize: 13, color: '#6B7280', lineHeight: 1.5 }}>
          {t('AMAL OS can operate 100% offline without any internet connection. You can install it on your home screen or precache the complete Quran corpus locally on this device.', 'امل او ایس بغیر انٹرنیٹ کے 100% آف لائن چل سکتا ہے۔ آپ اسے اپنی موبائل ہوم اسکرین پر انسٹال کر سکتے ہیں یا مکمل قرآن پاک ڈاؤن لوڈ کر سکتے ہیں۔', 'يعمل نظام أمل بنسبة ١٠٠٪ دون اتصال بالإنترنت. يمكنك تثبيته على الشاشة الرئيسية أو تحميل المصحف الشريف كاملاً على هذا الجهاز.', 'AMAL OS bina internet ke 100% offline chal sakta hai. Aap ise home screen par install karein ya mukammal Quran offline save karein.')}
        </p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button
            onClick={() => {
              if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('amal-open-install'));
            }}
            style={{
              padding: '10px 18px',
              backgroundColor: '#064E3B',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <span>📲</span>
            <span>{t('Install AMAL OS on Device', 'امل او ایس ہوم اسکرین پر انسٹال کریں', 'تثبيت أمل على الجهاز', 'AMAL OS Device par Install Karein')}</span>
          </button>

          <button
            onClick={handlePrecacheAllQuran}
            disabled={Boolean(cachingProgress?.active)}
            style={{
              padding: '10px 18px',
              backgroundColor: cachingProgress?.active ? '#E5E7EB' : '#F0FDF4',
              color: cachingProgress?.active ? '#9CA3AF' : '#166534',
              border: '1px solid #86EFAC',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 700,
              cursor: cachingProgress?.active ? 'default' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <span>📥</span>
            <span>
              {cachingProgress?.active
                ? t(`Downloading: Surah ${cachingProgress.current}/${cachingProgress.total}...`, `ڈاؤن لوڈنگ جاری: سورت ${cachingProgress.current}/${cachingProgress.total}...`, `جاري التحميل: سورة ${cachingProgress.current}/${cachingProgress.total}...`, `Download ho raha hai: Surah ${cachingProgress.current}/${cachingProgress.total}...`)
                : t('Precache All 114 Surahs for 100% Offline Access', 'تمام 114 سورتیں آف لائن استعمال کے لیے ڈاؤن لوڈ کریں', 'تحميل جميع السور الـ ١١٤ للاستخدام دون إنترنت', 'Tamam 114 Surahs 100% Offline Save Karein')}
            </span>
          </button>

          <button
            onClick={handleClearCache}
            style={{
              padding: '10px 16px',
              backgroundColor: '#FEF2F2',
              color: '#991B1B',
              border: '1px solid #FECACA',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <span>🧹</span>
            <span>{t('Clear Service Worker Cache', 'کیش میموری صاف کریں', 'مسح الذاكرة المؤقتة', 'Cache Memory Clear Karein')}</span>
          </button>
        </div>
      </div>

      {/* Sovereign Local Data Backup & Migration Sentinel */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #D1D5DB',
          borderRadius: 12,
          padding: 20,
          marginBottom: 24,
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        }}
      >
        <h3 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 800, color: '#111827', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>💾</span>
          <span>{t('Sovereign Local Data Backup & Multi-Device Migration', 'ذاتی لوکل بیک اپ و منتقلی', 'النسخ الاحتياطي السيادي ونقل البيانات', 'Sovereign Backup & Restore')}</span>
        </h3>
        <p style={{ margin: '0 0 16px', fontSize: 13, color: '#6B7280', lineHeight: 1.5 }}>
          {t(
            'Export your entire spiritual footprint (bookmarks, reading history, tasbih counts, private notes, and prayer offsets) to an encrypted JSON backup file. Restore it anytime on another phone or computer without creating any account.',
            'اپنے تمام ذاتی و دینی ریکارڈز (بک مارکس، تسبیح کاؤنٹس، نوٹس اور ترجیحات) کو محفوظ فائل میں ڈاؤنلوڈ کریں۔ کسی بھی دوسرے فون یا کمپیوٹر پر بغیر اکاؤنٹ بنائے بحال فرمائیں۔',
            'قم بتصدير جميع بياناتك الخاصة (العلامات المرجعية، سجل القراءة، أذكار المسبحة، الملاحظات) إلى ملف JSON آمن لاستعادتها على أي جهاز آخر دون الحاجة لإنشاء حساب.',
            'Apne tamam records (bookmarks, reading history, tasbih, notes) ko JSON file mein export karein aur kisi bhi doosre phone par restore karein.'
          )}
        </p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => {
              const ok = exportSovereignBackup();
              if (ok) {
                showAmalToast(
                  t('Sovereign backup downloaded successfully (.json)', 'محفوظ بیک اپ کامیابی سے ڈاؤنلوڈ ہو گیا', 'تم تنزيل النسخة الاحتياطية بنجاح', 'Backup download ho gaya'),
                  'success'
                );
              }
            }}
            style={{
              padding: '10px 18px',
              backgroundColor: '#065F46',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <span>💾</span>
            <span>{t('Export Sovereign Backup (.json)', 'ذاتی بیک اپ ڈاؤنلوڈ کریں', 'تصدير النسخة الاحتياطية', 'Export Sovereign Backup (.json)')}</span>
          </button>

          <label
            style={{
              padding: '10px 18px',
              backgroundColor: '#F8FAFC',
              color: '#0F172A',
              border: '1px solid #CBD5E1',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <span>📥</span>
            <span>{t('Restore from Backup (.json)', 'بیک اپ فائل سے بحال کریں', 'استعادة من ملف احتياطي', 'Restore from Backup (.json)')}</span>
            <input
              type="file"
              accept=".json,application/json"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const res = await restoreSovereignBackup(file);
                if (res.success) {
                  showAmalToast(
                    t(`Restored ${res.restoredCount} records successfully.`, `کامیابی کے ساتھ ${res.restoredCount} ریکارڈز بحال ہو گئے۔`, `تمت استعادة ${res.restoredCount} مدخلات بنجاح.`, `${res.restoredCount} records restore ho gaye.`),
                    'success'
                  );
                  setTimeout(() => window.location.reload(), 1200);
                } else {
                  showAmalToast(res.error || 'Restore failed', 'warning');
                }
              }}
              style={{ display: 'none' }}
            />
          </label>
        </div>
      </div>

      <div
        style={{
          padding: 16,
          borderRadius: 10,
          backgroundColor: '#F3F4F6',
          fontSize: 12,
          color: '#4B5563',
          lineHeight: 1.6,
        }}
      >
        <strong>{t('Epistemic Compliance Guarantee:', 'علمی ضوابط کی پاسداری کی ضمانت:', 'ضمان الامتثال المعرفي:', 'Epistemic Compliance Guarantee:')}</strong>{' '}
        {t(
          'AMAL OS is engineered and stewarded by Qsura India Pvt Ltd, operating strictly under the Two-Scholar Dual Jurist Protocol (INV_07) and Section 03 Epistemic Domain Invariants. All calculations are executed deterministically on-device without remote tracking or commercial telemetry.',
          'عمل او ایس کو قصواء انڈیا پرائیویٹ لمیٹڈ کے زیر انتظام تیار کیا گیا ہے، جو دو رکنی مفتی و محقق کونسل کے اصولوں پر سختی سے عمل پیرا ہے۔ تمام حسابات بغیر کسی ٹریکنگ کے مقامی طور پر کیے جاتے ہیں۔',
          'تم تطوير AMAL OS بإشراف Qsura India Pvt Ltd، وفق بروتوكول الفقيهين المزدوج (INV_07). تُجرى جميع العمليات الحسابية محلياً دون أي تتبع.',
          'AMAL OS Qsura India Pvt Ltd ke zere nigrani chal raha hai. Tamam hisabat on-device hote hain baghair kisi commercial tracking ke.'
        )}
      </div>
    </div>
  );
}
