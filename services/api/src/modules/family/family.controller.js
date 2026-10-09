"use strict";
/**
 * AMAL OS — FAMILY CONTROLLER
 * Manages family workspace, shared journeys, and strictly protects adult reflection isolation.
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
exports.FamilyController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_js_1 = require("../../common/auth/auth.guard.js");
let FamilyController = (() => {
    let _classDecorators = [(0, common_1.Controller)('family'), (0, common_1.UseGuards)(auth_guard_js_1.AuthGuard)];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _getFamily_decorators;
    let _inviteMember_decorators;
    let _getSharedJourneys_decorators;
    var FamilyController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _getFamily_decorators = [(0, common_1.Get)()];
            _inviteMember_decorators = [(0, common_1.Post)('invite')];
            _getSharedJourneys_decorators = [(0, common_1.Get)('journeys')];
            __esDecorate(this, null, _getFamily_decorators, { kind: "method", name: "getFamily", static: false, private: false, access: { has: obj => "getFamily" in obj, get: obj => obj.getFamily }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _inviteMember_decorators, { kind: "method", name: "inviteMember", static: false, private: false, access: { has: obj => "inviteMember" in obj, get: obj => obj.inviteMember }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getSharedJourneys_decorators, { kind: "method", name: "getSharedJourneys", static: false, private: false, access: { has: obj => "getSharedJourneys" in obj, get: obj => obj.getSharedJourneys }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            FamilyController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        async getFamily(user) {
            return {
                familyId: `fam_${user.userId}`,
                name: 'Household Workspace',
                ownerId: user.userId,
                members: [
                    {
                        userId: user.userId,
                        displayName: 'Head of Household',
                        role: 'OWNER',
                        accountMode: 'ADULT',
                    },
                    {
                        userId: 'usr_teen_01',
                        displayName: 'Zayd',
                        role: 'MEMBER',
                        accountMode: 'YOUNG_USER',
                    },
                ],
                privacyGuarantees: {
                    adultReflectionIsolation: true,
                    privateMuhasabahProtected: true,
                    sharedOnlyWithConsent: true,
                },
            };
        }
        async inviteMember(user, body) {
            return {
                invited: true,
                inviteToken: `inv_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
                email: body.email,
                role: 'MEMBER',
                accountMode: body.accountMode || 'ADULT',
            };
        }
        async getSharedJourneys(user) {
            return [
                {
                    id: 'fam_jrn_01',
                    title: 'Family Daily Quran & Dinner Tadabbur',
                    pace: 'Gentle',
                    participantsCount: 2,
                    activePhase: 'Week 1: Evening Gathering',
                },
            ];
        }
        constructor() {
            __runInitializers(this, _instanceExtraInitializers);
        }
    };
    return FamilyController = _classThis;
})();
exports.FamilyController = FamilyController;
//# sourceMappingURL=family.controller.js.map