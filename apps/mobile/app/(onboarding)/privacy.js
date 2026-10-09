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
exports.default = PrivacyScreen;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const ui_1 = require("@amal/ui");
function PrivacyScreen() {
    const [personalContext, setPersonalContext] = (0, react_1.useState)(true);
    const [auditableMemory, setAuditableMemory] = (0, react_1.useState)(true);
    const [familySharing, setFamilySharing] = (0, react_1.useState)(false);
    const [anonymousDiag, setAnonymousDiag] = (0, react_1.useState)(false);
    return (<react_native_1.View style={styles.container}>
      <react_native_1.ScrollView contentContainerStyle={styles.content}>
        <react_native_1.Text style={styles.stepIndicator}>STEP 5 OF 6</react_native_1.Text>
        <react_native_1.Text style={styles.title}>Privacy & Data Sovereignty</react_native_1.Text>
        <react_native_1.Text style={styles.subtitle}>
          Your spiritual life belongs solely to you and Allah. Transparent, consent-driven architecture.
        </react_native_1.Text>

        <react_native_1.View style={styles.togglesCard}>
          <react_native_1.View style={styles.switchRow}>
            <react_native_1.View style={styles.textContainer}>
              <react_native_1.Text style={styles.switchTitle}>AI Personal Context</react_native_1.Text>
              <react_native_1.Text style={styles.switchSubtitle}>
                Allows AMAL to adapt daily plans based on your stated time constraints.
              </react_native_1.Text>
            </react_native_1.View>
            <react_native_1.Switch value={personalContext} onValueChange={setPersonalContext} trackColor={{ false: '#767577', true: ui_1.AmalTheme.colors.primary }}/>
          </react_native_1.View>

          <react_native_1.View style={styles.switchRow}>
            <react_native_1.View style={styles.textContainer}>
              <react_native_1.Text style={styles.switchTitle}>Auditable Memory Retention</react_native_1.Text>
              <react_native_1.Text style={styles.switchSubtitle}>
                You can review, edit, or wipe all facts AMAL remembers at any time.
              </react_native_1.Text>
            </react_native_1.View>
            <react_native_1.Switch value={auditableMemory} onValueChange={setAuditableMemory} trackColor={{ false: '#767577', true: ui_1.AmalTheme.colors.primary }}/>
          </react_native_1.View>

          <react_native_1.View style={styles.switchRow}>
            <react_native_1.View style={styles.textContainer}>
              <react_native_1.Text style={styles.switchTitle}>Cross-Family Data Sharing</react_native_1.Text>
              <react_native_1.Text style={styles.switchSubtitle}>
                Default OFF: Adult reflections remain strictly isolated from family members.
              </react_native_1.Text>
            </react_native_1.View>
            <react_native_1.Switch value={familySharing} onValueChange={setFamilySharing} trackColor={{ false: '#767577', true: ui_1.AmalTheme.colors.primary }}/>
          </react_native_1.View>

          <react_native_1.View style={[styles.switchRow, { borderBottomWidth: 0 }]}>
            <react_native_1.View style={styles.textContainer}>
              <react_native_1.Text style={styles.switchTitle}>Anonymous Performance Metrics</react_native_1.Text>
              <react_native_1.Text style={styles.switchSubtitle}>
                Share non-personal crash analytics to improve app stability.
              </react_native_1.Text>
            </react_native_1.View>
            <react_native_1.Switch value={anonymousDiag} onValueChange={setAnonymousDiag} trackColor={{ false: '#767577', true: ui_1.AmalTheme.colors.primary }}/>
          </react_native_1.View>
        </react_native_1.View>
      </react_native_1.ScrollView>

      <react_native_1.View style={styles.footer}>
        <react_native_1.TouchableOpacity style={styles.primaryButton}>
          <react_native_1.Text style={styles.primaryButtonText}>Confirm Privacy Setup</react_native_1.Text>
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
//# sourceMappingURL=privacy.js.map