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
exports.JourneysController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_js_1 = require("../../common/auth/auth.guard.js");
const idempotency_interceptor_js_1 = require("../../common/interceptors/idempotency.interceptor.js");
const types_1 = require("@amal/types");
let JourneysController = (() => {
    let _classDecorators = [(0, common_1.Controller)('journeys'), (0, common_1.UseGuards)(auth_guard_js_1.AuthGuard), (0, common_1.UseInterceptors)(idempotency_interceptor_js_1.IdempotencyInterceptor)];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _list_decorators;
    let _create_decorators;
    let _getById_decorators;
    let _start_decorators;
    let _pause_decorators;
    let _resume_decorators;
    let _complete_decorators;
    let _listAdaptations_decorators;
    let _previewAdaptation_decorators;
    let _approveAdaptation_decorators;
    let _rejectAdaptation_decorators;
    var JourneysController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _list_decorators = [(0, common_1.Get)()];
            _create_decorators = [(0, common_1.Post)()];
            _getById_decorators = [(0, common_1.Get)(':id')];
            _start_decorators = [(0, common_1.Post)(':id/start')];
            _pause_decorators = [(0, common_1.Post)(':id/pause')];
            _resume_decorators = [(0, common_1.Post)(':id/resume')];
            _complete_decorators = [(0, common_1.Post)(':id/complete')];
            _listAdaptations_decorators = [(0, common_1.Get)(':id/adaptations')];
            _previewAdaptation_decorators = [(0, common_1.Post)(':id/adaptation-preview')];
            _approveAdaptation_decorators = [(0, common_1.Post)(':id/adaptation-approve')];
            _rejectAdaptation_decorators = [(0, common_1.Post)(':id/adaptation-reject')];
            __esDecorate(this, null, _list_decorators, { kind: "method", name: "list", static: false, private: false, access: { has: obj => "list" in obj, get: obj => obj.list }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _create_decorators, { kind: "method", name: "create", static: false, private: false, access: { has: obj => "create" in obj, get: obj => obj.create }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getById_decorators, { kind: "method", name: "getById", static: false, private: false, access: { has: obj => "getById" in obj, get: obj => obj.getById }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _start_decorators, { kind: "method", name: "start", static: false, private: false, access: { has: obj => "start" in obj, get: obj => obj.start }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _pause_decorators, { kind: "method", name: "pause", static: false, private: false, access: { has: obj => "pause" in obj, get: obj => obj.pause }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _resume_decorators, { kind: "method", name: "resume", static: false, private: false, access: { has: obj => "resume" in obj, get: obj => obj.resume }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _complete_decorators, { kind: "method", name: "complete", static: false, private: false, access: { has: obj => "complete" in obj, get: obj => obj.complete }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _listAdaptations_decorators, { kind: "method", name: "listAdaptations", static: false, private: false, access: { has: obj => "listAdaptations" in obj, get: obj => obj.listAdaptations }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _previewAdaptation_decorators, { kind: "method", name: "previewAdaptation", static: false, private: false, access: { has: obj => "previewAdaptation" in obj, get: obj => obj.previewAdaptation }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _approveAdaptation_decorators, { kind: "method", name: "approveAdaptation", static: false, private: false, access: { has: obj => "approveAdaptation" in obj, get: obj => obj.approveAdaptation }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _rejectAdaptation_decorators, { kind: "method", name: "rejectAdaptation", static: false, private: false, access: { has: obj => "rejectAdaptation" in obj, get: obj => obj.rejectAdaptation }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            JourneysController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        service = __runInitializers(this, _instanceExtraInitializers);
        constructor(service) {
            this.service = service;
        }
        async list(user) {
            return this.service.findActive(user.userId);
        }
        async create(user, dto) {
            return this.service.create(user, dto);
        }
        async getById(user, id) {
            const journey = await this.service.findById(user.userId, id);
            if (!journey) {
                return { error: 'Journey not found or access denied', status: 404 };
            }
            return journey;
        }
        async start(user, id) {
            return this.service.start(user, id);
        }
        async pause(user, id) {
            return this.service.transition(user, id, types_1.JourneyState.PAUSED);
        }
        async resume(user, id) {
            return this.service.transition(user, id, types_1.JourneyState.ACTIVE);
        }
        async complete(user, id) {
            return this.service.transition(user, id, types_1.JourneyState.COMPLETED);
        }
        async listAdaptations(user, id) {
            return [
                {
                    id: `adp_${id}`,
                    journeyId: id,
                    trigger: 'REPEATED_TIME_FRICTION',
                    proposedPlan: { durationMinutes: 5, timeSlot: 'after_fajr' },
                    reasonCodes: ['TIME_FRICTION', 'LOW_FEASIBILITY'],
                    status: 'PREVIEW',
                },
            ];
        }
        async previewAdaptation(user, id) {
            return {
                currentPlan: '20 minutes evening recitation',
                suggestedPlan: '5 minutes morning recitation after Fajr',
                why: 'Recent morning sessions had 100% completion while evening sessions had repeated time friction.',
                buttons: ['APPLY', 'KEEP_CURRENT', 'EDIT'],
            };
        }
        async approveAdaptation(user, id) {
            return {
                applied: true,
                journeyId: id,
                newDurationMinutes: 5,
                message: 'Plan simplified to 5 minutes after Fajr. Remember: "The most beloved deed to Allah is the most regular."',
            };
        }
        async rejectAdaptation(user, id) {
            return {
                applied: false,
                journeyId: id,
                message: 'Kept current plan. No changes made.',
            };
        }
    };
    return JourneysController = _classThis;
})();
exports.JourneysController = JourneysController;
//# sourceMappingURL=journeys.controller.js.map