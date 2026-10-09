"use strict";
/**
 * AMAL OS — LAYER 19: AUTH CONTROLLER (Section 24)
 * REST endpoints for authentication, token refresh, session revocation, and current user retrieval.
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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_1 = require("@amal/auth");
const types_1 = require("@amal/types");
let AuthController = (() => {
    let _classDecorators = [(0, common_1.Controller)('api/v1/auth')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _login_decorators;
    let _refresh_decorators;
    let _logout_decorators;
    let _getMe_decorators;
    var AuthController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _login_decorators = [(0, common_1.Post)('login')];
            _refresh_decorators = [(0, common_1.Post)('refresh')];
            _logout_decorators = [(0, common_1.Post)('logout')];
            _getMe_decorators = [(0, common_1.Get)('me')];
            __esDecorate(this, null, _login_decorators, { kind: "method", name: "login", static: false, private: false, access: { has: obj => "login" in obj, get: obj => obj.login }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _refresh_decorators, { kind: "method", name: "refresh", static: false, private: false, access: { has: obj => "refresh" in obj, get: obj => obj.refresh }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _logout_decorators, { kind: "method", name: "logout", static: false, private: false, access: { has: obj => "logout" in obj, get: obj => obj.logout }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getMe_decorators, { kind: "method", name: "getMe", static: false, private: false, access: { has: obj => "getMe" in obj, get: obj => obj.getMe }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            AuthController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        async login(body) {
            if (!body?.email) {
                throw new types_1.AppError('VALIDATION_ERROR', 'Email is required.');
            }
            const result = await auth_1.authService.authenticate(body.email, body.password);
            return {
                success: true,
                data: {
                    user: result.user,
                    session: result.session,
                },
            };
        }
        async refresh(body) {
            if (!body?.refreshToken) {
                throw new types_1.AppError('VALIDATION_ERROR', 'refreshToken is required.');
            }
            const session = auth_1.authService.refreshSession(body.refreshToken);
            return {
                success: true,
                data: { session },
            };
        }
        async logout(body) {
            if (!body?.sessionId) {
                throw new types_1.AppError('VALIDATION_ERROR', 'sessionId is required.');
            }
            auth_1.authService.revokeSession(body.sessionId);
            return {
                success: true,
                data: { loggedOut: true },
            };
        }
        async getMe(authHeader) {
            if (!authHeader) {
                throw new types_1.AppError('UNAUTHORIZED', 'Authorization header is required.');
            }
            const token = authHeader.replace(/^Bearer\s+/i, '');
            const user = auth_1.authService.getCurrentUser(token);
            if (!user) {
                throw new types_1.AppError('UNAUTHORIZED', 'Invalid or expired session token.');
            }
            return {
                success: true,
                data: { user },
            };
        }
        constructor() {
            __runInitializers(this, _instanceExtraInitializers);
        }
    };
    return AuthController = _classThis;
})();
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map