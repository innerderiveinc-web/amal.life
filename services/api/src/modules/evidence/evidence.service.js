"use strict";
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
exports.EvidenceService = void 0;
const common_1 = require("@nestjs/common");
const database_1 = require("@amal/database");
let EvidenceService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var EvidenceService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            EvidenceService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        async search(query, maxResults = 5) {
            const qLower = query.toLowerCase();
            const results = [];
            for (const passage of database_1.db.passages.values()) {
                const source = database_1.db.sources.get(passage.sourceId);
                if (!source || source.verificationStatus !== 'APPROVED')
                    continue;
                if (passage.reference.toLowerCase().includes(qLower) ||
                    passage.translatedText.toLowerCase().includes(qLower) ||
                    passage.keywords.some(k => k.toLowerCase().includes(qLower))) {
                    results.push({
                        passageId: passage.id,
                        reference: passage.reference,
                        sourceTitle: source.title,
                        authorityLevel: source.authorityLevel,
                        translatedText: passage.translatedText,
                    });
                    if (results.length >= maxResults)
                        break;
                }
            }
            return results;
        }
        async getById(id) {
            const passage = database_1.db.passages.get(id);
            if (!passage)
                return null;
            const source = database_1.db.sources.get(passage.sourceId);
            return { ...passage, source };
        }
        async getChain(id) {
            const passage = database_1.db.passages.get(id);
            if (!passage)
                return null;
            const source = database_1.db.sources.get(passage.sourceId);
            return {
                claim: {
                    id: `claim_${passage.id}`,
                    text: `Affirmation grounded in ${passage.reference}`,
                },
                evidence: [
                    {
                        passageId: passage.id,
                        reference: passage.reference,
                        supportType: 'DIRECT_SUPPORT',
                    },
                ],
                source: {
                    id: source?.id || 'src_unknown',
                    title: source?.title || 'Canonical Corpus',
                    version: source?.version || '1.0',
                },
                review: {
                    status: source?.verificationStatus || 'APPROVED',
                },
                provenance: {
                    license: source?.license || 'AUTHORIZED',
                    reviewed: true,
                },
            };
        }
        async getNode(id) {
            return database_1.db.nodes.get(id) || null;
        }
        async getNeighbors(id) {
            const edges = Array.from(database_1.db.edges.values()).filter(e => e.sourceNodeId === id || e.targetNodeId === id);
            return { nodeId: id, edges };
        }
    };
    return EvidenceService = _classThis;
})();
exports.EvidenceService = EvidenceService;
//# sourceMappingURL=evidence.service.js.map