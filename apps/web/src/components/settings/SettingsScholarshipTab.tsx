import React from 'react';
import { AmalTheme } from '@amal/ui';
import { useLanguage } from '../../context/LanguageContext';
import { ProBadge } from '../common/ProBadge';

interface SettingsScholarshipTabProps {
  strictSawadAlAzam: boolean;
  setStrictSawadAlAzam: (val: boolean) => void;
  dualJuristVerification: boolean;
  setDualJuristVerification: (val: boolean) => void;
  aiProvider: 'gemini' | 'openai' | 'local';
  setAiProvider: (val: 'gemini' | 'openai' | 'local') => void;
  ephemeralMemory: boolean;
  setEphemeralMemory: (val: boolean) => void;
  handleSaveStrictness: () => void;
  handlePurgeSearchCache: () => void;
}

export function SettingsScholarshipTab({
  strictSawadAlAzam,
  setStrictSawadAlAzam,
  dualJuristVerification,
  setDualJuristVerification,
  aiProvider,
  setAiProvider,
  ephemeralMemory,
  setEphemeralMemory,
  handleSaveStrictness,
  handlePurgeSearchCache,
}: SettingsScholarshipTabProps) {
  const { t } = useLanguage();

  return (
    <div>
      <h2 style={{ margin: '0 0 16px', fontSize: 20, fontWeight: 800, color: '#111827' }}>
        {t(
          'Epistemic Grounding & Scholarly Strictness',
          'علمی استناد اور احتیاط کے اصول',
          'أصول التوثيق والتحقيق العلمي',
          'Ilmi Sanad o Ehtiyat ke Usool'
        )}
      </h2>
      <p style={{ margin: '0 0 24px', fontSize: 13, color: '#6B7280', lineHeight: 1.6 }}>
        {t(
          'AMAL OS employs the Dual-Jurist Verification Protocol (INV_07) to strictly ground all retrieved evidence in canonical Islamic scholarship. AMAL OS is an educational research index and clerical tool, never an autonomous Mufti.',
          'عمل او ایس تمام شرعی دلائل کو کلاسیکی اسلامی مراجع پر پرکھنے کے لیے دو مفتیانِ کرام کی توثیق کا پروٹوکول لاگو کرتا ہے۔ یہ ایک علمی ریسرچ انڈیکس ہے، کوئی خود مختار مفتی نہیں۔',
          'يطبق نظام عمل بروتوكول التحقق الفقهي المزدوج لربط جميع الأدلة بالمصادر الإسلامية المعتمدة. هذا النظام أداة بحثية وتعليمية وليس مفتياً مستقلاً.',
          'AMAL OS tamam sharai dalael ko classical islami maraje par parakhne ke liye do fuqaha ki tasdeeq ka usool nafiz karta hai. Yeh ek ilmi research index hai, koi khud-mukhtar mufti nahi.'
        )}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div
          style={{
            padding: 16,
            borderRadius: 10,
            backgroundColor: '#ECFDF5',
            border: '1px solid #A7F3D0',
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#065F46', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>🛡️ {t(
                  "Strict Sawad al-A'zam Epistemic Gate (Section 03.11)",
                  'سوادِ اعظم کا سخت علمی معیار (دفعہ ۰۳.۱۱)',
                  'معيار السواد الأعظم للتوثيق (البند ٠٣.١١)',
                  "Strict Sawad al-A'zam Epistemic Gate (Section 03.11)"
                )}</span>
                <ProBadge featureName="Epistemic Gate" />
              </div>
              <div style={{ fontSize: 12, color: '#047857' }}>
                {t(
                  'Guarantees that retrieved references strictly cite peer-reviewed classical texts from the 76 canonical corpus works.',
                  'اس بات کی ضمانت دیتا ہے کہ نتائج صرف ۷۶ معتبر کلاسیکی کتب کے حوالے سے پیش ہوں۔',
                  'يضمن أن تكون جميع المراجع مستندة حصراً إلى أمهات الكتب التراثية المعتمدة.',
                  'Is baat ki zamanat deta hai ke nataij sirf 76 motabar classical kutub se mutabiq hon.'
                )}
              </div>
            </div>
            <input
              type="checkbox"
              checked={strictSawadAlAzam}
              onChange={(e) => setStrictSawadAlAzam(e.target.checked)}
              style={{ width: 20, height: 20, cursor: 'pointer', accentColor: AmalTheme.colors.primary }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#065F46', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>⚖️ {t(
                  'Dual-Jurist Consensus Gatekeeper',
                  'دو مجتہدین کا اجماعی ضابطۂ توثیق',
                  'ضابط إجماع الفقهاء المزدوج والتحقق',
                  'Dual-Jurist Consensus Gatekeeper'
                )}</span>
                <ProBadge featureName="Dual-Jurist Verification" />
              </div>
              <div style={{ fontSize: 12, color: '#047857' }}>
                {t(
                  'Prevents unverified statements or misattributions by cross-checking rulings strictly across classical Hanafi and Jumhur codices.',
                  'غیر مصدقہ اقوال سے بچاتا ہے اور حنفی و جمہور کتب سے احکام کی جانچ کرتا ہے۔',
                  'يمنع النقول غير الموثقة من خلال مطابقة الأحكام مع متون الفقه الحنفي والجمهور.',
                  'Ghair-tasdeeq shuda aqwal se bachata hai aur Hanafi o Jamhoor kutub se rulings verify karta hai.'
                )}
              </div>
            </div>
            <input
              type="checkbox"
              checked={dualJuristVerification}
              onChange={(e) => setDualJuristVerification(e.target.checked)}
              style={{ width: 20, height: 20, cursor: 'pointer', accentColor: AmalTheme.colors.primary }}
            />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 6 }}>
            {t(
              'Knowledge Retrieval Engine Provider',
              'علمی مراجع تلاش کرنے والا انجن',
              'محرك استرجاع المعرفة الشرعية',
              'Knowledge Retrieval Engine Provider'
            )}
          </label>
          <select
            value={aiProvider}
            onChange={(e) => setAiProvider(e.target.value as ('gemini' | 'openai' | 'local'))}
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
            <option value="gemini">{t('Google Gemini Grounded Model (Deterministic Corpus Verification)', 'گوگل جیمینائی مستند ماڈل (کلاسیکی نصوص کی جانچ)', 'نموذج جوجل جيميناي المؤصل (تحقيق النصوص)', 'Google Gemini Grounded Model')}</option>
            <option value="openai">{t('OpenAI Strict Retrieval (Deterministic Low-Temperature)', 'اوپن اے آئی سخت تحقیق', 'استرجاع أوبن إيه آي الدقيق', 'OpenAI Strict Retrieval')}</option>
            <option value="local">{t('Offline Classical Corpus (Zero Cloud API, 100% Local Device Storage)', 'آف لائن کلاسیکی کتب خانہ (بغیر کلاؤڈ، مکمل ڈیوائس پر)', 'المجموعة التراثية أوفلاين (تخزين محلي بالكامل)', 'Offline Classical Corpus (100% Local)')}</option>
          </select>
        </div>

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
            <div style={{ fontSize: 14, fontWeight: 700, color: '#111827' }}>
              🛡️ {t('Ephemeral Inquiry History', 'عارضی تلاش کی تاریخ', 'سجل الاستفسارات المؤقت', 'Ephemeral Inquiry History')}
            </div>
            <div style={{ fontSize: 12, color: '#6B7280' }}>
              {t(
                'Automatically wipe search inquiries and scratch reflections after every session (Zero retention)',
                'ہر سیشن کے بعد تلاشی سوالات اور نوٹ خودکار طور پر صاف کر دیں',
                'مسح سجل البحث والتأملات تلقائياً بعد كل جلسة دون حفظ',
                'Har session ke baad search inquiries aur notes khud ba khud saaf karein'
              )}
            </div>
          </div>
          <input
            type="checkbox"
            checked={ephemeralMemory}
            onChange={(e) => setEphemeralMemory(e.target.checked)}
            style={{ width: 20, height: 20, cursor: 'pointer', accentColor: AmalTheme.colors.primary }}
          />
        </div>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button
            onClick={handleSaveStrictness}
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
            {t('Save Scholarly Parameters', 'علمی ترتیبات محفوظ کریں', 'حفظ الإعدادات العلمية', 'Scholarly Parameters Save Karein')}
          </button>

          <button
            onClick={handlePurgeSearchCache}
            style={{
              padding: '10px 18px',
              backgroundColor: '#FEE2E2',
              color: '#991B1B',
              border: '1px solid #FCA5A5',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            🧹 {t('Clear Inquiry Cache Now', 'تلاش کا کیش ابھی صاف کریں', 'مسح ذاكرة البحث الآن', 'Inquiry Cache Clear Karein')}
          </button>
        </div>
      </div>
    </div>
  );
}
