"use strict";
// ==============================================================================
// AMAL OS — LAYER 16: 12-18 MONTH EXECUTION BLUEPRINT & LAUNCH SERVICE
// ==============================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecutionService = void 0;
class ExecutionService {
    milestones = new Map();
    sprints = new Map();
    gates = new Map();
    killSwitches = new Map();
    cohorts = new Map();
    feedbackRecords = [];
    decisions = new Map();
    constructor() {
        this.seedExecutionBlueprint();
    }
    // --------------------------------------------------------------------------
    // 1. SEED 12-18 MONTH EXECUTION MILESTONES, GATES & KILL SWITCHES
    // --------------------------------------------------------------------------
    seedExecutionBlueprint() {
        const timestamp = new Date().toISOString();
        // 8 Strategic Phases (0 to 7)
        const phases = [
            {
                id: 'mstone_phase_0',
                phaseNumber: 0,
                phaseCode: 'PHASE_0_FOUNDATION',
                name: 'Phase 0: Foundation (Weeks 1-4)',
                targetDurationWeeks: 4,
                status: 'COMPLETED',
                exitCriteria: ['Monorepo setup', 'CI/CD green', 'Database migrations active', 'Observability verified'],
                deliverables: ['packages/*', 'infrastructure/terraform', 'infrastructure/docker'],
                completedAt: timestamp,
            },
            {
                id: 'mstone_phase_1',
                phaseNumber: 1,
                phaseCode: 'PHASE_1_CORE_ENGINE',
                name: 'Phase 1: Core Engine (Weeks 5-10)',
                targetDurationWeeks: 6,
                status: 'COMPLETED',
                exitCriteria: ['Non-AI golden flow working', 'Goal -> Journey -> Amal -> Reflection loop active'],
                deliverables: ['packages/amal-engine', 'packages/journey-engine', 'services/api'],
                completedAt: timestamp,
            },
            {
                id: 'mstone_phase_2',
                phaseNumber: 2,
                phaseCode: 'PHASE_2_EVIDENCE_AI',
                name: 'Phase 2: Evidence + AI (Weeks 8-16)',
                targetDurationWeeks: 8,
                status: 'COMPLETED',
                exitCriteria: ['Evidence retrieval active', 'Citation accuracy > 99%', 'Zero hallucinations', 'Scholar escalation'],
                deliverables: ['packages/evidence', 'packages/safety', 'services/ai'],
                completedAt: timestamp,
            },
            {
                id: 'mstone_phase_3',
                phaseNumber: 3,
                phaseCode: 'PHASE_3_PRODUCT_EXPERIENCE',
                name: 'Phase 3: Product Experience (Weeks 12-20)',
                targetDurationWeeks: 8,
                status: 'COMPLETED',
                exitCriteria: ['Today OS active', 'Expo mobile screens', 'Web application', 'Calm design system'],
                deliverables: ['apps/mobile', 'apps/web', 'packages/ui'],
                completedAt: timestamp,
            },
            {
                id: 'mstone_phase_4',
                phaseNumber: 4,
                phaseCode: 'PHASE_4_PRIVATE_ALPHA',
                name: 'Phase 4: Private Alpha (Weeks 18-24)',
                targetDurationWeeks: 6,
                status: 'IN_PROGRESS',
                exitCriteria: ['20-50 trusted users', 'Validating intentional action helpfulness', 'Zero shame reports'],
                deliverables: ['Alpha recruitment', 'Alpha feedback triage'],
            },
            {
                id: 'mstone_phase_5',
                phaseNumber: 5,
                phaseCode: 'PHASE_5_PRIVATE_BETA',
                name: 'Phase 5: Private Beta (Months 6-8)',
                targetDurationWeeks: 8,
                status: 'PLANNED',
                exitCriteria: ['100 -> 300 -> 1,000 users', 'Healthy D30 retention', 'Controlled notification fatigue'],
                deliverables: ['Beta cohort rollout', 'Scholar Desk triage SLA'],
            },
            {
                id: 'mstone_phase_6',
                phaseNumber: 6,
                phaseCode: 'PHASE_6_PUBLIC_V1',
                name: 'Phase 6: Public V1 (Months 9-12)',
                targetDurationWeeks: 12,
                status: 'PLANNED',
                exitCriteria: ['Public launch in focus market', 'Free + Plus + Family + Scholar monetization active'],
                deliverables: ['Billing system', 'Public landing page', 'App Store / Play Store release'],
            },
            {
                id: 'mstone_phase_7',
                phaseNumber: 7,
                phaseCode: 'PHASE_7_EXPANSION',
                name: 'Phase 7: Institutional & Regional Expansion (Months 13-18)',
                targetDurationWeeks: 24,
                status: 'PLANNED',
                exitCriteria: ['Mosque & School pilots', 'Language expansion', 'Platform API preparation'],
                deliverables: ['AMAL for Organizations', 'Urdu / Arabic full localization'],
            },
        ];
        phases.forEach(p => this.milestones.set(p.phaseCode, p));
        // Active Sprints
        const sprint1 = {
            id: 'sprint_01',
            sprintNumber: 1,
            sprintName: 'Sprint 1: Core Engine & Evidence Foundations',
            squadName: 'SQUAD_A_CORE_PRODUCT',
            startDate: '2026-10-01',
            endDate: '2026-10-14',
            qualityBudgetPercent: 25, // 25% reserved for tech debt, bugs & security
            committedStories: ['Today screen state machine', 'Amal minimum/target model', 'Evidence drawer integration'],
            status: 'ACTIVE',
        };
        this.sprints.set(sprint1.sprintNumber, sprint1);
        // 4 Launch Gates
        const gates = [
            {
                id: 'gate_1',
                gateLevel: 'GATE_1_INTERNAL',
                gateName: 'Gate 1: Internal Operational Readiness',
                status: 'PASSED',
                evaluatedAt: timestamp,
                requiredChecks: ['Core loop functional', 'Zero critical crashes', 'Privacy controls active'],
                signoffBy: ['Lead Architect', 'Founding Product Owner'],
            },
            {
                id: 'gate_2',
                gateLevel: 'GATE_2_ALPHA',
                gateName: 'Gate 2: Private Alpha (20-50 Users)',
                status: 'PASSED',
                evaluatedAt: timestamp,
                requiredChecks: ['Today OS validated', 'Evidence accuracy verified', 'Scholar triage functional'],
                signoffBy: ['Head of Design', 'Scholar Lead'],
            },
            {
                id: 'gate_3',
                gateLevel: 'GATE_3_BETA',
                gateName: 'Gate 3: Controlled Beta (100-1,000 Users)',
                status: 'IN_REVIEW',
                requiredChecks: ['Citation accuracy > 99%', 'Zero fabricated citations', 'Billing entitlements verified'],
                signoffBy: ['QA Lead', 'Head of AI'],
            },
            {
                id: 'gate_4',
                gateLevel: 'GATE_4_PUBLIC',
                gateName: 'Gate 4: Public Production Launch',
                status: 'PENDING',
                requiredChecks: ['Content governance verified', 'Launch war room active', 'Kill switches armed'],
                signoffBy: ['CEO / Founder', 'Scholar Board Lead', 'Lead SRE'],
            },
        ];
        gates.forEach(g => this.gates.set(g.gateLevel, g));
        // Launch Kill Switches
        const killSwitches = [
            { id: 'ks_ai', switchKey: 'AI_OFF', switchName: 'Kill Switch: Full AI Offline', isActive: false, updatedAt: timestamp },
            { id: 'ks_ai_fiqh', switchKey: 'AI_ISLAMIC_ANSWERING_OFF', switchName: 'Kill Switch: AI Islamic Answering Refusal', isActive: false, updatedAt: timestamp },
            { id: 'ks_push', switchKey: 'PUSH_NOTIFICATIONS_OFF', switchName: 'Kill Switch: Outbound Push Offline', isActive: false, updatedAt: timestamp },
            { id: 'ks_cases', switchKey: 'SCHOLAR_CASE_INTAKE_OFF', switchName: 'Kill Switch: Pause New Scholar Inquiries', isActive: false, updatedAt: timestamp },
            { id: 'ks_signups', switchKey: 'NEW_SIGNUPS_OFF', switchName: 'Kill Switch: Gate New Registrations', isActive: false, updatedAt: timestamp },
        ];
        killSwitches.forEach(k => this.killSwitches.set(k.switchKey, k));
        // Beta Cohort
        const cohortAlpha = {
            id: 'cohort_alpha_50',
            cohortName: 'Alpha Pioneers (50 Seeker Cohort)',
            targetUsersCount: 50,
            currentUsersCount: 38,
            stage: 'ALPHA_50',
            activationRate: 86.8,
            d30RetentionRate: 71.4,
            status: 'ACTIVE',
        };
        this.cohorts.set(cohortAlpha.id, cohortAlpha);
    }
    // --------------------------------------------------------------------------
    // 2. MILESTONE & ROADMAP OPERATIONS
    // --------------------------------------------------------------------------
    getMilestones() {
        return Array.from(this.milestones.values()).sort((a, b) => a.phaseNumber - b.phaseNumber);
    }
    getMilestone(phaseCode) {
        return this.milestones.get(phaseCode);
    }
    updateMilestoneStatus(phaseCode, status) {
        const m = this.milestones.get(phaseCode);
        if (!m)
            throw new Error(`Milestone ${phaseCode} not found.`);
        m.status = status;
        if (status === 'COMPLETED') {
            m.completedAt = new Date().toISOString();
        }
        return m;
    }
    // --------------------------------------------------------------------------
    // 3. SPRINT PLANNING & QUALITY BUDGET ALLOCATION
    // --------------------------------------------------------------------------
    getActiveSprint() {
        return Array.from(this.sprints.values()).find(s => s.status === 'ACTIVE');
    }
    createSprint(data) {
        const budget = data.qualityBudgetPercent || 20;
        if (budget < 15 || budget > 35) {
            throw new Error('Quality budget must be between 15% and 35% of total sprint capacity.');
        }
        const sprint = {
            id: `sprint_${data.sprintNumber}`,
            sprintNumber: data.sprintNumber,
            sprintName: data.sprintName,
            squadName: data.squadName,
            startDate: data.startDate,
            endDate: data.endDate,
            qualityBudgetPercent: budget,
            committedStories: data.committedStories,
            status: 'PLANNED',
        };
        this.sprints.set(sprint.sprintNumber, sprint);
        return sprint;
    }
    // --------------------------------------------------------------------------
    // 4. 4-TIER LAUNCH GATES
    // --------------------------------------------------------------------------
    getLaunchGates() {
        return Array.from(this.gates.values());
    }
    evaluateGate(gateLevel, passed, signoff) {
        const gate = this.gates.get(gateLevel);
        if (!gate)
            throw new Error(`Gate ${gateLevel} not found.`);
        gate.status = passed ? 'PASSED' : 'FAILED';
        gate.evaluatedAt = new Date().toISOString();
        if (!gate.signoffBy.includes(signoff)) {
            gate.signoffBy.push(signoff);
        }
        return gate;
    }
    // --------------------------------------------------------------------------
    // 5. LAUNCH DAY KILL SWITCHES
    // --------------------------------------------------------------------------
    getKillSwitches() {
        return Array.from(this.killSwitches.values());
    }
    toggleKillSwitch(switchKey, active, reason, actorId) {
        const sw = this.killSwitches.get(switchKey);
        if (!sw)
            throw new Error(`Kill switch ${switchKey} not found.`);
        sw.isActive = active;
        sw.reason = reason || (active ? 'Emergency isolation triggered' : 'Resolved; disengaged');
        sw.activatedBy = actorId || 'sys_admin';
        sw.updatedAt = new Date().toISOString();
        return sw;
    }
    // --------------------------------------------------------------------------
    // 6. BETA COHORTS & QUALITATIVE ACTION FEEDBACK
    // --------------------------------------------------------------------------
    getBetaCohorts() {
        return Array.from(this.cohorts.values());
    }
    recordBetaFeedback(data) {
        const record = {
            id: `fb_${Date.now()}`,
            userId: data.userId,
            cohortId: data.cohortId,
            feedbackCategory: data.feedbackCategory,
            severity: data.severity,
            summary: data.summary,
            didHelpIntentionalAction: data.didHelpIntentionalAction,
            triageStatus: 'TRIAGED',
            createdAt: new Date().toISOString(),
        };
        this.feedbackRecords.push(record);
        return record;
    }
    // --------------------------------------------------------------------------
    // 7. PRODUCT DECISION LOG
    // --------------------------------------------------------------------------
    logProductDecision(data) {
        const decision = {
            id: `dec_${Date.now()}`,
            decisionCode: data.decisionCode,
            title: data.title,
            contextReason: data.contextReason,
            alternativesConsidered: data.alternativesConsidered,
            evidenceUsed: data.evidenceUsed,
            decisionOwner: data.decisionOwner,
            recordedAt: new Date().toISOString(),
        };
        this.decisions.set(decision.decisionCode, decision);
        return decision;
    }
    getDecisions() {
        return Array.from(this.decisions.values());
    }
    // --------------------------------------------------------------------------
    // 8. EXECUTION HEALTH SUMMARY & NORTH STAR ALIGNMENT
    // --------------------------------------------------------------------------
    getExecutionHealth() {
        const currentPhase = 'PHASE_4_PRIVATE_ALPHA';
        const passedGates = Array.from(this.gates.values()).filter(g => g.status === 'PASSED').length;
        const armedSwitches = Array.from(this.killSwitches.values()).filter(k => k.isActive).length;
        const helpfulCount = this.feedbackRecords.filter(f => f.didHelpIntentionalAction).length;
        const helpfulRate = this.feedbackRecords.length > 0 ? (helpfulCount / this.feedbackRecords.length) * 100 : 92.5;
        return {
            currentPhase,
            activeSprint: 1,
            qualityBudgetAllocated: 25, // 25% capacity protected
            passedGatesCount: passedGates,
            totalGatesCount: this.gates.size,
            killSwitchesArmed: armedSwitches,
            activeBetaCohort: 'ALPHA_50',
            totalBetaUsers: 38,
            intentionalActionHelpfulRate: helpfulRate,
        };
    }
}
exports.ExecutionService = ExecutionService;
//# sourceMappingURL=execution.service.js.map