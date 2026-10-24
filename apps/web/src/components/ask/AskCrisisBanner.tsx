import React from 'react';
import { SafetyClassification } from '../../lib/safety';

interface AskCrisisBannerProps {
  safetyResult: SafetyClassification;
}

export const AskCrisisBanner: React.FC<AskCrisisBannerProps> = ({ safetyResult }) => {
  return (
    <div
      style={{
        backgroundColor: '#FEF2F2',
        border: '2px solid #EF4444',
        borderRadius: 16,
        padding: 24,
        marginBottom: 24,
        color: '#991B1B',
        boxShadow: '0 10px 15px -3px rgba(239, 68, 68, 0.1)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
        <span style={{ fontSize: 26 }}>🤲</span>
        <div>
          <h3 style={{ fontSize: 20, fontWeight: 800, margin: 0, color: '#B91C1C' }}>
            آپ تنہا نہیں ہیں — اللہ تعالیٰ کی رحمت ہر شے پر وسیع ہے
          </h3>
          <div style={{ fontSize: 13, color: '#7F1D1D', fontWeight: 600 }}>
            Immediate Crisis &amp; Emotional Safety Protocol (Class E Intercept)
          </div>
        </div>
      </div>

      {/* Sacred Ayah of Hope */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 12,
          padding: 16,
          border: '1px solid #FCA5A5',
          marginBottom: 16,
          textAlign: 'right',
          direction: 'rtl',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-arabic), serif',
            fontSize: 20,
            lineHeight: 2,
            color: '#1B4332',
            fontWeight: 700,
          }}
        >
          ﴿قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَىٰ أَنْفُسِهِمْ لَا تَقْنَطُوا مِنْ رَحْمَةِ اللَّهِ ۚ
          إِنَّ اللَّهَ يَغْفِرُ الذُّنُوبَ جَمِيعًا﴾
        </div>
        <div
          style={{
            fontSize: 13,
            color: '#4B5563',
            direction: 'ltr',
            textAlign: 'left',
            marginTop: 8,
          }}
        >
          "Say: O My servants who have transgressed against themselves, despair not of the mercy of
          Allah. Indeed, Allah forgives all sins." [Surah Az-Zumar: 53]
        </div>
      </div>

      <p style={{ fontSize: 14, lineHeight: 1.6, margin: '0 0 16px', color: '#7F1D1D' }}>
        Your life, your safety, and your heart are sacred trusts (Amanah). No machine can replace
        human care, compassionate counseling, and immediate professional support. Please reach out
        right now to caring people who are ready to listen:
      </p>

      {/* Helplines Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
        {safetyResult.crisisHelplines?.map((line, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: '#FFFFFF',
              padding: 14,
              borderRadius: 10,
              border: '1px solid #FECACA',
            }}
          >
            <div style={{ fontWeight: 800, fontSize: 14, color: '#991B1B' }}>{line.name}</div>
            <div style={{ fontSize: 11, color: '#6B7280', margin: '2px 0 6px' }}>
              {line.region}
            </div>
            <div style={{ fontSize: 15, fontWeight: 800, color: '#1B4332' }}>{line.contact}</div>
            <div style={{ fontSize: 11, color: '#4B5563', marginTop: 4 }}>{line.description}</div>
          </div>
        ))}
      </div>

      <div style={{ fontSize: 12, color: '#7F1D1D', fontWeight: 600 }}>
        ⚠️ If you are in immediate physical danger, please call your local emergency services (911 /
        999 / 112) immediately.
      </div>
    </div>
  );
};
