import React from 'react';
import { AmalTheme } from '@amal/ui';
import { VaultSecurityMode } from '@amal/amal-engine';
import { useLanguage } from '../../context/LanguageContext';
import { ProBadge } from '../common/ProBadge';

interface SettingsPrivacyTabProps {
  securityMode: VaultSecurityMode;
  setSecurityMode: (mode: VaultSecurityMode) => void;
  pin: string;
  setPin: (pin: string) => void;
  zeroKnowledgeSync: boolean;
  setZeroKnowledgeSync: (val: boolean) => void;
  handleSavePrivacy: () => void;
  handleExportData: () => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleRestoreFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleResetAllData: () => void;
}

export function SettingsPrivacyTab({
  securityMode,
  setSecurityMode,
  pin,
  setPin,
  zeroKnowledgeSync,
  setZeroKnowledgeSync,
  handleSavePrivacy,
  handleExportData,
  fileInputRef,
  handleRestoreFile,
  handleResetAllData,
}: SettingsPrivacyTabProps) {
  const { t } = useLanguage();

  return (
    <div>
      <h2 style={{ margin: '0 0 16px', fontSize: 20, fontWeight: 800, color: '#111827' }}>
        {t('Sovereign Vault & Privacy Guard', 'خود مختار والٹ و پرائیویسی گارڈ', 'الخزينة السيادية وحماية الخصوصية', 'Sovereign Vault & Privacy Guard')}
      </h2>
      <p style={{ margin: '0 0 24px', fontSize: 13, color: '#6B7280' }}>
        {t(
          'Your spiritual journals, private reflections, and personal du\'as are stored exclusively on this device. No data leaves your device without your explicit action.',
          'آپ کے روحانی روزنامچے، ذاتی محاسبہ اور دعائیں صرف اس ڈیوائس پر محفوظ ہیں — آپ کی اجازت کے بغیر کچھ بھی کہیں نہیں جاتا۔',
          'يومياتك وتأملاتك وأدعيتك محفوظة حصراً على جهازك. لا يغادر أي بيان جهازك دون إذنك الصريح.',
          'Aapki roohani diary, zati fikr aur duaen sirf is device par hain — aapki ijazat ke baghair kuch bhi kahi nahi jata.'
        )}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 6 }}>
            {t('Vault Authentication Mode', 'والٹ تصدیقی موڈ', 'نمط مصادقة الخزنة', 'Vault Authentication Mode')}
          </label>
          <select
            value={securityMode}
            onChange={(e) => setSecurityMode(e.target.value as VaultSecurityMode)}
            style={{
              width: '100%',
              maxWidth: 420,
              padding: '10px 12px',
              borderRadius: 8,
              border: '1px solid #D1D5DB',
              fontSize: 14,
              backgroundColor: '#F9FAFB',
            }}
          >
            <option value="FOUR_DIGIT_PIN">{t('4-Digit Sovereign PIN Code', '۴ ہندسی نجی پن کوڈ', 'رمز PIN سيادي من ٤ أرقام', '4-Digit Sovereign PIN Code')}</option>
            <option value="BIOMETRIC_FACE_ID">{t('Biometric FaceID / TouchID', 'بایومیٹرک فیس آئی ڈی / ٹچ آئی ڈی', 'بصمة الوجه / بصمة الإصبع', 'Biometric FaceID / TouchID')}</option>
            <option value="BIOMETRIC_FINGERPRINT">{t('Biometric Fingerprint Scanner', 'بایومیٹرک فنگر پرنٹ اسکینر', 'ماسح بصمة الإصبع', 'Biometric Fingerprint Scanner')}</option>
            <option value="DISABLED">{t('Open Access (Disabled)', 'کھلا رسائی موڈ (غیر فعال)', 'وصول مفتوح (معطل)', 'Open Access (Disabled)')}</option>
          </select>
        </div>

        {securityMode === 'FOUR_DIGIT_PIN' && (
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 6 }}>
              {t('Set 4-Digit Vault PIN', '۴ ہندسی والٹ پن درج کریں', 'تعيين رمز PIN للخزنة من ٤ أرقام', '4-Digit Vault PIN Darj Karein')}
            </label>
            <input
              type="password"
              maxLength={6}
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              style={{
                width: 140,
                padding: '10px 12px',
                borderRadius: 8,
                border: '1px solid #D1D5DB',
                fontSize: 16,
                textAlign: 'center',
                letterSpacing: 4,
                fontWeight: 800,
              }}
            />
          </div>
        )}

        <div
          style={{
            padding: 16,
            borderRadius: 10,
            backgroundColor: '#F9FAFB',
            border: '1px solid #E5E7EB',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#111827', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>🛡️ {t('Sovereign Device Vault', 'خود مختار ڈیوائس والٹ', 'الخزينة السيادية على الجهاز', 'Sovereign Device Vault')}</span>
              <ProBadge featureName="Sovereign Device Vault" />
            </div>
            <div style={{ fontSize: 12, color: '#6B7280' }}>
              {t('Your reflections and goals are stored locally on this device only. Enable backup export to protect against browser cache clearance.', 'آپ کے نوٹس اور اہداف صرف اس ڈیوائس پر محفوظ ہیں۔ بیک اپ ایکسپورٹ لازمی فعال کریں۔', 'تأملاتك وأهدافك محفوظة على جهازك فقط. فعّل تصدير النسخ الاحتياطية.', 'Aapke notes aur goals sirf is device par hain. Backup export zaroor karein.')}
            </div>
          </div>
          <input
            type="checkbox"
            checked={zeroKnowledgeSync}
            onChange={(e) => setZeroKnowledgeSync(e.target.checked)}
            style={{ width: 20, height: 20, cursor: 'pointer', accentColor: AmalTheme.colors.primary }}
          />
        </div>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 10 }}>
          <button
            onClick={handleSavePrivacy}
            style={{
              padding: '10px 22px',
              backgroundColor: AmalTheme.colors.primary,
              color: '#FFFFFF',
              border: 'none',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            {t('Save Vault Preferences', 'والٹ ترجیحات محفوظ کریں', 'حفظ تفضيلات الخزنة', 'Vault Preferences Save Karein')}
          </button>

          <button
            onClick={handleExportData}
            style={{
              padding: '10px 18px',
              backgroundColor: '#EFF6FF',
              color: '#1D4ED8',
              border: '1px solid #BFDBFE',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            {t('📦 Export Sovereign Data (JSON)', '📦 خود مختار ڈیٹا برآمد کریں (JSON)', '📦 تصدير البيانات السيادية (JSON)', '📦 Export Sovereign Data (JSON)')}
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleRestoreFile}
            style={{ display: 'none' }}
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            style={{
              padding: '10px 18px',
              backgroundColor: '#ECFDF5',
              color: '#065F46',
              border: '1px solid #A7F3D0',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            {t('📥 Restore Sovereign Data (JSON)', '📥 خود مختار ڈیٹا بحال کریں (JSON)', '📥 استعادة البيانات السيادية (JSON)', '📥 Restore Sovereign Data (JSON)')}
          </button>

          <button
            onClick={handleResetAllData}
            style={{
              padding: '10px 18px',
              backgroundColor: '#FEF2F2',
              color: '#B91C1C',
              border: '1px solid #FECACA',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            {t('⚠️ Wipe All Local Data', '⚠️ تمام لوکل ڈیٹا مٹائیں', '⚠️ مسح كافة البيانات المحلية', '⚠️ Wipe All Local Data')}
          </button>
        </div>
      </div>
    </div>
  );
}
