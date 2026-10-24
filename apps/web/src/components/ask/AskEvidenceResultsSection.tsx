import React from 'react';
import { AmalTheme } from '@amal/ui';

interface AskEvidenceResultsSectionProps {
  results: any[] | null;
}

export const AskEvidenceResultsSection: React.FC<AskEvidenceResultsSectionProps> = ({
  results,
}) => {
  if (!results) return null;

  return (
    <section>
      <h2 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 16px' }}>
        Verified Canonical Evidence ({results.length} results)
      </h2>
      {results.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {results.map((item: any, idx: number) => (
            <div
              key={idx}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 16,
                padding: 20,
                border: `1px solid ${AmalTheme.colors.surface.borderLight}`,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 12,
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    padding: '3px 8px',
                    borderRadius: 6,
                    backgroundColor: '#E8F5E9',
                    color: '#2E7D32',
                    fontWeight: 700,
                  }}
                >
                  VERIFIED CITATION · {item.sourceType || 'CANONICAL CORPUS'}
                </span>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#666' }}>
                  Ref: {item.reference || 'Canonical'}
                </span>
              </div>

              {item.arabicText && (
                <div
                  style={{
                    fontFamily: 'serif',
                    fontSize: 20,
                    direction: 'rtl',
                    lineHeight: 1.8,
                    color: '#1A202C',
                    marginBottom: 12,
                    padding: 12,
                    backgroundColor: '#F7FAFC',
                    borderRadius: 8,
                  }}
                >
                  {item.arabicText}
                </div>
              )}

              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.6,
                  color: '#2D3748',
                  margin: '0 0 12px',
                }}
              >
                "{item.translatedText || item.translation || item.text}"
              </p>

              <div
                style={{
                  fontSize: 12,
                  color: '#718096',
                  borderTop: '1px solid #EDF2F7',
                  paddingTop: 10,
                }}
              >
                Authority Level: Tier 1/2 Primary · Provenance verified against Medina Mushaf /
                Kutub al-Sittah
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          style={{
            backgroundColor: '#FFFFFF',
            padding: 24,
            borderRadius: 12,
            textAlign: 'center',
            color: '#777',
          }}
        >
          No direct canonical evidence found for this query in the verified corpus. AMAL prefers
          honest uncertainty over fabricated answers.
        </div>
      )}
    </section>
  );
};
