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
exports.default = ContextScreen;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const ui_1 = require("@amal/ui");
function ContextScreen() {
    const [season, setSeason] = (0, react_1.useState)('Young Professional');
    const [capacity, setCapacity] = (0, react_1.useState)('10 minutes');
    const seasons = [
        'Student',
        'Young Professional',
        'Parent with Young Children',
        'Caregiver',
        'New Muslim',
        'Prefer not to say',
    ];
    const capacities = ['5 minutes', '10 minutes', '15 minutes', '30 minutes'];
    return (<react_native_1.View style={styles.container}>
      <react_native_1.ScrollView contentContainerStyle={styles.content}>
        <react_native_1.Text style={styles.stepIndicator}>STEP 3 OF 6</react_native_1.Text>
        <react_native_1.Text style={styles.title}>Life Context & Capacity</react_native_1.Text>
        <react_native_1.Text style={styles.subtitle}>
          Respecting the Prophetic principle of ease (Yusr). We will never overwhelm your schedule.
        </react_native_1.Text>

        <react_native_1.Text style={styles.questionHeading}>Current season of life:</react_native_1.Text>
        <react_native_1.View style={styles.optionsList}>
          {seasons.map((s) => (<react_native_1.TouchableOpacity key={s} style={[styles.optionRow, season === s && styles.optionRowActive]} onPress={() => setSeason(s)}>
              <react_native_1.Text style={[styles.optionText, season === s && styles.optionTextActive]}>{s}</react_native_1.Text>
            </react_native_1.TouchableOpacity>))}
        </react_native_1.View>

        <react_native_1.Text style={[styles.questionHeading, { marginTop: ui_1.AmalTheme.spacing[5] }]}>
          Realistic daily commitment:
        </react_native_1.Text>
        <react_native_1.View style={styles.capacityGrid}>
          {capacities.map((c) => (<react_native_1.TouchableOpacity key={c} style={[styles.capacityCard, capacity === c && styles.capacityCardActive]} onPress={() => setCapacity(c)}>
              <react_native_1.Text style={[styles.capacityText, capacity === c && styles.capacityTextActive]}>
                {c}
              </react_native_1.Text>
            </react_native_1.TouchableOpacity>))}
        </react_native_1.View>
      </react_native_1.ScrollView>

      <react_native_1.View style={styles.footer}>
        <react_native_1.TouchableOpacity style={styles.primaryButton}>
          <react_native_1.Text style={styles.primaryButtonText}>Save Context</react_native_1.Text>
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
    questionHeading: {
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        fontWeight: '800',
        letterSpacing: 0.8,
        color: ui_1.AmalTheme.colors.text.secondaryLight,
        marginBottom: ui_1.AmalTheme.spacing[3],
    },
    optionsList: {
        gap: ui_1.AmalTheme.spacing[2],
    },
    optionRow: {
        paddingVertical: ui_1.AmalTheme.spacing[3],
        paddingHorizontal: ui_1.AmalTheme.spacing[4],
        backgroundColor: ui_1.AmalTheme.colors.surface.cardLight,
        borderRadius: ui_1.AmalTheme.radii.lg,
        borderWidth: 1,
        borderColor: ui_1.AmalTheme.colors.surface.borderLight,
    },
    optionRowActive: {
        backgroundColor: ui_1.AmalTheme.colors.primaryLight,
        borderColor: ui_1.AmalTheme.colors.primary,
    },
    optionText: {
        fontSize: ui_1.AmalTheme.typography.sizes.sm,
        fontWeight: '600',
        color: ui_1.AmalTheme.colors.text.primaryLight,
    },
    optionTextActive: {
        color: ui_1.AmalTheme.colors.primary,
        fontWeight: '700',
    },
    capacityGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: ui_1.AmalTheme.spacing[3],
    },
    capacityCard: {
        flex: 1,
        minWidth: '45%',
        paddingVertical: ui_1.AmalTheme.spacing[3],
        alignItems: 'center',
        backgroundColor: ui_1.AmalTheme.colors.surface.cardLight,
        borderRadius: ui_1.AmalTheme.radii.lg,
        borderWidth: 1,
        borderColor: ui_1.AmalTheme.colors.surface.borderLight,
    },
    capacityCardActive: {
        backgroundColor: ui_1.AmalTheme.colors.primary,
        borderColor: ui_1.AmalTheme.colors.primary,
    },
    capacityText: {
        fontSize: ui_1.AmalTheme.typography.sizes.sm,
        fontWeight: '600',
        color: ui_1.AmalTheme.colors.text.primaryLight,
    },
    capacityTextActive: {
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
//# sourceMappingURL=context.js.map