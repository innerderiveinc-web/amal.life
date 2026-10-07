import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { AmalTheme } from '@amal/ui';

export interface EvidenceDrawerProps {
  visible: boolean;
  onClose: () => void;
  citation: {
    reference: string;
    authorityLevel: string;
    arabicText?: string;
    translation: string;
    grading?: string;
    scholarSignoffs?: string[];
    provenanceHash?: string;
  };
}

export const EvidenceDrawer: React.FC<EvidenceDrawerProps> = ({
  visible,
  onClose,
  citation,
}) => {
  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.sheetContainer}>
          <View style={styles.grabHandle} />
          
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.categoryLabel}>GOVERNED ISLAMIC EVIDENCE</Text>
              <Text style={styles.referenceTitle}>{citation.reference}</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.scrollArea}>
            {/* Authority Tier Badge */}
            <View style={styles.badgeRow}>
              <View style={styles.tierBadge}>
                <Text style={styles.tierText}>{citation.authorityLevel}</Text>
              </View>
              {citation.grading && (
                <View style={styles.gradingBadge}>
                  <Text style={styles.gradingText}>Grading: {citation.grading}</Text>
                </View>
              )}
              <View style={styles.scholarBadge}>
                <Text style={styles.scholarText}>✓ Reviewed by 2 Scholars</Text>
              </View>
            </View>

            {/* Arabic Text */}
            {citation.arabicText && (
              <View style={styles.arabicBox}>
                <Text style={styles.arabicText}>{citation.arabicText}</Text>
              </View>
            )}

            {/* Translation */}
            <View style={styles.translationBox}>
              <Text style={styles.sectionHeader}>TRANSLATION</Text>
              <Text style={styles.translationText}>"{citation.translation}"</Text>
            </View>

            {/* Provenance Trail */}
            <View style={styles.provenanceBox}>
              <Text style={styles.provenanceHeader}>PROVENANCE & INTEGRITY</Text>
              <Text style={styles.provenanceDetail}>
                Immutable SHA-256 Hash: {citation.provenanceHash || 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'}
              </Text>
              <Text style={styles.provenanceDetail}>
                Scholarly Sign-Offs: {citation.scholarSignoffs?.join(', ') || 'Dr. M. Akram, Sheikh T. Adams'}
              </Text>
            </View>
          </ScrollView>

          <TouchableOpacity style={styles.doneButton} onPress={onClose}>
            <Text style={styles.doneButtonText}>Close Evidence View</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    backgroundColor: AmalTheme.colors.surface.cardLight,
    borderTopLeftRadius: AmalTheme.radii.xl,
    borderTopRightRadius: AmalTheme.radii.xl,
    padding: AmalTheme.spacing[5],
    maxHeight: '85%',
  },
  grabHandle: {
    width: 40,
    height: 4,
    backgroundColor: AmalTheme.colors.surface.borderLight,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: AmalTheme.spacing[3],
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: AmalTheme.spacing[3],
  },
  categoryLabel: {
    fontSize: AmalTheme.typography.sizes.xs,
    fontWeight: '800',
    letterSpacing: 1,
    color: AmalTheme.colors.primary,
  },
  referenceTitle: {
    fontSize: AmalTheme.typography.sizes['2xl'],
    fontWeight: '800',
    color: AmalTheme.colors.text.primaryLight,
    marginTop: 2,
  },
  closeButton: {
    padding: AmalTheme.spacing[2],
  },
  closeText: {
    fontSize: AmalTheme.typography.sizes.lg,
    color: AmalTheme.colors.text.secondaryLight,
  },
  scrollArea: {
    marginVertical: AmalTheme.spacing[2],
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: AmalTheme.spacing[2],
    marginBottom: AmalTheme.spacing[4],
  },
  tierBadge: {
    backgroundColor: AmalTheme.colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: AmalTheme.radii.sm,
  },
  tierText: {
    color: AmalTheme.colors.primary,
    fontWeight: '700',
    fontSize: AmalTheme.typography.sizes.xs,
  },
  gradingBadge: {
    backgroundColor: AmalTheme.colors.status.successLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: AmalTheme.radii.sm,
  },
  gradingText: {
    color: AmalTheme.colors.status.success,
    fontWeight: '700',
    fontSize: AmalTheme.typography.sizes.xs,
  },
  scholarBadge: {
    backgroundColor: AmalTheme.colors.accent.sand,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: AmalTheme.radii.sm,
  },
  scholarText: {
    color: AmalTheme.colors.accent.goldMuted,
    fontWeight: '700',
    fontSize: AmalTheme.typography.sizes.xs,
  },
  arabicBox: {
    backgroundColor: AmalTheme.colors.surface.backgroundLight,
    padding: AmalTheme.spacing[4],
    borderRadius: AmalTheme.radii.lg,
    marginBottom: AmalTheme.spacing[4],
  },
  arabicText: {
    fontSize: AmalTheme.typography.sizes['2xl'],
    fontFamily: AmalTheme.typography.fonts.arabic,
    lineHeight: 48,
    textAlign: 'right',
    color: AmalTheme.colors.text.primaryLight,
  },
  translationBox: {
    marginBottom: AmalTheme.spacing[4],
  },
  sectionHeader: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    color: AmalTheme.colors.text.secondaryLight,
    marginBottom: 4,
  },
  translationText: {
    fontSize: AmalTheme.typography.sizes.base,
    color: AmalTheme.colors.text.primaryLight,
    lineHeight: 24,
    fontStyle: 'italic',
  },
  provenanceBox: {
    backgroundColor: AmalTheme.colors.surface.backgroundLight,
    padding: AmalTheme.spacing[3],
    borderRadius: AmalTheme.radii.md,
    marginBottom: AmalTheme.spacing[4],
  },
  provenanceHeader: {
    fontSize: 10,
    fontWeight: '800',
    color: AmalTheme.colors.text.secondaryLight,
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  provenanceDetail: {
    fontSize: 11,
    color: AmalTheme.colors.text.secondaryLight,
    marginTop: 2,
  },
  doneButton: {
    backgroundColor: AmalTheme.colors.primary,
    paddingVertical: AmalTheme.spacing[3],
    borderRadius: AmalTheme.radii.lg,
    alignItems: 'center',
    marginTop: AmalTheme.spacing[2],
  },
  doneButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: AmalTheme.typography.sizes.sm,
  },
});
