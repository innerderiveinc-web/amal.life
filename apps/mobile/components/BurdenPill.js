"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BurdenPill = void 0;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const ui_1 = require("@amal/ui");
const BurdenPill = ({ minutes, pace = 'Gentle' }) => {
    return (<react_native_1.View style={styles.pillContainer}>
      <react_native_1.Text style={styles.pillText}>
        {minutes} min · {pace}
      </react_native_1.Text>
    </react_native_1.View>);
};
exports.BurdenPill = BurdenPill;
const styles = react_native_1.StyleSheet.create({
    pillContainer: {
        backgroundColor: ui_1.AmalTheme.colors.primaryLight,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: ui_1.AmalTheme.radii.full,
        alignSelf: 'flex-start',
    },
    pillText: {
        fontSize: ui_1.AmalTheme.typography.sizes.xs,
        color: ui_1.AmalTheme.colors.primary,
        fontWeight: '700',
        letterSpacing: 0.3,
    },
});
//# sourceMappingURL=BurdenPill.js.map