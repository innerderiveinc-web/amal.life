import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AmalTheme } from '@amal/ui';
import { BurdenPill } from './BurdenPill';

export interface AmalCardProps {
  id: string;
  title: string;
  description: string;
  estimatedMinutes: number;
  why: string;
  evidenceReference: string;
  isPrimary?: boolean;
  onComplete?: (level: 'FULL' | 'PARTIAL' | 'MINIMUM' | 'SKIPPED' | 'SNOOZED') => void;
  onViewEvidence?: () => void;
}

export const AmalCard: React.FC<AmalCardProps> = ({
  title,
  description,
  estimatedMinutes,
  why,
  evidenceReference,
  isPrimary = true,
  onComplete,
  onViewEvidence,
}) => {
  const [status, setStatus] = useState<'IDLE' | 'FULL' | 'PARTIAL' | 'SKIPPED' | 'SNOOZED'>('IDLE');

  const handleAction = (level: 'FULL' | 'PARTIAL' | 'MINIMUM' | 'SKIPPED' | 'SNOOZED') => {
    setStatus(level === 'MINIMUM' ? 'PARTIAL' : level);
    if (onComplete) onComplete(level);
  };

  return (
    <View style={[styles.card, isPrimary && styles.cardPrimary]}>
      <View style={styles.headerRow}>
        <Text style={styles.categoryLabel}>{isPrimary ? "TODAY'S PRIMARY AMAL" : 'OPTIONAL PRACTICE'}</Text>
        <BurdenPill minutes={estimatedMinutes} pace="Gentle" />
      </View>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>

      <View style={styles.whyBox}>
        <Text style={styles.whyLabel}>WHY AMAL RECOMMENDS THIS:</Text>
        <Text style={styles.whyText}>{why}</Text>
      </View>

      {evidenceReference && (
        <TouchableOpacity style={styles.evidenceBadge} onPress={onViewEvidence} activeOpacity={0.7}>
          <Text style={styles.evidenceIcon}>📖</Text>
          <Text style={styles.evidenceText}>Evidence: {evidenceReference}</Text>
          <Text style={styles.evidenceArrow}>→</Text>
        </TouchableOpacity>
      )}

      {status === 'IDLE' ? (
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => handleAction('FULL')}
          >
            <Text style={styles.primaryButtonText}>✓ Mark as Done</Text>
          </TouchableOpacity>

          <View style={styles.secondaryActionsRow}>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => handleAction('MINIMUM')}
            >
              <Text style={styles.secondaryButtonText}>Small / Partial Step</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => handleAction('SNOOZED')}
            >
              <Text style={styles.secondaryButtonText}>Later</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => handleAction('SKIPPED')}
            >
              <Text style={styles.secondaryButtonText}>Gently Skip</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.completedBanner}>
          <Text style={styles.completedText}>
            {status === 'FULL' && '✓ Completed with sincerity'}
            {status === 'PARTIAL' && '🌱 Every small effort counts in Islam'}
            {status === 'SNOOZED' && '⏱ Snoozed for this evening'}
            {status === 'SKIPPED' && '🌿 Skipped gently · No guilt'}
          </Text>
        </View>
      )}
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
  cardPrimary: {
    borderColor: AmalTheme.colors.primaryLight,
    borderWidth: 1.5,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: AmalTheme.spacing[2],
  },
  categoryLabel: {
    fontSize: AmalTheme.typography.sizes.xs,
    fontWeight: '800',
    letterSpacing: 1,
    color: AmalTheme.colors.primary,
  },
  title: {
    fontSize: AmalTheme.typography.sizes.xl,
    fontWeight: '800',
    color: AmalTheme.colors.text.primaryLight,
    marginTop: AmalTheme.spacing[1],
    marginBottom: AmalTheme.spacing[1],
  },
  description: {
    fontSize: AmalTheme.typography.sizes.sm,
    color: AmalTheme.colors.text.secondaryLight,
    lineHeight: 20,
    marginBottom: AmalTheme.spacing[3],
  },
  whyBox: {
    backgroundColor: AmalTheme.colors.surface.backgroundLight,
    padding: AmalTheme.spacing[3],
    borderRadius: AmalTheme.radii.md,
    marginBottom: AmalTheme.spacing[3],
  },
  whyLabel: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
    color: AmalTheme.colors.text.secondaryLight,
    marginBottom: 2,
  },
  whyText: {
    fontSize: AmalTheme.typography.sizes.xs,
    color: AmalTheme.colors.text.primaryLight,
    lineHeight: 18,
  },
  evidenceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AmalTheme.colors.accent.sand,
    paddingVertical: AmalTheme.spacing[2],
    paddingHorizontal: AmalTheme.spacing[3],
    borderRadius: AmalTheme.radii.md,
    marginBottom: AmalTheme.spacing[4],
  },
  evidenceIcon: {
    fontSize: 12,
    marginRight: 6,
  },
  evidenceText: {
    fontSize: AmalTheme.typography.sizes.xs,
    fontWeight: '600',
    color: AmalTheme.colors.text.primaryLight,
    flex: 1,
  },
  evidenceArrow: {
    fontSize: 12,
    color: AmalTheme.colors.primary,
    fontWeight: '700',
  },
  actionsContainer: {
    marginTop: AmalTheme.spacing[1],
  },
  primaryButton: {
    backgroundColor: AmalTheme.colors.primary,
    paddingVertical: AmalTheme.spacing[3],
    borderRadius: AmalTheme.radii.lg,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: AmalTheme.typography.sizes.sm,
  },
  secondaryActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: AmalTheme.spacing[2],
    gap: AmalTheme.spacing[2],
  },
  secondaryButton: {
    flex: 1,
    paddingVertical: AmalTheme.spacing[2],
    backgroundColor: AmalTheme.colors.surface.backgroundLight,
    borderRadius: AmalTheme.radii.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: AmalTheme.colors.surface.borderLight,
  },
  secondaryButtonText: {
    fontSize: AmalTheme.typography.sizes.xs,
    fontWeight: '600',
    color: AmalTheme.colors.text.secondaryLight,
  },
  completedBanner: {
    backgroundColor: AmalTheme.colors.status.successLight,
    paddingVertical: AmalTheme.spacing[3],
    paddingHorizontal: AmalTheme.spacing[3],
    borderRadius: AmalTheme.radii.md,
    alignItems: 'center',
    marginTop: AmalTheme.spacing[1],
  },
  completedText: {
    color: AmalTheme.colors.status.success,
    fontSize: AmalTheme.typography.sizes.sm,
    fontWeight: '700',
  },
});
