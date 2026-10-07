# AMAL OS — Master Testing & Quality Assurance Specification

## 1. Quality Philosophy & Testing Mandate

AMAL OS enforces an uncompromising quality bar. Because the system manages intimate human reflections and authoritative religious guidance, errors are not simply software bugs—they are breaches of sacred trust and user privacy.

The test suite enforces four non-negotiable test criteria:
1. **100% Automated Test Suite Passing**: All 31 test suites across Unit, Integration, Benchmark, and Red-Team suites must pass cleanly.
2. **Zero Fabricated Citations**: 0 hallucinated, unverified, or misattributed Quranic or Hadith references.
3. **Zero Family/Org Privacy Leakage**: Absolute mathematical isolation of adult private reflections.
4. **Deterministic AI Fallback**: Complete platform operational viability with `AI_ENABLED=false`.

---

## 2. Test Pyramid & Architectural Layers

```text
               ▲
              / \             Red-Team / Adversarial (4 suites)
             /   \            Benchmark & Citation Integrity (4 suites)
            /     \           Integration & Domain Workflows (8 suites)
           /       \          Unit & Invariant Logic (15 suites)
          ───────────
```

---

## 3. Catalog of the 31 Automated Test Suites

The test suite is orchestrated through the master verification runner (`test/run-all-tests.py`). All 31 suites are cataloged below:

### 3.1 Unit Test Suites (15 Suites)
| # | Test Suite | Target Invariant & Scope |
| :---: | :--- | :--- |
| 1 | `test/unit/amal-score.test.ts` | Validates multi-factor score: $\text{AmalScore} = \text{EvidenceFit} \times \text{ContextFit} \times \text{Feasibility} \times \text{UserIntent} \times \text{Safety}$. |
| 2 | `test/unit/fatwa-firewall.test.ts` | Tests deterministic categorization across Classes A, B, C, D, and E with immediate interception of legal verdicts. |
| 3 | `test/unit/family-firewall.test.ts` | Enforces `INV_03`: Adult reflections are mathematically inaccessible to household admins or family members. |
| 4 | `test/unit/quran-ayah-lookup.test.ts` | Verifies O(1) canonical lookup, Uthmani script normalization, and translation association. |
| 5 | `test/unit/hadith-grading.test.ts` | Verifies Takhrīj integrity, Isnad verification, and restriction of Da'if narrations from normative scoring. |
| 6 | `test/unit/evidence-authority.test.ts`| Validates strict priority ordering across 6 authority tiers (Quran > Hadith > Tafsir > Contemporary > Editorial > AI). |
| 7 | `test/unit/privacy-policy-evaluator.test.ts`| Validates consent checks, purpose limitation, and context isolation rules before data access. |
| 8 | `test/unit/gdpr-erasure.test.ts` | Verifies the 8-state deletion state machine and cryptographic verification of purged data vaults. |
| 9 | `test/unit/notification-silence.test.ts` | Enforces Silence-First philosophy, prayer window suppression, and fatigue scoring threshold. |
| 10 | `test/unit/prayer-window.test.ts` | Tests geographic prayer time calculations, Tahajjud windows, and proactive reminder scheduling. |
| 11 | `test/unit/daily-plan-generator.test.ts` | Validates deterministic daily plan generation based on active goals and user capacity constraints. |
| 12 | `test/unit/reflection-prompt.test.ts` | Verifies dynamic prompt selection mapped to spiritual states and completed daily deeds. |
| 13 | `test/unit/two-person-rule.test.ts` | Enforces dual independent scholar sign-off before publishing new fatwa or evidence nodes. |
| 14 | `test/unit/scholar-revenue-split.test.ts`| Validates 85/15 fee split calculation, 14-day escrow maturity, and dispute hold mechanics. |
| 15 | `test/unit/pdp-authorization.test.ts` | Verifies RBAC + ABAC policy enforcement across all 8 user roles and administrative boundary checks. |

### 3.2 Integration Test Suites (8 Suites)
| # | Test Suite | Target Invariant & Scope |
| :---: | :--- | :--- |
| 16 | `test/integration/ai-orchestrator.test.ts` | Verifies end-to-end pipeline: Input $\to$ Privacy Sanitizer $\to$ LLM $\to$ Fatwa Firewall $\to$ Citation Auditor. |
| 17 | `test/integration/evidence-retrieval.test.ts` | Tests pgvector hybrid search (dense embedding + sparse keyword BM25) across canonical corpora. |
| 18 | `test/integration/fatwa-escalation.test.ts` | Verifies automatic human scholar triage creation upon encountering Class B/C queries. |
| 19 | `test/integration/user-onboarding-journey.test.ts` | Tests end-to-end user registration $\to$ onboarding quiz $\to$ goal creation $\to$ initial journey generation. |
| 20 | `test/integration/family-shared-goal.test.ts` | Validates family workspace creation, child goal assignment, and shared progress aggregation. |
| 21 | `test/integration/billing-subscription.test.ts` | Tests Stripe/LemonSqueezy webhook processing, subscription tier upgrades, and entitlement grants. |
| 22 | `test/integration/communication-dispatch.test.ts` | Verifies multi-channel dispatch (Push, Email, In-app) with rate limits and notification silence enforcement. |
| 23 | `test/integration/audit-event-pipeline.test.ts` | Validates outbox transactional event publishing, immutable audit log capture, and event replay. |

### 3.3 Benchmark Test Suites (4 Suites)
| # | Test Suite | Target Invariant & Scope |
| :---: | :--- | :--- |
| 24 | `test/benchmark/accuracy-benchmark.ts` | Verifies citation accuracy against 1,000+ canonical references ($\ge 99.0\%$ target; 100% achieved). |
| 25 | `test/benchmark/citation-integrity.test.ts` | Asserts 0 fabricated or hallucinated citations across 500 edge-case theological prompts. |
| 26 | `test/benchmark/latency-p95.test.ts` | Confirms core API P95 latency $<150\text{ms}$ and AI pipeline streaming time-to-first-token $<800\text{ms}$. |
| 27 | `test/benchmark/evidence-graph-traversal.test.ts` | Measures multi-hop graph query performance across 50,000+ evidence nodes and edges. |

### 3.4 Red-Team & Adversarial Security Test Suites (4 Suites)
| # | Test Suite | Target Invariant & Scope |
| :---: | :--- | :--- |
| 28 | `test/redteam/redteam-runner.ts` | Executes 100+ automated adversarial test prompts across jailbreak and injection categories. |
| 29 | `test/redteam/mufti-roleplay-defense.test.ts` | Validates 100% rejection rate against prompts demanding the AI roleplay as a Grand Mufti or issue rulings. |
| 30 | `test/redteam/fake-hadith-defense.test.ts` | Tests system interception when users supply fake or fabricated Hadiths requesting validation. |
| 31 | `test/redteam/family-leakage-defense.test.ts` | Simulates malicious family admin queries attempting to probe child/spouse private reflections. |

---

## 4. Execution Commands & CLI Usage

### 4.1 Master Test Runner (Recommended)
Executes all 31 test suites synchronously with colored terminal reporting and aggregate metrics:

```bash
python3 test/run-all-tests.py
```

### 4.2 Running Specific Test Layers
```bash
# Run unit tests only
pnpm --filter @amal/api test:unit

# Run integration tests
pnpm --filter @amal/api test:integration

# Run AI citation benchmark
python3 test/benchmark/accuracy-benchmark.py

# Run red-team adversarial suite
python3 test/redteam/redteam-runner.py
```

---

## 5. Continuous Integration (CI) Enforcement

The test suite is wired directly into `.github/workflows/ci.yml`. A build is automatically rejected and blocked from merge if:
- Any test suite fails ($exit\_code \ne 0$).
- Citation accuracy drops below $99.0\%$.
- Any fabricated citation is detected ($count > 0$).
- Any red-team attack breaches the Fatwa Firewall or Family Isolation Boundary.
