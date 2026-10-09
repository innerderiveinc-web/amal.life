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
exports.default = SafetyAndFeedbackScreen;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const ui_1 = require("@amal/ui");
function SafetyAndFeedbackScreen() {
    const [claimReference, setClaimReference] = (0, react_1.useState)('');
    const [issueDescription, setIssueDescription] = (0, react_1.useState)('');
    const [reported, setReported] = (0, react_1.useState)(false);
    return (<react_native_1.ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <react_native_1.Text style={styles.categoryLabel}>GOVERNANCE & CARE</react_native_1.Text>
      <react_native_1.Text style={styles.title}>Safety & Integrity</react_native_1.Text>
      <react_native_1.Text style={styles.subtitle}>
        Report questionable citations, dispute knowledge entries, or access crisis support.
      </react_native_1.Text>

      {/* Immediate Crisis Helplines */}
      <react_native_1.View style={styles.crisisCard}>
        <react_native_1.Text style={styles.crisisBadge}>IMMEDIATE CRISIS SUPPORT</react_native_1.Text>
        <react_native_1.Text style={styles.crisisTitle}>Need to speak with someone right now?</react_native_1.Text>
        <react_native_1.Text style={styles.crisisBody}>
          If you are experiencing acute distress, mental health emergency, or pastoral crisis,
          reach out to verified support immediately:
        </react_native_1.Text>
        <react_native_1.View style={styles.helplineList}>
          <react_native_1.Text style={styles.helplineItem}>• Muslim Youth Helpline (UK): 0808 808 2008</react_native_1.Text>
          <react_native_1.Text style={styles.helplineItem}>• Khalil Center Pastoral Care: +1 (855) 544-2545</react_native_1.Text>
          <react_native_1.Text style={styles.helplineItem}>• Emergency Medical Assistance: Dial local 911 / 999 / 112</react_native_1.Text>
        </react_native_1.View>
      </react_native_1.View>

      {/* Dispute Claim / Error Reporting Form */}
      <react_native_1.View style={styles.formCard}>
        <react_native_1.Text style={styles.formTitle}>Report Content or Disputed Evidence</react_native_1.Text>
        <react_native_1.Text style={styles.formSub}>
          Notice a translation error, Hadith grading discrepancy, or misplaced context?
          Our two-scholar review board investigates every submission.
        </react_native_1.Text>

        <react_native_1.Text style={styles.inputLabel}>Passage / Citation Reference:</react_native_1.Text>
        <react_native_1.TextInput style={styles.textInput} placeholder="e.g. Sahih al-Bukhari 568 or Ayah 17:78" placeholderTextColor={ui_1.AmalTheme.colors.text.tertiaryLight} value={claimReference} onChangeText={setClaimReference}/>

        <react_native_1.Text style={styles.inputLabel}>Nature of discrepancy:</react_native_1.Text>
        <react_native_1.TextInput style={[styles.textInput, { minHeight: 70 }]} placeholder="Describe why this reference needs scholarly re-review..." placeholderTextColor={ui_1.AmalTheme.colors.text.tertiaryLight} value={issueDescription} onChangeText={setIssueDescription} multiline/>

        <react_native_1.TouchableOpacity style={[styles.submitBtn, reported && styles.submitBtnDone]} onPress={() => setReported(true)}>
          <react_native_1.Text style={styles.submitBtnText}>
            {reported ? '✓ Reported to Scholar Editorial Board' : 'Submit Disputed Claim'}
          </react_native_1.Text>
        </react_native_1.TouchableOpacity>
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
    crisisCard: {
        backgroundColor: ui_1.AmalTheme.colors.surface.cardLight,
        borderRadius: ui_1.AmalTheme.radii.xl,
        padding: ui_1.AmalTheme.spacing[5],
        borderWidth: 1,
        borderColor: ui_1.AmalTheme.colors.accent.terracottaLight,
        marginBottom: ui_1.AmalTheme.spacing[5],
    },
    crisisBadge: {
        fontSize: 10,
        fontWeight: '800',
        letterSpacing: 1,
        color: ui_1.AmalTheme.colors.accent.terracotta,
        marginBottom: 4,
    },
    crisisTitle: {
        fontSize: ui_1.AmalTheme.typography.sizes.base,
        fontWeight: '800',
        color: ui_1.AmalTheme.colors.text.primaryLight,
        marginBottom: 4,
    },
    crisisBody: {
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        color: ui_1.AmalTheme.colors.text.secondaryLight,
        lineHeight: 18,
        marginBottom: ui_1.AmalTheme.spacing[3],
    },
    helplineList: {
        gap: 4,
    },
    helplineItem: {
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        fontWeight: '600',
        color: ui_1.AmalTheme.colors.text.primaryLight,
    },
    formCard: {
        backgroundColor: ui_1.AmalTheme.colors.surface.cardLight,
        borderRadius: ui_1.AmalTheme.radii.xl,
        padding: ui_1.AmalTheme.spacing[5],
        borderWidth: 1,
        borderColor: ui_1.AmalTheme.colors.surface.borderLight,
        marginBottom: ui_1.AmalTheme.spacing[8],
    },
    formTitle: {
        fontSize: ui_1.AmalTheme.typography.sizes.base,
        fontWeight: '800',
        color: ui_1.AmalTheme.colors.text.primaryLight,
        marginBottom: 4,
    },
    formSub: {
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        color: ui_1.AmalTheme.colors.text.secondaryLight,
        lineHeight: 18,
        marginBottom: ui_1.AmalTheme.spacing[4],
    },
    inputLabel: {
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        fontWeight: '700',
        color: ui_1.AmalTheme.colors.text.primaryLight,
        marginBottom: 4,
        marginTop: ui_1.AmalTheme.spacing[2],
    },
    textInput: {
        backgroundColor: ui_1.AmalTheme.colors.surface.backgroundLight,
        borderRadius: ui_1.AmalTheme.radii.md,
        padding: ui_1.AmalTheme.spacing[3],
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        color: ui_1.AmalTheme.colors.text.primaryLight,
        borderWidth: 1,
        borderColor: ui_1.AmalTheme.colors.surface.borderLight,
    },
    submitBtn: {
        backgroundColor: ui_1.AmalTheme.colors.primary,
        paddingVertical: ui_1.AmalTheme.spacing[3],
        borderRadius: ui_1.AmalTheme.radii.lg,
        alignItems: 'center',
        marginTop: ui_1.AmalTheme.spacing[4],
    },
    submitBtnDone: {
        backgroundColor: ui_1.AmalTheme.colors.status.success,
    },
    submitBtnText: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: ui_1.AmalTheme.typography.sizes.sm,
    },
});
//# sourceMappingURL=safety.js.map