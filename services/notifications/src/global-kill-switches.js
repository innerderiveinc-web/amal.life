"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalKillSwitches = void 0;
class GlobalKillSwitches {
    static switches = new Map([
        ['STOP_ALL_PUSH', false],
        ['STOP_ALL_WHATSAPP', false],
        ['STOP_ALL_SMS', false],
        ['STOP_ALL_VOICE', false],
        ['STOP_ALL_OUTBOUND', false],
    ]);
    static isSwitchActive(flag) {
        return !!this.switches.get(flag);
    }
    static enable(flag) {
        this.switches.set(flag, true);
    }
    static disable(flag) {
        this.switches.set(flag, false);
    }
    static isChannelBlocked(channel) {
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
    static reset() {
        this.switches.set('STOP_ALL_PUSH', false);
        this.switches.set('STOP_ALL_WHATSAPP', false);
        this.switches.set('STOP_ALL_SMS', false);
        this.switches.set('STOP_ALL_VOICE', false);
        this.switches.set('STOP_ALL_OUTBOUND', false);
    }
}
exports.GlobalKillSwitches = GlobalKillSwitches;
//# sourceMappingURL=global-kill-switches.js.map