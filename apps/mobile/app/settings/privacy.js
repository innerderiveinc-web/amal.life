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
exports.default = PrivacyCenterScreen;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const ui_1 = require("@amal/ui");
function PrivacyCenterScreen() {
    const [exported, setExported] = (0, react_1.useState)(false);
    const [wiped, setWiped] = (0, react_1.useState)(false);
    return (<react_native_1.ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <react_native_1.Text style={styles.categoryLabel}>DATA SOVEREIGNTY</react_native_1.Text>
      <react_native_1.Text style={styles.title}>Privacy Center</react_native_1.Text>
      <react_native_1.Text style={styles.subtitle}>
        OWASP MASVS compliant. You have full ownership of your worship data, reflections, and context.
      </react_native_1.Text>

      {/* Pledges */}
      <react_native_1.View style={styles.pledgeCard}>
        <react_native_1.Text style={styles.pledgeTitle}>🔒 ZERO ADVERTISING ARCHITECTURE</react_native_1.Text>
        <react_native_1.Text style={styles.pledgeText}>
          AMAL contains no ad networks, tracking pixels, or third-party behavioral telemetry.
          Your private reflections are never sold or sent to commercial brokers.
        </react_native_1.Text>
      </react_native_1.View>

      {/* Actions */}
      <react_native_1.View style={styles.actionsCard}>
        <react_native_1.TouchableOpacity style={styles.actionRow} onPress={() => setExported(true)} activeOpacity={0.7}>
          <react_native_1.Text style={styles.actionIcon}>📦</react_native_1.Text>
          <react_native_1.View style={styles.actionInfo}>
            <react_native_1.Text style={styles.actionTitle}>Export Complete Personal Data</react_native_1.Text>
            <react_native_1.Text style={styles.actionSub}>Download JSON & PDF archive of all your logs</react_native_1.Text>
          </react_native_1.View>
        </react_native_1.TouchableOpacity>

        {exported && (<react_native_1.View style={styles.exportSuccess}>
            <react_native_1.Text style={styles.exportSuccessText}>✓ Data Archive (amal-export-2026.json) Ready</react_native_1.Text>
          </react_native_1.View>)}

        <react_native_1.TouchableOpacity style={[styles.actionRow, styles.dangerRow]} onPress={() => setWiped(true)} activeOpacity={0.7}>
          <react_native_1.Text style={styles.actionIcon}>🗑️</react_native_1.Text>
          <react_native_1.View style={styles.actionInfo}>
            <react_native_1.Text style={styles.dangerTitle}>Erase All Memory & Worship History</react_native_1.Text>
            <react_native_1.Text style={styles.actionSub}>Irrevocably wipe your reflection vault and AI memory</react_native_1.Text>
          </react_native_1.View>
        </react_native_1.TouchableOpacity>

        {wiped && (<react_native_1.View style={styles.wipedAlert}>
            <react_native_1.Text style={styles.wipedText}>✓ Personal data and memory successfully erased.</react_native_1.Text>
          </react_native_1.View>)}
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
        fontSize: ui_1.AmalTheme.typography.sizes['3xl'],
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
    pledgeCard: {
        backgroundColor: ui_1.AmalTheme.colors.surface.cardLight,
        borderRadius: ui_1.AmalTheme.radii.xl,
        padding: ui_1.AmalTheme.spacing[4],
        borderWidth: 1,
        borderColor: ui_1.AmalTheme.colors.surface.borderLight,
        marginBottom: ui_1.AmalTheme.spacing[5],
    },
    pledgeTitle: {
        fontSize: 10,
        fontWeight: '800',
        letterSpacing: 1,
        color: ui_1.AmalTheme.colors.primary,
        marginBottom: 4,
    },
    pledgeText: {
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        color: ui_1.AmalTheme.colors.text.secondaryLight,
        lineHeight: 18,
    },
    actionsCard: {
        backgroundColor: ui_1.AmalTheme.colors.surface.cardLight,
        borderRadius: ui_1.AmalTheme.radii.xl,
        borderWidth: 1,
        borderColor: ui_1.AmalTheme.colors.surface.borderLight,
        overflow: 'hidden',
    },
    actionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: ui_1.AmalTheme.spacing[4],
        borderBottomWidth: 1,
        borderBottomColor: ui_1.AmalTheme.colors.surface.borderLight,
    },
    actionIcon: {
        fontSize: 22,
        marginRight: ui_1.AmalTheme.spacing[3],
    },
    actionInfo: {
        flex: 1,
    },
    actionTitle: {
        fontSize: ui_1.AmalTheme.typography.sizes.sm,
        fontWeight: '700',
        color: ui_1.AmalTheme.colors.text.primaryLight,
    },
    actionSub: {
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        color: ui_1.AmalTheme.colors.text.secondaryLight,
        marginTop: 2,
    },
    dangerRow: {
        borderBottomWidth: 0,
    },
    dangerTitle: {
        fontSize: ui_1.AmalTheme.typography.sizes.sm,
        fontWeight: '700',
        color: ui_1.AmalTheme.colors.status.warning,
    },
    exportSuccess: {
        backgroundColor: ui_1.AmalTheme.colors.status.successLight,
        padding: ui_1.AmalTheme.spacing[3],
        margin: ui_1.AmalTheme.spacing[3],
        borderRadius: ui_1.AmalTheme.radii.md,
    },
    exportSuccessText: {
        color: ui_1.AmalTheme.colors.status.success,
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        fontWeight: '700',
    },
    wipedAlert: {
        backgroundColor: ui_1.AmalTheme.colors.status.warningLight,
        padding: ui_1.AmalTheme.spacing[3],
        margin: ui_1.AmalTheme.spacing[3],
        borderRadius: ui_1.AmalTheme.radii.md,
    },
    wipedText: {
        color: ui_1.AmalTheme.colors.status.warning,
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        fontWeight: '700',
    },
});
//# sourceMappingURL=privacy.js.map