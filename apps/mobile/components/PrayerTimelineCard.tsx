import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AmalTheme } from '@amal/ui';

export interface PrayerItem {
  name: 'Fajr' | 'Sunrise' | 'Dhuhr' | 'Asr' | 'Maghrib' | 'Isha';
  time: string;
  status: 'COMPLETED' | 'CURRENT' | 'UPCOMING';
}

export interface PrayerTimelineProps {
  currentPrayer: string;
  countdown: string;
  calculationMethod?: string;
  prayers: PrayerItem[];
}

export const PrayerTimelineCard: React.FC<PrayerTimelineProps> = ({
  currentPrayer,
  countdown,
  calculationMethod = 'Muslim World League · Standard Asr',
  prayers,
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.categoryLabel}>NEXT PRAYER</Text>
      
      <View style={styles.heroRow}>
        <Text style={styles.currentName}>{currentPrayer}</Text>
        <Text style={styles.countdown}>{countdown}</Text>
      </View>
      
      <Text style={styles.methodText}>{calculationMethod}</Text>

      {/* 5-Prayer Timeline Bar */}
      <View style={styles.timelineRow}>
        {prayers.map((p, idx) => {
          const isDone = p.status === 'COMPLETED';
          const isCurrent = p.status === 'CURRENT';

          return (
            <View key={idx} style={styles.timelineItem}>
              <View
                style={[
                  styles.dot,
                  isDone && styles.dotDone,
                  isCurrent && styles.dotCurrent,
                ]}
              />
              <Text
                style={[
                  styles.prayerLabel,
                  isCurrent && styles.prayerLabelCurrent,
                ]}
              >
                {p.name}
              </Text>
              <Text style={styles.prayerTime}>{p.time}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: AmalTheme.colors.surface.cardLight,
    borderRadius: AmalTheme.radii.xl,
    padding: AmalTheme.spacing[5],
    marginBottom: AmalTheme.spacing[4],
    borderWidth: 1,
    borderColor: AmalTheme.colors.surface.borderLight,
    ...AmalTheme.shadows.card,
  },
  categoryLabel: {
    fontSize: AmalTheme.typography.sizes.xs,
    fontWeight: '800',
    letterSpacing: 1,
    color: AmalTheme.colors.primary,
    marginBottom: AmalTheme.spacing[1],
  },
  heroRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  currentName: {
    fontSize: AmalTheme.typography.sizes['3xl'],
    fontWeight: '800',
    color: AmalTheme.colors.text.primaryLight,
  },
  countdown: {
    fontSize: AmalTheme.typography.sizes.lg,
    fontWeight: '700',
    color: AmalTheme.colors.accent.terracotta,
  },
  methodText: {
    fontSize: AmalTheme.typography.sizes.xs,
    color: AmalTheme.colors.text.tertiaryLight,
    marginTop: AmalTheme.spacing[1],
    marginBottom: AmalTheme.spacing[4],
  },
  timelineRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: AmalTheme.spacing[3],
    borderTopWidth: 1,
    borderTopColor: AmalTheme.colors.surface.borderLight,
  },
  timelineItem: {
    alignItems: 'center',
    flex: 1,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: AmalTheme.colors.surface.borderLight,
    marginBottom: 6,
  },
  dotDone: {
    backgroundColor: AmalTheme.colors.primary,
  },
  dotCurrent: {
    backgroundColor: AmalTheme.colors.accent.terracotta,
    transform: [{ scale: 1.3 }],
  },
  prayerLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: AmalTheme.colors.text.secondaryLight,
  },
  prayerLabelCurrent: {
    color: AmalTheme.colors.text.primaryLight,
    fontWeight: '800',
  },
  prayerTime: {
    fontSize: 10,
    color: AmalTheme.colors.text.tertiaryLight,
    marginTop: 2,
  },
});
