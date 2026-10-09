import { JourneyState } from '@amal/types';
export declare const JOURNEY_TRANSITIONS: Record<JourneyState, JourneyState[]>;
export declare class JourneyStateMachine {
    static canTransition(from: JourneyState, to: JourneyState): boolean;
    static transition(from: JourneyState, to: JourneyState): JourneyState;
}
//# sourceMappingURL=state-machine.d.ts.map