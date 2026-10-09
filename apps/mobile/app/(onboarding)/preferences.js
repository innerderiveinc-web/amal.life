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
exports.default = PreferencesScreen;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const ui_1 = require("@amal/ui");
function PreferencesScreen() {
    const [lang, setLang] = (0, react_1.useState)('English');
    const [guidanceDepth, setGuidanceDepth] = (0, react_1.useState)('Balanced');
    const [reminderTone, setReminderTone] = (0, react_1.useState)('Calm & Gentle');
    const languages = ['English', 'اردو (Urdu)', 'العربية (Arabic)', 'हिन्दी (Hindi)'];
    const depths = ['Short & Practical', 'Balanced', 'Deep Scholarly Context'];
    const reminderTones = ['Calm & Gentle', 'Prayer-Only Chimes', 'Silent Visual Alerts'];
    return (<react_native_1.View style={styles.container}>
      <react_native_1.ScrollView contentContainerStyle={styles.content}>
        <react_native_1.Text style={styles.stepIndicator}>STEP 4 OF 6</react_native_1.Text>
        <react_native_1.Text style={styles.title}>Practice Preferences</react_native_1.Text>
        <react_native_1.Text style={styles.subtitle}>
          Tailor how AMAL presents evidence, languages, and notifications to your daily life.
        </react_native_1.Text>

        <react_native_1.Text style={styles.sectionTitle}>Preferred Language:</react_native_1.Text>
        <react_native_1.View style={styles.optionsList}>
          {languages.map((l) => (<react_native_1.TouchableOpacity key={l} style={[styles.row, lang === l && styles.rowActive]} onPress={() => setLang(l)}>
              <react_native_1.Text style={[styles.rowText, lang === l && styles.rowTextActive]}>{l}</react_native_1.Text>
            </react_native_1.TouchableOpacity>))}
        </react_native_1.View>

        <react_native_1.Text style={[styles.sectionTitle, { marginTop: ui_1.AmalTheme.spacing[5] }]}>
          Guidance Depth:
        </react_native_1.Text>
        <react_native_1.View style={styles.optionsList}>
          {depths.map((d) => (<react_native_1.TouchableOpacity key={d} style={[styles.row, guidanceDepth === d && styles.rowActive]} onPress={() => setGuidanceDepth(d)}>
              <react_native_1.Text style={[styles.rowText, guidanceDepth === d && styles.rowTextActive]}>{d}</react_native_1.Text>
            </react_native_1.TouchableOpacity>))}
        </react_native_1.View>

        <react_native_1.Text style={[styles.sectionTitle, { marginTop: ui_1.AmalTheme.spacing[5] }]}>
          Reminder Tone:
        </react_native_1.Text>
        <react_native_1.View style={styles.optionsList}>
          {reminderTones.map((r) => (<react_native_1.TouchableOpacity key={r} style={[styles.row, reminderTone === r && styles.rowActive]} onPress={() => setReminderTone(r)}>
              <react_native_1.Text style={[styles.rowText, reminderTone === r && styles.rowTextActive]}>{r}</react_native_1.Text>
            </react_native_1.TouchableOpacity>))}
        </react_native_1.View>
      </react_native_1.ScrollView>

      <react_native_1.View style={styles.footer}>
        <react_native_1.TouchableOpacity style={styles.primaryButton}>
          <react_native_1.Text style={styles.primaryButtonText}>Continue</react_native_1.Text>
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
    sectionTitle: {
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        fontWeight: '800',
        letterSpacing: 0.8,
        color: ui_1.AmalTheme.colors.text.secondaryLight,
        marginBottom: ui_1.AmalTheme.spacing[2],
    },
    optionsList: {
        gap: ui_1.AmalTheme.spacing[2],
    },
    row: {
        paddingVertical: ui_1.AmalTheme.spacing[3],
        paddingHorizontal: ui_1.AmalTheme.spacing[4],
        backgroundColor: ui_1.AmalTheme.colors.surface.cardLight,
        borderRadius: ui_1.AmalTheme.radii.lg,
        borderWidth: 1,
        borderColor: ui_1.AmalTheme.colors.surface.borderLight,
    },
    rowActive: {
        backgroundColor: ui_1.AmalTheme.colors.primaryLight,
        borderColor: ui_1.AmalTheme.colors.primary,
    },
    rowText: {
        fontSize: ui_1.AmalTheme.typography.sizes.sm,
        fontWeight: '600',
        color: ui_1.AmalTheme.colors.text.primaryLight,
    },
    rowTextActive: {
        color: ui_1.AmalTheme.colors.primary,
        fontWeight: '700',
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
//# sourceMappingURL=preferences.js.map