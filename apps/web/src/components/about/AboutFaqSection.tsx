import React, { useState } from 'react';

export interface FaqItem {
  q: string;
  qUrdu: string;
  a: string;
  aUrdu?: string;
}

export const AMAL_FAQS: FaqItem[] = [
  {
    q: 'What is AMAL OS and how is it different from other Islamic apps?',
    qUrdu: 'عمل کیا ہے اور یہ دوسری اسلامی ایپس سے کس طرح مختلف ہے؟',
    a: 'AMAL OS is a sovereign, ad-free Muslim Life Operating System. Unlike conventional apps that merely serve as prayer alarm clocks or gamify worship with anxiety-inducing streak scores, AMAL OS converts intentional Niyyah into actionable micro-habits, protects private reflections in an isolated domestic vault, and grounds every piece of guidance in verified classical Islamic scholarship.',
  },
  {
    q: 'Does AMAL OS issue independent religious rulings or Fatwas?',
    qUrdu: 'کیا امل او ایس کوئی خود ساختہ فتویٰ یا شرعی فیصلہ جاری کرتا ہے؟',
    a: 'Absolutely not. In classical Islamic jurisprudence, issuing a legal verdict (Fatwa) is the exclusive preserve of qualified, living human Muftis with continuous sanad (scholarly lineage). AMAL OS is strictly a research, educational, and workflow companion. Machines and automated systems are strictly prohibited from deriving new verdicts or ruling on halal and haram. AMAL OS presents verbatim classical primary sources and directs complex personal inquiries directly to recognized Dar-ul-Ifta institutions.',
    aUrdu:
      'ہرگز نہیں۔ اسلامی شریعت میں فتویٰ دینا صرف زندہ اور باقاعدہ مستند مفتیانِ کرام کا حق ہے۔ امل ایک تحقیقی و معلوماتی پلیٹ فارم ہے جس میں کسی بھی مشین یا خودکار نظام کو نیا فتویٰ گھڑنے یا حلال و حرام کا خود فیصلہ کرنے کی قطعی اجازت نہیں۔ امل صرف قرآن، سنت اور فقہائے اربعہ کی معتبر کتب سے اصل متون و حوالہ جات پیش کرتا ہے اور ذاتی پیچیدہ مسائل میں مستند مفتیانِ کرام سے رجوع کرواتا ہے۔',
  },
  {
    q: "What is AMAL OS's policy on technology and automated algorithms?",
    qUrdu: 'امل او ایس میں جدید ٹیکنالوجی اور سرچ الگورتھم کے کیا شرعی حدود و قیود ہیں؟',
    a: 'We adhere to a strict "Clerical Aid, Never a Mufti" protocol. AMAL OS uses deterministic research indexes and semantic cross-referencing strictly as a clerical aid (Kaatib). It is strictly limited to four beneficial functions: (1) Instant retrieval of verbatim Quran & Hadith text without altering any wording, (2) Translating daily intentions into structured Sunnah micro-habits, (3) Cross-referencing classical texts (linking Kanz-ul-Iman with Khaza\'in-ul-Irfan and Bahar-e-Shariat), and (4) Structuring complex case backgrounds for qualified human Muftis to review. AMAL OS never generates fatwas, never makes halal/haram judgments independently, and never alters any sacred texts.',
  },
  {
    q: 'How does AMAL OS treat the Four Sunni Madhhabs (Fiqh Schools)?',
    qUrdu: 'چاروں فقہی مذاہب (حنفی، شافعی، مالکی، حنبلی) کے بارے میں کیا طریقہ کار ہے؟',
    a: "AMAL OS strictly upholds the classical consensus of Ahl al-Sunnah wal-Jama'ah (al-Sawad al-A'zam). All four historical Sunni legal schools—Hanafi, Shafi'i, Maliki, and Hanbali—are presented with equal scholarly reverence and canonical fidelity. Users can toggle Asr times (Mislayn vs Misl al-Awwal) and Zakat jewelry positions per their followed school with complete ease.",
  },
  {
    q: 'How are prayer times and Qibla direction calculated?',
    qUrdu: 'نماز کے اوقات اور قبلہ کا رخ کس طرح معلوم کیا جاتا ہے؟',
    a: 'Prayer times and Qibla azimuth are calculated deterministically on-device using precise solar astronomical algorithms. They do not depend on external servers or commercial APIs. Furthermore, classical Dar-ul-Ifta precautionary buffers (2-minute Ihtiyat for Dhuhr and Maghrib) are implemented for spiritual assurance.',
  },
  {
    q: 'Why are there zero advertisements and zero user tracking?',
    qUrdu: 'اس ایپ میں اشتہارات اور ٹریکنگ کیوں نہیں ہے؟',
    a: 'Worship and private spiritual reflections are sacred trusts (Amanah). Commercial advertising introduces undignified distractions, while tracking software compromises user privacy. AMAL OS is 100% ad-free, does not sell data, and stores your personal reflections securely.',
  },
  {
    q: 'Can people outside India use this globally?',
    qUrdu: 'کیا اسے ہندوستان کے باہر دنیا بھر میں استعمال کیا جا سکتا ہے؟',
    a: 'Yes, seamlessly. AMAL OS includes an integrated directory of 150+ major global cities across the Middle East, Europe, North America, Africa, Southeast Asia, and Australasia, along with support for international calculation methods (Umm al-Qura, MWL, ISNA, Karachi, Egyptian Authority) and custom GPS coordinates.',
  },
];

interface AboutFaqSectionProps {
  isUrdu: boolean;
}

export const AboutFaqSection: React.FC<AboutFaqSectionProps> = ({ isUrdu }) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <section style={{ marginBottom: 56 }}>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: '#1B4332' }}>
          Frequently Asked Questions (FAQ)
        </h2>
        <p style={{ fontSize: 14, color: '#6B7280', marginTop: 4 }}>
          Aksar Puche Jane Wale Sawalat — Clear answers to common questions
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          maxWidth: 860,
          margin: '0 auto',
        }}
      >
        {AMAL_FAQS.map((faq, idx) => {
          const isOpen = activeFaq === idx;
          return (
            <div
              key={idx}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 10,
                border: '1px solid #E5E7EB',
                overflow: 'hidden',
              }}
            >
              <button
                onClick={() => setActiveFaq(isOpen ? null : idx)}
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontWeight: 700,
                  fontSize: 15,
                  color: isOpen ? '#166534' : '#111827',
                }}
              >
                <span>{isUrdu ? faq.qUrdu : faq.q}</span>
                <span style={{ fontSize: 18, color: '#9CA3AF', marginLeft: 12 }}>
                  {isOpen ? '▲' : '▼'}
                </span>
              </button>

              {isOpen && (
                <div style={{ padding: '0 20px 18px', borderTop: '1px solid #F3F4F6' }}>
                  {isUrdu ? (
                    <p
                      style={{
                        fontSize: 15,
                        color: '#1E293B',
                        lineHeight: 1.8,
                        margin: '10px 0 0',
                        textAlign: 'right',
                      }}
                      dir="rtl"
                      className="font-urdu"
                    >
                      {faq.aUrdu || faq.a}
                    </p>
                  ) : (
                    <p
                      style={{
                        fontSize: 14,
                        color: '#374151',
                        lineHeight: 1.6,
                        margin: '10px 0 0',
                      }}
                    >
                      {faq.a}
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
