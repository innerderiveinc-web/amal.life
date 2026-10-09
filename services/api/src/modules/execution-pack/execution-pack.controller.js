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
exports.ExecutionPackController = void 0;
const common_1 = require("@nestjs/common");
let ExecutionPackController = (() => {
    let _classDecorators = [(0, common_1.Controller)('execution-pack')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _getModules_decorators;
    let _getModule_decorators;
    let _getCriticalUserJourneys_decorators;
    let _getCriticalUserJourney_decorators;
    let _getSprintPlans_decorators;
    let _getReadinessReport_decorators;
    var ExecutionPackController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _getModules_decorators = [(0, common_1.Get)('modules')];
            _getModule_decorators = [(0, common_1.Get)('modules/:code')];
            _getCriticalUserJourneys_decorators = [(0, common_1.Get)('cujs')];
            _getCriticalUserJourney_decorators = [(0, common_1.Get)('cujs/:id')];
            _getSprintPlans_decorators = [(0, common_1.Get)('sprints')];
            _getReadinessReport_decorators = [(0, common_1.Get)('readiness')];
            __esDecorate(this, null, _getModules_decorators, { kind: "method", name: "getModules", static: false, private: false, access: { has: obj => "getModules" in obj, get: obj => obj.getModules }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getModule_decorators, { kind: "method", name: "getModule", static: false, private: false, access: { has: obj => "getModule" in obj, get: obj => obj.getModule }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getCriticalUserJourneys_decorators, { kind: "method", name: "getCriticalUserJourneys", static: false, private: false, access: { has: obj => "getCriticalUserJourneys" in obj, get: obj => obj.getCriticalUserJourneys }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getCriticalUserJourney_decorators, { kind: "method", name: "getCriticalUserJourney", static: false, private: false, access: { has: obj => "getCriticalUserJourney" in obj, get: obj => obj.getCriticalUserJourney }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getSprintPlans_decorators, { kind: "method", name: "getSprintPlans", static: false, private: false, access: { has: obj => "getSprintPlans" in obj, get: obj => obj.getSprintPlans }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getReadinessReport_decorators, { kind: "method", name: "getReadinessReport", static: false, private: false, access: { has: obj => "getReadinessReport" in obj, get: obj => obj.getReadinessReport }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ExecutionPackController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        executionPackService = __runInitializers(this, _instanceExtraInitializers);
        constructor(executionPackService) {
            this.executionPackService = executionPackService;
        }
        getModules() {
            return {
                status: 'success',
                data: this.executionPackService.getModules(),
            };
        }
        getModule(code) {
            const mod = this.executionPackService.getModule(code);
            if (!mod)
                throw new Error(`Module ${code} not found in execution pack.`);
            return {
                status: 'success',
                data: mod,
            };
        }
        getCriticalUserJourneys() {
            return {
                status: 'success',
                data: this.executionPackService.getCriticalUserJourneys(),
            };
        }
        getCriticalUserJourney(id) {
            const cuj = this.executionPackService.getCriticalUserJourney(id);
            if (!cuj)
                throw new Error(`CUJ ${id} not found in execution pack.`);
            return {
                status: 'success',
                data: cuj,
            };
        }
        getSprintPlans() {
            return {
                status: 'success',
                data: this.executionPackService.getSprintPlans(),
            };
        }
        getReadinessReport() {
            return {
                status: 'success',
                data: this.executionPackService.getReadinessReport(),
            };
        }
    };
    return ExecutionPackController = _classThis;
})();
exports.ExecutionPackController = ExecutionPackController;
//# sourceMappingURL=execution-pack.controller.js.map