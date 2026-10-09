"use strict";
// ==============================================================================
// AMAL OS — LAYER 16: EXECUTION & LAUNCH OPERATIONS MODULE
// ==============================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecutionModule = void 0;
const execution_controller_js_1 = require("./execution.controller.js");
const execution_service_js_1 = require("./execution.service.js");
class ExecutionModule {
    static controllers = [execution_controller_js_1.ExecutionController];
    static providers = [execution_service_js_1.ExecutionService];
}
exports.ExecutionModule = ExecutionModule;
//# sourceMappingURL=execution.module.js.map