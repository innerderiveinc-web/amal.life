import React from 'react';

export interface ActiveScholarProfile {
  id: string;
  name: string;
  title: string;
}

export interface ScholarHeaderProps {
  activeScholar: ActiveScholarProfile;
  setActiveScholar: (scholar: ActiveScholarProfile) => void;
}

export const ScholarHeader: React.FC<ScholarHeaderProps> = ({
  activeScholar,
  setActiveScholar,
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
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            backgroundColor: '#10B981',
            boxShadow: '0 0 10px #10B981',
          }}
        />
        <h1
          style={{
            fontSize: 18,
            fontWeight: 800,
            margin: 0,
            letterSpacing: '0.5px',
            color: '#F8FAFC',
          }}
        >
          AMAL OS — SCHOLARLY GOVERNANCE CONTROL PLANE
        </h1>
        <span
          style={{
            fontSize: 11,
            backgroundColor: '#1E293B',
            color: '#94A3B8',
            padding: '3px 8px',
            borderRadius: 4,
            fontWeight: 600,
          }}
        >
          TWO-PERSON RULE ENFORCED
        </span>
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
          }}
        >
          <option value="sch_dr_tariq_al_hashimi">Dr. Tariq Al-Hashimi (Fiqh / Usul)</option>
          <option value="sch_sheikh_amina_farooq">Ustadha Amina Farooq (Hadith / Family)</option>
        </select>
      </div>
    </header>
  );
};
