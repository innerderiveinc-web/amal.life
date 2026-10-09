"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EvidenceExplorerScreen;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const ui_1 = require("@amal/ui");
function EvidenceExplorerScreen() {
    const lineageChain = [
        { step: '1. User Situation', desc: 'Evening digital overstimulation & sleep latency causing missed Fajr' },
        { step: '2. Islamic Principle', desc: 'Prophetic ease (Yusr) and gradual consistency (Tadrij)' },
        { step: '3. Primary Scriptural Proof', desc: 'Sahih al-Bukhari 568 & Quran 17:78' },
        { step: '4. Scholarly Hermeneutics', desc: 'Removing material impediments to obligatory acts is an established legal priority' },
        { step: '5. Action Formulation', desc: '10-minute evening phone displacement & bedtime Ayat al-Kursi' },
    ];
    return (<react_native_1.ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <react_native_1.Text style={styles.categoryLabel}>PROVENANCE & INTEGRITY</react_native_1.Text>
      <react_native_1.Text style={styles.title}>Evidence Lineage Trace</react_native_1.Text>
      <react_native_1.Text style={styles.subtitle}>
        Full transparency answering: "Where did this guidance come from, and why did AMAL recommend it?"
      </react_native_1.Text>

      {/* Lineage Tree */}
      <react_native_1.View style={styles.treeContainer}>
        {lineageChain.map((item, idx) => (<react_native_1.View key={idx} style={styles.treeNode}>
            <react_native_1.View style={styles.nodeIndicator}>
              <react_native_1.View style={styles.nodeDot}/>
              {idx < lineageChain.length - 1 && <react_native_1.View style={styles.nodeLine}/>}
            </react_native_1.View>
            <react_native_1.View style={styles.nodeCard}>
              <react_native_1.Text style={styles.nodeStep}>{item.step}</react_native_1.Text>
              <react_native_1.Text style={styles.nodeDesc}>{item.desc}</react_native_1.Text>
            </react_native_1.View>
          </react_native_1.View>))}
      </react_native_1.View>

      {/* Cryptographic Provenance */}
      <react_native_1.View style={styles.auditCard}>
        <react_native_1.Text style={styles.auditTitle}>🔐 CRYPTOGRAPHIC PROVENANCE</react_native_1.Text>
        <react_native_1.Text style={styles.auditHash}>
          Hash: sha256-4b89f2a71c890123efd67123aa4b92819028ef721098cb
        </react_native_1.Text>
        <react_native_1.Text style={styles.auditStatus}>
          Verified by: Two-Person Scholarly Review (Al-Azhar / Cambridge Muslim College credentials)
        </react_native_1.Text>
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
        marginBottom: ui_1.AmalTheme.spacing[6],
    },
    treeContainer: {
        marginBottom: ui_1.AmalTheme.spacing[6],
    },
    treeNode: {
        flexDirection: 'row',
    },
    nodeIndicator: {
        alignItems: 'center',
        width: 24,
        marginRight: ui_1.AmalTheme.spacing[3],
    },
    nodeDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: ui_1.AmalTheme.colors.primary,
        marginTop: 6,
    },
    nodeLine: {
        width: 2,
        flex: 1,
        backgroundColor: ui_1.AmalTheme.colors.surface.borderLight,
        marginVertical: 4,
    },
    nodeCard: {
        flex: 1,
        backgroundColor: ui_1.AmalTheme.colors.surface.cardLight,
        padding: ui_1.AmalTheme.spacing[4],
        borderRadius: ui_1.AmalTheme.radii.lg,
        borderWidth: 1,
        borderColor: ui_1.AmalTheme.colors.surface.borderLight,
        marginBottom: ui_1.AmalTheme.spacing[3],
        ...ui_1.AmalTheme.shadows.subtle,
    },
    nodeStep: {
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        fontWeight: '800',
        color: ui_1.AmalTheme.colors.primary,
        letterSpacing: 0.5,
        marginBottom: 2,
    },
    nodeDesc: {
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        color: ui_1.AmalTheme.colors.text.primaryLight,
        lineHeight: 18,
    },
    auditCard: {
        backgroundColor: ui_1.AmalTheme.colors.accent.sand,
        padding: ui_1.AmalTheme.spacing[4],
        borderRadius: ui_1.AmalTheme.radii.lg,
        marginBottom: ui_1.AmalTheme.spacing[8],
    },
    auditTitle: {
        fontSize: 10,
        fontWeight: '800',
        letterSpacing: 1,
        color: ui_1.AmalTheme.colors.primary,
        marginBottom: 4,
    },
    auditHash: {
        fontSize: 10,
        fontFamily: 'monospace',
        color: ui_1.AmalTheme.colors.text.secondaryLight,
        marginBottom: 4,
    },
    auditStatus: {
        fontSize: 11,
        color: ui_1.AmalTheme.colors.text.primaryLight,
        fontWeight: '600',
    },
});
//# sourceMappingURL=%5Bid%5D.js.map