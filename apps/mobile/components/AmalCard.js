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
exports.AmalCard = void 0;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const ui_1 = require("@amal/ui");
const BurdenPill_1 = require("./BurdenPill");
const AmalCard = ({ title, description, estimatedMinutes, minimumText = 'Minimum: 1 page (~5 min)', targetText = 'Target: 5 pages (~15 min)', whyExplanation, why = 'Fits your restart goal and current available time.', evidenceReference, isPrimary = true, onComplete, onViewEvidence, }) => {
    const [status, setStatus] = (0, react_1.useState)('IDLE');
    const [showWhyDrawer, setShowWhyDrawer] = (0, react_1.useState)(false);
    const [showSkipReasons, setShowSkipReasons] = (0, react_1.useState)(false);
    const handleAction = (level) => {
        if (level === 'SKIPPED') {
            setShowSkipReasons(true);
            return;
        }
        setStatus(level === 'MINIMUM' ? 'PARTIAL' : level);
        if (onComplete)
            onComplete(level);
    };
    const selectSkipReason = (reason) => {
        setShowSkipReasons(false);
        setStatus('SKIPPED');
        if (onComplete)
            onComplete('SKIPPED');
    };
    return (<react_native_1.View style={[styles.card, isPrimary && styles.cardPrimary]}>
      <react_native_1.View style={styles.headerRow}>
        <react_native_1.Text style={styles.categoryLabel}>{isPrimary ? "TODAY'S AMAL" : 'OPTIONAL SUPPORT'}</react_native_1.Text>
        <BurdenPill_1.BurdenPill minutes={estimatedMinutes} pace="Gentle"/>
      </react_native_1.View>

      <react_native_1.Text style={styles.title}>{title}</react_native_1.Text>
      <react_native_1.Text style={styles.description}>{description}</react_native_1.Text>

      {/* Minimum vs Target Micro-Indicators */}
      <react_native_1.View style={styles.capacityRangeBox}>
        <react_native_1.View style={styles.capacityCol}>
          <react_native_1.Text style={styles.capacityLabel}>MINIMUM</react_native_1.Text>
          <react_native_1.Text style={styles.capacityValue}>{minimumText}</react_native_1.Text>
        </react_native_1.View>
        <react_native_1.View style={styles.capacityDivider}/>
        <react_native_1.View style={styles.capacityCol}>
          <react_native_1.Text style={styles.capacityLabel}>TARGET</react_native_1.Text>
          <react_native_1.Text style={styles.capacityValue}>{targetText}</react_native_1.Text>
        </react_native_1.View>
      </react_native_1.View>

      {/* Explainability Accordion: "Why this Amal?" */}
      <react_native_1.TouchableOpacity style={styles.whyToggle} onPress={() => setShowWhyDrawer(!showWhyDrawer)} activeOpacity={0.7}>
        <react_native_1.Text style={styles.whyToggleText}>
          {showWhyDrawer ? '▲ Hide why AMAL recommends this' : '▼ Why this Amal?'}
        </react_native_1.Text>
      </react_native_1.TouchableOpacity>

      {showWhyDrawer && (<react_native_1.View style={styles.whyDrawer}>
          <react_native_1.View style={styles.whyItem}>
            <react_native_1.Text style={styles.whyHeading}>Goal Fit</react_native_1.Text>
            <react_native_1.Text style={styles.whyBody}>
              {whyExplanation?.goalFit || 'Directly aligned with your goal to restart Quran practice.'}
            </react_native_1.Text>
          </react_native_1.View>
          <react_native_1.View style={styles.whyItem}>
            <react_native_1.Text style={styles.whyHeading}>Time Fit</react_native_1.Text>
            <react_native_1.Text style={styles.whyBody}>
              {whyExplanation?.timeFit || `Calibrated to your planned ${estimatedMinutes}-minute daily capacity.`}
            </react_native_1.Text>
          </react_native_1.View>
          <react_native_1.View style={styles.whyItem}>
            <react_native_1.Text style={styles.whyHeading}>Journey Fit</react_native_1.Text>
            <react_native_1.Text style={styles.whyBody}>
              {whyExplanation?.journeyFit || 'Matches the current gentle foundation phase.'}
            </react_native_1.Text>
          </react_native_1.View>
          <react_native_1.View style={styles.whyItem}>
            <react_native_1.Text style={styles.whyHeading}>Evidence Grounding</react_native_1.Text>
            <react_native_1.Text style={styles.whyBody}>
              {whyExplanation?.evidenceSummary || `Grounded in ${evidenceReference}`}
            </react_native_1.Text>
          </react_native_1.View>
          <react_native_1.View style={styles.whyItem}>
            <react_native_1.Text style={styles.whyHeading}>Personalization</react_native_1.Text>
            <react_native_1.Text style={styles.whyBody}>
              {whyExplanation?.personalization || 'Reflects your confirmed preference for calm morning habits.'}
            </react_native_1.Text>
          </react_native_1.View>
        </react_native_1.View>)}

      {evidenceReference && (<react_native_1.TouchableOpacity style={styles.evidenceBadge} onPress={onViewEvidence} activeOpacity={0.7}>
          <react_native_1.Text style={styles.evidenceIcon}>📖</react_native_1.Text>
          <react_native_1.Text style={styles.evidenceText}>Evidence: {evidenceReference}</react_native_1.Text>
          <react_native_1.Text style={styles.evidenceArrow}>→</react_native_1.Text>
        </react_native_1.TouchableOpacity>)}

      {/* Skip Reasons Sheet */}
      {showSkipReasons && (<react_native_1.View style={styles.skipReasonsBox}>
          <react_native_1.Text style={styles.skipPrompt}>What made it difficult today? (Optional)</react_native_1.Text>
          <react_native_1.View style={styles.skipOptionsRow}>
            {['No time', 'Low energy', 'Forgot', 'Wrong time', 'Prefer not to say'].map((r, i) => (<react_native_1.TouchableOpacity key={i} style={styles.skipOptionPill} onPress={() => selectSkipReason(r)}>
                <react_native_1.Text style={styles.skipOptionText}>{r}</react_native_1.Text>
              </react_native_1.TouchableOpacity>))}
          </react_native_1.View>
        </react_native_1.View>)}

      {status === 'IDLE' && !showSkipReasons ? (<react_native_1.View style={styles.actionsContainer}>
          <react_native_1.TouchableOpacity style={styles.primaryButton} onPress={() => handleAction('FULL')}>
            <react_native_1.Text style={styles.primaryButtonText}>✓ Start / Mark as Done</react_native_1.Text>
          </react_native_1.TouchableOpacity>

          <react_native_1.View style={styles.secondaryActionsRow}>
            <react_native_1.TouchableOpacity style={styles.secondaryButton} onPress={() => handleAction('MINIMUM')}>
              <react_native_1.Text style={styles.secondaryButtonText}>Partial / Minimum</react_native_1.Text>
            </react_native_1.TouchableOpacity>

            <react_native_1.TouchableOpacity style={styles.secondaryButton} onPress={() => handleAction('SNOOZED')}>
              <react_native_1.Text style={styles.secondaryButtonText}>Later</react_native_1.Text>
            </react_native_1.TouchableOpacity>

            <react_native_1.TouchableOpacity style={styles.secondaryButton} onPress={() => handleAction('SKIPPED')}>
              <react_native_1.Text style={styles.secondaryButtonText}>Gently Skip</react_native_1.Text>
            </react_native_1.TouchableOpacity>
          </react_native_1.View>
        </react_native_1.View>) : (!showSkipReasons && (<react_native_1.View style={styles.completedBanner}>
            <react_native_1.Text style={styles.completedText}>
              {status === 'FULL' && 'Done. You completed today\'s Amal.'}
              {status === 'PARTIAL' && 'You completed part of today\'s Amal. Every small step counts.'}
              {status === 'SNOOZED' && 'Snoozed for later today.'}
              {status === 'SKIPPED' && 'Gently skipped. Ready when you are.'}
            </react_native_1.Text>
          </react_native_1.View>))}
    </react_native_1.View>);
};
exports.AmalCard = AmalCard;
const styles = react_native_1.StyleSheet.create({
    card: {
        backgroundColor: ui_1.AmalTheme.colors.surface.cardLight,
        borderRadius: ui_1.AmalTheme.radii.xl,
        padding: ui_1.AmalTheme.spacing[5],
        marginBottom: ui_1.AmalTheme.spacing[4],
        borderWidth: 1,
        borderColor: ui_1.AmalTheme.colors.surface.borderLight,
        ...ui_1.AmalTheme.shadows.card,
    },
    cardPrimary: {
        borderColor: ui_1.AmalTheme.colors.primaryLight,
        borderWidth: 1.5,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: ui_1.AmalTheme.spacing[2],
    },
    categoryLabel: {
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        fontWeight: '800',
        letterSpacing: 1,
        color: ui_1.AmalTheme.colors.primary,
    },
    title: {
        fontSize: ui_1.AmalTheme.typography.sizes.xl,
        fontWeight: '800',
        color: ui_1.AmalTheme.colors.text.primaryLight,
        marginTop: ui_1.AmalTheme.spacing[1],
        marginBottom: ui_1.AmalTheme.spacing[1],
    },
    description: {
        fontSize: ui_1.AmalTheme.typography.sizes.sm,
        color: ui_1.AmalTheme.colors.text.secondaryLight,
        lineHeight: 20,
        marginBottom: ui_1.AmalTheme.spacing[3],
    },
    capacityRangeBox: {
        flexDirection: 'row',
        backgroundColor: ui_1.AmalTheme.colors.surface.backgroundLight,
        borderRadius: ui_1.AmalTheme.radii.md,
        padding: ui_1.AmalTheme.spacing[3],
        marginBottom: ui_1.AmalTheme.spacing[3],
        alignItems: 'center',
    },
    capacityCol: {
        flex: 1,
    },
    capacityDivider: {
        width: 1,
        height: 24,
        backgroundColor: ui_1.AmalTheme.colors.surface.borderLight,
        marginHorizontal: ui_1.AmalTheme.spacing[3],
    },
    capacityLabel: {
        fontSize: 10,
        fontWeight: '800',
        color: ui_1.AmalTheme.colors.primary,
        letterSpacing: 0.8,
        marginBottom: 2,
    },
    capacityValue: {
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        color: ui_1.AmalTheme.colors.text.primaryLight,
        fontWeight: '600',
    },
    whyToggle: {
        marginBottom: ui_1.AmalTheme.spacing[2],
    },
    whyToggleText: {
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        fontWeight: '700',
        color: ui_1.AmalTheme.colors.primary,
    },
    whyDrawer: {
        backgroundColor: ui_1.AmalTheme.colors.surface.backgroundLight,
        borderRadius: ui_1.AmalTheme.radii.md,
        padding: ui_1.AmalTheme.spacing[3],
        marginBottom: ui_1.AmalTheme.spacing[3],
        gap: ui_1.AmalTheme.spacing[2],
    },
    whyItem: {
        borderBottomWidth: 1,
        borderBottomColor: ui_1.AmalTheme.colors.surface.borderLight,
        paddingBottom: 4,
    },
    whyHeading: {
        fontSize: 10,
        fontWeight: '800',
        letterSpacing: 0.5,
        color: ui_1.AmalTheme.colors.text.secondaryLight,
    },
    whyBody: {
        fontSize: 11,
        color: ui_1.AmalTheme.colors.text.primaryLight,
        marginTop: 1,
    },
    evidenceBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: ui_1.AmalTheme.colors.accent.sand,
        paddingVertical: ui_1.AmalTheme.spacing[2],
        paddingHorizontal: ui_1.AmalTheme.spacing[3],
        borderRadius: ui_1.AmalTheme.radii.md,
        marginBottom: ui_1.AmalTheme.spacing[4],
    },
    evidenceIcon: {
        fontSize: 12,
        marginRight: 6,
    },
    evidenceText: {
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        fontWeight: '600',
        color: ui_1.AmalTheme.colors.text.primaryLight,
        flex: 1,
    },
    evidenceArrow: {
        fontSize: 12,
        color: ui_1.AmalTheme.colors.primary,
        fontWeight: '700',
    },
    skipReasonsBox: {
        backgroundColor: ui_1.AmalTheme.colors.surface.backgroundLight,
        padding: ui_1.AmalTheme.spacing[3],
        borderRadius: ui_1.AmalTheme.radii.md,
        marginBottom: ui_1.AmalTheme.spacing[3],
    },
    skipPrompt: {
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        fontWeight: '700',
        color: ui_1.AmalTheme.colors.text.primaryLight,
        marginBottom: ui_1.AmalTheme.spacing[2],
    },
    skipOptionsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
    },
    skipOptionPill: {
        backgroundColor: ui_1.AmalTheme.colors.surface.cardLight,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: ui_1.AmalTheme.radii.full,
        borderWidth: 1,
        borderColor: ui_1.AmalTheme.colors.surface.borderLight,
    },
    skipOptionText: {
        fontSize: 11,
        color: ui_1.AmalTheme.colors.text.secondaryLight,
        fontWeight: '600',
    },
    actionsContainer: {
        marginTop: ui_1.AmalTheme.spacing[1],
    },
    primaryButton: {
        backgroundColor: ui_1.AmalTheme.colors.primary,
        paddingVertical: ui_1.AmalTheme.spacing[3],
        borderRadius: ui_1.AmalTheme.radii.lg,
        alignItems: 'center',
    },
    primaryButtonText: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: ui_1.AmalTheme.typography.sizes.sm,
    },
    secondaryActionsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: ui_1.AmalTheme.spacing[2],
        gap: ui_1.AmalTheme.spacing[2],
    },
    secondaryButton: {
        flex: 1,
        paddingVertical: ui_1.AmalTheme.spacing[2],
        backgroundColor: ui_1.AmalTheme.colors.surface.backgroundLight,
        borderRadius: ui_1.AmalTheme.radii.md,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: ui_1.AmalTheme.colors.surface.borderLight,
    },
    secondaryButtonText: {
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        fontWeight: '600',
        color: ui_1.AmalTheme.colors.text.secondaryLight,
    },
    completedBanner: {
        backgroundColor: ui_1.AmalTheme.colors.status.successLight,
        paddingVertical: ui_1.AmalTheme.spacing[3],
        paddingHorizontal: ui_1.AmalTheme.spacing[3],
        borderRadius: ui_1.AmalTheme.radii.md,
        alignItems: 'center',
        marginTop: ui_1.AmalTheme.spacing[1],
    },
    completedText: {
        color: ui_1.AmalTheme.colors.status.success,
        fontSize: ui_1.AmalTheme.typography.sizes.sm,
        fontWeight: '700',
    },
});
//# sourceMappingURL=AmalCard.js.map