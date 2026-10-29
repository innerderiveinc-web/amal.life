import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Navigation } from '../components/Navigation';
import { useLanguage } from '../context/LanguageContext';
import { ClientOnly } from '../components/ClientOnly';
import { DailyMamoolBar } from '../components/DailyMamoolBar';
import { DailyKnowledgeBroadcastCard } from '../components/DailyKnowledgeBroadcastCard';
import { DailySunnahChecklistCard } from '../components/home/DailySunnahChecklistCard';
import { SpiritualCoachHub } from '../components/coach/SpiritualCoachHub';
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
    <div style={{ backgroundColor: '#F8F9FA', minHeight: '100vh', paddingBottom: 120 }}>
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
        <ClientOnly fallback={<div style={{ minHeight: 180, backgroundColor: '#FFFFFF', borderRadius: 18, marginBottom: 24, border: '1px solid #E2E8F0' }} />}>
          <DailyMamoolBar />
        </ClientOnly>

        {/* Daily Practical Sunnah Checklist & Routine Tracker */}
        <div style={{ marginTop: 16 }}>
          <ClientOnly fallback={<div style={{ minHeight: 120, backgroundColor: '#FFFFFF', borderRadius: 16, border: '1px solid #E2E8F0' }} />}>
            <DailySunnahChecklistCard />
          </ClientOnly>
        </div>

        {/* Automated Daily Knowledge Broadcast Stream */}
        <ClientOnly fallback={<div style={{ minHeight: 160, backgroundColor: '#FFFFFF', borderRadius: 16, marginTop: 16, border: '1px solid #E2E8F0' }} />}>
          <DailyKnowledgeBroadcastCard />
        </ClientOnly>

        {/* 4 SACRED PILLARS MATRIX - EXECUTIVE ARCHITECTURAL GATEWAY */}
        <div style={{ marginTop: 24, marginBottom: 28 }}>
          <SacredPillarsMatrix />
        </div>

        {/* Smart Spiritual Coach Hub & Muhasabah Agent */}
        <div style={{ marginBottom: 28 }}>
          <ClientOnly fallback={<div style={{ minHeight: 160, backgroundColor: '#FFFFFF', borderRadius: 16, border: '1px solid #E2E8F0' }} />}>
            <SpiritualCoachHub />
          </ClientOnly>
        </div>

        {/* SIGNATURE CAPABILITIES: LIFE OS MODES, NIYYAH COMPILER & PROPHETIC CONTEXT */}
        {!isFocusMode ? (
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 16,
              border: '1px solid #E2E8F0',
              padding: '24px 24px',
              marginBottom: 32,
              boxShadow: '0 4px 14px rgba(15, 23, 42, 0.04)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 12,
                paddingBottom: 18,
                borderBottom: '1px solid #F1F5F9',
                marginBottom: 20,
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span
                    style={{
                      backgroundColor: '#ECFDF5',
                      color: '#065F46',
                      fontSize: 11,
                      fontWeight: 800,
                      padding: '2px 8px',
                      borderRadius: 6,
                      letterSpacing: 0.5,
                    }}
                  >
                    {isUrdu ? 'روزمرہ رہنمائی' : 'DAILY GUIDANCE'}
                  </span>
                  <span style={{ fontSize: 12, color: '#64748B', fontWeight: 600 }}>
                    {isUrdu ? 'نیت، طرزِ زندگی اور نبوی حکمت' : 'Intention, Life Context & Prophetic Guidance'}
                  </span>
                </div>
                <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: '#0F172A' }}>
                  {isUrdu ? 'نیت سے عمل تک اور اسوۂ رسول ﷺ' : 'From Intention to Action & Prophetic Guidance'}
                </h2>
              </div>

              <Link
                href="/decision-room"
                style={{
                  textDecoration: 'none',
                  padding: '8px 16px',
                  borderRadius: 8,
                  backgroundColor: '#065F46',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: 12,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  boxShadow: '0 2px 4px rgba(6, 95, 70, 0.2)',
                }}
              >
                <span>⚖️</span>
                <span>{isUrdu ? 'فیصلہ روم کھولیں ➔' : 'Open Decision Room ➔'}</span>
              </Link>
            </div>

            {/* Life OS Mode Switcher Bar */}
            <div style={{ marginBottom: 20 }}>
              <LifeOsModeBar
                currentMode={currentMode}
                modeProfile={modeProfile}
                onSwitchMode={handleSwitchMode}
              />
            </div>

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
            <div style={{ marginTop: 20 }}>
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
            </div>
          </div>
        ) : (
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 14,
              border: '1px dashed #CBD5E1',
              padding: '16px 20px',
              marginBottom: 32,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 12,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 20 }}>⚡</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#334155' }}>
                  {isUrdu ? 'نیت کمپائلر، حالاتِ زندگی اور نبوی حکمت انجن' : 'Advanced Signature Engines Available'}
                </div>
                <div style={{ fontSize: 12, color: '#64748B' }}>
                  {isUrdu ? 'مکمل نظام موڈ فعال کر کے نیت اور حالات کے مطابق رہنمائی حاصل کریں۔' : 'Switch to Full Suite to interact with Niyyah Compiler, Life OS Modes & Prophetic Context.'}
                </div>
              </div>
            </div>

            <button
              onClick={() => toggleFocusMode(false)}
              style={{
                padding: '7px 14px',
                borderRadius: 8,
                backgroundColor: '#065F46',
                color: '#FFFFFF',
                border: 'none',
                fontWeight: 700,
                fontSize: 12,
                cursor: 'pointer',
              }}
            >
              {isUrdu ? 'مکمل نظام دکھائیں ➔' : 'Show Full Suite ➔'}
            </button>
          </div>
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