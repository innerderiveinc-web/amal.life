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
exports.default = SituationScreen;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const ui_1 = require("@amal/ui");
function SituationScreen() {
    const [selected, setSelected] = (0, react_1.useState)('fajr');
    const situations = [
        { id: 'fajr', label: 'Sleep & Fajr Struggle' },
        { id: 'salah', label: 'Salah Consistency' },
        { id: 'quran', label: 'Quran Routine Restart' },
        { id: 'dhikr', label: 'Daily Adhkar & Presence' },
        { id: 'anger', label: 'Anger & Emotional Regulation' },
        { id: 'stress', label: 'Work & Life Stress' },
        { id: 'family', label: 'Family & Kinship Ties' },
        { id: 'time', label: 'Time & Deen Alignment' },
    ];
    return (<react_native_1.View style={styles.container}>
      <react_native_1.ScrollView contentContainerStyle={styles.content}>
        <react_native_1.Text style={styles.stepIndicator}>STEP 2 OF 6</react_native_1.Text>
        <react_native_1.Text style={styles.title}>What would you most like to improve right now?</react_native_1.Text>
        <react_native_1.Text style={styles.subtitle}>
          Choose the single area creating the most friction in your routine today.
        </react_native_1.Text>

        <react_native_1.View style={styles.pillsContainer}>
          {situations.map((item) => {
            const isSelected = selected === item.id;
            return (<react_native_1.TouchableOpacity key={item.id} style={[styles.pill, isSelected && styles.pillActive]} onPress={() => setSelected(item.id)} activeOpacity={0.7}>
                <react_native_1.Text style={[styles.pillText, isSelected && styles.pillTextActive]}>
                  {item.label}
                </react_native_1.Text>
              </react_native_1.TouchableOpacity>);
        })}
        </react_native_1.View>
      </react_native_1.ScrollView>

      <react_native_1.View style={styles.footer}>
        <react_native_1.TouchableOpacity style={styles.primaryButton}>
          <react_native_1.Text style={styles.primaryButtonText}>Next</react_native_1.Text>
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
        marginBottom: ui_1.AmalTheme.spacing[6],
    },
    pillsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: ui_1.AmalTheme.spacing[3],
    },
    pill: {
        backgroundColor: ui_1.AmalTheme.colors.surface.cardLight,
        paddingHorizontal: ui_1.AmalTheme.spacing[4],
        paddingVertical: ui_1.AmalTheme.spacing[3],
        borderRadius: ui_1.AmalTheme.radii.full,
        borderWidth: 1,
        borderColor: ui_1.AmalTheme.colors.surface.borderLight,
    },
    pillActive: {
        backgroundColor: ui_1.AmalTheme.colors.primary,
        borderColor: ui_1.AmalTheme.colors.primary,
    },
    pillText: {
        fontSize: ui_1.AmalTheme.typography.sizes.sm,
        fontWeight: '600',
        color: ui_1.AmalTheme.colors.text.secondaryLight,
    },
    pillTextActive: {
        color: '#FFFFFF',
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
//# sourceMappingURL=situation.js.map