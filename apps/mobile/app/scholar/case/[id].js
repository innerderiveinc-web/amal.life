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
exports.default = ScholarCaseDetailScreen;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const ui_1 = require("@amal/ui");
function ScholarCaseDetailScreen() {
    const [scholarRuling, setScholarRuling] = (0, react_1.useState)('');
    const [completed, setCompleted] = (0, react_1.useState)(false);
    return (<react_native_1.ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <react_native_1.Text style={styles.categoryLabel}>CASE DOSSIER #SCH-8421</react_native_1.Text>
      <react_native_1.Text style={styles.title}>Divorce & Marital Jurisprudence</react_native_1.Text>
      <react_native_1.Text style={styles.subtitle}>
        Confidential review. Deliver authoritative pastoral ruling directly to user.
      </react_native_1.Text>

      {/* Sanitized User Prompt Panel */}
      <react_native_1.View style={styles.dossierPanel}>
        <react_native_1.Text style={styles.panelTitle}>1. USER INQUIRY & SANITIZED CONTEXT</react_native_1.Text>
        <react_native_1.Text style={styles.panelContent}>
          "My spouse and I have had severe disagreements. In anger, words were spoken about separation.
          I need to know the validity under Hanafi fiqh and whether reconciliation is open to us."
        </react_native_1.Text>
      </react_native_1.View>

      {/* Governed Evidence Summary Panel */}
      <react_native_1.View style={styles.dossierPanel}>
        <react_native_1.Text style={styles.panelTitle}>2. GRAPH RETRIEVED EVIDENCE BASE</react_native_1.Text>
        <react_native_1.Text style={styles.evidenceRef}>• Quran 2:229 ("Divorce is twice. Then retain or release in kindness")</react_native_1.Text>
        <react_native_1.Text style={styles.evidenceRef}>• Sunan Abi Dawud 2193 ("No divorce in a state of closure / acute rage")</react_native_1.Text>
        <react_native_1.Text style={styles.evidenceRef}>• Fatawa Hindiyya (Hanafi legal codification on conditional pronouncements)</react_native_1.Text>
      </react_native_1.View>

      {/* Scholar Response Composer */}
      <react_native_1.View style={styles.composerPanel}>
        <react_native_1.Text style={styles.panelTitle}>3. JURIST PASTORAL RULING</react_native_1.Text>
        <react_native_1.TextInput style={styles.textInput} placeholder="Type qualified pastoral ruling, attaching conditionality and counsel..." placeholderTextColor={ui_1.AmalTheme.colors.text.tertiaryLight} value={scholarRuling} onChangeText={setScholarRuling} multiline/>

        <react_native_1.TouchableOpacity style={[styles.signoffBtn, completed && styles.signoffBtnDone]} onPress={() => setCompleted(true)}>
          <react_native_1.Text style={styles.signoffBtnText}>
            {completed ? '✓ Signed & Delivered to User Vault' : 'Sign Off & Deliver Counsel'}
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
        fontSize: ui_1.AmalTheme.typography.sizes['2xl'],
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
    dossierPanel: {
        backgroundColor: ui_1.AmalTheme.colors.surface.cardLight,
        padding: ui_1.AmalTheme.spacing[4],
        borderRadius: ui_1.AmalTheme.radii.xl,
        borderWidth: 1,
        borderColor: ui_1.AmalTheme.colors.surface.borderLight,
        marginBottom: ui_1.AmalTheme.spacing[4],
    },
    panelTitle: {
        fontSize: 10,
        fontWeight: '800',
        letterSpacing: 1,
        color: ui_1.AmalTheme.colors.primary,
        marginBottom: ui_1.AmalTheme.spacing[2],
    },
    panelContent: {
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        color: ui_1.AmalTheme.colors.text.primaryLight,
        lineHeight: 18,
        fontStyle: 'italic',
    },
    evidenceRef: {
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        color: ui_1.AmalTheme.colors.text.primaryLight,
        marginTop: 3,
    },
    composerPanel: {
        backgroundColor: ui_1.AmalTheme.colors.surface.cardLight,
        padding: ui_1.AmalTheme.spacing[4],
        borderRadius: ui_1.AmalTheme.radii.xl,
        borderWidth: 1,
        borderColor: ui_1.AmalTheme.colors.surface.borderLight,
        marginBottom: ui_1.AmalTheme.spacing[8],
    },
    textInput: {
        backgroundColor: ui_1.AmalTheme.colors.surface.backgroundLight,
        borderRadius: ui_1.AmalTheme.radii.md,
        padding: ui_1.AmalTheme.spacing[3],
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        color: ui_1.AmalTheme.colors.text.primaryLight,
        minHeight: 100,
        textAlignVertical: 'top',
        borderWidth: 1,
        borderColor: ui_1.AmalTheme.colors.surface.borderLight,
        marginVertical: ui_1.AmalTheme.spacing[3],
    },
    signoffBtn: {
        backgroundColor: ui_1.AmalTheme.colors.primary,
        paddingVertical: ui_1.AmalTheme.spacing[3],
        borderRadius: ui_1.AmalTheme.radii.lg,
        alignItems: 'center',
    },
    signoffBtnDone: {
        backgroundColor: ui_1.AmalTheme.colors.status.success,
    },
    signoffBtnText: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: ui_1.AmalTheme.typography.sizes.sm,
    },
});
//# sourceMappingURL=%5Bid%5D.js.map