import React from 'react';

export interface FooterLegalDisclaimerProps {
  isUrdu: boolean;
}

export const FooterLegalDisclaimer: React.FC<FooterLegalDisclaimerProps> = ({ isUrdu }) => {
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
        <span>{isUrdu ? 'شرعی تنبیہ و احتیاط:' : 'Shar\'i Non-Fatwa Advisory:'}</span>
      </div>
      {isUrdu ? (
        <div>
          عمل او ایس (AMAL OS) ایک تعلیمی، تدبری اور روزمرہ حیاتِ مسلم کا رہنمائی نظام ہے۔ یہ معتمد دار الافتاء اور جید مفتیانِ کرام کا متبادل نہیں ہے اور نہ ہی خودکار فتوے جاری کرتا ہے۔ طلاق، نکاح کے نزاعات، قسم و کفارہ اور پیچیدہ وراثت جیسے معاملات میں اپنے قریبی مستند مفتی صاحب یا دار الافتاء سے رجوع فرمائیں۔
        </div>
      ) : (
        <div>
          AMAL OS is an educational habit and lifestyle intelligence platform adhering strictly to traditional Sunni orthodoxy. It does <strong>NOT</strong> issue autonomous religious decrees (fatwas). Complex personal litigation, marriage disputes, oaths, and probate inheritance must be submitted to qualified, living human scholars and accredited Dar-ul-Ifta institutions.
        </div>
      )}
    </div>
  );
};
