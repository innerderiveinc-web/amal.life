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
exports.AmalController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_js_1 = require("../../common/auth/auth.guard.js");
const idempotency_interceptor_js_1 = require("../../common/interceptors/idempotency.interceptor.js");
let AmalController = (() => {
    let _classDecorators = [(0, common_1.Controller)('amal'), (0, common_1.UseGuards)(auth_guard_js_1.AuthGuard), (0, common_1.UseInterceptors)(idempotency_interceptor_js_1.IdempotencyInterceptor)];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _getToday_decorators;
    let _recommend_decorators;
    let _start_decorators;
    let _complete_decorators;
    let _partial_decorators;
    let _skip_decorators;
    let _snooze_decorators;
    let _feedback_decorators;
    var AmalController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _getToday_decorators = [(0, common_1.Get)('today')];
            _recommend_decorators = [(0, common_1.Post)('recommend')];
            _start_decorators = [(0, common_1.Post)(':id/start')];
            _complete_decorators = [(0, common_1.Post)(':id/complete')];
            _partial_decorators = [(0, common_1.Post)(':id/partial')];
            _skip_decorators = [(0, common_1.Post)(':id/skip')];
            _snooze_decorators = [(0, common_1.Post)(':id/snooze')];
            _feedback_decorators = [(0, common_1.Post)(':id/feedback')];
            __esDecorate(this, null, _getToday_decorators, { kind: "method", name: "getToday", static: false, private: false, access: { has: obj => "getToday" in obj, get: obj => obj.getToday }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _recommend_decorators, { kind: "method", name: "recommend", static: false, private: false, access: { has: obj => "recommend" in obj, get: obj => obj.recommend }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _start_decorators, { kind: "method", name: "start", static: false, private: false, access: { has: obj => "start" in obj, get: obj => obj.start }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _complete_decorators, { kind: "method", name: "complete", static: false, private: false, access: { has: obj => "complete" in obj, get: obj => obj.complete }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _partial_decorators, { kind: "method", name: "partial", static: false, private: false, access: { has: obj => "partial" in obj, get: obj => obj.partial }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _skip_decorators, { kind: "method", name: "skip", static: false, private: false, access: { has: obj => "skip" in obj, get: obj => obj.skip }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _snooze_decorators, { kind: "method", name: "snooze", static: false, private: false, access: { has: obj => "snooze" in obj, get: obj => obj.snooze }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _feedback_decorators, { kind: "method", name: "feedback", static: false, private: false, access: { has: obj => "feedback" in obj, get: obj => obj.feedback }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            AmalController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        service = __runInitializers(this, _instanceExtraInitializers);
        constructor(service) {
            this.service = service;
        }
        async getToday(user) {
            return this.service.findToday(user.userId);
        }
        async recommend(user, body) {
            const list = await this.service.findToday(user.userId);
            return {
                date: new Date().toISOString().split('T')[0],
                primary: list[0] || null,
                optional: list.slice(1, 3),
                reasonCodes: ['GOAL_FIT', 'TIME_FIT', 'JOURNEY_CONTINUITY'],
            };
        }
        async start(user, id) {
            return { status: 'STARTED', amalId: id, startedAt: new Date().toISOString() };
        }
        async complete(user, id, dto, idempotencyKey) {
            return this.service.complete(user, id, {
                completionType: dto.completionType || 'FULL',
                durationMinutes: dto.durationMinutes,
                notes: dto.notes,
            }, idempotencyKey);
        }
        async partial(user, id, dto, idempotencyKey) {
            return this.service.complete(user, id, {
                completionType: 'PARTIAL',
                durationMinutes: dto.durationMinutes || 5,
                notes: dto.notes || 'Completed minimum meaningful practice.',
            }, idempotencyKey);
        }
        async skip(user, id, dto, idempotencyKey) {
            return this.service.complete(user, id, {
                completionType: 'SKIPPED',
                durationMinutes: 0,
                notes: dto.reason || 'Skipped for today without moral guilt.',
            }, idempotencyKey);
        }
        async snooze(user, id, dto) {
            return {
                status: 'SNOOZED',
                amalId: id,
                snoozedUntil: new Date(Date.now() + (dto.snoozeMinutes || 30) * 60000).toISOString(),
            };
        }
        async feedback(user, id, dto) {
            return {
                recorded: true,
                amalId: id,
                rating: dto.rating,
                frictionType: dto.frictionType,
            };
        }
    };
    return AmalController = _classThis;
})();
exports.AmalController = AmalController;
//# sourceMappingURL=amal.controller.js.map