"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AskScreen;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const ui_1 = require("@amal/ui");
const components_1 = require("../../components");
function AskScreen() {
    const [query, setQuery] = (0, react_1.useState)('');
    const [inputMode, setInputMode] = (0, react_1.useState)('TEXT');
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [showEvidence, setShowEvidence] = (0, react_1.useState)(false);
    const [showScholarModal, setShowScholarModal] = (0, react_1.useState)(false);
    const [response, setResponse] = (0, react_1.useState)({
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
        if (!query.trim())
            return;
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            const lower = query.toLowerCase();
            if (lower.includes('divorce') || lower.includes('talaq') || lower.includes('custody')) {
                setShowScholarModal(true);
                setResponse(null);
            }
            else {
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
    return (<react_native_1.View style={styles.container}>
      <react_native_1.ScrollView contentContainerStyle={styles.content}>
        <react_native_1.Text style={styles.categoryLabel}>GROUNDED INTELLIGENCE</react_native_1.Text>
        <react_native_1.Text style={styles.title}>Ask AMAL</react_native_1.Text>
        <react_native_1.Text style={styles.subtitle}>
          Grounded in verified Quran & Hadith · No autonomous fatwas
        </react_native_1.Text>

        {/* Input Mode Selector */}
        <react_native_1.View style={styles.inputModeRow}>
          {['TEXT', 'VOICE', 'PASTE'].map((m) => (<react_native_1.TouchableOpacity key={m} style={[styles.inputModePill, inputMode === m && styles.inputModePillActive]} onPress={() => setInputMode(m)}>
              <react_native_1.Text style={[styles.inputModeText, inputMode === m && styles.inputModeTextActive]}>
                {m === 'TEXT' && '⌨️ Text'}
                {m === 'VOICE' && '🎙 Voice'}
                {m === 'PASTE' && '📋 Paste'}
              </react_native_1.Text>
            </react_native_1.TouchableOpacity>))}
        </react_native_1.View>

        {/* Suggested Prompts */}
        <react_native_1.ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.promptScroll}>
          {[
            'I struggle with Fajr sleep habits.',
            'Help me build a Quran routine.',
            'How do I handle anger when stressed?',
            'What is the ruling on divorce?',
        ].map((prompt, idx) => (<react_native_1.TouchableOpacity key={idx} style={styles.promptChip} onPress={() => setQuery(prompt)}>
              <react_native_1.Text style={styles.promptChipText}>{prompt}</react_native_1.Text>
            </react_native_1.TouchableOpacity>))}
        </react_native_1.ScrollView>

        {/* Input Bar */}
        <react_native_1.View style={styles.inputContainer}>
          <react_native_1.TextInput style={styles.input} placeholder={inputMode === 'VOICE'
            ? 'Tap mic or speak your question...'
            : 'What situation or question is on your mind?'} placeholderTextColor={ui_1.AmalTheme.colors.text.tertiaryLight} value={query} onChangeText={setQuery}/>
          <react_native_1.TouchableOpacity style={styles.askButton} onPress={handleAsk}>
            <react_native_1.Text style={styles.askButtonText}>Ask</react_native_1.Text>
          </react_native_1.TouchableOpacity>
        </react_native_1.View>

        {/* Response View */}
        {response && (<react_native_1.View style={styles.responseCard}>
            {/* Epistemic Confidence Badge (Section 93 - Never 93% confident) */}
            <react_native_1.View style={styles.badgeRow}>
              <react_native_1.View style={styles.confidenceBadge}>
                <react_native_1.Text style={styles.confidenceText}>
                  {response.confidenceStatus === 'VERIFIED_EVIDENCE' && '✓ Verified Islamic Evidence'}
                  {response.confidenceStatus === 'SCHOLARLY_DISAGREEMENT' && '⚖ Scholarly Disagreement Exists'}
                  {response.confidenceStatus === 'EVIDENCE_LIMITED' && '⚠ Evidence is Limited'}
                  {response.confidenceStatus === 'SCHOLAR_REQUIRED' && '👤 Scholar Review Recommended'}
                </react_native_1.Text>
              </react_native_1.View>
              <react_native_1.View style={styles.groundedBadge}>
                <react_native_1.Text style={styles.groundedText}>Governed Graph</react_native_1.Text>
              </react_native_1.View>
            </react_native_1.View>

            <react_native_1.Text style={styles.answerText}>{response.answer}</react_native_1.Text>

            {/* 4 Epistemic Segregation Cards (Section 43) */}
            <react_native_1.View style={styles.epistemicBox}>
              <react_native_1.View style={styles.epistemicRow}>
                <react_native_1.Text style={styles.epistemicTag}>[ISLAM SAYS]</react_native_1.Text>
                <react_native_1.Text style={styles.epistemicContent}>{response.epistemic.islamSays}</react_native_1.Text>
              </react_native_1.View>

              <react_native_1.View style={styles.epistemicRow}>
                <react_native_1.Text style={styles.epistemicTag}>[SCHOLARS DISCUSS]</react_native_1.Text>
                <react_native_1.Text style={styles.epistemicContent}>{response.epistemic.scholarsDiscuss}</react_native_1.Text>
              </react_native_1.View>

              <react_native_1.View style={styles.epistemicRow}>
                <react_native_1.Text style={styles.epistemicTag}>[AMAL RECOMMENDS]</react_native_1.Text>
                <react_native_1.Text style={styles.epistemicContent}>{response.epistemic.amalRecommends}</react_native_1.Text>
              </react_native_1.View>

              <react_native_1.View style={styles.epistemicRow}>
                <react_native_1.Text style={styles.epistemicTag}>[YOU MAY FIND PRACTICAL]</react_native_1.Text>
                <react_native_1.Text style={styles.epistemicContent}>{response.epistemic.practicalInsight}</react_native_1.Text>
              </react_native_1.View>
            </react_native_1.View>

            {/* Scholarly Plurality Section (Section 94) */}
            {response.scholarlyPlurality && (<react_native_1.View style={styles.pluralityBox}>
                <react_native_1.Text style={styles.pluralityHeader}>SCHOLARLY PERSPECTIVES (IKHTILĀF)</react_native_1.Text>
                <react_native_1.Text style={styles.pluralityTopic}>{response.scholarlyPlurality.topic}</react_native_1.Text>
                {response.scholarlyPlurality.positions.map((pos, idx) => (<react_native_1.View key={idx} style={styles.positionRow}>
                    <react_native_1.Text style={styles.madhhabTag}>{pos.madhhab}</react_native_1.Text>
                    <react_native_1.Text style={styles.positionBody}>{pos.position}</react_native_1.Text>
                    <react_native_1.Text style={styles.positionSources}>Sources: {pos.sources}</react_native_1.Text>
                  </react_native_1.View>))}
                <react_native_1.Text style={styles.reasonText}>
                  Why they differ: {response.scholarlyPlurality.reasonForDifference}
                </react_native_1.Text>
              </react_native_1.View>)}

            {/* Evidence Link */}
            {response.sources.length > 0 && (<react_native_1.TouchableOpacity style={styles.evidenceButton} onPress={() => setShowEvidence(true)}>
                <react_native_1.Text style={styles.evidenceBtnText}>
                  📖 View Governed Evidence ({response.sources[0].reference})
                </react_native_1.Text>
              </react_native_1.TouchableOpacity>)}
          </react_native_1.View>)}
      </react_native_1.ScrollView>

      {/* Governed Evidence Drawer */}
      {response?.sources[0] && (<components_1.EvidenceDrawer visible={showEvidence} onClose={() => setShowEvidence(false)} citation={response.sources[0]}/>)}

      {/* Scholar Escalation Modal */}
      <components_1.ScholarTriageModal visible={showScholarModal} onClose={() => setShowScholarModal(false)} initialQuery={query} caseCategory="Marital / Divorce Jurisprudence (Class D)"/>
    </react_native_1.View>);
}
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ui_1.AmalTheme.colors.surface.backgroundLight,
    },
    content: {
        padding: ui_1.AmalTheme.spacing[5],
        paddingTop: ui_1.AmalTheme.spacing[10],
    },
    categoryLabel: {
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        fontWeight: '800',
        letterSpacing: 1,
        color: ui_1.AmalTheme.colors.primary,
        marginBottom: 2,
    },
    title: {
        fontSize: ui_1.AmalTheme.typography.sizes['3xl'],
        fontWeight: '800',
        color: ui_1.AmalTheme.colors.text.primaryLight,
    },
    subtitle: {
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        color: ui_1.AmalTheme.colors.text.secondaryLight,
        lineHeight: 18,
        marginTop: 4,
        marginBottom: ui_1.AmalTheme.spacing[3],
    },
    inputModeRow: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: ui_1.AmalTheme.spacing[3],
    },
    inputModePill: {
        paddingVertical: 5,
        paddingHorizontal: 12,
        borderRadius: ui_1.AmalTheme.radii.full,
        backgroundColor: ui_1.AmalTheme.colors.surface.cardLight,
        borderWidth: 1,
        borderColor: ui_1.AmalTheme.colors.surface.borderLight,
    },
    inputModePillActive: {
        backgroundColor: ui_1.AmalTheme.colors.primaryLight,
        borderColor: ui_1.AmalTheme.colors.primary,
    },
    inputModeText: {
        fontSize: 11,
        color: ui_1.AmalTheme.colors.text.secondaryLight,
        fontWeight: '600',
    },
    inputModeTextActive: {
        color: ui_1.AmalTheme.colors.primary,
        fontWeight: '700',
    },
    promptScroll: {
        marginBottom: ui_1.AmalTheme.spacing[3],
    },
    promptChip: {
        backgroundColor: ui_1.AmalTheme.colors.surface.cardLight,
        paddingHorizontal: ui_1.AmalTheme.spacing[4],
        paddingVertical: ui_1.AmalTheme.spacing[2],
        borderRadius: ui_1.AmalTheme.radii.full,
        borderWidth: 1,
        borderColor: ui_1.AmalTheme.colors.surface.borderLight,
        marginRight: ui_1.AmalTheme.spacing[2],
    },
    promptChipText: {
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        color: ui_1.AmalTheme.colors.text.secondaryLight,
    },
    inputContainer: {
        flexDirection: 'row',
        backgroundColor: ui_1.AmalTheme.colors.surface.cardLight,
        borderRadius: ui_1.AmalTheme.radii.lg,
        borderWidth: 1,
        borderColor: ui_1.AmalTheme.colors.surface.borderLight,
        padding: 6,
        alignItems: 'center',
        marginBottom: ui_1.AmalTheme.spacing[5],
    },
    input: {
        flex: 1,
        paddingHorizontal: ui_1.AmalTheme.spacing[3],
        fontSize: ui_1.AmalTheme.typography.sizes.sm,
        color: ui_1.AmalTheme.colors.text.primaryLight,
    },
    askButton: {
        backgroundColor: ui_1.AmalTheme.colors.primary,
        paddingHorizontal: ui_1.AmalTheme.spacing[4],
        paddingVertical: ui_1.AmalTheme.spacing[2],
        borderRadius: ui_1.AmalTheme.radii.md,
    },
    askButtonText: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
    },
    responseCard: {
        backgroundColor: ui_1.AmalTheme.colors.surface.cardLight,
        borderRadius: ui_1.AmalTheme.radii.xl,
        padding: ui_1.AmalTheme.spacing[5],
        borderWidth: 1,
        borderColor: ui_1.AmalTheme.colors.surface.borderLight,
        ...ui_1.AmalTheme.shadows.card,
        marginBottom: ui_1.AmalTheme.spacing[6],
    },
    badgeRow: {
        flexDirection: 'row',
        gap: ui_1.AmalTheme.spacing[2],
        marginBottom: ui_1.AmalTheme.spacing[3],
    },
    confidenceBadge: {
        backgroundColor: ui_1.AmalTheme.colors.status.successLight,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: ui_1.AmalTheme.radii.sm,
    },
    confidenceText: {
        color: ui_1.AmalTheme.colors.status.success,
        fontSize: 11,
        fontWeight: '700',
    },
    groundedBadge: {
        backgroundColor: ui_1.AmalTheme.colors.primaryLight,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: ui_1.AmalTheme.radii.sm,
    },
    groundedText: {
        color: ui_1.AmalTheme.colors.primary,
        fontSize: 11,
        fontWeight: '700',
    },
    answerText: {
        fontSize: ui_1.AmalTheme.typography.sizes.sm,
        color: ui_1.AmalTheme.colors.text.primaryLight,
        lineHeight: 22,
        marginBottom: ui_1.AmalTheme.spacing[4],
    },
    epistemicBox: {
        gap: ui_1.AmalTheme.spacing[3],
        paddingTop: ui_1.AmalTheme.spacing[3],
        borderTopWidth: 1,
        borderTopColor: ui_1.AmalTheme.colors.surface.borderLight,
        marginBottom: ui_1.AmalTheme.spacing[4],
    },
    epistemicRow: {
        backgroundColor: ui_1.AmalTheme.colors.surface.backgroundLight,
        padding: ui_1.AmalTheme.spacing[3],
        borderRadius: ui_1.AmalTheme.radii.md,
    },
    epistemicTag: {
        fontSize: 10,
        fontWeight: '800',
        color: ui_1.AmalTheme.colors.primary,
        marginBottom: 2,
        letterSpacing: 0.5,
    },
    epistemicContent: {
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        color: ui_1.AmalTheme.colors.text.primaryLight,
        lineHeight: 18,
    },
    pluralityBox: {
        backgroundColor: ui_1.AmalTheme.colors.surface.backgroundLight,
        borderRadius: ui_1.AmalTheme.radii.md,
        padding: ui_1.AmalTheme.spacing[3],
        marginBottom: ui_1.AmalTheme.spacing[4],
        borderLeftWidth: 3,
        borderLeftColor: ui_1.AmalTheme.colors.accent.terracotta,
    },
    pluralityHeader: {
        fontSize: 10,
        fontWeight: '800',
        color: ui_1.AmalTheme.colors.accent.terracotta,
        letterSpacing: 1,
    },
    pluralityTopic: {
        fontSize: 12,
        fontWeight: '700',
        color: ui_1.AmalTheme.colors.text.primaryLight,
        marginVertical: 4,
    },
    positionRow: {
        marginTop: 6,
        paddingBottom: 4,
        borderBottomWidth: 1,
        borderBottomColor: ui_1.AmalTheme.colors.surface.borderLight,
    },
    madhhabTag: {
        fontSize: 11,
        fontWeight: '800',
        color: ui_1.AmalTheme.colors.primary,
    },
    positionBody: {
        fontSize: 11,
        color: ui_1.AmalTheme.colors.text.primaryLight,
        lineHeight: 16,
        marginTop: 1,
    },
    positionSources: {
        fontSize: 10,
        color: ui_1.AmalTheme.colors.text.secondaryLight,
        fontStyle: 'italic',
        marginTop: 2,
    },
    reasonText: {
        fontSize: 11,
        color: ui_1.AmalTheme.colors.text.secondaryLight,
        fontStyle: 'italic',
        marginTop: 6,
    },
    evidenceButton: {
        backgroundColor: ui_1.AmalTheme.colors.accent.sand,
        paddingVertical: ui_1.AmalTheme.spacing[3],
        borderRadius: ui_1.AmalTheme.radii.md,
        alignItems: 'center',
    },
    evidenceBtnText: {
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        fontWeight: '700',
        color: ui_1.AmalTheme.colors.text.primaryLight,
    },
});
//# sourceMappingURL=index.js.map