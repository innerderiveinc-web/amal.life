import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Navigation } from '../components/Navigation';
import { AmalTheme } from '@amal/ui';

export default function Custom404() {
  return (
    <div style={{ backgroundColor: '#F8FAF9', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Head>
        <title>404 — Page Not Found | AMAL OS</title>
      </Head>
      <Navigation />

      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
        <div
          style={{
            maxWidth: 580,
            width: '100%',
            backgroundColor: '#FFFFFF',
            borderRadius: 20,
            padding: '40px 32px',
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
            border: '1px solid #E2E8F0',
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 16 }}>🕋</div>
          
          <div style={{ fontFamily: 'var(--font-arabic), serif', fontSize: 26, color: '#064E3B', marginBottom: 8, fontWeight: 700 }}>
            فَفِرُّوا إِلَى اللَّهِ
          </div>
          <div style={{ fontSize: 13, color: '#059669', fontWeight: 600, marginBottom: 20 }}>
            &ldquo;So flee to Allah...&rdquo; (Surah Adh-Dhariyat 51:50)
          </div>

          <h1 style={{ fontSize: 22, fontWeight: 800, color: '#0F172A', margin: '0 0 10px' }}>
            Page Not Found • صفحہ دستیاب نہیں ہے
          </h1>
          <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.6, margin: '0 0 28px' }}>
            The requested page does not exist or may have been relocated. You can return home or navigate directly to the primary spiritual stations below:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 10, marginBottom: 28 }}>
            <Link
              href="/"
              style={{
                padding: '12px',
                borderRadius: 12,
                backgroundColor: '#ECFDF5',
                color: '#065F46',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: 13,
                border: '1px solid #A7F3D0',
              }}
            >
              🏠 Home
            </Link>
            <Link
              href="/quran"
              style={{
                padding: '12px',
                borderRadius: 12,
                backgroundColor: '#F0FDF4',
                color: '#166534',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: 13,
                border: '1px solid #BBF7D0',
              }}
            >
              📖 Quran
            </Link>
            <Link
              href="/prayer"
              style={{
                padding: '12px',
                borderRadius: 12,
                backgroundColor: '#EFF6FF',
                color: '#1E40AF',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: 13,
                border: '1px solid #BFDBFE',
              }}
            >
              🕌 Prayer Times
            </Link>
            <Link
              href="/tasbih"
              style={{
                padding: '12px',
                borderRadius: 12,
                backgroundColor: '#FFFBEB',
                color: '#92400E',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: 13,
                border: '1px solid #FDE68A',
              }}
            >
              📿 Tasbih
            </Link>
          </div>

          <Link
            href="/"
            style={{
              display: 'inline-block',
              padding: '12px 28px',
              borderRadius: 12,
              backgroundColor: '#064E3B',
              color: '#FFFFFF',
              textDecoration: 'none',
              fontWeight: 800,
              fontSize: 14,
              boxShadow: '0 2px 8px rgba(6, 78, 59, 0.25)',
            }}
          >
            واپس ہوم پر جائیں (Back to Safety)
          </Link>
        </div>
      </main>
    </div>
  );
}
