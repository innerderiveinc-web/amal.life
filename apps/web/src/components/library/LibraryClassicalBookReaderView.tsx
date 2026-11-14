import React, { useState, memo } from 'react';
import { CanonicalEditionRecord } from '@amal/evidence';
import {
  ClassicalBookWithChapters,
  ClassicalChapter,
  getLocalPdfForWork,
} from '../../lib/classical-chapters-data';
import { getCanonicalBookProfile } from '../../data/canonical-book-introductions';
import { UniversalCardPayload } from '../cards/UniversalContentShareModal';
import { useLanguage } from '../../context/LanguageContext';

export interface LibraryClassicalBookReaderViewProps {
  selectedWork: CanonicalEditionRecord;
  bookChaptersData: ClassicalBookWithChapters | null;
  currentChapter?: ClassicalChapter;
  selectedChapterIndex: number;
  setSelectedChapterIndex: (idx: number) => void;
  readerTheme: 'CLEAN' | 'SEPIA' | 'DARK';
  fontSize: number;
  verifiedSource: { name: string; url: string };
  onSharePayload: (payload: UniversalCardPayload) => void;
}

const LibraryClassicalBookReaderViewInner: React.FC<LibraryClassicalBookReaderViewProps> = ({
  selectedWork,
  bookChaptersData,
  currentChapter,
  selectedChapterIndex,
  setSelectedChapterIndex,
  readerTheme,
  fontSize,
  verifiedSource,
  onSharePayload,
}) => {
  const { language, t } = useLanguage();
  const localPdf = getLocalPdfForWork(selectedWork.work_id);
  const bookProfile = getCanonicalBookProfile(selectedWork.work_id);
  // Default to FULL_PDF if chapters are not available, otherwise default to CURATED
  const [readerMode, setReaderMode] = useState<'CURATED' | 'FULL_PDF'>(
    bookChaptersData && currentChapter ? 'CURATED' : 'FULL_PDF'
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* SCHOLARLY TRANSPARENCY NOTICE & DUAL-MODE TAB SWITCHER */}
      <div
        style={{
          backgroundColor:
            readerTheme === 'DARK'
              ? '#0F172A'
              : readerTheme === 'SEPIA'
              ? '#F2E6CE'
              : '#F0FDF4',
          borderRadius: 14,
          padding: '14px 18px',
          border: `1px solid ${
            readerTheme === 'DARK'
              ? '#334155'
              : readerTheme === 'SEPIA'
              ? '#E2D4B7'
              : '#A7F3D0'
          }`,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 260 }}>
            <span style={{ fontSize: 22 }}>⚖️</span>
            <div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 800,
                  color: readerTheme === 'DARK' ? '#34D399' : '#065F46',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  flexWrap: 'wrap',
                }}
              >
                <span>«مُنتَخَبَات دِرَاسِيَّة تَعْلِيمِيَّة»</span>
                <span style={{ fontSize: 12.5, fontWeight: 700, opacity: 0.9 }}>
                  • {t('Selected Pedagogical Chapters', 'منتخب کلیدی اسباق و خلاصہ', 'منتخبات دراسية تعليمية', 'Muntakhab Asbaaq o Khulasa (Curated)')}
                </span>
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: readerTheme === 'DARK' ? '#94A3B8' : '#475569',
                  marginTop: 3,
                  lineHeight: 1.5,
                }}
              >
                {t(
                  'These chapters contain curated pedagogical excerpts from this classical volume. For the unabridged edition with complete apparatus, click "Full Complete Edition" on the right.',
                  'یہ ابواب اس ضخیم کتاب کے بنیادی تعلیمی و تدریسی خلاصے پر مشتمل ہیں۔ مکمل غیر محذوف اصل کتاب مع حواشی و مراجع کے مطالعے کے لیے دائیں جانب "مکمل اصل کتاب" پر کلک فرمائیں۔',
                  'هذه الفصول تشتمل على خلاصات دراسية منتخبة من هذا السفر الجليل. ولمطالعة النسخة الكاملة مع الحواشي، انقر على "النسخة الكاملة".',
                  'Yeh abwaab is kitab ke bunyadi taleemi o tadreesi khulasa par mushtamil hain. Mukammal kitab ke mutala ke liye "Full Complete Edition" par click karein.'
                )}
              </div>
              <div
                style={{
                  marginTop: 6,
                  padding: '5px 10px',
                  borderRadius: 6,
                  backgroundColor: readerTheme === 'DARK' ? '#1E293B' : '#FEF3C7',
                  border: readerTheme === 'DARK' ? '1px solid #334155' : '1px solid #FDE68A',
                  fontSize: 11,
                  color: readerTheme === 'DARK' ? '#FCD34D' : '#92400E',
                  lineHeight: 1.4,
                }}
              >
                <strong>«{t('Scholarly Adab Note', 'تَنبِيهٌ شَرعِيٌّ وَأَدَبُ الطَّالِب', 'تنبيه شرعي وأدب الطالب', 'Shar\'i Tanbeeh o Adab')}»</strong>:{' '}
                {t(
                  'Reading classical texts builds foundational understanding; it does not replace formalized study under qualified scholars and certified Muftis. For complex queries, refer to an authentic Dar-ul-Ifta.',
                  'مطالعۂ کتب برائے معلومات و بنیادی فہم ہے؛ یہ جید علماء و مفتیانِ کرام سے باضابطہ کسبِ فیض کا متبادل نہیں ہے۔ پیچیدہ مسائل میں ہمیشہ مستند دار الافتاء سے رجوع فرمائیں۔',
                  'مطالعة الكتب لبناء الفهم ولا تغني عن التلقي من العلماء المعتمدين والمفتين العدول.',
                  'Kitabon ka mutala bunyadi feham ke liye hai; yeh mustanad ulema o muftiyan se dars lene ka mutabadil nahi hai. Pechida masail mein certified Dar-ul-Ifta se rujoo karein.'
                )}
              </div>
            </div>
          </div>

          {/* DUAL MODE TABS */}
          <div
            style={{
              display: 'flex',
              backgroundColor: readerTheme === 'DARK' ? '#1E293B' : '#E2E8F0',
              padding: 3,
              borderRadius: 10,
              gap: 4,
            }}
          >
            <button
              onClick={() => setReaderMode('CURATED')}
              style={{
                padding: '6px 14px',
                borderRadius: 8,
                fontSize: 12.5,
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                backgroundColor:
                  readerMode === 'CURATED'
                    ? '#065F46'
                    : 'transparent',
                color:
                  readerMode === 'CURATED'
                    ? '#FFFFFF'
                    : readerTheme === 'DARK'
                    ? '#94A3B8'
                    : '#334155',
                transition: 'all 0.15s ease',
              }}
            >
              📜 {t('Curated Lessons (Summary)', 'منتخب اسباق و خلاصہ', 'منتخبات دراسية', 'Curated Lessons (Khulasa)')}
            </button>

            <button
              onClick={() => setReaderMode('FULL_PDF')}
              style={{
                padding: '6px 14px',
                borderRadius: 8,
                fontSize: 12.5,
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                backgroundColor:
                  readerMode === 'FULL_PDF'
                    ? '#065F46'
                    : 'transparent',
                color:
                  readerMode === 'FULL_PDF'
                    ? '#FFFFFF'
                    : readerTheme === 'DARK'
                    ? '#94A3B8'
                    : '#334155',
                transition: 'all 0.15s ease',
              }}
            >
              📑 {t('Full Complete Edition', 'مکمل اصل کتاب', 'النسخة الكاملة المعتمدة', 'Mukammal Asal Kitab (Full Edition)')}
            </button>
          </div>
        </div>
      </div>

      {/* MODE 1: CURATED LESSONS & ARABIC MATN */}
      {readerMode === 'CURATED' && (
        <>
          {bookChaptersData && currentChapter ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Chapters Switcher */}
              <div
                style={{
                  display: 'flex',
                  gap: 8,
                  overflowX: 'auto',
                  paddingBottom: 8,
                  borderBottom: `1px solid ${
                    readerTheme === 'DARK' ? '#334155' : '#E5E7EB'
                  }`,
                }}
              >
                {bookChaptersData.chapters.map((chap, idx) => (
                  <button
                    key={chap.chapterId}
                    onClick={() => setSelectedChapterIndex(idx)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: 8,
                      fontSize: 13.5,
                      fontWeight: 700,
                      cursor: 'pointer',
                      border: 'none',
                      backgroundColor:
                        selectedChapterIndex === idx
                          ? '#065F46'
                          : readerTheme === 'DARK'
                          ? '#0F172A'
                          : '#F1F5F9',
                      color:
                        selectedChapterIndex === idx
                          ? '#FFFFFF'
                          : readerTheme === 'DARK'
                          ? '#CBD5E1'
                          : '#334155',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {chap.chapterTitleArabic}
                  </button>
                ))}
              </div>

              {/* Chapter Title Badge */}
              <div
                style={{
                  backgroundColor:
                    readerTheme === 'DARK'
                      ? '#0F172A'
                      : readerTheme === 'SEPIA'
                      ? '#F2E6CE'
                      : '#ECFDF5',
                  padding: '14px 18px',
                  borderRadius: 12,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: 10,
                }}
              >
                <div>
                  <div
                    style={{
                      fontWeight: 800,
                      fontSize: 17,
                      color: readerTheme === 'DARK' ? '#34D399' : '#065F46',
                      direction: language === 'ur' || language === 'ar' ? 'rtl' : 'ltr',
                      textAlign: language === 'ur' || language === 'ar' ? 'right' : 'left',
                    }}
                  >
                    {language === 'roman'
                      ? (currentChapter.chapterTitleEnglish || currentChapter.chapterTitleUrdu)
                      : (language === 'ur' ? currentChapter.chapterTitleUrdu : (currentChapter.chapterTitleEnglish || currentChapter.chapterTitleUrdu))}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: readerTheme === 'DARK' ? '#94A3B8' : '#475569',
                      marginTop: 2,
                    }}
                  >
                    {currentChapter.chapterTitleEnglish}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {localPdf && (
                    <button
                      onClick={() => setReaderMode('FULL_PDF')}
                      style={{
                        padding: '6px 12px',
                        borderRadius: 8,
                        border: '1px solid #FDE68A',
                        backgroundColor: '#FEF3C7',
                        color: '#92400E',
                        fontSize: 12,
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      📑 {t('Open Full PDF', 'مکمل پی ڈی ایف کھولیں', 'فتح النسخة المصورة الكاملة', 'Mukammal PDF Kholein')}
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      const firstArabicLine =
                        currentChapter.arabicMatn.split('\n')[0] || currentChapter.arabicMatn;
                      const firstUrduLine =
                        currentChapter.urduTranslation.split('\n')[0] || currentChapter.urduTranslation;
                      onSharePayload({
                        category: 'HADITH',
                        titleUrdu: currentChapter.chapterTitleUrdu,
                        badgeContext: selectedWork.title_transliterated,
                        arabicText: firstArabicLine.slice(0, 320),
                        primaryTextUrdu: firstUrduLine.slice(0, 360),
                        secondaryTextEnglish: currentChapter.englishSynopsis?.slice(0, 240),
                        sourceCitation: `${selectedWork.title_arabic} · ${currentChapter.chapterTitleUrdu}`,
                      });
                    }}
                    style={{
                      padding: '6px 14px',
                      borderRadius: 8,
                      border: '1px solid #10B981',
                      backgroundColor: '#065F46',
                      color: '#FFFFFF',
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    📸 {t('Create Card', 'کارڈ بنائیں', 'إنشاء بطاقة', 'Card Banayein')}
                  </button>
                </div>
              </div>

              {/* Arabic Matn Box */}
              <div
                style={{
                  padding: 20,
                  borderRadius: 14,
                  backgroundColor:
                    readerTheme === 'DARK'
                      ? '#0F172A'
                      : readerTheme === 'SEPIA'
                      ? '#FAF4E6'
                      : '#F9FAFB',
                  border: `1px solid ${
                    readerTheme === 'DARK' ? '#334155' : '#E5E7EB'
                  }`,
                }}
              >
                <div
                  dir="rtl"
                  style={{
                    fontFamily: 'var(--font-arabic), "Amiri", serif',
                    fontSize: Math.max(20, fontSize + 4),
                    lineHeight: 2.3,
                    textAlign: 'right',
                    whiteSpace: 'pre-line',
                    color: readerTheme === 'DARK' ? '#F8FAFC' : '#0F172A',
                    fontWeight: 500,
                  }}
                >
                  {currentChapter.arabicMatn}
                </div>
              </div>

              {/* Urdu Translation Box */}
              <div
                style={{
                  padding: 20,
                  borderRadius: 14,
                  backgroundColor:
                    readerTheme === 'DARK'
                      ? '#0F172A'
                      : readerTheme === 'SEPIA'
                      ? '#FAF4E6'
                      : '#F9FAFB',
                  border: `1px solid ${
                    readerTheme === 'DARK' ? '#334155' : '#E5E7EB'
                  }`,
                }}
              >
                <div
                  dir="rtl"
                  style={{
                    fontFamily: 'var(--font-urdu), serif',
                    fontSize: Math.max(17, fontSize + 1),
                    lineHeight: 2.2,
                    textAlign: 'right',
                    whiteSpace: 'pre-line',
                    color: readerTheme === 'DARK' ? '#CBD5E1' : '#1E293B',
                  }}
                >
                  {currentChapter.urduTranslation}
                </div>
              </div>

              {/* Scholarly Notes & Synopsis */}
              {(currentChapter.englishSynopsis || currentChapter.scholarlyNotes) && (
                <div
                  style={{
                    padding: 16,
                    borderRadius: 12,
                    backgroundColor: readerTheme === 'DARK' ? '#1E293B' : '#F8FAFC',
                    border: `1px solid ${readerTheme === 'DARK' ? '#334155' : '#E2E8F0'}`,
                    fontSize: 13,
                    color: readerTheme === 'DARK' ? '#94A3B8' : '#475569',
                    lineHeight: 1.6,
                  }}
                >
                  {currentChapter.englishSynopsis && (
                    <div style={{ marginBottom: currentChapter.scholarlyNotes ? 6 : 0 }}>
                      <strong>{t('Synopsis:', 'خلاصہ:', 'الخلاصة:', 'Khulasa:')}</strong> {currentChapter.englishSynopsis}
                    </div>
                  )}
                  {currentChapter.scholarlyNotes && (
                    <div style={{ fontStyle: 'italic' }}>
                      <strong>{t('Scholarly Note:', 'علمی حاشیہ:', 'حاشية علمية:', 'Ilmi Hashiya:')}</strong> {currentChapter.scholarlyNotes}
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            /* Comprehensive Scholarly Exegesis & Topical Index View */
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Introduction Box */}
              <div
                style={{
                  padding: '24px 22px',
                  backgroundColor: readerTheme === 'DARK' ? '#0F172A' : '#F8FAFC',
                  borderRadius: 14,
                  border: `1px solid ${readerTheme === 'DARK' ? '#334155' : '#E2E8F0'}`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <span style={{ fontSize: 18 }}>🏛️</span>
                  <span style={{ fontSize: 13, fontWeight: 800, color: '#065F46' }}>
                    {t(
                      'Scholarly Introduction & Significance',
                      'مقدمہ و علمی اہمیت',
                      'مقدمة وأهمية الكتاب العلمية',
                      'Muqaddamah o Ilmi Ahmiyat'
                    )}
                  </span>
                </div>

                <div
                  dir="rtl"
                  style={{
                    fontFamily: 'var(--font-urdu), serif',
                    fontSize: 16,
                    lineHeight: 2.1,
                    color: readerTheme === 'DARK' ? '#E2E8F0' : '#1E293B',
                    marginBottom: 12,
                  }}
                >
                  {bookProfile?.significanceUrdu || `${selectedWork.title_transliterated} اہلِ سنت و جماعت کے معتبر ترین اور اصیل علمی مصادر میں شمار ہوتی ہے۔`}
                </div>

                {bookProfile?.authorBioUrdu && (
                  <div
                    dir="rtl"
                    style={{
                      fontFamily: 'var(--font-urdu), serif',
                      fontSize: 14.5,
                      lineHeight: 2.0,
                      color: readerTheme === 'DARK' ? '#94A3B8' : '#475569',
                      padding: 12,
                      backgroundColor: readerTheme === 'DARK' ? '#1E293B' : '#FFFFFF',
                      borderRadius: 10,
                      border: `1px solid ${readerTheme === 'DARK' ? '#334155' : '#E5E7EB'}`,
                      marginBottom: 12,
                    }}
                  >
                    <strong>{t('Author Biography:', 'مصنف کا تعارف:', 'ترجمة المؤلف:', 'Musannif ka Ta\'aruf:')} </strong> {bookProfile.authorBioUrdu}
                  </div>
                )}

                {bookProfile?.studyMethodologyUrdu && (
                  <div
                    style={{
                      fontSize: 13,
                      lineHeight: 1.7,
                      color: readerTheme === 'DARK' ? '#94A3B8' : '#334155',
                      padding: 12,
                      backgroundColor: readerTheme === 'DARK' ? '#1E293B' : '#ECFDF5',
                      borderRadius: 10,
                      border: `1px solid ${readerTheme === 'DARK' ? '#334155' : '#A7F3D0'}`,
                    }}
                  >
                    <strong>{t('Study Methodology:', 'طریقۂ مطالعہ و منہج:', 'منهجية الدراسة والمطالعة:', 'Tareeqa-e-Mutala o Manhaj:')} </strong> {bookProfile.studyMethodologyUrdu}
                  </div>
                )}
              </div>

              {/* Topical Index */}
              {bookProfile?.topicalIndex && bookProfile.topicalIndex.length > 0 && (
                <div
                  style={{
                    padding: '20px',
                    backgroundColor: readerTheme === 'DARK' ? '#0F172A' : '#FFFFFF',
                    borderRadius: 14,
                    border: `1px solid ${readerTheme === 'DARK' ? '#334155' : '#E2E8F0'}`,
                  }}
                >
                  <h4 style={{ fontSize: 15, fontWeight: 800, margin: '0 0 12px', color: '#065F46' }}>
                    {t(
                      'Topical Chapter Index',
                      'فہرستِ ابواب و موضوعات',
                      'فهرس الأبواب والموضوعات',
                      'Fehrist-e-Abwaab o Mauzoo\'aat'
                    )}
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 10 }}>
                    {bookProfile.topicalIndex.map((sec) => (
                      <div
                        key={sec.sectionNumber}
                        style={{
                          padding: 12,
                          borderRadius: 10,
                          backgroundColor: readerTheme === 'DARK' ? '#1E293B' : '#F8FAFC',
                          border: `1px solid ${readerTheme === 'DARK' ? '#334155' : '#E2E8F0'}`,
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                          <span style={{ fontSize: 11, fontWeight: 800, color: '#065F46' }}>
                            {t(`Section ${sec.sectionNumber}`, `باب ${sec.sectionNumber}`, `الباب ${sec.sectionNumber}`, `Baab ${sec.sectionNumber}`)}
                          </span>
                          <span style={{ fontSize: 12, fontFamily: 'var(--font-arabic)', direction: 'rtl', fontWeight: 700 }}>
                            {sec.titleArabic}
                          </span>
                        </div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', marginBottom: 2 }}>
                          {(language === 'ur' || language === 'ar') ? sec.titleUrdu : sec.titleEnglish}
                        </div>
                        <div style={{ fontSize: 11, color: '#64748B' }}>
                          {sec.coreThemes}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action: Open Complete Edition Tab */}
              <div
                style={{
                  padding: 16,
                  textAlign: 'center',
                  backgroundColor: readerTheme === 'DARK' ? '#1E293B' : '#FEF3C7',
                  borderRadius: 12,
                  border: `1px solid ${readerTheme === 'DARK' ? '#334155' : '#FDE68A'}`,
                }}
              >
                <div style={{ fontSize: 14, fontWeight: 700, color: '#92400E', marginBottom: 8 }}>
                  {t(
                    `Complete text of this book (${selectedWork.volume_count} volumes) with Sanad and commentaries is available.`,
                    `اس کتاب کا مکمل اصل متن (${selectedWork.volume_count} جلدیں) مع اسانید و تفاسیر دستیاب ہے`,
                    `النص الكامل المعتمد لهذا الكتاب (${selectedWork.volume_count} مجلدات) متاح بالأسانيد والحواشي.`,
                    `Is kitab ka mukammal asal matn (${selectedWork.volume_count} jildain) dastyab hai.`
                  )}
                </div>
                <button
                  onClick={() => setReaderMode('FULL_PDF')}
                  style={{
                    padding: '10px 24px',
                    borderRadius: 10,
                    backgroundColor: '#065F46',
                    color: '#FFFFFF',
                    fontSize: 13,
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 2px 6px rgba(6, 95, 70, 0.25)',
                  }}
                >
                  📑 {t(
                    'Read Full Manuscript Edition',
                    'مکمل اصل کتاب کا مطالعہ شروع کریں',
                    'بدء مطالعة المخطوط والمطبوع الكامل',
                    'Mukammal Asal Kitab ka Mutala Karein'
                  )}
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* MODE 2: COMPLETE ORIGINAL BOOK (FULL EMBEDDED IN-APP PDF VIEWER) */}
      {readerMode === 'FULL_PDF' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {localPdf ? (
            /* A) DIRECT LOCAL IN-APP PDF STREAMING VIEWER */
            <div>
              {/* PDF Header Controls */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: readerTheme === 'DARK' ? '#0F172A' : '#F8FAFC',
                  padding: '12px 18px',
                  borderRadius: 12,
                  border: `1px solid ${readerTheme === 'DARK' ? '#334155' : '#E2E8F0'}`,
                  marginBottom: 10,
                  flexWrap: 'wrap',
                  gap: 10,
                }}
              >
                <div>
                  <div style={{ fontWeight: 800, fontSize: 15, color: '#0F172A' }}>
                    {localPdf.pdfTitle}
                  </div>
                  <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>
                    {t('Language:', 'زبان:', 'اللغة:', 'Zuban:')} <strong>{localPdf.language}</strong> • {t('Size:', 'سائز:', 'الحجم:', 'Size:')} <strong>{localPdf.fileSizeBytes}</strong> • {t('Unabridged Edition', 'مکمل غیر محذوف نسخہ', 'نسخة كاملة غير محذوفة', 'Mukammal Ghair Mahzoof Nuskha')}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 8 }}>
                  <a
                    href={localPdf.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: '7px 14px',
                      borderRadius: 8,
                      backgroundColor: '#FFFFFF',
                      color: '#065F46',
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
                    <span>{t('Fullscreen Window', 'فل اسکرین نئی ونڈو', 'ملء الشاشة في نافذة جديدة', 'Fullscreen Nayi Window')}</span>
                  </a>
                  <a
                    href={localPdf.pdfUrl}
                    download
                    style={{
                      padding: '7px 14px',
                      borderRadius: 8,
                      backgroundColor: '#065F46',
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

              {/* EMBEDDED INTERACTIVE PDF VIEWER IFRAME */}
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
                  src={`${localPdf.pdfUrl}#toolbar=1&navpanes=1`}
                  width="100%"
                  height="100%"
                  style={{ border: 'none' }}
                  title={localPdf.pdfTitle}
                />
              </div>

              {/* Reader Helpful Guidance */}
              <div
                style={{
                  marginTop: 8,
                  fontSize: 12,
                  color: '#64748B',
                  textAlign: 'center',
                }}
              >
                💡 {t(
                  'You can view all pages, zoom, and search inside this viewer using your mouse, keyboard, or scrollbar.',
                  'آپ اس موڈل کے اندر ماؤس، کی بورڈ، یا اسکرول بار سے تمام صفحات دیکھ سکتے ہیں، زوم کر سکتے ہیں اور تلاش کر سکتے ہیں۔',
                  'يمكنكم تصفح جميع الصفحات والتكبير والبحث داخل هذا العارض باستخدام الفأرة أو لوحة المفاتيح.',
                  'Aap is modal ke andar mouse, keyboard, ya scroll se tamam safhaat dekh sakte hain, zoom aur search kar sakte hain.'
                )}
              </div>
            </div>
          ) : (
            /* B) AUTHENTIC WAQF REPOSITORY (SHAMELA / ARCHIVE.ORG) FOR CLASSICAL CANON */
            <div
              style={{
                padding: '30px 24px',
                backgroundColor: readerTheme === 'DARK' ? '#0F172A' : '#F8FAFC',
                borderRadius: 14,
                border: `1px solid ${readerTheme === 'DARK' ? '#334155' : '#E2E8F0'}`,
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 44, marginBottom: 12 }}>🏛️</div>
              <h3 style={{ fontSize: 19, fontWeight: 800, margin: '0 0 6px', color: '#0F172A' }}>
                {t('Authentic Waqf Repository', 'مستند اوقافی کتب خانہ', 'المكتبة الوقفية المعتمدة', 'Mustanad Awqaf Library')} — {selectedWork.title_transliterated} ({selectedWork.title_arabic})
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: '#475569',
                  maxWidth: 620,
                  margin: '0 auto 18px',
                  lineHeight: 1.7,
                }}
              >
                {t(
                  `This classical work (${selectedWork.volume_count} volumes) is preserved in verified Islamic endowments. You can examine the authenticated manuscript page by page directly from the archive.`,
                  `یہ کلاسیکی کتاب (${selectedWork.volume_count} جلدیں) تمام صفحات، اسانید اور متون سمیت اوقافی اسلامی ذخیرے میں مکمل طور پر محفوظ ہے۔ آپ براہِ راست تصدیق شدہ آرکائیو سے اصل نسخہ ورق بہ ورق ملاحظہ فرما سکتے ہیں۔`,
                  `هذا السفر الجليل (${selectedWork.volume_count} مجلدات) محفوظ في المستودعات الوقفية بجميع أسانيده ومتونه. يمكنكم مطالعته صفحة بصفحة من الأرشيف المعتمد.`,
                  `Yeh classical kitab (${selectedWork.volume_count} jildain) awqafi zakheerey mein mehfooz hai. Aap tasdeeq shuda archive se asal nuskha dekh sakte hain.`
                )}
              </p>

              <div
                style={{
                  display: 'inline-flex',
                  flexDirection: 'column',
                  gap: 12,
                  alignItems: 'center',
                }}
              >
                <a
                  href={verifiedSource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '12px 24px',
                    borderRadius: 10,
                    backgroundColor: '#065F46',
                    color: '#FFFFFF',
                    fontSize: 14,
                    fontWeight: 700,
                    textDecoration: 'none',
                    boxShadow: '0 2px 6px rgba(6, 95, 70, 0.25)',
                  }}
                >
                  <span>🏛️</span>
                  <span>{t('Open Original Manuscript Edition', 'اصل مطبوعہ نسخہ کھولیں', 'فتح النسخة المطبوعة الأصلية', 'Asal Matboo\'a Nuskha Kholein')} ({verifiedSource.name}) ↗</span>
                </a>

                <div
                  style={{
                    fontSize: 11,
                    color: '#475569',
                    fontFamily: 'monospace',
                    backgroundColor: '#F1F5F9',
                    padding: '4px 10px',
                    borderRadius: 6,
                  }}
                >
                  SHA-256 Provenance: {selectedWork.provenance_sha256.slice(0, 24)}...
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const LibraryClassicalBookReaderView = memo(LibraryClassicalBookReaderViewInner);
