"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FamilyHubScreen;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const ui_1 = require("@amal/ui");
function FamilyHubScreen() {
    const members = [
        { name: 'Ahmad (You)', role: 'Family Admin', status: 'Active Journey: Fajr Recovery' },
        { name: 'Fatima', role: 'Spouse (Adult)', status: 'Active Journey: Quran Restart' },
        { name: 'Zayd', role: 'Teen', status: 'Shared Habit: Daily Hadith' },
        { name: 'Maryam', role: 'Child', status: 'Shared Habit: Morning Dhikr' },
    ];
    return (<react_native_1.ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <react_native_1.Text style={styles.categoryLabel}>HOUSEHOLD COORDINATION</react_native_1.Text>
      <react_native_1.Text style={styles.title}>Al-Mansoor Household</react_native_1.Text>
      <react_native_1.Text style={styles.subtitle}>
        Encourage and coordinate joint worship while protecting individual spiritual privacy.
      </react_native_1.Text>

      {/* Strict Privacy Isolation Guarantee */}
      <react_native_1.View style={styles.privacyIsolationCard}>
        <react_native_1.Text style={styles.privacyBadge}>🔒 ADULT REFLECTION ISOLATION</react_native_1.Text>
        <react_native_1.Text style={styles.privacyNotice}>
          Individual journals, Muhasabah reflections, and personal Fiqh queries are strictly isolated
          and cryptographically locked. Family members only see shared group habits.
        </react_native_1.Text>
      </react_native_1.View>

      {/* Active Family Program */}
      <react_native_1.View style={styles.groupProgramCard}>
        <react_native_1.Text style={styles.programLabel}>SHARED HOUSEHOLD HABIT</react_native_1.Text>
        <react_native_1.Text style={styles.programTitle}>Evening Congregational Adhkar</react_native_1.Text>
        <react_native_1.Text style={styles.programDesc}>Gather for 5 minutes after Maghrib for evening remembrance.</react_native_1.Text>
        <react_native_1.TouchableOpacity style={styles.nudgeBtn}>
          <react_native_1.Text style={styles.nudgeBtnText}>Send Gentle Family Reminder</react_native_1.Text>
        </react_native_1.TouchableOpacity>
      </react_native_1.View>

      {/* Member List */}
      <react_native_1.Text style={styles.sectionHeader}>HOUSEHOLD MEMBERS (4)</react_native_1.Text>
      {members.map((m, idx) => (<react_native_1.View key={idx} style={styles.memberCard}>
          <react_native_1.View style={styles.memberAvatar}>
            <react_native_1.Text style={styles.memberAvatarText}>{m.name.charAt(0)}</react_native_1.Text>
          </react_native_1.View>
          <react_native_1.View style={styles.memberInfo}>
            <react_native_1.Text style={styles.memberName}>{m.name}</react_native_1.Text>
            <react_native_1.Text style={styles.memberRole}>{m.role}</react_native_1.Text>
            <react_native_1.Text style={styles.memberStatus}>{m.status}</react_native_1.Text>
          </react_native_1.View>
        </react_native_1.View>))}
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
    privacyIsolationCard: {
        backgroundColor: ui_1.AmalTheme.colors.surface.cardLight,
        borderRadius: ui_1.AmalTheme.radii.lg,
        padding: ui_1.AmalTheme.spacing[4],
        borderWidth: 1,
        borderColor: ui_1.AmalTheme.colors.accent.terracottaLight,
        marginBottom: ui_1.AmalTheme.spacing[4],
    },
    privacyBadge: {
        fontSize: 10,
        fontWeight: '800',
        color: ui_1.AmalTheme.colors.accent.terracotta,
        letterSpacing: 1,
        marginBottom: 4,
    },
    privacyNotice: {
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        color: ui_1.AmalTheme.colors.text.secondaryLight,
        lineHeight: 18,
    },
    groupProgramCard: {
        backgroundColor: ui_1.AmalTheme.colors.primaryLight,
        borderRadius: ui_1.AmalTheme.radii.xl,
        padding: ui_1.AmalTheme.spacing[5],
        marginBottom: ui_1.AmalTheme.spacing[5],
        borderWidth: 1,
        borderColor: ui_1.AmalTheme.colors.primary,
    },
    programLabel: {
        fontSize: 10,
        fontWeight: '800',
        letterSpacing: 1,
        color: ui_1.AmalTheme.colors.primary,
        marginBottom: 2,
    },
    programTitle: {
        fontSize: ui_1.AmalTheme.typography.sizes.lg,
        fontWeight: '800',
        color: ui_1.AmalTheme.colors.primary,
    },
    programDesc: {
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        color: ui_1.AmalTheme.colors.text.secondaryLight,
        marginTop: 4,
        marginBottom: ui_1.AmalTheme.spacing[3],
    },
    nudgeBtn: {
        backgroundColor: ui_1.AmalTheme.colors.primary,
        paddingVertical: ui_1.AmalTheme.spacing[2],
        paddingHorizontal: ui_1.AmalTheme.spacing[4],
        borderRadius: ui_1.AmalTheme.radii.md,
        alignSelf: 'flex-start',
    },
    nudgeBtnText: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
    },
    sectionHeader: {
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        fontWeight: '800',
        letterSpacing: 1,
        color: ui_1.AmalTheme.colors.text.secondaryLight,
        marginBottom: ui_1.AmalTheme.spacing[3],
    },
    memberCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: ui_1.AmalTheme.colors.surface.cardLight,
        padding: ui_1.AmalTheme.spacing[4],
        borderRadius: ui_1.AmalTheme.radii.lg,
        borderWidth: 1,
        borderColor: ui_1.AmalTheme.colors.surface.borderLight,
        marginBottom: ui_1.AmalTheme.spacing[3],
    },
    memberAvatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: ui_1.AmalTheme.colors.accent.sand,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: ui_1.AmalTheme.spacing[3],
    },
    memberAvatarText: {
        fontSize: ui_1.AmalTheme.typography.sizes.base,
        fontWeight: '800',
        color: ui_1.AmalTheme.colors.primary,
    },
    memberInfo: {
        flex: 1,
    },
    memberName: {
        fontSize: ui_1.AmalTheme.typography.sizes.sm,
        fontWeight: '700',
        color: ui_1.AmalTheme.colors.text.primaryLight,
    },
    memberRole: {
        fontSize: 11,
        color: ui_1.AmalTheme.colors.text.secondaryLight,
    },
    memberStatus: {
        fontSize: 10,
        color: ui_1.AmalTheme.colors.primary,
        fontWeight: '600',
        marginTop: 2,
    },
});
//# sourceMappingURL=index.js.map