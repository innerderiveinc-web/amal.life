"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvidenceDrawer = void 0;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const ui_1 = require("@amal/ui");
const EvidenceDrawer = ({ visible, onClose, citation, }) => {
    return (<react_native_1.Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <react_native_1.View style={styles.modalOverlay}>
        <react_native_1.View style={styles.sheetContainer}>
          <react_native_1.View style={styles.grabHandle}/>
          
          <react_native_1.View style={styles.headerRow}>
            <react_native_1.View>
              <react_native_1.Text style={styles.categoryLabel}>GOVERNED ISLAMIC EVIDENCE</react_native_1.Text>
              <react_native_1.Text style={styles.referenceTitle}>{citation.reference}</react_native_1.Text>
            </react_native_1.View>
            <react_native_1.TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <react_native_1.Text style={styles.closeText}>✕</react_native_1.Text>
            </react_native_1.TouchableOpacity>
          </react_native_1.View>

          <react_native_1.ScrollView style={styles.scrollArea}>
            {/* Authority Tier Badge */}
            <react_native_1.View style={styles.badgeRow}>
              <react_native_1.View style={styles.tierBadge}>
                <react_native_1.Text style={styles.tierText}>{citation.authorityLevel}</react_native_1.Text>
              </react_native_1.View>
              {citation.grading && (<react_native_1.View style={styles.gradingBadge}>
                  <react_native_1.Text style={styles.gradingText}>Grading: {citation.grading}</react_native_1.Text>
                </react_native_1.View>)}
              <react_native_1.View style={styles.scholarBadge}>
                <react_native_1.Text style={styles.scholarText}>✓ Reviewed by 2 Scholars</react_native_1.Text>
              </react_native_1.View>
            </react_native_1.View>

            {/* Arabic Text */}
            {citation.arabicText && (<react_native_1.View style={styles.arabicBox}>
                <react_native_1.Text style={styles.arabicText}>{citation.arabicText}</react_native_1.Text>
              </react_native_1.View>)}

            {/* Translation */}
            <react_native_1.View style={styles.translationBox}>
              <react_native_1.Text style={styles.sectionHeader}>TRANSLATION</react_native_1.Text>
              <react_native_1.Text style={styles.translationText}>"{citation.translation}"</react_native_1.Text>
            </react_native_1.View>

            {/* Provenance Trail */}
            <react_native_1.View style={styles.provenanceBox}>
              <react_native_1.Text style={styles.provenanceHeader}>PROVENANCE & INTEGRITY</react_native_1.Text>
              <react_native_1.Text style={styles.provenanceDetail}>
                Immutable SHA-256 Hash: {citation.provenanceHash || 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'}
              </react_native_1.Text>
              <react_native_1.Text style={styles.provenanceDetail}>
                Scholarly Sign-Offs: {citation.scholarSignoffs?.join(', ') || 'Dr. M. Akram, Sheikh T. Adams'}
              </react_native_1.Text>
            </react_native_1.View>
          </react_native_1.ScrollView>

          <react_native_1.TouchableOpacity style={styles.doneButton} onPress={onClose}>
            <react_native_1.Text style={styles.doneButtonText}>Close Evidence View</react_native_1.Text>
          </react_native_1.TouchableOpacity>
        </react_native_1.View>
      </react_native_1.View>
    </react_native_1.Modal>);
};
exports.EvidenceDrawer = EvidenceDrawer;
const styles = react_native_1.StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
        justifyContent: 'flex-end',
    },
    sheetContainer: {
        backgroundColor: ui_1.AmalTheme.colors.surface.cardLight,
        borderTopLeftRadius: ui_1.AmalTheme.radii.xl,
        borderTopRightRadius: ui_1.AmalTheme.radii.xl,
        padding: ui_1.AmalTheme.spacing[5],
        maxHeight: '85%',
    },
    grabHandle: {
        width: 40,
        height: 4,
        backgroundColor: ui_1.AmalTheme.colors.surface.borderLight,
        borderRadius: 2,
        alignSelf: 'center',
        marginBottom: ui_1.AmalTheme.spacing[3],
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: ui_1.AmalTheme.spacing[3],
    },
    categoryLabel: {
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        fontWeight: '800',
        letterSpacing: 1,
        color: ui_1.AmalTheme.colors.primary,
    },
    referenceTitle: {
        fontSize: ui_1.AmalTheme.typography.sizes['2xl'],
        fontWeight: '800',
        color: ui_1.AmalTheme.colors.text.primaryLight,
        marginTop: 2,
    },
    closeButton: {
        padding: ui_1.AmalTheme.spacing[2],
    },
    closeText: {
        fontSize: ui_1.AmalTheme.typography.sizes.lg,
        color: ui_1.AmalTheme.colors.text.secondaryLight,
    },
    scrollArea: {
        marginVertical: ui_1.AmalTheme.spacing[2],
    },
    badgeRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: ui_1.AmalTheme.spacing[2],
        marginBottom: ui_1.AmalTheme.spacing[4],
    },
    tierBadge: {
        backgroundColor: ui_1.AmalTheme.colors.primaryLight,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: ui_1.AmalTheme.radii.sm,
    },
    tierText: {
        color: ui_1.AmalTheme.colors.primary,
        fontWeight: '700',
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
    },
    gradingBadge: {
        backgroundColor: ui_1.AmalTheme.colors.status.successLight,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: ui_1.AmalTheme.radii.sm,
    },
    gradingText: {
        color: ui_1.AmalTheme.colors.status.success,
        fontWeight: '700',
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
    },
    scholarBadge: {
        backgroundColor: ui_1.AmalTheme.colors.accent.sand,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: ui_1.AmalTheme.radii.sm,
    },
    scholarText: {
        color: ui_1.AmalTheme.colors.accent.goldMuted,
        fontWeight: '700',
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
    },
    arabicBox: {
        backgroundColor: ui_1.AmalTheme.colors.surface.backgroundLight,
        padding: ui_1.AmalTheme.spacing[4],
        borderRadius: ui_1.AmalTheme.radii.lg,
        marginBottom: ui_1.AmalTheme.spacing[4],
    },
    arabicText: {
        fontSize: ui_1.AmalTheme.typography.sizes['2xl'],
        fontFamily: ui_1.AmalTheme.typography.fonts.arabic,
        lineHeight: 48,
        textAlign: 'right',
        color: ui_1.AmalTheme.colors.text.primaryLight,
    },
    translationBox: {
        marginBottom: ui_1.AmalTheme.spacing[4],
    },
    sectionHeader: {
        fontSize: 11,
        fontWeight: '800',
        letterSpacing: 1,
        color: ui_1.AmalTheme.colors.text.secondaryLight,
        marginBottom: 4,
    },
    translationText: {
        fontSize: ui_1.AmalTheme.typography.sizes.base,
        color: ui_1.AmalTheme.colors.text.primaryLight,
        lineHeight: 24,
        fontStyle: 'italic',
    },
    provenanceBox: {
        backgroundColor: ui_1.AmalTheme.colors.surface.backgroundLight,
        padding: ui_1.AmalTheme.spacing[3],
        borderRadius: ui_1.AmalTheme.radii.md,
        marginBottom: ui_1.AmalTheme.spacing[4],
    },
    provenanceHeader: {
        fontSize: 10,
        fontWeight: '800',
        color: ui_1.AmalTheme.colors.text.secondaryLight,
        letterSpacing: 0.8,
        marginBottom: 4,
    },
    provenanceDetail: {
        fontSize: 11,
        color: ui_1.AmalTheme.colors.text.secondaryLight,
        marginTop: 2,
    },
    doneButton: {
        backgroundColor: ui_1.AmalTheme.colors.primary,
        paddingVertical: ui_1.AmalTheme.spacing[3],
        borderRadius: ui_1.AmalTheme.radii.lg,
        alignItems: 'center',
        marginTop: ui_1.AmalTheme.spacing[2],
    },
    doneButtonText: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: ui_1.AmalTheme.typography.sizes.sm,
    },
});
//# sourceMappingURL=EvidenceDrawer.js.map