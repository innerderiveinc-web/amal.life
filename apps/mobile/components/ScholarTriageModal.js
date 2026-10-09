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
exports.ScholarTriageModal = void 0;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const ui_1 = require("@amal/ui");
const ScholarTriageModal = ({ visible, onClose, caseCategory = 'Personal Fiqh & Legal Ruling', initialQuery = '', onSubmitCase, }) => {
    const [additionalNotes, setAdditionalNotes] = (0, react_1.useState)('');
    const [submitted, setSubmitted] = (0, react_1.useState)(false);
    const handleSubmit = () => {
        setSubmitted(true);
        if (onSubmitCase) {
            onSubmitCase({ query: initialQuery, notes: additionalNotes });
        }
    };
    return (<react_native_1.Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <react_native_1.View style={styles.modalOverlay}>
        <react_native_1.View style={styles.container}>
          <react_native_1.View style={styles.badgeRow}>
            <react_native_1.View style={styles.badge}>
              <react_native_1.Text style={styles.badgeText}>HUMAN SCHOLAR REQUIRED</react_native_1.Text>
            </react_native_1.View>
          </react_native_1.View>

          <react_native_1.Text style={styles.title}>This question requires qualified scholarly judgment</react_native_1.Text>
          <react_native_1.Text style={styles.body}>
            Under Islamic governance and AMAL’s safety rules, AI models do not issue personalized
            fatwas, divorce rulings, or formal legal decrees.
          </react_native_1.Text>

          <react_native_1.View style={styles.categoryBox}>
            <react_native_1.Text style={styles.categoryLabel}>DETECTED SENSITIVE DOMAIN</react_native_1.Text>
            <react_native_1.Text style={styles.categoryVal}>{caseCategory}</react_native_1.Text>
          </react_native_1.View>

          <react_native_1.View style={styles.consentBreakdownBox}>
            <react_native_1.View style={styles.consentItem}>
              <react_native_1.Text style={styles.consentHeading}>What will be shared:</react_native_1.Text>
              <react_native_1.Text style={styles.consentText}>• Your specific question and relevant factual context</react_native_1.Text>
            </react_native_1.View>
            <react_native_1.View style={styles.consentItem}>
              <react_native_1.Text style={styles.consentHeading}>What won't be shared:</react_native_1.Text>
              <react_native_1.Text style={styles.consentText}>• Unrelated private reflections and personal journals remain strictly isolated</react_native_1.Text>
            </react_native_1.View>
          </react_native_1.View>

          {!submitted ? (<>
              <react_native_1.Text style={styles.promptLabel}>
                Add relevant context or background for the resident scholar:
              </react_native_1.Text>
              <react_native_1.TextInput style={styles.textInput} placeholder="Include any specific details or conditions..." placeholderTextColor={ui_1.AmalTheme.colors.text.tertiaryLight} value={additionalNotes} onChangeText={setAdditionalNotes} multiline/>

              <react_native_1.TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <react_native_1.Text style={styles.submitButtonText}>Submit to Scholar Desk Queue</react_native_1.Text>
              </react_native_1.TouchableOpacity>

              <react_native_1.TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <react_native_1.Text style={styles.cancelButtonText}>Cancel & Browse General Evidence</react_native_1.Text>
              </react_native_1.TouchableOpacity>
            </>) : (<react_native_1.View style={styles.successBox}>
              <react_native_1.Text style={styles.successTitle}>✓ Case Confidentially Queued</react_native_1.Text>
              <react_native_1.Text style={styles.successBody}>
                Your inquiry has been assigned Case #SCH-8421. A qualified jurist will review the
                matter and respond privately.
              </react_native_1.Text>
              <react_native_1.TouchableOpacity style={styles.submitButton} onPress={onClose}>
                <react_native_1.Text style={styles.submitButtonText}>Done</react_native_1.Text>
              </react_native_1.TouchableOpacity>
            </react_native_1.View>)}
        </react_native_1.View>
      </react_native_1.View>
    </react_native_1.Modal>);
};
exports.ScholarTriageModal = ScholarTriageModal;
const styles = react_native_1.StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        padding: ui_1.AmalTheme.spacing[4],
    },
    container: {
        backgroundColor: ui_1.AmalTheme.colors.surface.cardLight,
        borderRadius: ui_1.AmalTheme.radii.xl,
        padding: ui_1.AmalTheme.spacing[5],
        ...ui_1.AmalTheme.shadows.card,
    },
    badgeRow: {
        marginBottom: ui_1.AmalTheme.spacing[3],
    },
    badge: {
        backgroundColor: ui_1.AmalTheme.colors.accent.terracottaLight,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: ui_1.AmalTheme.radii.sm,
        alignSelf: 'flex-start',
    },
    badgeText: {
        color: ui_1.AmalTheme.colors.accent.terracotta,
        fontWeight: '800',
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        letterSpacing: 0.5,
    },
    title: {
        fontSize: ui_1.AmalTheme.typography.sizes.lg,
        fontWeight: '800',
        color: ui_1.AmalTheme.colors.text.primaryLight,
        lineHeight: 24,
        marginBottom: ui_1.AmalTheme.spacing[2],
    },
    body: {
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        color: ui_1.AmalTheme.colors.text.secondaryLight,
        lineHeight: 18,
        marginBottom: ui_1.AmalTheme.spacing[3],
    },
    categoryBox: {
        backgroundColor: ui_1.AmalTheme.colors.surface.backgroundLight,
        padding: ui_1.AmalTheme.spacing[3],
        borderRadius: ui_1.AmalTheme.radii.md,
        marginBottom: ui_1.AmalTheme.spacing[4],
    },
    categoryLabel: {
        fontSize: 10,
        fontWeight: '800',
        color: ui_1.AmalTheme.colors.text.secondaryLight,
        letterSpacing: 0.8,
    },
    categoryVal: {
        fontSize: ui_1.AmalTheme.typography.sizes.sm,
        fontWeight: '700',
        color: ui_1.AmalTheme.colors.text.primaryLight,
        marginTop: 2,
    },
    promptLabel: {
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        fontWeight: '700',
        color: ui_1.AmalTheme.colors.text.primaryLight,
        marginBottom: ui_1.AmalTheme.spacing[1],
    },
    textInput: {
        backgroundColor: ui_1.AmalTheme.colors.surface.backgroundLight,
        borderRadius: ui_1.AmalTheme.radii.md,
        padding: ui_1.AmalTheme.spacing[3],
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        color: ui_1.AmalTheme.colors.text.primaryLight,
        minHeight: 64,
        borderWidth: 1,
        borderColor: ui_1.AmalTheme.colors.surface.borderLight,
        textAlignVertical: 'top',
        marginBottom: ui_1.AmalTheme.spacing[4],
    },
    submitButton: {
        backgroundColor: ui_1.AmalTheme.colors.primary,
        paddingVertical: ui_1.AmalTheme.spacing[3],
        borderRadius: ui_1.AmalTheme.radii.lg,
        alignItems: 'center',
        marginBottom: ui_1.AmalTheme.spacing[2],
    },
    submitButtonText: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: ui_1.AmalTheme.typography.sizes.sm,
    },
    cancelButton: {
        paddingVertical: ui_1.AmalTheme.spacing[2],
        alignItems: 'center',
    },
    cancelButtonText: {
        color: ui_1.AmalTheme.colors.text.secondaryLight,
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        fontWeight: '600',
    },
    successBox: {
        backgroundColor: ui_1.AmalTheme.colors.status.successLight,
        padding: ui_1.AmalTheme.spacing[4],
        borderRadius: ui_1.AmalTheme.radii.md,
        marginVertical: ui_1.AmalTheme.spacing[2],
    },
    successTitle: {
        fontSize: ui_1.AmalTheme.typography.sizes.sm,
        fontWeight: '800',
        color: ui_1.AmalTheme.colors.status.success,
        marginBottom: 4,
    },
    successBody: {
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        color: ui_1.AmalTheme.colors.text.primaryLight,
        lineHeight: 18,
        marginBottom: ui_1.AmalTheme.spacing[3],
    },
    consentBreakdownBox: {
        backgroundColor: ui_1.AmalTheme.colors.surface.backgroundLight,
        padding: ui_1.AmalTheme.spacing[3],
        borderRadius: ui_1.AmalTheme.radii.md,
        marginBottom: ui_1.AmalTheme.spacing[3],
        gap: 4,
    },
    consentItem: {
        marginBottom: 2,
    },
    consentHeading: {
        fontSize: 10,
        fontWeight: '800',
        color: ui_1.AmalTheme.colors.primary,
        letterSpacing: 0.5,
    },
    consentText: {
        fontSize: 11,
        color: ui_1.AmalTheme.colors.text.secondaryLight,
        lineHeight: 16,
    },
});
//# sourceMappingURL=ScholarTriageModal.js.map