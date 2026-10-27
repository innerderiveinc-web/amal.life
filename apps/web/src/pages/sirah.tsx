import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Navigation } from '../components/Navigation';
import { AmalTheme } from '@amal/ui';
import { SirahExplorerRoute } from '../features/sirah/routes/SirahExplorerRoute';
import { SirahEventRecord, ShamailReportRecord, SirahReportVariantRecord } from '@amal/types';
import { sirahEngine } from '@amal/amal-engine';

export default function SirahPage() {
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
      aEn: 'The name "Muhammad" appears 4 times (3:144, 33:40, 47:2, 48:29) and "Ahmad" appears once in Surah al-Saff (61:6).'
    },
    {
      qNum: 2,
      qUrdu: 'والدہ ماجدہ سیدہ آمنہ رضی اللہ عنہا کے بعد سب سے پہلے کس خوش نصیب نے حضور ﷺ کو دودھ پلایا؟',
      aUrdu: 'سب سے پہلے حضرت ثویبہ رضی اللہ عنہا (ابو لہب کی آزاد کردہ باندی) نے اور پھر سیدہ حلیمہ سعدیہ رضی اللہ عنہا نے دیارِ بنو سعد میں یہ شرف حاصل کیا۔',
      qEn: 'Who had the honor of nursing the Prophet ﷺ after his noble mother Sayyidah Aminah?',
      aEn: 'First Thuwaybah (freed by Abu Lahab), followed by Sayyidah Halimah al-Sa\'diyyah in the deserts of Banu Sa\'d.'
    },
    {
      qNum: 3,
      qUrdu: 'ہجرتِ مدینہ کے وقت رسول اللہ ﷺ اور حضرت ابو بکر صدیق رضی اللہ عنہ نے غارِ ثور میں کتنی راتیں قیام فرمایا؟',
      aUrdu: 'غارِ ثور میں مسلسل ۳ راتیں قیام فرمایا، اور چوتھے دن یثرب (مدینہ منورہ) کے لیے روانگی ہوئی۔',
      qEn: 'How many nights did the Prophet ﷺ and Sayyiduna Abu Bakr reside in the Cave of Thawr during the Hijrah?',
      aEn: 'They stayed for three continuous nights, setting forth for Madinah on the fourth morning.'
    },
    {
      qNum: 4,
      qUrdu: 'غزوۂ بدر کب واقع ہوا اور اس میں مسلمانوں کا نعرہ و شعار کیا تھا؟',
      aUrdu: '۱۷ رمضان المبارک ۲ ہجری بروز جمعہ واقع ہوا۔ مجاہدین کا شعار "یا منصورُ أَمِتْ أَمِتْ" تھا، اور اللہ تعالیٰ نے آسمان سے ملائکہ کے ذریعے نصرت فرمائی۔',
      qEn: 'When did the Battle of Badr take place, and what was the battle cry of the Sahabah?',
      aEn: 'On Friday, 17th Ramadan, 2 AH. Their call was "Ya Mansur Amit Amit", and Allah aided them with descending angels.'
    },
    {
      qNum: 5,
      qUrdu: 'صلحِ حدیبیہ کس سن ہجری میں ہوئی اور قرآن نے اسے کیا قرار دیا؟',
      aUrdu: 'ذوالقعدہ ۶ ہجری میں واقع ہوئی۔ اللہ تعالیٰ نے سورۂ فتح میں اسے "فَتْحًا مُّبِينًا" (کھلی اور روشن فتح) قرار دیا۔',
      qEn: 'In which year did the Treaty of Hudaybiyyah occur, and how did the Quran describe it?',
      aEn: 'In Dhu al-Qi\'dah, 6 AH. Allah proclaimed it in Surah al-Fath as "Fathan Mubeena" (A manifest victory).'
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
        <title>AMAL OS — Prophetic Life Graph & Shama'il</title>
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
              <span>۴ شاہکار صوتی کتبِ سیرت و تفصیلی شروحات (Sirah Audiobooks Suite)</span>
            </div>
            <div style={{ fontSize: 12, color: '#047857', marginTop: 2 }}>
              الرحیق المختوم، ضیاء النبی ﷺ، سیرتِ مصطفیٰ ﷺ، اور درسِ شفاء کے مکمل سلسلہ وار دروس سنیں۔
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
            <span>سیرت آڈیو پورٹل کھولیں ➔</span>
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
                    مسابقہ و معلوماتِ سیرت (SIRAH TRIVIA)
                  </span>
                  <span style={{ fontSize: 11, color: '#64748B' }}>۳۵۰ سوال و جواب</span>
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 800, color: '#0F172A', margin: '4px 0 2px' }}>
                  سیرت طیبہ پر ۳۵۰ سوال و جواب (ابوحذیفہ) — مطالعہ و خود احتسابی
                </h3>
                <div style={{ fontSize: 12, color: '#64748B' }}>
                  ولادت، رضاعت، ہجرت، غزوات اور شمائل کے اہم سوالات سے اپنے علم کی جانچ کریں۔
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
                {isQABoxOpen ? '▲ بند کریں' : '▼ منتخب سوالات دیکھیں'}
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
                  📖 لائبریری میں مکمل ابواب پڑھیں ➔
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
                  📥 مکمل پی ڈی ایف (2.5 MB) ↗
                </a>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {sampleSirahQA.map((qa) => {
                  const isOpen = !!expandedQA[qa.qNum];
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
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                          <span style={{ fontSize: 13, fontWeight: 800, color: '#047857', backgroundColor: '#DCFCE7', padding: '3px 8px', borderRadius: 6 }}>
                            س {qa.qNum}
                          </span>
                          <div>
                            <div style={{ fontSize: 16.5, fontWeight: 800, color: '#0F172A', direction: 'rtl', textAlign: 'right', lineHeight: 1.4, fontFamily: 'var(--font-urdu), serif' }}>
                              {qa.qUrdu}
                            </div>
                            <div style={{ fontSize: 13.5, color: '#475569', marginTop: 3 }}>
                              {qa.qEn}
                            </div>
                          </div>
                        </div>
                        <span style={{ fontSize: 14, color: '#047857', fontWeight: 800 }}>
                          {isOpen ? '▲' : '▼'}
                        </span>
                      </div>

                      {isOpen && (
                        <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid #BBF7D0' }}>
                          <div style={{ fontSize: 16, fontWeight: 700, color: '#065F46', direction: 'rtl', textAlign: 'right', lineHeight: 1.7, fontFamily: 'var(--font-urdu), serif' }}>
                            <strong>جواب:</strong> {qa.aUrdu}
                          </div>
                          <div style={{ fontSize: 13.5, color: '#1E293B', marginTop: 6, lineHeight: 1.6 }}>
                            <strong>Answer:</strong> {qa.aEn}
                          </div>
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
