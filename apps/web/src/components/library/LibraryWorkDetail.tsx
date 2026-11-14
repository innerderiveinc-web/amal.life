import React from 'react';
import { CanonicalEditionRecord } from '@amal/evidence';
import { AmalTheme } from '@amal/ui';
import { getBookChapters, getVerifiedSourceUrl, getLocalPdfForWork } from '../../lib/classical-chapters-data';
import { getCanonicalBookProfile } from '../../data/canonical-book-introductions';
import { showAmalToast } from '../Toast';
import { useLanguage } from '../../context/LanguageContext';

interface LibraryWorkDetailProps {
  selectedWork: CanonicalEditionRecord | null;
  onOpenReader: () => void;
}

export function LibraryWorkDetail({
  selectedWork,
  onOpenReader,
}: LibraryWorkDetailProps) {
  const { t, isUrdu, isArabic, language } = useLanguage();

  if (!selectedWork) {
    return (
      <div style={{ textAlign: 'center', padding: 60, color: '#888' }}>
        {t(
          'Select a work from the canonical library to view manuscript credentials and read chapters.',
          'کتب خانے سے کسی کتاب کا انتخاب فرمائیں تاکہ اس کے علمی کوائف اور اسباق ملاحظہ فرما سکیں۔',
          'اختر مصنفاً من المكتبة الجامعة لمعاينة بيانات المخطوطة وقراءة الفصول الدراسية.',
          'Library se kisi kitab ka intekhab karein taake uske ilmi kowaif aur asbaaq mulahiza farma sakein.'
        )}
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
            ? t('COMPLETE 114 SURAHS · VERIFIED UTHMANIC MUSHAF', 'مکمل ۱۱۴ سورتیں · مصحفِ عثمانی', 'المصحف الشريف كاملاً (١١٤ سورة)', 'COMPLETE 114 SURAHS · VERIFIED UTHMANIC MUSHAF')
            : hasSelectedInAppChapters
            ? t('AUTHENTIC CORE CHAPTERS · VERIFIED SCHOLARLY MANUSCRIPT', 'منتخب اساسی ابواب · معتمد کلاسیکی مخطوطہ', 'أبواب دراسية مختارة · مخطوطة محققة', 'AUTHENTIC CORE CHAPTERS · VERIFIED SCHOLARLY MANUSCRIPT')
            : t(`VERIFIED DIGITAL REPOSITORY · ${selectedWork.volume_count} VOLUME(S)`, `مستند ڈیجیٹل نسخہ · ${selectedWork.volume_count} جلدیں`, `المكتبة الرقمية المعتمدة · ${selectedWork.volume_count} مجلدات`, `VERIFIED DIGITAL REPOSITORY · ${selectedWork.volume_count} VOLUME(S)`)}
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
          {t('Author: ', 'مصنف: ', 'المؤلف: ', 'Musannif: ')}<strong>{selectedWork.author_name}</strong> (
          {selectedWork.author_death_hijri > 0
            ? (isUrdu || isArabic ? `${selectedWork.author_death_hijri}ھ` : `d. ${selectedWork.author_death_hijri} AH`)
            : t('Revelation', 'وحیِ الٰہی', 'وحي إلهي', 'Wahi-e-Ilahi')}
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
              ? t('Read All 114 Surahs In-App', 'قرآنِ مجید کی مکمل ۱۱۴ سورتیں پڑھیں', 'قراءة المصحف الشريف كاملاً (١١٤ سورة)', 'Quran Majeed ki mukammal 114 Suratein parhein')
              : localPdf
              ? t(`Read Lessons & Full Edition — ${selectedWork.title_transliterated}`, `مطالعہ شروع کریں: منتخب اسباق و مکمل کتاب — ${selectedWork.title_arabic}`, `بدء القراءة والنسخة الكاملة — ${selectedWork.title_arabic}`, `Mutala shuru karein: Muntakhab asbaaq o mukammal kitab — ${selectedWork.title_transliterated}`)
              : hasSelectedInAppChapters
              ? t(`Read Curated Lessons — ${selectedWork.title_transliterated}`, `مطالعہ شروع کریں: منتخب اسباق و ماخذ — ${selectedWork.title_arabic}`, `قراءة الفصول المختارة — ${selectedWork.title_arabic}`, `Mutala shuru karein: Muntakhab asbaaq — ${selectedWork.title_transliterated}`)
              : t(`View Manuscript Credentials — ${selectedWork.title_transliterated}`, `علمی اسناد و ماخذ کا معائنہ کریں — ${selectedWork.title_arabic}`, `معاينة السند والمخطوطة — ${selectedWork.title_arabic}`, `Ilmi Asnad o Maakhaz ka muaina karein — ${selectedWork.title_transliterated}`)}
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
              {t(
                `Download Full Original PDF (${localPdf.fileSizeBytes})`,
                `مکمل اصل پی ڈی ایف ڈاؤن لوڈ کریں (${localPdf.fileSizeBytes})`,
                `تحميل نسخة PDF الكاملة (${localPdf.fileSizeBytes})`,
                `Mukammal asal PDF download karein (${localPdf.fileSizeBytes})`
              )}
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
              showAmalToast(
                t('Manuscript SHA-256 Hash copied to clipboard', 'مخطوطہ کا ہیش کلپ بورڈ پر کاپی ہو گیا', 'تم نسخ رمز التحقق بنجاح', 'Manuscript SHA-256 Hash copy ho gaya'),
                'success'
              );
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
            {t('Copy Manuscript SHA-256 Hash', 'مخطوطہ کا ہیش کاپی کریں', 'نسخ رمز التحقق للمخطوط', 'Manuscript SHA-256 Hash Copy Karein')}
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
          <span style={{ color: '#64748B', display: 'block', fontSize: 11 }}>
            {t('CANONICAL PUBLISHER', 'معتمد ناشر', 'الناشر المعتمد', 'CANONICAL PUBLISHER')}
          </span>
          <span style={{ fontWeight: 600, color: '#0F172A' }}>{selectedWork.edition_publisher}</span>
        </div>
        <div>
          <span style={{ color: '#64748B', display: 'block', fontSize: 11 }}>
            {t('VOLUMES / EXTENT', 'مجلدات و ضخامت', 'عدد المجلدات', 'VOLUMES / EXTENT')}
          </span>
          <span style={{ fontWeight: 600, color: '#0F172A' }}>
            {selectedWork.volume_count} {t('Volume(s)', 'جلدیں', 'مجلدات', 'Jildein')}
          </span>
        </div>
        <div>
          <span style={{ color: '#64748B', display: 'block', fontSize: 11 }}>
            {t('CRITICAL EDITOR (MUHAQQIQ)', 'محقق / تصحیح کنندہ', 'المحقق والمعتني به', 'CRITICAL EDITOR (MUHAQQIQ)')}
          </span>
          <span style={{ fontWeight: 600, color: '#0F172A' }}>{selectedWork.critical_editor_muhaqqiq}</span>
        </div>
        <div>
          <span style={{ color: '#64748B', display: 'block', fontSize: 11 }}>
            {t('SCHOLARLY AUTHORITY LEVEL', 'علمی استناد کا درجہ', 'درجة الاعتماد العلمي', 'SCHOLARLY AUTHORITY LEVEL')}
          </span>
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
          <span>{t('Classical Status & Scholarly Role:', 'علمی مقام و فقہی منہج:', 'المكانة العلمية والمنهج:', 'Ilmi Maqaam o Manhaj:')}</span>
        </div>
        <div style={{ color: '#1E293B', textAlign: isUrdu || isArabic ? 'right' : 'left', direction: isUrdu || isArabic ? 'rtl' : 'ltr', marginBottom: 6 }}>
          {selectedWork.discipline === 'QURAN' &&
            (isUrdu || isArabic
              ? 'علومِ قرآن و وحی الٰہی — کلام اللہ کا متنِ متواتر، نزول، کتابتِ عثمانی، تجوید اور تفسیر۔ قرآن مجید تمام احکامِ شریعت کی اصلِ الاصول ہے۔'
              : 'Quranic Sciences & Divine Revelation — The mass-transmitted primordial Word of Allah, Uthmanic codex, Tajweed, and Tafsir; foundational source of all Shari\'ah rulings.')}
          {selectedWork.discipline === 'HADITH' &&
            (isUrdu || isArabic
              ? 'حدیث و سننِ نبویہ ﷺ — رسول اللہ ﷺ کے اقوال، افعال، تقریرات اور شمائل۔ ائمۂ حدیث کی اسانیدِ متصلہ سے تصدیق شدہ متون۔'
              : 'Prophetic Hadith & Sunnah — Authenticated statements, actions, and tacit approvals of the Messenger of Allah ﷺ with connected chains of transmission.')}
          {selectedWork.discipline === 'TAFSIR' &&
            (isUrdu || isArabic
              ? 'علمِ تفسیر و تاویل — آیاتِ قرآنیہ کی مراد، شانِ نزول، ناسخ و منسوخ اور کبار صحابہ و تابعین کے اقوال کی روشنی میں فہمِ کلامِ الٰہی۔'
              : 'Quranic Exegesis (Tafsir) — Canonical exegesis unveiling divine intent, occasions of revelation, abrogations, and classical interpretive consensus.')}
          {selectedWork.discipline === 'HANAFI_FIQH' &&
            (isUrdu || isArabic
              ? 'فقہِ حنفی (السواد الاعظم) — امام اعظم ابو حنیفہ، امام ابو یوسف اور امام محمد شیبانی کا مدوّن کردہ فقہی نظام، جو ظاہر الروایہ، متونِ اربعہ اور کتبِ فتاویٰ پر مبنی ہے۔'
              : 'Hanafi Jurisprudence (Sawad al-A\'zam) — The legal framework formulated by Imam Abu Hanifah, Abu Yusuf, and Muhammad al-Shaybani.')}
          {selectedWork.discipline === 'MALIKI_FIQH' &&
            (isUrdu || isArabic
              ? 'فقہِ مالکی — امام دار الہجرۃ مالک بن انس کا مکتبۂ فقہ، جو عملِ اہلِ مدینہ اور موطا پر استوار ہے۔'
              : 'Maliki Jurisprudence — Grounded in the legal practice of Medina (Amal Ahl al-Madinah) and Imam Malik\'s Muwatta.')}
          {selectedWork.discipline === 'SHAFII_FIQH' &&
            (isUrdu || isArabic
              ? 'فقہِ شافعی — امام محمد بن ادریس الشافعی کا فقہی و اصولی منہج، جس نے اصولِ فقہ کی تدوین فرمائی (کتاب الام، الرسالہ)۔'
              : 'Shafi\'i Jurisprudence — Methodological legal structure codified by Imam Muhammad ibn Idris al-Shafi\'i (Kitab al-Umm, al-Risalah).')}
          {selectedWork.discipline === 'HANBALI_FIQH' &&
            (isUrdu || isArabic
              ? 'فقہِ حنبلی — امام اہل السنہ احمد بن حنبل کا فقہی منہج، جو کثرتِ آثار اور نصوص پر قائم ہے۔'
              : 'Hanbali Jurisprudence — Pristine reliance on textual evidence and traditions codified under Imam Ahmad ibn Hanbal.')}
          {selectedWork.discipline === 'AQEEDAH' &&
            (isUrdu || isArabic
              ? 'عقائدِ اہل السنت والجماعت — ما انا علیہ واصحابی کا منہج، صفاتِ الٰہیہ میں تنزیہ، ختمِ نبوت، عصمتِ انبیاء، اور تعظیمِ صحابہ و اہلِ بیت۔'
              : 'Orthodox Sunni Creed (Aqeedah) — Absolute divine transcendence, the Finality of Prophethood, and reverence for the Sahabah and Ahl al-Bayt.')}
          {selectedWork.discipline === 'SIRAH' &&
            (isUrdu || isArabic
              ? 'سیرتِ مصطفیٰ ﷺ — تاریخِ انسانی کی مقدس ترین زندگی، ولادت، مکی دور، ہجرت، مدنی ریاست اور فتحِ مبین کی مستند روایات۔'
              : 'Prophetic Biography (Sirah) — Exhaustive and authenticated historical chronicle of the sacred life of the Messenger of Allah ﷺ.')}
          {selectedWork.discipline === 'SHAMAIL' &&
            (isUrdu || isArabic
              ? 'شمائل و خصائصِ نبویہ ﷺ — آقائے دو جہاں ﷺ کے حسن و جمال، عاداتِ مبارکہ، عبادات اور رحمتِ عامہ کے خصائص۔'
              : 'Prophetic Attributes & Shama\'il — Pristine descriptions of the physical beauty, noble character, and sublime virtues of the Prophet ﷺ.')}
          {(selectedWork.discipline === 'TAZKIYAH' || selectedWork.discipline === 'SPIRITUAL_HERITAGE') &&
            (isUrdu || isArabic
              ? 'تزکیۂ نفس و احسان — دل کو کبر، حسد اور ریاکاری سے پاک کر کے اخلاص، شکر، صبر اور محبتِ الٰہی سے آراستہ کرنے کا قرآنی منہج۔'
              : 'Spiritual Purification (Tazkiyah) & Ihsan — The Quranic methodology of heart purification, cultivating sincere devotion and inner God-consciousness.')}
          {selectedWork.discipline === 'USUL_AL_FIQH' &&
            (isUrdu || isArabic
              ? 'اصولِ فقہ — قرآن و سنت سے شرعی احکام مستنبط کرنے کے فقہی قوانین (عام، خاص، مطلق، مقید، اجماع اور قیاس)۔'
              : 'Principles of Jurisprudence (Usul al-Fiqh) — Hermeneutical rules for deriving legal rulings from sacred texts.')}
          {selectedWork.discipline === 'MUSTALAH_AL_HADITH' &&
            (isUrdu || isArabic
              ? 'اصولِ حدیث — صحیح، حسن، ضعیف، متواتر اور آحاد احادیث کی پرکھ، جرح و تعدیل اور راویوں کے ضبط و عدالت کی جانچ کے اصول۔'
              : 'Hadith Methodology (Mustalah al-Hadith) — Rigorous criteria for evaluating transmission chains and narrator reliability.')}
          {selectedWork.discipline === 'ISLAMIC_HISTORY' &&
            (isUrdu || isArabic
              ? 'تاریخِ اسلام — خلافتِ راشدہ، قرونِ اولیٰ اور مجاہدین و ائمۂ اسلام کی دینی خدمات کا مستند ریکارڈ۔'
              : 'Islamic History & Biographical Annals — Canonical documentation of the Rightly-Guided Caliphate, early generations, and luminaries.')}
        </div>
        <div style={{ fontSize: 12, color: '#475569' }}>
          <strong>{t('Academic Methodology: ', 'علمی منہج و اسناد: ', 'المنهجية العلمية المعتمدة: ', 'Ilmi Manhaj o Asnaad: ')}</strong>
          {t(
            'Disciplined study adheres to canonical Ahl al-Sunnah consensus (Sawad al-A\'zam). Inquiries are grounded in verified manuscript lines, primary Isnad, and unbroken scholarly heritage.',
            'یہ مطالعہ اہل السنت والجماعت (السواد الاعظم) کے مسلّم اجماع پر مبنی ہے۔ تمام تحقیقات معتمد اسانید اور متصل علمی وراثت پر استوار ہیں۔',
            'تلتزم هذه الدراسة بإجماع أهل السنة والجماعة (السواد الأعظم) معتمدة على أصح المخطوطات والأسانيد المتصلة.',
            'Yeh mutala Ahl al-Sunnah wal-Jama\'ah ke ijma par mabni hai. Tamam tehqeeqaat mustanad asnaad par ustowar hain.'
          )}
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
              <span>{t('Book Introduction, Biography & Topical Index', 'مقدمۂ کتاب، سوانحِ مصنف و تفصیلی اشاریہ', 'مقدمة الكتاب وترجمة المؤلف والفهرس', 'Muqaddama-e-Kitab, Sawaneh o Fehrist')}</span>
            </span>
            <span style={{ fontSize: 11, backgroundColor: '#E0F2FE', color: '#0369A1', padding: '2px 8px', borderRadius: 4, fontWeight: 700 }}>
              {bookProfile.madhhabOrOrientation}
            </span>
          </div>

          {/* Significance */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 800, color: '#166534', marginBottom: 4 }}>
              {t('Scholarly Significance:', 'علمی حیثیت و مقام:', 'المكانة العلمية:', 'Ilmi Haisiyat o Maqaam:')}
            </div>
            <p style={{ margin: '0 0 6px', fontSize: 13, lineHeight: 1.8, color: '#1E293B', textAlign: isUrdu || isArabic ? 'right' : 'left', direction: isUrdu || isArabic ? 'rtl' : 'ltr' }}>
              {isUrdu || isArabic ? bookProfile.significanceUrdu : bookProfile.significanceEnglish}
            </p>
          </div>

          {/* Author Bio */}
          <div style={{ backgroundColor: '#F8FAFC', padding: 12, borderRadius: 8, border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#0F172A', marginBottom: 4 }}>
              {t('Author Biography: ', 'سوانحِ مصنف: ', 'ترجمة المؤلف: ', 'Sawaneh-e-Musannif: ')}{(isUrdu || isArabic) ? bookProfile.authorNameUrdu : bookProfile.authorNameEnglish} ({bookProfile.authorEra})
            </div>
            <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.7, color: '#334155', textAlign: isUrdu || isArabic ? 'right' : 'left', direction: isUrdu || isArabic ? 'rtl' : 'ltr' }}>
              {isUrdu || isArabic ? bookProfile.authorBioUrdu : bookProfile.authorBioEnglish}
            </p>
          </div>

          {/* Methodology */}
          <div style={{ fontSize: 12, color: '#475569', lineHeight: 1.6 }}>
            <strong>{t('Pedagogical Methodology: ', 'منہجِ تدریس و استدلال: ', 'المنهج الدراسي والاستدلالي: ', 'Manhaj-e-Tadrees o Istedlal: ')}</strong>
            <span>{isUrdu || isArabic ? bookProfile.studyMethodologyUrdu : bookProfile.studyMethodologyEnglish}</span>
          </div>

          {/* Topical Index / Sections */}
          {bookProfile.topicalIndex && bookProfile.topicalIndex.length > 0 && (
            <div>
              <div style={{ fontSize: 12, fontWeight: 800, color: '#0F172A', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span>📑</span>
                <span>{t('Canonical Sections & Core Themes:', 'فہرستِ ابواب و کتبِ ثلاثہ:', 'فهرس الأبواب والموضوعات الرئيسية:', 'Fehrist-e-Abwaab o Mazameen:')}</span>
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
                      <span style={{ fontSize: 10, color: '#64748B', fontWeight: 600 }}>#{sec.sectionNumber}</span>
                    </div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#1E293B' }}>
                      {(isUrdu || isArabic) ? sec.titleUrdu : sec.titleEnglish}
                    </div>
                    <div style={{ fontSize: 10, color: '#6B7280', marginTop: 2 }}>
                      {(isUrdu || isArabic) ? 'مضامین: ' : (language === 'roman' ? 'Mazameen: ' : 'Themes: ')}{sec.coreThemes}
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
        <div style={{ fontWeight: 700, marginBottom: 4 }}>
          {t('Theological Authenticity & Classical Protocol:', 'علمی دیانت داری و مستند ذخیرہ:', 'الأمانة العلمية والتوثيق المعتمد:', 'Ilmi Diyanat-daari o Mustanad Zakheera:')}
        </div>
        {isQuran ? (
          <span>
            {t(
              'The complete Uthmanic Mushaf text (all 114 Surahs) with authentic Urdu and English translations is directly accessible in-app without omission or alteration.',
              'قرآن پاک کے تمام ۱۱۴ سورتوں کا عثمانی متن، اردو اور انگریزی ترجمہ بغیر کسی حذف و اضافے کے ایپ میں براہِ راست پڑھا جا سکتا ہے۔',
              'النص القرآني الكامل لجميع سور القرآن الكريم (١١٤ سورة) بالرسم العثماني متاح مباشرة في التطبيق بدقة وأمانة تامة.',
              'Quran Paak ki tamam 114 Suraton ka Uthmani matn, tarjuma baghair kisi hazf o azafe ke app mein barah-e-raast parha ja sakta hai.'
            )}
          </span>
        ) : (
          <span>
            {t(
              'Selected foundational pedagogical chapters from this classical masterwork are included in-app for focused study and daily spiritual practice. For exhaustive research of full multi-volume editions, the verified digital repository is linked above.',
              'اس کلاسیکی کتاب کے منتخب اور اساسی ابواب روزمرہ مطالعہ، خشوع اور اخلاقی رہنمائی کے لیے ایپ میں شامل کیے گئے ہیں۔ کثیر المجلد کتب کی تفصیلی تحقیق کے لیے اصل ذخیرہ اوپر دیے گئے لنک سے دیکھا جا سکتا ہے۔',
              'تم تضمين الأبواب الدراسية الأساسية من هذا المصنف الأصيل للدراسة والعمل. وللاطلاع على المجلدات الكاملة المطبوعة يمكن الرجوع إلى الرابط الموثق أعلاه.',
              'Is classical kitab ke muntakhab aur asasi abwaab rozmarrah mutala aur amli rehnumai ke liye shamil kiye gaye hain. Mukammal jildon ki tehqeeq ke liye asal repository ka link ooper diya gaya hai.'
            )}
          </span>
        )}
      </div>
    </div>
  );
}
