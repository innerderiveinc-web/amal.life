import React from 'react';
import Head from 'next/head';
import { ScholarAlphaWorkspace } from '../features/alpha/ScholarAlphaWorkspace';
import { AmalTheme } from '@amal/ui';

export default function ScholarAlphaPage() {
  return (
    <div style={{ backgroundColor: AmalTheme.colors.surface.backgroundLight, minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <Head>
        <title>AMAL OS — Scholar Alpha Workspace</title>
      </Head>
      <header style={{
        backgroundColor: '#FFFFFF',
        borderBottom: `1px solid ${AmalTheme.colors.surface.borderLight}`,
        padding: '16px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 18, fontWeight: 800, color: AmalTheme.colors.primary }}>AMAL SCHOLAR OS</span>
          <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 10, backgroundColor: '#E8F5E9', color: '#2E7D32', fontWeight: 700 }}>
            ALPHA COHORT
          </span>
        </div>
        <div style={{ display: 'flex', gap: 16, fontSize: 13, fontWeight: 600 }}>
          <a href="/" style={{ color: '#666', textDecoration: 'none' }}>Case Triage</a>
          <a href="/alpha" style={{ color: AmalTheme.colors.primary, textDecoration: 'none', borderBottom: `2px solid ${AmalTheme.colors.primary}`, paddingBottom: 4 }}>
            Corpus Alpha Review
          </a>
        </div>
      </header>
      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 60px' }}>
        <ScholarAlphaWorkspace />
      </main>
    </div>
  );
}
