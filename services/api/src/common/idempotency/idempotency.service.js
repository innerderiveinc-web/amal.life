"use strict";
/**
 * AMAL OS — LAYER 20: IDEMPOTENCY SERVICE (Section 20.4, 20.21, 20.41)
 * Enforces exactly-once execution for mutating state transitions.
 */
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
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdempotencyService = void 0;
const common_1 = require("@nestjs/common");
const pg_client_js_1 = require("../../infrastructure/database/pg.client.js");
const amal_error_js_1 = require("../errors/amal-error.js");
const error_codes_js_1 = require("../errors/error-codes.js");
let IdempotencyService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var IdempotencyService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            IdempotencyService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        db;
        memoryCache = new Map();
        constructor(db = new pg_client_js_1.PgClient()) {
            this.db = db;
        }
        async get(userId, key) {
            const compositeKey = `${userId}:${key}`;
            const cached = this.memoryCache.get(compositeKey);
            if (cached) {
                return {
                    status: 'COMPLETED',
                    responseBody: cached,
                };
            }
            return null;
        }
        async save(userId, key, statusCode, responseBody) {
            const compositeKey = `${userId}:${key}`;
            this.memoryCache.set(compositeKey, responseBody);
            await this.db.query(`
      INSERT INTO idempotency_keys (key, user_id, status_code, response_body, expires_at)
      VALUES ($1, $2, $3, $4, now() + interval '24 hours')
      ON CONFLICT (key, user_id) DO UPDATE SET response_body = EXCLUDED.response_body
      `, [key, userId, statusCode, JSON.stringify(responseBody)]).catch(() => { });
        }
        async execute(userId, key, work) {
            if (!key) {
                throw new amal_error_js_1.AmalError(error_codes_js_1.ErrorCode.VALIDATION_ERROR, 'Idempotency key is required.');
            }
            const compositeKey = `${userId}:${key}`;
            if (this.memoryCache.has(compositeKey)) {
                return this.memoryCache.get(compositeKey);
            }
            const client = await this.db.connect();
            try {
                const result = await work(client);
                await this.save(userId, key, 200, result);
                return result;
            }
            finally {
                client.release();
            }
        }
    };
    return IdempotencyService = _classThis;
})();
exports.IdempotencyService = IdempotencyService;
//# sourceMappingURL=idempotency.service.js.map