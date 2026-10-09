"use strict";
// ==============================================================================
// AMAL OS — LAYER 15: BILLING & BUSINESS PLATFORM MODULE
// ==============================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillingModule = void 0;
const billing_controller_js_1 = require("./billing.controller.js");
const billing_service_js_1 = require("./billing.service.js");
class BillingModule {
    static controllers = [billing_controller_js_1.BillingController];
    static providers = [billing_service_js_1.BillingService];
}
exports.BillingModule = BillingModule;
//# sourceMappingURL=billing.module.js.map