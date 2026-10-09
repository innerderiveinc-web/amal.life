"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JourneyStateMachine = exports.JOURNEY_TRANSITIONS = void 0;
const types_1 = require("@amal/types");
exports.JOURNEY_TRANSITIONS = {
    [types_1.JourneyState.DISCOVERED]: [types_1.JourneyState.PREVIEWED],
    [types_1.JourneyState.PREVIEWED]: [types_1.JourneyState.STARTED],
    [types_1.JourneyState.STARTED]: [types_1.JourneyState.ACTIVE, types_1.JourneyState.PAUSED],
    [types_1.JourneyState.ACTIVE]: [
        types_1.JourneyState.STRUGGLING,
        types_1.JourneyState.ADAPTING,
        types_1.JourneyState.PAUSED,
        types_1.JourneyState.COMPLETED,
    ],
    [types_1.JourneyState.STRUGGLING]: [
        types_1.JourneyState.ADAPTING,
        types_1.JourneyState.PAUSED,
        types_1.JourneyState.ACTIVE,
    ],
    [types_1.JourneyState.ADAPTING]: [
        types_1.JourneyState.ACTIVE,
        types_1.JourneyState.PAUSED,
    ],
    [types_1.JourneyState.PAUSED]: [
        types_1.JourneyState.ACTIVE,
        types_1.JourneyState.ABANDONED,
    ],
    [types_1.JourneyState.COMPLETED]: [types_1.JourneyState.ARCHIVED],
    [types_1.JourneyState.ABANDONED]: [types_1.JourneyState.ARCHIVED],
    [types_1.JourneyState.ARCHIVED]: [],
};
class JourneyStateMachine {
    static canTransition(from, to) {
        const allowed = exports.JOURNEY_TRANSITIONS[from];
        return !!allowed && allowed.includes(to);
    }
    static transition(from, to) {
        if (!this.canTransition(from, to)) {
            throw new types_1.InvalidJourneyTransition(`Invalid journey transition from state '${from}' to '${to}'. Allowed: [${(exports.JOURNEY_TRANSITIONS[from] || []).join(', ')}]`);
        }
        return to;
    }
}
exports.JourneyStateMachine = JourneyStateMachine;
//# sourceMappingURL=state-machine.js.map