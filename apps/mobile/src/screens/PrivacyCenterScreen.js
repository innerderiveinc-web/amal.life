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
exports.PrivacyCenterScreen = void 0;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const ui_1 = require("@amal/ui");
const PrivacyCenterScreen = () => {
    const [aiMemoryEnabled, setAiMemoryEnabled] = (0, react_1.useState)(true);
    const [behavioralInsightsEnabled, setBehavioralInsightsEnabled] = (0, react_1.useState)(true);
    const [exported, setExported] = (0, react_1.useState)(false);
    return (<react_native_1.ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <react_native_1.Text style={styles.title}>Privacy & Consent</react_native_1.Text>
      <react_native_1.Text style={styles.subtitle}>
        Your worship and spiritual life belong solely to you. Zero advertising, zero sale of personal data.
      </react_native_1.Text>

      {/* Principles Badge */}
      <react_native_1.View style={styles.policyCard}>
        <react_native_1.Text style={styles.policyTitle}>🔒 Privacy by Design</react_native_1.Text>
        <react_native_1.Text style={styles.policyBody}>
          AMAL adheres to OWASP MASVS baseline standards. Reflections and religious queries are never sold to ad networks, shared with employers, or used to build commercial profiles.
        </react_native_1.Text>
      </react_native_1.View>

      {/* AI Memory Controls */}
      <react_native_1.View style={styles.sectionCard}>
        <react_native_1.Text style={styles.sectionTitle}>AI MEMORY CONTROLS</react_native_1.Text>
        <react_native_1.View style={styles.switchRow}>
          <react_native_1.View style={styles.switchLabelContainer}>
            <react_native_1.Text style={styles.switchLabel}>Allow AI Personal Context</react_native_1.Text>
            <react_native_1.Text style={styles.switchSubLabel}>
              Allows AMAL to recall your preferred routine constraints (e.g. evening work hours) to adapt journeys.
            </react_native_1.Text>
          </react_native_1.View>
          <react_native_1.Switch value={aiMemoryEnabled} onValueChange={setAiMemoryEnabled} trackColor={{ false: '#767577', true: ui_1.AmalTheme.colors.primary }}/>
        </react_native_1.View>

        <react_native_1.View style={styles.switchRow}>
          <react_native_1.View style={styles.switchLabelContainer}>
            <react_native_1.Text style={styles.switchLabel}>Behavioral Insights</react_native_1.Text>
            <react_native_1.Text style={styles.switchSubLabel}>
              Derive routine patterns (e.g. sleep hour correlation) without spiritual judgment.
            </react_native_1.Text>
          </react_native_1.View>
          <react_native_1.Switch value={behavioralInsightsEnabled} onValueChange={setBehavioralInsightsEnabled} trackColor={{ false: '#767577', true: ui_1.AmalTheme.colors.primary }}/>
        </react_native_1.View>

        <react_native_1.TouchableOpacity style={styles.purgeButton}>
          <react_native_1.Text style={styles.purgeButtonText}>Clear All AI Memory History</react_native_1.Text>
        </react_native_1.TouchableOpacity>
      </react_native_1.View>

      {/* Data Sovereignty */}
      <react_native_1.View style={styles.sectionCard}>
        <react_native_1.Text style={styles.sectionTitle}>DATA SOVEREIGNTY</react_native_1.Text>
        <react_native_1.TouchableOpacity style={styles.actionRow} onPress={() => setExported(true)}>
          <react_native_1.Text style={styles.actionText}>
            {exported ? '✓ Data Export Downloaded (JSON)' : 'Export Complete User Data (GDPR)'}
          </react_native_1.Text>
        </react_native_1.TouchableOpacity>

        <react_native_1.TouchableOpacity style={[styles.actionRow, styles.deleteActionRow]}>
          <react_native_1.Text style={styles.deleteText}>Delete Account & Erase All Records</react_native_1.Text>
        </react_native_1.TouchableOpacity>
      </react_native_1.View>
    </react_native_1.ScrollView>);
};
exports.PrivacyCenterScreen = PrivacyCenterScreen;
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
        lineHeight: 18,
    },
    policyCard: {
        backgroundColor: ui_1.AmalTheme.colors.surface.cardLight,
        borderRadius: 14,
        padding: 16,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: ui_1.AmalTheme.colors.surface.borderLight,
    },
    policyTitle: {
        fontWeight: '700',
        fontSize: 14,
        color: ui_1.AmalTheme.colors.primary,
        marginBottom: 4,
    },
    policyBody: {
        fontSize: 13,
        color: ui_1.AmalTheme.colors.text.secondaryLight,
        lineHeight: 19,
    },
    sectionCard: {
        backgroundColor: ui_1.AmalTheme.colors.surface.cardLight,
        borderRadius: 14,
        padding: 18,
        borderWidth: 1,
        borderColor: ui_1.AmalTheme.colors.surface.borderLight,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 1,
        color: ui_1.AmalTheme.colors.primary,
        marginBottom: 14,
    },
    switchRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    switchLabelContainer: {
        flex: 1,
        marginRight: 12,
    },
    switchLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: ui_1.AmalTheme.colors.text.primaryLight,
    },
    switchSubLabel: {
        fontSize: 12,
        color: ui_1.AmalTheme.colors.text.secondaryLight,
        marginTop: 2,
        lineHeight: 16,
    },
    purgeButton: {
        marginTop: 8,
        paddingVertical: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: ui_1.AmalTheme.colors.status.warning,
        alignItems: 'center',
    },
    purgeButtonText: {
        color: ui_1.AmalTheme.colors.status.warning,
        fontWeight: '600',
        fontSize: 13,
    },
    actionRow: {
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: ui_1.AmalTheme.colors.surface.borderLight,
    },
    actionText: {
        fontSize: 14,
        fontWeight: '600',
        color: ui_1.AmalTheme.colors.primary,
    },
    deleteActionRow: {
        borderBottomWidth: 0,
        marginTop: 6,
    },
    deleteText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#DC2626',
    },
});
//# sourceMappingURL=PrivacyCenterScreen.js.map