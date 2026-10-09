import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Modal } from 'react-native';
import { AmalTheme } from '@amal/ui';
import {
  signatureCapabilitiesEngine,
  CompiledAmalPlan,
  EvidencePassport,
  LifeOsMode,
  LifeOsModeProfile,
  WhyRecommendationExplanation,
  AmalTrustLayer,
} from '@amal/amal-engine';

export const TodayScreen: React.FC = () => {
  const [niyyahText, setNiyyahText] = useState('Walidain ke sath narm rawayya');
  const [compiledPlan, setCompiledPlan] = useState<CompiledAmalPlan | null>(null);
  const [activePassport, setActivePassport] = useState<EvidencePassport | null>(null);
  const [showWhyRec, setShowWhyRec] = useState(false);
  const [recExplanation, setRecExplanation] = useState<WhyRecommendationExplanation | null>(null);
  const [trustLayer, setTrustLayer] = useState<AmalTrustLayer | null>(null);

  // Life OS Mode
  const [currentMode, setCurrentMode] = useState<LifeOsMode>('STANDARD');
  const [modeProfile, setModeProfile] = useState<LifeOsModeProfile>(
    signatureCapabilitiesEngine.getLifeOsProfile('STANDARD')
  );

  const handleCompile = () => {
    const plan = signatureCapabilitiesEngine.compileNiyyahToAmal({
      userId: 'usr_mobile_1',
      intentionText: niyyahText,
    });
    setCompiledPlan(plan);
    const explanation = signatureCapabilitiesEngine.explainWhyRecommendation(
      plan.microAmal.concreteAction,
      niyyahText,
      currentMode
    );
    setRecExplanation(explanation);
    const trust = signatureCapabilitiesEngine.generateAmalTrustLayer(
      plan.spiritualDomain,
      plan.microAmal.concreteAction
    );
    setTrustLayer(trust);
  };

  const handleShowPassport = (topic: string, synthesis: string) => {
    const passport = signatureCapabilitiesEngine.generateEvidencePassport(topic, synthesis);
    setActivePassport(passport);
  };

  const switchMode = (mode: LifeOsMode) => {
    setCurrentMode(mode);
    setModeProfile(signatureCapabilitiesEngine.getLifeOsProfile(mode));
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>From Niyyah to Amal.</Text>
        <Text style={styles.subGreeting}>Personal Muslim Life Intelligence</Text>
      </View>

      {/* Life OS Mode Switcher */}
      <View style={styles.modeBar}>
        <Text style={styles.modeLabel}>LIFE MODE:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.modeScroll}>
          {(['STANDARD', 'TRAVEL', 'EXAMS_WORK_CRUNCH', 'NEW_PARENT'] as const).map((m) => (
            <TouchableOpacity
              key={m}
              style={[styles.modeChip, currentMode === m && styles.modeChipActive]}
              onPress={() => switchMode(m)}
            >
              <Text style={[styles.modeChipText, currentMode === m && styles.modeChipTextActive]}>
                {m === 'STANDARD' ? 'Standard' : m === 'TRAVEL' ? '✈️ Travel' : m === 'EXAMS_WORK_CRUNCH' ? '📚 Crunch' : '👶 Parent'}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Mode Banner if non-standard */}
      {currentMode !== 'STANDARD' && (
        <View style={styles.modeBanner}>
          <Text style={styles.modeBannerTitle}>Active: {modeProfile.modeDisplayName}</Text>
          <Text style={styles.modeBannerText}>{modeProfile.activeGuidanceNote}</Text>
        </View>
      )}

      {/* 1. Niyyah → Amal Compiler Card */}
      <View style={styles.compilerCard}>
        <View style={styles.cardHeaderRow}>
          <Text style={styles.compilerBadge}>⭐ SIGNATURE CAPABILITY</Text>
        </View>
        <Text style={styles.compilerTitle}>Niyyah → Amal Compiler</Text>
        <Text style={styles.compilerSub}>Convert intention into evidence-grounded action</Text>

        <TextInput
          style={styles.compilerInput}
          value={niyyahText}
          onChangeText={setNiyyahText}
          placeholder="Apni niyat likhein (e.g. Sabr, Walidain, Quran)..."
        />

        <TouchableOpacity style={styles.compileBtn} onPress={handleCompile}>
          <Text style={styles.compileBtnText}>Compile to Micro-Amal →</Text>
        </TouchableOpacity>

        {compiledPlan && (
          <View style={styles.compiledResult}>
            <View style={styles.resultHeader}>
              <Text style={styles.resultDomain}>{compiledPlan.spiritualDomain}</Text>
              <TouchableOpacity
                style={styles.passportBtn}
                onPress={() => handleShowPassport(compiledPlan.spiritualDomain, compiledPlan.microAmal.concreteAction)}
              >
                <Text style={styles.passportBtnText}>📜 Proof Mode</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.microAmalBox}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={styles.microAmalLabel}>YOUR CONCRETE MICRO-AMAL</Text>
                <TouchableOpacity onPress={() => setShowWhyRec(!showWhyRec)}>
                  <Text style={{ fontSize: 11, fontWeight: '700', color: '#047857' }}>
                    {showWhyRec ? 'Hide Reason ▲' : 'Why This Amal? ▼'}
                  </Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.microAmalAction}>{compiledPlan.microAmal.concreteAction}</Text>
              <Text style={styles.microAmalTiming}>Timing: {compiledPlan.microAmal.timing}</Text>
            </View>

            {/* Why This Recommendation */}
            {showWhyRec && recExplanation && (
              <View style={{ backgroundColor: '#F0FDF4', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#A7F3D0', marginBottom: 10 }}>
                <Text style={{ fontSize: 11, fontWeight: '800', color: '#065F46', marginBottom: 4 }}>
                  💡 WHY THIS RECOMMENDATION?
                </Text>
                <Text style={{ fontSize: 11, color: '#166534', lineHeight: 16 }}>
                  ✓ {recExplanation.whyIncluded.goalAlignmentRationale}
                </Text>
                <Text style={{ fontSize: 11, color: '#166534', lineHeight: 16 }}>
                  ✓ {recExplanation.whyIncluded.sourceCanonicalSummary}
                </Text>
                <Text style={{ fontSize: 11, color: '#166534', lineHeight: 16 }}>
                  ✓ {recExplanation.whyIncluded.timeFeasibility}
                </Text>
                <Text style={{ fontSize: 10, color: '#92400E', marginTop: 4, fontStyle: 'italic' }}>
                  Why not 30-min heavy reading? {recExplanation.whyNotAlternative.rejectionReason}
                </Text>
              </View>
            )}

            <View style={styles.frictionBox}>
              <Text style={styles.frictionLabel}>ANTICIPATED FRICTION & FAILSAFE</Text>
              <Text style={styles.frictionText}>{compiledPlan.frictionDetector.anticipatedFailureMode}</Text>
              <Text style={styles.frictionCounter}>Failsafe: {compiledPlan.frictionDetector.counterMeasure}</Text>
            </View>

            {/* AMAL Trust Layer */}
            {trustLayer && (
              <View style={{ backgroundColor: '#FFFFFF', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#CBD5E1', marginTop: 8 }}>
                <Text style={{ fontSize: 10, fontWeight: '800', color: '#1B4332', marginBottom: 4 }}>
                  🛡️ AMAL TRUST LAYER (DUAL JURIST GOVERNED)
                </Text>
                <Text style={{ fontSize: 10, color: '#334155' }}>Evidence: {trustLayer.evidence.gradingOrIsnadQuality}</Text>
                <Text style={{ fontSize: 10, color: '#334155' }}>Consensus: {trustLayer.interpretation.classicalConsensusLevel}</Text>
                <Text style={{ fontSize: 10, color: '#334155' }}>Certainty: {trustLayer.uncertainty.whatIsClearAndDefinite}</Text>
                <Text style={{ fontSize: 9, color: '#64748B', marginTop: 3, fontStyle: 'italic' }}>
                  {trustLayer.recommendation.cautionOrBoundary}
                </Text>
              </View>
            )}
          </View>
        )}
      </View>

      {/* 2. Today's Calm Muhasabah */}
      <View style={styles.reflectionCard}>
        <Text style={styles.cardCategory}>CALM MUHASABAH (NO TAQWA SCORES)</Text>
        <Text style={styles.reflectionPrompt}>
          "Did today's actions reflect the intention in your heart, or did the world divert your focus?"
        </Text>
        <Text style={styles.reflectionNote}>
          Zero gamification · Zero spiritual ranks · Pure longitudinal reflection.
        </Text>
      </View>

      {/* Evidence Passport Modal */}
      {activePassport && (
        <Modal visible={!!activePassport} animationType="slide" transparent>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>📜 Evidence Passport</Text>
                <TouchableOpacity onPress={() => setActivePassport(null)}>
                  <Text style={styles.modalClose}>✕</Text>
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.modalBody}>
                <Text style={styles.passportLabel}>SYNTHESIS</Text>
                <Text style={styles.passportText}>{activePassport.whatAmalSynthesized}</Text>

                <Text style={styles.passportLabel}>PRIMARY EVIDENCE</Text>
                {activePassport.primaryEvidence.hadithReferences.map((h, i) => (
                  <View key={i} style={styles.evidenceItem}>
                    <Text style={styles.arabicMatn}>{h.arabicMatn}</Text>
                    <Text style={styles.evidenceTrans}>"{h.translation}"</Text>
                    <Text style={styles.evidenceSource}>{h.canonicalCollection} ({h.hadithNumber}) • {h.classicalGrading}</Text>
                  </View>
                ))}

                <Text style={styles.passportLabel}>4 MADHHAB POSITIONS</Text>
                <View style={styles.madhhabGrid}>
                  <Text style={styles.madhhabItem}><Text style={{ fontWeight: '700' }}>Hanafi:</Text> {activePassport.madhhabPositions.hanafi}</Text>
                  <Text style={styles.madhhabItem}><Text style={{ fontWeight: '700' }}>Shafi'i:</Text> {activePassport.madhhabPositions.shafii}</Text>
                  <Text style={styles.madhhabItem}><Text style={{ fontWeight: '700' }}>Maliki:</Text> {activePassport.madhhabPositions.maliki}</Text>
                  <Text style={styles.madhhabItem}><Text style={{ fontWeight: '700' }}>Hanbali:</Text> {activePassport.madhhabPositions.hanbali}</Text>
                </View>

                <Text style={styles.passportLabel}>PRINT PROVENANCE</Text>
                {activePassport.provenanceAndEditions.map((p, i) => (
                  <View key={i} style={styles.provenanceBox}>
                    <Text style={styles.provenanceText}>{p.bookTitle} by {p.author}</Text>
                    <Text style={styles.provenanceSub}>{p.printEdition} ({p.publisher})</Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  content: { padding: 16, paddingBottom: 60 },
  header: { marginBottom: 14 },
  greeting: { fontSize: 24, fontWeight: '900', color: '#1B4332' },
  subGreeting: { fontSize: 13, color: '#6B7280', marginTop: 2 },
  modeBar: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  modeLabel: { fontSize: 11, fontWeight: '800', color: '#4B5563', marginRight: 8 },
  modeScroll: { gap: 6 },
  modeChip: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 6, backgroundColor: '#E5E7EB' },
  modeChipActive: { backgroundColor: '#1B4332' },
  modeChipText: { fontSize: 11, fontWeight: '700', color: '#4B5563' },
  modeChipTextActive: { color: '#FFFFFF' },
  modeBanner: { backgroundColor: '#F0FDF4', borderRadius: 10, padding: 12, marginBottom: 14, borderWidth: 1, borderColor: '#86EFAC' },
  modeBannerTitle: { fontSize: 13, fontWeight: '800', color: '#166534' },
  modeBannerText: { fontSize: 11, color: '#14532D', marginTop: 2 },
  compilerCard: { backgroundColor: '#FFFFFF', borderRadius: 14, padding: 18, marginBottom: 14, borderWidth: 1, borderColor: '#E5E7EB' },
  cardHeaderRow: { marginBottom: 4 },
  compilerBadge: { fontSize: 10, fontWeight: '800', color: '#047857' },
  compilerTitle: { fontSize: 18, fontWeight: '800', color: '#111827' },
  compilerSub: { fontSize: 12, color: '#6B7280', marginBottom: 12 },
  compilerInput: { backgroundColor: '#F9FAFB', borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 8, padding: 10, fontSize: 14, marginBottom: 10 },
  compileBtn: { backgroundColor: '#1B4332', borderRadius: 8, padding: 12, alignItems: 'center' },
  compileBtnText: { color: '#FFFFFF', fontWeight: '800', fontSize: 13 },
  compiledResult: { marginTop: 14, paddingTop: 14, borderTopWidth: 1, borderTopColor: '#E5E7EB' },
  resultHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  resultDomain: { fontSize: 12, fontWeight: '800', color: '#047857' },
  passportBtn: { backgroundColor: '#E8F5E9', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  passportBtnText: { color: '#2E7D32', fontSize: 11, fontWeight: '700' },
  microAmalBox: { backgroundColor: '#F0FDF4', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#86EFAC', marginBottom: 8 },
  microAmalLabel: { fontSize: 10, fontWeight: '800', color: '#166534' },
  microAmalAction: { fontSize: 14, fontWeight: '700', color: '#111827', marginVertical: 4 },
  microAmalTiming: { fontSize: 11, color: '#4B5563' },
  frictionBox: { backgroundColor: '#FEF3C7', padding: 10, borderRadius: 8, borderWidth: 1, borderColor: '#FDE68A' },
  frictionLabel: { fontSize: 10, fontWeight: '800', color: '#92400E' },
  frictionText: { fontSize: 11, color: '#78350F', marginTop: 2 },
  frictionCounter: { fontSize: 11, fontWeight: '700', color: '#92400E', marginTop: 2 },
  reflectionCard: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#E5E7EB' },
  cardCategory: { fontSize: 10, fontWeight: '800', color: '#6B7280', letterSpacing: 0.5 },
  reflectionPrompt: { fontSize: 14, fontWeight: '600', color: '#111827', fontStyle: 'italic', marginVertical: 8 },
  reflectionNote: { fontSize: 11, color: '#6B7280' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#FFFFFF', borderTopLeftRadius: 18, borderTopRightRadius: 18, padding: 20, maxHeight: '80%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  modalTitle: { fontSize: 17, fontWeight: '800', color: '#1B4332' },
  modalClose: { fontSize: 18, padding: 4, fontWeight: '700' },
  modalBody: { marginBottom: 20 },
  passportLabel: { fontSize: 11, fontWeight: '800', color: '#1B4332', marginTop: 12, marginBottom: 4 },
  passportText: { fontSize: 13, color: '#374151', backgroundColor: '#F9FAFB', padding: 10, borderRadius: 6 },
  evidenceItem: { backgroundColor: '#F0FDF4', padding: 10, borderRadius: 6, marginBottom: 6 },
  arabicMatn: { fontSize: 14, color: '#047857', fontWeight: '700', textAlign: 'right' },
  evidenceTrans: { fontSize: 12, color: '#374151', marginTop: 4 },
  evidenceSource: { fontSize: 10, color: '#166534', marginTop: 2, fontWeight: '600' },
  madhhabGrid: { backgroundColor: '#F9FAFB', padding: 10, borderRadius: 6, gap: 6 },
  madhhabItem: { fontSize: 11, color: '#374151' },
  provenanceBox: { backgroundColor: '#F9FAFB', padding: 8, borderRadius: 6 },
  provenanceText: { fontSize: 11, fontWeight: '700', color: '#111827' },
  provenanceSub: { fontSize: 10, color: '#6B7280' },
});
