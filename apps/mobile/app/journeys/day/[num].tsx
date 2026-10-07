import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { AmalTheme } from '@amal/ui';

export default function JourneyDayWorkspaceScreen() {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const toggleStep = (stepIdx: number) => {
    setCompletedSteps((prev) =>
      prev.includes(stepIdx) ? prev.filter((i) => i !== stepIdx) : [...prev, stepIdx]
    );
  };

  const dayTasks = [
    { title: 'Read 2 Selected Ayat of Surah al-Isra', duration: '5 min', desc: 'Focus on ayah 17:78 regarding dawn prayer contemplation.' },
    { title: 'Evening Phone Displacement', duration: '5 min', desc: 'Plug your device outside your sleeping zone 30 mins before sleep.' },
    { title: 'Sleep with Wudu & Ayat al-Kursi', duration: '2 min', desc: 'Renew your intention to stand for Fajr tomorrow morning.' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.categoryLabel}>DAY WORKSPACE</Text>
      <Text style={styles.title}>Day 4 — Removing Friction</Text>
      <Text style={styles.subtitle}>
        Micro-actions tailored to your evening routine without exhausting your cognitive energy.
      </Text>

      <View style={styles.taskList}>
        {dayTasks.map((t, idx) => {
          const isDone = completedSteps.includes(idx);
          return (
            <TouchableOpacity
              key={idx}
              style={[styles.taskCard, isDone && styles.taskCardDone]}
              onPress={() => toggleStep(idx)}
              activeOpacity={0.7}
            >
              <View style={[styles.checkCircle, isDone && styles.checkCircleDone]}>
                {isDone && <Text style={styles.checkMark}>✓</Text>}
              </View>
              <View style={styles.taskInfo}>
                <View style={styles.taskHeader}>
                  <Text style={[styles.taskTitle, isDone && styles.taskTitleDone]}>{t.title}</Text>
                  <Text style={styles.taskDuration}>{t.duration}</Text>
                </View>
                <Text style={styles.taskDesc}>{t.desc}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.reflectionPromptBox}>
        <Text style={styles.reflectionLabel}>CHECK-IN PROMPT</Text>
        <Text style={styles.reflectionText}>
          "Did keeping your phone away yesterday make waking up feel slightly more manageable?"
        </Text>
      </View>

      <TouchableOpacity style={styles.finishBtn}>
        <Text style={styles.finishBtnText}>
          {completedSteps.length === dayTasks.length
            ? '✓ Day 4 Completed with Sincerity'
            : 'Save Progress & Continue'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AmalTheme.colors.surface.backgroundLight,
  },
  content: {
    padding: AmalTheme.spacing[5],
    paddingTop: AmalTheme.spacing[10],
  },
  categoryLabel: {
    fontSize: AmalTheme.typography.sizes.xs,
    fontWeight: '800',
    letterSpacing: 1,
    color: AmalTheme.colors.primary,
    marginBottom: 2,
  },
  title: {
    fontSize: AmalTheme.typography.sizes['2xl'],
    fontWeight: '800',
    color: AmalTheme.colors.text.primaryLight,
  },
  subtitle: {
    fontSize: AmalTheme.typography.sizes.xs,
    color: AmalTheme.colors.text.secondaryLight,
    lineHeight: 18,
    marginTop: 4,
    marginBottom: AmalTheme.spacing[5],
  },
  taskList: {
    gap: AmalTheme.spacing[3],
    marginBottom: AmalTheme.spacing[5],
  },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: AmalTheme.colors.surface.cardLight,
    padding: AmalTheme.spacing[4],
    borderRadius: AmalTheme.radii.lg,
    borderWidth: 1,
    borderColor: AmalTheme.colors.surface.borderLight,
  },
  taskCardDone: {
    backgroundColor: AmalTheme.colors.surface.backgroundLight,
    borderColor: AmalTheme.colors.status.successLight,
  },
  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: AmalTheme.colors.surface.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: AmalTheme.spacing[3],
    marginTop: 2,
  },
  checkCircleDone: {
    backgroundColor: AmalTheme.colors.primary,
    borderColor: AmalTheme.colors.primary,
  },
  checkMark: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  taskInfo: {
    flex: 1,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  taskTitle: {
    fontSize: AmalTheme.typography.sizes.sm,
    fontWeight: '700',
    color: AmalTheme.colors.text.primaryLight,
    flex: 1,
    marginRight: 8,
  },
  taskTitleDone: {
    color: AmalTheme.colors.text.secondaryLight,
    textDecorationLine: 'line-through',
  },
  taskDuration: {
    fontSize: 11,
    color: AmalTheme.colors.primary,
    fontWeight: '700',
  },
  taskDesc: {
    fontSize: AmalTheme.typography.sizes.xs,
    color: AmalTheme.colors.text.secondaryLight,
    marginTop: 4,
    lineHeight: 16,
  },
  reflectionPromptBox: {
    backgroundColor: AmalTheme.colors.accent.sand,
    padding: AmalTheme.spacing[4],
    borderRadius: AmalTheme.radii.lg,
    marginBottom: AmalTheme.spacing[5],
  },
  reflectionLabel: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    color: AmalTheme.colors.primary,
    marginBottom: 4,
  },
  reflectionText: {
    fontSize: AmalTheme.typography.sizes.xs,
    color: AmalTheme.colors.text.primaryLight,
    fontStyle: 'italic',
    lineHeight: 18,
  },
  finishBtn: {
    backgroundColor: AmalTheme.colors.primary,
    paddingVertical: AmalTheme.spacing[4],
    borderRadius: AmalTheme.radii.lg,
    alignItems: 'center',
    marginBottom: AmalTheme.spacing[8],
  },
  finishBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: AmalTheme.typography.sizes.base,
  },
});
