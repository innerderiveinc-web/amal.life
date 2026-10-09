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
exports.MuhasabahSheet = void 0;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const ui_1 = require("@amal/ui");
const MuhasabahSheet = ({ onSave }) => {
    const [wentWell, setWentWell] = (0, react_1.useState)('');
    const [feltDifficult, setFeltDifficult] = (0, react_1.useState)('');
    const [tomorrow, setTomorrow] = (0, react_1.useState)('');
    const [saved, setSaved] = (0, react_1.useState)(false);
    const handleSave = () => {
        setSaved(true);
        if (onSave)
            onSave({ wentWell, feltDifficult, tomorrow });
    };
    return (<react_native_1.View style={styles.card}>
      <react_native_1.Text style={styles.categoryLabel}>CALM MUHASABAH</react_native_1.Text>
      <react_native_1.Text style={styles.title}>Daily Self-Accounting</react_native_1.Text>
      <react_native_1.Text style={styles.subtitle}>
        Calm, gentle reflection without moral scorecards, piety points, or judgment.
      </react_native_1.Text>

      {/* Behavioral Observation Card */}
      <react_native_1.View style={styles.observationBox}>
        <react_native_1.Text style={styles.observationHeader}>OBSERVED ROUTINE INSIGHT</react_native_1.Text>
        <react_native_1.Text style={styles.observationText}>
          • Your Quran consistency is strongest on weekend mornings between 6:30 AM and 7:30 AM.
        </react_native_1.Text>
        <react_native_1.Text style={styles.observationSub}>
          Note: This is a routine observation, never an evaluation of faith (Iman).
        </react_native_1.Text>
      </react_native_1.View>

      <react_native_1.Text style={styles.inputLabel}>1. What went well today?</react_native_1.Text>
      <react_native_1.TextInput style={styles.textInput} placeholder="e.g. Prayed Dhuhr on time, called parents..." placeholderTextColor={ui_1.AmalTheme.colors.text.tertiaryLight} value={wentWell} onChangeText={setWentWell} multiline/>

      <react_native_1.Text style={styles.inputLabel}>2. What felt difficult or rushed?</react_native_1.Text>
      <react_native_1.TextInput style={styles.textInput} placeholder="e.g. Work meeting overran, was tired after Asr..." placeholderTextColor={ui_1.AmalTheme.colors.text.tertiaryLight} value={feltDifficult} onChangeText={setFeltDifficult} multiline/>

      <react_native_1.Text style={styles.inputLabel}>3. Small intention for tomorrow morning:</react_native_1.Text>
      <react_native_1.TextInput style={styles.textInput} placeholder="e.g. Put phone down 30 mins before sleep..." placeholderTextColor={ui_1.AmalTheme.colors.text.tertiaryLight} value={tomorrow} onChangeText={setTomorrow} multiline/>

      {/* Strict Privacy Guarantee Pill */}
      <react_native_1.View style={styles.privacyPill}>
        <react_native_1.Text style={styles.privacyIcon}>🔒</react_native_1.Text>
        <react_native_1.Text style={styles.privacyText}>
          Saved privately in your personal vault. Isolated from family & external LLMs.
        </react_native_1.Text>
      </react_native_1.View>

      <react_native_1.TouchableOpacity style={[styles.saveButton, saved && styles.saveButtonDone]} onPress={handleSave}>
        <react_native_1.Text style={styles.saveButtonText}>
          {saved ? '✓ Saved Privately' : 'Save Reflection'}
        </react_native_1.Text>
      </react_native_1.TouchableOpacity>
    </react_native_1.View>);
};
exports.MuhasabahSheet = MuhasabahSheet;
const styles = react_native_1.StyleSheet.create({
    card: {
        backgroundColor: ui_1.AmalTheme.colors.surface.cardLight,
        borderRadius: ui_1.AmalTheme.radii.xl,
        padding: ui_1.AmalTheme.spacing[5],
        marginBottom: ui_1.AmalTheme.spacing[4],
        borderWidth: 1,
        borderColor: ui_1.AmalTheme.colors.surface.borderLight,
        ...ui_1.AmalTheme.shadows.card,
    },
    categoryLabel: {
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        fontWeight: '800',
        letterSpacing: 1,
        color: ui_1.AmalTheme.colors.primary,
        marginBottom: 2,
    },
    title: {
        fontSize: ui_1.AmalTheme.typography.sizes.xl,
        fontWeight: '800',
        color: ui_1.AmalTheme.colors.text.primaryLight,
        marginBottom: 4,
    },
    subtitle: {
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        color: ui_1.AmalTheme.colors.text.secondaryLight,
        lineHeight: 18,
        marginBottom: ui_1.AmalTheme.spacing[4],
    },
    observationBox: {
        backgroundColor: ui_1.AmalTheme.colors.surface.backgroundLight,
        padding: ui_1.AmalTheme.spacing[3],
        borderRadius: ui_1.AmalTheme.radii.md,
        marginBottom: ui_1.AmalTheme.spacing[4],
    },
    observationHeader: {
        fontSize: 10,
        fontWeight: '800',
        letterSpacing: 0.8,
        color: ui_1.AmalTheme.colors.primary,
        marginBottom: 4,
    },
    observationText: {
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        color: ui_1.AmalTheme.colors.text.primaryLight,
        lineHeight: 18,
    },
    observationSub: {
        fontSize: 10,
        fontStyle: 'italic',
        color: ui_1.AmalTheme.colors.text.tertiaryLight,
        marginTop: 4,
    },
    inputLabel: {
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        fontWeight: '700',
        color: ui_1.AmalTheme.colors.text.primaryLight,
        marginBottom: ui_1.AmalTheme.spacing[1],
        marginTop: ui_1.AmalTheme.spacing[2],
    },
    textInput: {
        backgroundColor: ui_1.AmalTheme.colors.surface.backgroundLight,
        borderRadius: ui_1.AmalTheme.radii.md,
        padding: ui_1.AmalTheme.spacing[3],
        fontSize: ui_1.AmalTheme.typography.sizes.sm,
        color: ui_1.AmalTheme.colors.text.primaryLight,
        minHeight: 56,
        borderWidth: 1,
        borderColor: ui_1.AmalTheme.colors.surface.borderLight,
        textAlignVertical: 'top',
    },
    privacyPill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: ui_1.AmalTheme.colors.accent.sand,
        padding: ui_1.AmalTheme.spacing[2],
        borderRadius: ui_1.AmalTheme.radii.md,
        marginTop: ui_1.AmalTheme.spacing[4],
        marginBottom: ui_1.AmalTheme.spacing[2],
    },
    privacyIcon: {
        fontSize: 12,
        marginRight: 6,
    },
    privacyText: {
        fontSize: 11,
        color: ui_1.AmalTheme.colors.text.secondaryLight,
        flex: 1,
    },
    saveButton: {
        backgroundColor: ui_1.AmalTheme.colors.primary,
        paddingVertical: ui_1.AmalTheme.spacing[3],
        borderRadius: ui_1.AmalTheme.radii.lg,
        alignItems: 'center',
        marginTop: ui_1.AmalTheme.spacing[2],
    },
    saveButtonDone: {
        backgroundColor: ui_1.AmalTheme.colors.status.success,
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: ui_1.AmalTheme.typography.sizes.sm,
    },
});
//# sourceMappingURL=MuhasabahSheet.js.map