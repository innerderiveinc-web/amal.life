import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { deenReplayEngine, DeenReplayAnnualReport } from '@amal/amal-engine';

export const ReplayScreen: React.FC = () => {
  const [selectedQuarter, setSelectedQuarter] = useState<'ALL' | 'Q1' | 'Q2'>('ALL');

  const report: DeenReplayAnnualReport = useMemo(() => {
    return deenReplayEngine.generateAnnualReplay('user-mobile', 2026);
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Deen Replay (2026)</Text>
        <Text style={styles.subtitle}>{report.thematicJourneyTitle}</Text>
      </View>

      {/* Core Growth Narrative */}
      <View style={styles.narrativeCard}>
        <Text style={styles.narrativeHeader}>Core Longitudinal Narrative</Text>
        <Text style={styles.narrativeText}>{report.coreGrowthNarrative}</Text>
      </View>

      {/* Selector */}
      <View style={styles.toggleRow}>
        <TouchableOpacity
          style={[styles.toggleBtn, selectedQuarter === 'ALL' && styles.toggleBtnActive]}
          onPress={() => setSelectedQuarter('ALL')}
        >
          <Text style={[styles.toggleText, selectedQuarter === 'ALL' && styles.toggleTextActive]}>
            Annual Overview
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleBtn, selectedQuarter === 'Q1' && styles.toggleBtnActive]}
          onPress={() => setSelectedQuarter('Q1')}
        >
          <Text style={[styles.toggleText, selectedQuarter === 'Q1' && styles.toggleTextActive]}>
            Q1 Focus
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleBtn, selectedQuarter === 'Q2' && styles.toggleBtnActive]}
          onPress={() => setSelectedQuarter('Q2')}
        >
          <Text style={[styles.toggleText, selectedQuarter === 'Q2' && styles.toggleTextActive]}>
            Q2 Focus
          </Text>
        </TouchableOpacity>
      </View>

      {/* Spiritual Anchors Discovered */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Spiritual Anchors Formed</Text>
        {report.spiritualAnchorsDiscovered.map((a, i) => (
          <View key={i} style={styles.listItem}>
            <Text style={styles.bullet}>⚓</Text>
            <Text style={styles.listText}>{a}</Text>
          </View>
        ))}
      </View>

      {/* Honest Weaknesses Identified */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Honest Weaknesses (Zero Guilt)</Text>
        {report.honestWeaknessesIdentified.map((w, i) => (
          <View key={i} style={styles.listItem}>
            <Text style={styles.bullet}>⚠️</Text>
            <Text style={styles.listText}>{w}</Text>
          </View>
        ))}
      </View>

      {/* Quarters breakdown */}
      {report.quarters
        .filter((q) => selectedQuarter === 'ALL' || q.quarter === selectedQuarter)
        .map((q, idx) => (
          <View key={idx} style={styles.card}>
            <Text style={styles.cardTitle}>{q.quarter}: Niyyāt & Growth</Text>
            {q.primaryNiyyahs.map((n, i) => (
              <Text key={i} style={styles.niyyahText}>• {n}</Text>
            ))}
            <Text style={styles.subHeading}>Observed Shifts:</Text>
            {q.observedShifts.map((s, i) => (
              <Text key={i} style={styles.bodyText}>{s}</Text>
            ))}
            <Text style={styles.subHeading}>Next Milestone:</Text>
            <Text style={styles.recommendationText}>{q.nextMilestoneRecommendation}</Text>
          </View>
        ))}

      {/* Closing Spiritual Advice */}
      <View style={styles.adviceCard}>
        <Text style={styles.adviceHeader}>Closing Spiritual Counsel</Text>
        <Text style={styles.adviceText}>{report.closingSpiritualAdvice}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  content: { padding: 16, paddingBottom: 40 },
  header: { marginBottom: 16 },
  title: { fontSize: 22, fontWeight: '800', color: '#1B4332' },
  subtitle: { fontSize: 13, color: '#6B7280', marginTop: 2 },
  narrativeCard: {
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  narrativeHeader: { fontSize: 12, fontWeight: '700', color: '#166534', textTransform: 'uppercase' },
  narrativeText: { fontSize: 13, color: '#14532D', marginTop: 6, lineHeight: 20 },
  toggleRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  toggleBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
  },
  toggleBtnActive: { backgroundColor: '#1B4332' },
  toggleText: { fontSize: 11, fontWeight: '700', color: '#4B5563' },
  toggleTextActive: { color: '#FFFFFF' },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cardTitle: { fontSize: 15, fontWeight: '700', color: '#1B4332', marginBottom: 10 },
  subHeading: { fontSize: 12, fontWeight: '700', color: '#4B5563', marginTop: 10, marginBottom: 4 },
  listItem: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  bullet: { fontSize: 14 },
  listText: { fontSize: 13, color: '#374151', flex: 1 },
  niyyahText: { fontSize: 13, color: '#1F2937', marginBottom: 4 },
  bodyText: { fontSize: 12, color: '#4B5563', lineHeight: 18 },
  recommendationText: { fontSize: 12, color: '#047857', fontWeight: '600', lineHeight: 18 },
  adviceCard: {
    backgroundColor: '#064E3B',
    borderRadius: 10,
    padding: 16,
    marginTop: 8,
  },
  adviceHeader: { color: '#A7F3D0', fontSize: 12, fontWeight: '700', textTransform: 'uppercase' },
  adviceText: { color: '#FFFFFF', fontSize: 13, fontStyle: 'italic', marginTop: 6, lineHeight: 20 },
});
