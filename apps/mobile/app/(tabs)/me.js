"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MeScreen;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const ui_1 = require("@amal/ui");
function MeScreen() {
    const menuSections = [
        { title: 'What AMAL Remembers', subtitle: 'Transparent, auditable memory vault', icon: '🧠', route: '/settings/memory' },
        { title: 'Privacy & Data Governance', subtitle: 'GDPR export, zero ad sales, data wipe', icon: '🔒', route: '/settings/privacy' },
        { title: 'Worship & Fiqh Preferences', subtitle: 'Prayer calculations, Madhhab display', icon: '⚙️', route: '/me/preferences' },
        { title: 'My Family Hub', subtitle: 'Household group with strict adult privacy isolation', icon: '🏡', route: '/family' },
        { title: 'Resident Scholar Desk', subtitle: 'Case triage queue & jurist consultations', icon: '⚖️', route: '/scholar/desk' },
        { title: 'Safety, Helplines & Feedback', subtitle: 'Disputed claims reporting & crisis resources', icon: '🛡️', route: '/settings/safety' },
    ];
    return (<react_native_1.ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Profile Header */}
      <react_native_1.View style={styles.profileHeader}>
        <react_native_1.View style={styles.avatar}>
          <react_native_1.Text style={styles.avatarText}>A</react_native_1.Text>
        </react_native_1.View>
        <react_native_1.View style={styles.profileMeta}>
          <react_native_1.Text style={styles.userName}>Ahmad Al-Mansoor</react_native_1.Text>
          <react_native_1.Text style={styles.userSub}>Season: Young Professional · London, UK</react_native_1.Text>
          <react_native_1.View style={styles.capacityBadge}>
            <react_native_1.Text style={styles.capacityText}>Daily Capacity: 15 min · Gentle</react_native_1.Text>
          </react_native_1.View>
        </react_native_1.View>
      </react_native_1.View>

      {/* Menu Navigation */}
      <react_native_1.Text style={styles.sectionHeader}>ACCOUNT & GOVERNANCE</react_native_1.Text>
      {menuSections.map((item, idx) => (<react_native_1.TouchableOpacity key={idx} style={styles.menuRow} activeOpacity={0.7}>
          <react_native_1.Text style={styles.menuIcon}>{item.icon}</react_native_1.Text>
          <react_native_1.View style={styles.menuInfo}>
            <react_native_1.Text style={styles.menuTitle}>{item.title}</react_native_1.Text>
            <react_native_1.Text style={styles.menuSub}>{item.subtitle}</react_native_1.Text>
          </react_native_1.View>
          <react_native_1.Text style={styles.menuArrow}>→</react_native_1.Text>
        </react_native_1.TouchableOpacity>))}

      {/* Trust Notice */}
      <react_native_1.View style={styles.trustBox}>
        <react_native_1.Text style={styles.trustTitle}>🔒 THE AMAL PRIVACY PLEDGE</react_native_1.Text>
        <react_native_1.Text style={styles.trustBody}>
          Your prayers, reflections, and spiritual habits are never commercialized, sold to advertisers,
          or shared with employers.
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
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: ui_1.AmalTheme.spacing[6],
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: ui_1.AmalTheme.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: ui_1.AmalTheme.spacing[4],
    },
    avatarText: {
        color: '#FFFFFF',
        fontSize: ui_1.AmalTheme.typography.sizes.xl,
        fontWeight: '800',
    },
    profileMeta: {
        flex: 1,
    },
    userName: {
        fontSize: ui_1.AmalTheme.typography.sizes.xl,
        fontWeight: '800',
        color: ui_1.AmalTheme.colors.text.primaryLight,
    },
    userSub: {
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        color: ui_1.AmalTheme.colors.text.secondaryLight,
        marginTop: 2,
        marginBottom: 4,
    },
    capacityBadge: {
        backgroundColor: ui_1.AmalTheme.colors.primaryLight,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: ui_1.AmalTheme.radii.sm,
        alignSelf: 'flex-start',
    },
    capacityText: {
        fontSize: 10,
        color: ui_1.AmalTheme.colors.primary,
        fontWeight: '700',
    },
    sectionHeader: {
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        fontWeight: '800',
        letterSpacing: 1,
        color: ui_1.AmalTheme.colors.text.secondaryLight,
        marginBottom: ui_1.AmalTheme.spacing[3],
    },
    menuRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: ui_1.AmalTheme.colors.surface.cardLight,
        borderRadius: ui_1.AmalTheme.radii.lg,
        padding: ui_1.AmalTheme.spacing[4],
        marginBottom: ui_1.AmalTheme.spacing[3],
        borderWidth: 1,
        borderColor: ui_1.AmalTheme.colors.surface.borderLight,
        ...ui_1.AmalTheme.shadows.subtle,
    },
    menuIcon: {
        fontSize: 20,
        marginRight: ui_1.AmalTheme.spacing[3],
    },
    menuInfo: {
        flex: 1,
    },
    menuTitle: {
        fontSize: ui_1.AmalTheme.typography.sizes.sm,
        fontWeight: '700',
        color: ui_1.AmalTheme.colors.text.primaryLight,
    },
    menuSub: {
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        color: ui_1.AmalTheme.colors.text.secondaryLight,
        marginTop: 2,
    },
    menuArrow: {
        fontSize: 16,
        color: ui_1.AmalTheme.colors.primary,
        fontWeight: '700',
    },
    trustBox: {
        backgroundColor: ui_1.AmalTheme.colors.accent.sand,
        borderRadius: ui_1.AmalTheme.radii.lg,
        padding: ui_1.AmalTheme.spacing[4],
        marginTop: ui_1.AmalTheme.spacing[4],
        marginBottom: ui_1.AmalTheme.spacing[6],
    },
    trustTitle: {
        fontSize: 10,
        fontWeight: '800',
        letterSpacing: 1,
        color: ui_1.AmalTheme.colors.primary,
        marginBottom: 4,
    },
    trustBody: {
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        color: ui_1.AmalTheme.colors.text.secondaryLight,
        lineHeight: 18,
    },
});
//# sourceMappingURL=me.js.map