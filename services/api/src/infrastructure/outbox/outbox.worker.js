"use strict";
/**
 * AMAL OS — LAYER 20: OUTBOX WORKER (Section 20.34)
 * Reliable event publisher with exponential backoff and dead-letter handling.
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
exports.OutboxWorker = void 0;
const common_1 = require("@nestjs/common");
const database_1 = require("@amal/database");
const events_1 = require("@amal/events");
let OutboxWorker = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var OutboxWorker = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            OutboxWorker = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        isRunning = false;
        exponentialBackoff(attempt, baseMs = 1000) {
            return Math.min(baseMs * Math.pow(2, attempt), 60000);
        }
        async processPendingEvents(batchSize = 20) {
            const pending = await database_1.outboxRepository.leasePending(batchSize);
            let processed = 0;
            for (const record of pending) {
                try {
                    await events_1.eventBus.publish({
                        id: record.id,
                        type: record.eventType,
                        version: 1,
                        aggregateType: record.aggregateType,
                        aggregateId: record.aggregateId,
                        occurredAt: record.createdAt,
                        payload: record.payload,
                    });
                    await database_1.outboxRepository.markProcessed(record.id);
                    processed++;
                }
                catch (err) {
                    const nextBackoff = this.exponentialBackoff(record.retryCount || 1);
                    await database_1.outboxRepository.markFailed(record.id, err?.message);
                }
            }
            return processed;
        }
    };
    return OutboxWorker = _classThis;
})();
exports.OutboxWorker = OutboxWorker;
//# sourceMappingURL=outbox.worker.js.map