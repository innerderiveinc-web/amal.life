"use strict";
/**
 * AMAL OS — LAYER 20: CREATE GOAL DTO (Section 20.17)
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
exports.UpdateGoalDto = exports.CreateGoalDto = void 0;
const class_validator_1 = require("class-validator");
let CreateGoalDto = (() => {
    let _title_decorators;
    let _title_initializers = [];
    let _title_extraInitializers = [];
    let _category_decorators;
    let _category_initializers = [];
    let _category_extraInitializers = [];
    let _intent_decorators;
    let _intent_initializers = [];
    let _intent_extraInitializers = [];
    let _desiredOutcome_decorators;
    let _desiredOutcome_initializers = [];
    let _desiredOutcome_extraInitializers = [];
    let _timeHorizon_decorators;
    let _timeHorizon_initializers = [];
    let _timeHorizon_extraInitializers = [];
    return class CreateGoalDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _title_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(2), (0, class_validator_1.MaxLength)(120)];
            _category_decorators = [(0, class_validator_1.IsEnum)(types_1.GoalCategory)];
            _intent_decorators = [(0, class_validator_1.IsEnum)(types_1.GoalIntent)];
            _desiredOutcome_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(500)];
            _timeHorizon_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(100)];
            __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: obj => "title" in obj, get: obj => obj.title, set: (obj, value) => { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
            __esDecorate(null, null, _category_decorators, { kind: "field", name: "category", static: false, private: false, access: { has: obj => "category" in obj, get: obj => obj.category, set: (obj, value) => { obj.category = value; } }, metadata: _metadata }, _category_initializers, _category_extraInitializers);
            __esDecorate(null, null, _intent_decorators, { kind: "field", name: "intent", static: false, private: false, access: { has: obj => "intent" in obj, get: obj => obj.intent, set: (obj, value) => { obj.intent = value; } }, metadata: _metadata }, _intent_initializers, _intent_extraInitializers);
            __esDecorate(null, null, _desiredOutcome_decorators, { kind: "field", name: "desiredOutcome", static: false, private: false, access: { has: obj => "desiredOutcome" in obj, get: obj => obj.desiredOutcome, set: (obj, value) => { obj.desiredOutcome = value; } }, metadata: _metadata }, _desiredOutcome_initializers, _desiredOutcome_extraInitializers);
            __esDecorate(null, null, _timeHorizon_decorators, { kind: "field", name: "timeHorizon", static: false, private: false, access: { has: obj => "timeHorizon" in obj, get: obj => obj.timeHorizon, set: (obj, value) => { obj.timeHorizon = value; } }, metadata: _metadata }, _timeHorizon_initializers, _timeHorizon_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        title = __runInitializers(this, _title_initializers, void 0);
        category = (__runInitializers(this, _title_extraInitializers), __runInitializers(this, _category_initializers, void 0));
        intent = (__runInitializers(this, _category_extraInitializers), __runInitializers(this, _intent_initializers, void 0));
        desiredOutcome = (__runInitializers(this, _intent_extraInitializers), __runInitializers(this, _desiredOutcome_initializers, void 0));
        timeHorizon = (__runInitializers(this, _desiredOutcome_extraInitializers), __runInitializers(this, _timeHorizon_initializers, void 0));
        constructor() {
            __runInitializers(this, _timeHorizon_extraInitializers);
        }
    };
})();
exports.CreateGoalDto = CreateGoalDto;
let UpdateGoalDto = (() => {
    let _title_decorators;
    let _title_initializers = [];
    let _title_extraInitializers = [];
    let _desiredOutcome_decorators;
    let _desiredOutcome_initializers = [];
    let _desiredOutcome_extraInitializers = [];
    let _timeHorizon_decorators;
    let _timeHorizon_initializers = [];
    let _timeHorizon_extraInitializers = [];
    let _status_decorators;
    let _status_initializers = [];
    let _status_extraInitializers = [];
    return class UpdateGoalDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _title_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(2), (0, class_validator_1.MaxLength)(120)];
            _desiredOutcome_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(500)];
            _timeHorizon_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(100)];
            _status_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: obj => "title" in obj, get: obj => obj.title, set: (obj, value) => { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
            __esDecorate(null, null, _desiredOutcome_decorators, { kind: "field", name: "desiredOutcome", static: false, private: false, access: { has: obj => "desiredOutcome" in obj, get: obj => obj.desiredOutcome, set: (obj, value) => { obj.desiredOutcome = value; } }, metadata: _metadata }, _desiredOutcome_initializers, _desiredOutcome_extraInitializers);
            __esDecorate(null, null, _timeHorizon_decorators, { kind: "field", name: "timeHorizon", static: false, private: false, access: { has: obj => "timeHorizon" in obj, get: obj => obj.timeHorizon, set: (obj, value) => { obj.timeHorizon = value; } }, metadata: _metadata }, _timeHorizon_initializers, _timeHorizon_extraInitializers);
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        title = __runInitializers(this, _title_initializers, void 0);
        desiredOutcome = (__runInitializers(this, _title_extraInitializers), __runInitializers(this, _desiredOutcome_initializers, void 0));
        timeHorizon = (__runInitializers(this, _desiredOutcome_extraInitializers), __runInitializers(this, _timeHorizon_initializers, void 0));
        status = (__runInitializers(this, _timeHorizon_extraInitializers), __runInitializers(this, _status_initializers, void 0));
        constructor() {
            __runInitializers(this, _status_extraInitializers);
        }
    };
})();
exports.UpdateGoalDto = UpdateGoalDto;
//# sourceMappingURL=create-goal.dto.js.map