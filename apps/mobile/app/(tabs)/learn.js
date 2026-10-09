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
exports.default = LearnScreen;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const ui_1 = require("@amal/ui");
function LearnScreen() {
    const [search, setSearch] = (0, react_1.useState)('');
    const knowledgeSections = [
        { title: 'The Holy Qur\'an', count: '114 Surahs · Uthmani Text & Classical Tafsir', icon: '📖' },
        { title: 'Prophetic Hadith', count: 'Sahih al-Bukhari & Muslim · Governed Chains', icon: '📜' },
        { title: 'Islamic Concepts Graph', count: 'Sabr, Niyyah, Yusr, Tawakkul, Birr', icon: '🕸' },
        { title: 'Scholarly Rulings & Differences', count: 'Recognized 4 Madhhabs & Contemporary Counsel', icon: '⚖️' },
    ];
    return (<react_native_1.ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <react_native_1.Text style={styles.categoryLabel}>GOVERNED KNOWLEDGE</react_native_1.Text>
      <react_native_1.Text style={styles.title}>Learn & Explore</react_native_1.Text>
      <react_native_1.Text style={styles.subtitle}>
        Primary sources, authenticated translations, and scholarly provenance.
      </react_native_1.Text>

      {/* Search Input */}
      <react_native_1.View style={styles.searchBar}>
        <react_native_1.Text style={styles.searchIcon}>🔍</react_native_1.Text>
        <react_native_1.TextInput style={styles.searchInput} placeholder="Search by Surah, Hadith, or Concept..." placeholderTextColor={ui_1.AmalTheme.colors.text.tertiaryLight} value={search} onChangeText={setSearch}/>
      </react_native_1.View>

      {/* Core Knowledge Sections */}
      <react_native_1.Text style={styles.sectionHeading}>AUTHENTIC ISLAMIC SOURCES</react_native_1.Text>
      {knowledgeSections.map((sec, idx) => (<react_native_1.TouchableOpacity key={idx} style={styles.knowledgeCard} activeOpacity={0.7}>
          <react_native_1.Text style={styles.cardIcon}>{sec.icon}</react_native_1.Text>
          <react_native_1.View style={styles.cardInfo}>
            <react_native_1.Text style={styles.cardTitle}>{sec.title}</react_native_1.Text>
            <react_native_1.Text style={styles.cardCount}>{sec.count}</react_native_1.Text>
          </react_native_1.View>
          <react_native_1.Text style={styles.cardArrow}>→</react_native_1.Text>
        </react_native_1.TouchableOpacity>))}

      {/* Featured Ayah of the Day */}
      <react_native_1.View style={styles.featuredBox}>
        <react_native_1.Text style={styles.featuredLabel}>AYAH OF CONTEMPLATION</react_native_1.Text>
        <react_native_1.Text style={styles.arabicVerse}>
          وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ
        </react_native_1.Text>
        <react_native_1.Text style={styles.englishVerse}>
          "And whoever is mindful of Allah - He will make for him a way out and provide for him from where he does not expect." (Quran 65:2-3)
        </react_native_1.Text>
        <react_native_1.View style={styles.provenancePill}>
          <react_native_1.Text style={styles.provenanceText}>✓ Verified Edition: Hafs an Asim · Tanzil Approved</react_native_1.Text>
        </react_native_1.View>
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
        marginBottom: ui_1.AmalTheme.spacing[4],
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: ui_1.AmalTheme.colors.surface.cardLight,
        borderRadius: ui_1.AmalTheme.radii.lg,
        paddingHorizontal: ui_1.AmalTheme.spacing[3],
        paddingVertical: ui_1.AmalTheme.spacing[2],
        borderWidth: 1,
        borderColor: ui_1.AmalTheme.colors.surface.borderLight,
        marginBottom: ui_1.AmalTheme.spacing[5],
    },
    searchIcon: {
        fontSize: 14,
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: ui_1.AmalTheme.typography.sizes.sm,
        color: ui_1.AmalTheme.colors.text.primaryLight,
    },
    sectionHeading: {
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        fontWeight: '800',
        letterSpacing: 1,
        color: ui_1.AmalTheme.colors.text.secondaryLight,
        marginBottom: ui_1.AmalTheme.spacing[3],
    },
    knowledgeCard: {
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
    cardIcon: {
        fontSize: 22,
        marginRight: ui_1.AmalTheme.spacing[3],
    },
    cardInfo: {
        flex: 1,
    },
    cardTitle: {
        fontSize: ui_1.AmalTheme.typography.sizes.base,
        fontWeight: '700',
        color: ui_1.AmalTheme.colors.text.primaryLight,
    },
    cardCount: {
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        color: ui_1.AmalTheme.colors.text.secondaryLight,
        marginTop: 2,
    },
    cardArrow: {
        fontSize: 16,
        color: ui_1.AmalTheme.colors.primary,
        fontWeight: '700',
    },
    featuredBox: {
        backgroundColor: ui_1.AmalTheme.colors.surface.cardLight,
        borderRadius: ui_1.AmalTheme.radii.xl,
        padding: ui_1.AmalTheme.spacing[5],
        marginTop: ui_1.AmalTheme.spacing[3],
        marginBottom: ui_1.AmalTheme.spacing[6],
        borderWidth: 1,
        borderColor: ui_1.AmalTheme.colors.surface.borderLight,
    },
    featuredLabel: {
        fontSize: 10,
        fontWeight: '800',
        letterSpacing: 1,
        color: ui_1.AmalTheme.colors.primary,
        marginBottom: ui_1.AmalTheme.spacing[2],
    },
    arabicVerse: {
        fontSize: ui_1.AmalTheme.typography.sizes.xl,
        fontFamily: ui_1.AmalTheme.typography.fonts.arabic,
        lineHeight: 40,
        textAlign: 'right',
        color: ui_1.AmalTheme.colors.text.primaryLight,
        marginBottom: ui_1.AmalTheme.spacing[2],
    },
    englishVerse: {
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        color: ui_1.AmalTheme.colors.text.secondaryLight,
        lineHeight: 20,
        fontStyle: 'italic',
        marginBottom: ui_1.AmalTheme.spacing[3],
    },
    provenancePill: {
        backgroundColor: ui_1.AmalTheme.colors.accent.sand,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: ui_1.AmalTheme.radii.sm,
        alignSelf: 'flex-start',
    },
    provenanceText: {
        fontSize: 10,
        color: ui_1.AmalTheme.colors.accent.goldMuted,
        fontWeight: '700',
    },
});
//# sourceMappingURL=learn.js.map