import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Navigation } from '../components/Navigation';
import { useLanguage } from '../context/LanguageContext';

// Dynamically import real-time client clock & location dependent widgets to eliminate React hydration mismatch errors
const DailyMamoolBar = dynamic(
  () => import('../components/DailyMamoolBar').then((m) => m.DailyMamoolBar),
  { ssr: false }
);

const DailyKnowledgeBroadcastCard = dynamic(
  () => import('../components/DailyKnowledgeBroadcastCard').then((m) => m.DailyKnowledgeBroadcastCard),
  { ssr: false }
);

const SpiritualCoachHub = dynamic(
  () => import('../components/coach/SpiritualCoachHub').then((m) => m.SpiritualCoachHub),
  { ssr: false }
);
import {
  signatureCapabilitiesEngine,
  CompiledAmalPlan,
  EvidencePassport,
  PropheticContextResult,
  LifeOsMode,
  LifeOsModeProfile,
  WhyRecommendationExplanation,
  AmalTrustLayer,
} from '@amal/amal-engine';
import { LifeOsModeBar } from '../components/home/LifeOsModeBar';
import { SacredPillarsMatrix } from '../components/home/SacredPillarsMatrix';
import { NiyyahCompilerCard } from '../components/home/NiyyahCompilerCard';
import { PropheticContextCard } from '../components/home/PropheticContextCard';
import { EvidencePassportModal } from '../components/home/EvidencePassportModal';

export default function Home() {
  // 1. Niyyah Compiler State
  const [niyyahInput, setNiyyahInput] = useState(
    'Main apne walidain ke sath behtar aur narm rawayya rakhna chahta hoon'
  );
  const [compiledPlan, setCompiledPlan] = useState<CompiledAmalPlan | null>(null);
  const [showWhyRec, setShowWhyRec] = useState(false);
  const [recExplanation, setRecExplanation] = useState<WhyRecommendationExplanation | null>(null);
  const [trustLayer, setTrustLayer] = useState<AmalTrustLayer | null>(null);

  // 2. Evidence Passport Modal State
  const [activePassport, setActivePassport] = useState<EvidencePassport | null>(null);

  // 3. Prophetic Context State
  const [struggleQuery, setStruggleQuery] = useState(
    'Office mein mujhe unfair treatment mila aur mere kaam ka credit kisi aur ko de diya gaya.'
  );
  const [propheticContext, setPropheticContext] = useState<PropheticContextResult | null>(null);

  // 4. Life OS Mode State
  const [currentMode, setCurrentMode] = useState<LifeOsMode>('STANDARD');
  const [modeProfile, setModeProfile] = useState<LifeOsModeProfile>(
    signatureCapabilitiesEngine.getLifeOsProfile('STANDARD')
  );

  // 5. Sakinah Focus Mode State (Tranquility vs Full Suite) - Defaults to Tranquility (True) for serene user experience
  const [isFocusMode, setIsFocusMode] = useState<boolean>(true);
  const { isUrdu } = useLanguage();

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('amal_focus_mode');
      if (saved === 'false') setIsFocusMode(false);
      else setIsFocusMode(true);
    }
  }, []);

  const toggleFocusMode = (focus: boolean) => {
    setIsFocusMode(focus);
    if (typeof window !== 'undefined') {
      localStorage.setItem('amal_focus_mode', focus ? 'true' : 'false');
    }
  };

  const handleCompileNiyyah = (overrideInput?: string) => {
    const textToUse = overrideInput || niyyahInput;
    if (overrideInput) setNiyyahInput(overrideInput);
    const plan = signatureCapabilitiesEngine.compileNiyyahToAmal({
      userId: 'usr_seeker_1',
      intentionText: textToUse,
    });
    setCompiledPlan(plan);
    const explanation = signatureCapabilitiesEngine.explainWhyRecommendation(
      plan.microAmal.concreteAction,
      textToUse,
      currentMode
    );
    setRecExplanation(explanation);
    const trust = signatureCapabilitiesEngine.generateAmalTrustLayer(
      plan.spiritualDomain,
      plan.microAmal.concreteAction
    );
    setTrustLayer(trust);
  };

  const handleOpenPassport = (topic: string, synthesis: string) => {
    const passport = signatureCapabilitiesEngine.generateEvidencePassport(topic, synthesis);
    setActivePassport(passport);
  };

  const handlePropheticContext = () => {
    const res = signatureCapabilitiesEngine.getPropheticContext(struggleQuery);
    setPropheticContext(res);
  };

  const handleSwitchMode = (mode: LifeOsMode) => {
    setCurrentMode(mode);
    setModeProfile(signatureCapabilitiesEngine.getLifeOsProfile(mode));
  };

  return (
    <div style={{ backgroundColor: '#F8F9FA', minHeight: '100vh', paddingBottom: 80 }}>
      <Head>
        <title>AMAL OS by Qsura India Pvt Ltd — From Niyyah to Amal</title>
        <meta name="author" content="Qsura India Pvt Ltd" />
        <meta name="description" content="AMAL OS by Qsura India Pvt Ltd: Ad-free, zero-tracking sovereign Muslim life operating system grounded in Sawad al-A'zam orthodoxy." />
      </Head>
      <Navigation />

      <main style={{ maxWidth: 960, margin: '0 auto', padding: '0 20px' }}>
        {/* Sakinah / Focus Mode Toggle Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16,
            padding: '8px 14px',
            backgroundColor: '#FFFFFF',
            borderRadius: 12,
            border: '1px solid #E2E8F0',
            flexWrap: 'wrap',
            gap: 10,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 16 }}>{isFocusMode ? '🌿' : '🧭'}</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#1B4332' }}>
              {isUrdu
                ? (isFocusMode ? 'سکینہ موڈ' : 'مکمل دینی نظام')
                : (isFocusMode ? 'Sakinah Focus Mode' : 'Full AMAL OS Suite')}
            </span>
            <span style={{ fontSize: 11, color: '#64748B' }}>
              {isUrdu
                ? (isFocusMode ? '— پرسکون روزمرہ معمول' : '— تمام ۲۴ ماڈیولز و احکام')
                : (isFocusMode ? '— Calm Daily Essentials' : '— All 24 Modules & Tools')}
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              gap: 4,
              backgroundColor: '#F1F5F9',
              padding: 3,
              borderRadius: 8,
              border: '1px solid #E2E8F0',
            }}
          >
            <button
              onClick={() => toggleFocusMode(true)}
              style={{
                padding: '5px 12px',
                borderRadius: 6,
                fontSize: 12,
                fontWeight: isFocusMode ? 800 : 600,
                backgroundColor: isFocusMode ? '#065F46' : 'transparent',
                color: isFocusMode ? '#FFFFFF' : '#475569',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              🌿 {isUrdu ? 'سکینہ' : 'Sakinah Calm'}
            </button>
            <button
              onClick={() => toggleFocusMode(false)}
              style={{
                padding: '5px 12px',
                borderRadius: 6,
                fontSize: 12,
                fontWeight: !isFocusMode ? 800 : 600,
                backgroundColor: !isFocusMode ? '#065F46' : 'transparent',
                color: !isFocusMode ? '#FFFFFF' : '#475569',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              🧭 {isUrdu ? 'مکمل نظام' : 'Full Suite'}
            </button>
          </div>
        </div>

        {/* 1-Tap Daily Essentials Bar */}
        <DailyMamoolBar />

        {/* Automated Daily Knowledge Broadcast Stream */}
        <DailyKnowledgeBroadcastCard />

        {/* Smart Spiritual Coach Hub & Muhasabah Agent */}
        <SpiritualCoachHub />

        {/* PREMIER FEATURED QURAN WISDOM SHOWCASE */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 16,
            border: '1px solid #BBF7D0',
            padding: '20px 24px',
            marginBottom: 20,
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.08)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                backgroundColor: '#ECFDF5',
                border: '1px solid #A7F3D0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 26,
              }}
            >
              📖
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 11, fontWeight: 800, backgroundColor: '#DCFCE7', color: '#166534', padding: '2px 8px', borderRadius: 6 }}>
                  {isUrdu ? 'مستند شرعی ورثہ' : 'CANONICAL HERITAGE'}
                </span>
                <span style={{ fontSize: 11, color: '#059669', fontWeight: 700 }}>
                  Ahl al-Sunnah wal-Jama&apos;ah (Sawad al-A&apos;zam) · 4 Sunni Madhhabs
                </span>
              </div>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: '#0F172A' }}>
                {isUrdu ? 'قرآنِ کریم، حکمت و تدبر' : 'Al-Quran Al-Kareem & Wisdom'}
              </h3>
              <p style={{ margin: '4px 0 0', fontSize: 13, color: '#4B5563', maxWidth: 580, lineHeight: 1.5 }}>
                {isUrdu
                  ? 'مستند تلاوت، کنز الایمان ترجمہ، خزائن العرفان تفسیر اور رومن اردو ٹرانسلٹریشن'
                  : '100% Real Human Voice Recitation · Kanz-ul-Iman & Khaza\'in-ul-Irfan Tafsir · Roman Transliteration'}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/quran"
              style={{
                padding: '10px 18px',
                borderRadius: 10,
                backgroundColor: '#166534',
                color: '#FFFFFF',
                textDecoration: 'none',
                fontWeight: 800,
                fontSize: 13,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                boxShadow: '0 2px 6px rgba(22, 101, 52, 0.25)',
              }}
            >
              <span>{isUrdu ? '📖 قرآنِ کریم (سورتیں)' : '📖 Read Holy Quran'}</span>
              <span>➔</span>
            </Link>

            <Link
              href="/wisdom"
              style={{
                padding: '10px 18px',
                borderRadius: 10,
                backgroundColor: '#D97706',
                color: '#FFFFFF',
                textDecoration: 'none',
                fontWeight: 800,
                fontSize: 13,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                boxShadow: '0 2px 6px rgba(217, 119, 6, 0.25)',
              }}
            >
              <span>{isUrdu ? '✨ قرآنی حکمت کارڈز' : '✨ Sacred Wisdom Cards'}</span>
              <span>➔</span>
            </Link>
          </div>
        </div>

        {isFocusMode ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
            {/* Tranquil 3-Card Sacred Essentials */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 }}>
              <Link
                href="/journeys"
                className="amal-card-hover"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 14,
                  padding: 20,
                  border: '1px solid #A7F3D0',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  boxShadow: '0 2px 8px rgba(6, 95, 70, 0.08)',
                }}
              >
                <span style={{ fontSize: 32 }}>🌱</span>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                    <span style={{ fontSize: 10, fontWeight: 800, backgroundColor: '#DCFCE7', color: '#166534', padding: '1px 6px', borderRadius: 4 }}>
                      8 JOURNEYS
                    </span>
                  </div>
                  <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: '#065F46' }}>
                    {isUrdu ? 'روحانی اسفار و روزانہ ٹریکر' : 'Spiritual Journeys & Daily Tracker'}
                  </h3>
                  <p style={{ margin: '3px 0 0', fontSize: 12, color: '#4B5563' }}>
                    {isUrdu ? '14 روزہ فجر، 21 روزہ نماز، قرآن اور تہجد' : '14-Day Fajr, 21-Day Salah, Quran habit & daily check-ins'}
                  </p>
                </div>
              </Link>

              <Link
                href="/prayer"
                className="amal-card-hover"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 14,
                  padding: 20,
                  border: '1px solid #BBF7D0',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                }}
              >
                <span style={{ fontSize: 32 }}>🕋</span>
                <div>
                  <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: '#166534' }}>
                    {isUrdu ? 'اوقاتِ نماز و قبلہ' : 'Prayer Times & Qibla'}
                  </h3>
                  <p style={{ margin: '3px 0 0', fontSize: 12, color: '#4B5563' }}>
                    {isUrdu ? 'اوقاتِ نماز، قبلہ رخ اور سنت اذکار' : 'Precise solar prayer times, Qibla & sunnah routines'}
                  </p>
                </div>
              </Link>

              <Link
                href="/quran"
                className="amal-card-hover"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 14,
                  padding: 20,
                  border: '1px solid #BFDBFE',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                }}
              >
                <span style={{ fontSize: 32 }}>📖</span>
                <div>
                  <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: '#1E40AF' }}>
                    {isUrdu ? 'قرآنِ کریم' : 'Al-Quran Al-Kareem'}
                  </h3>
                  <p style={{ margin: '3px 0 0', fontSize: 12, color: '#4B5563' }}>
                    {isUrdu ? '۱۱۴ سورتیں، اردو و انگریزی ترجمہ اور قراء' : '114 Surahs, English & Roman transliteration'}
                  </p>
                </div>
              </Link>

              <Link
                href="/tasbih"
                className="amal-card-hover"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 14,
                  padding: 20,
                  border: '1px solid #FDE68A',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                }}
              >
                <span style={{ fontSize: 32 }}>📿</span>
                <div>
                  <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: '#92400E' }}>
                    {isUrdu ? 'مسنون تسبیح' : 'Digital Masnoon Tasbih'}
                  </h3>
                  <p style={{ margin: '3px 0 0', fontSize: 12, color: '#4B5563' }}>
                    {isUrdu ? 'مسنون اذکار، استغفار اور تسبیحات' : 'Daily sunnah wird, counter & morning/evening adhkar'}
                  </p>
                </div>
              </Link>

              <Link
                href="/ask"
                className="amal-card-hover"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 14,
                  padding: 20,
                  border: '1px solid #E9D5FF',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                }}
              >
                <span style={{ fontSize: 32 }}>💬</span>
                <div>
                  <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: '#7E22CE' }}>
                    {isUrdu ? 'دینی سوال و رہنمائی' : 'Ask AMAL (Evidence Inquiries)'}
                  </h3>
                  <p style={{ margin: '3px 0 0', fontSize: 12, color: '#4B5563' }}>
                    {isUrdu ? 'مستند کتبِ اہلسنت سے سوال و رہنمائی' : 'Canonical Islamic evidence from 106 masterworks'}
                  </p>
                </div>
              </Link>
            </div>

            {/* Gentle Expand Pill */}
            <div
              style={{
                backgroundColor: '#F8FAFC',
                borderRadius: 12,
                padding: '14px 20px',
                border: '1px solid #E2E8F0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 12,
              }}
            >
              <div style={{ fontSize: 13, color: '#475569' }}>
                Looking for <strong>Niyyah Compiler, Decision Room, Zakat, Miras</strong> or the <strong>106 Classical Books</strong>?
              </div>
              <button
                onClick={() => toggleFocusMode(false)}
                style={{
                  padding: '7px 16px',
                  borderRadius: 8,
                  backgroundColor: '#065F46',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: 12,
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Switch to Full Suite ➔
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Core Hero Banner */}
            <div
              className="amal-card-hover"
              style={{
                background: 'linear-gradient(135deg, #064E3B 0%, #065F46 55%, #047857 100%)',
            borderRadius: 16,
            padding: '30px 34px',
            color: '#FFFFFF',
            marginBottom: 24,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 16,
            boxShadow: '0 12px 28px -6px rgba(6, 78, 59, 0.28), 0 4px 10px -2px rgba(6, 78, 59, 0.12)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Subtle Islamic arch / glow decoration in background */}
          <div
            style={{
              position: 'absolute',
              right: -40,
              top: -40,
              width: 220,
              height: 220,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(110, 231, 183, 0.15) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <span style={{ fontSize: 11, fontWeight: 800, color: '#86EFAC', letterSpacing: 1.5, textTransform: 'uppercase' }}>
              AMAL OS • نظامِ حیات و عمل (SOVEREIGN MUSLIM LIFE OS)
            </span>
            <h1 style={{ fontSize: 30, fontWeight: 900, margin: '6px 0 6px', letterSpacing: -0.5 }}>
              From Niyyah to Amal.
            </h1>
            <p style={{ margin: 0, fontSize: 14, color: '#D1FAE5', maxWidth: 540, lineHeight: 1.6 }}>
              Turn pure intention into evidence-grounded action. Understand your Deen, navigate real life with Prophetic wisdom, and reach qualified scholarship when it matters.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 10, position: 'relative', zIndex: 1 }}>
            <Link
              href="/decision-room"
              style={{
                textDecoration: 'none',
                padding: '11px 20px',
                borderRadius: 8,
                backgroundColor: '#FFFFFF',
                color: '#065F46',
                fontWeight: 800,
                fontSize: 13,
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <span>⚖️</span>
              <span>Deen Decision Room →</span>
            </Link>
          </div>
        </div>

            {/* 5. Life OS Mode Switcher Bar */}
            <LifeOsModeBar
              currentMode={currentMode}
              modeProfile={modeProfile}
              onSwitchMode={handleSwitchMode}
            />

            {/* 4 SACRED PILLARS MATRIX */}
            <SacredPillarsMatrix />

            {/* FEATURE 1: NIYYAH → AMAL COMPILER */}
            <NiyyahCompilerCard
              niyyahInput={niyyahInput}
              setNiyyahInput={setNiyyahInput}
              compiledPlan={compiledPlan}
              showWhyRec={showWhyRec}
              setShowWhyRec={setShowWhyRec}
              recExplanation={recExplanation}
              trustLayer={trustLayer}
              onCompileNiyyah={handleCompileNiyyah}
              onOpenPassport={handleOpenPassport}
            />

            {/* FEATURE 4: PROPHETIC CONTEXT ENGINE */}
            <PropheticContextCard
              struggleQuery={struggleQuery}
              setStruggleQuery={setStruggleQuery}
              propheticContext={propheticContext}
              onSearchPropheticContext={(override) => {
                if (override) setStruggleQuery(override);
                const query = override || struggleQuery;
                const res = signatureCapabilitiesEngine.getPropheticContext(query);
                setPropheticContext(res);
              }}
            />
          </>
        )}
      </main>

      {/* FEATURE 2: EVIDENCE PASSPORT ("SHOW ME WHY") MODAL */}
      <EvidencePassportModal
        activePassport={activePassport}
        onClose={() => setActivePassport(null)}
      />
    </div>
  );
}