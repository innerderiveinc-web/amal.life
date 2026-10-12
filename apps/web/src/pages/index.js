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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Home;
const react_1 = __importStar(require("react"));
const head_1 = __importDefault(require("next/head"));
const ui_1 = require("@amal/ui");
function Home() {
    const [question, setQuestion] = (0, react_1.useState)('');
    const [answer, setAnswer] = (0, react_1.useState)(null);
    const handleAsk = () => {
        if (!question)
            return;
        setAnswer('Grounded guidance: Consistency of small actions is more beloved to Allah than sporadic burnout. (Sahih al-Bukhari 6464). Start with one 5-minute habit today.');
    };
    return (<div style={{ backgroundColor: ui_1.AmalTheme.colors.surface.backgroundLight, minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <head_1.default>
        <title>AMAL OS — From Niyyah to Amal</title>
        <meta name="description" content="Sovereign Islamic Life & Practice System"/>
      </head_1.default>

      <main style={{ maxWidth: 860, margin: '0 auto', padding: '40px 20px' }}>
        <header style={{ marginBottom: 40, borderBottom: `1px solid ${ui_1.AmalTheme.colors.surface.borderLight}`, paddingBottom: 24 }}>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: ui_1.AmalTheme.colors.primary, margin: 0 }}>AMAL OS</h1>
          <p style={{ fontSize: 18, color: ui_1.AmalTheme.colors.text.secondaryLight, marginTop: 8 }}>
            Turn faith into action. From Niyyah to Amal.
          </p>
        </header>

        {/* Today Spotlight */}
        <section style={{ backgroundColor: '#FFFFFF', padding: 24, borderRadius: 16, border: `1px solid ${ui_1.AmalTheme.colors.surface.borderLight}`, marginBottom: 30 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: ui_1.AmalTheme.colors.primary, letterSpacing: 1 }}>TODAY'S AMAL</span>
          <h2 style={{ fontSize: 24, margin: '8px 0', color: ui_1.AmalTheme.colors.text.primaryLight }}>Call your parents today</h2>
          <p style={{ color: ui_1.AmalTheme.colors.text.secondaryLight, fontSize: 14 }}>
            Why: Family relationship journey · Connecting ties of kinship
          </p>
          <div style={{ backgroundColor: ui_1.AmalTheme.colors.accent.sand, padding: 10, borderRadius: 8, marginTop: 10, fontSize: 12, fontStyle: 'italic' }}>
            Evidence: Quran 17:23 ("And to parents, good treatment")
          </div>
        </section>

        {/* Ask AMAL Console */}
        <section style={{ backgroundColor: '#FFFFFF', padding: 24, borderRadius: 16, border: `1px solid ${ui_1.AmalTheme.colors.surface.borderLight}` }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: ui_1.AmalTheme.colors.primary, letterSpacing: 1 }}>ASK AMAL INTELLIGENCE</span>
          <p style={{ color: ui_1.AmalTheme.colors.text.secondaryLight, fontSize: 14, margin: '6px 0 16px 0' }}>
            Ground your life situations in verified Islamic evidence. No autonomous fatwas.
          </p>
          <div style={{ display: 'flex', gap: 10 }}>
            <input style={{ flex: 1, padding: '12px 16px', borderRadius: 8, border: `1px solid ${ui_1.AmalTheme.colors.surface.borderLight}`, fontSize: 15 }} placeholder="e.g. I am struggling with waking up for Fajr..." value={question} onChange={(e) => setQuestion(e.target.value)}/>
            <button onClick={handleAsk} style={{ backgroundColor: ui_1.AmalTheme.colors.primary, color: '#FFFFFF', border: 'none', borderRadius: 8, padding: '0 24px', fontWeight: 700, cursor: 'pointer' }}>
              Ask
            </button>
          </div>

          {answer && (<div style={{ marginTop: 20, padding: 16, backgroundColor: ui_1.AmalTheme.colors.primaryLight, borderRadius: 10, borderLeft: `4px solid ${ui_1.AmalTheme.colors.primary}` }}>
              <strong style={{ color: ui_1.AmalTheme.colors.primary }}>Verified Guidance:</strong>
              <p style={{ margin: '8px 0 0 0', color: ui_1.AmalTheme.colors.text.primaryLight, lineHeight: 1.6 }}>{answer}</p>
            </div>)}
        </section>
      </main>
    </div>);
}
//# sourceMappingURL=index.js.map