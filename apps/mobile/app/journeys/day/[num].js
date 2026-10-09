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
exports.default = JourneyDayWorkspaceScreen;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const ui_1 = require("@amal/ui");
function JourneyDayWorkspaceScreen() {
    const [completedSteps, setCompletedSteps] = (0, react_1.useState)([]);
    const toggleStep = (stepIdx) => {
        setCompletedSteps((prev) => prev.includes(stepIdx) ? prev.filter((i) => i !== stepIdx) : [...prev, stepIdx]);
    };
    const dayTasks = [
        { title: 'Read 2 Selected Ayat of Surah al-Isra', duration: '5 min', desc: 'Focus on ayah 17:78 regarding dawn prayer contemplation.' },
        { title: 'Evening Phone Displacement', duration: '5 min', desc: 'Plug your device outside your sleeping zone 30 mins before sleep.' },
        { title: 'Sleep with Wudu & Ayat al-Kursi', duration: '2 min', desc: 'Renew your intention to stand for Fajr tomorrow morning.' },
    ];
    return (<react_native_1.ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <react_native_1.Text style={styles.categoryLabel}>DAY WORKSPACE</react_native_1.Text>
      <react_native_1.Text style={styles.title}>Day 4 — Removing Friction</react_native_1.Text>
      <react_native_1.Text style={styles.subtitle}>
        Micro-actions tailored to your evening routine without exhausting your cognitive energy.
      </react_native_1.Text>

      <react_native_1.View style={styles.taskList}>
        {dayTasks.map((t, idx) => {
            const isDone = completedSteps.includes(idx);
            return (<react_native_1.TouchableOpacity key={idx} style={[styles.taskCard, isDone && styles.taskCardDone]} onPress={() => toggleStep(idx)} activeOpacity={0.7}>
              <react_native_1.View style={[styles.checkCircle, isDone && styles.checkCircleDone]}>
                {isDone && <react_native_1.Text style={styles.checkMark}>✓</react_native_1.Text>}
              </react_native_1.View>
              <react_native_1.View style={styles.taskInfo}>
                <react_native_1.View style={styles.taskHeader}>
                  <react_native_1.Text style={[styles.taskTitle, isDone && styles.taskTitleDone]}>{t.title}</react_native_1.Text>
                  <react_native_1.Text style={styles.taskDuration}>{t.duration}</react_native_1.Text>
                </react_native_1.View>
                <react_native_1.Text style={styles.taskDesc}>{t.desc}</react_native_1.Text>
              </react_native_1.View>
            </react_native_1.TouchableOpacity>);
        })}
      </react_native_1.View>

      <react_native_1.View style={styles.reflectionPromptBox}>
        <react_native_1.Text style={styles.reflectionLabel}>CHECK-IN PROMPT</react_native_1.Text>
        <react_native_1.Text style={styles.reflectionText}>
          "Did keeping your phone away yesterday make waking up feel slightly more manageable?"
        </react_native_1.Text>
      </react_native_1.View>

      <react_native_1.TouchableOpacity style={styles.finishBtn}>
        <react_native_1.Text style={styles.finishBtnText}>
          {completedSteps.length === dayTasks.length
            ? '✓ Day 4 Completed with Sincerity'
            : 'Save Progress & Continue'}
        </react_native_1.Text>
      </react_native_1.TouchableOpacity>
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
        fontSize: ui_1.AmalTheme.typography.sizes['2xl'],
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
    taskList: {
        gap: ui_1.AmalTheme.spacing[3],
        marginBottom: ui_1.AmalTheme.spacing[5],
    },
    taskCard: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: ui_1.AmalTheme.colors.surface.cardLight,
        padding: ui_1.AmalTheme.spacing[4],
        borderRadius: ui_1.AmalTheme.radii.lg,
        borderWidth: 1,
        borderColor: ui_1.AmalTheme.colors.surface.borderLight,
    },
    taskCardDone: {
        backgroundColor: ui_1.AmalTheme.colors.surface.backgroundLight,
        borderColor: ui_1.AmalTheme.colors.status.successLight,
    },
    checkCircle: {
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 1.5,
        borderColor: ui_1.AmalTheme.colors.surface.borderLight,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: ui_1.AmalTheme.spacing[3],
        marginTop: 2,
    },
    checkCircleDone: {
        backgroundColor: ui_1.AmalTheme.colors.primary,
        borderColor: ui_1.AmalTheme.colors.primary,
    },
    checkMark: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '800',
    },
    taskInfo: {
        flex: 1,
    },
    taskHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
    },
    taskTitle: {
        fontSize: ui_1.AmalTheme.typography.sizes.sm,
        fontWeight: '700',
        color: ui_1.AmalTheme.colors.text.primaryLight,
        flex: 1,
        marginRight: 8,
    },
    taskTitleDone: {
        color: ui_1.AmalTheme.colors.text.secondaryLight,
        textDecorationLine: 'line-through',
    },
    taskDuration: {
        fontSize: 11,
        color: ui_1.AmalTheme.colors.primary,
        fontWeight: '700',
    },
    taskDesc: {
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        color: ui_1.AmalTheme.colors.text.secondaryLight,
        marginTop: 4,
        lineHeight: 16,
    },
    reflectionPromptBox: {
        backgroundColor: ui_1.AmalTheme.colors.accent.sand,
        padding: ui_1.AmalTheme.spacing[4],
        borderRadius: ui_1.AmalTheme.radii.lg,
        marginBottom: ui_1.AmalTheme.spacing[5],
    },
    reflectionLabel: {
        fontSize: 10,
        fontWeight: '800',
        letterSpacing: 1,
        color: ui_1.AmalTheme.colors.primary,
        marginBottom: 4,
    },
    reflectionText: {
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        color: ui_1.AmalTheme.colors.text.primaryLight,
        fontStyle: 'italic',
        lineHeight: 18,
    },
    finishBtn: {
        backgroundColor: ui_1.AmalTheme.colors.primary,
        paddingVertical: ui_1.AmalTheme.spacing[4],
        borderRadius: ui_1.AmalTheme.radii.lg,
        alignItems: 'center',
        marginBottom: ui_1.AmalTheme.spacing[8],
    },
    finishBtnText: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: ui_1.AmalTheme.typography.sizes.base,
    },
});
//# sourceMappingURL=%5Bnum%5D.js.map