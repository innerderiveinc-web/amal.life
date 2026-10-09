"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = InsightsScreen;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const ui_1 = require("@amal/ui");
function InsightsScreen() {
    const insights = [
        {
            title: 'Morning Quran Recitation Strength',
            pattern: 'You complete Quran sessions 3x more reliably when scheduled between 6:30 AM and 7:30 AM.',
            action: 'Keep Quran anchored immediately after Fajr',
        },
        {
            title: 'Evening Routine & Fajr Link',
            pattern: 'Placing phone outside the bedroom correlates 92% with waking up peacefully before sunrise.',
            action: 'Maintain evening wind-down anchor',
        },
        {
            title: 'Sustainable Duration Ceiling',
            pattern: '10-minute micro-habits have proven twice as consistent as 30-minute targets.',
            action: 'Keep 10-minute daily ceiling active',
        },
    ];
    return (<react_native_1.ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <react_native_1.Text style={styles.categoryLabel}>PATTERN OBSERVATIONS</react_native_1.Text>
      <react_native_1.Text style={styles.title}>Personal Insights</react_native_1.Text>
      <react_native_1.Text style={styles.subtitle}>
        Objective behavioral patterns observed across your completed actions. Never spiritual evaluations.
      </react_native_1.Text>

      <react_native_1.View style={styles.list}>
        {insights.map((ins, idx) => (<react_native_1.View key={idx} style={styles.insightCard}>
            <react_native_1.Text style={styles.cardTitle}>{ins.title}</react_native_1.Text>
            <react_native_1.Text style={styles.cardPattern}>{ins.pattern}</react_native_1.Text>
            <react_native_1.View style={styles.actionPill}>
              <react_native_1.Text style={styles.actionText}>💡 Adaptation: {ins.action}</react_native_1.Text>
            </react_native_1.View>
          </react_native_1.View>))}
      </react_native_1.View>

      <react_native_1.View style={styles.disclaimerBox}>
        <react_native_1.Text style={styles.disclaimerTitle}>🌱 INTEGRITY PRINCIPLE</react_native_1.Text>
        <react_native_1.Text style={styles.disclaimerText}>
          AMAL measures feasibility, consistency, and friction. It never measures your Iman, piety,
          or standing before Allah.
        </react_native_1.Text>
      </react_native_1.View>
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
        marginBottom: ui_1.AmalTheme.spacing[5],
    },
    list: {
        gap: ui_1.AmalTheme.spacing[3],
        marginBottom: ui_1.AmalTheme.spacing[5],
    },
    insightCard: {
        backgroundColor: ui_1.AmalTheme.colors.surface.cardLight,
        borderRadius: ui_1.AmalTheme.radii.xl,
        padding: ui_1.AmalTheme.spacing[5],
        borderWidth: 1,
        borderColor: ui_1.AmalTheme.colors.surface.borderLight,
        ...ui_1.AmalTheme.shadows.subtle,
    },
    cardTitle: {
        fontSize: ui_1.AmalTheme.typography.sizes.base,
        fontWeight: '800',
        color: ui_1.AmalTheme.colors.text.primaryLight,
        marginBottom: 4,
    },
    cardPattern: {
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        color: ui_1.AmalTheme.colors.text.secondaryLight,
        lineHeight: 18,
        marginBottom: ui_1.AmalTheme.spacing[3],
    },
    actionPill: {
        backgroundColor: ui_1.AmalTheme.colors.primaryLight,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: ui_1.AmalTheme.radii.md,
        alignSelf: 'flex-start',
    },
    actionText: {
        fontSize: 11,
        fontWeight: '700',
        color: ui_1.AmalTheme.colors.primary,
    },
    disclaimerBox: {
        backgroundColor: ui_1.AmalTheme.colors.accent.sand,
        borderRadius: ui_1.AmalTheme.radii.lg,
        padding: ui_1.AmalTheme.spacing[4],
        marginBottom: ui_1.AmalTheme.spacing[8],
    },
    disclaimerTitle: {
        fontSize: 10,
        fontWeight: '800',
        letterSpacing: 1,
        color: ui_1.AmalTheme.colors.primary,
        marginBottom: 4,
    },
    disclaimerText: {
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        color: ui_1.AmalTheme.colors.text.secondaryLight,
        lineHeight: 18,
    },
});
//# sourceMappingURL=insights.js.map