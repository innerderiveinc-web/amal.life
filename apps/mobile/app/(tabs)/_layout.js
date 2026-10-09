"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TabLayout;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const ui_1 = require("@amal/ui");
function TabLayout({ children }) {
    return (<react_native_1.View style={styles.container}>
      <react_native_1.View style={styles.content}>{children}</react_native_1.View>
      <react_native_1.View style={styles.tabBar}>
        <react_native_1.TouchableOpacity style={styles.tabItem}>
          <react_native_1.Text style={styles.tabIcon}>☀️</react_native_1.Text>
          <react_native_1.Text style={[styles.tabLabel, styles.tabLabelActive]}>Today</react_native_1.Text>
        </react_native_1.TouchableOpacity>

        <react_native_1.TouchableOpacity style={styles.tabItem}>
          <react_native_1.Text style={styles.tabIcon}>📖</react_native_1.Text>
          <react_native_1.Text style={styles.tabLabel}>Learn</react_native_1.Text>
        </react_native_1.TouchableOpacity>

        <react_native_1.TouchableOpacity style={styles.tabItem}>
          <react_native_1.Text style={styles.tabIcon}>🌱</react_native_1.Text>
          <react_native_1.Text style={styles.tabLabel}>Amal</react_native_1.Text>
        </react_native_1.TouchableOpacity>

        <react_native_1.TouchableOpacity style={styles.tabItem}>
          <react_native_1.Text style={styles.tabIcon}>👤</react_native_1.Text>
          <react_native_1.Text style={styles.tabLabel}>Me</react_native_1.Text>
        </react_native_1.TouchableOpacity>
      </react_native_1.View>
    </react_native_1.View>);
}
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ui_1.AmalTheme.colors.surface.backgroundLight,
    },
    content: {
        flex: 1,
    },
    tabBar: {
        flexDirection: 'row',
        height: 64,
        backgroundColor: ui_1.AmalTheme.colors.surface.cardLight,
        borderTopWidth: 1,
        borderTopColor: ui_1.AmalTheme.colors.surface.borderLight,
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingBottom: 8,
    },
    tabItem: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabIcon: {
        fontSize: 18,
        marginBottom: 2,
    },
    tabLabel: {
        fontSize: 11,
        color: ui_1.AmalTheme.colors.text.secondaryLight,
        fontWeight: '600',
    },
    tabLabelActive: {
        color: ui_1.AmalTheme.colors.primary,
        fontWeight: '700',
    },
});
//# sourceMappingURL=_layout.js.map