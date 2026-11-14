import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Navigation } from '../components/Navigation';
import { AmalApiClient } from '../lib/api';
import { AmalTheme } from '@amal/ui';
import { useLanguage } from '../context/LanguageContext';
import { biometricVaultGuardEngine, VaultSecurityMode } from '@amal/amal-engine';
import { showAmalToast } from '../components/Toast';

export default function PrivacyPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'POLICY' | 'VAULT' | 'ACTIONS'>('POLICY');
  const [exportData, setExportData] = useState<any | null>(null);
  const [loadingExport, setLoadingExport] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  // Biometric Vault Guard State
  const [securityMode, setSecurityMode] = useState<VaultSecurityMode>('BIOMETRIC_FACE_ID');
  const [pin, setPin] = useState('1234');
  const [vaultSaveMsg, setVaultSaveMsg] = useState<string | null>(null);

  const handleSaveVaultSecurity = async () => {
    await biometricVaultGuardEngine.setSecurityMode('usr_default', securityMode, pin);
    setVaultSaveMsg('Vault lock preferences saved successfully!');
    showAmalToast(t('Biometric Vault Guard settings updated', 'والٹ لاک کی ترتیبات محفوظ ہو گئیں', 'تم تحديث إعدادات قفل الخزنة', 'Vault settings update ho gayi'), 'success');
    setTimeout(() => setVaultSaveMsg(null), 3000);
  };

  const handleExport = async () => {
    setLoadingExport(true);
    const res = await AmalApiClient.exportData();
    setLoadingExport(false);
    if (res.success && res.data) {
      setExportData(res.data);
      showAmalToast(t('Data Snapshot exported (.json)', 'ڈیٹا بیک اپ برآمد ہو گیا (.json)', 'تم تصدير نسخة البيانات (.json)', 'Data Snapshot export ho gaya (.json)'), 'success');
      if (typeof window !== 'undefined') {
        const blob = new Blob([JSON.stringify(res.data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `amal_os_data_export_${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
      }
    }
  };

  const handleDelete = async () => {
    if (!confirm(t(
      'Are you absolutely sure? This will trigger an irreversible GDPR purge of your profile, goals, journeys, and reflections.',
      'کیا آپ کو مکمل یقین ہے؟ یہ عمل آپ کے پروفائل، اہداف، اور تمام ذاتی ریکارڈز کو مستقل طور پر صاف کر دے گا۔',
      'هل أنت متأكد تماماً؟ سيؤدي هذا الإجراء إلى مسح كافة سجلاتك وبياناتك نهائياً.',
      'Kya aap ko mukammal yaqeen hai? Yeh amal aapke profile aur records ko permanently delete kar dega.'
    ))) {
      return;
    }
    setLoadingDelete(true);
    const res = await AmalApiClient.deleteAccount();
    setLoadingDelete(false);
    if (res.success) {
      setDeleted(true);
      showAmalToast(t('Account data permanently purged', 'اکاؤنٹ ڈیٹا مکمل طور پر صاف کر دیا گیا', 'تم حذف بيانات الحساب نهائياً', 'Account data permanently purge ho gaya'), 'info');
    }
  };

  return (
    <div style={{ backgroundColor: '#F8F9FA', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <Head>
        <title>Privacy Policy & Sovereign Trust Center | AMAL OS</title>
        <meta name="description" content="Official Privacy Policy, Zero-Data-Brokering Guarantee, and Biometric Vault Guard for AMAL OS." />
      </Head>

      <Navigation />

      <main style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px 80px' }}>
        {/* Header */}
        <header style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 800, color: '#1B4332', letterSpacing: 1, textTransform: 'uppercase' }}>
              {t(
                'DATA SOVEREIGNTY & THE SACRED TRUST',
                'ڈیٹا کی خودمختاری اور مقدس امانت',
                'سيادة البيانات والأمانة الشرعية',
                'DATA SOVEREIGNTY & SACRED TRUST'
              )}
            </span>
            <span style={{ fontSize: 11, backgroundColor: '#D1FAE5', color: '#065F46', padding: '2px 8px', borderRadius: 12, fontWeight: 700 }}>
              GDPR & CCPA Compliant
            </span>
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 10px', color: '#1B4332' }}>
            {t('Privacy Policy & Sovereign Trust Center', 'رازداری کی پالیسی اور خود مختار اعتماد کا مرکز', 'سياسة الخصوصية ومركز الأمانة والسيادة', 'Privacy Policy & Sovereign Trust Center')}
          </h1>
          <p style={{ color: '#4B5563', fontSize: 15, margin: 0, lineHeight: 1.6 }}>
            {t(
              'In Islam, privacy is a sacred trust: "Indeed, Allah commands you to render trusts to whom they are due" (Surah An-Nisa 4:58). AMAL OS is stewarded by Qsura India Pvt Ltd with a binding guarantee of zero advertising, zero location tracking brokers, and complete cryptographic client-side isolation.',
              'اسلام میں رازداری ایک امانت ہے: "بے شک اللہ تمہیں حکم دیتا ہے کہ امانتیں جن کی ہیں انہیں سپرد کرو" (سورۃ النساء ۵۸:۴)۔ عمل او ایس کو قصورہ انڈیا پرائیویٹ لمیٹڈ چلاتا ہے جس میں کسی اشتہار بازی، لوکیشن ٹریکنگ اور بیرونی ڈیٹا شیئرنگ کی سختی سے ممانعت ہے۔',
              'في الإسلام، الخصوصية أمانة شرعية مؤكدة: "إِنَّ اللَّهَ يَأْمُرُكُمْ أَن تُؤَدُّوا الْأَمَانَاتِ إِلَىٰ أَهْلِهَا" (سورة النساء: ٥٨). نظام عمل مدار من شركة قصورة مع التزام تام بعدم بيع البيانات.',
              'Islam mein privacy ek muqaddas amanat hai: "Beshak Allah tumhe hukum deta hai ke amanatein unke ahl ko ada karo" (Surah An-Nisa 4:58). AMAL OS ko Qsura India Pvt Ltd chalata hai ba-shart-e zero advertising aur zero data tracking.'
            )}
          </p>
        </header>

        {/* Tab Switcher */}
        <div style={{
          display: 'flex',
          gap: 12,
          marginBottom: 28,
          borderBottom: '2px solid #E5E7EB',
          paddingBottom: 10,
        }}>
          <button
            onClick={() => setActiveTab('POLICY')}
            style={{
              padding: '10px 20px',
              borderRadius: 8,
              fontWeight: 700,
              fontSize: 14,
              cursor: 'pointer',
              border: 'none',
              backgroundColor: activeTab === 'POLICY' ? '#1B4332' : '#E5E7EB',
              color: activeTab === 'POLICY' ? '#FFFFFF' : '#374151',
              transition: 'all 0.2s',
            }}
          >
            📜 Formal Privacy Policy
          </button>
          <button
            onClick={() => setActiveTab('VAULT')}
            style={{
              padding: '10px 20px',
              borderRadius: 8,
              fontWeight: 700,
              fontSize: 14,
              cursor: 'pointer',
              border: 'none',
              backgroundColor: activeTab === 'VAULT' ? '#1B4332' : '#E5E7EB',
              color: activeTab === 'VAULT' ? '#FFFFFF' : '#374151',
              transition: 'all 0.2s',
            }}
          >
            🔒 Biometric Vault Guard
          </button>
          <button
            onClick={() => setActiveTab('ACTIONS')}
            style={{
              padding: '10px 20px',
              borderRadius: 8,
              fontWeight: 700,
              fontSize: 14,
              cursor: 'pointer',
              border: 'none',
              backgroundColor: activeTab === 'ACTIONS' ? '#1B4332' : '#E5E7EB',
              color: activeTab === 'ACTIONS' ? '#FFFFFF' : '#374151',
              transition: 'all 0.2s',
            }}
          >
            ⚡ Data Portability & Purge
          </button>
        </div>

        {/* TAB 1: FORMAL PRIVACY POLICY */}
        {activeTab === 'POLICY' && (
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 16, border: '1px solid #E5E7EB', padding: 32, display: 'flex', flexDirection: 'column', gap: 32 }}>
            {/* The Anti-Monetization Oath */}
            <div style={{ backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: '#065F46', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>🛡️</span> Our Sacred Anti-Monetization Pledge (Zero Ad Networks / Zero Brokers)
              </div>
              <p style={{ fontSize: 13, color: '#047857', margin: 0, lineHeight: 1.6 }}>
                Unlike mainstream commercial prayer apps that were exposed for embedding data-broker SDKs (such as X-Mode) and selling Muslims' location and prayer metadata to defense contractors and ad networks, <strong>AMAL OS HAS NEVER EMBEDDED, AND WILL NEVER EMBED, ANY ADVERTISING SDK, THIRD-PARTY ANALYTICS TRACKER, OR DATA BROKERAGE CODE.</strong> Your worship is for Allah ﷻ alone.
              </p>
            </div>

            {/* Core Commitments Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
              <div style={{ padding: 18, backgroundColor: '#F9FAFB', borderRadius: 12, border: '1px solid #E5E7EB' }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 8px', color: '#1B4332' }}>
                  1. Local Astronomical Computation
                </h3>
                <p style={{ fontSize: 13, color: '#4B5563', margin: 0, lineHeight: 1.6 }}>
                  Your latitude and longitude are calculated purely in-memory using local mathematical astronomical equations. Your coordinates are never transmitted or stored on remote tracking servers.
                </p>
              </div>

              <div style={{ padding: 18, backgroundColor: '#F9FAFB', borderRadius: 12, border: '1px solid #E5E7EB' }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 8px', color: '#1B4332' }}>
                  2. Isolated Reflection & Tawbah Vault
                </h3>
                <p style={{ fontSize: 13, color: '#4B5563', margin: 0, lineHeight: 1.6 }}>
                  Personal Muhasabah journal entries, sincere repentance prayers, and spiritual goals are stored exclusively on your device. Even in Family Circles, personal reflection logs are strictly isolated by our Domestic Privacy Wall — they are never visible to family members.
                </p>
              </div>

              <div style={{ padding: 18, backgroundColor: '#F9FAFB', borderRadius: 12, border: '1px solid #E5E7EB' }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 8px', color: '#1B4332' }}>
                  3. Anti-Gamification / Zero Guilt
                </h3>
                <p style={{ fontSize: 13, color: '#4B5563', margin: 0, lineHeight: 1.6 }}>
                  We never calculate an "Iman score", public streak leaderboard, or guilt-inducing notifications. Worship is an intimate relationship with the Creator, not an engagement metric for retention.
                </p>
              </div>

              <div style={{ padding: 18, backgroundColor: '#F9FAFB', borderRadius: 12, border: '1px solid #E5E7EB' }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 8px', color: '#1B4332' }}>
                  4. Zero External Model Training & Private Research
                </h3>
                <p style={{ fontSize: 13, color: '#4B5563', margin: 0, lineHeight: 1.6 }}>
                  Queries submitted for evidence search or in the Deen Decision Room are grounded strictly in accredited classical texts and are never transmitted to external data brokers or used to train third-party machine learning models.
                </p>
              </div>
            </div>

            {/* Detailed Legal Clauses */}
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 800, color: '#111827', marginBottom: 12 }}>
                Full Legal Disclosures (GDPR & CCPA Compliance)
              </h2>
              <div style={{ fontSize: 14, color: '#374151', lineHeight: 1.8 }}>
                <p>
                  <strong>Data Controller:</strong> The AMAL OS Sovereign Project acts as the data controller for any operational account information. Where offline mode is active, the user remains the sole possessor of all data.
                </p>
                <p>
                  <strong>Legal Basis for Processing:</strong> We process minimal operational preferences solely on the basis of your explicit consent and legitimate interest in receiving prayer calculation services.
                </p>
                <p>
                  <strong>Your Sovereign Rights:</strong> Under GDPR Articles 15-22 and the California Consumer Privacy Act (CCPA), you retain the unconditional right to access your stored records, export them into machine-readable JSON format, or permanently delete all locally stored data from this device.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: BIOMETRIC VAULT GUARD */}
        {activeTab === 'VAULT' && (
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 16,
            padding: 32,
            border: '1px solid #E5E7EB',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <div>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#047857', letterSpacing: 1, textTransform: 'uppercase' }}>
                  DOMESTIC PRIVACY WALL
                </span>
                <h2 style={{ fontSize: 22, fontWeight: 800, color: '#1B4332', margin: '4px 0 0' }}>
                  🔒 Biometric Vault Guard (App & Reflection Lock)
                </h2>
              </div>
              <span style={{ fontSize: 11, backgroundColor: '#ECFDF5', color: '#065F46', padding: '4px 10px', borderRadius: 12, fontWeight: 700 }}>
                FaceID / PIN Protected
              </span>
            </div>

            <p style={{ fontSize: 14, color: '#4B5563', margin: '0 0 20px', lineHeight: 1.6 }}>
              When sharing your household device or tablet with family members, your private Tawbah confessions, personal Muhasabah struggles, and sensitive scholar cases remain strictly locked behind device biometrics or a 4-digit master PIN.
            </p>

            {vaultSaveMsg && (
              <div style={{ padding: '12px 16px', backgroundColor: '#ECFDF5', color: '#065F46', borderRadius: 8, fontSize: 13, fontWeight: 700, marginBottom: 18 }}>
                ✓ {vaultSaveMsg}
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 24 }}>
              <div style={{ padding: 16, backgroundColor: '#F9FAFB', borderRadius: 12, border: '1px solid #E5E7EB' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#111827', marginBottom: 8 }}>
                  {t('Lock Mode', 'لاک موڈ', 'وضع القفل', 'Lock Mode')}
                </div>
                <select
                  value={securityMode}
                  onChange={(e) => setSecurityMode(e.target.value as VaultSecurityMode)}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid #D1D5DB', fontSize: 13 }}
                >
                  <option value="BIOMETRIC_FACE_ID">{t('FaceID (Biometric)', 'فیس آئی ڈی (بایومیٹرک)', 'بصمة الوجه (بيومتري)', 'FaceID (Biometric)')}</option>
                  <option value="BIOMETRIC_FINGERPRINT">{t('Fingerprint / TouchID', 'فنگر پرنٹ / ٹچ آئی ڈی', 'بصمة الإصبع', 'Fingerprint / TouchID')}</option>
                  <option value="FOUR_DIGIT_PIN">{t('4-Digit PIN Code', '۴ ہندسی پن کوڈ', 'رمز PIN من ٤ أرقام', '4-Digit PIN Code')}</option>
                  <option value="DISABLED">{t('Unlocked (No Lock)', 'غیر مقفل (بغیر لاک)', 'غير مقفل', 'Unlocked (No Lock)')}</option>
                </select>
              </div>

              {securityMode === 'FOUR_DIGIT_PIN' && (
                <div style={{ padding: 16, backgroundColor: '#F9FAFB', borderRadius: 12, border: '1px solid #E5E7EB' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#111827', marginBottom: 8 }}>
                    {t('Set 4-Digit PIN', '۴ ہندسی پن مقرر کریں', 'تعيين رمز PIN من ٤ أرقام', '4-Digit PIN Muqarrar Karein')}
                  </div>
                  <input
                    type="password"
                    maxLength={4}
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="e.g. 1234"
                    style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid #D1D5DB', fontSize: 15, letterSpacing: 4 }}
                  />
                </div>
              )}

              <div style={{ padding: 16, backgroundColor: '#F9FAFB', borderRadius: 12, border: '1px solid #E5E7EB' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#111827' }}>
                  {t('Auto-Lock Policy', 'خودکار لاک کی پالیسی', 'سياسة القفل التلقائي', 'Auto-Lock Policy')}
                </div>
                <div style={{ fontSize: 12, color: '#4B5563', marginTop: 6, lineHeight: 1.5 }}>
                  {t('Immediate upon minimizing app or switching tabs', 'ایپ منیمائز کرنے یا ٹیب بدلنے پر فوری', 'فوراً عند تصغير التطبيق أو تبديل علامات التبويب', 'App minimize karne ya tab badalne par fori')}
                </div>
              </div>

              <div style={{ padding: 16, backgroundColor: '#F9FAFB', borderRadius: 12, border: '1px solid #E5E7EB' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#111827' }}>
                  {t('Shielded Sections', 'محفوظ شعبہ جات', 'الأقسام المحمية', 'Mahfooz Sections')}
                </div>
                <div style={{ fontSize: 12, color: '#4B5563', marginTop: 6, lineHeight: 1.5 }}>
                  {t('Tawbah, Reflections, Scholar Dossiers, Family Notes', 'توبہ، محاسبہ و فکر، علمی کیسز، خاندانی نوٹس', 'التوبة والتأملات وملفات العلماء وملاحظات العائلة', 'Tawbah, Fikr, Scholar Dossiers, Family Notes')}
                </div>
              </div>
            </div>

            <button
              onClick={handleSaveVaultSecurity}
              style={{
                padding: '10px 22px',
                borderRadius: 8,
                backgroundColor: '#1B4332',
                color: '#FFFFFF',
                border: 'none',
                fontWeight: 700,
                fontSize: 14,
                cursor: 'pointer',
              }}
            >
              {t('Save Vault Preferences', 'والٹ ترجیحات محفوظ کریں', 'حفظ تفضيلات الخزنة', 'Vault Preferences Mehfooz Karein')}
            </button>
          </div>
        )}

        {/* TAB 3: DATA ACTIONS & PURGE */}
        {activeTab === 'ACTIONS' && (
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 16,
            padding: 32,
            border: '1px solid #E5E7EB',
          }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, margin: '0 0 10px', color: '#111827' }}>
              {t('Data Portability & Irreversible Deletion', 'ڈیٹا کی منتقلی اور حتمی صفائی', 'نقل البيانات والحذف النهائي', 'Data Portability & Irreversible Deletion')}
            </h2>
            <p style={{ fontSize: 14, color: '#4B5563', margin: '0 0 24px', lineHeight: 1.6 }}>
              In full adherence to GDPR Article 20 (Right to Data Portability) and Article 17 (Right to Erasure), you can export a complete machine-readable snapshot or cryptographically wipe all records.
            </p>

            <div style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
              <button
                disabled={loadingExport}
                onClick={handleExport}
                style={{
                  backgroundColor: '#1B4332',
                  color: '#FFF',
                  border: 'none',
                  borderRadius: 8,
                  padding: '12px 22px',
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: 'pointer',
                }}
              >
                {loadingExport ? t('Generating Export...', 'ایکسپورٹ تیار ہو رہی ہے...', 'جاري التصدير...', 'Export ban raha hai...') : t('📥 Download Full Data Export (JSON)', '📥 مکمل ڈیٹا ایکسپورٹ ڈاؤن لوڈ کریں (JSON)', '📥 تحميل تصدير البيانات الكامل (JSON)', '📥 Download Full Data Export (JSON)')}
              </button>

              <button
                disabled={loadingDelete || deleted}
                onClick={handleDelete}
                style={{
                  backgroundColor: '#DC2626',
                  color: '#FFF',
                  border: 'none',
                  borderRadius: 8,
                  padding: '12px 22px',
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: 'pointer',
                }}
              >
                {loadingDelete ? t('Purging...', 'ڈیٹا صاف ہو رہا ہے...', 'جاري الحذف...', 'Purge ho raha hai...') : t('🗑️ Delete My Account Permanently', '🗑️ میرا اکاؤنٹ مستقل طور پر حذف کریں', '🗑️ حذف حسابي نهائياً', '🗑️ Delete My Account Permanently')}
              </button>
            </div>

            {deleted && (
              <div style={{ padding: 16, backgroundColor: '#FEF2F2', color: '#991B1B', borderRadius: 12, fontSize: 14, marginBottom: 20, border: '1px solid #FCA5A5' }}>
                ✓ {t('Account deletion request executed. Cryptographic purge complete. All personal records have been erased.', 'اکاؤنٹ حذف کرنے کی درخواست مکمل۔ ذاتی ریکارڈز مٹا دیے گئے ہیں۔', 'تم تنفيذ طلب حذف الحساب بنجاح، ومسح كافة السجلات الشخصية.', 'Account deletion mukammal. Personal records mita diye gaye.')}
              </div>
            )}

            {exportData && (
              <div style={{
                backgroundColor: '#F8FAFC',
                padding: 20,
                borderRadius: 12,
                fontFamily: 'monospace',
                fontSize: 12,
                maxHeight: 280,
                overflowY: 'auto',
                border: '1px solid #E2E8F0',
              }}>
                <pre style={{ margin: 0 }}>{JSON.stringify(exportData, null, 2)}</pre>
              </div>
            )}
          </div>
        )}

        {/* Footer Navigation Links */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 36, flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', gap: 16 }}>
            <Link href="/terms" style={{ color: '#1B4332', fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>
              {t('← Terms of Service & Shar\'i Adab', 'شرائطِ استعمال و شرعی ادب نامہ ←', '← شروط الخدمة والآداب الشرعية', 'Terms of Service & Shar\'i Adab ←')}
            </Link>
            <Link href="/copyright" style={{ color: '#1B4332', fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>
              {t('Copyright & Waqf Charter →', 'کاپی رائٹ اور وقف چارٹر ←', 'ميثاق حقوق النشر والوقف ←', 'Copyright & Waqf Charter →')}
            </Link>
          </div>
          <span style={{ fontSize: 12, color: '#6B7280' }}>
            {t('Zero cookies used for third-party tracking.', 'تیسری پارٹی کی ٹریکنگ کے لیے کوئی کوکیز استعمال نہیں کی جاتیں۔', 'لا توجد ملفات تعريف ارتباط لتتبع الطرف الثالث.', 'Third-party tracking ke liye koi cookies istemal nahi hoti.')}
          </span>
        </div>
      </main>
    </div>
  );
}
