import { KillSwitchFlag, CommunicationChannel } from '@amal/types';

export class GlobalKillSwitches {
  private static switches: Map<KillSwitchFlag, boolean> = new Map([
    ['STOP_ALL_PUSH', false],
    ['STOP_ALL_WHATSAPP', false],
    ['STOP_ALL_SMS', false],
    ['STOP_ALL_VOICE', false],
    ['STOP_ALL_OUTBOUND', false],
  ]);

  public static isSwitchActive(flag: KillSwitchFlag): boolean {
    return !!this.switches.get(flag);
  }

  public static enable(flag: KillSwitchFlag): void {
    this.switches.set(flag, true);
  }

  public static disable(flag: KillSwitchFlag): void {
    this.switches.set(flag, false);
  }

  public static isChannelBlocked(channel: CommunicationChannel): boolean {
    if (this.isSwitchActive('STOP_ALL_OUTBOUND')) {
      return true;
    }

    switch (channel) {
      case 'PUSH':
        return this.isSwitchActive('STOP_ALL_PUSH');
      case 'WHATSAPP':
        return this.isSwitchActive('STOP_ALL_WHATSAPP');
      case 'SMS':
        return this.isSwitchActive('STOP_ALL_SMS');
      case 'VOICE':
        return this.isSwitchActive('STOP_ALL_VOICE');
      default:
        return false;
    }
  }

  public static reset(): void {
    this.switches.set('STOP_ALL_PUSH', false);
    this.switches.set('STOP_ALL_WHATSAPP', false);
    this.switches.set('STOP_ALL_SMS', false);
    this.switches.set('STOP_ALL_VOICE', false);
    this.switches.set('STOP_ALL_OUTBOUND', false);
  }
}
