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
exports.default = JourneyDetailScreen;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const ui_1 = require("@amal/ui");
function JourneyDetailScreen() {
    const [isAdapted, setIsAdapted] = (0, react_1.useState)(false);
    return (<react_native_1.ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <react_native_1.Text style={styles.categoryLabel}>PROGRAM ROADMAP</react_native_1.Text>
      <react_native_1.Text style={styles.title}>14-Day Fajr Recovery</react_native_1.Text>
      <react_native_1.Text style={styles.subtitle}>
        Re-aligning your evening routine so waking for Fajr becomes natural and unhurried.
      </react_native_1.Text>

      {/* Stats Badge Row */}
      <react_native_1.View style={styles.statsRow}>
        <react_native_1.View style={styles.statBox}>
          <react_native_1.Text style={styles.statVal}>{isAdapted ? '5 min' : '10 min'}</react_native_1.Text>
          <react_native_1.Text style={styles.statLabel}>Daily Target</react_native_1.Text>
        </react_native_1.View>
        <react_native_1.View style={styles.statBox}>
          <react_native_1.Text style={styles.statVal}>14 Days</react_native_1.Text>
          <react_native_1.Text style={styles.statLabel}>Duration</react_native_1.Text>
        </react_native_1.View>
        <react_native_1.View style={styles.statBox}>
          <react_native_1.Text style={styles.statVal}>Gentle</react_native_1.Text>
          <react_native_1.Text style={styles.statLabel}>Pacing</react_native_1.Text>
        </react_native_1.View>
      </react_native_1.View>

      {/* Prophetic Ease Adaptation Notice */}
      <react_native_1.View style={styles.easeBanner}>
        <react_native_1.Text style={styles.easeTitle}>🌱 Prophetic Principle of Ease</react_native_1.Text>
        <react_native_1.Text style={styles.easeBody}>
          If 10 minutes feels heavy with your work hours, AMAL adjusts to a 5-minute micro-habit.
          No streaks to break; no spiritual failure.
        </react_native_1.Text>
        <react_native_1.TouchableOpacity style={styles.easeBtn} onPress={() => setIsAdapted(!isAdapted)}>
          <react_native_1.Text style={styles.easeBtnText}>
            {isAdapted ? 'Reset to Standard Pace (10m)' : 'Apply Gentle Pace (5m)'}
          </react_native_1.Text>
        </react_native_1.TouchableOpacity>
      </react_native_1.View>

      {/* 4 Phases of the Journey */}
      <react_native_1.Text style={styles.sectionHeader}>CURRICULUM PHASES</react_native_1.Text>
      {[
            { phase: 'Phase 1: Awareness & Friction Removal', days: 'Days 1-3', focus: 'Evening phone wind-down & dinner timing' },
            { phase: 'Phase 2: Anchoring the Sunnah', days: 'Days 4-7', focus: 'Sleeping with Wudu & bedtime Adhkar' },
            { phase: 'Phase 3: The Dawn Alarm Rhythm', days: 'Days 8-10', focus: 'Standing immediately upon waking' },
            { phase: 'Phase 4: Sincere Dawn Presence', days: 'Days 11-14', focus: 'Praying Fajr with stillness and reflection' },
        ].map((p, idx) => (<react_native_1.View key={idx} style={styles.phaseCard}>
          <react_native_1.Text style={styles.phaseTitle}>{p.phase}</react_native_1.Text>
          <react_native_1.Text style={styles.phaseDays}>{p.days}</react_native_1.Text>
          <react_native_1.Text style={styles.phaseFocus}>{p.focus}</react_native_1.Text>
        </react_native_1.View>))}

      {/* Actions */}
      <react_native_1.TouchableOpacity style={styles.primaryButton}>
        <react_native_1.Text style={styles.primaryButtonText}>Continue Day 4 Workspace</react_native_1.Text>
      </react_native_1.TouchableOpacity>
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
    statsRow: {
        flexDirection: 'row',
        gap: ui_1.AmalTheme.spacing[3],
        marginBottom: ui_1.AmalTheme.spacing[5],
    },
    statBox: {
        flex: 1,
        backgroundColor: ui_1.AmalTheme.colors.surface.cardLight,
        padding: ui_1.AmalTheme.spacing[3],
        borderRadius: ui_1.AmalTheme.radii.lg,
        borderWidth: 1,
        borderColor: ui_1.AmalTheme.colors.surface.borderLight,
        alignItems: 'center',
    },
    statVal: {
        fontSize: ui_1.AmalTheme.typography.sizes.base,
        fontWeight: '800',
        color: ui_1.AmalTheme.colors.primary,
    },
    statLabel: {
        fontSize: 10,
        color: ui_1.AmalTheme.colors.text.secondaryLight,
        marginTop: 2,
    },
    easeBanner: {
        backgroundColor: ui_1.AmalTheme.colors.primaryLight,
        padding: ui_1.AmalTheme.spacing[4],
        borderRadius: ui_1.AmalTheme.radii.xl,
        marginBottom: ui_1.AmalTheme.spacing[5],
        borderWidth: 1,
        borderColor: ui_1.AmalTheme.colors.primary,
    },
    easeTitle: {
        fontSize: ui_1.AmalTheme.typography.sizes.sm,
        fontWeight: '800',
        color: ui_1.AmalTheme.colors.primary,
        marginBottom: 4,
    },
    easeBody: {
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        color: ui_1.AmalTheme.colors.text.secondaryLight,
        lineHeight: 18,
        marginBottom: ui_1.AmalTheme.spacing[3],
    },
    easeBtn: {
        alignSelf: 'flex-start',
    },
    easeBtnText: {
        color: ui_1.AmalTheme.colors.primary,
        fontWeight: '800',
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        textDecorationLine: 'underline',
    },
    sectionHeader: {
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        fontWeight: '800',
        letterSpacing: 1,
        color: ui_1.AmalTheme.colors.text.secondaryLight,
        marginBottom: ui_1.AmalTheme.spacing[3],
    },
    phaseCard: {
        backgroundColor: ui_1.AmalTheme.colors.surface.cardLight,
        padding: ui_1.AmalTheme.spacing[4],
        borderRadius: ui_1.AmalTheme.radii.lg,
        borderWidth: 1,
        borderColor: ui_1.AmalTheme.colors.surface.borderLight,
        marginBottom: ui_1.AmalTheme.spacing[3],
    },
    phaseTitle: {
        fontSize: ui_1.AmalTheme.typography.sizes.sm,
        fontWeight: '700',
        color: ui_1.AmalTheme.colors.text.primaryLight,
    },
    phaseDays: {
        fontSize: 11,
        color: ui_1.AmalTheme.colors.accent.terracotta,
        fontWeight: '700',
        marginTop: 2,
    },
    phaseFocus: {
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        color: ui_1.AmalTheme.colors.text.secondaryLight,
        marginTop: 4,
    },
    primaryButton: {
        backgroundColor: ui_1.AmalTheme.colors.primary,
        paddingVertical: ui_1.AmalTheme.spacing[4],
        borderRadius: ui_1.AmalTheme.radii.lg,
        alignItems: 'center',
        marginTop: ui_1.AmalTheme.spacing[3],
        marginBottom: ui_1.AmalTheme.spacing[8],
    },
    primaryButtonText: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: ui_1.AmalTheme.typography.sizes.base,
    },
});
//# sourceMappingURL=%5Bid%5D.js.map