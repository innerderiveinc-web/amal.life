import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Navigation } from '../components/Navigation';
import { useLanguage } from '../context/LanguageContext';
import { AmalTheme } from '@amal/ui';

type TermsSection = 'OVERVIEW' | 'DISCLAIMER' | 'ADAB' | 'IP' | 'LIABILITY';

export default function TermsPage() {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState<TermsSection>('OVERVIEW');

  return (
    <div style={{ backgroundColor: '#F8F9FA', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <Head>
        <title>Terms of Service & Spiritual Adab | AMAL OS</title>
        <meta name="description" content="Terms of Service, Religious Disclaimer, and Sacred Adab Charter for AMAL OS." />
      </Head>

      <Navigation />

      <main style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px 80px' }}>
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 800, color: '#1B4332', letterSpacing: 1, textTransform: 'uppercase' }}>
              {t('LEGAL & THEOLOGICAL GOVERNANCE', 'قانونی اور دینی نظم و ضبط', 'الحوكمة القانونية والشرعية', 'LEGAL & THEOLOGICAL GOVERNANCE')}
            </span>
            <span style={{ fontSize: 11, backgroundColor: '#D1FAE5', color: '#065F46', padding: '2px 8px', borderRadius: 12, fontWeight: 700 }}>
              {t('Version 1.5 (Muharram 1448 AH)', 'ورژن ۱.۵ (محرم ۱۴۴۸ ھ)', 'الإصدار ١.٥ (محرم ١٤٤٨ هـ)', 'Version 1.5 (Muharram 1448 AH)')}
            </span>
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#1B4332', margin: '0 0 10px' }}>
            {t('Terms of Service & Shar\'i Adab Charter', 'شرائطِ استعمال و شرعی ادب نامہ', 'شروط الخدمة وميثاق الآداب الشرعية', 'Terms of Service & Shar\'i Adab Charter')}
          </h1>
          <p style={{ color: '#4B5563', fontSize: 15, margin: 0, lineHeight: 1.6 }}>
            Bismillahir Rahmanir Raheem. AMAL OS is the proprietary intellectual property of <strong>Qsura India Pvt Ltd</strong>, founded and architected by <strong>Dr. Irfan Ashraf</strong>, developed as a sovereign spiritual operating system dedicated to the worship of Allah ﷻ and the service of the Ummah. By utilizing AMAL OS, you agree to these legal and ethical terms.
          </p>
        </div>

        {/* Tab Quick Selector */}
        <div style={{
          display: 'flex',
          gap: 10,
          marginBottom: 32,
          overflowX: 'auto',
          paddingBottom: 8,
          borderBottom: '1px solid #E5E7EB',
        }}>
          {[
            { id: 'OVERVIEW', label: t('1. Core Agreement & Intent', '۱. بنیادی معاہدہ و نیت', '١. الاتفاق الأساسي والنية', '1. Bunyadi Muahida o Niyyat') },
            { id: 'DISCLAIMER', label: t('2. Non-Fatwa & Shar\'i Disclaimer', '۲. شرعی تنبیہ و عدمِ فتویٰ', '٢. إخلاء المسؤولية الفقهية', '2. Shar\'i Tanbeeh o Adam-e-Fatwa') },
            { id: 'ADAB', label: t('3. Sacred Decorum (Adab)', '۳. ادب و احترامِ شعائر', '٣. الآداب الشرعية', '3. Adab o Ehtiram') },
            { id: 'IP', label: t('4. Copyright & Waqf Charter', '۴. حقوقِ ملکیت و وقف', '٤. ميثاق حقوق الملكية والوقف', '4. Huqooq o Waqf Charter') },
            { id: 'LIABILITY', label: t('5. Limitation of Liability', '۵. تحدیدِ ذمہ داری', '٥. حدود المسؤولية القانونية', '5. Limitation of Liability') },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id as TermsSection)}
              style={{
                padding: '8px 16px',
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 700,
                cursor: 'pointer',
                border: 'none',
                backgroundColor: activeSection === tab.id ? '#1B4332' : '#FFFFFF',
                color: activeSection === tab.id ? '#FFFFFF' : '#4B5563',
                boxShadow: activeSection === tab.id ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Box */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: 16, border: '1px solid #E5E7EB', padding: 36, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          {/* Section 1 */}
          <section style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: '#111827', marginBottom: 14 }}>
              1. Core Agreement & Divine Purpose (النية والميثاق)
            </h2>
            <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.7 }}>
              AMAL OS is built with the sole objective of cultivating <em>Ikhlas</em> (sincerity), deepening knowledge of the Quran and authentic Sunnah, and organizing daily life according to Islamic jurisprudence. By accessing or using AMAL OS through web, desktop, mobile, or offline interfaces, you enter into a covenant governed by both applicable statutory laws and sacred Islamic ethics (<em>Amanah</em>).
            </p>
            <div style={{ backgroundColor: '#F0FDF4', borderLeft: '4px solid #10B981', padding: '14px 18px', borderRadius: '0 8px 8px 0', marginTop: 14 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#065F46' }}>
                Quranic Foundational Invariant (Surah Al-Ma'idah 5:1):
              </span>
              <p style={{ fontSize: 13, color: '#047857', margin: '4px 0 0', fontStyle: 'italic' }}>
                "O you who have believed, fulfill all contracts and covenants."
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: '#991B1B', marginBottom: 14 }}>
              2. Absolute Non-Fatwa & Epistemic Disclaimer (عدم الإفتاء المستقل)
            </h2>
            <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: 12, padding: 20, marginBottom: 16 }}>
              <strong style={{ color: '#991B1B', fontSize: 14, display: 'block', marginBottom: 6 }}>
                ⚠️ {t('CRITICAL RELIGIOUS WARNING:', 'اہم ترین شرعی تنبیہ:', 'تنبيه شرعي حرج:', 'CRITICAL RELIGIOUS WARNING:')}
              </strong>
              <p style={{ fontSize: 13, color: '#7F1D1D', margin: 0, lineHeight: 1.6 }}>
                AMAL OS, including its evidence search modules, decision guidance tools, and zakat/miras calculators, provides <strong>educational, informational, and contemplative guidance</strong> based on accredited classical masterworks. <strong>AMAL OS IS NOT AN AUTONOMOUS MUFTI OR JUDICIAL AUTHORITY (QADI).</strong>
              </p>
            </div>
            <ul style={{ fontSize: 14, color: '#374151', lineHeight: 1.8, paddingLeft: 20, margin: 0 }}>
              <li>
                <strong>{t('No Fatwa Issuance:', 'فتویٰ کا عدم صدور:', 'عدم إصدار الفتاوى:', 'No Fatwa Issuance:')}</strong> Search results, references, and synthesized summaries do NOT constitute a binding personal fatwa. AMAL OS is an educational research and clerical index, not a Mufti. Every individual's personal circumstance (<em>Hal</em>) may alter legal dispensations (<em>Rukhsah</em>).
              </li>
              <li>
                <strong>{t('Life-or-Death, Talaq & High-Stakes Litigation:', 'زندگی و موت، طلاق اور حساس تنازعات:', 'قضايا الحياة والموت والطلاق والنزاعات الكبرى:', 'Life-or-Death, Talaq & High-Stakes Litigation:')}</strong> Complex disputes regarding divorce (<em>Talaq / Khula</em>), criminal litigation, medical bioethics, or contentious probate inheritance MUST be submitted to qualified, living human scholars and recognized Dar al-Ifta institutions.
              </li>
              <li>
                <strong>{t('Dual Jurist Protocol:', 'دو فقہی نکتہ نظر کا پروٹوکول:', 'بروتوكول الفقيه المزدوج:', 'Dual Jurist Protocol:')}</strong> Where fiqh research is requested, AMAL OS maps opinions across the 4 Sunni Madhhabs (Hanafi, Shafi'i, Maliki, Hanbali) and outputs an auditable Scholar Case Brief rather than unilaterally deciding contentious matters.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: '#111827', marginBottom: 14 }}>
              3. Sacred Decorum & Acceptable Use
            </h2>
            <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.7 }}>
              Users pledge to interact with AMAL OS within the bounds of Islamic decorum (<em>Adab al-Mu'amalat</em>). You expressly agree NOT to:
            </p>
            <ul style={{ fontSize: 14, color: '#374151', lineHeight: 1.8, paddingLeft: 20, margin: '10px 0 0' }}>
              <li>Submit blasphemous, insulting, or derogatory queries regarding Allah ﷻ, His Prophets, the Sahabah, the Ahl al-Bayt, or classical Islamic scholarship.</li>
              <li>Attempt to scrape, exploit, or inject malicious inputs into the knowledge runtime to manufacture un-Islamic permissibility (<em>Tahleel al-Haram</em>) or baseless takfir.</li>
              <li>Weaponize family circles or decision rooms for domestic coercion, domestic abuse, or violation of family members' rights.</li>
              <li>Use calculated inheritance allocations to unlawfully disinherit women, orphans, or rightful Quranic heirs.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: '#111827', marginBottom: 14 }}>
              4. Intellectual Property & Sacred Waqf Charter (حقوق النشر والوقف)
            </h2>
            <ul style={{ fontSize: 14, color: '#374151', lineHeight: 1.8, paddingLeft: 20, margin: 0 }}>
              <li>
                <strong>{t('The Noble Quran & Hadith Texts:', 'قرآن مجید اور احادیثِ مبارکہ:', 'القرآن الكريم ونصوص الحديث الشريف:', 'The Noble Quran & Hadith Texts:')}</strong> The Holy Quran, classical Ahadith, and Islamic jurisprudence texts are the eternal, non-monetizable spiritual heritage of the Muslim Ummah (<em>Waqf 'Aam</em>). No copyright is claimed over divine revelation or Prophetic tradition.
              </li>
              <li>
                <strong>{t('Audio Recitations:', 'صوتی تلاوتیں:', 'التلاوات الصوتية:', 'Audio Recitations:')}</strong> Master recitations by Shaykh Al-Husary, Shaykh Al-Minshawi, Shaykh Abdul Basit, and Shaykh Mishary Rashid Alafasy are hosted under non-commercial spiritual listening licenses courtesy of open Quranic repositories.
              </li>
              <li>
                <strong>{t('Software & Design:', 'سافٹ ویئر اور ڈیزائن:', 'البرمجيات والتصميم:', 'Software & Design:')}</strong> The AMAL OS proprietary software architecture, design system, algorithms, and compilation engines are the intellectual property of Qsura India Pvt Ltd, founded and architected by Dr. Irfan Ashraf, protected by applicable copyright and intellectual property laws. Code modules released under open-source licenses carry MIT/Apache 2.0 governance.
              </li>
            </ul>
          </section>

          {/* Section 5 */}
          <section>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: '#111827', marginBottom: 14 }}>
              5. Limitation of Liability & Warranty Disclaimer
            </h2>
            <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.7 }}>
              AMAL OS is provided on an "AS IS" and "AS AVAILABLE" basis. While our astronomical calculation engines and fiqh rules have been validated against certified benchmarks, AMAL OS makes no warranties regarding absolute precision for edge astronomical cases (e.g., extreme high-latitude midnight sun conditions) and encourages local mosque iqamah alignment. To the fullest extent permitted by applicable law, the contributors of AMAL OS shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use this platform.
            </p>
          </section>
        </div>

        {/* Quick Link Navigation to Other Legal Docs */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 32, flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', gap: 14 }}>
            <Link href="/privacy" style={{ color: '#1B4332', fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>
              {t('🛡️ Privacy Policy & Vault Guard →', '🛡️ پرائیویسی پالیسی اور والٹ گارڈ ←', '🛡️ سياسة الخصوصية وحماية الخزينة ←', '🛡️ Privacy Policy & Vault Guard →')}
            </Link>
            <Link href="/copyright" style={{ color: '#1B4332', fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>
              {t('📜 Copyright & Waqf Charter →', '📜 کاپی رائٹ اور وقف چارٹر ←', '📜 ميثاق حقوق النشر والوقف ←', '📜 Copyright & Waqf Charter →')}
            </Link>
          </div>
          <span style={{ fontSize: 12, color: '#6B7280' }}>
            {t('Questions regarding governance? Contact the AMAL Scholarly Council.', 'نظم و ضبط سے متعلق سوالات؟ عمل علمی کونسل سے رجوع کریں۔', 'هل لديك أسئلة حول الحوكمة؟ تواصل مع المجلس العلمي لـ AMAL.', 'Governance se mutalliq sawalat? Amal Scholarly Council se rabta karein.')}
          </span>
        </div>
      </main>
    </div>
  );
}
