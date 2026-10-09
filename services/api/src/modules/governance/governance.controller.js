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
exports.GovernanceController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_js_1 = require("../../guards/auth.guard.js");
let GovernanceController = (() => {
    let _classDecorators = [(0, common_1.Controller)('governance')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _getDashboard_decorators;
    let _getUserTrust_decorators;
    let _evaluatePolicy_decorators;
    let _createPrivacyRequest_decorators;
    let _getCircuitBreakers_decorators;
    let _tripCircuitBreaker_decorators;
    let _proposeChange_decorators;
    let _approveChange_decorators;
    let _breakGlass_decorators;
    var GovernanceController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _getDashboard_decorators = [(0, common_1.Get)('trust-dashboard'), (0, common_1.UseGuards)(auth_guard_js_1.AuthGuard)];
            _getUserTrust_decorators = [(0, common_1.Get)('user-trust-center'), (0, common_1.UseGuards)(auth_guard_js_1.AuthGuard)];
            _evaluatePolicy_decorators = [(0, common_1.Post)('policy/evaluate'), (0, common_1.UseGuards)(auth_guard_js_1.AuthGuard)];
            _createPrivacyRequest_decorators = [(0, common_1.Post)('privacy-requests'), (0, common_1.UseGuards)(auth_guard_js_1.AuthGuard)];
            _getCircuitBreakers_decorators = [(0, common_1.Get)('circuit-breakers'), (0, common_1.UseGuards)(auth_guard_js_1.AuthGuard)];
            _tripCircuitBreaker_decorators = [(0, common_1.Post)('circuit-breakers/trip'), (0, common_1.UseGuards)(auth_guard_js_1.AuthGuard)];
            _proposeChange_decorators = [(0, common_1.Post)('four-eyes/propose'), (0, common_1.UseGuards)(auth_guard_js_1.AuthGuard)];
            _approveChange_decorators = [(0, common_1.Post)('four-eyes/approve'), (0, common_1.UseGuards)(auth_guard_js_1.AuthGuard)];
            _breakGlass_decorators = [(0, common_1.Post)('break-glass'), (0, common_1.UseGuards)(auth_guard_js_1.AuthGuard)];
            __esDecorate(this, null, _getDashboard_decorators, { kind: "method", name: "getDashboard", static: false, private: false, access: { has: obj => "getDashboard" in obj, get: obj => obj.getDashboard }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getUserTrust_decorators, { kind: "method", name: "getUserTrust", static: false, private: false, access: { has: obj => "getUserTrust" in obj, get: obj => obj.getUserTrust }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _evaluatePolicy_decorators, { kind: "method", name: "evaluatePolicy", static: false, private: false, access: { has: obj => "evaluatePolicy" in obj, get: obj => obj.evaluatePolicy }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _createPrivacyRequest_decorators, { kind: "method", name: "createPrivacyRequest", static: false, private: false, access: { has: obj => "createPrivacyRequest" in obj, get: obj => obj.createPrivacyRequest }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getCircuitBreakers_decorators, { kind: "method", name: "getCircuitBreakers", static: false, private: false, access: { has: obj => "getCircuitBreakers" in obj, get: obj => obj.getCircuitBreakers }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _tripCircuitBreaker_decorators, { kind: "method", name: "tripCircuitBreaker", static: false, private: false, access: { has: obj => "tripCircuitBreaker" in obj, get: obj => obj.tripCircuitBreaker }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _proposeChange_decorators, { kind: "method", name: "proposeChange", static: false, private: false, access: { has: obj => "proposeChange" in obj, get: obj => obj.proposeChange }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _approveChange_decorators, { kind: "method", name: "approveChange", static: false, private: false, access: { has: obj => "approveChange" in obj, get: obj => obj.approveChange }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _breakGlass_decorators, { kind: "method", name: "breakGlass", static: false, private: false, access: { has: obj => "breakGlass" in obj, get: obj => obj.breakGlass }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            GovernanceController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        govService = __runInitializers(this, _instanceExtraInitializers);
        constructor(govService) {
            this.govService = govService;
        }
        async getDashboard() {
            return {
                success: true,
                data: this.govService.getTrustDashboard(),
            };
        }
        async getUserTrust(req) {
            const userId = req.user?.id || 'usr-sample-01';
            return {
                success: true,
                data: this.govService.getUserTrustCenter(userId),
            };
        }
        async evaluatePolicy(body) {
            return {
                success: true,
                data: this.govService.evaluatePolicy(body),
            };
        }
        async createPrivacyRequest(req, body) {
            const userId = req.user?.id || 'usr-sample-01';
            return {
                success: true,
                data: this.govService.createPrivacyRequest(userId, body.type),
            };
        }
        async getCircuitBreakers() {
            return {
                success: true,
                data: this.govService.getCircuitBreakers(),
            };
        }
        async tripCircuitBreaker(body) {
            this.govService.setCircuitBreaker(body.id, body.state, body.reason);
            return {
                success: true,
                message: `Breaker ${body.id} set to ${body.state}`,
            };
        }
        async proposeChange(req, body) {
            const operatorId = req.user?.id || 'admin-op-01';
            return {
                success: true,
                data: this.govService.proposeConfigChange(body.category, operatorId, body.before, body.after),
            };
        }
        async approveChange(req, body) {
            const secondOperatorId = req.user?.id || 'admin-op-02';
            return {
                success: true,
                data: this.govService.approveConfigChange(body.changeId, secondOperatorId),
            };
        }
        async breakGlass(req, body) {
            const adminId = req.user?.id || 'admin-op-01';
            return {
                success: true,
                data: this.govService.grantBreakGlass(adminId, body.approverId, body.justification, body.scope),
            };
        }
    };
    return GovernanceController = _classThis;
})();
exports.GovernanceController = GovernanceController;
//# sourceMappingURL=governance.controller.js.map