import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput } from 'react-native';
import { AmalTheme } from '@amal/ui';

export interface ScholarTriageModalProps {
  visible: boolean;
  onClose: () => void;
  caseCategory?: string;
  initialQuery?: string;
  onSubmitCase?: (details: { query: string; notes: string }) => void;
}

export const ScholarTriageModal: React.FC<ScholarTriageModalProps> = ({
  visible,
  onClose,
  caseCategory = 'Personal Fiqh & Legal Ruling',
  initialQuery = '',
  onSubmitCase,
}) => {
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    if (onSubmitCase) {
      onSubmitCase({ query: initialQuery, notes: additionalNotes });
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.container}>
          <View style={styles.badgeRow}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>HUMAN SCHOLAR REQUIRED</Text>
            </View>
          </View>

          <Text style={styles.title}>This question requires qualified scholarly judgment</Text>
          <Text style={styles.body}>
            Under Islamic governance and AMAL’s safety rules, AI models do not issue personalized
            fatwas, divorce rulings, or formal legal decrees.
          </Text>

          <View style={styles.categoryBox}>
            <Text style={styles.categoryLabel}>DETECTED SENSITIVE DOMAIN</Text>
            <Text style={styles.categoryVal}>{caseCategory}</Text>
          </View>

          <View style={styles.consentBreakdownBox}>
            <View style={styles.consentItem}>
              <Text style={styles.consentHeading}>What will be shared:</Text>
              <Text style={styles.consentText}>• Your specific question and relevant factual context</Text>
            </View>
            <View style={styles.consentItem}>
              <Text style={styles.consentHeading}>What won't be shared:</Text>
              <Text style={styles.consentText}>• Unrelated private reflections and personal journals remain strictly isolated</Text>
            </View>
          </View>

          {!submitted ? (
            <>
              <Text style={styles.promptLabel}>
                Add relevant context or background for the resident scholar:
              </Text>
              <TextInput
                style={styles.textInput}
                placeholder="Include any specific details or conditions..."
                placeholderTextColor={AmalTheme.colors.text.tertiaryLight}
                value={additionalNotes}
                onChangeText={setAdditionalNotes}
                multiline
              />

              <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Submit to Scholar Desk Queue</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.cancelButtonText}>Cancel & Browse General Evidence</Text>
              </TouchableOpacity>
            </>
          ) : (
            <View style={styles.successBox}>
              <Text style={styles.successTitle}>✓ Case Confidentially Queued</Text>
              <Text style={styles.successBody}>
                Your inquiry has been assigned Case #SCH-8421. A qualified jurist will review the
                matter and respond privately.
              </Text>
              <TouchableOpacity style={styles.submitButton} onPress={onClose}>
                <Text style={styles.submitButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    padding: AmalTheme.spacing[4],
  },
  container: {
    backgroundColor: AmalTheme.colors.surface.cardLight,
    borderRadius: AmalTheme.radii.xl,
    padding: AmalTheme.spacing[5],
    ...AmalTheme.shadows.card,
  },
  badgeRow: {
    marginBottom: AmalTheme.spacing[3],
  },
  badge: {
    backgroundColor: AmalTheme.colors.accent.terracottaLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: AmalTheme.radii.sm,
    alignSelf: 'flex-start',
  },
  badgeText: {
    color: AmalTheme.colors.accent.terracotta,
    fontWeight: '800',
    fontSize: AmalTheme.typography.sizes.xs,
    letterSpacing: 0.5,
  },
  title: {
    fontSize: AmalTheme.typography.sizes.lg,
    fontWeight: '800',
    color: AmalTheme.colors.text.primaryLight,
    lineHeight: 24,
    marginBottom: AmalTheme.spacing[2],
  },
  body: {
    fontSize: AmalTheme.typography.sizes.xs,
    color: AmalTheme.colors.text.secondaryLight,
    lineHeight: 18,
    marginBottom: AmalTheme.spacing[3],
  },
  categoryBox: {
    backgroundColor: AmalTheme.colors.surface.backgroundLight,
    padding: AmalTheme.spacing[3],
    borderRadius: AmalTheme.radii.md,
    marginBottom: AmalTheme.spacing[4],
  },
  categoryLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: AmalTheme.colors.text.secondaryLight,
    letterSpacing: 0.8,
  },
  categoryVal: {
    fontSize: AmalTheme.typography.sizes.sm,
    fontWeight: '700',
    color: AmalTheme.colors.text.primaryLight,
    marginTop: 2,
  },
  promptLabel: {
    fontSize: AmalTheme.typography.sizes.xs,
    fontWeight: '700',
    color: AmalTheme.colors.text.primaryLight,
    marginBottom: AmalTheme.spacing[1],
  },
  textInput: {
    backgroundColor: AmalTheme.colors.surface.backgroundLight,
    borderRadius: AmalTheme.radii.md,
    padding: AmalTheme.spacing[3],
    fontSize: AmalTheme.typography.sizes.xs,
    color: AmalTheme.colors.text.primaryLight,
    minHeight: 64,
    borderWidth: 1,
    borderColor: AmalTheme.colors.surface.borderLight,
    textAlignVertical: 'top',
    marginBottom: AmalTheme.spacing[4],
  },
  submitButton: {
    backgroundColor: AmalTheme.colors.primary,
    paddingVertical: AmalTheme.spacing[3],
    borderRadius: AmalTheme.radii.lg,
    alignItems: 'center',
    marginBottom: AmalTheme.spacing[2],
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: AmalTheme.typography.sizes.sm,
  },
  cancelButton: {
    paddingVertical: AmalTheme.spacing[2],
    alignItems: 'center',
  },
  cancelButtonText: {
    color: AmalTheme.colors.text.secondaryLight,
    fontSize: AmalTheme.typography.sizes.xs,
    fontWeight: '600',
  },
  successBox: {
    backgroundColor: AmalTheme.colors.status.successLight,
    padding: AmalTheme.spacing[4],
    borderRadius: AmalTheme.radii.md,
    marginVertical: AmalTheme.spacing[2],
  },
  successTitle: {
    fontSize: AmalTheme.typography.sizes.sm,
    fontWeight: '800',
    color: AmalTheme.colors.status.success,
    marginBottom: 4,
  },
  successBody: {
    fontSize: AmalTheme.typography.sizes.xs,
    color: AmalTheme.colors.text.primaryLight,
    lineHeight: 18,
    marginBottom: AmalTheme.spacing[3],
  },
  consentBreakdownBox: {
    backgroundColor: AmalTheme.colors.surface.backgroundLight,
    padding: AmalTheme.spacing[3],
    borderRadius: AmalTheme.radii.md,
    marginBottom: AmalTheme.spacing[3],
    gap: 4,
  },
  consentItem: {
    marginBottom: 2,
  },
  consentHeading: {
    fontSize: 10,
    fontWeight: '800',
    color: AmalTheme.colors.primary,
    letterSpacing: 0.5,
  },
  consentText: {
    fontSize: 11,
    color: AmalTheme.colors.text.secondaryLight,
    lineHeight: 16,
  },
});
