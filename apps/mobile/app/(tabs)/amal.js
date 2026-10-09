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
exports.default = AmalTabScreen;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const ui_1 = require("@amal/ui");
function AmalTabScreen() {
    const [activeTab, setActiveTab] = (0, react_1.useState)('ACTIVE');
    const [showAdaptationPrompt, setShowAdaptationPrompt] = (0, react_1.useState)(false);
    const [showReviewPrompt, setShowReviewPrompt] = (0, react_1.useState)(false);
    const [showRestartPrompt, setShowRestartPrompt] = (0, react_1.useState)(false);
    const canonicalJourneys = [
        { id: 'j-fajr', title: '14-Day Fajr Recovery', pace: 'Moderate', days: 14, category: 'Worship' },
        { id: 'j-salah', title: '21-Day Salah Consistency', pace: 'Gentle', days: 21, category: 'Worship' },
        { id: 'j-quran-restart', title: '14-Day Quran Restart', pace: 'Very Easy', days: 14, category: 'Habits' },
        { id: 'j-quran-daily', title: '30-Day Daily Quran Habit', pace: 'Steady', days: 30, category: 'Habits' },
        { id: 'j-sabr', title: '14-Day Anger & Patience (Sabr)', pace: 'Gentle', days: 14, category: 'Character' },
        { id: 'j-time', title: '21-Day Time & Deen Alignment', pace: 'Steady', days: 21, category: 'Habits' },
        { id: 'j-new-muslim', title: '30-Day New Muslim Foundation', pace: 'Supportive', days: 30, category: 'Foundations' },
        { id: 'j-ramadan', title: '30-Day Ramadan Preparation', pace: 'Steady', days: 30, category: 'Seasons' },
    ];
    return (<react_native_1.ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <react_native_1.Text style={styles.categoryLabel}>PROGRAMS & PRACTICE</react_native_1.Text>
      <react_native_1.Text style={styles.title}>Amal Journeys</react_native_1.Text>
      <react_native_1.Text style={styles.subtitle}>
        Structured, gentle progression. Non-punitive pacing grounded in Prophetic ease.
      </react_native_1.Text>

      {/* Tab Switcher */}
      <react_native_1.View style={styles.tabSwitch}>
        <react_native_1.TouchableOpacity style={[styles.tabButton, activeTab === 'ACTIVE' && styles.tabButtonActive]} onPress={() => setActiveTab('ACTIVE')}>
          <react_native_1.Text style={[styles.tabText, activeTab === 'ACTIVE' && styles.tabTextActive]}>
            Active Journey (1)
          </react_native_1.Text>
        </react_native_1.TouchableOpacity>

        <react_native_1.TouchableOpacity style={[styles.tabButton, activeTab === 'DISCOVER' && styles.tabButtonActive]} onPress={() => setActiveTab('DISCOVER')}>
          <react_native_1.Text style={[styles.tabText, activeTab === 'DISCOVER' && styles.tabTextActive]}>
            Discover Catalog (8)
          </react_native_1.Text>
        </react_native_1.TouchableOpacity>
      </react_native_1.View>

      {activeTab === 'ACTIVE' ? (<react_native_1.View style={styles.activeSection}>
          <react_native_1.View style={styles.activeCard}>
            <react_native_1.View style={styles.cardHeader}>
              <react_native_1.Text style={styles.cardCat}>FAJR RECOVERY</react_native_1.Text>
              <react_native_1.Text style={styles.activeTag}>Day 4 of 14</react_native_1.Text>
            </react_native_1.View>
            <react_native_1.Text style={styles.activeTitle}>14-Day Fajr Recovery</react_native_1.Text>
            <react_native_1.Text style={styles.activeDescription}>
              Building an intentional evening wind-down anchor to wake with ease.
            </react_native_1.Text>

            <react_native_1.View style={styles.progressBar}>
              <react_native_1.View style={[styles.progressFill, { width: '28%' }]}/>
            </react_native_1.View>

            <react_native_1.View style={styles.activeActions}>
              <react_native_1.TouchableOpacity style={styles.primaryActionBtn}>
                <react_native_1.Text style={styles.primaryActionText}>Continue Today's Amal</react_native_1.Text>
              </react_native_1.TouchableOpacity>
              
              <react_native_1.View style={styles.controlRow}>
                <react_native_1.TouchableOpacity style={styles.controlPill} onPress={() => setShowAdaptationPrompt(!showAdaptationPrompt)}>
                  <react_native_1.Text style={styles.controlPillText}>Need a Simpler Pace?</react_native_1.Text>
                </react_native_1.TouchableOpacity>

                <react_native_1.TouchableOpacity style={styles.controlPill} onPress={() => setShowReviewPrompt(!showReviewPrompt)}>
                  <react_native_1.Text style={styles.controlPillText}>Phase Review</react_native_1.Text>
                </react_native_1.TouchableOpacity>

                <react_native_1.TouchableOpacity style={styles.controlPill} onPress={() => setShowRestartPrompt(!showRestartPrompt)}>
                  <react_native_1.Text style={styles.controlPillText}>Restart Options</react_native_1.Text>
                </react_native_1.TouchableOpacity>
              </react_native_1.View>
            </react_native_1.View>
          </react_native_1.View>

          {/* Section 30: Adaptation UX */}
          {showAdaptationPrompt && (<react_native_1.View style={styles.adaptationCard}>
              <react_native_1.Text style={styles.adaptationCardTitle}>ADJUST YOUR JOURNEY?</react_native_1.Text>
              <react_native_1.Text style={styles.adaptationCardBody}>
                You've completed shorter morning sessions more consistently recently.
              </react_native_1.Text>
              <react_native_1.View style={styles.adaptationChangeBox}>
                <react_native_1.Text style={styles.changeFrom}>20 min evening</react_native_1.Text>
                <react_native_1.Text style={styles.changeArrow}>→</react_native_1.Text>
                <react_native_1.Text style={styles.changeTo}>10 min morning</react_native_1.Text>
              </react_native_1.View>
              <react_native_1.View style={styles.adaptationBtnRow}>
                <react_native_1.TouchableOpacity style={styles.adaptApplyBtn}>
                  <react_native_1.Text style={styles.adaptApplyText}>Apply Change</react_native_1.Text>
                </react_native_1.TouchableOpacity>
                <react_native_1.TouchableOpacity style={styles.adaptKeepBtn} onPress={() => setShowAdaptationPrompt(false)}>
                  <react_native_1.Text style={styles.adaptKeepText}>Keep Current</react_native_1.Text>
                </react_native_1.TouchableOpacity>
              </react_native_1.View>
            </react_native_1.View>)}

          {/* Section 29: Journey Review */}
          {showReviewPrompt && (<react_native_1.View style={styles.reviewCard}>
              <react_native_1.Text style={styles.reviewCardTitle}>PHASE 1 MILESTONE REVIEW</react_native_1.Text>
              <react_native_1.Text style={styles.reviewQuestion}>What is working?</react_native_1.Text>
              <react_native_1.View style={styles.chipRow}>
                {['Too easy', 'Manageable', 'Difficult'].map((opt, i) => (<react_native_1.TouchableOpacity key={i} style={styles.reviewChip}>
                    <react_native_1.Text style={styles.reviewChipText}>{opt}</react_native_1.Text>
                  </react_native_1.TouchableOpacity>))}
              </react_native_1.View>
              <react_native_1.Text style={[styles.reviewQuestion, { marginTop: 10 }]}>What should change?</react_native_1.Text>
              <react_native_1.View style={styles.chipRow}>
                {['Keep it', 'Make it shorter', 'Change time', 'Pause'].map((opt, i) => (<react_native_1.TouchableOpacity key={i} style={styles.reviewChip}>
                    <react_native_1.Text style={styles.reviewChipText}>{opt}</react_native_1.Text>
                  </react_native_1.TouchableOpacity>))}
              </react_native_1.View>
            </react_native_1.View>)}

          {/* Section 32: Restart UX */}
          {showRestartPrompt && (<react_native_1.View style={styles.restartCard}>
              <react_native_1.Text style={styles.restartTitle}>WELCOME BACK</react_native_1.Text>
              <react_native_1.Text style={styles.restartSubtitle}>
                Previous journey: 14-Day Fajr Recovery · What worked before: Short morning sessions.
              </react_native_1.Text>
              <react_native_1.View style={styles.chipRow}>
                {['Restart Gently', 'Simplify Target', 'Change Time', 'Pause', 'Start Something New'].map((r, i) => (<react_native_1.TouchableOpacity key={i} style={styles.restartOptionBtn}>
                    <react_native_1.Text style={styles.restartOptionText}>{r}</react_native_1.Text>
                  </react_native_1.TouchableOpacity>))}
              </react_native_1.View>
            </react_native_1.View>)}

          {/* Ease Principle Quote */}
          <react_native_1.View style={styles.quoteCard}>
            <react_native_1.Text style={styles.quoteHeader}>🌱 PROPHETIC PRINCIPLE</react_native_1.Text>
            <react_native_1.Text style={styles.quoteText}>
              "The most beloved of deeds to Allah are those that are most consistent, even if they are small." (Sahih al-Bukhari 6464)
            </react_native_1.Text>
          </react_native_1.View>
        </react_native_1.View>) : (<react_native_1.View style={styles.discoverSection}>
          {canonicalJourneys.map((j) => (<react_native_1.View key={j.id} style={styles.catalogCard}>
              <react_native_1.View style={styles.cardHeader}>
                <react_native_1.Text style={styles.catalogTitle}>{j.title}</react_native_1.Text>
                <react_native_1.Text style={styles.badge}>{j.pace}</react_native_1.Text>
              </react_native_1.View>
              <react_native_1.Text style={styles.metaRow}>
                {j.days} Days · Category: {j.category} · Evidence Reviewed
              </react_native_1.Text>
              <react_native_1.TouchableOpacity style={styles.previewBtn}>
                <react_native_1.Text style={styles.previewText}>Preview Curriculum & Grounding</react_native_1.Text>
              </react_native_1.TouchableOpacity>
            </react_native_1.View>))}
        </react_native_1.View>)}
    </react_native_1.ScrollView>);
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
        marginBottom: ui_1.AmalTheme.spacing[4],
    },
    tabSwitch: {
        flexDirection: 'row',
        backgroundColor: ui_1.AmalTheme.colors.surface.cardLight,
        borderRadius: ui_1.AmalTheme.radii.lg,
        padding: 4,
        marginBottom: ui_1.AmalTheme.spacing[4],
        borderWidth: 1,
        borderColor: ui_1.AmalTheme.colors.surface.borderLight,
    },
    tabButton: {
        flex: 1,
        paddingVertical: ui_1.AmalTheme.spacing[2],
        alignItems: 'center',
        borderRadius: ui_1.AmalTheme.radii.md,
    },
    tabButtonActive: {
        backgroundColor: ui_1.AmalTheme.colors.primary,
    },
    tabText: {
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        fontWeight: '700',
        color: ui_1.AmalTheme.colors.text.secondaryLight,
    },
    tabTextActive: {
        color: '#FFFFFF',
    },
    activeSection: {
        marginTop: ui_1.AmalTheme.spacing[1],
    },
    activeCard: {
        backgroundColor: ui_1.AmalTheme.colors.surface.cardLight,
        borderRadius: ui_1.AmalTheme.radii.xl,
        padding: ui_1.AmalTheme.spacing[5],
        borderWidth: 1,
        borderColor: ui_1.AmalTheme.colors.surface.borderLight,
        marginBottom: ui_1.AmalTheme.spacing[4],
        ...ui_1.AmalTheme.shadows.card,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: ui_1.AmalTheme.spacing[2],
    },
    cardCat: {
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        fontWeight: '800',
        letterSpacing: 1,
        color: ui_1.AmalTheme.colors.primary,
    },
    activeTag: {
        fontSize: 11,
        fontWeight: '700',
        color: ui_1.AmalTheme.colors.accent.terracotta,
        backgroundColor: ui_1.AmalTheme.colors.accent.terracottaLight,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: ui_1.AmalTheme.radii.full,
    },
    activeTitle: {
        fontSize: ui_1.AmalTheme.typography.sizes.xl,
        fontWeight: '800',
        color: ui_1.AmalTheme.colors.text.primaryLight,
        marginBottom: 4,
    },
    activeDescription: {
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        color: ui_1.AmalTheme.colors.text.secondaryLight,
        lineHeight: 18,
        marginBottom: ui_1.AmalTheme.spacing[4],
    },
    progressBar: {
        height: 6,
        backgroundColor: ui_1.AmalTheme.colors.surface.borderLight,
        borderRadius: 3,
        marginBottom: ui_1.AmalTheme.spacing[4],
    },
    progressFill: {
        height: 6,
        backgroundColor: ui_1.AmalTheme.colors.primary,
        borderRadius: 3,
    },
    activeActions: {
        gap: ui_1.AmalTheme.spacing[3],
    },
    primaryActionBtn: {
        backgroundColor: ui_1.AmalTheme.colors.primary,
        paddingVertical: ui_1.AmalTheme.spacing[3],
        borderRadius: ui_1.AmalTheme.radii.lg,
        alignItems: 'center',
    },
    primaryActionText: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: ui_1.AmalTheme.typography.sizes.sm,
    },
    controlRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    controlPill: {
        paddingVertical: 6,
        paddingHorizontal: 10,
        backgroundColor: ui_1.AmalTheme.colors.surface.backgroundLight,
        borderRadius: ui_1.AmalTheme.radii.full,
        borderWidth: 1,
        borderColor: ui_1.AmalTheme.colors.surface.borderLight,
    },
    controlPillText: {
        color: ui_1.AmalTheme.colors.primary,
        fontWeight: '700',
        fontSize: 11,
    },
    adaptationCard: {
        backgroundColor: ui_1.AmalTheme.colors.primaryLight,
        borderRadius: ui_1.AmalTheme.radii.xl,
        padding: ui_1.AmalTheme.spacing[4],
        borderWidth: 1,
        borderColor: ui_1.AmalTheme.colors.primary,
        marginBottom: ui_1.AmalTheme.spacing[4],
    },
    adaptationCardTitle: {
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        fontWeight: '800',
        color: ui_1.AmalTheme.colors.primary,
        letterSpacing: 0.8,
    },
    adaptationCardBody: {
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        color: ui_1.AmalTheme.colors.text.secondaryLight,
        marginTop: 2,
        lineHeight: 18,
    },
    adaptationChangeBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: ui_1.AmalTheme.spacing[2],
        gap: 8,
    },
    changeFrom: {
        fontSize: ui_1.AmalTheme.typography.sizes.sm,
        color: ui_1.AmalTheme.colors.text.secondaryLight,
        textDecorationLine: 'line-through',
    },
    changeArrow: {
        fontSize: ui_1.AmalTheme.typography.sizes.sm,
        fontWeight: '700',
        color: ui_1.AmalTheme.colors.primary,
    },
    changeTo: {
        fontSize: ui_1.AmalTheme.typography.sizes.sm,
        fontWeight: '800',
        color: ui_1.AmalTheme.colors.primary,
    },
    adaptationBtnRow: {
        flexDirection: 'row',
        gap: ui_1.AmalTheme.spacing[2],
    },
    adaptApplyBtn: {
        backgroundColor: ui_1.AmalTheme.colors.primary,
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: ui_1.AmalTheme.radii.md,
    },
    adaptApplyText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '700',
    },
    adaptKeepBtn: {
        paddingVertical: 8,
        paddingHorizontal: 14,
    },
    adaptKeepText: {
        color: ui_1.AmalTheme.colors.text.secondaryLight,
        fontSize: 12,
        fontWeight: '600',
    },
    reviewCard: {
        backgroundColor: ui_1.AmalTheme.colors.surface.cardLight,
        borderRadius: ui_1.AmalTheme.radii.xl,
        padding: ui_1.AmalTheme.spacing[4],
        borderWidth: 1,
        borderColor: ui_1.AmalTheme.colors.surface.borderLight,
        marginBottom: ui_1.AmalTheme.spacing[4],
    },
    reviewCardTitle: {
        fontSize: 10,
        fontWeight: '800',
        color: ui_1.AmalTheme.colors.primary,
        letterSpacing: 0.8,
        marginBottom: 4,
    },
    reviewQuestion: {
        fontSize: 12,
        fontWeight: '700',
        color: ui_1.AmalTheme.colors.text.primaryLight,
        marginBottom: 4,
    },
    chipRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
    },
    reviewChip: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: ui_1.AmalTheme.radii.full,
        borderWidth: 1,
        borderColor: ui_1.AmalTheme.colors.surface.borderLight,
        backgroundColor: ui_1.AmalTheme.colors.surface.backgroundLight,
    },
    reviewChipText: {
        fontSize: 11,
        color: ui_1.AmalTheme.colors.text.secondaryLight,
    },
    restartCard: {
        backgroundColor: ui_1.AmalTheme.colors.surface.cardLight,
        borderRadius: ui_1.AmalTheme.radii.xl,
        padding: ui_1.AmalTheme.spacing[4],
        borderWidth: 1,
        borderColor: ui_1.AmalTheme.colors.accent.sand,
        marginBottom: ui_1.AmalTheme.spacing[4],
    },
    restartTitle: {
        fontSize: 10,
        fontWeight: '800',
        color: ui_1.AmalTheme.colors.accent.terracotta,
        letterSpacing: 1,
    },
    restartSubtitle: {
        fontSize: 12,
        color: ui_1.AmalTheme.colors.text.secondaryLight,
        marginVertical: 4,
        lineHeight: 18,
    },
    restartOptionBtn: {
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: ui_1.AmalTheme.radii.md,
        backgroundColor: ui_1.AmalTheme.colors.primaryLight,
    },
    restartOptionText: {
        fontSize: 11,
        color: ui_1.AmalTheme.colors.primary,
        fontWeight: '700',
    },
    quoteCard: {
        backgroundColor: ui_1.AmalTheme.colors.accent.sand,
        borderRadius: ui_1.AmalTheme.radii.lg,
        padding: ui_1.AmalTheme.spacing[4],
        marginBottom: ui_1.AmalTheme.spacing[5],
    },
    quoteHeader: {
        fontSize: 10,
        fontWeight: '800',
        letterSpacing: 1,
        color: ui_1.AmalTheme.colors.primary,
        marginBottom: 4,
    },
    quoteText: {
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        color: ui_1.AmalTheme.colors.text.primaryLight,
        fontStyle: 'italic',
        lineHeight: 18,
    },
    discoverSection: {
        gap: ui_1.AmalTheme.spacing[3],
    },
    catalogCard: {
        backgroundColor: ui_1.AmalTheme.colors.surface.cardLight,
        borderRadius: ui_1.AmalTheme.radii.lg,
        padding: ui_1.AmalTheme.spacing[4],
        borderWidth: 1,
        borderColor: ui_1.AmalTheme.colors.surface.borderLight,
    },
    catalogTitle: {
        fontSize: ui_1.AmalTheme.typography.sizes.base,
        fontWeight: '700',
        color: ui_1.AmalTheme.colors.text.primaryLight,
    },
    badge: {
        fontSize: 11,
        fontWeight: '700',
        color: ui_1.AmalTheme.colors.primary,
        backgroundColor: ui_1.AmalTheme.colors.primaryLight,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: ui_1.AmalTheme.radii.full,
    },
    metaRow: {
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        color: ui_1.AmalTheme.colors.text.secondaryLight,
        marginTop: 4,
        marginBottom: ui_1.AmalTheme.spacing[3],
    },
    previewBtn: {
        borderWidth: 1,
        borderColor: ui_1.AmalTheme.colors.surface.borderLight,
        paddingVertical: ui_1.AmalTheme.spacing[2],
        borderRadius: ui_1.AmalTheme.radii.md,
        alignItems: 'center',
    },
    previewText: {
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        fontWeight: '600',
        color: ui_1.AmalTheme.colors.text.secondaryLight,
    },
});
//# sourceMappingURL=amal.js.map