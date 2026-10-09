"use strict";
/**
 * AMAL OS — LAYER 20: GLOBAL HTTP EXCEPTION FILTER (Section 20.30)
 * Sanitizes errors and enforces non-leaking error responses.
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
exports.HttpExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const amal_error_js_1 = require("./amal-error.js");
const error_codes_js_1 = require("./error-codes.js");
let HttpExceptionFilter = (() => {
    let _classDecorators = [(0, common_1.Catch)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var HttpExceptionFilter = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            HttpExceptionFilter = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        catch(exception, host) {
            const ctx = host.switchToHttp();
            const response = ctx.getResponse();
            const request = ctx.getRequest();
            const requestId = request.requestId || request.headers?.['x-request-id'] || `req_${Date.now()}`;
            if (exception instanceof amal_error_js_1.AmalError) {
                return response.status(this.mapStatus(exception.code)).json({
                    error: {
                        code: exception.code,
                        message: this.redactInternalDetails(exception.message),
                        request_id: requestId,
                    },
                });
            }
            if (exception instanceof common_1.HttpException) {
                const status = exception.getStatus();
                const res = exception.getResponse();
                const message = typeof res === 'object' && res.message ? res.message : exception.message;
                return response.status(status).json({
                    error: {
                        code: status === 401 ? error_codes_js_1.ErrorCode.UNAUTHORIZED : status === 403 ? error_codes_js_1.ErrorCode.FORBIDDEN : error_codes_js_1.ErrorCode.VALIDATION_ERROR,
                        message: this.redactInternalDetails(Array.isArray(message) ? message.join(', ') : String(message)),
                        request_id: requestId,
                    },
                });
            }
            // Never leak raw internal SQL, Redis, or stack trace errors
            return response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: {
                    code: error_codes_js_1.ErrorCode.INTERNAL_ERROR,
                    message: 'An unexpected internal error occurred.',
                    request_id: requestId,
                },
            });
        }
        redactInternalDetails(raw) {
            // Redact SQL, Postgres, table names, prompt text, passwords, tokens
            return raw
                .replace(/select .* from/gi, '[REDACTED_QUERY]')
                .replace(/insert into/gi, '[REDACTED_QUERY]')
                .replace(/update .* set/gi, '[REDACTED_QUERY]')
                .replace(/bearer [a-zA-Z0-9_\-\.]+/gi, 'Bearer [REDACTED]')
                .replace(/password:?\s*\S+/gi, 'password: [REDACTED]');
        }
        mapStatus(code) {
            switch (code) {
                case error_codes_js_1.ErrorCode.UNAUTHORIZED:
                    return 401;
                case error_codes_js_1.ErrorCode.FORBIDDEN:
                case error_codes_js_1.ErrorCode.POLICY_DENIED:
                    return 403;
                case error_codes_js_1.ErrorCode.NOT_FOUND:
                    return 404;
                case error_codes_js_1.ErrorCode.VALIDATION_ERROR:
                    return 400;
                case error_codes_js_1.ErrorCode.CONFLICT:
                case error_codes_js_1.ErrorCode.IDEMPOTENCY_CONFLICT:
                    return 409;
                case error_codes_js_1.ErrorCode.RATE_LIMITED:
                    return 429;
                default:
                    return 500;
            }
        }
    };
    return HttpExceptionFilter = _classThis;
})();
exports.HttpExceptionFilter = HttpExceptionFilter;
//# sourceMappingURL=http-exception.filter.js.map