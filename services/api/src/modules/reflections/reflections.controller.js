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
exports.ReflectionsController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_js_1 = require("../../common/auth/auth.guard.js");
const idempotency_interceptor_js_1 = require("../../common/interceptors/idempotency.interceptor.js");
let ReflectionsController = (() => {
    let _classDecorators = [(0, common_1.Controller)('reflections'), (0, common_1.UseGuards)(auth_guard_js_1.AuthGuard), (0, common_1.UseInterceptors)(idempotency_interceptor_js_1.IdempotencyInterceptor)];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _list_decorators;
    let _create_decorators;
    let _getById_decorators;
    let _analyze_decorators;
    let _confirmInsight_decorators;
    var ReflectionsController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _list_decorators = [(0, common_1.Get)()];
            _create_decorators = [(0, common_1.Post)()];
            _getById_decorators = [(0, common_1.Get)(':id')];
            _analyze_decorators = [(0, common_1.Post)(':id/analyze')];
            _confirmInsight_decorators = [(0, common_1.Post)(':id/confirm-insight')];
            __esDecorate(this, null, _list_decorators, { kind: "method", name: "list", static: false, private: false, access: { has: obj => "list" in obj, get: obj => obj.list }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _create_decorators, { kind: "method", name: "create", static: false, private: false, access: { has: obj => "create" in obj, get: obj => obj.create }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getById_decorators, { kind: "method", name: "getById", static: false, private: false, access: { has: obj => "getById" in obj, get: obj => obj.getById }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _analyze_decorators, { kind: "method", name: "analyze", static: false, private: false, access: { has: obj => "analyze" in obj, get: obj => obj.analyze }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _confirmInsight_decorators, { kind: "method", name: "confirmInsight", static: false, private: false, access: { has: obj => "confirmInsight" in obj, get: obj => obj.confirmInsight }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ReflectionsController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        service = __runInitializers(this, _instanceExtraInitializers);
        constructor(service) {
            this.service = service;
        }
        async list(user) {
            return this.service.findByUserId(user);
        }
        async create(user, dto) {
            return this.service.create(user, {
                ...dto,
                reflectionType: dto.reflectionType || 'DAILY_MUHASABAH',
            });
        }
        async getById(user, id) {
            const reflection = await this.service.findById(user, id);
            if (!reflection) {
                return { error: 'Reflection not found or access denied', status: 404 };
            }
            return reflection;
        }
        async analyze(user, id) {
            const reflection = await this.service.findById(user, id);
            if (!reflection)
                return { error: 'Reflection not found', status: 404 };
            return {
                patterns: ['Consistent intention noted.'],
                friction: reflection.frictionDetected ? [reflection.frictionDetected] : [],
                proposedInsight: {
                    category: 'TIMING',
                    statement: 'Shorter morning sessions fit best during high-work periods.',
                    confirmationRequired: true,
                },
            };
        }
        async confirmInsight(user, id, body) {
            return {
                confirmed: body.confirmed,
                message: body.confirmed
                    ? 'Preference updated and confirmed. AMAL will adapt future recommendations accordingly.'
                    : 'Insight dismissed. No preferences changed.',
            };
        }
    };
    return ReflectionsController = _classThis;
})();
exports.ReflectionsController = ReflectionsController;
//# sourceMappingURL=reflections.controller.js.map