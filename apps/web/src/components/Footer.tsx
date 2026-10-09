import React from 'react';
import Link from 'next/link';
import { AmalTheme } from '@amal/ui';

export const Footer: React.FC = () => {
  return (
    <footer style={{
      backgroundColor: '#0F291E',
      color: '#E5E7EB',
      marginTop: 'auto',
      borderTop: '4px solid #1B4332',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    }}>
      {/* Top Theological Trust Banner */}
      <div style={{
        backgroundColor: '#0A1E16',
        padding: '20px 24px',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ fontSize: 28 }}>🕌</span>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 15, fontWeight: 800, color: '#A7F3D0', letterSpacing: 0.5 }}>
                  اہلسنت والجماعت (السواد الأعظم) · AHL AL-SUNNAH HERITAGE
                </span>
                <span style={{
                  fontSize: 10,
                  backgroundColor: 'rgba(52, 211, 153, 0.2)',
                  color: '#6EE7B7',
                  padding: '3px 10px',
                  borderRadius: 12,
                  fontWeight: 700,
                  letterSpacing: 0.5,
                  textTransform: 'uppercase',
                }}>
                  VERIFIED CANON
                </span>
              </div>
              <p style={{ margin: '4px 0 0', fontSize: 12, color: '#9CA3AF', lineHeight: 1.5 }}>
                Ahl al-Sunnah wal-Jama'ah (Sawad al-A'zam) · 106 Classical Masterworks across the 4 Sunni Madhhabs
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 12,
              color: '#34D399',
              backgroundColor: 'rgba(6, 78, 59, 0.5)',
              padding: '6px 14px',
              borderRadius: 20,
              border: '1px solid rgba(52, 211, 153, 0.3)',
            }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#10B981', display: 'inline-block' }}></span>
              <span>24 Local Engines 100% Operational</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main 4-Column Navigation Sitemap */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px 36px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 36,
          marginBottom: 40,
        }}>
          {/* Column 1: Ibadat & Daily Practice */}
          <div>
            <h4 style={{
              fontSize: 14,
              fontWeight: 800,
              color: '#6EE7B7',
              textTransform: 'uppercase',
              letterSpacing: 1,
              marginBottom: 16,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}>
              <span>🕋</span> عبادات و روزمرہ معمولات
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <li>
                <Link href="/prayer" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13, transition: 'color 0.2s' }}>
                  Auqat-e-Namaz & Qibla Compass
                </Link>
              </li>
              <li>
                <Link href="/tasbih" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
                  Digital Masnoon Tasbih (7 Presets)
                </Link>
              </li>
              <li>
                <Link href="/calendar" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
                  Hijri Calendar & Sunnah Fasting
                </Link>
              </li>
              <li>
                <Link href="/tajweed" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
                  Tajweed & Makharij Interactive Audio
                </Link>
              </li>
              <li>
                <Link href="/hajj" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
                  Hajj & Umrah Step-by-Step Guide
                </Link>
              </li>
              <li>
                <Link href="/reflections" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
                  Evening Muhasabah (Private Vault)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Ilm & Heritage */}
          <div>
            <h4 style={{
              fontSize: 14,
              fontWeight: 800,
              color: '#6EE7B7',
              textTransform: 'uppercase',
              letterSpacing: 1,
              marginBottom: 16,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}>
              <span>📚</span> علم و سیرتِ نبوی ﷺ
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <li>
                <Link href="/library" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
                  106-Book Canonical Masterworks
                </Link>
              </li>
              <li>
                <Link href="/sirah" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
                  Living Sirah Timeline & Shama'il
                </Link>
              </li>
              <li>
                <Link href="/audio" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
                  Quran Recitations (4 Master Qurra)
                </Link>
              </li>
              <li>
                <Link href="/vault" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
                  Knowledge Vault (Khutbah Notes)
                </Link>
              </li>
              <li>
                <Link href="/goals" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
                  Deen Intentional Goals (Niyyah)
                </Link>
              </li>
              <li>
                <Link href="/journeys" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
                  Structured Journeys (Suluk & Routine)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Fiqh & Household */}
          <div>
            <h4 style={{
              fontSize: 14,
              fontWeight: 800,
              color: '#6EE7B7',
              textTransform: 'uppercase',
              letterSpacing: 1,
              marginBottom: 16,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}>
              <span>⚖️</span> فقہی احکام و خاندانی نظام
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <li>
                <Link href="/calculator" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
                  Zakat Nisab & Asset Calculator
                </Link>
              </li>
              <li>
                <Link href="/calculator" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
                  Miras (Fara'id) Quranic Shares
                </Link>
              </li>
              <li>
                <Link href="/decision-room" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
                  Deen Decision Room (Mufti Packet)
                </Link>
              </li>
              <li>
                <Link href="/family" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
                  Family Deen OS (Circles & Habits)
                </Link>
              </li>
              <li>
                <Link href="/replay" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
                  Deen Replay (Calm Spiritual Review)
                </Link>
              </li>
              <li>
                <Link href="/ask" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
                  Ask AMAL (Grounded AI Guidance)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Sovereign Trust & Privacy */}
          <div>
            <h4 style={{
              fontSize: 14,
              fontWeight: 800,
              color: '#6EE7B7',
              textTransform: 'uppercase',
              letterSpacing: 1,
              marginBottom: 16,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}>
              <span>🛡️</span> تحفظ، امانت و خودمختاری
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <li>
                <Link href="/privacy" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
                  Privacy Policy & Zero-Ad Pledge
                </Link>
              </li>
              <li>
                <Link href="/terms" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
                  Terms of Service & Shar'i Adab
                </Link>
              </li>
              <li>
                <Link href="/copyright" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
                  Copyright, Waqf & Attribution
                </Link>
              </li>
              <li>
                <Link href="/privacy" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
                  Family Domestic Privacy Vault
                </Link>
              </li>
              <li>
                <Link href="/privacy" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
                  Full Sovereign Data Export (.json)
                </Link>
              </li>
              <li>
                <span style={{ color: '#9CA3AF', fontSize: 13 }}>
                  Calm Deen: No Guilt Streaks or Piety Scoring
                </span>
              </li>
              <li>
                <button
                  onClick={() => {
                    if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('amal-open-onboarding'));
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    color: '#34D399',
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  🧭 Personalize Preferences (Setup)
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Epistemic Non-Invented Invariant Disclaimer */}
        <div style={{
          backgroundColor: 'rgba(0,0,0,0.25)',
          padding: '16px 20px',
          borderRadius: 10,
          border: '1px solid rgba(255,255,255,0.06)',
          fontSize: 12,
          color: '#9CA3AF',
          lineHeight: 1.6,
          marginBottom: 32,
        }}>
          <strong style={{ color: '#E5E7EB' }}>Shar'i Non-Fatwa Disclaimer:</strong> AMAL OS is an educational habit, knowledge contemplation, and lifestyle intelligence system. It strictly enforces the Dual Jurist Governance Protocol and does NOT issue autonomous binding fatwas or replace certified Muftis. Personal disputes, divorce (Talaq), and inheritance conflicts must be presented to verified human scholars.
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          paddingTop: 24,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16,
          fontSize: 12,
          color: '#9CA3AF',
        }}>
          <div>
            <span style={{ fontWeight: 800, color: '#F9FAFB' }}>© 2026 AMAL OS Project.</span> All Rights Reserved.
            <span style={{ margin: '0 8px' }}>•</span>
            نظام عمل برائے حیاتِ مسلم · Sadaqah Jariyah Lil-Ummah
          </div>

          <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
            <Link href="/terms" style={{ color: '#D1D5DB', textDecoration: 'none' }}>
              Terms of Service
            </Link>
            <span>•</span>
            <Link href="/privacy" style={{ color: '#34D399', textDecoration: 'none', fontWeight: 600 }}>
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/copyright" style={{ color: '#D1D5DB', textDecoration: 'none' }}>
              Copyright & Waqf
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
