import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { familyDeenOsEngine, FamilyCircle } from '@amal/amal-engine';

export const FamilyScreen: React.FC = () => {
  const [family, setFamily] = useState<FamilyCircle>(() => {
    return familyDeenOsEngine.getFamilyCircle('fam_demo_1');
  });

  const toggleTask = (journeyId: string, taskIdx: number) => {
    setFamily(prev => {
      const updatedJourneys = prev.sharedJourneys.map(j => {
        if (j.journeyId !== journeyId) return j;
        const updatedTasks = j.assignedTasks.map((t, idx) => {
          if (idx !== taskIdx) return t;
          return { ...t, isCompleted: !t.isCompleted };
        });
        return { ...j, assignedTasks: updatedTasks };
      });
      return { ...prev, sharedJourneys: updatedJourneys };
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>{family.familyName}</Text>
        <Text style={styles.subtitle}>{family.familyMotto}</Text>
      </View>

      {/* Privacy Guard Notice */}
      <View style={styles.privacyBanner}>
        <Text style={styles.privacyBannerTitle}>🛡️ INV_03 DOMESTIC PRIVACY WALL ACTIVE</Text>
        <Text style={styles.privacyBannerText}>
          Personal reflections, Tawbah, and private struggles remain strictly local. Only mutually opted-in Khatam juz and family deeds are shared.
        </Text>
      </View>

      {/* Circle Members */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Family Circle Members ({family.members.length})</Text>
        {family.members.map((m) => (
          <View key={m.memberId} style={styles.memberRow}>
            <View>
              <Text style={styles.memberName}>{m.name}</Text>
              <Text style={styles.memberRole}>Role: {m.role} • Joined: {m.joinedAt}</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Opted-in Shared</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Shared Journeys */}
      {family.sharedJourneys.map((j) => (
        <View key={j.journeyId} style={styles.card}>
          <Text style={styles.cardTitle}>{j.title}</Text>
          <Text style={styles.journeyDesc}>{j.description}</Text>
          <View style={styles.taskList}>
            {j.assignedTasks.map((t, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.taskCard}
                onPress={() => toggleTask(j.journeyId, idx)}
                activeOpacity={0.7}
              >
                <View style={styles.taskHeader}>
                  <Text style={styles.taskTitle}>{t.taskTitle}</Text>
                  <Text style={[styles.taskStatus, t.isCompleted ? styles.statusDone : styles.statusPending]}>
                    {t.isCompleted ? 'Completed ✓' : 'Tap to Complete'}
                  </Text>
                </View>
                <Text style={styles.taskAssignee}>
                  Assigned to: {family.members.find((m) => m.memberId === t.assignedToMemberId)?.name || t.assignedToMemberId}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}

      {/* Family Knowledge Archive */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Family Knowledge Archive</Text>
        {family.familyKnowledgeArchive.map((a, idx) => (
          <View key={idx} style={styles.archiveCard}>
            <Text style={styles.archiveTitle}>{a.rulingTitle}</Text>
            <Text style={styles.archiveSummary}>{a.verifiedScholarSummary}</Text>
            <Text style={styles.archiveDate}>Verified & Archived: {a.addedDate}</Text>
          </View>
        ))}
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
  privacyBanner: {
    backgroundColor: '#FEF3C7',
    borderWidth: 1,
    borderColor: '#FDE68A',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  privacyBannerTitle: { fontSize: 11, fontWeight: '800', color: '#92400E' },
  privacyBannerText: { fontSize: 11, color: '#78350F', marginTop: 3, lineHeight: 16 },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cardTitle: { fontSize: 15, fontWeight: '700', color: '#1B4332', marginBottom: 10 },
  memberRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  memberName: { fontSize: 14, fontWeight: '600', color: '#111827' },
  memberRole: { fontSize: 11, color: '#6B7280', marginTop: 2 },
  badge: { backgroundColor: '#E8F5E9', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  badgeText: { fontSize: 10, fontWeight: '700', color: '#2E7D32' },
  journeyDesc: { fontSize: 12, color: '#4B5563', marginBottom: 12 },
  taskList: { gap: 8 },
  taskCard: { backgroundColor: '#F9FAFB', padding: 10, borderRadius: 8, borderWidth: 1, borderColor: '#E5E7EB' },
  taskHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  taskTitle: { fontSize: 13, fontWeight: '700', color: '#1B4332', flex: 1 },
  taskStatus: { fontSize: 10, fontWeight: '700', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8 },
  statusDone: { backgroundColor: '#D1FAE5', color: '#065F46' },
  statusPending: { backgroundColor: '#FEF3C7', color: '#92400E' },
  taskAssignee: { fontSize: 11, color: '#4B5563', marginTop: 4 },
  archiveCard: { backgroundColor: '#F9FAFB', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#E5E7EB', marginBottom: 8 },
  archiveTitle: { fontSize: 13, fontWeight: '700', color: '#1B4332' },
  archiveSummary: { fontSize: 12, color: '#374151', marginTop: 4, lineHeight: 18 },
  archiveDate: { fontSize: 10, color: '#9CA3AF', marginTop: 4 },
});
