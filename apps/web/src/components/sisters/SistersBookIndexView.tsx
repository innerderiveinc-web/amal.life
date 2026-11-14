import React, { useState } from 'react';
import { SanctuaryBook, SanctuaryBookChapter } from '../../lib/women-sanctuary-data';
import { useLanguage } from '../../context/LanguageContext';

export interface SistersBookIndexViewProps {
  isUrdu?: boolean;
  readingBook: SanctuaryBook;
  onBackToAllBooks: () => void;
  onSelectChapter: (chapter: SanctuaryBookChapter) => void;
  onOpenSanad: (
    title: string,
    author: string,
    hash: string,
    era: string,
    descUrdu: string,
    descEnglish: string,
    consensusUrdu: string
  ) => void;
}

export const SistersBookIndexView: React.FC<SistersBookIndexViewProps> = ({
  readingBook,
  onBackToAllBooks,
  onSelectChapter,
  onOpenSanad,
}) => {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'CHAPTERS' | 'FULL_PDF'>('CHAPTERS');

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 24,
        border: '1px solid #E5E7EB',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      }}
    >
      {/* Top Navigation & Actions */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
          flexWrap: 'wrap',
          gap: 10,
        }}
      >
        <button
          onClick={onBackToAllBooks}
          style={{
            backgroundColor: '#F3F4F6',
            border: 'none',
            padding: '6px 14px',
            borderRadius: 8,
            cursor: 'pointer',
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          {t('← Back to All Books', '← کتب خانے کی فہرست پر واپس', '← العودة إلى قائمة الكتب', '← Kutub khane ki fehrist par wapis')}
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <div
            style={{
              display: 'flex',
              backgroundColor: '#F1F5F9',
              borderRadius: 8,
              padding: 3,
              gap: 4,
            }}
          >
            <button
              onClick={() => setActiveTab('CHAPTERS')}
              style={{
                padding: '6px 14px',
                borderRadius: 6,
                fontSize: 12.5,
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                backgroundColor: activeTab === 'CHAPTERS' ? '#064E3B' : 'transparent',
                color: activeTab === 'CHAPTERS' ? '#FFFFFF' : '#475569',
                transition: 'all 0.15s ease',
              }}
            >
              📜 {t('Curated Chapters', 'منتخب ابواب', 'الأبواب المختارة', 'Muntakhab Abwaab')}
            </button>
            <button
              onClick={() => setActiveTab('FULL_PDF')}
              style={{
                padding: '6px 14px',
                borderRadius: 6,
                fontSize: 12.5,
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                backgroundColor: activeTab === 'FULL_PDF' ? '#064E3B' : 'transparent',
                color: activeTab === 'FULL_PDF' ? '#FFFFFF' : '#475569',
                transition: 'all 0.15s ease',
              }}
            >
              📑 {t('Full Book Edition', 'مکمل اصل کتاب', 'الكتاب الأصلي كاملاً', 'Mukammal Asal Kitab')}
            </button>
          </div>

          {(readingBook.pdfUrl || readingBook.onlineArchiveUrl) && (
            <a
              href={readingBook.pdfUrl || readingBook.onlineArchiveUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: '#FEF3C7',
                color: '#92400E',
                border: '1px solid #FDE68A',
                padding: '6px 14px',
                borderRadius: 8,
                fontSize: 12,
                fontWeight: 700,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <span>↗</span>
              <span>{t('Open Full Edition', 'نئی ونڈو میں مکمل نسخہ', 'فتح النسخة الكاملة', 'Nayi window mein mukammal nuskha')}</span>
            </a>
          )}

          <button
            onClick={() =>
              onOpenSanad(
                readingBook.titleUrdu,
                readingBook.authorUrdu,
                readingBook.verificationHash,
                readingBook.authorEra,
                readingBook.descriptionUrdu,
                readingBook.descriptionEnglish,
                readingBook.scholarlyConsensusUrdu
              )
            }
            style={{
              backgroundColor: '#ECFDF5',
              color: '#064E3B',
              border: '1px solid #A7F3D0',
              padding: '6px 12px',
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            ✓ {t('Sanad Certificate', 'تحقیق و سندِ کتاب', 'شهادة السند والتوثيق', 'Tehqeeq o Sanad-e-Kitab')}
          </button>
        </div>
      </div>

      {/* Book Metadata Header */}
      <h2 style={{ fontSize: 24, fontWeight: 800, color: '#064E3B', margin: '4px 0' }}>
        {(language === 'ur' || language === 'ar') ? readingBook.titleUrdu : readingBook.titleEnglish}
      </h2>
      <div style={{ fontSize: 14, color: '#047857', fontWeight: 600, marginBottom: 6 }}>
        {(language === 'ur' || language === 'ar') ? readingBook.titleEnglish : (readingBook.titleArabic || readingBook.titleUrdu)}
      </div>
      <div style={{ fontSize: 14, color: '#4B5563', marginBottom: 12 }}>
        <strong>{(language === 'ur' || language === 'ar') ? readingBook.authorUrdu : readingBook.authorEnglish}</strong> • {readingBook.authorEra}
      </div>
      <p style={{ fontSize: 15, color: '#374151', lineHeight: 1.7, marginBottom: 20 }}>
        {(language === 'ur' || language === 'ar') ? readingBook.descriptionUrdu : readingBook.descriptionEnglish}
      </p>

      {/* Scholarly Transparency Callout */}
      <div
        style={{
          backgroundColor: '#F0FDF4',
          borderRadius: 14,
          padding: '14px 18px',
          border: '1.5px solid #A7F3D0',
          marginBottom: 20,
          display: 'flex',
          alignItems: 'flex-start',
          gap: 12,
          boxShadow: '0 2px 6px rgba(6, 78, 59, 0.04)',
        }}
      >
        <span style={{ fontSize: 22, marginTop: 2 }}>⚖️</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <span
              style={{
                fontSize: 13,
                fontWeight: 900,
                color: '#065F46',
                backgroundColor: '#DCFCE7',
                padding: '2px 8px',
                borderRadius: 6,
                border: '1px solid #86EFAC',
              }}
            >
              «مُنتَخَبَات دِرَاسِيَّة تَعْلِيمِيَّة»
            </span>
            <span style={{ fontSize: 13, fontWeight: 800, color: '#065F46' }}>
              {t('Selected Core Pedagogical Chapters', 'منتخب تدریسی ابواب برائے خواتین', 'أبواب تعليمية وتربوية مختارة', 'Muntakhab Tadreesi Abwaab')}
            </span>
          </div>
          <div style={{ fontSize: 12.5, color: '#166534', lineHeight: 1.5 }}>
            {t(
              'These chapters represent foundational instructional selections from this masterwork. For the complete unabridged original edition, tap the "Full Book Edition" tab above.',
              'یہ ابواب اس شاہکار کتاب کے کلیدی تربیتی و فقہی مسائل کے جامع خلاصے ہیں۔ مکمل غیر محذوف کتاب مع تمام ابواب کے اصل نسخے کے لیے اوپر "مکمل اصل کتاب" کے ٹیب سے استفادہ فرمائیں۔',
              'تمثل هذه الأبواب خلاصات تربوية وفقهية جوهرية من هذا المصنف الأصيل. للاطلاع على النسخة الكاملة، استخدم علامة التبويب أعلاه.',
              'Yeh abwaab is shahkaar kitab ke kaleedi tarbiyati o fiqhi masail ke jaame khulasey hain. Mukammal kitab ke liye ooper Full Book tab dekhein.'
            )}
          </div>
        </div>
      </div>

      {/* VIEW CONTENT BASED ON ACTIVE TAB */}
      {activeTab === 'FULL_PDF' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {readingBook.pdfUrl ? (
            /* A) DIRECT LOCAL IN-APP PDF STREAMING VIEWER */
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: '#F8FAFC',
                  padding: '12px 18px',
                  borderRadius: 12,
                  border: '1px solid #E2E8F0',
                  marginBottom: 10,
                  flexWrap: 'wrap',
                  gap: 10,
                }}
              >
                <div>
                  <div style={{ fontWeight: 800, fontSize: 15, color: '#0F172A' }}>
                    {((language === 'ur' || language === 'ar') ? readingBook.titleUrdu : readingBook.titleEnglish)} — {t('Complete Printed Edition', 'مکمل مطبوعہ نسخہ', 'النسخة المطبوعة الكاملة', 'Mukammal Matboo\'ah Nuskha')}
                  </div>
                  <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>
                    {t('Author: ', 'مصنف: ', 'المؤلف: ', 'Musannif: ')}<strong>{(language === 'ur' || language === 'ar') ? readingBook.authorUrdu : readingBook.authorEnglish}</strong> • {t('Complete unabridged original book', 'مکمل غیر محذوف اصل کتاب', 'الكتاب الأصلي الكامل دون حذف', 'Mukammal ghair mahzoof asal kitab')}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 8 }}>
                  <a
                    href={readingBook.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: '7px 14px',
                      borderRadius: 8,
                      backgroundColor: '#FFFFFF',
                      color: '#064E3B',
                      border: '1px solid #A7F3D0',
                      fontSize: 12,
                      fontWeight: 700,
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    <span>↗</span>
                    <span>{t('Fullscreen', 'فل اسکرین نئی ونڈو', 'ملء الشاشة', 'Fullscreen')}</span>
                  </a>
                  <a
                    href={readingBook.pdfUrl}
                    download
                    style={{
                      padding: '7px 14px',
                      borderRadius: 8,
                      backgroundColor: '#064E3B',
                      color: '#FFFFFF',
                      fontSize: 12,
                      fontWeight: 700,
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    <span>📥</span>
                    <span>{t('Download PDF', 'ڈاؤن لوڈ PDF', 'تحميل PDF', 'Download PDF')}</span>
                  </a>
                </div>
              </div>

              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '750px',
                  borderRadius: 14,
                  overflow: 'hidden',
                  border: '1px solid #CBD5E1',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                  backgroundColor: '#525659',
                }}
              >
                <iframe
                  src={`${readingBook.pdfUrl}#toolbar=1&navpanes=1`}
                  width="100%"
                  height="100%"
                  style={{ border: 'none' }}
                  title={readingBook.titleEnglish}
                />
              </div>

              <div style={{ textAlign: 'center', fontSize: 12, color: '#64748B', marginTop: 8 }}>
                💡 {t('Use mouse, keyboard arrows, or scroll to read all pages, zoom, or jump to any page.', 'آپ اس ریڈر کے اندر ماؤس، کی بورڈ یا اسکرول بار سے تمام صفحات دیکھ سکتے ہیں، زوم کر سکتے ہیں اور تلاش کر سکتے ہیں۔', 'يمكنك التصفح والتكبير والتصغير والانتقال بين الصفحات بواسطة الفأرة أو لوحة المفاتيح.', 'Aap is reader ke andar mouse, keyboard ya scroll bar se tamam safhaat dekh sakte hain, zoom kar sakte hain.')}
              </div>
            </div>
          ) : readingBook.onlineArchiveUrl ? (
            /* B) VERIFIED WAQF DIGITAL ARCHIVE PORTAL (SHAMELA / MAKTABA-TUL-MADINA / ARCHIVE) */
            <div
              style={{
                padding: '24px',
                backgroundColor: '#F8FAFC',
                borderRadius: 14,
                border: '1px solid #E2E8F0',
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: 10,
                }}
              >
                <div>
                  <div style={{ fontWeight: 800, fontSize: 16, color: '#064E3B' }}>
                    🏛️ {t('Verified Waqf Digital Archive Edition', 'مستند وقف ڈیجیٹل نسخہ برائے علماء و محققین', 'النسخة الوقفية الرقمية المعتمدة للباحثين', 'Mustanad Waqf Digital Nuskha Baraye Ulama o Muhaqqiqeen')}
                  </div>
                  <div style={{ fontSize: 12.5, color: '#64748B', marginTop: 2 }}>
                    {t('Source: ', 'ماخذ: ', 'المصدر: ', 'Maakhaz: ')}<strong>{readingBook.onlineArchiveName || t('Maktaba-tul-Madina & Shamela Research Desk', 'مکتبۃ المدینہ و الشاملہ ریسرچ ڈیسک', 'مكتبة المدينة والمكتبة الشاملة', 'Maktaba-tul-Madina wa Shamela')}</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 8 }}>
                  <a
                    href={readingBook.onlineArchiveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: '8px 16px',
                      borderRadius: 8,
                      backgroundColor: '#064E3B',
                      color: '#FFFFFF',
                      fontSize: 13,
                      fontWeight: 700,
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    <span>↗</span>
                    <span>{t('Open Complete Original Edition', 'مکمل اصل ایڈیشن کھولیں (نئی ونڈو)', 'فتح النسخة الأصلية الكاملة', 'Mukammal Asal Edition Kholain')}</span>
                  </a>
                </div>
              </div>

              {/* In-app embedded viewer for the verified online edition */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '750px',
                  borderRadius: 12,
                  overflow: 'hidden',
                  border: '1px solid #CBD5E1',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                  backgroundColor: '#FFFFFF',
                }}
              >
                <iframe
                  src={readingBook.onlineArchiveUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 'none' }}
                  title={readingBook.titleEnglish}
                />
              </div>

              <div
                style={{
                  backgroundColor: '#EFF6FF',
                  border: '1px solid #BFDBFE',
                  borderRadius: 10,
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  fontSize: 12.5,
                  color: '#1E40AF',
                }}
              >
                <span>📜</span>
                <span>
                  <strong>{t('Scholarly Verification:', 'تحقیقی ضمانت:', 'الضمانة العلمية والتوثيق:', 'Tehqeeqi Zamanat:')}</strong>{' '}
                  {t(
                    'This edition connects directly to the unabridged manuscript certified by orthodox Islamic academic libraries.',
                    'یہ نسخہ باضابطہ دارالافتاء و علمی مراکز سے مصدقہ اصل غیر محذوف ایڈیشن ہے۔ اگر آپ کے پاس اس کتاب کی اضافی پی ڈی ایف فائل موجود ہے تو آپ اسے بھی اپنے سسٹم میں براہِ راست لنک کر سکتے ہیں۔',
                    'هذه النسخة موثقة ومعتمدة من دور الإفتاء والمكتبات العلمية الإسلامية الكبرى.',
                    'Yeh nuskha ba-zaabita Dar-ul-Ifta o ilmi marakiz se musaddiqah asal ghair mahzoof edition hai.'
                  )}
                </span>
              </div>
            </div>
          ) : (
            <div style={{ padding: 20, textAlign: 'center', color: '#64748B' }}>
              {t('Loading full edition...', 'مکمل نسخہ لوڈ ہو رہا ہے...', 'جاري تحميل النسخة الكاملة...', 'Mukammal nuskha load ho raha hai...')}
            </div>
          )}
        </div>
      ) : (
        <div>
          <h3
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: '#1F2937',
              borderBottom: '2px solid #E5E7EB',
              paddingBottom: 8,
              marginBottom: 16,
            }}
          >
            {t('Core Included Chapters', 'کتاب کے منتخب ابواب و مضامین', 'الأبواب والموضوعات المختارة من الكتاب', 'Kitab Ke Muntakhab Abwaab o Mazameen')}
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {readingBook.coreChapters.map((ch) => (
              <div
                key={ch.chapterId}
                style={{
                  border: '1px solid #E5E7EB',
                  borderRadius: 12,
                  padding: 16,
                  backgroundColor: '#F9FAFB',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 16,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
                onClick={() => onSelectChapter(ch)}
              >
                <div>
                  <div style={{ fontWeight: 800, fontSize: 16, color: '#064E3B', marginBottom: 4 }}>
                    {ch.chapterNumber}. {(language === 'ur' || language === 'ar') ? ch.titleUrdu : ch.titleEnglish}
                  </div>
                  <div style={{ fontSize: 12, color: '#059669', marginBottom: 4 }}>
                    {(language === 'ur' || language === 'ar') ? ch.titleEnglish : (ch.hadithOrFiqhReference || ch.titleUrdu)}
                  </div>
                  <div style={{ fontSize: 13, color: '#6B7280' }}>
                    {(language === 'ur' || language === 'ar') ? ch.summaryUrdu : ch.summaryEnglish}
                  </div>
                </div>
                <button
                  style={{
                    backgroundColor: '#064E3B',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: 8,
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {t('Read Chapter', 'مطالعہ کریں', 'قراءة الباب', 'Mutala\'ah Karein')}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
