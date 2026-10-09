"use strict";
/**
 * AMAL OS — USERS CONTROLLER
 * Manages seeker profile, preferences, and locale settings.
 */
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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_js_1 = require("../../common/auth/auth.guard.js");
const database_1 = require("@amal/database");
let UsersController = (() => {
    let _classDecorators = [(0, common_1.Controller)('users'), (0, common_1.UseGuards)(auth_guard_js_1.AuthGuard)];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _getProfile_decorators;
    let _updateProfile_decorators;
    let _getPreferences_decorators;
    let _updatePreferences_decorators;
    var UsersController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _getProfile_decorators = [(0, common_1.Get)('me')];
            _updateProfile_decorators = [(0, common_1.Patch)('me')];
            _getPreferences_decorators = [(0, common_1.Get)('me/preferences')];
            _updatePreferences_decorators = [(0, common_1.Patch)('me/preferences')];
            __esDecorate(this, null, _getProfile_decorators, { kind: "method", name: "getProfile", static: false, private: false, access: { has: obj => "getProfile" in obj, get: obj => obj.getProfile }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _updateProfile_decorators, { kind: "method", name: "updateProfile", static: false, private: false, access: { has: obj => "updateProfile" in obj, get: obj => obj.updateProfile }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getPreferences_decorators, { kind: "method", name: "getPreferences", static: false, private: false, access: { has: obj => "getPreferences" in obj, get: obj => obj.getPreferences }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _updatePreferences_decorators, { kind: "method", name: "updatePreferences", static: false, private: false, access: { has: obj => "updatePreferences" in obj, get: obj => obj.updatePreferences }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            UsersController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        async getProfile(user) {
            const profile = database_1.db.profiles.get(user.userId);
            return {
                userId: user.userId,
                email: user.roles?.includes('ADMIN') ? 'admin@amal.local' : 'seeker@amal.local',
                profile: profile || {
                    displayName: 'Seeker',
                    language: 'en',
                    timezone: 'Asia/Kolkata',
                },
            };
        }
        async updateProfile(user, body) {
            const existing = database_1.db.profiles.get(user.userId) || {
                userId: user.userId,
                displayName: 'Seeker',
                language: 'en',
                country: 'IN',
                timezone: 'Asia/Kolkata',
                lifeStage: 'YOUNG_PROFESSIONAL',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
            const updated = { ...existing, ...body, updatedAt: new Date().toISOString() };
            database_1.db.profiles.set(user.userId, updated);
            return updated;
        }
        async getPreferences(user) {
            const prefs = database_1.db.preferences.get(user.userId);
            return prefs || {
                userId: user.userId,
                prayerCalculationMethod: 'MWL',
                asrJuristicMethod: 'STANDARD',
                madhhab: 'Hanafi',
                dailyTimeBudgetMinutes: 15,
                notificationIntensity: 'CALM',
            };
        }
        async updatePreferences(user, body) {
            const existing = database_1.db.preferences.get(user.userId) || {
                userId: user.userId,
                prayerCalculationMethod: 'MWL',
                asrJuristicMethod: 'STANDARD',
                madhhab: 'Hanafi',
                dailyTimeBudgetMinutes: 15,
                notificationIntensity: 'CALM',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
            const updated = { ...existing, ...body, updatedAt: new Date().toISOString() };
            database_1.db.preferences.set(user.userId, updated);
            return updated;
        }
        constructor() {
            __runInitializers(this, _instanceExtraInitializers);
        }
    };
    return UsersController = _classThis;
})();
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map