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
exports.AskAmalScreen = void 0;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const ui_1 = require("@amal/ui");
const AskAmalScreen = () => {
    const [query, setQuery] = (0, react_1.useState)('');
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [response, setResponse] = (0, react_1.useState)({
        intent: 'FAJR_STRUGGLE',
        answer: 'Waking up for Fajr begins with your evening habits. The Prophet (peace be upon him) emphasized both the spiritual blessings of dawn and practical bedtime discipline.',
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
        interpretation: 'Establishing an intentional evening wind-down removes physical friction, allowing your intention (Niyyah) to become reliable action.',
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
        if (!query.trim())
            return;
        setLoading(true);
        // Simulated intelligent response adhering to AI response contract
        setTimeout(() => {
            setLoading(false);
            if (query.toLowerCase().includes('divorce') || query.toLowerCase().includes('talaq')) {
                setResponse({
                    intent: 'PERSONALIZED_FIQH',
                    answer: 'This situation involves specific marital circumstances and legal determination (Fiqh). Under Islamic principles and AMAL’s safety framework, AI does not issue personalized fatwas. A structured case has been prepared for qualified scholar review.',
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
    return (<react_native_1.ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <react_native_1.Text style={styles.title}>Ask AMAL</react_native_1.Text>
      <react_native_1.Text style={styles.subtitle}>Grounded in verified Islamic sources · No autonomous fatwas</react_native_1.Text>

      {/* Suggested Prompts */}
      <react_native_1.ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.promptScroll}>
        {['I am struggling with Fajr.', 'Help me build a Quran routine.', 'How do I handle anger?'].map((prompt, idx) => (<react_native_1.TouchableOpacity key={idx} style={styles.promptChip} onPress={() => setQuery(prompt)}>
              <react_native_1.Text style={styles.promptChipText}>{prompt}</react_native_1.Text>
            </react_native_1.TouchableOpacity>))}
      </react_native_1.ScrollView>

      {/* Input */}
      <react_native_1.View style={styles.inputContainer}>
        <react_native_1.TextInput style={styles.input} placeholder="What situation would you like guidance on?" placeholderTextColor={ui_1.AmalTheme.colors.text.tertiaryLight} value={query} onChangeText={setQuery}/>
        <react_native_1.TouchableOpacity style={styles.sendButton} onPress={handleAsk}>
          <react_native_1.Text style={styles.sendButtonText}>Ask</react_native_1.Text>
        </react_native_1.TouchableOpacity>
      </react_native_1.View>

      {/* Answer View */}
      {response && (<react_native_1.View style={styles.responseContainer}>
          {/* Verification Badge */}
          <react_native_1.View style={styles.badgeRow}>
            {response.citations_verified ? (<react_native_1.View style={styles.verifiedBadge}>
                <react_native_1.Text style={styles.verifiedBadgeText}>✓ Citations Verified</react_native_1.Text>
              </react_native_1.View>) : (<react_native_1.View style={styles.unverifiedBadge}>
                <react_native_1.Text style={styles.unverifiedBadgeText}>⚠ Citation Review Pending</react_native_1.Text>
              </react_native_1.View>)}
            {response.scholar_required && (<react_native_1.View style={styles.scholarBadge}>
                <react_native_1.Text style={styles.scholarBadgeText}>Scholar Escalation Required</react_native_1.Text>
              </react_native_1.View>)}
          </react_native_1.View>

          {/* Answer Text */}
          <react_native_1.Text style={styles.answerSectionHeader}>GUIDANCE</react_native_1.Text>
          <react_native_1.Text style={styles.answerText}>{response.answer}</react_native_1.Text>

          {/* Evidence Pack */}
          {response.sources.length > 0 && (<react_native_1.View style={styles.sourcesContainer}>
              <react_native_1.Text style={styles.answerSectionHeader}>EVIDENCE SOURCES</react_native_1.Text>
              {response.sources.map((src, i) => (<react_native_1.View key={i} style={styles.sourceCard}>
                  <react_native_1.View style={styles.sourceHeader}>
                    <react_native_1.Text style={styles.sourceRef}>{src.reference}</react_native_1.Text>
                    <react_native_1.Text style={styles.sourceTier}>{src.authorityLevel}</react_native_1.Text>
                  </react_native_1.View>
                  <react_native_1.Text style={styles.sourceTranslation}>"{src.translation}"</react_native_1.Text>
                </react_native_1.View>))}
            </react_native_1.View>)}

          {/* Next Best Amal */}
          {response.actions.length > 0 && (<react_native_1.View style={styles.actionContainer}>
              <react_native_1.Text style={styles.answerSectionHeader}>NEXT BEST AMAL</react_native_1.Text>
              {response.actions.map((act, i) => (<react_native_1.View key={i} style={styles.actionCard}>
                  <react_native_1.Text style={styles.actionTitle}>{act.title}</react_native_1.Text>
                  <react_native_1.Text style={styles.actionDesc}>{act.description}</react_native_1.Text>
                  <react_native_1.Text style={styles.actionEvidence}>Grounding: {act.evidenceReference}</react_native_1.Text>
                </react_native_1.View>))}
            </react_native_1.View>)}

          <react_native_1.Text style={styles.disclaimerText}>{response.disclaimer}</react_native_1.Text>
        </react_native_1.View>)}
    </react_native_1.ScrollView>);
};
exports.AskAmalScreen = AskAmalScreen;
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ui_1.AmalTheme.colors.surface.backgroundLight,
    },
    content: {
        padding: 20,
        paddingTop: 60,
    },
    title: {
        fontSize: 26,
        fontWeight: '800',
        color: ui_1.AmalTheme.colors.text.primaryLight,
    },
    subtitle: {
        fontSize: 13,
        color: ui_1.AmalTheme.colors.text.secondaryLight,
        marginTop: 4,
        marginBottom: 16,
    },
    promptScroll: {
        marginBottom: 16,
    },
    promptChip: {
        backgroundColor: ui_1.AmalTheme.colors.surface.cardLight,
        borderWidth: 1,
        borderColor: ui_1.AmalTheme.colors.surface.borderLight,
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 8,
    },
    promptChipText: {
        fontSize: 13,
        color: ui_1.AmalTheme.colors.text.secondaryLight,
    },
    inputContainer: {
        flexDirection: 'row',
        backgroundColor: ui_1.AmalTheme.colors.surface.cardLight,
        borderWidth: 1,
        borderColor: ui_1.AmalTheme.colors.surface.borderLight,
        borderRadius: 12,
        padding: 6,
        alignItems: 'center',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        paddingHorizontal: 12,
        fontSize: 15,
        color: ui_1.AmalTheme.colors.text.primaryLight,
    },
    sendButton: {
        backgroundColor: ui_1.AmalTheme.colors.primary,
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 8,
    },
    sendButtonText: {
        color: '#FFFFFF',
        fontWeight: '700',
    },
    responseContainer: {
        backgroundColor: ui_1.AmalTheme.colors.surface.cardLight,
        borderWidth: 1,
        borderColor: ui_1.AmalTheme.colors.surface.borderLight,
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
        backgroundColor: ui_1.AmalTheme.colors.status.successLight,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
    },
    verifiedBadgeText: {
        color: ui_1.AmalTheme.colors.status.success,
        fontSize: 12,
        fontWeight: '700',
    },
    unverifiedBadge: {
        backgroundColor: ui_1.AmalTheme.colors.status.warningLight,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
    },
    unverifiedBadgeText: {
        color: ui_1.AmalTheme.colors.status.warning,
        fontSize: 12,
        fontWeight: '700',
    },
    scholarBadge: {
        backgroundColor: ui_1.AmalTheme.colors.accent.terracottaLight,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
    },
    scholarBadgeText: {
        color: ui_1.AmalTheme.colors.accent.terracotta,
        fontSize: 12,
        fontWeight: '700',
    },
    answerSectionHeader: {
        fontSize: 11,
        letterSpacing: 1,
        fontWeight: '700',
        color: ui_1.AmalTheme.colors.primary,
        marginBottom: 6,
    },
    answerText: {
        fontSize: 15,
        lineHeight: 24,
        color: ui_1.AmalTheme.colors.text.primaryLight,
        marginBottom: 16,
    },
    sourcesContainer: {
        marginBottom: 16,
    },
    sourceCard: {
        backgroundColor: ui_1.AmalTheme.colors.surface.backgroundLight,
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
        color: ui_1.AmalTheme.colors.text.primaryLight,
    },
    sourceTier: {
        fontSize: 11,
        color: ui_1.AmalTheme.colors.text.secondaryLight,
    },
    sourceTranslation: {
        fontSize: 13,
        fontStyle: 'italic',
        color: ui_1.AmalTheme.colors.text.secondaryLight,
        lineHeight: 18,
    },
    actionContainer: {
        marginBottom: 16,
    },
    actionCard: {
        backgroundColor: ui_1.AmalTheme.colors.primaryLight,
        padding: 12,
        borderRadius: 10,
        borderLeftWidth: 4,
        borderLeftColor: ui_1.AmalTheme.colors.primary,
    },
    actionTitle: {
        fontWeight: '700',
        fontSize: 14,
        color: ui_1.AmalTheme.colors.primary,
    },
    actionDesc: {
        fontSize: 13,
        color: ui_1.AmalTheme.colors.text.primaryLight,
        marginVertical: 4,
    },
    actionEvidence: {
        fontSize: 11,
        color: ui_1.AmalTheme.colors.primaryMuted,
        fontStyle: 'italic',
    },
    disclaimerText: {
        fontSize: 11,
        color: ui_1.AmalTheme.colors.text.tertiaryLight,
        fontStyle: 'italic',
        marginTop: 8,
    },
});
//# sourceMappingURL=AskAmalScreen.js.map