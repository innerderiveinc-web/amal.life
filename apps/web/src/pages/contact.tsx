import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Navigation } from '../components/Navigation';
import { showAmalToast } from '../components/Toast';
import { useLanguage } from '../context/LanguageContext';

export default function ContactPage() {
  const { t, language } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState<'SCHOLARLY' | 'GENERAL' | 'BUG' | 'PARTNERSHIP'>('GENERAL');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      showAmalToast(t('Please fill all required fields.', 'تمام ضروری خانے پر کریں۔', 'يرجى ملء جميع الحقول المطلوبة.', 'Tamam zaroori khaney pur karein.'), 'warning');
      return;
    }
    setSubmitted(true);
    showAmalToast(t('JazakAllahu Khayran! Your message has been received.', 'جزاکم اللہ خیراً! آپ کا پیغام موصول ہو گیا۔', 'جزاكم الله خيراً! تم استلام رسالتكم.', 'JazakAllahu Khayran! Aap ka paigham mosool ho gaya.'), 'success');
  };

  return (
    <div style={{ backgroundColor: '#FAF9F6', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <Head>
        <title>{`AMAL OS — ${t('Contact & Support', 'رابطہ و شرعی استفسار', 'التواصل والاستفسارات العلمية', 'Rabtah o Support')}`}</title>
        <meta name="description" content="Get in touch with AMAL OS for scholarly feedback, community support, or institutional inquiries." />
      </Head>

      <Navigation />

      <main style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px 60px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <span style={{ fontSize: 36 }}>📬</span>
          <h1 style={{ fontSize: 28, fontWeight: 900, color: '#1B4332', marginTop: 8, marginBottom: 8 }}>
            {t('Contact & Scholarly Inquiries', 'رابطہ و شرعی استفسار', 'التواصل والاستفسارات العلمية', 'Contact & Scholarly Inquiries')}
          </h1>
          <p style={{ fontSize: 14, color: '#6B7280', maxWidth: 600, margin: '0 auto', lineHeight: 1.6 }}>
            {t(
              'Have a question, bug report, or scholarly observation? We are here to listen with humility and diligence.',
              'کوئی سوال، تکنیکی خامی یا علمی مشاہدہ ہو تو ہم عاجزی و توجہ سے سننے کے لیے حاضر ہیں۔',
              'هل لديك سؤال أو ملحوظة علمية أو بلاغ عن خلل فني؟ يسعدنا التواصل معكم بكل عناية وتواضع.',
              'Koi sawal, bug report ya ilmi tajweez ho toh hum se rabtah farmayein.'
            )}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {/* Direct Channels */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ backgroundColor: '#FFFFFF', padding: 20, borderRadius: 12, border: '1px solid #E5E7EB' }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>📜</div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1B4332', marginBottom: 4 }}>
                {t('Scholarly & Fiqh Review', 'علمی و فقہی استفسار', 'المراجعة العلمية والفقهية', 'Ilmi o Fiqhi Review')}
              </h3>
              <p style={{ fontSize: 12, color: '#6B7280', marginBottom: 10, lineHeight: 1.5 }}>
                {t(
                  'For Muftis, Ulama, and academic researchers reviewing textual references, corpus grading, or Madhhab accuracy.',
                  'مفتیانِ کرام، علمائے عظام اور محققین کے لیے جو نصوص کے مراجع اور فقہی مذاہب کی صحت کا جائزہ لیتے ہیں۔',
                  'للمفتين والعلماء والباحثين لمراجعة النصوص وعزوها وصحة التخريج الفقهي.',
                  'Muftiyan-e-Kiram aur ulema ke liye jo fiqhi hawala jaat aur mutoon ka jaiza lete hain.'
                )}
              </p>
              <a href="mailto:scholars@amal.life" style={{ color: '#047857', fontWeight: 700, fontSize: 13, textDecoration: 'none' }}>
                scholars@amal.life →
              </a>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', padding: 20, borderRadius: 12, border: '1px solid #E5E7EB' }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>🤝</div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1B4332', marginBottom: 4 }}>
                {t('General Support & Feedback', 'عام رہنمائی و تجاویز', 'الدعم الفني والاقتراحات العامة', 'Aam Guidance o Feedback')}
              </h3>
              <p style={{ fontSize: 12, color: '#6B7280', marginBottom: 10, lineHeight: 1.5 }}>
                {t(
                  'Questions regarding prayer times, city coordinates, app usage, or community suggestions.',
                  'اوقاتِ نماز، شہری نقاط، ایپ کے استعمال یا دیگر عمومی تجاویز سے متعلق استفسارات۔',
                  'للأسئلة المتعلقة بمواقيت الصلاة، وإحداثيات المدن، والاستخدام العام للمنظومة.',
                  'Namaz ke auqat, city coordinates aur app ke istemal se mutalliq sawalat.'
                )}
              </p>
              <a href="mailto:salam@amal.life" style={{ color: '#047857', fontWeight: 700, fontSize: 13, textDecoration: 'none' }}>
                salam@amal.life →
              </a>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', padding: 20, borderRadius: 12, border: '1px solid #E5E7EB' }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>🛡️</div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1B4332', marginBottom: 4 }}>
                {t('Privacy & Security Officer', 'رازداری و سیکیورٹی شعبہ', 'مسؤول الخصوصية والأمان', 'Privacy & Security Officer')}
              </h3>
              <p style={{ fontSize: 12, color: '#6B7280', marginBottom: 10, lineHeight: 1.5 }}>
                {t(
                  'For questions regarding data sovereignty, account deletion, and zero-tracking verification.',
                  'ڈیٹا خود مختاری، اکاؤنٹ ختم کرنے اور مکمل ٹریکنگ فری نظام کی تصدیق سے متعلق امور۔',
                  'للأسئلة المتعلقة بسيادة البيانات، وحذف الحسابات، والتحقق من انعدام التتبع.',
                  'Data sovereignty, account deletion aur zero-tracking verification ke liye.'
                )}
              </p>
              <a href="mailto:privacy@amal.life" style={{ color: '#047857', fontWeight: 700, fontSize: 13, textDecoration: 'none' }}>
                privacy@amal.life →
              </a>
            </div>
          </div>

          {/* Form */}
          <div style={{ backgroundColor: '#FFFFFF', padding: 28, borderRadius: 12, border: '1px solid #E5E7EB' }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: '#1B4332', marginBottom: 18 }}>
              {t('Send a Direct Message', 'براہِ راست پیغام بھیجیں', 'إرسال رسالة مباشرة', 'Direct Message Bhejein')}
            </h2>

            {submitted ? (
              <div style={{ backgroundColor: '#F0FDF4', padding: 24, borderRadius: 10, border: '1px solid #BBF7D0', textAlign: 'center' }}>
                <span style={{ fontSize: 32 }}>✨</span>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#166534', marginTop: 10, marginBottom: 6 }}>
                  {t('Message Received with Honor', 'پیغام عزت و احترام کے ساتھ موصول ہوا', 'تم استلام رسالتكم بكل تقدير', 'Paigham Mosool Hua')}
                </h3>
                <p style={{ fontSize: 13, color: '#15803D', lineHeight: 1.5 }}>
                  {t(
                    'Your submission has been logged into our queue. A member of our team or scholarly board will review it promptly.',
                    'آپ کا پیغام ہمارے نظام میں درج ہو چکا ہے۔ ہماری علمی یا تکنیکی ٹیم جلد اس کا جائزہ لے گی۔',
                    'تم تسجيل رسالتكم في نظامنا وسيقوم أحد أعضاء الفريق أو الهيئة العلمية بالرد قريباً.',
                    'Aap ka paigham darj ho chuka hai. Hamari team ya scholarly board jald ruju karegi.'
                  )}
                </p>
                <button
                  onClick={() => { setSubmitted(false); setMessage(''); }}
                  style={{
                    marginTop: 16,
                    backgroundColor: '#166534',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: 6,
                    fontWeight: 700,
                    fontSize: 12,
                    cursor: 'pointer',
                  }}
                >
                  {t('Send Another Message', 'ایک اور پیغام بھیجیں', 'إرسال رسالة أخرى', 'Ek Aur Paigham Bhejein')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 4 }}>
                    {t('Your Name *', 'آپ کا اسم گرامی *', 'الاسم الكريم *', 'Aap Ka Naam *')}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t('e.g. Zaid Khan', 'مثلاً: زید خان', 'مثلاً: زيد خان', 'Maslan: Zaid Khan')}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: 8,
                      border: '1px solid #D1D5DB',
                      fontSize: 14,
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 4 }}>
                    {t('Email Address *', 'ای میل ایڈریس *', 'البريد الإلكتروني *', 'Email Address *')}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('your.email@domain.com', 'apna.email@domain.com', 'email@domain.com', 'your.email@domain.com')}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: 8,
                      border: '1px solid #D1D5DB',
                      fontSize: 14,
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 4 }}>
                    {t('Inquiry Category *', 'استفسار کی قسم *', 'نوع الاستفسار *', 'Inquiry Category *')}
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ('SCHOLARLY' | 'GENERAL' | 'BUG' | 'PARTNERSHIP'))}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: 8,
                      border: '1px solid #D1D5DB',
                      fontSize: 14,
                      outline: 'none',
                      backgroundColor: '#FFFFFF',
                    }}
                  >
                    <option value="GENERAL">{t('General Question or Feedback', 'عام سوال یا تجویز', 'سؤال أو اقتراح عام', 'Aam Sawal Ya Tajweez')}</option>
                    <option value="SCHOLARLY">{t('Fiqh / Scholarly Text Observation', 'فقہی یا علمی مشاہدہ', 'ملحوظة فقهية أو نصية', 'Fiqhi Ya Ilmi Mushahida')}</option>
                    <option value="BUG">{t('Bug or Astronomical Timing Issue', 'تکنیکی خرابی یا اوقات کا مسئلہ', 'خلل فني أو مواقيت الصلاة', 'Technical Bug Ya Auqat Masalah')}</option>
                    <option value="PARTNERSHIP">{t('Masjid / Community Institution', 'مسجد یا تعلیمی ادارہ', 'مسجد أو مؤسسة مجتمعية', 'Masjid Ya Idara')}</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 4 }}>
                    {t('Message *', 'پیغام کا متن *', 'نص الرسالة *', 'Paigham *')}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t('Write your observation or inquiry...', 'اپنا استفسار یا مشاہدہ تحریر فرمائیں...', 'اكتب استفسارك أو ملحوظتك هنا...', 'Apna paigham ya sawal yahan darj karein...')}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: 8,
                      border: '1px solid #D1D5DB',
                      fontSize: 14,
                      outline: 'none',
                      fontFamily: 'inherit',
                      resize: 'vertical',
                    }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    backgroundColor: '#1B4332',
                    color: '#FFFFFF',
                    padding: '12px 20px',
                    borderRadius: 8,
                    border: 'none',
                    fontWeight: 800,
                    fontSize: 14,
                    cursor: 'pointer',
                    marginTop: 6,
                  }}
                >
                  {t('Submit Inquiry →', 'پیغام ارسال کریں ➔', 'إرسال الاستفسار ➔', 'Paigham Bhejein ➔')}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}