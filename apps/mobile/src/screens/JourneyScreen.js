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
exports.JourneyScreen = void 0;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const ui_1 = require("@amal/ui");
const JourneyScreen = () => {
    const [showAdaptationNotice, setShowAdaptationNotice] = (0, react_1.useState)(false);
    const journeys = [
        { title: '14-Day Fajr Recovery', pace: 'Moderate', days: 14, active: true },
        { title: '21-Day Salah Consistency', pace: 'Gentle', days: 21, active: false },
        { title: '14-Day Quran Restart', pace: 'Very Easy', days: 14, active: false },
        { title: '30-Day Daily Quran Habit', pace: 'Steady', days: 30, active: false },
        { title: '7-Day Anger & Patience', pace: 'Gentle', days: 7, active: false },
        { title: '14-Day Time & Deen Alignment', pace: 'Steady', days: 14, active: false },
        { title: 'New Muslim: First 30 Days', pace: 'Supportive', days: 30, active: false },
        { title: '14-Day Ramadan Preparation', pace: 'Steady', days: 14, active: false },
    ];
    return (<react_native_1.ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <react_native_1.Text style={styles.title}>Journeys</react_native_1.Text>
      <react_native_1.Text style={styles.subtitle}>Small, grounded steps · Adaptive pacing without guilt</react_native_1.Text>

      {/* Adaptive Reassurance Banner */}
      <react_native_1.View style={styles.adaptationBanner}>
        <react_native_1.Text style={styles.adaptationHeader}>🌱 The Prophetic Principle of Ease</react_native_1.Text>
        <react_native_1.Text style={styles.adaptationBody}>
          "Indeed, this religion is easy, and no one overburdens himself except that it will overcome him." (Bukhari 39).
          If a routine feels too demanding, AMAL adjusts the difficulty rather than pressuring you.
        </react_native_1.Text>
        <react_native_1.TouchableOpacity style={styles.adaptButton} onPress={() => setShowAdaptationNotice(!showAdaptationNotice)}>
          <react_native_1.Text style={styles.adaptButtonText}>
            {showAdaptationNotice ? 'Hide Adaptive Options' : 'Need a Simpler Pace?'}
          </react_native_1.Text>
        </react_native_1.TouchableOpacity>

        {showAdaptationNotice && (<react_native_1.View style={styles.adaptationNoticeBox}>
            <react_native_1.Text style={styles.adaptationNoticeTitle}>Recommended Pace Adjustment:</react_native_1.Text>
            <react_native_1.Text style={styles.adaptationNoticeText}>
              • Daily commitment reduced from 15 mins to 5 mins{'\n'}
              • Phone wind-down simplified to 1 isolated evening habit{'\n'}
              • Zero streak guilt: resume at your natural rhythm
            </react_native_1.Text>
            <react_native_1.TouchableOpacity style={styles.confirmAdaptButton}>
              <react_native_1.Text style={styles.confirmAdaptButtonText}>Apply Gentle Adaptation</react_native_1.Text>
            </react_native_1.TouchableOpacity>
          </react_native_1.View>)}
      </react_native_1.View>

      {/* Journey List */}
      <react_native_1.Text style={styles.sectionHeader}>CORE V1 JOURNEYS</react_native_1.Text>
      {journeys.map((j, i) => (<react_native_1.View key={i} style={[styles.card, j.active && styles.cardActive]}>
          <react_native_1.View style={styles.cardHeader}>
            <react_native_1.Text style={styles.cardTitle}>{j.title}</react_native_1.Text>
            {j.active && <react_native_1.Text style={styles.activeTag}>IN PROGRESS</react_native_1.Text>}
          </react_native_1.View>
          <react_native_1.View style={styles.cardMeta}>
            <react_native_1.Text style={styles.metaText}>{j.days} Days</react_native_1.Text>
            <react_native_1.Text style={styles.metaDot}>·</react_native_1.Text>
            <react_native_1.Text style={styles.metaText}>{j.pace} Pace</react_native_1.Text>
          </react_native_1.View>
          <react_native_1.TouchableOpacity style={[styles.cardAction, j.active && styles.cardActionActive]}>
            <react_native_1.Text style={[styles.cardActionText, j.active && styles.cardActionTextActive]}>
              {j.active ? 'Continue Today (Day 4)' : 'Preview Journey'}
            </react_native_1.Text>
          </react_native_1.TouchableOpacity>
        </react_native_1.View>))}
    </react_native_1.ScrollView>);
};
exports.JourneyScreen = JourneyScreen;
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
        marginBottom: 20,
    },
    adaptationBanner: {
        backgroundColor: ui_1.AmalTheme.colors.primaryLight,
        borderRadius: 16,
        padding: 18,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: ui_1.AmalTheme.colors.primary,
    },
    adaptationHeader: {
        fontSize: 14,
        fontWeight: '700',
        color: ui_1.AmalTheme.colors.primary,
        marginBottom: 6,
    },
    adaptationBody: {
        fontSize: 13,
        color: ui_1.AmalTheme.colors.text.secondaryLight,
        lineHeight: 19,
    },
    adaptButton: {
        marginTop: 10,
        alignSelf: 'flex-start',
    },
    adaptButtonText: {
        color: ui_1.AmalTheme.colors.primary,
        fontWeight: '700',
        fontSize: 13,
        textDecorationLine: 'underline',
    },
    adaptationNoticeBox: {
        marginTop: 12,
        padding: 12,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
    },
    adaptationNoticeTitle: {
        fontWeight: '700',
        fontSize: 13,
        color: ui_1.AmalTheme.colors.primary,
        marginBottom: 4,
    },
    adaptationNoticeText: {
        fontSize: 12,
        color: ui_1.AmalTheme.colors.text.secondaryLight,
        lineHeight: 18,
    },
    confirmAdaptButton: {
        backgroundColor: ui_1.AmalTheme.colors.primary,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 6,
        marginTop: 8,
        alignSelf: 'flex-start',
    },
    confirmAdaptButtonText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '700',
    },
    sectionHeader: {
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 1,
        color: ui_1.AmalTheme.colors.primary,
        marginBottom: 12,
    },
    card: {
        backgroundColor: ui_1.AmalTheme.colors.surface.cardLight,
        borderRadius: 14,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: ui_1.AmalTheme.colors.surface.borderLight,
    },
    cardActive: {
        borderColor: ui_1.AmalTheme.colors.primary,
        borderWidth: 1.5,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: ui_1.AmalTheme.colors.text.primaryLight,
    },
    activeTag: {
        fontSize: 10,
        fontWeight: '800',
        color: ui_1.AmalTheme.colors.primary,
        backgroundColor: ui_1.AmalTheme.colors.primaryLight,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    cardMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
        marginBottom: 14,
    },
    metaText: {
        fontSize: 12,
        color: ui_1.AmalTheme.colors.text.secondaryLight,
    },
    metaDot: {
        marginHorizontal: 6,
        color: ui_1.AmalTheme.colors.text.tertiaryLight,
    },
    cardAction: {
        paddingVertical: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: ui_1.AmalTheme.colors.surface.borderLight,
        alignItems: 'center',
    },
    cardActionActive: {
        backgroundColor: ui_1.AmalTheme.colors.primary,
        borderColor: ui_1.AmalTheme.colors.primary,
    },
    cardActionText: {
        fontSize: 13,
        fontWeight: '600',
        color: ui_1.AmalTheme.colors.text.secondaryLight,
    },
    cardActionTextActive: {
        color: '#FFFFFF',
    },
});
//# sourceMappingURL=JourneyScreen.js.map