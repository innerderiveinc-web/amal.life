import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { AmalTheme } from '@amal/ui';
import { EvidenceDrawer, ScholarTriageModal } from '../../components';

export default function AskScreen() {
  const [query, setQuery] = useState('');
  const [inputMode, setInputMode] = useState<'TEXT' | 'VOICE' | 'PASTE'>('TEXT');
  const [loading, setLoading] = useState(false);
  const [showEvidence, setShowEvidence] = useState(false);
  const [showScholarModal, setShowScholarModal] = useState(false);

  const [response, setResponse] = useState<any>({
    intent: 'FAJR_STRUGGLE',
    answer: 'Waking up for Fajr begins with your evening habits. The Prophet (peace be upon him) emphasized both the spiritual blessings of dawn and practical bedtime discipline.',
    epistemic: {
      islamSays: 'The Prophet (peace be upon him) disliked sleeping before Isha and conversation after it.',
      scholarsDiscuss: 'Classical jurists note that physical causes of sleep deprivation must be managed as part of the obligation to preserve prayer.',
      amalRecommends: 'Place your phone outside your sleep area 45 minutes before bedtime and pray two rak\'ahs with presence.',
      practicalInsight: 'Late heavy dinners create physical grogginess that makes the Fajr alarm harder to register.',
    },
    scholarlyPlurality: {
      hasDisagreement: true,
      topic: 'Reciting Quran aloud in individual Fajr prayer',
      positions: [
        {
          madhhab: 'Hanafi & Shafi\'i Majority',
          position: 'Audible recitation is recommended (Sunnah) even when praying alone at dawn.',
          sources: 'Al-Hidayah, Al-Majmu\'',
        },
        {
          madhhab: 'Maliki & Hanbali View',
          position: 'Quiet audible recitation is preferred, but silent recitation is permissible without penalty.',
          sources: 'Al-Mughni, Al-Mudawwana',
        },
      ],
      reasonForDifference: 'Different interpretations of Prophetic practice when praying alone versus in congregation.',
    },
    confidenceStatus: 'VERIFIED_EVIDENCE', // 'VERIFIED_EVIDENCE' | 'SCHOLARLY_DISAGREEMENT' | 'EVIDENCE_LIMITED' | 'SCHOLAR_REQUIRED'
    sources: [
      {
        reference: 'Sahih al-Bukhari 568',
        authorityLevel: 'TIER_2_AUTHENTIC_HADITH',
        arabicText: 'أَنَّ رَسُولَ اللَّهِ صلى الله عليه وسلم كَانَ يَكْرَهُ النَّوْمَ قَبْلَ الْعِشَاءِ وَالْحَدِيثَ بَعْدَهَا',
        translation: 'The Messenger of Allah (peace be upon him) used to dislike sleep before the night prayer and talking after it.',
        grading: 'SAHIH',
        scholarSignoffs: ['Dr. M. Akram', 'Sheikh T. Adams'],
      },
    ],
    scholarRequired: false,
    citationsVerified: true,
  });

  const handleAsk = () => {
    if (!query.trim()) return;
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const lower = query.toLowerCase();

      if (lower.includes('divorce') || lower.includes('talaq') || lower.includes('custody')) {
        setShowScholarModal(true);
        setResponse(null);
      } else {
        setResponse({
          intent: 'PRACTICE_INQUIRY',
          answer: `Regarding "${query}": The Islamic tradition approaches this with balance and gradual improvement.`,
          epistemic: {
            islamSays: 'Allah desires ease for you, not hardship.',
            scholarsDiscuss: 'Actions are judged by intentions and sustained consistency.',
            amalRecommends: 'Start with 5 minutes daily without setting excessive initial targets.',
            practicalInsight: 'Consistency built in small increments endures longer.',
          },
          scholarlyPlurality: null,
          confidenceStatus: 'VERIFIED_EVIDENCE',
          sources: [
            {
              reference: 'Quran 2:185',
              authorityLevel: 'TIER_1_QURAN',
              arabicText: 'يُرِيدُ اللَّهُ بِكُمُ الْيُسْرَ وَلَا يُرِيدُ بِكُمُ الْعُسْرَ',
              translation: 'Allah intends for you ease and does not intend for you hardship.',
              grading: 'MUTAWATIR',
              scholarSignoffs: ['Dr. M. Akram'],
            },
          ],
          scholarRequired: false,
          citationsVerified: true,
        });
      }
    }, 350);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.categoryLabel}>GROUNDED INTELLIGENCE</Text>
        <Text style={styles.title}>Ask AMAL</Text>
        <Text style={styles.subtitle}>
          Grounded in verified Quran & Hadith · No autonomous fatwas
        </Text>

        {/* Input Mode Selector */}
        <View style={styles.inputModeRow}>
          {(['TEXT', 'VOICE', 'PASTE'] as const).map((m) => (
            <TouchableOpacity
              key={m}
              style={[styles.inputModePill, inputMode === m && styles.inputModePillActive]}
              onPress={() => setInputMode(m)}
            >
              <Text style={[styles.inputModeText, inputMode === m && styles.inputModeTextActive]}>
                {m === 'TEXT' && '⌨️ Text'}
                {m === 'VOICE' && '🎙 Voice'}
                {m === 'PASTE' && '📋 Paste'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Suggested Prompts */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.promptScroll}>
          {[
            'I struggle with Fajr sleep habits.',
            'Help me build a Quran routine.',
            'How do I handle anger when stressed?',
            'What is the ruling on divorce?',
          ].map((prompt, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.promptChip}
              onPress={() => setQuery(prompt)}
            >
              <Text style={styles.promptChipText}>{prompt}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Input Bar */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={
              inputMode === 'VOICE'
                ? 'Tap mic or speak your question...'
                : 'What situation or question is on your mind?'
            }
            placeholderTextColor={AmalTheme.colors.text.tertiaryLight}
            value={query}
            onChangeText={setQuery}
          />
          <TouchableOpacity style={styles.askButton} onPress={handleAsk}>
            <Text style={styles.askButtonText}>Ask</Text>
          </TouchableOpacity>
        </View>

        {/* Response View */}
        {response && (
          <View style={styles.responseCard}>
            {/* Epistemic Confidence Badge (Section 93 - Never 93% confident) */}
            <View style={styles.badgeRow}>
              <View style={styles.confidenceBadge}>
                <Text style={styles.confidenceText}>
                  {response.confidenceStatus === 'VERIFIED_EVIDENCE' && '✓ Verified Islamic Evidence'}
                  {response.confidenceStatus === 'SCHOLARLY_DISAGREEMENT' && '⚖ Scholarly Disagreement Exists'}
                  {response.confidenceStatus === 'EVIDENCE_LIMITED' && '⚠ Evidence is Limited'}
                  {response.confidenceStatus === 'SCHOLAR_REQUIRED' && '👤 Scholar Review Recommended'}
                </Text>
              </View>
              <View style={styles.groundedBadge}>
                <Text style={styles.groundedText}>Governed Graph</Text>
              </View>
            </View>

            <Text style={styles.answerText}>{response.answer}</Text>

            {/* 4 Epistemic Segregation Cards (Section 43) */}
            <View style={styles.epistemicBox}>
              <View style={styles.epistemicRow}>
                <Text style={styles.epistemicTag}>[ISLAM SAYS]</Text>
                <Text style={styles.epistemicContent}>{response.epistemic.islamSays}</Text>
              </View>

              <View style={styles.epistemicRow}>
                <Text style={styles.epistemicTag}>[SCHOLARS DISCUSS]</Text>
                <Text style={styles.epistemicContent}>{response.epistemic.scholarsDiscuss}</Text>
              </View>

              <View style={styles.epistemicRow}>
                <Text style={styles.epistemicTag}>[AMAL RECOMMENDS]</Text>
                <Text style={styles.epistemicContent}>{response.epistemic.amalRecommends}</Text>
              </View>

              <View style={styles.epistemicRow}>
                <Text style={styles.epistemicTag}>[YOU MAY FIND PRACTICAL]</Text>
                <Text style={styles.epistemicContent}>{response.epistemic.practicalInsight}</Text>
              </View>
            </View>

            {/* Scholarly Plurality Section (Section 94) */}
            {response.scholarlyPlurality && (
              <View style={styles.pluralityBox}>
                <Text style={styles.pluralityHeader}>SCHOLARLY PERSPECTIVES (IKHTILĀF)</Text>
                <Text style={styles.pluralityTopic}>{response.scholarlyPlurality.topic}</Text>
                {response.scholarlyPlurality.positions.map((pos: any, idx: number) => (
                  <View key={idx} style={styles.positionRow}>
                    <Text style={styles.madhhabTag}>{pos.madhhab}</Text>
                    <Text style={styles.positionBody}>{pos.position}</Text>
                    <Text style={styles.positionSources}>Sources: {pos.sources}</Text>
                  </View>
                ))}
                <Text style={styles.reasonText}>
                  Why they differ: {response.scholarlyPlurality.reasonForDifference}
                </Text>
              </View>
            )}

            {/* Evidence Link */}
            {response.sources.length > 0 && (
              <TouchableOpacity
                style={styles.evidenceButton}
                onPress={() => setShowEvidence(true)}
              >
                <Text style={styles.evidenceBtnText}>
                  📖 View Governed Evidence ({response.sources[0].reference})
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </ScrollView>

      {/* Governed Evidence Drawer */}
      {response?.sources[0] && (
        <EvidenceDrawer
          visible={showEvidence}
          onClose={() => setShowEvidence(false)}
          citation={response.sources[0]}
        />
      )}

      {/* Scholar Escalation Modal */}
      <ScholarTriageModal
        visible={showScholarModal}
        onClose={() => setShowScholarModal(false)}
        initialQuery={query}
        caseCategory="Marital / Divorce Jurisprudence (Class D)"
      />
    </View>
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
    fontSize: AmalTheme.typography.sizes['3xl'],
    fontWeight: '800',
    color: AmalTheme.colors.text.primaryLight,
  },
  subtitle: {
    fontSize: AmalTheme.typography.sizes.xs,
    color: AmalTheme.colors.text.secondaryLight,
    lineHeight: 18,
    marginTop: 4,
    marginBottom: AmalTheme.spacing[3],
  },
  inputModeRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: AmalTheme.spacing[3],
  },
  inputModePill: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: AmalTheme.radii.full,
    backgroundColor: AmalTheme.colors.surface.cardLight,
    borderWidth: 1,
    borderColor: AmalTheme.colors.surface.borderLight,
  },
  inputModePillActive: {
    backgroundColor: AmalTheme.colors.primaryLight,
    borderColor: AmalTheme.colors.primary,
  },
  inputModeText: {
    fontSize: 11,
    color: AmalTheme.colors.text.secondaryLight,
    fontWeight: '600',
  },
  inputModeTextActive: {
    color: AmalTheme.colors.primary,
    fontWeight: '700',
  },
  promptScroll: {
    marginBottom: AmalTheme.spacing[3],
  },
  promptChip: {
    backgroundColor: AmalTheme.colors.surface.cardLight,
    paddingHorizontal: AmalTheme.spacing[4],
    paddingVertical: AmalTheme.spacing[2],
    borderRadius: AmalTheme.radii.full,
    borderWidth: 1,
    borderColor: AmalTheme.colors.surface.borderLight,
    marginRight: AmalTheme.spacing[2],
  },
  promptChipText: {
    fontSize: AmalTheme.typography.sizes.xs,
    color: AmalTheme.colors.text.secondaryLight,
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: AmalTheme.colors.surface.cardLight,
    borderRadius: AmalTheme.radii.lg,
    borderWidth: 1,
    borderColor: AmalTheme.colors.surface.borderLight,
    padding: 6,
    alignItems: 'center',
    marginBottom: AmalTheme.spacing[5],
  },
  input: {
    flex: 1,
    paddingHorizontal: AmalTheme.spacing[3],
    fontSize: AmalTheme.typography.sizes.sm,
    color: AmalTheme.colors.text.primaryLight,
  },
  askButton: {
    backgroundColor: AmalTheme.colors.primary,
    paddingHorizontal: AmalTheme.spacing[4],
    paddingVertical: AmalTheme.spacing[2],
    borderRadius: AmalTheme.radii.md,
  },
  askButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: AmalTheme.typography.sizes.xs,
  },
  responseCard: {
    backgroundColor: AmalTheme.colors.surface.cardLight,
    borderRadius: AmalTheme.radii.xl,
    padding: AmalTheme.spacing[5],
    borderWidth: 1,
    borderColor: AmalTheme.colors.surface.borderLight,
    ...AmalTheme.shadows.card,
    marginBottom: AmalTheme.spacing[6],
  },
  badgeRow: {
    flexDirection: 'row',
    gap: AmalTheme.spacing[2],
    marginBottom: AmalTheme.spacing[3],
  },
  confidenceBadge: {
    backgroundColor: AmalTheme.colors.status.successLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: AmalTheme.radii.sm,
  },
  confidenceText: {
    color: AmalTheme.colors.status.success,
    fontSize: 11,
    fontWeight: '700',
  },
  groundedBadge: {
    backgroundColor: AmalTheme.colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: AmalTheme.radii.sm,
  },
  groundedText: {
    color: AmalTheme.colors.primary,
    fontSize: 11,
    fontWeight: '700',
  },
  answerText: {
    fontSize: AmalTheme.typography.sizes.sm,
    color: AmalTheme.colors.text.primaryLight,
    lineHeight: 22,
    marginBottom: AmalTheme.spacing[4],
  },
  epistemicBox: {
    gap: AmalTheme.spacing[3],
    paddingTop: AmalTheme.spacing[3],
    borderTopWidth: 1,
    borderTopColor: AmalTheme.colors.surface.borderLight,
    marginBottom: AmalTheme.spacing[4],
  },
  epistemicRow: {
    backgroundColor: AmalTheme.colors.surface.backgroundLight,
    padding: AmalTheme.spacing[3],
    borderRadius: AmalTheme.radii.md,
  },
  epistemicTag: {
    fontSize: 10,
    fontWeight: '800',
    color: AmalTheme.colors.primary,
    marginBottom: 2,
    letterSpacing: 0.5,
  },
  epistemicContent: {
    fontSize: AmalTheme.typography.sizes.xs,
    color: AmalTheme.colors.text.primaryLight,
    lineHeight: 18,
  },
  pluralityBox: {
    backgroundColor: AmalTheme.colors.surface.backgroundLight,
    borderRadius: AmalTheme.radii.md,
    padding: AmalTheme.spacing[3],
    marginBottom: AmalTheme.spacing[4],
    borderLeftWidth: 3,
    borderLeftColor: AmalTheme.colors.accent.terracotta,
  },
  pluralityHeader: {
    fontSize: 10,
    fontWeight: '800',
    color: AmalTheme.colors.accent.terracotta,
    letterSpacing: 1,
  },
  pluralityTopic: {
    fontSize: 12,
    fontWeight: '700',
    color: AmalTheme.colors.text.primaryLight,
    marginVertical: 4,
  },
  positionRow: {
    marginTop: 6,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: AmalTheme.colors.surface.borderLight,
  },
  madhhabTag: {
    fontSize: 11,
    fontWeight: '800',
    color: AmalTheme.colors.primary,
  },
  positionBody: {
    fontSize: 11,
    color: AmalTheme.colors.text.primaryLight,
    lineHeight: 16,
    marginTop: 1,
  },
  positionSources: {
    fontSize: 10,
    color: AmalTheme.colors.text.secondaryLight,
    fontStyle: 'italic',
    marginTop: 2,
  },
  reasonText: {
    fontSize: 11,
    color: AmalTheme.colors.text.secondaryLight,
    fontStyle: 'italic',
    marginTop: 6,
  },
  evidenceButton: {
    backgroundColor: AmalTheme.colors.accent.sand,
    paddingVertical: AmalTheme.spacing[3],
    borderRadius: AmalTheme.radii.md,
    alignItems: 'center',
  },
  evidenceBtnText: {
    fontSize: AmalTheme.typography.sizes.xs,
    fontWeight: '700',
    color: AmalTheme.colors.text.primaryLight,
  },
});
