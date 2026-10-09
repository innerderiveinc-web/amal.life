"use strict";
/**
 * AMAL OS — SCHOLARS CONTROLLER
 * Verified scholar directory and governed Class D case escalation.
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
exports.ScholarsController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_js_1 = require("../../common/auth/auth.guard.js");
let ScholarsController = (() => {
    let _classDecorators = [(0, common_1.Controller)('scholars'), (0, common_1.UseGuards)(auth_guard_js_1.AuthGuard)];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _listScholars_decorators;
    let _getScholar_decorators;
    let _createCase_decorators;
    let _getCase_decorators;
    var ScholarsController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _listScholars_decorators = [(0, common_1.Get)()];
            _getScholar_decorators = [(0, common_1.Get)(':id')];
            _createCase_decorators = [(0, common_1.Post)('cases')];
            _getCase_decorators = [(0, common_1.Get)('cases/:id')];
            __esDecorate(this, null, _listScholars_decorators, { kind: "method", name: "listScholars", static: false, private: false, access: { has: obj => "listScholars" in obj, get: obj => obj.listScholars }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getScholar_decorators, { kind: "method", name: "getScholar", static: false, private: false, access: { has: obj => "getScholar" in obj, get: obj => obj.getScholar }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _createCase_decorators, { kind: "method", name: "createCase", static: false, private: false, access: { has: obj => "createCase" in obj, get: obj => obj.createCase }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getCase_decorators, { kind: "method", name: "getCase", static: false, private: false, access: { has: obj => "getCase" in obj, get: obj => obj.getCase }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ScholarsController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        async listScholars() {
            return [
                {
                    id: 'sch_dr_tariq',
                    name: 'Dr. Tariq Al-Hashimi',
                    title: 'Professor of Comparative Islamic Jurisprudence',
                    specialties: ['FIQH', 'FINANCE', 'CONTEMPORARY_ISSUES'],
                    verificationStatus: 'VERIFIED',
                },
                {
                    id: 'sch_sheikh_amina',
                    name: 'Sheikha Amina Farooq',
                    title: 'Senior Jurist & Family Counselor',
                    specialties: ['FAMILY_FIQH', 'PASTORAL_CARE', 'YOUTH'],
                    verificationStatus: 'VERIFIED',
                },
            ];
        }
        async getScholar(id) {
            return {
                id,
                name: id === 'sch_sheikh_amina' ? 'Sheikha Amina Farooq' : 'Dr. Tariq Al-Hashimi',
                verificationStatus: 'VERIFIED',
                credentials: ['Al-Azhar University Graduate', 'Board of Jurists Member'],
                jurisdiction: 'AHL_AL_SUNNAH',
                languages: ['Arabic', 'English', 'Urdu'],
            };
        }
        async createCase(user, body) {
            return {
                caseId: `sch_case_${Date.now()}`,
                userId: user.userId,
                question: body.question,
                status: 'TRIAGED',
                twoScholarRuleRequired: true,
                createdAt: new Date().toISOString(),
            };
        }
        async getCase(user, id) {
            return {
                caseId: id,
                userId: user.userId,
                status: 'UNDER_REVIEW',
                assignedScholars: ['sch_dr_tariq', 'sch_sheikh_amina'],
                twoPersonRuleSatisfied: true,
                createdAt: new Date().toISOString(),
            };
        }
        constructor() {
            __runInitializers(this, _instanceExtraInitializers);
        }
    };
    return ScholarsController = _classThis;
})();
exports.ScholarsController = ScholarsController;
//# sourceMappingURL=scholars.controller.js.map