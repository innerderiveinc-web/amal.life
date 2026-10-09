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
exports.BlueprintController = void 0;
const common_1 = require("@nestjs/common");
let BlueprintController = (() => {
    let _classDecorators = [(0, common_1.Controller)('blueprint')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _getTopology_decorators;
    let _getCertifications_decorators;
    let _getInvariants_decorators;
    let _getRoutes_decorators;
    let _getAgents_decorators;
    let _getMigrations_decorators;
    let _exportBlueprint_decorators;
    var BlueprintController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _getTopology_decorators = [(0, common_1.Get)('topology')];
            _getCertifications_decorators = [(0, common_1.Get)('certifications')];
            _getInvariants_decorators = [(0, common_1.Get)('invariants')];
            _getRoutes_decorators = [(0, common_1.Get)('routes')];
            _getAgents_decorators = [(0, common_1.Get)('agents')];
            _getMigrations_decorators = [(0, common_1.Get)('migrations')];
            _exportBlueprint_decorators = [(0, common_1.Get)('export')];
            __esDecorate(this, null, _getTopology_decorators, { kind: "method", name: "getTopology", static: false, private: false, access: { has: obj => "getTopology" in obj, get: obj => obj.getTopology }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getCertifications_decorators, { kind: "method", name: "getCertifications", static: false, private: false, access: { has: obj => "getCertifications" in obj, get: obj => obj.getCertifications }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getInvariants_decorators, { kind: "method", name: "getInvariants", static: false, private: false, access: { has: obj => "getInvariants" in obj, get: obj => obj.getInvariants }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getRoutes_decorators, { kind: "method", name: "getRoutes", static: false, private: false, access: { has: obj => "getRoutes" in obj, get: obj => obj.getRoutes }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getAgents_decorators, { kind: "method", name: "getAgents", static: false, private: false, access: { has: obj => "getAgents" in obj, get: obj => obj.getAgents }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getMigrations_decorators, { kind: "method", name: "getMigrations", static: false, private: false, access: { has: obj => "getMigrations" in obj, get: obj => obj.getMigrations }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _exportBlueprint_decorators, { kind: "method", name: "exportBlueprint", static: false, private: false, access: { has: obj => "exportBlueprint" in obj, get: obj => obj.exportBlueprint }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            BlueprintController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        blueprintService = __runInitializers(this, _instanceExtraInitializers);
        constructor(blueprintService) {
            this.blueprintService = blueprintService;
        }
        getTopology() {
            return {
                status: 'success',
                data: this.blueprintService.getSystemTopology(),
            };
        }
        getCertifications() {
            return {
                status: 'success',
                data: this.blueprintService.getSystemCertifications(),
            };
        }
        getInvariants() {
            return {
                status: 'success',
                data: this.blueprintService.getSystemInvariants(),
            };
        }
        getRoutes() {
            return {
                status: 'success',
                data: this.blueprintService.getMasterRoutes(),
            };
        }
        getAgents() {
            return {
                status: 'success',
                data: this.blueprintService.getMasterAgents(),
            };
        }
        getMigrations() {
            return {
                status: 'success',
                data: this.blueprintService.getMigrationsCatalog(),
            };
        }
        exportBlueprint() {
            return {
                status: 'success',
                data: this.blueprintService.exportMasterBlueprint(),
            };
        }
    };
    return BlueprintController = _classThis;
})();
exports.BlueprintController = BlueprintController;
//# sourceMappingURL=blueprint.controller.js.map