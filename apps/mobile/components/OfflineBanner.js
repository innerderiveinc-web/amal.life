"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfflineBanner = void 0;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const ui_1 = require("@amal/ui");
const OfflineBanner = ({ isOffline, pendingSyncCount = 0, }) => {
    if (!isOffline && pendingSyncCount === 0)
        return null;
    return (<react_native_1.View style={styles.bannerContainer}>
      <react_native_1.Text style={styles.bannerIcon}>📡</react_native_1.Text>
      <react_native_1.Text style={styles.bannerText}>
        {isOffline
            ? 'Offline Mode: Actions & reflections saved locally to sync later.'
            : `Syncing ${pendingSyncCount} saved actions to vault...`}
      </react_native_1.Text>
    </react_native_1.View>);
};
exports.OfflineBanner = OfflineBanner;
const styles = react_native_1.StyleSheet.create({
    bannerContainer: {
        backgroundColor: ui_1.AmalTheme.colors.accent.sand,
        paddingVertical: ui_1.AmalTheme.spacing[2],
        paddingHorizontal: ui_1.AmalTheme.spacing[4],
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: ui_1.AmalTheme.colors.surface.borderLight,
    },
    bannerIcon: {
        fontSize: 12,
        marginRight: 6,
    },
    bannerText: {
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        color: ui_1.AmalTheme.colors.text.secondaryLight,
        fontWeight: '600',
    },
});
//# sourceMappingURL=OfflineBanner.js.map