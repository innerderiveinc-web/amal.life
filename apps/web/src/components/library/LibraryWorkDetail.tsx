import React from 'react';
import { CanonicalEditionRecord } from '@amal/evidence';
import { AmalTheme } from '@amal/ui';
import { getBookChapters, getVerifiedSourceUrl, getLocalPdfForWork } from '../../lib/classical-chapters-data';
import { getCanonicalBookProfile } from '../../data/canonical-book-introductions';
import { showAmalToast } from '../Toast';

interface LibraryWorkDetailProps {
  selectedWork: CanonicalEditionRecord | null;
  onOpenReader: () => void;
}

export function LibraryWorkDetail({
  selectedWork,
  onOpenReader,
}: LibraryWorkDetailProps) {
  if (!selectedWork) {
    return (
      <div style={{ textAlign: 'center', padding: 60, color: '#888' }}>
        Select a work from the canonical library to view manuscript credentials and read chapters.
      </div>
    );
  }

  const isQuran =
    selectedWork.discipline === 'QURAN' || selectedWork.work_id === 'CANON-QUR-001';
  const hasSelectedInAppChapters = isQuran || !!getBookChapters(selectedWork.work_id);
  const verifiedSource = getVerifiedSourceUrl(selectedWork.work_id);
  const localPdf = getLocalPdfForWork(selectedWork.work_id);
  const bookProfile = getCanonicalBookProfile(selectedWork.work_id);

  return (
    <div
      id="library-detail-panel"
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 26,
        border: `1px solid ${AmalTheme.colors.surface.borderLight}`,
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
      }}
    >
      <div>
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            padding: '3px 10px',
            borderRadius: 12,
            backgroundColor: isQuran
              ? '#E8F5E9'
              : hasSelectedInAppChapters
              ? '#FEF3C7'
              : '#E0F2FE',
            color: isQuran
              ? '#2E7D32'
              : hasSelectedInAppChapters
              ? '#92400E'
              : '#0369A1',
          }}
        >
          {isQuran
            ? 'COMPLETE 114 SURAHS · VERIFIED UTHMANIC MUSHAF'
            : hasSelectedInAppChapters
            ? 'AUTHENTIC CORE CHAPTERS · VERIFIED SCHOLARLY MANUSCRIPT'
            : `VERIFIED DIGITAL REPOSITORY · ${selectedWork.volume_count} VOLUME(S)`}
        </span>
        <h2
          style={{
            fontFamily: 'var(--font-arabic), serif',
            fontSize: 26,
            fontWeight: 800,
            margin: '12px 0 4px',
            direction: 'rtl',
            textAlign: 'right',
            color: AmalTheme.colors.primary,
          }}
        >
          {selectedWork.title_arabic}
        </h2>
        <h3 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 6px', color: '#0F172A' }}>
          {selectedWork.title_transliterated}
        </h3>
        <div style={{ fontSize: 14, color: '#475569' }}>
          Author: <strong>{selectedWork.author_name}</strong> (
          {selectedWork.author_death_hijri > 0
            ? `d. ${selectedWork.author_death_hijri} AH`
            : 'Revelation'}
          )
        </div>
      </div>

      {/* PRIMARY ACTION BUTTONS: READ IN-APP */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button
          onClick={onOpenReader}
          style={{
            width: '100%',
            padding: '14px 20px',
            borderRadius: 10,
            backgroundColor: '#1B4332',
            color: '#FFFFFF',
            border: 'none',
            fontWeight: 700,
            fontSize: 15,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            boxShadow: '0 4px 6px -1px rgba(27, 67, 50, 0.2)',
          }}
        >
          <span>📖</span>
          <span>
            {isQuran
              ? 'Read All 114 Surahs In-App (قرآنِ مجید کی مکمل ۱۱۴ سورتیں پڑھیں)'
              : localPdf
              ? `📖 مطالعہ شروع کریں: منتخب اسباق و مکمل کتاب (Read Lessons & Full Edition — ${selectedWork.title_transliterated})`
              : hasSelectedInAppChapters
              ? `📖 مطالعہ شروع کریں: منتخب اسباق و ماخذ (Read Lessons & Source — ${selectedWork.title_transliterated})`
              : `🏛️ علمی اسناد و ماخذ کا معائنہ کریں (View Manuscript Credentials — ${selectedWork.title_transliterated})`}
          </span>
        </button>

        {localPdf && (
          <a
            href={localPdf.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              width: '100%',
              padding: '12px 18px',
              borderRadius: 10,
              backgroundColor: '#FEF3C7',
              color: '#92400E',
              border: '1px solid #FDE68A',
              fontWeight: 700,
              fontSize: 14,
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              boxShadow: '0 2px 4px rgba(180, 83, 9, 0.08)',
              transition: 'background-color 0.15s ease',
              boxSizing: 'border-box',
            }}
          >
            <span>📥</span>
            <span>
              مکمل پی ڈی ایف ڈاؤن لوڈ / الگ ونڈو میں مطالعہ کریں ({localPdf.fileSizeBytes}) · Download Full PDF
            </span>
          </a>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {isQuran ? (
            <a
              href="https://quran.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '10px 14px',
                borderRadius: 8,
                backgroundColor: '#F8FAFC',
                color: '#1E293B',
                border: '1px solid #CBD5E1',
                fontSize: 12,
                fontWeight: 600,
                textAlign: 'center',
                textDecoration: 'none',
              }}
            >
              Quran.com Audio & Reciters ↗
            </a>
          ) : (
            <a
              href={verifiedSource.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '10px 14px',
                borderRadius: 8,
                backgroundColor: '#F0FDF4',
                color: '#166534',
                border: '1px solid #86EFAC',
                fontSize: 12,
                fontWeight: 700,
                textAlign: 'center',
                textDecoration: 'none',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
              title={verifiedSource.name}
            >
              🏛️ {verifiedSource.name} ↗
            </a>
          )}

          <button
            onClick={() => {
              navigator.clipboard?.writeText(selectedWork.provenance_sha256);
              showAmalToast('Manuscript SHA-256 Hash copied to clipboard', 'success');
            }}
            style={{
              padding: '10px 14px',
              borderRadius: 8,
              backgroundColor: '#F8FAFC',
              color: '#1E293B',
              border: '1px solid #CBD5E1',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Copy Manuscript SHA-256 Hash
          </button>
        </div>
      </div>

      {/* Provenance Metadata Table */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 12,
          backgroundColor: '#F8FAFC',
          padding: 16,
          borderRadius: 10,
          fontSize: 13,
          border: '1px solid #E2E8F0',
        }}
      >
        <div>
          <span style={{ color: '#64748B', display: 'block', fontSize: 11 }}>CANONICAL PUBLISHER</span>
          <span style={{ fontWeight: 600, color: '#0F172A' }}>{selectedWork.edition_publisher}</span>
        </div>
        <div>
          <span style={{ color: '#64748B', display: 'block', fontSize: 11 }}>VOLUMES / EXTENT</span>
          <span style={{ fontWeight: 600, color: '#0F172A' }}>{selectedWork.volume_count} Volume(s)</span>
        </div>
        <div>
          <span style={{ color: '#64748B', display: 'block', fontSize: 11 }}>CRITICAL EDITOR (MUHAQQIQ)</span>
          <span style={{ fontWeight: 600, color: '#0F172A' }}>{selectedWork.critical_editor_muhaqqiq}</span>
        </div>
        <div>
          <span style={{ color: '#64748B', display: 'block', fontSize: 11 }}>SCHOLARLY AUTHORITY LEVEL</span>
          <span style={{ fontWeight: 600, color: '#059669' }}>{selectedWork.scholarly_authority_level}</span>
        </div>
      </div>

      {/* SCHOLARLY METHODOLOGY & DISCIPLINE HERMENEUTIC CONTEXT */}
      <div
        style={{
          padding: '14px 18px',
          borderRadius: 10,
          backgroundColor: '#F0FDF4',
          border: '1px solid #BBF7D0',
          fontSize: 13,
          lineHeight: 1.7,
        }}
      >
        <div style={{ fontWeight: 800, color: '#166534', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
          <span>⚖️</span>
          <span>علمی مقام و فقہی منہج (Classical Status &amp; Scholarly Role):</span>
        </div>
        <div style={{ color: '#1E293B', textAlign: 'right', direction: 'rtl', marginBottom: 6 }}>
          {selectedWork.discipline === 'QURAN' &&
            'علومِ قرآن و وحی الٰہی — کلام اللہ کا متنِ متواتر، نزول، کتابتِ عثمانی، تجوید اور تفسیر۔ قرآن مجید تمام احکامِ شریعت کی اصلِ الاصول ہے۔'}
          {selectedWork.discipline === 'HADITH' &&
            'حدیث و سننِ نبویہ ﷺ — رسول اللہ ﷺ کے اقوال، افعال، تقریرات اور شمائل۔ ائمۂ حدیث (بخاری، مسلم، ابوداؤد، ترمذی، نسائی، ابن ماجہ) کی اسانیدِ متصلہ سے تصدیق شدہ متون۔'}
          {selectedWork.discipline === 'TAFSIR' &&
            'علمِ تفسیر و تاویل — آیاتِ قرآنیہ کی مراد، شانِ نزول، ناسخ و منسوخ اور کبار صحابہ و تابعین کے اقوال کی روشنی میں فہمِ کلامِ الٰہی۔'}
          {selectedWork.discipline === 'HANAFI_FIQH' &&
            'فقہِ حنفی (السواد الاعظم) — امام اعظم ابو حنیفہ، امام ابو یوسف اور امام محمد شیبانی کا مدوّن کردہ فقہی نظام، جو ظاہر الروایہ، متونِ اربعہ (ہدایہ، کنز، وقایہ، مجمع) اور کتبِ فتاویٰ (رد المحتار، عالمگیری) پر مبنی ہے۔'}
          {selectedWork.discipline === 'MALIKI_FIQH' &&
            'فقہِ مالکی — امام دار الہجرۃ مالک بن انس کا مکتبۂ فقہ، جو عملِ اہلِ مدینہ اور موطا پر استوار ہے۔'}
          {selectedWork.discipline === 'SHAFII_FIQH' &&
            'فقہِ شافعی — امام محمد بن ادریس الشافعی کا فقہی و اصولی منہج، جس نے اصولِ فقہ کی تدوین فرمائی (کتاب الام، الرسالہ)۔'}
          {selectedWork.discipline === 'HANBALI_FIQH' &&
            'فقہِ حنبلی — امام اہل السنہ احمد بن حنبل کا فقہی منہج، جو کثرتِ آثار اور نصوص پر قائم ہے۔'}
          {selectedWork.discipline === 'AQEEDAH' &&
            'عقائدِ اہل السنت والجماعت — ما انا علیہ واصحابی کا منہج، صفاتِ الٰہیہ میں تنزیہ، ختمِ نبوت، عصمتِ انبیاء، تعظیمِ صحابہ و اہلِ بیت، اور عذابِ قبر و شفاعت پر غیر متزلزل ایمان۔'}
          {selectedWork.discipline === 'SIRAH' &&
            'سیرتِ مصطفیٰ ﷺ — تاریخِ انسانی کی مقدس ترین زندگی، ولادت، مکی دور، ہجرت، مدنی ریاست اور فتحِ مبین کی مستند روایات۔'}
          {selectedWork.discipline === 'SHAMAIL' &&
            'شمائل و خصائصِ نبویہ ﷺ — آقائے دو جہاں ﷺ کے حسن و جمال، چال ڈھال، گفتگو، عاداتِ مبارکہ، عبادات اور رحمتِ عامہ کے خصائص۔'}
          {selectedWork.discipline === 'TAZKIYAH' || selectedWork.discipline === 'SPIRITUAL_HERITAGE' &&
            'تزکیۂ نفس و احسان — دل کو کبر، حسد، ریاکاری اور دنیا کی محبت سے پاک کر کے اخلاص، شکر، صبر اور محبتِ الٰہی سے آراستہ کرنے کا قرآنی منہج۔'}
          {selectedWork.discipline === 'USUL_AL_FIQH' &&
            'اصولِ فقہ — قرآن و سنت سے شرعی احکام مستنبط کرنے کے فقہی قوانین (عام، خاص، مطلق، مقید، اجماع اور قیاس)۔'}
          {selectedWork.discipline === 'MUSTALAH_AL_HADITH' &&
            'اصولِ حدیث — صحیح، حسن، ضعیف، متواتر اور آحاد احادیث کی پرکھ، جرح و تعدیل اور راویوں کے ضبط و عدالت کی جانچ کے اصول۔'}
          {selectedWork.discipline === 'ISLAMIC_HISTORY' &&
            'تاریخِ اسلام — خلافتِ راشدہ، قرونِ اولیٰ اور مجاہدین و ائمۂ اسلام کی دینی خدمات کا مستند ریکارڈ۔'}
        </div>
        <div style={{ fontSize: 12, color: '#475569' }}>
          <strong>Academic Methodology: </strong>
          Disciplined study adheres to canonical Ahl al-Sunnah consensus (Sawad al-A'zam). Inquiries are grounded in verified manuscript lines, primary Isnad, and the unbroken scholarly heritage of classical Islam.
        </div>
      </div>

      {/* CANONICAL EXEGESIS, AUTHOR BIO & TOPICAL INDEX (IF ENRICHED PROFILE EXISTS) */}
      {bookProfile && (
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 12,
            border: '1px solid #CBD5E1',
            padding: '18px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E2E8F0', paddingBottom: 8 }}>
            <span style={{ fontSize: 14, fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span>🏛️</span>
              <span>مقدمۂ کتاب، سوانحِ مصنف و تفصیلی اشاریہ</span>
            </span>
            <span style={{ fontSize: 11, backgroundColor: '#E0F2FE', color: '#0369A1', padding: '2px 8px', borderRadius: 4, fontWeight: 700 }}>
              {bookProfile.madhhabOrOrientation}
            </span>
          </div>

          {/* Significance */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 800, color: '#166534', marginBottom: 4 }}>
              علمی حیثیت و مقام (Scholarly Significance):
            </div>
            <p style={{ margin: '0 0 6px', fontSize: 13, lineHeight: 1.8, color: '#1E293B', textAlign: 'right', direction: 'rtl' }}>
              {bookProfile.significanceUrdu}
            </p>
            <p style={{ margin: 0, fontSize: 12, lineHeight: 1.5, color: '#475569' }}>
              {bookProfile.significanceEnglish}
            </p>
          </div>

          {/* Author Bio */}
          <div style={{ backgroundColor: '#F8FAFC', padding: 12, borderRadius: 8, border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#0F172A', marginBottom: 2 }}>
              سوانحِ مصنف: {bookProfile.authorNameUrdu} ({bookProfile.authorEra})
            </div>
            <p style={{ margin: '0 0 4px', fontSize: 12, lineHeight: 1.7, color: '#334155', textAlign: 'right', direction: 'rtl' }}>
              {bookProfile.authorBioUrdu}
            </p>
            <p style={{ margin: 0, fontSize: 11, color: '#64748B' }}>
              {bookProfile.authorBioEnglish}
            </p>
          </div>

          {/* Methodology */}
          <div style={{ fontSize: 12, color: '#475569', lineHeight: 1.6 }}>
            <strong>منہجِ تدریس و استدلال: </strong>
            <span style={{ direction: 'rtl', textAlign: 'right' }}>{bookProfile.studyMethodologyUrdu}</span>
          </div>

          {/* Topical Index / Sections */}
          {bookProfile.topicalIndex && bookProfile.topicalIndex.length > 0 && (
            <div>
              <div style={{ fontSize: 12, fontWeight: 800, color: '#0F172A', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span>📑</span>
                <span>فہرستِ ابواب و کتبِ ثلاثہ (Canonical Sections &amp; Core Themes):</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 8 }}>
                {bookProfile.topicalIndex.map((sec) => (
                  <div
                    key={sec.sectionNumber}
                    style={{
                      padding: 10,
                      borderRadius: 8,
                      backgroundColor: '#FAFAFA',
                      border: '1px solid #E5E7EB',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 2,
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 11, fontWeight: 800, color: '#065F46' }}>
                        {sec.titleArabic}
                      </span>
                      <span style={{ fontSize: 10, color: '#9CA3AF' }}>#{sec.sectionNumber}</span>
                    </div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#1E293B' }}>
                      {sec.titleUrdu} ({sec.titleEnglish})
                    </div>
                    <div style={{ fontSize: 10, color: '#6B7280', marginTop: 2 }}>
                      مضامین: {sec.coreThemes}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Scope & Authenticity Explanation */}
      <div
        style={{
          padding: 14,
          borderRadius: 10,
          backgroundColor: '#FEF3C7',
          border: '1px solid #FDE68A',
          fontSize: 12,
          lineHeight: 1.6,
          color: '#92400E',
        }}
      >
        <div style={{ fontWeight: 700, marginBottom: 2 }}>
          علمی دیانت داری و مستند ذخیرہ (Theological Authenticity &amp; Classical Protocol):
        </div>
        {isQuran ? (
          <span>
            قرآن پاک کے تمام ۱۱۴ سورتوں کا عثمانی متن، اردو اور انگریزی ترجمہ بغیر کسی حذف و اضافے کے ایپ میں براہِ راست پڑھا جا سکتا ہے۔
          </span>
        ) : (
          <span>
            اس کلاسیکی کتاب کے منتخب اور اساسی ابواب روزمرہ مطالعہ، خشوع اور اخلاقی رہنمائی کے لیے ایپ میں شامل کیے گئے ہیں۔ مکمل ۷،۵۶۳ احادیث یا ضخیم جلدوں کی تحقیق کے لیے سرکاری مکمل ذخیرہ اوپر والے بٹن سے دیکھا جا سکتا ہے۔
          </span>
        )}
      </div>
    </div>
  );
}
