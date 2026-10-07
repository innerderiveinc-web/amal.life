import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { AmalTheme } from '@amal/ui';
import { AIResponseContract } from '@amal/types';

export const AskAmalScreen: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<AIResponseContract | null>({
    intent: 'FAJR_STRUGGLE',
    answer:
      'Waking up for Fajr begins with your evening habits. The Prophet (peace be upon him) emphasized both the spiritual blessings of dawn and practical bedtime discipline.',
    type: 'PRACTICAL_GUIDANCE',
    sources: [
      {
        passageId: 'pass-quran-17-78',
        sourceTitle: 'The Holy Qur\'an',
        reference: 'Quran 17:78',
        authorityLevel: 'TIER_1_QURAN',
        translation: 'Indeed, the recitation of dawn is ever witnessed.',
        relevanceScore: 0.98,
      },
      {
        passageId: 'pass-muslim-657',
        sourceTitle: 'Sahih Muslim',
        reference: 'Sahih Muslim 657',
        authorityLevel: 'TIER_2_AUTHENTIC_HADITH',
        translation: 'Whoever prays the dawn prayer is under the protection and covenant of Allah.',
        grading: 'SAHIH',
        relevanceScore: 0.96,
      },
    ],
    interpretation:
      'Establishing an intentional evening wind-down removes physical friction, allowing your intention (Niyyah) to become reliable action.',
    actions: [
      {
        title: 'Establish Evening Wind-Down at Isha',
        description: 'Pray Isha, silence digital devices 45 mins before sleep, and place phone across the room.',
        estimatedMinutes: 10,
        category: 'WORSHIP',
        evidenceReference: 'Sahih al-Bukhari 568',
        feasibilityScore: 0.95,
      },
    ],
    uncertainty: 'LOW',
    scholar_required: false,
    citations_verified: true,
    disclaimer: 'For educational purposes and spiritual habits. Not an independent personalized fatwa.',
  });

  const handleAsk = () => {
    if (!query.trim()) return;
    setLoading(true);
    // Simulated intelligent response adhering to AI response contract
    setTimeout(() => {
      setLoading(false);
      if (query.toLowerCase().includes('divorce') || query.toLowerCase().includes('talaq')) {
        setResponse({
          intent: 'PERSONALIZED_FIQH',
          answer:
            'This situation involves specific marital circumstances and legal determination (Fiqh). Under Islamic principles and AMAL’s safety framework, AI does not issue personalized fatwas. A structured case has been prepared for qualified scholar review.',
          type: 'ESCALATION_REQUIRED',
          sources: [],
          interpretation: 'Personal marital rulings require direct pastoral context with verified scholars.',
          actions: [
            {
              title: 'Review Scholar Case Triage',
              description: 'Case #case-9021 is queued for confidential scholar review.',
              estimatedMinutes: 2,
              category: 'KNOWLEDGE',
              evidenceReference: 'Quran 16:43 ("Ask the people of knowledge")',
              feasibilityScore: 1.0,
            },
          ],
          uncertainty: 'HIGH',
          scholar_required: true,
          citations_verified: true,
          disclaimer: 'AMAL connects you with verified scholars rather than issuing autonomous fatwas.',
        });
      }
    }, 400);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Ask AMAL</Text>
      <Text style={styles.subtitle}>Grounded in verified Islamic sources · No autonomous fatwas</Text>

      {/* Suggested Prompts */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.promptScroll}>
        {['I am struggling with Fajr.', 'Help me build a Quran routine.', 'How do I handle anger?'].map(
          (prompt, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.promptChip}
              onPress={() => setQuery(prompt)}
            >
              <Text style={styles.promptChipText}>{prompt}</Text>
            </TouchableOpacity>
          )
        )}
      </ScrollView>

      {/* Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="What situation would you like guidance on?"
          placeholderTextColor={AmalTheme.colors.text.tertiaryLight}
          value={query}
          onChangeText={setQuery}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleAsk}>
          <Text style={styles.sendButtonText}>Ask</Text>
        </TouchableOpacity>
      </View>

      {/* Answer View */}
      {response && (
        <View style={styles.responseContainer}>
          {/* Verification Badge */}
          <View style={styles.badgeRow}>
            {response.citations_verified ? (
              <View style={styles.verifiedBadge}>
                <Text style={styles.verifiedBadgeText}>✓ Citations Verified</Text>
              </View>
            ) : (
              <View style={styles.unverifiedBadge}>
                <Text style={styles.unverifiedBadgeText}>⚠ Citation Review Pending</Text>
              </View>
            )}
            {response.scholar_required && (
              <View style={styles.scholarBadge}>
                <Text style={styles.scholarBadgeText}>Scholar Escalation Required</Text>
              </View>
            )}
          </View>

          {/* Answer Text */}
          <Text style={styles.answerSectionHeader}>GUIDANCE</Text>
          <Text style={styles.answerText}>{response.answer}</Text>

          {/* Evidence Pack */}
          {response.sources.length > 0 && (
            <View style={styles.sourcesContainer}>
              <Text style={styles.answerSectionHeader}>EVIDENCE SOURCES</Text>
              {response.sources.map((src, i) => (
                <View key={i} style={styles.sourceCard}>
                  <View style={styles.sourceHeader}>
                    <Text style={styles.sourceRef}>{src.reference}</Text>
                    <Text style={styles.sourceTier}>{src.authorityLevel}</Text>
                  </View>
                  <Text style={styles.sourceTranslation}>"{src.translation}"</Text>
                </View>
              ))}
            </View>
          )}

          {/* Next Best Amal */}
          {response.actions.length > 0 && (
            <View style={styles.actionContainer}>
              <Text style={styles.answerSectionHeader}>NEXT BEST AMAL</Text>
              {response.actions.map((act, i) => (
                <View key={i} style={styles.actionCard}>
                  <Text style={styles.actionTitle}>{act.title}</Text>
                  <Text style={styles.actionDesc}>{act.description}</Text>
                  <Text style={styles.actionEvidence}>Grounding: {act.evidenceReference}</Text>
                </View>
              ))}
            </View>
          )}

          <Text style={styles.disclaimerText}>{response.disclaimer}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AmalTheme.colors.surface.backgroundLight,
  },
  content: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: AmalTheme.colors.text.primaryLight,
  },
  subtitle: {
    fontSize: 13,
    color: AmalTheme.colors.text.secondaryLight,
    marginTop: 4,
    marginBottom: 16,
  },
  promptScroll: {
    marginBottom: 16,
  },
  promptChip: {
    backgroundColor: AmalTheme.colors.surface.cardLight,
    borderWidth: 1,
    borderColor: AmalTheme.colors.surface.borderLight,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  promptChipText: {
    fontSize: 13,
    color: AmalTheme.colors.text.secondaryLight,
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: AmalTheme.colors.surface.cardLight,
    borderWidth: 1,
    borderColor: AmalTheme.colors.surface.borderLight,
    borderRadius: 12,
    padding: 6,
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    fontSize: 15,
    color: AmalTheme.colors.text.primaryLight,
  },
  sendButton: {
    backgroundColor: AmalTheme.colors.primary,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  responseContainer: {
    backgroundColor: AmalTheme.colors.surface.cardLight,
    borderWidth: 1,
    borderColor: AmalTheme.colors.surface.borderLight,
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  verifiedBadge: {
    backgroundColor: AmalTheme.colors.status.successLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  verifiedBadgeText: {
    color: AmalTheme.colors.status.success,
    fontSize: 12,
    fontWeight: '700',
  },
  unverifiedBadge: {
    backgroundColor: AmalTheme.colors.status.warningLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  unverifiedBadgeText: {
    color: AmalTheme.colors.status.warning,
    fontSize: 12,
    fontWeight: '700',
  },
  scholarBadge: {
    backgroundColor: AmalTheme.colors.accent.terracottaLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  scholarBadgeText: {
    color: AmalTheme.colors.accent.terracotta,
    fontSize: 12,
    fontWeight: '700',
  },
  answerSectionHeader: {
    fontSize: 11,
    letterSpacing: 1,
    fontWeight: '700',
    color: AmalTheme.colors.primary,
    marginBottom: 6,
  },
  answerText: {
    fontSize: 15,
    lineHeight: 24,
    color: AmalTheme.colors.text.primaryLight,
    marginBottom: 16,
  },
  sourcesContainer: {
    marginBottom: 16,
  },
  sourceCard: {
    backgroundColor: AmalTheme.colors.surface.backgroundLight,
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  sourceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  sourceRef: {
    fontWeight: '700',
    fontSize: 13,
    color: AmalTheme.colors.text.primaryLight,
  },
  sourceTier: {
    fontSize: 11,
    color: AmalTheme.colors.text.secondaryLight,
  },
  sourceTranslation: {
    fontSize: 13,
    fontStyle: 'italic',
    color: AmalTheme.colors.text.secondaryLight,
    lineHeight: 18,
  },
  actionContainer: {
    marginBottom: 16,
  },
  actionCard: {
    backgroundColor: AmalTheme.colors.primaryLight,
    padding: 12,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: AmalTheme.colors.primary,
  },
  actionTitle: {
    fontWeight: '700',
    fontSize: 14,
    color: AmalTheme.colors.primary,
  },
  actionDesc: {
    fontSize: 13,
    color: AmalTheme.colors.text.primaryLight,
    marginVertical: 4,
  },
  actionEvidence: {
    fontSize: 11,
    color: AmalTheme.colors.primaryMuted,
    fontStyle: 'italic',
  },
  disclaimerText: {
    fontSize: 11,
    color: AmalTheme.colors.text.tertiaryLight,
    fontStyle: 'italic',
    marginTop: 8,
  },
});
