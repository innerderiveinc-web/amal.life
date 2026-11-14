import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { showAmalToast } from '../Toast';

export interface SupportWaqfModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupportWaqfModal: React.FC<SupportWaqfModalProps> = ({ isOpen, onClose }) => {
  const { t, isUrdu } = useLanguage();
  const [selectedTier, setSelectedTier] = useState<'MONTHLY' | 'ANNUAL' | 'LIFETIME' | 'CUSTOM'>('MONTHLY');
  const [customAmount, setCustomAmount] = useState('10');
  const [isPatron, setIsPatron] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsPatron(localStorage.getItem('amal_waqf_supporter') === 'true');
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePledgeSupport = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('amal_waqf_supporter', 'true');
      localStorage.setItem('amal_waqf_tier', selectedTier);
      setIsPatron(true);
    }
    showAmalToast(
      t(
        'جزاكم الله خيراً! May Allah ﷻ accept your voluntary support and grant you perpetual rewards (Sadaqah Jariyah).',
        'جزاكم الله خيراً! اللہ تعالیٰ آپ کے اس تعاون کو قبول فرمائے اور صدقۂ جاریہ کا دائمی اجر عطا فرمائے۔',
        'جزاكم الله خيراً! تقبل الله منكم وجعل هذا الدعم صدقة جارية في ميزان حسناتكم.',
        'JazakAllah Khair! Allah Ta\'ala aap ke is ta\'awun ko qabool farmaye aur Sadaqah Jariyah ka ajar de.'
      ),
      'success'
    );
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="waqf-modal-title"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.72)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        animation: 'amalFadeIn 0.2s ease-out',
      }}
      onClick={onClose}
    >
      <div
        className="amal-waqf-modal-content"
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 20,
          maxWidth: 620,
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
          border: '1px solid rgba(212, 175, 55, 0.35)',
          padding: '28px 24px',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Waqf Support Modal"
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            background: 'none',
            border: 'none',
            fontSize: 20,
            color: '#64748B',
            cursor: 'pointer',
            padding: 6,
            borderRadius: 8,
            lineHeight: 1,
          }}
        >
          ✕
        </button>

        {/* Modal Header */}
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 16,
              backgroundColor: 'rgba(217, 119, 6, 0.1)',
              border: '1.5px solid rgba(212, 175, 55, 0.4)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 26,
              color: '#B45309',
              marginBottom: 10,
            }}
          >
            🤲
          </div>
          <h2
            id="waqf-modal-title"
            style={{
              fontSize: 22,
              fontWeight: 900,
              color: '#0F172A',
              margin: '0 0 6px',
              letterSpacing: 0.2,
            }}
          >
            {t(
              'Support the Amal Sovereign Waqf',
              'وقفِ امل میں رضاکارانہ معاونت',
              'دعم وقف أمل السيادي لله تعالى',
              'Amal Sovereign Waqf Mein Ta\'awun'
            )}
          </h2>
          <p style={{ fontSize: 13, color: '#64748B', margin: 0, lineHeight: 1.6 }}>
            {t(
              '100% Ad-Free • Zero Commercial Tracking • A Perpetual Trust for the Muslim Ummah',
              'سو فیصد اشتہارات سے پاک · تجارتی ڈیٹا ٹریکنگ سے پاک · امتِ مسلمہ کے لیے وقفِ عام',
              'خالٍ تماماً من الإعلانات ومن التتبع التجاري · وقف مستدام لأمة الإسلام',
              '100% Ads Se Paak · No Tracking · Ummat-e-Muslimah ke liye Waqf'
            )}
          </p>
        </div>

        {/* 🌟 HABIT-FIRST PLEDGE BANNER (Zero Gate Lock Guarantee) */}
        <div
          style={{
            backgroundColor: '#ECFDF5',
            borderRadius: 12,
            padding: '14px 18px',
            border: '1px solid #A7F3D0',
            marginBottom: 20,
            display: 'flex',
            alignItems: 'flex-start',
            gap: 12,
          }}
        >
          <span style={{ fontSize: 20, flexShrink: 0, marginTop: 2 }}>🌟</span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#065F46', marginBottom: 2 }}>
              {t(
                'Habit-First Guarantee: All Features Are Unlocked',
                'پہلا ہدف عادت سازی: تمام فیچرز مکمل طور پر کھلے ہیں',
                'مبدأ بناء العادة: جميع الأدوات والخصائص متاحة ومفتوحة للجميع',
                'Habit-First Guarantee: Tamam Features Unlocked Hain'
              )}
            </div>
            <p style={{ fontSize: 12, color: '#047857', margin: 0, lineHeight: 1.6 }}>
              {t(
                'We do not lock any Deen tools or Pro features behind paywalls while you build your daily worship routine. Supporting the Waqf is entirely voluntary—a continuous charity (Sadaqah Jariyah) to help fund high-speed servers and classical preservation for everyone.',
                'ہم روزمرہ عبادت اور دینی معمولات میں کسی قسم کی رکاوٹ یا فیس نہیں لگاتے۔ یہ تمام فیچرز آپ کے لیے کھلے ہیں۔ وقف میں حصہ لینا آپ کا خالص رضاکارانہ عمل اور صدقۂ جاریہ ہے تاکہ یہ نظام پوری دنیا کے مسلمانوں کے لیے بلا تعطل جاری رہ سکے۔',
                'لا نفرض أي رسوم إجبارية أو حجب على أدوات الدين حتى تبني وردك اليومي. المساهمة في الوقف اختيارية تماماً كصدقة جارية لتغطية تكاليف الخوادم وحفظ التراث للجميع.',
                'Daily ibadat ki habit banane tak koi paywall nahi hai. Waqf mein ta\'awun karna mukammal ikhtiyari Sadaqah Jariyah hai taake yeh khidmat jari rahe.'
              )}
            </p>
          </div>
        </div>

        {/* Voluntary Contribution Tiers */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: '#1E293B', marginBottom: 10 }}>
            {t('Choose a Voluntary Contribution Tier:', 'رضاکارانہ معاونت کا درجہ منتخب کریں:', 'اختر باقة المساهمة الوقفية:', 'Voluntary Contribution Tier:')}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 10 }}>
            {/* Tier 1: Monthly */}
            <button
              type="button"
              onClick={() => setSelectedTier('MONTHLY')}
              style={{
                borderRadius: 12,
                padding: '12px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                border: selectedTier === 'MONTHLY' ? '2px solid #059669' : '1px solid #E2E8F0',
                backgroundColor: selectedTier === 'MONTHLY' ? '#F0FDF4' : '#F8FAFC',
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                {t('Monthly Khidmah', 'ماہانہ خدمت', 'خدمة شهرية', 'Monthly')}
              </div>
              <div style={{ fontSize: 18, fontWeight: 900, color: '#0F172A', margin: '4px 0' }}>
                $3 <span style={{ fontSize: 11, fontWeight: 500, color: '#64748B' }}>/mo</span>
              </div>
              <div style={{ fontSize: 10, color: '#059669', fontWeight: 600 }}>
                ₹199 · 15 SAR
              </div>
            </button>

            {/* Tier 2: Annual (Recommended) */}
            <button
              type="button"
              onClick={() => setSelectedTier('ANNUAL')}
              style={{
                borderRadius: 12,
                padding: '12px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                position: 'relative',
                border: selectedTier === 'ANNUAL' ? '2px solid #D97706' : '1px solid #FDE68A',
                backgroundColor: selectedTier === 'ANNUAL' ? '#FFFBEB' : '#FFFFFF',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  top: -8,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: '#D97706',
                  color: '#FFFFFF',
                  fontSize: 9,
                  fontWeight: 800,
                  padding: '1px 6px',
                  borderRadius: 8,
                  whiteSpace: 'nowrap',
                }}
              >
                ★ {t('MOST POPULAR', 'سب سے مقبول', 'الأكثر اختياراً', 'POPULAR')}
              </span>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#92400E', textTransform: 'uppercase' }}>
                {t('Annual Patron', 'سالانہ سرپرست', 'كافل سنوي', 'Annual')}
              </div>
              <div style={{ fontSize: 18, fontWeight: 900, color: '#0F172A', margin: '4px 0' }}>
                $29 <span style={{ fontSize: 11, fontWeight: 500, color: '#64748B' }}>/yr</span>
              </div>
              <div style={{ fontSize: 10, color: '#B45309', fontWeight: 600 }}>
                ₹1,999 · 120 SAR
              </div>
            </button>

            {/* Tier 3: Lifetime */}
            <button
              type="button"
              onClick={() => setSelectedTier('LIFETIME')}
              style={{
                borderRadius: 12,
                padding: '12px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                border: selectedTier === 'LIFETIME' ? '2px solid #0369A1' : '1px solid #E2E8F0',
                backgroundColor: selectedTier === 'LIFETIME' ? '#F0F9FF' : '#F8FAFC',
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 700, color: '#0369A1', textTransform: 'uppercase' }}>
                {t('Lifetime Benefactor', 'دائمی محسن', 'واقف مدى الحياة', 'Lifetime')}
              </div>
              <div style={{ fontSize: 18, fontWeight: 900, color: '#0F172A', margin: '4px 0' }}>
                $199
              </div>
              <div style={{ fontSize: 10, color: '#0284C7', fontWeight: 600 }}>
                ₹14,999 · 750 SAR
              </div>
            </button>

            {/* Tier 4: Custom */}
            <button
              type="button"
              onClick={() => setSelectedTier('CUSTOM')}
              style={{
                borderRadius: 12,
                padding: '12px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                border: selectedTier === 'CUSTOM' ? '2px solid #7C3AED' : '1px solid #E2E8F0',
                backgroundColor: selectedTier === 'CUSTOM' ? '#F5F3FF' : '#F8FAFC',
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 700, color: '#6D28D9', textTransform: 'uppercase' }}>
                {t('Custom Sadaqah', 'حسبِ استطاعت', 'مبلغ مخصص', 'Custom')}
              </div>
              <div style={{ fontSize: 18, fontWeight: 900, color: '#0F172A', margin: '4px 0' }}>
                ${customAmount}
              </div>
              <div style={{ fontSize: 10, color: '#7C3AED', fontWeight: 600 }}>
                {t('Any Amount', 'کوئی بھی رقم', 'أي مبلغ', 'Any Amount')}
              </div>
            </button>
          </div>

          {selectedTier === 'CUSTOM' && (
            <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#475569' }}>
                {t('Enter Amount ($ USD):', 'رقم درج کریں ($):', 'أدخل المبلغ بالدولار:', 'Raqam likhein ($):')}
              </label>
              <input
                type="number"
                min="1"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                style={{
                  width: 100,
                  padding: '6px 10px',
                  borderRadius: 8,
                  border: '1px solid #CBD5E1',
                  fontSize: 14,
                  fontWeight: 700,
                }}
              />
            </div>
          )}
        </div>

        {/* What Your Voluntary Waqf Directly Funds */}
        <div
          style={{
            backgroundColor: '#F8FAFC',
            borderRadius: 14,
            padding: '14px 18px',
            border: '1px solid #E2E8F0',
            marginBottom: 20,
          }}
        >
          <div style={{ fontSize: 12, fontWeight: 800, color: '#334155', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>
            {t('Where Your Contribution Goes:', 'آپ کا تعاون کہاں خرچ ہوتا ہے؟', 'أوجه صرف المساهمات الوقفية:', 'Where Your Support Goes:')}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12, color: '#475569' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>⚡</span>
              <span>
                <strong>{t('Zero-Buffering Global Audio CDNs:', 'تیز ترین آڈیو سرورز:', 'خوادم التلاوات الصوتية عالية السرعة:', 'Audio CDNs:')}</strong>{' '}
                {t('Sustaining lossless audio for 114 Surahs, Sirah, and Shamail recitations worldwide.', 'تمام ۱۱۴ سورتوں، سیرت اور شمائل کی آڈیو کو دنیا بھر میں بلاتاخیر سنانا۔', 'استضافة تلاوات القرآن الكريم الكاملة وشروح السيرة والشمائل.', '114 Surahs aur Sirah audio bina buffering stream karna.')}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>📚</span>
              <span>
                <strong>{t('Classical Manuscript Digitization:', 'کلاسیکی کتب کی ڈیجیٹائزیشن:', 'فهرسة وتوثيق أمهات الكتب:', 'Classical Mutun Digitization:')}</strong>{' '}
                {t('Cross-referencing verified Sunni mutun (Kanz-ul-Iman, Bahar-e-Shari\'at, Fatawa Razawiyyah).', 'مستند اہل سنت کتب (کنز الایمان، بہار شریعت، فتاویٰ رضویہ) کی ڈیجیٹل تصدیق۔', 'تحقيق وتوثيق المتون المعتمدة والكتب الفقهية الرصينة.', 'Kanz-ul-Iman aur Bahar-e-Shariat ki verified digitization.')}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>🛡️</span>
              <span>
                <strong>{t('Zero Ads & Independent Sovereignty:', 'اشتہارات سے مکمل آزادی:', 'استقلالية تامة وخالية من الإعلانات:', '100% Ad-Free Sovereignty:')}</strong>{' '}
                {t('Never monetizing sacred worship, selling analytics, or compromising scholarly independence.', 'عبادات کا سودا نہیں ہوگا، نہ صارف کا ڈیٹا بیچا جائے گا اور نہ ہی تجارتی سمجھوتہ ہوگا۔', 'حماية الخصوصية التامة وعدم تسليع العبادات.', 'Deen o Ibadat ko tijarat nahi banaya jayega.')}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {/* Honest "coming soon" notice — no payment gateway wired yet */}
          <div
            style={{
              width: '100%',
              backgroundColor: '#FEF3C7',
              border: '1px solid #FDE68A',
              borderRadius: 10,
              padding: '10px 14px',
              fontSize: 11,
              color: '#92400E',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span>⚙️</span>
            <span>
              {t(
                'Payment gateway coming soon — your pledge is recorded locally now. We will notify you when Stripe/PayPal integration is live.',
                'ادائیگی کا نظام جلد آ رہا ہے — آپ کا عزم ابھی محفوظ کر لیا گیا ہے۔ ادائیگی کا لنک جلد فراہم کیا جائے گا۔',
                'نظام الدفع قريباً — تم حفظ تعهدك محلياً، وسيتم إعلامك عند إطلاق الدفع الإلكتروني.',
                'Payment system jald aa raha hai — aap ka ta\'awun locally mahfooz ho gaya, link jald milega.'
              )}
            </span>
          </div>
          <button
            type="button"
            onClick={handlePledgeSupport}
            style={{
              flex: 1,
              minWidth: 200,
              backgroundColor: '#064E3B',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: 12,
              padding: '13px 20px',
              fontWeight: 800,
              fontSize: 14,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              boxShadow: '0 4px 14px rgba(6, 78, 59, 0.25)',
              transition: 'background-color 0.15s ease',
            }}
          >
            <span>🤲</span>
            <span>
              {isPatron
                ? t('Renew / Confirm Waqf Support', 'معاونت کی توثیق کریں', 'تأكيد المساهمة الوقفية', 'Confirm Waqf Support')
                : t('Pledge Voluntary Waqf Support', 'وقف میں رضاکارانہ حصہ ملائیں', 'المساهمة الوقفية الطوعية', 'Pledge Waqf Support')}
            </span>
          </button>

          <button
            type="button"
            onClick={onClose}
            style={{
              backgroundColor: '#F1F5F9',
              color: '#475569',
              border: '1px solid #CBD5E1',
              borderRadius: 12,
              padding: '13px 18px',
              fontWeight: 700,
              fontSize: 13,
              cursor: 'pointer',
            }}
          >
            {t('Continue with Unlocked Habit Access', 'روزمرہ معمول جاری رکھیں', 'متابعة الاستخدام المجاني', 'Continue Free Access')}
          </button>
        </div>
      </div>
    </div>
  );
};
