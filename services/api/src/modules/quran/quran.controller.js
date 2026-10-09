"use strict";
/**
 * AMAL OS — QURAN CONTROLLER
 * Serves canonical Medina Mushaf Arabic text and verified translations.
 */
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
exports.QuranController = void 0;
const common_1 = require("@nestjs/common");
const evidence_1 = require("@amal/evidence");
let QuranController = (() => {
    let _classDecorators = [(0, common_1.Controller)('quran')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _listSurahs_decorators;
    let _getAyah_decorators;
    var QuranController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _listSurahs_decorators = [(0, common_1.Get)('surahs')];
            _getAyah_decorators = [(0, common_1.Get)('ayahs/:surah/:ayah')];
            __esDecorate(this, null, _listSurahs_decorators, { kind: "method", name: "listSurahs", static: false, private: false, access: { has: obj => "listSurahs" in obj, get: obj => obj.listSurahs }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getAyah_decorators, { kind: "method", name: "getAyah", static: false, private: false, access: { has: obj => "getAyah" in obj, get: obj => obj.getAyah }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            QuranController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        async listSurahs() {
            return [
                { number: 1, name: 'Al-Fatihah', englishName: 'The Opening', ayahsCount: 7, revelationType: 'Meccan' },
                { number: 2, name: 'Al-Baqarah', englishName: 'The Cow', ayahsCount: 286, revelationType: 'Medinan' },
                { number: 93, name: 'Ad-Duha', englishName: 'The Morning Hours', ayahsCount: 11, revelationType: 'Meccan' },
                { number: 94, name: 'Ash-Sharh', englishName: 'The Relief', ayahsCount: 8, revelationType: 'Meccan' },
            ];
        }
        async getAyah(surah, ayah) {
            const s = parseInt(surah, 10);
            const a = parseInt(ayah, 10);
            const result = evidence_1.quranProvider.getAyah(s, a);
            return {
                surah: s,
                ayah: a,
                arabicText: result.arabicText,
                provenanceHash: result.provenanceHash,
                translation: result.translations[0]?.text || '',
                translator: result.translations[0]?.translator || 'Sahih International',
                immutableMakkahMedinaText: true,
            };
        }
        constructor() {
            __runInitializers(this, _instanceExtraInitializers);
        }
    };
    return QuranController = _classThis;
})();
exports.QuranController = QuranController;
//# sourceMappingURL=quran.controller.js.map