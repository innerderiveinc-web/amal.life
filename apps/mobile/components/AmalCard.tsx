import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AmalTheme } from '@amal/ui';
import { BurdenPill } from './BurdenPill';
import { WhyThisAmalExplanation } from '@amal/types';

export interface AmalCardProps {
  id: string;
  title: string;
  description: string;
  estimatedMinutes: number;
  minimumText?: string;
  targetText?: string;
  whyExplanation?: WhyThisAmalExplanation;
  why?: string;
  evidenceReference: string;
  isPrimary?: boolean;
  onComplete?: (level: 'FULL' | 'PARTIAL' | 'MINIMUM' | 'SKIPPED' | 'SNOOZED') => void;
  onViewEvidence?: () => void;
}

export const AmalCard: React.FC<AmalCardProps> = ({
  title,
  description,
  estimatedMinutes,
  minimumText = 'Minimum: 1 page (~5 min)',
  targetText = 'Target: 5 pages (~15 min)',
  whyExplanation,
  why = 'Fits your restart goal and current available time.',
  evidenceReference,
  isPrimary = true,
  onComplete,
  onViewEvidence,
}) => {
  const [status, setStatus] = useState<'IDLE' | 'FULL' | 'PARTIAL' | 'SKIPPED' | 'SNOOZED'>('IDLE');
  const [showWhyDrawer, setShowWhyDrawer] = useState(false);
  const [showSkipReasons, setShowSkipReasons] = useState(false);

  const handleAction = (level: 'FULL' | 'PARTIAL' | 'MINIMUM' | 'SKIPPED' | 'SNOOZED') => {
    if (level === 'SKIPPED') {
      setShowSkipReasons(true);
      return;
    }
    setStatus(level === 'MINIMUM' ? 'PARTIAL' : level);
    if (onComplete) onComplete(level);
  };

  const selectSkipReason = (reason: string) => {
    setShowSkipReasons(false);
    setStatus('SKIPPED');
    if (onComplete) onComplete('SKIPPED');
  };

  return (
    <View style={[styles.card, isPrimary && styles.cardPrimary]}>
      <View style={styles.headerRow}>
        <Text style={styles.categoryLabel}>{isPrimary ? "TODAY'S AMAL" : 'OPTIONAL SUPPORT'}</Text>
        <BurdenPill minutes={estimatedMinutes} pace="Gentle" />
      </View>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>

      {/* Minimum vs Target Micro-Indicators */}
      <View style={styles.capacityRangeBox}>
        <View style={styles.capacityCol}>
          <Text style={styles.capacityLabel}>MINIMUM</Text>
          <Text style={styles.capacityValue}>{minimumText}</Text>
        </View>
        <View style={styles.capacityDivider} />
        <View style={styles.capacityCol}>
          <Text style={styles.capacityLabel}>TARGET</Text>
          <Text style={styles.capacityValue}>{targetText}</Text>
        </View>
      </View>

      {/* Explainability Accordion: "Why this Amal?" */}
      <TouchableOpacity
        style={styles.whyToggle}
        onPress={() => setShowWhyDrawer(!showWhyDrawer)}
        activeOpacity={0.7}
      >
        <Text style={styles.whyToggleText}>
          {showWhyDrawer ? '▲ Hide why AMAL recommends this' : '▼ Why this Amal?'}
        </Text>
      </TouchableOpacity>

      {showWhyDrawer && (
        <View style={styles.whyDrawer}>
          <View style={styles.whyItem}>
            <Text style={styles.whyHeading}>Goal Fit</Text>
            <Text style={styles.whyBody}>
              {whyExplanation?.goalFit || 'Directly aligned with your goal to restart Quran practice.'}
            </Text>
          </View>
          <View style={styles.whyItem}>
            <Text style={styles.whyHeading}>Time Fit</Text>
            <Text style={styles.whyBody}>
              {whyExplanation?.timeFit || `Calibrated to your planned ${estimatedMinutes}-minute daily capacity.`}
            </Text>
          </View>
          <View style={styles.whyItem}>
            <Text style={styles.whyHeading}>Journey Fit</Text>
            <Text style={styles.whyBody}>
              {whyExplanation?.journeyFit || 'Matches the current gentle foundation phase.'}
            </Text>
          </View>
          <View style={styles.whyItem}>
            <Text style={styles.whyHeading}>Evidence Grounding</Text>
            <Text style={styles.whyBody}>
              {whyExplanation?.evidenceSummary || `Grounded in ${evidenceReference}`}
            </Text>
          </View>
          <View style={styles.whyItem}>
            <Text style={styles.whyHeading}>Personalization</Text>
            <Text style={styles.whyBody}>
              {whyExplanation?.personalization || 'Reflects your confirmed preference for calm morning habits.'}
            </Text>
          </View>
        </View>
      )}

      {evidenceReference && (
        <TouchableOpacity style={styles.evidenceBadge} onPress={onViewEvidence} activeOpacity={0.7}>
          <Text style={styles.evidenceIcon}>📖</Text>
          <Text style={styles.evidenceText}>Evidence: {evidenceReference}</Text>
          <Text style={styles.evidenceArrow}>→</Text>
        </TouchableOpacity>
      )}

      {/* Skip Reasons Sheet */}
      {showSkipReasons && (
        <View style={styles.skipReasonsBox}>
          <Text style={styles.skipPrompt}>What made it difficult today? (Optional)</Text>
          <View style={styles.skipOptionsRow}>
            {['No time', 'Low energy', 'Forgot', 'Wrong time', 'Prefer not to say'].map((r, i) => (
              <TouchableOpacity
                key={i}
                style={styles.skipOptionPill}
                onPress={() => selectSkipReason(r)}
              >
                <Text style={styles.skipOptionText}>{r}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {status === 'IDLE' && !showSkipReasons ? (
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => handleAction('FULL')}
          >
            <Text style={styles.primaryButtonText}>✓ Start / Mark as Done</Text>
          </TouchableOpacity>

          <View style={styles.secondaryActionsRow}>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => handleAction('MINIMUM')}
            >
              <Text style={styles.secondaryButtonText}>Partial / Minimum</Text>
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
        !showSkipReasons && (
          <View style={styles.completedBanner}>
            <Text style={styles.completedText}>
              {status === 'FULL' && 'Done. You completed today\'s Amal.'}
              {status === 'PARTIAL' && 'You completed part of today\'s Amal. Every small step counts.'}
              {status === 'SNOOZED' && 'Snoozed for later today.'}
              {status === 'SKIPPED' && 'Gently skipped. Ready when you are.'}
            </Text>
          </View>
        )
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
  capacityRangeBox: {
    flexDirection: 'row',
    backgroundColor: AmalTheme.colors.surface.backgroundLight,
    borderRadius: AmalTheme.radii.md,
    padding: AmalTheme.spacing[3],
    marginBottom: AmalTheme.spacing[3],
    alignItems: 'center',
  },
  capacityCol: {
    flex: 1,
  },
  capacityDivider: {
    width: 1,
    height: 24,
    backgroundColor: AmalTheme.colors.surface.borderLight,
    marginHorizontal: AmalTheme.spacing[3],
  },
  capacityLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: AmalTheme.colors.primary,
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  capacityValue: {
    fontSize: AmalTheme.typography.sizes.xs,
    color: AmalTheme.colors.text.primaryLight,
    fontWeight: '600',
  },
  whyToggle: {
    marginBottom: AmalTheme.spacing[2],
  },
  whyToggleText: {
    fontSize: AmalTheme.typography.sizes.xs,
    fontWeight: '700',
    color: AmalTheme.colors.primary,
  },
  whyDrawer: {
    backgroundColor: AmalTheme.colors.surface.backgroundLight,
    borderRadius: AmalTheme.radii.md,
    padding: AmalTheme.spacing[3],
    marginBottom: AmalTheme.spacing[3],
    gap: AmalTheme.spacing[2],
  },
  whyItem: {
    borderBottomWidth: 1,
    borderBottomColor: AmalTheme.colors.surface.borderLight,
    paddingBottom: 4,
  },
  whyHeading: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
    color: AmalTheme.colors.text.secondaryLight,
  },
  whyBody: {
    fontSize: 11,
    color: AmalTheme.colors.text.primaryLight,
    marginTop: 1,
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
  skipReasonsBox: {
    backgroundColor: AmalTheme.colors.surface.backgroundLight,
    padding: AmalTheme.spacing[3],
    borderRadius: AmalTheme.radii.md,
    marginBottom: AmalTheme.spacing[3],
  },
  skipPrompt: {
    fontSize: AmalTheme.typography.sizes.xs,
    fontWeight: '700',
    color: AmalTheme.colors.text.primaryLight,
    marginBottom: AmalTheme.spacing[2],
  },
  skipOptionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  skipOptionPill: {
    backgroundColor: AmalTheme.colors.surface.cardLight,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: AmalTheme.radii.full,
    borderWidth: 1,
    borderColor: AmalTheme.colors.surface.borderLight,
  },
  skipOptionText: {
    fontSize: 11,
    color: AmalTheme.colors.text.secondaryLight,
    fontWeight: '600',
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
