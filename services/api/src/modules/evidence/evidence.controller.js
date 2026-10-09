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
exports.EvidenceController = void 0;
const common_1 = require("@nestjs/common");
let EvidenceController = (() => {
    let _classDecorators = [(0, common_1.Controller)('evidence')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _search_decorators;
    let _getById_decorators;
    let _getChain_decorators;
    let _getNode_decorators;
    let _getNeighbors_decorators;
    var EvidenceController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _search_decorators = [(0, common_1.Post)('search')];
            _getById_decorators = [(0, common_1.Get)(':id')];
            _getChain_decorators = [(0, common_1.Get)(':id/chain')];
            _getNode_decorators = [(0, common_1.Get)('nodes/:id')];
            _getNeighbors_decorators = [(0, common_1.Get)('nodes/:id/neighbors')];
            __esDecorate(this, null, _search_decorators, { kind: "method", name: "search", static: false, private: false, access: { has: obj => "search" in obj, get: obj => obj.search }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getById_decorators, { kind: "method", name: "getById", static: false, private: false, access: { has: obj => "getById" in obj, get: obj => obj.getById }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getChain_decorators, { kind: "method", name: "getChain", static: false, private: false, access: { has: obj => "getChain" in obj, get: obj => obj.getChain }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getNode_decorators, { kind: "method", name: "getNode", static: false, private: false, access: { has: obj => "getNode" in obj, get: obj => obj.getNode }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getNeighbors_decorators, { kind: "method", name: "getNeighbors", static: false, private: false, access: { has: obj => "getNeighbors" in obj, get: obj => obj.getNeighbors }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            EvidenceController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        service = __runInitializers(this, _instanceExtraInitializers);
        constructor(service) {
            this.service = service;
        }
        async search(dto) {
            return this.service.search(dto.query, dto.maxResults || 5);
        }
        async getById(id) {
            const item = await this.service.getById(id);
            if (!item)
                return { error: 'Evidence not found', status: 404 };
            return item;
        }
        async getChain(id) {
            const chain = await this.service.getChain(id);
            if (!chain)
                return { error: 'Provenance chain not found', status: 404 };
            return chain;
        }
        async getNode(id) {
            const node = await this.service.getNode(id);
            if (!node)
                return { error: 'Node not found', status: 404 };
            return node;
        }
        async getNeighbors(id) {
            return this.service.getNeighbors(id);
        }
    };
    return EvidenceController = _classThis;
})();
exports.EvidenceController = EvidenceController;
//# sourceMappingURL=evidence.controller.js.map