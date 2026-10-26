import React from 'react';
import { AmalTheme } from '@amal/ui';

interface SettingsScholarshipTabProps {
  strictSawadAlAzam: boolean;
  setStrictSawadAlAzam: (val: boolean) => void;
  dualJuristVerification: boolean;
  setDualJuristVerification: (val: boolean) => void;
  aiProvider: 'gemini' | 'openai' | 'local';
  setAiProvider: (val: 'gemini' | 'openai' | 'local') => void;
  ephemeralMemory: boolean;
  setEphemeralMemory: (val: boolean) => void;
  handleSaveStrictness: () => void;
  handlePurgeSearchCache: () => void;
}

export function SettingsScholarshipTab({
  strictSawadAlAzam,
  setStrictSawadAlAzam,
  dualJuristVerification,
  setDualJuristVerification,
  aiProvider,
  setAiProvider,
  ephemeralMemory,
  setEphemeralMemory,
  handleSaveStrictness,
  handlePurgeSearchCache,
}: SettingsScholarshipTabProps) {
  return (
    <div>
      <h2 style={{ margin: '0 0 16px', fontSize: 20, fontWeight: 800, color: '#111827' }}>
        Epistemic Grounding & Scholarly Strictness (علمی استناد و احتیاط)
      </h2>
      <p style={{ margin: '0 0 24px', fontSize: 13, color: '#6B7280', lineHeight: 1.6 }}>
        AMAL OS employs the Dual-Jurist Verification Protocol (INV_07) to strictly ground all retrieved evidence in canonical Islamic scholarship. AMAL OS is an educational research index and clerical tool, never an autonomous Mufti.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div
          style={{
            padding: 16,
            borderRadius: 10,
            backgroundColor: '#ECFDF5',
            border: '1px solid #A7F3D0',
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#065F46' }}>
                🛡️ Strict Sawad al-A'zam Epistemic Gate (Section 03.11)
              </div>
              <div style={{ fontSize: 12, color: '#047857' }}>
                Guarantees that retrieved references strictly cite peer-reviewed classical texts from the 76 canonical corpus works.
              </div>
            </div>
            <input
              type="checkbox"
              checked={strictSawadAlAzam}
              onChange={(e) => setStrictSawadAlAzam(e.target.checked)}
              style={{ width: 20, height: 20, cursor: 'pointer', accentColor: AmalTheme.colors.primary }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#065F46' }}>
                ⚖️ Dual-Jurist Consensus Gatekeeper (INV_07)
              </div>
              <div style={{ fontSize: 12, color: '#047857' }}>
                Prevents unverified statements or misattributions by cross-checking rulings strictly across classical Hanafi and Jumhur codices.
              </div>
            </div>
            <input
              type="checkbox"
              checked={dualJuristVerification}
              onChange={(e) => setDualJuristVerification(e.target.checked)}
              style={{ width: 20, height: 20, cursor: 'pointer', accentColor: AmalTheme.colors.primary }}
            />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 6 }}>
            Knowledge Retrieval Engine Provider
          </label>
          <select
            value={aiProvider}
            onChange={(e) => setAiProvider(e.target.value as ('gemini' | 'openai' | 'local'))}
            style={{
              width: '100%',
              maxWidth: 420,
              padding: '10px 12px',
              borderRadius: 8,
              border: '1px solid #D1D5DB',
              fontSize: 14,
              backgroundColor: '#F9FAFB',
            }}
          >
            <option value="gemini">Google Gemini Grounded Model (Deterministic Corpus Verification)</option>
            <option value="openai">OpenAI Strict Retrieval (Deterministic Low-Temperature)</option>
            <option value="local">Offline Classical Corpus (Zero Cloud API, 100% Local Device Storage)</option>
          </select>
        </div>

        <div
          style={{
            padding: 16,
            borderRadius: 10,
            backgroundColor: '#F9FAFB',
            border: '1px solid #E5E7EB',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#111827' }}>
              🛡️ Ephemeral Inquiry History
            </div>
            <div style={{ fontSize: 12, color: '#6B7280' }}>
              Automatically wipe search inquiries and scratch reflections after every session (Zero retention)
            </div>
          </div>
          <input
            type="checkbox"
            checked={ephemeralMemory}
            onChange={(e) => setEphemeralMemory(e.target.checked)}
            style={{ width: 20, height: 20, cursor: 'pointer', accentColor: AmalTheme.colors.primary }}
          />
        </div>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button
            onClick={handleSaveStrictness}
            style={{
              padding: '10px 22px',
              backgroundColor: AmalTheme.colors.primary,
              color: '#FFFFFF',
              border: 'none',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Save Scholarly Parameters
          </button>

          <button
            onClick={handlePurgeSearchCache}
            style={{
              padding: '10px 18px',
              backgroundColor: '#FEE2E2',
              color: '#991B1B',
              border: '1px solid #FCA5A5',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            🧹 Clear Inquiry Cache Now
          </button>
        </div>
      </div>
    </div>
  );
}
