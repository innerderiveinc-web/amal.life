import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Navigation } from '../components/Navigation';
import { signatureCapabilitiesEngine, DecisionRoomEvaluation } from '@amal/amal-engine';
import { useLanguage } from '../context/LanguageContext';

export default function DecisionRoomPage() {
  const { t, isUrdu, isRtl, language } = useLanguage();
  const [situation, setSituation] = useState(() =>
    t(
      'My business partner unilaterally altered our revenue share agreement after 6 months of joint investment. I have not signed the new document yet, but he is withholding payouts.',
      'میرے کاروباری شریک نے چھ ماہ کی مشترکہ سرمایہ کاری کے بعد یکطرفہ طور پر منافع کی تقسیم کا معاہدہ تبدیل کر دیا ہے۔ میں نے نئی دستاویز پر دستخط نہیں کیے لیکن اس نے رقم روک لی ہے۔',
      'قام شريكي التجاري بتعديل نسبة الأرباح المتفق عليها من جانب واحد بعد ستة أشهر من الاستثمار المشترك ويقوم بحجز المستحقات.',
      'Mere business partner ne 6 maah ki mushtarka sarmayakari ke baad yak-tarfa tor par munafa ka muahida badal diya hai aur raqam rok li hai.'
    )
  );
  const [evaluation, setEvaluation] = useState<DecisionRoomEvaluation | null>(null);
  const [privacySetting, setPrivacySetting] = useState<'FULL_CONTEXT' | 'SELECTIVE_CONTEXT' | 'ANONYMOUS'>('SELECTIVE_CONTEXT');
  const [handoffSent, setHandoffSent] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const pending = localStorage.getItem('amal_pending_situation');
      if (pending && pending.trim()) {
        setSituation(pending);
        const result = signatureCapabilitiesEngine.evaluateDecisionRoom(pending);
        setEvaluation(result);
        localStorage.removeItem('amal_pending_situation');
      }
    }
  }, []);

  const handleEvaluate = () => {
    const result = signatureCapabilitiesEngine.evaluateDecisionRoom(situation);
    setEvaluation(result);
    setHandoffSent(false);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F8F9FA', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <Head>
        <title>{`AMAL OS — ${t('Deen Decision Room & Scholar Consultation', 'کمرۂ مشاورت و تحقیق برائے احکام', 'غرفة المشورة الفقهية وإعداد المسائل', 'Deen Decision Room & Mashawarat')}`}</title>
        <meta name="description" content="Deen Decision Room: Multi-Madhhab Dilemma Deconstruction, Four-Pillar Legal Analysis, and Scholar Handoff Dossiers." />
      </Head>
      <Navigation />

      <main style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px 60px' }}>
        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <span style={{ fontSize: 28 }}>⚖️</span>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: '#1B4332', margin: 0 }}>
              {t('Deen Decision Room', 'کمرۂ مشاورت و تحقیق', 'غرفة المشورة الفقهية', 'Deen Decision Room (Kamra-e-Mashawarat)')}
            </h1>
          </div>
          <p style={{
            color: '#4B5563',
            margin: 0,
            fontSize: 14,
            lineHeight: 1.6,
            direction: isRtl ? 'rtl' : 'ltr',
            textAlign: isRtl ? 'right' : 'left',
            fontFamily: isUrdu ? 'var(--font-urdu), serif' : 'inherit'
          }}>
            {t(
              'Issuing binding religious rulings (Fatwa) belongs strictly to qualified living jurists (Muftis). This room deconstructs complex real-world dilemmas (commercial disputes, family issues, contracts) into foundational jurisprudential pillars, highlights consensus and nuances, and synthesizes a structured scholar handoff dossier.',
              'شرعی فتویٰ اور حتمی فیصلہ صرف زندہ و مستند مفتیانِ کرام کا منصب ہے۔ یہ کمرۂ مشاورت آپ کے پیچیدہ معاملے (تجارت، خاندانی مسائل، نزاع) کو فقہی اصولوں کی روشنی میں مرتب کرتا ہے، متفقہ و اختلافی آراء کی وضاحت کرتا ہے، اور اہل علم سے رجوع کے لیے کیس فائل تیار کرتا ہے۔',
              'الفتوى الشرعية الملزمة من اختصاص العلماء والمفتين المؤهلين. تهدف هذه الغرفة إلى تفكيك المسائل المعاصرة المعقدة وفق الأصول الفقهية وإعداد ملف متكامل لعرضه على أهل العلم.',
              'Shari fatwa aur hatmi faisla sirf mustanad Muftiyan-e-Kiram ka mansab hai. Yeh Kamra-e-Mashawarat aap ke pechida muamlat (tijarat, khandani masail, contracts) ko fiqhi usoolon ki roshni mein murattab karta hai, muttafaq o ikhtilafi aara ko wazeh karta hai, aur ulema se ruju ke liye structured dossier tayyar karta hai.'
            )}
          </p>
        </div>

        {/* Input Card */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: 12, padding: 24, border: '1px solid #E5E7EB', marginBottom: 24 }}>
          <label style={{ fontSize: 13, fontWeight: 700, color: '#111827', display: 'block', marginBottom: 8 }}>
            {t('DESCRIBE YOUR COMPLEX SITUATION / CONTRACTUAL DILEMMA:', 'اپنا پیچیدہ معاملہ یا معاہدی مسئلہ تحریر فرمائیں:', 'صف المسألة أو المعاملة التعاقدية بدقة:', 'Apna Pechida Muamla Ya Contract Dilemma Darj Karein:')}
          </label>
          <textarea
            rows={4}
            value={situation}
            onChange={(e) => setSituation(e.target.value)}
            style={{
              width: '100%',
              padding: 12,
              borderRadius: 8,
              border: '1px solid #D1D5DB',
              fontSize: 14,
              fontFamily: 'inherit',
              lineHeight: 1.5,
              marginBottom: 16,
            }}
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => setSituation(
                  t(
                    'My business partner unilaterally altered our revenue share agreement after 6 months of joint investment.',
                    'میرے کاروباری شریک نے چھ ماہ کی مشترکہ سرمایہ کاری کے بعد یکطرفہ طور پر منافع کی تقسیم کا معاہدہ تبدیل کر دیا ہے۔',
                    'قام شريكي التجاري بتعديل نسبة توزيع الأرباح من جانب واحد بعد ستة أشهر من الاستثمار المشترك.',
                    'Mere business partner ne 6 maah ki mushtarka sarmayakari ke baad yak-tarfa tor par munafa taqseem ka muahida badal diya hai.'
                  )
                )}
                style={{ fontSize: 12, padding: '6px 12px', borderRadius: 6, border: '1px solid #D1D5DB', backgroundColor: '#F9FAFB', cursor: 'pointer' }}
              >
                {t('Sample: Business Dispute', 'مثال: کاروباری تنازع', 'نموذج: نزاع تجاري', 'Misaal: Karobari Tanaza')}
              </button>
              <button
                type="button"
                onClick={() => setSituation(
                  t(
                    'My spouse and in-laws have conflicting expectations regarding joint living arrangements, leading to severe emotional tension.',
                    'مشترکہ خاندانی رہائش کے سلسلے میں شریکِ حیات اور سسرال کے درمیان شدید غلط فہمیاں اور نزاع کی کیفیت پیدا ہو چکی ہے۔',
                    'هناك خلافات وتوترات أسرية حادة حول السكن المستقل ومتطلبات المعيشة المشتركة.',
                    'Mushtarka khandani rehaish ke silsilay mein aapas mein shadeed kashidagi aur tanaza peda ho gaya hai.'
                  )
                )}
                style={{ fontSize: 12, padding: '6px 12px', borderRadius: 6, border: '1px solid #D1D5DB', backgroundColor: '#F9FAFB', cursor: 'pointer' }}
              >
                {t('Sample: Family Mediation', 'مثال: خاندانی و ازدواجی تنازع', 'نموذج: نزاع عائلي', 'Misaal: Khandani Masala')}
              </button>
            </div>

            <button
              onClick={handleEvaluate}
              style={{
                padding: '10px 24px',
                borderRadius: 8,
                backgroundColor: '#1B4332',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: 14,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {t('Deconstruct Dilemma →', 'فقہی جائزہ لیں ➔', 'تفكيك المسألة وتحليلها ➔', 'Fiqhi Jaiza Lein ➔')}
            </button>
          </div>
        </div>

        {/* Evaluation Output */}
        {evaluation && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* 4 Pillars Breakdown */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
              {/* Pillar 1: What is Clear & Agreed */}
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: 10, padding: 18, border: '1px solid #86EFAC', borderTop: '4px solid #166534' }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#166534', letterSpacing: 1 }}>
                  {t('WHAT IS CLEAR (MUTTAFAQ ALAYH)', 'متفق علیہ اور واضح احکام', 'المتفق عليه بين الفقهاء', 'Muttafaq Alayh (Wazeh Ahkam)')}
                </span>
                <ul style={{ margin: '10px 0 0', paddingLeft: 18, fontSize: 13, color: '#1F2937', lineHeight: 1.6 }}>
                  {evaluation.whatIsClearAndAgreed.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Pillar 2: What Differs */}
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: 10, padding: 18, border: '1px solid #FDE047', borderTop: '4px solid #CA8A04' }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#854D0E', letterSpacing: 1 }}>
                  {t('WHAT DIFFERS ACROSS MADHHABS', 'فقہی مذاہب کے تفصیلی اقوال', 'مواضع الاختلاف بين المذاهب', 'Madhahib Ke Ikhtilafi Nuqat')}
                </span>
                <ul style={{ margin: '10px 0 12px', paddingLeft: 18, fontSize: 13, color: '#1F2937', lineHeight: 1.6 }}>
                  {evaluation.whatDiffersAcrossSchools.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <div style={{ borderTop: '1px solid #FEF08A', paddingTop: 10, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  <Link href="/library?work=CANON-FIQ-HNF-001" style={{ fontSize: 11, textDecoration: 'none', backgroundColor: '#FEF9C3', color: '#854D0E', padding: '3px 8px', borderRadius: 4, fontWeight: 700 }}>
                    🏛️ {t('Hanafi (Al-Hidayah)', 'حنفی (الہدایہ)', 'الحنفي (الهداية)', 'Hanafi (Al-Hidayah)')}
                  </Link>
                  <Link href="/library?work=CANON-FIQ-MAL-001" style={{ fontSize: 11, textDecoration: 'none', backgroundColor: '#FEF9C3', color: '#854D0E', padding: '3px 8px', borderRadius: 4, fontWeight: 700 }}>
                    🌴 {t('Maliki (Ibn Ashir)', 'مالکی (ابن عاشر)', 'المالكي (ابن عاشر)', 'Maliki (Ibn Ashir)')}
                  </Link>
                  <Link href="/library?work=CANON-FIQ-SHAF-001" style={{ fontSize: 11, textDecoration: 'none', backgroundColor: '#FEF9C3', color: '#854D0E', padding: '3px 8px', borderRadius: 4, fontWeight: 700 }}>
                    ⚖️ {t('Shafi\'i (Abi Shuja\')', 'شافعی (ابی شجاع)', 'الشافعي (أبي شجاع)', 'Shafi\'i (Abi Shuja\')')}
                  </Link>
                  <Link href="/library?work=CANON-FIQ-HAN-001" style={{ fontSize: 11, textDecoration: 'none', backgroundColor: '#FEF9C3', color: '#854D0E', padding: '3px 8px', borderRadius: 4, fontWeight: 700 }}>
                    📜 {t('Hanbali (Umdat al-Fiqh)', 'حنبلی (عمدة الفقہ)', 'الحنبلي (عمدة الفقه)', 'Hanbali (Umdat al-Fiqh)')}
                  </Link>
                </div>
              </div>

              {/* Pillar 3: What Depends on Personal Circumstances */}
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: 10, padding: 18, border: '1px solid #BAE6FD', borderTop: '4px solid #0284C7' }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#0369A1', letterSpacing: 1 }}>
                  {t('WHAT DEPENDS ON CIRCUMSTANCES', 'جو حالات و عرف پر منحصر ہے', 'ما ينبني على العرف والقرائن', 'Halat o Urf Par Munhasir')}
                </span>
                <ul style={{ margin: '10px 0 0', paddingLeft: 18, fontSize: 13, color: '#1F2937', lineHeight: 1.6 }}>
                  {evaluation.whatDependsOnPersonalCircumstances.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Safe Immediate Synthesis */}
            <div style={{ backgroundColor: '#F0FDF4', borderRadius: 10, padding: 18, border: '1px solid #86EFAC' }}>
              <span style={{ fontSize: 12, fontWeight: 800, color: '#15803D' }}>
                🛡️ {t('AMAL\'S SAFE IMMEDIATE SYNTHESIS', 'عمل کا احتیاطی و فوری علمی خلاصہ', 'الخلاصة الإفتائية الفورية الآمنة', 'Amal Ka Ehtiyati o Fauri Khulasa')}
              </span>
              <p style={{ margin: '6px 0 0', fontSize: 14, color: '#14532D', lineHeight: 1.6 }}>
                {evaluation.safeImmediateSynthesis}
              </p>
            </div>

            {/* Scholar Handoff Card */}
            {evaluation.scholarHandoffRequired && evaluation.handoffPacketDraft && (
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: 12, padding: 24, border: '2px solid #1B4332' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
                  <div>
                    <span style={{ fontSize: 11, fontWeight: 800, color: '#047857', backgroundColor: '#ECFDF5', padding: '3px 8px', borderRadius: 4 }}>
                      {t('HUMAN SCHOLAR PROTOCOL', 'تصدیقِ علماء پروٹوکول', 'بروتوكول العرض على أهل العلم', 'Human Scholar Review Protocol')}
                    </span>
                    <h3 style={{ fontSize: 18, fontWeight: 800, color: '#111827', margin: '6px 0 0' }}>
                      {t('Ready-to-Transmit Scholar Case File', 'اہلِ علم کو بھیجنے کے لیے تیار دستاویز', 'ملف القضية الجاهز للعرض على المفتي', 'Ulema Ke Liye Tayyar Case Dossier')}
                    </h3>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <label style={{ fontSize: 12, fontWeight: 600, color: '#4B5563' }}>
                      {t('Privacy Level:', 'رازداری کا درجہ:', 'مستوى الخصوصية:', 'Privacy Darja:')}
                    </label>
                    <select
                      value={privacySetting}
                      onChange={(e) => setPrivacySetting(e.target.value as ('FULL_CONTEXT' | 'SELECTIVE_CONTEXT' | 'ANONYMOUS'))}
                      style={{ fontSize: 12, padding: '4px 8px', borderRadius: 6, border: '1px solid #D1D5DB' }}
                    >
                      <option value="SELECTIVE_CONTEXT">{t('Selective Context (Recommended)', 'منتخب ضروری سیاق (تجویز کردہ)', 'سياق مخصص (مستحسن)', 'Selective Context (Tajweez Karda)')}</option>
                      <option value="ANONYMOUS">{t('100% Anonymized (Zero-Knowledge)', '۱۰۰٪ گمنام رازداری', 'مجهول الهوية بالكامل', '100% Anonymized (Gumnaam)')}</option>
                      <option value="FULL_CONTEXT">{t('Full Context', 'مکمل تفصیلات', 'كامل السياق', 'Mukammal Tafseelat')}</option>
                    </select>
                  </div>
                </div>

                <div style={{ backgroundColor: '#F9FAFB', borderRadius: 8, padding: 16, fontSize: 13, color: '#374151', marginBottom: 16 }}>
                  <div style={{ fontWeight: 700, color: '#111827', marginBottom: 4 }}>
                    {t('Jurisprudential Case Questions Prepared for Jurist:', 'مفتی صاحب کے استفسار کے لیے مرتب کردہ فقہی سوالات:', 'الأسئلة الفقهية المحررة للعرض على المفتي:', 'Mufti Sahab Ke Liye Murattab Karda Sawalat:')}
                  </div>
                  <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.6 }}>
                    {evaluation.handoffPacketDraft.jurisprudentialQuestions.map((q, idx) => (
                      <li key={idx}>{q}</li>
                    ))}
                  </ul>
                  <div style={{ marginTop: 10, fontSize: 11, color: '#6B7280' }}>
                    {t('Track Assigned: ', 'مقررہ شعبہ: ', 'المسار المحدد: ', 'Shoba: ')}<strong>{evaluation.handoffPacketDraft.assignedScholarTrack}</strong> • {t('Audit Provenance: ', 'سندِ توثیق: ', 'رمز التوثيق: ', 'Sanad Hash: ')}{evaluation.handoffPacketDraft.auditHash}
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
                  {handoffSent ? (
                    <div style={{ color: '#15803D', fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
                      ✓ {t('Case Packet Dispatched to Verified Dual Jurist Review Queue!', 'کیس فائل تصدیق شدہ مفتیانِ کرام کے پاس روانہ کر دی گئی!', 'تم إرسال الملف إلى قائمة مراجعة العلماء المحققين بنجاح!', 'Case file muftiyan-e-kiram ke queue mein bhej di gayi hai!')}
                    </div>
                  ) : (
                    <button
                      onClick={() => setHandoffSent(true)}
                      style={{
                        padding: '10px 22px',
                        borderRadius: 8,
                        backgroundColor: '#047857',
                        color: '#FFFFFF',
                        fontWeight: 700,
                        fontSize: 14,
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      {t('Transmit to Qualified Scholars →', 'مستند مفتیانِ کرام کو بھیجیں ➔', 'إرسال إلى العلماء المحققين ➔', 'Mustanad Ulema Ko Bhein ➔')}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
