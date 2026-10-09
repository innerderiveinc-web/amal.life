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
exports.ReflectionScreen = void 0;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const ui_1 = require("@amal/ui");
const ReflectionScreen = () => {
    const [wentWell, setWentWell] = (0, react_1.useState)('');
    const [feltDifficult, setFeltDifficult] = (0, react_1.useState)('');
    const [tomorrow, setTomorrow] = (0, react_1.useState)('');
    const [submitted, setSubmitted] = (0, react_1.useState)(false);
    return (<react_native_1.ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <react_native_1.Text style={styles.title}>Daily Muhasabah</react_native_1.Text>
      <react_native_1.Text style={styles.subtitle}>
        Calm self-accounting without moral scorecards or spiritual judgment
      </react_native_1.Text>

      {/* Behavioral Insights Card */}
      <react_native_1.View style={styles.insightCard}>
        <react_native_1.Text style={styles.insightHeader}>BEHAVIORAL OBSERVATIONS</react_native_1.Text>
        <react_native_1.Text style={styles.insightText}>
          • Your Quran consistency is strongest on weekend mornings between 6:30 AM and 7:30 AM.
        </react_native_1.Text>
        <react_native_1.Text style={styles.insightText}>
          • Evening wind-down completion correlates directly with waking up on time for Fajr.
        </react_native_1.Text>
        <react_native_1.Text style={styles.insightDisclaimer}>
          Note: These are routine observations, not spiritual scores or moral judgments.
        </react_native_1.Text>
      </react_native_1.View>

      {/* Muhasabah Prompts */}
      <react_native_1.View style={styles.formCard}>
        <react_native_1.Text style={styles.inputLabel}>What went well today?</react_native_1.Text>
        <react_native_1.TextInput style={styles.textInput} placeholder="e.g. Prayed Dhuhr on time, called my mother..." placeholderTextColor={ui_1.AmalTheme.colors.text.tertiaryLight} value={wentWell} onChangeText={setWentWell} multiline/>

        <react_native_1.Text style={styles.inputLabel}>What felt difficult or rushed?</react_native_1.Text>
        <react_native_1.TextInput style={styles.textInput} placeholder="e.g. Bedtime was pushed late due to urgent work tasks..." placeholderTextColor={ui_1.AmalTheme.colors.text.tertiaryLight} value={feltDifficult} onChangeText={setFeltDifficult} multiline/>

        <react_native_1.Text style={styles.inputLabel}>What is your small intention for tomorrow?</react_native_1.Text>
        <react_native_1.TextInput style={styles.textInput} placeholder="e.g. Put phone down at 10 PM and pray 2 rak'ahs with presence..." placeholderTextColor={ui_1.AmalTheme.colors.text.tertiaryLight} value={tomorrow} onChangeText={setTomorrow} multiline/>

        <react_native_1.TouchableOpacity style={styles.saveButton} onPress={() => setSubmitted(true)}>
          <react_native_1.Text style={styles.saveButtonText}>
            {submitted ? '✓ Saved Privately' : 'Save Reflection'}
          </react_native_1.Text>
        </react_native_1.TouchableOpacity>
      </react_native_1.View>
    </react_native_1.ScrollView>);
};
exports.ReflectionScreen = ReflectionScreen;
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ui_1.AmalTheme.colors.surface.backgroundLight,
    },
    content: {
        padding: 20,
        paddingTop: 60,
    },
    title: {
        fontSize: 26,
        fontWeight: '800',
        color: ui_1.AmalTheme.colors.text.primaryLight,
    },
    subtitle: {
        fontSize: 13,
        color: ui_1.AmalTheme.colors.text.secondaryLight,
        marginTop: 4,
        marginBottom: 20,
        lineHeight: 18,
    },
    insightCard: {
        backgroundColor: ui_1.AmalTheme.colors.surface.cardLight,
        borderRadius: 14,
        padding: 16,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: ui_1.AmalTheme.colors.surface.borderLight,
    },
    insightHeader: {
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 1,
        color: ui_1.AmalTheme.colors.primary,
        marginBottom: 8,
    },
    insightText: {
        fontSize: 13,
        color: ui_1.AmalTheme.colors.text.primaryLight,
        lineHeight: 20,
        marginBottom: 6,
    },
    insightDisclaimer: {
        fontSize: 11,
        fontStyle: 'italic',
        color: ui_1.AmalTheme.colors.text.tertiaryLight,
        marginTop: 6,
    },
    formCard: {
        backgroundColor: ui_1.AmalTheme.colors.surface.cardLight,
        borderRadius: 14,
        padding: 18,
        borderWidth: 1,
        borderColor: ui_1.AmalTheme.colors.surface.borderLight,
        marginBottom: 40,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '700',
        color: ui_1.AmalTheme.colors.text.primaryLight,
        marginBottom: 6,
        marginTop: 10,
    },
    textInput: {
        backgroundColor: ui_1.AmalTheme.colors.surface.backgroundLight,
        borderWidth: 1,
        borderColor: ui_1.AmalTheme.colors.surface.borderLight,
        borderRadius: 10,
        padding: 12,
        fontSize: 14,
        color: ui_1.AmalTheme.colors.text.primaryLight,
        minHeight: 60,
        textAlignVertical: 'top',
    },
    saveButton: {
        backgroundColor: ui_1.AmalTheme.colors.primary,
        borderRadius: 10,
        paddingVertical: 14,
        alignItems: 'center',
        marginTop: 20,
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 15,
    },
});
//# sourceMappingURL=ReflectionScreen.js.map