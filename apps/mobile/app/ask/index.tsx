import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { AmalTheme } from '@amal/ui';
import { EvidenceDrawer, ScholarTriageModal } from '../../components';

export default function AskScreen() {
  const [query, setQuery] = useState('');
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
    uncertainty: 'LOW',
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
          uncertainty: 'LOW',
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
              onPress={() => {
                setQuery(prompt);
              }}
            >
              <Text style={styles.promptChipText}>{prompt}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Input Bar */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="What situation or question is on your mind?"
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
            {/* Verification Badge */}
            <View style={styles.badgeRow}>
              <View style={styles.verifiedBadge}>
                <Text style={styles.verifiedText}>✓ Citations Verified</Text>
              </View>
              <View style={styles.groundedBadge}>
                <Text style={styles.groundedText}>Governed Evidence Graph</Text>
              </View>
            </View>

            <Text style={styles.answerText}>{response.answer}</Text>

            {/* 4 Epistemic Segregation Cards */}
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
    marginBottom: AmalTheme.spacing[4],
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
  verifiedBadge: {
    backgroundColor: AmalTheme.colors.status.successLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: AmalTheme.radii.sm,
  },
  verifiedText: {
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
