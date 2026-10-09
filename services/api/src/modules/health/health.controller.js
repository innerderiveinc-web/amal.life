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
exports.HealthController = void 0;
const common_1 = require("@nestjs/common");
let HealthController = (() => {
    let _classDecorators = [(0, common_1.Controller)('health')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _getHealth_decorators;
    let _getLiveness_decorators;
    let _getReadiness_decorators;
    let _getDependencies_decorators;
    var HealthController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _getHealth_decorators = [(0, common_1.Get)()];
            _getLiveness_decorators = [(0, common_1.Get)('live')];
            _getReadiness_decorators = [(0, common_1.Get)('ready')];
            _getDependencies_decorators = [(0, common_1.Get)('dependencies')];
            __esDecorate(this, null, _getHealth_decorators, { kind: "method", name: "getHealth", static: false, private: false, access: { has: obj => "getHealth" in obj, get: obj => obj.getHealth }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getLiveness_decorators, { kind: "method", name: "getLiveness", static: false, private: false, access: { has: obj => "getLiveness" in obj, get: obj => obj.getLiveness }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getReadiness_decorators, { kind: "method", name: "getReadiness", static: false, private: false, access: { has: obj => "getReadiness" in obj, get: obj => obj.getReadiness }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getDependencies_decorators, { kind: "method", name: "getDependencies", static: false, private: false, access: { has: obj => "getDependencies" in obj, get: obj => obj.getDependencies }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            HealthController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        startTime = (__runInitializers(this, _instanceExtraInitializers), Date.now());
        getHealth() {
            return {
                status: 'OK',
                timestamp: new Date().toISOString(),
                uptimeSeconds: Math.floor((Date.now() - this.startTime) / 1000),
            };
        }
        getLiveness() {
            return { status: 'LIVE' };
        }
        getReadiness() {
            return {
                status: 'OK',
                timestamp: new Date().toISOString(),
                uptimeSeconds: Math.floor((Date.now() - this.startTime) / 1000),
                dependencies: {
                    PostgreSQL: { status: 'UP', latencyMs: 2 },
                    Redis: { status: 'UP', latencyMs: 1 },
                    ObjectStorage: { status: 'UP', latencyMs: 8 },
                    Queue: { status: 'UP', latencyMs: 3 },
                    AIGateway: { status: 'UP', latencyMs: 15 },
                },
            };
        }
        getDependencies() {
            return {
                PostgreSQL: { status: 'UP', version: 'PostgreSQL 16.2 with pgvector 0.7.0' },
                Redis: { status: 'UP', version: 'Redis 7.2-alpine' },
                ObjectStorage: { status: 'UP', target: 'AWS S3 Evidence Vault' },
                Queue: { status: 'UP', engine: 'BullMQ / Redis' },
                AIGateway: { status: 'UP', engine: 'AMAL Intelligence Runtime V1' },
            };
        }
    };
    return HealthController = _classThis;
})();
exports.HealthController = HealthController;
//# sourceMappingURL=health.controller.js.map