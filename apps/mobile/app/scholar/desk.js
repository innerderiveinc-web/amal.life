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
exports.default = ScholarDeskScreen;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const ui_1 = require("@amal/ui");
function ScholarDeskScreen() {
    const [filter, setFilter] = (0, react_1.useState)('PENDING');
    const cases = [
        { id: 'SCH-8421', user: 'Anonymous User #402', category: 'Divorce & Marital Fiqh', urgency: 'Urgent', status: 'PENDING' },
        { id: 'SCH-8419', user: 'Anonymous User #811', category: 'Commercial Contract / Ribā', urgency: 'Standard', status: 'PENDING' },
        { id: 'SCH-8402', user: 'Anonymous User #194', category: 'Oaths & Kaffarah', urgency: 'Standard', status: 'IN_REVIEW' },
        { id: 'SCH-8390', user: 'Anonymous User #922', category: 'Inheritance Distribution', urgency: 'Standard', status: 'COMPLETED' },
    ];
    const filteredCases = cases.filter((c) => c.status === filter);
    return (<react_native_1.ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <react_native_1.Text style={styles.categoryLabel}>SCHOLAR PORTAL</react_native_1.Text>
      <react_native_1.Text style={styles.title}>Resident Scholar Desk</react_native_1.Text>
      <react_native_1.Text style={styles.subtitle}>
        Pastoral triage queue. Reviewing sensitive legal matters escalated from AI guardrails.
      </react_native_1.Text>

      {/* Triage Status Pills */}
      <react_native_1.View style={styles.pillRow}>
        {['PENDING', 'IN_REVIEW', 'COMPLETED'].map((s) => (<react_native_1.TouchableOpacity key={s} style={[styles.statusPill, filter === s && styles.statusPillActive]} onPress={() => setFilter(s)}>
            <react_native_1.Text style={[styles.statusText, filter === s && styles.statusTextActive]}>
              {s === 'PENDING' && 'Pending (2)'}
              {s === 'IN_REVIEW' && 'In Review (1)'}
              {s === 'COMPLETED' && 'Completed (1)'}
            </react_native_1.Text>
          </react_native_1.TouchableOpacity>))}
      </react_native_1.View>

      {/* Case Queue */}
      <react_native_1.View style={styles.caseList}>
        {filteredCases.map((c) => (<react_native_1.View key={c.id} style={styles.caseCard}>
            <react_native_1.View style={styles.caseHeader}>
              <react_native_1.Text style={styles.caseId}>{c.id}</react_native_1.Text>
              <react_native_1.Text style={styles.urgencyTag}>{c.urgency}</react_native_1.Text>
            </react_native_1.View>
            <react_native_1.Text style={styles.caseCat}>{c.category}</react_native_1.Text>
            <react_native_1.Text style={styles.caseUser}>Inquirer: {c.user}</react_native_1.Text>
            <react_native_1.TouchableOpacity style={styles.openCaseBtn}>
              <react_native_1.Text style={styles.openCaseText}>Review Dossier & Formulate Counsel →</react_native_1.Text>
            </react_native_1.TouchableOpacity>
          </react_native_1.View>))}
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
    pillRow: {
        flexDirection: 'row',
        gap: ui_1.AmalTheme.spacing[2],
        marginBottom: ui_1.AmalTheme.spacing[4],
    },
    statusPill: {
        paddingHorizontal: ui_1.AmalTheme.spacing[3],
        paddingVertical: ui_1.AmalTheme.spacing[2],
        borderRadius: ui_1.AmalTheme.radii.full,
        backgroundColor: ui_1.AmalTheme.colors.surface.cardLight,
        borderWidth: 1,
        borderColor: ui_1.AmalTheme.colors.surface.borderLight,
    },
    statusPillActive: {
        backgroundColor: ui_1.AmalTheme.colors.primary,
        borderColor: ui_1.AmalTheme.colors.primary,
    },
    statusText: {
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        fontWeight: '700',
        color: ui_1.AmalTheme.colors.text.secondaryLight,
    },
    statusTextActive: {
        color: '#FFFFFF',
    },
    caseList: {
        gap: ui_1.AmalTheme.spacing[3],
    },
    caseCard: {
        backgroundColor: ui_1.AmalTheme.colors.surface.cardLight,
        padding: ui_1.AmalTheme.spacing[4],
        borderRadius: ui_1.AmalTheme.radii.xl,
        borderWidth: 1,
        borderColor: ui_1.AmalTheme.colors.surface.borderLight,
        ...ui_1.AmalTheme.shadows.subtle,
    },
    caseHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    caseId: {
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        fontWeight: '800',
        color: ui_1.AmalTheme.colors.primary,
    },
    urgencyTag: {
        fontSize: 10,
        fontWeight: '800',
        color: ui_1.AmalTheme.colors.accent.terracotta,
        backgroundColor: ui_1.AmalTheme.colors.accent.terracottaLight,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: ui_1.AmalTheme.radii.sm,
    },
    caseCat: {
        fontSize: ui_1.AmalTheme.typography.sizes.base,
        fontWeight: '800',
        color: ui_1.AmalTheme.colors.text.primaryLight,
        marginTop: 2,
    },
    caseUser: {
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        color: ui_1.AmalTheme.colors.text.secondaryLight,
        marginTop: 2,
        marginBottom: ui_1.AmalTheme.spacing[3],
    },
    openCaseBtn: {
        paddingVertical: ui_1.AmalTheme.spacing[2],
        borderTopWidth: 1,
        borderTopColor: ui_1.AmalTheme.colors.surface.borderLight,
        alignItems: 'center',
    },
    openCaseText: {
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        fontWeight: '700',
        color: ui_1.AmalTheme.colors.primary,
    },
});
//# sourceMappingURL=desk.js.map