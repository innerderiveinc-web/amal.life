"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const ai_controller_js_1 = require("./ai/ai.controller.js");
const amal_controller_js_1 = require("./amal/amal.controller.js");
const goals_controller_js_1 = require("./goals/goals.controller.js");
const journeys_controller_js_1 = require("./journeys/journeys.controller.js");
const reflections_controller_js_1 = require("./reflections/reflections.controller.js");
const health_controller_js_1 = require("./health/health.controller.js");
const evidence_controller_js_1 = require("./evidence/evidence.controller.js");
const today_controller_js_1 = require("./today/today.controller.js");
const communications_controller_js_1 = require("./notifications/communications.controller.js");
const governance_controller_js_1 = require("./governance/governance.controller.js");
const platform_controller_js_1 = require("./platform/platform.controller.js");
const knowledge_ops_controller_js_1 = require("./knowledge-ops/knowledge-ops.controller.js");
const billing_controller_js_1 = require("./billing/billing.controller.js");
const execution_controller_js_1 = require("./execution/execution.controller.js");
const blueprint_controller_js_1 = require("./blueprint/blueprint.controller.js");
const execution_pack_controller_js_1 = require("./execution-pack/execution-pack.controller.js");
const auth_controller_js_1 = require("./auth/auth.controller.js");
const privacy_controller_js_1 = require("./privacy/privacy.controller.js");
const users_controller_js_1 = require("./users/users.controller.js");
const family_controller_js_1 = require("./family/family.controller.js");
const scholars_controller_js_1 = require("./scholars/scholars.controller.js");
const quran_controller_js_1 = require("./quran/quran.controller.js");
const hadith_controller_js_1 = require("./hadith/hadith.controller.js");
const admin_controller_js_1 = require("./admin/admin.controller.js");
class AppModule {
    static controllers = [
        health_controller_js_1.HealthController,
        today_controller_js_1.TodayController,
        ai_controller_js_1.AiController,
        amal_controller_js_1.AmalController,
        goals_controller_js_1.GoalsController,
        journeys_controller_js_1.JourneysController,
        reflections_controller_js_1.ReflectionsController,
        evidence_controller_js_1.EvidenceController,
        communications_controller_js_1.CommunicationsController,
        governance_controller_js_1.GovernanceController,
        platform_controller_js_1.PlatformController,
        knowledge_ops_controller_js_1.KnowledgeOpsController,
        billing_controller_js_1.BillingController,
        execution_controller_js_1.ExecutionController,
        blueprint_controller_js_1.BlueprintController,
        execution_pack_controller_js_1.ExecutionPackController,
        auth_controller_js_1.AuthController,
        privacy_controller_js_1.PrivacyController,
        users_controller_js_1.UsersController,
        family_controller_js_1.FamilyController,
        scholars_controller_js_1.ScholarsController,
        quran_controller_js_1.QuranController,
        hadith_controller_js_1.HadithController,
        admin_controller_js_1.AdminController,
    ];
}
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map