import React, { useState } from 'react';
import Head from 'next/head';
import { ScholarHeader, ActiveScholarProfile } from '../components/ScholarHeader';
import { ScholarAlphaWorkspace } from '../features/alpha/ScholarAlphaWorkspace';

export default function ScholarAlphaPage() {
  const [activeScholar, setActiveScholar] = useState<ActiveScholarProfile>({
    id: 'sch_dr_tariq_al_hashimi',
    name: 'Dr. Tariq Al-Hashimi',
    title: 'Senior Jurist (Comparative Fiqh)',
  });

  return (
    <div
      style={{
        backgroundColor: '#090D16',
        color: '#F8FAFC',
        minHeight: '100vh',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <Head>
        <title>AMAL OS — Scholar Alpha Workspace</title>
      </Head>

      <ScholarHeader
        activeScholar={activeScholar}
        setActiveScholar={setActiveScholar}
        currentTab="ALPHA"
      />

      <main style={{ maxWidth: 1400, margin: '0 auto', padding: '24px 28px 60px' }}>
        <ScholarAlphaWorkspace />
      </main>
    </div>
  );
}
