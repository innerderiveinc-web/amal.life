import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export interface FooterLegalDisclaimerProps {
  isUrdu?: boolean;
}

export const FooterLegalDisclaimer: React.FC<FooterLegalDisclaimerProps> = () => {
  const { t } = useLanguage();

  return (
    <div
      style={{
        backgroundColor: 'rgba(0,0,0,0.35)',
        padding: '16px 22px',
        borderRadius: 12,
        border: '1px solid rgba(255,255,255,0.08)',
        fontSize: 12,
        color: '#E2E8F0',
        lineHeight: 1.7,
        marginBottom: 30,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          marginBottom: 4,
          color: '#FDE68A',
          fontWeight: 800,
          fontSize: 13,
        }}
      >
        <span>⚠️</span>
        <span>
          {t(
            'Shar\'i & AI Non-Fatwa Advisory (عدم الإفتاء المستقل):',
            'شرعی و تکنیکی تنبیہ (عدم الإفتاء المستقل):',
            'تنبيه شرعي وتقني (عدم الإفتاء المستقل):',
            'Shar\'i & AI Non-Fatwa Advisory:'
          )}
        </span>
      </div>
      <div>
        {t(
          'AMAL OS is an AI-assisted educational habit and lifestyle intelligence platform adhering strictly to traditional Sunni orthodoxy (Sawad al-A\'zam). It uses AI to index and cross-reference classical texts, but does NOT issue autonomous religious decrees (fatwas). Complex personal litigation, marriage disputes, oaths, and probate inheritance must be submitted to qualified, living human scholars and accredited Dar-ul-Ifta institutions.',
          'عمل او ایس مصنوعی ذہانت سے لیس ایک تعلیمی، تدبری اور روزمرہ حیاتِ مسلم کا رہنمائی نظام ہے جو سوادِ اعظم کے متفقہ منہج پر قائم ہے۔ یہ کتبِ معتمدہ کے مراجع تلاش کرنے میں مدد دیتا ہے، لیکن کوئی خودکار یا خود ساختہ فتویٰ جاری نہیں کرتا۔ طلاق، نکاح کے نزاعات، قسم و کفارہ اور پیچیدہ وراثت جیسے معاملات میں اپنے قریبی مستند مفتی صاحب یا دار الافتاء سے رجوع فرمائیں۔',
          'منصة نظام عمل التعليمية والروحية المدعومة بالذكاء الاصطناعي لفهرسة نصوص أمهات الكتب التراثية وفق منهج أهل السنة والجماعة لا تصدر فتاوى شرعية مستقلة. النزاعات الأسرية وقضايا النكاح والأيمان والمواريث المعقدة يجب عرضها على العلماء المعتمدين ودور الإفتاء الرسمية.',
          'Amal OS AI-assisted educational platform hai jo classical Sunni kutub se references pesh karta hai. Yeh fatwa nahi deta. Talaq, nikah ke disputes aur complex wirasat jaise mamlat mein apne local mufti sahib ya Dar-ul-Ifta se ruju karein.'
        )}
      </div>
    </div>
  );
};
