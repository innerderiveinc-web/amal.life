import React from 'react';
import {
  CompiledAmalPlan,
  WhyRecommendationExplanation,
  AmalTrustLayer,
} from '@amal/amal-engine';

export interface NiyyahCompilerCardProps {
  niyyahInput: string;
  setNiyyahInput: (input: string) => void;
  compiledPlan: CompiledAmalPlan | null;
  showWhyRec: boolean;
  setShowWhyRec: React.Dispatch<React.SetStateAction<boolean>>;
  recExplanation: WhyRecommendationExplanation | null;
  trustLayer: AmalTrustLayer | null;
  onCompileNiyyah: (overrideInput?: string) => void;
  onOpenPassport: (topic: string, synthesis: string) => void;
}

export const NiyyahCompilerCard: React.FC<NiyyahCompilerCardProps> = ({
  niyyahInput,
  setNiyyahInput,
  compiledPlan,
  showWhyRec,
  setShowWhyRec,
  recExplanation,
  trustLayer,
  onCompileNiyyah,
  onOpenPassport,
}) => {
  return (
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
          onKeyDown={(e) => {
            if (e.key === 'Enter') onCompileNiyyah();
          }}
          placeholder="مثلاً: والدین کے ساتھ نرم رویہ رکھنا، غصے پر قابو، یا روزانہ تلاوتِ قرآن..."
          aria-label="Enter your spiritual intention"
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
          onClick={() => onCompileNiyyah()}
          aria-label="Compile Niyyah to Amal Plan"
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

      {/* Suggestion Chips */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', alignSelf: 'center', marginRight: 4 }}>
          تجویز کردہ نیتیں:
        </span>
        <button
          onClick={() => onCompileNiyyah('Main apne walidain ke sath narm rawayya rakhna chahta hoon')}
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
          onClick={() => onCompileNiyyah('Ghusse aur impatience par control pana chahta hoon')}
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
          onClick={() => onCompileNiyyah('Quran-e-Majeed ki rozana tilawat par pabandi chahta hoon')}
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
              onClick={() => onOpenPassport(compiledPlan.spiritualDomain, compiledPlan.microAmal.concreteAction)}
              aria-label="Open Evidence Passport"
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
              <span style={{ fontSize: 11, fontWeight: 800, color: '#166534', letterSpacing: 0.5 }}>
                YOUR CONCRETE MICRO-AMAL (NON-OVERWHELMING)
              </span>
              <button
                onClick={() => setShowWhyRec(!showWhyRec)}
                aria-label="Toggle Recommendation Explanation"
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

          {/* WHY THIS RECOMMENDATION ENGINE */}
          {showWhyRec && recExplanation && (
            <div style={{ backgroundColor: '#F0FDF4', padding: 16, borderRadius: 8, border: '1px solid #A7F3D0', marginBottom: 14 }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: '#064E3B', marginBottom: 8, textTransform: 'uppercase' }}>
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
                <strong>Why NOT &ldquo;{recExplanation.whyNotAlternative.rejectedCandidate}&rdquo;?</strong> {recExplanation.whyNotAlternative.rejectionReason}
              </div>
            </div>
          )}

          {/* Classical Evidence Base */}
          <div style={{ marginBottom: 14, fontSize: 13, color: '#374151' }}>
            <div style={{ fontWeight: 700, color: '#111827', marginBottom: 2 }}>Evidence Grounding:</div>
            <p style={{ margin: '2px 0', fontStyle: 'italic' }}>
              &ldquo;{compiledPlan.evidenceGrounding.quranTranslation}&rdquo; ({compiledPlan.evidenceGrounding.quranVerse})
            </p>
            <p style={{ margin: '2px 0', color: '#047857', fontWeight: 600 }}>
              Hadith: {compiledPlan.evidenceGrounding.hadithMatn} [{compiledPlan.evidenceGrounding.hadithCitation}]
            </p>
          </div>

          {/* Friction Detector */}
          <div style={{ backgroundColor: '#FEF3C7', padding: 12, borderRadius: 8, border: '1px solid #FDE68A', fontSize: 12, marginBottom: 14 }}>
            <span style={{ fontWeight: 800, color: '#92400E' }}>⚠️ ANTICIPATED FRICTION &amp; FAILURE MODE:</span>
            <div style={{ color: '#78350F', marginTop: 2 }}>
              {compiledPlan.frictionDetector.anticipatedFailureMode}
            </div>
            <div style={{ color: '#92400E', fontWeight: 700, marginTop: 4 }}>
              Counter-Measure: {compiledPlan.frictionDetector.counterMeasure}
            </div>
          </div>

          {/* AMAL TRUST LAYER */}
          {trustLayer && (
            <div style={{ backgroundColor: '#FFFFFF', padding: 14, borderRadius: 8, border: '1px solid #CBD5E1', fontSize: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#1B4332', letterSpacing: 0.5 }}>
                  🛡️ AMAL TRUST LAYER (VERIFIED THEOLOGY)
                </span>
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
  );
};
