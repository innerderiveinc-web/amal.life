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
exports.default = IntentionScreen;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const ui_1 = require("@amal/ui");
function IntentionScreen() {
    const [selected, setSelected] = (0, react_1.useState)([]);
    const intentions = [
        { id: 'deen', label: 'Strengthen my Deen with sincere practice' },
        { id: 'consistency', label: 'Build daily consistency in Salah & Quran' },
        { id: 'knowledge', label: 'Learn Quran, Hadith and authentic Sunnah' },
        { id: 'akhlaq', label: 'Improve emotional regulation, patience & character' },
        { id: 'reconnect', label: 'Reconnect after feeling spiritually distant' },
        { id: 'new_muslim', label: 'Start fresh as a new Muslim' },
    ];
    const toggleSelect = (id) => {
        setSelected((prev) => prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]);
    };
    return (<react_native_1.View style={styles.container}>
      <react_native_1.ScrollView contentContainerStyle={styles.content}>
        <react_native_1.Text style={styles.stepIndicator}>STEP 1 OF 6</react_native_1.Text>
        <react_native_1.Text style={styles.title}>What brings you to AMAL today?</react_native_1.Text>
        <react_native_1.Text style={styles.subtitle}>
          Every meaningful act begins with a sincere intention (Niyyah). Select all that resonate.
        </react_native_1.Text>

        <react_native_1.View style={styles.optionsList}>
          {intentions.map((item) => {
            const isChecked = selected.includes(item.id);
            return (<react_native_1.TouchableOpacity key={item.id} style={[styles.optionCard, isChecked && styles.optionCardActive]} onPress={() => toggleSelect(item.id)} activeOpacity={0.7}>
                <react_native_1.View style={[styles.checkbox, isChecked && styles.checkboxActive]}>
                  {isChecked && <react_native_1.Text style={styles.checkMark}>✓</react_native_1.Text>}
                </react_native_1.View>
                <react_native_1.Text style={[styles.optionText, isChecked && styles.optionTextActive]}>
                  {item.label}
                </react_native_1.Text>
              </react_native_1.TouchableOpacity>);
        })}
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
    optionsList: {
        gap: ui_1.AmalTheme.spacing[3],
    },
    optionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: ui_1.AmalTheme.colors.surface.cardLight,
        borderRadius: ui_1.AmalTheme.radii.lg,
        padding: ui_1.AmalTheme.spacing[4],
        borderWidth: 1,
        borderColor: ui_1.AmalTheme.colors.surface.borderLight,
    },
    optionCardActive: {
        borderColor: ui_1.AmalTheme.colors.primary,
        backgroundColor: ui_1.AmalTheme.colors.primaryLight,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 6,
        borderWidth: 1.5,
        borderColor: ui_1.AmalTheme.colors.surface.borderLight,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: ui_1.AmalTheme.spacing[3],
    },
    checkboxActive: {
        backgroundColor: ui_1.AmalTheme.colors.primary,
        borderColor: ui_1.AmalTheme.colors.primary,
    },
    checkMark: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '800',
    },
    optionText: {
        fontSize: ui_1.AmalTheme.typography.sizes.sm,
        fontWeight: '600',
        color: ui_1.AmalTheme.colors.text.primaryLight,
        flex: 1,
    },
    optionTextActive: {
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
//# sourceMappingURL=intention.js.map