import { JourneyState, InvalidJourneyTransition } from '@amal/types';

export const JOURNEY_TRANSITIONS: Record<JourneyState, JourneyState[]> = {
  [JourneyState.DISCOVERED]: [JourneyState.PREVIEWED],
  [JourneyState.PREVIEWED]: [JourneyState.STARTED],
  [JourneyState.STARTED]: [JourneyState.ACTIVE, JourneyState.PAUSED],
  [JourneyState.ACTIVE]: [
    JourneyState.STRUGGLING,
    JourneyState.ADAPTING,
    JourneyState.PAUSED,
    JourneyState.COMPLETED,
  ],
  [JourneyState.STRUGGLING]: [
    JourneyState.ADAPTING,
    JourneyState.PAUSED,
    JourneyState.ACTIVE,
  ],
  [JourneyState.ADAPTING]: [
    JourneyState.ACTIVE,
    JourneyState.PAUSED,
  ],
  [JourneyState.PAUSED]: [
    JourneyState.ACTIVE,
    JourneyState.ABANDONED,
  ],
  [JourneyState.COMPLETED]: [JourneyState.ARCHIVED],
  [JourneyState.ABANDONED]: [JourneyState.ARCHIVED],
  [JourneyState.ARCHIVED]: [],
};

export class JourneyStateMachine {
  public static canTransition(from: JourneyState, to: JourneyState): boolean {
    const allowed = JOURNEY_TRANSITIONS[from];
    return !!allowed && allowed.includes(to);
  }

  public static transition(from: JourneyState, to: JourneyState): JourneyState {
    if (!this.canTransition(from, to)) {
      throw new InvalidJourneyTransition(
        `Invalid journey transition from state '${from}' to '${to}'. Allowed: [${(JOURNEY_TRANSITIONS[from] || []).join(', ')}]`
      );
    }
    return to;
  }
}
