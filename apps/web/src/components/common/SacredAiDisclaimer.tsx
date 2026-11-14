import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

export interface SacredAiDisclaimerProps {
  variant?: 'banner' | 'compact' | 'footnote';
  style?: React.CSSProperties;
  className?: string;
}

export const SacredAiDisclaimer: React.FC<SacredAiDisclaimerProps> = ({
  variant = 'compact',
  style,
  className = '',
}) => {
  const { t, isUrdu } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  // Variant 1: Footnote (minimal, quiet, for bottom of cards and synthesized answers)
  if (variant === 'footnote') {
    return (
      <div
        className={`sacred-ai-footnote ${className}`}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          fontSize: 11,
          color: '#64748B',
          marginTop: 10,
          paddingTop: 8,
          borderTop: '1px dashed rgba(100, 116, 139, 0.25)',
          lineHeight: 1.5,
          ...style,
        }}
      >
        <span style={{ fontSize: 13, flexShrink: 0 }}>🛡️</span>
        <span>
          {t(
            'AI Research Synthesis · Grounded in verified classical Sunni texts · Not a binding Shar\'i Fatwa.',
            'مصنوعی ذہانت برائے علمی تحقیق · مستند اہل سنت کتب پر مبنی · خود مختار شرعی فتویٰ نہیں ہے۔',
            'مساعد بحث بالذكاء الاصطناعي مؤصل على أمهات كتب أهل السنة · ليس فتوى شرعية ملزمة.',
            'AI Research Synthesis · Mustanad Sunni kutub par mabni · Shari Fatwa nahi hai.'
          )}
        </span>
      </div>
    );
  }

  // Variant 2: Compact Pill (for placement directly below search inputs)
  if (variant === 'compact') {
    return (
      <div
        className={`sacred-ai-pill ${className}`}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 8,
          padding: '8px 14px',
          borderRadius: 8,
          backgroundColor: 'rgba(217, 119, 6, 0.08)',
          border: '1px solid rgba(217, 119, 6, 0.22)',
          fontSize: 12,
          color: '#92400E',
          margin: '10px 0 0',
          lineHeight: 1.5,
          ...style,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 14, flexShrink: 0 }}>⚖️</span>
          <span style={{ fontWeight: 600 }}>
            {t(
              'AI Canonical Research Tool · Educational & Evidence Synthesis Only',
              'مصنوعی ذہانت برائے علمی مطالعہ · صرف شواہد و مراجع کی فراہمی',
              'أداة بحث وتحقيق بالذكاء الاصطناعي · للأغراض العلمية والتعليمية فقط',
              'AI Canonical Research Tool · Sirf ilmi shawahid o references ke liye'
            )}
          </span>
        </div>
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            fontSize: 11,
            fontWeight: 700,
            color: '#B45309',
            textDecoration: 'underline',
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          {isExpanded
            ? t('Hide Policy ▲', 'تفصیل چھپائیں ▲', 'إخفاء التفاصيل ▲', 'Chupayein ▲')
            : t('Non-Fatwa Policy ▼', 'شرعی اصول و پالیسی ▼', 'مبدأ عدم الإفتاء ▼', 'Shar\'i Policy ▼')}
        </button>

        {isExpanded && (
          <div
            style={{
              width: '100%',
              marginTop: 6,
              paddingTop: 8,
              borderTop: '1px solid rgba(217, 119, 6, 0.18)',
              fontSize: 11.5,
              color: '#78350F',
              lineHeight: 1.6,
            }}
          >
            {t(
              'AMAL OS adheres to the classical consensus (Sawad al-A\'zam). Software cannot hold Ijtihad or issue autonomous legal decrees (Fatwas). For personal, marital, oath, or inheritance disputes, consult an accredited human Mufti at a recognized Dar-ul-Ifta.',
              'عمل او ایس سوادِ اعظم کے متفقہ اصولوں پر قائم ہے۔ کوئی بھی الگورتھم یا سافٹ ویئر اجتہاد اور خودکار فتویٰ جاری کرنے کا اہل نہیں ہو سکتا۔ طلاق، نکاح کے نزاعات، قسم و کفارہ اور وراثت جیسے ذاتی مسائل میں ہمیشہ مستند دار الافتاء اور جید مفتیانِ کرام سے رجوع فرمائیں۔',
              'يلتزم نظام عمل بإجماع السواد الأعظم. لا يجوز للبرمجيات ممارسة الاجتهاد أو إصدار الفتاوى الشرعية المستقلة. للنزاعات الشخصية والأسرية والأيمان، يرجى مراجعة دور الإفتاء المعتمدة.',
              'AMAL OS Sawad al-Azam ke usool par qaim hai. Software Ijtihad ya fatwa dene ka ahal nahi hai. Talaq, nikah, qasam aur wirasat jaise mamlat mein mustanad Dar-ul-Ifta se ruju karein.'
            )}
          </div>
        )}
      </div>
    );
  }

  // Variant 3: Banner (prominent, high trust, sacred crest)
  return (
    <aside
      role="note"
      aria-label="Shar'i AI Disclaimer"
      className={`sacred-ai-banner ${className}`}
      style={{
        backgroundColor: '#FFFBEB',
        borderRadius: 14,
        padding: '16px 20px',
        border: '1px solid #FDE68A',
        marginBottom: 20,
        boxShadow: '0 2px 8px -2px rgba(217, 119, 6, 0.08)',
        ...style,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            backgroundColor: '#FEF3C7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 18,
            color: '#B45309',
            flexShrink: 0,
            border: '1px solid #FCD34D',
          }}
        >
          🛡️
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}>
            <h3 style={{ fontSize: 14, fontWeight: 800, margin: 0, color: '#92400E' }}>
              {t(
                'AI Research Disclaimer · Epistemic Grounding (عدم الإفتاء المستقل)',
                'شرعی تنبیہ و اصولِ تحقیق · عدم الإفتاء المستقل',
                'تنبيه منهجي للأبحاث المدعومة بالذكاء الاصطناعي (عدم الإفتاء المستقل)',
                'AI Research Disclaimer · Epistemic Grounding'
              )}
            </h3>
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: 0.5,
                backgroundColor: '#FEF3C7',
                color: '#B45309',
                padding: '2px 8px',
                borderRadius: 4,
                border: '1px solid #FDE68A',
              }}
            >
              Non-Fatwa Educational Tool
            </span>
          </div>

          <p style={{ fontSize: 13, color: '#78350F', margin: '6px 0 0', lineHeight: 1.6 }}>
            {t(
              'AMAL OS utilizes artificial intelligence to index and cross-reference verified classical texts (Holy Quran, Prophetic Sunnah, and authoritative Fiqh mutun across the 4 Madhhabs). It does NOT formulate new rulings or issue binding religious decrees (fatwas). For personal legal litigation, marriage, divorce, or oaths, consult a qualified, living human Mufti.',
              'عمل او ایس مصنوعی ذہانت کی مدد سے معتبر کلاسیکی کتب (قرآنِ مجید، سنتِ نبویہ، اور فقہائے اربعہ کے مستند متون) کے مراجع تلاش کرتا ہے۔ یہ نیا حکم یا خود مختار فتویٰ نہیں بناتا۔ نکاح و طلاق، قسم و کفارہ، یا متنازعہ وراثت کے ذاتی مسائل کے لیے ہمیشہ کسی معتمد دار الافتاء اور جید مفتی سے رجوع فرمائیں۔',
              'يستخدم نظام عمل تقنيات الذكاء الاصطناعي لفهرسة أمهات الكتب المعتمدة والبحث فيها (القرآن الكريم، السنة النبوية، ومتون المذاهب الأربعة). النظام لا يستحدث أحكاماً ولا يصدر فتاوى شرعية مستقلة.',
              'AMAL OS AI ki madad se Quran, Sunnat aur 4 Madhahib ki mustanad kutub se references talash karta hai. Yeh fatwa nahi deta. Zati, afradi ya khandani masael ke liye hamesha kisi motabar Dar-ul-Ifta se ruju karein.'
            )}
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              marginTop: 10,
              paddingTop: 8,
              borderTop: '1px solid rgba(217, 119, 6, 0.15)',
              fontSize: 11,
              color: '#B45309',
              fontWeight: 600,
              flexWrap: 'wrap',
            }}
          >
            <span>📖 {t('Source-Bound RAG', 'صرف کتبِ معتمدہ سے استخراج', 'استخراج منضبط بالنصوص التراثية', 'Source-Bound RAG')}</span>
            <span>•</span>
            <span>🚫 {t('Zero Fabricated Rulings', 'خود ساختہ فتووں کی ممانعت', 'حظر الفتاوى المستقلة', 'Zero Fabricated Rulings')}</span>
            <span>•</span>
            <span>👥 {t('Human Scholar Escalation', 'ضرورت پر علماء سے رجوع', 'الإحالة للعلماء المعتمدين', 'Human Scholar Escalation')}</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
