import React from 'react';
import Link from 'next/link';

export interface ActiveScholarProfile {
  id: string;
  name: string;
  title: string;
}

export interface ScholarHeaderProps {
  activeScholar: ActiveScholarProfile;
  setActiveScholar: (scholar: ActiveScholarProfile) => void;
  currentTab?: 'TRIAGE' | 'ALPHA';
}

export const ScholarHeader: React.FC<ScholarHeaderProps> = ({
  activeScholar,
  setActiveScholar,
  currentTab = 'TRIAGE',
}) => {
  return (
    <header
      style={{
        borderBottom: '1px solid #1E293B',
        padding: '16px 28px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#0F172A',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: '#10B981',
              boxShadow: '0 0 10px #10B981',
            }}
          />
          <h1
            style={{
              fontSize: 16,
              fontWeight: 800,
              margin: 0,
              letterSpacing: '0.5px',
              color: '#F8FAFC',
            }}
          >
            AMAL SCHOLAR CONTROL PLANE
          </h1>
        </div>

        <span
          style={{
            fontSize: 10,
            backgroundColor: '#1E293B',
            color: '#10B981',
            border: '1px solid #065F46',
            padding: '3px 8px',
            borderRadius: 4,
            fontWeight: 700,
            letterSpacing: '0.5px',
          }}
        >
          TWO-PERSON RULE (INV_07)
        </span>

        {/* Navigation Tabs */}
        <nav style={{ display: 'flex', gap: 8, marginLeft: 16 }}>
          <Link
            href="/"
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: currentTab === 'TRIAGE' ? '#38BDF8' : '#94A3B8',
              backgroundColor: currentTab === 'TRIAGE' ? '#1E293B' : 'transparent',
              padding: '6px 14px',
              borderRadius: 6,
              textDecoration: 'none',
              transition: 'all 0.15s ease',
            }}
          >
            ⚖️ Fatwa & Quarantine Desk
          </Link>
          <Link
            href="/alpha"
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: currentTab === 'ALPHA' ? '#38BDF8' : '#94A3B8',
              backgroundColor: currentTab === 'ALPHA' ? '#1E293B' : 'transparent',
              padding: '6px 14px',
              borderRadius: 6,
              textDecoration: 'none',
              transition: 'all 0.15s ease',
            }}
          >
            📜 Corpus Alpha Verification
          </Link>
        </nav>
      </div>

      {/* Scholar Switcher */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 12, color: '#94A3B8' }}>Active Jurist:</span>
        <select
          value={activeScholar.id}
          onChange={(e) => {
            if (e.target.value === 'sch_dr_tariq_al_hashimi') {
              setActiveScholar({
                id: 'sch_dr_tariq_al_hashimi',
                name: 'Dr. Tariq Al-Hashimi',
                title: 'Senior Jurist (Comparative Fiqh)',
              });
            } else {
              setActiveScholar({
                id: 'sch_sheikh_amina_farooq',
                name: 'Ustadha Amina Farooq',
                title: 'Senior Hadith & Family Jurist',
              });
            }
          }}
          style={{
            backgroundColor: '#1E293B',
            color: '#38BDF8',
            border: '1px solid #334155',
            padding: '6px 12px',
            borderRadius: 6,
            fontSize: 13,
            fontWeight: 600,
            outline: 'none',
            cursor: 'pointer',
          }}
        >
          <option value="sch_dr_tariq_al_hashimi">Dr. Tariq Al-Hashimi (Fiqh / Usul)</option>
          <option value="sch_sheikh_amina_farooq">Ustadha Amina Farooq (Hadith / Family)</option>
        </select>
      </div>
    </header>
  );
};
