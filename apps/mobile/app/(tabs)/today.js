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
exports.default = TodayScreen;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const ui_1 = require("@amal/ui");
const components_1 = require("../../components");
function TodayScreen() {
    const [evidenceVisible, setEvidenceVisible] = (0, react_1.useState)(false);
    const [todayState, setTodayState] = (0, react_1.useState)('ACTIVE');
    const selectedCitation = {
        reference: 'Quran 17:78',
        authorityLevel: 'TIER_1_QURAN',
        arabicText: 'أَقِمِ الصَّلَاةَ لِدُلُوكِ الشَّمْسِ إِلَىٰ غَسَقِ اللَّيْلِ وَقُرْآنَ الْفَجْرِ ۖ إِنَّ قُرْآنَ الْفَجْرِ كَانَ مَشْهُودًا',
        translation: 'Establish prayer at the decline of the sun until the darkness of the night and recite the Qur\'an at dawn. Indeed, the recitation of dawn is ever witnessed.',
        grading: 'MUTAWATIR',
        scholarSignoffs: ['Dr. M. Akram', 'Sheikh T. Adams'],
        provenanceHash: 'sha256-8a9f3b7c2d1e0f...',
    };
    return (<react_native_1.View style={styles.container}>
      <components_1.OfflineBanner isOffline={false}/>
      <react_native_1.ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <react_native_1.View style={styles.header}>
          <react_native_1.Text style={styles.dateLabel}>14 Shawwal 1447 · Wednesday, 7 Oct</react_native_1.Text>
          <react_native_1.Text style={styles.greeting}>Good morning, Ahmad.</react_native_1.Text>
          <react_native_1.Text style={styles.tagline}>From Niyyah to Amal.</react_native_1.Text>
        </react_native_1.View>

        {/* State Banner / Contextual Feedback */}
        {todayState === 'LOW_CAPACITY' && (<react_native_1.View style={styles.stateNoticeBox}>
            <react_native_1.Text style={styles.stateNoticeTitle}>🌱 Let's keep today light</react_native_1.Text>
            <react_native_1.Text style={styles.stateNoticeBody}>
              Your planned target is reduced to a 5-minute micro-habit to match your lower energy today.
            </react_native_1.Text>
          </react_native_1.View>)}

        {todayState === 'HIGH_BURDEN' && (<react_native_1.View style={[styles.stateNoticeBox, styles.highBurdenNotice]}>
            <react_native_1.Text style={styles.stateNoticeTitle}>⏱ Your plan looks full today</react_native_1.Text>
            <react_native_1.Text style={styles.stateNoticeBody}>
              Active commitments total 35 mins. Would you like to simplify or pause one journey?
            </react_native_1.Text>
            <react_native_1.TouchableOpacity style={styles.simplifyBtn}>
              <react_native_1.Text style={styles.simplifyBtnText}>Simplify Today's Load</react_native_1.Text>
            </react_native_1.TouchableOpacity>
          </react_native_1.View>)}

        {todayState === 'RESTART' && (<react_native_1.View style={styles.stateNoticeBox}>
            <react_native_1.Text style={styles.stateNoticeTitle}>🌿 Ready to restart?</react_native_1.Text>
            <react_native_1.Text style={styles.stateNoticeBody}>
              Welcome back. No streaks to make up; restart gently right from today.
            </react_native_1.Text>
          </react_native_1.View>)}

        {todayState === 'COMPLETED' && (<react_native_1.View style={[styles.stateNoticeBox, styles.completedNotice]}>
            <react_native_1.Text style={styles.stateNoticeTitle}>✓ You've completed today's primary Amal</react_native_1.Text>
            <react_native_1.Text style={styles.stateNoticeBody}>
              May Allah accept your effort with sincerity. Rest your mind for tomorrow.
            </react_native_1.Text>
          </react_native_1.View>)}

        {/* 1. Prayer Timeline (Contextual Anchor) */}
        <components_1.PrayerTimelineCard currentPrayer="Asr" countdown="in 42 min" calculationMethod="Muslim World League · Standard Asr" prayers={[
            { name: 'Fajr', time: '5:12 AM', status: 'COMPLETED' },
            { name: 'Sunrise', time: '6:34 AM', status: 'COMPLETED' },
            { name: 'Dhuhr', time: '12:45 PM', status: 'COMPLETED' },
            { name: 'Asr', time: '4:15 PM', status: 'CURRENT' },
            { name: 'Maghrib', time: '6:58 PM', status: 'UPCOMING' },
            { name: 'Isha', time: '8:24 PM', status: 'UPCOMING' },
        ]}/>

        {/* 2. Today's Primary Amal (Strict 1 Primary Load Ceiling) */}
        {todayState !== 'EMPTY' && (<components_1.AmalCard id="amal-daily-1" title="Read one page of Quran" description="Quiet contemplation after Fajr or during your morning window." estimatedMinutes={5} minimumText="Minimum: 1 page (~5 min)" targetText="Target: 5 pages (~15 min)" whyExplanation={{
                goalFit: 'Fits your stated goal to restart your Quran routine.',
                timeFit: 'Calibrated to your planned 10-minute daily capacity.',
                journeyFit: 'Minimum consistent action in Phase 1 (Restart).',
                evidenceSummary: 'Directly supported by Quran 17:78 & Sahih al-Bukhari 6464.',
                personalization: 'Matches your confirmed preference for short morning habits.',
            }} evidenceReference="Quran 17:78 & Sahih al-Bukhari 6464" isPrimary={true} onViewEvidence={() => setEvidenceVisible(true)} onComplete={(level) => {
                if (level === 'FULL')
                    setTodayState('COMPLETED');
            }}/>)}

        {/* 3. Optional Support Action (0-2 max) */}
        {todayState === 'ACTIVE' && (<components_1.AmalCard id="amal-daily-opt" title="2-Minute Bedtime Istighfar" description="Brief moment of stillness and remembrance before sleep." estimatedMinutes={2} minimumText="Minimum: 33x Astaghfirullah (~1 min)" targetText="Target: Sayyid al-Istighfar (~2 min)" evidenceReference="Sahih al-Bukhari 6306" isPrimary={false}/>)}

        {/* 4. Active Journey Card */}
        {todayState !== 'EMPTY' && (<react_native_1.View style={styles.journeyCard}>
            <react_native_1.View style={styles.journeyHeader}>
              <react_native_1.Text style={styles.journeyCategory}>ACTIVE JOURNEY</react_native_1.Text>
              <react_native_1.Text style={styles.journeyBadge}>Day 4 of 30</react_native_1.Text>
            </react_native_1.View>
            <react_native_1.Text style={styles.journeyTitle}>30-Day Quran Restart</react_native_1.Text>
            <react_native_1.Text style={styles.journeyDesc}>Phase 1: Restart Gently · 4 meaningful completions this week</react_native_1.Text>
            <react_native_1.View style={styles.progressTrack}>
              <react_native_1.View style={[styles.progressFill, { width: '13%' }]}/>
            </react_native_1.View>
          </react_native_1.View>)}

        {/* Empty State Fallback */}
        {todayState === 'EMPTY' && (<react_native_1.View style={styles.emptyCard}>
            <react_native_1.Text style={styles.emptyTitle}>What would you like to work on?</react_native_1.Text>
            <react_native_1.Text style={styles.emptyDesc}>Choose one small goal to anchor your day without pressure.</react_native_1.Text>
            <react_native_1.TouchableOpacity style={styles.emptyBtn}>
              <react_native_1.Text style={styles.emptyBtnText}>Explore 8 Core Journeys</react_native_1.Text>
            </react_native_1.TouchableOpacity>
          </react_native_1.View>)}

        {/* 5. Evening Muhasabah */}
        <components_1.MuhasabahSheet />
      </react_native_1.ScrollView>

      {/* Governed Evidence Drawer */}
      <components_1.EvidenceDrawer visible={evidenceVisible} onClose={() => setEvidenceVisible(false)} citation={selectedCitation}/>
    </react_native_1.View>);
}
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ui_1.AmalTheme.colors.surface.backgroundLight,
    },
    scrollContent: {
        padding: ui_1.AmalTheme.spacing[5],
        paddingTop: ui_1.AmalTheme.spacing[10],
    },
    header: {
        marginBottom: ui_1.AmalTheme.spacing[5],
    },
    dateLabel: {
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        color: ui_1.AmalTheme.colors.text.tertiaryLight,
        fontWeight: '700',
        letterSpacing: 0.5,
        marginBottom: 4,
    },
    greeting: {
        fontSize: ui_1.AmalTheme.typography.sizes['3xl'],
        fontWeight: '800',
        color: ui_1.AmalTheme.colors.text.primaryLight,
    },
    tagline: {
        fontSize: ui_1.AmalTheme.typography.sizes.sm,
        color: ui_1.AmalTheme.colors.primaryMuted,
        fontWeight: '600',
        marginTop: 2,
    },
    stateNoticeBox: {
        backgroundColor: ui_1.AmalTheme.colors.primaryLight,
        borderRadius: ui_1.AmalTheme.radii.lg,
        padding: ui_1.AmalTheme.spacing[4],
        marginBottom: ui_1.AmalTheme.spacing[4],
        borderWidth: 1,
        borderColor: ui_1.AmalTheme.colors.primary,
    },
    highBurdenNotice: {
        backgroundColor: ui_1.AmalTheme.colors.accent.terracottaLight,
        borderColor: ui_1.AmalTheme.colors.accent.terracotta,
    },
    completedNotice: {
        backgroundColor: ui_1.AmalTheme.colors.status.successLight,
        borderColor: ui_1.AmalTheme.colors.status.success,
    },
    stateNoticeTitle: {
        fontSize: ui_1.AmalTheme.typography.sizes.sm,
        fontWeight: '800',
        color: ui_1.AmalTheme.colors.text.primaryLight,
        marginBottom: 2,
    },
    stateNoticeBody: {
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        color: ui_1.AmalTheme.colors.text.secondaryLight,
        lineHeight: 18,
    },
    simplifyBtn: {
        backgroundColor: ui_1.AmalTheme.colors.accent.terracotta,
        paddingVertical: ui_1.AmalTheme.spacing[2],
        paddingHorizontal: ui_1.AmalTheme.spacing[3],
        borderRadius: ui_1.AmalTheme.radii.md,
        alignSelf: 'flex-start',
        marginTop: ui_1.AmalTheme.spacing[2],
    },
    simplifyBtnText: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
    },
    journeyCard: {
        backgroundColor: ui_1.AmalTheme.colors.surface.cardLight,
        borderRadius: ui_1.AmalTheme.radii.xl,
        padding: ui_1.AmalTheme.spacing[5],
        marginBottom: ui_1.AmalTheme.spacing[4],
        borderWidth: 1,
        borderColor: ui_1.AmalTheme.colors.surface.borderLight,
        ...ui_1.AmalTheme.shadows.card,
    },
    journeyHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: ui_1.AmalTheme.spacing[2],
    },
    journeyCategory: {
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        fontWeight: '800',
        color: ui_1.AmalTheme.colors.primary,
        letterSpacing: 1,
    },
    journeyBadge: {
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        fontWeight: '700',
        color: ui_1.AmalTheme.colors.accent.terracotta,
        backgroundColor: ui_1.AmalTheme.colors.accent.terracottaLight,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: ui_1.AmalTheme.radii.full,
    },
    journeyTitle: {
        fontSize: ui_1.AmalTheme.typography.sizes.lg,
        fontWeight: '800',
        color: ui_1.AmalTheme.colors.text.primaryLight,
    },
    journeyDesc: {
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        color: ui_1.AmalTheme.colors.text.secondaryLight,
        marginTop: 4,
        marginBottom: ui_1.AmalTheme.spacing[3],
    },
    progressTrack: {
        height: 6,
        backgroundColor: ui_1.AmalTheme.colors.surface.borderLight,
        borderRadius: 3,
    },
    progressFill: {
        height: 6,
        backgroundColor: ui_1.AmalTheme.colors.primary,
        borderRadius: 3,
    },
    emptyCard: {
        backgroundColor: ui_1.AmalTheme.colors.surface.cardLight,
        borderRadius: ui_1.AmalTheme.radii.xl,
        padding: ui_1.AmalTheme.spacing[6],
        alignItems: 'center',
        marginBottom: ui_1.AmalTheme.spacing[4],
        borderWidth: 1,
        borderColor: ui_1.AmalTheme.colors.surface.borderLight,
    },
    emptyTitle: {
        fontSize: ui_1.AmalTheme.typography.sizes.base,
        fontWeight: '800',
        color: ui_1.AmalTheme.colors.text.primaryLight,
    },
    emptyDesc: {
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        color: ui_1.AmalTheme.colors.text.secondaryLight,
        textAlign: 'center',
        marginTop: 4,
        marginBottom: ui_1.AmalTheme.spacing[4],
    },
    emptyBtn: {
        backgroundColor: ui_1.AmalTheme.colors.primary,
        paddingVertical: ui_1.AmalTheme.spacing[3],
        paddingHorizontal: ui_1.AmalTheme.spacing[4],
        borderRadius: ui_1.AmalTheme.radii.lg,
    },
    emptyBtnText: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
    },
});
//# sourceMappingURL=today.js.map