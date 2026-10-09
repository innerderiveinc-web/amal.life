import { KillSwitchFlag, CommunicationChannel } from '@amal/types';
export declare class GlobalKillSwitches {
    private static switches;
    static isSwitchActive(flag: KillSwitchFlag): boolean;
    static enable(flag: KillSwitchFlag): void;
    static disable(flag: KillSwitchFlag): void;
    static isChannelBlocked(channel: CommunicationChannel): boolean;
    static reset(): void;
}
//# sourceMappingURL=global-kill-switches.d.ts.map