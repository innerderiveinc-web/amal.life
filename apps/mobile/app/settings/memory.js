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
exports.default = MemoryVaultScreen;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const ui_1 = require("@amal/ui");
function MemoryVaultScreen() {
    const [selectedWhy, setSelectedWhy] = (0, react_1.useState)(null);
    const [memories, setMemories] = (0, react_1.useState)([
        {
            id: 'm1',
            category: 'CONFIRMED PREFERENCE',
            fact: 'Target daily practice capacity is 10 minutes',
            provenance: 'User stated in onboarding',
            confidence: 'High (Confirmed)',
            whyText: 'You explicitly selected 10 minutes during your initial capacity setup.',
            isPrivate: false,
        },
        {
            id: 'm2',
            category: 'CONFIRMED PREFERENCE',
            fact: 'Prefers quiet morning practice after Fajr',
            provenance: 'User confirmed in weekly check-in',
            confidence: 'High (Confirmed)',
            whyText: 'Confirmed on Day 7 milestone review.',
            isPrivate: false,
        },
        {
            id: 'm3',
            category: 'DERIVED PATTERN',
            fact: 'Quran reading consistency is 3x higher before 9 AM',
            provenance: 'Observed across 14 completed sessions',
            confidence: 'Medium (Observed)',
            whyText: 'Based on 7 recent activity events and 2 reflections where morning sessions completed smoothly.',
            isPrivate: false,
        },
        {
            id: 'm4',
            category: 'JOURNEY CONTEXT',
            fact: 'Evening work hours often extend until 8 PM on weekdays',
            provenance: 'Inferred from 3 evening reflection notes',
            confidence: 'Medium (Inferred)',
            whyText: 'Derived from reflection mentions of late meetings causing delayed Isha prayer.',
            isPrivate: true,
        },
    ]);
    const forgetItem = (id) => {
        setMemories((prev) => prev.filter((m) => m.id !== id));
    };
    const togglePrivate = (id) => {
        setMemories((prev) => prev.map((m) => (m.id === id ? { ...m, isPrivate: !m.isPrivate } : m)));
    };
    return (<react_native_1.ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <react_native_1.Text style={styles.categoryLabel}>TRANSPARENCY & CONTROL</react_native_1.Text>
      <react_native_1.Text style={styles.title}>What AMAL Remembers</react_native_1.Text>
      <react_native_1.Text style={styles.subtitle}>
        Every fact AMAL retains about your routine, preferences, and context. You have sovereign control
        to inspect, edit, or forget any item.
      </react_native_1.Text>

      <react_native_1.View style={styles.list}>
        {memories.map((m) => (<react_native_1.View key={m.id} style={styles.memoryCard}>
            <react_native_1.View style={styles.cardHeader}>
              <react_native_1.Text style={styles.categoryBadge}>{m.category}</react_native_1.Text>
              <react_native_1.Text style={styles.confidenceBadge}>{m.confidence}</react_native_1.Text>
            </react_native_1.View>

            <react_native_1.Text style={styles.factText}>{m.fact}</react_native_1.Text>
            <react_native_1.Text style={styles.provenanceText}>Source: {m.provenance}</react_native_1.Text>

            {/* Why does AMAL think this? */}
            <react_native_1.TouchableOpacity style={styles.whyBtn} onPress={() => setSelectedWhy(selectedWhy === m.id ? null : m.id)}>
              <react_native_1.Text style={styles.whyBtnText}>
                {selectedWhy === m.id ? '▲ Hide reasoning' : '▼ Why does AMAL think this?'}
              </react_native_1.Text>
            </react_native_1.TouchableOpacity>

            {selectedWhy === m.id && (<react_native_1.View style={styles.whyBox}>
                <react_native_1.Text style={styles.whyText}>{m.whyText}</react_native_1.Text>
              </react_native_1.View>)}

            {/* Control Actions */}
            <react_native_1.View style={styles.actionRow}>
              <react_native_1.TouchableOpacity style={styles.actionBtn} onPress={() => forgetItem(m.id)}>
                <react_native_1.Text style={styles.forgetBtnText}>Forget This</react_native_1.Text>
              </react_native_1.TouchableOpacity>

              <react_native_1.TouchableOpacity style={styles.actionBtn} onPress={() => togglePrivate(m.id)}>
                <react_native_1.Text style={styles.actionText}>
                  {m.isPrivate ? '🔒 Private to Vault' : '🔓 Context Active'}
                </react_native_1.Text>
              </react_native_1.TouchableOpacity>
            </react_native_1.View>
          </react_native_1.View>))}
      </react_native_1.View>

      <react_native_1.TouchableOpacity style={styles.wipeBtn} onPress={() => setMemories([])}>
        <react_native_1.Text style={styles.wipeBtnText}>Clear All Memory & Context Facts</react_native_1.Text>
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
    list: {
        gap: ui_1.AmalTheme.spacing[3],
        marginBottom: ui_1.AmalTheme.spacing[5],
    },
    memoryCard: {
        backgroundColor: ui_1.AmalTheme.colors.surface.cardLight,
        borderRadius: ui_1.AmalTheme.radii.xl,
        padding: ui_1.AmalTheme.spacing[4],
        borderWidth: 1,
        borderColor: ui_1.AmalTheme.colors.surface.borderLight,
        ...ui_1.AmalTheme.shadows.subtle,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    categoryBadge: {
        fontSize: 10,
        fontWeight: '800',
        color: ui_1.AmalTheme.colors.primary,
        letterSpacing: 0.8,
    },
    confidenceBadge: {
        fontSize: 10,
        color: ui_1.AmalTheme.colors.text.tertiaryLight,
        fontWeight: '600',
    },
    factText: {
        fontSize: ui_1.AmalTheme.typography.sizes.sm,
        fontWeight: '700',
        color: ui_1.AmalTheme.colors.text.primaryLight,
        marginTop: 2,
    },
    provenanceText: {
        fontSize: 11,
        color: ui_1.AmalTheme.colors.text.secondaryLight,
        marginTop: 4,
    },
    whyBtn: {
        marginTop: 6,
        marginBottom: 4,
    },
    whyBtnText: {
        fontSize: 11,
        fontWeight: '700',
        color: ui_1.AmalTheme.colors.primary,
    },
    whyBox: {
        backgroundColor: ui_1.AmalTheme.colors.surface.backgroundLight,
        padding: ui_1.AmalTheme.spacing[3],
        borderRadius: ui_1.AmalTheme.radii.md,
        marginVertical: 4,
    },
    whyText: {
        fontSize: 11,
        color: ui_1.AmalTheme.colors.text.secondaryLight,
        lineHeight: 16,
    },
    actionRow: {
        flexDirection: 'row',
        gap: 8,
        marginTop: ui_1.AmalTheme.spacing[2],
        paddingTop: ui_1.AmalTheme.spacing[2],
        borderTopWidth: 1,
        borderTopColor: ui_1.AmalTheme.colors.surface.borderLight,
    },
    actionBtn: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: ui_1.AmalTheme.radii.sm,
        backgroundColor: ui_1.AmalTheme.colors.surface.backgroundLight,
    },
    actionText: {
        fontSize: 11,
        color: ui_1.AmalTheme.colors.text.secondaryLight,
        fontWeight: '600',
    },
    forgetBtnText: {
        fontSize: 11,
        color: ui_1.AmalTheme.colors.status.warning,
        fontWeight: '700',
    },
    wipeBtn: {
        borderWidth: 1,
        borderColor: ui_1.AmalTheme.colors.status.warning,
        paddingVertical: ui_1.AmalTheme.spacing[3],
        borderRadius: ui_1.AmalTheme.radii.lg,
        alignItems: 'center',
        marginBottom: ui_1.AmalTheme.spacing[8],
    },
    wipeBtnText: {
        color: ui_1.AmalTheme.colors.status.warning,
        fontWeight: '700',
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
    },
});
//# sourceMappingURL=memory.js.map