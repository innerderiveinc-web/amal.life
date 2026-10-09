"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = WelcomeScreen;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const ui_1 = require("@amal/ui");
function WelcomeScreen() {
    return (<react_native_1.View style={styles.container}>
      <react_native_1.View style={styles.content}>
        <react_native_1.View style={styles.sealBox}>
          <react_native_1.Text style={styles.sealText}>عَمَل</react_native_1.Text>
        </react_native_1.View>

        <react_native_1.Text style={styles.brandTitle}>AMAL</react_native_1.Text>
        <react_native_1.Text style={styles.tagline}>From Niyyah to Amal.</react_native_1.Text>
        <react_native_1.Text style={styles.subGreeting}>
          A calm personal operating system for your Muslim life. Grounded in authentic sources,
          free of spiritual scorecards and guilt.
        </react_native_1.Text>
      </react_native_1.View>

      <react_native_1.View style={styles.footer}>
        <react_native_1.TouchableOpacity style={styles.primaryButton}>
          <react_native_1.Text style={styles.primaryButtonText}>Begin Your Journey</react_native_1.Text>
        </react_native_1.TouchableOpacity>

        <react_native_1.TouchableOpacity style={styles.secondaryButton}>
          <react_native_1.Text style={styles.secondaryButtonText}>Already have an account? Sign in</react_native_1.Text>
        </react_native_1.TouchableOpacity>
      </react_native_1.View>
    </react_native_1.View>);
}
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ui_1.AmalTheme.colors.surface.backgroundLight,
        padding: ui_1.AmalTheme.spacing[6],
        justifyContent: 'space-between',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sealBox: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: ui_1.AmalTheme.colors.primaryLight,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: ui_1.AmalTheme.spacing[5],
    },
    sealText: {
        fontSize: 32,
        fontFamily: ui_1.AmalTheme.typography.fonts.arabic,
        color: ui_1.AmalTheme.colors.primary,
    },
    brandTitle: {
        fontSize: ui_1.AmalTheme.typography.sizes['4xl'],
        fontWeight: '800',
        letterSpacing: 2,
        color: ui_1.AmalTheme.colors.primary,
        marginBottom: 4,
    },
    tagline: {
        fontSize: ui_1.AmalTheme.typography.sizes.lg,
        fontWeight: '700',
        color: ui_1.AmalTheme.colors.text.primaryLight,
        marginBottom: ui_1.AmalTheme.spacing[3],
    },
    subGreeting: {
        fontSize: ui_1.AmalTheme.typography.sizes.sm,
        color: ui_1.AmalTheme.colors.text.secondaryLight,
        textAlign: 'center',
        lineHeight: 22,
        maxWidth: 320,
    },
    footer: {
        gap: ui_1.AmalTheme.spacing[3],
        marginBottom: ui_1.AmalTheme.spacing[4],
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
    secondaryButton: {
        paddingVertical: ui_1.AmalTheme.spacing[2],
        alignItems: 'center',
    },
    secondaryButtonText: {
        color: ui_1.AmalTheme.colors.text.secondaryLight,
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        fontWeight: '600',
    },
});
//# sourceMappingURL=welcome.js.map