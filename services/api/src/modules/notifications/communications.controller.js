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
exports.CommunicationsController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_js_1 = require("../../guards/auth.guard.js");
let CommunicationsController = (() => {
    let _classDecorators = [(0, common_1.Controller)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _getPreferences_decorators;
    let _updatePreferences_decorators;
    let _getConsents_decorators;
    let _setConsent_decorators;
    let _getTodayPrayers_decorators;
    let _updatePrayerSettings_decorators;
    let _recordInteraction_decorators;
    let _internalSend_decorators;
    let _handleWebhook_decorators;
    var CommunicationsController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _getPreferences_decorators = [(0, common_1.Get)('communications/preferences'), (0, common_1.UseGuards)(auth_guard_js_1.AuthGuard)];
            _updatePreferences_decorators = [(0, common_1.Patch)('communications/preferences'), (0, common_1.UseGuards)(auth_guard_js_1.AuthGuard)];
            _getConsents_decorators = [(0, common_1.Get)('communications/consent'), (0, common_1.UseGuards)(auth_guard_js_1.AuthGuard)];
            _setConsent_decorators = [(0, common_1.Post)('communications/consent'), (0, common_1.UseGuards)(auth_guard_js_1.AuthGuard)];
            _getTodayPrayers_decorators = [(0, common_1.Get)('prayers/today'), (0, common_1.UseGuards)(auth_guard_js_1.AuthGuard)];
            _updatePrayerSettings_decorators = [(0, common_1.Patch)('prayers/settings'), (0, common_1.UseGuards)(auth_guard_js_1.AuthGuard)];
            _recordInteraction_decorators = [(0, common_1.Post)('notifications/:id/interact'), (0, common_1.UseGuards)(auth_guard_js_1.AuthGuard)];
            _internalSend_decorators = [(0, common_1.Post)('internal/communications/send')];
            _handleWebhook_decorators = [(0, common_1.Post)('internal/communications/webhook')];
            __esDecorate(this, null, _getPreferences_decorators, { kind: "method", name: "getPreferences", static: false, private: false, access: { has: obj => "getPreferences" in obj, get: obj => obj.getPreferences }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _updatePreferences_decorators, { kind: "method", name: "updatePreferences", static: false, private: false, access: { has: obj => "updatePreferences" in obj, get: obj => obj.updatePreferences }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getConsents_decorators, { kind: "method", name: "getConsents", static: false, private: false, access: { has: obj => "getConsents" in obj, get: obj => obj.getConsents }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _setConsent_decorators, { kind: "method", name: "setConsent", static: false, private: false, access: { has: obj => "setConsent" in obj, get: obj => obj.setConsent }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getTodayPrayers_decorators, { kind: "method", name: "getTodayPrayers", static: false, private: false, access: { has: obj => "getTodayPrayers" in obj, get: obj => obj.getTodayPrayers }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _updatePrayerSettings_decorators, { kind: "method", name: "updatePrayerSettings", static: false, private: false, access: { has: obj => "updatePrayerSettings" in obj, get: obj => obj.updatePrayerSettings }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _recordInteraction_decorators, { kind: "method", name: "recordInteraction", static: false, private: false, access: { has: obj => "recordInteraction" in obj, get: obj => obj.recordInteraction }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _internalSend_decorators, { kind: "method", name: "internalSend", static: false, private: false, access: { has: obj => "internalSend" in obj, get: obj => obj.internalSend }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _handleWebhook_decorators, { kind: "method", name: "handleWebhook", static: false, private: false, access: { has: obj => "handleWebhook" in obj, get: obj => obj.handleWebhook }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            CommunicationsController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        commsService = __runInitializers(this, _instanceExtraInitializers);
        constructor(commsService) {
            this.commsService = commsService;
        }
        async getPreferences(req) {
            const userId = req.user?.id || 'usr-sample-01';
            return {
                success: true,
                data: this.commsService.getPreferences(userId),
            };
        }
        async updatePreferences(req, body) {
            const userId = req.user?.id || 'usr-sample-01';
            return {
                success: true,
                data: this.commsService.updatePreferences(userId, body),
            };
        }
        async getConsents(req) {
            const userId = req.user?.id || 'usr-sample-01';
            return {
                success: true,
                data: this.commsService.getConsents(userId),
            };
        }
        async setConsent(req, body) {
            const userId = req.user?.id || 'usr-sample-01';
            return {
                success: true,
                data: this.commsService.setConsent(userId, body),
            };
        }
        async getTodayPrayers(req) {
            const userId = req.user?.id || 'usr-sample-01';
            return {
                success: true,
                data: this.commsService.getTodayPrayerSchedule(userId),
            };
        }
        async updatePrayerSettings(req, body) {
            const userId = req.user?.id || 'usr-sample-01';
            return {
                success: true,
                data: this.commsService.updatePrayerProfile(userId, body),
            };
        }
        async recordInteraction(req, _id, body) {
            const userId = req.user?.id || 'usr-sample-01';
            return {
                success: true,
                data: this.commsService.recordInteraction(userId, body.action),
            };
        }
        async internalSend(body) {
            const result = await this.commsService.orchestrateAndSend(body);
            return {
                success: true,
                data: result,
            };
        }
        async handleWebhook(body) {
            const result = await this.commsService.handleWebhook(body);
            return {
                success: true,
                data: result,
            };
        }
    };
    return CommunicationsController = _classThis;
})();
exports.CommunicationsController = CommunicationsController;
//# sourceMappingURL=communications.controller.js.map