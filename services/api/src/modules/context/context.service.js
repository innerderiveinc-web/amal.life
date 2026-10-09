"use strict";
/**
 * AMAL OS — LAYER 20: CONTEXT SERVICE (Section 20.24)
 * Manages user context signals, non-judgmental inference invariants,
 * confidence weighting, and privacy controls.
 */
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextService = void 0;
const common_1 = require("@nestjs/common");
const types_1 = require("@amal/types");
const policy_engine_js_1 = require("../../common/policy/policy.engine.js");
let ContextService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ContextService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ContextService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        policy;
        static userContexts = new Map();
        constructor(policy = new policy_engine_js_1.PolicyEngine()) {
            this.policy = policy;
        }
        async getContext(actor) {
            this.policy.assertAllowed({
                actor: {
                    userId: actor.userId,
                    roles: actor.roles,
                    accountMode: actor.accountMode,
                },
                action: 'CONTEXT_READ',
                purpose: 'RECOMMENDATION',
            });
            const existing = ContextService.userContexts.get(actor.userId);
            if (existing) {
                return existing;
            }
            const defaultContext = {
                userId: actor.userId,
                energyLevel: 'MEDIUM',
                timeAvailableMinutes: 15,
                environment: 'HOME',
                prayerProximity: 'POST_FAJR',
                signals: [
                    {
                        id: `sig_default_${actor.userId}`,
                        source: types_1.ContextSource.USER_CONFIRMED,
                        key: 'preferred_routine',
                        value: 'morning_quiet',
                        confidence: 0.95,
                        timestamp: new Date().toISOString(),
                    },
                ],
                updatedAt: new Date().toISOString(),
            };
            ContextService.userContexts.set(actor.userId, defaultContext);
            return defaultContext;
        }
        async updateContextSignal(actor, key, value, source = types_1.ContextSource.USER_CONFIRMED, confidence = 1.0) {
            this.policy.assertAllowed({
                actor: {
                    userId: actor.userId,
                    roles: actor.roles,
                    accountMode: actor.accountMode,
                },
                action: 'CONTEXT_UPDATE',
                purpose: 'RECOMMENDATION',
            });
            const current = await this.getContext(actor);
            const signal = {
                id: `sig_${Date.now()}`,
                source,
                key,
                value,
                confidence,
                timestamp: new Date().toISOString(),
            };
            current.signals.push(signal);
            if (key === 'timeAvailableMinutes' && typeof value === 'number') {
                current.timeAvailableMinutes = value;
            }
            if (key === 'energyLevel') {
                current.energyLevel = value;
            }
            current.updatedAt = new Date().toISOString();
            ContextService.userContexts.set(actor.userId, current);
            return current;
        }
        static {
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return ContextService = _classThis;
})();
exports.ContextService = ContextService;
//# sourceMappingURL=context.service.js.map