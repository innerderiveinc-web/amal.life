import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Navigation } from '../components/Navigation';
import { AmalTheme } from '@amal/ui';
import { SirahExplorerRoute } from '../features/sirah/routes/SirahExplorerRoute';
import { SirahEventRecord, ShamailReportRecord, SirahReportVariantRecord } from '@amal/types';
import { sirahEngine } from '@amal/amal-engine';
import { useLanguage } from '../context/LanguageContext';

export default function SirahPage() {
  const { t, language, isUrdu, isRtl } = useLanguage();
  const [events, setEvents] = useState<SirahEventRecord[]>([]);
  const [shamail, setShamail] = useState<ShamailReportRecord[]>([]);
  const [variants, setVariants] = useState<SirahReportVariantRecord[]>([]);
  const [expandedQA, setExpandedQA] = useState<Record<number, boolean>>({});
  const [isQABoxOpen, setIsQABoxOpen] = useState(false);

  const sampleSirahQA = [
    {
      qNum: 1,
      qUrdu: 'قرآن مجید میں رسول اللہ ﷺ کے کون سے اسمائے مبارکہ صراحتاً مذکور ہیں؟',
      aUrdu: 'قرآن مجید میں چار مقامات (آل عمران: ۱۴۴، احزاب: ۴۰، محمد: ۲، فتح: ۲۹) پر نامِ نامی "محمد" اور سورۂ صف (آیت ۶) میں "احمد" وارد ہوا ہے۔',
      qEn: 'Which blessed names of the Prophet ﷺ are explicitly mentioned in the Noble Quran?',
      aEn: 'The name "Muhammad" appears 4 times (3:144, 33:40, 47:2, 48:29) and "Ahmad" appears once in Surah al-Saff (61:6).',
      qRoman: 'Quran Majeed mein Rasoolullah ﷺ ke kaun se Asma-e-Mubarakah sarahatan mazkoor hain?',
      aRoman: 'Quran Majeed mein 4 maqamat (Aal-e-Imran: 144, Ahzab: 40, Muhammad: 2, Fath: 29) par naam-e-nami "Muhammad" aur Surah as-Saff (Aayat 6) mein "Ahmad" waarid hua hai.',
    },
    {
      qNum: 2,
      qUrdu: 'والدہ ماجدہ سیدہ آمنہ رضی اللہ عنہا کے بعد سب سے پہلے کس خوش نصیب نے حضور ﷺ کو دودھ پلایا؟',
      aUrdu: 'سب سے پہلے حضرت ثویبہ رضی اللہ عنہا (ابو لہب کی آزاد کردہ باندی) نے اور پھر سیدہ حلیمہ سعدیہ رضی اللہ عنہا نے دیارِ بنو سعد میں یہ شرف حاصل کیا۔',
      qEn: 'Who had the honor of nursing the Prophet ﷺ after his noble mother Sayyidah Aminah?',
      aEn: 'First Thuwaybah (freed by Abu Lahab), followed by Sayyidah Halimah al-Sa\'diyyah in the deserts of Banu Sa\'d.',
      qRoman: 'Walidah Majidah Sayyidah Aminah (radiyAllahu anha) ke baad sab se pehle kis khush-naseeb ne Huzoor ﷺ ko doodh pilaya?',
      aRoman: 'Sab se pehle Hazrat Thuwaybah (radiyAllahu anha) (Abu Lahab ki aazad kardah baandi) ne aur phir Sayyidah Halimah Sa\'diyyah (radiyAllahu anha) ne deeyar-e-Banu Sa\'d mein yeh sharaf hasil kiya.',
    },
    {
      qNum: 3,
      qUrdu: 'ہجرتِ مدینہ کے وقت رسول اللہ ﷺ اور حضرت ابو بکر صدیق رضی اللہ عنہ نے غارِ ثور میں کتنی راتیں قیام فرمایا؟',
      aUrdu: 'غارِ ثور میں مسلسل ۳ راتیں قیام فرمایا، اور چوتھے دن یثرب (مدینہ منورہ) کے لیے روانگی ہوئی۔',
      qEn: 'How many nights did the Prophet ﷺ and Sayyiduna Abu Bakr reside in the Cave of Thawr during the Hijrah?',
      aEn: 'They stayed for three continuous nights, setting forth for Madinah on the fourth morning.',
      qRoman: 'Hijrat-e-Madinah ke waqt Rasoolullah ﷺ aur Hazrat Abu Bakr Siddiq (radiyAllahu anhu) ne Ghaar-e-Thawr mein kitni raatein qayam farmaya?',
      aRoman: 'Ghaar-e-Thawr mein musalsal 3 raatein qayam farmaya, aur chauthe din Yathrib (Madinah Munawwarah) ke liye rawangi hui.',
    },
    {
      qNum: 4,
      qUrdu: 'غزوۂ بدر کب واقع ہوا اور اس میں مسلمانوں کا نعرہ و شعار کیا تھا؟',
      aUrdu: '۱۷ رمضان المبارک ۲ ہجری بروز جمعہ واقع ہوا۔ مجاہدین کا شعار "یا منصورُ أَمِتْ أَمِتْ" تھا، اور اللہ تعالیٰ نے آسمان سے ملائکہ کے ذریعے نصرت فرمائی۔',
      qEn: 'When did the Battle of Badr take place, and what was the battle cry of the Sahabah?',
      aEn: 'On Friday, 17th Ramadan, 2 AH. Their call was "Ya Mansur Amit Amit", and Allah aided them with descending angels.',
      qRoman: 'Ghazwah-e-Badr kab waqe hua aur is mein Musalmanon ka na\'arah o shi\'aar kya tha?',
      aRoman: '17 Ramadan-ul-Mubarak 2 Hijri baroz Juma waqe hua. Mujahideen ka shi\'aar "Ya Mansur Amit Amit" tha, aur Allah Ta\'ala ne aasmaan se farishton ke zariye nusrat farmayi.',
    },
    {
      qNum: 5,
      qUrdu: 'صلحِ حدیبیہ کس سن ہجری میں ہوئی اور قرآن نے اسے کیا قرار دیا؟',
      aUrdu: 'ذوالقعدہ ۶ ہجری میں واقع ہوئی۔ اللہ تعالیٰ نے سورۂ فتح میں اسے "فَتْحًا مُّبِينًا" (کھلی اور روشن فتح) قرار دیا۔',
      qEn: 'In which year did the Treaty of Hudaybiyyah occur, and how did the Quran describe it?',
      aEn: 'In Dhu al-Qi\'dah, 6 AH. Allah proclaimed it in Surah al-Fath as "Fathan Mubeena" (A manifest victory).',
      qRoman: 'Sulh-e-Hudaybiyyah kis san Hijri mein hui aur Quran ne isey kya qarar diya?',
      aRoman: 'Dhu al-Qi\'dah 6 Hijri mein waqe hui. Allah Ta\'ala ne Surah al-Fath mein isey "Fathan Mubeena" (Khuli aur roshan fatah) qarar diya.',
    }
  ];

  useEffect(() => {
    try {
      const timeline = sirahEngine.getTimeline();
      const shamailList = sirahEngine.listShamailReports();
      setEvents(timeline.events || []);
      setShamail(shamailList || []);
      setVariants([]);
    } catch (err) {
      console.error('Failed to load Sirah timeline from engine', err);
    }
  }, []);

  return (
    <div style={{ backgroundColor: AmalTheme.colors.surface.backgroundLight, minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <Head>
        <title>{`AMAL OS — ${t('Prophetic Life Graph & Shama\'il', 'سیرت النبی ﷺ و شمائلِ مصطفیٰ', 'السيرة النبوية والشمائل المحمدية', 'Seerat-e-Nabawi ﷺ o Shamail')}`}</title>
        <meta name="description" content="The Blessed Prophetic Biography (Sirah), Shamail al-Muhammadiyyah, and Interactive Chronological Milestones." />
      </Head>
      <Navigation />
      <main style={{ maxWidth: 880, margin: '0 auto', padding: '0 20px 60px' }}>
        {/* Banner connecting text Sirah to canonical Sirah Audiobooks */}
        <div
          style={{
            backgroundColor: '#ECFDF5',
            border: '1px solid #A7F3D0',
            borderRadius: 14,
            padding: '14px 18px',
            marginBottom: 20,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <div>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#065F46', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span>🎧</span>
              <span>
                {t(
                  '4 Masterwork Sirah Audiobooks & Commentaries',
                  '۴ شاہکار صوتی کتبِ سیرت و تفصیلی شروحات',
                  '٤ كتب صوتية في السيرة النبوية مع الشروح',
                  '4 Shahkar Seerat Audiobooks & Sharah Suite'
                )}
              </span>
            </div>
            <div style={{ fontSize: 12, color: '#047857', marginTop: 2 }}>
              {t(
                'Listen to complete chapter series of Al-Raheeq al-Makhtum, Diya al-Nabi ﷺ, Sirat-e-Mustafa ﷺ, and Dars-e-Shifa.',
                'الرحیق المختوم، ضیاء النبی ﷺ، سیرتِ مصطفیٰ ﷺ، اور درسِ شفاء کے مکمل سلسلہ وار دروس سنیں۔',
                'استمع إلى دروس الرحيق المختوم وضياء النبي ﷺ وسيرة المصطفى ﷺ ودرس الشفاء.',
                'Al-Raheeq al-Makhtum, Zia-un-Nabi ﷺ, Seerat-e-Mustafa ﷺ, aur Dars-e-Shifa ke mukammal duroos sunein.'
              )}
            </div>
          </div>
          <Link
            href="/audio?tab=SIRAH"
            style={{
              textDecoration: 'none',
              padding: '8px 16px',
              backgroundColor: '#065F46',
              color: '#FFFFFF',
              borderRadius: 8,
              fontSize: 12.5,
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              boxShadow: '0 2px 4px rgba(6, 95, 70, 0.2)',
            }}
          >
            <span>
              {t(
                'Open Sirah Audio Portal ➔',
                'سیرت آڈیو پورٹل کھولیں ➔',
                'فتح بوابة السيرة الصوتية ➔',
                'Seerat Audio Portal Kholein ➔'
              )}
            </span>
          </Link>
        </div>

        {/* 350 Questions & Answers on Seerah Interactive Module */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: 14,
            padding: '16px 20px',
            marginBottom: 20,
            boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 12,
              cursor: 'pointer',
            }}
            onClick={() => setIsQABoxOpen(!isQABoxOpen)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 24 }}>💡</span>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 10, fontWeight: 800, color: '#B45309', backgroundColor: '#FEF3C7', padding: '2px 8px', borderRadius: 4 }}>
                    {t('SIRAH TRIVIA & QUIZ', 'مسابقہ و معلوماتِ سیرت', 'مسابقة السيرة النبوية', 'Seerat Quiz & Maloomat')}
                  </span>
                  <span style={{ fontSize: 11, color: '#64748B' }}>
                    {t('350 Questions & Answers', '۳۵۰ سوال و جواب', '٣٥٠ سؤال وجواب', '350 Sawal-o-Jawab')}
                  </span>
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 800, color: '#0F172A', margin: '4px 0 2px' }}>
                  {t(
                    '350 Questions & Answers on the Prophetic Sirah (Abu Huzayfah)',
                    'سیرت طیبہ پر ۳۵۰ سوال و جواب (ابوحذیفہ) — مطالعہ و خود احتسابی',
                    '٣٥٠ سؤال وجواب في السيرة النبوية (أبو حذيفة)',
                    'Seerat-e-Tayyibah Par 350 Sawal-o-Jawab (Abu Huzayfah)'
                  )}
                </h3>
                <div style={{ fontSize: 12, color: '#64748B' }}>
                  {t(
                    'Test your knowledge on the Prophet\'s birth, nursing, Hijrah, expeditions, and noble traits.',
                    'ولادت، رضاعت، ہجرت، غزوات اور شمائل کے اہم سوالات سے اپنے علم کی جانچ کریں۔',
                    'اختبر معلوماتك في المولد النبوي والهجرة والغزوات والشمائل المحمدية.',
                    'Wiladat, raza\'at, hijrat, ghazwat aur shamail ke ahem sawalat se apna ilm janchiye.'
                  )}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <button
                type="button"
                style={{
                  padding: '6px 14px',
                  borderRadius: 8,
                  backgroundColor: isQABoxOpen ? '#F1F5F9' : '#ECFDF5',
                  color: isQABoxOpen ? '#475569' : '#047857',
                  border: 'none',
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                {isQABoxOpen
                  ? t('▲ Close', '▲ بند کریں', '▲ إغلاق', '▲ Band Karein')
                  : t('▼ View Sample Questions', '▼ منتخب سوالات دیکھیں', '▼ عرض الأسئلة المختارة', '▼ Muntakhab Sawalat Dekhein')}
              </button>
            </div>
          </div>

          {isQABoxOpen && (
            <div style={{ marginTop: 16, borderTop: '1px solid #F1F5F9', paddingTop: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginBottom: 12 }}>
                <Link
                  href="/library?work=CANON-SIRAH-350-QA"
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: '#065F46',
                    textDecoration: 'none',
                    padding: '4px 10px',
                    borderRadius: 6,
                    backgroundColor: '#ECFDF5',
                  }}
                >
                  📖 {t('Read Full Chapters in Library ➔', 'لائبریری میں مکمل ابواب پڑھیں ➔', 'اقرأ الفصول في المكتبة ➔', 'Library Mein Mukammal Abwab Padhein ➔')}
                </Link>
                <a
                  href="/books/seerat-350-sawal-jawab.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: '#92400E',
                    textDecoration: 'none',
                    padding: '4px 10px',
                    borderRadius: 6,
                    backgroundColor: '#FEF3C7',
                  }}
                >
                  📥 {t('Full PDF (2.5 MB) ↗', 'مکمل پی ڈی ایف (2.5 MB) ↗', 'ملف PDF الكامل (٢.٥ ميجابايت) ↗', 'Mukammal PDF (2.5 MB) ↗')}
                </a>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {sampleSirahQA.map((qa) => {
                  const isOpen = !!expandedQA[qa.qNum];
                  const questionText = isUrdu ? qa.qUrdu : language === 'roman' ? qa.qRoman : qa.qEn;
                  const answerText = isUrdu ? qa.aUrdu : language === 'roman' ? qa.aRoman : qa.aEn;

                  return (
                    <div
                      key={qa.qNum}
                      style={{
                        borderRadius: 10,
                        border: isOpen ? '1px solid #A7F3D0' : '1px solid #E2E8F0',
                        backgroundColor: isOpen ? '#F0FDF4' : '#F8FAFC',
                        padding: '12px 16px',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                      onClick={() => setExpandedQA((prev) => ({ ...prev, [qa.qNum]: !prev[qa.qNum] }))}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, flex: 1 }}>
                          <span style={{ fontSize: 13, fontWeight: 800, color: '#047857', backgroundColor: '#DCFCE7', padding: '3px 8px', borderRadius: 6 }}>
                            {t(`Q${qa.qNum}`, `س ${qa.qNum}`, `س${qa.qNum}`, `Sawal ${qa.qNum}`)}
                          </span>
                          <div style={{ flex: 1 }}>
                            <div style={{
                              fontSize: isUrdu ? 16.5 : 14.5,
                              fontWeight: 700,
                              color: '#0F172A',
                              direction: isRtl ? 'rtl' : 'ltr',
                              textAlign: isRtl ? 'right' : 'left',
                              lineHeight: isUrdu ? 1.6 : 1.45,
                              fontFamily: isUrdu ? 'var(--font-urdu), serif' : 'system-ui, sans-serif'
                            }}>
                              {questionText}
                            </div>
                            {!isUrdu && language !== 'roman' && (
                              <div style={{ fontSize: 13, color: '#64748B', marginTop: 3 }}>
                                {qa.qUrdu}
                              </div>
                            )}
                          </div>
                        </div>
                        <span style={{ fontSize: 14, color: '#047857', fontWeight: 800 }}>
                          {isOpen ? '▲' : '▼'}
                        </span>
                      </div>

                      {isOpen && (
                        <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid #BBF7D0' }}>
                          <div style={{
                            fontSize: isUrdu ? 16 : 14,
                            fontWeight: 600,
                            color: '#065F46',
                            direction: isRtl ? 'rtl' : 'ltr',
                            textAlign: isRtl ? 'right' : 'left',
                            lineHeight: isUrdu ? 1.8 : 1.6,
                            fontFamily: isUrdu ? 'var(--font-urdu), serif' : 'system-ui, sans-serif'
                          }}>
                            <strong>{t('Answer: ', 'جواب: ', 'الجواب: ', 'Jawab: ')}</strong> {answerText}
                          </div>
                          {!isUrdu && language !== 'roman' && (
                            <div style={{ fontSize: 13, color: '#475569', marginTop: 6, lineHeight: 1.6, direction: 'rtl', textAlign: 'right', fontFamily: 'var(--font-urdu), serif' }}>
                              <strong>جواب:</strong> {qa.aUrdu}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <SirahExplorerRoute
          events={events}
          shamailReports={shamail}
          variants={variants}
        />
      </main>
    </div>
  );
}
