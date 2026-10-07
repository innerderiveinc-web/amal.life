# AMAL OS — Testing & Verification Strategy

## 1. Test Pyramid

AMAL OS enforces a rigorous multi-layered testing pyramid:

```text
       ▲
      / \   AI Safety Red-Team (Adversarial attacks & prompt injection)
     /   \  Citation Accuracy Benchmark (>99% accuracy on 1000+ dataset)
    /     \ Integration Tests (AI Orchestrator, Scholar escalation, API routes)
   /       \ Unit Tests (Amal score formula, Fatwa firewall, Family isolation)
  ───────────
```

---

## 2. Test Execution

### Master Verification Runner
Runs the full suite (unit, integration, benchmark, and red-team tests):

```bash
python3 test/run-all-tests.py
```

### Test Coverage Breakdown
- `test/unit/amal-score.test.ts`: Validates $\text{AMAL\_SCORE} = \text{EvidenceFit} \times \text{ContextFit} \times \text{Feasibility} \times \text{UserIntent} \times \text{Safety}$.
- `test/unit/fatwa-firewall.test.ts`: Verifies classification across Classes A, B, C, D, and E.
- `test/unit/family-firewall.test.ts`: Enforces zero leakage of adult private reflections across household members.
- `test/benchmark/accuracy-benchmark.ts`: Verifies citation accuracy against canonical references with 0 tolerated fabrications.
- `test/redteam/redteam-runner.ts`: Tests defenses against Mufti roleplay, fake Hadith requests, and prompt injection.
