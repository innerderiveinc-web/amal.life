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
exports.default = NotificationSetupScreen;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const ui_1 = require("@amal/ui");
function NotificationSetupScreen() {
    const [prayerAlerts, setPrayerAlerts] = (0, react_1.useState)(true);
    const [morningAmal, setMorningAmal] = (0, react_1.useState)(true);
    const [eveningMuhasabah, setEveningMuhasabah] = (0, react_1.useState)(true);
    const [knowledgeUpdates, setKnowledgeUpdates] = (0, react_1.useState)(false);
    return (<react_native_1.View style={styles.container}>
      <react_native_1.ScrollView contentContainerStyle={styles.content}>
        <react_native_1.Text style={styles.stepIndicator}>STEP 6 OF 6</react_native_1.Text>
        <react_native_1.Text style={styles.title}>Calm Reminders</react_native_1.Text>
        <react_native_1.Text style={styles.subtitle}>
          AMAL adheres to a conservative notification philosophy. Never spam or anxiety-inducing alerts.
        </react_native_1.Text>

        <react_native_1.View style={styles.togglesCard}>
          <react_native_1.View style={styles.switchRow}>
            <react_native_1.View style={styles.textContainer}>
              <react_native_1.Text style={styles.switchTitle}>Prayer Call Reminders</react_native_1.Text>
              <react_native_1.Text style={styles.switchSubtitle}>
                Calm chime or gentle Adhan at prayer window entry.
              </react_native_1.Text>
            </react_native_1.View>
            <react_native_1.Switch value={prayerAlerts} onValueChange={setPrayerAlerts} trackColor={{ false: '#767577', true: ui_1.AmalTheme.colors.primary }}/>
          </react_native_1.View>

          <react_native_1.View style={styles.switchRow}>
            <react_native_1.View style={styles.textContainer}>
              <react_native_1.Text style={styles.switchTitle}>Today's Amal Morning Nudge</react_native_1.Text>
              <react_native_1.Text style={styles.switchSubtitle}>
                One focused daily micro-action to anchor your routine.
              </react_native_1.Text>
            </react_native_1.View>
            <react_native_1.Switch value={morningAmal} onValueChange={setMorningAmal} trackColor={{ false: '#767577', true: ui_1.AmalTheme.colors.primary }}/>
          </react_native_1.View>

          <react_native_1.View style={styles.switchRow}>
            <react_native_1.View style={styles.textContainer}>
              <react_native_1.Text style={styles.switchTitle}>Evening Muhasabah Check-In</react_native_1.Text>
              <react_native_1.Text style={styles.switchSubtitle}>
                Gentle invitation to reflect before bedtime.
              </react_native_1.Text>
            </react_native_1.View>
            <react_native_1.Switch value={eveningMuhasabah} onValueChange={setEveningMuhasabah} trackColor={{ false: '#767577', true: ui_1.AmalTheme.colors.primary }}/>
          </react_native_1.View>

          <react_native_1.View style={[styles.switchRow, { borderBottomWidth: 0 }]}>
            <react_native_1.View style={styles.textContainer}>
              <react_native_1.Text style={styles.switchTitle}>Learning & Knowledge Updates</react_native_1.Text>
              <react_native_1.Text style={styles.switchSubtitle}>
                Weekly thematic reflections on Quran & Hadith.
              </react_native_1.Text>
            </react_native_1.View>
            <react_native_1.Switch value={knowledgeUpdates} onValueChange={setKnowledgeUpdates} trackColor={{ false: '#767577', true: ui_1.AmalTheme.colors.primary }}/>
          </react_native_1.View>
        </react_native_1.View>

        <react_native_1.View style={styles.pledgeBox}>
          <react_native_1.Text style={styles.pledgeTitle}>🌱 GUARANTEE</react_native_1.Text>
          <react_native_1.Text style={styles.pledgeText}>
            Promotional and commercial marketing notifications are permanently disabled by system design.
          </react_native_1.Text>
        </react_native_1.View>
      </react_native_1.ScrollView>

      <react_native_1.View style={styles.footer}>
        <react_native_1.TouchableOpacity style={styles.primaryButton}>
          <react_native_1.Text style={styles.primaryButtonText}>Enter AMAL</react_native_1.Text>
        </react_native_1.TouchableOpacity>
      </react_native_1.View>
    </react_native_1.View>);
}
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ui_1.AmalTheme.colors.surface.backgroundLight,
        padding: ui_1.AmalTheme.spacing[5],
        paddingTop: ui_1.AmalTheme.spacing[8],
    },
    content: {
        paddingBottom: ui_1.AmalTheme.spacing[8],
    },
    stepIndicator: {
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        fontWeight: '800',
        color: ui_1.AmalTheme.colors.primary,
        letterSpacing: 1,
        marginBottom: 4,
    },
    title: {
        fontSize: ui_1.AmalTheme.typography.sizes['2xl'],
        fontWeight: '800',
        color: ui_1.AmalTheme.colors.text.primaryLight,
        marginBottom: 4,
    },
    subtitle: {
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        color: ui_1.AmalTheme.colors.text.secondaryLight,
        lineHeight: 18,
        marginBottom: ui_1.AmalTheme.spacing[5],
    },
    togglesCard: {
        backgroundColor: ui_1.AmalTheme.colors.surface.cardLight,
        borderRadius: ui_1.AmalTheme.radii.xl,
        padding: ui_1.AmalTheme.spacing[4],
        borderWidth: 1,
        borderColor: ui_1.AmalTheme.colors.surface.borderLight,
    },
    switchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: ui_1.AmalTheme.spacing[3],
        borderBottomWidth: 1,
        borderBottomColor: ui_1.AmalTheme.colors.surface.borderLight,
    },
    textContainer: {
        flex: 1,
        marginRight: ui_1.AmalTheme.spacing[3],
    },
    switchTitle: {
        fontSize: ui_1.AmalTheme.typography.sizes.sm,
        fontWeight: '700',
        color: ui_1.AmalTheme.colors.text.primaryLight,
    },
    switchSubtitle: {
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        color: ui_1.AmalTheme.colors.text.secondaryLight,
        marginTop: 2,
        lineHeight: 16,
    },
    pledgeBox: {
        backgroundColor: ui_1.AmalTheme.colors.accent.sand,
        borderRadius: ui_1.AmalTheme.radii.lg,
        padding: ui_1.AmalTheme.spacing[4],
        marginTop: ui_1.AmalTheme.spacing[4],
    },
    pledgeTitle: {
        fontSize: 10,
        fontWeight: '800',
        letterSpacing: 1,
        color: ui_1.AmalTheme.colors.primary,
        marginBottom: 2,
    },
    pledgeText: {
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        color: ui_1.AmalTheme.colors.text.secondaryLight,
        lineHeight: 18,
    },
    footer: {
        paddingVertical: ui_1.AmalTheme.spacing[3],
    },
    primaryButton: {
        backgroundColor: ui_1.AmalTheme.colors.primary,
        paddingVertical: ui_1.AmalTheme.spacing[4],
        borderRadius: ui_1.AmalTheme.radii.lg,
        alignItems: 'center',
    },
    primaryButtonText: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: ui_1.AmalTheme.typography.sizes.base,
    },
});
//# sourceMappingURL=notifications.js.map