"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlatformController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_js_1 = require("../../guards/auth.guard.js");
let PlatformController = (() => {
    let _classDecorators = [(0, common_1.Controller)('internal/platform')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _getHealth_decorators;
    let _getSLOs_decorators;
    let _advanceCanary_decorators;
    let _rollbackCanary_decorators;
    let _reconcileOutbox_decorators;
    let _runSynthetic_decorators;
    var PlatformController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _getHealth_decorators = [(0, common_1.Get)('health')];
            _getSLOs_decorators = [(0, common_1.Get)('slos'), (0, common_1.UseGuards)(auth_guard_js_1.AuthGuard)];
            _advanceCanary_decorators = [(0, common_1.Post)('canary/advance'), (0, common_1.UseGuards)(auth_guard_js_1.AuthGuard)];
            _rollbackCanary_decorators = [(0, common_1.Post)('canary/rollback'), (0, common_1.UseGuards)(auth_guard_js_1.AuthGuard)];
            _reconcileOutbox_decorators = [(0, common_1.Post)('reconcile/outbox'), (0, common_1.UseGuards)(auth_guard_js_1.AuthGuard)];
            _runSynthetic_decorators = [(0, common_1.Post)('synthetic/run')];
            __esDecorate(this, null, _getHealth_decorators, { kind: "method", name: "getHealth", static: false, private: false, access: { has: obj => "getHealth" in obj, get: obj => obj.getHealth }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getSLOs_decorators, { kind: "method", name: "getSLOs", static: false, private: false, access: { has: obj => "getSLOs" in obj, get: obj => obj.getSLOs }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _advanceCanary_decorators, { kind: "method", name: "advanceCanary", static: false, private: false, access: { has: obj => "advanceCanary" in obj, get: obj => obj.advanceCanary }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _rollbackCanary_decorators, { kind: "method", name: "rollbackCanary", static: false, private: false, access: { has: obj => "rollbackCanary" in obj, get: obj => obj.rollbackCanary }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _reconcileOutbox_decorators, { kind: "method", name: "reconcileOutbox", static: false, private: false, access: { has: obj => "reconcileOutbox" in obj, get: obj => obj.reconcileOutbox }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _runSynthetic_decorators, { kind: "method", name: "runSynthetic", static: false, private: false, access: { has: obj => "runSynthetic" in obj, get: obj => obj.runSynthetic }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            PlatformController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        platformService = __runInitializers(this, _instanceExtraInitializers);
        constructor(platformService) {
            this.platformService = platformService;
        }
        getHealth() {
            return this.platformService.getAggregatedHealth();
        }
        getSLOs() {
            return {
                success: true,
                data: this.platformService.getSLODefinitions(),
            };
        }
        advanceCanary(body) {
            return {
                success: true,
                data: this.platformService.advanceCanary(body.serviceId, body.versionTag),
            };
        }
        rollbackCanary(body) {
            return {
                success: true,
                data: this.platformService.rollbackCanary(body.serviceId, body.reason),
            };
        }
        reconcileOutbox() {
            return {
                success: true,
                data: this.platformService.reconcileOutbox(),
            };
        }
        runSynthetic() {
            return {
                success: true,
                data: this.platformService.runSyntheticMonitoring(),
            };
        }
    };
    return PlatformController = _classThis;
})();
exports.PlatformController = PlatformController;
//# sourceMappingURL=platform.controller.js.map