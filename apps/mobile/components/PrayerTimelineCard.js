"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrayerTimelineCard = void 0;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const ui_1 = require("@amal/ui");
const PrayerTimelineCard = ({ currentPrayer, countdown, calculationMethod = 'Muslim World League · Standard Asr', prayers, }) => {
    return (<react_native_1.View style={styles.card}>
      <react_native_1.Text style={styles.categoryLabel}>NEXT PRAYER</react_native_1.Text>
      
      <react_native_1.View style={styles.heroRow}>
        <react_native_1.Text style={styles.currentName}>{currentPrayer}</react_native_1.Text>
        <react_native_1.Text style={styles.countdown}>{countdown}</react_native_1.Text>
      </react_native_1.View>
      
      <react_native_1.Text style={styles.methodText}>{calculationMethod}</react_native_1.Text>

      {/* 5-Prayer Timeline Bar */}
      <react_native_1.View style={styles.timelineRow}>
        {prayers.map((p, idx) => {
            const isDone = p.status === 'COMPLETED';
            const isCurrent = p.status === 'CURRENT';
            return (<react_native_1.View key={idx} style={styles.timelineItem}>
              <react_native_1.View style={[
                    styles.dot,
                    isDone && styles.dotDone,
                    isCurrent && styles.dotCurrent,
                ]}/>
              <react_native_1.Text style={[
                    styles.prayerLabel,
                    isCurrent && styles.prayerLabelCurrent,
                ]}>
                {p.name}
              </react_native_1.Text>
              <react_native_1.Text style={styles.prayerTime}>{p.time}</react_native_1.Text>
            </react_native_1.View>);
        })}
      </react_native_1.View>
    </react_native_1.View>);
};
exports.PrayerTimelineCard = PrayerTimelineCard;
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
    categoryLabel: {
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        fontWeight: '800',
        letterSpacing: 1,
        color: ui_1.AmalTheme.colors.primary,
        marginBottom: ui_1.AmalTheme.spacing[1],
    },
    heroRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
    },
    currentName: {
        fontSize: ui_1.AmalTheme.typography.sizes['3xl'],
        fontWeight: '800',
        color: ui_1.AmalTheme.colors.text.primaryLight,
    },
    countdown: {
        fontSize: ui_1.AmalTheme.typography.sizes.lg,
        fontWeight: '700',
        color: ui_1.AmalTheme.colors.accent.terracotta,
    },
    methodText: {
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        color: ui_1.AmalTheme.colors.text.tertiaryLight,
        marginTop: ui_1.AmalTheme.spacing[1],
        marginBottom: ui_1.AmalTheme.spacing[4],
    },
    timelineRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: ui_1.AmalTheme.spacing[3],
        borderTopWidth: 1,
        borderTopColor: ui_1.AmalTheme.colors.surface.borderLight,
    },
    timelineItem: {
        alignItems: 'center',
        flex: 1,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: ui_1.AmalTheme.colors.surface.borderLight,
        marginBottom: 6,
    },
    dotDone: {
        backgroundColor: ui_1.AmalTheme.colors.primary,
    },
    dotCurrent: {
        backgroundColor: ui_1.AmalTheme.colors.accent.terracotta,
        transform: [{ scale: 1.3 }],
    },
    prayerLabel: {
        fontSize: 11,
        fontWeight: '600',
        color: ui_1.AmalTheme.colors.text.secondaryLight,
    },
    prayerLabelCurrent: {
        color: ui_1.AmalTheme.colors.text.primaryLight,
        fontWeight: '800',
    },
    prayerTime: {
        fontSize: 10,
        color: ui_1.AmalTheme.colors.text.tertiaryLight,
        marginTop: 2,
    },
});
//# sourceMappingURL=PrayerTimelineCard.js.map