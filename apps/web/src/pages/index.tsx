import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Navigation } from '../components/Navigation';
import { DailyMamoolBar } from '../components/DailyMamoolBar';
import { DailyKnowledgeBroadcastCard } from '../components/DailyKnowledgeBroadcastCard';
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

  // 5. Sakinah Focus Mode State (Tranquility vs Full Suite)
  const [isFocusMode, setIsFocusMode] = useState<boolean>(false);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('amal_focus_mode');
      if (saved === 'true') setIsFocusMode(true);
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
        <title>AMAL OS — From Niyyah to Amal (Life Operating System)</title>
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
              {isFocusMode ? 'سکینہ موڈ (Sakinah Focus Active)' : 'مکمل دینی نظام (Full AMAL Suite)'}
            </span>
            <span style={{ fontSize: 11, color: '#64748B' }}>
              {isFocusMode ? '— پرسکون روزمرہ معمول' : '— تمام ۲۴ ماڈیولز و احکام'}
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
              🌿 Sakinah Calm
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
              🧭 Full Suite
            </button>
          </div>
        </div>

        {/* 1-Tap Daily Essentials Bar */}
        <DailyMamoolBar />

        {/* Automated Daily Knowledge Broadcast Stream */}
        <DailyKnowledgeBroadcastCard />

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
                  NEW · نیا ماڈیول
                </span>
                <span style={{ fontSize: 11, color: '#059669', fontWeight: 700 }}>
                  Ahl al-Sunnah Verified Standards
                </span>
              </div>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: '#0F172A' }}>
                Al-Quran Al-Kareem &amp; Wisdom (قرآنِ کریم، حکمت و تدبر)
              </h3>
              <p style={{ margin: '4px 0 0', fontSize: 13, color: '#4B5563', maxWidth: 580, lineHeight: 1.5 }}>
                100% Real Human Voice Recitation · <strong>Kanz-ul-Iman</strong> (اعلیٰ حضرت) · <strong>Khaza&apos;in-ul-Irfan</strong> (صدر الافاضل) · 2-Min Quick Wisdom Cards
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <Link
              href="/quran"
              style={{
                padding: '10px 20px',
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
              <span>قرآن و تدبر کھولیں</span>
              <span>➔</span>
            </Link>
          </div>
        </div>

        {isFocusMode ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
            {/* Tranquil 3-Card Sacred Essentials */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 }}>
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
                    Auqat-e-Namaz &amp; Qibla
                  </h3>
                  <p style={{ margin: '3px 0 0', fontSize: 12, color: '#4B5563' }}>
                    اوقاتِ نماز، قبلہ رخ اور سنت اذکار
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
                    Al-Quran Al-Kareem
                  </h3>
                  <p style={{ margin: '3px 0 0', fontSize: 12, color: '#4B5563' }}>
                    ۱۱۴ سورتیں، اردو و انگریزی ترجمہ اور قراء
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
                    Digital Masnoon Tasbih
                  </h3>
                  <p style={{ margin: '3px 0 0', fontSize: 12, color: '#4B5563' }}>
                    مسنون اذکار، استغفار اور تسبیحات
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
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 14,
            padding: '12px 18px',
            border: '1px solid #E2E8F0',
            marginBottom: 24,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.02)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#475569' }}>حالتِ زندگی · Life Context:</span>
            <div
              style={{
                display: 'flex',
                gap: 4,
                backgroundColor: '#F1F5F9',
                padding: 3,
                borderRadius: 10,
                border: '1px solid #E2E8F0',
              }}
            >
              {(['STANDARD', 'TRAVEL', 'EXAMS_WORK_CRUNCH', 'NEW_PARENT'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => handleSwitchMode(m)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 8,
                    fontSize: 12,
                    fontWeight: currentMode === m ? 700 : 500,
                    cursor: 'pointer',
                    border: 'none',
                    backgroundColor: currentMode === m ? '#FFFFFF' : 'transparent',
                    color: currentMode === m ? '#064E3B' : '#64748B',
                    boxShadow: currentMode === m ? '0 2px 4px rgba(0, 0, 0, 0.06)' : 'none',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {m === 'STANDARD'
                    ? 'معمول (Daily)'
                    : m === 'TRAVEL'
                    ? '✈️ سفر (Travel)'
                    : m === 'EXAMS_WORK_CRUNCH'
                    ? '📚 امتحانات (Focus)'
                    : '👶 والدینیت (Parent)'}
                </button>
              ))}
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 12,
              color: '#047857',
              fontWeight: 700,
              backgroundColor: '#ECFDF5',
              padding: '5px 14px',
              borderRadius: 20,
              border: '1px solid #A7F3D0',
            }}
          >
            <span style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: '#10B981', display: 'inline-block' }}></span>
            <span>{modeProfile.modeDisplayNameUrdu} · {modeProfile.modeDisplayName}</span>
          </div>
        </div>

        {/* 4 SACRED PILLARS MATRIX */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 16,
            padding: 24,
            border: '1px solid #E2E8F0',
            marginBottom: 24,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18, flexWrap: 'wrap', gap: 8 }}>
            <div>
              <span style={{ fontSize: 11, fontWeight: 800, color: '#047857', letterSpacing: 1.2, textTransform: 'uppercase' }}>
                FOUR SACRED PILLARS
              </span>
              <h2 style={{ fontSize: 19, fontWeight: 800, color: '#0F172A', margin: '2px 0 0' }}>
                دینی و عملی شعبہ جات · Core Life Dimensions
              </h2>
            </div>
            <span style={{ fontSize: 13, color: '#64748B' }}>
              عبادت، علم و سیرت، مالی احکام اور تزکیۂ نفس کا مربوط نظام
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 14 }}>
            {/* Channel 1 */}
            <div className="amal-card-hover" style={{ padding: 14, borderRadius: 10, backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0' }}>
              <div style={{ fontSize: 20, marginBottom: 4 }}>🕋</div>
              <div style={{ fontSize: 14, fontWeight: 800, color: '#166534' }}>1. Daily Worship Rhythm</div>
              <div style={{ fontSize: 11, color: '#15803D', margin: '4px 0 10px', lineHeight: 1.4 }}>
                Namaz ➔ Tasbih ➔ Tajweed ➔ Fasting ➔ Muhasabah
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                <Link href="/prayer" style={{ fontSize: 11, padding: '3px 8px', borderRadius: 4, backgroundColor: '#FFFFFF', color: '#166534', textDecoration: 'none', fontWeight: 700, border: '1px solid #86EFAC' }}>
                  Prayer & Qibla
                </Link>
                <Link href="/tasbih" style={{ fontSize: 11, padding: '3px 8px', borderRadius: 4, backgroundColor: '#FFFFFF', color: '#166534', textDecoration: 'none', fontWeight: 700, border: '1px solid #86EFAC' }}>
                  Tasbih
                </Link>
                <Link href="/calendar" style={{ fontSize: 11, padding: '3px 8px', borderRadius: 4, backgroundColor: '#FFFFFF', color: '#166534', textDecoration: 'none', fontWeight: 700, border: '1px solid #86EFAC' }}>
                  Fasting
                </Link>
              </div>
            </div>

            {/* Channel 2 */}
            <div className="amal-card-hover" style={{ padding: 14, borderRadius: 10, backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE' }}>
              <div style={{ fontSize: 20, marginBottom: 4 }}>📚</div>
              <div style={{ fontSize: 14, fontWeight: 800, color: '#1E40AF' }}>2. Ilm & Sacred Heritage</div>
              <div style={{ fontSize: 11, color: '#1D4ED8', margin: '4px 0 10px', lineHeight: 1.4 }}>
                106-Book Canonical Library ➔ Living Sirah ➔ Quran Audio ➔ Study Vault
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                <Link href="/library" style={{ fontSize: 11, padding: '3px 8px', borderRadius: 4, backgroundColor: '#FFFFFF', color: '#1E40AF', textDecoration: 'none', fontWeight: 700, border: '1px solid #93C5FD' }}>
                  Library
                </Link>
                <Link href="/sirah" style={{ fontSize: 11, padding: '3px 8px', borderRadius: 4, backgroundColor: '#FFFFFF', color: '#1E40AF', textDecoration: 'none', fontWeight: 700, border: '1px solid #93C5FD' }}>
                  Sirah
                </Link>
                <Link href="/audio" style={{ fontSize: 11, padding: '3px 8px', borderRadius: 4, backgroundColor: '#FFFFFF', color: '#1E40AF', textDecoration: 'none', fontWeight: 700, border: '1px solid #93C5FD' }}>
                  Audio
                </Link>
              </div>
            </div>

            {/* Channel 3 */}
            <div className="amal-card-hover" style={{ padding: 14, borderRadius: 10, backgroundColor: '#FEF3C7', border: '1px solid #FDE68A' }}>
              <div style={{ fontSize: 20, marginBottom: 4 }}>⚖️</div>
              <div style={{ fontSize: 14, fontWeight: 800, color: '#92400E' }}>3. Financial & Household</div>
              <div style={{ fontSize: 11, color: '#B45309', margin: '4px 0 10px', lineHeight: 1.4 }}>
                Zakat Nisab ➔ Miras Fara'id ➔ Decision Room ➔ Family Circles
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                <Link href="/calculator" style={{ fontSize: 11, padding: '3px 8px', borderRadius: 4, backgroundColor: '#FFFFFF', color: '#92400E', textDecoration: 'none', fontWeight: 700, border: '1px solid #FCD34D' }}>
                  Zakat & Miras
                </Link>
                <Link href="/decision-room" style={{ fontSize: 11, padding: '3px 8px', borderRadius: 4, backgroundColor: '#FFFFFF', color: '#92400E', textDecoration: 'none', fontWeight: 700, border: '1px solid #FCD34D' }}>
                  Decision Room
                </Link>
                <Link href="/family" style={{ fontSize: 11, padding: '3px 8px', borderRadius: 4, backgroundColor: '#FFFFFF', color: '#92400E', textDecoration: 'none', fontWeight: 700, border: '1px solid #FCD34D' }}>
                  Family OS
                </Link>
              </div>
            </div>

            {/* Channel 4 */}
            <div className="amal-card-hover" style={{ padding: 14, borderRadius: 10, backgroundColor: '#FAF5FF', border: '1px solid #E9D5FF' }}>
              <div style={{ fontSize: 20, marginBottom: 4 }}>🛤️</div>
              <div style={{ fontSize: 14, fontWeight: 800, color: '#6B21A8' }}>4. Personal Suluk Lifecycle</div>
              <div style={{ fontSize: 11, color: '#7E22CE', margin: '4px 0 10px', lineHeight: 1.4 }}>
                Niyyah Goals ➔ Compiler ➔ Journeys ➔ Muhasabah ➔ Replay
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                <Link href="/goals" style={{ fontSize: 11, padding: '3px 8px', borderRadius: 4, backgroundColor: '#FFFFFF', color: '#6B21A8', textDecoration: 'none', fontWeight: 700, border: '1px solid #D8B4FE' }}>
                  Goals
                </Link>
                <Link href="/journeys" style={{ fontSize: 11, padding: '3px 8px', borderRadius: 4, backgroundColor: '#FFFFFF', color: '#6B21A8', textDecoration: 'none', fontWeight: 700, border: '1px solid #D8B4FE' }}>
                  Journeys
                </Link>
                <Link href="/reflections" style={{ fontSize: 11, padding: '3px 8px', borderRadius: 4, backgroundColor: '#FFFFFF', color: '#6B21A8', textDecoration: 'none', fontWeight: 700, border: '1px solid #D8B4FE' }}>
                  Muhasabah
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Mode Guidance Alert (If non-standard) */}
        {currentMode !== 'STANDARD' && (
          <div style={{
            backgroundColor: '#F0FDF4',
            borderRadius: 12,
            padding: 16,
            border: '1px solid #86EFAC',
            marginBottom: 24,
          }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: '#166534', marginBottom: 4 }}>
              Active Life Dispensations & Focus ({modeProfile.modeDisplayName})
            </div>
            <p style={{ margin: '0 0 8px', fontSize: 13, color: '#14532D' }}>{modeProfile.activeGuidanceNote}</p>
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12, color: '#166534', lineHeight: 1.5 }}>
              {modeProfile.rukhasDispensations.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>
        )}

        {/* FEATURE 1: NIYYAH → AMAL COMPILER (SIGNATURE HERO) */}
        <div
          className="amal-card-hover"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 16,
            padding: 26,
            border: '1px solid #E2E8F0',
            marginBottom: 24,
            boxShadow: '0 4px 16px -2px rgba(0, 0, 0, 0.04)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 12,
                backgroundColor: '#FEF3C7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 22,
                color: '#B45309',
                flexShrink: 0,
              }}
            >
              ⭐
            </div>
            <div>
              <h2 style={{ fontSize: 19, fontWeight: 800, color: '#0F172A', margin: 0 }}>
                نیت سے عمل تک · Intention to Action
              </h2>
              <p style={{ color: '#64748B', fontSize: 13, margin: '2px 0 0' }}>
                اپنی نیک نیت درج کیجیے — نظامِ عمل اسے مستند نبوی احادیث کی روشنی میں ایک آسان، مستقل اور روزمرہ معمول میں ڈھال دے گا۔
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, marginTop: 16, marginBottom: 14 }}>
            <input
              type="text"
              value={niyyahInput}
              onChange={(e) => setNiyyahInput(e.target.value)}
              placeholder="مثلاً: والدین کے ساتھ نرم رویہ رکھنا، غصے پر قابو، یا روزانہ تلاوتِ قرآن..."
              style={{
                flex: 1,
                padding: '13px 16px',
                borderRadius: 10,
                border: '1.5px solid #CBD5E1',
                fontSize: 14,
                outline: 'none',
                color: '#0F172A',
                backgroundColor: '#F8FAFC',
                transition: 'border-color 0.2s ease',
              }}
            />
            <button
              onClick={() => handleCompileNiyyah()}
              style={{
                padding: '13px 24px',
                borderRadius: 10,
                backgroundColor: '#064E3B',
                color: '#FFFFFF',
                fontWeight: 800,
                fontSize: 13,
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 10px rgba(6, 78, 59, 0.25)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <span>عمل کا منصوبہ بنائیں ➔</span>
            </button>
          </div>

          {/* Clean Suggestion Chips without developer "Preset:" prefix */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', alignSelf: 'center', marginRight: 4 }}>
              تجویز کردہ نیتیں:
            </span>
            <button
              onClick={() => handleCompileNiyyah('Main apne walidain ke sath narm rawayya rakhna chahta hoon')}
              style={{
                fontSize: 12,
                padding: '5px 12px',
                borderRadius: 20,
                border: '1px solid #E2E8F0',
                backgroundColor: '#F8FAFC',
                color: '#334155',
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              🌿 والدین کے ساتھ حسنِ سلوک
            </button>
            <button
              onClick={() => handleCompileNiyyah('Ghusse aur impatience par control pana chahta hoon')}
              style={{
                fontSize: 12,
                padding: '5px 12px',
                borderRadius: 20,
                border: '1px solid #E2E8F0',
                backgroundColor: '#F8FAFC',
                color: '#334155',
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              🕊️ غصے پر قابو اور صبر
            </button>
            <button
              onClick={() => handleCompileNiyyah('Quran-e-Majeed ki rozana tilawat par pabandi chahta hoon')}
              style={{
                fontSize: 12,
                padding: '5px 12px',
                borderRadius: 20,
                border: '1px solid #E2E8F0',
                backgroundColor: '#F8FAFC',
                color: '#334155',
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              📖 روزانہ تلاوتِ قرآن میں استقامت
            </button>
          </div>

          {/* Compiled Output Card */}
          {compiledPlan && (
            <div style={{ marginTop: 20, padding: 20, borderRadius: 10, backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: '#047857', backgroundColor: '#ECFDF5', padding: '3px 8px', borderRadius: 4 }}>
                  COMPILED DOMAIN: {compiledPlan.spiritualDomain}
                </span>

                <button
                  onClick={() => handleOpenPassport(compiledPlan.spiritualDomain, compiledPlan.microAmal.concreteAction)}
                  style={{
                    backgroundColor: '#1B4332',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: 6,
                    padding: '6px 12px',
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  📜 Evidence Passport (Show Me Why)
                </button>
              </div>

              {/* Concrete Micro Action */}
              <div style={{ backgroundColor: '#FFFFFF', padding: 16, borderRadius: 8, border: '1px solid #86EFAC', marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 11, fontWeight: 800, color: '#166534', letterSpacing: 0.5 }}>YOUR CONCRETE MICRO-AMAL (NON-OVERWHELMING)</span>
                  <button
                    onClick={() => setShowWhyRec(!showWhyRec)}
                    style={{
                      border: '1px solid #059669',
                      backgroundColor: '#ECFDF5',
                      color: '#065F46',
                      borderRadius: 6,
                      padding: '4px 8px',
                      fontSize: 11,
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    {showWhyRec ? 'Hide Reason ▲' : 'Why This Recommendation? ▼'}
                  </button>
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#111827', margin: '6px 0 2px' }}>
                  {compiledPlan.microAmal.concreteAction}
                </div>
                <div style={{ fontSize: 12, color: '#6B7280' }}>
                  Timing: {compiledPlan.microAmal.timing} • Failsafe: {compiledPlan.microAmal.frictionFailsafe}
                </div>
              </div>

              {/* 10. WHY THIS RECOMMENDATION ENGINE (EXPLAINABLE PERSONALIZATION) */}
              {showWhyRec && recExplanation && (
                <div style={{ backgroundColor: '#F0FDF4', padding: 16, borderRadius: 8, border: '1px solid #A7F3D0', marginBottom: 14 }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: '#065F46', marginBottom: 8, textTransform: 'uppercase' }}>
                    💡 Why am I seeing this specific Amal?
                  </div>
                  <div style={{ fontSize: 12, color: '#166534', lineHeight: 1.6 }}>
                    <div>✓ <strong>Matches Goal:</strong> {recExplanation.whyIncluded.goalAlignmentRationale}</div>
                    <div>✓ <strong>Canonical Support:</strong> {recExplanation.whyIncluded.sourceCanonicalSummary}</div>
                    <div>✓ <strong>Fits Available Time:</strong> {recExplanation.whyIncluded.timeFeasibility}</div>
                    <div>✓ <strong>Current Context:</strong> {recExplanation.whyIncluded.journeyAlignment}</div>
                    <div>✓ <strong>Low Friction:</strong> {recExplanation.whyIncluded.complexityRationale}</div>
                  </div>
                  <div style={{ marginTop: 10, paddingTop: 8, borderTop: '1px dashed #A7F3D0', fontSize: 11, color: '#92400E' }}>
                    <strong>Why NOT "{recExplanation.whyNotAlternative.rejectedCandidate}"?</strong> {recExplanation.whyNotAlternative.rejectionReason}
                  </div>
                </div>
              )}

              {/* Classical Evidence Base */}
              <div style={{ marginBottom: 14, fontSize: 13, color: '#374151' }}>
                <div style={{ fontWeight: 700, color: '#111827', marginBottom: 2 }}>Evidence Grounding:</div>
                <p style={{ margin: '2px 0', fontStyle: 'italic' }}>
                  "{compiledPlan.evidenceGrounding.quranTranslation}" ({compiledPlan.evidenceGrounding.quranVerse})
                </p>
                <p style={{ margin: '2px 0', color: '#047857', fontWeight: 600 }}>
                  Hadith: {compiledPlan.evidenceGrounding.hadithMatn} [{compiledPlan.evidenceGrounding.hadithCitation}]
                </p>
              </div>

              {/* Friction Detector */}
              <div style={{ backgroundColor: '#FEF3C7', padding: 12, borderRadius: 8, border: '1px solid #FDE68A', fontSize: 12, marginBottom: 14 }}>
                <span style={{ fontWeight: 800, color: '#92400E' }}>⚠️ ANTICIPATED FRICTION & FAILURE MODE:</span>
                <div style={{ color: '#78350F', marginTop: 2 }}>
                  {compiledPlan.frictionDetector.anticipatedFailureMode}
                </div>
                <div style={{ color: '#92400E', fontWeight: 700, marginTop: 4 }}>
                  Counter-Measure: {compiledPlan.frictionDetector.counterMeasure}
                </div>
              </div>

              {/* 11. AMAL TRUST LAYER (PERMANENT THEOLOGICAL AUDIT BLOCK) */}
              {trustLayer && (
                <div style={{ backgroundColor: '#FFFFFF', padding: 14, borderRadius: 8, border: '1px solid #CBD5E1', fontSize: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: 11, fontWeight: 800, color: '#1B4332', letterSpacing: 0.5 }}>🛡️ AMAL TRUST LAYER (VERIFIED THEOLOGY)</span>
                    <span style={{ fontSize: 10, backgroundColor: '#E0F2FE', color: '#0369A1', padding: '2px 6px', borderRadius: 4, fontWeight: 700 }}>
                      Dual Jurist Protocol Active
                    </span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, color: '#334155', fontSize: 11 }}>
                    <div><strong>Evidence:</strong> {trustLayer.evidence.gradingOrIsnadQuality}</div>
                    <div><strong>Consensus:</strong> {trustLayer.interpretation.classicalConsensusLevel}</div>
                    <div><strong>Certainty:</strong> {trustLayer.uncertainty.whatIsClearAndDefinite}</div>
                    <div><strong>Traditions:</strong> {trustLayer.scholarship.participatingTraditions.join(', ')}</div>
                  </div>
                  <div style={{ marginTop: 6, fontSize: 11, color: '#64748B', fontStyle: 'italic' }}>
                    Note: {trustLayer.recommendation.cautionOrBoundary}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* FEATURE 4: PROPHETIC CONTEXT ENGINE (LIVING SIRAH) */}
        <div
          className="amal-card-hover"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 16,
            padding: 26,
            border: '1px solid #E2E8F0',
            marginBottom: 24,
            boxShadow: '0 4px 16px -2px rgba(0, 0, 0, 0.04)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 12,
                backgroundColor: '#E0F2FE',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 22,
                color: '#0284C7',
                flexShrink: 0,
              }}
            >
              🕊️
            </div>
            <div>
              <h2 style={{ fontSize: 19, fontWeight: 800, color: '#0F172A', margin: 0 }}>
                سیرتِ مبارکہ سے عملی تسکین و رہنمائی · Prophetic Life Guidance
              </h2>
              <p style={{ color: '#64748B', fontSize: 13, margin: '2px 0 0' }}>
                اپنی روزمرہ کشمکش یا پریشانی بیان کریں — سیرت النبی ﷺ سے تاریخی مماثلت اور نبوی حکمت دریافت کیجیے۔
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, marginTop: 16, marginBottom: 14 }}>
            <input
              type="text"
              value={struggleQuery}
              onChange={(e) => setStruggleQuery(e.target.value)}
              placeholder="مثلاً: دفتر یا خاندان میں ناانصافی، غم و تکلیف، یا مایوسی کا احساس..."
              style={{
                flex: 1,
                padding: '13px 16px',
                borderRadius: 10,
                border: '1.5px solid #CBD5E1',
                fontSize: 14,
                outline: 'none',
                color: '#0F172A',
                backgroundColor: '#F8FAFC',
                transition: 'border-color 0.2s ease',
              }}
            />
            <button
              onClick={handlePropheticContext}
              style={{
                padding: '13px 24px',
                borderRadius: 10,
                backgroundColor: '#064E3B',
                color: '#FFFFFF',
                fontWeight: 800,
                fontSize: 13,
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 10px rgba(6, 78, 59, 0.25)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <span>سیرت سے مماثلت تلاش کریں ➔</span>
            </button>
          </div>

          {/* Clean Suggestion Chips without developer "Preset:" prefix */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', alignSelf: 'center', marginRight: 4 }}>
              عام انسانی آزمائشیں:
            </span>
            <button
              onClick={() => {
                const s = 'Office mein mujhe unfair treatment mila aur mere kaam ka credit kisi aur ko de diya gaya.';
                setStruggleQuery(s);
                const res = signatureCapabilitiesEngine.getPropheticContext(s);
                setPropheticContext(res);
              }}
              style={{
                fontSize: 12,
                padding: '5px 12px',
                borderRadius: 20,
                border: '1px solid #E2E8F0',
                backgroundColor: '#F8FAFC',
                color: '#334155',
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              💼 محنت کا کریڈٹ چھن جانا یا ناانصافی
            </button>
            <button
              onClick={() => {
                const s = 'Kisi qareebi aziz ki wafat par shadeed gham aur sabr ka imtihan.';
                setStruggleQuery(s);
                const res = signatureCapabilitiesEngine.getPropheticContext(s);
                setPropheticContext(res);
              }}
              style={{
                fontSize: 12,
                padding: '5px 12px',
                borderRadius: 20,
                border: '1px solid #E2E8F0',
                backgroundColor: '#F8FAFC',
                color: '#334155',
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              💔 عزیز کے انتقال پر صدمہ و غم (تعزیت)
            </button>
          </div>

          {propheticContext && (
            <div style={{ marginTop: 16, padding: 18, borderRadius: 10, backgroundColor: '#F0FDF4', border: '1px solid #86EFAC' }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: '#166534', letterSpacing: 0.5 }}>
                AUTHENTIC PROPHETIC PARALLEL ({propheticContext.historicalParallel.yearHijriOrGregorian})
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 800, color: '#111827', margin: '6px 0 4px' }}>
                {propheticContext.historicalParallel.eventTitle}
              </h3>
              <p style={{ fontSize: 13, color: '#374151', margin: '4px 0 8px', lineHeight: 1.5 }}>
                {propheticContext.historicalParallel.whatActuallyHappened}
              </p>
              <div style={{ fontSize: 12, color: '#047857', fontWeight: 600, marginBottom: 10 }}>
                Prophetic Reaction: {propheticContext.historicalParallel.propheticReaction}
              </div>

              {/* Guardrail Disclaimer */}
              <div style={{ backgroundColor: '#FEF3C7', padding: 8, borderRadius: 6, fontSize: 11, color: '#92400E', fontWeight: 600, marginBottom: 10 }}>
                {propheticContext.theologicalGuardrailDisclaimer}
              </div>

              {/* Character Principle & Amal */}
              <div style={{ fontSize: 13, color: '#14532D' }}>
                <strong>Character Principle:</strong> {propheticContext.characterPrinciple.virtueName} — {propheticContext.characterPrinciple.practicalTakeaway}
              </div>
              <div style={{ marginTop: 8, fontSize: 12, color: '#166534', fontWeight: 700 }}>
                Suggested Action: {propheticContext.optionalAmalAction}
              </div>
            </div>
          )}
        </div>
          </>
        )}
      </main>

      {/* FEATURE 2: EVIDENCE PASSPORT ("SHOW ME WHY") MODAL */}
      {activePassport && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
          zIndex: 9999,
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 16,
            maxWidth: 720,
            width: '100%',
            maxHeight: '85vh',
            overflowY: 'auto',
            padding: 28,
            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, borderBottom: '1px solid #E5E7EB', paddingBottom: 12 }}>
              <div>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#047857', letterSpacing: 1 }}>EVIDENCE PASSPORT • PROOF MODE</span>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: '#1B4332', margin: '4px 0 0' }}>
                  Complete Provenance & Reasoning Chain
                </h3>
              </div>
              <button
                onClick={() => setActivePassport(null)}
                style={{ backgroundColor: '#E5E7EB', border: 'none', borderRadius: 20, width: 32, height: 32, cursor: 'pointer', fontWeight: 700 }}
              >
                ✕
              </button>
            </div>

            {/* Passport Sections */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ backgroundColor: '#F9FAFB', padding: 12, borderRadius: 8 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#6B7280' }}>WHAT WAS RECOMMENDED:</span>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#111827', marginTop: 2 }}>{activePassport.whatAmalSynthesized}</div>
              </div>

              <div>
                <span style={{ fontSize: 12, fontWeight: 800, color: '#1B4332' }}>1. PRIMARY QURAN & HADITH EVIDENCE:</span>
                {activePassport.primaryEvidence.hadithReferences.map((h, i) => (
                  <div key={i} style={{ marginTop: 4, padding: 10, borderRadius: 6, backgroundColor: '#F0FDF4', fontSize: 12 }}>
                    <div style={{ direction: 'rtl', fontSize: 14, color: '#047857', fontWeight: 700 }}>{h.arabicMatn}</div>
                    <div style={{ marginTop: 4, color: '#374151' }}>"{h.translation}"</div>
                    <div style={{ marginTop: 2, fontSize: 11, color: '#166534', fontWeight: 600 }}>
                      Source: {h.canonicalCollection} ({h.hadithNumber}) • Grade: {h.classicalGrading}
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <span style={{ fontSize: 12, fontWeight: 800, color: '#1B4332' }}>2. PHYSICAL PRINT PROVENANCE & CRITICAL EDITION:</span>
                {activePassport.provenanceAndEditions.map((p, i) => (
                  <div key={i} style={{ marginTop: 4, padding: 10, borderRadius: 6, backgroundColor: '#F9FAFB', fontSize: 12, color: '#374151' }}>
                    <div><strong>Title:</strong> {p.bookTitle} by {p.author} (d. {p.deathYearHijri} AH)</div>
                    <div><strong>Edition:</strong> {p.printEdition} ({p.publisher})</div>
                    <div><strong>Editor (Muhaqqiq):</strong> {p.muhaqqiq} • Location: {p.volumeAndPage}</div>
                    <div style={{ fontSize: 10, color: '#6B7280', marginTop: 2 }}>SHA-256 Hash: {p.sha256ProvenanceHash}</div>
                  </div>
                ))}
              </div>

              <div>
                <span style={{ fontSize: 12, fontWeight: 800, color: '#1B4332' }}>3. THE FOUR SUNNI MADHHABS POSITIONS:</span>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 4 }}>
                  <div style={{ padding: 8, borderRadius: 6, backgroundColor: '#F9FAFB', fontSize: 11 }}>
                    <strong>Hanafi:</strong> {activePassport.madhhabPositions.hanafi}
                  </div>
                  <div style={{ padding: 8, borderRadius: 6, backgroundColor: '#F9FAFB', fontSize: 11 }}>
                    <strong>Shafi'i:</strong> {activePassport.madhhabPositions.shafii}
                  </div>
                  <div style={{ padding: 8, borderRadius: 6, backgroundColor: '#F9FAFB', fontSize: 11 }}>
                    <strong>Maliki:</strong> {activePassport.madhhabPositions.maliki}
                  </div>
                  <div style={{ padding: 8, borderRadius: 6, backgroundColor: '#F9FAFB', fontSize: 11 }}>
                    <strong>Hanbali:</strong> {activePassport.madhhabPositions.hanbali}
                  </div>
                </div>
              </div>

              <div style={{ backgroundColor: '#FEF3C7', padding: 10, borderRadius: 6, fontSize: 11, color: '#92400E' }}>
                <strong>EPISTEMIC LIMITATION NOTE:</strong> {activePassport.epistemicUncertainty.whatDependsOnPersonalContext}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
