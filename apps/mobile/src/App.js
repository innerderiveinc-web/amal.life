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
exports.App = void 0;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const ui_1 = require("@amal/ui");
const TodayScreen_js_1 = require("./screens/TodayScreen.js");
const JourneyScreen_js_1 = require("./screens/JourneyScreen.js");
const AskAmalScreen_js_1 = require("./screens/AskAmalScreen.js");
const ReflectionScreen_js_1 = require("./screens/ReflectionScreen.js");
const PrivacyCenterScreen_js_1 = require("./screens/PrivacyCenterScreen.js");
const App = () => {
    const [activeTab, setActiveTab] = (0, react_1.useState)('TODAY');
    return (<react_native_1.SafeAreaView style={styles.container}>
      <react_native_1.View style={styles.screenContainer}>
        {activeTab === 'TODAY' && <TodayScreen_js_1.TodayScreen />}
        {activeTab === 'JOURNEYS' && <JourneyScreen_js_1.JourneyScreen />}
        {activeTab === 'ASK_AMAL' && <AskAmalScreen_js_1.AskAmalScreen />}
        {activeTab === 'REFLECT' && <ReflectionScreen_js_1.ReflectionScreen />}
        {activeTab === 'PRIVACY' && <PrivacyCenterScreen_js_1.PrivacyCenterScreen />}
      </react_native_1.View>

      {/* Bottom Navigation Bar */}
      <react_native_1.View style={styles.tabBar}>
        <react_native_1.TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab('TODAY')}>
          <react_native_1.Text style={[styles.tabLabel, activeTab === 'TODAY' && styles.tabLabelActive]}>
            Today
          </react_native_1.Text>
        </react_native_1.TouchableOpacity>

        <react_native_1.TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab('JOURNEYS')}>
          <react_native_1.Text style={[styles.tabLabel, activeTab === 'JOURNEYS' && styles.tabLabelActive]}>
            Journeys
          </react_native_1.Text>
        </react_native_1.TouchableOpacity>

        <react_native_1.TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab('ASK_AMAL')}>
          <react_native_1.Text style={[styles.tabLabel, activeTab === 'ASK_AMAL' && styles.tabLabelActive]}>
            Ask AMAL
          </react_native_1.Text>
        </react_native_1.TouchableOpacity>

        <react_native_1.TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab('REFLECT')}>
          <react_native_1.Text style={[styles.tabLabel, activeTab === 'REFLECT' && styles.tabLabelActive]}>
            Reflect
          </react_native_1.Text>
        </react_native_1.TouchableOpacity>

        <react_native_1.TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab('PRIVACY')}>
          <react_native_1.Text style={[styles.tabLabel, activeTab === 'PRIVACY' && styles.tabLabelActive]}>
            Privacy
          </react_native_1.Text>
        </react_native_1.TouchableOpacity>
      </react_native_1.View>
    </react_native_1.SafeAreaView>);
};
exports.App = App;
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ui_1.AmalTheme.colors.surface.backgroundLight,
    },
    screenContainer: {
        flex: 1,
    },
    tabBar: {
        flexDirection: 'row',
        backgroundColor: ui_1.AmalTheme.colors.surface.cardLight,
        borderTopWidth: 1,
        borderTopColor: ui_1.AmalTheme.colors.surface.borderLight,
        paddingVertical: 12,
        paddingBottom: 24,
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
    },
    tabLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: ui_1.AmalTheme.colors.text.tertiaryLight,
    },
    tabLabelActive: {
        color: ui_1.AmalTheme.colors.primary,
        fontWeight: '800',
    },
});
exports.default = exports.App;
//# sourceMappingURL=App.js.map