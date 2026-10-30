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
        color: '#9CA3AF',
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
            'Shar\'i Non-Fatwa Advisory:',
            'شرعی تنبیہ و احتیاط:',
            'تنبيه وإرشاد شرعي:',
            'Shar\'i Tanbeeh wa Ehtiyat:'
          )}
        </span>
      </div>
      <div>
        {t(
          'AMAL OS is an educational habit and lifestyle intelligence platform adhering strictly to traditional Sunni orthodoxy. It does NOT issue autonomous religious decrees (fatwas). Complex personal litigation, marriage disputes, oaths, and probate inheritance must be submitted to qualified, living human scholars and accredited Dar-ul-Ifta institutions.',
          'عمل او ایس (AMAL OS) ایک تعلیمی، تدبری اور روزمرہ حیاتِ مسلم کا رہنمائی نظام ہے۔ یہ معتمد دار الافتاء اور جید مفتیانِ کرام کا متبادل نہیں ہے اور نہ ہی خودکار فتوے جاری کرتا ہے۔ طلاق، نکاح کے نزاعات، قسم و کفارہ اور پیچیدہ وراثت جیسے معاملات میں اپنے قریبی مستند مفتی صاحب یا دار الافتاء سے رجوع فرمائیں۔',
          'نظام عمل (AMAL OS) منصة تعليمية وروحية وتطبيقية لأسلوب حياة المسلم وفق منهج أهل السنة والجماعة. المنصة لا تصدر فتاوى شرعية مستقلة. النزاعات الأسرية وقضايا النكاح والأيمان والمواريث المعقدة يجب عرضها على العلماء المعتمدين ودور الإفتاء الرسمية.',
          'Amal OS ek taleemi, tadabburi aur rozmarrah hayat-e-Muslim ka rehnuma nizam hai. Yeh motabar Dar-ul-Ifta aur jayyed muftiyan-e-kiram ka mutabadil nahi hai aur na hi khudkar fatwe jari karta hai. Talaq, nikah ke tanazat, qasam wa kaffara aur pecheeda wirasat jaise mamlat mein apne qareebi mustanad mufti sahib ya Dar-ul-Ifta se ruju farmayein.'
        )}
      </div>
    </div>
  );
};
