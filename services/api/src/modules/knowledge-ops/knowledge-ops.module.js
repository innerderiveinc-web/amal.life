"use strict";
// ==============================================================================
// AMAL OS — LAYER 14: KNOWLEDGE OPERATIONS & SCHOLAR NETWORK MODULE
// ==============================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnowledgeOpsModule = void 0;
const knowledge_ops_controller_js_1 = require("./knowledge-ops.controller.js");
const knowledge_ops_service_js_1 = require("./knowledge-ops.service.js");
class KnowledgeOpsModule {
    static controllers = [knowledge_ops_controller_js_1.KnowledgeOpsController];
    static providers = [knowledge_ops_service_js_1.KnowledgeOpsService];
}
exports.KnowledgeOpsModule = KnowledgeOpsModule;
//# sourceMappingURL=knowledge-ops.module.js.map