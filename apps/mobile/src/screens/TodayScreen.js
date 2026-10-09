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
exports.TodayScreen = void 0;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const ui_1 = require("@amal/ui");
const TodayScreen = () => {
    const [amalDone, setAmalDone] = (0, react_1.useState)(false);
    return (<react_native_1.ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <react_native_1.View style={styles.header}>
        <react_native_1.Text style={styles.greeting}>Good morning, Ahmad.</react_native_1.Text>
        <react_native_1.Text style={styles.subGreeting}>From Niyyah to Amal.</react_native_1.Text>
      </react_native_1.View>

      {/* 1. Next Prayer Card (Under 5-second grasp) */}
      <react_native_1.View style={styles.prayerCard}>
        <react_native_1.Text style={styles.cardCategory}>NEXT PRAYER</react_native_1.Text>
        <react_native_1.View style={styles.prayerRow}>
          <react_native_1.Text style={styles.prayerName}>ASR</react_native_1.Text>
          <react_native_1.Text style={styles.prayerCountdown}>in 42 min</react_native_1.Text>
        </react_native_1.View>
        <react_native_1.Text style={styles.prayerTimeDetail}>3:52 PM · Standard Calculation · Quiet Preparation</react_native_1.Text>
      </react_native_1.View>

      {/* 2. Today's Amal (One Primary Meaningful Action) */}
      <react_native_1.View style={styles.amalCard}>
        <react_native_1.View style={styles.cardHeaderRow}>
          <react_native_1.Text style={styles.cardCategory}>TODAY'S AMAL</react_native_1.Text>
          <react_native_1.Text style={styles.timeTag}>10 min</react_native_1.Text>
        </react_native_1.View>
        <react_native_1.Text style={styles.amalTitle}>Call your parents today</react_native_1.Text>
        <react_native_1.Text style={styles.amalWhy}>Why: Family relationship journey · Connecting ties of kinship</react_native_1.Text>
        <react_native_1.View style={styles.evidenceBadge}>
          <react_native_1.Text style={styles.evidenceText}>Evidence: Quran 17:23 ("And to parents, good treatment")</react_native_1.Text>
        </react_native_1.View>
        <react_native_1.TouchableOpacity style={[styles.doneButton, amalDone && styles.doneButtonCompleted]} onPress={() => setAmalDone(!amalDone)}>
          <react_native_1.Text style={styles.doneButtonText}>
            {amalDone ? '✓ Completed with Sincerity' : 'Mark as Done'}
          </react_native_1.Text>
        </react_native_1.TouchableOpacity>
      </react_native_1.View>

      {/* 3. Active Journey Card */}
      <react_native_1.View style={styles.journeyCard}>
        <react_native_1.Text style={styles.cardCategory}>ACTIVE JOURNEY</react_native_1.Text>
        <react_native_1.Text style={styles.journeyTitle}>Fajr Recovery · Day 4</react_native_1.Text>
        <react_native_1.Text style={styles.journeyGoal}>Resetting your evening anchor & wind-down routine.</react_native_1.Text>
        <react_native_1.View style={styles.progressBarBg}>
          <react_native_1.View style={[styles.progressBarFill, { width: '28%' }]}/>
        </react_native_1.View>
      </react_native_1.View>

      {/* 4. Reflection Prompt */}
      <react_native_1.View style={styles.reflectionCard}>
        <react_native_1.Text style={styles.cardCategory}>CALM MUHASABAH</react_native_1.Text>
        <react_native_1.Text style={styles.reflectionPrompt}>
          "What is one small blessing you noticed in your routine today?"
        </react_native_1.Text>
        <react_native_1.TouchableOpacity style={styles.reflectButton}>
          <react_native_1.Text style={styles.reflectButtonText}>Open Daily Reflection</react_native_1.Text>
        </react_native_1.TouchableOpacity>
      </react_native_1.View>
    </react_native_1.ScrollView>);
};
exports.TodayScreen = TodayScreen;
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ui_1.AmalTheme.colors.surface.backgroundLight,
    },
    content: {
        padding: 20,
        paddingTop: 60,
    },
    header: {
        marginBottom: 24,
    },
    greeting: {
        fontSize: 28,
        fontWeight: '700',
        color: ui_1.AmalTheme.colors.text.primaryLight,
    },
    subGreeting: {
        fontSize: 15,
        color: ui_1.AmalTheme.colors.text.secondaryLight,
        marginTop: 4,
    },
    cardCategory: {
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 1,
        color: ui_1.AmalTheme.colors.primary,
        marginBottom: 6,
    },
    prayerCard: {
        backgroundColor: ui_1.AmalTheme.colors.surface.cardLight,
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: ui_1.AmalTheme.colors.surface.borderLight,
    },
    prayerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
    },
    prayerName: {
        fontSize: 32,
        fontWeight: '800',
        color: ui_1.AmalTheme.colors.text.primaryLight,
    },
    prayerCountdown: {
        fontSize: 18,
        fontWeight: '600',
        color: ui_1.AmalTheme.colors.accent.terracotta,
    },
    prayerTimeDetail: {
        fontSize: 13,
        color: ui_1.AmalTheme.colors.text.secondaryLight,
        marginTop: 6,
    },
    amalCard: {
        backgroundColor: ui_1.AmalTheme.colors.surface.cardLight,
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: ui_1.AmalTheme.colors.surface.borderLight,
    },
    cardHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    timeTag: {
        fontSize: 12,
        backgroundColor: ui_1.AmalTheme.colors.primaryLight,
        color: ui_1.AmalTheme.colors.primary,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
        fontWeight: '600',
    },
    amalTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: ui_1.AmalTheme.colors.text.primaryLight,
        marginTop: 8,
    },
    amalWhy: {
        fontSize: 14,
        color: ui_1.AmalTheme.colors.text.secondaryLight,
        marginTop: 4,
    },
    evidenceBadge: {
        backgroundColor: ui_1.AmalTheme.colors.accent.sand,
        padding: 10,
        borderRadius: 8,
        marginTop: 12,
    },
    evidenceText: {
        fontSize: 12,
        color: ui_1.AmalTheme.colors.text.primaryLight,
        fontStyle: 'italic',
    },
    doneButton: {
        backgroundColor: ui_1.AmalTheme.colors.primary,
        borderRadius: 10,
        paddingVertical: 14,
        alignItems: 'center',
        marginTop: 16,
    },
    doneButtonCompleted: {
        backgroundColor: ui_1.AmalTheme.colors.status.success,
    },
    doneButtonText: {
        color: '#FFFFFF',
        fontWeight: '600',
        fontSize: 15,
    },
    journeyCard: {
        backgroundColor: ui_1.AmalTheme.colors.surface.cardLight,
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: ui_1.AmalTheme.colors.surface.borderLight,
    },
    journeyTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: ui_1.AmalTheme.colors.text.primaryLight,
        marginTop: 4,
    },
    journeyGoal: {
        fontSize: 14,
        color: ui_1.AmalTheme.colors.text.secondaryLight,
        marginTop: 4,
    },
    progressBarBg: {
        height: 6,
        backgroundColor: ui_1.AmalTheme.colors.surface.borderLight,
        borderRadius: 3,
        marginTop: 14,
    },
    progressBarFill: {
        height: 6,
        backgroundColor: ui_1.AmalTheme.colors.primary,
        borderRadius: 3,
    },
    reflectionCard: {
        backgroundColor: ui_1.AmalTheme.colors.surface.cardLight,
        borderRadius: 16,
        padding: 20,
        marginBottom: 30,
        borderWidth: 1,
        borderColor: ui_1.AmalTheme.colors.surface.borderLight,
    },
    reflectionPrompt: {
        fontSize: 15,
        fontStyle: 'italic',
        color: ui_1.AmalTheme.colors.text.primaryLight,
        marginTop: 4,
        lineHeight: 22,
    },
    reflectButton: {
        marginTop: 12,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: ui_1.AmalTheme.colors.primary,
        borderRadius: 8,
        alignItems: 'center',
    },
    reflectButtonText: {
        color: ui_1.AmalTheme.colors.primary,
        fontWeight: '600',
        fontSize: 14,
    },
});
//# sourceMappingURL=TodayScreen.js.map